Ext.define( 'WebMG.model.MG_informacion_pagoSearchModel', {
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
            defaultValue: 3221
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'MG_informacion_pago'
        },
        { name: 'mip_fpgidkey', type: 'int', defaultValue: 0 },
        { name: 'mip_idcliente', type: 'int', defaultValue: 0 },// organizacion cliente que paga con esta forma de pago
        { name: 'mip_codigo' }, // numero de tarjeta, codigo de pago
        { name: 'mip_fechadesde', type: 'date', dateFormat: 'MS', defaultValue: new Date( '1/1/1' ) },
        { name: 'mip_fechahasta', type: 'date', dateFormat: 'MS', defaultValue: new Date(  '1/1/1' ) },
        { name: 'mip_emisor', type: 'int', defaultValue: 0 }, // id de la forma de pago, esta asociado a la cuenta contable en la cual se recibe el dinero
        { name: 'mip_clave' }, // codigo de validacion ej 4 numeros en tarj de credito
        { name: 'mip_nombreusuario' } // nombre de la tarjeta, nombre de usario de ml, etc.
    ],

    proxy: {
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
        url: '/Rest/MG_informacion_pago/',
        appendId: false
    }
});

