import React, { useState } from 'react';
import { 
  AdminUser, MOCK_ADMIN_USERS 
} from '../../../mocks/admin';
import { 
  Filter, Edit, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, UserCheck, Lock
} from 'lucide-react';

interface UserGridProps {
  onSelectUser: (user: AdminUser) => void;
  onAddUser: (type: 'Central' | 'Dealer' | 'Usuario final') => void;
}

type TabType = 'Central' | 'Dealer' | 'Usuario final';
type FilterPillType = 'Todas' | 'Filtrar' | 'Bloqueados';

export const UserGrid: React.FC<UserGridProps> = ({ onSelectUser, onAddUser }) => {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [activeTab, setActiveTab] = useState<TabType>('Central');
  const [activePill, setActivePill] = useState<FilterPillType>('Todas');
  
  // Search query states
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleRefresh = () => {
    setUsers(MOCK_ADMIN_USERS);
  };

  // Filter users based on active tabs, search query, and pills
  const filteredUsers = users.filter(u => {
    // 1. Module Type filter
    if (u.type !== activeTab) return false;

    // 2. Active status pill filter
    if (activePill === 'Bloqueados') {
      if (u.status !== 'Bloqueado') return false;
    }

    // 3. Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        u.username.toLowerCase().includes(query) ||
        u.name.toLowerCase().includes(query) ||
        u.lastName.toLowerCase().includes(query) ||
        u.client.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Pagination calculations
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <div className="glass-panel border-zinc-800 rounded-xl p-4 space-y-4 h-[calc(100vh-170px)] flex flex-col overflow-hidden">
      
      {/* Tab panel switcher for user categories */}
      <div className="flex border-b border-zinc-850 bg-zinc-950/40 p-1 rounded-lg shrink-0">
        {(['Central', 'Dealer', 'Usuario final'] as TabType[]).map(t => (
          <button
            key={t}
            onClick={() => { setActiveTab(t); setCurrentPage(1); }}
            className={`px-4 py-1.8 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              activeTab === t ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900/30 border border-zinc-850 rounded-xl select-none text-xs shrink-0">
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => { setActivePill('Todas'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg font-semibold ${
              activePill === 'Todas' ? 'btn-secondary-active' : 'btn-secondary'
            }`}
          >
            Todas
          </button>
          
          <button 
            onClick={() => {
              setActivePill('Filtrar');
              setShowSearchInput(!showSearchInput);
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold ${
              activePill === 'Filtrar' ? 'btn-secondary-active' : 'btn-secondary'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar</span>
          </button>

          <button 
            onClick={() => { setActivePill('Bloqueados'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold ${
              activePill === 'Bloqueados' ? 'btn-secondary-active' : 'btn-secondary'
            }`}
          >
            Usuarios Bloqueados
          </button>
        </div>

        {/* Search input (conditionally displayed or toggled by Filtrar) */}
        {showSearchInput && (
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por usuario, nombre..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-52 pl-3 pr-8 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        )}

        <button 
          onClick={() => onAddUser(activeTab)}
          className="btn-primary px-3 py-1.5 text-xs font-bold"
        >
          Crear Usuario
        </button>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 overflow-auto border border-zinc-850 rounded-xl bg-zinc-950/20">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] select-none sticky top-0 z-10">
              <th className="p-3 w-10 text-center"></th>
              <th className="p-3">Usuario</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Provincia Estado</th>
              <th className="p-3">Idioma</th>
              <th className="p-3">Perfil</th>
              <th className="p-3 w-16 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60 font-medium">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 text-zinc-500">
                  No se encontraron usuarios registrados en esta sección.
                </td>
              </tr>
            ) : (
              currentItems.map(user => (
                <tr 
                  key={user.id} 
                  onDoubleClick={() => onSelectUser(user)}
                  className="hover:bg-zinc-900/25 border-b border-zinc-900/60 transition-all text-zinc-300 group cursor-pointer"
                >
                  <td className="p-3 text-center">
                    {user.status === 'Bloqueado' ? (
                      <Lock className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <UserCheck className="w-4 h-4 text-emerald-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-3 font-bold text-white group-hover:text-orange-400 transition-colors">
                    {user.username}
                  </td>
                  <td className="p-3">{user.name || '-'}</td>
                  <td className="p-3">{user.lastName || '-'}</td>
                  <td className="p-3 font-semibold text-white">{user.client || '-'}</td>
                  <td className="p-3 text-zinc-400">{user.province || '-'}</td>
                  <td className="p-3 text-zinc-400">{user.language}</td>
                  <td className="p-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                      user.profile === 'Sin perfil' 
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-400' 
                        : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                    }`}>
                      {user.profile}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => onSelectUser(user)}
                      className="btn-action-icon"
                      title="Editar ficha de usuario"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Pager Bar */}
      <div className="flex items-center justify-between p-2 bg-zinc-900/35 border border-zinc-850 rounded-xl select-none text-xs shrink-0">
        <div className="flex items-center gap-1">
          <button 
            onClick={handleRefresh}
            className="btn-action-icon mr-2"
            title="Recargar listado"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-0.5">
            <button 
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-[11px] text-zinc-400 font-semibold px-2">
              Página <strong className="text-white font-mono">{currentPage}</strong> de <strong className="text-white font-mono">{totalPages}</strong>
            </span>
            
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="btn-action-icon disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-[11px] text-zinc-400 font-semibold">
          Mostrando <strong className="text-white font-mono">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)}</strong> de <strong className="text-white font-mono">{totalItems}</strong>
        </div>
      </div>

    </div>
  );
};
