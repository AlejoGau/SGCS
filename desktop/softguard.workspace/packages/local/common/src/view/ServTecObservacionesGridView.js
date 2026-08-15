//MIGRADO2024
Ext.define('Common.view.ServTecObservacionesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.servtecobservacionesgridview'],
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
                 {
                	text : 'Nueva observacion',
                    action: 'add',
                    itemId: 'add',
                    iconCls: 'icon-historial',
                    disabled: false
        		},{
                    text : 'Enviar Observaciones',
                    action: 'send',
                    itemId: 'send',
                    iconCls : 'icon-email'
            	},"->",{
                    text : 'Imprimir',
                    action: 'imprimir',
                    itemId: 'imprimir',
                    iconCls : 'icon-printer'
            	}
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});