Ext.define('AdministratorSearch.model.t_comprobantes_fcModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        mappgin:'aut_idkey'
        
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3029
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'Tecnico'
        },
		{name:'cbt_ccodigo',type:'string'},
        {name:'cbt_cdescripcion',type:'string', convert: function (value,record) {
            return Ext.util.Format.trim(value)
        }},
        {name:'cbt_cdescripcionreducida',type:'string'},
        {name:'cbt_ntipo',type:'int'},
        {name:'cbt_cletra',type:'string'},
        {name:'cbt_cprefijo',type:'string'},
        {name:'cbt_inumero',type:'int'},
        {name:'cbt_ncopias',type:'string'},
        {name:'cbt_nCbteCAE',type:'string'},
        {name:'cbt_casociado',type:'string'},        
        {name:'cbt_idOrganizacionFacturadora',type:'int'},
    ],
		



    proxy: {
		type : 'rest',
		url : '/Rest/t_comprobantes_fc/',
		appendId : true
	}
});