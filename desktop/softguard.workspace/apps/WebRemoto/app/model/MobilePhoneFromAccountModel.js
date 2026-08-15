Ext.define('WebRemoto.model.MobilePhoneFromAccountModel', {
    extend : 'Ext.data.Model',
	idProperty : 'Id',
	fields : [
        {
            name : 'tel_cnombre',
            type : 'string'
        },
        {
            name : 'tel_ctelefono',
            type : 'string'
        }, {
            name : 'formatted',
            type : 'string'
        }, {
            name : 'E164',
            type : 'string'
        }, {
            name : 'country',
            type : 'string'
        }, {
            name : 'type',
            type : 'string'
        },{
            name : '_displayName',
            type : 'string',
            convert: function(value, record){
                return record.get('tel_cnombre')+" "+record.get('formatted');
            }
        }
    ],

	proxy: {
    	type : 'rest',
		url : '/handler/getLibPhoneFromAccount?preventSlash=true',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});
