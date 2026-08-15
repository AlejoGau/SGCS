Ext.define('SgAppAccessControl.model.AC_p_controlAcceso_proveedores_IOSearchModel', {
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
{name:'cac_autorizatipo',type:'int'},
{name:'_cac_autorizatipo',type:'string', convert:function (value,record) {
    if(record.get('cac_autorizatipo') == 1) {
        return getLocale('Contacto propietario')
    } else if (record.get('cac_autorizatipo') == 2) {
        return getLocale('Autorizacion supervisor')
    } else if (record.get('cac_autorizatipo') == 3) {
        return getLocale('Autorizacion preexistente')
    } else {
        return record.get('cac_autorizatipo')
    }
   
}},
{name:'cac_autorizaid',type:'int'},
{name:'cac_autorizacodigo',type:'string'},
{name:'cap_nombre',type:'string'},

{name:'usu_cnombre',type:'string'},
{name:'cac_cobservacion',type:'string'},
{name:'cac_autorizadotipoid',type:'int'}


        ],

           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    url : '/Rest/search/p_controlAcceso_proveedores_IOSearch',
		appendId : true
	}
});
