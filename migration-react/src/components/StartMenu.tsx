import React, { useState } from 'react';
import { 
  Save, 
  UserCheck, 
  ExternalLink, 
  Search, 
  Shield, 
  CreditCard, 
  Map, 
  Settings, 
  Bell, 
  Users, 
  Activity, 
  Radio, 
  Smartphone, 
  Key, 
  FileText,
  CheckSquare
} from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
  onSaveWindowPositions?: () => void;
  onOpenUserReport?: () => void;
  openInNewWindow: boolean;
  onToggleOpenInNewWindow: (value: boolean) => void;
  enable3DEffect: boolean;
  onToggle3DEffect: (value: boolean) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  onSaveWindowPositions,
  onOpenUserReport,
  openInNewWindow,
  onToggleOpenInNewWindow,
  enable3DEffect,
  onToggle3DEffect
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const quickModules = [
    { id: 'billing', label: 'Cuentas y Facturación', icon: CreditCard, isReact: true, category: 'Administración' },
    { id: 'admin', label: 'Configuración (Admin)', icon: Settings, isReact: true, category: 'Sistema' },
    { id: 'trackguard', label: 'TrackGuard GPS', icon: Map, isReact: true, category: 'Flota & GPS' },
    { id: 'multimonitor', label: 'MultiMonitor Web', icon: Activity, isReact: false, category: 'Monitoreo' },
    { id: 'webremoto', label: 'WebRemoto / CRM', icon: Users, isReact: false, category: 'Monitoreo' },
    { id: 'accesscontrol', label: 'Control de Acceso', icon: Key, isReact: false, category: 'Seguridad' },
    { id: 'smartpanics', label: 'SmartPanics', icon: Smartphone, isReact: false, category: 'Alertas' },
    { id: 'reportes', label: 'Reportes y Auditoría', icon: FileText, isReact: false, category: 'Informes' },
  ];

  const filteredModules = quickModules.filter(m => 
    m.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Popup Menu */}
      <div className="fixed bottom-12 left-2 z-50 w-80 bg-zinc-900/95 border border-zinc-750 rounded-xl shadow-2xl backdrop-blur-xl select-none overflow-hidden animate-slideUp font-sans">
        
        {/* Header Branding */}
        <div className="p-3 bg-zinc-850/90 border-b border-zinc-750 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/softguard-logo.jpg" alt="Softguard" className="w-7 h-7 rounded-lg object-cover border border-orange-500/30" />
            <div>
              <h4 className="text-xs font-bold text-white leading-none">SOFTGUARD</h4>
              <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider block mt-0.5">
                Menú de Inicio
              </span>
            </div>
          </div>
          <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
            v26.07
          </span>
        </div>

        {/* Quick Search */}
        <div className="p-2.5 border-b border-zinc-800">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar módulo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
            />
          </div>
        </div>

        {/* Context Items from Screenshot 2 */}
        <div className="p-1 border-b border-zinc-800 space-y-0.5">
          <button
            onClick={() => {
              if (onSaveWindowPositions) onSaveWindowPositions();
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors text-left"
          >
            <Save className="w-4 h-4 text-orange-400" />
            <span className="font-medium">Guardar posición de ventanas</span>
          </button>

          <button
            onClick={() => {
              if (onOpenUserReport) onOpenUserReport();
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors text-left"
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span className="font-medium">Ver reporte de usuario</span>
          </button>

          <label className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={openInNewWindow}
              onChange={(e) => onToggleOpenInNewWindow(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-950 text-orange-500 focus:ring-0 focus:ring-offset-0 accent-orange-500 cursor-pointer"
            />
            <span className="font-medium">Abrir en nueva ventana</span>
          </label>

          <label className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={enable3DEffect}
              onChange={(e) => onToggle3DEffect(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-950 text-orange-500 focus:ring-0 focus:ring-offset-0 accent-orange-500 cursor-pointer"
            />
            <span className="font-medium">Animaciones 3D de fondo</span>
          </label>
        </div>

        {/* Modules List */}
        <div className="p-1 max-h-56 overflow-y-auto space-y-0.5">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider px-3 py-1 block">
            Módulos del Sistema
          </span>

          {filteredModules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  onSelectModule(module.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-orange-500/10 hover:border-orange-500/20 border border-transparent transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-orange-400" />
                  <span className="text-xs font-medium">{module.label}</span>
                </div>
                {module.isReact ? (
                  <span className="text-[8px] bg-orange-500/15 text-orange-400 border border-orange-500/30 px-1 py-0.5 rounded font-mono font-bold">
                    React
                  </span>
                ) : (
                  <span className="text-[8px] bg-zinc-800 text-zinc-500 px-1 py-0.5 rounded font-mono">
                    Legacy
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </>
  );
};
