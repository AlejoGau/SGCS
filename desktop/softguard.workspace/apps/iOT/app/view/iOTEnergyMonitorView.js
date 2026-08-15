Ext.define('iOT.view.iOTEnergyMonitorView', {
    extend: 'Ext.container.Container',
    alias: 'widget.iotenergyview',
    layout: 'fit',
    items: [
        {
            xtype: 'tabpanel',
            itemId: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'iotenergymonitorcuentaasignadagridview',

                    title: 'Cuentas con control de energía'
                }, {
                    xtype: 'iotenergymonitorsinasignargridview',
                    title: getLocale('Medidores sin Asignar')
                }
            ]
        }
    ]
}
);