Ext.define('Administrator.view.RangeDetailView', {
    extend : 'Ext.grid.Panel',
    title: 'Rangos',
    alias : 'widget.rangedetail',    
    selModel: Ext.create('Ext.selection.CheckboxModel'), 
    columns : [     
        {
            xtype:'actioncolumn',
            header : '',
            width : 50,
            items: [{
                iconCls: 'icon-application-cascade',
                tooltip: getLocale('Ver cuentas'),
                itemId: 'iconparticiones',
                handler: function(grid, rowIndex, colIndex) {
                    var view = grid.up('rangedetail');
                    var record = grid.getStore().getAt(rowIndex);
                    var title = record.get('dwm_dealer') + '-' + record.get('dwm_cuenta_desde') + ' / ' + record.get('dwm_dealer') + '-' + record.get('dwm_cuenta_hasta') + ' - ' + record.get('lin_crazonsocial');

                    /**
                     * BC 389356119 : Creo la Window de CuentaGrid especial para ser abierta desde el Admin
                     */
                    view = Ext.widget('cuentagridview', {
                        record: record,
                        targetTab: view.up('#center'),
                        fromAdministrator : true,
                        columnHide : '0,1,3,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22',
                        columnUnhide : '4,5,6,23,24'
                    });
                    Ext.create('Ext.Window', {
                        title: title,
                        height: 500,
                        width: 750,
                        closeAction: 'hide',
                        border: false,
                        layout: 'fit',
                        modal: true,
                        items: [view],
                        translate : false
                    }).show();
                }
            }]
        },{
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
		},{
            xtype : 'gridcolumn',
			header : 'Hasta',
			sortable : false,
			dataIndex : 'dwm_cuenta_hasta',
			width : 100
		},{
            xtype : 'gridcolumn',
    		header : 'Nombre',
			sortable : false,
			dataIndex : 'lin_crazonsocial',
            flex: 1
		}
    ],

	initComponent : function() {
		this.onSelectChange = function (selModel, selections) {
            this.down('[action="rangoDelete"]').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Agregar Rangos',
                    scope: this,
                    action: 'rangoAdd'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Borrar Rango',
                    disabled: true,
                    action: 'rangoDelete',
                    scope: this
                },{
                    iconCls: 'icon-add',
                    text: 'Copiar de usuario',
                    scope: this,
                    action: 'copyuser',
                    itemId: 'copyuser'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
	} // cierro init

});
