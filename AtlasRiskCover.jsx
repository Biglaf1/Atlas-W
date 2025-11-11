import React, { useState, useEffect } from 'react';
import './Atlas.css';

// ============================================
// COMPOSANT PRINCIPAL - ATLAS RISK COVER
// ============================================

const AtlasRiskCover = () => {
  const [activeCategory, setActiveCategory] = useState('professionnels');
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="atlas-app">
      <Header 
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <HeroSection />
        <CategoryTabs 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <SolutionsGrid 
          category={activeCategory}
          onSelectSolution={setSelectedSolution}
        />
        {selectedSolution && (
          <SolutionDetail 
            solution={selectedSolution}
            onClose={() => setSelectedSolution(null)}
          />
        )}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

// ============================================
// COMPOSANT HEADER
// ============================================

const Header = ({ scrolled, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <Logo />
        <DesktopMenu />
        <MobileMenuToggle 
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
        />
        <CTAButton />
      </nav>
      <MobileMenu isOpen={isMenuOpen} />
    </header>
  );
};

const Logo = () => (
  <a href="/" className="logo">
    <div className="logo-icon">A</div>
    <div>
      <div className="logo-text">ATLAS</div>
      <div className="logo-subtitle">RISK COVER</div>
    </div>
  </a>
);

const DesktopMenu = () => {
  const menuItems = [
    {
      label: 'Solutions',
      submenu: [
        'Santé International',
        'RC Professionnelle',
        'Déplacements Pro',
        'Cyber Risk',
        'Kidnapping & Rançon',
        'Violences Politiques'
      ]
    },
    {
      label: 'Expertise',
      submenu: [
        'Audit d\'Assurance',
        'Co-courtage',
        'Formation Sûreté'
      ]
    },
    {
      label: 'À Propos',
      submenu: [
        'Qui sommes-nous',
        'Notre mission',
        'L\'équipe ARC'
      ]
    },
    { label: 'Contact', link: '#contact' }
  ];

  return (
    <ul className="nav-menu desktop-only">
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </ul>
  );
};

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li 
      className="nav-item"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a href={item.link || '#'}>{item.label}</a>
      {item.submenu && isOpen && (
        <div className="dropdown-content">
          {item.submenu.map((subitem, index) => (
            <a key={index} href={`#${subitem.toLowerCase().replace(/\s+/g, '-')}`}>
              {subitem}
            </a>
          ))}
        </div>
      )}
    </li>
  );
};

const MobileMenuToggle = ({ isOpen, setIsOpen }) => (
  <button 
    className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`}
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Menu"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
);

const MobileMenu = ({ isOpen }) => (
  <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
    <ul>
      <li><a href="#solutions">Solutions</a></li>
      <li><a href="#expertise">Expertise</a></li>
      <li><a href="#about">À Propos</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
);

const CTAButton = () => (
  <a href="#devis" className="btn-devis desktop-only">
    Demander un devis
  </a>
);

// ============================================
// COMPOSANT HERO SECTION
// ============================================

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="category-badge">SOLUTIONS D'ASSURANCE INTERNATIONALE</div>
      <h1 className="hero-title">Protégez votre activité mondiale</h1>
      <h2 className="hero-subtitle">L'Humain au Centre de l'Assurance</h2>
      <p className="hero-description">
        Cabinet de courtage indépendant spécialisé dans la gestion des risques 
        internationaux. Solutions sur-mesure pour entreprises, ONG, expatriés 
        et professionnels mobiles.
      </p>
      <div className="hero-actions">
        <button className="btn btn-primary">Découvrir nos solutions</button>
        <button className="btn btn-secondary">Parler à un expert</button>
      </div>
    </section>
  );
};

// ============================================
// COMPOSANT TABS DE CATÉGORIES
// ============================================

const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'professionnels', label: 'Solutions Professionnelles', icon: '🏢' },
    { id: 'particuliers', label: 'Solutions Particuliers', icon: '👤' },
    { id: 'services', label: 'Services & Expertise', icon: '🔧' }
  ];

  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`tab-button ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => setActiveCategory(cat.id)}
        >
          <span className="tab-icon">{cat.icon}</span>
          <span className="tab-label">{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

// ============================================
// COMPOSANT GRILLE DE SOLUTIONS
// ============================================

const SolutionsGrid = ({ category, onSelectSolution }) => {
  const solutions = {
    professionnels: [
      {
        id: 'sante-international',
        title: 'Santé & Prévoyance International',
        description: 'Protection santé mondiale pour vos équipes expatriées',
        icon: '🏥',
        features: [
          'Soins illimités dans 190 pays',
          'Évacuation sanitaire d\'urgence',
          'Téléconsultation 24/7',
          'Couverture famille incluse'
        ]
      },
      {
        id: 'rc-pro',
        title: 'Responsabilité Civile Pro',
        description: 'Protection juridique contre les erreurs professionnelles',
        icon: '⚖️',
        features: [
          'Défense juridique illimitée',
          'Indemnisation jusqu\'à 10M€',
          'Cyber-responsabilité incluse',
          'Extension mondiale'
        ]
      },
      {
        id: 'deplacements-pro',
        title: 'Déplacements Professionnels',
        description: 'Sécurisez la mobilité de vos collaborateurs',
        icon: '✈️',
        features: [
          'Travel risk management',
          'Assistance médicale premium',
          'Extraction d\'urgence',
          'Formation pré-départ'
        ]
      },
      {
        id: 'cyber-risk',
        title: 'Cyber Risk & Sécurité',
        description: 'Protection 360° contre les cybermenaces',
        icon: '🔒',
        features: [
          'Response team 24/7',
          'Restauration IT complète',
          'Gestion RGPD/NIS2',
          'Négociation ransomware'
        ]
      },
      {
        id: 'kidnapping',
        title: 'Kidnapping & Rançon',
        description: 'Protection discrète pour situations extrêmes',
        icon: '🚨',
        features: [
          'Négociateurs experts',
          'Paiement rançon sécurisé',
          'Support psychologique',
          'Intelligence préventive'
        ]
      },
      {
        id: 'violences-politiques',
        title: 'Violences Politiques',
        description: 'Continuité en environnement instable',
        icon: '🌍',
        features: [
          'Dommages guerre/terrorisme',
          'Pertes exploitation 48 mois',
          'Évacuation définitive',
          'Risques souverains'
        ]
      }
    ],
    particuliers: [
      {
        id: 'sante-expat',
        title: 'Santé Expatrié & Famille',
        description: 'Couverture santé flexible pour votre famille',
        icon: '👨‍👩‍👧‍👦',
        features: [
          'Réseau médical premium',
          'Flexibilité géographique',
          'App mobile intuitive',
          'Maternité dès J1'
        ]
      },
      {
        id: 'voyage-tourisme',
        title: 'Voyage & Globe-trotter',
        description: 'L\'aventure en toute sérénité',
        icon: '🌎',
        features: [
          'Annulation toutes causes',
          'Médical illimité',
          'Bagages & équipements',
          'Assistance 24/7'
        ]
      }
    ],
    services: [
      {
        id: 'audit',
        title: 'Audit d\'Assurance',
        description: 'Diagnostic expert de vos couvertures',
        icon: '📊',
        features: [
          'Analyse 127 points',
          'Benchmark sectoriel',
          'Économies 15-25%',
          'Plan action priorisé'
        ]
      },
      {
        id: 'co-courtage',
        title: 'Co-courtage',
        description: 'Accès aux marchés spécialisés',
        icon: '🤝',
        features: [
          'Lloyd\'s de Londres',
          'Capacités augmentées',
          'Expertise sectorielle',
          'Innovation produit'
        ]
      },
      {
        id: 'formation',
        title: 'Formation Sûreté',
        description: 'Développez votre culture sécurité',
        icon: '🎓',
        features: [
          'Formation HEAT',
          'Simulation de crise',
          'Intelligence sécuritaire',
          'Support 24/7'
        ]
      }
    ]
  };

  const currentSolutions = solutions[category] || [];

  return (
    <div className="solutions-grid">
      {currentSolutions.map(solution => (
        <SolutionCard 
          key={solution.id}
          solution={solution}
          onSelect={onSelectSolution}
        />
      ))}
    </div>
  );
};

// ============================================
// COMPOSANT CARTE DE SOLUTION
// ============================================

const SolutionCard = ({ solution, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`solution-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(solution)}
    >
      <div className="solution-icon">{solution.icon}</div>
      <h3 className="solution-title">{solution.title}</h3>
      <p className="solution-description">{solution.description}</p>
      <ul className="solution-features">
        {solution.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="solution-link">
        En savoir plus →
      </button>
    </div>
  );
};

// ============================================
// COMPOSANT DÉTAIL DE SOLUTION
// ============================================

const SolutionDetail = ({ solution, onClose }) => {
  if (!solution) return null;

  return (
    <div className="solution-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="solution-icon-large">{solution.icon}</div>
          <h2>{solution.title}</h2>
        </div>
        <div className="modal-body">
          <p className="solution-full-description">
            {solution.description}
          </p>
          <h3>Caractéristiques principales :</h3>
          <ul className="detailed-features">
            {solution.features.map((feature, index) => (
              <li key={index}>
                <strong>{feature}</strong>
                <p>Description détaillée de cette caractéristique...</p>
              </li>
            ))}
          </ul>
          <div className="modal-actions">
            <button className="btn btn-primary">Demander un devis</button>
            <button className="btn btn-secondary">Télécharger la brochure</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT SECTION CONTACT
// ============================================

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Logique d'envoi du formulaire
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Contactez nos experts</h2>
      <p className="contact-subtitle">
        Obtenez une consultation gratuite et un devis personnalisé
      </p>
      
      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom complet"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
          <textarea
            placeholder="Votre message"
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Envoyer le message
          </button>
        </form>
        
        <div className="contact-info">
          <div className="contact-card">
            <span className="contact-icon">📧</span>
            <h4>Email</h4>
            <p>contact@atlasriskcover.com</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">📱</span>
            <h4>Téléphone</h4>
            <p>+33 6 08 81 96 52</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">📍</span>
            <h4>Adresse</h4>
            <p>17, rue Océane<br/>44800 Saint-Herblain, France</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPOSANT FOOTER
// ============================================

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Solutions</h4>
          <ul>
            <li><a href="#sante">Santé International</a></li>
            <li><a href="#rc-pro">RC Professionnelle</a></li>
            <li><a href="#cyber">Cyber Risk</a></li>
            <li><a href="#deplacements">Déplacements Pro</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="#audit">Audit d'Assurance</a></li>
            <li><a href="#co-courtage">Co-courtage</a></li>
            <li><a href="#formation">Formation Sûreté</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>À Propos</h4>
          <ul>
            <li><a href="#mission">Notre Mission</a></li>
            <li><a href="#equipe">L'Équipe</a></li>
            <li><a href="#valeurs">Nos Valeurs</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Légal</h4>
          <ul>
            <li><a href="#mentions">Mentions Légales</a></li>
            <li><a href="#cgv">CGV</a></li>
            <li><a href="#confidentialite">Confidentialité</a></li>
            <li><a href="#orias">ORIAS</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 ATLAS Risk Cover - L'Humain au Centre de l'Assurance</p>
      </div>
    </footer>
  );
};

export default AtlasRiskCover;