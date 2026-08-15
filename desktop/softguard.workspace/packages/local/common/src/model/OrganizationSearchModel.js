//MIGRADO2024
Ext.define('Common.model.OrganizationSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
            name: 'sId',
            type: 'string',
            convert: function(v, record){
                return record.get('Id').toString();
            }
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 600
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Organization'
        },
		{name:'Address',type:'string'},
        {name:'Country',type:'int',defaultValue:0},
        {name:'State',type:'int',defaultValue:0},
        {name:'CountryName',type:'string'},
        {name:'StateName',type:'string'},
        {name:'City',type:'string'},
        {name:'Zip',type:'string'},
        {name:'Phone',type:'string'},
        {name:'Mobile',type:'string'},
        {name:'Status',type:'int',defaultValue:0},
        {name:'Fax',type:'string'},
        {name:'Email',type:'string'},
        {name:'NationalTax',type:'string'},
        {name:'StateTax',type:'string'},
        {name:'Account',type:'string'},
        {name:'Web',type:'string'},
        {name:'LegalName',type:'string'},
        {name:'EmployeeCount',type:'int',defaultValue:0},        
        {name:'OrganizationType',type:'string'},
        
        {name:'cnc_id',type:'int'},
        {name:'cnc_editable',type:'int'},
        {name:'cnc_metadata',type:'string'},
        {name:'cnc_name',type:'string'},
        {name:'cnc_type',type:'int'},
        
        {name:'cli_icodigo_ID',type:'int'},
        {name:'cli_iOrganizacion',type:'int'},
        {name:'cli_ccondicionpago',type:'string'},
        {name:'con_idKey',type:'int'},
        {name:'con_cdescripcion',type:'string'},
        {name:'org_csymbol',type:'string'},
        {name:'org_factelect',type:'string'},
        {name:'mon_ccodigo',type:'string'},
        {name:'mon_csymbol',type:'string'},
        
        // BC 371734102 - Agregado de DateCreated.
        // Se modifico tabla _Datos..Organization con una nueva columna con Default (getdate())
        {name:'DateCreated', type:'date', dateFormat:'n/j/Y g:i:s A'}
        
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/OrganizationOAT',
		appendId : true
	}
});
																