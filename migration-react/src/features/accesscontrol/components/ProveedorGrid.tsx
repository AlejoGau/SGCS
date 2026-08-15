import React, { useState } from 'react';
import { UserPlus, Search, Edit, AlertTriangle, Building2 } from 'lucide-react';
import { Proveedor, CATEGORIAS_PROVEEDOR } from '../../../mocks/accesscontrol';

interface ProveedorGridProps {
  proveedores: Proveedor[];
  onSelectProveedor: (proveedor: Proveedor) => void;
  onAddProveedor: () => void;
}

type OperativoFilter = 'Todos' | 'Operativos' | 'No Operativos';

export const ProveedorGrid: React.FC<ProveedorGridProps> = ({ proveedores, onSelectProveedor, onAddProveedor }) => {
  const [search, setSearch] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [operativoFilter, setOperativoFilter] = useState<OperativoFilter>('Todos');

  const filtered = proveedores.filter((p) => {
    if (categoriaFilter && p.categoria !== categoriaFilter) return false;
    if (operativoFilter === 'Operativos' && !p.operativo) return false;
    if (operativoFilter === 'No Operativos' && p.operativo) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return p.nombre.toLowerCase().includes(q) || p.identificacion.toLowerCase().includes(q);
  });

  return (
    <div className="glass-panel border-zinc-800 rounded-xl flex flex-col h-[calc(100vh-170px)] select-none overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button onClick={onAddProveedor} className="btn-primary px-3.5 py-2 text-xs">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Nuevo Proveedor</span>
          </button>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nombre, identificación..."
              className="bg-zinc-900 border border-zinc-850 pl-8 pr-2.5 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500 w-56 transition-colors placeholder-zinc-500"
            />
          </div>
          <select
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIAS_PROVEEDOR.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
          {(['Todos', 'Operativos', 'No Operativos'] as OperativoFilter[]).map((f) => (
            <button key={f} onClick={() => setOperativoFilter(f)} className={`px-2.5 py-1.5 ${operativoFilter === f ? 'btn-secondary-active font-extrabold' : 'btn-secondary'}`}>
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
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-3">Identificación</th>
              <th className="py-3 px-4">Dirección</th>
              <th className="py-3 px-3">Localidad</th>
              <th className="py-3 px-3">Provincia</th>
              <th className="py-3 px-3">Categoría</th>
              <th className="py-3 px-3">Operativo</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="h-60 text-center text-zinc-500 bg-zinc-950/5">
                  <AlertTriangle className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No se encontraron proveedores que coincidan con la búsqueda.</span>
                </td>
              </tr>
            ) : (
              filtered.map((proveedor) => (
                <tr
                  key={proveedor.id}
                  onDoubleClick={() => onSelectProveedor(proveedor)}
                  className="border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onSelectProveedor(proveedor)} title="Ver ficha" className="btn-action-icon">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-zinc-200 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    {proveedor.nombre}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-zinc-400">{proveedor.identificacion}</td>
                  <td className="py-2.5 px-4 text-zinc-400 truncate max-w-[200px]" title={proveedor.direccion}>{proveedor.direccion}</td>
                  <td className="py-2.5 px-3 text-zinc-300">{proveedor.localidad}</td>
                  <td className="py-2.5 px-3 text-zinc-400">{proveedor.provincia}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border text-orange-400 bg-orange-500/10 border-orange-500/25">
                      {proveedor.categoria}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                      proveedor.operativo ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' : 'text-red-400 bg-red-500/10 border-red-500/25'
                    }`}>
                      {proveedor.operativo ? 'Sí' : 'No'}
                    </span>
                  </td>
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
