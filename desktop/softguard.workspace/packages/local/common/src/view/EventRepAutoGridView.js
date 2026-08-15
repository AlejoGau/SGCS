//MIGRADO2024
Ext.define('Common.view.EventRepAutoGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.eventorepautgridview',
    title : 'Observaciones',
    store: {
        fields: ['fecha', 'autoridad', 'estado', 'comentario'],
        sorters: ['fecha']
    },
    columns: [{
            xtype: 'datecolumn',
            text: 'Fecha',
            width: 120,
            dataIndex: 'fecha',
            format: 'Y/m/d H:i:s'
        },{
            text: 'Autoridad',
            width: 80,
            dataIndex: 'autoridad'
        },{
            text: 'Estado',
            width: 80,
            dataIndex: 'estado'
        },{
            text: 'Comentario',
            flex: 1,
            dataIndex: 'comentario'
        }]
});