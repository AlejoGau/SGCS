//MIGRADO2024
Ext.define('Common.view.ServTecHistoricoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.servtechistoricogridview'],
    title : 'Templates',
    autoHeight : true,  
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'datecolumn',            
            header : 'Fecha',
            dataIndex : 'stl_tFechaHora',
            flex: 1,
            format: 'd/m/Y H:i:s'
        },{
            xtype : 'gridcolumn',            
            header : 'Observacion',
            dataIndex : 'stl_cObservacion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Accion',
            dataIndex : 'stl_cAccion',
            flex: 1,
            renderer:function (value, field, record) {
                return getLocale(value);
            }
		}
        
    ],
    
    initComponent: function () {
       
        //this.addEvents('productSelected');
      
    
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
              
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});