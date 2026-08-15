//MIGRADO2024
Ext.define('Common.model.TaxonomyMasterTreeModel', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [
    {
      name: 'Id',
      type: 'int'
    },
    {
      name: 'id',
      type: 'int',
      mapping: 'Id'
    },
    {
      name: 'text',
      type: 'string',
      mapping: 'Name'
    },
    {
      name: 'qtip',
      type: 'string',
      convert: function (v, r) {
        return 'Id: ' + r.data.id
      }
    },
    {
      name: 'IsSecurity',
      type: 'bool'
    },
    {
      name: 'checked',
      type: 'bool',
      defaultValue: false
    },
    {
      name: 'parentId',
      type: 'int',
      mapping: 'Parent'
    },
    {
      name: 'leaf',
      type: 'bool',
      defaultValue: false
    },
    {
      name: 'expanded',
      type: 'bool',
      defaultValue: false
    },
    {
      name: 'ObjectTypeName',
      type: 'string',
      defaultValue: 'Taxonomy'
    },
    {
      name: 'ObjectId',
      type: 'int',
      mapping: 'Id'
    },
    {
      name: 'root',
      type: 'bool',
      defaultValue: false
    }
  ],
  proxy: {
    type: 'taxonomymastertreeproxy',
    url: '/Rest/Taxonomy/',
    appendId: false
  }
})
