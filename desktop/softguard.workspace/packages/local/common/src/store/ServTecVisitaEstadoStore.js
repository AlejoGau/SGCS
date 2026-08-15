//MIGRADO2024
Ext.define('Common.store.ServTecVisitaEstadoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'ServTecVisitaEstadoStore',
    data: [
		{Name: 'Pendiente',    Value: 1},
		{Name: 'Asignado',    Value: 2},
        {Name: 'En Ejecucion',    Value: 5},
        {Name: 'Finalizado',    Value: 4},
        {Name: 'Cancelado',    Value: 3},
        {Name: 'Programada',    Value: 6}
	]
});