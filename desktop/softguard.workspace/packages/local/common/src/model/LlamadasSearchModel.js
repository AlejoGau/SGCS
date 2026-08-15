//MIGRADO2024
Ext.define( 'Common.model.LlamadasSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
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
            defaultValue: 3100
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'p_recepcion'
        },
        { name: 'rec_iidcuenta', type: 'int', defaultValue: 0 },
        { name: 'rec_calarma', type: 'string' },
        { name: 'rec_czona', type: 'string' },
        { name: 'rec_iusuario', type: 'int', defaultValue: 0 },
        { name: 'rec_tfechahora', type: 'date' },
        { name: 'gra_dfechahora', type: 'date'},
        {
            name: '_rec_tfechahora', type: 'string', convert: function( v, record ) {
                return record.get( 'rec_tfechahora' );
            }
        },
        { name: 'rec_nestado', type: 'int', defaultValue: 0 },
        { name: 'rec_cContenido', type: 'string' },
        { name: 'rec_tFechaProceso', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'rec_ioperador', type: 'int', defaultValue: 0 },
        { name: 'rec_cObservaciones' },
        { name: 'rec_cTerminal', type: 'string' },
        { name: 'rec_idResolucion' },
        { name: 'rec_idReceptor', type: 'int', defaultValue: 0 },
        { name: 'rec_cCategorizacion', type: 'string' },
        { name: 'rec_iNYR', type: 'int', defaultValue: 0 },
        { name: 'rec_iTE', type: 'int', defaultValue: 0 },
        { name: 'rec_tFechaRecepcion', type: 'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 ) },
        { name: 'rec_nOrigen', type: 'int', defaultValue: 0 },
        { name: 'rec_idMap', type: 'int', defaultValue: 0 },
        { name: 'rec_idFwd', type: 'int', defaultValue: 0 },
        { name: 'rec_iMinutosEspera', type: 'int', defaultValue: 0 },
        { name: 'rec_iPuerto', type: 'int', defaultValue: 0 },
        { name: 'rec_idLoc', type: 'int', defaultValue: 0 },
        { name: 'cod_ncolorletra', type: 'string' },
        { name: 'cod_cdescripcion', type: 'string' },
        { name: 'cod_ncolor', type: 'string' },
        { name: 'eve_rec_calarma', type: 'string' },
        { name: 'eve_rec_iid', type: 'string' },
        { name: 'ope_cnombre', type: 'string' },
        {
            name: '_nombre_llamado', type: 'string', convert: function( v, r ) {
                var datosFull = r.get( 'rec_cContenido' );
                var datos = datosFull.split( ' ' );
                return datosFull.replace( datos[ 0 ], '' )
            }
        },
        {
            name: '_telefono_llamado', type: 'string', convert: function( v, r ) {
                var datos = r.get( 'rec_cContenido' ).split( ' ' );
                return datos[ 0 ]
            }
        },
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/rest/search/p_recepcion',
        appendId: false
    }
});