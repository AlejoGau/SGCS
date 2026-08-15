//MIGRADO2024
Ext.define('Common.model.HorarioToleranciaModel', {
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
            {name:'tol_naperturaantes',type:'int',defaultValue:1},
            {name:'tol_caperturaantesalarma',type:'string',defaultValue:''},
            {name:'tol_naperturadespues',type:'int',defaultValue:1},
            {name:'tol_caperturadespuesalarma',type:'string',defaultValue:''},
            {name:'tol_ncierreantes',type:'int',defaultValue:1},
            {name:'tol_ccierreantesalarma',type:'string',defaultValue:''},
            {name:'tol_ncierredespues',type:'int',defaultValue:1},
            {name:'tol_ccierredespuesalarma',type:'string',defaultValue:''},
            {name:'tol_nnyo',type:'int',defaultValue:2},
            {name:'tol_nnyc',type:'int',defaultValue:2},
            {name:'tol_nControl',type:'int',defaultValue:2},
            {name:'tol_nModo',type:'int',defaultValue:0},
            {name:'tol_nAPNYO',type:'int',defaultValue:2},
            {name:'tol_nAPNYC',type:'int',defaultValue:2},
            {
                name: 'tol_iidcuenta',
                type: 'int'
            },
            {name:'tol_dVacacionesHasta',type:'date', dateFormat:'MS', defaultValue: new Date('1/1/1970')},
            {name:'tol_dVacacionesDesde',type:'date', dateFormat:'MS', defaultValue: new Date('1/1/1970')}
        ],
     /*   validations:[
        {type: 'presence',  field: 'tol_nControl'},
        {type: 'presence',  field: 'tol_nModo'},
        {type: 'presence',  field: 'tol_nAPNYO'},
        {type: 'presence',  field: 'tol_nAPNYC'},
        {type: 'presence',  field: 'tol_naperturaantes'},
        {type: 'presence',  field: 'tol_naperturadespues'},
        {type: 'presence',  field: 'tol_ncierreantes'},
        {type: 'presence',  field: 'tol_ncierredespues'},
        {type: 'presence',  field: 'tol_nnyo'},
        {type: 'presence',  field: 'tol_nnyc'}
    ],*/
    proxy : {
    	type : 'horariotoleranciaproxy',
        url : '/Rest/HorarioTolerancia/',
    	appendId : true,
        writer: {writeAllFields: true}
	}
});