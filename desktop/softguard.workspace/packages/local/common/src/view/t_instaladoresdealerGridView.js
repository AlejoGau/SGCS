//MIGRADO2024
Ext.define('Common.view.t_instaladoresdealerGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.t_instaladoresdealergridview'],
    title : 'Dealers',
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
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('t_instaladoresdealergridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectDelete',rec,view);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Codigo',
        	dataIndex : 'lin_ccodigo',
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Razon social',
			dataIndex : 'lin_crazonsocial',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        
        
        this.callParent(arguments);     
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Agregar',
                    scope: this,
                    action: 'add'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});