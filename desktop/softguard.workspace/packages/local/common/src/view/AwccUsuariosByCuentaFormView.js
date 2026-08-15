//MIGRADO2024
Ext.define('Common.view.AwccUsuariosByCuentaFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.awccusuariosbycuentaformview',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
                    	xtype : 'textfield',
            			fieldLabel : 'Nombre',
                        labelWidth: 90,
            			name : "nombre_mostrar",
                        itemId: 'nombre',
                        
                        allowBlank: false
            		},{
                        xtype : 'textfield',
            			fieldLabel : 'Login',
                        labelWidth: 90,
            			name : "nombrelogin",
                        itemId: 'login',
                        vtype: 'email',
                        allowBlank: false
            		},{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype : 'textfield',
                                fieldLabel : 'Clave',
                                labelWidth: 90,
                            	name : 'contrasena',
                                itemId: 'clave',
                                disabled: true,
                                flex: 1,
                                inputType : 'password'
                    		},{
                                xtype : 'textfield',
                                fieldLabel : 'Clave',
                                itemId: 'claveTxt',
                                disabled: true,
                                hidden: true,
                                flex: 1
                        	},
                            {
                                xtype: 'button',
                                text: 'Cambiar',
                                action: 'passwordChange'
                            }
                        ]
                    }
                   /*,{
                        xtype : 'textfield',
                        fieldLabel : 'Repetir clave',
                        itemId: 'clave2',
                        labelWidth: 90,
                        inputType : 'password',
                        allowBlank: false
            		},{
                    	xtype : 'combo',
            			fieldLabel : 'Template',
                        labelWidth: 90,
                        plugins: ['clearbutton'],
                        editable: true,
                        forceSelection: true,
                        itemId: 'templateCombo',
                        queryMode: 'local',
            			displayField : 'nombre_mostrar',
            			valueField : 'nombrelogin'
            		}*/],
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