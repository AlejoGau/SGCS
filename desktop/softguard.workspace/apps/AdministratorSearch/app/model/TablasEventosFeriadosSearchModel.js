Ext.define('AdministratorSearch.model.TablasEventosFeriadosSearchModel', {
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
    	defaultValue: 3077
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_eventos_feriados'
        },
		{name:'eve_ccodigo',type:'string'},
{name:'eve_cdescripcion',type:'string'},
{name:'eve_dfechadesdes',type:'date', dateFormat:'MS'},
{name:'eve_choradesde',type:'string',
         /*convert: function(v,record){
            
            return Ext.util.Format.trim(v);
         }*/},
{name:'eve_dfechahasta',type:'date', dateFormat:'MS'},
{name:'eve_chorahasta',type:'string',
         /*convert: function(v,record){
            
            return Ext.util.Format.trim(v);
         }*/}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_eventos_feriados/',
		appendId : true
	}
});