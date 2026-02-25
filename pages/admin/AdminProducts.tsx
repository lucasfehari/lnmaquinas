import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { Edit, Trash2, Search, Plus } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const { products, deleteProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
    }
  };

  const filteredProducts = Array.isArray(products) ? products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-800">Gerenciar Produtos</h1>
        <Link
          to="/admin/produtos/novo"
          className="bg-brand-green text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-darkGreen transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" /> Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar por nome ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-green"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold border-b">Imagem</th>
                <th className="p-4 font-semibold border-b">Nome</th>
                <th className="p-4 font-semibold border-b">Categoria</th>
                <th className="p-4 font-semibold border-b">Preço</th>
                <th className="p-4 font-semibold border-b">Status</th>
                <th className="p-4 font-semibold border-b text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{product.name}</td>
                  <td className="p-4 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{product.category}</span>
                  </td>
                  <td className="p-4 text-gray-700">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </td>
                  <td className="p-4">
                    {product.inStock ? (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Em Estoque
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Esgotado
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      to={`/admin/produtos/${product.id}`}
                      className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="inline-block p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;