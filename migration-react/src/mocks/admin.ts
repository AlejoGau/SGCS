export interface AdminUser {
  id: string;
  username: string;
  name: string;
  lastName: string;
  client: string;
  province: string;
  language: string;
  profile: string;
  status: 'Habilitado' | 'Bloqueado' | 'Pendiente';
  type: 'Central' | 'Dealer' | 'Usuario final';
  allowedModules: string[];
}

export interface ActiveSession {
  id: string;
  username: string;
  fullName: string;
  module: 'TrackGuard' | 'Configuración' | 'Monitoreo' | 'Auditoría';
  organization: string;
  ipAddress: string;
  loginTime: string;
}

export const ADMIN_MODULES_LIST = [
  'Monitoreo',
  'Configuración',
  'Servicio Técnico',
  'Ingresos y Egresos',
  'Web Remoto Mobile',
  'Novedades',
  'Tarjetas SIM',
  'IoT',
  'MultiMonitor',
  'Autorizados',
  'Clientes',
  'Video',
  'Reportes',
  'MoneyGuard',
  'Dealer'
];

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'u-1',
    username: 'dbanda@softguard.com',
    name: 'Daniel',
    lastName: 'Banda',
    client: 'CANDELAS',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Configuración', 'Reportes']
  },
  {
    id: 'u-2',
    username: 'ventas@softguard.com',
    name: 'Ventas',
    lastName: 'Ventas',
    client: 'Softguard',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Clientes', 'Reportes']
  },
  {
    id: 'u-3',
    username: 'mrey@softdemonitoreo.com',
    name: 'Maximo',
    lastName: 'Rey',
    client: 'Implementacion',
    province: 'Santa Fe',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Configuración', 'Servicio Técnico', 'Ingresos y Egresos', 'Web Remoto Mobile']
  },
  {
    id: 'u-4',
    username: 'lspagnuolo@softdemonitoreo.com',
    name: 'Leonardo',
    lastName: 'Spagnuolo',
    client: 'Teleronda',
    province: 'Córdoba',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Configuración', 'Video', 'MultiMonitor']
  },
  {
    id: 'u-5',
    username: 'PabloC@sg.com',
    name: 'Pablo',
    lastName: 'Canonico',
    client: 'LEONARDO TEST',
    province: 'Mendoza',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Reportes', 'Clientes']
  },
  {
    id: 'u-6',
    username: 'mauro@mdo.com',
    name: 'Mauro',
    lastName: 'Rodriguez',
    client: 'CANDELAS',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Prueba Rodrigo',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo']
  },
  {
    id: 'u-7',
    username: 'gobierno@softguard.com',
    name: 'Secretaria',
    lastName: 'Gobierno',
    client: 'Nuevo cliente 123',
    province: 'Tucumán',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Clientes', 'Reportes']
  },
  {
    id: 'u-8',
    username: 'dealer_norte@softguard.com',
    name: 'Juan',
    lastName: 'Perez',
    client: 'Dealer Norte SRL',
    province: 'Salta',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Dealer',
    allowedModules: ['Dealer', 'Clientes']
  },
  {
    id: 'u-9',
    username: 'cliente_final_1@gmail.com',
    name: 'Maria',
    lastName: 'Lopez',
    client: 'Residencial Gomez',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Usuario final',
    allowedModules: ['Web Remoto Mobile']
  },
  {
    id: 'u-10',
    username: 'bloqueado@softguard.com',
    name: 'Usuario',
    lastName: 'Bloqueado',
    client: 'Test Corp',
    province: 'Chaco',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Bloqueado',
    type: 'Central',
    allowedModules: []
  }
];

export const MOCK_ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: 's-1',
    username: 'alejo@softguard.com',
    fullName: 'Alejo Gauthier',
    module: 'TrackGuard',
    organization: 'capo',
    ipAddress: '192.168.1.55',
    loginTime: '2:40 PM'
  },
  {
    id: 's-2',
    username: 'alejo@softguard.com',
    fullName: 'Alejo Gauthier',
    module: 'Configuración',
    organization: 'capo',
    ipAddress: '192.168.1.55',
    loginTime: '2:42 PM'
  },
  {
    id: 's-3',
    username: 'dbanda@softguard.com',
    fullName: 'Daniel Banda',
    module: 'Monitoreo',
    organization: 'CANDELAS',
    ipAddress: '192.168.1.12',
    loginTime: '1:15 PM'
  }
];
