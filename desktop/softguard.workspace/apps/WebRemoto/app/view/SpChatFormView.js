Ext.define('WebRemoto.view.SpChatFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.spchatformview'],
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
        ,{
            xtype:'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items:[
                {
                    xtype : 'combo',
                    fieldLabel : 'Para',       
                    itemId: 'to',
                    name : 'to',
                    displayField : '_nombreTelefono',
                    valueField : 'Id',
                    anchor : '100%',
                    queryMode: 'local',
                    emptyText: getLocale('Seleccione'),
                    labelWidth : 80,
                    flex:1,
                    multiSelect : false
                },{
                    xtype:'button',
                    iconCls: '',
                    text: 'Iniciar',
                    itemId:'iniciarchat'
                }
                ,{
                    xtype:'button',
                    iconCls: '',
                    text: 'Cerrar',
                    itemId:'cerrarchat',
                    hidden: true
                }
            ]
        },{
            xtype:'container',
            layout: 'hbox',
            itemId: 'msgHelper',
            margin: '0 0 5 0',
            hidden: true,
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
                    itemId:'tmw_add',
                    scope: this
                }
            ]
        }
        ,{
            xtype : 'chatdataview',
            flex: 1,
            itemId: 'chat',
            hidden: true
		},
        {
            xtype:'container',
            itemId:'sender',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '5 0 5 0',
            hidden: true,
            items:[
                {
                    xtype : 'textarea',
                    shrinkWrap: false,
                    itemId: 'mensaje',
                    flex:1
                },{
                    xtype:'button',
                    iconCls: 'icon-page-white-go',
                    text: 'Enviar',
                    itemId:'chatSend',
                    action: 'send',
                    scope: this
                }
            ]
        }
    ],

	initComponent : function() {
		this.callParent();
        /*
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                '->',{
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
         */
	} // cierro init
});