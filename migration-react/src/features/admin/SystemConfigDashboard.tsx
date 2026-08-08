import React, { useState } from 'react';
import { 
  AdminUser, MOCK_ADMIN_USERS 
} from '../../mocks/admin';
import { ActiveSessionsView } from './components/ActiveSessionsView';
import { UserGrid } from './components/UserGrid';
import { UserForm } from './components/UserForm';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Users, Server, FileText, Trash2, Settings, AlertTriangle, CheckCircle, X
} from 'lucide-react';

interface ConfigTab {
  id: string; // 'estado', 'usuarios', 'edit_user_<userId>'
  title: string;
  type: 'estado' | 'usuarios' | 'edit_user';
  userId?: string;
}

export const SystemConfigDashboard: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);

  // Tab workspace states
  const [tabs, setTabs] = useState<ConfigTab[]>([
    { id: 'estado', title: 'Estado', type: 'estado' },
    { id: 'usuarios', title: 'Administración de usuarios', type: 'usuarios' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('estado');

  // Active tab object
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const handleDisconnectSession = (id: string) => {
    // Session disconnect handler (simulated)
    console.log('Session disconnected: ' + id);
  };

  const handleSaveUser = (updatedUser: AdminUser) => {
    setUsers(prev => {
      const exists = prev.some(u => u.id === updatedUser.id);
      if (exists) {
        return prev.map(u => u.id === updatedUser.id ? updatedUser : u);
      }
      return [...prev, updatedUser];
    });

    // Update tab title if username changed
    setTabs(prev => prev.map(t => {
      if (t.id === `edit_user_${updatedUser.id}`) {
        return { ...t, title: updatedUser.username };
      }
      return t;
    }));

    alert(`Ficha de usuario ${updatedUser.username} guardada correctamente.`);
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) return;

    if (window.confirm(`¿Está seguro de eliminar de forma permanente al usuario: ${userToDelete.username}?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      // Close the tab
      handleCloseTab(`edit_user_${userId}`);
      alert(`Usuario ${userToDelete.username} eliminado.`);
    }
  };

  const handleEditUser = (user: AdminUser) => {
    const tabId = `edit_user_${user.id}`;
    const tabExists = tabs.some(t => t.id === tabId);
    if (!tabExists) {
      const newTab: ConfigTab = {
        id: tabId,
        title: user.username,
        type: 'edit_user',
        userId: user.id
      };
      setTabs(prev => [...prev, newTab]);
    }
    setActiveTabId(tabId);
  };

  const handleAddUser = (type: 'Central' | 'Dealer' | 'Usuario final') => {
    const newUser: AdminUser = {
      id: 'u-' + Math.floor(Math.random() * 89999 + 10000),
      username: `nuevo_usuario_${Math.floor(Math.random() * 900 + 100)}@softguard.com`,
      name: '',
      lastName: '',
      client: 'Nuevo cliente',
      province: 'Buenos Aires',
      language: 'Español (Argentina)',
      profile: 'Sin perfil',
      status: 'Habilitado',
      type: type,
      allowedModules: ['Monitoreo']
    };
    
    // Add to list and open edit tab immediately
    setUsers(prev => [...prev, newUser]);
    handleEditUser(newUser);
  };

  const handleCloseTab = (tabId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (tabId === 'estado' || tabId === 'usuarios') return;

    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== tabId);
      if (activeTabId === tabId) {
        const lastTab = remaining[remaining.length - 1];
        setActiveTabId(lastTab.id);
      }
      return remaining;
    });
  };

  const renderTabContent = (tab: ConfigTab) => {
    switch (tab.type) {
      case 'estado':
        return (
          <ActiveSessionsView 
            onDisconnectSession={handleDisconnectSession}
          />
        );

      case 'usuarios':
        return (
          <UserGrid 
            onSelectUser={handleEditUser}
            onAddUser={handleAddUser}
          />
        );

      case 'edit_user':
        const user = users.find(u => u.id === tab.userId);
        if (!user) return <div className="text-zinc-500 text-xs">Usuario no encontrado.</div>;
        return (
          <UserForm 
            user={user}
            onSave={handleSaveUser}
            onDelete={handleDeleteUser}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Top Config Module Toolbar */}
      <div className="bg-zinc-900/60 border border-zinc-850 p-2 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg select-none shrink-0">
        
        {/* Left Actions */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button 
            onClick={() => handleAddUser('Central')}
            className="btn-secondary px-3 py-1.8 text-xs font-bold gap-1.5"
            title="Crear nuevo usuario"
          >
            <UserPlus className="w-3.5 h-3.5 text-orange-500" />
            <span>Crear Usuario</span>
          </button>

          <button 
            onClick={() => alert('Administración de Organizaciones (Simulado).')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span>Organizaciones</span>
          </button>

          <button 
            onClick={() => alert('Centrales receptoras de eventos configuradas.')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5"
          >
            <Server className="w-3.5 h-3.5 text-zinc-500" />
            <span>Centrales</span>
          </button>

          <button 
            onClick={() => alert('Log histórico de auditoría del sistema.')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5 hidden md:flex"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>Auditoría</span>
          </button>

          <button 
            onClick={() => alert('Proceso masivo para dar de baja cuentas inactivas.')}
            className="btn-danger-outline px-3 py-1.8 text-xs font-semibold gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Eliminar cuentas</span>
          </button>

          {/* System Dropdown button */}
          <button 
            onClick={() => alert('Ajustes del sistema de monitoreo.')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-zinc-500" />
            <span>Sistema</span>
          </button>
        </div>

        {/* Right Restores Status alerts */}
        <div className="flex items-center gap-1 flex-wrap">
          <button 
            onClick={() => alert('Todas las cuentas marcadas en falla técnica han sido restauradas.')}
            className="px-2 py-1 bg-amber-500/10 border border-amber-500/25 hover:border-amber-500/40 text-amber-500 hover:text-amber-400 font-bold rounded-lg text-[9px] uppercase tracking-wider flex items-center gap-1 transition-all active:scale-[0.96]"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Restaurar Cuentas en Falla</span>
          </button>

          <button 
            onClick={() => alert('Fallo eléctrico general (AC) restaurado.')}
            className="px-2 py-1 bg-amber-500/10 border border-amber-500/25 hover:border-amber-500/40 text-amber-500 hover:text-amber-400 font-bold rounded-lg text-[9px] uppercase tracking-wider flex items-center gap-1 transition-all active:scale-[0.96]"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Restaurar Fallo AC</span>
          </button>

          <button 
            onClick={() => alert('Cuentas sin comunicación de test de vida periódico restauradas.')}
            className="px-2 py-1 bg-amber-500/10 border border-amber-500/25 hover:border-amber-500/40 text-amber-500 hover:text-amber-400 font-bold rounded-lg text-[9px] uppercase tracking-wider flex items-center gap-1 transition-all active:scale-[0.96]"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Restaurar Fallo Test</span>
          </button>

          <button 
            onClick={() => alert('Iniciando proceso de restauración masiva de particiones.')}
            className="px-2 py-1 bg-emerald-600/10 border border-emerald-500/20 hover:border-emerald-500/45 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg text-[9px] uppercase tracking-wider flex items-center gap-1 transition-all active:scale-[0.96]"
          >
            <CheckCircle className="w-3 h-3" />
            <span>Proceso masivo</span>
          </button>
        </div>

      </div>

      {/* Main Tab Panel selector */}
      <div className="flex items-center gap-1 border-b border-zinc-850 bg-zinc-950/20 p-1 rounded-lg select-none overflow-x-auto custom-scrollbar shrink-0">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isClosable = tab.id !== 'estado' && tab.id !== 'usuarios';
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

      {/* Tab Panel contents */}
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
