Ext.define('iOT.store.SeccionesStore', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    storeId: 'iOT_seccionesStore',
    //autoSync: true,
    //model: 'iOT.model.iOT_seccionesModel',
    root: {
        expanded: true,
        children: [
            {
                text: 'Candado',
                expanded: false,
                leaf: false,
                iconCls: 'icon-candado'
            }, {
                text: 'Medidor de Energía',
                expanded: true,
                leaf: false,
                view: 'iotenergyview',
                iconCls: 'energia'
            }
        ]
    }
});


