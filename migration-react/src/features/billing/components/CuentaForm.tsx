import React, { useState, useEffect } from 'react';
import { Account } from '../../../mocks/accounts';
import { Save, Camera, Map, FileSpreadsheet, ChevronDown, ChevronUp, Lock, Unlock, ShieldAlert } from 'lucide-react';

interface CuentaFormProps {
  account: Account;
  onSaveAccount: (updated: Account) => void;
}

export const CuentaForm: React.FC<CuentaFormProps> = ({ account, onSaveAccount }) => {
  const [activeSubTab, setActiveSubTab] = useState<'datos' | 'resolucion'>('datos');
  const [isDeliveryCollapsed, setIsDeliveryCollapsed] = useState(true);
  
  // Form states
  const [formData, setFormData] = useState<Account>({ ...account });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({ ...account });
  }, [account]);

  const handleChange = (field: keyof Account, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAccount(formData);
    alert('Ficha de cuenta guardada con éxito (Simulado).');
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl flex flex-col h-[calc(100vh-170px)] select-none overflow-hidden">
      
      {/* Sub Tab Header */}
      <div className="flex border-b border-zinc-850 bg-zinc-950/40 p-1 shrink-0">
        <button
          onClick={() => setActiveSubTab('datos')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
            activeSubTab === 'datos'
              ? 'btn-secondary-active'
              : 'btn-secondary border-transparent bg-transparent hover:bg-zinc-800/40'
          }`}
        >
          Datos
        </button>
        <button
          onClick={() => setActiveSubTab('resolucion')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
            activeSubTab === 'resolucion'
              ? 'btn-secondary-active'
              : 'btn-secondary border-transparent bg-transparent hover:bg-zinc-800/40'
          }`}
        >
          Resolución extendida
        </button>
      </div>

      {activeSubTab === 'resolucion' ? (
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-zinc-500 text-xs bg-zinc-900/10">
          <ShieldAlert className="w-12 h-12 text-zinc-600 mb-2 animate-pulse" />
          <h4 className="font-bold text-zinc-400 uppercase tracking-wider">Resolución Extendida</h4>
          <p className="text-[10px] text-zinc-500 mt-1">Esta solapa está lista para migración avanzada.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden text-xs">
          
          {/* Sub Toolbar */}
          <div className="flex items-center gap-1.5 p-3 border-b border-zinc-850 bg-zinc-900/30 shrink-0">
            <button
              type="submit"
              className="btn-primary px-3.5 py-2 text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Abrir ventana de carga de foto...')}
              className="btn-secondary px-3.5 py-2 text-xs"
            >
              <Camera className="w-3.5 h-3.5 text-zinc-400" />
              <span>Foto</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Abrir coordenadas en mapa...')}
              className="btn-secondary px-3.5 py-2 text-xs"
            >
              <Map className="w-3.5 h-3.5 text-zinc-400" />
              <span>Mapa</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Exportar ficha de cuenta a Excel...')}
              className="btn-secondary px-3.5 py-2 text-xs ml-auto"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>Exportar datos de la cuenta</span>
            </button>
          </div>

          {/* Form Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            
            {/* Top row (Dealer, Cuenta, Nombre) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-zinc-950/20 p-3 rounded-lg border border-zinc-850/60">
              <div className="md:col-span-4 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Dealer</label>
                <select
                  value={formData.dealerId}
                  onChange={(e) => {
                    const id = e.target.value;
                    handleChange('dealerId', id);
                    handleChange('dealerName', id === 'BOS' ? 'BOS - BOSCH' : 'Dealer Buenos Aires Centro');
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 transition-colors font-medium"
                >
                  <option value="BOS">BOS - BOSCH</option>
                  <option value="DL-01">Dealer Buenos Aires Centro</option>
                  <option value="DL-02">Dealer Santa Fe Oeste</option>
                </select>
              </div>

              <div className="md:col-span-3 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Cuenta</label>
                <input
                  type="text"
                  value={formData.accountNumber.split('-')[1] || '0000'}
                  onChange={(e) => {
                    const line = formData.accountNumber.split('-')[0] || 'SG';
                    handleChange('accountNumber', `${line}-${e.target.value}`);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="md:col-span-5 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Nombre</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-bold focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            {/* Section: Dirección */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest pb-1 border-b border-zinc-850">
                Dirección
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Calle</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Localidad</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Provincia - Estado</label>
                  <select
                    defaultValue="provincia"
                    className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                  >
                    <option value="provincia">Buenos Aires</option>
                    <option value="santafe">Santa Fe</option>
                    <option value="cordoba">Córdoba</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Código postal / Zip</label>
                  <input
                    type="text"
                    defaultValue="1425"
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section: Dirección de entrega (Collapsible) */}
            <div className="border border-zinc-850 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setIsDeliveryCollapsed(!isDeliveryCollapsed)}
                className="w-full flex items-center justify-between px-3 py-2 bg-zinc-950/40 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                <span>Dirección de entrega</span>
                {isDeliveryCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
              {!isDeliveryCollapsed && (
                <div className="p-3 bg-zinc-900/10 border-t border-zinc-850 space-y-2 text-xs text-zinc-500">
                  <p>Mismos datos que dirección central. No se requiere envío alternativo.</p>
                </div>
              )}
            </div>

            {/* Section: Datos (split columns) */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest pb-1 border-b border-zinc-850">
                Datos
              </h5>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-3.5">
                  {/* Teléfono with red background label */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 px-2 py-1 bg-red-600 text-white font-bold rounded text-[9px] uppercase tracking-wider text-center shrink-0">
                      Teléfono:
                    </span>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none font-semibold"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Email:
                    </span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none"
                    />
                  </div>

                  {/* Clave with red background label and Cambiar button */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 px-2 py-1 bg-red-600 text-white font-bold rounded text-[9px] uppercase tracking-wider text-center shrink-0">
                      Clave:
                    </span>
                    <div className="flex-1 flex gap-1.5">
                      <div className="relative flex-1">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          defaultValue="softguard123"
                          className="w-full bg-zinc-900 border border-zinc-850 pl-2.5 pr-8 py-1.5 rounded text-white font-mono focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none focus-visible:text-orange-500"
                        >
                          {showPassword ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Generar clave aleatoria...')}
                        className="btn-secondary px-2.5 py-1 text-[10px]"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>

                  {/* Permisos with red background label */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 px-2 py-1 bg-red-600 text-white font-bold rounded text-[9px] uppercase tracking-wider text-center shrink-0">
                      Permisos:
                    </span>
                    <select
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                    >
                      <option value="normal">Normal</option>
                      <option value="admin">Administración Total</option>
                      <option value="lectura">Solo Lectura</option>
                    </select>
                  </div>

                  {/* Tipo selection */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Tipo:
                    </span>
                    <div className="flex-1 flex gap-1.5">
                      <select
                        className="flex-1 bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                      >
                        <option value="clients">clients</option>
                        <option value="dealers">dealers</option>
                      </select>
                      <button
                        type="button"
                        className="btn-secondary px-2.5 py-1 text-[10px]"
                      >
                        Seleccione
                      </button>
                    </div>
                  </div>

                  {/* Instaladores selection */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Instaladores:
                    </span>
                    <div className="flex-1 flex gap-1.5">
                      <input
                        type="text"
                        placeholder="Sin instaladores asignados"
                        disabled
                        className="flex-1 bg-zinc-950/40 border border-zinc-900 px-2.5 py-1.5 rounded text-zinc-500 cursor-not-allowed"
                      />
                      <button
                        type="button"
                        className="btn-secondary px-2.5 py-1 text-[10px]"
                      >
                        Seleccione
                      </button>
                    </div>
                  </div>

                  {/* Fecha de alta */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Fecha alta:
                    </span>
                    <span className="flex-1 bg-zinc-950/60 border border-zinc-900 px-2.5 py-1.5 rounded text-zinc-400 font-mono text-[9px] select-text">
                      Mon Jan 22 2018 13:02:22 GMT-0300 (hora estándar de Argentina)
                    </span>
                  </div>

                  {/* Servicio */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Servicio:
                    </span>
                    <input
                      type="date"
                      value={formData.serviceDate}
                      onChange={(e) => handleChange('serviceDate', e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none"
                    />
                  </div>

                  {/* Efectiva */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Efectiva:
                    </span>
                    <select
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                    >
                      <option value="seleccione">Seleccione</option>
                      <option value="si">Si</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3.5">
                  {/* Observación textarea */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Observación:</label>
                    <textarea
                      placeholder="Sin observaciones registradas..."
                      className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none h-[75px] resize-none"
                    />
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Ubicación:
                    </span>
                    <div className="flex-1 flex gap-1.5">
                      <input
                        type="text"
                        defaultValue="test fede"
                        className="flex-1 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        className="btn-secondary px-2.5 py-1 text-[10px]"
                      >
                        Más información
                      </button>
                    </div>
                  </div>

                  {/* Latitud */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Latitud:
                    </span>
                    <input
                      type="number"
                      step="0.000000000001"
                      value={formData.latitude}
                      onChange={(e) => handleChange('latitude', parseFloat(e.target.value) || 0)}
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none"
                    />
                  </div>

                  {/* Longitud */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Longitud:
                    </span>
                    <input
                      type="number"
                      step="0.000000000001"
                      value={formData.longitude}
                      onChange={(e) => handleChange('longitude', parseFloat(e.target.value) || 0)}
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none"
                    />
                  </div>

                  {/* Zona Horaria */}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0">
                      Zona horaria:
                    </span>
                    <select
                      className="flex-1 bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none font-mono text-[10px]"
                    >
                      <option value="pacific">San Francisco (Horario de verano del Pacífico, GMT-07:00)</option>
                      <option value="argentina">Argentina Standard Time (GMT-03:00)</option>
                      <option value="utc">Coordinated Universal Time (GMT+00:00)</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Section: Datos Extra */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest pb-1 border-b border-zinc-850">
                Datos Extra
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-900/10 p-3 rounded-lg border border-zinc-850/60">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Acceso Web</label>
                  <select
                    className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="si">Si</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Relevancia</label>
                  <select
                    className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                  >
                    <option value="no_controla">No controla prioridad</option>
                    <option value="alta">Alta prioridad</option>
                    <option value="media">Media prioridad</option>
                    <option value="baja">Baja prioridad</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Mostrar foto principal</label>
                  <select
                    className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                  >
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </form>
      )}

    </div>
  );
};
