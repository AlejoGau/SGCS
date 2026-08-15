//MIGRADO2024
Ext.define('Common.store.EventoEstadoStore', {
    extend: 'Ext.data.Store',
    fields: [
        'Name', 
        {name: 'Value', type:'int'}
	],
    storeId: 'EventoEstadoStore',
	data : [
            {Name: getLocale('Nuevo/Pendiente'), Value: 0},
			{Name: getLocale('En Proceso'), Value: 1},
			{Name: getLocale('Espera'), Value: 2},
			{Name: getLocale('Procesado'), Value: 3},
			{Name: getLocale('En proceso desde Espera'), Value: 4},
			{Name: getLocale('Procesado (No alerta)'), Value: 5},
			{Name: getLocale('Procesado (Modo prueba)'), Value: 6},
			{Name: getLocale('Procesado (Modo deshabilitado)'), Value: 7},
            //{Name: 'Llamado telefónico', Value: 8},// filtrar por defecto
            {Name: getLocale('En proceso múltiple'), Value: 9}
		]
});