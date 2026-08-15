//MIGRADO2024
Ext.define('Common.view.WebDealerDetailView', {
    extend : 'Ext.grid.Panel',
    title: 'Rangos',
    alias : 'widget.WebDealerDetail',
	columns : [     
        {
            xtype : 'gridcolumn',
			header : 'Dealer',
			sortable : false,
			dataIndex : 'dwm_dealer',
			width : 100
		}, 
        {
            xtype : 'gridcolumn',
			header : 'Desde',
			sortable : false,
			dataIndex : 'dwm_cuenta_desde',
			width : 100
		}, 
        {
            xtype : 'gridcolumn',
			header : 'Hasta',
			sortable : false,
			dataIndex : 'dwm_cuenta_hasta',
			width : 100
		} 
    ],
	initComponent : function() {
		this.onSelectChange = function (selModel, selections) {
            this.down('[action="rangoDelete"]').setDisabled(selections.length == 0);
        };
        
        
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
	} // cierro init
});