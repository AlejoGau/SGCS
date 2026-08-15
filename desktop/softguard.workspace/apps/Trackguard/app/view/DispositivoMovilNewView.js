Ext.define('Trackguard.view.DispositivoMovilNewView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.dispositivomovilnew',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
    	labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
            xtype: 'fieldset',
            title: 'Cuenta del dispositivo',
            style: 'text-align: center',
            items: [
                {
                    xtype : 'textfield',
                    fieldLabel : '',
                    disabled: true,
                    value: getLocale('Seleccione una cuenta'),
                    name : '_cuenta'
                },
                {
                    xtype: 'button',
                    text: 'Seleccionar',
                    action: 'select',
                    margin: '0 0 5 0'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'OwnerId'
                }
            ]
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
