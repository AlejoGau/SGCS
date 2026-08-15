//MIGRADO2024
Ext.define('Common.model.m_EstadosPanelSearchModel', {
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
        {name:'mep_cAlarmaAGenerar',type:'string'},
        
        
        {name:'usuarioControl',type:'string'},
        {name:'usuarioEsperado',type:'string'},
        {name:'alarmaControl',type:'string'},
        {name:'alarmaEsperada',type:'string'},
        {name:'alarmaGenerar',type:'string'},
        
        
        
        {name:'autoprocesar',type:'string', convert: function (v,r) {
            if(r.get('mep_iAutoProcesa') == 1) {
                return getLocale('Si')
            } else {
                return getLocale('No')
            }
        }},
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_EstadosPanel',
		appendId : true
	}
});