Ext.define('SgAppSerTec.view.TecguardAllSeguimientoMapView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tecguardallseguimientomapview',
    layout: 'fit',
    frame: false,
    border: 0,
    items: [
        {
            xtype: 'gmappanel6',
            cls: 'gmappanel6',
            itemId: 'googlemap',
            //anchor: '100% 100%',
            //region: 'center',
            zoomLevel: 5,
            gmapType: 'map',
            mapConfOpts: {
                scrollwheel: true,
                disableDoubleClickZoom: false,
                draggable: true,
                streetViewControl: true,
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: true
                }
            }
        }],

    initComponent: function () {
        this.callParent();
        var view = this;
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: 'Dispositivos',
                menu: {
                    xtype: 'menu',
                    layout: 'fit',
                    enableKeyNav: false,
                    ignoreParentClicks: true,
                    width: 800,
                    items: {
                        xtype: 'cuentagridview',
                        iconCls: 'icon-servtec',
                        title: 'Dispositivos',
                        height: 400,
                        closable: false,
                        closeAction: 'destroy',
                        filterTipo: 11,
                        selModel: Ext.create('Ext.selection.CheckboxModel'),
                        createTipo: 11,
                        itemDbClickView: 'cuentaview',
                        map: this.down('gmappanel6'),
                        partitionHide: true,
                        falloTSTHide: true,
                        falloAC: true,
                        preventHeader: true,
                        listeners: {
                            itemdblclick: function (grid) {
                                grid.up('menu').hide();
                            }
                        }
                    }
                }
            }, {
                text: 'Ver todos',
                iconCls: 'icon-search',
                action: 'searchAll',
                enableToggle: true,
                pressed: true,
                itemId: 'searchall'
            }, '-',
            {
                text: 'Cambiar a Manual',
                iconCls: 'icon-center',
                enableToggle: true,
                pressed: true,
                itemId: 'centerBtn',
                action: 'center'
            }, '-',
            {
                text: 'Dirección',
                menu: {
                    xtype: 'menu',
                    layout: 'fit',
                    enableKeyNav: false,
                    height: 70,
                    width: 250,
                    items: [
                        {
                            xtype: 'form',
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'address'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Mostrar',
                                    itemId: 'btnAddress'
                                }
                            ]
                        }

                    ]
                }
            }
            ]
        });
        this.addDocked(toolbar);
    }
});