Ext.define('SgAppMapGuardWeb.model.TablasGruposSearchModel', {
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
        defaultValue: 3075
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_grupos'
        },
		{name:'gru_ccodigo',type:'string'},
        {name:'gru_cdescripcion',type:'string'},
        
        {
            name:'descriptionCalc',
            type:'string',
            convert: function(value,record){
                return record.get('Id')+'-'+record.get('gru_cdescripcion');
            }
        }

        ],
		
            
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_grupos/',
		appendId : true
	}
});