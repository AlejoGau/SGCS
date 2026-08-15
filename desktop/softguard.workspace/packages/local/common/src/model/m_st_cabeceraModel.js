//MIGRADO2024
Ext.define( 'Common.model.m_st_cabeceraModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [ {
        name: 'Id',
        type: 'int',
        mapped: 'stc_iid'
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
        {
            name: 'cue_iid', type: 'int',
            convert: function( v, r ) {
                return r.get( 'stc_iid_cuenta' )
            }
        },
        { name: 'stc_inumero', type: 'int', defaultValue: 0 },
        { name: 'stc_ctipo_servicio', type: 'string' },
        { name: 'stc_mobservaciones', type: 'string' },
        {
            name: '_stc_mobservaciones', type: 'string', convert: function( val, rec ) {
                return rec.get( 'stc_mobservaciones' ).replace( /\n/g, "<br />" )
            }
        },
        {
            name: '_stc_creclamo_1', type: 'string', convert: function( val, rec ) {
                return rec.get( 'stc_creclamo_1' ).replace( /\n/g, "<br />" )
            }
        },
        { name: 'stc_dfecha_desde_1', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dfecha_hasta_1', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dfecha_desde_2', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dfecha_hasta_2', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dfecha_desde_3', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dfecha_hasta_3', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dfecha_cierre', type: 'date', dateFormat: 'MS' },
        { name: 'stc_ccontacto', type: 'string' },
        { name: 'stc_nestado', type: 'float', defaultValue: 0 },
        { name: 'stc_ctecnico_1', type: 'string' },
        { name: 'stc_ctecnico_2', type: 'string' },
        { name: 'stc_ctecnico_3', type: 'string' },
        { name: 'stc_ctecnico_4', type: 'string' },
        { name: 'stc_ctecnico_5', type: 'string' },
        { name: 'stc_yValor', type: 'float', defaultValue: 0 },
        { name: 'stc_nreclamo_1', type: 'float', defaultValue: 0 },
        { name: 'stc_creclamo_1', type: 'string' },
        { name: 'stc_nreclamo_2', type: 'float', defaultValue: 0 },
        { name: 'stc_creclamo_2', type: 'string' },
        { name: 'stc_nreclamo_3', type: 'float', defaultValue: 0 },
        { name: 'stc_creclamo_3', type: 'string' },
        { name: 'stc_nreclamo_4', type: 'float', defaultValue: 0 },
        { name: 'stc_creclamo_4', type: 'string' },
        { name: 'stc_nreclamo_5', type: 'float', defaultValue: 0 },
        { name: 'stc_creclamo_5', type: 'string' },
        { name: 'stc_cmovil_1', type: 'string' },
        { name: 'stc_cmovil_2', type: 'string' },
        { name: 'stc_dfecha_modificacion', type: 'date', dateFormat: 'MS' },
        { name: 'stc_ioperador', type: 'int', defaultValue: 0 },
        { name: 'stc_minsumos', type: 'string' },
        { name: 'stc_dintecnico_1', type: 'date', dateFormat: 'MS' },
        { name: 'stc_doutecnico_1', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dintecnico_2', type: 'date', dateFormat: 'MS' },
        { name: 'stc_doutecnico_2', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dintecnico_3', type: 'date', dateFormat: 'MS' },
        { name: 'stc_doutecnico_3', type: 'date', dateFormat: 'MS' },
        { name: 'stc_cdeposito', type: 'string' },
        { name: 'stf_dfecha_vto_orden', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dsalida_al_cliente_DSS', type: 'date', dateFormat: 'MS' },
        { name: 'stc_darribo_al_cliente_DSS', type: 'date', dateFormat: 'MS' },
        { name: 'stc_dsalida_desde_cliente_DSS', type: 'date', dateFormat: 'MS' },
        { name: 'stc_iforma_viaje_DSS', type: 'int', defaultValue: 0 },
        { name: 'stc_cconformidad_html', type: 'string' },
        { name: 'stc_dfechapago', type: 'date', dateFormat: 'MS' },
        { name: 'stc_nvalorpagotecnico', type: 'float' },
        { name: 'stc_ncostomanodeobra', type: 'float' },
        { name: 'stc_iPrioridad', type: 'int', defaultValue: 1 },
        { name: 'stc_iOrganizacion', type: 'int' }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/m_st_cabecera/',
        appendId: true/*,
        listeners: {
            exception: function(proxy, response, op) {
                console.log('Excepción en model de cabecera');
            }            
        } */
        ,writer: {writeAllFields: true}
    }
});