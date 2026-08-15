//MIGRADO2024
Ext.define('Common.view.EventObservacionesGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.eventobservacionesgridview',
    title : 'Observaciones',
    store: {
        fields: ['fecha', 'usuario', 'comentario'],
        sorters: ['fecha']
    },
    columns: [{
            xtype: 'datecolumn',
            text: 'Fecha',
            width: 120,
            dataIndex: 'fecha',
            format: 'Y/m/d H:i:s'
        },{
            text: 'Operador',
            width: 80,
            dataIndex: 'usuario'
        },{
            text: 'Comentario',
            flex: 1,
            dataIndex: 'comentario'
        }]
});  // cierro define