Ext.define( 'AdministratorSearch.model.t_condiciones_pago_fcModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [ {
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
            defaultValue: 3162
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_condiciones_pago_fc'
        },
        { name: 'con_ccodigo', type: 'string' },
        { name: 'con_cdescripcion', type: 'string' },
        { name: 'con_ncuotas', type: 'float', defaultValue: 0 },
        { name: 'con_idias', type: 'int', defaultValue: 0 },
        { name: 'con_ifrecuencia', type: 'int', defaultValue: 0 },
        { name: 'con_nPideDatos', type: 'int', defaultValue: 0 },
        { name: 'con_nCobranzaAut', type: 'int', defaultValue: 0 },
        { name: 'con_cCodigoBarra', type: 'string' },
        { name: 'con_iRemesa', type: 'int', defaultValue: 0 },
        { name: 'con_cDatosExtra' },
        { name: 'con_cFormaPagoCobrAut', type: 'string' },
        { name: 'con_orgidcodigoid', type: 'int', defaultValue: 0 }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/t_condiciones_pago_fc/',
        appendId: true
    }
});