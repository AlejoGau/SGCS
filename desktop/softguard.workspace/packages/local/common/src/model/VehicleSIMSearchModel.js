//MIGRADO2024
Ext.define('Common.model.VehicleSIMSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{
            name: 'Cantidad',
            type: 'int'
        }],
    proxy : {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/search/VehicleSIMSearch',
		appendId : false
	}
});