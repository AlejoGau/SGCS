//MIGRADO2024
Ext.define('Common.model.m_estado_cuenta_itemModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
	fields : [{
				name : 'Id',
				type : 'int'
			}, {
				name : 'Name',
				type : 'string'
			}, 
			{name:'est_czona',type:'string'},
			{name:'est_iidcuenta',type:'int',defaultValue:0},
            {name:'est_cData',type:'string'}
    ],
	proxy : {
        type : 'rest',
    	url : '/Rest/estadoitem/',
		appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
	}
});