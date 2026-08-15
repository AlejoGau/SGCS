//MIGRADO2024
Ext.define('Common.view.EstadoItemGridView', {
    extend:'Ext.grid.Panel',
    alias: 'widget.estadoitemgridview',
    itemId: 'estadoitemgridview',
    selType: 'checkboxmodel',
    selModel: {
        mode: 'MULTI',
        checkOnly: true//,
        //injectCheckbox: 1
    },
    title: 'Items',
    stateful: false,
    autoHeight: true,
    closeAction: 'destroy',
    columns: [
        
            {
                xtype: 'gridcolumn',
                dataIndex: 'orderCodigo',//orderCodigo
                header: 'Código',
                
                renderer: function(v,m,r){
                    return r.get('zon_ccodigo');
                },
                sortable: true,
                width: 50
            },
        {
            xtype: 'gridcolumn',
            dataIndex: 'zon_cdescripcion',
            header: 'Descripción',
            sortable: true,
            flex: 1
        }
    ]
});