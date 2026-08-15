import React, { useState } from 'react';
import { DoorOpen, LogIn, LogOut, Download, Search, AlertTriangle } from 'lucide-react';
import { Marcacion, PUERTAS } from '../../../mocks/accesscontrol';

interface IngresosEgresosGridProps {
  marcaciones: Marcacion[];
  scope?: { sujetoTipo: 'persona' | 'proveedor'; sujetoId: string };
  embedded?: boolean;
}

export const IngresosEgresosGrid: React.FC<IngresosEgresosGridProps> = ({ marcaciones, scope, embedded = false }) => {
  const [search, setSearch] = useState('');
  const [puertaFilter, setPuertaFilter] = useState('');
  const [ingresoSinEgreso, setIngresoSinEgreso] = useState(false);

  const scoped = scope
    ? marcaciones.filter((m) => m.sujetoTipo === scope.sujetoTipo && m.sujetoId === scope.sujetoId)
    : marcaciones;

  // "Ingreso sin Egreso": última marcación de cada sujeto es un ingreso sin egreso posterior
  const lastBySujeto = new Map<string, Marcacion>();
  [...scoped]
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .forEach((m) => lastBySujeto.set(m.sujetoId, m));

  const filtered = scoped.filter((m) => {
    if (puertaFilter && m.puerta !== puertaFilter) return false;
    if (ingresoSinEgreso) {
      const last = lastBySujeto.get(m.sujetoId);
      if (!last || last.id !== m.id || last.tipoAcceso !== 'ingreso') return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return m.sujetoNombre.toLowerCase().includes(q) || m.unidadFuncional.toLowerCase().includes(q) || m.autorizadoPor.toLowerCase().includes(q);
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => b.fecha.localeCompare(a.fecha));

  const handleExport = () => {
    alert('Exportando listado de Ingresos/Egresos a Excel (Simulado)...');
  };

  return (
    <div className={`glass-panel border-zinc-800 rounded-xl flex flex-col select-none overflow-hidden ${embedded ? 'h-full' : 'h-[calc(100vh-170px)]'}`}>
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Persona, unidad, autorizado por..."
              className="bg-zinc-900 border border-zinc-850 pl-8 pr-2.5 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500 w-56 transition-colors placeholder-zinc-500"
            />
          </div>
          <select
            value={puertaFilter}
            onChange={(e) => setPuertaFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500"
          >
            <option value="">Todas las puertas</option>
            {PUERTAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={() => setIngresoSinEgreso(!ingresoSinEgreso)}
            className={`px-3 py-1.5 text-xs ${ingresoSinEgreso ? 'btn-secondary-active' : 'btn-secondary'}`}
          >
            Ingreso sin Egreso
          </button>
        </div>
        <button onClick={handleExport} className="btn-secondary px-3.5 py-2 text-xs">
          <Download className="w-3.5 h-3.5 text-emerald-500" />
          <span>Exportar</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[900px]">
          <thead>
            <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
              <th className="py-3 px-4 w-10 text-center">Tipo</th>
              <th className="py-3 px-3">Fecha</th>
              <th className="py-3 px-3">Persona / Proveedor</th>
              <th className="py-3 px-3">Puerta</th>
              <th className="py-3 px-3">Tipo Autorización</th>
              <th className="py-3 px-3">Autorizado Por</th>
              <th className="py-3 px-3">Unidad Funcional</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-40 text-center text-zinc-500 bg-zinc-950/5">
                  <DoorOpen className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No se encontraron marcaciones que coincidan con la búsqueda.</span>
                </td>
              </tr>
            ) : (
              sorted.map((m) => (
                <tr key={m.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors" title={m.observaciones}>
                  <td className="py-2.5 px-4 text-center">
                    {m.tipoAcceso === 'ingreso' ? (
                      <LogIn className="w-4 h-4 text-emerald-500 mx-auto" />
                    ) : (
                      <LogOut className="w-4 h-4 text-amber-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-zinc-400">{m.fecha}</td>
                  <td className="py-2.5 px-3 font-bold text-zinc-200">{m.sujetoNombre}</td>
                  <td className="py-2.5 px-3 text-zinc-300">{m.puerta}</td>
                  <td className="py-2.5 px-3 text-zinc-400">{m.tipoAutorizacion}</td>
                  <td className="py-2.5 px-3 text-zinc-400">{m.autorizadoPor}</td>
                  <td className="py-2.5 px-3 text-zinc-400">{m.unidadFuncional}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {ingresoSinEgreso && (
        <div className="flex items-center gap-1.5 p-2 border-t border-zinc-850 bg-amber-500/5 text-[10px] text-amber-400 font-semibold shrink-0">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Mostrando personas/proveedores que ingresaron y aún no registraron egreso.</span>
        </div>
      )}
    </div>
  );
};
