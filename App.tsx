import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { Navbar, Footer } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import ProductForm from './pages/admin/ProductForm';
import AdminBanners from './pages/admin/AdminBanners';
import AdminCategories from './pages/admin/AdminCategories';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Wrapper for Public Pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const { fetchProducts, fetchBanners, fetchCategories } = useStore();

  useEffect(() => {
    fetchProducts();
    fetchBanners();
    fetchCategories();
  }, [fetchProducts, fetchBanners, fetchCategories]);

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/sobre" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/produtos" element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/contato" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="produtos" element={<AdminProducts />} />
          <Route path="produtos/novo" element={<ProductForm />} />
          <Route path="produtos/:id" element={<ProductForm />} />
          <Route path="categorias" element={<AdminCategories />} />
          <Route path="banners" element={<AdminBanners />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;