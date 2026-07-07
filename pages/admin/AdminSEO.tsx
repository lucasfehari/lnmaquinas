import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { SEOSettings } from '../../types';
import { Save } from 'lucide-react';

const PAGES = [
  { id: 'home', name: 'Home' },
  { id: 'products', name: 'Produtos' },
  { id: 'about', name: 'Sobre Nós' },
  { id: 'contact', name: 'Contato' }
];

export default function AdminSEO() {
  const { seoSettings, fetchSEO, updateSEO } = useStore();
  const [selectedPage, setSelectedPage] = useState('home');
  const [formData, setFormData] = useState<Omit<SEOSettings, 'id'>>({
    page: 'home',
    title: '',
    description: '',
    keywords: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSEO();
  }, [fetchSEO]);

  useEffect(() => {
    const currentSEO = seoSettings.find(s => s.page === selectedPage);
    if (currentSEO) {
      setFormData({
        page: currentSEO.page,
        title: currentSEO.title || '',
        description: currentSEO.description || '',
        keywords: currentSEO.keywords || ''
      });
    } else {
      setFormData({
        page: selectedPage,
        title: '',
        description: '',
        keywords: ''
      });
    }
  }, [selectedPage, seoSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSEO(formData);
      alert('Configurações de SEO salvas com sucesso!');
    } catch (error) {
      // Error handled in store
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Configurações de SEO</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {PAGES.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors ${
                  selectedPage === page.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {page.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título da Página (Meta Title)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ex: LN Máquinas - Início"
                maxLength={60}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                O título ideal deve ter entre 50 e 60 caracteres. ({formData.title.length}/60)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição (Meta Description)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Uma breve descrição sobre a página que aparecerá no Google."
                maxLength={160}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                A descrição ideal deve ter até 160 caracteres. ({formData.description.length}/160)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Palavras-chave (Keywords)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ex: máquinas agrícolas, trator, pulverizador"
              />
              <p className="mt-1 text-xs text-gray-500">
                Separe as palavras-chave por vírgula.
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isSaving ? 'Salvando...' : 'Salvar Configurações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
