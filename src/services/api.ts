import { Product, Slide, Category } from '../../types';
import { MOCK_PRODUCTS } from '../../constants';

// Toggle this to false to test the Real API even locally (requires CORS on server)
// Or use environment variable VITE_USE_MOCK="true"
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK === 'true'; // Default to FALSE (Real Backend)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/ln_maquinas/php_api';

export const api = {
    getProducts: async (): Promise<Product[]> => {
        if (USE_MOCK_DATA) {
            // Simulate network delay
            return new Promise(resolve => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
        }

        const response = await fetch(`${API_BASE_URL}/products.php`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
        if (USE_MOCK_DATA) {
            return new Promise(resolve => {
                const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
                setTimeout(() => resolve(newProduct), 500);
            });
        }

        const response = await fetch(`${API_BASE_URL}/products.php`, {
            method: 'POST',
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error('Failed to add product');
        const res = await response.json();
        return { ...product, id: res.id.toString() };
    },

    updateProduct: async (id: string, product: Partial<Product>): Promise<void> => {
        if (USE_MOCK_DATA) {
            return new Promise(resolve => setTimeout(resolve, 500));
        }

        await fetch(`${API_BASE_URL}/products.php?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
        });
    },

    deleteProduct: async (id: string): Promise<void> => {
        if (USE_MOCK_DATA) {
            return new Promise(resolve => setTimeout(resolve, 500));
        }

        await fetch(`${API_BASE_URL}/products.php?id=${id}`, {
            method: 'DELETE',
        });
    },

    uploadImage: async (file: File): Promise<string> => {
        // For mock, we just return a fake URL or read as base64 locally
        if (USE_MOCK_DATA) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        }

        // For Real API, we send base64 to the PHP upload script
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result;
                try {
                    const response = await fetch(`${API_BASE_URL}/upload.php`, {
                        method: 'POST',
                        body: JSON.stringify({ image: base64, name: file.name }),
                    });
                    const data = await response.json();
                    if (data.url) resolve(data.url);
                    else reject('Upload failed');
                } catch (e) {
                    reject(e);
                }
            };
            reader.onerror = (error) => reject(error);
        });
    },

    // Banners
    getBanners: async (): Promise<Slide[]> => {
        if (USE_MOCK_DATA) {
            // Mock data is cleaner to import from constants, but specific mock implementation here if needed
            // For now assume store handles mock initial state if this returns empty or fail
            return [];
        }
        const response = await fetch(`${API_BASE_URL}/banners.php`);
        if (!response.ok) throw new Error('Failed to fetch banners');
        return response.json();
    },

    addBanner: async (banner: Omit<Slide, 'id'>): Promise<Slide> => {
        if (USE_MOCK_DATA) {
            return new Promise(resolve => {
                const newBanner = { ...banner, id: Math.random() };
                setTimeout(() => resolve(newBanner), 500);
            });
        }
        const response = await fetch(`${API_BASE_URL}/banners.php`, {
            method: 'POST',
            body: JSON.stringify(banner),
        });
        if (!response.ok) throw new Error('Failed to add banner');
        const res = await response.json();
        return { ...banner, id: res.id };
    },

    updateBanner: async (id: number, banner: Partial<Slide>): Promise<void> => {
        if (USE_MOCK_DATA) return;
        await fetch(`${API_BASE_URL}/banners.php?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(banner),
        });
    },

    deleteBanner: async (id: number): Promise<void> => {
        if (USE_MOCK_DATA) return;
        await fetch(`${API_BASE_URL}/banners.php?id=${id}`, {
            method: 'DELETE',
        });
    },

    // Categories
    getCategories: async (): Promise<Category[]> => {
        if (USE_MOCK_DATA) return [];
        const response = await fetch(`${API_BASE_URL}/categories.php`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },

    addCategory: async (category: Omit<Category, 'id'>): Promise<Category> => {
        if (USE_MOCK_DATA) return { ...category, id: Math.random() };
        const response = await fetch(`${API_BASE_URL}/categories.php`, {
            method: 'POST',
            body: JSON.stringify(category),
        });
        if (!response.ok) throw new Error('Failed to add category');
        const res = await response.json();
        return { ...category, id: res.id, slug: res.slug };
    },

    deleteCategory: async (id: number): Promise<void> => {
        if (USE_MOCK_DATA) return;
        await fetch(`${API_BASE_URL}/categories.php?id=${id}`, {
            method: 'DELETE',
        });
    }
};
