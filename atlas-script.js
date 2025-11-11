// ============================================
// ATLAS RISK COVER - JAVASCRIPT COMPLET
// ============================================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Configuration ========== 
    const config = {
        scrollOffset: 100,
        animationDuration: 300,
        apiEndpoint: '/api/v1/',
        contactEmail: 'contact@atlasriskcover.com',
        phoneNumber: '+33 6 08 81 96 52'
    };

    // ========== Header Scroll Effect ==========
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ajouter la classe scrolled quand on scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Header hide/show sur scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ========== Mobile Menu ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Fermer le menu mobile au clic sur un lien
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // ========== Smooth Scrolling ==========
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Scroll to Top Button ==========
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== Animation on Scroll ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.section-card, .highlight-box, .solution-card, .stat-card');
    animatedElements.forEach(el => observer.observe(el));

    // ========== Formulaire de Contact ==========
    class ContactForm {
        constructor(formElement) {
            this.form = formElement;
            this.init();
        }

        init() {
            if (!this.form) return;
            
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.addValidation();
        }

        addValidation() {
            const inputs = this.form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }

        validateField(field) {
            const value = field.value.trim();
            const type = field.type;
            const required = field.hasAttribute('required');
            
            if (required && !value) {
                this.showError(field, 'Ce champ est requis');
                return false;
            }
            
            if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showError(field, 'Email invalide');
                    return false;
                }
            }
            
            if (type === 'tel' && value) {
                const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
                if (!phoneRegex.test(value)) {
                    this.showError(field, 'Numéro de téléphone invalide');
                    return false;
                }
            }
            
            return true;
        }

        showError(field, message) {
            this.clearError(field);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            field.parentElement.appendChild(errorDiv);
            field.classList.add('error');
        }

        clearError(field) {
            field.classList.remove('error');
            const errorDiv = field.parentElement.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }

        async handleSubmit(e) {
            e.preventDefault();
            
            const inputs = this.form.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            // Afficher le loader
            this.showLoader();
            
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            try {
                // Simuler l'envoi (remplacer par votre API)
                await this.sendData(data);
                this.showSuccess();
                this.form.reset();
            } catch (error) {
                this.showError(null, 'Erreur lors de l\'envoi. Veuillez réessayer.');
                console.error('Erreur:', error);
            } finally {
                this.hideLoader();
            }
        }

        async sendData(data) {
            // Simulation d'envoi (remplacer par votre vraie API)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('Données envoyées:', data);
                    resolve({ success: true });
                }, 1500);
            });
        }

        showLoader() {
            const submitBtn = this.form.querySelector('[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Envoi en cours...';
            }
        }

        hideLoader() {
            const submitBtn = this.form.querySelector('[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }
        }

        showSuccess() {
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.textContent = 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
            this.form.appendChild(successDiv);
            
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }
    }

    // Initialiser le formulaire de contact
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        new ContactForm(contactForm);
    }

    // ========== Calculateur de Devis ==========
    class QuoteCalculator {
        constructor() {
            this.baseRates = {
                'sante-international': { min: 150, max: 500 },
                'rc-pro': { min: 100, max: 800 },
                'deplacements-pro': { min: 50, max: 300 },
                'cyber-risk': { min: 200, max: 1500 },
                'kidnapping': { min: 500, max: 3000 },
                'violences-politiques': { min: 300, max: 2000 },
                'multirisque': { min: 150, max: 1000 }
            };
            this.init();
        }

        init() {
            const calculatorForm = document.querySelector('#quote-calculator');
            if (!calculatorForm) return;
            
            calculatorForm.addEventListener('input', () => this.calculateQuote());
            calculatorForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        calculateQuote() {
            const form = document.querySelector('#quote-calculator');
            const solutionType = form.querySelector('[name="solution"]')?.value;
            const employees = parseInt(form.querySelector('[name="employees"]')?.value) || 1;
            const coverage = form.querySelector('[name="coverage"]')?.value || 'basic';
            const duration = parseInt(form.querySelector('[name="duration"]')?.value) || 12;
            
            if (!solutionType || !this.baseRates[solutionType]) return;
            
            const baseRate = this.baseRates[solutionType];
            let monthlyRate = baseRate.min;
            
            // Ajustements selon les options
            if (coverage === 'premium') {
                monthlyRate = baseRate.max;
            } else if (coverage === 'standard') {
                monthlyRate = (baseRate.min + baseRate.max) / 2;
            }
            
            // Ajustement selon le nombre d'employés
            let multiplier = 1;
            if (employees > 10) multiplier = 0.9;
            if (employees > 50) multiplier = 0.85;
            if (employees > 100) multiplier = 0.8;
            
            const totalMonthly = monthlyRate * employees * multiplier;
            const totalAnnual = totalMonthly * duration;
            
            // Afficher les résultats
            this.displayQuote(totalMonthly, totalAnnual);
        }

        displayQuote(monthly, annual) {
            const resultDiv = document.querySelector('#quote-result');
            if (!resultDiv) return;
            
            resultDiv.innerHTML = `
                <div class="quote-summary">
                    <h3>Estimation de votre prime</h3>
                    <div class="quote-details">
                        <div class="quote-item">
                            <span class="quote-label">Prime mensuelle:</span>
                            <span class="quote-value">${monthly.toFixed(2)} €</span>
                        </div>
                        <div class="quote-item">
                            <span class="quote-label">Prime annuelle:</span>
                            <span class="quote-value">${annual.toFixed(2)} €</span>
                        </div>
                    </div>
                    <p class="quote-disclaimer">
                        * Cette estimation est indicative. Un devis personnalisé sera établi après analyse de vos besoins spécifiques.
                    </p>
                </div>
            `;
            
            resultDiv.classList.add('visible');
        }

        handleSubmit(e) {
            e.preventDefault();
            // Rediriger vers le formulaire de contact avec les données pré-remplies
            const formData = new FormData(e.target);
            const params = new URLSearchParams(formData);
            window.location.href = `/contact?${params.toString()}`;
        }
    }

    // Initialiser le calculateur
    new QuoteCalculator();

    // ========== Tabs Navigation ==========
    class TabsManager {
        constructor() {
            this.init();
        }

        init() {
            const tabContainers = document.querySelectorAll('.tabs-container');
            tabContainers.forEach(container => this.setupTabs(container));
        }

        setupTabs(container) {
            const tabs = container.querySelectorAll('.tab-button');
            const panels = container.querySelectorAll('.tab-panel');
            
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    // Retirer les classes actives
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    
                    // Ajouter les classes actives
                    tab.classList.add('active');
                    if (panels[index]) {
                        panels[index].classList.add('active');
                    }
                });
            });
        }
    }

    // Initialiser les tabs
    new TabsManager();

    // ========== Accordéon FAQ ==========
    class Accordion {
        constructor() {
            this.init();
        }

        init() {
            const accordions = document.querySelectorAll('.accordion-item');
            
            accordions.forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                
                if (!header || !content) return;
                
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Fermer tous les autres accordéons
                    accordions.forEach(acc => {
                        acc.classList.remove('active');
                        const accContent = acc.querySelector('.accordion-content');
                        if (accContent) accContent.style.maxHeight = null;
                    });
                    
                    // Toggle l'accordéon actuel
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            });
        }
    }

    // Initialiser l'accordéon
    new Accordion();

    // ========== Slider/Carousel ==========
    class Carousel {
        constructor(element) {
            this.carousel = element;
            this.slides = element.querySelectorAll('.carousel-slide');
            this.currentSlide = 0;
            this.init();
        }

        init() {
            if (!this.carousel || this.slides.length === 0) return;
            
            this.createControls();
            this.createIndicators();
            this.showSlide(0);
            this.startAutoPlay();
        }

        createControls() {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-prev';
            prevBtn.innerHTML = '‹';
            prevBtn.addEventListener('click', () => this.prevSlide());
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-next';
            nextBtn.innerHTML = '›';
            nextBtn.addEventListener('click', () => this.nextSlide());
            
            this.carousel.appendChild(prevBtn);
            this.carousel.appendChild(nextBtn);
        }

        createIndicators() {
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'carousel-indicators';
            
            this.slides.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                indicator.addEventListener('click', () => this.showSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
            
            this.carousel.appendChild(indicatorsContainer);
            this.indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        }

        showSlide(index) {
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.indicators.forEach(ind => ind.classList.remove('active'));
            
            this.currentSlide = index;
            this.slides[index].classList.add('active');
            this.indicators[index].classList.add('active');
        }

        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
        }

        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
        }

        startAutoPlay() {
            setInterval(() => this.nextSlide(), 5000);
        }
    }

    // Initialiser les carousels
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));

    // ========== Loading Screen ==========
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }, 500);
        }
    });

    // ========== Copy to Clipboard ==========
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copié !';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

    // ========== Analytics Tracking ==========
    class Analytics {
        static track(event, data = {}) {
            // Intégration avec Google Analytics, Matomo, etc.
            if (typeof gtag !== 'undefined') {
                gtag('event', event, data);
            }
            console.log('Analytics Event:', event, data);
        }
    }

    // Tracker les clics sur les boutons importants
    document.querySelectorAll('.btn-primary, .btn-devis').forEach(btn => {
        btn.addEventListener('click', function() {
            Analytics.track('button_click', {
                button_text: this.textContent,
                button_url: this.href || 'no-href'
            });
        });
    });

    // ========== Cookies Consent ==========
    class CookieConsent {
        constructor() {
            this.cookieName = 'atlas_cookie_consent';
            this.init();
        }

        init() {
            if (!this.hasConsent()) {
                this.showBanner();
            }
        }

        hasConsent() {
            return localStorage.getItem(this.cookieName) === 'accepted';
        }

        showBanner() {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-content">
                    <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de cookies.</p>
                    <div class="cookie-actions">
                        <button class="btn btn-secondary" id="cookie-reject">Refuser</button>
                        <button class="btn btn-primary" id="cookie-accept">Accepter</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(banner);
            
            document.getElementById('cookie-accept').addEventListener('click', () => {
                this.accept();
                banner.remove();
            });
            
            document.getElementById('cookie-reject').addEventListener('click', () => {
                this.reject();
                banner.remove();
            });
        }

        accept() {
            localStorage.setItem(this.cookieName, 'accepted');
            this.loadScripts();
        }

        reject() {
            localStorage.setItem(this.cookieName, 'rejected');
        }

        loadScripts() {
            // Charger les scripts d'analytics après acceptation
            console.log('Loading analytics scripts...');
        }
    }

    // Initialiser le consentement cookies
    new CookieConsent();

    // ========== Print Styles ==========
    window.addEventListener('beforeprint', () => {
        document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
    });

    console.log('ATLAS Risk Cover - Site initialized successfully');
});