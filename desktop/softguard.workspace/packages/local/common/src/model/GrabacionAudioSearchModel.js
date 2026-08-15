//MIGRADO2024
Ext.define('Common.model.GrabacionAudioSearchModel', {
  extend: 'Ext.data.Model',
  idProperty: 'Id',
  fields: [
    { name: 'RowNumber', type: 'int' },
    { name: 'gra_iid', type: 'int' },
    { name: 'gra_iidcuenta', type: 'int' },
    {
      name: 'gra_dfechahora',
      type: 'date',
      dateFormat: 'c', // Usamos el formato ISO
      convert: function (value, record) {
        if (typeof value === 'string') {
          // Convertir el valor ISO a un objeto Date
          const date = new Date(value);

          // Obtener la marca de tiempo en milisegundos
          const timestamp = date.getTime();

          // Obtener la diferencia de la zona horaria en minutos y convertir a formato -HHMM
          const timezoneOffset = date.getTimezoneOffset();
          const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
          const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
          const timezoneString = (timezoneOffset > 0 ? '-' : '+') + offsetHours + offsetMinutes;

          // Construir la cadena en el formato deseado
          return `/Date(${timestamp}${timezoneString})/`;
        }
        return value;
      }
    },
    { name: 'gra_carchivo', type: 'string' },
    { name: 'gra_nduracion', type: 'string' },
    { name: 'gra_iidrecepcion', type: 'string' },
    { name: 'rec_iid', type: 'string' },
    { name: 'rec_iidcuenta', type: 'string' },
    { name: 'rec_calarma', type: 'string' },
    { name: 'rec_czona', type: 'string' },
    { name: 'rec_iusuario', type: 'string' },
    { name: 'rec_tfechahora', type: 'string' },
    { name: 'rec_nestado', type: 'string' },
    { name: 'rec_cContenido', type: 'string' },
    { name: 'rec_tFechaProceso', type: 'string' },
    { name: 'rec_ioperador', type: 'string' },
    { name: 'rec_cObservaciones', type: 'string' },
    { name: 'rec_cTerminal', type: 'string' },
    { name: 'rec_idResolucion', type: 'string' },
    { name: 'rec_idReceptor', type: 'string' },
    { name: 'rec_cCategorizacion', type: 'string' },
    { name: 'rec_iNYR', type: 'string' },
    { name: 'rec_iTE', type: 'string' },
    { name: 'rec_tFechaRecepcion', type: 'string' },
    { name: 'rec_nOrigen', type: 'string' },
    { name: 'rec_idMap', type: 'string' },
    { name: 'rec_idFwd', type: 'string' },
    { name: 'rec_iMinutosEspera', type: 'string' },
    { name: 'rec_iPuerto', type: 'string' },
    { name: 'rec_idLoc', type: 'string' },
    { name: 'cod_ccodigo', type: 'string' },
    { name: 'cod_cdescripcion', type: 'string' },
    { name: 'cod_nalerta', type: 'string' },
    { name: 'cod_nprioridad', type: 'string' },
    { name: 'cod_ntipo', type: 'string' },
    { name: 'cod_nsistema', type: 'string' },
    { name: 'cod_ncolor', type: 'string' },
    { name: 'cod_cSonido', type: 'string' },
    { name: 'cod_nColorLetra', type: 'string' },
    { name: 'cod_nResuelve', type: 'string' },
    { name: 'cod_cGrupo', type: 'string' },
    { name: 'cod_nSms', type: 'string' },
    { name: 'cod_nMail', type: 'string' },
    { name: 'cod_nVideo', type: 'string' },
    { name: 'cod_nManual', type: 'string' },
    { name: 'cod_nMovil', type: 'string' },
    { name: 'cod_nAutoridad', type: 'string' },
    { name: 'cod_nLeeSonido', type: 'string' },
    { name: 'cod_nMultiMonitor', type: 'string' },
    { name: 'cod_idKey', type: 'string' },
    { name: 'cue_clinea', type: 'string' },
    { name: 'cue_ncuenta', type: 'string' },
    { name: 'cue_cnombre', type: 'string' }
  ],
  proxy: {
    type: 'rest',

    reader: {
      type: 'json',
      rootProperty: 'rows',
      totalProperty: 'total'
    },
    url: '/rest/search/p_grabacion_audio',
    appendId: false
  }
});