//MIGRADO2024
Ext.define('Common.model.t_tiposSearchModel', {
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
        defaultValue: 't_tipos'
        },
		{name:'tip_ccodigo',type:'string'},
        {name:'tip_cdescripcion',type:'string'},
        {name:'tip_curlimagen',type:'string'},
        {name:'tip_cservicio',type:'int',defaultValue:0},
        {name:'tip_nTipo',type:'int'},
        {name:'tip_nCondicion',type:'int'}
         ],
    
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/t_tipos/',
		appendId : true
	}
});