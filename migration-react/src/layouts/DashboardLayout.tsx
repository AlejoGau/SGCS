import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CreditCard, 
  Map, 
  Users, 
  LogOut, 
  Bell, 
  CircleDot, 
  Server, 
  Database,
  Terminal,
  Activity,
  Sun,
  Moon,
  Settings
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  activeModule: 'billing' | 'admin' | 'trackguard';
  onChangeModule: (module: 'billing' | 'admin' | 'trackguard') => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout, activeModule, onChangeModule }) => {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen w-full flex bg-zinc-950 text-zinc-100 overflow-hidden relative font-sans">
      
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 z-0 pointer-events-none"></div>

      {/* Sidebar Layout */}
      <aside className="w-64 bg-zinc-900/45 backdrop-blur-md border-r border-zinc-850 flex flex-col z-10 shrink-0 select-none">
        
        {/* Sidebar Brand header */}
        <div className="h-16 px-6 border-b border-zinc-850 flex items-center gap-3 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-600 via-orange-400 to-amber-500"></div>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-600/10 border border-orange-500/30">
            <Shield className="w-4.5 h-4.5 text-orange-500" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center leading-none">
              SOFT<span className="text-orange-500 font-extrabold ml-0.5">GUARD</span>
            </h1>
            <span className="text-[9px] text-zinc-500 tracking-wider font-semibold uppercase leading-none mt-0.5 block">
              CloudSecurity Suite
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider px-3">
              Módulos Principales
            </span>
            
            {/* MultiMonitor */}
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 border border-transparent transition-all group text-left outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 active:scale-[0.98]">
              <span className="flex items-center gap-2.5 text-xs font-semibold">
                <CircleDot className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                <span>MultiMonitor Web</span>
              </span>
              <span className="text-[8px] bg-zinc-850 border border-zinc-800 text-zinc-500 px-1 py-0.5 rounded uppercase font-mono font-bold">
                Legacy
              </span>
            </button>

            {/* Client Portal / CRM */}
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 border border-transparent transition-all group text-left outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 active:scale-[0.98]">
              <span className="flex items-center gap-2.5 text-xs font-semibold">
                <Users className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                <span>WebRemoto / CRM</span>
              </span>
              <span className="text-[8px] bg-zinc-850 border border-zinc-800 text-zinc-500 px-1 py-0.5 rounded uppercase font-mono font-bold">
                Legacy
              </span>
            </button>

            {/* Billing */}
            <button 
              onClick={() => onChangeModule('billing')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 active:scale-[0.98] ${
                activeModule === 'billing'
                  ? 'border border-orange-500/20 bg-orange-500/5 text-orange-400 font-bold'
                  : 'border border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
              }`}
            >
              <span className="flex items-center gap-2.5 text-xs">
                <CreditCard className={`w-4 h-4 ${activeModule === 'billing' ? 'text-orange-500' : 'text-zinc-600'}`} />
                <span>Cuentas y Facturación</span>
              </span>
              <span className={`text-[8px] px-1 py-0.5 rounded uppercase font-mono font-bold ${
                activeModule === 'billing'
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'bg-zinc-850 border border-zinc-800 text-zinc-500'
              }`}>
                React
              </span>
            </button>

            {/* Configuración (Admin) */}
            <button 
              onClick={() => onChangeModule('admin')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 active:scale-[0.98] ${
                activeModule === 'admin'
                  ? 'border border-orange-500/20 bg-orange-500/5 text-orange-400 font-bold'
                  : 'border border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
              }`}
            >
              <span className="flex items-center gap-2.5 text-xs">
                <Settings className={`w-4 h-4 ${activeModule === 'admin' ? 'text-orange-500' : 'text-zinc-600'}`} />
                <span>Configuración (Admin)</span>
              </span>
              <span className={`text-[8px] px-1 py-0.5 rounded uppercase font-mono font-bold ${
                activeModule === 'admin'
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'bg-zinc-850 border border-zinc-800 text-zinc-500'
              }`}>
                React
              </span>
            </button>

            {/* TrackGuard GPS */}
            <button 
              onClick={() => onChangeModule('trackguard')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 active:scale-[0.98] ${
                activeModule === 'trackguard'
                  ? 'border border-orange-500/20 bg-orange-500/5 text-orange-400 font-bold'
                  : 'border border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
              }`}
            >
              <span className="flex items-center gap-2.5 text-xs">
                <Map className={`w-4 h-4 ${activeModule === 'trackguard' ? 'text-orange-500' : 'text-zinc-600'}`} />
                <span>TrackGuard GPS</span>
              </span>
              <span className={`text-[8px] px-1 py-0.5 rounded uppercase font-mono font-bold ${
                activeModule === 'trackguard'
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'bg-zinc-850 border border-zinc-800 text-zinc-500'
              }`}>
                React
              </span>
            </button>
          </div>

          {/* System Telemetry stats inside sidebar */}
          <div className="space-y-2 border-t border-zinc-850/60 pt-4">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider px-3 block">
              Servidores Locales
            </span>
            <div className="px-3 space-y-1.5 text-[10px]">
              <div className="flex justify-between items-center text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3 h-3 text-emerald-500" />
                  SQL Server
                </span>
                <span className="text-emerald-400 font-bold font-mono">OK</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3 h-3 text-emerald-500" />
                  Caddy Dev Proxy
                </span>
                <span className="text-emerald-400 font-bold font-mono">OK</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-orange-500" />
                  Vite HMR Host
                </span>
                <span className="text-orange-400 font-bold font-mono">3000</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Operator Profile and Logout footer */}
        <div className="p-4 border-t border-zinc-850 flex flex-col gap-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-orange-600/10 border border-orange-500/20 flex items-center justify-center font-bold text-orange-500 text-xs">
              AG
            </div>
            <div className="truncate">
              <h6 className="text-xs font-bold text-white leading-none">Alejo Gautier</h6>
              <span className="text-[9px] text-zinc-500 font-medium uppercase mt-0.5 block leading-none">
                Administrador
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="btn-danger-outline w-full py-2 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10">
        
        {/* Top Header */}
        <header className="h-16 border-b border-zinc-850 px-8 flex items-center justify-between select-none">
          {/* Ticker / Real time telemetry */}
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-850 px-2.5 py-1 rounded-lg">
              <Activity className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span className="font-semibold text-zinc-300">Monitoreo activo</span>
            </div>
            <div className="hidden md:block">
              <span className="text-zinc-500">Fecha:</span>{' '}
              <span className="font-medium text-zinc-300">{formatDate(time)}</span>
            </div>
          </div>

          {/* Time and notifications */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-bold font-mono text-white block">{formatTime(time)}</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest leading-none font-semibold">GTM-3</span>
            </div>
            
            <button 
              onClick={toggleTheme}
              className="btn-secondary p-2 hover:text-orange-500 transition-colors"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            <button className="btn-secondary p-2 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>
            </button>
          </div>
        </header>

        {/* Feature Sub-Layout */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

    </div>
  );
};
