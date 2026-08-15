Ext.define('Desktop.model.Message6SearchModel', {
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
        {name:'DateCreated',type:'date', dateFormat:'MS'},
        {name:'DateRead',type:'date', dateFormat:'n/j/Y h:i:s A', convert: function(value){
            if (new Date(value) <= new Date('1/1/1970'))
                return null;
            else
                return value;
        }},
        {name:'FromTypeId',type:'int',defaultValue:0},
        {name:'FromId',type:'int',defaultValue:0},
        {name:'ToTypeId',type:'int',defaultValue:0},
        {name:'ToId',type:'int',defaultValue:0},
        {name:'MessageType',type:'string'},
        {name:'Status',type:'string'},
        {name:'Customdata',type:'string'},
        {name:'FromName', type: 'string', convert: function(value, record){
            if (record.get('MessageType')=='SERIES'){
                var Customdata = record.get('Customdata');
                var result = getLocale('Softguard le informa');
                try{
                    if (Customdata && Customdata!=''){
                        var _json = Ext.JSON.decode(Customdata);
                        if (_json.sender && _json.sender!=''){
                            result = _json.sender;
                        }
                    }
                } catch(e) {
                    console.log("error al leer la metadata "+ e);
                    console.log(Customdata);
                }
                return result;
            }
            else
                return value;
        }},
        {name:'ToName', type: 'string'},
        {name:'DateCreatedIso',type:'date', dateFormat:'c'},
        {name:'DateReadIso',type:'date', dateFormat:'c'},
        {name: 'DateCreatedText', type: 'string', convert:function(value, record){
            if (record.get('DateCreatedIso'))
                return Ext.Date.format(record.get('DateCreatedIso'), 'd/m/Y');
            else
                return record.get('DateCreatedIso');
        }}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/Search/Message',
		appendId : true
	}
});