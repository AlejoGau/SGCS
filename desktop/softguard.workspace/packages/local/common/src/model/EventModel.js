Ext.define('Common.model.EventModel', {
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
         defaultValue: 410
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
         defaultValue: 'Event'
        },
         {name:'EventType',type:'int'},
         {name:'Company',type:'string'},
         {name:'PlaceName',type:'string'},
         {name:'PlaceAddress',type:'string'},
         {name:'PlaceCity',type:'string'},
         {name:'PlacePhone',type:'string'},
         {name:'PlaceContact',type:'string'},
         {name:'PlaceEmail',type:'string'},
         {name:'StartDate',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
         {name:'EndDate',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
         {name:'SmallComment',type:'string'},
         {name:'LargeComment',type:'string'},
         {name:'Schedule',type:'string'},
         {name:'Price',type:'int',defaultValue:0},
         {name:'AllowRegistration',type:'string'},
         {name:'PlaceLat',type:'string'},
         {name:'PlaceLong',type:'string'},
         {name:'AlertTime',type:'int',defaultValue:0},
         {name:'AlertType',type:'string'}
        ],
 
    proxy: {
     type : 'rest',
     url : '/Rest/Event/',
     appendId : true,
     writer: {writeAllFields:true}
 }
 });
 