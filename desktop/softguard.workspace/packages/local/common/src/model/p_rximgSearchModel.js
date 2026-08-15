//MIGRADO2024
Ext.define('Common.model.p_rximgSearchModel', {
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
        defaultValue: 3085
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_observaciones'
        },
		{name:'rxi_cCarpeta',type:'string'},
    	{name:'_rxi_cCarpeta',type:'string'},
        {name:'rxi_cConfig',type:'string'},
        {name:'rxi_cImg',type:'string'},
        {name:'rxi_cTipo',type:'string'},
        {name:'rxi_iId',type:'int'},
        {name:'rxi_iRecId',type:'int'},
        {name:'rxi_nEstado',type:'int', defaultValue:0},
        {name:'rec_calarma',type:'string'},
        {name:'rec_tfechahora',type:'date'},
        {name:'cod_cdescripcion',type:'string'},
        {name:'cod_ncolorletra',type:'string'},
        {name:'cod_ncolor',type:'string'},
        {name:'cue_ncuenta',type:'string'}, 
        {name:'cue_clinea',type:'string'}
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/p_rximgByFilter',
		appendId : true
	}
});