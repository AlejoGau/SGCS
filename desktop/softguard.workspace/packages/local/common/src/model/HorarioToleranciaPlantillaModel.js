//MIGRADO2024
Ext.define('Common.model.HorarioToleranciaPlantillaModel', {
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
    	defaultValue: 3009
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'HorarioToleranciaPlanilla'
        },
		{name:'tol_iid',type:'int',defaultValue:0},
        {name:'tol_naperturaantes',type:'int',defaultValue:0},
        {name:'tol_caperturaantesalarma',type:'string'},
        {name:'tol_naperturadespues',type:'int',defaultValue:0},
        {name:'tol_caperturadespuesalarma',type:'string'},
        {name:'tol_ncierreantes',type:'int',defaultValue:0},
        {name:'tol_ccierreantesalarma',type:'string'},
        {name:'tol_ncierredespues',type:'int',defaultValue:0},
        {name:'tol_ccierredespuesalarma',type:'string'},
        {name:'tol_nnyo',type:'int',defaultValue:0},
        {name:'tol_nnyc',type:'int',defaultValue:0},
        {name:'tol_nControl',type:'int',defaultValue:0},
        {name:'tol_nModo',type:'int',defaultValue:0},
        {name:'tol_nAPNYO',type:'int',defaultValue:0},
        {name:'tol_nAPNYC',type:'int',defaultValue:0},
        //{name:'tol_dVacacionesHasta',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        //{name:'tol_dVacacionesDesde',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)}
],
		
        
        
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/HorarioToleranciaPlanilla/',
    	appendId : true
	}
});