import React, { useState, useEffect } from 'react';
import { Save, X, Car } from 'lucide-react';
import { Vehiculo } from '../../../mocks/accesscontrol';

interface VehiculoFormProps {
  vehiculo: Vehiculo | null;
  ownerType: 'persona' | 'proveedor';
  ownerId: string;
  onSave: (vehiculo: Vehiculo) => void;
  onCancel: () => void;
}

const emptyVehiculo = (ownerType: 'persona' | 'proveedor', ownerId: string): Vehiculo => ({
  id: `veh-${Date.now()}`,
  marca: '',
  modelo: '',
  matricula: '',
  anio: new Date().getFullYear(),
  color: '',
  tipo: 'Automóvil',
  companiaSeguro: '',
  vencimientoSeguro: '',
  vencimientoVTV: '',
  identificacion: '',
  vencimientoIdentificacion: '',
  observaciones: '',
  ownerType,
  ownerId,
});

export const VehiculoForm: React.FC<VehiculoFormProps> = ({ vehiculo, ownerType, ownerId, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Vehiculo>(vehiculo ?? emptyVehiculo(ownerType, ownerId));

  useEffect(() => {
    setFormData(vehiculo ?? emptyVehiculo(ownerType, ownerId));
  }, [vehiculo, ownerType, ownerId]);

  const handleChange = (field: keyof Vehiculo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3.5 bg-zinc-950/40 border-b border-zinc-850 space-y-3 text-xs">
      <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-wider text-[11px]">
        <Car className="w-3.5 h-3.5" />
        <span>{vehiculo ? 'Editar vehículo' : 'Nuevo vehículo'}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Marca</label>
          <input required value={formData.marca} onChange={(e) => handleChange('marca', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Modelo</label>
          <input required value={formData.modelo} onChange={(e) => handleChange('modelo', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Matrícula</label>
          <input required value={formData.matricula} onChange={(e) => handleChange('matricula', e.target.value.toUpperCase())}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Año</label>
          <input type="number" value={formData.anio} onChange={(e) => handleChange('anio', parseInt(e.target.value) || 0)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Color</label>
          <input value={formData.color} onChange={(e) => handleChange('color', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Tipo</label>
          <select value={formData.tipo} onChange={(e) => handleChange('tipo', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500">
            <option>Automóvil</option>
            <option>Utilitario</option>
            <option>Motocicleta</option>
            <option>Camión</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Compañía Seguro</label>
          <input value={formData.companiaSeguro} onChange={(e) => handleChange('companiaSeguro', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Vto. Seguro</label>
          <input type="date" value={formData.vencimientoSeguro} onChange={(e) => handleChange('vencimientoSeguro', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Vto. VTV</label>
          <input type="date" value={formData.vencimientoVTV} onChange={(e) => handleChange('vencimientoVTV', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Nro. Identificación vehicular</label>
          <input value={formData.identificacion} onChange={(e) => handleChange('identificacion', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Vto. Identificación</label>
          <input type="date" value={formData.vencimientoIdentificacion} onChange={(e) => handleChange('vencimientoIdentificacion', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Observaciones</label>
        <textarea value={formData.observaciones} onChange={(e) => handleChange('observaciones', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none h-16 resize-none" />
      </div>

      <div className="flex items-center gap-1.5 justify-end pt-1">
        <button type="button" onClick={onCancel} className="btn-secondary px-3.5 py-1.5 text-xs">
          <X className="w-3.5 h-3.5" />
          <span>Cancelar</span>
        </button>
        <button type="submit" className="btn-primary px-3.5 py-1.5 text-xs">
          <Save className="w-3.5 h-3.5" />
          <span>Guardar</span>
        </button>
      </div>
    </form>
  );
};
