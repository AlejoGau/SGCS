//MIGRADO2024
Ext.define('Common.model.t_impuestos_fcSearchModel', {
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
        defaultValue: 3107
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_impuestos_fc'
        },
		{name:'imp_ccodigo',type:'string'},
        {name:'imp_cdescripcion',type:'string'},
        {name:'imp_nporcentaje',type:'float'},
        {name:'imp_idorganizacion',type:'int'},
        {name:'nombreOrganizacion',type:'string'},
        {name:'mgmc_descripcion',type:'string'},
        {name:'imp_mgmcidkey',type:'int'},
        {name:'_imp_cdescripcion',type:'string', convert:function(v,rec){
            return rec.get('imp_cdescripcion')+' ('+rec.get('nombreOrganizacion')+')';
        }}
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/t_impuestos_fc',
		appendId : true
	}
});