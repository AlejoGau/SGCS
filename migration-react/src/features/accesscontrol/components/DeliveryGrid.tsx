import React, { useState } from 'react';
import { Edit, LogIn, LogOut, AlertTriangle, Clock, Package, Download } from 'lucide-react';
import { Autorizacion, getEstadoAutorizacionVisual } from '../../../mocks/accesscontrol';
import { AutorizacionForm } from './AutorizacionForm';

interface DeliveryGridProps {
  entregas: Autorizacion[];
  onAdd: (autorizacion: Autorizacion) => void;
  onUpdate: (autorizacion: Autorizacion) => void;
  onDelete: (id: string) => void;
  onRegistrarAcceso: (autorizacion: Autorizacion, tipoAcceso: 'ingreso' | 'egreso') => void;
}

const ESTADO_BADGE: Record<ReturnType<typeof getEstadoAutorizacionVisual>, { label: string; cls: string; icon?: React.ElementType }> = {
  vencida: { label: 'Vencida', cls: 'text-red-400 bg-red-500/10 border-red-500/25', icon: AlertTriangle },
  pendiente: { label: 'Pendiente', cls: 'text-amber-400 bg-amber-500/10 border-amber-500/25', icon: Clock },
  activa: { label: 'Activa', cls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
  inactiva: { label: 'Inactiva', cls: 'text-zinc-400 bg-zinc-800 border-zinc-700' },
};

// Nota: igual que la pestaña global de Autorizaciones, el legacy no permite dar de alta un delivery
// desde esta grilla (sin botón "Nuevo"/"Agregar" en el toolbar real) — solo ver, editar y registrar accesos.
export const DeliveryGrid: React.FC<DeliveryGridProps> = ({ entregas, onUpdate, onRegistrarAcceso }) => {
  const [editing, setEditing] = useState<Autorizacion | null>(null);

  const handleSave = (a: Autorizacion) => {
    onUpdate(a);
    setEditing(null);
  };

  const handleExport = () => {
    alert('Exportando listado de deliveries a Excel (Simulado)...');
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl flex flex-col h-[calc(100vh-170px)] select-none overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
          {entregas.length} entrega{entregas.length !== 1 ? 's' : ''} registrada{entregas.length !== 1 ? 's' : ''}
        </span>
        <button onClick={handleExport} className="btn-secondary px-3.5 py-2 text-xs">
          <Download className="w-3.5 h-3.5 text-emerald-500" />
          <span>Exportar</span>
        </button>
      </div>

      {editing && (
        <AutorizacionForm
          autorizacion={editing}
          tipo="delivery"
          sujetoNombre={editing.sujetoNombre}
          unidadFuncionalId={editing.unidadFuncionalId}
          unidadFuncionalNombre={editing.unidadFuncionalNombre}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[800px]">
          <thead>
            <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
              <th className="py-3 px-4 w-20 text-center">Acciones</th>
              <th className="py-3 px-3">Delivery</th>
              <th className="py-3 px-3">Unidad Funcional</th>
              <th className="py-3 px-3">Fecha</th>
              <th className="py-3 px-3">Horario</th>
              <th className="py-3 px-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {entregas.length === 0 ? (
              <tr>
                <td colSpan={6} className="h-40 text-center text-zinc-500 bg-zinc-950/5">
                  <Package className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No hay entregas registradas.</span>
                </td>
              </tr>
            ) : (
              entregas.map((a) => {
                const estado = getEstadoAutorizacionVisual(a);
                const vencida = estado === 'vencida';
                const canIngreso = !vencida && a.ultimoAcceso !== 'ingreso';
                const canEgreso = !vencida && a.ultimoAcceso === 'ingreso';
                const badge = ESTADO_BADGE[estado];
                const BadgeIcon = badge.icon;
                return (
                  <tr key={a.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors">
                    <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setEditing(a)} title="Editar" className="btn-action-icon">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onRegistrarAcceso(a, 'ingreso')} disabled={!canIngreso} title="Generar ingreso"
                          className="btn-action-icon disabled:opacity-25 disabled:pointer-events-none hover:text-emerald-400 hover:bg-emerald-500/10">
                          <LogIn className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onRegistrarAcceso(a, 'egreso')} disabled={!canEgreso} title="Generar egreso"
                          className="btn-action-icon disabled:opacity-25 disabled:pointer-events-none hover:text-amber-400 hover:bg-amber-500/10">
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-zinc-200">{a.sujetoNombre}</td>
                    <td className="py-2.5 px-3 text-zinc-300">{a.unidadFuncionalNombre ?? '-'}</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">{a.fechaDesde}</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">{a.todoElDia ? 'Todo el día' : `${a.horaDesde} - ${a.horaHasta}`}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border inline-flex items-center gap-1 ${badge.cls}`}>
                        {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
