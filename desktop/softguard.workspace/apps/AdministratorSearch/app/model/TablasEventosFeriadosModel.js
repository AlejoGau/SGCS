Ext.define('AdministratorSearch.model.TablasEventosFeriadosModel', {
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
        {name:'eve_choradesde',type:'string', defaultValue: '00:00',
         /*convert: function(v,record){
            
            return Ext.util.Format.trim(v);
         }*/
        
        },
        {name:'eve_dfechahasta',type:'date', dateFormat:'MS'},
        {name:'eve_chorahasta',type:'string', defaultValue: '23:59',
        /*convert: function(v,record){
            
            return Ext.util.Format.trim(v);
         }*/}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_eventos_feriados/',
		appendId : true
		}
});