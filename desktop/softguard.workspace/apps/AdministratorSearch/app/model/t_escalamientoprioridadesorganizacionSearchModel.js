Ext.define('AdministratorSearch.model.t_escalamientoprioridadesorganizacionSearchModel', {
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
{name:'teo_iTiempo',type:'int',defaultValue:0},
{name:'teo_nControla',type:'int',defaultValue:1},
 {name:'_teo_ncontrola',type:'string',convert: function(v, record){
            if (record.get('teo_nControla') == 1){
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
    	url : '/Rest/t_escalamientopororganizacion/',
		appendId : true
	}
});