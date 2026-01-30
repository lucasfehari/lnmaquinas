import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { Tractor, Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (user === import.meta.env.VITE_ADMIN_USER && pass === import.meta.env.VITE_ADMIN_PASS) {
      login();
      navigate('/admin');
    } else {
      setError('Credenciais inválidas. Tente admin/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="bg-brand-green w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
            <Tractor className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-brand-darkGreen">Acesso Restrito</h1>
          <p className="text-gray-500 text-sm">Painel Administrativo LN Máquinas</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative">
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:outline-none"
                placeholder="admin"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-brand-darkGreen text-white py-3 rounded-lg font-bold hover:bg-brand-green transition-colors shadow-lg"
          >
            Entrar no Painel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;