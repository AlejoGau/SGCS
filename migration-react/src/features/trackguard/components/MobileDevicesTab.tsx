import React, { useState } from 'react';
import { 
  MobileDevice, MOCK_TRACKGUARD_DEVICES 
} from '../../../mocks/trackguard';
import { 
  Search, Laptop, RefreshCw, Smartphone, Car, CheckCircle2, AlertCircle
} from 'lucide-react';

export const MobileDevicesTab: React.FC = () => {
  const [devices, setDevices] = useState<MobileDevice[]>(MOCK_TRACKGUARD_DEVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Todos');

  const handleRefresh = () => {
    setDevices(MOCK_TRACKGUARD_DEVICES);
  };

  const filteredDevices = devices.filter(d => {
    const matchesSearch = 
      d.matricula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nombreCuenta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.cuenta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.imei.includes(searchQuery);

    const matchesType = filterType === 'Todos' ? true : d.deviceType === filterType;

    return matchesSearch && matchesType;
  });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Vehicular':
        return <Car className="w-4 h-4 text-orange-500" />;
      case 'Celular (SmartPanics)':
        return <Smartphone className="w-4 h-4 text-indigo-400" />;
      default:
        return <Laptop className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl p-6 space-y-4 h-[calc(100vh-170px)] flex flex-col overflow-hidden">
      
      {/* Tab actions header */}
      <div className="flex justify-between items-center shrink-0 flex-wrap gap-2 pb-1">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Inventario de Dispositivos Móviles</h3>
          <p className="text-[10px] text-zinc-500">Listado general de equipos rastreadores, IMEI asociados y parámetros de comunicación</p>
        </div>
        
        <button 
          onClick={handleRefresh}
          className="btn-secondary px-3 py-1.5 text-xs gap-1.5 hover:text-orange-500 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Grid Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900/30 border border-zinc-850 rounded-xl select-none text-xs shrink-0">
        <div className="flex items-center gap-1.5">
          {['Todos', 'Vehicular', 'Personal', 'Celular (SmartPanics)'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg font-semibold ${
                filterType === t ? 'btn-secondary-active' : 'btn-secondary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            placeholder="Buscar por matrícula, IMEI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-44 md:w-60"
          />
        </div>
      </div>

      {/* Grid List View */}
      <div className="flex-1 overflow-auto border border-zinc-850 rounded-xl bg-zinc-950/20 min-h-0">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] select-none sticky top-0 z-10">
              <th className="p-3 w-10 text-center">Tipo</th>
              <th className="p-3">Matrícula</th>
              <th className="p-3">Cuenta</th>
              <th className="p-3">Nombre Abonado</th>
              <th className="p-3">IMEI</th>
              <th className="p-3">Nro. Teléfono</th>
              <th className="p-3">Tipo de Equipo</th>
              <th className="p-3 text-center">Estado Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60 font-medium text-zinc-300">
            {filteredDevices.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8 text-zinc-500">
                  No se encontraron dispositivos móviles configurados.
                </td>
              </tr>
            ) : (
              filteredDevices.map(d => (
                <tr 
                  key={d.id}
                  className="hover:bg-zinc-900/25 border-b border-zinc-900/60 transition-all group"
                >
                  <td className="p-3 text-center">{getDeviceIcon(d.deviceType)}</td>
                  <td className="p-3 font-bold text-white group-hover:text-orange-400 transition-colors">
                    {d.matricula}
                  </td>
                  <td className="p-3 text-zinc-400">{d.cuenta}</td>
                  <td className="p-3 font-semibold text-white">{d.nombreCuenta}</td>
                  <td className="p-3 font-mono text-[11px] text-zinc-400">{d.imei}</td>
                  <td className="p-3 text-zinc-400">{d.phone}</td>
                  <td className="p-3">{d.deviceType}</td>
                  <td className="p-3 text-center">
                    {d.status === 'no_actual' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 border border-zinc-700 text-zinc-500 uppercase tracking-wide">
                        <AlertCircle className="w-3 h-3 text-zinc-500" />
                        Desconectado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wide">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Reportando
                      </span>
                    )}
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
