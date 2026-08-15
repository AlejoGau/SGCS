//MIGRADO2024
Ext.define('Common.model.SMPAttachSearchModel', {
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
        defaultValue: 503
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'SmartMailProgramAttach'
        },
		{name:'ProgramId',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/SmartMailProgramAttach/',
		appendId : false
	}
});