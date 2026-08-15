Ext.define( 'Administrator.store.SgAppAccessControlSecurityStore', {
    extend: 'Ext.data.Store',
    model: 'Administrator' + '.model.ModuleModel',
    id: 'SmarttrackCuentaModuleStore',
    data: [
		{
			text: 'Cuenta',
			iconCls: 'icon-cuenta',
			leaf: true,
            profile: '3',
			view: 'cuentaformview'
		}, {
			text: 'Usuarios',
			iconCls: 'icon-usuarios',
			leaf: true,
            profile: '3',
			view: 'griduser',
            closable: true,
            closeAction: 'destroy',
            viewConfig: '{ collapsed: false, hideTipo:3}'
            // viewConfig : '{ module:{profile: 2}, collapsed: false, hideTipo:3}' //se comento el dia 17/08/2017
		}, {
			text: 'Vehículos',
			iconCls: 'icon-car',
			leaf: true,
            profile: '3',
			view: 'gridvehicle',
            closable: true,
            closeAction: 'destroy'
		}, {
			text: 'Contactos',
			iconCls: 'icon-telefonos',
			leaf: true,
            profile: '3',
			view: 'gridphones',
            closable: true,
            closeAction: 'destroy'
		},/*
		FJalil se comenta el 07/08/23 por lo pedido en la tarea: https://softguard.atlassian.net/browse/DS-816
		 {
			text: 'Informacion Médica',
			iconCls: 'icon-medica',
			leaf: true,
            profile: '0',
			view: 'medicalinfoview',
            closable: true,
            closeAction: 'destroy'
		}, {
			text: 'Notas',
			iconCls: 'icon-notas',
			leaf: true,
            profile: '3',
            view: 'formnote',
            closable: true,
            closeAction: 'destroy'
		}, {
			text: 'Autorizaciones',
			iconCls: 'icon-notas',
			leaf: true,
            profile: '3',
            view: 'p_controlacceso_autorizacionview',
            closable: true,
            closeAction: 'destroy',
            viewConfig: '{ filterbycuenta: true}'
		},*/
		{
			text: 'Configuración',
			iconCls: 'icon-panel',
			leaf: true,
			profile: '0',
			view: 'panelview',
			viewConfig: '{hideComponents:[\'#nuevo\'],editorConfig:{hideComponents:[\'#callerContainer\',\'#conexionFieldset\']}}',
			closable: true,
			closeAction: 'destroy'
		},
		{
			text: 'Informe-> Reporte Historico',
			iconCls: 'icon-reportes',
			leaf: true,
            profile: '3',
            view: 'recepcionview',
            closable: true,
            closeAction: 'destroy',
            viewConfig: '{ filterbycuenta: true}'
		}
    ]

});