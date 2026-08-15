//MIGRADO2024
Ext.define('Common.model.TG_MantenimientoVehicularServiciosSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tgms_idkey',
    fields: [
        {
        name: 'Name',
        type: 'string'
        },
        {name: 'tgms_idkey', type: 'int'},
        {name: 'tgms_cnombre', type: 'string'},
        {name: 'tgms_cdescripcion', type: 'string'},
        {name: 'tgms_kilometros', type: 'int'},
        {name: 'tgms_meses', type: 'int'},
    	{name: 'tgms_iorganizacion',type:'int'},
        {name: 'tgms_iestado',type:'int'},
        {name: 'tgms_icuentatipo',type:'int'}
        ],
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/SearchTG_Mantenimiento_Servicios',
		appendId : true
    }
});