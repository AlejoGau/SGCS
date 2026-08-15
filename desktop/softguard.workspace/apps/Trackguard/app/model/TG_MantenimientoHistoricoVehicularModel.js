Ext.define('Trackguard.model.TG_MantenimientoHistoricoVehicularModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tgmh_idkey',
    fields: [
        /* Agrego Name, para el INS del CRUD */
        {name: 'Name', type: 'string'},
        {name: 'tgmh_idkey', type: 'int'},
        {name: 'tgmh_cdescripcion', type: 'string'},
        {name: 'tgmh_idservicio', type: 'int'},
        {name: 'tgmh_iodometro', type: 'int'},
        {name: 'tgmh_idispositivomovil', type:'int'},
        {name: 'tgmh_dfecha', type:'date'}
    ],
    proxy: {
		type : 'rest',
		url : '/Rest/TG_mantenimiento_historico/',
		appendId : true
    }
});
