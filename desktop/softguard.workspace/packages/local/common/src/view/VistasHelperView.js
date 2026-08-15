//MIGRADO2024
Ext.define('Common.view.VistasHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.vistahelperview',
    layout : 'fit',
    viewConfig: {
       markDirty: false
    },
	columns : [
	        {
                xtype : 'gridcolumn',
        		header : 'Nombre',
    			dataIndex : 'nombre',
                felx:1
            },{
                xtype : 'gridcolumn',
            	header : '',
    			dataIndex : 'predefinido',
                felx:1
            },{
                xtype:'actioncolumn',
                header : '',
                width:40,
                items: [{
                    iconCls: 'icon-delete',
                    tooltip: getLocale('Modificar Cuenta'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('vistahelperview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('sacarPredeterminada',rec,view);
                    },getClass: function(value,metadata,record,a,b,c,view){
                        if(record.get('predefinido') == 0) {
                            return 'x-hide-display'; 
                        } else{
                            return 'icon-delete';
                        }
                        
                    }
                }]
            
            }]
            ,
	
    
    initComponent: function(){
        
      
        this.callParent();
        
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="borrarvista"]').setDisabled(selections.length == 0);
            this.down('[action="definirdefault"]').setDisabled(selections.length == 0);
        };
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar',{
            items: [
                {
                    action: 'nuevavista',
                    text: 'Nueva vista',
                    iconCls: 'icon-add'
                },{
                    action: 'borrarvista',
                    text: 'Borrar',
                    disabled: true,
                    iconCls: 'icon-delete'
                },{
                    action: 'definirdefault',
                    text: 'Definir defualt',
                    disabled: true
                }
            ]
        });
        
       /* var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);*/
        this.addDocked(toolbar);
    }
});