//MIGRADO2024
Ext.define('Common.model.t_linkurlModel', {
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
      defaultValue: 3085
    },
    {
      name: 'ObjectTypeName',
      type: 'string',
      defaultValue: 't_observaciones'
    },
    { name: 'url_idKey', type: 'int' },
    { name: 'url_cname', type: 'string' },
    { name: 'url_cdescripcion', type: 'string' },
    { name: 'url_curl', type: 'string' }
  ],

  proxy: {
    type: 'rest',
    url: '/Rest/t_linkurl/',
    appendId: true
  }
})
