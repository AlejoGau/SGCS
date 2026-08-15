import React, { useState } from 'react';
import { Plus, Edit, Trash2, LogIn, LogOut, AlertTriangle, Clock, CalendarClock, Download } from 'lucide-react';
import { Autorizacion, DIAS_SEMANA, getEstadoAutorizacionVisual } from '../../../mocks/accesscontrol';
import { AutorizacionForm } from './AutorizacionForm';

interface AutorizacionesGridProps {
  autorizaciones: Autorizacion[];
  scope?: {
    tipo: 'persona' | 'proveedor';
    sujetoId: string;
    sujetoNombre: string;
    unidadFuncionalId?: string;
    unidadFuncionalNombre?: string;
  };
  onAdd: (autorizacion: Autorizacion) => void;
  onUpdate: (autorizacion: Autorizacion) => void;
  onDelete: (id: string) => void;
  onRegistrarAcceso: (autorizacion: Autorizacion, tipoAcceso: 'ingreso' | 'egreso') => void;
  embedded?: boolean;
}

type EstadoPill = 'Todas' | 'Activas' | 'Vencidas';

const diasLabel = (dias: Autorizacion['diasSemana']) => {
  if (dias.length === 0) return 'Todos los días';
  return dias.map((d) => DIAS_SEMANA.find((x) => x.value === d)?.short).join(' ');
};

const ESTADO_BADGE: Record<ReturnType<typeof getEstadoAutorizacionVisual>, { label: string; cls: string; icon?: React.ElementType }> = {
  vencida: { label: 'Vencida', cls: 'text-red-400 bg-red-500/10 border-red-500/25', icon: AlertTriangle },
  pendiente: { label: 'Pendiente', cls: 'text-amber-400 bg-amber-500/10 border-amber-500/25', icon: Clock },
  activa: { label: 'Activa', cls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
  inactiva: { label: 'Inactiva', cls: 'text-zinc-400 bg-zinc-800 border-zinc-700' },
};

export const AutorizacionesGrid: React.FC<AutorizacionesGridProps> = ({
  autorizaciones,
  scope,
  onAdd,
  onUpdate,
  onDelete,
  onRegistrarAcceso,
  embedded = false,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Autorizacion | null>(null);
  const [pill, setPill] = useState<EstadoPill>('Todas');

  const scoped = scope
    ? autorizaciones.filter((a) => a.tipo === scope.tipo && a.sujetoId === scope.sujetoId)
    : autorizaciones;

  const filtered = scoped.filter((a) => {
    const estado = getEstadoAutorizacionVisual(a);
    if (pill === 'Activas') return estado === 'activa';
    if (pill === 'Vencidas') return estado === 'vencida';
    return true;
  });

  const handleAddClick = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEditClick = (a: Autorizacion) => {
    setEditing(a);
    setShowForm(true);
  };

  const handleSave = (a: Autorizacion) => {
    if (editing) onUpdate(a);
    else onAdd(a);
    setShowForm(false);
    setEditing(null);
  };

  const handleExport = () => {
    alert('Exportando listado de autorizaciones a Excel (Simulado)...');
  };

  return (
    <div className={`glass-panel border-zinc-800 rounded-xl flex flex-col select-none overflow-hidden ${embedded ? 'h-full' : 'h-[calc(100vh-170px)]'}`}>
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          {/* Igual que el legacy: sin un sujeto fijo (persona/proveedor) no se puede dar de alta una autorización desde acá. */}
          {scope && (
            <button onClick={handleAddClick} className="btn-primary px-3.5 py-2 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Autorización</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
          {(['Todas', 'Activas', 'Vencidas'] as EstadoPill[]).map((p) => (
            <button key={p} onClick={() => setPill(p)} className={`px-2.5 py-1.5 ${pill === p ? 'btn-secondary-active font-extrabold' : 'btn-secondary'}`}>
              {p}
            </button>
          ))}
        </div>
        <button onClick={handleExport} className="btn-secondary px-3.5 py-2 text-xs">
          <Download className="w-3.5 h-3.5 text-emerald-500" />
          <span>Exportar</span>
        </button>
      </div>

      {showForm && (
        <AutorizacionForm
          autorizacion={editing}
          tipo={scope?.tipo ?? editing?.tipo ?? 'persona'}
          sujetoId={scope?.sujetoId ?? editing?.sujetoId}
          sujetoNombre={scope?.sujetoNombre ?? editing?.sujetoNombre ?? ''}
          unidadFuncionalId={scope?.unidadFuncionalId ?? editing?.unidadFuncionalId}
          unidadFuncionalNombre={scope?.unidadFuncionalNombre ?? editing?.unidadFuncionalNombre}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[800px]">
          <thead>
            <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
              <th className="py-3 px-4 w-28 text-center">Acciones</th>
              <th className="py-3 px-3">Persona / Proveedor</th>
              <th className="py-3 px-3">Fecha desde</th>
              <th className="py-3 px-3">Fecha hasta</th>
              <th className="py-3 px-3">Día</th>
              <th className="py-3 px-3">Horario</th>
              <th className="py-3 px-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-40 text-center text-zinc-500 bg-zinc-950/5">
                  <CalendarClock className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No hay autorizaciones registradas.</span>
                </td>
              </tr>
            ) : (
              filtered.map((a) => {
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
                        <button onClick={() => handleEditClick(a)} title="Editar" className="btn-action-icon">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onRegistrarAcceso(a, 'ingreso')}
                          disabled={!canIngreso}
                          title="Generar ingreso"
                          className="btn-action-icon disabled:opacity-25 disabled:pointer-events-none hover:text-emerald-400 hover:bg-emerald-500/10"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onRegistrarAcceso(a, 'egreso')}
                          disabled={!canEgreso}
                          title="Generar egreso"
                          className="btn-action-icon disabled:opacity-25 disabled:pointer-events-none hover:text-amber-400 hover:bg-amber-500/10"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onDelete(a.id)} title="Eliminar" className="btn-action-icon hover:text-red-400 hover:bg-red-500/10">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-zinc-200">{a.sujetoNombre}</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">{a.fechaDesde}</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">{a.fechaHasta}</td>
                    <td className="py-2.5 px-3 text-zinc-400 font-mono text-[10px]">{diasLabel(a.diasSemana)}</td>
                    <td className="py-2.5 px-3 text-zinc-400 font-mono">{a.todoElDia ? 'Todo el día' : `${a.horaDesde} - ${a.horaHasta}`}</td>
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
