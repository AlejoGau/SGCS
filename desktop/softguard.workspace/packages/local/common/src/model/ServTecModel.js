//MIGRADO2024
Ext.define( 'Common.model.ServTecModel', {
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
            defaultValue: 3102
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'm_st_cabecera'
        },
        { name: 'stc_iid_cuenta', type: 'int', defaultValue: 0 },
        { name: 'stc_inumero', type: 'int', defaultValue: 0 },
        { name: 'stc_ctipo_servicio', type: 'string'},
        { name: 'stc_prioridad', type: 'string' },
        { name: 'stc_mobservaciones', type: 'string',defaultValue: 1 },
        { name: 'stc_dfecha_desde_1', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dfecha_hasta_1', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dfecha_desde_2', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dfecha_hasta_2', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dfecha_desde_3', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dfecha_hasta_3', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dfecha_cierre', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_ccontacto', type: 'string' },
        { name: 'stc_nestado', type: 'int', defaultValue: 0 },
        { name: 'stc_ctecnico_1', type: 'string' },
        { name: 'stc_ctecnico_2', type: 'string' },
        { name: 'stc_ctecnico_3', type: 'string' },
        { name: 'stc_ctecnico_4', type: 'string' },
        { name: 'stc_ctecnico_5', type: 'string' },
        { name: 'stc_yValor' },
        { name: 'stc_nvalorpagotecnico' },
        { name: 'stc_ncostomanodeobra' },        
        { name: 'stc_nreclamo_1', type: 'int', defaultValue: 0 },
        { name: 'stc_creclamo_1', type: 'string' },
        { name: 'stc_nreclamo_2', type: 'int', defaultValue: 0 },
        { name: 'stc_creclamo_2', type: 'string' },
        { name: 'stc_nreclamo_3', type: 'int', defaultValue: 0 },
        { name: 'stc_creclamo_3', type: 'string' },
        { name: 'stc_nreclamo_4', type: 'int', defaultValue: 0 },
        { name: 'stc_creclamo_4', type: 'string' },
        { name: 'stc_nreclamo_5', type: 'int', defaultValue: 0 },
        { name: 'stc_creclamo_5', type: 'string' },
        { name: 'stc_cmovil_1', type: 'string' },
        { name: 'stc_cmovil_2', type: 'string' },
        { name: 'stc_dfecha_modificacion', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_ioperador', type: 'int', defaultValue: 0 },
        { name: 'stc_minsumos', type: 'string' },
        { name: 'stc_dintecnico_1', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_doutecnico_1', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dintecnico_2', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_doutecnico_2', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_dintecnico_3', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_doutecnico_3', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_cdeposito', type: 'string' },
        { name: 'stf_dfecha_vto_orden', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'stc_iPrioridad', type: 'int', defaultValue: 1 }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/m_st_cabecera/',
        appendId: true,
        writer: {writeAllFields: true}
    }
});