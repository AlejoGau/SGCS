Ext.define('WebRemoto.view.WhatsappEnvioFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.whatsappenvioformview'],
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
        {
            xtype : 'combo',
            fieldLabel : 'Para',            
            itemId: 'to',
        	name : 'to',
			displayField : '_displayName',
			valueField : 'E164',
            anchor : '100%',
            queryMode: 'local',
            emptyText: getLocale('Seleccione'),
            labelWidth : 80,
            multiSelect : false
		},{
            xtype:'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items:[
                {
                    xtype : 'combo',
                    fieldLabel : 'Mensaje',            
                    itemId: 'tmw',
                    name : 'tmw',
                    displayField : 'tmw_ctitulo',
                    valueField : 'tmw_cmensaje',
                    flex : 1,
                    queryMode: 'local',
                    emptyText: getLocale('Seleccione'),
                    labelWidth : 80,
                    multiSelect : false
                },{
                    xtype:'button',
                    iconCls: 'icon-page-white-go',
                    text: '',
                    itemId:'tmw_send',
                    scope: this
                }
            ]
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
                    iconCls: 'icon-whatsapp',
                    text: 'Enviar',
                    scope: this,
                    action: 'send'
                },'->',{
                    iconCls: 'icon-waze',
                    text: 'Waze',
                    itemId: 'wazelink'
                },{
                    iconCls: 'icon-google-maps',
                    text: 'Google Map',
                    itemId: 'gmaplink'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});