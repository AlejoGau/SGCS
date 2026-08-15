//MIGRADO2024
Ext.define('Common.view.RoutesPointsGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.routespointsgridview',
    title : 'CheckPoints',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
   // plugins: [{ptype : 'pagingselectpersist'}], 
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
            xtype:'actioncolumn',
            itemId:'actionColumn',
            width:30,
            items: [{
                iconCls: 'icon-delete',
                tooltip: 'Borrar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('routespointsgridview');
                    
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
                    var view = grid.up('routespointsgridview');
                    
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
                    var view = grid.up('routespointsgridview');
                    
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
            //header : UiApplication == 'CleanApp'?'Checkpoint':'Postas de limpieza',
            itemId: 'pointscolumn',
        	dataIndex : 'zon_cdescripcion',
            flex: 1
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
        //this.addEvents('objectchanged','afterrecord');
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
                    action: 'savepoint',
                    itemId: 'savepoint',
                    hidden:false,
                },{
                    iconCls: 'icon-flag-green',
                    text: 'Agregar',
                    scope: this,
                    action: 'agregar',
                    itemId: 'agregar'
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