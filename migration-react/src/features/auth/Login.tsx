import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('usuario.prueba@test.com');
  const [password, setPassword] = useState('test1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 overflow-hidden select-none">
      {/* Animated Glowing Grids and Orbs */}
      <div className="absolute inset-0 grid-bg animate-grid-move opacity-55 z-0"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-pulse z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[100px] animate-pulse z-0"></div>

      <div className="relative w-full max-w-md px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel glass-panel-glow rounded-2xl border border-zinc-800 p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top border highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-amber-500"></div>

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <motion.div 
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700/60 shadow-inner group overflow-hidden mb-4"
            >
              <div className="absolute inset-0 bg-orange-500/10 rounded-2xl animate-pulse-ring"></div>
              <Shield className="w-8 h-8 text-orange-500 relative z-10 animate-float" />
            </motion.div>
            
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
              SOFT<span className="text-orange-500 font-extrabold">GUARD</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
              CloudSecurity Suite
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-900/60 text-red-400 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-1.5"
            >
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Usuario
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                  <User className="w-4.5 h-4.5" />
                </span>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                  placeholder="usuario.prueba@test.com"
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-1.5"
            >
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Contraseña
                </label>
                <a href="#" className="text-xs text-orange-500 hover:text-orange-400 transition-colors">
                  ¿La olvidaste?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                  <Lock className="w-4.5 h-4.5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full relative flex items-center justify-center py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-sm font-semibold text-white transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none overflow-hidden mt-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <span>Ingresar</span>
              )}
            </motion.button>
          </form>

          {/* Footer inside card */}
          <div className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-widest">
            Monitoreo Centralizado v7.2 React
          </div>
        </motion.div>
      </div>
    </div>
  );
};
