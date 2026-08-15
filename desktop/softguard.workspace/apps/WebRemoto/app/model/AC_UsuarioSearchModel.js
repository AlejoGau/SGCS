Ext.define('WebRemoto.model.AC_UsuarioSearchModel', {
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
            {name:'usu_iidcuenta',type:'int'},
{name:'usu_icodigo',type:'int'},
{name:'usu_cnombre',type:'string'},
{name:'usu_iid',type:'int'},
{name:'usu_cclave',type:'int'},
{name:'usu_ntipo',type:'int'},
{name:'usu_cimagen',type:'string'},
{name:'usu_mobservacion',type:'string'},
{name:'usu_cIdExtendido',type:'string'},
{name:'usu_cmetadata',type:'string'},
{name:'usu_teliid',type:'string'},
{name:'usu_cidentificacion',type:'string'},

{name:'Name',type:'string'},
{name:'Brand',type:'string'},
{name:'Domain',type:'string'},

{name:'cac_fecha',type:'string'},
{name:'cac_tipoacceso',type:'int'},

{name:'cue_ncuenta',type:'string'},
{name:'cue_clinea',type:'string'},
{name:'cue_cnombre',type:'string'},

{name:'_cuenta',type:'string', convert: function (value, record) {
    return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+ ' ' +record.get('cue_cnombre')
}}

        ],

           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    url : '/Rest/search/ac_usuarios',
        appendId : true
	}
});
