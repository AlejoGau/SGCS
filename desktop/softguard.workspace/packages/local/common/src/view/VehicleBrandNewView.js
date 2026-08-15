//MIGRADO2024
Ext.define('Common.view.VehicleBrandNewView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.vehiclebrandnewview',
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
			fieldLabel : 'Marca'
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