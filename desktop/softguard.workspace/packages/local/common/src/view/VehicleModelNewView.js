//MIGRADO2024
Ext.define('Common.view.VehicleModelNewView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.vehiclemodelnewview',
    preventHeader: true,
    frame : true,
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
			fieldLabel : 'Modelo'
	    }
    ],
	buttons : [{
			text : 'Crear',
            action: 'create'
		}, {
			text : 'Cancelar',
            action: 'cancel'
	    }
    ],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});