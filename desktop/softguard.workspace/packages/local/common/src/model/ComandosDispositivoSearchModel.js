//MIGRADO2024
Ext.define('Common.model.ComandosDispositivoSearchModel', {
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
        defaultValue: 3064
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'EquipoDispositivoMovil'
        },
		{name:'idCuenta',type:'int',defaultValue:0},
        {name:'idEquipo',type:'int'},
        {name:'Config',type:'string'},
        {name:'isTemplate',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/EquipoDispositivoMovil/',
		appendId : true
		}
});