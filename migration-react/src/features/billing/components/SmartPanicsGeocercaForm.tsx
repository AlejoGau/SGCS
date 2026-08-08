import React, { useState, useEffect } from 'react';
import { Account, SmartPanicsGeocerca } from '../../../mocks/accounts';
import { Plus, Trash2, Edit3, Save, MapPin, Map, ShieldAlert } from 'lucide-react';

interface SmartPanicsGeocercaFormProps {
  account: Account;
  onGeocercasUpdated: (geocercas: SmartPanicsGeocerca[]) => void;
}

export const SmartPanicsGeocercaForm: React.FC<SmartPanicsGeocercaFormProps> = ({
  account,
  onGeocercasUpdated
}) => {
  const [selectedGeo, setSelectedGeo] = useState<SmartPanicsGeocerca | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [geoType, setGeoType] = useState<'I' | 'E' | 'X'>('X');
  const [status, setStatus] = useState<'0' | '1'>('1');
  const [address, setAddress] = useState('');
  const [radius, setRadius] = useState(250);

  // Load geocerca into form
  useEffect(() => {
    if (selectedGeo) {
      setName(selectedGeo.Name);
      setGeoType(selectedGeo.GeoType);
      setStatus(selectedGeo.Status);
      setAddress(selectedGeo.Address);
      setRadius(selectedGeo.radius);
      setIsAdding(false);
    } else {
      clearForm();
    }
  }, [selectedGeo]);

  const clearForm = () => {
    setName('');
    setGeoType('X');
    setStatus('1');
    setAddress('');
    setRadius(250);
  };

  const handleStartAdd = () => {
    setSelectedGeo(null);
    clearForm();
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor complete el nombre de la geocerca.');
      return;
    }

    if (isAdding) {
      const newGeo: SmartPanicsGeocerca = {
        id: 'g_new_' + Math.random().toString(36).substr(2, 9),
        Name: name,
        GeoType: geoType,
        Status: status,
        Address: address || 'Dirección de abonado default',
        latitude: account.latitude + (Math.random() - 0.5) * 0.05,
        longitude: account.longitude + (Math.random() - 0.5) * 0.05,
        radius: radius
      };

      onGeocercasUpdated([...account.geocercas, newGeo]);
      setIsAdding(false);
      alert('Geo-cerca creada correctamente.');
    } else if (selectedGeo) {
      const updated = account.geocercas.map(g => {
        if (g.id === selectedGeo.id) {
          return {
            ...g,
            Name: name,
            GeoType: geoType,
            Status: status,
            Address: address,
            radius: radius
          };
        }
        return g;
      });
      onGeocercasUpdated(updated);
      setSelectedGeo(null);
      alert('Geo-cerca actualizada correctamente.');
    }
  };

  const handleDelete = (geoId: string) => {
    if (confirm('¿Está seguro de eliminar esta geo-cerca?')) {
      const updated = account.geocercas.filter(g => g.id !== geoId);
      onGeocercasUpdated(updated);
      if (selectedGeo?.id === geoId) {
        setSelectedGeo(null);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 h-full items-start select-none">
      
      {/* Geocercas List */}
      <div className="glass-panel border-zinc-800 rounded-xl p-5 flex flex-col h-full">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-850 mb-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Geo-cercas SmartPanics</h4>
            <p className="text-xs text-zinc-400">Límites territoriales de alarma asignados</p>
          </div>
          <button
            type="button"
            onClick={handleStartAdd}
            className="btn-primary px-3 py-1.5 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nueva Geo-cerca</span>
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
          {account.geocercas.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-zinc-500 text-xs gap-1">
              <ShieldAlert className="w-8 h-8 opacity-40 text-zinc-400 mb-1 animate-pulse" />
              <span>Sin geo-cercas configuradas.</span>
            </div>
          ) : (
            account.geocercas.map((geo) => {
              const isActive = geo.Status === '1';
              return (
                <div 
                  key={geo.id} 
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    selectedGeo?.id === geo.id 
                      ? 'border-orange-500/60 bg-orange-500/5' 
                      : 'border-zinc-850 bg-zinc-900/35 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white leading-tight">{geo.Name}</span>
                      <span className={`text-[8px] font-bold px-1.5 rounded uppercase border ${
                        isActive 
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                          : 'text-zinc-500 bg-zinc-900 border-zinc-800'
                      }`}>
                        {isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-medium space-x-2">
                      <span>Radio: <strong className="text-zinc-300 font-mono">{geo.radius}m</strong></span>
                      <span>| Tipo: <strong className="text-orange-500 font-semibold">{
                        geo.GeoType === 'I' ? 'Inclusión' : geo.GeoType === 'E' ? 'Exclusión' : 'Ambas'
                      }</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedGeo(geo)}
                      className="btn-action-icon"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(geo.id)}
                      className="btn-action-icon text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Map or Editor Form */}
      {(selectedGeo || isAdding) ? (
        <form onSubmit={handleSave} className="glass-panel border-zinc-800 rounded-xl p-5 flex flex-col h-full animate-fade-in space-y-3.5">
          
          {/* Form Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {isAdding ? 'Crear Geo-cerca' : 'Modificar Geo-cerca'}
              </h4>
              <p className="text-xs text-zinc-400">Parámetros geográficos y tipo de alertas</p>
            </div>
            
            <button
              type="submit"
              className="btn-primary px-3.5 py-2 text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Nombre de Cerca</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.8 rounded-lg text-white focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Tipo de Zona</label>
                <select
                  value={geoType}
                  onChange={(e) => setGeoType(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.8 rounded-lg text-white focus:outline-none"
                >
                  <option value="I">Inclusión</option>
                  <option value="E">Exclusión</option>
                  <option value="X">Inclusión o Exclusión (Ambas)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.8 rounded-lg text-white focus:outline-none"
                >
                  <option value="1">Activa</option>
                  <option value="0">Inactiva</option>
                </select>
              </div>
            </div>

            {/* Address query */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Ubicación / Dirección</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, Número, Ciudad..."
                  className="w-full bg-zinc-900 border border-zinc-850 pl-8 pr-3 py-1.8 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Radius input slider */}
            <div className="space-y-1 bg-zinc-950/40 p-3 rounded-lg border border-zinc-900">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-zinc-400">
                <span>Radio del Límite</span>
                <span className="font-mono text-orange-500">{radius} metros</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value) || 250)}
                className="w-full accent-orange-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Small interactive map view Mock */}
            <div className="h-28 bg-zinc-900 border border-zinc-850 rounded-lg overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-radial-at-c from-zinc-850 to-zinc-950 grid-bg opacity-40"></div>
              
              {/* Radius circle overlays */}
              <div className="relative flex items-center justify-center">
                <div className="absolute rounded-full border border-orange-500/35 bg-orange-500/5 animate-pulse-ring" style={{ width: `${60 + (radius / 2000) * 80}px`, height: `${60 + (radius / 2000) * 80}px` }}></div>
                <div className="w-3 h-3 bg-orange-600 rounded-full border border-zinc-900 z-10"></div>
              </div>
              
              <div className="absolute bottom-2 left-2 text-[9px] text-zinc-500 flex items-center gap-1 select-none font-bold uppercase">
                <Map className="w-3 h-3 text-orange-500" />
                <span>Geocerca Activa</span>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass-panel border-zinc-850/65 rounded-xl p-5 flex flex-col items-center justify-center text-zinc-500 text-xs h-full min-h-[300px]">
          <Map className="w-12 h-12 opacity-25 text-zinc-400 mb-2" />
          <span>Seleccione una geo-cerca para editarla</span>
          <span>o cree una nueva presionando "Nueva Geo-cerca"</span>
        </div>
      )}
    </div>
  );
};
