Ext.define('AdministratorSearch.model.t_EscalamientoPrioridadesModel', {
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
    	defaultValue: 3108
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_EscalamientoPrioridades'
        },
{name:'tep_itiempo',type:'int',defaultValue:0},
{name:'tep_ncontrola',type:'int',defaultValue:1},
/* {name:'_tep_ncontrola',type:'string',convert: function(v, record){
            if (record.get('tep_ncontrola') == 1){
                v = 'Si';
            } else {
                v = 'No';
            }
            return v
        }}*/
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_EscalamientoPrioridades/',
		appendId : true
		}
});