Ext.define('AdministratorSearch.model.parametro_EZVIZP2RegionModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'KeyDomain', type: 'int'},
        {name:'KeyAppKey',type: 'string'},
		{name:'KeyAppSecret',type:'string'},
        {name:'KeyDealers',type:'string'}
    ]
});
