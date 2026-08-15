//MIGRADO2024
Ext.define('Common.model.BitacoraModel', {
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
    	defaultValue: 3103
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'p_recepcion_notas'
        },
		{name:'rec_iidrecepcion',type:'int',defaultValue:0},
{name:'rec_itipo',type:'int',defaultValue:0},
{name:'rec_mnota',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/p_recepcion_notas/',
		appendId : true
		}
});
																