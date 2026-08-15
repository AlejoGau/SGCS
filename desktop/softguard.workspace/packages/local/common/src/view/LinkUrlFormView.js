//MIGRADO2024
Ext.define('Common.view.LinkUrlFormView', {
  extend: 'Ext.form.Panel',
  alias: ['widget.linkurlformview'],
  preventHeader: true,
  frame: true,
  border: 0,
  fieldDefaults: {
    labelAlign: 'left',
    labelWidth: 100,
    enforceMaxLength: true,
    anchor: '100%'
  },
  items: [
    {
      xtype: 'textfield',
      name: 'url_cname',
      fieldLabel: 'Nombre'
    },
    {
      xtype: 'textareafield',
      name: 'url_cdescripcion',
      fieldLabel: 'Descripcion'
    },
    {
      xtype: 'textfield',
      name: 'url_curl',
      fieldLabel: 'Url'
      //   vtype: 'url'
    }
  ],

  initComponent: function () {
    this.callParent()

    var toolbar = Ext.create('Ext.toolbar.Toolbar', {
      items: [
        {
          iconCls: 'icon-table-save',
          text: 'Guardar',
          scope: this,
          action: 'save',
          formBind: true
        }
      ] // cierro items
    })
    this.addDocked(toolbar)
  } // cierro init
})
