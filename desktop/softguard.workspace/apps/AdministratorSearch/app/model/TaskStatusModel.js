Ext.define('AdministratorSearch.model.TaskStatusModel', {
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
    	defaultValue: 3074
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'TaskStatus'
        },
		{name:'Status',type:'int',defaultValue:0},
{name:'LastExecutionDate',type:'date', dateFormat:'MS'},
{name:'Repetition',type:'int',defaultValue:0},
            {
                name:'StatusNombre',
                type:'string',
                convert: function(v,record){
                    if(record.get('Status') == 1) {
                        return 'ACTIVO';
                    } else if (record.get('Status') == 0) {
                        return 'INACTIVO';
                    } else {
                        return 'ERROR';
                    }
                   
                }
            }
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/TaskStatus/',
		appendId : true
		}
});

																
