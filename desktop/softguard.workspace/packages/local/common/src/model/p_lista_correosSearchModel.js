//MIGRADO2024
Ext.define('Common.model.p_lista_correosSearchModel', {
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
        defaultValue: 403
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'Product'
        },
    	{name:'plc_name',type:'string'},
        {name:'plc_dealer',type:'string'},
        {name:'plc_correos',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/p_lista_correo/',
		appendId : false
	}
});