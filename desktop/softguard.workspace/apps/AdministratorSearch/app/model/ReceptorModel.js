Ext.define('AdministratorSearch.model.ReceptorModel', {
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
            defaultValue: 3068
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'm_receptores_item'
        },
		{
            name:'rec_iid',
            type:'int',
            defaultValue:0
        },
        {
            name:'rec_cformato',
            type:'string'
        },
        {
            name:'rec_iConexion',
            type:'int',
            defaultValue:0
        },
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/m_receptores_item/',
		appendId : true
		}
});