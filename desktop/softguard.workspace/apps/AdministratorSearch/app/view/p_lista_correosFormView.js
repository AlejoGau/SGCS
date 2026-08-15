Ext.define('AdministratorSearch.view.p_lista_correosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.plistacorreoformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
	items : [
        {
			xtype : 'textfield',
			name : 'plc_name',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 40,
            anchor : '100%'
		},{
    		xtype : 'textarea',
			name : 'plc_correos',
            fieldLabel: 'Correos',
            anchor : '100%',
            validator: function (value) {
                
                
                var valido = true
                // divido los mails para validar cada cuenta
                Ext.Array.each(value.split(';'), function (v){
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(!re.test(String(v).toLowerCase())) {
                        valido  = false
                    }
                
                })
                
                if(!valido) {
                    this.markInvalid('Email esta mal formulado.');
                    this.textValid = 'Email esta mal formulado.';
                } else {
                    this.clearInvalid();
                    this.textValid = true;
                }            
                
                 return this.textValid;
            }
		}
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});