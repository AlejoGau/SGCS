Ext.define('AdministratorSearch.view.scriptsGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.scriptsview',
    preventHeader : true,
    autoHeight : true,
    viewConfig: {
       markDirty: false
    },
	columns : [
        {
            xtype:'actioncolumn',
            header: '',
            width: 40,
            items: [
                {
                    iconCls: 'icon-script-go',
                    tooltip: 'Ejecutar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('scriptsview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('ejecuteScript',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
			header : 'Tarea',
			dataIndex : 'Name',
            width:100
		},{
            xtype : 'gridcolumn',
    		header : 'Descripcion',
			dataIndex : 'Description',
            width:100,            
    		flex:1
		},{
            xtype : 'gridcolumn',
        	header : 'Estado',
			dataIndex : 'Status',
            renderer: function (value) {
                if(value == 0) {
                    return getLocale('Frenado')
                } else {
                    return getLocale('Corriendo')
                }
            },
    		flex:1
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
      

    } // cierro init
});