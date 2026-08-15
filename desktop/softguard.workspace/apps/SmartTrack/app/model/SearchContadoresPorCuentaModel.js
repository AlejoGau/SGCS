Ext.define( 'SmartTrack.model.SearchContadoresPorCuentaModel', {
    extend: 'Ext.data.Model',
    idProperty: 'IDCta',
    fields: [
        { name: 'UsuariosCount', type: 'int' },
        { name: 'ContactosCount', type: 'int' },
        { name: 'ZonasCount', type: 'int' },
        { name: 'ParticionesCount', type: 'int' },
        { name: 'LinksVideoCount', type: 'int' },
        { name: 'LinksVideoPorZonaCount', type: 'int' },
        { name: 'SmartPanicsCount', type: 'int' },
        { name: 'ServiciosTecnicosCount', type: 'int' }

    ],
    proxy: {
        type: 'rest',
        url: '/Rest/Search/SGSP_ContadoresPorCuenta',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        }
    }
});