Ext.define('Common.model.OrderItemModel', {
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
        defaultValue: 625
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'OrderItem'
        },
		{name:'OrderId',type:'int',defaultValue:0},
        {name:'Price',type:'float',defaultValue:0},
        {name:'Currency',type:'string'},
        {name:'Status',type:'string', defaultValue:'1'},
        {name:'Description',type:'string'},
        {name:'Quantity',type:'float',defaultValue:0},
        {name:'Code',type:'string'},
        {name:'VAT',type:'float',defaultValue:0},        
    	{name:'ProductId',type:'int'}
    ],
    proxy: {
    	type : 'rest',
		url : '/Rest/OrderItem/',
		appendId : true,
        writer: {writeAllFields:true}
	}
});