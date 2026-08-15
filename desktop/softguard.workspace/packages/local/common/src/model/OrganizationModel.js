//MIGRADO2024
Ext.define('Common.model.OrganizationModel', {
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
    	defaultValue: 600
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Organization'
        },
		{name:'Address',type:'string'},
        {name:'Country',type:'string'},
        {name:'State',type:'string'},
        {name:'City',type:'string'},
        {name:'Zip',type:'string'},
        {name:'Phone',type:'string'},
        {name:'Mobile',type:'string'},
        {name:'Fax',type:'string'},
        {name:'Email',type:'string'},
        {name:'NationalTax',type:'string'},
        {name:'StateTax',type:'string'},
        {name:'Account',type:'string'},
        {name:'Web',type:'string'},
        {name:'LegalName',type:'string'},
        {name:'EmployeeCount',type:'int',defaultValue:0},
        {name:'Turnover',type:'int',defaultValue:0},
        {name:'Location',type:'string'},
        {name:'AddressLat',type:'float',defaultValue:0},
        {name:'AddressLong',type:'float',defaultValue:0},
        {name:'Facebook',type:'string'},
        {name:'Twitter',type:'string'},
        {name:'OrganizationType',type:'string'},
        {name:'Status',type:'int',defaultValue:0},
        {name:'SmallComment',type:'string'},
        {name:'LargeComment',type:'string'},
        {name:'Body',type:'string'},
        {name:'Linkedin',type:'string'},
        {name:'Google',type:'string'},
        
        {name:'cli_icodigo_ID',type:'int',convert:function (v,r){
            return r.get('Account')
        }},
        {name:'cnc_id',type:'int'},
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Organization/',
		appendId : true
		}
});