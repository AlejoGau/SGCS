Ext.define('GestorSim.view.SimGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.simgridview',
    title: "Administrador de Sim's",
    autoHeight: true,
    itemId: 'simgridview',
    //selModel: Ext.create('Ext.selection.CheckboxModel'), 

    columns: [
        {
            xtype: 'actioncolumn',
            header: 'Accion',
            width: 130,
            items: [
                {
                    iconCls: 'icon-cuentaEdit',
                    tooltip: getLocale('Modificar Sim'),
                    handler: function (grid, rowIndex, colIndex, item, event) {
                        var view = grid.up('simgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit', rec, view);
                    },
                    // getClass: function( value, metadata, record, a, b, c, grid ) {
                    //     var view = grid.up( 'simgridview' )
                    //     if( view.cambioSituacionShow ) {
                    //         return 'x-hide-display';
                    //     } else {
                    //         return 'icon-cuentaEdit';
                    //     }
                    // }
                },
                // {
                //     tooltip: getLocale( 'Copiar' ),
                //     iconCls: 'icon-cuentaAdd',
                //     handler: function( grid, rowIndex, colIndex, item, event ) {
                //         var view = grid.up( 'cuentagridview' );

                //         if( !view.cuentasDisponibles ) {
                //             notify( 'Supero la cantidad de cuentas disponibles.' );
                //             return false;
                //         }

                //         if( !view.copiHide && view.cuentasDisponibles ) {
                //             var record = grid.getStore().getAt( rowIndex );
                //             var cuenta = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );

                //             Ext.create( 'Ext.Window', {
                //                 title: getLocale( 'Copiar cuenta' ) + ': ' + cuenta,
                //                 height: 600,
                //                 width: 400,
                //                 closeAction: 'hide',
                //                 border: false,
                //                 layout: 'fit',
                //                 modal: true,
                //                 items: [ {
                //                     xtype: 'cuentacopyview',
                //                     record: record,
                //                     caller: view,
                //                     itemDbClickView: view.itemDbClickView
                //                 }]
                //             }).show();
                //         } else {
                //             notify( 'No tiene el permiso necesario.' );
                //         }
                //     },
                //     getClass: function( value, metadata, record, a, b, c, grid ) {
                //         var view = grid.up( 'cuentagridview' )
                //         if( view.cambioSituacionShow ) {
                //             return 'x-hide-display';
                //         } else {
                //             return 'icon-cuentaAdd';
                //         }
                //     }
                // },
                // {
                //     iconCls: 'icon-clock-red',
                //     tooltip: getLocale( 'Modificar situación' ),

                //     handler: function( grid, rowIndex, colIndex ) {
                //         var caller = grid.up( 'cuentagridview' );
                //         var modules;
                //         var situacion;
                //         var record = grid.getStore().getAt( rowIndex );
                //         // me fijo si es _SG-INTE BC 402488591
                //         if( record.get( 'cue_clinea' ) == '_SG' && record.get( 'cue_ncuenta' ) == 'INTE' ) {
                //             notifyError( 'No es posible modificar la cuenta' );
                //             return false;
                //         }

                //         // busco el modulo de situacion
                //         if( !caller.isAdmin ) {
                //             modules = caller.security.modules;
                //             situacion = Ext.Array.filter( modules, function( module ) {
                //                 if( module.view == 'estadoview' )
                //                     return true
                //                 else
                //                     return false
                //             })[ 0 ];
                //         }

                //         if( caller.isAdmin || situacion.profile >= '2' ) {
                //             var cuenta = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ),
                //                 view = Ext.widget( 'estadoview', {
                //                     cuenta: record,
                //                     caller: caller,
                //                     module: { profile: 3 }
                //                 });

                //             Ext.create( 'Ext.Window', {
                //                 title: getLocale( 'Modificar situación' ) + ': ' + cuenta,
                //                 height: 450,
                //                 width: 750,
                //                 closeAction: 'destroy',
                //                 border: false,
                //                 layout: 'fit',
                //                 caller: caller,
                //                 translate: false,
                //                 modal: true,
                //                 items: [ view ]
                //             }).show();
                //         } else {
                //             notifyError( 'No posee derechos para esta operación' );
                //         }
                //     }
                // }, 
                // {
                //     iconCls: 'icon-reportes',
                //     tooltip: getLocale( 'Eventos' ),
                //     handler: function( grid, rowIndex, colIndex, item, event ) {
                //         var view = grid.up( 'cuentagridview' );
                //         var rec = grid.getStore().getAt( rowIndex );
                //         view.fireEvent( 'mostrarEventos', rec, view );
                //     },
                //     getClass: function( value, metadata, record, a, b, c, grid ) {
                //         var view = grid.up( 'cuentagridview' )
                //         if( view.cambioSituacionShow ) {
                //             return 'x-hide-display';
                //         } else {
                //             return 'icon-reportes';
                //         }

                //     }
                // }, {
                //     iconCls: 'icon-application-cascade',
                //     tooltip: getLocale( 'Ver particiones' ),
                //     itemId: 'iconparticiones',
                //     getClass: function( value, metadata, record, a, b, c, grid ) {
                //         var view = grid.up( 'cuentagridview' )

                //         if( view.partitionHide || view.cambioSituacionShow ) {
                //             return 'x-hide-display';
                //         } else {
                //             return 'icon-application-cascade';
                //         }
                //     },

                //     handler: function( grid, rowIndex, colIndex ) {
                //         var view = grid.up( 'cuentagridview' );
                //         var record = grid.getStore().getAt( rowIndex ),
                //             cuenta = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ),
                //             view = Ext.widget( 'particioneschooserview', {
                //                 record: record,
                //                 targetTab: view.up( '#center' ),
                //                 hideEdit: true,
                //                 ultimaAlarma: true
                //             });
                //         Ext.create( 'Ext.Window', {
                //             title: getLocale( 'Particiones' ) + ': ' + cuenta,
                //             height: 250,
                //             width: 750,
                //             closeAction: 'hide',
                //             border: false,
                //             layout: 'fit',
                //             modal: true,
                //             items: [ view ]
                //         }).show();
                //     }
                // },
                // {
                //     iconCls: 'icon-map',
                //     tooltip: getLocale( 'Seguimiento' ),
                //     handler: function( grid, rowIndex, colIndex, item, event ) {
                //         var view = grid.up( 'cuentagridview' );
                //         var record = grid.getStore().getAt( rowIndex );
                //         var tabpanel = view.up('tabpanel');
                //         var newTab = tabpanel.add({
                //             xtype: 'tecguardseguimientomapview',
                //             record: record,
                //             closable: true,
                //             closeAction: 'destroy',
                //             title: record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ),
                //             translate: false
                //         });

                //         tabpanel.setActiveTab(newTab);
                //     },
                //     getClass: function( value, metadata, record, a, b, c, grid ) {
                //         var view = grid.up( 'cuentagridview' );
                //         // me fijo si es tecguard y si tiene posicion
                //         var tip_ntipo = record.get('tip_nTipo');
                //         var icon =  'x-hide-display';

                //         if( tip_ntipo == 11 && record.get('gps_tfechahora') && record.get('gps_tfechahora').getFullYear() > 1980 ) {
                //             icon = 'icon-map';
                //         }

                //         return icon;
                //     }
                // }
            ],
            hideable: false
        },
        {
            xtype: 'gridcolumn',
            header: 'Número de linea',
            dataIndex: 'sim_codigo',
            width: 200,
            // renderer: function( value, metadata, record ) {
            //     if( value == 1 ) {
            //         return '<img data-qtip="' + getLocale( 'Automonitoreo' ) + '" src="/resources/global/images/icons/monitor_lightning.png" width=16 height=16>';
            //     }
            //     return '';
            // },
            // hideable:false
        }, {
            xtype: 'gridcolumn',
            header: 'Marca',
            dataIndex: 'tsm_cDescripcion',
            // align: 'center',
            width: 100,
            // renderer: function( value, metadata, record, colIndex, store, view ) {

            //     /* datos pasados por Pablo 
            //     Do Case 
            //     Case Between(iNivel,1,8) 
            //     oic = '\SoftGuard\Graphics\okDataSignal14Diag.jpg'
            //     Case Between(iNivel,9,16) 
            //     oic = '\SoftGuard\Graphics\okDataSignal12Diag.jpg'
            //     Case Between(iNivel,17,24) 
            //     oic = '\SoftGuard\Graphics\okDataSignal34Diag.jpg'
            //     Case Between(iNivel,25,32) 
            //     oic = '\SoftGuard\Graphics\okDataSignalFullDiag.jpg'
            //     Otherwise
            //     oic = '\SoftGuard\Graphics\okData.gif'
            //     EndCase
            //     */
            //     metadata.tdAttr = 'data-qtip="' + Ext.String.htmlEncode( '<i>' + getLocale( 'Señal' ) + ': ' + value + '</i>' ) + '"';


            //     if( value > 0 && value <= 8 ) {
            //         return '<img src="/resources/softguard/images/signal/1.png" />'
            //     } else if( value >= 9 && value <= 16 ) {
            //         return '<img src="/resources/softguard/images/signal/2.png" />'
            //     } else if( value >= 17 && value <= 24 ) {
            //         return '<img src="/resources/softguard/images/signal/3.png" />'
            //     } else if( value >= 25 ) {
            //         return '<img src="/resources/softguard/images/signal/4.png" />'
            //     } else {
            //         return ''
            //     }

            // }
        }, {
            xtype: 'gridcolumn',
            header: 'Estado',//getParametro( 'LABELCAMPOCUSTOM' ),
            sortable: true,
            dataIndex: 'tse_cDescripcion',
            width: 200,
            // hidden: true
        }, {
            xtype: 'gridcolumn',
            header: 'Dealer-Cuenta',
            sortable: true,
            dataIndex: '_dealercuenta',
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        },
        {
            xtype: 'gridcolumn',
            header: 'Nombre',
            sortable: true,
            dataIndex: 'cue_cnombre',
            hidden: false,
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        },

        {
            xtype: 'gridcolumn',
            header: 'APN',
            sortable: true,
            dataIndex: 'tsa_cDescripcion',
            hidden: true,
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        },
        {
            xtype: 'gridcolumn',
            header: 'CSID',
            sortable: true,
            dataIndex: 'sim_csid',
            hidden: true,
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        },
        {
            xtype: 'datecolumn',
            header: getLocale('Fecha activación'),
            sortable: true,
            dataIndex: 'sim_fecha_activacion',
            // dateFormat:'MS',
            format:'d/m/Y',
            hidden: true,
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        },
        {
            xtype: 'gridcolumn',
            header: 'ICCID',
            sortable: true,
            dataIndex: 'sim_iccid',
            hidden: true,
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        },
        {
            xtype: 'gridcolumn',
            header: 'Agente',
            sortable: true,
            dataIndex: 'sim_agente',
            hidden: true,
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        },
        {
            xtype: 'gridcolumn',
            header: 'Observaciones',
            sortable: true,
            dataIndex: 'sim_observaciones',
            hidden: true,
            // renderer: function( value, object, record ) {
            //     return record.get( 'cue_clinea' ) + '-' + value;
            // },
            width: 200,
            //  hideable:false
        }
    ],

    initComponent: function () {
        this.callParent(arguments);


        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Nueva SIM',
                    itemId: 'cuentaCreate',
                    action: 'crearCuenta',
                    disabled: false
                },
                {
                    text: 'Filtros de busqueda',
                    itemId: 'filtro',
                    menu: {
                        xtype: 'menu',
                        width: 400,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton: 'cuentagridview #search',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'Datos de la SIM',
                                        flex: 1,
                                        autoHeight: true,
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                layout: 'hbox',
                                                title: getLocale('Cuenta'),
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'cuenta',
                                                        text: getLocale('Seleccione una cuenta'),
                                                        margin: '0 10 0 0'
                                                    }, {
                                                        xtype: 'displayfield',
                                                        itemId: 'nombrecuenta'
                                                    }, {
                                                        xtype: 'displayfield',
                                                        itemId: 'sim_cuenta',
                                                        hidden: true
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'numberfield',
                                                fieldLabel: getLocale('Número de linea'),
                                                itemId: "sim_codigo",
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: getLocale('APN'),
                                                displayField: 'tsa_cDescripcion',
                                                emptyText: getLocale('Seleccione'),
                                                valueField: 'Id',
                                                name: 'sim_apn',
                                                queryMode: 'local',
                                                itemId: 'sim_apn',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'numberfield',
                                                fieldLabel: getLocale('CSID'),
                                                itemId: "sim_csid",
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: getLocale('Fecha activación'),
                                                format: 'd/m/Y',
                                                name: "sim_fecha_activacion",
                                                itemId: "sim_fecha_activacion",
                                                anchor: '100%'
                                            },

                                            {
                                                xtype: 'textfield',
                                                fieldLabel: getLocale('ICCID'),
                                                itemId: "sim_iccid",
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: getLocale('Marca'),
                                                displayField: 'tsm_cDescripcion',
                                                emptyText: getLocale('Seleccione'),
                                                valueField: 'Id',
                                                name: 'sim_marca',
                                                queryMode: 'local',
                                                itemId: 'sim_marca',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: getLocale('Estado'),
                                                displayField: 'tse_cDescripcion',
                                                emptyText: getLocale('Seleccione'),
                                                valueField: 'Id',
                                                name: 'sim_estado',
                                                queryMode: 'local',
                                                itemId: 'sim_estado',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Observaciones',
                                                itemId: "sim_observaciones",
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: '',
                                                text: 'Buscar',
                                                action: 'filterText',
                                                itemId: 'search'
                                            }
                                        ]
                                    }

                                ]

                            }
                        ]
                    }
                },
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
                , {
                    iconCls: 'icon-text-columns ',
                    text: 'Más información',
                    action: 'filiacion',
                    itemId: 'filiacion',
                    toggleGroup: 'info',
                    enableToggle: true,
                    pressed: true,
                },

                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    scope: this
                }

            ]// cierro items
        });

        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            itemId: 'pagingtoolbar',
            name:'pagingtoolbar',
            dock: 'bottom',
            pageSize: 25,
            displayMsg: 'Mostrando {0} - {1} de {2}',
            displayInfo: true
        });

        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);



        //         /*
        //         *
        //         *  PERSONALIZO la vista según metadata
        //         *
        //         */

        //         var view = this;

        //         if( UiApplicationMetadata.viewConfig ) {
        //             var viewConfig = Ext.JSON.decode( UiApplicationMetadata.viewConfig );
        //             Ext.Array.each( viewConfig, function( item ) {
        //                 if( item.view == view.alias[ 0 ].split( '.' )[ 1 ] ) {
        //                     if( item.showColumns ) {
        //                         Ext.Array.each( item.showColumns, function( index ) {
        //                             var column = view.down( "gridcolumn[dataIndex=" + index + "]" );
        //                             if( column ) column.show();
        //                         });
        //                     }
        //                 }
        //             });
        //         }


        //         this.decimalColorToHTMLcolor = function( number ) {
        //             var intnumber = number - 0;
        //             var red, green, blue;
        //             var template = "#000000";
        //             red = ( intnumber & 0x0000ff ) << 16;
        //             green = intnumber & 0x00ff00;
        //             blue = ( intnumber & 0xff0000 ) >>> 16;
        //             intnumber = red | green | blue;

        //             var HTMLcolor = intnumber.toString( 16 );


        //             HTMLcolor = template.substring( 0, 7 - HTMLcolor.length ) + HTMLcolor;

        //             return HTMLcolor;
        //         };
    } // cierro init
});








