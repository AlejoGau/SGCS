import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { 
  MobileDevice, MOCK_TRACKGUARD_DEVICES 
} from '../../../mocks/trackguard';
import { 
  RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, 
  MapPin, ZoomIn, ZoomOut, CheckSquare, Square, X, Navigation, Activity, Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type MapStyleKey = 'dark' | 'street' | 'voyager';
type StatusFilter = 'todos' | 'movimiento' | 'detenido' | 'no_actual' | 'alarma' | 'viaje';

const MAP_STYLES: Record<MapStyleKey, { name: string; url: string }> = {
  dark: {
    name: 'Obsidian Dark (CartoDB)',
    url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
  },
  street: {
    name: 'Positron Light (CartoDB)',
    url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
  },
  voyager: {
    name: 'Voyager Color (CartoDB)',
    url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
  }
};

export const TrackGuardMapTab: React.FC = () => {
  const [devices, setDevices] = useState<MobileDevice[]>(MOCK_TRACKGUARD_DEVICES);
  
  // Real-Time WebSocket simulation state
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  // Left Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilter>('todos');
  const [checkedDeviceIds, setCheckedDeviceIds] = useState<Set<string>>(
    new Set(MOCK_TRACKGUARD_DEVICES.map(d => d.id)) // default check all devices
  );

  // Map state
  const [mapStyleKey, setMapStyleKey] = useState<MapStyleKey>('dark');
  const [selectedDeviceOnMap, setSelectedDeviceOnMap] = useState<MobileDevice | null>(null);

  // ViewState for MapLibre
  const [viewState, setViewState] = useState({
    latitude: -34.6037,
    longitude: -58.3816,
    zoom: 12,
    pitch: 30,
    bearing: 0
  });

  // Pagination states for Left Grid
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Real-time WebSocket simulator effect: slightly moves active vehicles every 2 seconds
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setDevices(prev => prev.map(dev => {
        if (dev.status === 'movimiento' || dev.velocidad > 0) {
          // Micro-movement jitter simulating real GPS feed
          const latOffset = (Math.random() - 0.48) * 0.0015;
          const lngOffset = (Math.random() - 0.48) * 0.0015;
          const speedVar = Math.max(10, Math.min(120, dev.velocidad + Math.floor((Math.random() - 0.5) * 6)));

          return {
            ...dev,
            latitude: dev.latitude + latOffset,
            longitude: dev.longitude + lngOffset,
            velocidad: speedVar,
            fechaPosicion: `Hoy ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
          };
        }
        return dev;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  const handleRefresh = () => {
    setDevices(MOCK_TRACKGUARD_DEVICES);
  };

  const handleToggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedDeviceIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleCheckAll = () => {
    if (checkedDeviceIds.size === filteredDevices.length) {
      setCheckedDeviceIds(new Set());
    } else {
      setCheckedDeviceIds(new Set(filteredDevices.map(d => d.id)));
    }
  };

  // Filter devices
  const filteredDevices = devices.filter(d => {
    const matchesSearch = 
      d.matricula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nombreCuenta.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      activeStatusFilter === 'todos' ? true : d.status === activeStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalItems = filteredDevices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDevices.slice(indexOfFirstItem, indexOfLastItem);

  // Status badge style helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'movimiento':
        return 'bg-emerald-500';
      case 'detenido':
        return 'bg-red-500';
      case 'alarma':
        return 'bg-red-600 animate-ping';
      case 'viaje':
        return 'bg-amber-500';
      default:
        return 'bg-zinc-500';
    }
  };

  // Click on a device in the list centers MapLibre GL view on it
  const handleSelectDevice = (d: MobileDevice) => {
    setCheckedDeviceIds(prev => {
      const next = new Set(prev);
      next.add(d.id);
      return next;
    });
    setSelectedDeviceOnMap(d);
    setViewState(prev => ({
      ...prev,
      latitude: d.latitude,
      longitude: d.longitude,
      zoom: 14.5
    }));
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-170px)] items-start overflow-hidden select-none font-sans">
      
      {/* Collapsible Left Grid Panel */}
      <div 
        className={`glass-panel border-zinc-850 rounded-xl flex flex-col h-full overflow-hidden transition-all duration-300 shrink-0 ${
          sidebarCollapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-80 md:w-96'
        }`}
      >
        
        {/* Left Filter Header */}
        <div className="p-3 border-b border-zinc-850 bg-zinc-950/40 space-y-3 shrink-0 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-zinc-400 text-[10px]">Flota Activa</span>
              <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] font-mono font-bold">
                MapLibre GL
              </span>
            </div>
            
            <button 
              onClick={handleRefresh}
              className="p-1 rounded text-zinc-500 hover:text-orange-500 transition-colors"
              title="Recargar datos de flota"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar vehículo / cuenta..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="flex-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Quick status badges buttons row */}
          <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar shrink-0 text-[10px] font-bold uppercase select-none">
            <button 
              onClick={() => { setActiveStatusFilter('todos'); setCurrentPage(1); }}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                activeStatusFilter === 'todos' ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400' : 'bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Todos ({devices.length})
            </button>
            <button 
              onClick={() => { setActiveStatusFilter('movimiento'); setCurrentPage(1); }}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-colors whitespace-nowrap ${
                activeStatusFilter === 'movimiento' ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' : 'bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Movimiento
            </button>
            <button 
              onClick={() => { setActiveStatusFilter('detenido'); setCurrentPage(1); }}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-colors whitespace-nowrap ${
                activeStatusFilter === 'detenido' ? 'bg-red-500/15 border border-red-500/30 text-red-400' : 'bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Detenidos
            </button>
            <button 
              onClick={() => { setActiveStatusFilter('alarma'); setCurrentPage(1); }}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-colors whitespace-nowrap ${
                activeStatusFilter === 'alarma' ? 'bg-red-600/15 border border-red-600/30 text-red-400' : 'bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              Alarma
            </button>
          </div>
        </div>

        {/* Devices grid list scrollable */}
        <div className="flex-1 overflow-y-auto border-b border-zinc-850 bg-zinc-950/10 min-h-0">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-500 font-bold uppercase tracking-wider text-[9px] sticky top-0 z-10 select-none">
                <th className="p-2 w-8 text-center"></th>
                <th className="p-2 w-6">Est.</th>
                <th className="p-2">Matrícula</th>
                <th className="p-2">Cuenta</th>
                <th className="p-2 text-right">Vel.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40 font-medium">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-zinc-500">
                    No se encontraron dispositivos activos.
                  </td>
                </tr>
              ) : (
                currentItems.map(d => {
                  const isChecked = checkedDeviceIds.has(d.id);
                  const isSelected = selectedDeviceOnMap?.id === d.id;

                  return (
                    <tr 
                      key={d.id}
                      onClick={() => handleSelectDevice(d)}
                      className={`transition-all border-b border-zinc-900/60 text-zinc-300 cursor-pointer text-[11px] ${
                        isSelected ? 'bg-orange-500/10 border-orange-500/30 font-bold text-white' : 'hover:bg-zinc-900/40'
                      }`}
                    >
                      <td className="p-2 text-center">
                        <button 
                          onClick={(e) => handleToggleCheck(d.id, e)}
                          className="text-zinc-500 hover:text-orange-500 transition-colors"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-orange-500" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-750" />
                          )}
                        </button>
                      </td>
                      <td className="p-2 text-center">
                        <div className={`w-2 h-2 rounded-full ${getStatusBadge(d.status)} mx-auto`} />
                      </td>
                      <td className="p-2 font-bold uppercase text-white">{d.matricula}</td>
                      <td className="p-2 truncate max-w-[110px]" title={d.nombreCuenta}>{d.nombreCuenta}</td>
                      <td className="p-2 text-right font-mono font-bold text-zinc-400">{d.velocidad} km/h</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pager in Sidebar */}
        <div className="p-2 bg-zinc-950/20 border-b border-zinc-850 flex items-center justify-between text-[11px] shrink-0 select-none">
          <div className="flex items-center gap-0.5">
            <button 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 text-zinc-400 hover:text-white disabled:opacity-20"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 text-zinc-400 hover:text-white disabled:opacity-20"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-zinc-500 font-semibold px-1">
              Pág. <strong className="text-white">{currentPage}</strong> de {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1 text-zinc-400 hover:text-white disabled:opacity-20"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 text-zinc-400 hover:text-white disabled:opacity-20"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-zinc-500 font-semibold text-[10px]">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} de {totalItems}
          </span>
        </div>

        {/* Sidebar Footer Toolbar actions */}
        <div className="p-2 bg-zinc-900/30 grid grid-cols-2 gap-2 text-xs shrink-0 select-none">
          <button 
            onClick={handleToggleCheckAll}
            className="btn-secondary py-1.5 font-bold text-xs"
          >
            {checkedDeviceIds.size === filteredDevices.length ? 'Desmarcar' : 'Seleccionar Todos'}
          </button>
          <button 
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`py-1.5 font-bold text-xs rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
              isLiveStreaming 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-zinc-800 border-zinc-700 text-zinc-400'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${isLiveStreaming ? 'animate-pulse text-emerald-400' : ''}`} />
            <span>{isLiveStreaming} {isLiveStreaming ? 'Live Stream' : 'Pausado'}</span>
          </button>
        </div>

      </div>

      {/* Right Map Canvas Panel (Real MapLibre GL Vector Map) */}
      <div className="flex-1 h-full rounded-xl border border-zinc-850 relative bg-zinc-950 flex flex-col justify-between overflow-hidden shadow-2xl">
        
        {/* Toggle sidebar button inside map panel */}
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute top-3.5 left-3.5 z-20 btn-secondary p-1.8 bg-zinc-950/80 backdrop-blur border-zinc-800 shadow-md"
          title={sidebarCollapsed ? 'Mostrar lista de dispositivos' : 'Ocultar lista de dispositivos'}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
        </button>

        {/* Map Header sub-toolbar overlay */}
        <div className="absolute top-3.5 left-16 z-20 flex items-center gap-2 select-none">
          <div className="flex items-center gap-2 bg-zinc-950/80 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded-lg text-xs">
            <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span className="font-bold text-white">Monitoreo WebGL MapLibre</span>
            <span className="text-[9px] text-emerald-400 font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.5 rounded">
              {devices.filter(d => checkedDeviceIds.has(d.id)).length} Activos
            </span>
          </div>
        </div>

        {/* Map Style Selector Overlay (Top Right) */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-zinc-950/80 backdrop-blur border border-zinc-800 rounded-lg p-1 text-xs select-none">
          {(Object.keys(MAP_STYLES) as MapStyleKey[]).map(styleKey => (
            <button
              key={styleKey}
              onClick={() => setMapStyleKey(styleKey)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                mapStyleKey === styleKey 
                  ? 'bg-orange-600 text-white shadow-md' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {MAP_STYLES[styleKey].name}
            </button>
          ))}
        </div>

        {/* REAL MAPLIBRE GL JS MAP ENGINE CANVAS */}
        <div className="w-full h-full relative z-0">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle={MAP_STYLES[mapStyleKey].url}
          >
            <NavigationControl position="bottom-right" />

            {/* Plot Active Checked GPS Markers on MapLibre GL */}
            {devices.filter(d => checkedDeviceIds.has(d.id)).map(dev => {
              const isSelected = selectedDeviceOnMap?.id === dev.id;

              return (
                <Marker
                  key={dev.id}
                  latitude={dev.latitude}
                  longitude={dev.longitude}
                  anchor="center"
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    setSelectedDeviceOnMap(dev);
                  }}
                >
                  <div className="relative group cursor-pointer">
                    
                    {/* Animated Pulsing Ring for moving vehicles */}
                    {dev.velocidad > 0 && (
                      <span className="absolute -inset-2 rounded-full bg-orange-500/30 animate-ping" />
                    )}

                    {/* Vehicle Marker Pin */}
                    <div 
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shadow-xl backdrop-blur-md ${
                        isSelected 
                          ? 'bg-orange-500 border-white text-white scale-125 z-30 shadow-orange-500/50 ring-2 ring-orange-400' 
                          : dev.status === 'alarma'
                            ? 'bg-red-600 border-white text-white animate-bounce shadow-red-600/50'
                            : dev.status === 'movimiento'
                              ? 'bg-emerald-600/90 border-emerald-400 text-white shadow-emerald-500/30'
                              : 'bg-zinc-900/90 border-zinc-700 text-zinc-300 hover:border-orange-500'
                      }`}
                    >
                      <Navigation 
                        className="w-5 h-5 drop-shadow-md" 
                        style={{ 
                          transform: `rotate(${dev.status === 'movimiento' ? 45 : 0}deg)` 
                        }} 
                      />
                    </div>

                    {/* Matrícula Tag Label below pin */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-zinc-950/90 border border-zinc-800 text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap z-20">
                      {dev.matricula} ({dev.velocidad} km/h)
                    </div>
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>

        {/* Selected Device Telemetry Overlay Modal */}
        <AnimatePresence>
          {selectedDeviceOnMap && checkedDeviceIds.has(selectedDeviceOnMap.id) && (
            <motion.div
              initial={{ opacity: 0, y: -60, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -60, x: '-50%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-16 left-1/2 z-30 w-[92%] sm:w-[480px] glass-panel border-zinc-800 p-4 rounded-xl shadow-2xl flex flex-col gap-3 text-xs select-none backdrop-blur-xl"
            >
              <div className="flex justify-between items-start border-b border-zinc-850 pb-2">
                <div>
                  <span className="text-[9px] text-orange-400 font-mono font-bold block uppercase tracking-wider">{selectedDeviceOnMap.cuenta}</span>
                  <h4 className="font-extrabold text-white text-sm md:text-base uppercase tracking-wide">
                    {selectedDeviceOnMap.matricula} - {selectedDeviceOnMap.nombreCuenta}
                  </h4>
                </div>
                
                <button 
                  onClick={() => setSelectedDeviceOnMap(null)}
                  className="p-1 hover:bg-zinc-900/60 hover:text-red-400 rounded transition-colors text-zinc-500 active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Address row */}
              {selectedDeviceOnMap.direccion && (
                <div className="bg-zinc-950/60 border border-zinc-850 p-2 rounded-lg flex items-start gap-2 text-[10px] text-zinc-300">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed select-text">{selectedDeviceOnMap.direccion}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-medium text-zinc-400 pt-1">
                <div className="space-y-1.5">
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[9px] block">Velocidad Actual</span>
                    <span className="text-emerald-400 font-extrabold text-sm">{selectedDeviceOnMap.velocidad} km/h</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[9px] block">Coordenadas</span>
                    <span className="text-white font-mono text-[10px]">
                      {selectedDeviceOnMap.latitude.toFixed(4)}, {selectedDeviceOnMap.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1.5 border-l border-zinc-850 pl-4">
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[9px] block">Fecha posición</span>
                    <span className="text-white font-mono">{selectedDeviceOnMap.fechaPosicion}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[9px] block">Tipo Dispositivo</span>
                    <span className="text-white font-semibold">{selectedDeviceOnMap.deviceType}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-850 pt-2 flex items-center justify-between text-[10px] font-bold uppercase">
                <span className="text-zinc-500">IMEI: {selectedDeviceOnMap.imei}</span>
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-extrabold tracking-wider ${
                  selectedDeviceOnMap.status === 'movimiento' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : selectedDeviceOnMap.status === 'alarma'
                      ? 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                }`}>
                  {selectedDeviceOnMap.status}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
