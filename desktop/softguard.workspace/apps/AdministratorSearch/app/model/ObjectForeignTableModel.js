Ext.define('AdministratorSearch.model.ObjectForeignTableModel', {
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
    	defaultValue: 18
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'ObjectForeignTable'
        },
		{name:'NameText',type:'string'},
        {name:'ParentTypeId',type:'int',defaultValue:0},
        {name:'FieldName',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/ObjectForeignTable/',
		appendId : true
		}
});