//MIGRADO2024
Ext.define('Common.view.TelefonoPlantillaView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.telefonoplantillaview',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
    	labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [        
        {
    		xtype : 'combo',
			fieldLabel : 'Plantilla',
            itemId: 'dealer',
			name : 'cue_clinea',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            allowBlank: false,
            queryMode: 'local'
	    }
        ],
	buttons : [{
			text : 'Crear',
            action: 'create'
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});