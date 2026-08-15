Ext.define('AdministratorSearch.view.TablasEscalaPrioriOrganizacionGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablasescalarprioridadesorganizaciongridview'],
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
                    var view = grid.up('tablasescalarprioridadesorganizaciongridview');
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
            dataIndex : 'teo_iTiempo',
            width:160
		},{
            xtype : 'gridcolumn',            
            header : 'Controla',
			dataIndex : '_teo_ncontrola',
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