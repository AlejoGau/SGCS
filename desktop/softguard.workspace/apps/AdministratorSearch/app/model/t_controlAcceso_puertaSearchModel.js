Ext.define( 'AdministratorSearch.model.t_controlAcceso_puertaSearchModel', {
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
            defaultValue: 3071
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_firmante_fc'
        },
        {
            name: 'cap_nombre',
            type: 'string'
        },
        {
            name: 'cap_idCta',
            type: 'int'
        },
        {
            name: 'cue_clinea',
            type: 'string'
        },
        {
            name: 'cue_ncuenta',
            type: 'string'
        },
        {
            name: 'cue_cnombre',
            type: 'string'
        }, 
        { 
            name: 'cap_iIngreso', 
            type: 'string'
        }, 
        { 
            name: 'cap_iEgreso', 
            type: 'string' 
        }
    ],


    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/Search/t_controlAcceso_puertaSearch',
        appendId: true
    }
});
