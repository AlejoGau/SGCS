//MIGRADO2024
Ext.define('Common.model.ScheduleProgramModel', {
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
     
        { name: 'cuentaId', type: 'int'},
        { name: 'eventos', type: 'string' },
        { name: 'eventogenerar', type: 'string' },
        { name: 'zonaiid', type: 'int' ,defaultValue: 0 },
        { name: 'usuarioiid', type: 'int'  ,defaultValue: 0},
        { name: 'programtype', type: 'int' },
        { name: 'eventtype', type: 'string' },
        { name: 'starthour', type: 'int' },
        { name: 'startminutes', type: 'int' },
        { name: 'dayofweek', type: 'int'  ,defaultValue: 0},
        { name: 'dayofmonth', type: 'int'  ,defaultValue: 0},
        { name: 'endhour', type: 'int' },
        { name: 'endminutes', type: 'int' }
        
   ],
    proxy: {
        type : 'rest',
        url : '/Rest/SchedulerPrograms/',
        writer: {writeAllFields:true},
        appendId : true
    }
});