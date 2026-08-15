Ext.define( 'SmartPanics.view.SpAllSeguimientoMapView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.spallseguimientoview',
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

    initComponent: function() {
        this.callParent();
        var view = this;
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [ {
                text: 'Dispositivos',
                menu: {
                    xtype: 'menu',
                    layout: 'fit',
                    plain: true,
                    closable: true,
                    closeAction: 'hide',
                    enableKeyNav: false,
                    ignoreParentClicks: true,
                    width: 600,
                    items: {
                        xtype: 'spseguimientogridview',
                        itemId: 'spseguimientomapgrid',
                        map: this.down( 'gmappanel6' ),
                        selModel: Ext.create( 'Ext.selection.CheckboxModel' ),
                        preventHeader: true,
                        filterImei: view.filterImei,
                        height: 400//,
                        //width: 424
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
                    pressed: false,
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
        this.addDocked( toolbar );
    }

});