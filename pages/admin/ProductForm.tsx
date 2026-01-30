import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useStore } from '../../store';
import { Product, ProductCategory } from '../../types';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { api } from '../../src/services/api';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useStore();
  const isEditMode = !!id;

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Product>();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Use API to upload and get URL
      const url = await api.uploadImage(file);
      setValue('imageUrl', url);
    } catch (error: any) {
      console.error(error);
      alert('Erro no upload: ' + (error.message || 'Falha ao enviar imagem'));
    } finally {
      e.target.value = '';
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const product = products.find(p => p.id === id);
      if (product) {
        // Populate form
        setValue('name', product.name);
        setValue('category', product.category);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imageUrl', product.imageUrl);
        setValue('inStock', product.inStock);
      } else if (products.length > 0) {
        // Only redirect if products ARE loaded but ID not found
        // If products.length is 0, we might still be loading, so don't redirect yet
        alert('Produto não encontrado');
        navigate('/admin/produtos');
      }
    }
  }, [id, isEditMode, products, setValue, navigate]);

  const onSubmit = (data: Product) => {
    // Ensure price is a number
    data.price = Number(data.price);

    if (isEditMode && id) {
      updateProduct(id, data);
      alert('Produto atualizado com sucesso!');
    } else {
      const newProduct = {
        ...data,
        id: Date.now().toString(), // Simple ID generation
      };
      addProduct(newProduct);
      alert('Produto criado com sucesso!');
    }
    navigate('/admin/produtos');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/produtos" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-heading font-bold text-gray-800">
          {isEditMode ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
              <input
                {...register('name', { required: 'Nome é obrigatório' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none"
                placeholder="Ex: Trator Valtra A950"
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                {...register('category', { required: 'Selecione uma categoria' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { required: 'Preço é obrigatório', min: 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                {...register('imageUrl', { required: 'Imagem é obrigatória' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mt-1 mb-2">Cole o link direto da imagem ou faça upload.</p>

              <div className="relative">
                <input
                  type="file"
                  id="product-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="product-upload"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-brand-green hover:text-brand-green cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Carregar Imagem (Máx 500KB)
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none"
              placeholder="Detalhes técnicos do produto..."
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <input
              type="checkbox"
              id="inStock"
              {...register('inStock')}
              className="w-5 h-5 text-brand-green rounded focus:ring-brand-green border-gray-300"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-900 cursor-pointer">
              Produto Disponível em Estoque
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-brand-green text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-darkGreen transition-colors shadow-md flex items-center gap-2"
            >
              <Save className="h-5 w-5" />
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;