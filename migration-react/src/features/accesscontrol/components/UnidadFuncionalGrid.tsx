import React, { useState } from 'react';
import { UserPlus, Search, Edit, AlertTriangle, Home } from 'lucide-react';
import { UnidadFuncional } from '../../../mocks/accesscontrol';

interface UnidadFuncionalGridProps {
  unidades: UnidadFuncional[];
  onSelectUnidad: (unidad: UnidadFuncional) => void;
  onAddUnidad: () => void;
}

type SituacionFilter = 'Todas' | 'Habilitadas' | 'No Habilitadas' | 'En Prueba';

const getSituacionStyle = (situacion: UnidadFuncional['situacion']) => {
  switch (situacion) {
    case 'Habilitadas':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
    case 'No Habilitadas':
      return 'text-red-400 bg-red-500/10 border-red-500/25';
    case 'En Prueba':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/25';
    default:
      return 'text-zinc-500 bg-zinc-900 border-zinc-800';
  }
};

export const UnidadFuncionalGrid: React.FC<UnidadFuncionalGridProps> = ({ unidades, onSelectUnidad, onAddUnidad }) => {
  const [search, setSearch] = useState('');
  const [situacionFilter, setSituacionFilter] = useState<SituacionFilter>('Todas');

  const filtered = unidades.filter((u) => {
    if (situacionFilter !== 'Todas' && u.situacion !== situacionFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return u.numero.toLowerCase().includes(q) || u.nombre.toLowerCase().includes(q) || u.calle.toLowerCase().includes(q);
  });

  return (
    <div className="glass-panel border-zinc-800 rounded-xl flex flex-col h-[calc(100vh-170px)] select-none overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button onClick={onAddUnidad} className="btn-primary px-3.5 py-2 text-xs">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Nueva Cuenta</span>
          </button>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cuenta, nombre, calle..."
              className="bg-zinc-900 border border-zinc-850 pl-8 pr-2.5 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500 w-56 transition-colors placeholder-zinc-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
          {(['Todas', 'Habilitadas', 'No Habilitadas', 'En Prueba'] as SituacionFilter[]).map((f) => (
            <button key={f} onClick={() => setSituacionFilter(f)} className={`px-2.5 py-1.5 ${situacionFilter === f ? 'btn-secondary-active font-extrabold' : 'btn-secondary'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[900px]">
          <thead>
            <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
              <th className="py-3 px-4 w-16 text-center">Acciones</th>
              <th className="py-3 px-3">Cuenta</th>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-3">Situación</th>
              <th className="py-3 px-3">Estado</th>
              <th className="py-3 px-3">Localidad</th>
              <th className="py-3 px-4">Calle</th>
              <th className="py-3 px-4">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="h-60 text-center text-zinc-500 bg-zinc-950/5">
                  <AlertTriangle className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No se encontraron unidades funcionales que coincidan con la búsqueda.</span>
                </td>
              </tr>
            ) : (
              filtered.map((unidad) => (
                <tr
                  key={unidad.id}
                  onDoubleClick={() => onSelectUnidad(unidad)}
                  className="border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onSelectUnidad(unidad)} title="Ver ficha" className="btn-action-icon">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-orange-400 flex items-center gap-2">
                    <Home className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    {unidad.numero}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-zinc-200">{unidad.nombre}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getSituacionStyle(unidad.situacion)}`}>
                      {unidad.situacion}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-400">{unidad.estado}</td>
                  <td className="py-2.5 px-3 text-zinc-300">{unidad.localidad}</td>
                  <td className="py-2.5 px-4 text-zinc-400 truncate max-w-[200px]" title={unidad.calle}>{unidad.calle}</td>
                  <td className="py-2.5 px-4 font-mono text-zinc-400">{unidad.telefono}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-2.5 border-t border-zinc-850 bg-zinc-950/40 text-xs shrink-0 select-none">
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
          Mostrando 1 - {filtered.length} de {filtered.length}
        </div>
      </div>
    </div>
  );
};
