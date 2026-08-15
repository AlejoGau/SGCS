Ext.define('Administrator.store.TecGuardSecurityModulesStore', {
    extend : 'Ext.data.Store',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'TecGuardSecurityModulesStore',
    data : [
		{
			text : 'Cuenta',
			iconCls : 'icon-cuenta',
			leaf : true,
			profile: '0',
			view : 'cuentaformview'
		}, {
			text : 'Situación',
			iconCls : 'icon-search',
			leaf : true,
			profile: '0',
			view : 'estadoview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Automonitoreo',
			iconCls : 'icon-monitor-lightning',
			view : 'automonitoreoformview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Documentos',
			iconCls : 'icon-book-link',
			view : 'documentosgridview',
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
			text : 'Notas',
			iconCls : 'icon-notas',
			leaf : true,
			profile: '0',
			view : 'formnote',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Bitacora',
			iconCls : 'icon-book',
			view : 'bitacoraview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		},  {
				text : 'Horarios',
				iconCls : 'icon-horarios',
				leaf : true,
                profile: '0',
				view : 'horarioview',
                closable: true,
                closeAction: 'destroy'
			},{
			text : 'Informacion Médica',
			iconCls : 'icon-medica',
			leaf : true,
			profile: '0',
			view : 'medicalinfoview',
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
			},{
			text : 'Sms',
			iconCls : 'icon-sms',
			leaf : true,
			profile: '0',
			view : 'smsview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Geocercas',
			iconCls : 'icon-geocerca',
			leaf : true,
			closable: true,
			profile: 0,
			viewConfig: '{\
				collapsible: false,\
				collapsed: false\
			}',
			view : 'geocercagridview'
		},{
			text : 'Seguimiento',
			iconCls : 'icon-map',
			leaf : true,
			profile: '0',
			view : 'tecguardseguimientoformview',
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
		}
		, {
			text : 'Gestión -> Llamadas',
			iconCls : 'icon-telephone-go',
			view : 'llamadagridview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Sms transmitidos',
			iconCls : 'icon-phone-sound',
			view : 'notificacionestabpanelview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}
    ]
});