Ext.define('Desktop.model.SmartMailProgramaForDesktopModel', {
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
        defaultValue: 500
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'SmartMailProgram'
        },
		{name:'From',type:'string'},
        {name:'Body',type:'string'},
        {name:'DateStart',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'DateEnd',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'Count',type:'int',defaultValue:0},
        {name:'Status',type:'string', defaultValue: 'I'},
        {name:'Query',type:'string'},
        {name:'TransportType',type:'string', defaultvalue: 'MAIL'},
        {name:'Recurrent', type:'bool', defaultValue: false},
        {name:'Priority',type:'int',defaultValue:0},
        {name:'RecurrentType',type:'string'},
        {name:'RecurrentTime',type:'int',defaultValue:0},
        {name:'RecurrentDateEnd',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/SmartMailProgram/',
		appendId : true
	}
});

																