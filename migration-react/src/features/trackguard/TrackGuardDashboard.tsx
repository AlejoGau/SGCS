import React, { useState } from 'react';
import { TrackGuardMapTab } from './components/TrackGuardMapTab';
import { MobileDevicesTab } from './components/MobileDevicesTab';
import { EventsTab } from './components/EventsTab';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Layers, ShieldAlert, Route, Grid, AlertCircle, Map, Smartphone, Info
} from 'lucide-react';

type TabId = 'mapa' | 'dispositivos' | 'sin_asignar' | 'viajes' | 'eventos';

export const TrackGuardDashboard: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<TabId>('mapa');

  const handleAddManualEvent = () => {
    alert('Generación de Evento Manual (Pánico / Falla de batería / Exceso de velocidad) simulación iniciada.');
  };

  const renderTabContent = () => {
    switch (activeTabId) {
      case 'mapa':
        return <TrackGuardMapTab />;
      case 'dispositivos':
        return <MobileDevicesTab />;
      case 'eventos':
        return <EventsTab />;
      case 'sin_asignar':
        return (
          <div className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] flex flex-col justify-center items-center text-zinc-500 text-xs">
            <Smartphone className="w-12 h-12 text-zinc-700 mb-2" />
            <h4 className="font-bold text-zinc-400 uppercase tracking-wider">Dispositivos móviles sin asignar</h4>
            <p className="text-[10px] text-zinc-500 mt-1">Esta sección lista chips SIM e IMEI pendientes de asignación técnica a abonados.</p>
          </div>
        );
      case 'viajes':
        return (
          <div className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] flex flex-col justify-center items-center text-zinc-500 text-xs">
            <Route className="w-12 h-12 text-zinc-700 mb-2" />
            <h4 className="font-bold text-zinc-400 uppercase tracking-wider">Reporte Histórico de Viajes</h4>
            <p className="text-[10px] text-zinc-500 mt-1">Consulte el recorrido histórico, detenciones y kilometraje total por fecha.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Top TrackGuard Module Toolbar */}
      <div className="bg-zinc-900/60 border border-zinc-850 p-2 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg select-none shrink-0">
        
        {/* Left Actions */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button 
            onClick={() => alert('Administración de Puntos de Interés (POI).')}
            className="btn-secondary px-3 py-1.8 text-xs font-bold gap-1.5"
            title="Puntos de Interés"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Puntos de Interés</span>
          </button>

          <button 
            onClick={() => alert('Configuración y edición de Geocercas de control.')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span>Geocercas</span>
          </button>

          <button 
            onClick={() => alert('Trazado y asignación de Rutas planificadas.')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5"
          >
            <Route className="w-3.5 h-3.5 text-zinc-500" />
            <span>Rutas</span>
          </button>

          <button 
            onClick={() => alert('Definición de Restricciones horarias y de velocidad.')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5 hidden md:flex"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
            <span>Restricciones</span>
          </button>

          <button 
            onClick={() => alert('Cuadrícula general de posiciones.')}
            className="btn-secondary px-3 py-1.8 text-xs font-semibold gap-1.5"
          >
            <Grid className="w-3.5 h-3.5 text-zinc-500" />
            <span>Grilla</span>
          </button>
        </div>

        {/* Right Manual Event actions */}
        <div>
          <button 
            onClick={handleAddManualEvent}
            className="px-3.5 py-1.8 bg-red-950/20 border border-red-900/40 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all active:scale-[0.96] shadow-md shadow-red-500/5"
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Generar evento manual</span>
          </button>
        </div>

      </div>

      {/* Main Tab Panel selector */}
      <div className="flex items-center gap-1 border-b border-zinc-850 bg-zinc-950/20 p-1 rounded-lg select-none overflow-x-auto custom-scrollbar shrink-0">
        {[
          { id: 'mapa', title: 'Mapa', icon: <Map className="w-3.5 h-3.5" /> },
          { id: 'dispositivos', title: 'Dispositivos Móviles', icon: <Smartphone className="w-3.5 h-3.5" /> },
          { id: 'sin_asignar', title: 'Dispositivos móviles sin asignar' },
          { id: 'viajes', title: 'Viajes' },
          { id: 'eventos', title: 'Eventos', icon: <Info className="w-3.5 h-3.5" /> }
        ].map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id as TabId)}
              className={`flex items-center gap-1.5 px-3.5 py-1.8 rounded border transition-all cursor-pointer whitespace-nowrap text-xs font-semibold ${
                isActive
                  ? 'border-orange-500/40 bg-orange-500/10 text-orange-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              {tab.icon && tab.icon}
              <span>{tab.title}</span>
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
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
