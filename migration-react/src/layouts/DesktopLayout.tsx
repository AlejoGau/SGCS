import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Settings, 
  Map, 
  Activity, 
  Users, 
  Bell, 
  Shield, 
  FileText, 
  Radio, 
  Smartphone, 
  Video, 
  Lock, 
  Cpu, 
  PhoneCall, 
  Compass, 
  DollarSign, 
  TrendingUp, 
  Monitor, 
  Wrench, 
  AlertTriangle, 
  Car, 
  UserCheck, 
  Briefcase, 
  ShieldAlert, 
  Layers,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Taskbar, OpenWindow } from '../components/Taskbar';
import { StartMenu } from '../components/StartMenu';
import { ExitModal } from '../components/ExitModal';
import { ModuleHelpGuide, ModuleGuideKey } from '../components/ModuleHelpGuide';

interface ModuleIconDef {
  id: string;
  title: string;
  icon: React.ElementType;
  isReact: boolean;
  color: string;
}

interface DesktopLayoutProps {
  children?: React.ReactNode;
  onLogout: () => void;
  activeModule: 'billing' | 'admin' | 'trackguard' | string;
  onChangeModule: (module: 'billing' | 'admin' | 'trackguard' | string) => void;
  renderModuleComponent: (moduleId: string) => React.ReactNode;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  onLogout,
  activeModule,
  onChangeModule,
  renderModuleComponent
}) => {
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [openInNewWindow, setOpenInNewWindow] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [helpModuleKey, setHelpModuleKey] = useState<ModuleGuideKey>('desktop');
  const [enable3DEffect, setEnable3DEffect] = useState<boolean>(() => {
    const saved = localStorage.getItem('softguard_3d_wallpaper');
    return saved !== null ? saved === 'true' : true;
  });

  const handleToggle3DEffect = (val: boolean) => {
    setEnable3DEffect(val);
    localStorage.setItem('softguard_3d_wallpaper', String(val));
  };

  const handleOpenHelp = (moduleKey?: string) => {
    const key = (moduleKey || activeWindowId || 'desktop') as ModuleGuideKey;
    setHelpModuleKey(key);
    setIsHelpModalOpen(true);
  };

  // Managed Open Windows
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([
    { id: 'billing', title: 'Cuentas y Facturación', module: 'billing', isMinimized: false, isMaximized: true }
  ]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>('billing');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Softguard Full Icons Grid (matching Screenshots 1 & 3)
  const modulesGrid: ModuleIconDef[] = [
    // Row 1 (14 icons)
    { id: 'billing', title: 'Cuentas', icon: CreditCard, isReact: true, color: 'from-orange-500 to-amber-600' },
    { id: 'admin', title: 'Configuración', icon: Settings, isReact: true, color: 'from-blue-500 to-indigo-600' },
    { id: 'cercas', title: 'Cercas', icon: Layers, isReact: false, color: 'from-yellow-500 to-amber-500' },
    { id: 'notificaciones', title: 'Notificaciones', icon: Bell, isReact: false, color: 'from-amber-500 to-orange-500' },
    { id: 'reportes', title: 'Reportes', icon: FileText, isReact: false, color: 'from-slate-500 to-zinc-600' },
    { id: 'cleanapp', title: 'CleanApp', icon: Sparkles, isReact: false, color: 'from-purple-500 to-indigo-500' },
    { id: 'ingresos', title: 'Ingresos y egresos', icon: UserCheck, isReact: false, color: 'from-emerald-500 to-teal-600' },
    { id: 'crm', title: 'CRM', icon: Users, isReact: false, color: 'from-sky-500 to-blue-600' },
    { id: 'sim', title: 'Tarjetas SIM', icon: Cpu, isReact: false, color: 'from-green-500 to-emerald-600' },
    { id: 'iot', title: 'IoT', icon: Cpu, isReact: false, color: 'from-cyan-500 to-blue-500' },
    { id: 'enlaces', title: 'Enlaces', icon: Radio, isReact: false, color: 'from-indigo-500 to-purple-600' },
    { id: 'grabacion', title: 'Grabación de llamadas', icon: PhoneCall, isReact: false, color: 'from-rose-500 to-red-600' },
    { id: 'mapguard', title: 'MapGuard', icon: Compass, isReact: false, color: 'from-teal-500 to-emerald-600' },
    { id: 'moneyguard', title: 'MoneyGuard', icon: DollarSign, isReact: false, color: 'from-amber-600 to-yellow-500' },

    // Row 2 (14 icons)
    { id: 'trafico', title: 'Tráfico', icon: TrendingUp, isReact: false, color: 'from-blue-600 to-cyan-600' },
    { id: 'monitoreo', title: 'Monitoreo', icon: Monitor, isReact: false, color: 'from-emerald-600 to-teal-700' },
    { id: 'multimonitor', title: 'MultiMonitor', icon: Activity, isReact: false, color: 'from-orange-600 to-red-500' },
    { id: 'netcamara', title: 'NetCamara', icon: Video, isReact: false, color: 'from-sky-600 to-blue-700' },
    { id: 'servicio_tecnico', title: 'Servicio Técnico', icon: Wrench, isReact: false, color: 'from-amber-600 to-orange-600' },
    { id: 'novedades', title: 'Novedades', icon: AlertTriangle, isReact: false, color: 'from-yellow-600 to-amber-700' },
    { id: 'smartpanics', title: 'SmartPanics', icon: Smartphone, isReact: false, color: 'from-red-600 to-rose-700' },
    { id: 'trackguard', title: 'TrackGuard', icon: Map, isReact: true, color: 'from-emerald-500 to-green-600' },
    { id: 'moviles', title: 'Mis móviles', icon: Car, isReact: false, color: 'from-red-500 to-pink-600' },
    { id: 'video', title: 'Video', icon: Video, isReact: false, color: 'from-blue-500 to-indigo-600' },
    { id: 'vigicontrol', title: 'VigiControl', icon: Lock, isReact: false, color: 'from-cyan-600 to-teal-700' },
    { id: 'clientes', title: 'Clientes', icon: Users, isReact: false, color: 'from-slate-600 to-zinc-700' },
    { id: 'dealer', title: 'Dealer', icon: Briefcase, isReact: false, color: 'from-indigo-600 to-purple-700' },
    { id: 'manager', title: 'Manager', icon: Shield, isReact: false, color: 'from-orange-500 to-amber-600' },

    // Row 3
    { id: 'autoridades', title: 'Autoridades', icon: ShieldAlert, isReact: false, color: 'from-yellow-500 to-orange-600' },
  ];

  const handleLaunchModule = (moduleId: string) => {
    const modDef = modulesGrid.find(m => m.id === moduleId);
    const title = modDef ? modDef.title : moduleId;

    // Check if window is already open
    const existing = openWindows.find(w => w.id === moduleId);
    if (existing) {
      setOpenWindows(prev => prev.map(w => w.id === moduleId ? { ...w, isMinimized: false } : w));
      setActiveWindowId(moduleId);
      onChangeModule(moduleId);
      return;
    }

    // Open new window
    const newWin: OpenWindow = {
      id: moduleId,
      title: title,
      module: moduleId,
      isMinimized: false,
      isMaximized: true
    };
    setOpenWindows(prev => [...prev, newWin]);
    setActiveWindowId(moduleId);
    onChangeModule(moduleId);
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      const remaining = openWindows.filter(w => w.id !== windowId);
      if (remaining.length > 0) {
        setActiveWindowId(remaining[remaining.length - 1].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleToggleMinimize = (windowId: string) => {
    setOpenWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return { ...w, isMinimized: !w.isMinimized };
      }
      return w;
    }));
  };

  const handleToggleMaximize = (windowId: string) => {
    setOpenWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return { ...w, isMaximized: !w.isMaximized };
      }
      return w;
    }));
  };

  // Date Formatting Matching Screenshot 1
  const formatDayName = (date: Date) => {
    const day = date.toLocaleDateString('es-AR', { weekday: 'long' });
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const formatDayMonth = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('es-AR', { month: 'long' });
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  };

  const formatHoursMinutes = (date: Date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans select-none flex flex-col">
      
      {/* Background Softguard Desktop Wallpaper (Tema Negro y Naranja) */}
      <div className="absolute inset-0 bg-zinc-950 z-0 overflow-hidden select-none">
        
        {/* Base Gradient: Deep Obsidian Black with Orange Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-950/25 via-zinc-950 to-zinc-950" />
        
        {/* Decorative Hexagon/Grid Lines */}
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        {/* Glowing Orange Radial Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[100px] pointer-events-none" />

        {/* Large Softguard "G" Logo Watermark (Animación 3D o Estático según preferencia) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none [perspective:1000px]">
          {enable3DEffect ? (
            <motion.div
              className="relative flex items-center justify-center rounded-full p-2"
              animate={{ 
                rotateY: [0, 360],
                y: [0, -15, 0],
                rotateX: [8, 2, 8]
              }}
              transition={{
                rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Glowing Orange Background Ring */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-orange-600/20 via-amber-500/10 to-transparent blur-3xl" />

              {/* Official Softguard 3D Logo Emblem */}
              <img 
                src="/softguard-logo.jpg" 
                alt="Softguard 3D Logo Emblem" 
                className="w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full object-cover opacity-[0.15] filter drop-shadow-[0_0_90px_rgba(249,115,22,0.35)] pointer-events-none border border-orange-500/20 shadow-2xl" 
              />
            </motion.div>
          ) : (
            <div className="relative flex items-center justify-center rounded-full p-2">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-orange-600/15 via-amber-500/5 to-transparent blur-2xl" />
              <img 
                src="/softguard-logo.jpg" 
                alt="Softguard Logo Emblem" 
                className="w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full object-cover opacity-[0.12] filter drop-shadow-[0_0_80px_rgba(249,115,22,0.3)] pointer-events-none border border-orange-500/20" 
              />
            </div>
          )}
        </div>

        {/* Bottom Right Softguard Branding (Oficial - Screenshot 1 & 3) */}
        <div className="absolute bottom-14 right-8 text-right z-10 select-none opacity-95">
          <div className="flex items-center justify-end gap-3 mb-1">
            {/* Softguard Logo Official Image Box */}
            <img 
              src="/softguard-logo.jpg" 
              alt="Softguard" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-orange-600/40 border border-orange-400/40" 
            />
            <div className="text-left">
              <h2 className="text-2xl font-black tracking-tight text-white leading-none">
                Soft<span className="text-orange-500">Guard</span>
              </h2>
              <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase block leading-none mt-1">
                CloudSecurity Suite
              </span>
            </div>
          </div>
          <div className="inline-block bg-zinc-900/90 border border-orange-500/40 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-orange-400 shadow-md">
            SERVER <span className="text-white">DESARROLLO</span>
          </div>
        </div>
      </div>

      {/* Top Right Date & Time Widget (Fixed position, non-overlapping) */}
      <div className="absolute top-4 right-6 z-20 text-right select-none pointer-events-none">
        <div className="text-lg font-medium text-zinc-300 capitalize leading-none tracking-wide">
          {formatDayName(time)}
        </div>
        <div className="text-3xl font-extrabold text-white tracking-tight leading-tight mt-0.5">
          {formatDayMonth(time)}
        </div>
        <div className="text-5xl font-black font-mono text-zinc-100 tracking-tighter mt-1 drop-shadow-md">
          {formatHoursMinutes(time)}
        </div>

        {/* Telemetry Status Pills */}
        <div className="flex items-center justify-end gap-2 mt-3 pointer-events-auto">
          <div 
            onClick={() => handleOpenHelp('desktop')}
            className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/30 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase text-orange-400 hover:bg-orange-500/20 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            title="Abrir Guía Interactiva de Pantallas"
          >
            <HelpCircle className="w-3 h-3 text-orange-400" />
            <span>GUÍA INTERACTIVA</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer">
            SIN MENSAJES
          </div>
          <div className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">
            ALERTAS
          </div>
        </div>
      </div>

      {/* Main Desktop Workspace Area */}
      <div className="relative z-10 flex-1 p-4 sm:p-6 overflow-hidden">
        
        {/* Desktop Icons Grid (Responsive Flex / Grid bounded to avoid Widget collision) */}
        <div className="flex flex-wrap gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-4 max-w-full xl:max-w-[calc(100vw-280px)] z-10">
          {modulesGrid.map((mod) => {
            const Icon = mod.icon;
            const isOpen = openWindows.some(w => w.id === mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => handleLaunchModule(mod.id)}
                className={`group relative flex flex-col items-center justify-start w-[72px] sm:w-[80px] p-1.5 rounded-xl cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95 ${
                  isOpen ? 'bg-zinc-800/60 ring-1 ring-orange-500/50' : 'hover:bg-zinc-900/60 hover:backdrop-blur-md'
                }`}
              >
                {/* Icon Container with Gradient */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${mod.color} p-0.5 shadow-lg group-hover:shadow-orange-500/20 transition-all flex items-center justify-center relative shrink-0`}>
                  <div className="w-full h-full bg-zinc-950/40 rounded-[10px] flex items-center justify-center backdrop-blur-xs">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                  </div>

                  {/* React Migrated Badge */}
                  {mod.isReact && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border border-zinc-950"></span>
                    </span>
                  )}
                </div>

                {/* Module Label */}
                <span className="text-[10px] sm:text-[11px] font-medium text-zinc-200 group-hover:text-white text-center mt-1 leading-tight truncate w-full drop-shadow-sm">
                  {mod.title}
                </span>

                {/* Status Indicator */}
                {mod.isReact ? (
                  <span className="text-[7px] sm:text-[8px] text-orange-400 font-bold font-mono uppercase tracking-wider mt-0.5">
                    REACT
                  </span>
                ) : (
                  <span className="text-[7px] sm:text-[8px] text-zinc-500 font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                    Legacy
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Windows Workspace Container */}
        {openWindows.map((win) => {
          if (win.isMinimized) return null;
          const isActive = win.id === activeWindowId;

          return (
            <div
              key={win.id}
              onClick={() => setActiveWindowId(win.id)}
              className={`absolute transition-all duration-150 flex flex-col bg-zinc-950 border rounded-xl shadow-2xl overflow-hidden z-30 ${
                win.isMaximized 
                  ? 'inset-2 bottom-12' 
                  : 'top-10 left-8 right-8 bottom-16 md:left-16 md:right-16 md:top-12'
              } ${
                isActive 
                  ? 'border-orange-500/40 ring-1 ring-orange-500/20 shadow-orange-950/50' 
                  : 'border-zinc-800 opacity-95'
              }`}
            >
              {/* Window Header Titlebar */}
              <div className={`h-9 px-4 flex items-center justify-between border-b select-none shrink-0 ${
                isActive ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-925 border-zinc-850'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-bold text-zinc-100">{win.title}</span>
                  <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                    React Module
                  </span>
                </div>

                {/* Window Action Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenHelp(win.module);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition-colors"
                    title="Ver Guía del Módulo"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMinimize(win.id);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                    title="Minimizar"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMaximize(win.id);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                    title={win.isMaximized ? "Restaurar" : "Maximizar"}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseWindow(win.id);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-600/80 text-zinc-400 hover:text-white transition-colors"
                    title="Cerrar"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Window Main Content Area */}
              <div className="flex-1 overflow-y-auto bg-zinc-950 p-4">
                {renderModuleComponent(win.module)}
              </div>
            </div>
          );
        })}

      </div>

      {/* Start Menu Popup */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onSelectModule={handleLaunchModule}
        onSaveWindowPositions={() => alert('Posición de ventanas guardada')}
        onOpenUserReport={() => alert('Reporte de usuario generado')}
        openInNewWindow={openInNewWindow}
        onToggleOpenInNewWindow={setOpenInNewWindow}
        enable3DEffect={enable3DEffect}
        onToggle3DEffect={handleToggle3DEffect}
      />

      {/* Bottom Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onToggleStartMenu={() => setIsStartMenuOpen(prev => !prev)}
        isStartMenuOpen={isStartMenuOpen}
        onFocusWindow={(id) => {
          setActiveWindowId(id);
          setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
        }}
        onCloseWindow={handleCloseWindow}
        onTriggerExit={() => setIsExitModalOpen(true)}
      />

      {/* Exit Confirmation Modal (Screenshot 3) */}
      <ExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => {
          setIsExitModalOpen(false);
          onLogout();
        }}
      />

      {/* Module Step-by-Step Help Guide Modal */}
      <ModuleHelpGuide
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        moduleKey={helpModuleKey}
      />

    </div>
  );
};
