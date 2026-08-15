//MIGRADO2024
Ext.define('Common.model.p_controlAcceso_AutorizacionModel', {
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
            {name:'caa_idautorizado',type:'int'},
{name:'caa_tipo',type:'int'},
{name:'caa_fechadesde',type:'date', dateFormat:'MS'},
{name:'caa_fechahasta',type:'date', dateFormat:'MS'},
{name:'caa_diasemana',type:'int'},
{name:'caa_horadesde',type:'string'},
{name:'caa_horahasta',type:'string'},
{name:'caa_estado',type:'int'},
{name:'caa_codigo',type:'string'}
        ],
     proxy: {
        type : 'rest',
    	url : '/Rest/p_controlAcceso_Autorizacion/',
		appendId : true,
        writer: {
            type: 'json',
            writeAllFields: true,
            
        },
	}	
           
   
});