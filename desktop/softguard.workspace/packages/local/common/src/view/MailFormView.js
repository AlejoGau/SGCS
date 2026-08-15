//MIGRADO2024
Ext.define('Common.view.MailFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.mailformview'],
    preventHeader: true,
    frame: false,
    border : 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    emptyText: getLocale('No hay archivos adjuntos.'),
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 80,
		anchor : '100%'
	},
	items : [
        {
        	xtype : 'displayfield',
			name : 'From',
            itemId: 'from',
            fieldLabel: 'De',
			allowBlank : false,
            emptyText: getLocale('Completar'),            
             vtype:'email',
             vtypeText: getLocale('Debe ingresar un email válido')
		}, {
			xtype : 'combo',			
			name : "",
			displayField : 'sms_cmailparaeventos',
            itemId: 'emails',
			valueField : 'sms_cmailparaeventos',
            editable: false,
            emptyText: getLocale('Agregar Email'),
            hidden:true,
            listeners:{
                change: function (combo, value) {
                    
                    var view = combo.up('mailformview')
                    var toValue = view.down('#to').getValue()
                    
                    if(value) {
                        if(toValue.indexOf(value) == -1) {
                            if(Ext.util.Format.trim(toValue) != '') {
                                view.down('#to').setValue(toValue+','+value)
                            } else {
                                view.down('#to').setValue(value)
                            }
                        } else {
                            notify('Ya se encunetra agregado.')
                        }
                        combo.setValue('')
                    }
                }
            }
            
		},{
    		xtype : 'textfield',
			name : 'Query',
            itemId: 'to',
            fieldLabel: 'Para',
			allowBlank : false,
            emptyText: getLocale('Completar'),
            validator: function(value){
                 if(value == '') {
                        this.up('form').down('#send').setDisabled(true)
                    } else {
                        this.up('form').down('#send').setDisabled(false)                 
                    }
                    return true;
                 
             },
             //vtype:'email',
             vtypeText: getLocale('Debe ingresar un email válido')
		},{
        	xtype : 'textfield',
			name : 'CC',
            itemId: 'cc',
            fieldLabel: 'CC',
			allowBlank : true,
            hidden: true,
            emptyText: getLocale('Completar')
		},{
        	xtype : 'textfield',
			name : 'CCO',
            itemId: 'cco',
            fieldLabel: 'CCO',
            hidden: true,
			allowBlank : true,
            emptyText: getLocale('Completar')
		},{
			xtype : 'textfield',
			name : 'Name',
            itemId: 'asunto',
            fieldLabel: 'Asunto',
			allowBlank : false,
            emptyText: getLocale('Asunto')
		},{
            xtype : 'combo',
            fieldLabel : 'Aplicar plantilla',
            itemId: 'plantillaNotificaciones',
            emptyText: getLocale('Seleccione'),
            labelWidth: 80,
            displayField : 'pls_cdescripcion',
            valueField : 'Id',
            anchor : '100%',
            queryMode: 'local'
		},{
            xtype : 'htmleditor',
            shrinkWrap: false,
            flex: 1,
            itemId: 'body',
			name : 'Body',
			allowBlank : false
		}
    ],
	initComponent : function() {
		this.callParent();
        
        if(!this.recordEvent){
            this.down('#plantillaNotificaciones').hide();
        }
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-email-go',
                    text: 'Enviar',
                    scope: this,
                    action: 'send',
                    itemId: 'send',
                    disabled:true
                },{
                    text : 'Agregar lista de correo',
                    itemId: 'listacorreomenu',
                    hidden:true,
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                                {
                                        xtype: 'panel',
                                        bodyPadding: 5,
                                        items: [
                                                {
                                                    xtype : 'combo',
                                                	fieldLabel : 'Lista de correos',
                                                	itemId:'listacorreos',
                                                    queryMode: 'local',
                                                    labelWidth: 120,
                                                    displayField: 'plc_name',
                                                    valueField: 'plc_correos',
                                                   
                                                },{
                                                    xtype:'button',
                                                    text:'Agregar lista',
                                                    itemId:'agregarlista',
                                                  
                                                }
                                    ]
                                }
                            ]
                    }
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});