//MIGRADO2024
Ext.define('Common.model.ServTecTecnicoVisitasModel', {
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
        defaultValue: 3102
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'm_st_cabecera'
        },
		{name:'stv_idKey',type:'int',defaultValue:0},
        {name:'Name',type:'string'},
        {name:'stv_iTecnico',type:'int'},
        {name:'stv_iVisita',type:'int'},
        {name:'stv_iFormaDeViaje',type:'int'},
        
        
   ],
    proxy: {
        type : 'rest',
        url : '/Rest/SerTecTecnicoVisitas/',
        appendId : true,
        writer: {writeAllFields:true}
    }
});