//MIGRADO2024
Ext.define( 'Common.model.m_CuentasXtraInfoSearchModel', {
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
        { name: 'cue_iLicenciasSP', type: 'int', defaultValue: 0 },
        { name: 'cue_iidCuenta', type: 'int', defaultValue: 0 },
        { name: 'cue_cConfig', type: 'string' },
        { name: 'cue_iEngineStatus', type: 'int', defaultValue: 0 },
        { name: 'cue_cCustom', type: 'string' },
        { name: 'cue_iImportancia', type: 'int', defaultValue: 0 },
        { name: 'cue_ilicenciapar', type: 'int', defaultValue: 0 },
        { name: 'cue_iTipoServicio', type: 'int', defaultValue: 0 },
        { name: 'cue_cHorasVC', type: 'int', defaultValue: 0 },
        { name: 'cue_cInstrucciones', type: 'string' },//AQUI ESTABA EL ERROR!!!!!!!!
        { name: 'cue_iInstrMostrar', type: 'int', defaultValue: 0 },
        { name: 'cue_iVigiladoresVC', type: 'int', defaultValue: 0 }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/search/m_CuentasXtraInfoByFilter',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        appendId: true
    }
});