//MIGRADO2024
Ext.define('Common.model.ServTecMovilesSearchModel', {
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
            name: 'mov_ccodigo',
            type: 'string'
        },{
            name: 'mov_cdescripcion',
            type: 'string'
        },{
            name: 'mov_mobservaciones',
            type: 'string'
        },{
            name: 'mov_ipatrullaID',
            type: 'int'
        }
        
        
   ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/ServTecMoviles',        
        appendId : false
    }
    
});