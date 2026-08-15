Ext.define('GestorSim.model.ComandosIpModel', {
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
        defaultValue: 3065
    },
    {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'p_comandos_ip'
    },
    { name: 'cmd_tfechahora', type: 'date', dateFormat: 'MS' },
    { name: 'cmd_idCuenta', type: 'int', defaultValue: 0 },
    { name: 'cmd_idReceptor', type: 'int', defaultValue: 0 },
    { name: 'cmd_iComando', type: 'int', defaultValue: 0 },
    { name: 'cmd_cValores', type: 'string' },
    { name: 'cmd_nEstado', type: 'int', defaultValue: 1 },
    { name: 'cmd_iEsCustom', type: 'int', defaultValue: 0 },
    { name: 'cmd_cObservaciones', type: 'string' }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/p_comandos_ip/',
        appendId: true
    }
});