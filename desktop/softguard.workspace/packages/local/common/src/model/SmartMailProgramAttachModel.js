 
Ext.define('Common.model.SmartMailProgramAttachModel', {
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
		url : '/Rest/SmartMailProgramAttach/',
		appendId : true,
        writer: {writeAllFields: true}
		}
});
