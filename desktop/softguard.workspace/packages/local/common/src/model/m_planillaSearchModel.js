//MIGRADO2024
Ext.define('Common.model.m_planillaSearchModel', {
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
      defaultValue: 3097
    },
    {
      name: 'ObjectTypeName',
      type: 'string',
      defaultValue: 'm_planillas'
    },
    { name: 'pla_cDescripcion', type: 'string' },
    { name: 'pla_cNombreTabla', type: 'string' },
    {
      name: '_Descripcion',
      type: 'string',
      convert: function (v, record) {
        var m = record.get('pla_cDescripcion')
        if (m) {
          return m.replace(/^\s+|\s+$/g, '')
        }
      }
    }
  ],

  proxy: {
    type: 'rest',
    reader: {
      type: 'json',
      rootProperty: 'rows',
      totalProperty: 'total'
    },
    url: '/Rest/m_planillas/',
    appendId: false
  }
})
