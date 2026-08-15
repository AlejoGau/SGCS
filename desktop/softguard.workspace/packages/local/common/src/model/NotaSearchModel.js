Ext.define('Common.model.NotaSearchModel', {
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
{name:'not_dtemporaldesde',type:'date'},
{name:'not_dtemporalhasta',type:'date'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Search/Notabyfilter',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : true
		}
});