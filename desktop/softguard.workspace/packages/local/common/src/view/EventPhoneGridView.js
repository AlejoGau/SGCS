//MIGRADO2024
Ext.define('Common.view.EventPhoneGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.eventphonegridview',
    title : 'Llamadas',
    columns: [{
        xtype: 'datecolumn',
        text: 'Fecha y hora',
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
        dataIndex: 'rec_cContenido',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text: 'Observaciones',
        flex: 1,
        dataIndex: 'rec_cObservaciones',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }]
});  // cierro define