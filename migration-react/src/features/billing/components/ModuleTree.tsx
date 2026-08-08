import React from 'react';
import { 
  FileText, Clock, Activity, FolderOpen, Users, Contact, ShieldAlert, Grid, Layers, 
  StickyNote, History, Calendar, HeartPulse, AlertOctagon, CheckSquare, Cpu, Bell, 
  UserSquare2, Video, Smartphone, Fingerprint, Wrench, BarChart2, BarChart4, PhoneIncoming, 
  Shield, Mail, Image, ClipboardList, CalendarDays, Terminal, Radio, Sliders, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Account } from '../../../mocks/accounts';

export type AccountModuleNode = 
  | 'details' | 'situacion' | 'automonitoreo' | 'documentos' | 'usuarios' | 'contactos'
  | 'contactos_jurisdiccionales' | 'zonas' | 'particiones' | 'notas' | 'bitacora' | 'horarios'
  | 'informacion_medica' | 'control_falsas' | 'test' | 'panel_alarma' | 'notificaciones'
  | 'usuarios_clientes' | 'video_link' | 'smartpanics' | 'control_accesos' | 'informe_servicio_tecnico'
  | 'informe_reporte_historico' | 'informe_reporte_grafico' | 'informe_llamadas' | 'informe_moneyguard'
  | 'informe_notificaciones' | 'informe_multimedia' | 'informe_auditoria' | 'scheduler'
  | 'comandos' | 'control_test_origen' | 'control_estados_panel';

interface ModuleTreeProps {
  account: Account;
  activeNode: AccountModuleNode;
  onNodeChange: (node: AccountModuleNode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const ModuleTree: React.FC<ModuleTreeProps> = ({ 
  account, 
  activeNode, 
  onNodeChange,
  collapsed,
  onToggleCollapse
}) => {

  const treeItems: { id: AccountModuleNode; label: string; icon: React.FC<any>; badge?: string }[] = [
    { id: 'details', label: 'Cuenta', icon: FileText },
    { id: 'situacion', label: 'Situación', icon: Clock },
    { id: 'automonitoreo', label: 'Automonitoreo', icon: Activity },
    { id: 'documentos', label: 'Documentos', icon: FolderOpen },
    { id: 'usuarios', label: 'Usuarios', icon: Users, badge: '36' },
    { id: 'contactos', label: 'Contactos', icon: Contact, badge: '20' },
    { id: 'contactos_jurisdiccionales', label: 'Contactos Jurisdiccionales', icon: ShieldAlert },
    { id: 'zonas', label: 'Zonas', icon: Grid, badge: '21' },
    { id: 'particiones', label: 'Particiones', icon: Layers, badge: '36' },
    { id: 'notas', label: 'Notas', icon: StickyNote },
    { id: 'bitacora', label: 'Bitácora', icon: History },
    { id: 'horarios', label: 'Horarios', icon: Calendar },
    { id: 'informacion_medica', label: 'Información médica', icon: HeartPulse },
    { id: 'control_falsas', label: 'Control de falsas alarmas', icon: AlertOctagon },
    { id: 'test', label: 'Test', icon: CheckSquare },
    { id: 'panel_alarma', label: 'Panel de alarma', icon: Cpu },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'usuarios_clientes', label: 'Usuarios Clientes', icon: UserSquare2 },
    { id: 'video_link', label: 'Video Link', icon: Video, badge: '1' },
    { id: 'smartpanics', label: 'SmartPanics', icon: Smartphone, badge: '7' },
    { id: 'control_accesos', label: 'Control Accesos', icon: Fingerprint },
    { id: 'informe_servicio_tecnico', label: 'Informe -> Servicio técnico', icon: Wrench, badge: '1' },
    { id: 'informe_reporte_historico', label: 'Informe -> Reporte histórico', icon: BarChart2 },
    { id: 'informe_reporte_grafico', label: 'Informe -> Reporte gráfico', icon: BarChart4 },
    { id: 'informe_llamadas', label: 'Informe -> Llamadas', icon: PhoneIncoming },
    { id: 'informe_moneyguard', label: 'Informe -> MoneyGuard', icon: Shield },
    { id: 'informe_notificaciones', label: 'Informe -> Notificaciones', icon: Mail },
    { id: 'informe_multimedia', label: 'Informe -> Multimedia', icon: Image },
    { id: 'informe_auditoria', label: 'Informe -> Auditoría', icon: ClipboardList },
    { id: 'scheduler', label: 'Scheduler', icon: CalendarDays },
    { id: 'comandos', label: 'Comandos', icon: Terminal },
    { id: 'control_test_origen', label: 'Control de test x origen (beta)', icon: Radio },
    { id: 'control_estados_panel', label: 'Control estados panel', icon: Sliders },
  ];

  return (
    <div className={`glass-panel border-zinc-800 rounded-xl flex flex-col select-none h-[calc(100vh-170px)] transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      
      {/* Header */}
      <div className="p-3 border-b border-zinc-850 flex items-center justify-between min-h-[50px] shrink-0">
        {!collapsed && (
          <div className="truncate">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
              Cuenta
            </span>
            <span className="text-[11px] font-semibold text-orange-400 font-mono truncate block mt-0.5" title={account.clientName}>
              {account.accountNumber}
            </span>
          </div>
        )}
        <button 
          type="button"
          onClick={onToggleCollapse}
          className="btn-action-icon ml-auto"
          title={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Tree list */}
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
              {!collapsed && item.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none shrink-0 ${
                  isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}>
                  ({item.badge})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
