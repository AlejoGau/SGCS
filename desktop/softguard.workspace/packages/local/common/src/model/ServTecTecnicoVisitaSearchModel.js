//MIGRADO2024
Ext.define('Common.model.ServTecTecnicoVisitaSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {        
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },{
            name: 'stv_iTecnico',
            type: 'int'
        },{
            name: 'svi_cObservacion',
            type: 'string'
        },{
            name: 'svi_iEstado',
            type: 'string'
        },{
            name: 'svi_iFormaDeViaje',
            type: 'string'
        },{
            name: 'svi_iVisita',
            type: 'string'
        },{
            name: 'svi_tFechaHora',
            type: 'string'
        },{
            name: 'sfv_cNombre',
            type: 'string'
        },
        
        
        
        {
            name: 'ins_cDealer',
            type: 'string'
        },{
            name: 'ins_ccalle',
            type: 'string'
        },{
            name: 'ins_ccodigo',
            type: 'string'
        },{
            name: 'ins_cdepartamento',
            type: 'string'
        },{
            name: 'ins_cempresa',
            type: 'string'
        },{
            name: 'ins_cmail',
            type: 'string'
        },{
            name: 'ins_cnombre',
            type: 'string'
        },{
            name: 'ins_ctelefono',
            type: 'string'
        },{
            name: 'ins_iTipo',
            type: 'string'
        },{
            name: 'ins_idKey',
            type: 'string'
        },{
            name: 'ins_inumero',
            type: 'string'
        },{
            name: 'ins_npiso',
            type: 'string'
        }
        
        
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/SerTecTecnicoVisitas',        
        appendId : false
	}
});