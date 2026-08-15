//MIGRADO2024
Ext.define('Common.model.TG_MantenimientoVehicularServiciosModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tgms_idkey',
    fields: [
        /* Agrego Name, para el INS del CRUD */
        {
        name: 'Name',
        type: 'string'
        },
        {name: 'tgms_idkey', type: 'int'},
        {name: 'tgms_cnombre', type: 'string'},
        {name: 'tgms_cdescripcion', type: 'string'},
        {name: 'tgms_kilometros', type: 'int'},
        {name: 'tgms_meses', type: 'int'},
		{name:'tgms_iorganizacion',type:'int'},
        {name:'tgms_iestado',type:'int'},
        {name:'tgms_icuentatipo',type:'int'}
        ],
    proxy: {
		type : 'rest',
		url : '/Rest/t_TG_mantenimiento_servicios/',
		appendId : true
    }
});