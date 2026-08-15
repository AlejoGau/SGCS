//MIGRADO2024
Ext.define('Common.store.HorarioAperturaAntesAlarmaStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueModel',
    storeId: 'HorarioAperturaAntesAlarmaStore',
	data : [
        {Name: getLocale('Apertura Fuera de Horario'),    Value: 'OPF'},
        {Name: getLocale('Apertura Fuera de Horario Sin Alerta'),    Value: 'OSA'},
        {Name: getLocale('No Genera Evento'),    Value: '_NG'}
	]
});