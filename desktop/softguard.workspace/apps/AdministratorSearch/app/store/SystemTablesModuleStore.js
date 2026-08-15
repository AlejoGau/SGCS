Ext.define('AdministratorSearch.store.SystemTablesModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'AdministratorSearch.model.ModuleModel',
    id: 'SystemTablesModuleStore',
    root : {
        text : 'Tablas del sistema',
        expanded : true,
        children : [
            
            {
                text : 'Tablas del Sistema',
    			//iconCls : 'icon-transmit',
    			leaf : false,
                expanded: true,
                children : [
                    {
                    	text : 'Receptores',
            			iconCls : 'icon-transmit',
            			leaf : true,
            			view : 'receptoresgridview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                		text : 'Formatos',
            			iconCls : 'icon-page-white-code',
            			leaf : true,
            			view : 'formatosgridview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Países y provincias',
                        iconCls : 'icon-world-edit',
                		leaf : true,
            			view : 'geographymanagertree',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Administrador tareas',
                        iconCls : 'icon-cog',
                		leaf : true,
            			view : 'administradortareasgridview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Gateway',
                        iconCls : 'icon-cog',
                    	leaf : true,
            			view : 'gatewayview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Tipos',
                        iconCls : 'icon-tag-red',
                		leaf : true,
            			view : 'tablastiposgridview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Listas emergencia',
                        iconCls : 'icon-table-row-insert',
                        leaf : true,
            			view : 'tablaslistasemergenciagridview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Paneles',
                        iconCls : 'icon-images',
                        leaf : true,
                    	view : 'tablaspanelesgridview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Categorizacion',
                        iconCls : 'icon-application-view-list',
                        leaf : true,
                        view : 'tablasresolucionesgridview',
                        closable: true,
                        closeAction: 'destroy'
                	},{
                        text : 'Resoluciones',
                        iconCls : 'icon-application-view-detail',
                        leaf : true,
                        view : 'tablascategorizaciongridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Resoluciones llamada',
                        iconCls : 'icon-phone-add',
                        leaf : true,
                        view : 'tablasresolucionesllamadagridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Médicos/Hospitales/Seguros médico',
                        iconCls : 'icon-medica',
                        leaf : true,
                        view : 'tablasmedicosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Tags Ag',
                        iconCls : 'icon-tag-blue-add',
                        leaf : true,
                        view : 'tablastagsaggridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Flotas',
                        iconCls : 'icon-car',
                        leaf : true,
                        view : 'tablasflotasgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Grupos',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablasgruposgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Observaciones',
                        iconCls : 'icon-comment-add',
                        leaf : true,
                        view : 'tablasobservacionesgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Codigos Alarma',
                        iconCls : 'icon-bell',
                        leaf : true,
                        view : 'tablascodigosalarmagridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Plantillas sms',
                        iconCls : 'icon-text-padding-left',
                        leaf : true,
                        view : 'tablasplantillassmsgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Móviles de Respuesta / de Servicio Técnico',
                        iconCls : 'icon-car-add',
                        leaf : true,
                        view : 'tablasmovilespatrullagridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Instaladores',
                        iconCls : 'icon-user',
                        leaf : true,
                        view : 'tablasinstaladoresgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Dealers',
                        iconCls : 'icon-group',
                        leaf : true,
                        view : 'tablaslineasgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Servicios patrulla',
                        iconCls : 'icon-car-add',
                        leaf : true,
                        view : 'tablasserviciospatrullagridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Puertos',
                        iconCls : 'icon-connect',
                        leaf : true,
                        view : 'tablaspuertosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Conexiones ip',
                        iconCls : 'icon-transmit',
                        leaf : true,
                        view : 'tablasipcongridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Eventos feriados',
                        iconCls : 'icon-date-magnify',
                        leaf : true,
                        view : 'tablaseventosferiadosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Grupos Geocerca',
                        iconCls : 'icon-geocerca',
                        leaf : true,
                        view : 'tablasgruposgeofencegridview',
                        closable: true,
                        closeAction: 'destroy'
                    }
                    
                ]
    		},
            
            
            {
                text : 'Tablas en Desarrollo',
        		iconCls : 'icon-table-multiple',
    			leaf : false,
                expanded: true,
                children : [
                    {
                        text : 'Tecnicos',
                        iconCls : 'icon-user-orange',
                        leaf : true,
                        view : 'tablastecnicosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Modems Sms',
                        iconCls : 'icon-email-go',
                        leaf : true,
                        view : 'tablasmodemssmsgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Asignacion de puertos',
                        iconCls : 'icon-table-relationship',
                        leaf : true,
                        view : 'tablasportaliasgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Parametros',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablasparametrosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Telefonos juridiccionales',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablastelefonosjuridiccionalesgridview',
                        closable: true,
                        closeAction: 'destroy'
                    }          
                     
                    
                ]
    		}
        ]
	}// cierro children
		// cierra store
})

