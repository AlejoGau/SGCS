Ext.define('Administrator.store.DealerReportesStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'CuentaDealerModuleStore',
    root : {
		text : 'Reportes',
		expanded : true,
			children : [
            {
				text : 'Reporte Histórico',
				iconCls : 'icon-reportes',
				leaf : true,
				view : 'recepcionview'
			}, {
				text : 'Reporte Gráfico',
				iconCls : 'icon-reporteGrafico',
				leaf : true,
				view : 'reportegraficoview'
			}]
	}// cierro children
		// cierra store
});