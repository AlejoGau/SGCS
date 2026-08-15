//MIGRADO2024
Ext.define( 'Common.model.t_condiciones_pago_fcSearchModel', {
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
            defaultValue: 3162
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_condiciones_pago_fc'
        },
        { name: 'con_ccodigo', type: 'string' },
        { name: 'con_cdescripcion', type: 'string' },
        {
            name: '_con_cdescripcion', type: 'string', convert: function( value, record ) {
                if( record.get( 'con_ncuotas' ) > 1 ) {
                    return record.get( 'con_cdescripcion' ) + ' ' + record.get( 'con_ncuotas' ) + ' ' + getLocale( 'cuotas' ) + ' ' + getLocale( 'cada' ) + ' ' + record.get( 'con_ifrecuencia' ) + getLocale( 'dias' )
                }
                return record.get( 'con_cdescripcion' )
            }
        },
        {
            name: '_info_formadepago', type: 'string', convert: function( value, record ) {
                if( record.get( 'con_ncuotas' ) > 1 ) {
                    return record.get( 'con_ncuotas' ) + ' ' + getLocale( 'cuotas' ) + ' ' + getLocale( 'cada' ) + ' ' + record.get( 'con_ifrecuencia' ) + getLocale( 'dias' )
                }
                return ''
            }
        },
        { name: 'con_ncuotas', type: 'float', defaultValue: 0 },
        { name: 'con_idias', type: 'int', defaultValue: 0 },
        { name: 'con_ifrecuencia', type: 'int', defaultValue: 0 },
        { name: 'con_nPideDatos', type: 'int', defaultValue: 0 },
        { name: 'con_nCobranzaAut', type: 'int', defaultValue: 0 },
        { name: 'con_cCodigoBarra', type: 'string' },
        { name: 'con_iRemesa', type: 'int', defaultValue: 0 },
        { name: 'con_cDatosExtra' },
        { name: 'con_cFormaPagoCobrAut', type: 'string' },
        { name: 'con_orgidcodigoid', type: 'int', defaultValue: 0 },
        { name: 'con_idKey', type: 'int', defaultValue: 0 },
        { name: 'org_cnombre' },
        { name: 'fpg_ctipo' },
        { name: 'fpg_idKey', type: 'int', defaultValue: 0 },
        { name: 'rem_cidentificacion' }
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/Search/t_condiciones_pago_fc',
        appendId: true
    }
});