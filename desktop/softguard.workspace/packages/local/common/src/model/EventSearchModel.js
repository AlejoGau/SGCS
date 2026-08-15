Ext.define('Common.model.EventSearchModel', {
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
        
        /* campos para el calendar de ext*/
        ,
        {
            name: 'EventId',
            mapping: 'Id',
            type: 'int'
        },
        {
            name: 'IsNew',
            defaultValue: false,
            type: 'boolean'
        },
        {
            name: 'IsAllDay',
            defaultValue: false,
            type: 'boolean'
        },
        {
            name: 'Title',
            convert: function(v,record){
                var tipo = '';
                // mejorar para usar el store;
                switch (record.get('EventType')){
                    case 1:
                        tipo = getLocale('Reunión');
                        break;
                    case 2:
                        tipo = getLocale('Llamado');
                        break;
                    case 3:
                        tipo = getLocale('Recordatorio');
                        break;
                    case 4:
                        tipo = '';
                        break;
                };
                return record.get('Name')+' '+tipo;
            },
            type: 'string'
        },
        {
            name: 'Location',
            mapping: 'PlaceName',
            type: 'string'
        },
        {
            name: 'Notes',
            mapping: 'LargeComment',
            type: 'string'
        },
        {
            name: 'CalendarId',
            convert: function(v, record){
                switch (record.get('EventType')){
                    case 1:
                        return 1;
                        break;
                    case 2:
                        return 2;
                        break;
                    case 3:
                        return 3;
                        break;
                    case 4:
                        return 1;
                        break;
                }
            },
            type: 'int'
        }
        ],
    idProperty: 'Id',
    proxy: {
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
        url: '/rest/event/',
        appendId: true
    }
});