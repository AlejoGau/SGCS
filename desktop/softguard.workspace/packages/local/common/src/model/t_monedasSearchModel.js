//MIGRADO2024
Ext.define('Common.model.t_monedasSearchModel', {
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
        defaultValue: 600
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_monedas'
        },
		{name:'mon_ccodigo',type:'string'},
        {name:'mon_cnombre',type:'string'},
        {name:'mon_csymbol',type:'string'},
        {name:'_nombre',type:'string',convert:function (v,r) {
            return r.get('mon_cnombre')+' ('+r.get('mon_csymbol')+')'
        }}
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_monedas/',
		appendId : true
	}
});
																