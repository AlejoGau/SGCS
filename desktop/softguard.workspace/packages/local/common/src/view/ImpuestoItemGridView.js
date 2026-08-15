//MIGRADO2024
Ext.define('Common.view.ImpuestoItemGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.impuestoitemgridview'],
    title : 'Impuestos',
    autoHeight : true,
    features: [{
        ftype: 'summary',
        dock:'bottom'
    }],
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 40,
            items: [
                {
                    iconCls: 'icon-delete',
                    tooltip: getLocale('Eliminar'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('impuestoitemgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('deleteitem',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
            header : 'Nombre',
            dataIndex : '_imp_cdescripcion',					
            width : 400,
            sortable : true
		}
    
    ],
        
        
    initComponent: function () {
        this.callParent(arguments);  
        
        if (!this.moneySymbol){
            this.moneySymbol = getParametro('SYSTEMCURRENCY',false,true).codigo+' '
        }
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Nuevo item',
                    scope: this,
                    action: 'add'
                }
                
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});