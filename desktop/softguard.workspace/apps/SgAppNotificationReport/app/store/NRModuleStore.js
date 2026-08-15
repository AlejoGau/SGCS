Ext.define('SgAppNotificationReport.store.NRModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'NRModuleStore',
    root : {
        text : 'Notificaciones',
        expanded : true,
        children : [/*{
            text : getLocale('Correos enviados'),
            iconCls : 'icon-group',
			leaf : true,
			view : 'smarttrackinggridview',
            closable: true,
            closeAction: 'destroy'
		},*/{
			text : getLocale('Correos enviados'),
			iconCls : 'icon-email-go',
			leaf : true,
			view : 'smartmailprogramgridview',
            closable: true,
            closeAction: 'destroy',
            viewConfig : { 
                readonly: true 
            }
		},{
            text : getLocale('SMS Enviados'),
			iconCls : 'icon-transmit',
			leaf : true,
			view : 'smsgridview',
            closable: true,
            closeAction: 'destroy'
		},{
            text : getLocale('SMS Recibidos'),
			iconCls : 'icon-transmit',
			leaf : true,
			view : 'smsrecibidosgridview',
            closable: true,
            closeAction: 'destroy',
            viewConfig : {
                    showColumns : ["cue_clinea"]}
		},{
            text : getLocale('Mensajes por eventos enviados a SmartPanics'),
            iconCls : 'icon-email-go',
			leaf : true,
			view : 'ppushqueuegridview',
            closable: true,
            closeAction: 'destroy'
		},{
            text : getLocale('Mensajes enviados desde CRM'),
            iconCls : 'icon-email-go',
    		leaf : true,
			view : 'ppushqueuecrmgridview',
            closable: true,
            closeAction: 'destroy'
		}]
	}// cierro children
// cierra store
});