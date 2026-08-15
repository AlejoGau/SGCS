Ext.define('Administrator.view.AdministratorModuleFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.administratormoduleformview',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
            xtype : 'combo',
            itemId: 'comboModulo',
    		fieldLabel : 'Modulo',
			displayField : 'udm_modulo',
			valueField : 'udm_idKey',
            emptyText: 'Seleccione',
            forceSelection: true,
            editable : false,
			name : 'dwm_idModules',
            queryMode: 'local'
		},
        {
            xtype: 'container',
            anchor : '100%',
            itemId: 'webdealer',
            layout: 'anchor',
            items: [
                {
            		xtype : 'combo',
        			fieldLabel : 'Dealer',
                    itemId: 'linea',
        			name : 'dwm_dealer',
        			//store : 'TablaLineasStore',
        			displayField : 'lin_crazonsocial',
        			valueField : 'lin_ccodigo',
                    anchor : '100%',
                    queryMode: 'local'
        	    },
                {
                    xtype: 'fieldset',
                    itemId: 'rango',
                    title: 'Rango de cuentas',
                    layout: 'hbox',
                    items: [
                        {
                            xtype : 'textfield',
                            fieldLabel : 'desde',
                            name : 'dwm_cuenta_desde',
                            labelWidth: 35,
                            enforceMaxLength: true,
                            maxLength: 4,
                            flex: 1,                        
                		},
                        {
                            xtype : 'textfield',
                            fieldLabel : 'hasta',
                            name : 'dwm_cuenta_hasta',  
                            labelWidth: 35,
                            enforceMaxLength: true,
                            maxLength: 4,
                            flex: 1,                        
                        }
                    ]
                }
                
            ]
        }
        
        ],
	buttons : [{
			text : 'Guardar',
            action: 'save'
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],

	initComponent : function() {
		this.callParent(arguments);
	} // cierro init

});
