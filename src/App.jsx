import React, { useState, useEffect } from 'react';

const HighLevelWebsite = () => {
  const [currentLang, setCurrentLang] = useState('pt');
  const [portfolioVisible, setPortfolioVisible] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Loading Screen
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language Detection
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || detectLanguage();
    setCurrentLang(savedLang);
  }, []);

  const detectLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  };

  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
  };

  const loadMorePortfolio = () => {
    setPortfolioVisible(prev => Math.min(prev + 2, 6));
  };

  const t = (pt, en) => currentLang === 'pt' ? pt : en;

  const portfolioCases = [
    {
      id: 1,
      emoji: '🦜',
      gradient: 'from-yellow-900/30 to-amber-900/30',
      category: t('Imobiliárias', 'Real Estate'),
      name: 'Patabrava Imobiliária',
      location: 'Lisboa, Portugal',
      highlight: t('+380% em leads qualificados', '+380% qualified leads'),
      badge: '⭐ Destaque',
      metrics: [
        { value: '+380%', label: 'Leads' },
        { value: '8.2%', label: t('Conversão', 'Conv.') },
        { value: '6.8x', label: 'ROI' }
      ],
      description: t(
        'Através de campanhas Google Ads otimizadas e estratégia de SEO local em Lisboa, aumentamos drasticamente a geração de leads qualificados para imóveis de luxo.',
        'Through optimized Google Ads campaigns and local SEO strategy in Lisbon, we drastically increased the generation of qualified leads for luxury properties.'
      )
    },
    {
      id: 2,
      emoji: '🎓',
      gradient: 'from-blue-900/30 to-indigo-900/30',
      category: t('Educação', 'Education'),
      name: 'Instituto Genária',
      location: 'Viana do Castelo',
      highlight: t('+168% em matrículas', '+168% enrollments'),
      metrics: [
        { value: '+168%', label: t('Matrículas', 'Enroll.') },
        { value: '420', label: t('Visitas', 'Visits') },
        { value: '38%', label: t('Conversão', 'Conv.') }
      ],
      description: t(
        'Campanha integrada de Facebook Ads e Google Ads focada em captação de alunos no norte de Portugal, com landing pages otimizadas para conversão.',
        'Integrated Facebook Ads and Google Ads campaign focused on student recruitment in northern Portugal, with landing pages optimized for conversion.'
      )
    },
    {
      id: 3,
      emoji: '🍽️',
      gradient: 'from-amber-900/30 to-orange-900/30',
      category: t('Restauração', 'Restaurants'),
      name: 'Latina Grill',
      location: 'Cascais, Portugal',
      highlight: t('+180% movimento em dias úteis', '+180% weekday traffic'),
      metrics: [
        { value: '+180%', label: t('Movimento', 'Traffic') },
        { value: '+6.2K', label: t('Seguidores', 'Followers') },
        { value: '+185%', label: t('Reservas', 'Bookings') }
      ],
      description: t(
        'Estratégia de social media e Google Meu Negócio focada em aumentar reservas e movimento em dias de menor fluxo em Cascais.',
        'Social media and Google My Business strategy focused on increasing bookings and traffic on slower days in Cascais.'
      )
    },
    {
      id: 4,
      emoji: '💚',
      gradient: 'from-emerald-900/30 to-teal-900/30',
      category: t('Saúde', 'Healthcare'),
      name: 'Clínica Bem Maior',
      location: 'Portugal',
      highlight: t('+265% agendamentos', '+265% appointments'),
      metrics: [
        { value: '+265%', label: t('Agendamentos', 'Appoint.') },
        { value: '980', label: 'WhatsApp/mês' },
        { value: '+48%', label: t('Ticket Médio', 'Avg Ticket') }
      ],
      description: t(
        'Campanhas Google Ads para serviços de saúde com segmentação geográfica precisa e otimização de conversão via WhatsApp.',
        'Google Ads campaigns for healthcare services with precise geographic targeting and WhatsApp conversion optimization.'
      )
    },
    {
      id: 5,
      emoji: '🦉',
      gradient: 'from-orange-900/30 to-blue-900/30',
      category: t('Educação Superior', 'Higher Education'),
      name: 'UNISUAM',
      location: 'Rio de Janeiro, Brasil',
      highlight: t('+220% em inscrições', '+220% applications'),
      metrics: [
        { value: '+220%', label: t('Inscrições', 'Apps') },
        { value: '2.8M', label: t('Alcance', 'Reach') },
        { value: '+87%', label: t('Matrículas', 'Enroll.') }
      ],
      description: t(
        'Campanha de captação de alunos com Facebook Ads e Google Ads, segmentação por interesse e remarketing estratégico.',
        'Student recruitment campaign with Facebook Ads and Google Ads, interest-based targeting and strategic remarketing.'
      )
    },
    {
      id: 6,
      emoji: '🏘️',
      gradient: 'from-red-900/30 to-red-800/30',
      category: t('Imobiliárias', 'Real Estate'),
      name: 'Lúcia Canelas',
      location: 'Portugal',
      highlight: t('Duplicou visitas em 30 dias', 'Doubled visits in 30 days'),
      metrics: [
        { value: '100%', label: t('Visitas', 'Visits') },
        { value: '+250%', label: 'Engagement' },
        { value: '5.4x', label: 'ROAS' }
      ],
      description: t(
        'Estratégia de Instagram e Facebook Ads focada em aumentar visibilidade de imóveis premium e gerar leads qualificados.',
        'Instagram and Facebook Ads strategy focused on increasing visibility of premium properties and generating qualified leads.'
      )
    }
  ];

  const blogPosts = [
    {
      id: 1,
      icon: (
        <svg className="w-24 h-24 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      gradient: 'from-purple-900/50 to-blue-900/50',
      category: 'Google Ads Portugal',
      date: '28 Jan 2026',
      readTime: '12 min',
      title: t(
        'Como Otimizar Campanhas Google Ads em Portugal: Guia Completo 2026',
        'How to Optimize Google Ads Campaigns in Portugal: Complete Guide 2026'
      ),
      description: t(
        'Descubra as melhores práticas para campanhas Google Ads em Portugal. Aprenda sobre Smart Bidding, Performance Max, segmentação por região (Lisboa, Porto, Braga), e como aumentar ROI em campanhas de pesquisa e display para o mercado português.',
        'Discover best practices for Google Ads campaigns in Portugal. Learn about Smart Bidding, Performance Max, regional targeting (Lisbon, Porto, Braga), and how to increase ROI in search and display campaigns for the Portuguese market.'
      ),
      tags: ['Google Ads', 'Performance Max', 'ROI', 'Tráfego Pago PT']
    },
    {
      id: 2,
      icon: (
        <svg className="w-24 h-24 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      gradient: 'from-emerald-900/50 to-teal-900/50',
      category: 'SEO Local Portugal',
      date: '25 Jan 2026',
      readTime: '15 min',
      title: t(
        'SEO Local em Portugal: Como Ranquear no Google em Lisboa, Porto e Outras Cidades',
        'Local SEO in Portugal: How to Rank on Google in Lisbon, Porto and Other Cities'
      ),
      description: t(
        'Estratégias avançadas de SEO local para empresas portuguesas. Aprenda a otimizar Google Meu Negócio, conquistar citações locais, trabalhar keywords geo-localizadas e dominar as pesquisas "perto de mim" nas principais cidades de Portugal.',
        'Advanced local SEO strategies for Portuguese businesses. Learn to optimize Google My Business, earn local citations, work with geo-localized keywords and dominate "near me" searches in major Portuguese cities.'
      ),
      tags: ['SEO Local', 'Google Meu Negócio', 'Rankings PT', 'Citações']
    },
    {
      id: 3,
      icon: (
        <svg className="w-24 h-24 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
        </svg>
      ),
      gradient: 'from-pink-900/50 to-rose-900/50',
      category: 'Facebook Ads PT',
      date: '22 Jan 2026',
      readTime: '18 min',
      title: t(
        'Facebook e Instagram Ads para Empresas Portuguesas: Estratégias 2026',
        'Facebook and Instagram Ads for Portuguese Companies: 2026 Strategies'
      ),
      description: t(
        'Guia definitivo de Meta Ads para o mercado português. Segmentação por localização, comportamento de compra em Portugal, criativos que convertem, Advantage+ Shopping, e como gerar leads qualificados através de Facebook e Instagram Ads.',
        'Definitive Meta Ads guide for the Portuguese market. Location targeting, purchasing behavior in Portugal, converting creatives, Advantage+ Shopping, and how to generate qualified leads through Facebook and Instagram Ads.'
      ),
      tags: ['Facebook Ads', 'Instagram Ads', 'Meta Ads PT', 'Leads']
    },
    {
      id: 4,
      icon: (
        <svg className="w-24 h-24 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      gradient: 'from-amber-900/50 to-orange-900/50',
      category: 'Marketing Performance',
      date: '20 Jan 2026',
      readTime: '14 min',
      title: t(
        'Marketing de Performance em Portugal: Como Medir e Otimizar ROI',
        'Performance Marketing in Portugal: How to Measure and Optimize ROI'
      ),
      description: t(
        'Aprenda a implementar marketing de performance na sua empresa em Portugal. Métricas essenciais, ferramentas de tracking, Google Analytics 4, atribuição multi-touch, e como calcular e melhorar ROI em campanhas digitais.',
        'Learn to implement performance marketing in your Portuguese company. Essential metrics, tracking tools, Google Analytics 4, multi-touch attribution, and how to calculate and improve ROI in digital campaigns.'
      ),
      tags: ['ROI', 'GA4', 'Atribuição', 'Performance']
    },
    {
      id: 5,
      icon: (
        <svg className="w-24 h-24 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
      gradient: 'from-cyan-900/50 to-blue-900/50',
      category: 'Redes Sociais PT',
      date: '18 Jan 2026',
      readTime: '16 min',
      title: t(
        'Gestão de Redes Sociais para Empresas em Portugal: Guia Prático',
        'Social Media Management for Portuguese Companies: Practical Guide'
      ),
      description: t(
        'Estratégias eficazes de social media marketing para o público português. Melhores horários de postagem em Portugal, tipos de conteúdo que geram engagement, ferramentas de gestão, e como transformar seguidores em clientes através de Instagram, Facebook e LinkedIn.',
        'Effective social media marketing strategies for Portuguese audiences. Best posting times in Portugal, content types that generate engagement, management tools, and how to turn followers into customers through Instagram, Facebook and LinkedIn.'
      ),
      tags: ['Social Media', 'Instagram PT', 'Facebook', 'LinkedIn']
    },
    {
      id: 6,
      icon: (
        <svg className="w-24 h-24 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      gradient: 'from-indigo-900/50 to-purple-900/50',
      category: 'Custos e Orçamento',
      date: '15 Jan 2026',
      readTime: '11 min',
      title: t(
        'Quanto Custa Marketing Digital em Portugal? Preços e Investimento 2026',
        'How Much Does Digital Marketing Cost in Portugal? Prices and Investment 2026'
      ),
      description: t(
        'Guia completo sobre custos de marketing digital em Portugal. Quanto investir em Google Ads, Facebook Ads, SEO, gestão de redes sociais e criação de conteúdo. Tabela de preços realista e como calcular budget ideal para sua empresa portuguesa.',
        'Complete guide on digital marketing costs in Portugal. How much to invest in Google Ads, Facebook Ads, SEO, social media management and content creation. Realistic price table and how to calculate ideal budget for your Portuguese company.'
      ),
      tags: ['Preços PT', 'Investimento', 'Budget', 'Custos']
    }
  ];

  const clients = [
    { emoji: '🦜', gradient: 'from-yellow-600 to-amber-700' },
    { emoji: '🎓', gradient: 'from-blue-600 to-indigo-600' },
    { emoji: '🍽️', gradient: 'from-amber-600 to-orange-600' },
    { emoji: '💚', gradient: 'from-emerald-600 to-teal-600' },
    { emoji: '🦉', gradient: 'from-orange-500 to-blue-600' },
    { emoji: '🏘️', gradient: 'from-red-600 to-red-700' },
    { emoji: '🎵', gradient: 'from-purple-600 to-pink-600' },
    { emoji: '🐾', gradient: 'from-green-600 to-emerald-600' },
    { emoji: '🧹', gradient: 'from-blue-600 to-cyan-600' },
    { emoji: '🚗', gradient: 'from-red-600 to-gray-800' }
  ];

  return (
    <div className="antialiased bg-black text-white">
      <style>{`
        * { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        
        /* Loading Screen */
        #loading-screen {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        #loading-screen.loaded {
          opacity: 0;
          pointer-events: none;
        }
        .loader {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(139, 92, 246, 0.1);
          border-top: 4px solid #8b5cf6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        .grid-background {
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-carousel {
          display: flex;
          animation: scroll 40s linear infinite;
        }
        .logo-carousel:hover { animation-play-state: paused; }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        .glitch {
          position: relative;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0.8;
        }
        .glitch::before {
          animation: glitch-1 2s infinite;
          color: #8b5cf6;
          z-index: -1;
        }
        .glitch::after {
          animation: glitch-2 2s infinite;
          color: #6d28d9;
          z-index: -2;
        }
        
        @keyframes mockup-float {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-30px) rotateY(5deg); }
        }
        .mockup-float { animation: mockup-float 6s ease-in-out infinite; }
        
        .gradient-purple { background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #4c1d95 100%); }
        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-effect {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        .neon-text {
          text-shadow: 
            0 0 10px rgba(167, 139, 250, 0.8),
            0 0 20px rgba(139, 92, 246, 0.6),
            0 0 30px rgba(109, 40, 217, 0.4);
        }
        .card-premium { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .card-premium:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 60px rgba(139, 92, 246, 0.4);
        }
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9, #4c1d95);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .btn-premium {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-premium::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .btn-premium:hover::before { width: 300px; height: 300px; }
        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
        }
      `}</style>

      {/* Loading Screen */}
      {isLoading && (
        <div id="loading-screen" className={!isLoading ? 'loaded' : ''}>
          <div className="loader"></div>
          <div style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            HIGH LEVEL
          </div>
          <div style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            {t('Carregando...', 'Loading...')}
          </div>
        </div>
      )}

      {/* Scroll Progress */}
      <div 
        className="fixed top-0 left-0 h-1 z-50"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #8b5cf6, #6d28d9, #a78bfa)'
        }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full glass-effect z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-24">
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 gradient-purple rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-12 h-12 gradient-purple rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-bold gradient-text">High Level</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
                {t('Sobre', 'About')}
              </a>
              <a href="#portfolio" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
                Portfolio
              </a>
              <a href="#blog" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
                Blog
              </a>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => switchLanguage('pt')}
                  className={`px-3 py-2 glass-effect rounded-lg text-sm font-semibold hover:scale-110 transition-transform ${currentLang === 'pt' ? 'gradient-purple' : ''}`}
                >
                  🇵🇹 PT
                </button>
                <button 
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-2 glass-effect rounded-lg text-sm font-semibold hover:scale-110 transition-transform ${currentLang === 'en' ? 'gradient-purple' : ''}`}
                >
                  🇬🇧 EN
                </button>
              </div>
              
              <a href="#contact" className="btn-premium gradient-purple text-white px-6 py-3 rounded-lg font-semibold relative">
                <span className="relative z-10">{t('Contato', 'Contact')}</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 grid-background opacity-20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-6 py-3 glass-effect rounded-full mb-8 pulse-glow">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-purple-300 font-semibold">
                    {t('Marketing de Performance em Portugal', 'Performance Marketing Portugal')}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{t('100+ Clientes', '100+ Clients')}</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                  <span>{t('Marketing Digital', 'Digital Marketing')}</span>
                  <br />
                  <span className="neon-text gradient-text glitch" data-text={t('que Gera Resultados', 'That Delivers Results')}>
                    {t('que Gera Resultados', 'That Delivers Results')}
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
                  {t(
                    'Agência líder em publicidade digital em Portugal. Transformamos investimento em crescimento através de Google Ads, Facebook Ads, SEO e redes sociais. Resultados garantidos em Lisboa, Porto e todo Portugal.',
                    'Leading digital advertising agency in Portugal. We transform investment into growth through Google Ads, Facebook Ads, SEO and social media. Results guaranteed in Lisbon, Porto and throughout Portugal.'
                  )}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <a href="#portfolio" className="btn-premium gradient-purple text-white px-8 py-5 rounded-xl font-bold text-lg inline-flex items-center justify-center group">
                    <span className="relative z-10">{t('Ver Portfolio', 'View Portfolio')}</span>
                    <svg className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </a>
                  <a href="#contact" className="glass-effect text-white px-8 py-5 rounded-xl font-bold text-lg border-2 border-purple-500/30 hover:border-purple-500 transition-all inline-flex items-center justify-center">
                    {t('Consultoria Gratuita', 'Free Consultation')}
                  </a>
                </div>
              </div>
              
              {/* Right Column - Mockups */}
              <div className="relative hidden lg:block">
                <div className="mockup-float relative z-20">
                  <div className="rounded-2xl overflow-hidden shadow-2xl gradient-border">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80" 
                      alt="Analytics Dashboard" 
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                </div>
                
                {/* Floating Stats Cards */}
                <div className="absolute -top-8 right-0 glass-effect rounded-2xl p-5 pulse-glow z-30 float-animation">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 gradient-purple rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-black gradient-text">+380%</div>
                      <div className="text-sm text-gray-400">{t('Crescimento', 'Growth')}</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-1/3 -left-12 glass-effect rounded-2xl p-5 pulse-glow z-30 float-animation" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 gradient-purple rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-black gradient-text">6.8x</div>
                      <div className="text-sm text-gray-400">{t('ROI Médio', 'Avg ROI')}</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8 glass-effect rounded-2xl p-5 pulse-glow z-30 float-animation" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 gradient-purple rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-black gradient-text">100+</div>
                      <div className="text-sm text-gray-400">{t('Clientes', 'Clients')}</div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Mockup */}
                <div className="absolute bottom-0 left-8 mockup-float z-20" style={{ width: '140px', animationDelay: '2s' }}>
                  <div className="rounded-2xl overflow-hidden shadow-2xl gradient-border">
                    <img 
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=700&fit=crop&q=80" 
                      alt="Mobile Analytics" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 grid-background opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="glass-effect rounded-2xl p-8 text-center pulse-glow">
                <div className="text-5xl font-black gradient-text mb-2">100+</div>
                <div className="text-gray-400">{t('Clientes Ativos', 'Active Clients')}</div>
              </div>
              <div className="glass-effect rounded-2xl p-8 text-center pulse-glow">
                <div className="text-5xl font-black gradient-text mb-2">350+</div>
                <div className="text-gray-400">{t('Projetos', 'Projects')}</div>
              </div>
              <div className="glass-effect rounded-2xl p-8 text-center pulse-glow">
                <div className="text-5xl font-black gradient-text mb-2">47K+</div>
                <div className="text-gray-400">{t('Leads Gerados', 'Leads Generated')}</div>
              </div>
              <div className="glass-effect rounded-2xl p-8 text-center pulse-glow">
                <div className="text-5xl font-black gradient-text mb-2">6.8x</div>
                <div className="text-gray-400">{t('ROI Médio', 'Average ROI')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Carousel */}
        <section className="py-16 bg-gray-900/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="gradient-text">{t('Confiado por', 'Trusted By')}</span>
            </h2>
            <p className="text-gray-400 text-center text-lg">
              {t(
                'Empresas líderes em Portugal que transformaram seu marketing digital',
                'Leading companies in Portugal that transformed their digital marketing'
              )}
            </p>
          </div>
          <div className="relative">
            <div className="logo-carousel">
              <div className="flex items-center space-x-12 px-6">
                {[...clients, ...clients].map((client, index) => (
                  <div 
                    key={index}
                    className={`w-32 h-32 rounded-xl bg-gradient-to-br ${client.gradient} flex items-center justify-center text-5xl flex-shrink-0 shadow-2xl`}
                  >
                    {client.emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 relative">
          <div className="absolute inset-0 grid-background opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span>{t('Casos de', 'Success')}</span> <span className="gradient-text">{t('Sucesso', 'Stories')}</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                {t(
                  'Resultados reais de empresas que cresceram com nossas estratégias de marketing digital em Portugal',
                  'Real results from companies that grew with our digital marketing strategies in Portugal'
                )}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {portfolioCases.slice(0, portfolioVisible).map((caseItem) => (
                <div key={caseItem.id} className="gradient-border rounded-3xl overflow-hidden card-premium">
                  <div className={`h-64 bg-gradient-to-br ${caseItem.gradient} flex items-center justify-center`}>
                    <span className="text-9xl">{caseItem.emoji}</span>
                  </div>
                  <div className="p-8 bg-gradient-to-b from-gray-900 to-black">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 gradient-purple text-white text-xs font-bold rounded-full">
                        {caseItem.category}
                      </span>
                      {caseItem.badge && (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/30">
                          {caseItem.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{caseItem.name}</h3>
                    <p className="text-gray-400 mb-4 text-lg">{caseItem.location}</p>
                    <div className="gradient-purple rounded-xl p-5 mb-6">
                      <p className="text-white font-bold text-center text-lg">{caseItem.highlight}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {caseItem.metrics.map((metric, idx) => (
                        <div key={idx} className="glass-effect rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                          <div className="text-sm text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">{caseItem.description}</p>
                    <a href="#contact" className="text-purple-400 font-semibold hover:text-purple-300 inline-flex items-center text-lg">
                      {t('Ver case completo', 'View full case')}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {portfolioVisible < portfolioCases.length && (
              <div className="text-center">
                <button 
                  onClick={loadMorePortfolio}
                  className="btn-premium gradient-purple text-white px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center"
                >
                  <span className="relative z-10">{t('Ver Mais Cases', 'View More Cases')}</span>
                  <svg className="w-5 h-5 ml-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-32 relative bg-gray-900/30">
          <div className="absolute inset-0 grid-background opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="gradient-text">Blog</span> <span>{t('Marketing Digital', 'Marketing Digital')}</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                {t(
                  'Guia completo sobre publicidade digital e estratégias de marketing em Portugal',
                  'Complete guide on digital advertising and marketing strategies in Portugal'
                )}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="gradient-border rounded-3xl overflow-hidden card-premium">
                  <div className={`h-56 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                    {post.icon}
                  </div>
                  <div className="p-8 bg-gradient-to-b from-gray-900 to-black">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 gradient-purple text-white text-xs font-bold rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-400">{post.readTime} • {post.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{post.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{post.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 glass-effect rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#contact" className="text-purple-400 font-semibold hover:text-purple-300 inline-flex items-center">
                      {t('Ler artigo completo', 'Read full article')}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 gradient-purple opacity-20"></div>
          <div className="absolute inset-0 grid-background"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-effect rounded-3xl p-16 pulse-glow">
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                <span>{t('Pronto para', 'Ready to')}</span>{' '}
                <span className="gradient-text">{t('Crescer o Seu Negócio', 'Grow Your Business')}</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                {t(
                  'Agende uma consulta gratuita com nossos especialistas em marketing digital em Portugal e descubra como transformar sua presença online em crescimento real e mensurável.',
                  'Schedule a free consultation with our digital marketing experts in Portugal and discover how to transform your online presence into real, measurable growth.'
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a 
                  href="mailto:vinicius.highlevelmkt@gmail.com?subject=Quero%20crescer%20meu%20negócio%20com%20marketing%20digital&body=Olá!%20Vi%20o%20site%20da%20High%20Level%20e%20gostaria%20de%20agendar%20uma%20consulta%20gratuita."
                  className="btn-premium gradient-purple text-white px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center justify-center group"
                >
                  <svg className="w-6 h-6 mr-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="relative z-10">{t('Enviar Email', 'Email Us')}</span>
                </a>
                
                <a 
                  href="https://wa.me/351934071660?text=Olá!%20Vi%20o%20site%20da%20High%20Level%20e%20quero%20saber%20mais."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect text-white px-10 py-5 rounded-xl font-bold text-lg border-2 border-green-500 hover:bg-green-500 transition-all inline-flex items-center justify-center group"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300 mb-12">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('Diagnóstico Gratuito', 'Free Diagnostic')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('Sem Contratos Longos', 'No Long Contracts')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{t('Resultados em 60-90 Dias', 'Results in 60-90 Days')}</span>
                </div>
              </div>
              
              <div className="border-t border-purple-500/30 pt-8 text-gray-300">
                <p className="mb-3 text-lg">
                  📧 <a href="mailto:vinicius.highlevelmkt@gmail.com" className="hover:text-purple-400 transition-colors">
                    vinicius.highlevelmkt@gmail.com
                  </a>
                </p>
                <p className="mb-3 text-lg">
                  📱 <a href="tel:+351934071660" className="hover:text-purple-400 transition-colors">
                    +351 934 071 660
                  </a>
                </p>
                <p className="text-lg">
                  📷 <a href="https://www.instagram.com/mkthighlevel/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                    @mkthighlevel
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 relative border-t border-purple-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="gradient-purple w-10 h-10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <span className="text-xl font-bold gradient-text">High Level</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {t(
                    'Agência de marketing digital líder em Portugal especializada em resultados mensuráveis e ROI.',
                    'Leading digital marketing agency in Portugal specialized in measurable results and ROI.'
                  )}
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/mkthighlevel/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-6 text-lg">{t('Serviços', 'Services')}</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">Google Ads Portugal</a></li>
                  <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">Facebook & Instagram Ads</a></li>
                  <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">SEO Local Portugal</a></li>
                  <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">{t('Gestão Redes Sociais', 'Social Media Management')}</a></li>
                  <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">{t('Criação de Conteúdo', 'Content Creation')}</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-6 text-lg">{t('Empresa', 'Company')}</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#about" className="hover:text-purple-400 transition-colors">{t('Sobre', 'About')}</a></li>
                  <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</a></li>
                  <li><a href="#blog" className="hover:text-purple-400 transition-colors">Blog</a></li>
                  <li><a href="#contact" className="hover:text-purple-400 transition-colors">{t('Contato', 'Contact')}</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-6 text-lg">{t('Contato', 'Contact')}</h4>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <a href="tel:+351934071660" className="hover:text-purple-400 transition-colors">
                      +351 934 071 660
                    </a>
                  </li>
                  <li>
                    <a href="mailto:vinicius.highlevelmkt@gmail.com" className="hover:text-purple-400 transition-colors">
                      vinicius.highlevelmkt@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/mkthighlevel/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                      @mkthighlevel
                    </a>
                  </li>
                  <li className="pt-2">
                    <span className="text-sm text-gray-500">Lisboa, Portugal</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-purple-900/30 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                {t(
                  '© 2026 High Level Marketing Digital. Todos os direitos reservados. • Agência de Publicidade Digital em Portugal • 100+ Clientes • €8.2M+ Gerados',
                  '© 2026 High Level Marketing Digital. All rights reserved. • Digital Advertising Agency in Portugal • 100+ Clients • €8.2M+ Generated'
                )}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HighLevelWebsite;
