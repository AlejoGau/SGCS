Ext.define( 'AdministratorSearch.model.t_formas_pago_fcModel', {
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
            defaultValue: 3086
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_formas_pago_fc'
        },
        { name: 'fpg_ccodigo', type: 'string' },
        { name: 'fpg_cdescripcion', type: 'string' },
        { name: 'fpg_cdescripcionreducida', type: 'string' },
        { name: 'fpg_npidenumero', type: 'int' },
        { name: 'fpg_npidevencimiento', type: 'int' },
        { name: 'fpg_npidebanco', type: 'int' },
        { name: 'fpg_mgmcidkey', type: 'int' },
        { name: 'fpg_orgidcodigoid', type: 'int' },
        { name: 'fpg_ctipo', type: 'string' }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/t_formas_pago_fc/',
        appendId: true
    }
});