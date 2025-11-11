# ATLAS Risk Cover - Site Web Solutions d'Assurance Internationale

![ATLAS Risk Cover](https://img.shields.io/badge/Version-2.0.0-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-green)
![License](https://img.shields.io/badge/License-Proprietary-red)

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Personnalisation](#personnalisation)
- [Technologies utilisées](#technologies-utilisées)
- [Documentation API](#documentation-api)
- [Déploiement](#déploiement)
- [Support](#support)

## 🎯 À propos

Site web complet pour ATLAS Risk Cover, cabinet de courtage en assurance indépendant spécialisé dans la gestion des risques liés à l'activité internationale. Le site présente 16 solutions d'assurance détaillées avec un design moderne et responsive.

### Objectifs
- ✅ Présenter clairement les solutions d'assurance
- ✅ Générer des leads qualifiés
- ✅ Optimiser l'expérience utilisateur
- ✅ Améliorer le référencement naturel

## ⚡ Fonctionnalités

### Core Features
- 🏢 **16 Solutions complètes** : Contenu détaillé pour chaque catégorie
- 📱 **Design Responsive** : Optimisé mobile, tablette et desktop
- 🎨 **Animations fluides** : Interactions utilisateur engageantes
- 🔍 **SEO optimisé** : Meta tags et structure sémantique
- 📊 **Calculateur de devis** : Estimation instantanée des primes
- 📧 **Formulaire de contact** : Validation temps réel
- 🍪 **Gestion des cookies** : Conformité RGPD

### Solutions Professionnelles
1. Santé & Prévoyance International
2. Responsabilité Civile Professionnelle
3. Déplacements Professionnels
4. Cyber Risk & Sécurité Numérique
5. Kidnapping, Rançon & Extorsion
6. Violences Politiques
7. Rachat du Risque de Guerre
8. Multirisque Professionnelle
9. Assurance de l'Événementiel
10. Paramétrique & Climat
11. Responsabilité des Dirigeants

### Solutions Particuliers
12. Santé & Prévoyance (Expatriés)
13. Voyages Touristiques & Globe-trotter

### Services
14. Audit d'Assurance
15. Co-courtage
16. Formation Sûreté-Sécurité

## 📁 Structure du projet

```
atlas-risk-cover/
├── 📂 html/
│   ├── atlas-index.html                 # Page d'accueil
│   └── atlas-solutions-professionnels.html # Solutions pro
├── 📂 css/
│   └── atlas-styles.css                 # Styles complets
├── 📂 js/
│   └── atlas-script.js                  # JavaScript vanilla
├── 📂 react/
│   └── AtlasRiskCover.jsx              # Composants React
├── 📂 content/
│   └── atlas-risk-cover-contenu-complet.md # Contenu marketing
├── 📂 assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── README.md
```

## 🚀 Installation

### Option 1: HTML/CSS/JS Vanilla

```bash
# Cloner le repository
git clone https://github.com/votre-username/atlas-risk-cover.git
cd atlas-risk-cover

# Ouvrir dans le navigateur
open html/atlas-index.html
```

### Option 2: React Application

```bash
# Cloner le repository
git clone https://github.com/votre-username/atlas-risk-cover.git
cd atlas-risk-cover

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start

# Build pour production
npm run build
```

### Option 3: Docker

```bash
# Construire l'image
docker build -t atlas-risk-cover .

# Lancer le container
docker run -p 3000:80 atlas-risk-cover
```

## 💻 Utilisation

### Intégration HTML de base

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>ATLAS Risk Cover</title>
    <link rel="stylesheet" href="css/atlas-styles.css">
</head>
<body>
    <!-- Inclure le HTML -->
    <div id="atlas-content"></div>
    
    <script src="js/atlas-script.js"></script>
</body>
</html>
```

### Intégration React

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import AtlasRiskCover from './components/AtlasRiskCover';
import './styles/atlas-styles.css';

ReactDOM.render(
    <AtlasRiskCover />,
    document.getElementById('root')
);
```

### Configuration API

```javascript
// Configuration dans atlas-script.js
const config = {
    apiEndpoint: 'https://api.atlasriskcover.com/v1/',
    contactEmail: 'contact@atlasriskcover.com',
    phoneNumber: '+33 6 08 81 96 52',
    googleAnalyticsId: 'UA-XXXXXXXXX-X'
};
```

## 🎨 Personnalisation

### Variables CSS

```css
/* Modifier les couleurs dans atlas-styles.css */
:root {
    --primary-blue: #1a2332;
    --accent-orange: #ff9933;
    --accent-yellow: #ffcc33;
    /* ... autres variables */
}
```

### Ajouter une nouvelle solution

```javascript
// Dans SolutionsGrid component
const solutions = {
    professionnels: [
        {
            id: 'nouvelle-solution',
            title: 'Nouvelle Solution',
            description: 'Description...',
            icon: '🆕',
            features: ['Feature 1', 'Feature 2']
        }
    ]
};
```

## 🛠 Technologies utilisées

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework**: React 18.x (optionnel)
- **CSS**: Flexbox, Grid, Animations CSS3
- **Build Tools**: Webpack, Babel
- **Package Manager**: npm / yarn
- **Version Control**: Git

## 📡 Documentation API

### Endpoint Devis

```http
POST /api/v1/quote
Content-Type: application/json

{
    "solution": "cyber-risk",
    "employees": 50,
    "coverage": "premium",
    "duration": 12
}
```

### Endpoint Contact

```http
POST /api/v1/contact
Content-Type: application/json

{
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33612345678",
    "company": "Entreprise SA",
    "message": "Demande de devis..."
}
```

## 🚢 Déploiement

### Netlify

```bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Vercel

```bash
vercel --prod
```

### Apache/Nginx

```nginx
server {
    listen 80;
    server_name atlasriskcover.com;
    root /var/www/atlas-risk-cover;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📊 Analytics & SEO

### Google Analytics

```html
<!-- Ajouter avant </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXXXXXX-X');
</script>
```

### Meta Tags SEO

```html
<meta name="description" content="ATLAS Risk Cover - Solutions d'assurance internationale">
<meta name="keywords" content="assurance, international, expatriés, entreprises">
<meta property="og:title" content="ATLAS Risk Cover">
<meta property="og:description" content="Cabinet de courtage en assurance internationale">
<meta property="og:image" content="https://atlasriskcover.com/og-image.jpg">
```

## 🐛 Debugging

```javascript
// Activer le mode debug
localStorage.setItem('atlas_debug', 'true');

// Voir les logs dans la console
if (localStorage.getItem('atlas_debug') === 'true') {
    console.log('Debug mode activated');
}
```

## 📝 Checklist de déploiement

- [ ] Minifier CSS et JS
- [ ] Optimiser les images
- [ ] Configurer SSL/HTTPS
- [ ] Tester sur tous les navigateurs
- [ ] Vérifier la responsivité
- [ ] Configurer les redirections
- [ ] Mettre en place le monitoring
- [ ] Sauvegarder la base de données
- [ ] Configurer les emails transactionnels
- [ ] Tester les formulaires

## 📞 Support

**Email**: contact@atlasriskcover.com  
**Téléphone**: +33 6 08 81 96 52  
**Adresse**: 17, rue Océane, 44800 Saint-Herblain, France

## 📄 License

Copyright © 2024 ATLAS Risk Cover. Tous droits réservés.

---

**Développé avec ❤️ pour ATLAS Risk Cover**