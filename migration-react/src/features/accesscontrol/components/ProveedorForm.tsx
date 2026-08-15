import React, { useState, useEffect } from 'react';
import { Save, Building2, Car, FileText, CalendarClock, Plus, Trash2, AlertTriangle } from 'lucide-react';
import {
  Proveedor, Vehiculo, Documento, Autorizacion, CATEGORIAS_PROVEEDOR, TIPOS_DOCUMENTO,
} from '../../../mocks/accesscontrol';
import { VehiculoGrid } from './VehiculoGrid';
import { AutorizacionesGrid } from './AutorizacionesGrid';

interface ProveedorFormProps {
  proveedor: Proveedor;
  proveedores: Proveedor[];
  vehiculos: Vehiculo[];
  documentos: Documento[];
  autorizaciones: Autorizacion[];
  onSaveProveedor: (proveedor: Proveedor) => boolean;
  onAddVehiculo: (v: Vehiculo) => void;
  onUpdateVehiculo: (v: Vehiculo) => void;
  onDeleteVehiculo: (id: string) => void;
  onAddDocumento: (d: Documento) => void;
  onDeleteDocumento: (id: string) => void;
  onAddAutorizacion: (a: Autorizacion) => void;
  onUpdateAutorizacion: (a: Autorizacion) => void;
  onDeleteAutorizacion: (id: string) => void;
  onRegistrarAcceso: (a: Autorizacion, tipoAcceso: 'ingreso' | 'egreso') => void;
}

type SubTab = 'datos' | 'vehiculos' | 'documentos' | 'autorizaciones';

const emptyDocumento = (proveedorId: string): Documento => ({
  id: `doc-${Date.now()}`,
  proveedorId,
  tipoDocumento: TIPOS_DOCUMENTO[0],
  descripcion: '',
  fechaVencimiento: '',
  archivoNombre: '',
});

export const ProveedorForm: React.FC<ProveedorFormProps> = ({
  proveedor, proveedores, vehiculos, documentos, autorizaciones,
  onSaveProveedor, onAddVehiculo, onUpdateVehiculo, onDeleteVehiculo,
  onAddDocumento, onDeleteDocumento, onAddAutorizacion, onUpdateAutorizacion, onDeleteAutorizacion, onRegistrarAcceso,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('datos');
  const [formData, setFormData] = useState<Proveedor>({ ...proveedor });
  const [idError, setIdError] = useState('');
  const [showDocForm, setShowDocForm] = useState(false);
  const [docForm, setDocForm] = useState<Documento>(emptyDocumento(proveedor.id));

  useEffect(() => {
    setFormData({ ...proveedor });
    setDocForm(emptyDocumento(proveedor.id));
  }, [proveedor]);

  const handleChange = (field: keyof Proveedor, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'identificacion') setIdError('');
  };

  const checkIdentificacionUnica = (identificacion: string) => {
    const duplicated = proveedores.some((p) => p.id !== proveedor.id && p.identificacion === identificacion);
    setIdError(duplicated ? 'La identificación del Proveedor ya existe.' : '');
    return !duplicated;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIdentificacionUnica(formData.identificacion)) return;
    const ok = onSaveProveedor(formData);
    if (ok) alert('Ficha de proveedor guardada con éxito (Simulado).');
  };

  const handleAddDocumento = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDocumento(docForm);
    setDocForm(emptyDocumento(proveedor.id));
    setShowDocForm(false);
  };

  const proveedorDocumentos = documentos.filter((d) => d.proveedorId === proveedor.id);

  const tabs: { id: SubTab; label: string; icon: React.ElementType }[] = [
    { id: 'datos', label: 'Datos', icon: Building2 },
    { id: 'vehiculos', label: 'Vehículos', icon: Car },
    { id: 'documentos', label: 'Documentos', icon: FileText },
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
            <div className="space-y-3">
              <h5 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest pb-1 border-b border-zinc-850">Proveedor</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Nombre</label>
                  <input value={formData.nombre} onChange={(e) => handleChange('nombre', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-bold focus:outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Identificación</label>
                  <input
                    value={formData.identificacion}
                    onChange={(e) => handleChange('identificacion', e.target.value)}
                    onBlur={(e) => checkIdentificacionUnica(e.target.value)}
                    className={`w-full bg-zinc-900 border px-2.5 py-1.5 rounded text-white font-mono focus:outline-none ${idError ? 'border-red-500' : 'border-zinc-850 focus:border-orange-500'}`}
                  />
                  {idError && (
                    <p className="text-red-400 text-[10px] font-semibold flex items-center gap-1 pt-0.5">
                      <AlertTriangle className="w-3 h-3" />
                      {idError}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Dirección</label>
                  <input value={formData.direccion} onChange={(e) => handleChange('direccion', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Código Postal</label>
                  <input value={formData.codigoPostal} onChange={(e) => handleChange('codigoPostal', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Localidad</label>
                  <input value={formData.localidad} onChange={(e) => handleChange('localidad', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Provincia</label>
                  <input value={formData.provincia} onChange={(e) => handleChange('provincia', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Teléfono</label>
                  <input value={formData.telefono} onChange={(e) => handleChange('telefono', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Categoría</label>
                  <select value={formData.categoria} onChange={(e) => handleChange('categoria', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500">
                    {CATEGORIAS_PROVEEDOR.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Operativo</label>
                  <select
                    value={formData.operativo ? 'si' : 'no'}
                    onChange={(e) => handleChange('operativo', e.target.value === 'si')}
                    className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Observaciones</label>
              <textarea value={formData.observaciones} onChange={(e) => handleChange('observaciones', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none h-20 resize-none" />
            </div>
          </div>
        </form>
      )}

      {activeSubTab === 'vehiculos' && (
        <VehiculoGrid
          vehiculos={vehiculos}
          scope={{ ownerType: 'proveedor', ownerId: proveedor.id }}
          onAddVehiculo={onAddVehiculo}
          onUpdateVehiculo={onUpdateVehiculo}
          onDeleteVehiculo={onDeleteVehiculo}
          embedded
        />
      )}

      {activeSubTab === 'documentos' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-zinc-850 bg-zinc-900/30 shrink-0">
            <button onClick={() => setShowDocForm(!showDocForm)} className="btn-primary px-3.5 py-2 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Agregar Documento</span>
            </button>
          </div>

          {showDocForm && (
            <form onSubmit={handleAddDocumento} className="p-3.5 bg-zinc-950/40 border-b border-zinc-850 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Documento</label>
                <select value={docForm.tipoDocumento} onChange={(e) => setDocForm((p) => ({ ...p, tipoDocumento: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500">
                  {TIPOS_DOCUMENTO.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Descripción</label>
                <input required value={docForm.descripcion} onChange={(e) => setDocForm((p) => ({ ...p, descripcion: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Fecha de Vencimiento</label>
                <input type="date" value={docForm.fechaVencimiento} onChange={(e) => setDocForm((p) => ({ ...p, fechaVencimiento: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-4 flex justify-end gap-1.5">
                <button type="button" onClick={() => setShowDocForm(false)} className="btn-secondary px-3.5 py-1.5 text-xs">Cancelar</button>
                <button type="submit" className="btn-primary px-3.5 py-1.5 text-xs">
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
              </div>
            </form>
          )}

          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-zinc-800/60 text-[9px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-950/45 sticky top-0 z-10">
                  <th className="py-3 px-4 w-14 text-center">Acciones</th>
                  <th className="py-3 px-3">Documento</th>
                  <th className="py-3 px-3">Descripción</th>
                  <th className="py-3 px-3">Fecha Vto.</th>
                </tr>
              </thead>
              <tbody>
                {proveedorDocumentos.length === 0 ? (
                  <tr><td colSpan={4} className="h-32 text-center text-zinc-500 bg-zinc-950/5">
                    <FileText className="w-8 h-8 opacity-30 text-zinc-400 mx-auto mb-2" />
                    <span>No hay documentos cargados.</span>
                  </td></tr>
                ) : (
                  proveedorDocumentos.map((d) => (
                    <tr key={d.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/25 transition-colors">
                      <td className="py-2.5 px-4 text-center">
                        <button onClick={() => onDeleteDocumento(d.id)} title="Eliminar" className="btn-action-icon hover:text-red-400 hover:bg-red-500/10">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-zinc-200">{d.tipoDocumento}</td>
                      <td className="py-2.5 px-3 text-zinc-400">{d.descripcion}</td>
                      <td className="py-2.5 px-3 font-mono text-zinc-400">{d.fechaVencimiento || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'autorizaciones' && (
        <AutorizacionesGrid
          autorizaciones={autorizaciones}
          scope={{ tipo: 'proveedor', sujetoId: proveedor.id, sujetoNombre: proveedor.nombre }}
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
