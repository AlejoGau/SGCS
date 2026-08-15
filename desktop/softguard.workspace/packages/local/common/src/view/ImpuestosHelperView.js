//MIGRADO2024
Ext.define('Common.view.ImpuestosHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.impuestoshelperview'],
    title : 'Impuestos',
    autoHeight : true,
    closeAction: 'destroy',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [
    
        {
            xtype:'actioncolumn',
            header: '',
            width: 40,
            items: [
                {
                    iconCls: 'icon-basket-edit',
                    tooltip: getLocale('Modificar Impuesto'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('impuestoshelperview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('impuestoselected',rec,view);
                    }
                }
            ]
        },{
        	xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: true			
		},{
			xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : '_imp_cdescripcion',            
            flex: 1,
			sortable : true			
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);        
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        
        var items= [
            {
                xtype: 'textfield',
                itemId: 'query',
                fieldLabel: 'Nombre',
                labelWidth: 50
            },{
                xtype: 'textfield',
                itemId: 'queryid',
                fieldLabel: 'Id',
                labelWidth: 20
            },
            {
                xtype: 'button',
                text: 'Buscar',
                itemId: 'btnBuscar'
        },'->',{
                xtype: 'combo',    
                itemId:'listas',
        		displayField: 'mglp_nombre',								
    			valueField: 'Id',
                fieldLabel: 'Listas',
                queryMode: 'local',
                width:250,
                hidden:true,
                labelWidth:50
                
            }/*,
            {
                xtype: 'button',
                text: 'Cambiar lista',
                itemId: 'btnLista'
        }*/];
        if (this.multiSelect){
            this.selModel = Ext.create('Ext.selection.CheckboxModel');
            items.unshift({
                    iconCls: '',
                    text: 'Enviar Selección',
                    action: 'selected'
            });
        }
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         }); 
         this.addDocked(toolbar);
        
        
    } 
});