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
    matricula: 'SGI-0014',
    cuenta: 'TELECOM-1',
    nombreCuenta: 'TELECOM',
    fechaPosicion: 'Hoy 20:42:15',
    velocidad: 0,
    status: 'detenido',
    latitude: -34.6037,
    longitude: -58.3816, // Obelisco
    imei: '862590038827110',
    phone: '+54 11 5530-9900',
    deviceType: 'Vehicular',
    direccion: 'Av. Corrientes 1050, Ciudad Autónoma de Buenos Aires, Argentina',
    odometro: 1250,
    fechaGps: 'Hoy 20:42:10',
    fechaAlerta: '-'
  },
  {
    id: 'd-2',
    matricula: 'SGI-0132',
    cuenta: 'VIRLOC-1',
    nombreCuenta: 'VIRLOC TEST',
    fechaPosicion: 'Hoy 20:44:30',
    velocidad: 42,
    status: 'movimiento',
    latitude: -34.5898,
    longitude: -58.3974, // Recoleta
    imei: '862590038827220',
    phone: '+54 11 5530-9911',
    deviceType: 'Vehicular',
    direccion: 'Av. del Libertador 2100, Recoleta, CABA, Argentina',
    odometro: 34220,
    fechaGps: 'Hoy 20:44:25',
    fechaAlerta: '-'
  },
  {
    id: 'd-3',
    matricula: 'KTW125D',
    cuenta: 'SGI-0157',
    nombreCuenta: 'VIRLOC TEST 2',
    fechaPosicion: 'Hoy 20:43:00',
    velocidad: 65,
    status: 'movimiento',
    latitude: -34.6157,
    longitude: -58.4333, // Caballito
    imei: '862590038827330',
    phone: '+54 11 5530-9922',
    deviceType: 'Vehicular',
    direccion: 'Av. Rivadavia 4900, Caballito, CABA, Argentina',
    odometro: 9840,
    fechaGps: 'Hoy 20:42:55',
    fechaAlerta: '-'
  },
  {
    id: 'd-4',
    matricula: 'abc258',
    cuenta: 'LPN-5544',
    nombreCuenta: 'CAMION 25',
    fechaPosicion: '26/01/2023 17:15:41',
    velocidad: 0,
    status: 'no_actual',
    latitude: -34.5367,
    longitude: -58.4686, // Vicente Lopez
    imei: '862590038827440',
    phone: '+54 11 5530-9933',
    deviceType: 'Vehicular',
    direccion: 'Av. Maipú 1200, Vicente López, Buenos Aires, Argentina',
    odometro: 145000,
    fechaGps: '26/01/2023 17:15:35',
    fechaAlerta: '-'
  },
  {
    id: 'd-5',
    matricula: 'ppp888',
    cuenta: 'SVT-0909',
    nombreCuenta: 'SAVE ME MOVIL',
    fechaPosicion: 'Hoy 20:41:10',
    velocidad: 18,
    status: 'movimiento',
    latitude: -34.6096,
    longitude: -58.4042, // Once
    imei: '862590038827550',
    phone: '+54 11 5530-9944',
    deviceType: 'Celular (SmartPanics)',
    direccion: 'Av. Pueyrredón 300, Once, CABA, Argentina',
    odometro: 120,
    fechaGps: 'Hoy 20:41:05',
    fechaAlerta: '-'
  },
  {
    id: 'd-6',
    matricula: 'BOBBY-1',
    cuenta: 'CPN-5006',
    nombreCuenta: 'BOBBY',
    fechaPosicion: '25/01/2023 16:08:42',
    velocidad: 0,
    status: 'no_actual',
    latitude: -34.6296,
    longitude: -58.3702, // Constitucion
    imei: '862590038827660',
    phone: '+54 11 5530-9955',
    deviceType: 'Personal',
    direccion: 'Av. Brasil 1100, Constitución, CABA, Argentina',
    odometro: 40,
    fechaGps: '25/01/2023 16:08:35',
    fechaAlerta: '-'
  },
  {
    id: 'd-7',
    matricula: 'MAY-1126',
    cuenta: 'SP GIANNA',
    nombreCuenta: 'SP GIANNA',
    fechaPosicion: 'Hoy 20:30:00',
    velocidad: 0,
    status: 'detenido',
    latitude: -34.5686,
    longitude: -58.4419, // Belgrano
    imei: '862590038827770',
    phone: '+54 11 5530-9966',
    deviceType: 'Celular (SmartPanics)',
    direccion: 'Av. Cabildo 2200, Belgrano, CABA, Argentina',
    odometro: 550,
    fechaGps: 'Hoy 20:29:55',
    fechaAlerta: '-'
  },
  {
    id: 'd-8',
    matricula: 'SGI-2215',
    cuenta: 'CAMION CAU',
    nombreCuenta: 'CAMION DE CAUDALES - 1',
    fechaPosicion: '08/06/2023 13:04:42',
    velocidad: 0,
    status: 'no_actual',
    latitude: -34.6017,
    longitude: -58.4437, // Villa Crespo
    imei: '862590038827880',
    phone: '+54 11 5530-9977',
    deviceType: 'Vehicular',
    direccion: 'Av. Corrientes 5200, Villa Crespo, CABA, Argentina',
    odometro: 98120,
    fechaGps: '08/06/2023 13:04:35',
    fechaAlerta: '-'
  },
  {
    id: 'd-9',
    matricula: 'AMS-5043',
    cuenta: 'AM SEGUR',
    nombreCuenta: 'AM SEGURIDAD',
    fechaPosicion: '05/06/2020 10:29:00',
    velocidad: 100,
    status: 'viaje',
    latitude: -34.6417,
    longitude: -58.5237, // Liniers
    imei: '862590038827990',
    phone: '+54 11 5530-9988',
    deviceType: 'Vehicular',
    direccion: 'Av. Rivadavia 11500, Liniers, CABA, Argentina',
    odometro: 215400,
    fechaGps: '05/06/2020 10:28:55',
    fechaAlerta: '-'
  },
  {
    id: 'd-10',
    matricula: 'TRG-0002',
    cuenta: 'TRINERGIA',
    nombreCuenta: 'TRINERGIA MOVIL',
    fechaPosicion: 'Hoy 20:44:50',
    velocidad: 0,
    status: 'alarma',
    latitude: -34.5823,
    longitude: -58.4117, // Palermo
    imei: '862590038828000',
    phone: '+54 11 5530-9999',
    deviceType: 'Personal',
    direccion: 'Av. Santa Fe 3200, Palermo, CABA, Argentina',
    odometro: 840,
    fechaGps: 'Hoy 20:44:45',
    fechaAlerta: 'Hoy 20:44:50'
  }
];

export const MOCK_TRACKGUARD_EVENTS: TrackGuardEvent[] = [
  {
    id: 'ev-1',
    deviceMatricula: 'TRG-0002',
    deviceName: 'TRINERGIA MOVIL',
    eventTime: '20:44:50',
    eventType: 'pánico',
    details: 'Pánico presionado por el operador remoto',
    severity: 'critical'
  },
  {
    id: 'ev-2',
    deviceMatricula: 'AMS-5043',
    deviceName: 'AM SEGURIDAD',
    eventTime: '20:40:15',
    eventType: 'velocidad',
    details: 'Exceso de velocidad registrado: 100 km/h (Límite: 80 km/h)',
    severity: 'warning'
  },
  {
    id: 'ev-3',
    deviceMatricula: 'SGI-0132',
    deviceName: 'VIRLOC TEST',
    eventTime: '20:35:12',
    eventType: 'geocerca_entrada',
    details: 'Ingreso a geocerca: Zona Norte Depósito 2',
    severity: 'info'
  },
  {
    id: 'ev-4',
    deviceMatricula: 'KTW125D',
    deviceName: 'VIRLOC TEST 2',
    eventTime: '20:15:30',
    eventType: 'geocerca_salida',
    details: 'Salida de geocerca: Parque Industrial Pilar',
    severity: 'info'
  }
];
