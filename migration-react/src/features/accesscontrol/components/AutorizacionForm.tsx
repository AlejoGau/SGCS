import React, { useState, useEffect } from 'react';
import { Save, X, CalendarClock, AlertTriangle } from 'lucide-react';
import { Autorizacion, DiaSemana, DIAS_SEMANA, todayIso } from '../../../mocks/accesscontrol';

interface AutorizacionFormProps {
  autorizacion: Autorizacion | null;
  tipo: 'persona' | 'proveedor' | 'delivery';
  sujetoId?: string;
  sujetoNombre: string;
  unidadFuncionalId?: string;
  unidadFuncionalNombre?: string;
  onSave: (autorizacion: Autorizacion) => void;
  onCancel: () => void;
}

const emptyAutorizacion = (
  tipo: 'persona' | 'proveedor' | 'delivery',
  sujetoId: string | undefined,
  sujetoNombre: string,
  unidadFuncionalId: string | undefined,
  unidadFuncionalNombre: string | undefined
): Autorizacion => ({
  id: `aut-${Date.now()}`,
  tipo,
  sujetoId,
  sujetoNombre: tipo === 'delivery' ? '' : sujetoNombre,
  unidadFuncionalId,
  unidadFuncionalNombre,
  fechaDesde: todayIso(),
  fechaHasta: todayIso(),
  diasSemana: [],
  todoElDia: true,
  horaDesde: '00:00',
  horaHasta: '23:59',
  estado: 'activa',
});

export const AutorizacionForm: React.FC<AutorizacionFormProps> = ({
  autorizacion,
  tipo,
  sujetoId,
  sujetoNombre,
  unidadFuncionalId,
  unidadFuncionalNombre,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Autorizacion>(
    autorizacion ?? emptyAutorizacion(tipo, sujetoId, sujetoNombre, unidadFuncionalId, unidadFuncionalNombre)
  );
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    setFormData(autorizacion ?? emptyAutorizacion(tipo, sujetoId, sujetoNombre, unidadFuncionalId, unidadFuncionalNombre));
  }, [autorizacion, tipo, sujetoId, sujetoNombre, unidadFuncionalId, unidadFuncionalNombre]);

  const handleChange = (field: keyof Autorizacion, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDia = (dia: DiaSemana) => {
    setFormData((prev) => ({
      ...prev,
      diasSemana: prev.diasSemana.includes(dia)
        ? prev.diasSemana.filter((d) => d !== dia)
        : [...prev.diasSemana, dia],
    }));
  };

  const toggleTodoElDia = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      todoElDia: checked,
      horaDesde: checked ? '00:00' : prev.horaDesde === '00:00' ? '08:00' : prev.horaDesde,
      horaHasta: checked ? '23:59' : prev.horaHasta === '23:59' ? '18:00' : prev.horaHasta,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fechaDesde < todayIso() && !autorizacion) {
      setDateError('La fecha desde no puede ser anterior a hoy.');
      return;
    }
    if (formData.fechaHasta < formData.fechaDesde) {
      setDateError('La fecha hasta no puede ser anterior a la fecha desde.');
      return;
    }
    if (tipo === 'delivery' && !formData.sujetoNombre.trim()) {
      setDateError('Ingresá el nombre del delivery/repartidor.');
      return;
    }
    setDateError('');
    onSave(formData);
  };

  // Igual que en el legacy: los checkboxes se muestran en 2 columnas (Lunes-Jueves | Viernes-Domingo).
  const diasColumnaIzquierda = DIAS_SEMANA.slice(0, 4);
  const diasColumnaDerecha = DIAS_SEMANA.slice(4);

  return (
    <form onSubmit={handleSubmit} className="p-3.5 bg-zinc-950/40 border-b border-zinc-850 space-y-3 text-xs">
      <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-wider text-[11px]">
        <CalendarClock className="w-3.5 h-3.5" />
        <span>{autorizacion ? 'Editar autorización' : 'Nueva autorización'}</span>
      </div>

      {tipo === 'delivery' ? (
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Delivery / Repartidor</label>
          <input
            required
            value={formData.sujetoNombre}
            onChange={(e) => handleChange('sujetoNombre', e.target.value)}
            placeholder="Ej: Rappi - Nombre del repartidor"
            className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500"
          />
        </div>
      ) : (
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Usuario</label>
          <div className="w-full bg-zinc-950/60 border border-zinc-900 px-2.5 py-1.5 rounded text-zinc-300 font-semibold">
            {formData.sujetoNombre || sujetoNombre}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Fecha desde</label>
          <input type="date" required min={todayIso()} value={formData.fechaDesde}
            onChange={(e) => handleChange('fechaDesde', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Fecha hasta</label>
          <input type="date" required min={formData.fechaDesde} value={formData.fechaHasta}
            onChange={(e) => handleChange('fechaHasta', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Día de la semana (vacío = todos los días)</label>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 w-fit">
          {diasColumnaIzquierda.map((d, i) => (
            <React.Fragment key={d.value}>
              <label className="flex items-center gap-1.5 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.diasSemana.includes(d.value)}
                  onChange={() => toggleDia(d.value)}
                  className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-950 accent-orange-500 cursor-pointer"
                />
                <span className="text-[11px]">{d.label}</span>
              </label>
              {diasColumnaDerecha[i] && (
                <label className="flex items-center gap-1.5 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.diasSemana.includes(diasColumnaDerecha[i].value)}
                    onChange={() => toggleDia(diasColumnaDerecha[i].value)}
                    className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-950 accent-orange-500 cursor-pointer"
                  />
                  <span className="text-[11px]">{diasColumnaDerecha[i].label}</span>
                </label>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-zinc-300 cursor-pointer w-fit">
        <input
          type="checkbox"
          checked={formData.todoElDia}
          onChange={(e) => toggleTodoElDia(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-950 accent-orange-500 cursor-pointer"
        />
        <span className="font-semibold text-[11px]">Todo el día</span>
      </label>

      {!formData.todoElDia && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Hora desde</label>
            <input type="time" required value={formData.horaDesde}
              onChange={(e) => handleChange('horaDesde', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Hora hasta</label>
            <input type="time" required value={formData.horaHasta}
              onChange={(e) => handleChange('horaHasta', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
          </div>
        </div>
      )}

      <div className="space-y-1 w-40">
        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Estado</label>
        <select value={formData.estado} onChange={(e) => handleChange('estado', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500">
          <option value="activa">Activo</option>
          <option value="inactiva">Inactivo</option>
        </select>
      </div>

      {dateError && (
        <p className="text-red-400 text-[10px] font-semibold flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {dateError}
        </p>
      )}

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
