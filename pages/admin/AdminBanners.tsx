import React, { useState } from 'react';
import { useStore } from '../../store';
import { Save, Upload, Plus, Trash, AlertCircle } from 'lucide-react';
import { api } from '../../src/services/api';
import { Slide } from '../../types';

const AdminBanners: React.FC = () => {
  const { banners, updateBanner, addBanner, deleteBanner } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newBanner, setNewBanner] = useState<Partial<Slide>>({
    title: '',
    subtitle: '',
    text: '',
    cta: '',
    link: '/produtos',
    image: ''
  });

  const handleUpdate = async (id: number, field: string, value: string) => {
    // Optimistic update handled by store, but we trigger the async action
    await updateBanner(id, { [field]: value });
  };

  const handleFileUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await api.uploadImage(file);
      await updateBanner(id, { image: url });
    } catch (error: any) {
      alert('Erro no upload: ' + error.message);
    } finally {
      e.target.value = '';
    }
  };

  const handleNewBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await api.uploadImage(file);
      setNewBanner(prev => ({ ...prev, image: url }));
    } catch (error: any) {
      alert('Erro no upload: ' + error.message);
    }
  };

  const handleAddBanner = async () => {
    if (!newBanner.image) {
      alert('A imagem é obrigatória!');
      return;
    }

    await addBanner(newBanner as Omit<Slide, 'id'>);
    setIsAdding(false);
    setNewBanner({
      title: '',
      subtitle: '',
      text: '',
      cta: '',
      link: '/produtos',
      image: ''
    });
    alert('Banner criado com sucesso!');
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      await deleteBanner(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-800">Gerenciar Banners da Home</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-brand-green text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-darkGreen transition-colors"
        >
          <Plus className="h-5 w-5" />
          {isAdding ? 'Cancelar' : 'Adicionar Banner'}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-8 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <h4 className="font-bold text-blue-800 text-sm">Tamanho Recomendado</h4>
          <p className="text-sm text-blue-600">
            Para melhor visualização em desktops, utilize imagens com <strong>1920x600 pixels</strong>.
            O sistema ajustará automaticamente para telas menores.
          </p>
          <p className="text-xs text-blue-500 mt-1">
            * Se não preencher título ou texto, o banner será exibido como <strong>"Somente Imagem"</strong> (sem sombra nem botões).
          </p>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white rounded-xl shadow-lg border border-brand-green p-6 mb-8 relative animate-fadeIn">
          <h3 className="text-lg font-bold mb-4 text-brand-darkGreen">Novo Banner</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center overflow-hidden border border-gray-300 relative">
                {newBanner.image ? (
                  <img src={newBanner.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">Sem imagem</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload da Imagem</label>
                <input type="file" onChange={handleNewBannerUpload} className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-brand-green file:text-white
                      hover:file:bg-brand-darkGreen
                    "/>
              </div>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Título Principal"
                className="w-full p-2 border rounded"
                value={newBanner.title}
                onChange={e => setNewBanner({ ...newBanner, title: e.target.value })}
              />
              <input
                placeholder="Subtítulo"
                className="w-full p-2 border rounded"
                value={newBanner.subtitle}
                onChange={e => setNewBanner({ ...newBanner, subtitle: e.target.value })}
              />
              <textarea
                placeholder="Texto Descritivo"
                className="w-full p-2 border rounded"
                rows={2}
                value={newBanner.text}
                onChange={e => setNewBanner({ ...newBanner, text: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Texto do Botão"
                  className="w-full p-2 border rounded"
                  value={newBanner.cta}
                  onChange={e => setNewBanner({ ...newBanner, cta: e.target.value })}
                />
                <input
                  placeholder="Link (/produtos)"
                  className="w-full p-2 border rounded"
                  value={newBanner.link}
                  onChange={e => setNewBanner({ ...newBanner, link: e.target.value })}
                />
              </div>
              <button
                onClick={handleAddBanner}
                className="w-full bg-brand-green text-white py-2 rounded-lg font-bold hover:bg-brand-darkGreen transition-colors"
              >
                Salvar Novo Banner
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {banners.map((banner, index) => (
          <div key={banner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
            <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">Slide #{index + 1}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">ID: {banner.id}</span>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                  title="Excluir Banner"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Pré-visualização da Imagem</label>
                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-300">
                  <img
                    src={banner.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trocar Imagem</label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`upload-${banner.id}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(banner.id, e)}
                    />
                    <label
                      htmlFor={`upload-${banner.id}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-brand-green hover:text-brand-green cursor-pointer transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Carregar Nova Imagem
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                  <input
                    type="text"
                    value={banner.title}
                    onChange={(e) => handleUpdate(banner.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-bold focus:border-brand-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo (Tag)</label>
                  <input
                    type="text"
                    value={banner.subtitle}
                    onChange={(e) => handleUpdate(banner.id, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-brand-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Texto Descritivo</label>
                  <textarea
                    rows={2}
                    value={banner.text}
                    onChange={(e) => handleUpdate(banner.id, 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-brand-green focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
                    <input
                      type="text"
                      value={banner.cta}
                      onChange={(e) => handleUpdate(banner.id, 'cta', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-brand-green focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link de Destino</label>
                    <input
                      type="text"
                      value={banner.link}
                      onChange={(e) => handleUpdate(banner.id, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-brand-green focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBanners;