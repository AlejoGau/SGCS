Ext.define('Administrator.view.RangeFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.rangeformview',
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
			fieldLabel : 'Dealer',
            itemId: 'linea',
			name : 'dwm_dealer',
			//store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
            forceSelection:true,
			valueField : 'lin_ccodigo',
            anchor : '100%',
            allowBlank: false,
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
                    itemId: 'cuenta_desde',
                    labelWidth: 35,
                    regex: /^[A-Za-z0-9]*$/,
                    regexText: getLocale('Debe ingresar números o letras'),
                    enforceMaxLength: true,
                    maxLength: 4,
                    flex: 1,                        
        		},
                {
                    xtype : 'textfield',
                    fieldLabel : 'hasta',
                    name : 'dwm_cuenta_hasta', 
                    itemId: 'cuenta_hasta', 
                    regex: /^[A-Za-z0-9]*$/,
                    regexText: getLocale('Debe ingresar números o letras'),
                    validator: function(value){
                        var view = this.up('rangeformview');
                        var cuenta_desde = view.down('#cuenta_desde');
                        cuenta_desde.setValue(Ext.String.leftPad(cuenta_desde.getValue(),4,'0').toUpperCase());
                        
                        if (cuenta_desde.getValue()>value){
                            return getLocale('El rango final debe ser menor que el inicial');
                        } else if (value.length<4){
                            return getLocale('La cuenta debe tener 4 dígitos');
                        } else {
                            return true;
                        }
                    },
                    labelWidth: 35,
                    enforceMaxLength: true,
                    maxLength: 4,
                    flex: 1,                        
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
