Ext.define('SmartTrack.view.RoutesAgendaFormView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.routesagendaformview',
    title : 'Templates',
    //requires: ['Slbf.ux.grid.plugin.PagingSelectionPersistence'],
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    //plugins: [{ptype : 'pagingselectpersist'}],   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false,
        getRowClass: function (record, rowIndex, rowParams, store) { 
            return "agendarondas";  
        }        
    },
    columns : [
        /*{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('routesgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },
       {
           xtype: 'actioncolumn',
           width: 30,
           items: [{
               iconCls: 'icon-table-edit',
               tooltip: 'agenda',
               handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('routesgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('viewagenda',rec,grid);
                }
           }]
       },*/
       {
            xtype : 'gridcolumn',            
            header : 'Dom',
            dataIndex : 'dom',
            flex: 1
		},{
            xtype : 'gridcolumn', 
            header : 'Lun',  
            dataIndex : 'lun',         
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Mar',
            dataIndex : 'mar',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Mie',
            dataIndex : 'mie',
            flex: 1   
		},{
            xtype : 'gridcolumn',            
            header : 'Jue',
    		dataIndex : 'jue',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Vie',
    		dataIndex : 'vie',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Sab',
    		dataIndex : 'sab',
            flex: 1                                             
		}

    ],
    
    initComponent: function () {

        
        this.callParent(arguments);     

        
    } 
});