Ext.define('WeSafe.view.WeSafeMainView', {
    extend: 'Ext.panel.Panel',
    alias: ['widget.WeSafeMainView'],
    xtype: 'WeSafeMainView',
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'component', // ✅ Use a simple component instead of a full panel
            html: '<h2 style="margin: 5px;">Moderación</h2>', // ✅ Removes extra panel and space
            height: 40, // ✅ Reduces space to a minimal title bar height
            style: 'border-bottom: 1px solid #ccc; background-color: #f5f5f5;'
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            listeners: {
                tabchange: function (tabPanel, newCard) {
                    var store = Ext.data.StoreManager.lookup('WeSafeEventosInformadosStore');
                    var estado = newCard.xtype === 'WeSafeDeniedView' ? 'Denegado' : 'Revision';
                    store.load({
                        params: { estado: estado },
                        callback: function (records, operation, success) {
                            if (success) {
                                console.log(`Datos cargados para estado: ${estado}`, records);
                            } else {
                                Ext.Msg.alert('Error', 'No se pudieron cargar los datos.');
                            }
                        }
                    });
                }
            },
            items: [
                {
                    title: 'En revisión',
                    xtype: 'WeSafeUnderReviewView',
                    closable: false
                },
                {
                    title: 'Denegado',
                    xtype: 'WeSafeDeniedView',
                    closable: false
                }
            ]
        }
    ]
});
