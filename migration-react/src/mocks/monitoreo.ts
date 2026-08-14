export type AlarmSeverity =
  | 'panico'
  | 'alarma_cerco'
  | 'tablero_cerrado'
  | 'cerco_activado'
  | 'bateria_baja'
  | 'restablecimiento'
  | 'mantenimiento';

export interface AlarmEvent {
  id: string;
  fechaHora: string;
  cuenta: string;
  estadoCuenta: 'Activado / cerrada' | 'Desactivado / Abierto';
  evento: string;
  severity: AlarmSeverity;
  prioridad: number;
  origen: string;
  usuario: string;
  zona: string;
  operador: string;
  lineaTarjeta: string;
}

export const SEVERITY_LABEL: Record<AlarmSeverity, string> = {
  panico: 'Pánico',
  alarma_cerco: 'Alarma en Cerco',
  tablero_cerrado: 'Tablero Cerrado',
  cerco_activado: 'Cerco Activado',
  bateria_baja: 'Batería Baja en Tablero',
  restablecimiento: 'Restablecimiento Energía Tablero',
  mantenimiento: 'Mantenimiento Vehicular',
};

export const MOCK_ALARM_EVENTS: AlarmEvent[] = [
  {
    id: 'evt-1',
    fechaHora: 'Hoy 08:01:00',
    cuenta: 'CTA-0001 CUENTA PRUEBA 1',
    estadoCuenta: 'Activado / cerrada',
    evento: 'PAN - Pánico',
    severity: 'panico',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 1',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-2',
    fechaHora: 'Hoy 08:04:12',
    cuenta: 'CTA-0002 CUENTA PRUEBA 2',
    estadoCuenta: 'Desactivado / Abierto',
    evento: '#07 - Alarma en Cerco',
    severity: 'alarma_cerco',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 2',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-3',
    fechaHora: 'Hoy 08:06:40',
    cuenta: 'CTA-0003 CUENTA TEST 3',
    estadoCuenta: 'Activado / cerrada',
    evento: '#12 - Batería Baja en Tablero',
    severity: 'bateria_baja',
    prioridad: 2,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 3',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-4',
    fechaHora: 'Hoy 08:10:03',
    cuenta: 'CTA-0004 CUENTA DEMO 4',
    estadoCuenta: 'Activado / cerrada',
    evento: '#02 - Tablero Cerrado',
    severity: 'tablero_cerrado',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 4',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-5',
    fechaHora: 'Hoy 08:12:16',
    cuenta: 'CTA-0005 CUENTA EJEMPLO 5',
    estadoCuenta: 'Desactivado / Abierto',
    evento: '#06 - Cerco Activado',
    severity: 'cerco_activado',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: 'operador.prueba',
    zona: 'Zona de Prueba 5',
    operador: 'Operador Virtual',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-6',
    fechaHora: 'Hoy 08:12:20',
    cuenta: 'CTA-0005 CUENTA EJEMPLO 5',
    estadoCuenta: 'Desactivado / Abierto',
    evento: '#04 - Restablecimiento Energía Tablero',
    severity: 'restablecimiento',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: 'operador.prueba',
    zona: 'Zona de Prueba 5',
    operador: 'Operador Virtual',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-7',
    fechaHora: 'Hoy 08:15:00',
    cuenta: 'CTA-0006 CUENTA PRUEBA 6',
    estadoCuenta: 'Activado / cerrada',
    evento: '_MV - Mantenimiento Vehicular',
    severity: 'mantenimiento',
    prioridad: 3,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 6',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-8',
    fechaHora: 'Hoy 08:18:44',
    cuenta: 'CTA-0007 CUENTA TEST 7',
    estadoCuenta: 'Activado / cerrada',
    evento: '#12 - Batería Baja en Tablero',
    severity: 'bateria_baja',
    prioridad: 2,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 7',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-9',
    fechaHora: 'Hoy 08:20:02',
    cuenta: 'CTA-0008 CUENTA DEMO 8',
    estadoCuenta: 'Desactivado / Abierto',
    evento: 'PAN - Pánico',
    severity: 'panico',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 8',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-10',
    fechaHora: 'Hoy 08:24:31',
    cuenta: 'CTA-0009 CUENTA EJEMPLO 9',
    estadoCuenta: 'Activado / cerrada',
    evento: '#07 - Alarma en Cerco',
    severity: 'alarma_cerco',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 9',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-11',
    fechaHora: 'Hoy 08:30:00',
    cuenta: 'CTA-0010 CUENTA PRUEBA 10',
    estadoCuenta: 'Activado / cerrada',
    evento: '_MV - Mantenimiento Vehicular',
    severity: 'mantenimiento',
    prioridad: 3,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 10',
    operador: '-',
    lineaTarjeta: '-',
  },
  {
    id: 'evt-12',
    fechaHora: 'Hoy 08:33:19',
    cuenta: 'CTA-0011 CUENTA TEST 11',
    estadoCuenta: 'Desactivado / Abierto',
    evento: '#02 - Tablero Cerrado',
    severity: 'tablero_cerrado',
    prioridad: 1,
    origen: 'SG : Evento Interno',
    usuario: '-',
    zona: 'Zona de Prueba 11',
    operador: '-',
    lineaTarjeta: '-',
  },
];
