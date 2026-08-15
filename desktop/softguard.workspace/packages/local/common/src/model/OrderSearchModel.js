Ext.define('Common.model.OrderSearchModel', {
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
        defaultValue: 624
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Order'
        },
        {name:'Email',type:'string'},
        {name:'Address',type:'string'},
        {name:'City',type:'string'},
        {name:'State',type:'string'},
        {name:'Country',type:'string'},
        {name:'HomePhone',type:'string'},
        {name:'MobilePhone',type:'string'},
        {name:'ZipCode',type:'string'},
        {name:'Cuit',type:'string'},
        {name:'TotalPrice',type:'float',defaultValue:0},
        {name:'Currency',type:'string'},
        {name:'Status',type:'string'},
        {name:'Description',type:'string'},
        /* Corrijo el formato de Fecha porque aparecía 1969 
         * BC de Fernando : https://basecamp.com/2249105/projects/12939010/todos/350259248
         */
        //{name:'DateCreated', type:'date', dateFormat:'MS', defaultValue: new Date()},
        //{name:'ForecastDate',type:'date', dateFormat:'MS', defaultValue: new Date()},
        {name:'ForecastDate',type:'date', defaultValue: new Date()},
        {name:'DateCreated', type:'date', defaultValue: new Date()},
        {name:'ClientTypeId',type:'int',defaultValue:0},
        {name:'ClientId',type:'int',defaultValue:0},
        {name:'PriceList',type:'string'},
        {name:'Discount',type:'float',defaultValue:0},
        {name:'DiscountDescription',type:'string'},
        {name:'OwnerTypeId',type:'int',defaultValue:0},
        {name:'OwnerId',type:'int',defaultValue:0},
        
        {name:'VAT',type:'float',defaultValue:0},
        {name:'_StatusDesc', type: 'string'},
        {name:'_subtotal',type:'float', convert: function(v, record){
            var total = record.get('TotalPrice');
            var vat = record.get('VAT');
            var subtotal = total - vat;
            
            return subtotal;
        }},
        {name:'orgName', type: 'string'},        
        {name:'ProductId',type:'int'},
    ],
		
		
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/order',
		appendId : false
		}
});