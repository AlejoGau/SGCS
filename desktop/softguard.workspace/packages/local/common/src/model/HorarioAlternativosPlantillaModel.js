//MIGRADO2024
Ext.define('Common.model.HorarioAlternativosPlantillaModel', {
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
    	defaultValue: 3005
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'HorarioAlternativoPlantilla'
        },
		{name:'Alt_iid',type:'int',defaultValue:0},
{name:'Alt_ndiaapertura',type:'int',defaultValue:0},
{name:'Alt_choraapertura',type:'string'},
{name:'Alt_ndiacierre',type:'int',defaultValue:0},
{name:'Alt_choracierre',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/HorarioAlternativoPlantilla/',
		appendId : true
		}
});