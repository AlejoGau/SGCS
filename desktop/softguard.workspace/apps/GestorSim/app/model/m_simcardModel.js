Ext.define('GestorSim.model.m_simcardModel', {
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
    {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3190
    },
    {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_simcard'
    },
    { name: 'sim_cuenta', type: 'int' },
    { name: 'sim_apn', type: 'int', defaultValue: 0 },
    { name: 'sim_csid', type: 'int', defaultValue: 0 },
    { name: 'sim_fecha_activacion', type: 'date',dateFormat:'MS', defaultValue: new Date() },
    { name: 'sim_iccid', type: 'string' },
    { name: 'sim_marca', type: 'int', defaultValue: 0 },
    { name: 'sim_agente', type: 'string'},
    { name: 'cue_cnombre', type: 'string' },
    { name: 'sim_estado', type: 'int', defaultValue: 0 },
    { name: 'sim_codigo', type: 'string' },
    { name: 'sim_observaciones', type: 'string' },
    { name: 'sim_ClaveMaster', type: 'string' },
    { name: 'sim_udw_idKey', type: 'int', defaultValue: 0 },
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/m_simcard/',
        appendId: true
    }
});


