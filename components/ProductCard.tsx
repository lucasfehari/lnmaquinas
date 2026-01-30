import React from 'react';
import { motion } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const whatsappNumber = CONTACT_INFO.whatsapp.commercial.replace(/\D/g, '');
  const message = encodeURIComponent(`Olá, tenho interesse no produto: ${product.name}`);
  const whatsappLink = `https://wa.me/55${whatsappNumber}?text=${message}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-1"
    >
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">ESGOTADO</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-brand-green bg-green-50 px-2 py-1 rounded uppercase tracking-wider border border-green-100">
            {product.category}
          </span>
        </div>
        <h3 className="font-heading font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-brand-green transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Preço Estimado</span>
            <span className="text-xl font-bold text-brand-darkGreen">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </span>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all shadow-sm ${product.inStock
              ? 'bg-gradient-to-r from-brand-green to-emerald-600 text-white hover:from-brand-darkGreen hover:to-brand-green hover:shadow-lg hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
          >
            <WhatsappLogo className="h-5 w-5" weight="bold" />
            {product.inStock ? 'Tenho Interesse' : 'Indisponível'}
          </a>
        </div>
      </div>
    </motion.div>
  );
};