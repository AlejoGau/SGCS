Ext.define('Administrator.view.AdministratorModulesView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.administratormodulesview',
    title : 'Modulos',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
	columns : [{
                xtype:'actioncolumn',
                width:30,
                items: [{
                    iconCls: 'icon-moduloEdit',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event){
                        var record = grid.getStore().getAt(rowIndex);
                        var view = grid.up('administratormodulesview');
                        view.fireEvent('objectedit',record,grid);
                    }
                }]        
        },       
        {
			xtype : 'gridcolumn',
			header : 'Módulo',
			sortable : true,
			dataIndex : '_localeModule',
			width : 200
		} 
    ],
    
    initComponent: function () {
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delModulo"]').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            itemId: 'toolbar',
            items: [
                    {
                    xtype : 'combo',
                    itemId: 'comboModulo',
                	//fieldLabel : 'Modulo',
        			displayField : '_localeModule',
        			valueField : 'udm_idKey',
                    emptyText: getLocale('Seleccione'),
                    forceSelection: true,
                    editable : false,
        			name : 'dwm_idModules',
                    queryMode: 'local',
                    width: 200
        		},
                {
            		text : 'Agregar módulo',
        			iconCls : 'icon-moduloAdd',        			
                    action: 'addModulo',
                    itemId: 'addModulo'
        		},'-',
                {
                	text : 'Eliminar módulo',
        			iconCls : 'icon-cog-delete',        			
                    action: 'delModulo',
                    disabled: true,
                    itemId: 'delModulo'
        		}
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
                
    } // cierro init
});