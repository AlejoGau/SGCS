//MIGRADO2024
Ext.define('Common.view.SmsEnvioFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.smsenvioformview'],
    preventHeader: true,
    frame: false,
    border : 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 80,
		anchor : '100%'
	},
	items : [
        /*{
    		xtype : 'textfield',
			name : 'cDestinoSMS',
            itemId: 'to',
            fieldLabel: 'Para',
			allowBlank : false,
            emptyText: getLocale('Completar')
		}*/,{
            xtype : 'combo',
            fieldLabel : 'Para',            
            itemId: 'to',
        	name : 'sms_imodemsms',
			displayField : 'tel_cnombre',
			valueField : 'tel_ctelefono',
            anchor : '100%',
            queryMode: 'local',
            allowBlank : false,
            forceSelection: true,
            emptyText: getLocale('Seleccione'),
            labelWidth : 80,
            multiSelect : true
		},{
            xtype : 'combo',
            fieldLabel : 'Modem sms',
            store: 'TablaModemsSmsStore',
            itemId: 'modemsms',
            forceSelection: true,
    		name : 'sms_imodemsms',
			displayField : 'sms_cdescripcion',
			valueField : 'sms_icodigo',
            anchor : '100%',
            queryMode: 'local',
    		allowBlank : false,
            emptyText: getLocale('Seleccione'),
            labelWidth : 80
        },{
            xtype : 'combo',
            fieldLabel : 'Aplicar plantilla',
            itemId: 'plantillaNotificaciones',
            emptyText: getLocale('Seleccione'),
            labelWidth: 80,
            displayField : 'pls_cdescripcion',
            valueField : 'Id',
            anchor : '100%',
            queryMode: 'local',
		},{
            xtype : 'textarea',
            shrinkWrap: false,
            flex: 1,
            itemId: 'asunto',
			name : 'cAsunto',
			allowBlank : false
		}
    ],
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-email-go',
                    text: 'Enviar',
                    scope: this,
                    action: 'send'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});