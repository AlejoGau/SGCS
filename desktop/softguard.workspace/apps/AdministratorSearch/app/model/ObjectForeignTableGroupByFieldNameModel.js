Ext.define('AdministratorSearch.model.ObjectForeignTableGroupByFieldNameModel', {
    extend: 'Ext.data.Model',
    idProperty: 'RowNumber',
    fields: [{
        name: 'RowNumber',
        type: 'int'
        },
        {
        name: 'ParentTypeId',
        type: 'int'
        },
        {
        name: 'ParentTypeName',
        type: 'string'
        },
        {
        name: 'FieldName',
        type: 'string'
        },
		{name:'Count',type:'int'}
        ],
    proxy: {
		type : 'rest',
		url : '/Rest/Search/ObjectForeignTableGroupByFieldName',
		appendId : true
		}
});