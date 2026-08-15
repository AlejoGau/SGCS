//MIGRADO2024
Ext.define('Common.model.HorarioPlantillaModel', {
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
    	defaultValue: 3098
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'HorarioPlanilla'
        },
        {name:'hor_iid',type:'int',defaultValue:0},
		{name:'hor_ndiaapertura',type:'int',defaultValue:0},
{name:'hor_choraapertura',type:'string'},
{name:'hor_ndiacierre',type:'int',defaultValue:0},
{name:'hor_choracierre',type:'string'}
        ],
		
    
    proxy: {
        type : 'rest',
        /*reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },*/
        url : '/Rest/HorarioPlanilla/',
    	appendId : true,
        writer: {writeAllFields: true}
       
	}
});