//MIGRADO2024
Ext.define( 'Common.store.WebDealerSecurityModulesStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.ModuleModel',
    id: 'WebDealerSecurityModulesStore',
    data: [
		{
			text: 'Cuenta',
			iconCls: 'icon-cuenta',
			leaf: true,
			profile: '0',
			view: 'cuentaformview'
		}, {
			text: 'SituaciÃ³n',
			iconCls: 'icon-search',
			leaf: true,
			profile: '0',
			view: 'estadoview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Automonitoreo',
			iconCls: 'icon-monitor-lightning',
			view: 'automonitoreoformview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Documentos',
			iconCls: 'icon-book-link',
			view: 'documentosgridview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
        }, {
            text: 'Usuarios',
            iconCls: 'icon-usuarios',
            leaf: true,
            profile: '0',
            view: 'griduser',
            closable: true,
            closeAction: 'destroy'
        }, {
            text: 'Contactos',
            iconCls: 'icon-telefonos',
            leaf: true,
            profile: '0',
            view: 'gridphones',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Contactos Juridiccionales',
			iconCls: 'icon-phone',
			leaf: true,
			profile: '0',
			view: 'tablastelefonosjuridiccionalesaccgridview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Zonas',
			iconCls: 'icon-zonas',
			leaf: true,
			profile: '0',
			view: 'gridzone',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Particiones',
			iconCls: 'icon-application-cascade',
			view: 'particioneschooserview',
			leaf: true,
			profile: '0',
			viewConfig: '{filters: [{property: \'zon_ccodigo:like\',value: \'PAR\',id:\'zon_ccodigo\'}]}', //coment oesto porque no muestra particiones {property: \'tip_ntipo:NOT\',value: \'8\',id:\'tip_ntipo\'}, 
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Notas',
			iconCls: 'icon-notas',
			leaf: true,
			profile: '0',
			view: 'formnote',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Bitacora',
			iconCls: 'icon-book',
			view: 'bitacoraview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Horarios',
			iconCls: 'icon-horarios',
			leaf: true,
			profile: '0',
			view: 'horarioview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Informacion MÃ©dica',
			iconCls: 'icon-medica',
			leaf: true,
			profile: '0',
			view: 'medicalinfoview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Falsas',
			iconCls: 'icon-date-edit',
			leaf: true,
			profile: '0',
			view: 'formfalsetest',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Test',
			iconCls: 'icon-test',
			leaf: true,
			profile: '0',
			view: 'formtest',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Panel de alarma',
			iconCls: 'icon-panel',
			leaf: true,
			profile: '0',
			view: 'panelview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Sms',
			iconCls: 'icon-sms',
			leaf: true,
			profile: '0',
			view: 'smsview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Usuarios AWCC',
			iconCls: 'icon-usuarios',
			leaf: true,
			profile: '0',
			view: 'awccdiyuntor',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Video link',
			iconCls: 'icon-film',
			view: 'videoxcuentapanelview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
            text: 'SofIA VideoVerificación',
            iconCls: 'icon-eye',
            view: 'cuentasofiaview',
            leaf: true,
            profile: '0',
            closable: true,
            closeAction: 'destroy'
        }, {
			text: 'SmartPanics',
			iconCls: 'icon-smartpanic',
			view: 'smartpanicgridview',
			leaf: true,
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Control Accesos',
			iconCls: 'icon-door',
			view: 'particionesgridview',
			leaf: true,
			profile: '0',
			viewConfig: '{newText:\'Nuevo control de acceso\',hideComponents:[\'#btnModificarParticion\'],hideColumns:[\'cue_cnombre\'],filters: [{property: \'zon_ccodigo:like\',value: \'ACC\',id: \'zon_ccodigo\'},{property: \'tip_ntipo\',value: \'8\'}], newConfig: {createTipo:8,hideComponents:[\'#particion\',\'#cue_ilicenciapar\',\'#cuentasparticiones\',\'#fieldsetCopy\']}}',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Servicio Tecnico',
			iconCls: 'icon-wrench-orange',
			leaf: true,
			profile: '0',
			view: 'multicuentaserviciotecnicoextdelaersearchgridview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Reporte HistÃ³rico',
			iconCls: 'icon-reportes',
			leaf: true,
			profile: '0',
			view: 'recepcionview',
			closable: true,
			closeAction: 'destroy'
		}
		, {
			text: 'Reporte GrÃ¡fico.',
			iconCls: 'icon-reporteGrafico',
			leaf: true,
			profile: '0',
			view: 'reportegraficoview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'GestiÃ³n -> Llamadas',
			iconCls: 'icon-telephone-go',
			view: 'llamadagridview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'informe -> MoneyGuard',
			iconCls: 'icon-moneyguard-16',
			leaf: true,
			closable: true,
			view: 'mgcuentaview'
		}, {
			text: 'Sms transmitidos',
			iconCls: 'icon-phone-sound',
			view: 'notificacionestabpanelview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'informe -> Multimedia',
			iconCls: 'icon-photos',
			view: 'multimediaeventospanelview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'informe -> AuditorÃ­a',
			iconCls: 'icon-eye',
			view: 'auditgridview',
			leaf: true,
			hidden: true,
			profile: '0',
			closable: true,
			viewConfig: '{hideColumns:[\'#cuenta\'],hideComponents: [\'#queryType\',\'#query\',\'#export\']}',
			closeAction: 'destroy'
		}, {
			text: 'Scheduler (beta)',
			iconCls: 'icon-cog',
			view: 'schedulegridview',
			leaf: true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text: 'Comandos (beta)',
			iconCls: 'icon-ipod-cast',
			leaf: true,
			closable: true,
			profile: 0,
			view: 'comandosgpsconfigview'
		}, {
			text: 'Control de test x origen (beta)',
			iconCls: 'icon-test',
			leaf: true,
			closable: true,
			profile: 0,
			view: 'm_tstconexiongridview'
		}
		// ocultar pedido por Fer 28/08/2019
		// se vuelve a mostrar BC 351621731
		, {
			text: 'Control estados panel',
			iconCls: 'icon-timeline-marker',
			leaf: true,
			closable: true,
			profile: 0,
			view: 'm_estadospanelgridview'
		}
		/*{
			text: "Grabar llamada entrante",
			iconCls: 'icon-sound-add',
			leaf: true,
			closable: true,
			profile: 0,
			view: 'm_estadospanelgridview'
		}*/
		/*, {
			text : 'Monitoreo (En desarrollo)',
			iconCls : 'icon-ipod-cast',
			leaf : true,
			closable: true,
			profile: 0,
			view : 't_monitoreo_dealergridview'
		}*//*, {
			text : 'Smartpanic configuracion (En desarrollo)',
			viewConfig : '{ byDealer:true }',
			iconCls : 'icon-ipod-cast',
			leaf : true,
			closable: true,
			profile: 0,
			view : 'smartpanicconfigview'
		}*/
    ]
});

