Ext.define('AdministratorSearch.model.m_reportes_automaticos_dealerGridSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
				name : 'Id',
				type : 'int'
			}, {
				name : 'Name',
				type : 'string'
			}, 
			{name:'rad_ntipo',type:'int',defaultValue:0},
            {name:'rad_linidkey',type:'int',defaultValue:0},
            {name:'rad_tproximoenvio'},
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
		url : '/Rest/search/m_reportes_automaticos_dealer',
		appendId : true
	}
});