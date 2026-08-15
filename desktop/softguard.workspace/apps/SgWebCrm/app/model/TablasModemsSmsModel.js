Ext.define( 'SGWebCrm.model.TablasModemsSmsModel', {
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
            defaultValue: 3082
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_modems_sms'
        },
        { name: 'sms_icodigo', type: 'int', defaultValue: 0 },
        { name: 'sms_cdescripcion', type: 'string' },
        { name: 'sms_nport', type: 'int', defaultValue: 0 },
        { name: 'sms_cseteo', type: 'string', defaultValue: '57600,N,8,1' },
        { name: 'sms_cinbox', type: 'string' },
        { name: 'sms_ndefault', type: 'int', defaultValue: 0 },
        { name: 'sms_cterminal', type: 'string' },
        { name: 'sms_csource', type: 'string' },
        { name: 'sms_csmppsystemid', type: 'string' },
        { name: 'sms_csmpppassword', type: 'string' },
        { name: 'sms_csmpphostname', type: 'string' },
        { name: 'sms_nsmppport', type: 'int', defaultValue: 0 },
        { name: 'sms_iGateway', type: 'int' },
        { name: 'sms_cDealer', type: 'string' },
        { name: 'sms_nEstado', type: 'int', defaultValue: 2 },
        {
            name: 'estado_string', type: 'string',
            convert: function( v, record ) {

                if( record.get( 'sms_nEstado' ) == 1 ) {
                    return 'Deshabilitado';
                } else {
                    return 'Habilitado';
                }
            }

        }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/t_modems_sms/',
        appendId: true
    }
});


