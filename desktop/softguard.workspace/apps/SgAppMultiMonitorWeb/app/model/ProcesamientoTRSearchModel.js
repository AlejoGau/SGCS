Ext.define('SgAppMultiMonitorWeb.model.ProcesamientoTRSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        mapping : 'etl_idKey'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3092
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'ProcesamientoTR'
        },
		{name:'etl_cAccion',type:'string'},
        {name:'etl_cObservacion',type:'string'},
        {name:'etl_iOperador',type:'int'},
        {name:'etl_iRecID',type:'int'},
        {name:'etl_iCuenta',type:'int'},
        {name:'etl_cOwner',type:'string'},
        {name:'etl_tFechaHora',type:'date'},
        {name:'rec_nestado',type:'int'},
        {name:'rec_calarma',type:'string'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'_iconos',type:'string',defaultValue : ''}


        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/ProcesamientoTR',
		appendId : true
	}
});