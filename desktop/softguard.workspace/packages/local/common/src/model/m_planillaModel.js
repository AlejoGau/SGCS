//MIGRADO2024
Ext.define('Common.model.m_planillaModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        defaultValue: 0
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3097
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_planillas'
        },
		{name:'pla_cDescripcion',type:'string'},
{name:'pla_cNombreTabla',type:'string'}
        ],
		
    
    
    proxy: {
    	type : 'rest',
		url : '/Rest/m_planillas/',
		appendId : true,
        writer: {writeAllFields: true}
	}
});