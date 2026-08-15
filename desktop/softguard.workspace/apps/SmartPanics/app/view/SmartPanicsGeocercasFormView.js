Ext.define('SmartPanics.view.SmartPanicsGeocercasFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.smartpanicsgeocercaformview'],
    title: '',
    //preventHeader: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    showtoolbar: true,
    autoScroll: true,
    fieldDefaults: {
        labelWidth: 120,
        anchor: '100%',
        labelAlign: 'left'
    },
    //bodyPadding :0,
    items: [

        {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    itemId: 'Name',
                    labelWidth: 50,
                    allowBlank: false,
                    margin: '0 5 0 0',
                    validator: function (value) {
                        var t = this;
                        var record = t.up('smartpanicsgeocercaformview').record;

                        if (Ext.isEmpty(value)) {
                            return 'El campo Nombre es obligatorio';
                        }

                        if (value !== this.originalValue) {
                            var filters = [{
                                property: 'Name',
                                value: value
                            }, {
                                property: 'Imei',
                                value: record.get('Imei')
                            }];

                            var model = 'SmartPanics.model.SmartPanicsGeocercasSearchModel';

                            var storeSP = Ext.create('Ext.data.Store', {
                                model: model,
                                pageSize: 50,
                                remoteFilter: true,
                                filters: filters
                            });

                            storeSP.load({
                                callback: function (records) {
                                    if (records.length > 0) {
                                        t.markInvalid('Ya existe una geocerca con este nombre');
                                        t.validated = false;
                                    } else {
                                        t.clearInvalid();
                                        t.validated = true;
                                    }
                                }
                            });
                        }
                        return true; // mientras carga, dejarlo válido
                    }
                }
                , {
                    xtype: 'combo',
                    itemId: 'comboFlota',
                    fieldLabel: 'Dealer',
                    editable: false,
                    labelAlign: 'right',
                    name: 'Dealer',
                    store: 'TablaLineasStore',
                    displayField: 'lin_crazonsocial',
                    valueField: 'lin_ccodigo',
                    allowBlank: true,
                    hidden: true,
                    queryMode: 'local',
                    labelWidth: 50
                }
                , {
                    xtype: 'combo',
                    itemId: 'comboTipo',
                    labelAlign: 'right',
                    fieldLabel: 'Tipo',
                    name: 'GeoType',
                    editable: false,
                    itemId: 'GeoType',
                    value: 'X',
                    allowBlank: false,
                    queryMode: 'local',
                    labelWidth: 50,
                    store: [
                        ['I', getLocale('Inclusión')],
                        ['E', getLocale('Exclusión')],
                        ['X', getLocale('Inclusión o Exclusión')]]
                }, {
                    xtype: 'combo',
                    itemId: 'comboEstado',
                    editable: false,
                    labelAlign: 'right',
                    fieldLabel: 'Estado',
                    name: 'Status',
                    itemId: 'Status',
                    value: '1',
                    allowBlank: false,
                    queryMode: 'local',
                    labelWidth: 50,
                    store: [
                        ['0', getLocale('Inactiva')],
                        ['1', getLocale('Activa')]
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'poiAddress',
                    emptyText: getLocale('Dirección'),
                    flex: 1
                }, {
                    xtype: 'button',
                    iconCls: 'icon-poi',
                    handler: function (button) {
                        var view = button.up('smartpanicsgeocercaformview');
                        var form = button.up('window');
                        var address = form.down('#poiAddress').getValue();
                        var infoHtml = '';
                        var geocoder = view.down('gmappanel6').getGeocoder();
                        geocoder.geocode({
                            address: address
                        }, function (result, status) {
                            if (status == 'OK') {
                                var location = result[0].geometry.location;
                                var pos = new google.maps.LatLng(location.lat, location.lng);
                                //mappanel.cache.marker[0].setPosition(pos);
                                view.down('gmappanel6').getMap().setCenter(pos);
                                view.down('gmappanel6').getMap().setZoom(14);
                            }
                        });
                    }
                }
            ]
        }, {
            xtype: 'gmappanel6',
            flex: 1,
            zoomLevel: 4,
            gmapType: 'map',
            mapConfOpts: ['enableScrollWheelZoom',
                'enableDoubleClickZoom', 'enableDragging'],
            mapControls: ['GSmallMapControl', 'GMapTypeControl',
                'NonExistantControl']
        }
    ],
    initComponent: function () {
        this.callParent();

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    xtype: 'button',
                    text: 'Guardar',
                    action: 'save'

                }, {
                    xtype: 'button',
                    text: 'Cancelar',
                    action: 'cancel',
                    handler: function (button) {
                        var win = button.up('window');
                        win.close();
                    }
                }

            ]
        });
        if (this.showtoolbar) {
            this.addDocked(toolbar);
        }
    } // cierro init
});