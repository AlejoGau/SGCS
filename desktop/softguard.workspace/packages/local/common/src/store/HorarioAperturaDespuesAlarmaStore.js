//MIGRADO2024
Ext.define('Common.store.HorarioAperturaDespuesAlarmaStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueModel',
    storeId: 'HorarioAperturaDespuesAlarmaStore',
	data : [
        {Name: getLocale('Apertura Fuera de Horario'),    Value: 'OPF'},
        {Name: getLocale('Apertura Fuera de Horario Sin Alerta'),    Value: 'OSA'},
        {Name: getLocale('No Genera Evento'),    Value: '_NG'}
	]
});