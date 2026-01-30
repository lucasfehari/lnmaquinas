import React from 'react';
import { useStore } from '../../store';
import { Package, Images, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { products, banners } = useStore();

  const outOfStock = products.filter(p => !p.inStock).length;
  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);

  const StatCard = ({ title, value, icon, color, link }: any) => (
    <Link to={link} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-800 mb-8">Visão Geral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total de Produtos" 
          value={products.length} 
          icon={<Package className="h-6 w-6 text-blue-600" />} 
          color="bg-blue-50"
          link="/admin/produtos"
        />
        <StatCard 
          title="Banners Ativos" 
          value={banners.length} 
          icon={<Images className="h-6 w-6 text-purple-600" />} 
          color="bg-purple-50"
          link="/admin/banners"
        />
        <StatCard 
          title="Produtos Esgotados" 
          value={outOfStock} 
          icon={<AlertCircle className="h-6 w-6 text-red-600" />} 
          color="bg-red-50"
          link="/admin/produtos"
        />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Valor de Catálogo</p>
              <h3 className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h2>
        <div className="flex gap-4">
            <Link to="/admin/produtos/novo" className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-darkGreen transition-colors">
                + Adicionar Novo Produto
            </Link>
             <Link to="/admin/banners" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Gerenciar Banners
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;