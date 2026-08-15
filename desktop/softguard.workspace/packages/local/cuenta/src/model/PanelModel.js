Ext.define('Cuenta.model.PanelModel', {
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
        'pan_iidcuenta', 'pan_ccodigo', 'pan_mubicacion', 'pan_ccallerid1', 'pan_ccallerid2', 'pan_ccallerid3', 'pan_ccallerid4', 'pan_ccallerid5',
    {
        name: 'pan_nmostrar',
        type: 'int',
        defaultValue: 2
    }
        , 'pan_csender', 'pan_cnrosim1', 'pan_ccompania1', 'pan_cnrosim2', 'pan_ccompania2', 'pan_cgprs'
        , {
        name: 'pan_ireceptor',
        type: 'int',
        defaultValue: 0
    },
    {
        name: 'pan_cconfig',
        type: 'string'
    },
    {
        name: 'pan_rpmidkey',
        type: 'int'
    },
    {
        name: 'pan_cModemSMS',
        type: 'int',
        defaultValue: 0
    },
    {
        name: 'pan_cClavePanel',
        type: 'string'
    }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/panel/',
        appendId: true,
        writer: { writeAllFields: true }

    }
});