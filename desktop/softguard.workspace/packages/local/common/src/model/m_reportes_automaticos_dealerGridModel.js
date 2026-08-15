Ext.define('Common.model.m_reportes_automaticos_dealerGridModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
	fields : [{
				name : 'Id',
				type : 'int'
			}, {
				name : 'Name',
				type : 'string'
			}, 
			{name:'rad_ntipo',type:'int',defaultValue:0},
            {name:'rad_linidkey',type:'int',defaultValue:0},
            {name:'rad_tproximoenvio',type:'date', dateFormat:'MS'},
            {name:'rad_nfrecuencia',type:'int',defaultValue:0},
            {name:'rad_cmail',type:'string'},
            {name:'rad_meventos',type:'string'},
            {name:'rad_idGrupo',type:'int'},
            {name:'rad_nAlerta',type:'int',defaultValue:0}
    ],

     proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/m_reportes_automaticos_dealer/',
		appendId : true
	}
});