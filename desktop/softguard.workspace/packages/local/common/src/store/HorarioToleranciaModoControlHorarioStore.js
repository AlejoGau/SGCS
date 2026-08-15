//MIGRADO2024
Ext.define('Common.store.HorarioToleranciaModoControlHorarioStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    storeId: 'HorarioToleranciaModoControlHorarioStore',
    autoSync: false,
    model: 'Common.model.NameValueIntModel',
	data: [
		{Name: getLocale('Por Ciclos'),    Value: 0},
		{Name: getLocale('Por Rangos'),    Value: 1}
	]
});
// se invirtieron los valores 10/2/2017 por pedido de Mauro.