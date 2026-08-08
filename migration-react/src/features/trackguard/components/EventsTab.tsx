import React, { useState } from 'react';
import { 
  TrackGuardEvent, MOCK_TRACKGUARD_EVENTS 
} from '../../../mocks/trackguard';
import { 
  AlertTriangle, AlertCircle, CheckCircle, RefreshCw, Trash2, Search
} from 'lucide-react';

export const EventsTab: React.FC = () => {
  const [events, setEvents] = useState<TrackGuardEvent[]>(MOCK_TRACKGUARD_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setEvents(MOCK_TRACKGUARD_EVENTS);
  };

  const handleClearLogs = () => {
    if (window.confirm('¿Está seguro de limpiar todo el log de eventos de rastreo?')) {
      setEvents([]);
    }
  };

  const filteredEvents = events.filter(e => {
    const query = searchQuery.toLowerCase();
    return (
      e.deviceMatricula.toLowerCase().includes(query) ||
      e.deviceName.toLowerCase().includes(query) ||
      e.eventType.toLowerCase().includes(query) ||
      e.details.toLowerCase().includes(query)
    );
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase tracking-wider text-[9px] animate-pulse">
            <AlertCircle className="w-3 h-3 text-red-500" />
            Crítico
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold uppercase tracking-wider text-[9px]">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            Advertencia
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-semibold uppercase tracking-wider text-[9px]">
            <CheckCircle className="w-3 h-3 text-zinc-500" />
            Información
          </span>
        );
    }
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl p-6 space-y-4 h-[calc(100vh-170px)] flex flex-col overflow-hidden">
      
      {/* Header logs panel */}
      <div className="flex justify-between items-center shrink-0 flex-wrap gap-2 pb-1">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Historial de Eventos de Rastreo</h3>
          <p className="text-[10px] text-zinc-500">Supervisión en tiempo real de infracciones de velocidad, alertas de pánico y geocercas</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleClearLogs}
            className="btn-danger-outline px-3 py-1.5 text-xs gap-1.5 hover:border-red-500/40 hover:bg-red-500/5 transition-all text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar logs</span>
          </button>
          <button 
            onClick={handleRefresh}
            className="btn-secondary px-3 py-1.5 text-xs gap-1.5 hover:text-orange-500 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Grid Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900/30 border border-zinc-850 rounded-xl select-none text-xs shrink-0">
        <span className="font-bold uppercase tracking-wider text-zinc-500 text-[10px] px-2">
          Alertas de tráfico y seguridad
        </span>

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
      </div>

      {/* Grid list logs */}
      <div className="flex-1 overflow-auto border border-zinc-850 rounded-xl bg-zinc-950/20 min-h-0">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] select-none sticky top-0 z-10">
              <th className="p-3 w-28">Hora</th>
              <th className="p-3 w-36">Matrícula</th>
              <th className="p-3">Dispositivo / Cuenta</th>
              <th className="p-3 w-32">Severidad</th>
              <th className="p-3">Detalles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60 font-medium text-zinc-300">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8 text-zinc-500">
                  No hay logs de eventos de rastreo disponibles.
                </td>
              </tr>
            ) : (
              filteredEvents.map(e => (
                <tr 
                  key={e.id}
                  className="hover:bg-zinc-900/25 border-b border-zinc-900/60 transition-all"
                >
                  <td className="p-3 font-mono text-[11px] text-zinc-450">{e.eventTime}</td>
                  <td className="p-3 font-bold text-white uppercase">{e.deviceMatricula}</td>
                  <td className="p-3 font-semibold text-white">{e.deviceName}</td>
                  <td className="p-3">{getSeverityBadge(e.severity)}</td>
                  <td className="p-3 text-zinc-450">{e.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
