import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { api } from '../../src/services/api';
import { Plus, Trash, Image as ImageIcon } from 'lucide-react';

export default function AdminPartners() {
  const { partners, fetchPartners, deletePartner } = useStore();
  const [isUploading, setIsUploading] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !selectedFile) {
      alert('Preencha o nome e selecione uma imagem.');
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await api.uploadImage(selectedFile);
      await useStore.getState().addPartner({
        name: partnerName,
        image_url: imageUrl,
        order_index: partners.length + 1
      });
      setPartnerName('');
      setSelectedFile(null);
      // reset file input
      const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      alert('Erro ao fazer upload da logo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Parceiros</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Novo Parceiro</h2>
        <form onSubmit={handleAddPartner} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Parceiro</label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ex: XAG"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo do Parceiro</label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus size={20} />
            {isUploading ? 'Adicionando...' : 'Adicionar Parceiro'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden p-2">
                    {partner.image_url ? (
                      <img src={partner.image_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <ImageIcon className="text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja remover este parceiro?')) {
                        deletePartner(partner.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-900 ml-4"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  Nenhum parceiro cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
