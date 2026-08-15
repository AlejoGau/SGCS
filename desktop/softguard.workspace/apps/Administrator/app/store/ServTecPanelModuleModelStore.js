Ext.define('Administrator.store.ServTecPanelModuleModelStore', {
    extend : 'Ext.data.Store',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'ServTecPanelModuleModelStore',
    data : [{
            text : 'SerTec',
            iconCls : 'icon-servtec',
            view: 'sertecfullformview',
			leaf : true,
            profile: '0',
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Productos',
            iconCls : 'icon-Product',
            view: 'servtecproductosordengridview',
			leaf : true,
            profile: '0',			
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Visitas',
            iconCls : 'icon-map-go',
            view: 'servtecvisitagridview',
    		leaf : true,	
            profile: '0',		
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Observaciones',
            iconCls : 'icon-historial',
            view: 'servtecobservacionesgridview',
            leaf : true,    
            profile: '0',		
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Reclamos',
            iconCls : 'icon-book-error',
            view: 'servtecreclamosgridview',
            leaf : true,    
            profile: '0',		
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Historico',
            iconCls : 'icon-book-edit',
            view: 'servtechistoricogridview',
        	leaf : true,
            profile: '0',			
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Mapa',
            iconCls : 'icon-map',
            view: 'sertecmapformview',
            leaf : true,
            profile: '0',			
            closable: true,
            closeAction: 'destroy'
		}, {
            text : 'Servicio Tecnico',
            iconCls : 'icon-wrench-orange',
            leaf : true,
            profile: '0',
            view : 'multicuentaserviciotecnicoextdelaersearchgridview',
            closable: true,
            closeAction: 'destroy'
        },{
    		text : 'Reporte Histórico',
			iconCls : 'icon-reportes',
			leaf : true,
            profile: '0',
			view : 'recepcionview',
            closable: true,
            closeAction: 'destroy'
		}, {
            text : 'Gestión -> Llamadas',
            iconCls : 'icon-telephone-go',
            view : 'llamadagridview',
            leaf : true,
            profile: '0',
            closable: true,
            closeAction: 'destroy'
        }, {
			text : 'Panel de alarma',
			iconCls : 'icon-panel',
			leaf : true,
            profile: '0',
			view : 'panelview',
            closable: true,
            closeAction: 'destroy'
		}, {
    		text : 'Contactos',
			iconCls : 'icon-telefonos',
			leaf : true,
            profile: '0',
			view : 'gridphones',
            closable: true,
            closeAction: 'destroy'
		},{
			text : 'Zonas',
			iconCls : 'icon-zonas',
			leaf : true,
            profile: '0',
			view : 'gridzone',
            closable: true,
            closeAction: 'destroy'
		},{
    		text : 'Cuenta',
			iconCls : 'icon-cuenta',
			leaf : true,
			view : 'cuentaformview',
            profile: '0',
            closable: true,
            closeAction: 'destroy',
            viewConfig : '{readOnly: true}'
		}, {
			text : 'Situación',
			iconCls : 'icon-search',
			leaf : true,
			profile: '0',
			view : 'estadoview',
			closable: true,
			closeAction: 'destroy'
		}
    ]
	})

