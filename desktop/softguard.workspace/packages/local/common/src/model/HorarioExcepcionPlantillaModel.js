//MIGRADO2024
Ext.define('Common.model.HorarioExcepcionPlantillaModel', {
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
    	defaultValue: 3007
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'HorarioExcepcionPlanilla'
        },
		{name:'exc_iid',type:'int',defaultValue:0},
        {name:'exc_cevento',type:'string'},
        {name:'exc_cHoraApertura',type:'string'},
        {name:'exc_cHoraCierre', type:'string'}
    ],
		
        
        
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/HorarioExcepcionPlanilla/',
        appendId : true
	}
});