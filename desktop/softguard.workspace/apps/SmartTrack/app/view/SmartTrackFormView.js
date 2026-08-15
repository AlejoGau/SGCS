Ext.define( 'SmartTrack.view.SmartTrackFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.smarttrackform', 'widget.smarttrackformview' ],
    title: 'Evento',
    preventHeader: true,
    autoScroll: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelWidth: 120,
        anchor: '100%',
        labelAlign: 'left'
    },
    items: [
        {
            xtype: 'textfield',
            name: 'Telefono',
            fieldLabel: 'Telefono',
            validator: function( value ) {
                var t = this;
                if( value != this.originalValue ) {


                    var filters = [ {
                        property: 'Telefono',
                        value: value
                    }];

                    var model = 'SmartTrack.model.SmartTrackSearchModel';

                    var storeSP = Ext.create( 'Ext.data.Store', {
                        model: model,
                        pageSize: 50,
                        remoteFilter: true,
                        filters: filters
                    })

                    storeSP.load( {
                        callback: function( records, operation, success ) {
                            if( records.length > 0 ) {

                                t.markInvalid( 'El telefono ya existe' );
                                t.textValid = false;
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                            }


                        }
                    })
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                return t.textValid;
            }
        }, {
            xtype: 'textfield',
            name: 'Imei',
            fieldLabel: 'Imei',
            itemId: 'imeicampo',
            disabled: false,
            hidden: true
        },/*{
    		xtype : 'textfield',
            name : 'Modelo',
			fieldLabel : 'Modelo'
		},{
    		xtype : 'textfield',
            name : 'Marca',
			fieldLabel : 'Marca'
		},{
        	xtype : 'textfield',
            name : 'Version',
			fieldLabel : 'Version'
		},{
    		xtype : 'textfield',
            name : 'Tipo',
			fieldLabel : 'Tipo'
		},*/{
            xtype: 'textfield',
            name: 'Nombre',
            fieldLabel: 'Nombre'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [

                {
                    xtype: 'combo',
                    itemId: 'icono',
                    fieldLabel: 'Icono',
                    name: 'icono',
                    displayField: 'text',
                    valueField: 'VirtualPath',
                    listConfig: {
                        getInnerTpl: function( displayField ) {
                            console.log( arguments )
                            return '<img src="{field1}" class="icon" style="width:16px"/> {' + displayField + '}';
                        }
                    },
                    allowBlank: false,
                    queryMode: 'local',
                    listeners: {
                        change: function( combo, value ) {
                            var view = combo.up( 'smarttrackformview' )
                            view.down( '#itemImg' ).setSrc( value )
                        }
                    },
                    store: [
                        [ '/resources/softguard/images/vc/VC1.png', getLocale( 'VC1' ) ],
                        [ '/resources/softguard/images/vc/VC2.png', getLocale( 'VC2' ) ],
                        [ '/resources/softguard/images/vc/VC3.png', getLocale( 'VC3' ) ],
                        [ '/resources/softguard/images/vc/VC4.png', getLocale( 'VC4' ) ],
                        [ '/resources/softguard/images/vc/VC5.png', getLocale( 'VC5' ) ],
                        [ '/resources/softguard/images/vc/VC6.png', getLocale( 'VC6' ) ],
                        [ '/resources/softguard/images/vc/VC7.png', getLocale( 'VC7' ) ],
                        [ '/resources/softguard/images/vc/VC8.png', getLocale( 'VC8' ) ],
                        [ '/resources/softguard/images/vc/VC9.png', getLocale( 'VC9' ) ],
                        [ '/resources/softguard/images/vc/VC10.png', getLocale( 'VC10' ) ]
                    ]

                }, {
                    xtype: 'image',
                    itemId: 'itemImg',
                    margin: '0 0 0 10',
                    width: 16
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Seguimiento',
            collapsed: false,
            collapsible: false,
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Disponible',
                    name: "trackingEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                    store: [ [ 0, getLocale( 'No disponible' ) ], [ 2, getLocale( 'Disponible' ) ], [ 3, getLocale( 'Restriccion global' ) ] ],
                    itemId: 'disponible',
                    emptyText: 'Valor por defecto'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Distancia',
                    minValue: 500,
                    width: 50,
                    name: "trackingDistance",
                    itemId: 'distance'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo', minValue: 5,
                    width: 50,
                    name: "trackingTime",
                    itemId: 'time'
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Control distancia sin mov.',
            collapsed: false,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 220
            },
            items: [ {
                xtype: 'combobox',
                fieldLabel: 'Disponible',
                name: "controlDistanciaEnabled",
                itemId: "controlDistanciaEnabled",
                store: [ [ 0, getLocale( 'No disponible' ) ], [ 1, getLocale( 'Disponible' ) ] ]
            }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Dispersion Admitida',
                    minValue: 0,
                    width: 50,
                    name: "dispercionAdmitida",
                    itemId: "dispercionAdmitida",
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo de control sin movimiento',
                    minValue: 0,
                    width: 50,
                    name: "tiempoControlSinMovimiento",
                    itemId: "tiempoControlSinMovimiento",
                }]
        },
        {
            xtype: 'fieldset',
            title: 'Alarmas',
            collapsed: false,
            collapsible: true,
            items: [
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Control HeartBeat'
                    , minValue: 0,
                    width: 50,
                    name: "HBcontrol",
                    itemId: 'HBcontrol'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo (minutos)',
                    minValue: 5,
                    width: 120,
                    itemId: 'HBtime',
                    name: "HBtime" // metros
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Presencia',
            collapsed: false,
            collapsible: false,

            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Disponible',
                    itemId: 'manAliveEnabled',
                    name: "manAliveEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                    store: [ [ 0, getLocale( 'No habilitado' ) ], [ 1, getLocale( 'Habilitado' ) ] ],
                    emptyText: 'Valor por defecto'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'tolerancia',
                    minValue: 2,
                    width: 50,
                    itemId: 'manAliveTimeSpan',
                    name: "manAliveTimeSpan" // metros
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Acceso al carrete para envío de Multimedia',
            collapsed: false,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 70
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Disponible',
                    itemId: 'CarreteHabilitado',
                    name: "CarreteHabilitado",// 0- no disponible ,1- disponible 
                    store: [ [ 0, getLocale( 'No habilitado' ) ], [ 1, getLocale( 'Habilitado' ) ] ]
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Usuario asociado',
            width: '99%',
            layout: 'hbox',
            items: [
                {
                    xtype: 'button',
                    text: 'Seleccionar un usuario',
                    itemId: 'seleccionarusuario',
                    margin: '0 10 0 0'
                }, {
                    xtype: 'component',
                    itemId: 'nombreusuario'
                }, {
                    xtype: 'textfield',
                    itemId: 'idusuario',
                    name: 'awccUserId',
                    margin: '0 10 0 0',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Borrar selección',
                    itemId: 'borrarusuario',
                    hidden: true
                }
            ]
        }
    ],
    buttons: [ {
        text: 'Guardar',
        action: 'save',
        formBind: true
    }, {
            text: 'Cancelar',
            action: 'cancel'
        }],
    initComponent: function() {
        this.callParent();
    } // cierro init
});