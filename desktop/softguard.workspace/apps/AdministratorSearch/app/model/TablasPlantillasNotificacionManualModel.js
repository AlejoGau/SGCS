Ext.define('AdministratorSearch.model.TablasPlantillasNotificacionManualModel', {
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
    	defaultValue: 13686
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
{name:'pls_iTipo',type:'int',defaultValue:1}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_plantillas_sms/',
		appendId : true,
        writer:{ writeAllFields:true }
		}
});