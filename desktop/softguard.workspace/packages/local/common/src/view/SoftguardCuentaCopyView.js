//MIGRADO2024
Ext.define('Common.view.SoftguardCuentaCopyView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.cuentacopyview',
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
            itemId: 'dealer',
			name : 'cue_clinea',
			store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local'
	    },{
			xtype : 'textfield',
            itemId: 'cuenta',
			name : 'cue_ncuenta',
			disabled : false,
            maxLength : 4,
            enforceMaxLength : true,
            regex: /[A-Za-z0-9]/,
            regexText: getLocale('Debe ingresar números o letras'),
            validator: function(value){
                var form = this.up('form').getForm();
                var linea = form.findField('cue_clinea').getValue();
                
                value = Ext.String.leftPad(value,4,'0');
                
                Ext.Ajax.request({
                  url: '/Rest/Search/CuentaByDealerValidate',
                  params: { linea: linea, cuenta: value},
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var errors = Ext.JSON.decode(response.responseText);
        
                    if (errors.total){
                        var error = errors.rows[0];
                        this.markInvalid(error.Descripcion + ' cuenta: ' + value);
                        this.textValid = false;
                    } else {
                        this.clearInvalid();
                        this.textValid = true;
                    }                             
                  }
                });
                return this.textValid;
            },
			fieldLabel : 'Cuenta'
	    }, {
			xtype : 'textfield',
			fieldLabel : 'Nombre',
			name : 'cue_cnombre',
            allowBlank: false,
	    },{
            xtype: 'fieldset',
            title: getLocale('Datos a copiar de la cuenta principal'),
            collapsible: false,
            collapsed: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Datos de la cuenta',
                        margin: '0 5 5 0',
                        itemId: 'principal'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Usuarios',
                        margin: '0 5 5 0',
                        itemId: 'usuarios'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Contactos',
                        margin: '0 5 5 0',
                        itemId: 'contactos'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Zonas',
                        margin: '0 5 5 0',
                        itemId: 'zonas'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Información médica',
                        margin: '0 5 5 0',
                        itemId: 'medica'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'notas',
                        margin: '0 5 5 0',
                        itemId: 'notas'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Horarios',
                        margin: '0 5 5 0',
                        itemId: 'horarios'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Notificaciones',
                        margin: '0 5 5 0',
                        itemId: 'notificaciones'
                    },
                    
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Videolink',
                        margin: '0 5 5 0',
                        itemId: 'videolink'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Control de TEST',
                        margin: '0 5 5 0',
                        itemId: 'controltest'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Control de falsas alarmas',
                        margin: '0 5 5 0',
                        itemId: 'controlfalsasalarmas'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Panel de alarma',
                        margin: '0 5 5 0',
                        itemId: 'panelalarma'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Scheduler',
                        margin: '0 5 5 0',
                        itemId: 'scheduler'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Estados dianamicos',
                        margin: '0 5 5 0',
                        itemId: 'estadosdinamicos'
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
        //this.addEvents('objectcreated');
		this.callParent(arguments);
	} // cierro init
});