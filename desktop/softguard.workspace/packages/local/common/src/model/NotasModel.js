//MIGRADO2024
Ext.define('Common.model.NotasModel', {
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
    	defaultValue: 3010
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Nota'
        },
		{name:'not_iidcuenta',type:'int',defaultValue:0},
{name:'not_mnotaprincipal',type:'string'},
{name:'not_mnotatemporal',type:'string'},
{name:'not_dtemporaldesde',type:'date', dateFormat:'MS'},
{name:'not_dtemporalhasta',type:'date', dateFormat:'MS'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Nota/',
		appendId : true
		}
});