import React, { useState } from 'react';
import {
  UserPlus, Search, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RefreshCw, AlertTriangle,
} from 'lucide-react';
import { Persona, TIPOS_PERSONA } from '../../../mocks/accesscontrol';

interface PersonaGridProps {
  personas: Persona[];
  onSelectPersona: (persona: Persona) => void;
  onAddPersona: () => void;
}

export const PersonaGrid: React.FC<PersonaGridProps> = ({ personas, onSelectPersona, onAddPersona }) => {
  const [search, setSearch] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = personas.filter((p) => {
    if (tipoFilter && p.tipo !== tipoFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(q) ||
      p.identificacion.toLowerCase().includes(q) ||
      p.unidadFuncionalNombre.toLowerCase().includes(q)
    );
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (p: number) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="glass-panel border-zinc-800 rounded-xl flex flex-col h-[calc(100vh-170px)] select-none overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button onClick={onAddPersona} className="btn-primary px-3.5 py-2 text-xs">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Nueva Persona</span>
          </button>
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Buscar..."
              className="bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500 w-40 transition-colors placeholder-zinc-500"
            />
            <button
              onClick={() => setShowFilterForm(!showFilterForm)}
              className={`px-3 py-2 text-xs ${showFilterForm ? 'btn-secondary-active' : 'btn-secondary'}`}
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        <button
          onClick={() => { setSearch(''); setTipoFilter(''); setCurrentPage(1); }}
          className="btn-secondary px-3.5 py-2 text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Todos</span>
        </button>
      </div>

      {showFilterForm && (
        <div className="p-3 bg-zinc-950/40 border-b border-zinc-850 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs shrink-0">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Tipo de persona</label>
            <select
              value={tipoFilter}
              onChange={(e) => { setTipoFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1 rounded text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">Todos</option>
              {TIPOS_PERSONA.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[800px]">
          <thead>
            <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
              <th className="py-3 px-4 w-16 text-center">Acciones</th>
              <th className="py-3 px-3">Tipo</th>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-3">Identificación</th>
              <th className="py-3 px-3">Unidad Funcional</th>
              <th className="py-3 px-3">Localidad</th>
              <th className="py-3 px-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-60 text-center text-zinc-500 bg-zinc-950/5">
                  <AlertTriangle className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No se encontraron personas que coincidan con la búsqueda.</span>
                </td>
              </tr>
            ) : (
              currentItems.map((persona) => (
                <tr
                  key={persona.id}
                  onDoubleClick={() => onSelectPersona(persona)}
                  className="border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onSelectPersona(persona)} title="Ver ficha" className="btn-action-icon">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border text-orange-400 bg-orange-500/10 border-orange-500/25">
                      {persona.tipo}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-zinc-200">{persona.nombre}</td>
                  <td className="py-2.5 px-3 font-mono text-zinc-400">{persona.identificacion}</td>
                  <td className="py-2.5 px-3 text-zinc-300">{persona.unidadFuncionalNombre}</td>
                  <td className="py-2.5 px-3 text-zinc-400">{persona.localidad}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                      persona.activo ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' : 'text-zinc-400 bg-zinc-800 border-zinc-700'
                    }`}>
                      {persona.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-2.5 border-t border-zinc-850 bg-zinc-950/40 text-xs shrink-0 select-none">
        <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 rounded border border-zinc-850">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none">
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] text-zinc-400 font-semibold px-2">
            Página <strong className="text-white font-mono">{currentPage}</strong> de <strong className="text-white font-mono">{totalPages}</strong>
          </span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none">
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
          Mostrando {totalItems === 0 ? 0 : indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} de {totalItems}
        </div>
      </div>
    </div>
  );
};
