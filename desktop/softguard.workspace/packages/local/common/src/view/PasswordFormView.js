//MIGRADO2024
Ext.define('Common.view.PasswordFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.passwordformview',
    preventHeader: true,
	frame : true,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
		xtype : 'textfield',
        itemId: 'pass1',
		fieldLabel : 'Clave',
		inputType : 'password',
		name : "pass1"
	},{
		xtype : 'textfield',
		fieldLabel : 'Repetir Clave',
		inputType : 'password',
		name : "pass2",
        itemId: 'pass2'
	}],
	buttons : [{
				text : 'Guardar',
                action: 'save'
			}, {
				text : 'Cancelar',
                action: 'cancel'
			}],
	initComponent : function() {

		this.callParent(arguments);
        
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,100}$/;
        var regexText = getLocale('Requisitos de la contraseña:<br/>'+
                '<br/>-Debe tener al menos 6 caracteres'+
                '<br/>-Debe tener al menos una letra mayúscula'+
                '<br/>-Debe tener al menos una letra minúscula'+
                '<br/>-Debe tener al menos un número');
        
        if (this.hardpassword){
            Ext.apply(this.down('#pass1'),{
                regex: regex,
                regexText: regexText
            });
            Ext.apply(this.down('#pass2'),{
                regex: regex,
                regexText: regexText
            });
        }
        
        
	} // cierro init
});