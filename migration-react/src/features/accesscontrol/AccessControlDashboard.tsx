import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ShieldCheck, Home, Users, DoorOpen, CalendarClock, Building2, Car, Package, User,
  AlertOctagon,
} from 'lucide-react';
import {
  Persona, Proveedor, Vehiculo, Documento, Autorizacion, Marcacion, UnidadFuncional,
  MOCK_PERSONAS, MOCK_PROVEEDORES, MOCK_VEHICULOS, MOCK_DOCUMENTOS,
  MOCK_AUTORIZACIONES, MOCK_DELIVERY_AUTORIZACIONES, MOCK_MARCACIONES, MOCK_UNIDADES_FUNCIONALES,
  PUERTAS, todayIso,
} from '../../mocks/accesscontrol';
import { BienvenidoKioskView } from './components/BienvenidoKioskView';
import { UnidadFuncionalGrid } from './components/UnidadFuncionalGrid';
import { UnidadFuncionalTree, UnidadFuncionalNode } from './components/UnidadFuncionalTree';
import { PersonaGrid } from './components/PersonaGrid';
import { PersonaForm } from './components/PersonaForm';
import { IngresosEgresosGrid } from './components/IngresosEgresosGrid';
import { AutorizacionesGrid } from './components/AutorizacionesGrid';
import { ProveedorGrid } from './components/ProveedorGrid';
import { ProveedorForm } from './components/ProveedorForm';
import { VehiculoGrid } from './components/VehiculoGrid';
import { DeliveryGrid } from './components/DeliveryGrid';

type TabType =
  | 'bienvenido' | 'unidades' | 'personas' | 'ingresos' | 'autorizaciones'
  | 'proveedores' | 'vehiculos' | 'delivery' | 'persona_detail' | 'proveedor_detail' | 'unidad_detail';

interface DashboardTab {
  id: string;
  title: string;
  type: TabType;
  entityId?: string;
  activeNode?: UnidadFuncionalNode;
}

const TAB_ICONS: Record<TabType, React.ElementType> = {
  bienvenido: ShieldCheck,
  unidades: Home,
  personas: Users,
  ingresos: DoorOpen,
  autorizaciones: CalendarClock,
  proveedores: Building2,
  vehiculos: Car,
  delivery: Package,
  persona_detail: User,
  proveedor_detail: Building2,
  unidad_detail: Home,
};

const FIXED_TABS: DashboardTab[] = [
  { id: 'bienvenido', title: 'Bienvenido', type: 'bienvenido' },
  { id: 'unidades', title: 'Unidades Funcionales', type: 'unidades' },
  { id: 'personas', title: 'Personas', type: 'personas' },
  { id: 'ingresos', title: 'Ingresos/Egresos', type: 'ingresos' },
  { id: 'autorizaciones', title: 'Autorizaciones', type: 'autorizaciones' },
  { id: 'proveedores', title: 'Proveedores', type: 'proveedores' },
  { id: 'vehiculos', title: 'Vehículos', type: 'vehiculos' },
  { id: 'delivery', title: 'Delivery', type: 'delivery' },
];

export const AccessControlDashboard: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>(MOCK_PERSONAS);
  const [proveedores, setProveedores] = useState<Proveedor[]>(MOCK_PROVEEDORES);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(MOCK_VEHICULOS);
  const [documentos, setDocumentos] = useState<Documento[]>(MOCK_DOCUMENTOS);
  const [autorizaciones, setAutorizaciones] = useState<Autorizacion[]>(MOCK_AUTORIZACIONES);
  const [deliveryAutorizaciones, setDeliveryAutorizaciones] = useState<Autorizacion[]>(MOCK_DELIVERY_AUTORIZACIONES);
  const [marcaciones, setMarcaciones] = useState<Marcacion[]>(MOCK_MARCACIONES);

  const [tabs, setTabs] = useState<DashboardTab[]>(FIXED_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('bienvenido');
  const [ufTreeCollapsed, setUfTreeCollapsed] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // ─── Vehículo handlers ─────────────────────────────────────────────
  const handleAddVehiculo = (v: Vehiculo) => setVehiculos((prev) => [...prev, v]);
  const handleUpdateVehiculo = (v: Vehiculo) => setVehiculos((prev) => prev.map((x) => (x.id === v.id ? v : x)));
  const handleDeleteVehiculo = (id: string) => setVehiculos((prev) => prev.filter((x) => x.id !== id));

  const resolveOwnerName = (ownerType: 'persona' | 'proveedor', ownerId: string) => {
    if (ownerType === 'persona') return personas.find((p) => p.id === ownerId)?.nombre ?? '-';
    return proveedores.find((p) => p.id === ownerId)?.nombre ?? '-';
  };

  // ─── Documento handlers ────────────────────────────────────────────
  const handleAddDocumento = (d: Documento) => setDocumentos((prev) => [...prev, d]);
  const handleDeleteDocumento = (id: string) => setDocumentos((prev) => prev.filter((x) => x.id !== id));

  // ─── Autorización handlers (persona / proveedor / delivery) ────────
  const handleAddAutorizacion = (a: Autorizacion) => {
    if (a.tipo === 'delivery') setDeliveryAutorizaciones((prev) => [...prev, a]);
    else setAutorizaciones((prev) => [...prev, a]);
  };

  const handleUpdateAutorizacion = (a: Autorizacion) => {
    if (a.tipo === 'delivery') setDeliveryAutorizaciones((prev) => prev.map((x) => (x.id === a.id ? a : x)));
    else setAutorizaciones((prev) => prev.map((x) => (x.id === a.id ? a : x)));
  };

  const handleDeleteAutorizacion = (id: string) => {
    setAutorizaciones((prev) => prev.filter((x) => x.id !== id));
    setDeliveryAutorizaciones((prev) => prev.filter((x) => x.id !== id));
  };

  const handleRegistrarAcceso = (a: Autorizacion, tipoAcceso: 'ingreso' | 'egreso') => {
    const updated: Autorizacion = { ...a, ultimoAcceso: tipoAcceso };
    if (a.tipo === 'delivery') {
      setDeliveryAutorizaciones((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
      return;
    }
    setAutorizaciones((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
    const now = new Date();
    const fechaLocal = `${todayIso()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const marcacion: Marcacion = {
      id: `mar-${Date.now()}`,
      tipoAcceso,
      fecha: fechaLocal,
      puerta: PUERTAS[0],
      sujetoTipo: a.tipo,
      sujetoId: a.sujetoId ?? '',
      sujetoNombre: a.sujetoNombre,
      tipoAutorizacion: 'Autorización preexistente',
      autorizadoPor: 'Usuario de Prueba',
      unidadFuncional: a.unidadFuncionalNombre ?? '-',
    };
    setMarcaciones((prev) => [marcacion, ...prev]);
  };

  // ─── Persona handlers ──────────────────────────────────────────────
  const handleSavePersona = (p: Persona) => {
    setPersonas((prev) => prev.map((x) => (x.id === p.id ? p : x)));
    setTabs((prev) => prev.map((t) => (t.id === `persona_detail_${p.id}` ? { ...t, title: p.nombre } : t)));
  };

  const handleSelectPersona = (persona: Persona) => {
    const tabId = `persona_detail_${persona.id}`;
    setTabs((prev) => (prev.some((t) => t.id === tabId) ? prev : [...prev, { id: tabId, title: persona.nombre, type: 'persona_detail', entityId: persona.id }]));
    setActiveTabId(tabId);
  };

  const handleAddPersona = () => {
    alert('Alta de nueva persona (Simulado).');
  };

  // ─── Proveedor handlers ────────────────────────────────────────────
  const handleSaveProveedor = (p: Proveedor): boolean => {
    const duplicated = proveedores.some((x) => x.id !== p.id && x.identificacion === p.identificacion);
    if (duplicated) return false;
    setProveedores((prev) => prev.map((x) => (x.id === p.id ? p : x)));
    setTabs((prev) => prev.map((t) => (t.id === `proveedor_detail_${p.id}` ? { ...t, title: p.nombre } : t)));
    return true;
  };

  const handleSelectProveedor = (proveedor: Proveedor) => {
    const tabId = `proveedor_detail_${proveedor.id}`;
    setTabs((prev) => (prev.some((t) => t.id === tabId) ? prev : [...prev, { id: tabId, title: proveedor.nombre, type: 'proveedor_detail', entityId: proveedor.id }]));
    setActiveTabId(tabId);
  };

  const handleAddProveedor = () => {
    alert('Alta de nuevo proveedor (Simulado).');
  };

  // ─── Unidad Funcional handlers ─────────────────────────────────────
  const handleSelectUnidad = (unidad: UnidadFuncional) => {
    const tabId = `unidad_detail_${unidad.id}`;
    setTabs((prev) => (prev.some((t) => t.id === tabId)
      ? prev
      : [...prev, { id: tabId, title: unidad.numero, type: 'unidad_detail', entityId: unidad.id, activeNode: 'cuenta' }]));
    setActiveTabId(tabId);
  };

  const handleAddUnidad = () => {
    alert('Alta de nueva unidad funcional (Simulado).');
  };

  const handleUnidadNodeChange = (node: UnidadFuncionalNode) => {
    setTabs((prev) => prev.map((t) => (t.id === activeTabId ? { ...t, activeNode: node } : t)));
  };

  // ─── Tabs workspace ────────────────────────────────────────────────
  const isFixedTab = (tabId: string) => FIXED_TABS.some((t) => t.id === tabId);

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFixedTab(tabId)) return;
    setTabs((prev) => {
      const remaining = prev.filter((t) => t.id !== tabId);
      if (activeTabId === tabId) {
        setActiveTabId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
  };

  const renderTabContent = (tab: DashboardTab) => {
    switch (tab.type) {
      case 'bienvenido':
        return (
          <BienvenidoKioskView
            personas={personas}
            proveedores={proveedores}
            vehiculos={vehiculos}
            unidades={MOCK_UNIDADES_FUNCIONALES}
            onSelectPersona={handleSelectPersona}
            onSelectProveedor={handleSelectProveedor}
          />
        );

      case 'unidades':
        return (
          <UnidadFuncionalGrid
            unidades={MOCK_UNIDADES_FUNCIONALES}
            onSelectUnidad={handleSelectUnidad}
            onAddUnidad={handleAddUnidad}
          />
        );

      case 'personas':
        return <PersonaGrid personas={personas} onSelectPersona={handleSelectPersona} onAddPersona={handleAddPersona} />;

      case 'ingresos':
        return <IngresosEgresosGrid marcaciones={marcaciones} />;

      case 'autorizaciones':
        return (
          <AutorizacionesGrid
            autorizaciones={autorizaciones}
            onAdd={handleAddAutorizacion}
            onUpdate={handleUpdateAutorizacion}
            onDelete={handleDeleteAutorizacion}
            onRegistrarAcceso={handleRegistrarAcceso}
          />
        );

      case 'proveedores':
        return <ProveedorGrid proveedores={proveedores} onSelectProveedor={handleSelectProveedor} onAddProveedor={handleAddProveedor} />;

      case 'vehiculos':
        return (
          <VehiculoGrid
            vehiculos={vehiculos}
            onAddVehiculo={handleAddVehiculo}
            onUpdateVehiculo={handleUpdateVehiculo}
            onDeleteVehiculo={handleDeleteVehiculo}
            resolveOwnerName={resolveOwnerName}
          />
        );

      case 'delivery':
        return (
          <DeliveryGrid
            entregas={deliveryAutorizaciones}
            onAdd={handleAddAutorizacion}
            onUpdate={handleUpdateAutorizacion}
            onDelete={handleDeleteAutorizacion}
            onRegistrarAcceso={handleRegistrarAcceso}
          />
        );

      case 'persona_detail': {
        const persona = personas.find((p) => p.id === tab.entityId);
        if (!persona) return null;
        return (
          <PersonaForm
            persona={persona}
            vehiculos={vehiculos}
            marcaciones={marcaciones}
            autorizaciones={autorizaciones}
            onSavePersona={handleSavePersona}
            onAddVehiculo={handleAddVehiculo}
            onUpdateVehiculo={handleUpdateVehiculo}
            onDeleteVehiculo={handleDeleteVehiculo}
            onAddAutorizacion={handleAddAutorizacion}
            onUpdateAutorizacion={handleUpdateAutorizacion}
            onDeleteAutorizacion={handleDeleteAutorizacion}
            onRegistrarAcceso={handleRegistrarAcceso}
          />
        );
      }

      case 'proveedor_detail': {
        const proveedor = proveedores.find((p) => p.id === tab.entityId);
        if (!proveedor) return null;
        return (
          <ProveedorForm
            proveedor={proveedor}
            proveedores={proveedores}
            vehiculos={vehiculos}
            documentos={documentos}
            autorizaciones={autorizaciones}
            onSaveProveedor={handleSaveProveedor}
            onAddVehiculo={handleAddVehiculo}
            onUpdateVehiculo={handleUpdateVehiculo}
            onDeleteVehiculo={handleDeleteVehiculo}
            onAddDocumento={handleAddDocumento}
            onDeleteDocumento={handleDeleteDocumento}
            onAddAutorizacion={handleAddAutorizacion}
            onUpdateAutorizacion={handleUpdateAutorizacion}
            onDeleteAutorizacion={handleDeleteAutorizacion}
            onRegistrarAcceso={handleRegistrarAcceso}
          />
        );
      }

      case 'unidad_detail': {
        const unidad = MOCK_UNIDADES_FUNCIONALES.find((u) => u.id === tab.entityId);
        if (!unidad) return null;
        const activeNode = tab.activeNode ?? 'cuenta';
        const unidadAutorizaciones = [...autorizaciones, ...deliveryAutorizaciones].filter((a) => a.unidadFuncionalId === unidad.id);
        const unidadMarcaciones = marcaciones.filter((m) => m.unidadFuncional === unidad.numero);

        return (
          <div className="flex gap-5 h-full items-start">
            <UnidadFuncionalTree
              unidad={unidad}
              activeNode={activeNode}
              onNodeChange={handleUnidadNodeChange}
              collapsed={ufTreeCollapsed}
              onToggleCollapse={() => setUfTreeCollapsed(!ufTreeCollapsed)}
            />

            <div className="flex-1 h-full min-w-0">
              {activeNode === 'cuenta' ? (
                <div className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] space-y-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">{unidad.numero}</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Nombre</span>
                      <span className="text-zinc-200 font-semibold">{unidad.nombre}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Propietario</span>
                      <span className="text-zinc-200 font-semibold">{unidad.propietario}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Localidad</span>
                      <span className="text-zinc-200 font-semibold">{unidad.localidad}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Calle</span>
                      <span className="text-zinc-200 font-semibold">{unidad.calle}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Teléfono</span>
                      <span className="text-zinc-200 font-semibold font-mono">{unidad.telefono}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Situación</span>
                      <span className="text-zinc-200 font-semibold">{unidad.situacion}</span>
                    </div>
                  </div>
                </div>
              ) : activeNode === 'autorizaciones' ? (
                <AutorizacionesGrid
                  autorizaciones={unidadAutorizaciones}
                  onAdd={handleAddAutorizacion}
                  onUpdate={handleUpdateAutorizacion}
                  onDelete={handleDeleteAutorizacion}
                  onRegistrarAcceso={handleRegistrarAcceso}
                  embedded
                />
              ) : activeNode === 'accesos_io' ? (
                <IngresosEgresosGrid marcaciones={unidadMarcaciones} embedded />
              ) : (
                <div className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] flex flex-col justify-center items-center text-zinc-500 text-xs">
                  <AlertOctagon className="w-12 h-12 text-zinc-700 mb-2" />
                  <h4 className="font-bold text-zinc-400 uppercase tracking-wider">
                    {activeNode.charAt(0).toUpperCase() + activeNode.slice(1).replace('_', ' ')}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Solapa en desarrollo. Próximamente disponible.</p>
                </div>
              )}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 border-b border-zinc-850 bg-zinc-950/20 p-1 rounded-lg select-none overflow-x-auto custom-scrollbar shrink-0">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isClosable = !isFixedTab(tab.id);
          const Icon = TAB_ICONS[tab.type];
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.8 rounded border transition-all cursor-pointer whitespace-nowrap text-xs font-semibold ${
                isActive ? 'border-orange-500/40 bg-orange-500/10 text-orange-400 font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.title}</span>
              {isClosable && (
                <button onClick={(e) => handleCloseTab(tab.id, e)} className="p-0.5 rounded hover:bg-zinc-800 hover:text-red-400 transition-colors" title="Cerrar solapa">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderTabContent(activeTab)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
