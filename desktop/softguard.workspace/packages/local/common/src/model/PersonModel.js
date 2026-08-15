//MIGRADO2024
Ext.define('Common.model.PersonModel', {
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
    	defaultValue: 601
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Person'
        },
		{name:'LastName',type:'string'},
        {name:'Address',type:'string'},
        {name:'State',type:'string'},
        {name:'Country',type:'string'},
        {name:'PostalCode',type:'string'},
        {name:'HomePhone',type:'string'},
        {name:'MobilePhone',type:'string'},
        {name:'BusinessPhone',type:'string'},
        {name:'Email',type:'string'},
        {name:'Web',type:'string'},
        {name:'Birthday',type:'string'},
        {name:'JobTitle',type:'string'},
        {name:'Company',type:'string'},
        {name:'Status',type:'string'},
        {name:'Email2',type:'string'},
        {name:'Occupation',type:'string'},
        {name:'XId',type:'int',defaultValue:0},
        {name:'MobileCompany',type:'string'},
        {name:'City',type:'string'},
        {name:'Location',type:'string'},
        {name:'AddressLat',type:'float'},
        {name:'AddressLong',type:'float'},
        {name:'Facebook',type:'string'},
        {name:'Linkedin',type:'string'},
        {name:'Twitter',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Person/',
		appendId : true
	}
});
																