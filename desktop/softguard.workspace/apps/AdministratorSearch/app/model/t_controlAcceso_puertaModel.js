Ext.define( 'AdministratorSearch.model.t_controlAcceso_puertaModel', {
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
            defaultValue: 3209
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_controlAcceso_puerta'
        },
        { name: 'cap_nombre', type: 'string' },
        {
            name: 'cap_idCta',
            type: 'int'
        },
        {
            name: 'cap_iIngreso',
            type: 'int'
        },
        {
            name: 'cap_iEgreso',
            type: 'int'
        }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/t_controlAcceso_puerta/',
        appendId: true
    }
});
