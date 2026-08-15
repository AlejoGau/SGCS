//MIGRADO2024
Ext.define('Common.view.VehicleConductorGridView', {
    extend:'Ext.grid.GridPanel',
    alias: 'widget.gridconductor',
    itemId: 'gridconductor',
    title: 'Responsables',
    autoHeight: true,
    columns: [
            {
                xtype: 'gridcolumn',
                header: 'Nombre',
                sortable: true,
        		dataIndex: "usu_cnombre",
                width: 100
            },
            {
                xtype: 'gridcolumn',
                header: 'Clave',
                sortable: true,
				dataIndex: "usu_cclave",
                width: 100
            },
            {
                xtype: 'gridcolumn',
                header: 'Observación',
                sortable: true,
				dataIndex: "usu_mobservacion",
                width: 100
            }
        ],
            initComponent: function () {
                this.callParent(arguments);
            } // cierro init
});