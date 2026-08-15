Ext.define('AccessControl.model.AC_p_controlAcceso_AutorizacionModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
            name: 'Id',
            type: 'int',
            defaultValue: 0
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
        {name:'caa_fechadesde',type:'date'},
        {name:'caa_fechahasta',type:'date'},
        {name:'caa_diasemana',type:'int'},
        {name:'caa_horadesde',type:'string'},
        {name:'caa_horahasta',type:'string'},
        {name:'caa_estado',type:'int'},
        {name:'caa_codigo',type:'string'},

        {name:'estadoStyle',type:'string'},
        {name:'usu_cnombre',type:'string'},

        {name:'cac_tipoacceso',type:'int'}

    ],
    proxy: {
        type: 'rest',
        writer:{ writeAllFields:true },
        url: '/Rest/AC_p_controlAcceso_AutorizacionIns/',
        appendId: true
    }
});