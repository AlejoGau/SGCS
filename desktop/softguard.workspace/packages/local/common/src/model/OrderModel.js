//MIGRADO2024
Ext.define('Common.model.OrderModel', {
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
        {name:'Currency',type:'string',defaultValue:'1'},
        {name:'Status',type:'string'},
        {name:'Description',type:'string'},
        {name:'DateCreated',type:'date', dateFormat:'MS', defaultValue: new Date()},
        {name:'ClientTypeId',type:'int',defaultValue:0},
        {name:'ClientId',type:'int',defaultValue:0},
        {name:'PriceList',type:'string'},
        {name:'Discount',type:'int',defaultValue:0},
        {name:'DiscountDescription',type:'string'},
        {name:'OwnerTypeId',type:'int',defaultValue:0},
        {name:'OwnerId',type:'int',defaultValue:0},
        {name:'ForecastDate',type:'date', dateFormat:'MS', defaultValue: new Date()},
        {name:'VAT',type:'float',defaultValue:0}
   ],
   proxy: {
        type : 'rest',
        url : '/Rest/Order/',
        appendId : true,
        writer: {writeAllFields:true}
    }
});