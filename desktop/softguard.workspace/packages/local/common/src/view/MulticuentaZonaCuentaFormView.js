//MIGRADO2024
Ext.define('Common.view.MulticuentaZonaCuentaFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.multicuentazonacuentaformview'],
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
        	fieldLabel : 'Cuenta',
            itemId: 'cuentas',
			name : 'zon_iidcuenta',
			displayField : 'cue_cnombre',
			valueField : 'cue_iid',
            queryMode: 'local'
	    }
        
        ],
	buttons : [{
			text : 'Aceptar',
            action: 'save',
            itemId: 'save',
            formBind: true
            
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});