Ext.define('AdministratorSearch.model.t_EscalamientoPrioridadesSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
          name: 'tep_iid',
          type: 'int',
          mapping: 'Id'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3108
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_EscalamientoPrioridades'
        },
{name:'tep_itiempo',type:'int',defaultValue:0},
{name:'tep_ncontrola',type:'int',defaultValue:1},
 {name:'_tep_ncontrola',type:'string',convert: function(v, record){
            if (record.get('tep_ncontrola') == 1){
                v = getLocale('Si');
            } else {
                v = getLocale('No');
            }
            return v
        }}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/t_EscalamientoPrioridades/',
		appendId : true
	}
});