//MIGRADO2024
Ext.define('Common.view.ParticionesCopyFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.particionescopyformview','widget.particioncopyformview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [
       {
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
                    },{
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Schedule',
                        margin: '0 5 5 0',
                        itemId: 'schedule'
                    },
                    {
                        xtype : 'checkboxfield',
                        name : '',
                        fieldLabel: 'Notificaciones',
                        margin: '0 5 5 0',
                        itemId: 'notificaciones'
                    }
                    
                ]
        }
 
        
        ],
	buttons : [{
			text : 'Aceptar',
            action: 'save'
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});