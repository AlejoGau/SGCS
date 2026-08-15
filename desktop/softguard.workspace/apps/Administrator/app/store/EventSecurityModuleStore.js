Ext.define('Administrator.store.EventSecurityModuleStore', {
    extend : 'Ext.data.Store',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'EventSecurityModuleStore',
    data : [{
            text : 'Timeline',
            iconCls : 'icon-clock',
			leaf : true,
            profile: '0',
			view : 'eventotimelinegridview',
            closable: true,
            //opened: 'noabrir'
		},{
            text : 'Evento',
            iconCls : 'icon-page-white-text',
			leaf : true,
            profile: '0',
			view : 'eventoformverticalview',//'eventoformview',
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
		}
        
        // vuelvo a mostrar esto para los administradores 
        ,{
            text : 'Llamadas post-procesado',
            iconCls : 'icon-telephone',
			leaf : true,
            profile: '0',
			view : 'llamadahelperview',
            closable: true
		}
        /////////////////////////////////
        ,{
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
            text : 'Mapa',
            iconCls : 'icon-map',
            leaf : true,
            profile: '0',
            view : 'vigicontrolgpsview',
            viewConfig: '{preventPlayer: true}',
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
        
        // 28/9/2018 Dedalo lo comento porque en vigicontrol, se ve esto y los videos estan en la nueva paleta multimedia.
        /*,{
            text : 'Video SmartPanics',
            iconCls : 'icon-cctv-camera',
            leaf : true,
            profile: '0',
    		view : 'speventovideoview',
            closable: true
		}*/,{
            text : 'Links',
            iconCls : 'icon-linkurl',
            leaf : true,
            view : 'linkurlgridview',
            closable: true, 
            profile: '0'
		},{
            text : 'Log Smartpanics',
            iconCls : 'icon-attach',
            leaf : true,
            view : 'eventsmartpanicslogview',
            closable: true, 
            profile: '0'
    	}
    ]
})