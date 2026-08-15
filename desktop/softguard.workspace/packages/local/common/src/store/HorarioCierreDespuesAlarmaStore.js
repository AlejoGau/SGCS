//MIGRADO2024
Ext.define('Common.store.HorarioCierreDespuesAlarmaStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueModel',
    storeId: 'HorarioCierreDespuesAlarmaStore',
	data : [
        {Name: getLocale('Cierre Fuera de Horario'),    Value: 'CLF'},
        {Name: getLocale('Cierre Fuera de Horario Sin Alerta'),    Value: 'CSA'},
        {Name: getLocale('No Genera Evento'),    Value: '_NG'}
	]
});