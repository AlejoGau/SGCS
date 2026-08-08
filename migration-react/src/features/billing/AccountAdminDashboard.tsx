import React, { useState } from 'react';
import { 
  MOCK_ACCOUNTS, MOCK_CHANGE_REQUESTS, Account, ChangeRequest 
} from '../../mocks/accounts';
import { AccountAdminToolbar, AdminTabType } from './components/AccountAdminToolbar';
import { AccountGrid } from './components/AccountGrid';
import { ModuleTree, AccountModuleNode } from './components/ModuleTree';
import { CuentaForm } from './components/CuentaForm';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Check, X, Users2, ShieldAlert, AlertOctagon
} from 'lucide-react';

interface DashboardTab {
  id: string; // 'cuentas', 'georef', 'dealers', 'modifications', 'victimarios', 'account_edit_<accountId>'
  title: string;
  type: 'cuentas' | 'georef' | 'dealers' | 'modifications' | 'victimarios' | 'account_edit';
  accountId?: string;
  activeModuleNode: AccountModuleNode; // tracks which tree option is active for this tab
}

export const AccountAdminDashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>(MOCK_CHANGE_REQUESTS);
  
  // Tab workspace states
  const [tabs, setTabs] = useState<DashboardTab[]>([
    { id: 'cuentas', title: 'Cuentas', type: 'cuentas', activeModuleNode: 'details' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('cuentas');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Active tab object
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const handleSaveAccount = (updatedAccount: Account) => {
    setAccounts(prev => prev.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc));
    
    // Update tab title if account clientName/number changed
    setTabs(prev => prev.map(t => {
      if (t.id === `account_edit_${updatedAccount.id}`) {
        return {
          ...t,
          title: `${updatedAccount.accountNumber} - ${updatedAccount.clientName}`
        };
      }
      return t;
    }));
  };

  const handleOpenTab = (type: AdminTabType) => {
    if (type === 'cuentas') {
      setActiveTabId('cuentas');
      return;
    }

    const tabId = type;
    const tabExists = tabs.some(t => t.id === tabId);
    if (!tabExists) {
      let title = '';
      if (type === 'georef') title = 'Geo referenciar cuentas';
      if (type === 'dealers') title = 'Dealers';
      if (type === 'modifications') title = 'Solicitudes de modificacion';
      if (type === 'victimarios') title = 'Victimarios';

      const newTab: DashboardTab = {
        id: tabId,
        title,
        type,
        activeModuleNode: 'details'
      };
      setTabs(prev => [...prev, newTab]);
    }
    setActiveTabId(tabId);
  };

  const handleEditAccount = (account: Account) => {
    const tabId = `account_edit_${account.id}`;
    const tabExists = tabs.some(t => t.id === tabId);
    if (!tabExists) {
      const newTab: DashboardTab = {
        id: tabId,
        title: `${account.accountNumber} - ${account.clientName}`,
        type: 'account_edit',
        accountId: account.id,
        activeModuleNode: 'details'
      };
      setTabs(prev => [...prev, newTab]);
    }
    setActiveTabId(tabId);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabId === 'cuentas') return;

    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== tabId);
      if (activeTabId === tabId) {
        const lastTab = remaining[remaining.length - 1];
        setActiveTabId(lastTab.id);
      }
      return remaining;
    });
  };

  const handleCloseAllTabs = () => {
    setTabs([{ id: 'cuentas', title: 'Cuentas', type: 'cuentas', activeModuleNode: 'details' }]);
    setActiveTabId('cuentas');
  };

  const handleNodeChangeInActiveTab = (node: AccountModuleNode) => {
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId) {
        return { ...t, activeModuleNode: node };
      }
      return t;
    }));
  };

  // Modifications approvals
  const handleApproveChange = (reqId: string) => {
    const req = changeRequests.find(r => r.id === reqId);
    if (!req) return;

    setAccounts(prev => prev.map(acc => {
      if (acc.accountNumber === req.accountNumber) {
        const keyMap: Record<string, keyof Account> = {
          'Dirección': 'address',
          'Teléfono': 'phone',
        };
        const key = keyMap[req.fieldChanged];
        if (key) {
          return { ...acc, [key]: req.newValue };
        }
      }
      return acc;
    }));

    setChangeRequests(prev => prev.filter(r => r.id !== reqId));
    alert('Solicitud aprobada e integrada a la ficha del abonado.');
  };

  const handleRejectChange = (reqId: string) => {
    setChangeRequests(prev => prev.filter(r => r.id !== reqId));
    alert('Solicitud rechazada y descartada.');
  };

  const handleUpdateCoordinates = (accountId: string, lat: number, lng: number) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === accountId) {
        return { ...acc, latitude: lat, longitude: lng };
      }
      return acc;
    }));
    alert('Coordenadas de geo-referencia actualizadas.');
  };

  // Render content depending on active tab type
  const renderTabContent = (tab: DashboardTab) => {
    switch (tab.type) {
      case 'cuentas':
        return (
          <AccountGrid
            accounts={accounts}
            selectedAccountId=""
            onSelectAccount={(id) => {
              const acc = accounts.find(a => a.id === id);
              if (acc) handleEditAccount(acc);
            }}
            onEditAccount={handleEditAccount}
            onAddAccount={() => {
              alert('Crear nueva cuenta (Simulado).');
            }}
          />
        );

      case 'georef':
        return (
          <div className="glass-panel border-zinc-800 rounded-xl p-6 space-y-4 h-[calc(100vh-170px)] flex flex-col overflow-hidden">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Geo-referenciación de Abonados</h3>
              <p className="text-xs text-zinc-400">Coordenadas geográficas para cartografía y despacho de móviles</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1 overflow-hidden">
              <div className="lg:col-span-5 space-y-3 overflow-y-auto h-full pr-1 custom-scrollbar">
                {accounts.map(acc => (
                  <div key={acc.id} className="p-3.5 rounded-xl border border-zinc-850 bg-zinc-900/35 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] text-zinc-500 font-mono font-bold block">{acc.accountNumber}</span>
                        <h5 className="text-xs font-bold text-white line-clamp-1">{acc.clientName}</h5>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-semibold block uppercase">Latitud</label>
                        <input
                          type="number"
                          step="0.0001"
                          defaultValue={acc.latitude}
                          onBlur={(e) => handleUpdateCoordinates(acc.id, parseFloat(e.target.value) || acc.latitude, acc.longitude)}
                          className="w-full bg-zinc-950 border border-zinc-850 px-2 py-1 rounded text-white font-mono focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-semibold block uppercase">Longitud</label>
                        <input
                          type="number"
                          step="0.0001"
                          defaultValue={acc.longitude}
                          onBlur={(e) => handleUpdateCoordinates(acc.id, acc.latitude, parseFloat(e.target.value) || acc.longitude)}
                          className="w-full bg-zinc-950 border border-zinc-850 px-2 py-1 rounded text-white font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-7 bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden h-full relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-40 z-0">
                  <div className="absolute inset-0 bg-radial-at-c from-zinc-800 to-zinc-950 grid-bg"></div>
                </div>
                <div className="relative z-10 text-center space-y-2.5 p-6">
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto animate-bounce" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cartografía de Monitoreo</h4>
                  <p className="text-[10px] text-zinc-400 max-w-sm mx-auto">
                    Representación digital de coordenadas. Se registran <strong>{accounts.length}</strong> abonados marcados geográficamente.
                  </p>
                </div>
                
                {accounts.map(acc => (
                  <div 
                    key={acc.id} 
                    className="absolute p-1 bg-orange-600 border border-zinc-900 rounded-lg text-[9px] font-bold text-white z-10 flex items-center gap-1 shadow-lg animate-pulse"
                    style={{
                      top: `${40 + (acc.latitude + 34.5) * 500}%`,
                      left: `${45 + (acc.longitude + 58.4) * 800}%`
                    }}
                  >
                    <MapPin className="w-3 h-3 text-white" />
                    <span>{acc.accountNumber}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'dealers':
        return (
          <div className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] flex flex-col justify-center items-center text-zinc-500 text-xs">
            <Users2 className="w-12 h-12 text-zinc-700 mb-2" />
            <h4 className="font-bold text-zinc-400 uppercase tracking-wider">Dealers Autorizados</h4>
            <p className="text-[10px] text-zinc-500 mt-1">Solapa en desarrollo. Próximamente disponible.</p>
          </div>
        );

      case 'victimarios':
        return (
          <div className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] flex flex-col justify-center items-center text-zinc-500 text-xs">
            <ShieldAlert className="w-12 h-12 text-zinc-700 mb-2" />
            <h4 className="font-bold text-zinc-400 uppercase tracking-wider">Gestión de Victimarios</h4>
            <p className="text-[10px] text-zinc-500 mt-1">Solapa en desarrollo. Próximamente disponible.</p>
          </div>
        );

      case 'modifications':
        return (
          <div className="glass-panel border-zinc-800 rounded-xl p-6 space-y-4 h-[calc(100vh-170px)] flex flex-col overflow-hidden">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Solicitudes de Modificación</h3>
              <p className="text-xs text-zinc-400">Solicitudes remotas enviadas por clientes para su aprobación técnica</p>
            </div>

            {changeRequests.length === 0 ? (
              <div className="flex-1 border border-dashed border-zinc-850 rounded-xl flex flex-col items-center justify-center text-zinc-500 text-xs gap-1.5 bg-zinc-950/30">
                <Check className="w-8 h-8 text-emerald-500" />
                <span>No existen solicitudes de cambio pendientes.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {changeRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl border border-zinc-850 bg-zinc-900/35 relative overflow-hidden flex flex-col justify-between gap-4 max-h-[220px]">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500"></div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] text-zinc-500 font-mono font-bold block">{req.accountNumber}</span>
                          <h5 className="text-xs font-bold text-white leading-tight">{req.clientName}</h5>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-semibold">{req.requestDate}</span>
                      </div>

                      <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-900 space-y-1.5 text-[11px] font-medium">
                        <p className="text-zinc-500 uppercase text-[9px] font-bold tracking-wider">
                          Modificación en: <strong className="text-orange-500">{req.fieldChanged}</strong>
                        </p>
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div>
                            <span className="text-red-400/90 font-bold block">Valor Anterior:</span>
                            <p className="text-zinc-400 truncate" title={req.oldValue}>{req.oldValue}</p>
                          </div>
                          <div>
                            <span className="text-emerald-400 font-bold block">Valor Propuesto:</span>
                            <p className="text-zinc-200 truncate font-semibold" title={req.newValue}>{req.newValue}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-850 text-xs font-semibold">
                      <button
                        onClick={() => handleRejectChange(req.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.8 border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/5 text-zinc-400 hover:text-red-400 rounded-lg transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Rechazar</span>
                      </button>
                      <button
                        onClick={() => handleApproveChange(req.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all shadow-md shadow-emerald-600/10"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Aprobar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'account_edit':
        const account = accounts.find(a => a.id === tab.accountId) || accounts[0];
        
        return (
          <div className="flex gap-5 h-full items-start">
            {/* Left sidebar option tree */}
            <ModuleTree
              account={account}
              activeNode={tab.activeModuleNode}
              onNodeChange={handleNodeChangeInActiveTab}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Right content area */}
            <div className="flex-1 h-full min-w-0">
              {tab.activeModuleNode === 'details' ? (
                <CuentaForm 
                  account={account}
                  onSaveAccount={handleSaveAccount}
                />
              ) : (
                <div className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] flex flex-col justify-center items-center text-zinc-500 text-xs">
                  <AlertOctagon className="w-12 h-12 text-zinc-700 mb-2" />
                  <h4 className="font-bold text-zinc-400 uppercase tracking-wider">
                    {tab.activeModuleNode.charAt(0).toUpperCase() + tab.activeModuleNode.slice(1).replace('_', ' ')}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Solapa en desarrollo. Próximamente disponible.</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Top Application Toolbar */}
      <AccountAdminToolbar
        onOpenTab={handleOpenTab}
        onCloseAll={handleCloseAllTabs}
      />

      {/* Tabs Header bar */}
      <div className="flex items-center gap-1 border-b border-zinc-850 bg-zinc-950/20 p-1 rounded-lg select-none overflow-x-auto custom-scrollbar shrink-0">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isClosable = tab.id !== 'cuentas';
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.8 rounded border transition-all cursor-pointer whitespace-nowrap text-xs font-semibold ${
                isActive
                  ? 'border-orange-500/40 bg-orange-500/10 text-orange-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <span>{tab.title}</span>
              {isClosable && (
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="p-0.5 rounded hover:bg-zinc-800 hover:text-red-400 transition-colors"
                  title="Cerrar solapa"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Tab Panel Content */}
      <div className="min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderTabContent(activeTab)}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
