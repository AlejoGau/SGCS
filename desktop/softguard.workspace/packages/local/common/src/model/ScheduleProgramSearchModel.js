//MIGRADO2024
Ext.define('Common.model.ScheduleProgramSearchModel', {
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
defaultValue: 'schedule'
       },
        { name: 'cuentaId', type: 'int'},
        { name: 'eventos', type: 'string' },
        { name: 'eventogenerar', type: 'string' },
        { name: 'zonaiid', type: 'int' ,defaultValue: 0},
        { name: 'usuarioiid', type: 'int' ,defaultValue: 0 },
        { name: 'programtype', type: 'int' },
        { name: 'eventtype', type: 'string' },
        { name: 'starthour', type: 'string' },
        { name: 'startminutes', type: 'string' },
        { name: 'dayofweek', type: 'int',defaultValue: 0 },
        { name: 'dayofmonth', type: 'int',defaultValue: 0 },
        { name: 'endhour', type: 'string' },
        { name: 'endminutes', type: 'string' }
       ],
    proxy: {
        type : 'rest',
        url : '/Rest/SchedulerPrograms/',
        appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        writer: {writeAllFields:true}
    }
});