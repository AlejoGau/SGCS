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
  { code: 'MON-ALM', name: 'Monitoreo Alarma 24Hs GPRS/IP', price: 35.00, vatRate: 0.21 },
  { code: 'MON-VID', name: 'Video-Verificación de Eventos', price: 15.00, vatRate: 0.21 },
  { code: 'SMP-FAM', name: 'SmartPanics Pack Familiar', price: 12.50, vatRate: 0.21 },
  { code: 'TRK-VEH', name: 'SmartTrack - Rastreo GPS', price: 18.00, vatRate: 0.21 },
  { code: 'SER-TEC', name: 'Servicio Técnico Especializado', price: 8.00, vatRate: 0.21 }
];

export const MOCK_CHANGE_REQUESTS: ChangeRequest[] = [
  { id: '1', accountNumber: '123-0000', clientName: 'EVENTOS RECEPTOR DEITRES tst', fieldChanged: 'Dirección', oldValue: 'Test de prueba', newValue: 'Calle 123, Localidad 32137887', requestDate: '2026-05-22 10:15' },
  { id: '2', accountNumber: 'BOS-0000', clientName: 'EVENTOS DEL RECEPTOR', fieldChanged: 'Teléfono', oldValue: '1145456600', newValue: '1145456699', requestDate: '2026-05-22 14:30' }
];

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1',
    accountNumber: 'BOS-0000',
    clientName: 'EVENTOS DEL RECEPTOR',
    type: 'Monitoreo Corporativo',
    responsiblePerson: 'BOS - BOSCH',
    email: 'soporte@bosch.com',
    phone: '1145456600',
    address: 'VICENTE LOPEZ 2443 (ALTA)',
    city: 'OLAVARRIA (ABONO FULL)',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 4,
    alarmStatus: 'Desactivado / Abierto',
    lastAlarmDate: '2026-05-22 20:10:45',
    lastTestDate: '2026-05-22 20:00:00',
    creationDate: '2018-01-22',
    serviceDate: '2023-09-20',
    dealerId: 'BOS',
    dealerName: 'BOS - BOSCH',
    latitude: -16.92455333121742,
    longitude: -64.2060578,
    zones: [
      { number: '001', name: 'Infrarrojo Recepción Principal', partition: 'P1', type: 'Instantánea' },
      { number: '002', name: 'Magnético Puerta Acceso', partition: 'P1', type: 'Demorada' }
    ],
    users: [
      { id: 'u1', usu_icodigo: 101, usu_cnombre: 'Fernando Gómez', usu_cclave: 'sec9012', usu_mobservacion: 'Gerente Técnico', usu_ntipo: 1, usu_cidextendido: 'EXT-101' }
    ],
    geocercas: [
      { id: 'g1', Name: 'Depósito Principal', GeoType: 'I', Status: '1', Address: 'Av. Costanera 1200', latitude: -16.924, longitude: -64.206, radius: 250 }
    ],
    services: []
  },
  {
    id: '2',
    accountNumber: '123-0000',
    clientName: 'EVENTOS RECEPTOR DEITRES tst',
    type: 'Monitoreo Residencial',
    responsiblePerson: 'Gautier Alejo',
    email: 'admin@deitres.com',
    phone: '1145456600',
    address: 'Test de prueba',
    city: '32137887',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 2,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-22 19:45:12',
    lastTestDate: '2026-05-22 18:30:00',
    creationDate: '2020-03-11',
    serviceDate: '2024-05-15',
    dealerId: 'DL-01',
    dealerName: 'Dealer Buenos Aires Centro',
    latitude: -34.5898,
    longitude: -58.3974,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '3',
    accountNumber: 'ALE-0000',
    clientName: 'GREGTEST',
    type: 'Monitoreo Comercial',
    responsiblePerson: 'Gregorio',
    email: 'gregtest@gmail.com',
    phone: '32404324',
    address: 'calle',
    city: 'calle',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 3,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-21 14:20:00',
    lastTestDate: '2026-05-22 12:00:00',
    creationDate: '2024-08-01',
    serviceDate: '2024-08-05',
    dealerId: 'DL-02',
    dealerName: 'Dealer Santa Fe Oeste',
    latitude: -32.9542,
    longitude: -60.6598,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '4',
    accountNumber: '_MP-0000',
    clientName: 'RECEPTORA',
    type: 'Monitoreo Corporativo',
    responsiblePerson: 'Soporte',
    email: 'receptora@softguard.com',
    phone: '32404324 / 343...',
    address: 'VICENTE LOPEZ 2443 (ALTA)',
    city: 'OLAVARRIA (ABONO FULL)',
    status: 'suspended',
    situation: 'No Habilitadas',
    signalLevel: 1,
    alarmStatus: 'Desactivado / Abierto',
    lastAlarmDate: '2026-05-20 08:30:15',
    lastTestDate: '2026-05-22 09:00:00',
    creationDate: '2021-04-15',
    serviceDate: '2021-04-20',
    dealerId: 'DL-01',
    dealerName: 'Dealer Buenos Aires Centro',
    latitude: -34.5772,
    longitude: -58.4061,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '5',
    accountNumber: 'SOL-0000',
    clientName: 'COLETORA DE INVALIDAS',
    type: 'Monitoreo Corporativo',
    responsiblePerson: 'Admin',
    email: 'sol@softguard.com',
    phone: '1155837799',
    address: 'Urquiza 243',
    city: 'Flores',
    status: 'active',
    situation: 'Habilitadas',
    signalLevel: 4,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-22 17:15:00',
    lastTestDate: '2026-05-22 18:00:00',
    creationDate: '2022-09-10',
    serviceDate: '2022-09-12',
    dealerId: 'DL-01',
    dealerName: 'Dealer Buenos Aires Centro',
    latitude: -34.5898,
    longitude: -58.3974,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  },
  {
    id: '6',
    accountNumber: 'INT-0000',
    clientName: 'COLECTORA DE INVALIDAS',
    type: 'Monitoreo Corporativo',
    responsiblePerson: 'Admin',
    email: 'int@softguard.com',
    phone: '01122334455',
    address: 'Test de qe',
    city: 'Flores',
    status: 'pending',
    situation: 'En Prueba',
    signalLevel: 2,
    alarmStatus: 'Activado / cerrado',
    lastAlarmDate: '2026-05-22 11:22:33',
    lastTestDate: '2026-05-22 12:00:00',
    creationDate: '2025-01-10',
    serviceDate: '2025-01-12',
    dealerId: 'DL-01',
    dealerName: 'Dealer Buenos Aires Centro',
    latitude: -34.5898,
    longitude: -58.3974,
    zones: [],
    users: [],
    geocercas: [],
    services: []
  }
];
