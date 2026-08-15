import React from 'react';
import { FileText, Users, Car, Contact, Settings, CalendarClock, DoorOpen, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import { UnidadFuncional } from '../../../mocks/accesscontrol';

export type UnidadFuncionalNode =
  | 'cuenta' | 'usuarios' | 'vehiculos' | 'contactos' | 'configuracion' | 'autorizaciones' | 'accesos_io' | 'informe_historico';

interface UnidadFuncionalTreeProps {
  unidad: UnidadFuncional;
  activeNode: UnidadFuncionalNode;
  onNodeChange: (node: UnidadFuncionalNode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const treeItems: { id: UnidadFuncionalNode; label: string; icon: React.ElementType }[] = [
  { id: 'cuenta', label: 'Cuenta', icon: FileText },
  { id: 'usuarios', label: 'Usuarios', icon: Users },
  { id: 'vehiculos', label: 'Vehículos', icon: Car },
  { id: 'contactos', label: 'Contactos', icon: Contact },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
  { id: 'autorizaciones', label: 'Autorizaciones', icon: CalendarClock },
  { id: 'accesos_io', label: 'Accesos IO', icon: DoorOpen },
  { id: 'informe_historico', label: 'Informe -> Reporte Histórico', icon: BarChart2 },
];

export const UnidadFuncionalTree: React.FC<UnidadFuncionalTreeProps> = ({
  unidad, activeNode, onNodeChange, collapsed, onToggleCollapse,
}) => {
  return (
    <div className={`glass-panel border-zinc-800 rounded-xl flex flex-col select-none h-[calc(100vh-170px)] transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-3 border-b border-zinc-850 flex items-center justify-between min-h-[50px] shrink-0">
        {!collapsed && (
          <div className="truncate">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
              Unidad funcional
            </span>
            <span className="text-[11px] font-semibold text-orange-400 font-mono truncate block mt-0.5" title={unidad.nombre}>
              {unidad.numero}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="btn-action-icon ml-auto"
          title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
        {treeItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNodeChange(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-lg border transition-all text-left outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 active:scale-[0.97] ${
                collapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
              } ${
                isActive
                  ? 'border-orange-500/30 bg-orange-500/10 text-orange-400 font-bold shadow-md shadow-orange-500/[0.03]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-500' : 'text-zinc-500'}`} />
                {!collapsed && (
                  <span className="text-xs truncate font-medium">{item.label}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
