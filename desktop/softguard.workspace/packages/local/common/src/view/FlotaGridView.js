//MIGRADO2024
Ext.define( 'Common.view.FlotaGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.flotagridview',
    title: getLocale( '' ),
    hidden: false,
    viewConfig: {
        loadMask: false
    },

    features: [
        {
            ftype: 'grouping',
            //groupHeaderTpl:  '<input class="grpCheckbox" type="checkbox">{name}</input>',
            groupByText: getLocale( 'Agrupar' ),
            showGroupsText: getLocale( 'Mostrar en grupos' ),
            onGroupClick: function() {
                //anulo el click del feature para que no de error, no necesito collapsar
            }
        }
    ],
    columns: [ {
        xtype: 'gridcolumn',
        header: '',
        itemId: 'clickItem',
        dataIndex: 'tip_cdescripcion',
        sortable: true,
        groupable: true,
        menuDisabled: true,
        width: 26,
        renderer: function( value, metadata, record ) {
            return '<img data-qtip="' + value + '" src="/resources/softguard/images/trackguard-' + record.get( 'tip_nTipo' ) + '.png" width=16 height=16>';
        }
    }, {
            xtype: 'gridcolumn',
            header: 'Matrícula',
            dataIndex: 'Domain',
            menuDisabled: true,
            sortable: true,
            groupable: false,
            width: 65
        },
        {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            sortable: true,
            menuDisabled: true,
            dataIndex: 'cue_clinea',
            renderer: function( value, object, record ) {
                return record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' );
            },
            width: 70
        }, {
            xtype: 'gridcolumn',
            header: 'Dealer',
            dataIndex: 'cue_clinea',
            sortable: true,
            menuDisabled: false,
            groupable: true,
            hidden: true,
            width: 50
        }, {
            xtype: 'gridcolumn',
            header: 'Nombre Cuenta',
            dataIndex: 'cue_cnombre',
            sortable: true,
            menuDisabled: true,
            groupable: false,
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            hidden: false,
            header: 'Fecha ult. posición',
            dataIndex: 'gps_trawfechahora',
            renderer: function( value, metadata, record, colIndex, store, view ) {
                if( value ) {
                    return Ext.Date.format( new Date( value ), 'd/m/Y H:i:s' )
                } else {
                    return '';
                }
            },
            sortable: true,
            width: 160
        }, {
            xtype: 'gridcolumn',
            header: 'Vel.',
            dataIndex: 'gps_iVelocidad',
            sortable: true,
            menuDisabled: true,
            groupable: false,
            renderer: function( value, object, record ) {
                return value + ' km/h';
            },
            width: 55
        }
    ],
    initComponent: function() {
        this.callParent( arguments );
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            itemId: 'toolbarfiltro',
            items: [ {
                xtype: 'combo',
                hideOnClick: false,
                store: [
                    [ 'Dealer-Cuenta', getLocale( 'Dealer-Cuenta' ) ],
                    [ 'cue_clinea', getLocale( 'Dealer' ) ],
                    [ 'cue_ncuenta', getLocale( 'Cuenta' ) ],
                    [ 'DomainLIKE', getLocale( 'Matrícula' ) ],
                    [ 'cue_cimei', getLocale( 'Imei' ) ],
                    [ 'cue_cnombre:LIKE', getLocale( 'Nombre' ) ]
                ],
                queryMode: 'local',
                value: 'cue_cnombre:LIKE',
                itemId: 'queryType',
                fieldLabel: '',
                width: 150,
                listeners: {
                    'change': function( obj, value ) {
                        this.up( 'flotagridview' ).down( '#query' ).setValue( '' )
                    }
                }
            }, {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 100,
                    defaultButton: 'flotagridview #buscar',
                    enableKeyEvents: true,
                    listeners: {
                        specialKey: function( field, el ) {
                            if( el.getKey() == Ext.EventObject.ENTER && this.defaultButton ) {
                                var submitBtn = this.defaultButton
                                Ext.ComponentQuery.query( submitBtn )[ 0 ].fireEvent( 'click', this );
                            }
                        }
                    },
                    validator: function( value ) {
                        if( this.up( 'flotagridview' ).down( '#queryType' ).getValue() == 'cue_clinea' ) {
                            console.log( arguments )
                            if( value.length <= 3 ) {
                                this.up( 'flotagridview' ).down( '#buscar' ).setDisabled( false );
                                this.clearInvalid();
                                this.textValid = true;
                            } else {
                                this.up( 'flotagridview' ).down( '#buscar' ).setDisabled( true );
                                this.markInvalid( 'Maximo 3 letras' );
                                this.textValid = 'Maximo 3 letras';
                            }
                        } else {
                            this.up( 'flotagridview' ).down( '#buscar' ).setDisabled( false );
                            this.clearInvalid();
                            this.textValid = true;
                        }
                        return this.textValid;
                    }
                }, {
                    iconCls: '',
                    text: 'Buscar',
                    action: 'filterText',
                    hideOnClick: false,
                    itemId: 'buscar',
                    disabled: true,
                    enableToggle: true  // Agrega esta línea para permitir el cambio de estado del botón
                }, '-', {
                    text: 'Agrupar por Dealer',
                    action: 'groupdealer',
                    hideOnClick: false,
                    pressed: false,
                    toggleGroup: 'filtros',
                    enableToggle: false
                }, {
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Prueba',
                    itemId: 'filterEnprueba',
                    action: 'filterEnprueba',
                    toggleGroup: 'filtros',
                    enableToggle: true,
                    pressed: false
                }, '-', {
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todos',
                    itemId: 'searchAll',
                    action: 'removefilter'
                    /*
                    hideOnClick:false,
                    pressed: false,
                    toggleGroup: 'filter',
                    enableToggle: false */
                }]// cierro items
        });
        this.addDocked( toolbar );
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            dock: 'bottom',
            items: [ {
                text: 'Todos ',
                itemId: 'dispositivos-todos',
                iconCls: 'con-map-magnify',
                pressed: false,
                enableToggle: true,
                toggleGroup: 'tipofiltro'
            },
                {
                    text: 'Dispositivos seleccionados',
                    itemId: 'dispositivos-seleccionados',
                    pressed: false,
                    iconCls: 'icon-map-magnify',
                    enableToggle: true,
                    toggleGroup: 'tipofiltro'
                },
                {
                    text: 'Todos los dispositvos del filtro aplicado',
                    itemId: 'dispositivos-filtro',
                    pressed: false,
                    iconCls: 'icon-map-magnify',
                    enableToggle: true,
                    toggleGroup: 'tipofiltro'
                }]
        })
        this.addDocked( toolbar );
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            itemId: 'toolbarestados',
            dock: 'top',
            items: [ {
                text: 'En movimiento',
                itemId: 'enmovimiento',
                iconCls: 'con-tg-upright',
                //pressed: true,
                enableToggle: true
            },
                {
                    text: 'Detenidos',
                    itemId: 'frenado',
                    iconCls: 'icon-tg-stop',
                    //pressed: true,
                    enableToggle: true
                },
                {
                    text: 'No actuales',
                    itemId: 'viejas',
                    pressed: false,
                    iconCls: 'icon-tg-exclamation',
                    enableToggle: true
                },
                {
                    text: 'Con alarma',
                    itemId: 'conalarma',
                    //pressed: true,
                    iconCls: 'icon-tg-upright-alert',
                    enableToggle: true
                },
                {
                    text: 'En viaje',
                    itemId: 'enviaje',
                    pressed: false,
                    iconCls: 'icon-map',
                    enableToggle: true
                }
            ]
        })
        this.addDocked( toolbar );
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'pagingtoolbar',
            displayInfo: true
        });
        this.addDocked( pagingtoolbar );
    } // cierro init
});