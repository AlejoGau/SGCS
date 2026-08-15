//MIGRADO2024
Ext.define('Common.model.ServTecHistoricoModel', {
   extend: 'Ext.data.Model',
   idProperty: 'Id',
   fields: [
       {        
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },{
            name: 'stl_iServicio',
            type: 'int'

            
        },{
                name: 'ObjectTypeId',
                type: 'int',
                defaultValue: 3102
            
        },{
            name: 'stl_tFechaHora',
            type: 'date', dateFormat: 'MS'
        },{
            name: 'stl_cAccion',
            type: 'string'
        },{
            name: 'stl_cObservacion',
            type: 'string'
        },{
            name: 'stl_iUsuarioDSS',
            type: 'string'
        }
   ],
    proxy: {
        type : 'rest',
        url : '/Rest/SerTecTimeLine/',
        appendId : true,
        writer: {writeAllFields: true}
    }
});