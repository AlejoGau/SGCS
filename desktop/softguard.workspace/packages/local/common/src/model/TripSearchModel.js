//MIGRADO2024
Ext.define('Common.model.TripSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tgv_idkey',
    fields: [
        /* Agrego Name, para el INS del CRUD */
        {name: 'Name', type: 'string'},
        {name: 'tgv_idkey', type: 'int'},
        {name: 'tgv_nombre', type: 'string'},
        {name: 'tgv_fechainicio', type: 'date'},
        {name: 'tgv_fechafin', type: 'date'},
        {name: 'tgv_reciid_inicio', type:'int'},
        {name: 'tgv_reciid_fin', type:'int'},
        {name: 'tgv_usuiid', type:'int'},
        {name: 'tgv_cueiid', type:'int'},
        {name: 'tgv_codigoexterno', type:'string'},
        {name: 'tgv_geofenseinicio', type:'int'},
        {name: 'tgv_geofensefin', type:'int'},
        {name: 'tgv_estado', type:'int'},
        {name: 'tgv_fecha_prg_inicio', type: 'date'},
        {name: 'tgv_fecha_prg_fin', type: 'date'},
        {name: 'tgv_cuenta_cliente', type:'int'},
        {name: 'tgv_movil_transportista', type:'int'},
        {name: 'tgv_metadata', type: 'string'},
        {name: 'tgv_lugar_inicio', type: 'string'},
        {name: 'tgv_lugar_fin', type: 'string'},
        {name: 'usu_iidcuenta', type:'int'},
        {name: 'usu_icodigo', type:'int'},
        {name: 'usu_cnombre', type:'string'},
        {name: 'usu_iid', type:'int'},
        {name: 'usu_cclave', type:'int'},
        {name: 'usu_ntipo', type:'int'},
        {name: 'usu_cimagen', type:'string'},
        {name: 'usu_mobservacion', type:'string'},
        {name: 'usu_idKey', type:'int'},
        {name: 'usu_cIdExtendido', type:'int'},
        {name: 'usu_cmetadata', type:'string'},
        {name: 'usu_teliid', type:'int'},
        {name: 'usu_cidentificacion', type:'int'},
        {name: 'cue_iid', type:'int'},
        {name: 'cue_cnombre', type:'string'},
        {name: 'cue_ncuenta', type:'string'},
        {name: 'cue_clinea', type:'string'},
        {name: 'cue_cimei', type:'string'},
        {name: '_cuentanombre', type:'string', convert:function(value,record){
            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')
        }},
        {name: '_geo_inicio_nombre', type:'string'},
        {name: '_geo_fin_nombre', type:'string'},
        {name: '_cliente_nombre', type:'string'},
        {name: '_cliente_contrato', type:'string'},
        {name: '_cliente_documento', type:'string'},
        {name: '_cliente_numero', type:'string'},
        {name: '_transportista_matricula', type:'string'},
        {name: '_transportista_nombre', type:'string'},
        {name: '_transportista_chasis', type:'string'},
        {name: '_transportista_responsable', type:'string'},
        {name: '_transportista_maxspeed', type:'int'}
        
    ],
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/M_tgviaje',
		appendId : true
    }
});