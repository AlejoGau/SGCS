//MIGRADO2024
Ext.define('Common.view.SoftguardContactoGridView', {
  extend: 'Ext.grid.GridPanel',
  alias: 'widget.gridphones',
  title: 'Telefonos',
  autoHeight: true,
  columns: [
    {
      xtype: 'actioncolumn',
      width: 30,
      items: [
        {
          iconCls: 'icon-telefonoEdit',
          tooltip: getLocale('Modificar datos'),
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up('gridphones')
            var rec = grid.getStore().getAt(rowIndex)
            view.fireEvent('objectedit', rec, view)
          }
        }
      ]
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_norden',
      header: 'Orden',
      sortable: true,
      width: 40
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_cnombre',
      header: 'Nombre',
      sortable: true,
      flex: 1
    },
    {
      xtype: 'gridcolumn',
      header: 'Pre',
      sortable: false,
      dataIndex: 'tel_cpredigito',
      width: 40
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_ctelefono',
      header: 'Teléfono',
      sortable: true,
      width: 100
    },
    {
      xtype: 'gridcolumn',
      header: 'Post',
      sortable: false,
      dataIndex: 'tel_cpostdigito',
      width: 40
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_clista',
      header: 'Lista',
      sortable: true,
      renderer: function (value) {
        var store = Ext.data.StoreManager.lookup('TablaListasEmergencia')
        if (store != undefined) {
          var record = store.findRecord('Codigo', value)
          if (record == undefined) return ''
          else return record.get('Descripcion')
        }
      },
      width: 80
    },
    {
      xtype: 'gridcolumn',
      header: 'Clave',
      sortable: false,
      dataIndex: 'tel_cclave',
      itemId: 'tel_cclave',
      hidden: true,
      width: 80
    },
    {
      xtype: 'actioncolumn',
      width: 25,
      header: '',
      items: [
        {
          iconCls: 'icon-comment',
          handler: function (grid, rowIndex, colIndex) {
            var view = grid.up('gridphones')
            var rec = grid.getStore().getAt(rowIndex)
            var myWindow = Ext.widget('window', {
              title: 'Observación',
              height: 420,
              width: 400,
              modal: true,
              items: {
                xtype: 'box',
                padding: 5,
                html: rec.get('tel_cobservacion')
              },
              layout: 'fit'
            }).show()
          }
        }
      ]
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_cobservacion',
      header: 'Observación',
      sortable: true,
      hidden: false,
      flex: 1
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_nsp',
      header: 'Tipo contacto',
      renderer: function (value) {
        if (value == 0) return '' //no muestro el seleccione

        //var store = Ext.data.StoreManager.get('SiNoStore');
        //	var record = store.findRecord('Value', value);
        if (value == 1) return getLocale('Smartpanics/Vigicontrol')
        else if (value == 2) return getLocale('Comun')
        else if (value == 3) return getLocale('Ambos')
        else if (value == 4) return getLocale('Oculto')
        else return ''
      },
      flex: 1
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_ndiscado',
      header: 'Discado',
      queryMode: 'Local',
      sortable: true,
      renderer: function (value) {
        var store = Ext.data.StoreManager.lookup('telefonoDiscadoStore')
        var record = store.findRecord('Value', value)
        if (record == undefined) return ''
        else return record.get('Name')
      },
      width: 80
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_cpredigito',
      header: 'Pre digito',
      sortable: true,
      hidden: true,
      width: 70
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_cpostdigito',
      header: 'Post digito',
      sortable: true,
      hidden: true,
      width: 70
    },

    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_ntr',
      header: 'TR',
      sortable: true,
      hidden: true,
      renderer: function (value) {
        var store = Ext.data.StoreManager.get('SiNoStore')
        var record = store.findRecord('Value', value)
        if (record == undefined) return ''
        else return record.get('Name')
      },
      width: 30
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'tel_nsms',
      header: 'Sms',
      sortable: true,
      hidden: true,
      renderer: function (value) {
        var store = Ext.data.StoreManager.get('SiNoStore')
        var record = store.findRecord('Value', value)
        if (record == undefined) return ''
        else return record.get('Name')
      },
      width: 30
    }
  ],
  initComponent: function () {
    this.callParent(arguments)
    //this.addEvents('cuentaselected','objectedit');
    this.onSelectChange = function (selModel, selections) {
      this.down('button[action=delete]').setDisabled(selections.length === 0)
      this.down('button[action=up]').setDisabled(selections.length === 0)
      this.down('button[action=down]').setDisabled(selections.length === 0)
    }

    var toolbar = Ext.create('Ext.toolbar.Toolbar', {
      items: [
        {
          text: 'Guardar',
          iconCls: 'save',
          action: 'save',
          hidden: true // dedalo 10/11 oculto porque guarda el form de popup y este boton no hace nada
        },
        {
          text: 'Actualizar',
          itemId: 'actualizar',
          iconCls: 'x-tbar-loading',
          tooltip: 'Actualizar',
          handler: function () {
            var view = this.up('gridphones')
            var record = view.record
            var _ObjectId = record.get('cue_iid')
            var store = view.getStore()
            store.load({ ObjectId: _ObjectId, view: view, store: store })
          }
        },
        { xtype: 'tbseparator' },
        {
          iconCls: 'icon-add',
          text: 'Agregar',
          action: 'add'
        },
        {
          iconCls: 'icon-delete',
          text: 'Eliminar',
          disabled: true,
          itemId: 'delete',
          action: 'delete'
        },
        { xtype: 'tbseparator' },
        {
          iconCls: 'icon-arrow_up',
          text: 'Subir',
          disabled: true,
          itemId: 'up',
          action: 'up'
        },
        {
          iconCls: 'icon-arrow_down',
          text: 'Bajar',
          disabled: true,
          itemId: 'down',
          action: 'down'
        },
        '-',
        {
          iconCls: 'icon-add',
          text: 'Importar desde una cuenta',
          action: 'copyphones'
        } /*,{ xtype: 'tbseparator' },
                {
                    iconCls: '',
                    text: 'Plantillas',
                    disabled: false,
                    action: 'plantillas'
                }*/
      ] // cierro items
    })

    this.addDocked(toolbar)
  } // cierro init
})
