Ext.define('iOT.view.iOTCuentaGridGmapView', {
    extend: 'Ext.container.Container',
    alias: 'widget.iotcuentagridgmapview',
    title: 'Cuentas - Mapa',
    forceClose: false,
    layout: 'border',
    height: 600,
    items: [
        {
            xtype: 'grid',
            itemId: 'gridcuenta',

            columns: [
                { text: 'Cuenta', dataIndex: '_lineacuenta', flex: 10 / 100 },
                { text: 'Nombre', dataIndex: 'cue_cnombre', flex: 30 / 100 },
                { text: 'Localidad', dataIndex: 'cue_clocalidad', flex: 30 / 100 },
                { text: 'Calle', dataIndex: 'cue_ccalle', flex: 30 / 100 },
            ],
            region: 'west',
            width: 600,
            //height: 500,

            collapsible: true,
            layout: 'fit',
            split: true,
        },
        {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            //height: 500,

            layout: 'fit',
            region: 'center',
            zoomLevel: 3,
            gmapType: 'map',
            mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
            mapControls: ['GSmallMapControl', 'GMapTypeControl', 'NonExistantControl']

        },
    ],

    // cierro items
    initComponent: function () {
        this.callParent();
        var grid = this.down('#gridcuenta');
        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        grid.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [

             /*  {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Nueva Cuenta',
                    itemId: 'cuentaCreate',
                    action: 'crearCuenta',
                    disabled:true,
                    hidden:true
                },*/{
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'container',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'dealer',
                                                emptyText: getLocale('Dealer'),
                                                width: 110

                                            }, {
                                                xtype: 'textfield',
                                                itemId: 'cuenta',
                                                emptyText: getLocale('Cuenta'),
                                                width: 147,
                                                margin: '0 0 0 5'
                                            }
                                        ]
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'nombre',
                                        emptyText: getLocale('Nombre'),
                                        width: 260
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search',
                    itemId: 'search'
                }, {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'todos',
                    itemId: 'todos'

                }, {
                    iconCls: 'icon-cuenta_filter_nohabilitadas ',
                    text: 'Desactivados',
                    action: 'filterNoHabilitadas',
                    itemId: 'filterNoHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                },
                {
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Activados',
                    action: 'filterHabilitadas',
                    itemId: 'filterHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                }
            ]// cierro items
        });

        grid.addDocked(toolbar);
    }
});