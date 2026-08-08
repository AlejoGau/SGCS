import React from 'react';
import { Monitor, MapPin, Users2, AlertCircle, ShieldAlert, Trash2 } from 'lucide-react';

export type AdminTabType = 'cuentas' | 'georef' | 'dealers' | 'modifications' | 'victimarios';

interface AccountAdminToolbarProps {
  onOpenTab: (type: AdminTabType) => void;
  onCloseAll: () => void;
}

export const AccountAdminToolbar: React.FC<AccountAdminToolbarProps> = ({ 
  onOpenTab, 
  onCloseAll 
}) => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-850 p-2 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg select-none shrink-0">
      
      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
        
        {/* MultiMonitor */}
        <button
          onClick={() => onOpenTab('cuentas')}
          className="btn-secondary px-3.5 py-2"
        >
          <Monitor className="w-4 h-4 text-orange-500 shrink-0" />
          <span>MultiMonitor</span>
        </button>

        {/* Geo referenciar cuentas */}
        <button
          onClick={() => onOpenTab('georef')}
          className="btn-secondary px-3.5 py-2"
        >
          <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Geo referenciar cuentas</span>
        </button>

        {/* Dealers */}
        <button
          onClick={() => onOpenTab('dealers')}
          className="btn-secondary px-3.5 py-2"
        >
          <Users2 className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Dealers</span>
        </button>

        {/* Solicitudes de modificacion */}
        <button
          onClick={() => onOpenTab('modifications')}
          className="btn-secondary px-3.5 py-2"
        >
          <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Solicitudes de modificacion</span>
        </button>

        {/* Victimarios */}
        <button
          onClick={() => onOpenTab('victimarios')}
          className="btn-secondary px-3.5 py-2"
        >
          <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Victimarios</span>
        </button>
      </div>

      {/* Close all tabs option */}
      <button
        onClick={onCloseAll}
        className="btn-danger-outline px-3.5 py-2 text-[11px]"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Cerrar todos</span>
      </button>

    </div>
  );
};
