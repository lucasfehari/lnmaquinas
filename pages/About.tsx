import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/Layout';
import { ABOUT_TEXT, COMPANY_NAME } from '../constants';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-darkGreen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Sobre a LN Máquinas</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Tradição e inovação caminhando juntas para servir o produtor rural.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/harvest/800/1000" 
                  alt="Equipe LN Máquinas" 
                  className="rounded-2xl shadow-2xl z-10 relative"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-yellow rounded-2xl -z-0 hidden md:block"></div>
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-brand-green/10 rounded-full -z-0 hidden md:block"></div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900">
                Parceiros do seu crescimento
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                {ABOUT_TEXT}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ShieldCheck className="h-10 w-10 text-brand-green mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">Confiança</h4>
                    <p className="text-sm text-gray-600">Peças genuínas e serviço transparente.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <TrendingUp className="h-10 w-10 text-brand-green mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">Performance</h4>
                    <p className="text-sm text-gray-600">Tecnologia para maximizar sua safra.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Stats / Values Placeholder */}
      <Section className="bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-heading font-bold">Nossos Pilares</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="text-5xl font-bold text-brand-yellow mb-2">100%</div>
                    <p className="text-gray-400">Compromisso com o produtor</p>
                </div>
                <div className="p-6 border-l-0 md:border-l border-gray-700">
                    <div className="text-5xl font-bold text-brand-yellow mb-2">+50</div>
                    <p className="text-gray-400">Marcas Parceiras</p>
                </div>
                <div className="p-6 border-l-0 md:border-l border-gray-700">
                    <div className="text-5xl font-bold text-brand-yellow mb-2">24h</div>
                    <p className="text-gray-400">Suporte em safras</p>
                </div>
            </div>
        </div>
      </Section>
    </div>
  );
};

export default About;