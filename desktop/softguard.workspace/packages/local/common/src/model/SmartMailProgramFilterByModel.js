Ext.define('Common.model.SmartMailProgramFilterByModel',{
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
            {
                name: 'ObjectTypeId',
                type: 'int',
                defaultValue: 500
            },
            {
                name: 'ObjectTypeName',
                type: 'string',
                defaultValue: 'SmartMailProgram'
            },
            {name:'From',type:'string'},
            {name:'Body',type:'string'},
            {name:'DateStart',type:'date', dateFormat:'MS', defaultValue: new Date(1900,1,1)},
            {name:'DateEnd',type:'date', dateFormat:'MS', defaultValue: new Date(1900,1,1)},
            {name:'Count',type:'int',defaultValue:0},
            {name:'Status',type:'string', defaultValue: 'I'},
            {name:'Query',type:'string'},
            {name:'TransportType',type:'string', defaultvalue: 'MAIL'},
            {name:'Recurrent', type:'bool', defaultValue: false},
            {name:'Priority',type:'int',defaultValue:550},
            {name:'RecurrentType',type:'string'},
            {name:'RecurrentTime',type:'int',defaultValue:0},
            {name:'RecurrentDateEnd',type:'date', dateFormat:'MS', defaultValue: new Date(1900,1,1)},
            
            {name:'CueIid',type:'int'},
    ],
    proxy: {
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },       
		url : '/Rest/SmartMailProgram/',        
    }
});
