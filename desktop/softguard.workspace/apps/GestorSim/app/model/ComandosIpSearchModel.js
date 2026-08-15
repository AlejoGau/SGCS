Ext.define('GestorSim.model.ComandosIpSearchModel', {
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
        defaultValue: 3065
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'p_comandos_ip'
        },
        {name:'cmd_tfechahoraiso',type:'date', dateFormat:'c'},
		{name:'cmd_tfechahora',type:'date', dateFormat:'m/d/Y g:i:s A'},
        {name:'cmd_idCuenta',type:'int',defaultValue:0},
        {name:'cmd_idReceptor',type:'int',defaultValue:0},
        {name:'cmd_iComando',type:'int',defaultValue:0},
        {name:'cmd_cValores',type:'string'},
        {name:'cmd_nEstado',type:'int',defaultValue:1},
        {name:'cmd_cObservaciones',type:'string'},
        {name:'cmd_cRespuesta',type:'string'},
        {name: 'tcm_cdescripcion', type: 'string'},
        {name: 'username', type: 'string'}
    ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/search/p_comandos_ip',
		appendId : true
	}
});