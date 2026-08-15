//MIGRADO2024
Ext.define('Common.model.InstruccionesModel', {
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
        { name: 'cue_iidcuenta' ,type:'int'},
        { name: 'cue_iInstrMostrar' ,type:'int',defaultValue:0},
        { name: 'cue_cInstrucciones' ,type:'string'},
        ],
    proxy: {
        type: 'rest',
        url: '/Rest/m_CuentasXtraInfo',
        appendId: true,
    }
});