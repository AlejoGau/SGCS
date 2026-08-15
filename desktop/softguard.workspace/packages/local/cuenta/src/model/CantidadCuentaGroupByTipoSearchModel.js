Ext.define('Cuenta.model.CantidadCuentaGroupByTipoSearchModel', {
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
        defaultValue: 3099
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'CantidadCuentaGroupByTipo'
        },
		{name:'tip_ccodigo',type:'string'},
{name:'tip_cdescripcion',type:'string'},
{name:'Cuentas',type:'string'},
{name:'Estado0',type:'string'},
{name:'Estado1',type:'int',defaultValue:0},
{name:'Estado2',type:'string'},
{name:'Estado3',type:'string'},
{name:'Estado4',type:'string'},
{name:'automonitoreo',type:'string'},
{name:'CuentasParticion',type:'string'},
{name:'Smartpanics',type:'string'}
        ],
	proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/CantidadCuentaGroupByTipo',
		appendId : true
	}
});
