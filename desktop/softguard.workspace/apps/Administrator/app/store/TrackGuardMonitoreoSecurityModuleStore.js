Ext.define('Administrator.store.TrackGuardMonitoreoSecurityModuleStore', {
    extend : 'Ext.data.Store',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'TrackGuardMonitoreoSecurityModuleStore',
    data : [{
    			text : 'Responsables',
				iconCls : 'icon-usuarios',
				leaf : true,
                closable: true,
                profile: 0,
				view : 'griduser',
                stateId: 'tgMon_griduser'
			},  {
    			text : 'Geocercas',
				iconCls : 'icon-geocerca',
				leaf : true,
                closable: true,
                profile: 0,
				view : 'geocercagridview',
                stateId: 'tgMon_geocercagridview'
			}, {
            	text : 'SMS enviados',
				iconCls : 'icon-sms',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'smsgridview',
                stateId: 'tgMon_smsgridviewr'
			}, {
                text : 'SMS recibidos',
				iconCls : 'icon-sms',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'smsrecibidosgridview',
                stateId: 'tgMon_smsrecibidosgridview'
			},{
				text : 'Viajes',
				iconCls : 'icon-map',
				leaf : true,
				profile: '0',
				view : 'tripgridview',
				viewConfig:'{hideEdit:true,hideComponents:[\'#newTrip\'],hideColumns:[\'actionCrud\',\'tgv_codigoexterno\',\'usu_cnombre\',\'tgv_fechainicio\',\'tgv_fechafin\']}',
				closable: true,
				closeAction: 'destroy'
			}, {
    			text : 'Histórico Posiciones',
				iconCls : 'icon-map',
				leaf : true,
                closable: true,
                profile: 0,
				view : 'vehiclehistorico',
                stateId: 'tgMon_vehiclehistorico'
			}, {
    			text : 'Histórico Eventos',
				iconCls : 'icon-database-table',
				leaf : true,
                closable: true,
                profile: 0,
				view : 'recepcionview',
				viewConfig:'{hideColumns:[\'gps_cMethod\',\'rec_cContenido\',\'_rec_cContenido\',\'rec_cObservaciones\']}',
                stateId: 'tgMon_recepcionview'
			}, {
        		text : 'Rutas',
				iconCls : 'icon-map',
				leaf : true,
                closable: true,
                profile: 0,
				view : 'rutagridview',
                stateId: 'tgMon_rutagridview'
			}, {
        		text : 'Comandos',
				iconCls : 'icon-ipod-cast',
				leaf : true,
                closable: true,
                profile: 0,
				view : 'comandosgpsconfigview',
                stateId: 'tgMon_comandosgpsconfigview'
			}
    ]
})