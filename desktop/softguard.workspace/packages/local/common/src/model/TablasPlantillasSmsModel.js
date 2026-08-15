//MIGRADO2024
Ext.define('Common.model.TablasPlantillasSmsModel', {
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
    	defaultValue: 3084
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_plantillas_sms'
        },
		{name:'pls_ccodigo',type:'string'},
{name:'pls_cdescripcion',type:'string'},
{name:'pls_mplantilla',type:'string'},
{name:'pls_mplantillaOpnClo',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_plantillas_sms/',
		appendId : true
		}
});