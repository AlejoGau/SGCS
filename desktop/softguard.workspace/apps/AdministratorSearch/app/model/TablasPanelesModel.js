Ext.define( 'AdministratorSearch.model.TablasPanelesModel', {
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
            defaultValue: 3072
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_paneles'
        },
        { name: 'pan_ccodigo', type: 'string' },
        { name: 'pan_cdescripcion', type: 'string' },
        { name: 'pan_mobservacion', type: 'string' },
        { name: 'pan_nesgprs', type: 'int' },
        { name: 'pan_iModelo', type: 'int', defaultValue: 0 },
        { name: 'pan_cImagen', type: 'string' },
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/t_paneles/',
        appendId: true
    }
});