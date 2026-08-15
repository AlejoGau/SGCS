Ext.define('Common.view.OrganizationCuentaRangoView', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.organizationcuentarangoview',

    columns : [     
        {
            xtype : 'gridcolumn',
			header : 'Dealer',
			sortable : false,
			dataIndex : 'Dealer',
			width : 100
		}, 
        {
            xtype : 'gridcolumn',
			header : 'Desde',
			sortable : false,
			dataIndex : 'CuentaDesde',
			width : 100
		}, 
        {
            xtype : 'gridcolumn',
			header : 'Hasta',
			sortable : false,
			dataIndex : 'CuentaHasta',
			width : 100
		} 
    ],

	initComponent : function() {

		this.onSelectChange = function (selModel, selections) {
            this.down('[action="rangoDelete"]').setDisabled(selections.length == 0);
        };

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Agregar Rango',
                    scope: this,
                    action: 'rangoAdd'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Borrar Rango',
                    disabled: true,
                    action: 'rangoDelete',
                    scope: this
            }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
	} // cierro init

});
