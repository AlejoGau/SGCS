// Modelo de datos mockeado del módulo AccessControl (Control de Accesos Físicos)
// Espeja la lógica visual/de negocio del legacy Sencha (apps/SgAppAccessControl)

// Fecha local (no UTC) en formato YYYY-MM-DD — evita el corrimiento de día que da toISOString() en husos horarios negativos (ej. Argentina).
export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export type DiaSemana = 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1=Lunes ... 7=Domingo

export const DIAS_SEMANA: { value: DiaSemana; label: string; short: string }[] = [
  { value: 1, label: 'Lunes', short: 'Lu' },
  { value: 2, label: 'Martes', short: 'Ma' },
  { value: 3, label: 'Miércoles', short: 'Mi' },
  { value: 4, label: 'Jueves', short: 'Ju' },
  { value: 5, label: 'Viernes', short: 'Vi' },
  { value: 6, label: 'Sábado', short: 'Sa' },
  { value: 7, label: 'Domingo', short: 'Do' },
];

export const TIPOS_PERSONA = ['Propietario', 'Inquilino', 'Familiar', 'Empleado', 'Visita'];

export const CATEGORIAS_PROVEEDOR = [
  'Delivery',
  'Mantenimiento',
  'Limpieza',
  'Construcción',
  'Servicio Técnico',
  'Mensajería',
];

export const TIPOS_DOCUMENTO = ['Seguro', 'Habilitación', 'Contrato', 'Certificado de Antecedentes', 'Otro'];

export const PUERTAS = ['Portón Principal', 'Acceso Peatonal', 'Playa de Estacionamiento', 'Portón de Servicio'];

// ─── Vehículos ─────────────────────────────────────────────────────────
export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
  anio: number;
  color: string;
  tipo: string;
  companiaSeguro: string;
  vencimientoSeguro: string;
  vencimientoVTV: string;
  identificacion: string;
  vencimientoIdentificacion: string;
  observaciones: string;
  ownerType: 'persona' | 'proveedor';
  ownerId: string;
}

// ─── Documentos (Proveedor) ────────────────────────────────────────────
export interface Documento {
  id: string;
  proveedorId: string;
  tipoDocumento: string;
  descripcion: string;
  fechaVencimiento: string;
  archivoNombre: string;
}

// ─── Autorizaciones (ventana de acceso temporal) ──────────────────────
export interface Autorizacion {
  id: string;
  tipo: 'persona' | 'proveedor' | 'delivery';
  sujetoId?: string;
  sujetoNombre: string;
  unidadFuncionalId?: string;
  unidadFuncionalNombre?: string;
  fechaDesde: string;
  fechaHasta: string;
  diasSemana: DiaSemana[]; // vacío = todos los días
  todoElDia: boolean;
  horaDesde: string;
  horaHasta: string;
  estado: 'activa' | 'inactiva';
  ultimoAcceso?: 'ingreso' | 'egreso';
}

// Estado visual de una autorización, calculado contra "hoy" — igual que el legacy:
// el campo `estado` guardado puede ser "Activo" y aun así mostrarse "Pendiente" en la grilla
// si el día de la semana de este registro no es el de hoy (confirmado contra el sistema real).
export type EstadoAutorizacionVisual = 'vencida' | 'pendiente' | 'activa' | 'inactiva';

export const getEstadoAutorizacionVisual = (a: Autorizacion): EstadoAutorizacionVisual => {
  if (a.fechaHasta < todayIso()) return 'vencida';
  if (a.estado !== 'activa') return 'inactiva';
  if (a.diasSemana.length > 0) {
    const hoyIso = new Date().getDay() === 0 ? 7 : new Date().getDay(); // 1=Lunes ... 7=Domingo
    if (!a.diasSemana.includes(hoyIso as DiaSemana)) return 'pendiente';
  }
  return 'activa';
};

// ─── Marcaciones (log de Ingresos/Egresos) ────────────────────────────
export interface Marcacion {
  id: string;
  tipoAcceso: 'ingreso' | 'egreso';
  fecha: string;
  puerta: string;
  sujetoTipo: 'persona' | 'proveedor';
  sujetoId: string;
  sujetoNombre: string;
  tipoAutorizacion: 'Contacto propietario' | 'Autorización supervisor' | 'Autorización preexistente';
  autorizadoPor: string;
  unidadFuncional: string;
  observaciones?: string;
}

// ─── Personas ──────────────────────────────────────────────────────────
export interface Persona {
  id: string;
  tipo: string;
  nombre: string;
  identificacion: string;
  unidadFuncionalId: string;
  unidadFuncionalNombre: string;
  localidad: string;
  observaciones: string;
  activo: boolean;
}

// ─── Proveedores ───────────────────────────────────────────────────────
export interface Proveedor {
  id: string;
  nombre: string;
  identificacion: string;
  direccion: string;
  codigoPostal: string;
  localidad: string;
  provincia: string;
  telefono: string;
  categoria: string;
  operativo: boolean;
  fechaAlta: string;
  observaciones: string;
}

// ─── Unidades Funcionales ──────────────────────────────────────────────
export interface UnidadFuncional {
  id: string;
  numero: string;
  nombre: string;
  estado: 'Activado / cerrada' | 'Desactivado / Abierto';
  situacion: 'Habilitadas' | 'No Habilitadas' | 'En Prueba';
  localidad: string;
  calle: string;
  telefono: string;
  propietario: string;
}

// ────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ────────────────────────────────────────────────────────────────────────

export const MOCK_UNIDADES_FUNCIONALES: UnidadFuncional[] = [
  { id: 'uf-1', numero: 'UF-0001', nombre: 'Torre A - Piso 1 Depto A', estado: 'Activado / cerrada', situacion: 'Habilitadas', localidad: 'Ciudad de Prueba', calle: 'Dirección de Prueba 1', telefono: '1111111111', propietario: 'Persona de Prueba 1' },
  { id: 'uf-2', numero: 'UF-0002', nombre: 'Torre A - Piso 2 Depto B', estado: 'Desactivado / Abierto', situacion: 'Habilitadas', localidad: 'Ciudad de Prueba', calle: 'Dirección de Prueba 2', telefono: '2222222222', propietario: 'Persona de Prueba 2' },
  { id: 'uf-3', numero: 'UF-0003', nombre: 'Torre B - Piso 1 Depto A', estado: 'Activado / cerrada', situacion: 'Habilitadas', localidad: 'Ciudad de Prueba', calle: 'Dirección de Prueba 3', telefono: '3333333333', propietario: 'Persona de Prueba 3' },
  { id: 'uf-4', numero: 'UF-0004', nombre: 'Torre B - Piso 3 Depto C', estado: 'Activado / cerrada', situacion: 'En Prueba', localidad: 'Ciudad de Prueba', calle: 'Dirección de Prueba 4', telefono: '4444444444', propietario: 'Persona de Prueba 4' },
  { id: 'uf-5', numero: 'UF-0005', nombre: 'Casa 12 - Barrio Cerrado', estado: 'Activado / cerrada', situacion: 'Habilitadas', localidad: 'Ciudad de Prueba', calle: 'Dirección de Prueba 5', telefono: '5555555555', propietario: 'Persona de Prueba 5' },
];

export const MOCK_PERSONAS: Persona[] = [
  { id: 'per-1', tipo: 'Propietario', nombre: 'Persona de Prueba 1', identificacion: '30111111', unidadFuncionalId: 'uf-1', unidadFuncionalNombre: 'UF-0001', localidad: 'Ciudad de Prueba', observaciones: 'Sin observaciones registradas.', activo: true },
  { id: 'per-2', tipo: 'Inquilino', nombre: 'Persona de Prueba 2', identificacion: '30222222', unidadFuncionalId: 'uf-2', unidadFuncionalNombre: 'UF-0002', localidad: 'Ciudad de Prueba', observaciones: 'Contrato de alquiler vigente hasta 2027.', activo: true },
  { id: 'per-3', tipo: 'Familiar', nombre: 'Persona de Prueba 3', identificacion: '30333333', unidadFuncionalId: 'uf-1', unidadFuncionalNombre: 'UF-0001', localidad: 'Ciudad de Prueba', observaciones: '', activo: true },
  { id: 'per-4', tipo: 'Empleado', nombre: 'Persona de Prueba 4', identificacion: '30444444', unidadFuncionalId: 'uf-3', unidadFuncionalNombre: 'UF-0003', localidad: 'Ciudad de Prueba', observaciones: 'Personal doméstico, ingreso de lunes a viernes.', activo: true },
  { id: 'per-5', tipo: 'Propietario', nombre: 'Persona de Prueba 5', identificacion: '30555555', unidadFuncionalId: 'uf-4', unidadFuncionalNombre: 'UF-0004', localidad: 'Ciudad de Prueba', observaciones: '', activo: false },
  { id: 'per-6', tipo: 'Visita', nombre: 'Persona de Prueba 6', identificacion: '30666666', unidadFuncionalId: 'uf-5', unidadFuncionalNombre: 'UF-0005', localidad: 'Ciudad de Prueba', observaciones: 'Visita recurrente de fin de semana.', activo: true },
  { id: 'per-7', tipo: 'Propietario', nombre: 'Persona de Prueba 7', identificacion: '30777777', unidadFuncionalId: 'uf-5', unidadFuncionalNombre: 'UF-0005', localidad: 'Ciudad de Prueba', observaciones: '', activo: true },
];

export const MOCK_PROVEEDORES: Proveedor[] = [
  { id: 'prov-1', nombre: 'Proveedor de Prueba 1', identificacion: '20111111119', direccion: 'Dirección de Prueba 1', codigoPostal: '1425', localidad: 'Ciudad de Prueba', provincia: 'Buenos Aires', telefono: '1111111111', categoria: 'Delivery', operativo: true, fechaAlta: '2024-01-15', observaciones: '' },
  { id: 'prov-2', nombre: 'Proveedor de Prueba 2', identificacion: '20222222229', direccion: 'Dirección de Prueba 2', codigoPostal: '1425', localidad: 'Ciudad de Prueba', provincia: 'Buenos Aires', telefono: '2222222222', categoria: 'Mantenimiento', operativo: true, fechaAlta: '2023-06-02', observaciones: 'Mantenimiento de ascensores, ingreso mensual programado.' },
  { id: 'prov-3', nombre: 'Proveedor de Prueba 3', identificacion: '20333333339', direccion: 'Dirección de Prueba 3', codigoPostal: '1425', localidad: 'Ciudad de Prueba', provincia: 'Santa Fe', telefono: '3333333333', categoria: 'Limpieza', operativo: true, fechaAlta: '2022-11-20', observaciones: '' },
  { id: 'prov-4', nombre: 'Proveedor de Prueba 4', identificacion: '20444444449', direccion: 'Dirección de Prueba 4', codigoPostal: '1425', localidad: 'Ciudad de Prueba', provincia: 'Buenos Aires', telefono: '4444444444', categoria: 'Construcción', operativo: false, fechaAlta: '2021-03-10', observaciones: 'Obra finalizada, proveedor dado de baja operativa.' },
  { id: 'prov-5', nombre: 'Proveedor de Prueba 5', identificacion: '20555555559', direccion: 'Dirección de Prueba 5', codigoPostal: '1425', localidad: 'Ciudad de Prueba', provincia: 'Córdoba', telefono: '5555555555', categoria: 'Servicio Técnico', operativo: true, fechaAlta: '2025-02-18', observaciones: '' },
];

export const MOCK_VEHICULOS: Vehiculo[] = [
  { id: 'veh-1', marca: 'Toyota', modelo: 'Corolla', matricula: 'AB123CD', anio: 2021, color: 'Gris', tipo: 'Automóvil', companiaSeguro: 'Seguros de Prueba', vencimientoSeguro: '2026-12-01', vencimientoVTV: '2026-10-15', identificacion: 'VIN-TEST-001', vencimientoIdentificacion: '2027-01-01', observaciones: '', ownerType: 'persona', ownerId: 'per-1' },
  { id: 'veh-2', marca: 'Volkswagen', modelo: 'Vento', matricula: 'AC456EF', anio: 2019, color: 'Negro', tipo: 'Automóvil', companiaSeguro: 'Seguros de Prueba', vencimientoSeguro: '2026-08-20', vencimientoVTV: '2026-09-10', identificacion: 'VIN-TEST-002', vencimientoIdentificacion: '2027-01-01', observaciones: '', ownerType: 'persona', ownerId: 'per-2' },
  { id: 'veh-3', marca: 'Renault', modelo: 'Kangoo', matricula: 'AD789GH', anio: 2020, color: 'Blanco', tipo: 'Utilitario', companiaSeguro: 'Seguros de Prueba', vencimientoSeguro: '2026-11-05', vencimientoVTV: '2026-07-22', identificacion: 'VIN-TEST-003', vencimientoIdentificacion: '2027-01-01', observaciones: 'Vehículo de reparto diario.', ownerType: 'proveedor', ownerId: 'prov-1' },
  { id: 'veh-4', marca: 'Ford', modelo: 'Transit', matricula: 'AE012IJ', anio: 2018, color: 'Blanco', tipo: 'Utilitario', companiaSeguro: 'Seguros de Prueba', vencimientoSeguro: '2026-05-30', vencimientoVTV: '2026-04-18', identificacion: 'VIN-TEST-004', vencimientoIdentificacion: '2027-01-01', observaciones: '', ownerType: 'proveedor', ownerId: 'prov-2' },
  { id: 'veh-5', marca: 'Honda', modelo: 'Wave', matricula: 'MOT001', anio: 2022, color: 'Rojo', tipo: 'Motocicleta', companiaSeguro: 'Seguros de Prueba', vencimientoSeguro: '2026-09-12', vencimientoVTV: '2026-06-01', identificacion: 'VIN-TEST-005', vencimientoIdentificacion: '2027-01-01', observaciones: '', ownerType: 'proveedor', ownerId: 'prov-1' },
];

export const MOCK_DOCUMENTOS: Documento[] = [
  { id: 'doc-1', proveedorId: 'prov-1', tipoDocumento: 'Seguro', descripcion: 'Póliza de seguro de responsabilidad civil', fechaVencimiento: '2026-12-31', archivoNombre: 'poliza-prueba-1.pdf' },
  { id: 'doc-2', proveedorId: 'prov-1', tipoDocumento: 'Certificado de Antecedentes', descripcion: 'Certificado de antecedentes del personal', fechaVencimiento: '2027-01-15', archivoNombre: 'antecedentes-prueba-1.pdf' },
  { id: 'doc-3', proveedorId: 'prov-2', tipoDocumento: 'Habilitación', descripcion: 'Habilitación municipal de mantenimiento de ascensores', fechaVencimiento: '2026-08-01', archivoNombre: 'habilitacion-prueba-2.pdf' },
  { id: 'doc-4', proveedorId: 'prov-3', tipoDocumento: 'Contrato', descripcion: 'Contrato de servicio de limpieza', fechaVencimiento: '2026-06-30', archivoNombre: 'contrato-prueba-3.pdf' },
];

export const MOCK_AUTORIZACIONES: Autorizacion[] = [
  { id: 'aut-1', tipo: 'persona', sujetoId: 'per-2', sujetoNombre: 'Persona de Prueba 2', unidadFuncionalId: 'uf-2', unidadFuncionalNombre: 'UF-0002', fechaDesde: '2026-08-01', fechaHasta: '2026-12-31', diasSemana: [], todoElDia: true, horaDesde: '00:00', horaHasta: '23:59', estado: 'activa', ultimoAcceso: 'egreso' },
  { id: 'aut-2', tipo: 'persona', sujetoId: 'per-4', sujetoNombre: 'Persona de Prueba 4', unidadFuncionalId: 'uf-3', unidadFuncionalNombre: 'UF-0003', fechaDesde: '2026-01-01', fechaHasta: '2026-12-31', diasSemana: [1, 2, 3, 4, 5], todoElDia: false, horaDesde: '08:00', horaHasta: '17:00', estado: 'activa', ultimoAcceso: 'ingreso' },
  { id: 'aut-3', tipo: 'persona', sujetoId: 'per-6', sujetoNombre: 'Persona de Prueba 6', unidadFuncionalId: 'uf-5', unidadFuncionalNombre: 'UF-0005', fechaDesde: '2026-08-10', fechaHasta: '2026-08-20', diasSemana: [6, 7], todoElDia: false, horaDesde: '10:00', horaHasta: '22:00', estado: 'activa', ultimoAcceso: 'egreso' },
  { id: 'aut-4', tipo: 'proveedor', sujetoId: 'prov-2', sujetoNombre: 'Proveedor de Prueba 2', unidadFuncionalId: undefined, unidadFuncionalNombre: undefined, fechaDesde: '2026-01-01', fechaHasta: '2026-06-30', diasSemana: [1], todoElDia: false, horaDesde: '09:00', horaHasta: '13:00', estado: 'activa', ultimoAcceso: 'egreso' },
  { id: 'aut-5', tipo: 'proveedor', sujetoId: 'prov-3', sujetoNombre: 'Proveedor de Prueba 3', unidadFuncionalId: undefined, unidadFuncionalNombre: undefined, fechaDesde: '2026-01-01', fechaHasta: '2026-05-01', diasSemana: [2, 4], todoElDia: false, horaDesde: '08:00', horaHasta: '12:00', estado: 'inactiva', ultimoAcceso: 'ingreso' },
  { id: 'aut-6', tipo: 'proveedor', sujetoId: 'prov-5', sujetoNombre: 'Proveedor de Prueba 5', unidadFuncionalId: undefined, unidadFuncionalNombre: undefined, fechaDesde: '2026-07-01', fechaHasta: '2026-07-15', diasSemana: [], todoElDia: true, horaDesde: '00:00', horaHasta: '23:59', estado: 'activa', ultimoAcceso: 'egreso' },
];

export const MOCK_DELIVERY_AUTORIZACIONES: Autorizacion[] = [
  { id: 'del-1', tipo: 'delivery', sujetoNombre: 'Rappi - Repartidor de Prueba 1', unidadFuncionalId: 'uf-1', unidadFuncionalNombre: 'UF-0001', fechaDesde: '2026-08-14', fechaHasta: '2026-08-14', diasSemana: [], todoElDia: true, horaDesde: '00:00', horaHasta: '23:59', estado: 'activa', ultimoAcceso: 'ingreso' },
  { id: 'del-2', tipo: 'delivery', sujetoNombre: 'PedidosYa - Repartidor de Prueba 2', unidadFuncionalId: 'uf-2', unidadFuncionalNombre: 'UF-0002', fechaDesde: '2026-08-13', fechaHasta: '2026-08-13', diasSemana: [], todoElDia: true, horaDesde: '00:00', horaHasta: '23:59', estado: 'inactiva', ultimoAcceso: 'egreso' },
  { id: 'del-3', tipo: 'delivery', sujetoNombre: 'Correo de Prueba - Paquetería', unidadFuncionalId: 'uf-4', unidadFuncionalNombre: 'UF-0004', fechaDesde: '2026-08-10', fechaHasta: '2026-08-10', diasSemana: [], todoElDia: true, horaDesde: '00:00', horaHasta: '23:59', estado: 'inactiva', ultimoAcceso: 'egreso' },
];

export const MOCK_MARCACIONES: Marcacion[] = [
  { id: 'mar-1', tipoAcceso: 'ingreso', fecha: '2026-08-15 08:12:03', puerta: 'Portón Principal', sujetoTipo: 'persona', sujetoId: 'per-4', sujetoNombre: 'Persona de Prueba 4', tipoAutorizacion: 'Autorización preexistente', autorizadoPor: 'Sistema', unidadFuncional: 'UF-0003' },
  { id: 'mar-2', tipoAcceso: 'ingreso', fecha: '2026-08-15 09:45:11', puerta: 'Acceso Peatonal', sujetoTipo: 'persona', sujetoId: 'per-2', sujetoNombre: 'Persona de Prueba 2', tipoAutorizacion: 'Contacto propietario', autorizadoPor: 'Usuario de Prueba 1', unidadFuncional: 'UF-0002' },
  { id: 'mar-3', tipoAcceso: 'egreso', fecha: '2026-08-15 10:03:47', puerta: 'Acceso Peatonal', sujetoTipo: 'persona', sujetoId: 'per-2', sujetoNombre: 'Persona de Prueba 2', tipoAutorizacion: 'Autorización preexistente', autorizadoPor: 'Usuario de Prueba 1', unidadFuncional: 'UF-0002' },
  { id: 'mar-4', tipoAcceso: 'ingreso', fecha: '2026-08-15 11:20:00', puerta: 'Playa de Estacionamiento', sujetoTipo: 'proveedor', sujetoId: 'prov-2', sujetoNombre: 'Proveedor de Prueba 2', tipoAutorizacion: 'Autorización preexistente', autorizadoPor: 'Sistema', unidadFuncional: 'Torre A' },
  { id: 'mar-5', tipoAcceso: 'ingreso', fecha: '2026-08-15 13:02:55', puerta: 'Portón Principal', sujetoTipo: 'persona', sujetoId: 'per-6', sujetoNombre: 'Persona de Prueba 6', tipoAutorizacion: 'Autorización supervisor', autorizadoPor: 'Usuario de Prueba 2', unidadFuncional: 'UF-0005', observaciones: 'Visita anunciada previamente por el propietario.' },
  { id: 'mar-6', tipoAcceso: 'egreso', fecha: '2026-08-14 18:40:22', puerta: 'Portón de Servicio', sujetoTipo: 'proveedor', sujetoId: 'prov-1', sujetoNombre: 'Proveedor de Prueba 1', tipoAutorizacion: 'Autorización preexistente', autorizadoPor: 'Sistema', unidadFuncional: 'UF-0001' },
  { id: 'mar-7', tipoAcceso: 'ingreso', fecha: '2026-08-14 08:00:10', puerta: 'Portón Principal', sujetoTipo: 'persona', sujetoId: 'per-1', sujetoNombre: 'Persona de Prueba 1', tipoAutorizacion: 'Contacto propietario', autorizadoPor: 'Usuario de Prueba 1', unidadFuncional: 'UF-0001' },
  { id: 'mar-8', tipoAcceso: 'egreso', fecha: '2026-08-14 19:15:38', puerta: 'Portón Principal', sujetoTipo: 'persona', sujetoId: 'per-1', sujetoNombre: 'Persona de Prueba 1', tipoAutorizacion: 'Autorización preexistente', autorizadoPor: 'Usuario de Prueba 1', unidadFuncional: 'UF-0001' },
];
