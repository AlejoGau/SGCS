import React, { useState, useEffect } from 'react';
import { Save, IdCard, Car, DoorOpen, CalendarClock } from 'lucide-react';
import {
  Persona, Vehiculo, Marcacion, Autorizacion, TIPOS_PERSONA,
} from '../../../mocks/accesscontrol';
import { VehiculoGrid } from './VehiculoGrid';
import { IngresosEgresosGrid } from './IngresosEgresosGrid';
import { AutorizacionesGrid } from './AutorizacionesGrid';

interface PersonaFormProps {
  persona: Persona;
  vehiculos: Vehiculo[];
  marcaciones: Marcacion[];
  autorizaciones: Autorizacion[];
  onSavePersona: (persona: Persona) => void;
  onAddVehiculo: (v: Vehiculo) => void;
  onUpdateVehiculo: (v: Vehiculo) => void;
  onDeleteVehiculo: (id: string) => void;
  onAddAutorizacion: (a: Autorizacion) => void;
  onUpdateAutorizacion: (a: Autorizacion) => void;
  onDeleteAutorizacion: (id: string) => void;
  onRegistrarAcceso: (a: Autorizacion, tipoAcceso: 'ingreso' | 'egreso') => void;
}

type SubTab = 'datos' | 'vehiculos' | 'accesos' | 'autorizaciones';

export const PersonaForm: React.FC<PersonaFormProps> = ({
  persona, vehiculos, marcaciones, autorizaciones,
  onSavePersona, onAddVehiculo, onUpdateVehiculo, onDeleteVehiculo,
  onAddAutorizacion, onUpdateAutorizacion, onDeleteAutorizacion, onRegistrarAcceso,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('datos');
  const [formData, setFormData] = useState<Persona>({ ...persona });

  useEffect(() => {
    setFormData({ ...persona });
  }, [persona]);

  const handleChange = (field: keyof Persona, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePersona(formData);
    alert('Ficha de persona guardada con éxito (Simulado).');
  };

  const tabs: { id: SubTab; label: string; icon: React.ElementType }[] = [
    { id: 'datos', label: 'Datos', icon: IdCard },
    { id: 'vehiculos', label: 'Vehículos', icon: Car },
    { id: 'accesos', label: 'Accesos', icon: DoorOpen },
    { id: 'autorizaciones', label: 'Autorizaciones', icon: CalendarClock },
  ];

  return (
    <div className="glass-panel border-zinc-800 rounded-xl flex flex-col h-[calc(100vh-170px)] select-none overflow-hidden">
      <div className="flex border-b border-zinc-850 bg-zinc-950/40 p-1 shrink-0">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeSubTab === t.id ? 'btn-secondary-active' : 'btn-secondary border-transparent bg-transparent hover:bg-zinc-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {activeSubTab === 'datos' && (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden text-xs">
          <div className="flex items-center gap-1.5 p-3 border-b border-zinc-850 bg-zinc-900/30 shrink-0">
            <button type="submit" className="btn-primary px-3.5 py-2 text-xs">
              <Save className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-zinc-950/20 p-3 rounded-lg border border-zinc-850/60">
              <div className="md:col-span-3 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Tipo</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => handleChange('tipo', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500"
                >
                  {TIPOS_PERSONA.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="md:col-span-5 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-bold focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-4 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Identificación</label>
                <input
                  type="text"
                  value={formData.identificacion}
                  onChange={(e) => handleChange('identificacion', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest pb-1 border-b border-zinc-850">
                Unidad Funcional
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Unidad Funcional</label>
                  <input
                    type="text"
                    disabled
                    value={formData.unidadFuncionalNombre}
                    className="w-full bg-zinc-950/40 border border-zinc-900 px-2.5 py-1.5 rounded text-zinc-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Localidad</label>
                  <input
                    type="text"
                    value={formData.localidad}
                    onChange={(e) => handleChange('localidad', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest pb-1 border-b border-zinc-850">
                Estado y Observaciones
              </h5>
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) => handleChange('activo', e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-950 accent-orange-500 cursor-pointer"
                />
                <span className="font-semibold text-xs">Persona activa / habilitada</span>
              </label>
              <textarea
                value={formData.observaciones}
                onChange={(e) => handleChange('observaciones', e.target.value)}
                placeholder="Sin observaciones registradas..."
                className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none h-20 resize-none"
              />
            </div>
          </div>
        </form>
      )}

      {activeSubTab === 'vehiculos' && (
        <VehiculoGrid
          vehiculos={vehiculos}
          scope={{ ownerType: 'persona', ownerId: persona.id }}
          onAddVehiculo={onAddVehiculo}
          onUpdateVehiculo={onUpdateVehiculo}
          onDeleteVehiculo={onDeleteVehiculo}
          embedded
        />
      )}

      {activeSubTab === 'accesos' && (
        <IngresosEgresosGrid marcaciones={marcaciones} scope={{ sujetoTipo: 'persona', sujetoId: persona.id }} embedded />
      )}

      {activeSubTab === 'autorizaciones' && (
        <AutorizacionesGrid
          autorizaciones={autorizaciones}
          scope={{ tipo: 'persona', sujetoId: persona.id, sujetoNombre: persona.nombre, unidadFuncionalId: persona.unidadFuncionalId, unidadFuncionalNombre: persona.unidadFuncionalNombre }}
          onAdd={onAddAutorizacion}
          onUpdate={onUpdateAutorizacion}
          onDelete={onDeleteAutorizacion}
          onRegistrarAcceso={onRegistrarAcceso}
          embedded
        />
      )}
    </div>
  );
};
