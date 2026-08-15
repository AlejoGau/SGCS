//MIGRADO2024
Ext.define('Common.model.MailTablasPlantillasSearchModel', {
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
{name:'pls_mplantillaOpnClo',type:'string'},
{name:'pls_iTipo',type:'int'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_plantillas_sms',
		appendId : true,
        extraParams:{
            pls_iTipo: 1
        }
	}
});