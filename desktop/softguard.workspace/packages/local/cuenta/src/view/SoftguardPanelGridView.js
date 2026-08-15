Ext.define('Cuenta.view.SoftguardPanelGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.panelgridview',
    autoHeight: true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'), 
    columns: [
        {
            xtype: 'actioncolumn',
            width: 50,
            itemId: 'delete',
            items: [{
                iconCls: 'icon-delete',
                tooltip: getLocale('Eliminar'),
                handler: function (grid, rowIndex, colIndex, item, event) {
                    var view = grid.up('panelgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('eliminar', rec, view)
                }
            }
            ]
        },
        {
            xtype: 'gridcolumn',
            header: 'Panel',
            dataIndex: 'pan_cdescripcion',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            header: 'Comandos',
            dataIndex: 'rec_cdescripcion',
            flex: 1
        }
    ],

    initComponent: function () {
        this.callParent(arguments);


        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });

        this.addDocked(pagingtoolbar);


        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Nuevo panel',
                    iconCls: 'icon-panel',
                    itemId: 'nuevo',
                    action: 'new',
                    closable: true
                }
            ]// cierro items
        });

        this.addDocked(toolbar);
    } // cierro init
});