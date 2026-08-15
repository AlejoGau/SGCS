//MIGRADO2024
Ext.define('Common.model.IprsConeccionSearchModel', {
  extend: 'Ext.data.Model',
  idProperty: 'Id',
  fields: [
    {
      name: 'Id',
      type: 'int'
    },
    {
      name: 'Name',
      type: 'string'
    },
    {
      name: 'ObjectTypeId',
      type: 'int',
      defaultValue: 3179
    },
    {
      name: 'ObjectTypeName',
      type: 'string',
      defaultValue: 't_iprsconecciones'
    },
    { name: 'iprsc_iprsiid', type: 'int', defaultValue: 0 },
    { name: 'iprsc_ipcidkey', type: 'int', defaultValue: 0 },
    { name: 'iprsc_status', type: 'string' },
    { name: 'iprsc_config', type: 'string' },
    { name: 'iprsc_iduplicado', type: 'int' },
    {
      name: 'iprsc_lastserviceupdate',
      type: 'date',
      dateFormat: 'MS',
      defaultValue: new Date(-62135586000000)
    },
    { name: 'ipc_icodigo', type: 'int', defaultValue: 0 },
    { name: 'ipc_cdescripcion', type: 'string' },
    { name: 'ipc_ireceptor', type: 'int', defaultValue: 0 },
    { name: 'ipc_nestado', type: 'int', defaultValue: 0 },
    {
      name: '_nestado',
      type: 'string',
      convert: function (v, record) {
        switch (record.get('ipc_nestado')) {
          case 1:
            return 'Deshabilitado'
          case 2:
            return 'Habilitado'
        }
      }
    },
    { name: 'ipc_nport', type: 'int', defaultValue: 0 },
    { name: 'ipc_nprotocolo', type: 'int', defaultValue: 0 },
    {
      name: '_nprotocolo',
      type: 'string',
      convert: function (v, record) {
        switch (record.get('ipc_nprotocolo')) {
          case 1:
            return 'TCP'
          case 2:
            return 'UDP'
        }
      }
    },
    { name: 'ipc_crespondeack', type: 'int', defaultValue: 0 },
    { name: 'ipc_itiempoinactividad', type: 'int', defaultValue: 0 },
    { name: 'ipc_cresetxhb', type: 'int', defaultValue: 0 },
    { name: 'ipc_imodemsms', type: 'int' },
    { name: 'ipc_cremotehostip', type: 'string' },
    { name: 'rec_cdll', type: 'string' },
    {
      name: '_rec_cdll',
      type: 'string',
      convert: function (v, record) {
        return record.get('rec_cdll').replace('PacketParser', '')
      }
    },
    { name: 'rec_cConfig', type: 'string' },
    { name: 'rec_cdescripcion', type: 'string' },
    { name: 'rec_cdll', type: 'string' },
    { name: 'rec_iid', type: 'int' },
    { name: 'rec_ntcpip', type: 'int' },
    { name: 'rec_iEsIRS', type: 'int' },
    { name: 'iprs_ccnombre', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    reader: {
      type: 'json',
      rootProperty: 'rows',
      totalProperty: 'total'
    },
    url: '/Rest/search/t_iprsconecciones',
    appendId: false
  }
})
