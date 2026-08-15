Ext.define('AdministratorSearch.view.BackupView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.backupview'],
    title : 'Templates',
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
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                   /* var view = grid.up('tablascategorizaciongridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);*/
                }
            }]
       },
       {
            xtype : 'gridcolumn',            
            header : 'Fecha',
            dataIndex : '',
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
			dataIndex : 'cat_cDescripcion',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
   
        this.callParent(arguments);
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-database-save',
                    text: 'Backup',
                    scope: this,
                    action: 'backup'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});