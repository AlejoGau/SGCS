Ext.define('SmartTrack.view.VCSeguimientoRutaGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.vcseguimientorutagridview'],
    title : 'Rutas',
    autoHeight : true,
    columns : [{
                    xtype:'actioncolumn',
                  
                    width:20,
                    items: [{
                        iconCls: 'icon-eye',
                        tooltip: getLocale('Mostrar'),
                        itemId: 'icoseguimiento', 
                        handler: function(grid, rowIndex, colIndex,item, event, rec, row) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var view = grid.up('vcseguimientorutagridview');
                            view.fireEvent('mostrarRonda',rec,view);
                            
                        
                        }
                    }]            
                },{
                    xtype : 'gridcolumn',            
                    header : '',
                    dataIndex : 'Name',
        			flex:1		
                }
    ],
    
    initComponent: function () {
                
        this.callParent(arguments); 


      
       
        
    } 
});