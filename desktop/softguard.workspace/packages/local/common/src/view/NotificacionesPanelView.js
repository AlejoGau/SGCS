//MIGRADO2024
Ext.define('Common.view.NotificacionesPanelView', {
    extend : 'Ext.form.FormPanel',
    alias : 'widget.notificacionespanelview',
    title : '',
    preventHeader: true,
    autoScroll : true,
	layout : 'anchor',
	
	items : [
        {
                
                xtype: 'tabpanel',
                itemId: 'center',
                layout: 'fit',
                margins: '5 0 0 0',
                items: [
                        {
                            xtype : 'noficacionesgridview',
                            title:'Mail',
                            showMaximizer: false,
                            itemId:'mailview',
                            stateId:'mailgridview',
                            type:'MAIL'
                    	},{
                            xtype : 'noficacionesgridview',
                            title:'Notificaciones Sms',
                            showMaximizer: false,
                            itemId:'smsview',
                            stateId:'smsgridview',
                            
                            type:'SMS'
                    	},{
                            xtype : 'noficacionesgridview',
                            title:'Push',
                            showMaximizer: false,
                            itemId:'pushview',
                            stateId:'pushgridview',
                            type:'PUSH'
                    	}
                    ]
            }
		
		]
			// cierro items datos
	
	// cierro items
});