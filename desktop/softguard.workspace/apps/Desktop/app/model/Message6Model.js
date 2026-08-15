Ext.define('Desktop.model.Message6Model', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    schema: {
         namespace: 'Desktop.model.Message6Model'
    },
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
        {name:'DateCreated', type:'date', dateFormat:'MS', defaultValue: new Date('-62135586000000')},
        {name:'DateRead',type:'date', dateFormat:'MS', defaultValue: new Date('1/1/1900')},
        {name:'FromTypeId',type:'int',defaultValue:0},
        {name:'FromId',type:'int',defaultValue:0},
        {name:'ToTypeId',type:'int',defaultValue:0},
        {name:'ToId',type:'int',defaultValue:0},
        {name:'CuentaID',type:'int',defaultValue:0},
        {name:'EventoID',type:'int',defaultValue:0},
        {name:'MessageType',type:'string'},
        {name:'Status',type:'string'},
        {name:'Customdata',type:'string'},
        {name:'FromName', type: 'string'},
        {name:'ToName', type: 'string'},
        {name:'DateCreatedIso',type:'date', dateFormat:'c'},
        {name:'DateReadIso',type:'date', dateFormat:'c'},
        {name: 'DateCreatedText', type: 'string', convert:function(value, record){
            if (record.get('DateCreatedIso'))
                return Ext.Date.format(record.get('DateCreatedIso'), 'Y-m-d H:i:s');
                else
                return record.get('DateCreated');
        }}
    ],
		
    proxy: {
    	type : 'rest',
    	url : '/Rest/Message/',
    	appendId : true,
		writer:{ writeAllFields:true }
	}
});