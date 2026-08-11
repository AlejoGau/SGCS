export interface Zone {
  number: string;
  name: string;
  partition: string;
  type: string;
}

export interface SoftguardUser {
  id: string;
  usu_icodigo: number;      // Código de usuario (numberfield)
  usu_cnombre: string;      // Nombre (textfield)
  usu_cclave: string;       // Clave (password textfield)
  usu_mobservacion: string; // Observación (textareafield)
  usu_ntipo: number;        // Tipo (combobox values e.g. 1: Administrador, 2: Operador, 3: Técnico)
  usu_cidextendido: string; // Id Extendido (textfield validator)
  usu_cimagen?: string;      // Foto filename
}

export interface SmartPanicsGeocerca {
  id: string;
  Name: string;             // Nombre (textfield)
  GeoType: 'I' | 'E' | 'X'; // Combo Tipo: I (Inclusión), E (Exclusión), X (Ambas)
  Status: '0' | '1';        // Combo Estado: 0 (Inactiva), 1 (Activa)
  Address: string;          // Dirección (search textfield)
  latitude: number;
  longitude: number;
  radius: number;           // Geofence radius in meters
}

export interface ContractedService {
  id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  vatRate: number;
  startDate: string;
  expiryDate: string;
  status: 0 | 1 | 2 | 3;
}

export interface ChangeRequest {
  id: string;
  accountNumber: string;
  clientName: string;
  fieldChanged: string;
  oldValue: string;
  newValue: string;
  requestDate: string;
}

export interface Account {
  id: string;
  accountNumber: string;
  clientName: string;
  type: string;
  responsiblePerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'suspended' | 'pending';
  situation: 'Habilitadas' | 'No Habilitadas' | 'En Prueba' | 'Podr. eliminar';
  signalLevel: number; // 1 to 4
  alarmStatus: 'Activado / cerrado' | 'Desactivado / Abierto';
  lastAlarmDate: string;
  lastTestDate: string;
  creationDate: string;
  serviceDate: string;
  dealerId: string;
  dealerName: string;
  latitude: number;
  longitude: number;
  zones: Zone[];
  users: SoftguardUser[];
  geocercas: SmartPanicsGeocerca[];
  services: ContractedService[];
}

export const PRODUCT_CATALOG = [
  { code: 'PROD-01', name: 'Producto de Prueba 1', price: 10.00, vatRate: 0.21 },
  { code: 'PROD-02', name: 'Producto de Prueba 2', price: 20.00, vatRate: 0.21 },
  { code: 'PROD-03', name: 'Producto de Prueba 3', price: 30.00, vatRate: 0.21 },
  { code: 'PROD-04', name: 'Producto de Prueba 4', price: 40.00, vatRate: 0.21 },
  { code: 'PROD-05', name: 'Producto de Prueba 5', price: 50.00, vatRate: 0.21 }
];

export const MOCK_CHANGE_REQUESTS: ChangeRequest[] = [
  { id: '1', accountNumber: 'CTA-0003', clientName: 'CUENTA TEST 3', fieldChanged: 'Dirección', oldValue: 'Dirección de Prueba 3', newValue: 'Dirección de Prueba 3 (actualizada)', requestDate: '2026-05-22 10:15' },
  { id: '2', accountNumber: 'CTA-0001', clientName: 'CUENTA 1', fieldChanged: 'Teléfono', oldValue: '1111111111', newValue: '1111111199', requestDate: '2026-05-22 14:30' }
];

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1',
    accountNumber: 'CTA-0001',
    clientName: 'CUENTA 1',
    type: 'Cuenta de Prueba',
    responsiblePerson: 'Usuario de Prueba 1',
    email: 'prueba1@test.com',
    phone: '1111111111',
    address: 'Dirección de Prueba 1',
    city: 'Ciudad de Prueba',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 4,
    alarmStatus: 'Desactivado / Abierto',
    lastAlarmDate: '2026-05-22 20:10:45',
    lastTestDate: '2026-05-22 20:00:00',
    creationDate: '2018-01-22',
    serviceDate: '2023-09-20',
    dealerId: 'DL-TEST-1',
    dealerName: 'Dealer de Prueba 1',
    latitude: -34.6037,
    longitude: -58.3816,
    zones: [
      { number: '001', name: 'Zona de Prueba 1', partition: 'P1', type: 'Instantánea' },
      { number: '002', name: 'Zona de Prueba 2', partition: 'P1', type: 'Demorada' }
    ],
    users: [
      { id: 'u1', usu_icodigo: 101, usu_cnombre: 'Usuario de Prueba 1', usu_cclave: 'test1234', usu_mobservacion: 'Observación de prueba', usu_ntipo: 1, usu_cidextendido: 'EXT-TEST-01' }
    ],
    geocercas: [
      { id: 'g1', Name: 'Geocerca de Prueba 1', GeoType: 'I', Status: '1', Address: 'Dirección de Prueba', latitude: -34.6, longitude: -58.38, radius: 250 }
    ],
    services: []
  },
  {
    id: '2',
    accountNumber: 'CTA-0002',
    clientName: 'CUENTA PRUEBA 2',
    type: 'Cuenta de Prueba',
    responsiblePerson: 'Usuario de Prueba 2',
    email: 'prueba2@test.com',
    phone: '2222222222',
    address: 'Dirección de Prueba 2',
    city: 'Ciudad de Prueba',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 2,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-22 19:45:12',
    lastTestDate: '2026-05-22 18:30:00',
    creationDate: '2020-03-11',
    serviceDate: '2024-05-15',
    dealerId: 'DL-TEST-1',
    dealerName: 'Dealer de Prueba 1',
    latitude: -34.5898,
    longitude: -58.3974,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '3',
    accountNumber: 'CTA-0003',
    clientName: 'CUENTA TEST 3',
    type: 'Cuenta de Prueba',
    responsiblePerson: 'Usuario de Prueba 3',
    email: 'prueba3@test.com',
    phone: '3333333333',
    address: 'Dirección de Prueba 3',
    city: 'Ciudad de Prueba',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 3,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-21 14:20:00',
    lastTestDate: '2026-05-22 12:00:00',
    creationDate: '2024-08-01',
    serviceDate: '2024-08-05',
    dealerId: 'DL-TEST-2',
    dealerName: 'Dealer de Prueba 2',
    latitude: -32.9542,
    longitude: -60.6598,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '4',
    accountNumber: 'CTA-0004',
    clientName: 'CUENTA DEMO 4',
    type: 'Cuenta de Prueba',
    responsiblePerson: 'Usuario de Prueba 4',
    email: 'prueba4@test.com',
    phone: '4444444444',
    address: 'Dirección de Prueba 4',
    city: 'Ciudad de Prueba',
    status: 'suspended',
    situation: 'No Habilitadas',
    signalLevel: 1,
    alarmStatus: 'Desactivado / Abierto',
    lastAlarmDate: '2026-05-20 08:30:15',
    lastTestDate: '2026-05-22 09:00:00',
    creationDate: '2021-04-15',
    serviceDate: '2021-04-20',
    dealerId: 'DL-TEST-1',
    dealerName: 'Dealer de Prueba 1',
    latitude: -34.5772,
    longitude: -58.4061,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '5',
    accountNumber: 'CTA-0005',
    clientName: 'CUENTA EJEMPLO 5',
    type: 'Cuenta de Prueba',
    responsiblePerson: 'Usuario de Prueba 5',
    email: 'prueba5@test.com',
    phone: '5555555555',
    address: 'Dirección de Prueba 5',
    city: 'Ciudad de Prueba',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 4,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-22 17:15:00',
    lastTestDate: '2026-05-22 18:00:00',
    creationDate: '2022-09-10',
    serviceDate: '2022-09-12',
    dealerId: 'DL-TEST-1',
    dealerName: 'Dealer de Prueba 1',
    latitude: -34.5898,
    longitude: -58.3974,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '6',
    accountNumber: 'CTA-0006',
    clientName: 'CUENTA PRUEBA 6',
    type: 'Cuenta de Prueba',
    responsiblePerson: 'Usuario de Prueba 6',
    email: 'prueba6@test.com',
    phone: '6666666666',
    address: 'Dirección de Prueba 6',
    city: 'Ciudad de Prueba',
    status: 'pending',
    situation: 'En Prueba',
    signalLevel: 2,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-22 11:22:33',
    lastTestDate: '2026-05-22 12:00:00',
    creationDate: '2025-01-10',
    serviceDate: '2025-01-12',
    dealerId: 'DL-TEST-1',
    dealerName: 'Dealer de Prueba 1',
    latitude: -34.5898,
    longitude: -58.3974,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  }
];
