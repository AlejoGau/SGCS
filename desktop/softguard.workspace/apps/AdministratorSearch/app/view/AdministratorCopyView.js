Ext.define('AdministratorSearch.view.AdministratorCopyView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.admincopyview',
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
            itemId: 'usuario',
			name : 'usuario',
			disabled : false,
            vtype : 'email',
            validator: function(value){
                var form = this.up('form').getForm();
                var usuario = form.findField('usuario').getValue();

                // valido si es un email
                if (!Ext.form.field.VTypes.email(value)){
                    return getLocale("Usuario");
                }
                
                Ext.Ajax.request({
                  url: '/Rest/Search/DesktopUserValidate',
                  params: { username: usuario},
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var errors = Ext.JSON.decode(response.responseText);
        
                    if (errors.total){
                        var error = errors.rows[0];
                        this.markInvalid(error.Descripcion + ' usuario: ' + value);
                        this.textValid = false;
                    } else {
                        this.clearInvalid();
                        this.textValid = true;
                    }                             
                  }
                });
                return this.textValid;
            },
			fieldLabel : 'Usuario'
	    }, {
			xtype : 'textfield',
			fieldLabel : 'Nombre',
			name : 'nombre',
            allowBlank: false
	    }, {
    		xtype : 'textfield',
			fieldLabel : 'Apellido',
			name : 'apellido',
            allowBlank: false
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
