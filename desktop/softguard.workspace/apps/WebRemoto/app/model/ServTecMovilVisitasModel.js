Ext.define('WebRemoto.model.ServTecMovilVisitasModel', {
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
        },{
            name: 'smv_iMovil',
            type: 'int'
        },{
            name: 'smv_iVisita',
            type: 'int'
        }
        
        
   ],
    proxy: {
        type : 'rest',
        url : '/Rest/SerTecMovilesVisitas/',
        appendId : true
    }
});