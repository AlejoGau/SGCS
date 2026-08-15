Ext.define('Administrator.store.EventSecurityModuleMWRStore', {
    extend : 'Ext.data.Store',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'EventSecurityModuleMWRStore',
    data : [{
            text : 'Timeline',
            iconCls : 'icon-clock',
    		leaf : true,
            profile: '0',
			view : 'eventotimelinegridview',
            closable: true
		},{
            text : 'Evento',
            iconCls : 'icon-page-white-text',
			leaf : true,
            profile: '0',
			view : 'eventoformview',
            closable: true
		},{
            text : 'Imagenes',
    		iconCls : 'icon-photo',
			leaf : true,
            profile: '0',
			view : 'eventimagesgridview',
            closable: true
		},{
            text : 'Llamadas',
        	iconCls : 'icon-telephone',
			leaf : true,
            profile: '0',
			view : 'eventphonegridview',
            closable: true
		},{
            text : 'Llamadas post-procesado',
            iconCls : 'icon-telephone',
			leaf : true,
            profile: '0',
			view : 'llamadahelperview',
            closable: true
		},{
            text : 'Observaciones',
            iconCls : 'icon-book-open',
			leaf : true,
            profile: '0',
			view : 'eventobservacionesgridview',
            closable: true
		},{
            text : 'Sms',
            iconCls : 'icon-email',
    		leaf : true,
            profile: '0',
			view : 'eventsmsgridview',
            closable: true
		},{
            text : 'Procesamientos',
            iconCls : 'icon-cog',
    		leaf : true,
            profile: '0',
			view : 'eventprocesamientogridview',
            closable: true
		},{
            text : 'Comentario/Recategorizacion',
            iconCls : 'icon-note-edit',
        	leaf : true,
            profile: '0',
			view : 'eventobservacionesformview',
            closable: true
		},{
            text : 'Reporte Autoridades',
            iconCls : 'icon-shield',
        	leaf : true,
            profile: '0',
			view : 'eventorepautgridview',
            closable: true
		},{
            text : 'Vigicontrol',
            iconCls : 'icon-shield',
            leaf : true,
            profile: '0',
        	view : 'vcreadonlyview',
            closable: true
		},{
            text : 'SmartPanics',
            iconCls : 'icon-shield',
            leaf : true,
            profile: '0',
			view : 'spreadonlyview',
            closable: true
		},{
            text : 'Mapa',
            iconCls : 'icon-map',
            leaf : true,
            profile: '0',
			view : 'smartpanicgpsview',
            closable: true
		},{
            text : 'Sonido',
            iconCls : 'icon-sound',
            leaf : true,
			view : 'eventsoundview',
            closable: false
		}
        
        
    ]
})