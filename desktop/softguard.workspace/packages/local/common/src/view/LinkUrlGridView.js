//MIGRADO2024
Ext.define('Common.view.LinkUrlGridView', {
  extend: 'Ext.grid.GridPanel',
  alias: ['widget.linkurlgridview'],
  autoHeight: true,
  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  viewConfig: {
    trackOver: true,
    stripeRows: true,
    loadMask: false
  },
  columns: [
    {
      xtype: 'actioncolumn',
      width: 30,
      items: [
        {
          iconCls: 'icon-linkurl',
          tooltip: 'Ir al link',
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up('linkurlgridview')
            var rec = grid.getStore().getAt(rowIndex)
            view.fireEvent('openlink', rec, grid)
          }
        }
      ]
    },
    {
      xtype: 'actioncolumn',
      width: 30,
      items: [
        {
          iconCls: 'icon-table-edit',
          tooltip: 'Editar',
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up('linkurlgridview')
            var rec = grid.getStore().getAt(rowIndex)
            view.fireEvent('objectedit', rec, grid)
          }
        }
      ]
    },
    {
      xtype: 'gridcolumn',
      header: 'Nombre',
      dataIndex: 'url_cname',
      flex: 1
    },
    {
      xtype: 'gridcolumn',
      header: 'Descripcion',
      dataIndex: 'url_cdescripcion',
      flex: 1
    },
    {
      xtype: 'gridcolumn',
      header: 'Url',
      dataIndex: 'url_curl',
      flex: 1
    }
  ],

  initComponent: function () {
    var comboSearch = [
      ['url_cname', getLocale('Nombre')],
      ['url_cdescripcion', getLocale('Descripcion')],
      ['url_curl', getLocale('Url')]
    ]

    this.onSelectChange = function (selModel, selections) {
      this.down('[action="delete"]').setDisabled(selections.length == 0)
    }

    //

    this.callParent(arguments)
    var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
      dock: 'bottom',
      displayInfo: true
    })
    this.addDocked(pagingtoolbar)

    var toolbar = Ext.create('Ext.toolbar.Toolbar', {
      items: [
        {
          iconCls: 'icon-table-add',
          text: 'Nuevo',
          scope: this,
          action: 'add'
        },
        '-',
        {
          iconCls: 'icon-delete',
          text: 'Eliminar',
          action: 'delete',
          disabled: true,
          scope: this
        },
        '-',
        {
          text: 'Filtros',
          menu: {
            xtype: 'menu',
            width: 280,
            items: [
              {
                xtype: 'panel',
                bodyPadding: 5,
                items: [
                  {
                    xtype: 'combo',
                    queryMode: 'local',
                    itemId: 'fieldName',
                    store: comboSearch,
                    fieldLabel: 'Campo',
                    value: 'url_cname'
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: 'Valor'
                  }
                ]
              }
            ]
          }
        },
        {
          iconCls: 'icon-find',
          text: 'Buscar',
          scope: this,
          action: 'search'
        },
        '-',
        {
          iconCls: 'icon-find',
          text: 'Todos',
          scope: this,
          action: 'getall'
        }
      ] // cierro items
    })

    this.addDocked(toolbar)
  }
})
