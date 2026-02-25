import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Tractor, Search, ChevronDown, Instagram, Facebook, Linkedin, Clock } from 'lucide-react';
import { useStore } from '../store';
import { CONTACT_INFO, COMPANY_NAME, UNIDADES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../src/logo/logo.png';


export const Navbar: React.FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to products page with search param (simulated by passing state or just going there)
      // For this static version, we'll just go to /produtos and let the user filter there
      // In a real app, this would update the URL query params
      navigate('/produtos');
    }
  };

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Máquinas', path: '/produtos' },
    { name: 'Peças', path: '/produtos' },
    { name: 'Sobre a Empresa', path: '/sobre' },
    { name: 'Fale Conosco', path: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full font-sans">
      {/* Top Bar - Contact Info */}
      <div className="bg-brand-darkGreen text-white py-2 text-xs md:text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2 opacity-90 hover:opacity-100"><Phone className="h-3 w-3 text-brand-yellow" /> {CONTACT_INFO.phone}</span>
            <span className="flex items-center gap-2 opacity-90 hover:opacity-100"><Mail className="h-3 w-3 text-brand-yellow" /> {CONTACT_INFO.emails.commercial}</span>
            <span className="flex items-center gap-2 opacity-90 hover:opacity-100"><Clock className="h-3 w-3 text-brand-yellow" /> Seg-Sex: 08h às 18h</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`https://instagram.com/${CONTACT_INFO.social.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="hover:text-brand-yellow transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="hover:text-brand-yellow transition-colors"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 py-4 shadow-sm relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img className="w-24" src={logo} alt="" />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-grow max-w-2xl">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="O que você procura hoje? (Ex: Plantadeira, Rolamento...)"
                  className="w-full border-2 border-gray-200 bg-gray-50 rounded-full py-3 pl-5 pr-14 text-sm focus:outline-none focus:border-brand-green focus:bg-white transition-all placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-green text-white p-2 rounded-full hover:bg-brand-darkGreen transition-colors shadow-sm">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* CTA Button / Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/55${CONTACT_INFO.whatsapp.commercial.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 bg-brand-yellow text-brand-dark px-5 py-2.5 rounded-full font-heading font-bold text-sm hover:bg-yellow-300 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                Falar com Vendedor
              </a>

              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand-green focus:outline-none bg-gray-50 border border-gray-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search - Visible only on mobile */}
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-brand-green"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <div className="hidden md:block bg-white border-b border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12">
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-2 font-bold text-brand-darkGreen uppercase text-sm tracking-wide">
                <Menu className="h-4 w-4" />
                Departamentos
              </button>
              {/* Dropdown placeholder - funcionalidade visual */}
              <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-gray-100 rounded-b-lg py-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link to="/produtos" className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-brand-green">Máquinas Agrícolas</Link>
                <Link to="/produtos" className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-brand-green">Peças de Reposição</Link>
                <Link to="/produtos" className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-brand-green">Tecnologia de Precisão</Link>
                <Link to="/produtos" className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-brand-green">Lubrificantes e Filtros</Link>
              </div>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors h-full flex items-center border-b-2 ${isActive(link.path)
                  ? 'text-brand-green border-brand-green'
                  : 'text-gray-600 border-transparent hover:text-brand-green hover:border-gray-200'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu Principal</p>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive(link.path)
                    ? 'text-brand-green bg-green-50 border border-green-100'
                    : 'text-gray-700 hover:text-brand-green hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/55${CONTACT_INFO.whatsapp.commercial.replace(/\D/g, '')}`}
                  className="block w-full text-center bg-brand-green text-white font-bold py-3 rounded-lg shadow-md"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <img src={logo} alt="Logo" className="w-32" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Tecnologia, confiança e desempenho para aumentar a produtividade da sua lavoura. Referência em Jataí e região.
            </p>
            <div className="flex space-x-4">
              <a href={`https://instagram.com/${CONTACT_INFO.social.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-brand-green hover:text-white transition-all"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-brand-green hover:text-white transition-all"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-brand-green hover:text-white transition-all"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white border-l-4 border-brand-yellow pl-3">Navegação</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-2"><ChevronDown className="h-3 w-3 -rotate-90" /> Início</Link></li>
              <li><Link to="/produtos" className="hover:text-brand-yellow transition-colors flex items-center gap-2"><ChevronDown className="h-3 w-3 -rotate-90" /> Peças Agrícolas</Link></li>
              <li><Link to="/produtos" className="hover:text-brand-yellow transition-colors flex items-center gap-2"><ChevronDown className="h-3 w-3 -rotate-90" /> Máquinas Novas</Link></li>
              <li><Link to="/sobre" className="hover:text-brand-yellow transition-colors flex items-center gap-2"><ChevronDown className="h-3 w-3 -rotate-90" /> Sobre Nós</Link></li>
              <li><Link to="/contato" className="hover:text-brand-yellow transition-colors flex items-center gap-2"><ChevronDown className="h-3 w-3 -rotate-90" /> Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Unidades */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white border-l-4 border-brand-yellow pl-3">Nossas Unidades</h3>
            <div className="space-y-6">
              {UNIDADES.map((unidade, idx) => (
                <div key={idx}>
                  <h4 className="text-brand-yellow text-sm font-bold mb-2">{unidade.name}</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-3 group">
                      <MapPin className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="text-xs group-hover:text-gray-300 transition-colors">{unidade.address}</span>
                    </li>
                    <li className="flex items-center gap-3 group">
                      <Phone className="h-4 w-4 text-brand-green flex-shrink-0" />
                      <a href={`https://wa.me/55${unidade.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-xs group-hover:text-white transition-colors">
                        {unidade.phone}
                      </a>
                    </li>
                    {unidade.instagram && (
                      <li className="flex items-center gap-3 group">
                        <Instagram className="h-4 w-4 text-brand-green flex-shrink-0" />
                        <a href={`https://instagram.com/${unidade.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-xs group-hover:text-white transition-colors">
                          {unidade.instagram}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact 2 */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white border-l-4 border-brand-yellow pl-3">Atendimento</h3>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li className="flex justify-between"><span>Seg - Sex:</span> <span className="text-white">08:00 - 18:00</span></li>
                <li className="flex justify-between"><span>Sábado:</span> <span className="text-white">08:00 - 12:00</span></li>
                <li className="flex justify-between"><span>Domingo:</span> <span className="text-red-400">Fechado</span></li>
              </ul>
              <a
                href={`https://wa.me/55${CONTACT_INFO.whatsapp.commercial.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-yellow hover:text-brand-dark text-white text-sm font-bold py-3 rounded-lg transition-all w-full"
              >
                <Phone className="h-4 w-4" />
                (64) 99658-1267
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados. CNPJ: 29.885.070/0001-56
          </p>
          <div className="flex gap-4">
            <span className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Pix</span>
            <span className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Visa</span>
            <span className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Master</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-16 md:py-20 ${className}`}>
    {children}
  </section>
);