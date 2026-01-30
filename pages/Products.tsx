import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, ChevronDown } from 'lucide-react';
import { Section } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';

const Products: React.FC = () => {
  const { products, categories } = useStore();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('Todos'); // Use string instead of Enum
  const [searchTerm, setSearchTerm] = useState('');

  // Handle URL Category Param
  useEffect(() => {
    const categoryParam = searchParams.get('categoria');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, products]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-brand-darkGreen mb-4">Nossos Produtos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encontre a solução ideal para o seu negócio rural. De peças a grandes máquinas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            {/* Search - Mobile/Sidebar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categorias
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory('Todos')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${activeCategory === 'Todos'
                      ? 'bg-brand-green text-white font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Todos os Produtos
                  {activeCategory === 'Todos' && <ChevronDown className="h-4 w-4 rotate-[-90deg]" />}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${activeCategory === category.name
                        ? 'bg-brand-green text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {category.name}
                    {activeCategory === category.name && <ChevronDown className="h-4 w-4 rotate-[-90deg]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Banner Sidebar */}
            <div className="bg-brand-darkGreen rounded-xl p-6 text-white text-center hidden lg:block">
              <h4 className="font-bold text-lg mb-2">Precisa de Ajuda?</h4>
              <p className="text-sm text-green-100 mb-4">Nossos consultores estão online para tirar suas dúvidas.</p>
              <a href="#" className="inline-block bg-brand-yellow text-brand-dark text-sm font-bold px-4 py-2 rounded-full hover:bg-white transition-colors">
                Falar Agora
              </a>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Nenhum produto encontrado</h3>
                <p className="text-gray-500 mt-2">Tente buscar por outros termos ou categorias.</p>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-400">Categoria atual: {activeCategory}</span>
                  <button
                    onClick={() => { setSearchTerm(''); setActiveCategory('Todos'); }}
                    className="text-brand-green font-bold text-sm hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;