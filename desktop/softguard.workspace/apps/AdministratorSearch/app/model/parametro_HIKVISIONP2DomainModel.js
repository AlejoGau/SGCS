Ext.define('AdministratorSearch.model.parametro_HIKVISIONP2DomainModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'Id', type: 'int'},
        {name:'Name',type: 'string'},
		{name:'authAddress',type:'string'},
        {name:'platformAddress',type:'string'}
    ]
});
