Ext.define('GestorSim.model.m_simcardSearchModel', {
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
    { name: 'sim_fecha_activacion', type: 'date', format:'d/m/y' },
    { name: 'sim_iccid', type: 'string' },
    { name: 'sim_marca', type: 'int', defaultValue: 0 },
    { name: 'sim_agente', type: 'string' },
    { name: 'sim_estado', type: 'int', defaultValue: 0 },
    { name: 'sim_codigo', type: 'string'},
    { name: 'cue_cnombre', type: 'string' },
    { name: 'cue_clinea', type: 'string' },
    { name: 'cue_ncuenta', type: 'string' },
    {name:'_dealercuenta',type:'string',convert: function(v, record){
            
        return record.get('cue_clinea')+"-"+record.get('cue_ncuenta');
    }},    
    { name: 'sim_observaciones', type: 'string' },
    { name: 'tse_cDescripcion', type: 'string' },
    { name: 'tsm_cDescripcion', type: 'string' },
    { name: 'tsa_cDescripcion', type: 'string' }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/m_simcard',
        appendId: true
    }
});


