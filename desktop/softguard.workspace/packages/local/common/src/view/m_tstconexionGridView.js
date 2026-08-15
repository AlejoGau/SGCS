//MIGRADO2024
Ext.define('Common.view.m_tstconexionGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.m_tstconexiongridview'],
    autoHeight : true,
    activeHelp:true,
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-test',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('m_tstconexiongridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
            header : 'Conexión',
            dataIndex : 'ipc_cdescripcion',					
            flex:1
        },{
            xtype : 'gridcolumn',
            header : 'Alarma esperada',
            dataIndex : 'txc_cAlarmaEsperada',            		
            width:150
        },
        {
            xtype : 'gridcolumn',
            header : 'Alarma a generar',
            dataIndex : 'txc_cAlarmaAGenerar',                	
            flex:1
        },
        {
            xtype : 'gridcolumn',
            header : 'Alarma autoprocesa',
            dataIndex : 'txc_cAlarmaAutoprocesa',                	
            flex:1
        }
    ],
    
    initComponent: function () {
        this.callParent(arguments); 
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls : 'icon-test',
                    text    : 'Nuevo control',
                    itemId: 'new',
                    action  : 'new',
                // hidden:true
                }
            ]// cierro items
        }); 
        
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
    } 
});