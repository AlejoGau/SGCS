Ext.define('Trackguard.model.TG_MantenimientoHistoricoVehiculoServiciosSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tgmh_idkey',
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
        {name: 'tgms_icuentatipo',type:'int'},
        
        
        {name: 'tgmh_idkey', type: 'int'},
        {name: 'tgmh_idservicio', type: 'int'},
        {name: 'tgmh_cdescripcion', type: 'string'},
        {name: 'tgmh_iodometro', type: 'int'},
        {name: 'tgmh_idispositivomovil', type: 'int'},
        {name: 'tgmh_dfecha', type:'date'},    
        
        
        ],
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/SearchTG_MantenimientoHistorico_Servicios',
		appendId : true
    }
});