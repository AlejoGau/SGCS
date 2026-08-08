import React, { useState } from 'react';
import { 
  Search, UserPlus, AlertTriangle, 
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, RotateCw, 
  Edit, Copy, Clock, BarChart2, Layers, Map, Download
} from 'lucide-react';
import { Account } from '../../../mocks/accounts';

interface AccountGridProps {
  accounts: Account[];
  selectedAccountId: string;
  onSelectAccount: (accountId: string) => void;
  onEditAccount: (account: Account) => void;
  onAddAccount: () => void;
}

type SituationFilter = 'Todas' | 'Habilitadas' | 'No Habilitadas' | 'En Prueba' | 'Podr. eliminar' | 'Fallo TST' | 'Fallo AC' | 'Particiones';

export const AccountGrid: React.FC<AccountGridProps> = ({ 
  accounts, 
  selectedAccountId, 
  onSelectAccount, 
  onEditAccount,
  onAddAccount 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SituationFilter>('Todas');
  const [showFilterForm, setShowFilterForm] = useState(false);

  // Filter form details (similar to legacy filter menu)
  const [filterDealer, setFilterDealer] = useState('');
  const [filterCuenta, setFilterCuenta] = useState('');
  const [filterNombre, setFilterNombre] = useState('');
  const [filterCalle, setFilterCalle] = useState('');

  const filteredAccounts = accounts.filter(acc => {
    // Top-bar quick filter
    if (activeFilter === 'Habilitadas' && acc.situation !== 'Habilitadas') return false;
    if (activeFilter === 'No Habilitadas' && acc.situation !== 'No Habilitadas') return false;
    if (activeFilter === 'En Prueba' && acc.situation !== 'En Prueba') return false;
    if (activeFilter === 'Podr. eliminar' && acc.situation !== 'Podr. eliminar') return false;
    if (activeFilter === 'Fallo TST' && acc.status !== 'pending') return false; // mock logic
    if (activeFilter === 'Fallo AC' && acc.status !== 'suspended') return false; // mock logic

    // Search query match
    const matchesSearch = 
      acc.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.phone.includes(searchQuery);

    // Filter menu match
    if (filterDealer && !acc.dealerId.toLowerCase().includes(filterDealer.toLowerCase())) return false;
    if (filterCuenta && !acc.accountNumber.toLowerCase().includes(filterCuenta.toLowerCase())) return false;
    if (filterNombre && !acc.clientName.toLowerCase().includes(filterNombre.toLowerCase())) return false;
    if (filterCalle && !acc.address.toLowerCase().includes(filterCalle.toLowerCase())) return false;

    return matchesSearch;
  });

  const getSignalIcon = (level: number) => {
    // Renders visual signal strength bars
    return (
      <div className="flex items-end gap-0.5 h-3.5 w-6" title={`Señal: ${level}/4`}>
        <div className={`w-[3px] h-[3px] rounded-t-[1px] ${level >= 1 ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
        <div className={`w-[3px] h-[6px] rounded-t-[1px] ${level >= 2 ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
        <div className={`w-[3px] h-[9px] rounded-t-[1px] ${level >= 3 ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
        <div className={`w-[3px] h-[12px] rounded-t-[1px] ${level >= 4 ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
      </div>
    );
  };

  const getSituationStyle = (situation: Account['situation']) => {
    switch (situation) {
      case 'Habilitadas':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
      case 'No Habilitadas':
        return 'text-red-400 bg-red-500/10 border-red-500/25';
      case 'En Prueba':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/25';
      case 'Podr. eliminar':
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
      default:
        return 'text-zinc-500 bg-zinc-900 border-zinc-800';
    }
  };

  const getAlarmStatusStyle = (status: Account['alarmStatus']) => {
    if (status === 'Activado / cerrado') {
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    } else {
      return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    }
  };

  const handleExportExcel = () => {
    alert('Exportando listado de cuentas a Excel (Simulado)...');
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl flex flex-col h-[calc(100vh-170px)] select-none overflow-hidden">
      
      {/* Top Grid Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/35 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={onAddAccount}
            className="btn-primary px-3.5 py-2 text-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Nueva Cuenta</span>
          </button>
          
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-xs text-white focus:outline-none focus:border-orange-500 w-32 transition-colors placeholder-zinc-500"
            />
            <button
              onClick={() => setShowFilterForm(!showFilterForm)}
              className={`px-3 py-2 text-xs ${showFilterForm ? 'btn-secondary-active' : 'btn-secondary'}`}
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        {/* Quick filter pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-[9px] font-bold uppercase tracking-wider">
          {(['Todas', 'Habilitadas', 'No Habilitadas', 'En Prueba', 'Podr. eliminar', 'Fallo TST', 'Fallo AC'] as SituationFilter[]).map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1.5 flex items-center gap-1.5 shrink-0 ${
                  isActive ? 'btn-secondary-active font-extrabold' : 'btn-secondary'
                }`}
              >
                {filter === 'Fallo TST' || filter === 'Fallo AC' ? <AlertTriangle className="w-3 h-3 text-yellow-500" /> : null}
                <span>{filter}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleExportExcel}
          className="btn-secondary px-3.5 py-2 text-xs ml-auto md:ml-0"
        >
          <Download className="w-3.5 h-3.5 text-emerald-500" />
          <span>Exportar</span>
        </button>
      </div>

      {/* Collapsible Filter Form (Menu-like) */}
      {showFilterForm && (
        <div className="p-3 bg-zinc-950/40 border-b border-zinc-850 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs shrink-0">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Dealer</label>
            <input 
              type="text" 
              value={filterDealer} 
              onChange={e => setFilterDealer(e.target.value)} 
              placeholder="Filtro Dealer"
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1 rounded text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Cuenta</label>
            <input 
              type="text" 
              value={filterCuenta} 
              onChange={e => setFilterCuenta(e.target.value)} 
              placeholder="Filtro Cuenta"
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1 rounded text-white font-mono focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Nombre Cuenta</label>
            <input 
              type="text" 
              value={filterNombre} 
              onChange={e => setFilterNombre(e.target.value)} 
              placeholder="Filtro Nombre"
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1 rounded text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="space-y-1 flex flex-col justify-end">
            <button 
              onClick={() => {
                setFilterDealer('');
                setFilterCuenta('');
                setFilterNombre('');
                setFilterCalle('');
              }}
              className="btn-secondary w-full py-1.5 text-xs"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Main Grid Table Area */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[900px]">
          <thead>
            <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
              <th className="py-3 px-4 w-32 text-center">Acciones</th>
              <th className="py-3 px-2 w-10 text-center">Señal</th>
              <th className="py-3 px-3 w-28">Cuenta</th>
              <th className="py-3 px-4">Nombre / Razón Social</th>
              <th className="py-3 px-3">Situación</th>
              <th className="py-3 px-3">Estado</th>
              <th className="py-3 px-3">Localidad</th>
              <th className="py-3 px-4">Calle</th>
              <th className="py-3 px-4">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan={9} className="h-60 text-center text-zinc-500 bg-zinc-950/5">
                  <AlertTriangle className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                  <span>No se encontraron cuentas que coincidan con la búsqueda.</span>
                </td>
              </tr>
            ) : (
              filteredAccounts.map((account) => {
                const isSelected = account.id === selectedAccountId;

                return (
                  <tr 
                    key={account.id} 
                    onClick={() => onSelectAccount(account.id)}
                    className={`border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors cursor-pointer ${
                      isSelected ? 'bg-orange-500/5' : ''
                    }`}
                  >
                    {/* Acciones */}
                    <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onEditAccount(account)}
                          title="Editar cuenta"
                          className="btn-action-icon"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alert(`Copiar cuenta: ${account.accountNumber}`)}
                          title="Copiar cuenta"
                          className="btn-action-icon"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alert(`Modificar situación: ${account.accountNumber}`)}
                          title="Modificar situación"
                          className="btn-action-icon"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alert(`Ver eventos de la cuenta: ${account.accountNumber}`)}
                          title="Eventos"
                          className="btn-action-icon"
                        >
                          <BarChart2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alert(`Ver particiones: ${account.accountNumber}`)}
                          title="Ver particiones"
                          className="btn-action-icon"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alert(`Seguimiento de la cuenta: ${account.accountNumber}`)}
                          title="Seguimiento"
                          className="btn-action-icon"
                        >
                          <Map className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Señal */}
                    <td className="py-2.5 px-2 text-center">
                      <div className="flex justify-center">
                        {getSignalIcon(account.signalLevel)}
                      </div>
                    </td>

                    {/* Cuenta */}
                    <td className="py-2.5 px-3 font-mono font-bold text-orange-400">
                      {account.accountNumber}
                    </td>

                    {/* Nombre */}
                    <td className="py-2.5 px-4 font-bold text-zinc-200">
                      {account.clientName}
                    </td>

                    {/* Situación */}
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getSituationStyle(account.situation)}`}>
                        {account.situation}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getAlarmStatusStyle(account.alarmStatus)}`}>
                        {account.alarmStatus}
                      </span>
                    </td>

                    {/* Localidad */}
                    <td className="py-2.5 px-3 text-zinc-300 font-medium">
                      {account.city}
                    </td>

                    {/* Calle */}
                    <td className="py-2.5 px-4 text-zinc-400 truncate max-w-[200px]" title={account.address}>
                      {account.address}
                    </td>

                    {/* Teléfono */}
                    <td className="py-2.5 px-4 font-mono text-zinc-400">
                      {account.phone}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Paging Bar */}
      <div className="flex items-center justify-between p-2.5 border-t border-zinc-850 bg-zinc-950/40 text-xs shrink-0 select-none">
        <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 rounded border border-zinc-850">
          <button 
            onClick={() => alert('Primera página')}
            className="btn-action-icon"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => alert('Página anterior')}
            className="btn-action-icon"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          <div className="h-4 w-[1px] bg-zinc-800 mx-1"></div>
          
          <div className="flex items-center gap-1.5 px-1">
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Página</span>
            <input 
              type="text" 
              defaultValue="1" 
              className="w-8 bg-zinc-950 border border-zinc-800 rounded text-center text-white py-0.5 font-mono text-[10px] focus:outline-none focus:border-orange-500" 
            />
            <span className="text-[10px] text-zinc-500">de 1</span>
          </div>

          <div className="h-4 w-[1px] bg-zinc-800 mx-1"></div>

          <button 
            onClick={() => alert('Página siguiente')}
            className="btn-action-icon"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => alert('Última página')}
            className="btn-action-icon"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
          
          <div className="h-4 w-[1px] bg-zinc-800 mx-1"></div>

          <button 
            onClick={() => alert('Actualizar listado')}
            className="btn-action-icon"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
          Mostrando 1 - {filteredAccounts.length} de {filteredAccounts.length}
        </div>
      </div>

    </div>
  );
};
