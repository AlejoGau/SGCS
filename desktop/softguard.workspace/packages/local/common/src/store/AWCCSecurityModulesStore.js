//MIGRADO2024
Ext.define('Common.store.AWCCSecurityModulesStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.ModuleModel',
    id: 'AWCCSecurityModulesStore',
    data : [
            {
    			text : 'Cuenta',
				iconCls : 'icon-cuenta',
				leaf : true,
                profile: '0',
				view : 'cuentaformview'
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
    			text : 'Zonas',
				iconCls : 'icon-zonas',
				leaf : true,
                profile: '0',
				view : 'gridzone',
                closable: true,
                closeAction: 'destroy'
			}/*, {
                text : 'Particiones',
        		iconCls : 'icon-application-cascade',
                view : 'particioneschooserview',
				leaf : true,
                profile: '0',
                closable: true,
                closeAction: 'destroy'
			}*/,  {
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
                profile: '3',
				view : 'notificacionespanelview',
                closable: true,
                closeAction: 'destroy'
			}, {
                text : 'SmartPanics',
                iconCls : 'icon-smartpanic',
                view : 'smartpanicgridview',
                profile: '0',
				leaf : true,
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
			}, {
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
                profile: '0',
                view : 'mgcuentaview'
            }, {
        		text : 'Sms transmitidos',
				iconCls : 'icon-phone-sound',
                view : 'notificacionestabpanelview',
				leaf : true,
                profile: '0',
                closable: true,
                closeAction: 'destroy'
			}, {
            	text : 'Imagenes de eventos',
				iconCls : 'icon-photos',
                view : 'imagenesview',
				leaf : true,
                profile: '0',
                closable: true,
                closeAction: 'destroy'
			}/*, {
                text : 'Scheduler (beta)',
				iconCls : 'icon-photos',
                view : 'schedulegridview',
				leaf : true,
                profile: '0',
                closable: true,
                closeAction: 'destroy'
			}*/
            
            
    ]
});