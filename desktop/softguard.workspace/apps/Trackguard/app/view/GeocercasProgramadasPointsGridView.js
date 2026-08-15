Ext.define('Trackguard.view.GeocercasProgramadasPointsGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.geocercasprogramadaspointsgridview',
    title : 'Geocercas',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-delete',
                tooltip: 'Borrar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('geocercasprogramadaspointsgridview');
                    
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectdelete',rec,grid);
                }
            }]
       }/*,{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-bullet-arrow-up',
                tooltip: 'Arriba',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('geocercasprogramadaspointsgridview');
                    
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('tobottom',rec,grid);
                }
            }]
       },{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-bullet-arrow-down',
                tooltip: 'Abajo',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('geocercasprogramadaspointsgridview');
                    
                    var rec = grid.getStore().getAt(rowIndex);
                    console.log(view,rec)
                    view.fireEvent('totop',rec,grid);
                }
            }]
       },*/
       /*{
            xtype : 'gridcolumn',            
            header : 'Orden',
            dataIndex : 'order',
            width:50
		}*/,{
            xtype : 'gridcolumn',            
            header : 'Geocercas',
        	dataIndex : 'Name',
            flex: 1,
           /*renderer: funciton (value, record) {
                if(value == '') {
                    
                    view.store =Ext.create('Ext.data.Store',{
                        model: 'Trackguard'+'.model.tg_route_geofencesSearchModel',                        
                        pageSize: 50,
                        remoteFilter: true,
                        filters: [{
                            property:'Id',
                            value:record.get('Id')
                        }]
                    }).load({callback:function (records) {
                        return records[0].get('Name')
                    }})
                    
                } else {
                    return value;
                }
            } */
		},
       {
            xtype : 'gridcolumn',            
            header : 'Minutos',
            dataIndex : 'time',
            width:50,
            editor: {
                xtype: 'numberfield',
                allowBlank: false
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Tolerancia previa',
        	dataIndex : 'beforetolerance',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Tolerancia posterior',
			dataIndex : 'aftertolerance',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false
            }
		}


    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'savepoint'
                },{
                    iconCls: 'icon-flag-green',
                    text: 'Agregar',
                    scope: this,
                    action: 'agregar'
                },{
                    iconCls: 'icon-map',
                    text: 'Ver Mapa',
                    scope: this,
                    action: 'vermapa'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});