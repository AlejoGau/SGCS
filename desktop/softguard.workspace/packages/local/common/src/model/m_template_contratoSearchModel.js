Ext.define('Common.model.m_template_contratoSearchModel', {
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
        defaultValue: 624
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_template_contrato'
        },
        {name:'tmp_asunto',type:'string'},
        {name:'tmp_cuerpo',type:'string'},
        {name:'tmp_metadata',type:'string'},
        {name:'tmp_iorganizacion',type:'int'},
        {name:'org_cnombre',type:'string'},
        {name:'tmp_itipo',type:'int'}

    ],
		
		
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_template_contrato',
		appendId : true,
        writer: {writeAllFields: true}
	}
});
