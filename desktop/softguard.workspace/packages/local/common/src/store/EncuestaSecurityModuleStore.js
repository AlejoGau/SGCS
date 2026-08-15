//MIGRADO2024
Ext.define('Common.store.EncuestaSecurityModuleStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.ModuleModel',
    id: 'EncuestaSecurityModuleStore',
    data : [{
            text : 'Formulario',
            iconCls : 'icon-textfield',
            leaf : true,
            profile : '0',
			view : 'encuestasformview',
            closable : false
		},{
            text : 'Estadistica por opción',
            iconCls : 'icon-prioridad',
            leaf : true,
            profile : '0',
			view : 'encuestasestadisticaopcionview',
            closable : false
		},{
            text : 'Listado de Dispositivos por estado',
            iconCls : 'icon-phone',
            leaf : true,
            profile : '0',
			view : 'encuestasestadisticaestadogridview',
            closable : false
		},{
            text : 'Listado de textos libres agregados',
            iconCls : 'icon-reporte-estadisticacategorizacion',
            leaf : true,
            profile : '0',
			view : 'encuestaslistadotextosview',
            closable : false
		},{
            text : 'Estadistica por estado',
            iconCls : 'icon-prioridad',
            leaf : true,
            profile : '0',
			view : 'encuestasnocompletasview',
            closable : false
		}
    ]
});