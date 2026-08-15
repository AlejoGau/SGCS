//MIGRADO2024
Ext.define('Common.model.TripModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        /* Agrego Name, para el INS del CRUD */
        {name: 'Name', type: 'string'},
        {name: 'Id', type: 'int'},
        {name: 'tgv_idkey', type: 'int', mapping:'Id'},
        {name: 'tgv_nombre', type: 'string'},
        {name: 'tgv_fechainicio', type: 'date', dateFormat:'MS'},
        {name: 'tgv_fechafin', type: 'date', dateFormat:'MS'},
        {name: 'tgv_reciid_inicio', type:'int'},
        {name: 'tgv_reciid_fin', type:'int'},
        {name: 'tgv_usuiid', type:'int'},
        {name: 'tgv_cueiid', type:'int'},
        {name: 'tgv_codigoexterno', type:'string'},
        {name: 'tgv_geofenseinicio', type:'int'},
        {name: 'tgv_geofensefin', type:'int'},
        {name: 'tgv_estado', type:'int'},
        {name: 'tgv_fecha_prg_inicio', type: 'date', dateFormat:'MS'},
        {name: 'tgv_fecha_prg_fin', type: 'date', dateFormat:'MS'},
        {name: 'tgv_cuenta_cliente', type:'int'},
        {name: 'tgv_movil_transportista', type:'int'},
        {name: 'tgv_metadata', type: 'string'},
        {name: 'tgv_lugar_inicio', type: 'string'},
        {name: 'tgv_lugar_fin', type: 'string'}
    ],
    proxy: {
		type : 'rest',
		url : '/Rest/M_tgviaje/',
		appendId : true
    }
});