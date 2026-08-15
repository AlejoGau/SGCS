Ext.define('AdministratorSearch.view.TablasEscalaPrioriGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablasescalarprioridadesgridview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
       
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
                iconCls: 'icon-table-edit',
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablasescalarprioridadesgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },
       {
            xtype : 'gridcolumn',            
            header : 'Prioridad',
            dataIndex : 'Id',
            width:80
    	},
       {
            xtype : 'gridcolumn',            
            header : 'Tiempo (minutos)',
            dataIndex : 'tep_itiempo',
            width:160
		},{
            xtype : 'gridcolumn',            
            header : 'Controla',
			dataIndex : '_tep_ncontrola',
            width:80
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
                
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});