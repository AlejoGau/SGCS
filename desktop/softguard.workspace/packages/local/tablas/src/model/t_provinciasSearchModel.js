Ext.define('Tablas.model.t_provinciasSearchModel', {
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
        defaultValue: 3083
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_tags_ag'
        },
		{name:'pro_ccodigo',type:'string'},
        {name:'pro_cdescripcion',type:'string'},
        {name:'pro_cletra',type:'string'},
        {name:'pro_iParentID',type:'int',defaultValue:0},
        {name:'pro_idKey',type:'string'}
         ],
    
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/t_provincias',
		appendId : true
	}
});