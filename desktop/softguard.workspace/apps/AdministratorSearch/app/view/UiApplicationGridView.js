Ext.define('AdministratorSearch.view.UiApplicationGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.uiapplicationgridview',
    title : 'Versiones',
    autoHeight : true,
	columns : [
        {
			xtype : 'gridcolumn',
			header : 'Nombre',
			sortable : true,
			dataIndex : 'Name',
			width : 200
		}, {
			xtype : 'gridcolumn',
			header : 'Versión Actual',
			dataIndex : 'Version',
			sortable : true,
			width : 125
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
		var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
			dock: 'bottom',
			displayInfo: true
		});
        this.addDocked(pagingtoolbar);    
                
    } // cierro init
});