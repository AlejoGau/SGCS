//MIGRADO2024
Ext.define('Common.store.SgAppMWStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'sgappmwstore',
    root : {
        text : 'Tablas del sistema',
        expanded : true,
        children : [
            
            /*{
                text : 'Datos variables',
    			//iconCls : 'icon-transmit',
    			leaf : false,
                expanded: true,
                children : [
                    //{
                    //	text : 'Nota temporal',
            		///	iconCls : 'icon-transmit',
            		//	leaf : true,
            		//	view : 'notatemporalroview',
                    //    closable: true,
                    //    closeAction: 'destroy'
            		//},{
                		text : 'Foto de zona',
            			iconCls : 'icon-photo',
            			leaf : true,
            			view : 'zonaimagenbyeventoview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                    	text : 'Foto de cuenta',
            			iconCls : 'icon-page-white-code',
            			leaf : true,
            			view : 'cuentaimagenview',
                        closable: true,
                        closeAction: 'destroy'
            		},{
                        text : 'Descripción de panel',
            			iconCls : 'icon-page-white-code',
            			leaf : true,
            			view : 'paneldescripcionbyeventoview',
                        closable: true,
                        closeAction: 'destroy'
            		}//,{
                    //    text : 'Morosidad',
            		//	iconCls : 'icon-page-white-code',
            	//		leaf : true,
                   //     hidden: true,
            	//		view : 'formatosgridview',
                   //     closable: true,
                  //      closeAction: 'destroy'
            	//	},{
                 //       text : 'Falsas alarmas superadas',
                //		iconCls : 'icon-page-white-code',
            	//		leaf : true,
            	//		view : 'formatosgridview',
                  //      closable: true,
                  //      closeAction: 'destroy'
            	//	}
                 //   ,{
                  //      text : 'Llamadas telefonicas',
                   // 	iconCls : 'icon-page-white-code',
            	//		leaf : true,
                   //     hidden: true,
            	///		view : 'eventphonegridview',
                  //      closable: true,
                  //      closeAction: 'destroy'
            	//	}
                , {
                        text : 'Eventos de Particiones',
                    	iconCls : 'icon-application-cascade',
                        view : 'particioneschooserview',
        				leaf : true,
                        profile: '0',
                        closable: true,
                        closeAction: 'destroy',
                        viewConfig: '{ultimaAlarma: true}'
        			}
                    
                    
                ]
    		},*/
            
            /*{
                text : 'Datos de la cuentas',
    			//iconCls : 'icon-transmit',
    			leaf : false,
                expanded: true,
                children : [*/
                    {
            			text : 'Cuenta',
        				iconCls : 'icon-cuenta',
        				leaf : true,
                        profile: '0',
                        closable: true,
        				view : 'cuentaformview',
                        viewConfig:'{readOnly: false}'
                        //viewConfig: "{security: {modules:{view: 'cuentaformview',profile: 1}}}"
        			}, {
                		text : 'Situación',
        				iconCls : 'icon-search',
        				leaf : true,
                        profile: '0',
        				view : 'estadoview',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
                        text : 'Documentos',
            			iconCls : 'icon-book-link',
                        view : 'documentosnewgridview',
        				leaf : true,
                        profile: '0',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
        				text : 'Usuarios',
        				iconCls : 'icon-usuarios',
        				leaf : true,
                        profile: '0',
        				view : 'griduser',
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
        			}, {
                		text : 'Contactos Juridiccionales',
        				iconCls : 'icon-phone',
        				leaf : true,
                        profile: '0',
        				view : 'tablastelefonosjuridiccionalesaccgridview',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
        				text : 'Zonas',
        				iconCls : 'icon-zonas',
        				leaf : true,
                        profile: '0',
        				view : 'gridzone',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
                        text : 'Particiones',
                		iconCls : 'icon-application-cascade',
                        view : 'particioneschooserview',
        				leaf : true,
                        profile: '0',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
        				text : 'Notas',
        				iconCls : 'icon-notas',
        				leaf : true,
                        profile: '0',
                        view : 'formnote',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
                        text : 'Bitacora',
            			iconCls : 'icon-book',
                        view : 'bitacoraview',
        				leaf : true,
                        profile: '0',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
        				text : 'Horarios',
        				iconCls : 'icon-horarios',
        				leaf : true,
                        profile: '0',
        				view : 'horarioview',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
        				text : 'Informacion Médica',
        				iconCls : 'icon-medica',
        				leaf : true,
                        profile: '0',
        				view : 'medicalinfoview',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
        				text : 'Falsas',
        				iconCls : 'icon-date-edit',
        				leaf : true,
                        profile: '0',
        				view : 'formfalsetest',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
            			text : 'Test',
        				iconCls : 'icon-test',
        				leaf : true,
                        profile: '0',
        				view : 'formtest',
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
        				text : 'Sms',
        				iconCls : 'icon-sms',
        				leaf : true,
                        profile: '0',
        				view : 'smsview',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
            			text : 'Usuarios AWCC',
        				iconCls : 'icon-usuarios',
        				leaf : true,
                        profile: '0',
        				view : 'awccusuariosgridview',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
                        text : 'Video link',
                    	iconCls : 'icon-film',
                        view : 'videoxcuentapanelview',
        				leaf : true,
                        profile: '0',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
            			text : 'Smartpanic',
        				iconCls : 'icon-phone',
        				leaf : true,
                        profile: '0',
        				view : 'smartpanicgridview',
                        closable: true,
                        closeAction: 'destroy',                        
                        viewConfig: '{noOpenServtecEditForm: true, _OpenMaximize:false}'						
        			}, {
            			text : 'Servicio Tecnico',
        				iconCls : 'icon-wrench-orange',
        				leaf : true,
                        profile: '0',
        				view : 'multicuentaserviciotecnicogridview',
                        closable: true,
                        closeAction: 'destroy',                        
                        viewConfig: '{noOpenServtecEditForm: true, _OpenMaximize:false}'
						
        			},{
            			text : 'Reporte Histórico',
        				iconCls : 'icon-reportes',
        				leaf : true,
                        profile: '0',
        				view : 'recepcionview',
                        closable: true,
                        closeAction: 'destroy'
        			}, {
        				text : 'Reporte Gráfico.',
        				iconCls : 'icon-reporteGrafico',
        				leaf : true,
                        profile: '0',
        				view : 'reportegraficoview',
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
        			},{
                        text : 'MoneyGuard',
                        iconCls : 'icon-moneyguard-16',
                        leaf : true,
                        closable: true,
                        view : 'mgcuentaview'
                    }, {
                		text : 'Sms transmitidos',
        				iconCls : 'icon-phone-sound',
                        view : 'notificacionestabpanelview',
        				leaf : true,
                        profile: '0',
                        closable: true,
                        closeAction: 'destroy'
        			},{
                    	//text : 'Imagenes de eventos',
						text : 'informe -> Multimedia',
        				iconCls : 'icon-photos',
                        //view : 'imagenesview',
						view : 'multimediaeventospanelview',
        				leaf : true,
                        profile: '0',
                        closable: true,
                        closeAction: 'destroy'
        			}
               /* ]
    		}*/
        ]
	}// cierro children
		// cierra store
})