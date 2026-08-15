Ext.define('Cuenta.store.CuentaAccesoSecurityModulesStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.ModuleModel',
    id: 'CuentaAccesoSecurityModulesStore',
    data : [
		{
			text : 'Cuenta',
			iconCls : 'icon-cuenta',
			leaf : true,
			profile: '0',
			view : 'cuentaformview',
			viewConfig : '{hideComponents:[\'#cuentamadre\',\'#direccion\',\'#direccionentrega\',\'#cue_ctelefono\',\'#cue_cemail\',\'#clavebox\',\'#permiso\',\'#permisoTxt\',\'#idext\']}' //,\'#\
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
			text : 'Usuarios',
			iconCls : 'icon-usuarios',
			leaf : true,
			profile: '0',
			view : 'griduser',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Accesos',
			iconCls : 'icon-zonas',
			leaf : true,
			profile: '0',
			view : 'gridzone',
			viewConfig : '{nuevaZonaString:\'Nuevo Acceso\',newConfig: {hideComponents:[\'#normal\',\'#_tipo\',\'#especial\',\'#codigoAlarma\',\'#listaEmergencia\']}}',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Comandos (beta)',
			iconCls : 'icon-ipod-cast',
			leaf : true,
			closable: true,
			profile: 0,
			view : 'comandosgpsconfigview'
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
		}, {
			text : 'Test',
			iconCls : 'icon-test',
			leaf : true,
			profile: '0',
			view : 'formtest',
			closable: true,
			closeAction: 'destroy',
			viewConfig : '{hideComponents:[\'#controlusopanel\',\'#testcontrollpanel\',\'#testseguidorpanel\']}' //,\'#\'
		}, {
			text : 'Configuración',
			iconCls : 'icon-panel',
			leaf : true,
			profile: '0',
			view : 'panelview',
			viewConfig : '{hideComponents:[\'#nuevo\'],editorConfig:{hideComponents:[\'#callerContainer\',\'#conexionFieldset\']}}',
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
		},{
			text : 'Reporte Histórico',
			iconCls : 'icon-reportes',
			leaf : true,
			profile: '0',
			view : 'recepcionview',
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
		}, {
			text : 'informe -> Multimedia',
			iconCls : 'icon-photos',
			view : 'multimediaeventospanelview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}
    ]

});