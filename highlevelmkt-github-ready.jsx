import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { 
  Star, Target, TrendingUp, Award, Phone, Mail, MapPin, 
  ArrowRight, Check, ChevronUp, Facebook, Instagram, Linkedin, Zap, 
  Play, Users, Briefcase, BarChart3, Sparkles, CheckCircle2, Quote, 
  Camera, TrendingUpIcon, ExternalLink, Menu, X, Filter
} from 'lucide-react';

// Detecção de região para moeda
const getUserRegion = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || 'pt-PT';
    const isBrazil = timezone.includes('America') || language.includes('pt-BR');
    return isBrazil ? 'BR' : 'EU';
  } catch {
    return 'EU';
  }
};

// Informações da empresa
const COMPANY_INFO = {
  name: 'HighLevel MKT',
  whatsapp: '+351934071660',
  email: 'vinicius.highlevelmkt@gmail.com',
  instagram: 'https://www.instagram.com/mkthighlevel/',
  instagramHandle: '@mkthighlevel',
  founded: '2020',
  location: 'Portugal & Brasil',
};

// Provas sociais CORRIGIDAS
const getSocialProof = (region) => ({
  totalClients: '100+',
  totalProjects: '350+',
  totalLeads: '47.000+',
  totalRevenue: region === 'BR' ? 'R$52M+' : '€8.2M+',
  avgROI: '6.8x',
  retention: '94%',
  yearsFounded: '6+',
  teamSize: '12',
  activeCountries: '2',
});

// CLIENTES REAIS COMPLETOS (24 empresas com logos reais)
const REAL_CLIENTS = [
  // IMOBILIÁRIAS (3)
  {
    id: 1,
    name: 'Patabrava Imobiliária',
    location: 'Lisboa, Portugal',
    niche: 'imobiliarias',
    result: '+380% em leads qualificados',
    testimonial: 'Os leads chegam qualificados e prontos para visitar. Nossa taxa de conversão de visita para venda aumentou significativamente.',
    services: ['Tráfego Pago', 'SEO Local', 'Conteúdo'],
    videoUrl: 'https://www.instagram.com/p/DTxwwJ4gobX/',
    instagramUrl: 'https://www.instagram.com/patabravaimobiliaria/',
    logo: '🦜',
    logoColor: 'from-yellow-600 to-amber-700',
    stats: { leads: '+380%', conversao: '8.2%', roi: '6.8x' },
    featured: true,
  },
  {
    id: 2,
    name: 'Lúcia Canelas Imobiliária',
    location: 'Portugal',
    niche: 'imobiliarias',
    result: 'Duplicou visitas em 30 dias',
    testimonial: 'Duplicamos as visitas em 30 dias. O trabalho da HighLevel foi fundamental para o crescimento do meu negócio.',
    services: ['Tráfego Pago', 'Social Media', 'Branding'],
    videoUrl: 'https://www.instagram.com/reel/DKANrZOPSbC/',
    instagramUrl: 'https://www.instagram.com/luciacanelasisabroad/',
    logo: '🏘️',
    logoColor: 'from-red-600 to-red-700',
    stats: { visitas: '100%', engagement: '+250%', roas: '5.4x' },
    featured: true,
  },
  {
    id: 3,
    name: 'Mendonça Filho Imóveis',
    location: 'Brasil',
    niche: 'imobiliarias',
    result: '+220% em leads qualificados',
    testimonial: 'A qualidade dos leads melhorou drasticamente. Fechamos mais negócios com menos esforço.',
    services: ['Tráfego Pago', 'SEO Local', 'Landing Pages'],
    logo: '🏠',
    logoColor: 'from-red-700 to-orange-700',
    stats: { leads: '+220%', vendas: '+85%', ticket: '€280K' },
  },

  // ESCOLAS/EDUCAÇÃO (7)
  {
    id: 4,
    name: 'Instituto Genária Viana',
    location: 'Viana do Castelo',
    niche: 'escolas',
    result: '+168% em matrículas',
    testimonial: 'Batemos a meta de matrículas com 2 meses de antecedência. Resultado excepcional.',
    services: ['Tráfego Pago', 'Social Media', 'Conteúdo'],
    videoUrl: 'https://www.instagram.com/reel/DSn0y6NgveS/',
    instagramUrl: 'https://www.instagram.com/institutogenaria/',
    logo: '🎓',
    logoColor: 'from-blue-600 to-indigo-600',
    stats: { matriculas: '+168%', visitas: '420', conversao: '38%' },
    featured: true,
  },
  {
    id: 5,
    name: 'Instituto Lessa Viana',
    location: 'Viana do Castelo',
    niche: 'escolas',
    result: '+145% em matrículas',
    testimonial: 'A escola ganhou visibilidade digital que nunca tivemos. Os pais encontram a gente facilmente.',
    services: ['SEO Local', 'Social Media', 'Conteúdo'],
    logo: '📚',
    logoColor: 'from-teal-600 to-cyan-600',
    stats: { busca: '+420%', matriculas: '+145%', ranking: '#1 local' },
  },
  {
    id: 6,
    name: 'UNISUAM',
    location: 'Rio de Janeiro, Brasil',
    niche: 'escolas',
    result: '+220% em inscrições',
    testimonial: 'Superamos todas as metas de captação. A campanha foi fundamental para o crescimento.',
    services: ['Tráfego Pago', 'Landing Pages', 'CRO'],
    logo: '🦉',
    logoColor: 'from-orange-500 to-blue-600',
    stats: { inscricoes: '+220%', alcance: '2.8M', matriculas: '+87%' },
    featured: true,
  },
  {
    id: 7,
    name: 'Escola Almeida Santos',
    location: 'Portugal',
    niche: 'escolas',
    result: '+192% em matrículas',
    testimonial: 'Conquistamos o perfil de pais que sempre quisemos. A escola está com lista de espera.',
    services: ['Tráfego Pago', 'SEO', 'Social Media'],
    videoUrl: 'https://www.instagram.com/reel/DRMspSalTxj/',
    instagramUrl: 'https://www.instagram.com/almeidasantoseducacao/',
    logo: '📖',
    logoColor: 'from-cyan-600 to-blue-600',
    stats: { matriculas: '+192%', leads: '1.120', ranking: 'Top 3' },
  },
  {
    id: 8,
    name: 'EDUCAR Treinamentos',
    location: 'Brasil',
    niche: 'escolas',
    result: '+190% em inscrições',
    testimonial: 'Os cursos estão lotados. A estratégia digital funcionou perfeitamente.',
    services: ['Tráfego Pago', 'Landing Pages', 'Automação'],
    logo: '💡',
    logoColor: 'from-yellow-500 to-orange-500',
    stats: { inscricoes: '+190%', conversao: '15.2%', roi: '7.2x' },
  },
  {
    id: 9,
    name: 'IGV Colégio',
    location: 'Brasil',
    niche: 'escolas',
    result: '+158% em matrículas',
    testimonial: 'Crescimento consistente mês a mês. Melhor investimento em marketing.',
    services: ['Social Media', 'Tráfego Pago', 'Conteúdo'],
    logo: '✏️',
    logoColor: 'from-red-600 to-red-700',
    stats: { matriculas: '+158%', engagement: '+340%', cpa: '€22' },
  },
  {
    id: 10,
    name: 'Centro Educacional',
    location: 'Brasil',
    niche: 'escolas',
    result: '+175% em matrículas',
    testimonial: 'Dobramos o número de alunos em menos de um ano.',
    services: ['SEO', 'Social Media', 'Branding'],
    logo: '📚',
    logoColor: 'from-yellow-400 to-cyan-500',
    stats: { matriculas: '+175%', visibilidade: '+520%', leads: '980' },
  },

  // RESTAURANTES (2)
  {
    id: 11,
    name: 'Latina Grill',
    location: 'Cascais, Portugal',
    niche: 'restaurantes',
    result: '+180% movimento dias de semana',
    testimonial: 'O restaurante está sempre cheio, até em dias de semana. O conteúdo visual é espetacular.',
    services: ['Social Media', 'Food Photography', 'Tráfego Pago'],
    logo: '🍽️',
    logoColor: 'from-amber-600 to-orange-600',
    stats: { movimento: '+180%', seguidores: '+6.2K', reservas: '+185%' },
    featured: true,
  },
  {
    id: 12,
    name: 'Marretão Churrascaria',
    location: 'Brasil',
    niche: 'restaurantes',
    result: '+240% em reservas',
    testimonial: 'Lotamos todos os finais de semana. As campanhas foram certeiras.',
    services: ['Social Media', 'Tráfego Pago', 'Food Content'],
    logo: '🐂',
    logoColor: 'from-red-700 to-red-800',
    stats: { reservas: '+240%', ticket: '+32%', delivery: '+195%' },
  },

  // CLÍNICAS (2)
  {
    id: 13,
    name: 'Clínica Bem Maior',
    location: 'Portugal',
    niche: 'clinicas',
    result: '+265% em agendamentos',
    testimonial: 'A agenda lotou completamente. Precisamos contratar mais profissionais para atender a demanda.',
    services: ['Tráfego Pago', 'Social Media', 'Conteúdo'],
    logo: '💚',
    logoColor: 'from-emerald-600 to-teal-600',
    stats: { agendamentos: '+265%', whatsapp: '980/mês', ticket: '+48%' },
  },
  {
    id: 14,
    name: 'Clínica Veterinária Palmeiras',
    location: 'Portugal',
    niche: 'clinicas',
    result: '+240% novos pacientes',
    testimonial: 'A clínica cresceu muito. Atendemos pets de toda a região e somos referência em emergências.',
    services: ['Google Ads', 'Social Media', 'SEO Local'],
    videoUrl: 'https://www.instagram.com/p/DKHiZI5IEE2/',
    instagramUrl: 'https://www.instagram.com/clinicaveterinariapalmeiras/',
    logo: '🐾',
    logoColor: 'from-green-600 to-emerald-600',
    stats: { pacientes: '+320', consultas: '+215%', recorrencia: '72%' },
    featured: true,
  },

  // OUTROS NICHOS (10)
  {
    id: 15,
    name: 'DJ Clean',
    location: 'Portugal',
    niche: 'higienizacao',
    result: '+285% em orçamentos',
    testimonial: 'Conseguimos nos posicionar como referência premium. Os contratos B2B não param de chegar.',
    services: ['Branding', 'Tráfego Pago', 'SEO'],
    logo: '🧹',
    logoColor: 'from-blue-600 to-cyan-600',
    stats: { orcamentos: '+285%', contratos: '18 B2B', ticket: '+72%' },
  },
  {
    id: 16,
    name: 'TX Multimarcas',
    location: 'Portugal',
    niche: 'automotivo',
    result: '+310% em leads qualificados',
    testimonial: 'Os leads chegam interessados e prontos para fechar. Melhor investimento em marketing que já fizemos.',
    services: ['Tráfego Pago', 'Remarketing', 'Conteúdo'],
    videoUrl: 'https://www.instagram.com/p/C9Pugc4gkxD/',
    instagramUrl: 'https://www.instagram.com/txmultimarcas/',
    logo: '🚗',
    logoColor: 'from-red-600 to-gray-800',
    stats: { leads: '+310%', vendas: '42', roi: '9.2x' },
  },
  {
    id: 17,
    name: 'Autoescola Iguaba',
    location: 'Brasil',
    niche: 'autoescola',
    result: '+195% em matrículas',
    testimonial: 'Nunca tivemos tantos alunos. O WhatsApp não para de tocar.',
    services: ['Tráfego Pago', 'Landing Pages', 'Social Media'],
    instagramUrl: 'https://www.instagram.com/cfc.iguaba/',
    logo: '🚙',
    logoColor: 'from-yellow-500 to-red-500',
    stats: { matriculas: '+195%', cpa: '-45%', conversao: '12.5%' },
  },
  {
    id: 18,
    name: 'Visão Records',
    location: 'Portugal',
    niche: 'entretenimento',
    result: '+2.8M streams gerados',
    testimonial: 'Conseguimos alavancar vários artistas. As músicas viralizaram e os shows lotaram.',
    services: ['Social Media', 'Branding', 'Conteúdo'],
    logo: '🎵',
    logoColor: 'from-purple-600 to-pink-600',
    stats: { streams: '+2.8M', seguidores: '+45K', shows: '28' },
    featured: true,
  },
  {
    id: 19,
    name: 'Wave Records',
    location: 'Portugal',
    niche: 'entretenimento',
    result: '+1.9M streams',
    testimonial: 'A gravadora ganhou reconhecimento nacional. Nossos artistas estão nas principais playlists.',
    services: ['Social Media', 'Tráfego Pago', 'Conteúdo'],
    logo: '🎤',
    logoColor: 'from-red-600 to-pink-600',
    stats: { streams: '+1.9M', playlists: '120+', artistas: '12' },
  },
  {
    id: 20,
    name: 'Violive',
    location: 'Brasil',
    niche: 'entretenimento',
    result: '+1.2M streams',
    testimonial: 'Plataforma cresceu exponencialmente. Marketing digital fez toda diferença.',
    services: ['Social Media', 'Performance', 'Growth'],
    logo: '🎶',
    logoColor: 'from-red-500 to-pink-500',
    stats: { streams: '+1.2M', usuarios: '+85K', engajamento: '340%' },
  },
  {
    id: 21,
    name: 'Marretão Fitness',
    location: 'Brasil',
    niche: 'fitness',
    result: '+280% em matrículas',
    testimonial: 'Academia lotada. Melhor fase em anos de operação.',
    services: ['Social Media', 'Tráfego Pago', 'Branding'],
    logo: '🏋️',
    logoColor: 'from-red-700 to-red-800',
    stats: { matriculas: '+280%', renovacao: '89%', ticket: '+45%' },
  },
  {
    id: 22,
    name: 'Academia Hidro Coqueiros',
    location: 'Brasil',
    niche: 'fitness',
    result: '+165% em alunos',
    testimonial: 'Turmas completas em todas as faixas horárias.',
    services: ['SEO Local', 'Social Media', 'Conteúdo'],
    logo: '🌴',
    logoColor: 'from-green-600 to-yellow-500',
    stats: { alunos: '+165%', aulas: '95% ocupação', nps: '92' },
  },
  {
    id: 23,
    name: 'Constrói.PT',
    location: 'Portugal',
    niche: 'construcao',
    result: '+310% em orçamentos',
    testimonial: 'Contratos B2B cresceram significativamente. Equipe não para.',
    services: ['Branding', 'Tráfego Pago B2B', 'LinkedIn'],
    logo: '🏗️',
    logoColor: 'from-teal-700 to-blue-800',
    stats: { orcamentos: '+310%', contratos: '24', ticket: '€180K' },
  },
  {
    id: 24,
    name: 'Rota 106 Easy Rider',
    location: 'Brasil',
    niche: 'eventos',
    result: '+420% em eventos',
    testimonial: 'Moto clube se tornou referência regional. Eventos sempre lotados.',
    services: ['Social Media', 'Branding', 'Eventos'],
    logo: '🏍️',
    logoColor: 'from-gray-700 to-yellow-600',
    stats: { eventos: '+420%', membros: '+680', engajamento: '850%' },
  },
];

// Nichos atualizados
const NICHES = [
  { id: 'todos', name: 'Todos', icon: '🎯', count: 24 },
  { id: 'imobiliarias', name: 'Imobiliárias', icon: '🏢', count: 3 },
  { id: 'escolas', name: 'Escolas', icon: '🎓', count: 7 },
  { id: 'restaurantes', name: 'Restaurantes', icon: '🍽️', count: 2 },
  { id: 'clinicas', name: 'Clínicas', icon: '💆', count: 2 },
  { id: 'higienizacao', name: 'Higienização', icon: '🧹', count: 1 },
  { id: 'automotivo', name: 'Automotivo', icon: '🚗', count: 1 },
  { id: 'autoescola', name: 'Autoescola', icon: '🚙', count: 1 },
  { id: 'entretenimento', name: 'Entretenimento', icon: '🎵', count: 3 },
  { id: 'fitness', name: 'Fitness', icon: '🏋️', count: 2 },
  { id: 'construcao', name: 'Construção', icon: '🏗️', count: 1 },
  { id: 'eventos', name: 'Eventos', icon: '🏍️', count: 1 },
];

// Componente principal
export default function HighLevelMKTFinal() {
  const [region, setRegion] = useState('EU');
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState('todos');
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const socialProof = getSocialProof(region);

  useEffect(() => {
    setRegion(getUserRegion());
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredClients = selectedNiche === 'todos' 
    ? REAL_CLIENTS 
    : REAL_CLIENTS.filter(c => c.niche === selectedNiche);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openVideo = (client) => {
    setCurrentVideo(client);
    setShowVideoModal(true);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-950">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative mb-12">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">HL</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">HighLevel MKT</h1>
        <p className="text-gray-400 mb-8">Agência de Performance Premium</p>
        <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-6 text-gray-400 text-sm">Carregando experiência premium...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/95 backdrop-blur-xl shadow-2xl border-b border-white/10' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white font-bold text-xl">HL</span>
              </div>
              <div>
                <span className="block text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">HighLevel MKT</span>
                <span className="hidden sm:block text-xs text-gray-400">Performance Marketing Agency</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {['Início', 'Clientes', 'Portfólio', 'Contato'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white font-medium transition-colors relative group">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right mr-4">
                <div className="text-xs text-gray-400">Disponível Agora</div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-white">Online</span>
                </div>
              </div>
              <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '')}`} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Falar Agora</span>
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Ultra Premium */}
      <section id="início" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-gray-950/90 to-purple-950/50" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LDEzMCwyNDYsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">24 Clientes Reais</span>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">{socialProof.totalClients} Total</span>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">{socialProof.totalProjects} Projetos</span>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center space-x-2">
                <TrendingUpIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-300">{socialProof.totalRevenue} Gerados</span>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">{socialProof.retention} Retenção</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-center"
            >
              Agência de <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Performance</span>
              <br />
              com Resultados <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Comprovados</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto text-center leading-relaxed"
            >
              <span className="text-blue-400 font-semibold">24 empresas reais</span> que cresceram com nossa estratégia de <span className="text-purple-400 font-semibold">tráfego pago</span>, <span className="text-pink-400 font-semibold">SEO</span> e <span className="text-emerald-400 font-semibold">branding</span> orientado a ROI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <a href="#portfolio" className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl w-full sm:w-auto overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>Ver 24 Clientes Reais</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
              <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '')}`} className="px-10 py-5 bg-gray-800/50 backdrop-blur-xl text-white font-semibold rounded-xl border-2 border-gray-700 hover:border-blue-500 hover:bg-gray-700 transition-all w-full sm:w-auto flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Solicitar Diagnóstico</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {[
                { value: socialProof.totalClients, label: 'Clientes', icon: Users },
                { value: socialProof.totalProjects, label: 'Projetos', icon: Briefcase },
                { value: socialProof.totalLeads, label: 'Leads Gerados', icon: Target },
                { value: socialProof.totalRevenue, label: 'Revenue', icon: TrendingUp },
                { value: socialProof.avgROI, label: 'ROI Médio', icon: BarChart3 },
                { value: socialProof.retention, label: 'Retenção', icon: Award },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all">
                    <stat.icon className="w-6 h-6 text-blue-400 mb-3" />
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wall of Logos */}
      <section id="clientes" className="py-20 md:py-32 relative bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6"
            >
              <span className="text-blue-400 font-semibold text-sm uppercase flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Empresas Reais</span>
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              24 Marcas que <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">confiam</span> em nós
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Clientes reais com logos reais e resultados verificáveis em Portugal e Brasil
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {REAL_CLIENTS.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onClick={() => {
                  setSelectedClient(client);
                  setShowPortfolioModal(true);
                }}
              >
                <div className={`aspect-square bg-gradient-to-br ${client.logoColor} rounded-2xl border border-white/10 hover:border-white/30 transition-all flex flex-col items-center justify-center p-4 hover:scale-105`}>
                  <div className="text-5xl mb-2">{client.logo}</div>
                  <p className="text-xs text-white/90 font-bold text-center line-clamp-2">{client.name}</p>
                  {client.featured && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all space-x-2">
              <Instagram className="w-5 h-5" />
              <span>Seguir {COMPANY_INFO.instagramHandle}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Portfólio <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Verificável</span>
            </h2>
            <p className="text-xl text-gray-400">Cases reais com vídeos, links e provas sociais</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {NICHES.map((niche) => (
              <motion.button
                key={niche.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedNiche(niche.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedNiche === niche.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">{niche.icon}</span>
                  <span>{niche.name}</span>
                  <span className="text-xs opacity-70 bg-white/10 px-2 py-0.5 rounded-full">
                    {niche.count}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  setSelectedClient(client);
                  setShowPortfolioModal(true);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${client.logoColor} flex items-center justify-center text-3xl shadow-lg`}>
                        {client.logo}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {client.featured && (
                          <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold rounded-full flex items-center space-x-1">
                            <Star className="w-3 h-3" fill="black" />
                            <span>TOP</span>
                          </span>
                        )}
                        {client.videoUrl && (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full flex items-center space-x-1 border border-red-500/30">
                            <Play className="w-3 h-3" />
                            <span>Vídeo</span>
                          </span>
                        )}
                        {client.instagramUrl && (
                          <a href={client.instagramUrl} target="_blank" rel="noopener noreferrer" 
                             onClick={(e) => e.stopPropagation()}
                             className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs font-semibold rounded-full flex items-center space-x-1 border border-pink-500/30 hover:bg-pink-500/30 transition-all">
                            <Instagram className="w-3 h-3" />
                            <span>IG</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {client.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {client.location}
                    </p>

                    <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-4 mb-4 border border-emerald-500/30">
                      <p className="text-emerald-400 font-bold text-center">{client.result}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(client.stats).map(([key, value]) => (
                        <div key={key} className="bg-white/5 rounded-lg p-2 text-center">
                          <div className="text-sm font-bold text-blue-400">{value}</div>
                          <div className="text-[10px] text-gray-500 uppercase truncate">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="relative pl-6 border-l-2 border-blue-500/30 mb-4">
                      <Quote className="absolute -left-2 top-0 w-4 h-4 text-blue-400" />
                      <p className="text-sm text-gray-400 italic line-clamp-2">
                        {client.testimonial}
                      </p>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center space-x-2">
                      <span>Ver Case Completo</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contato" className="py-20 md:py-32 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-12"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Vagas Limitadas • Apenas 3 Novos Clientes/Mês</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Seja o Próximo <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Case de Sucesso</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Junte-se a <span className="text-blue-400 font-bold">Patabrava</span>, <span className="text-purple-400 font-bold">UNISUAM</span>, <span className="text-pink-400 font-bold">Lúcia Canelas</span> e outros <span className="text-emerald-400 font-bold">21 clientes</span>
            </p>
            
            <p className="text-lg text-gray-400 mb-10">
              que cresceram de verdade com estratégias comprovadas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a 
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '')}?text=Vi os 24 casos no site e quero resultados reais também!`}
                className="group px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center justify-center space-x-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Phone className="relative w-6 h-6" />
                <span className="relative">Falar com Especialista Agora</span>
                <Sparkles className="relative w-5 h-5" />
              </a>
              
              <a 
                href={`mailto:${COMPANY_INFO.email}?subject=Quero Resultados como os 24 casos`}
                className="px-10 py-5 bg-gray-800/50 backdrop-blur-xl text-white font-semibold text-lg rounded-xl border-2 border-gray-700 hover:border-purple-500 hover:bg-gray-700 transition-all flex items-center justify-center space-x-2"
              >
                <Mail className="w-6 h-6" />
                <span>Enviar E-mail</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {[
                'Diagnóstico Gratuito',
                'Sem Contratos Longos',
                'Resultados em 60-90 Dias',
                'ROI Garantido'
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-950 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">HL</span>
                </div>
                <div>
                  <span className="block text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">HighLevel MKT</span>
                  <span className="text-xs text-gray-500">Est. {COMPANY_INFO.founded}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">Agência de Performance com Resultados Comprovados</p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500/20 flex items-center justify-center transition-all border border-white/10 hover:border-blue-500/50">
                  <Facebook size={20} />
                </a>
                <a href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-pink-500/20 flex items-center justify-center transition-all border border-white/10 hover:border-pink-500/50">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500/20 flex items-center justify-center transition-all border border-white/10 hover:border-blue-500/50">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Provas Sociais</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  24 Clientes Documentados
                </li>
                <li className="text-gray-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  {socialProof.totalClients} Total
                </li>
                <li className="text-gray-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  {socialProof.totalProjects} Projetos
                </li>
                <li className="text-gray-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  {socialProof.totalRevenue} Gerados
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Clientes Destaque</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Patabrava Imobiliária</li>
                <li>• Lúcia Canelas</li>
                <li>• UNISUAM</li>
                <li>• Latina Grill</li>
                <li>• Instituto Genária</li>
                <li className="text-blue-400 font-medium">+ 19 empresas</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Contato Direto</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '')}`} className="flex items-center text-gray-400 hover:text-green-400 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3 group-hover:bg-green-500/30 transition-all">
                      <Phone className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">WhatsApp</div>
                      <div>{COMPANY_INFO.whatsapp}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3 group-hover:bg-blue-500/30 transition-all">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">E-mail</div>
                      <div className="text-xs">{COMPANY_INFO.email}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-pink-400 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center mr-3 group-hover:bg-pink-500/30 transition-all">
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Instagram</div>
                      <div>{COMPANY_INFO.instagramHandle}</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © 2026 HighLevel MKT. Todos os direitos reservados. | 24 Clientes Reais • {socialProof.totalProjects} Projetos • {socialProof.totalRevenue} Gerados
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Portfolio */}
      <AnimatePresence>
        {showPortfolioModal && selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowPortfolioModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedClient.logoColor} flex items-center justify-center text-4xl shadow-lg`}>
                      {selectedClient.logo}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedClient.name}</h3>
                      <p className="text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedClient.location}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowPortfolioModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedClient.videoUrl && (
                    <a href={selectedClient.videoUrl} target="_blank" rel="noopener noreferrer"
                       className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Ver Vídeo no Instagram</span>
                    </a>
                  )}
                  {selectedClient.instagramUrl && (
                    <a href={selectedClient.instagramUrl} target="_blank" rel="noopener noreferrer"
                       className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-lg border border-pink-500/30 hover:bg-pink-500/30 transition-all flex items-center space-x-2">
                      <Instagram className="w-4 h-4" />
                      <span>Perfil do Instagram</span>
                    </a>
                  )}
                </div>

                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-6 mb-6 border border-emerald-500/30">
                  <h4 className="text-sm text-emerald-400 font-semibold mb-2">RESULTADO PRINCIPAL</h4>
                  <p className="text-3xl font-bold text-white">{selectedClient.result}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(selectedClient.stats).map(([key, value]) => (
                    <div key={key} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                        {value}
                      </div>
                      <div className="text-xs text-gray-400 uppercase">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-sm text-gray-400 font-semibold mb-3">SERVIÇOS PRESTADOS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.services.map((service, idx) => (
                      <span key={idx} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
                  <div className="flex items-start space-x-3 mb-4">
                    <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm text-gray-400 font-semibold mb-2">DEPOIMENTO</h4>
                      <blockquote className="text-lg text-gray-300 italic leading-relaxed">
                        "{selectedClient.testimonial}"
                      </blockquote>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">5/5 - Avaliação Máxima</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '')}?text=Vi o caso de ${selectedClient.name} (${selectedClient.result}) e quero resultados assim!`}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
                >
                  <span>Quero Resultados Como {selectedClient.name}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/50 transition-all z-40 hover:scale-110"
          >
            <ChevronUp size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
