//MIGRADO2024
Ext.define('Common.view.VehicleBrandFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.vehiclebrandformview',
    title: 'Marca',
    autoHeight: true,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [        
        {
			xtype : 'textfield',
			name : 'Name',
			disabled : false,
			fieldLabel : 'Marca'
	    }
    ],
	initComponent : function() {
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    action: 'save',
                    itemId: 'vehiclebrandsave'
                }, {
                    iconCls: 'icon-delete',
                    action: 'delete',
                    text: 'Eliminar'
                }
            ]// cierro items
         });
         
		this.callParent(arguments);
        this.addDocked(toolbar);
	} // cierro init
});