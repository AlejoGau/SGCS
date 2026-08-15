//MIGRADO2024
Ext.define('Common.view.NotificacionesTabpanelView', {
    extend : 'Ext.tab.Panel',
    alias : 'widget.notificacionestabpanelview',
    autoScroll : true,
    title: 'Notificaciones',
	autoHeight : true,
	/*layout: {
        type: 'vbox',
        align: 'stretch'
    },*/
	items : [{
			xtype : 'smsgridview',
            title: 'Sms enviados'
		},{
            xtype: 'smsrecibidosgridview',
            title: 'Sms recibidos'  
    	},{
    	    xtype: 'smartmailprogramgridview',
            title: 'Correos enviados',
            readonly: true
		},{
            xtype: 'smsconmutadosgridview',
            title: 'Sms conmutados a correo'
		},
        
        /* Agregado del tab PUSH 
         * /projects/14758726/todos/339985565
         * Lista de mensajes y estado PUSH
         */
        {
            xtype : 'ppushqueuegridview',
            title: 'Mensajes por eventos enviados a SmartPanics'
        }
    ],
    
    initComponent: function(){
        this.callParent(arguments);
        
        this.down('smsgridview').record = this.record;
        this.down('smsgridview').module = this.module;
        this.down('smsrecibidosgridview').record = this.record;
        this.down('smsrecibidosgridview').module = this.module;
        this.down('smartmailprogramgridview').record = this.record;
        this.down('smartmailprogramgridview').targetTab = this;
        this.down('smsconmutadosgridview').record = this.record;
        /* Agregado los eventos PUSH leidos y no leidos */
        if (this.down('ppushqueuegridview')){
            this.down('ppushqueuegridview').record = this.record;
            this.down('ppushqueuegridview').module = this.module;
        }
    }
});