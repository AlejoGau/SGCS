//MIGRADO2024
Ext.define('Common.store.HorarioCierreAntesAlarmaStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueModel',
    storeId: 'HorarioCierreAntesAlarmaStore',
	data : [
        {Name: getLocale('Cierre Fuera de Horario'),    Value: 'CLF'},
        {Name: getLocale('Cierre Fuera de Horario Sin Alerta'),    Value: 'CSA'},
        {Name: getLocale('No Genera Evento'),    Value: '_NG'}
	]
	})