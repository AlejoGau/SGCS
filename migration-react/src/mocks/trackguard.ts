export interface MobileDevice {
  id: string;
  matricula: string;
  cuenta: string;
  nombreCuenta: string;
  fechaPosicion: string;
  velocidad: number; // in km/h
  status: 'movimiento' | 'detenido' | 'no_actual' | 'alarma' | 'viaje';
  latitude: number;
  longitude: number;
  imei: string;
  phone: string;
  deviceType: 'Vehicular' | 'Personal' | 'Celular (SmartPanics)';
  direccion?: string;
  odometro?: number;
  fechaGps?: string;
  fechaAlerta?: string;
}

export interface TrackGuardEvent {
  id: string;
  deviceMatricula: string;
  deviceName: string;
  eventTime: string;
  eventType: 'pánico' | 'velocidad' | 'geocerca_entrada' | 'geocerca_salida' | 'desconexión';
  details: string;
  severity: 'critical' | 'warning' | 'info';
}

export const MOCK_TRACKGUARD_DEVICES: MobileDevice[] = [
  {
    id: 'd-1',
    matricula: 'MOV-0001',
    cuenta: 'CTA-0001',
    nombreCuenta: 'CUENTA 1',
    fechaPosicion: 'Hoy 20:42:15',
    velocidad: 0,
    status: 'detenido',
    latitude: -34.6037,
    longitude: -58.3816,
    imei: '000000000000001',
    phone: '+54 11 0000-0001',
    deviceType: 'Vehicular',
    direccion: 'Dirección de Prueba 1',
    odometro: 1250,
    fechaGps: 'Hoy 20:42:10',
    fechaAlerta: '-'
  },
  {
    id: 'd-2',
    matricula: 'MOV-0002',
    cuenta: 'CTA-0002',
    nombreCuenta: 'CUENTA PRUEBA 2',
    fechaPosicion: 'Hoy 20:44:30',
    velocidad: 42,
    status: 'movimiento',
    latitude: -34.5898,
    longitude: -58.3974,
    imei: '000000000000002',
    phone: '+54 11 0000-0002',
    deviceType: 'Vehicular',
    direccion: 'Dirección de Prueba 2',
    odometro: 34220,
    fechaGps: 'Hoy 20:44:25',
    fechaAlerta: '-'
  },
  {
    id: 'd-3',
    matricula: 'MOV-0003',
    cuenta: 'CTA-0003',
    nombreCuenta: 'CUENTA TEST 3',
    fechaPosicion: 'Hoy 20:43:00',
    velocidad: 65,
    status: 'movimiento',
    latitude: -34.6157,
    longitude: -58.4333,
    imei: '000000000000003',
    phone: '+54 11 0000-0003',
    deviceType: 'Vehicular',
    direccion: 'Dirección de Prueba 3',
    odometro: 9840,
    fechaGps: 'Hoy 20:42:55',
    fechaAlerta: '-'
  },
  {
    id: 'd-4',
    matricula: 'MOV-0004',
    cuenta: 'CTA-0004',
    nombreCuenta: 'CUENTA DEMO 4',
    fechaPosicion: '26/01/2023 17:15:41',
    velocidad: 0,
    status: 'no_actual',
    latitude: -34.5367,
    longitude: -58.4686,
    imei: '000000000000004',
    phone: '+54 11 0000-0004',
    deviceType: 'Vehicular',
    direccion: 'Dirección de Prueba 4',
    odometro: 145000,
    fechaGps: '26/01/2023 17:15:35',
    fechaAlerta: '-'
  },
  {
    id: 'd-5',
    matricula: 'MOV-0005',
    cuenta: 'CTA-0005',
    nombreCuenta: 'CUENTA EJEMPLO 5',
    fechaPosicion: 'Hoy 20:41:10',
    velocidad: 18,
    status: 'movimiento',
    latitude: -34.6096,
    longitude: -58.4042,
    imei: '000000000000005',
    phone: '+54 11 0000-0005',
    deviceType: 'Celular (SmartPanics)',
    direccion: 'Dirección de Prueba 5',
    odometro: 120,
    fechaGps: 'Hoy 20:41:05',
    fechaAlerta: '-'
  },
  {
    id: 'd-6',
    matricula: 'MOV-0006',
    cuenta: 'CTA-0006',
    nombreCuenta: 'CUENTA PRUEBA 6',
    fechaPosicion: '25/01/2023 16:08:42',
    velocidad: 0,
    status: 'no_actual',
    latitude: -34.6296,
    longitude: -58.3702,
    imei: '000000000000006',
    phone: '+54 11 0000-0006',
    deviceType: 'Personal',
    direccion: 'Dirección de Prueba 6',
    odometro: 40,
    fechaGps: '25/01/2023 16:08:35',
    fechaAlerta: '-'
  },
  {
    id: 'd-7',
    matricula: 'MOV-0007',
    cuenta: 'CTA-0007',
    nombreCuenta: 'CUENTA 7',
    fechaPosicion: 'Hoy 20:30:00',
    velocidad: 0,
    status: 'detenido',
    latitude: -34.5686,
    longitude: -58.4419,
    imei: '000000000000007',
    phone: '+54 11 0000-0007',
    deviceType: 'Celular (SmartPanics)',
    direccion: 'Dirección de Prueba 7',
    odometro: 550,
    fechaGps: 'Hoy 20:29:55',
    fechaAlerta: '-'
  },
  {
    id: 'd-8',
    matricula: 'MOV-0008',
    cuenta: 'CTA-0008',
    nombreCuenta: 'CUENTA TEST 8',
    fechaPosicion: '08/06/2023 13:04:42',
    velocidad: 0,
    status: 'no_actual',
    latitude: -34.6017,
    longitude: -58.4437,
    imei: '000000000000008',
    phone: '+54 11 0000-0008',
    deviceType: 'Vehicular',
    direccion: 'Dirección de Prueba 8',
    odometro: 98120,
    fechaGps: '08/06/2023 13:04:35',
    fechaAlerta: '-'
  },
  {
    id: 'd-9',
    matricula: 'MOV-0009',
    cuenta: 'CTA-0009',
    nombreCuenta: 'CUENTA DEMO 9',
    fechaPosicion: '05/06/2020 10:29:00',
    velocidad: 100,
    status: 'viaje',
    latitude: -34.6417,
    longitude: -58.5237,
    imei: '000000000000009',
    phone: '+54 11 0000-0009',
    deviceType: 'Vehicular',
    direccion: 'Dirección de Prueba 9',
    odometro: 215400,
    fechaGps: '05/06/2020 10:28:55',
    fechaAlerta: '-'
  },
  {
    id: 'd-10',
    matricula: 'MOV-0010',
    cuenta: 'CTA-0010',
    nombreCuenta: 'CUENTA EJEMPLO 10',
    fechaPosicion: 'Hoy 20:44:50',
    velocidad: 0,
    status: 'alarma',
    latitude: -34.5823,
    longitude: -58.4117,
    imei: '000000000000010',
    phone: '+54 11 0000-0010',
    deviceType: 'Personal',
    direccion: 'Dirección de Prueba 10',
    odometro: 840,
    fechaGps: 'Hoy 20:44:45',
    fechaAlerta: 'Hoy 20:44:50'
  }
];

export const MOCK_TRACKGUARD_EVENTS: TrackGuardEvent[] = [
  {
    id: 'ev-1',
    deviceMatricula: 'MOV-0010',
    deviceName: 'CUENTA EJEMPLO 10',
    eventTime: '20:44:50',
    eventType: 'pánico',
    details: 'Pánico de prueba presionado por el operador',
    severity: 'critical'
  },
  {
    id: 'ev-2',
    deviceMatricula: 'MOV-0009',
    deviceName: 'CUENTA DEMO 9',
    eventTime: '20:40:15',
    eventType: 'velocidad',
    details: 'Exceso de velocidad de prueba: 100 km/h (Límite: 80 km/h)',
    severity: 'warning'
  },
  {
    id: 'ev-3',
    deviceMatricula: 'MOV-0002',
    deviceName: 'CUENTA PRUEBA 2',
    eventTime: '20:35:12',
    eventType: 'geocerca_entrada',
    details: 'Ingreso a geocerca de prueba: Zona de Prueba 2',
    severity: 'info'
  },
  {
    id: 'ev-4',
    deviceMatricula: 'MOV-0003',
    deviceName: 'CUENTA TEST 3',
    eventTime: '20:15:30',
    eventType: 'geocerca_salida',
    details: 'Salida de geocerca de prueba: Zona de Prueba 3',
    severity: 'info'
  }
];
