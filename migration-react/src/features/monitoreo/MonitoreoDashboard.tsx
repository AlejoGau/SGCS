import React, { useState } from 'react';
import { AlarmEventsGrid } from './components/AlarmEventsGrid';
import {
  Mic, Link2, Siren, PhoneIncoming, Search, MessageSquareText, Repeat, Zap
} from 'lucide-react';

type FilterTabId = 'pendientes' | 'mis_eventos' | 'en_espera' | 'tiempo_real' | 'otras_organizaciones';

export const MonitoreoDashboard: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<FilterTabId>('pendientes');

  const handleAction = (label: string) => {
    alert(`${label} (simulación de módulo Monitoreo).`);
  };

  return (
    <div className="space-y-3">

      {/* Top Monitoreo Toolbar */}
      <div className="bg-zinc-900/60 border border-zinc-850 p-2 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg select-none shrink-0">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button onClick={() => handleAction('Eventos con voz')} className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5">
            <Mic className="w-3.5 h-3.5 text-zinc-500" />
            <span>Eventos con voz</span>
          </button>
          <button onClick={() => handleAction('Enlaces')} className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5 hidden md:flex">
            <Link2 className="w-3.5 h-3.5 text-zinc-500" />
            <span>Enlaces</span>
          </button>
          <button onClick={() => handleAction('Búsqueda de cuenta')} className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5">
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span>Buscar cuenta</span>
          </button>
          <button onClick={() => handleAction('Grabar llamada entrante')} className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5 hidden lg:flex">
            <PhoneIncoming className="w-3.5 h-3.5 text-zinc-500" />
            <span>Grabar llamada</span>
          </button>
          <button onClick={() => handleAction('Envío de SMS masivo')} className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5 hidden lg:flex">
            <MessageSquareText className="w-3.5 h-3.5 text-zinc-500" />
            <span>SMS masivo</span>
          </button>
          <button onClick={() => handleAction('Cambio de operador')} className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5 hidden xl:flex">
            <Repeat className="w-3.5 h-3.5 text-zinc-500" />
            <span>Cambio operador</span>
          </button>
        </div>

        <div>
          <button
            onClick={() => handleAction('Modo emergencia activado')}
            className="px-3.5 py-1.8 bg-red-950/20 border border-red-900/40 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all active:scale-[0.96] shadow-md shadow-red-500/5"
          >
            <Siren className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Modo emergencia</span>
          </button>
        </div>
      </div>

      {/* Auto-processing status banner */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 text-[11px] font-bold uppercase tracking-wider shrink-0">
        <Zap className="w-3.5 h-3.5 text-red-500" />
        El sistema se encuentra en autoprocesamiento por Dealer
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-zinc-850 bg-zinc-950/20 p-1 rounded-lg select-none overflow-x-auto custom-scrollbar shrink-0">
        {[
          { id: 'pendientes', title: `Pendientes (12)` },
          { id: 'mis_eventos', title: 'Mis Eventos' },
          { id: 'en_espera', title: 'En espera (2)' },
          { id: 'tiempo_real', title: 'Tiempo Real' },
          { id: 'otras_organizaciones', title: 'Otras organizaciones' },
        ].map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id as FilterTabId)}
              className={`flex items-center gap-1.5 px-3.5 py-1.8 rounded border transition-all cursor-pointer whitespace-nowrap text-xs font-semibold ${
                isActive
                  ? 'border-orange-500/40 bg-orange-500/10 text-orange-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <span>{tab.title}</span>
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <AlarmEventsGrid />
    </div>
  );
};
