import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { LayoutDashboard, Package, Images, LogOut, Tractor, Home as HomeIcon, Tag } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark flex-shrink-0 text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-gray-700">
          <Tractor className="h-6 w-6 text-brand-yellow" />
          <span className="font-heading font-bold text-lg">LN Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin') ? 'bg-brand-green text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/produtos"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/produtos') || location.pathname.includes('/produtos') ? 'bg-brand-green text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            <Package className="h-5 w-5" />
            Produtos
          </Link>
          <Link
            to="/admin/categorias"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/categorias') ? 'bg-brand-green text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            <Tag className="h-5 w-5" />
            Categorias
          </Link>
          <Link
            to="/admin/banners"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/banners') ? 'bg-brand-green text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            <Images className="h-5 w-5" />
            Banners Home
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-brand-yellow transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
            Ver Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors text-left"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Header (simplified) */}
      <div className="md:hidden absolute top-0 left-0 right-0 bg-brand-dark text-white p-4 flex justify-between items-center z-50">
        <span className="font-bold">LN Admin</span>
        <button onClick={handleLogout}><LogOut className="h-5 w-5" /></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:p-8 p-4 pt-20 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
};