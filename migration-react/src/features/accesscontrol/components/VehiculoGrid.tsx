import React, { useState } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, Car, Search } from 'lucide-react';
import { Vehiculo } from '../../../mocks/accesscontrol';
import { VehiculoForm } from './VehiculoForm';

interface VehiculoGridProps {
  vehiculos: Vehiculo[];
  scope?: { ownerType: 'persona' | 'proveedor'; ownerId: string };
  onAddVehiculo: (vehiculo: Vehiculo) => void;
  onUpdateVehiculo: (vehiculo: Vehiculo) => void;
  onDeleteVehiculo: (id: string) => void;
  resolveOwnerName?: (ownerType: 'persona' | 'proveedor', ownerId: string) => string;
  embedded?: boolean;
}

const isExpired = (dateStr: string) => {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
};

export const VehiculoGrid: React.FC<VehiculoGridProps> = ({
  vehiculos,
  scope,
  onAddVehiculo,
  onUpdateVehiculo,
  onDeleteVehiculo,
  resolveOwnerName,
  embedded = false,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vehiculo | null>(null);
  const [search, setSearch] = useState('');

  const scoped = scope
    ? vehiculos.filter((v) => v.ownerType === scope.ownerType && v.ownerId === scope.ownerId)
    : vehiculos;

  const filtered = scoped.filter((v) =>
    !search ||
    v.marca.toLowerCase().includes(search.toLowerCase()) ||
    v.modelo.toLowerCase().includes(search.toLowerCase()) ||
    v.matricula.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClick = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEditClick = (v: Vehiculo) => {
    setEditing(v);
    setShowForm(true);
  };

  const handleSave = (v: Vehiculo) => {
    if (editing) onUpdateVehiculo(v);
    else onAddVehiculo(v);
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className={`glass-panel border-zinc-800 rounded-xl flex flex-col select-none overflow-hidden ${embedded ? 'h-full' : 'h-[calc(100vh-170px)]'}`}>
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <button onClick={handleAddClick} className="btn-primary px-3.5 py-2 text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Vehículo</span>
          </button>
          {!scope && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Marca, modelo, matrícula..."
                className="bg-zinc-900 border border-zinc-850 pl-8 pr-2.5 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500 w-56 transition-colors placeholder-zinc-500"
              />
            </div>
          )}
        </div>
        <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
          {filtered.length} vehículo{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {showForm && (
        <VehiculoForm
          vehiculo={editing}
          ownerType={scope?.ownerType ?? editing?.ownerType ?? 'persona'}
          ownerId={scope?.ownerId ?? editing?.ownerId ?? ''}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[700px]">
          <thead>
            <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
              <th className="py-3 px-4 w-16 text-center">Acciones</th>
              <th className="py-3 px-3">Marca / Modelo</th>
              <th className="py-3 px-3">Matrícula</th>
              <th className="py-3 px-3">Año</th>
              {!scope && <th className="py-3 px-3">Propietario</th>}
              <th className="py-3 px-3">Seguro Vto.</th>
              <th className="py-3 px-3">VTV Vto.</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-40 text-center text-zinc-500 bg-zinc-950/5">
                  <Car className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No hay vehículos registrados.</span>
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr key={v.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors">
                  <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleEditClick(v)} title="Editar" className="btn-action-icon">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onDeleteVehiculo(v.id)} title="Eliminar" className="btn-action-icon hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-zinc-200">{v.marca} {v.modelo}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-orange-400">{v.matricula}</td>
                  <td className="py-2.5 px-3 text-zinc-300">{v.anio}</td>
                  {!scope && (
                    <td className="py-2.5 px-3 text-zinc-400">
                      {resolveOwnerName ? resolveOwnerName(v.ownerType, v.ownerId) : `${v.ownerType} #${v.ownerId}`}
                    </td>
                  )}
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 font-mono ${isExpired(v.vencimientoSeguro) ? 'text-red-400' : 'text-zinc-400'}`}>
                      {isExpired(v.vencimientoSeguro) && <AlertTriangle className="w-3 h-3" />}
                      {v.vencimientoSeguro || '-'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 font-mono ${isExpired(v.vencimientoVTV) ? 'text-red-400' : 'text-zinc-400'}`}>
                      {isExpired(v.vencimientoVTV) && <AlertTriangle className="w-3 h-3" />}
                      {v.vencimientoVTV || '-'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
