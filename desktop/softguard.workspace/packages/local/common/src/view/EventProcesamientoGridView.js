//MIGRADO2024
Ext.define('Common.view.EventProcesamientoGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.eventprocesamientogridview',
    title : 'Gestión',
    columns: [{
        xtype: 'datecolumn',
        text: 'Fecha y hora del proceso',
        width: 150,
        dataIndex: 'pro_isofechahora',
        format: 'Y/m/d H:i:s'
    },{
        text: 'Operador',
        width: 100,
        dataIndex: 'ope_cnombre'
    },{
        text: 'Procesamiento',
        flex: 1,
        dataIndex: 'pro_cProceso'
    }]
});  // cierro define