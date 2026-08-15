//MIGRADO2024
Ext.define('Common.model.m_tstconexionModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id',type: 'int'},
        {name: 'Name',type: 'string'},
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
        {name:'txc_cAlarmaAutoprocesa',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/m_tstconexion/',
		appendId : true
	}
});