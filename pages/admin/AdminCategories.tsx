import React, { useState } from 'react';
import { useStore } from '../../store';
import { Plus, Trash, Tag } from 'lucide-react';

const AdminCategories: React.FC = () => {
    const { categories, addCategory, deleteCategory } = useStore();
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        await addCategory(newCategoryName);
        setNewCategoryName('');
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            await deleteCategory(id);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-gray-800 mb-8">Gerenciar Categorias</h1>

            {/* Add Category Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Adicionar Nova Categoria</h3>
                <form onSubmit={handleAdd} className="flex gap-4">
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Nome da categoria (Ex: Tratores)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-brand-green text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-darkGreen transition-colors flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Adicionar
                    </button>
                </form>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center group hover:border-brand-green transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                                <Tag className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="font-bold text-gray-800 block">{category.name}</span>
                                <span className="text-xs text-gray-400">Slug: {category.slug}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(category.id)}
                            className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir Categoria"
                        >
                            <Trash className="h-5 w-5" />
                        </button>
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                        Nenhuma categoria cadastrada.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;
