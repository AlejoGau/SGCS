import React, { useState } from 'react';
import { AlarmEvent, AlarmSeverity, MOCK_ALARM_EVENTS } from '../../../mocks/monitoreo';
import { Search, RefreshCw, Circle } from 'lucide-react';

const SEVERITY_STYLES: Record<AlarmSeverity, { badge: string; dot: string }> = {
  panico: {
    badge: 'bg-red-600/90 border-red-500 text-white animate-pulse',
    dot: 'text-red-500',
  },
  alarma_cerco: {
    badge: 'bg-red-600/80 border-red-500 text-white',
    dot: 'text-red-500',
  },
  tablero_cerrado: {
    badge: 'bg-red-600/80 border-red-500 text-white',
    dot: 'text-red-500',
  },
  cerco_activado: {
    badge: 'bg-red-600/80 border-red-500 text-white',
    dot: 'text-red-500',
  },
  bateria_baja: {
    badge: 'bg-amber-500/85 border-amber-400 text-black',
    dot: 'text-amber-500',
  },
  restablecimiento: {
    badge: 'bg-purple-600/85 border-purple-500 text-white',
    dot: 'text-purple-500',
  },
  mantenimiento: {
    badge: 'bg-zinc-700/60 border-zinc-600 text-zinc-300',
    dot: 'text-zinc-500',
  },
};

export const AlarmEventsGrid: React.FC = () => {
  const [events, setEvents] = useState<AlarmEvent[]>(MOCK_ALARM_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => setEvents(MOCK_ALARM_EVENTS);

  const filteredEvents = events.filter((e) => {
    const query = searchQuery.toLowerCase();
    return (
      e.cuenta.toLowerCase().includes(query) ||
      e.evento.toLowerCase().includes(query) ||
      e.zona.toLowerCase().includes(query)
    );
  });

  return (
    <div className="glass-panel border-zinc-800 rounded-xl p-4 space-y-3 h-[calc(100vh-260px)] flex flex-col overflow-hidden">

      {/* Grid Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
        <span className="font-bold uppercase tracking-wider text-zinc-500 text-[10px] px-1">
          Pendientes ({filteredEvents.length})
        </span>

        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Filtrar eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-44 md:w-60"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="btn-secondary px-3 py-1.5 text-xs gap-1.5 hover:text-orange-500 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto border border-zinc-850 rounded-xl bg-zinc-950/20 min-h-0">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] select-none sticky top-0 z-10">
              <th className="p-2.5 w-32">Fecha y hora</th>
              <th className="p-2.5">Cuenta</th>
              <th className="p-2.5 w-36">Estado</th>
              <th className="p-2.5 w-56">Evento</th>
              <th className="p-2.5 w-16 text-center">Prio.</th>
              <th className="p-2.5 w-14 text-center">Estado</th>
              <th className="p-2.5">Origen</th>
              <th className="p-2.5">Usuario</th>
              <th className="p-2.5">Zona</th>
              <th className="p-2.5">Operador</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60 font-medium text-zinc-300">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center p-8 text-zinc-500">
                  No hay eventos de alarma pendientes.
                </td>
              </tr>
            ) : (
              filteredEvents.map((e) => {
                const style = SEVERITY_STYLES[e.severity];
                return (
                  <tr key={e.id} className="hover:bg-zinc-900/25 border-b border-zinc-900/60 transition-all">
                    <td className="p-2.5 font-mono text-[11px] text-zinc-450 whitespace-nowrap">{e.fechaHora}</td>
                    <td className="p-2.5 font-bold text-white">{e.cuenta}</td>
                    <td className="p-2.5 text-zinc-400 text-[11px]">{e.estadoCuenta}</td>
                    <td className="p-2.5">
                      <span className={`inline-flex px-2 py-1 rounded border font-bold uppercase tracking-wider text-[10px] w-full ${style.badge}`}>
                        {e.evento}
                      </span>
                    </td>
                    <td className="p-2.5 text-center font-bold text-zinc-300">{e.prioridad}</td>
                    <td className="p-2.5 text-center">
                      <Circle className={`w-2.5 h-2.5 mx-auto fill-current ${style.dot}`} />
                    </td>
                    <td className="p-2.5 text-zinc-450 text-[11px]">{e.origen}</td>
                    <td className="p-2.5 text-zinc-450 text-[11px]">{e.usuario}</td>
                    <td className="p-2.5 text-zinc-450 text-[11px]">{e.zona}</td>
                    <td className="p-2.5 text-zinc-450 text-[11px]">{e.operador}</td>
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
