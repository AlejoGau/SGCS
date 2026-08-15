Ext.define('AdministratorSearch.store.SystemConfigurationModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'AdministratorSearch.model.ModuleModel',
    id: 'SystemConfigurationModuleStore',
    root : {
        text : 'Configuracion del sistema',
        expanded : true,
        children : [
            
            {
            	text : 'Datos dinamicos',
    			//iconCls : 'icon-transmit',
    			leaf : false,
                expanded: true,
                children : [
                    {
                        text : 'Tipos',
                        iconCls : 'icon-tag-red',
                    	leaf : true,
            			view : 'tablastiposgridview',
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
                        text : 'Eventos feriados',
                        iconCls : 'icon-date-magnify',
                        leaf : true,
                        view : 'tablaseventosferiadosgridview',
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
                        text : 'Plantillas Notificaciones Manuales',
                        iconCls : 'icon-text-padding-left',
                        leaf : true,
                        view : 'tablasplantillasnotificacionmanualgridview',
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
                        text : 'Dealers',
                        iconCls : 'icon-group',
                        leaf : true,
                        view : 'tablaslineasgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Telefonos juridiccionales',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablastelefonosjuridiccionalesgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Instaladores/Técnicos',
                        iconCls : 'icon-user',
                        leaf : true,
                        view : 'tablasinstaladoresgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Marcas de vehiculos',
                        iconCls : 'icon-car',
                        leaf : true,
                        view : 'vehiclebrandpanelview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Grupos Geocercas',
                        iconCls : 'icon-geocerca',
                        leaf : true,
                        view : 'tablasgruposgeofencegridview',
                        closable: true,
                        closeAction: 'destroy'
                    }]
            },{
                text : 'Configuracion del Sistema',
    			//iconCls : 'icon-transmit',
    			leaf : false,
                expanded: true,
                children : [
                    
                    {
                        text : 'Parámetros',
                        iconCls : 'icon-cog-edit',
                        leaf : true,
                        view : 'tablasparametrosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
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
            			view : 'gatewaygridview',
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
                        text : 'Codigos Alarma',
                        iconCls : 'icon-bell',
                        leaf : true,
                        view : 'tablascodigosalarmagridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Móviles de Respuesta',
                        iconCls : 'icon-car-add',
                        leaf : true,
                        view : 'tablasmovilespatrullagridview',
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
                        text : 'Escalamiento Prioridades',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablasescalarprioridadesgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Escalamiento Prioridades Organizaciones',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablasescalarprioridadesorganizaciongridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Autoridades',
                        iconCls : 'SgWebReporteAut-icon',
                        leaf : true,
                        view : 't_autoridadesgridview',
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
                        text : 'Links Externos',
            			iconCls : 'icon-transmit',
            			leaf : true,
            			view : 'linkurlgridview',
                        closable: true,
                        closeAction: 'destroy'
            		},
                    {
                        text : 'Operadores',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablasoperadoresgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    {
                        text : 'Mail Connector',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 't_mailconnectorgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    {
                        text : 'Redirector',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 't_redirectorgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    {
                        text : 'Mensajes Whatsapp',
                        iconCls : 'icon-whatsapp',
                        leaf : true,
                        view : 'tmensajeswhatsappgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    {
                        text : 'Tipos de servicios',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'tablastiposerviciogridview',
                        closable: true,
                        closeAction: 'destroy'
                    }
                ]
    		},{
                text : 'SerTec',
                iconCls : 'icon-user-orange',
    			leaf : false,
                expanded: true,
                children : [
                   /* {
                        text : 'Tecnicos',
                        iconCls : 'icon-user-orange',
                        leaf : true,
                        view : 'tablastecnicosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },*/
                    {
                        text : 'ST tipo servicios',
                        iconCls : 'icon-shape-square-edit',
                        leaf : true,
                        view : 'sttiposserviciosview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'ST productos',
                        iconCls : 'icon-page-white-wrench',
                        leaf : true,
                        view : 'stproductosview',
                        closable: true,
                        
                        viewConfig: '{showAll:true}',
                        closeAction: 'destroy'
                    },
                    
                    {
                        text : 'ST movil',
                        iconCls : 'icon-car-add',
                        leaf : true,
                        view : 'stmovilview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    {
                        text : 'ST Formas de viaje',
                        iconCls : 'icon-formaviaje',
                        leaf : true,
                        view : 'stformaviajeview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Instaladores/Técnicos',
                        iconCls : 'icon-user',
                        leaf : true,
                        view : 'tablasinstaladoresgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    {
                        text : 'Depósitos (BETA)',
                        iconCls : 'icon-building',
                        leaf : true,
                        view : 'stdepositoview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Stock Movimientos (BETA)',
                        iconCls : 'icon-user',
                        leaf : true,
                        view : 'mstockcabeceraview',
                        closable: true,
                        closeAction: 'destroy'
                    }
                      
                ]
             },
             {
                text : 'Configuración MoneyGuard (BETA)',
            	iconCls : 'icon-table-multiple',
    			leaf : false,
                expanded: true,
                children : [
                    
                    {
                        text : 'Pagos',
                        iconCls : 'icon-money',
                        leaf : true,
                        view : 'pagospanelview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Productos',
                        iconCls : 'icon-page-white-wrench',
                        leaf : true,
                        view : 'prodcutospanelview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    
                    
                    
                    {
                        text : 'Organizaciones facturación',
                        iconCls : 'icon-database-save',
                        leaf : true,
                        view : 'moneyguardorganizaciongridview',
                        closable: true,
                        closeAction: 'destroy'
                    },/*{
                        text : 'Novedades Facturacion',
                        iconCls : 'icon-printer-error',
                        leaf : true,
                        view : 'novedadesfcgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },*/{
                        text : 'Templates de contrato',
                        iconCls : 'icon-page-white-code',
                        leaf : true,
                        viewConfig: '{tipo:"1,3"}',
                        view : 'contratotemplategridview',
                        closable: true,
                        closeAction: 'destroy'
                    }/*,{
                        text : 'Formas de pago',
                        iconCls : 'icon-money',
                        leaf : true,
                        view : 'tablasformadepagogridview',
                        closable: true,
                        closeAction: 'destroy'
                    }*/ /*,{
                        text : 'Tipos formas de pago',
                        iconCls : 'icon-money',
                        leaf : true,
                        view : 'tablastipoformadepagogridview',
                        closable: true,
                        closeAction: 'destroy'
                    } *//*,{
                        text : 'Condiciones formas de pago',
                        iconCls : 'icon-coins',
                        leaf : true,
                        view : 'tablascondicionesdepagogridview',
                        closable: true,
                        closeAction: 'destroy'
                    }*/  ,{
                        text : 'Templates de Avisos',
                        iconCls : 'icon-page-white-add',
                        leaf : true,
                        viewConfig: '{tipo:2}',
                        view : 'contratotemplategridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Tipo de comprobantes',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 't_comprobantes_fcgridview',
                        closable: true,
                        closeAction: 'destroy'
                    }/*,{
                        text : 'ST productos',
                        iconCls : 'icon-page-white-wrench',
                        leaf : true,
                        view : 'stproductosview',
                        closable: true,
                        
                        viewConfig: '{showAll:true}',
                        closeAction: 'destroy'
                    }*//*,{
                        text : 'Listas de precios',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'mg_listas_preciosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    }*/,{
                        text : 'Firmantes',
                        iconCls : 'icon-page-white-edit',
                        leaf : true,
                        view : 't_firmantes_fcgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },/*{
                        text : 'Monedas',
                        iconCls : 'icon-money-dollar',
                        leaf : true,
                        view : 't_monedasgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },*/{
                        text : 'Categorias impositivas',
                        iconCls : 'icon-money-dollar',
                        leaf : true,
                        view : 't_categorias_impositivas_fcgridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Impuestos',
                        iconCls : 'icon-money-dollar',
                        leaf : true,
                        view : 't_impuestos_fcgridview',
                        closable: true,
                        closeAction: 'destroy'
                    } 
                    
                    
                    
                ]
             },{
                text : 'Tablas en Desarrollo',
        		iconCls : 'icon-table-multiple',
    			leaf : false,
                expanded: true,
                children : [
                   /*{
                        text : 'Backup (BETA)',
                        iconCls : 'icon-database-save',
                        leaf : true,
                        view : 'backupview',
                        closable: true,
                        closeAction: 'destroy'
                    }       ,*/{
                        text : 'Awcc destinatarios',
                        iconCls : 'icon-user',
                        leaf : true,
                        view : 'w_destinatarios_correogridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Rangos Ip',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 's_ip_rangegridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Como nos conocio',
                        iconCls : 'icon-table',
                        leaf : true,
                        view : 'comonosconociogridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Lista de correos',
                        iconCls : 'icon-email',
                        leaf : true,
                        view : 'plistacorreogridview',
                        closable: true,
                        closeAction: 'destroy'
                    },
                    /* Creacion para Servicios Vehiculares TrackGuard */
                    {
                        text : 'Mantenimiento Vehicular',
                        iconCls : 'icon-car',
                        leaf : true,
                        view : 'mantvehicularserviciosgridview',
                        closable: true,
                        closeAction: 'destroy'
                    }
                                                           
                ]
    		},{
                
                text : 'Control de Accesos',
        		iconCls : 'icon-control-acceso',
    			leaf : false,
                expanded: true,
                children : [
                    {
                        text : 'Categoría Proveedor',
                        iconCls : 'icon-shape-square-edit',
                        view : 'tablasaccesoscategoriaproveedorgridview',
                        leaf : true,
                        closable: true,
                        profile: '3',
                        closeAction: 'destroy'
                    },{                        
                        text : 'Tipo Documentos Proveedor',
                        iconCls : 'icon-script-gear',
                        view : 'tablasaccesostipodocumentogridview',
                        leaf : true,
                        closable: true,
                        profile: '3',
                        closeAction: 'destroy'
                    },{
                        text : 'Vehículos Proveedores',
                        iconCls : 'icon-car',
                        view : 't_accessvehiculoproveedorgridview',
                        leaf : true,
                        closable: true,
                        profile: '3',
                        closeAction: 'destroy'
                    },{
                        text : 'Puertas (beta)',
                        iconCls : 'icon-door',
                        view : 't_controlacceso_puertagridview',
        				leaf : true,
                        closable: true,                
                        profile: '3',
                        closeAction: 'destroy'
        			}                    
                ]                

            },{
                
                text : 'Gestor Sim',
        		iconCls : 'icon-control-acceso',
    			leaf : false,
                expanded: true,
                children : [
                    {
                        text : 'Marca',
                        iconCls : 'icon-script-gear',
                        view : 't_simcard_marcagridview',
                        leaf : true,
                        closable: true,
                        profile: '3',
                        closeAction: 'destroy'
                    },{                        
                        text : 'APN',
                        iconCls : 'icon-script-gear',
                        view : 't_simcard_apngridview',
                        leaf : true,
                        closable: true,
                        profile: '3',
                        closeAction: 'destroy'
                    },{
                        text : 'Estado',
                        iconCls : 'icon-script-gear',
                        view : 't_simcard_estadogridview',
                        leaf : true,
                        closable: true,
                        profile: '3',
                        closeAction: 'destroy'
                    }                    
                ]                

            }
        ]
	}// cierro children
		// cierra store
})

