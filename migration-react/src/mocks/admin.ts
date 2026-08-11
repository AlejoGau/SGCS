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
    username: 'usuario1@test.com',
    name: 'Usuario',
    lastName: 'Prueba 1',
    client: 'Cliente de Prueba 1',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Configuración', 'Reportes']
  },
  {
    id: 'u-2',
    username: 'usuario2@test.com',
    name: 'Usuario',
    lastName: 'Prueba 2',
    client: 'Cliente de Prueba 2',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Clientes', 'Reportes']
  },
  {
    id: 'u-3',
    username: 'usuario3@test.com',
    name: 'Usuario',
    lastName: 'Prueba 3',
    client: 'Cliente de Prueba 3',
    province: 'Santa Fe',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Configuración', 'Servicio Técnico', 'Ingresos y Egresos', 'Web Remoto Mobile']
  },
  {
    id: 'u-4',
    username: 'usuario4@test.com',
    name: 'Usuario',
    lastName: 'Prueba 4',
    client: 'Cliente de Prueba 4',
    province: 'Córdoba',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Configuración', 'Video', 'MultiMonitor']
  },
  {
    id: 'u-5',
    username: 'usuario5@test.com',
    name: 'Usuario',
    lastName: 'Prueba 5',
    client: 'Cliente de Prueba 5',
    province: 'Mendoza',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo', 'Reportes', 'Clientes']
  },
  {
    id: 'u-6',
    username: 'usuario6@test.com',
    name: 'Usuario',
    lastName: 'Prueba 6',
    client: 'Cliente de Prueba 6',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Perfil de Prueba',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Monitoreo']
  },
  {
    id: 'u-7',
    username: 'usuario7@test.com',
    name: 'Usuario',
    lastName: 'Prueba 7',
    client: 'Cliente de Prueba 7',
    province: 'Tucumán',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Central',
    allowedModules: ['Clientes', 'Reportes']
  },
  {
    id: 'u-8',
    username: 'usuario8@test.com',
    name: 'Usuario',
    lastName: 'Prueba 8',
    client: 'Dealer de Prueba 8',
    province: 'Salta',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Dealer',
    allowedModules: ['Dealer', 'Clientes']
  },
  {
    id: 'u-9',
    username: 'usuario9@test.com',
    name: 'Usuario',
    lastName: 'Prueba 9',
    client: 'Cliente de Prueba 9',
    province: 'Buenos Aires',
    language: 'Español (Argentina)',
    profile: 'Sin perfil',
    status: 'Habilitado',
    type: 'Usuario final',
    allowedModules: ['Web Remoto Mobile']
  },
  {
    id: 'u-10',
    username: 'usuario10@test.com',
    name: 'Usuario',
    lastName: 'Prueba 10',
    client: 'Cliente de Prueba 10',
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
    username: 'usuario1@test.com',
    fullName: 'Usuario de Prueba 1',
    module: 'TrackGuard',
    organization: 'Cliente de Prueba 1',
    ipAddress: '192.168.1.55',
    loginTime: '2:40 PM'
  },
  {
    id: 's-2',
    username: 'usuario1@test.com',
    fullName: 'Usuario de Prueba 1',
    module: 'Configuración',
    organization: 'Cliente de Prueba 1',
    ipAddress: '192.168.1.55',
    loginTime: '2:42 PM'
  },
  {
    id: 's-3',
    username: 'usuario3@test.com',
    fullName: 'Usuario de Prueba 3',
    module: 'Monitoreo',
    organization: 'Cliente de Prueba 3',
    ipAddress: '192.168.1.12',
    loginTime: '1:15 PM'
  }
];
