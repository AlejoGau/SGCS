//MIGRADO2024
Ext.define('Common.model.m_tstconexionSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
		defaultValue: 3216
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_tstconexion'
        },
		{name:'txc_idCuenta',type:'int',defaultValue:0},
        {name:'txc_idIRSConn',type:'int',defaultValue:0},
        {name:'txc_cAlarmaEsperada',type:'string'},
        {name:'txc_iMinutos',type:'int',defaultValue:0},
        {name:'txc_cAlarmaAGenerar',type:'string'},
        {name:'txc_cAlarmaAutoprocesa',type:'string'},
        {name:'ipc_cdescripcion',type:'string'},
        {name:'cod_cdescripcion_esperada',type:'string'},
        {name:'cod_cdescripcion_generar',type:'string'}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_tstconexion',
		appendId : false
	}
});