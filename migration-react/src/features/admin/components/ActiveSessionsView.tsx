import React, { useState } from 'react';
import { 
  MOCK_ACTIVE_SESSIONS, ActiveSession 
} from '../../../mocks/admin';
import { 
  RefreshCw, Power, Filter, Search, Layers, Users, Building, 
  Terminal, ShieldCheck, Cpu, HardDrive, Database
} from 'lucide-react';

interface ActiveSessionsViewProps {
  onDisconnectSession: (id: string) => void;
}

type SubTabType = 'sesiones' | 'tareas' | 'test' | 'rendimiento' | 'reporte';
type GroupByType = 'usuario' | 'modulo' | 'organizacion';

export const ActiveSessionsView: React.FC<ActiveSessionsViewProps> = ({ onDisconnectSession }) => {
  const [sessions, setSessions] = useState<ActiveSession[]>(MOCK_ACTIVE_SESSIONS);
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('sesiones');
  const [groupBy, setGroupBy] = useState<GroupByType>('usuario');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleRefresh = () => {
    setSessions(MOCK_ACTIVE_SESSIONS);
  };

  const handleDisconnect = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    onDisconnectSession(id);
  };

  // Filter sessions
  const filteredSessions = sessions.filter(s => {
    const matchesSearch = 
      s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterModule ? s.module === filterModule : true;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalConnected = new Set(filteredSessions.map(s => s.username)).size;
  const activeModulesCount = new Set(filteredSessions.map(s => s.module)).size;
  const moduleCounts = filteredSessions.reduce((acc, curr) => {
    acc[curr.module] = (acc[curr.module] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Render group layout
  const renderGroupedSessions = () => {
    if (groupBy === 'usuario') {
      // Group by username
      const groups = filteredSessions.reduce((acc, curr) => {
        if (!acc[curr.username]) acc[curr.username] = [];
        acc[curr.username].push(curr);
        return acc;
      }, {} as Record<string, ActiveSession[]>);

      return Object.entries(groups).map(([username, userSessions]) => {
        const fullName = userSessions[0]?.fullName || username;
        return (
          <div key={username} className="space-y-1 mb-4">
            {/* Group Header */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950/40 border border-zinc-900 rounded-lg text-xs font-bold text-orange-400">
              <Users className="w-3.5 h-3.5" />
              <span>{username}</span>
            </div>
            {/* Group Body */}
            <div className="space-y-1 pl-4">
              {userSessions.map(s => (
                <div 
                  key={s.id} 
                  className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700/60 rounded-lg transition-all text-xs text-zinc-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 min-w-[150px]">
                      <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="font-bold text-white">{fullName}</span>
                    </div>
                    <div className="min-w-[120px]">
                      <span className="text-[10px] bg-orange-500/10 border border-orange-500/25 text-orange-400 font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                        {s.module}
                      </span>
                    </div>
                    <div className="text-zinc-400">
                      Organización: <span className="font-semibold text-white">{s.organization}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono hidden md:block">
                      IP: {s.ipAddress} | Conectado: {s.loginTime}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDisconnect(s.id)}
                    className="btn-danger-outline py-1 px-2.5 text-[10px] flex items-center gap-1"
                    title="Desconectar usuario de este módulo"
                  >
                    <Power className="w-3 h-3" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      });
    }

    if (groupBy === 'modulo') {
      // Group by module
      const groups = filteredSessions.reduce((acc, curr) => {
        if (!acc[curr.module]) acc[curr.module] = [];
        acc[curr.module].push(curr);
        return acc;
      }, {} as Record<string, ActiveSession[]>);

      return Object.entries(groups).map(([modName, modSessions]) => (
        <div key={modName} className="space-y-1 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950/40 border border-zinc-900 rounded-lg text-xs font-bold text-orange-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Módulo: {modName}</span>
          </div>
          <div className="space-y-1 pl-4">
            {modSessions.map(s => (
              <div 
                key={s.id} 
                className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700/60 rounded-lg transition-all text-xs text-zinc-300"
              >
                <div className="flex items-center gap-4">
                  <div className="min-w-[200px]">
                    <span className="font-bold text-white block">{s.fullName}</span>
                    <span className="text-[10px] text-zinc-500">{s.username}</span>
                  </div>
                  <div>
                    Organización: <span className="font-semibold text-white">{s.organization}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono hidden md:block">
                    IP: {s.ipAddress} | Conectado: {s.loginTime}
                  </div>
                </div>
                <button 
                  onClick={() => handleDisconnect(s.id)}
                  className="btn-danger-outline py-1 px-2.5 text-[10px]"
                >
                  Cerrar sesión
                </button>
              </div>
            ))}
          </div>
        </div>
      ));
    }

    // Group by organization
    const groups = filteredSessions.reduce((acc, curr) => {
      if (!acc[curr.organization]) acc[curr.organization] = [];
      acc[curr.organization].push(curr);
      return acc;
    }, {} as Record<string, ActiveSession[]>);

    return Object.entries(groups).map(([orgName, orgSessions]) => (
      <div key={orgName} className="space-y-1 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950/40 border border-zinc-900 rounded-lg text-xs font-bold text-orange-400">
          <Building className="w-3.5 h-3.5" />
          <span>Organización: {orgName}</span>
        </div>
        <div className="space-y-1 pl-4">
          {orgSessions.map(s => (
            <div 
              key={s.id} 
              className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700/60 rounded-lg transition-all text-xs text-zinc-300"
            >
              <div className="flex items-center gap-4">
                <div className="min-w-[200px]">
                  <span className="font-bold text-white block">{s.fullName}</span>
                  <span className="text-[10px] text-zinc-500">{s.username}</span>
                </div>
                <div className="min-w-[120px]">
                  <span className="text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                    {s.module}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono hidden md:block">
                  IP: {s.ipAddress} | Conectado: {s.loginTime}
                </div>
              </div>
              <button 
                onClick={() => handleDisconnect(s.id)}
                className="btn-danger-outline py-1 px-2.5 text-[10px]"
              >
                Cerrar sesión
              </button>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl p-6 space-y-5 h-[calc(100vh-170px)] flex flex-col overflow-hidden">
      
      {/* Tab Sub-Header Actions */}
      <div className="flex justify-between items-center shrink-0 flex-wrap gap-2 border-b border-zinc-850/60 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Estado del Servidor de Configuración</h3>
          <p className="text-[10px] text-zinc-500">Supervisión de sesiones, rendimiento de sockets y tareas programadas en tiempo real</p>
        </div>
        
        <button 
          onClick={handleRefresh}
          className="btn-secondary px-3 py-1.5 text-xs gap-1.5 hover:text-orange-500 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Internal Sub-Tabs Panel */}
      <div className="flex border-b border-zinc-850 bg-zinc-950/40 p-1 rounded-lg shrink-0 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveSubTab('sesiones')}
          className={`px-4 py-1.8 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
            activeSubTab === 'sesiones' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Sesiones Activas
        </button>
        <button
          onClick={() => setActiveSubTab('tareas')}
          className={`px-4 py-1.8 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
            activeSubTab === 'tareas' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Tareas
        </button>
        <button
          onClick={() => setActiveSubTab('test')}
          className={`px-4 py-1.8 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
            activeSubTab === 'test' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Test del sistema
        </button>
        <button
          onClick={() => setActiveSubTab('rendimiento')}
          className={`px-4 py-1.8 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
            activeSubTab === 'rendimiento' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Rendimiento
        </button>
        <button
          onClick={() => setActiveSubTab('reporte')}
          className={`px-4 py-1.8 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
            activeSubTab === 'reporte' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Reporte Sumario
        </button>
      </div>

      {/* Tab Body Contents */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0">
        {activeSubTab === 'sesiones' && (
          <div className="space-y-4">
            
            {/* Connected widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-950/20 p-3 rounded-lg border border-zinc-850/60">
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Cantidad de usuarios conectados</span>
                <p className="text-2xl font-bold text-white mt-1 font-mono">{totalConnected}</p>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Módulos con sesiones activas</span>
                <p className="text-2xl font-bold text-white mt-1 font-mono">{activeModulesCount}</p>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Distribución</span>
                <div className="flex gap-2 flex-wrap mt-1.5 text-[9px] font-semibold text-zinc-400">
                  {Object.entries(moduleCounts).map(([mod, count]) => (
                    <span key={mod} className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded">
                      {mod}: {count}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Inner Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900/30 border border-zinc-850 rounded-xl select-none text-xs">
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setGroupBy('usuario')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold ${
                    groupBy === 'usuario' ? 'btn-secondary-active' : 'btn-secondary'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Agrupar por Usuario</span>
                </button>
                <button 
                  onClick={() => setGroupBy('modulo')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold ${
                    groupBy === 'modulo' ? 'btn-secondary-active' : 'btn-secondary'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Agrupar por módulo</span>
                </button>
                <button 
                  onClick={() => setGroupBy('organizacion')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold ${
                    groupBy === 'organizacion' ? 'btn-secondary-active' : 'btn-secondary'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Agrupar por Organización</span>
                </button>
              </div>

              <div className="flex items-center gap-2 relative">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Buscar sesión..."
                    value={searchQuery}
                    onChange={(e) => searchQuery !== e.target.value && setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-40 md:w-52"
                  />
                </div>
                
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="btn-secondary p-1.5"
                  title="Filtrar por módulo"
                >
                  <Filter className="w-4 h-4 text-zinc-400" />
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 top-9 w-40 bg-zinc-950 border border-zinc-800 rounded-lg p-1.5 shadow-xl z-25 text-xs text-zinc-300">
                    <div className="font-bold text-[9px] text-zinc-500 uppercase px-2 py-1 border-b border-zinc-850">
                      Módulo
                    </div>
                    <button 
                      onClick={() => { setFilterModule(''); setShowFilterDropdown(false); }}
                      className="w-full text-left px-2 py-1 hover:bg-zinc-900 rounded mt-1"
                    >
                      Todos
                    </button>
                    {['TrackGuard', 'Configuración', 'Monitoreo'].map(m => (
                      <button 
                        key={m}
                        onClick={() => { setFilterModule(m); setShowFilterDropdown(false); }}
                        className="w-full text-left px-2 py-1 hover:bg-zinc-900 rounded"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sessions Lists Grouped */}
            <div className="space-y-3">
              {filteredSessions.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-zinc-850 rounded-xl text-zinc-500 bg-zinc-950/20">
                  No hay sesiones activas que coincidan con los filtros.
                </div>
              ) : (
                renderGroupedSessions()
              )}
            </div>

          </div>
        )}

        {activeSubTab === 'tareas' && (
          <div className="space-y-4">
            <div className="p-3 bg-zinc-950/20 rounded-xl border border-zinc-850/60">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Tareas de segundo plano (Cron Jobs)</h4>
              <div className="space-y-2">
                {[
                  { name: 'Depuración de Logs obsoletos', cron: '0 0 * * *', status: 'Esperando', last: 'Ayer 23:59', next: 'Hoy 23:59' },
                  { name: 'Backup base de datos SgConfig', cron: '*/30 * * * *', status: 'Corriendo...', last: 'Hace 12 min', next: 'En 18 min' },
                  { name: 'Sincronizar usuarios de Active Directory', cron: '0 */4 * * *', status: 'Esperando', last: 'Hace 2 hs', next: 'En 2 hs' }
                ].map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-zinc-900/40 border border-zinc-850 rounded-lg text-xs">
                    <div>
                      <span className="font-bold text-white">{t.name}</span>
                      <p className="text-[10px] text-zinc-500 font-mono">Expresión cron: {t.cron}</p>
                    </div>
                    <div className="text-right text-[10px]">
                      <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                        t.status.includes('Corriendo') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                      }`}>{t.status}</span>
                      <p className="text-zinc-500 mt-1">Última ejecución: {t.last}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'test' && (
          <div className="space-y-4">
            <div className="p-3 bg-zinc-950/20 rounded-xl border border-zinc-850/60 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Test de Diagnóstico de Red y Sockets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { name: 'Puerto SQL Server (1433)', desc: 'Conexión TCP con motor de datos principal', status: 'OK', color: 'text-emerald-400' },
                  { name: 'Servicios de Licenciamiento Cloud', desc: 'Validación de firma digital de Softguard', status: 'OK', color: 'text-emerald-400' },
                  { name: 'DNS Resolving', desc: 'Resolución de dominios de pasarelas de pago y SMS', status: 'OK', color: 'text-emerald-400' },
                  { name: 'Latencia sockets activos', desc: 'Estadísticas HMR de recarga en caliente', status: '15ms (Bajo)', color: 'text-orange-400' }
                ].map((t, idx) => (
                  <div key={idx} className="p-3 bg-zinc-900/35 border border-zinc-850 rounded-lg flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-white block">{t.name}</span>
                      <span className="text-[10px] text-zinc-500">{t.desc}</span>
                    </div>
                    <span className={`font-mono font-bold ${t.color}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'rendimiento' && (
          <div className="space-y-4">
            <div className="p-4 bg-zinc-950/20 rounded-xl border border-zinc-850/60 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Monitor de Recursos de Hardware</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase">
                    <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU</span>
                    <span className="font-mono text-white text-xs">12%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase">
                    <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> Memoria RAM</span>
                    <span className="font-mono text-white text-xs">4.2 GB / 16 GB</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[26%] h-full bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase">
                    <span className="flex items-center gap-1"><Database className="w-3 h-3" /> SQL Pool</span>
                    <span className="font-mono text-white text-xs">8 Conexiones</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[8%] h-full bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'reporte' && (
          <div className="space-y-4">
            <div className="p-4 bg-zinc-950/20 rounded-xl border border-zinc-850/60 text-xs space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Auditoría e Integridad del Servidor</span>
              </h4>
              <p className="text-zinc-400">
                Todo el módulo de Configuración se ejecuta bajo los parámetros autorizados de la licencia local. 
                Se han auditado <strong>45 eventos de usuarios</strong> en la última hora.
              </p>
              <div className="p-3 bg-zinc-900/35 border border-zinc-850 rounded-lg font-mono text-[10px] text-zinc-500 space-y-1">
                <p><span className="text-zinc-600">[2026-05-23 12:40:11]</span> USER ADMIN logged in from 192.168.1.55</p>
                <p><span className="text-zinc-600">[2026-05-23 12:42:05]</span> SESSION s-2 started for module Configuration</p>
                <p><span className="text-zinc-600">[2026-05-23 13:00:15]</span> SOCKET connection established successfully</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
