//MIGRADO2024
Ext.define('Common.store.DealerReportesStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
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