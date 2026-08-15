//MIGRADO2024
Ext.define('Common.view.CuentaRangoFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.cuentarangoformview',
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
    			name : 'Dealer',
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
                        name : 'CuentaDesde',
                        labelWidth: 35,
                        enforceMaxLength: true,
                        maxLength: 4,
                        flex: 1,                        
            		},
                    {
                        xtype : 'textfield',
                        fieldLabel : 'hasta',
                        name : 'CuentaHasta',  
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
			text : 'Cancelar'
		}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});