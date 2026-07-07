import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Slide, Category, Partner, SEOSettings } from './types';
import { INITIAL_SLIDES } from './constants';
import { api } from '@/src/services/api';

interface AppState {
  // UI State
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;

  // Data State
  products: Product[];
  banners: Slide[];
  isLoading: boolean;
  error: string | null;

  // Auth State
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;

  // Actions
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateBanner: (id: number, banner: Partial<Slide>) => Promise<void>;
  addBanner: (banner: Omit<Slide, 'id'>) => Promise<void>;
  deleteBanner: (id: number) => Promise<void>;
  fetchBanners: () => Promise<void>;

  // Category Actions
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;

  // Partner Actions
  partners: Partner[];
  fetchPartners: () => Promise<void>;
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  deletePartner: (id: number) => Promise<void>;

  // SEO Actions
  seoSettings: SEOSettings[];
  fetchSEO: () => Promise<void>;
  updateSEO: (seo: SEOSettings) => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // UI
      isMobileMenuOpen: false,
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      // Data
      products: [],
      banners: [],
      isLoading: false,
      error: null,

      // Auth
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),

      // Product Actions
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const products = await api.getProducts();
          set({ products, isLoading: false });
        } catch (error) {
          set({ error: 'Erro ao carregar produtos', isLoading: false });
        }
      },

      addProduct: async (product) => {
        set({ isLoading: true });
        try {
          const newProduct = await api.addProduct(product);
          set((state) => ({
            products: [newProduct, ...state.products],
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao criar produto', isLoading: false });
          throw error;
        }
      },
      updateProduct: async (id, updatedProduct) => {
        set({ isLoading: true });
        try {
          await api.updateProduct(id, updatedProduct);
          set((state) => ({
            products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao atualizar produto', isLoading: false });
          throw error;
        }
      },
      deleteProduct: async (id) => {
        set({ isLoading: true });
        try {
          await api.deleteProduct(id);
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao deletar produto', isLoading: false });
        }
      },

      // Banner Actions (Still local for now, as per plan priority)
      // Banner Actions
      fetchBanners: async () => {
        // If mock, we might want to keep initial slides, but for consistency let's try to fetch
        try {
          const banners = await api.getBanners();
          if (banners.length > 0) {
            set({ banners });
          }
        } catch (error) {
          console.error('Error fetching banners', error);
        }
      },
      addBanner: async (banner) => {
        try {
          const newBanner = await api.addBanner(banner);
          set(state => ({ banners: [...state.banners, newBanner] }));
        } catch (error) {
          console.error('Error adding banner', error);
          alert('Erro ao adicionar banner');
        }
      },
      updateBanner: async (id, updatedBanner) => {
        try {
          await api.updateBanner(id, updatedBanner);
          set((state) => ({
            banners: state.banners.map((b) => (b.id === id ? { ...b, ...updatedBanner } : b))
          }));
        } catch (error) {
          console.error('Error updating banner', error);
        }
      },
      deleteBanner: async (id) => {
        try {
          await api.deleteBanner(id);
          set(state => ({
            banners: state.banners.filter(b => b.id !== id)
          }));
        } catch (error) {
          console.error('Error deleting banner', error);
          alert('Erro ao deletar banner');
        }
      },

      // Category Actions
      categories: [],
      fetchCategories: async () => {
        try {
          const categories = await api.getCategories();
          set({ categories });
        } catch (error) {
          console.error('Error fetching categories', error);
        }
      },
      addCategory: async (name) => {
        try {
          const newCategory = await api.addCategory({ name, slug: '' }); // Slug is handled by backend or derived
          set(state => ({ categories: [...state.categories, newCategory] }));
        } catch (error) {
          console.error('Error adding category', error);
          alert('Erro ao adicionar categoria');
        }
      },
      deleteCategory: async (id) => {
        try {
          await api.deleteCategory(id);
          set(state => ({ categories: state.categories.filter(c => c.id !== id) }));
        } catch (error) {
          console.error('Error deleting category', error);
          alert('Erro ao deletar categoria');
        }
      },

      // Partners
      partners: [],
      fetchPartners: async () => {
        try {
          const partners = await api.getPartners();
          set({ partners });
        } catch (error) {
          console.error('Error fetching partners', error);
        }
      },
      addPartner: async (partner) => {
        try {
          const newPartner = await api.addPartner(partner);
          set(state => ({ partners: [...state.partners, newPartner] }));
        } catch (error) {
          console.error('Error adding partner', error);
          alert('Erro ao adicionar parceiro');
        }
      },
      deletePartner: async (id) => {
        try {
          await api.deletePartner(id);
          set(state => ({ partners: state.partners.filter(p => p.id !== id) }));
        } catch (error) {
          console.error('Error deleting partner', error);
          alert('Erro ao deletar parceiro');
        }
      },

      // SEO
      seoSettings: [],
      fetchSEO: async () => {
        try {
          const seo = await api.getSEO() as SEOSettings[];
          set({ seoSettings: Array.isArray(seo) ? seo : [] });
        } catch (error) {
          console.error('Error fetching SEO settings', error);
        }
      },
      updateSEO: async (seo) => {
        try {
          await api.updateSEO(seo);
          set(state => ({
            seoSettings: state.seoSettings.map(s => s.page === seo.page ? { ...s, ...seo } : s)
          }));
          // If the page doesn't exist in local state, we should fetch all again to sync
          const exists = get().seoSettings.find(s => s.page === seo.page);
          if (!exists) {
            await get().fetchSEO();
          }
        } catch (error) {
          console.error('Error updating SEO', error);
          alert('Erro ao atualizar SEO');
        }
      },
    }),
    {
      name: 'ln-maquinas-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);