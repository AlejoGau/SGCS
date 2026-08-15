Ext.define('SmartPanics.model.SpinBoxMessageModel', {
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
        defaultValue: 701
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'Message'
        },
		{name:'Body',type:'string'},
        {name:'DateCreated',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'DateRead',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'FromTypeId',type:'int',defaultValue:0},
        {name:'FromId',type:'int',defaultValue:0},
        {name:'ToTypeId',type:'int',defaultValue:0},
        {name:'ToId',type:'int',defaultValue:0},
        {name:'MessageType',type:'string'},
        {name:'Status',type:'string'},
        {name:'Customdata',type:'string'},
        {name: 'FromName', type: 'string'},
        {name: 'ToName', type: 'string'},
        {name:'DateCreatedIso',type:'date', dateFormat:'c'},
        {name:'DateReadIso',type:'date', dateFormat:'c'},
        {name: 'DateCreatedText', type: 'string', convert:function(value, record){
            if (record.get('DateCreatedIso'))
                return Ext.Date.format(record.get('DateCreatedIso'), 'Y-m-d H:i:s');
                else
                return record.get('DateCreatedIso');
        }},
        {name: 'DateReadText', type: 'string', convert:function(value, record){
            if (record.get('DateReadIso'))
                return Ext.Date.format(record.get('DateReadIso'), 'Y-m-d H:i:s');
                else
                return record.get('DateReadIso');
        }}
    ],
		
    proxy: {
    	type : 'rest',
    	url : '/Rest/Message/',
    	appendId : true
	}
});