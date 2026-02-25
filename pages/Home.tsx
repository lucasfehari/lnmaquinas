import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Truck, ShieldCheck, CreditCard, Headphones, Tractor, GearSix, Cpu, Wrench } from '@phosphor-icons/react';
import { Section } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { SERVICES } from '../constants';
import { useStore } from '../store';

// --- Carousel Component ---
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const { banners } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  if (banners.length === 0) return null;

  return (
    <div className="relative h-[400px] sm:h-[500px] xl:h-[650px] w-full bg-brand-dark flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className={`absolute inset-0 z-10 ${banners[current].title ? 'bg-black/30 md:bg-black/20' : ''}`} />
          <div className={`absolute inset-0 z-10 ${banners[current].title ? 'bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent md:bg-gradient-to-r md:from-brand-dark/80' : ''}`} />
          <picture className="w-full h-full block">
            <img
              src={banners[current].image}
              alt={banners[current].title || "Banner Principal"}
              className="w-full h-full object-cover object-[center_top] sm:object-center"
              style={{
                // Prevent extreme cropping by ensuring the focal point (usually the machinery) stays in frame
                objectPosition: 'calc(50%) 20%'
              }}
            />
          </picture>

          {(banners[current].title || banners[current].subtitle || banners[current].cta) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-start">
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-center md:text-left">
                  {banners[current].subtitle && (
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block py-1 px-3 bg-brand-yellow text-brand-dark font-bold text-xs tracking-widest uppercase mb-4 rounded-sm"
                    >
                      {banners[current].subtitle}
                    </motion.span>
                  )}
                  {banners[current].title && (
                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-4 drop-shadow-lg"
                    >
                      {banners[current].title}
                    </motion.h1>
                  )}
                  {banners[current].text && (
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg mx-auto md:mx-0 font-light"
                    >
                      {banners[current].text}
                    </motion.p>
                  )}
                  {banners[current].cta && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        to={banners[current].link}
                        className="inline-flex items-center bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-green transition-all shadow-lg transform hover:-translate-y-1"
                      >
                        {banners[current].cta} <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-brand-green text-white rounded-full backdrop-blur-sm transition-all hidden md:block">
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-brand-green text-white rounded-full backdrop-blur-sm transition-all hidden md:block">
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${current === idx ? 'bg-brand-yellow w-8' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Features Bar ---
const FeaturesBar = () => (
  <div className="bg-white border-b border-gray-100 py-6 md:py-8 shadow-sm relative z-20 -mt-2">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <Truck className="h-8 w-8 text-brand-green" weight="duotone" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">Entrega Rápida</span>
            <span className="text-xs text-gray-500 hidden sm:block">Para toda a região</span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <ShieldCheck className="h-8 w-8 text-brand-green" weight="duotone" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">Garantia Total</span>
            <span className="text-xs text-gray-500 hidden sm:block">Produtos originais</span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <CreditCard className="h-8 w-8 text-brand-green" weight="duotone" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">Pagamento Flexível</span>
            <span className="text-xs text-gray-500 hidden sm:block">Consulte condições</span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <Headphones className="h-8 w-8 text-brand-green" weight="duotone" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">Suporte 24/7</span>
            <span className="text-xs text-gray-500 hidden sm:block">Em época de safra</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Partners Carousel ---
const PartnersCarousel = () => {
  return (
    <div className="bg-white py-10 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Marcas e Parceiros</span>
      </div>

      <div className="relative w-full overflow-hidden group">
        <div className="flex animate-marquee gap-12 items-center whitespace-nowrap min-w-full">
          {/* Duplicate list to ensure seamless looping */}
          {[...SERVICES, ...SERVICES, ...SERVICES].map((_, i) => ( // Using SERVICES as placeholder if constants not updated yet, will fix in next step to use PARTNERS
            <div key={i} className="inline-block grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-pointer">
              {/* Placeholder logos - will be better with real images */}
              <span className="text-2xl font-bold font-heading text-gray-300 hover:text-brand-green">PARCEIRO {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Fixed version using imported PARTNERS
import { PARTNERS } from '../constants';
import { div } from 'framer-motion/client';

const MarqueePartners = () => {
  return (
    <div className="bg-gray-50 py-10 border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Principais Marcas e Parceiros</h3>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex animate-marquee gap-16 items-center whitespace-nowrap min-w-full">
          {/* Double the list to ensure seamless looping */}
          {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div key={idx} className="inline-flex items-center justify-center min-w-[150px] group-hover:grayscale-0 transition-all duration-300 filter grayscale opacity-70 hover:opacity-100">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-14 md:h-20 w-auto object-contain max-w-[180px]"
                title={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Category Grid ---
const CategoryGrid = () => {
  const { categories } = useStore();
  const [showAll, setShowAll] = useState(false);

  const getCategoryIcon = (categoryName: string) => {
    const lower = categoryName.toLowerCase();
    if (lower.includes('máquina') || lower.includes('maquina')) return <Tractor className="h-8 w-8" weight="duotone" />;
    if (lower.includes('peça') || lower.includes('peca')) return <GearSix className="h-8 w-8" weight="duotone" />;
    if (lower.includes('tecnologia') || lower.includes('drone') || lower.includes('gps')) return <Cpu className="h-8 w-8" weight="duotone" />;
    if (lower.includes('serviço')) return <Wrench className="h-8 w-8" weight="duotone" />;
    return <Tractor className="h-8 w-8" weight="duotone" />; // Default
  };

  const getCategoryColor = (categoryName: string) => {
    const lower = categoryName.toLowerCase();
    if (lower.includes('máquina') || lower.includes('maquina')) return 'bg-blue-50 text-blue-600';
    if (lower.includes('peça') || lower.includes('peca')) return 'bg-orange-50 text-orange-600';
    if (lower.includes('tecnologia')) return 'bg-purple-50 text-purple-600';
    if (lower.includes('serviço')) return 'bg-green-50 text-green-600';
    return 'bg-gray-50 text-gray-600'; // Default
  };

  if (categories.length === 0) return null;

  const displayCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-heading font-bold text-gray-900">Navegue por Categorias</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
          {displayCategories.map((cat) => (
            <Link key={cat.id} to={`/produtos?categoria=${cat.name}`} className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center gap-4 hover:-translate-y-1">
              <div className={`p-4 rounded-full ${getCategoryColor(cat.name)} group-hover:scale-110 transition-transform`}>
                {getCategoryIcon(cat.name)}
              </div>
              <span className="font-bold text-gray-800 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>

        {categories.length > 4 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-brand-green font-bold hover:text-brand-darkGreen transition-colors"
            >
              {showAll ? (
                <>Ver menos categorias <ChevronLeft className="h-4 w-4 rotate-90" /></>
              ) : (
                <>Ver todas as categorias <ChevronRight className="h-4 w-4 rotate-90" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { products } = useStore();
  // Use a slice of products for the showcase (using Store data)
  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeroCarousel />
      <MarqueePartners />
      <FeaturesBar />

      {/* Category Section */}
      <CategoryGrid />

      {/* Featured Products Showcase - E-commerce style */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">
                <span className="bg-gradient-to-r from-brand-darkGreen to-brand-green bg-clip-text text-transparent">Destaques da Loja</span>
              </h2>
              <p className="text-gray-500">Confira as novidades e ofertas especiais</p>
            </div>
            <Link to="/produtos" className="text-brand-green font-bold hover:text-brand-darkGreen flex items-center gap-1 group">
              Ver todo o catálogo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Section>

      {/* Banner Promocional */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative h-64 md:h-80 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1628354215033-66236b284e9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Promoção"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darkGreen via-brand-green/80 to-transparent flex items-center">
            <div className="p-8 md:p-12 max-w-lg">
              <span className="bg-brand-yellow text-brand-dark px-2 py-1 text-xs font-bold rounded mb-4 inline-block shadow-sm">OFERTA ESPECIAL</span>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 drop-shadow-md">Revisão de Safra</h3>
              <p className="text-white/95 mb-6 text-lg">Descontos exclusivos em peças de reposição e lubrificantes para preparar sua máquina para o trabalho pesado.</p>
              <Link to="/contato" className="bg-white text-brand-green px-8 py-3 rounded-full font-bold hover:bg-brand-yellow hover:text-brand-dark transition-all shadow-lg inline-flex items-center gap-2">
                Solicitar Orçamento <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Simplified */}
      <Section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              <span className="bg-gradient-to-r from-brand-darkGreen to-brand-green bg-clip-text text-transparent">Especialistas no que fazemos</span>
            </h2>
            <p className="text-gray-600">A LN Máquinas oferece suporte completo e técnico.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group flex flex-col items-center">
                <div className="bg-brand-green/10 p-4 rounded-full mb-4 group-hover:bg-brand-green transition-colors">
                  <service.icon className="h-10 w-10 text-brand-green group-hover:text-white transition-colors" weight="duotone" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;