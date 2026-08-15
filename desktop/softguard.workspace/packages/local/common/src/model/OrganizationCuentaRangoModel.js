//MIGRADO2024
Ext.define('Common.model.OrganizationCuentaRangoModel', {
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
    	defaultValue: 3066
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'DealerRango'
        },
		{name:'NombreEntidad',type:'string'},
        {name:'IdEntidad',type:'int',defaultValue:0},
        {name:'Dealer',type:'string'},
        {name:'CuentaDesde',type:'string'},
        {name:'CuentaHasta',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/DealerRango/',
		appendId : true
	}
});