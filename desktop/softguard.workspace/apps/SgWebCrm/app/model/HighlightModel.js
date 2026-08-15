Ext.define('SGWebCrm.model.HighlightModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'Name',type:'string'},
        {
        name: 'Id',
        type: 'int'
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        convert: function(v,record){
            getObjectTypeName(record.get('ObjectTypeId'));
        }
        },
		{name:'DateStart',type:'date', dateFormat:'MS'},
        {name:'DateEnd',type:'date', dateFormat:'MS'},
        {name:'ObjectTypeId',type:'int',defaultValue:0},
        {name:'ObjectId',type:'int',defaultValue:0},
        {name:'Weight',type:'int',defaultValue:0},
        {name:'TargetZone',type:'string'},
        {name:'VersionId',type:'int',defaultValue:0},
        {name:'Link',type:'string'},
        {name:'SmallComment',type:'string'},
        {name:'LargeComment',type:'string'},
        {name:'CssClass',type:'string'},
        {name:'DisplayType',type:'string'},
        {name:'DisplayData',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/HighLight/',
		appendId : true
		}
});