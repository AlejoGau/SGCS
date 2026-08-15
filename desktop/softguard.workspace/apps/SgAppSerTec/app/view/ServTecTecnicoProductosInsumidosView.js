Ext.define('SgAppSerTec.view.ServTecTecnicoProductosInsumidosView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.servtetecnicoproductoinsumidosview'],
    title : '',
    autoHeight : true,   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],
    columns : [
        
       {
            xtype : 'gridcolumn',            
            header : 'Codigo',
            dataIndex : 'Code',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Producto',
            dataIndex : 'productoName'
        },{
            xtype : 'gridcolumn',            
            header : 'Cantidad disponible',
            dataIndex : 'stt_cant',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Devolver',
            dataIndex : '_devuelve',
            flex: 1,
            getEditor: function(record) {
                
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                    	xtype: 'numberfield',
        				name: 'devolver'	
        			}
                });
                
            }
        },{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-package-go',
                tooltip: 'Devolver a deposito',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtetecnicoproductoinsumidosview');
                    var rec = grid.getStore().getAt(rowIndex); 
                    view.fireEvent('devolveradeposito',rec,view);
                }
            }]
       }
        
        
        
    ],
    
    initComponent: function () {
       

        
   
        this.callParent(arguments);     
      
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
              {
                	xtype : 'combo',
                    margin: '0 5 0 0',
        			fieldLabel : 'Deposito destino',
                    itemId: 'depositodestino',
        			name : 'cue_clinea',
        			displayField : 'Name',
        			valueField : 'Id',
                    queryMode: 'local',
        			flex : 1
        	    },  
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});