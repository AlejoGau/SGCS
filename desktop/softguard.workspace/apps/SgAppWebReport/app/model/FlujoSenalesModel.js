Ext.define('SgAppWebReport.model.FlujoSenalesModel', {
    extend: 'Ext.data.Model',
    fields: [
        'Receptor',
        'idReceptor',
        'Cantidad_Eventos', 
        'Cantidad_Cuentas',
        'Promedio_Eventos'
    ],
    proxy: { 
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        type: 'rest',
        url: '/Rest/search/CantidadEventosPorReceptorPorCuenta'       
    }
});