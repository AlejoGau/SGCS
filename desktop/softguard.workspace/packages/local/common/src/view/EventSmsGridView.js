//MIGRADO2024
Ext.define('Common.view.EventSmsGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.eventsmsgridview',
    title : 'Sms',
    columns: [{
        xtype: 'datecolumn',
        text: 'Fecha y Hora',
        flex: 1,
        dataIndex: 'rec_isoFechaHora',
        format: 'Y/m/d H:i:s'
    },{
        text: 'Operador',
        flex: 1,
        dataIndex: 'ope_cnombre'
    },{
        text: 'Contenido',
        flex: 1,
        dataIndex: 'rec_cContenido'
    },{
        text: 'Observaciones',
        flex: 1,
        dataIndex: 'rec_cObservaciones'
    }]
});  // cierro define