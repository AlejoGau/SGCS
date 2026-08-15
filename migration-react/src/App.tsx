import React, { useState } from 'react';
import { Login } from './features/auth/Login';
import { DesktopLayout } from './layouts/DesktopLayout';
import { AccountAdminDashboard } from './features/billing/AccountAdminDashboard';
import { SystemConfigDashboard } from './features/admin/SystemConfigDashboard';
import { TrackGuardDashboard } from './features/trackguard/TrackGuardDashboard';
import { MonitoreoDashboard } from './features/monitoreo/MonitoreoDashboard';
import { AccessControlDashboard } from './features/accesscontrol/AccessControlDashboard';
import { SplashScreen } from './components/SplashScreen';
import { Shield, Sparkles, Activity } from 'lucide-react';

type AppPhase = 'splash' | 'login' | 'dashboard';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('splash');
  const [activeModule, setActiveModule] = useState<string>('billing');

  const handleSplashComplete = () => {
    setPhase('login');
  };

  const handleLoginSuccess = () => {
    setPhase('dashboard');
  };

  const handleLogout = () => {
    setPhase('login');
  };

  const renderModuleComponent = (moduleId: string) => {
    switch (moduleId) {
      case 'billing':
      case 'cuentas':
        return <AccountAdminDashboard />;
      case 'admin':
      case 'configuracion':
        return <SystemConfigDashboard />;
      case 'trackguard':
        return <TrackGuardDashboard />;
      case 'monitoreo':
        return <MonitoreoDashboard />;
      case 'accesscontrol':
        return <AccessControlDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-zinc-900/40 border border-zinc-800 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 capitalize">
              Módulo: {moduleId}
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mb-6">
              Este módulo se encuentra registrado en el plan de migración de ExtJS a React. Los módulos mockeados activos son <strong>Cuentas</strong>, <strong>Configuración</strong> y <strong>TrackGuard</strong>.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>En Cola para Migración React (Fase 2)</span>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {phase === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} duration={4000} />
      )}

      {phase === 'login' && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {phase === 'dashboard' && (
        <DesktopLayout 
          onLogout={handleLogout} 
          activeModule={activeModule}
          onChangeModule={setActiveModule}
          renderModuleComponent={renderModuleComponent}
        />
      )}
    </>
  );
};

export default App;
