//MIGRADO2024
Ext.define('Common.view.BrandGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.brandgridview',
	title : 'Marcas',
	autoHeight : true,
    
	columns : [{
			xtype : 'gridcolumn',
			header : 'Id',
			sortable : true,
			dataIndex : 'Id',
			width : 40
		}, {
			xtype : 'gridcolumn',
			header : 'Marca',
			dataIndex : 'Name',
            editor: {
                xtype: 'textfield'
            },
			sortable : true,
			groupable : false,
			width : 250
		}],
        
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
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    action: 'add'
                }
            ]// cierro items
         }); 
        this.addDocked(toolbar);
    } // cierro init
});