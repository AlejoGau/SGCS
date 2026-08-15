//MIGRADO2024
Ext.define('Common.model.ScheduleModel', {
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
        },
        { name: 'template', type: 'string'},
        { name: 'limitdate', type: 'date' },
        { name: 'status', type: 'int' },
        { name: 'lastchange', type: 'string' },
        { name: 'config', type: 'string' },
        { name: 'eventid', type: 'int' },
        { name: 'eventtype', type: 'int' },
        { name: 'condition', type: 'string' },
        { name: 'sql', type: 'string' },
        { name: 'idCuenta', type: 'int' },
        { name: 'iRoute', type: 'string' },
        { name: 'rLatitud', type: 'string' },
        { name: 'rLongitud', type: 'string' },
        { name: 'idUsuario', type: 'int' },
        { name: 'cZona', type: 'string' },
        { name: 'programtype', type: 'int' },
        
        
        
   ],
    proxy: {
        type : 'rest',
        url : '/Rest/Scheduler/',
        appendId : true
    }
});