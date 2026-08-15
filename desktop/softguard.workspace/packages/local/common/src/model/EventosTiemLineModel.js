//MIGRADO2024
Ext.define('Common.model.EventosTiemLineModel', {
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
        defaultValue: 3081
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'eventostimeline'
        },
		{name:'etl_icuenta',type:'int'},
        {name:'etl_tfechahora',type:'date',dateFormat: 'MS', defaultValue: new Date( -62135586000000 )},
{name:'etl_caccion',type:'string'},
{name:'etl_cobservacion',type:'string'},
{name:'etl_cowner',type:'string'},
{name:'etl_ioperador',type:'int'},
{name:'etl_irecid',type:'int'},
{name:'etl_iaccioncode',type:'int'},
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/eventostimeline/',
		appendId : true
	}
});