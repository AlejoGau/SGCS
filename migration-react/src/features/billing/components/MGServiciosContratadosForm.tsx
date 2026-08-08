import React, { useState, useEffect } from 'react';
import { Account, ContractedService, PRODUCT_CATALOG } from '../../../mocks/accounts';
import { ShieldCheck, Plus, Trash2, Edit3, Save, ShoppingBag } from 'lucide-react';

interface MGServiciosContratadosFormProps {
  account: Account;
  onServicesUpdated: (services: ContractedService[]) => void;
}

export const MGServiciosContratadosForm: React.FC<MGServiciosContratadosFormProps> = ({ 
  account, 
  onServicesUpdated 
}) => {
  const [selectedService, setSelectedService] = useState<ContractedService | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form fields
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [status, setStatus] = useState<0 | 1 | 2 | 3>(1);
  const [productCode, setProductCode] = useState(PRODUCT_CATALOG[0].code);
  const [quantity, setQuantity] = useState(1);

  // Load selected service into form
  useEffect(() => {
    if (selectedService) {
      setStartDate(selectedService.startDate);
      setExpiryDate(selectedService.expiryDate);
      setStatus(selectedService.status);
      setProductCode(selectedService.code);
      setQuantity(selectedService.quantity);
      setIsAdding(false);
    } else {
      clearForm();
    }
  }, [selectedService]);

  const clearForm = () => {
    setStartDate(new Date().toISOString().split('T')[0]);
    setExpiryDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setStatus(1);
    setProductCode(PRODUCT_CATALOG[0].code);
    setQuantity(1);
  };

  const handleStartAdd = () => {
    setSelectedService(null);
    clearForm();
    setIsAdding(true);
  };

  const selectedProduct = PRODUCT_CATALOG.find(p => p.code === productCode) || PRODUCT_CATALOG[0];

  // Calculated fields
  const subTotal = selectedProduct.price * quantity;
  const vatAmount = subTotal * selectedProduct.vatRate;
  const totalAmount = subTotal + vatAmount;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAdding) {
      // Add new service
      const newService: ContractedService = {
        id: 's_new_' + Math.random().toString(36).substr(2, 9),
        name: selectedProduct.name,
        code: selectedProduct.code,
        price: selectedProduct.price,
        quantity: quantity,
        vatRate: selectedProduct.vatRate,
        startDate: startDate,
        expiryDate: expiryDate,
        status: status
      };
      
      onServicesUpdated([...account.services, newService]);
      setIsAdding(false);
      alert('Abono agregado correctamente.');
    } else if (selectedService) {
      // Edit existing
      const updated = account.services.map(s => {
        if (s.id === selectedService.id) {
          return {
            ...s,
            name: selectedProduct.name,
            code: selectedProduct.code,
            price: selectedProduct.price,
            quantity: quantity,
            vatRate: selectedProduct.vatRate,
            startDate: startDate,
            expiryDate: expiryDate,
            status: status
          };
        }
        return s;
      });
      onServicesUpdated(updated);
      setSelectedService(null);
      alert('Abono actualizado correctamente.');
    }
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('¿Está seguro de eliminar este abono de la cuenta?')) {
      const updated = account.services.filter(s => s.id !== serviceId);
      onServicesUpdated(updated);
      if (selectedService?.id === serviceId) {
        setSelectedService(null);
      }
    }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1: return { text: 'Activo', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      case 2: return { text: 'Cancelado', color: 'text-zinc-450 bg-zinc-800/40 border-zinc-700/60' };
      case 3: return { text: 'Vencido', color: 'text-red-400 bg-red-500/10 border-red-500/20' };
      default: return { text: 'Pendiente', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 h-full items-start">
      
      {/* List of active contracted services */}
      <div className="glass-panel border-zinc-800 rounded-xl p-5 flex flex-col h-full">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-850 mb-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Abonos Contratados</h4>
            <p className="text-xs text-zinc-400">Servicios asignados al abonado</p>
          </div>
          <button
            type="button"
            onClick={handleStartAdd}
            className="btn-primary px-3 py-1.5 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Abono</span>
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
          {account.services.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-zinc-500 text-xs gap-1">
              <ShieldCheck className="w-8 h-8 opacity-40 text-zinc-400 mb-1" />
              <span>Sin abonos contratados asignados.</span>
            </div>
          ) : (
            account.services.map((service) => {
              const statusCfg = getStatusLabel(service.status);
              return (
                <div 
                  key={service.id} 
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    selectedService?.id === service.id 
                      ? 'border-orange-500/60 bg-orange-500/5' 
                      : 'border-zinc-850 bg-zinc-900/35 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white leading-tight">{service.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-750 text-zinc-400 font-mono">
                        {service.code}
                      </span>
                      <span className={`text-[8px] font-bold px-1.5 rounded uppercase ${statusCfg.color} border`}>
                        {statusCfg.text}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-medium">
                      Precio: <span className="text-zinc-300 font-bold font-mono">${service.price.toFixed(2)}</span>
                      {' '}x{service.quantity} | Alta:{' '}
                      <span className="text-zinc-300 font-mono">
                        {service.startDate.split('-').reverse().join('/')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      title="Editar Abono"
                      className="btn-action-icon"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id)}
                      title="Eliminar Abono"
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

      {/* Editing / Adding Form */}
      {(selectedService || isAdding) ? (
        <form onSubmit={handleSave} className="glass-panel border-zinc-800 rounded-xl p-5 flex flex-col h-full animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-850 mb-4">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {isAdding ? 'Nuevo Abono Contratado' : 'Modificar Abono Contratado'}
              </h4>
              <p className="text-xs text-zinc-400">Edición de detalles del servicio y tarifas</p>
            </div>
            
            <button
              type="submit"
              className="btn-primary px-3.5 py-2 text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Fecha de Inicio</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg text-white focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Vencimiento</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Status & Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(parseInt(e.target.value) as any)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded-lg text-white focus:outline-none"
                >
                  <option value={0}>Pendiente</option>
                  <option value={1}>Activo</option>
                  <option value={2}>Cancelado</option>
                  <option value={3}>Vencido</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Product selection */}
            <div className="space-y-3.5 bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-850/60 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
                  Servicio Seleccionado
                </span>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Elegir Producto</label>
                <select
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs px-2 py-1.5 rounded text-white focus:outline-none"
                >
                  {PRODUCT_CATALOG.map(p => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-zinc-500 text-[10px]">Código:</span>
                  <p className="text-white font-mono font-semibold">{selectedProduct.code}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px]">Valor Base:</span>
                  <p className="text-white font-mono font-semibold">${selectedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Calculations layout (matching the displaying fields in ExtJS) */}
            <div className="border-t border-zinc-850 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span>SubTotal:</span>
                <span className="font-mono font-semibold text-white">${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Impuesto (IVA 21%):</span>
                <span className="font-mono font-semibold text-white">${vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-zinc-850 pt-2 text-zinc-300">
                <span className="font-bold">Total:</span>
                <span className="font-mono font-bold text-orange-500 text-sm">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass-panel border-zinc-850/65 rounded-xl p-5 flex flex-col items-center justify-center text-zinc-500 text-xs h-full min-h-[300px]">
          <ShieldCheck className="w-12 h-12 opacity-25 text-zinc-400 mb-2" />
          <span>Seleccione un abono de la lista para editarlo</span>
          <span>o cree uno nuevo presionando "Agregar Abono"</span>
        </div>
      )}
    </div>
  );
};
