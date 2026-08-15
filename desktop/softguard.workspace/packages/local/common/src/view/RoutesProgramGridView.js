//MIGRADO2024
Ext.define('Common.view.RoutesProgramGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.routesprogramgridview',
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
            itemId:'actionColumn',
            width:30,
            items: [{
                iconCls: 'icon-delete',
                tooltip: 'Borrar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('routesprogramgridview');
                    
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
            sortable: false,
            flex: 1
		}
    ],
    
    setRecord: function(record){
        this.record = record;
        this.routeId = record.get('Id');
        this.filters = [
            {
                property: 'routeId',
                id:'routeId',
                value: record.get('Id')
            }
        ];  
        
        if (this.store){
            this.store.filter(this.filters);
            
        }
        
    }, 
    
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
                    action: 'add',
                    itemId: 'add'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
    
});