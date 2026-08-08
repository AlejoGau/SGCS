import React, { useState } from 'react';
import { SoftguardUser } from '../../../mocks/accounts';
import { UserPlus, Trash2, Edit, Copy, ShieldAlert, Search, ShieldCheck, Hammer, Laptop } from 'lucide-react';

interface SoftguardUsuarioGridProps {
  users: SoftguardUser[];
  selectedUserId: string | null;
  onAddUserClick: () => void;
  onEditUserClick: (user: SoftguardUser) => void;
  onDeleteUser: (userId: string) => void;
  onCopyFromAccountClick: () => void;
}

export const SoftguardUsuarioGrid: React.FC<SoftguardUsuarioGridProps> = ({
  users,
  selectedUserId,
  onAddUserClick,
  onEditUserClick,
  onDeleteUser,
  onCopyFromAccountClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<number | 'all'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.usu_cnombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.usu_icodigo.toString().includes(searchTerm) || 
                          user.usu_mobservacion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.usu_ntipo === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getUserRoleBadge = (type: number) => {
    switch (type) {
      case 1:
        return (
          <span className="flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded bg-red-500/10 border border-red-500/25 text-red-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            <span>Administrador</span>
          </span>
        );
      case 2:
        return (
          <span className="flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/25 text-orange-400 font-bold uppercase tracking-wider">
            <Laptop className="w-3 h-3" />
            <span>Operador</span>
          </span>
        );
      case 3:
        return (
          <span className="flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/25 text-blue-400 font-bold uppercase tracking-wider">
            <Hammer className="w-3 h-3" />
            <span>Técnico</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-bold uppercase tracking-wider">
            <span>Usuario</span>
          </span>
        );
    }
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl p-5 flex flex-col h-[395px] select-none">
      
      {/* Grid Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-zinc-850 mb-3.5 gap-3">
        {/* Search */}
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Nombre, Código..."
            className="w-full bg-zinc-900 border border-zinc-850 pl-8 pr-3 py-1.8 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {/* Role Filters */}
          <div className="flex items-center bg-zinc-950/60 border border-zinc-850 p-0.5 rounded-lg text-[9px] font-bold uppercase mr-1">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-2 py-1 rounded transition-all outline-none focus-visible:ring-1 focus-visible:ring-orange-500 active:scale-95 ${roleFilter === 'all' ? 'bg-orange-600 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setRoleFilter(1)}
              className={`px-2 py-1 rounded transition-all outline-none focus-visible:ring-1 focus-visible:ring-orange-500 active:scale-95 ${roleFilter === 1 ? 'bg-orange-600 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Admins
            </button>
            <button
              onClick={() => setRoleFilter(2)}
              className={`px-2 py-1 rounded transition-all outline-none focus-visible:ring-1 focus-visible:ring-orange-500 active:scale-95 ${roleFilter === 2 ? 'bg-orange-600 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Ops
            </button>
          </div>

          <button
            type="button"
            onClick={onAddUserClick}
            className="btn-primary px-3 py-1.5 text-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Agregar</span>
          </button>
          
          <button
            type="button"
            onClick={onCopyFromAccountClick}
            className="btn-secondary px-3 py-1.5 text-xs"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Importar</span>
          </button>
        </div>
      </div>

      {/* Grid Table */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredUsers.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-zinc-500 text-xs gap-1">
            <ShieldAlert className="w-8 h-8 opacity-40 text-zinc-400 mb-1" />
            <span>No se encontraron usuarios registrados en la grilla.</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800/60 text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                <th className="py-2.5 w-16 text-center">Acciones</th>
                <th className="py-2.5 w-12 text-center">Foto</th>
                <th className="py-2.5 w-16">Código</th>
                <th className="py-2.5">Nombre Completo</th>
                <th className="py-2.5">Tipo de Permiso</th>
                <th className="py-2.5 hidden md:table-cell">Observación</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isSelected = selectedUserId === user.id;
                return (
                  <tr 
                    key={user.id} 
                    className={`border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-all ${
                      isSelected ? 'bg-orange-500/5 border-l-2 border-l-orange-500' : ''
                    }`}
                  >
                    {/* Actions */}
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onEditUserClick(user)}
                          title="Modificar datos"
                          className={`btn-action-icon ${isSelected ? 'text-orange-500 bg-orange-500/10' : ''}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteUser(user.id)}
                          title="Eliminar usuario"
                          className="btn-action-icon text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Photo */}
                    <td className="py-3 text-center">
                      <div className="w-6 h-6 rounded-full bg-zinc-850 border border-zinc-700/60 overflow-hidden flex items-center justify-center mx-auto text-[9px] font-bold text-orange-500 uppercase leading-none">
                        {user.usu_cimagen ? (
                          <div className="w-full h-full bg-orange-600/10 flex items-center justify-center">👤</div>
                        ) : (
                          user.usu_cnombre.charAt(0)
                        )}
                      </div>
                    </td>

                    {/* Code */}
                    <td className="py-3 font-mono font-bold text-zinc-300">
                      {user.usu_icodigo}
                    </td>

                    {/* Name */}
                    <td className="py-3 font-bold text-zinc-200">
                      {user.usu_cnombre}
                    </td>

                    {/* Role */}
                    <td className="py-3 text-zinc-400">
                      {getUserRoleBadge(user.usu_ntipo)}
                    </td>

                    {/* Observations */}
                    <td className="py-3 text-zinc-500 truncate max-w-[120px] hidden md:table-cell" title={user.usu_mobservacion}>
                      {user.usu_mobservacion}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
