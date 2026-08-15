Ext.define('AdministratorSearch.model.receptor_itemsSearchModel', {
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
        defaultValue: 3068
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_receptores_item'
        },
		{name:'rec_iid',type:'int',defaultValue:0},
        {name:'rec_cformato',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/m_receptores_item',
		appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }  
		}
});