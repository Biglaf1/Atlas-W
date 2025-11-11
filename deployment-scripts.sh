#!/bin/bash
# ============================================
# DEPLOY.SH - Script de déploiement ATLAS Risk Cover
# ============================================

set -e

echo "🚀 Déploiement ATLAS Risk Cover"
echo "================================"

# Variables
ENV=${1:-production}
BRANCH=${2:-main}
BUILD_DIR="build"
DEPLOY_DIR="/var/www/atlas-risk-cover"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}✔ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

log_error() {
    echo -e "${RED}✖ $1${NC}"
    exit 1
}

# Vérifier l'environnement
if [ "$ENV" != "production" ] && [ "$ENV" != "staging" ] && [ "$ENV" != "development" ]; then
    log_error "Environnement invalide: $ENV"
fi

log_info "Environnement: $ENV"
log_info "Branche: $BRANCH"

# 1. Pull des dernières modifications
log_info "Récupération des dernières modifications..."
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

# 2. Installation des dépendances
log_info "Installation des dépendances..."
npm ci

# 3. Tests
log_info "Exécution des tests..."
npm run test:ci || log_warning "Certains tests ont échoué"

# 4. Build
log_info "Build de l'application..."
npm run build

# 5. Optimisation des assets
log_info "Optimisation des images..."
find $BUILD_DIR -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -exec jpegoptim --strip-all {} \;

# 6. Minification supplémentaire
log_info "Minification des fichiers..."
find $BUILD_DIR -type f -name "*.html" -exec html-minifier --collapse-whitespace --remove-comments --minify-css --minify-js {} -o {} \;

# 7. Backup de l'ancienne version
if [ -d "$DEPLOY_DIR" ]; then
    log_info "Sauvegarde de l'ancienne version..."
    BACKUP_DIR="/backups/atlas-$(date +%Y%m%d-%H%M%S)"
    mkdir -p $BACKUP_DIR
    cp -r $DEPLOY_DIR/* $BACKUP_DIR/
fi

# 8. Déploiement
log_info "Déploiement des fichiers..."
rsync -avz --delete $BUILD_DIR/ $DEPLOY_DIR/

# 9. Configuration des permissions
log_info "Configuration des permissions..."
chown -R www-data:www-data $DEPLOY_DIR
chmod -R 755 $DEPLOY_DIR

# 10. Invalidation du cache CDN
if [ "$ENV" == "production" ]; then
    log_info "Invalidation du cache CDN..."
    # Cloudflare example
    # curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
    #      -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
    #      -H "Content-Type: application/json" \
    #      --data '{"purge_everything":true}'
fi

# 11. Redémarrage des services
log_info "Redémarrage des services..."
sudo systemctl reload nginx
sudo systemctl restart pm2-atlas

# 12. Health check
log_info "Vérification du déploiement..."
sleep 5
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://atlasriskcover.com)

if [ "$HTTP_STATUS" -eq 200 ]; then
    log_info "Déploiement réussi ! Site accessible."
else
    log_error "Erreur: Le site retourne le code HTTP $HTTP_STATUS"
fi

# 13. Notification
log_info "Envoi de la notification..."
curl -X POST https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK \
     -H 'Content-Type: application/json' \
     -d "{\"text\":\"✅ Déploiement ATLAS Risk Cover réussi sur $ENV\"}"

echo ""
echo "================================"
echo "✨ Déploiement terminé avec succès!"
echo "================================"

---

# ============================================
# .GITHUB/WORKFLOWS/DEPLOY.YML - GitHub Actions CI/CD
# ============================================

name: Deploy ATLAS Risk Cover

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18.x'
  
jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: build/
  
  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: build/
    
    - name: Deploy to Staging
      uses: easingthemes/ssh-deploy@v2
      with:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        REMOTE_HOST: ${{ secrets.STAGING_HOST }}
        REMOTE_USER: ${{ secrets.STAGING_USER }}
        SOURCE: "build/"
        TARGET: "/var/www/staging-atlas"
  
  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: build/
    
    - name: Deploy to Production
      uses: easingthemes/ssh-deploy@v2
      with:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        REMOTE_HOST: ${{ secrets.PRODUCTION_HOST }}
        REMOTE_USER: ${{ secrets.PRODUCTION_USER }}
        SOURCE: "build/"
        TARGET: "/var/www/atlas-risk-cover"
    
    - name: Purge Cloudflare Cache
      run: |
        curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ secrets.CF_ZONE_ID }}/purge_cache" \
             -H "Authorization: Bearer ${{ secrets.CF_API_TOKEN }}" \
             -H "Content-Type: application/json" \
             --data '{"purge_everything":true}'
    
    - name: Notify Slack
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        text: 'Déploiement ATLAS Risk Cover en production'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
      if: always()

---

# ============================================
# MAKEFILE - Commandes utiles
# ============================================

.PHONY: help install dev build test deploy clean

help:
	@echo "ATLAS Risk Cover - Commandes disponibles:"
	@echo "  make install    - Installer les dépendances"
	@echo "  make dev        - Lancer le serveur de développement"
	@echo "  make build      - Builder pour la production"
	@echo "  make test       - Lancer les tests"
	@echo "  make deploy     - Déployer en production"
	@echo "  make clean      - Nettoyer les fichiers temporaires"

install:
	npm ci

dev:
	npm start

build:
	npm run build

test:
	npm run test

deploy:
	./deploy.sh production main

clean:
	rm -rf node_modules build coverage
	npm cache clean --force

docker-build:
	docker build -t atlas-risk-cover .

docker-run:
	docker run -p 80:80 atlas-risk-cover

docker-compose-up:
	docker-compose up -d

docker-compose-down:
	docker-compose down

backup:
	tar -czf backup-$(shell date +%Y%m%d-%H%M%S).tar.gz \
		--exclude=node_modules \
		--exclude=build \
		--exclude=.git \
		.

restore:
	@echo "Usage: make restore FILE=backup-20240101-120000.tar.gz"
	tar -xzf $(FILE)

analyze:
	npm run analyze

lighthouse:
	lighthouse https://atlasriskcover.com \
		--output=html \
		--output-path=./lighthouse-report.html \
		--view