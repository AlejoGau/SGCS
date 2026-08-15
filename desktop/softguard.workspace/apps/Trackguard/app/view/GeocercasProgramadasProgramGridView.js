Ext.define('Trackguard.view.GeocercasProgramadasProgramGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.geocercasprogramadasprogramgridview',
    title : 'Programa',
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
                iconCls: 'icon-delete',
                tooltip: 'Borrar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('geocercasprogramadasprogramgridview');
                    
                    var rec = grid.getStore().getAt(rowIndex);
                    console.log(view,rec)
                    view.fireEvent('objectdelete',rec,grid);
                }
            }]
       },
       {
            xtype : 'gridcolumn',            
            header : '',
    		dataIndex : '_explicado',
            flex: 1
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
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});