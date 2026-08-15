Ext.define('Trackguard.view.GeocercaGroupGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.geocercagroupgridview',
    itemId: 'geocercagroupgridview',
    title: 'Geocerca Group',
    ignoreDirty: true,
    autoHeight: true,
    selType: 'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: 'MULTI'
    },
    columns: [
        {
            dataIndex: 'Id',
            header: 'Id',
            sortable: true,
            flex:1,
            hidden:true
        },{
            dataIndex: 'grg_cdescripcion',
            header: 'Nombre',
            sortable: true,
            flex:1
        }
    ],

    initComponent: function() {
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    defaultValue: getLocale('Nombre')
                },
                {
                    iconCls: 'icon-search',
                    text: 'Buscar',
                    action: 'btnSearch'
                },
                {
                    text: 'Mostrar',
                    action: 'btnMostrar',
                    enableToggle: true
                }
            ]
        }); 
        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        this.addDocked(toolbar);   
    }
});
