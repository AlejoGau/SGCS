import React from 'react';
import { 
  Shield, 
  LogOut, 
  Clock, 
  User, 
  CreditCard, 
  Settings, 
  Map, 
  ChevronUp, 
  Minimize2, 
  Maximize2,
  X
} from 'lucide-react';

export interface OpenWindow {
  id: string;
  title: string;
  module: 'billing' | 'admin' | 'trackguard' | string;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface TaskbarProps {
  openWindows: OpenWindow[];
  activeWindowId: string | null;
  onToggleStartMenu: () => void;
  isStartMenuOpen: boolean;
  onFocusWindow: (windowId: string) => void;
  onCloseWindow: (windowId: string) => void;
  onTriggerExit: () => void;
  userName?: string;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindowId,
  onToggleStartMenu,
  isStartMenuOpen,
  onFocusWindow,
  onCloseWindow,
  onTriggerExit,
  userName = 'Usuario de Prueba'
}) => {
  const [timeStr, setTimeStr] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'billing': return CreditCard;
      case 'admin': return Settings;
      case 'trackguard': return Map;
      default: return Shield;
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-zinc-900/95 border-t border-zinc-800 backdrop-blur-xl z-40 flex items-center justify-between px-2 select-none text-zinc-300 font-sans">
      
      {/* Left: Start Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleStartMenu}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all outline-none ${
            isStartMenuOpen 
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-1 ring-orange-400' 
              : 'bg-zinc-800/90 text-zinc-200 hover:bg-zinc-750 hover:text-white border border-zinc-700/80 active:scale-95'
          }`}
        >
          <img src="/softguard-logo.jpg" alt="Softguard" className="w-4 h-4 rounded-full object-cover shrink-0" />
          <span>Inicio</span>
          <ChevronUp className={`w-3 h-3 transition-transform ${isStartMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Separator */}
        <div className="h-5 w-[1px] bg-zinc-800" />

        {/* Center: Open Window Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[50vw] no-scrollbar">
          {openWindows.map((win) => {
            const Icon = getModuleIcon(win.module);
            const isActive = activeWindowId === win.id && !win.isMinimized;

            return (
              <div
                key={win.id}
                onClick={() => onFocusWindow(win.id)}
                className={`group flex items-center gap-2 px-3 py-1 rounded-md text-xs cursor-pointer border transition-all max-w-[180px] shrink-0 ${
                  isActive 
                    ? 'bg-zinc-800 text-orange-400 border-orange-500/40 shadow-sm font-semibold' 
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:bg-zinc-850 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-orange-400' : 'text-zinc-500'}`} />
                <span className="truncate">{win.title}</span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseWindow(win.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 ml-1 hover:text-red-400 rounded p-0.5 transition-opacity"
                  title="Cerrar ventana"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: System Tray & User Logout */}
      <div className="flex items-center gap-3 text-xs">
        
        {/* User Profile */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-800/60 transition-colors cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-[10px] font-bold text-orange-400">
            UP
          </div>
          <span className="text-zinc-300 font-medium text-xs hidden sm:inline">{userName}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={onTriggerExit}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all active:scale-95"
          title="Cerrar Sesión"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Salir</span>
        </button>

        {/* Separator */}
        <div className="h-5 w-[1px] bg-zinc-800" />

        {/* Clock */}
        <div className="flex items-center gap-1.5 text-zinc-400 px-2 font-mono font-medium text-xs">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>{timeStr || '8:25 PM'}</span>
        </div>

      </div>

    </footer>
  );
};
