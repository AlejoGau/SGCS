Ext.define('SgAppAccessControl.model.p_controlAccesoSearchModel', {
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
        defaultValue: 3071
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_firmante_fc'
        },
            {name:'cac_tipoacceso',type:'int'},
{name:'cac_idpuerta',type:'int'},
{name:'cac_fecha',type:'date'},
{name:'cac_idautorizado',type:'int'},
{name:'cac_idautorizado',type:'int'},
{name:'cac_autorizatipo',type:'int'},
{name:'cac_autorizaid',type:'int'},
{name:'cac_autorizacodigo',type:'string'}


        ],
    	
           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
	url : '/Rest/search/p_controlAcceso',
		appendId : true
	}
});
