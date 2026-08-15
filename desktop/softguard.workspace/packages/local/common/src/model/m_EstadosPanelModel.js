//MIGRADO2024
Ext.define('Common.model.m_EstadosPanelModel', {
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
        defaultValue: 3090
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_EstadosPanel'
        },
        {name:'mep_idCuenta',type:'int'},
        {name:'mep_cAlarmaControl',type:'string'},
        {name:'mep_iUsuarioControl',type:'int'},
        {name:'mep_cAlarmaEsperada',type:'string'},
        {name:'mep_iUsuarioEsperado',type:'int'},
        {name:'mep_iMinutos',type:'int'},
        {name:'mep_iAutoProcesa',type:'int'},
        {name:'mep_cAlarmaAGenerar',type:'string'}
    ],
    proxy: {
        type : 'rest',
		url : '/Rest/m_EstadosPanel/',
		appendId : true,
        writer: {writeAllFields: true}
	}
});