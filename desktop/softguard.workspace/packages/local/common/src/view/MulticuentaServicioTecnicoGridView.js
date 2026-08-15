 
Ext.define( 'Common.view.MulticuentaServicioTecnicoGridView', {
    extend: 'Ext.grid.Panel',
    alias: [ 'widget.multicuentaserviciotecnicogridview', 'widget.multicuentaserviciotecnicoextdelaersearchgridview' ],
    title: 'Servicio Tecnico',
    autoHeight: true,
    itemId: 'multicuentaserviciotecnicogridview',
    //selModel: Ext.create( 'Ext.selection.CheckboxModel' ),  // dedalo 25/10/2019 activo porque es necesario para imprimir multiple, etc.
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },    
    stateFull: true,
    stateId: 'servtecviewB',
    _OpenMaximize: true,
    features: [
        {
            ftype: 'grouping',
            id: 'groupingMST',
            enableGroupingMenu: false,
            groupHeaderTpl: '{name} ({rows.length})',
            hideGroupedHeader: true
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            width: 60,
            items: [
                {
                    iconCls: 'icon-wrench-orange',
                    tooltip: getLocale( 'Modificar servicio' ),
                    getClass: function( v, meta, rec ) {
                        var view = this.up( 'multicuentaserviciotecnicogridview' );
                        if( view.metodo != 'readonly' ) {
                            return 'icon-wrench-orange'
                        }
                        return 'icon--hidden';
                    },
                    handler:
                    function( grid, rowIndex, colIndex, item, event ) {
                        var view = grid.up( 'multicuentaserviciotecnicogridview' );
                        var rec = grid.getStore().getAt( rowIndex );
                        view.fireEvent( 'itemdblclick', view, rec, item );
                    }
                }
                , {
                    iconCls: 'icon-printer',
                    tooltip: getLocale( 'Imprimir orden' ),
                    getClass: function( v, meta, rec ) {
                        return 'icon-printer'
                    },
                    // Nuevo handler
                    handler: function( grid, rowIndex, colIndex, item, event ) {
                        var view = grid.up( 'multicuentaserviciotecnicogridview' );
                        var tabpanel = view.up( 'tabpanel' );
                        var rec = grid.getStore().getAt( rowIndex );
                        var title = getLocale( 'Orden' ) + ' (' + rec.get( 'stc_inumero' ) + ')';
                        var rec = grid.getStore().getAt( rowIndex );
                        var stc_iid = rec.get( 'stc_iid' );
                        var win = Ext.create( 'Ext.Window', {
                            layout: 'fit',
                            title: 'Seleccione tipo de Impresión',
                            translate: false,
                            closeAction: 'hide',
                            border: true,
                            modal: false,
                            width: 200,
                            height: 200,
                            printTitle: title,
                            stc_iid: stc_iid,
                            rec: rec,
                            items: [ {
                                xtype: 'panel',
                                dockedItems: [ {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [ {
                                        text: 'Imprimir',
                                        iconCls: 'icon-printer',
                                        handler: function( button ) {
                                            var popup = button.up( 'window' );
                                            var accionPrint = popup.down( '#accionPrint' ).getValue();
                                            var filters = [ {
                                                property: 'stc_iid',
                                                value: popup.stc_iid
                                            }];
                                            var newTab = Ext.widget( 'ordenservtecview', {
                                                title: '',
                                                filters: filters,
                                                translate: false,
                                                record: popup.rec,
                                                closeAction: 'destroy',
                                                hidePrint: view.hidePrint,
                                                accionPrint: accionPrint
                                            });
                                            var printWin = Ext.create( 'Ext.Window', {
                                                layout: 'fit',
                                                title: title,
                                                translate: false,
                                                closeAction: 'hide',
                                                border: true,
                                                modal: false,
                                                view: view,
                                                items: newTab,
                                                maximized: true
                                            });
                                            printWin.show();
                                            win.hide();
                                        }
                                    }]
                                }],
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Ver acciones',
                                        itemId: 'accionPrint',
                                        checked: true
                                    }
                                ]
                            }],
                        });
                        win.show();
                    }
                }]
        },
        {
            xtype: 'gridcolumn',
            header: 'Id',
            dataIndex: 'Id',
            hidden: true,
            width: 50,
        },
        {
            xtype: 'gridcolumn',
            header: 'Num.',
            sortable: true,
            dataIndex: 'stc_inumero',
            width: 50,
        }, {
            header: 'Fecha de Creación',
            sortable: true,
            dataIndex: 'stc_dfecha_creacion',
            width: 150,
            xtype: 'gridcolumn',
            renderer: function( value, object, record ) {
                if( Ext.Date.format( record.get( 'stc_dfecha_creacion' ), 'Y' ) > '1970' ) {
                    return Ext.Date.format( record.get( 'stc_dfecha_creacion' ), 'd/m/Y G:i:s' );
                } else {
                    return '';
                }
            }
        },
        {
            header: 'Fecha Modificacion',
            sortable: true,
            dataIndex: 'stc_dfecha_modificacion',
            width: 150,
            xtype: 'gridcolumn',
            //format : 'D d-m-Y G:i:s',
            renderer: function( value, object, record ) {
                if( Ext.Date.format( record.get( 'stc_dfecha_modificacion' ), 'Y' ) > '1970' ) {
                    return Ext.Date.format( record.get( 'stc_dfecha_modificacion' ), 'd/m/Y G:i:s' );
                } else {
                    return '';
                }
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Tipo servicio',
            dataIndex: 'tip_ntipo',
            sortable: true,
            width: 130,
            renderer: function( value, object, record ) {
                var store = Ext.data.StoreManager.lookup( 'tip_ntipoStore' );
                var tipo = store.findRecord( 'Value', value );
                if( tipo ) {
                    return tipo.get( 'Name' );
                } else {
                    return '';
                }
            }
        }, {
            header: 'Fecha de visita',
            sortable: true,
            dataIndex: 'stc_dfecha_desde_1',
            width: 150,
            hidden: true,
            xtype: 'gridcolumn',
            //format : 'D d-m-Y G:i:s',
            renderer: function( value, object, record ) {
                if( Ext.Date.format( record.get( 'stc_dfecha_desde_1' ), 'Y' ) > '1970' ) {
                    return Ext.Date.format( record.get( 'stc_dfecha_desde_1' ), 'd/m/Y G:i:s' );
                } else {
                    return '';
                }
            }
        }, {
            header: 'Fecha de finalización',
            sortable: true,
            dataIndex: 'stc_dfecha_cierre',
            width: 100,
            xtype: 'gridcolumn',
            //format : 'D d-m-Y G:i:s',
            renderer: function( value, object, record ) {
                if( Ext.Date.format( record.get( 'stc_dfecha_cierre' ), 'Y' ) > '1970' ) {
                    return Ext.Date.format( record.get( 'stc_dfecha_cierre' ), 'd/m/Y G:i:s' );
                } else {
                    return '';
                }
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Dealer',
            sortable: true,
            //width : 250,
            flex: 1,
            
            dataIndex: 'cue_clinea',
            /*renderer: function( value, metaData, record, rowIndex, colIndex, store, view ) {
                return record.get( 'cue_clinea' ) + ' - ' + record.get( 'cue_ncuenta' ) + ' - ' + record.get( 'cue_cnombre' );
            }*/
        },{
            xtype: 'gridcolumn',
            header: 'Cuenta',
            sortable: false,
            dataIndex: '_nombreCuenta',
            
        },{
            xtype: 'gridcolumn',
            header: 'Nombre Cuenta',
            dataIndex: 'cue_cnombre',
            minWidth: 250,
        },{
            xtype: 'gridcolumn',
            header: 'Telefono',
            sortable: true,
            dataIndex: 'cue_ctelefono'
        },
        {
            xtype: 'gridcolumn',
            header: 'Tecnico',
            sortable: true,
            //id:'stc_ctecnico_1',
            dataIndex: 't1.ins_cnombre',
            /*renderer: function( value, metadata, record ) {
                var tecnicos = record.get( 'stc_ctecnico_1_cnombre' );
                if( record.get( 'stc_ctecnico_2_cnombre' ) ) {
                    tecnicos += ', ' + record.get( 'stc_ctecnico_2_cnombre' )
                }
                if( record.get( 'stc_ctecnico_3_cnombre' ) ) {
                    tecnicos += ', ' + record.get( 'stc_ctecnico_3_cnombre' )
                }
                if( record.get( 'stc_ctecnico_4_cnombre' ) ) {
                    tecnicos += ', ' + record.get( 'stc_ctecnico_4_cnombre' )
                }
                if( record.get( 'stc_ctecnico_5_cnombre' ) ) {
                    tecnicos += ', ' + record.get( 'stc_ctecnico_5_cnombre' )
                }
                return tecnicos;
            }*/
        }, {
            xtype: 'gridcolumn',
            header: 'Dirección',
            sortable: true,
            hidden: true,
            dataIndex: 'cue_ccalle'
        }, {
            xtype: 'gridcolumn',
            header: 'Localidad',
            sortable: true,
            hidden: true,
            dataIndex: 'cue_clocalidad'
        }, {
            xtype: 'gridcolumn',
            header: 'Provincia/Estado',
            sortable: true,
            hidden: true,
            dataIndex: 'pro_cdescripcion'
        }, {
            xtype: 'gridcolumn',
            header: 'Servicio',
            dataIndex: 'tip_cdescripcion',
            sortable: true,
            width: 130
        },
        {
            xtype: 'gridcolumn',
            header: 'Estado',
            dataIndex: 'stc_nestado',
            width: 130,
            sortable: true,
            renderer: function( value, metaData, record, rowIndex, colIndex, store, view ) {
                switch( value ) {
                    case 1:
                        metaData.style = 'background-color:#FFFF00;color:black;';
                        return getLocale( 'Pendiente' );
                        break;
                    case 2:
                        metaData.style = 'background-color:#FFFF00;color:black;';
                        return getLocale( 'Asignado' );
                        break;
                    case 3:
                        metaData.style = 'background-color:#FF0000;color:black;';
                        return getLocale( 'Cancelado' );
                        break;
                    case 4:
                        metaData.style = 'background-color:#33CC33;color:black;';
                        return getLocale( 'Finalizado' );
                        break;
                    case 5:
                        metaData.style = 'background-color:#FFFF00;color:black;';
                        return getLocale( 'En Ejecución' );
                        break;
                    case 6:
                        metaData.style = 'background-color:#FFFF00;color:black;';
                        return getLocale( 'En Camino' );
                        break;
                    default:
                        return '';
                }
            },
        }, {
            xtype: 'gridcolumn',
            header: 'Usuario',
            dataIndex: 'udw_usuario',
            sortable: true,
            renderer: function( value, metadata, record, colIndex, store, view ) {
                if( record.get( 'udw_nombre' ) != '' || record.get( 'udw_apellido' ) != '' ) {
                    return record.get( 'udw_nombre' ) + ' ' + record.get( 'udw_apellido' )
                } else {
                    return record.get( 'udw_usuario' )
                }
            },
            width: 250
        },
        {
            xtype: 'gridcolumn',
            header: 'Prioridad',
            dataIndex: 'stc_iPrioridad',
            sortable: true,
            renderer: function( value ) {
                if( value == 0 ) {
                    return getLocale( 'Alta' )
                }
                if( value == 1 ) {
                    return getLocale( 'Media' )
                }
                if( value == 2 ) {
                    return getLocale( 'B' )
                }
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Observaciones',
            dataIndex: 'stc_mobservaciones',
            sortable: true,
            hidden: true,
            renderer: function( value, meta, record ) {
                console.log("value",value)
                console.log("record renderer observaciones",record)
                return value;
            }
        }
    ],
    initComponent: function() {
        this.callParent( arguments );
        var view = this;
        this.onSelectChange = function( selModel, selections ) {
            var onCheck = true;
            for( var key in selections ) {
                var valorEstado = selections[ key ].get( '_stc_estadodescripcion' );
                if( valorEstado == 'Cancelado' || valorEstado == 'Finalizado' ) {
                    onCheck = true;
                }
            }
            var reporte = this.down( 'button[action=reporte]' );
            var ordenes = this.down( 'button[action=ordenes]' );
            if( ordenes ) {
                ordenes.setDisabled( selections.length === 0 );
            }
        };
        this.getSelectionModel().on( 'selectionchange', this.onSelectChange, this );
        
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true,
            items: [
            ]
        });
        this.addDocked( pagingtoolbar );
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            itemId: 'toolpadre',
            items: [
                {
                    xtype: 'button',
                    text: 'Nuevo servicio tecnico',
                    iconCls: 'icon-date',
                    action: 'new',
                    itemId: 'new',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Nuevo servicio tecnico',
                    iconCls: 'icon-date',
                    action: 'newWithCuenta',
                    hidden: true
                }, "-",
                {
                    xtype: 'button',
                    text: 'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'todos',
                    itemId: 'vertodo'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Pendiente',
                    action: 'pendiente',
                    enableToggle: true,
                    itemId: 'pendiente-btn',
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Asignado',
                    action: 'asignado',
                    enableToggle: true,
                    itemId: 'asignado-btn'
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En camino',
                    action: 'encamino',
                    enableToggle: true,
                    itemId: 'encamino-btn'
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Ejecución',
                    action: 'enejecucion',
                    enableToggle: true,
                    itemId: 'enejecucion-btn'
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Finalizado',
                    action: 'finalizado',
                    enableToggle: true,
                    itemId: 'finalizado-btn'
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'Cancelado',
                    action: 'cancelado',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId: 'cancelado-btn'
                }, {
                    xtype: 'tbseparator',
                    itemId: 'separador'
                },
                {
                    text: 'Filtros',
                    itemId: 'filtros',
                    menu: {
                        width: 350,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton: 'multicuentaserviciotecnicogridview #search',
                                fieldDefaults: { labelWidth: 120, anchor: '100%' },
                                items: [
                                    {
                                        xtype: 'selecterfield',
                                        itemId: 'tecnicofiltro',
                                        simpleSelect: true,
                                        config: {
                                            disponible: {
                                                title: 'Tecnico',
                                                field: 'ins_cnombre',
                                                searchField: 'ins_cnombre'
                                            },
                                            selecionado: {
                                                title: 'Tecnico',
                                                field: 'ins_cnombre'
                                            },
                                            valueField: 'ins_ccodigo',
                                            modelItems: 'Common.model.InstaladoresByTokenSearchModel'
                                        },
                                        title: 'Tecnico'
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'comboregistros',
                                        itemId: 'cantRegistros',
                                        fieldLabel: 'Cantidad de registros',
                                        width: '100%',
                                        store: [
                                            [ 500, 500 ],
                                            [ 1000, 1000 ],
                                            [ 1500, 1500 ],
                                            [ 2000, 2000 ],
                                            [ 2500, 2500 ],
                                            [ 5000, 5000 ],
                                            [ 10000, 10000 ],
                                            [ 20000, 20000 ],
                                            [ 30000, 30000 ],
                                            [ 40000, 40000 ],
                                            [ 50000, 50000 ],
                                            [ 75000, 75000 ],
                                            [ 100000, 100000 ]
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Empresa Tec.',
                                        name: "empresa",
                                        itemId: 'empresa'
                                    },
                                    {
                                        xtype: 'numberfield',
                                        fieldLabel: 'Numero',
                                        name: "numero",
                                        itemId: 'numero'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Desde',
                                        name: "fdesde",
                                        bindToModel: false,
                                        itemId: 'fechadesde'
                                    }, {
                                        xtype: 'datefield',
                                        fieldLabel: 'Hasta',
                                        itemId: 'fechahasta',
                                        bindToModel: false,
                                        name: "fhasta"
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Finalizado Desde',
                                        name: "fin_desde",
                                        bindToModel: false,
                                        itemId: 'fin_desde'
                                    }, {
                                        xtype: 'datefield',
                                        fieldLabel: 'Finalizado Hasta',
                                        itemId: 'fin_hasta',
                                        bindToModel: false,
                                        name: "fin_hasta"
                                    }, {
                                        fieldLabel: 'Nombre',
                                        xtype: 'textfield',
                                        itemId: 'nombre'
                                    }, {
                                        fieldLabel: 'Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'cuenta',
                                        validator: function( value ) {
                                            var view = this.up( 'multicuentaserviciotecnicogridview' );
                                            if( value.length > 0 ) {
                                                view.down( '#dealercuenta' ).setDisabled( true )
                                                view.down( '#dealer' ).setDisabled( true )
                                            } else {
                                                view.down( '#dealercuenta' ).setDisabled( false )
                                                view.down( '#dealer' ).setDisabled( false )
                                            }
                                            return true;
                                        }
                                    }, {
                                        fieldLabel: 'Dealer-Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'dealercuenta',
                                        validator: function( value ) {
                                            var view = this.up( 'multicuentaserviciotecnicogridview' );
                                            if( value.length > 0 ) {
                                                view.down( '#cuenta' ).setDisabled( true )
                                                view.down( '#dealer' ).setDisabled( true )
                                            } else {
                                                view.down( '#cuenta' ).setDisabled( false )
                                                view.down( '#dealer' ).setDisabled( false )
                                            }
                                            return true;
                                        }
                                    }, {
                                        fieldLabel: 'Dealer',
                                        xtype: 'textfield',
                                        itemId: 'dealer',
                                        validator: function( value ) {
                                            var view = this.up( 'multicuentaserviciotecnicogridview' );
                                            if( value.length > 0 ) {
                                                view.down( '#dealercuenta' ).setDisabled( true )
                                                view.down( '#cuenta' ).setDisabled( true )
                                            } else {
                                                view.down( '#dealercuenta' ).setDisabled( false )
                                                view.down( '#cuenta' ).setDisabled( false )
                                            }
                                            return true;
                                        }
                                    }, {
                                        fieldLabel: 'Observacion',
                                        xtype: 'textfield',
                                        itemId: 'observacion',
                                    }, {
                                        fieldLabel: 'Provincia/Estado',
                                        xtype: 'combobox',
                                        itemId: 'provinciacombo',
                                        editable: false,
                                        queryMode: 'local',
                                        displayField: 'pro_cdescripcion',
                                        valueField: 'pro_ccodigo',
                                        enableKeyEvents: true,
                                        plugins: [ 'clearbutton' ]
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: 'Localidad',
                                        itemId: 'localidad'
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo de servicio',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        allowBlank: true,
                                        editable: false,
                                        store: 'tip_ntipoStore',
                                        itemId: "tiposervicio",
                                        valueField: 'Value',
                                        displayField: 'Name'
                                    },
                                    {
                                        fieldLabel: 'Prioridad',
                                        xtype: 'combo',
                                        itemId: 'prioridad',
                                        store: [
                                            [ 0, getLocale( 'Alta' ) ],
                                            [ 1, getLocale( 'Media' ) ],
                                            [ 2, getLocale( 'B' ) ]
                                        ]
                                    },
                                    {
                                        fieldLabel: 'Observaciones',
                                        xtype: 'textfield',
                                        itemId: 'observaciones',
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Buscar',
                                        iconCls: 'icon-find',
                                        action: 'search',
                                        itemId: 'search'
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'tbseparator',
                    itemId: 'separador'
                }, {
                    xtype: 'displayfield',
                    text: 'Cuenta',
                    itemId: 'nombrecuenta'
                }, {
                    xtype: 'displayfield',
                    itemId: 'idcuenta',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Seleccionar Cuenta',
                    iconCls: 'icon-find',
                    hidden: true,
                    action: 'buscarporcuenta',
                    itemId: 'selcuenta',
                    margin: '0 0 5 0'
                }, {
                    xtype: 'tbseparator',
                    itemId: 'separador'
                }, {
                    text: 'Agrupar',
                    itemId: 'agrupar',
                    menu: {
                        xtype: 'menu',
                        width: 220,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Agrupar por Dealer',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'groupCuenta',
                                        width: 200
                                    }, {
                                        xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Agrupar por Dealer-Cuenta',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'groupDealerCuenta',
                                        width: 200
                                    }, {
                                        xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Agrupar por tecnico',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'groupTecnico',
                                        width: 200
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    text: 'Accion Multiple',
                    itemId: 'multiple',
                    menu: {
                        xtype: 'menu',
                        width: 220,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Crear Visitas',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'crearVisitas',
                                        width: 200
                                    }, {
                                        xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Asignar prioridad',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'asignarPrioridad',
                                        width: 200
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Finalizar Orden',
                                        enableToggle: false,
                                        action: 'finalizar',
                                        width: 200
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'tbseparator',
                    itemId: 'separador'
                }
                , "->", {
                    text: 'Agenda',
                    iconCls: 'icon-date',
                    view: 'serteccalendarview',
                    action: 'agenda',
                    closable: true,
                    hidden: true,
                    itemId: 'agenda'
                }, "-",
                {
                    xtype: 'button',
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    tooltip: getLocale( 'Imprimir múltiple' ),
                    action: 'print'
                    /*
                    handler: function() {
                        var selectedRecords = view.getSelectionModel().getSelection();
                        var title = 'Imprimir ' + selectedRecords.length + ' ordenes';
                        var filters = selectedRecords.map( function( rec ) {
                            return {
                                property: 'stc_iid',
                                value: rec.get( 'stc_iid' )
                            };
                        });
                        var win = Ext.create( 'Ext.Window', {
                            layout: 'fit',
                            title: 'Seleccione tipo de Impresión',
                            translate: false,
                            closeAction: 'hide',
                            border: true,
                            modal: false,
                            width: 200,
                            height: 200,
                            printTitle: title,
                            filters: filters,
                            items: [ {
                                xtype: 'panel',
                                dockedItems: [ {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [ {
                                        text: 'Imprimir',
                                        iconCls: 'icon-printer',
                                        handler: function( button ) {
                                            var popup = button.up( 'window' );
                                            var accionPrint = popup.down( '#accionPrint' ).getValue();
                                            var newTab = Ext.widget( 'ordenservtecview', {
                                                title: '',
                                                translate: false,
                                                record: popup.rec,
                                                filters: filters,
                                                closeAction: 'destroy',
                                                hidePrint: view.hidePrint,
                                                accionPrint: accionPrint
                                            });
                                            var printWin = Ext.create( 'Ext.Window', {
                                                layout: 'fit',
                                                title: title,
                                                translate: false,
                                                closeAction: 'hide',
                                                border: true,
                                                modal: false,
                                                view: view,
                                                items: newTab,
                                                maximized: true
                                            });
                                            printWin.show();
                                            win.hide();
                                        }
                                    }]
                                }],
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Ver acciones',
                                        itemId: 'accionPrint',
                                        checked: true
                                    }
                                ]
                            }],
                        });
                        win.show();
                    }
                    */
                },
                {
                    xtype: 'button',
                    text: 'Reporte',
                    iconCls: 'icon-report',
                    action: 'reporte',
                    itemId: 'reportes'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});
Ext.define( 'Common.view.MulticuentaSTReducidoGridView', {
    extend: 'Common.view.MulticuentaServicioTecnicoGridView',
    alias: 'widget.multicuentaserviciotecnicoextendidogridview',
    title: 'Otros servicios',
    autoHeight: true,
    //selModel: null,//Ext.create('Ext.selection.CheckboxModel'),
    columns: [
        {
            xtype: 'actioncolumn',
            width: 50,
            items: [
                {
                    iconCls: 'icon-wrench-orange',
                    tooltip: 'Solo lectura',
                    handler: function( grid, rowIndex, colIndex, item, event ) {
                        var view = grid.up( 'multicuentaserviciotecnicogridview' );
                        var tabpanel = view.up( 'tabpanel' );
                        var rec = grid.getStore().getAt( rowIndex );
                        // var title = record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+'-'+record.get('cue_cnombre')+' ('+record.get('tip_cdescripcion')+')';
                        var title = 'Orden (' + rec.get( 'stc_inumero' ) + ')';
                        var mytab = tabpanel.down( '[title="' + title + '"]' );
                        if( !mytab ) {
                            var newTab = Ext.widget( 'sertecroview', {
                                initStore: view.store,
                                initRecord: rec,
                                title: title,
                                closable: true,
                                loseAction: 'destroy'
                            });
                            // agrego la paleta creada
                            tabpanel.add( newTab );
                            tabpanel.setActiveTab( newTab );
                        }
                    }
                }
            ]
        },
        {
            xtype: 'gridcolumn',
            header: 'Estado',
            dataIndex: '_stc_estadodescripcion',
            sortable: true,
            hidden: true
        },
        {
            xtype: 'gridcolumn',
            header: 'Num.',
            sortable: true,
            dataIndex: 'stc_inumero',
            width: 50,
            /*ACTIVAR OTRA VEZ renderer: function( value, metaData, record, rowIndex, colIndex, store, view ) {
                var valuex = record.get( '_stc_estadodescripcion' );
                if( valuex == 'Cancelado' ) {
                    metaData.tdAttr = 'style="background-color:#FF0000;color:black;"';
                } else if( valuex == 'Finalizado' ) {
                    metaData.tdAttr = 'style="background-color:#33CC33;color:black;"';
                } else if( valuex == 'Pendiente' ) {
                    metaData.tdAttr = 'style="background-color:#FFFF00;color:black;"';
                } else if( valuex == 'Asignado' ) {
                    metaData.tdAttr = 'style="background-color:#FFFF00;color:black;"';
                } else if( valuex == 'En Ejecución' ) {
                    metaData.tdAttr = 'style="background-color:#FFFF00;color:black;"';
                }
                metaData.tdAttr += 'data-qtip="' + record.get( '_stc_estadodescripcion' ) + '"';
                return value;
            }*/
        },
        {
            header: 'Fecha de alta',
            sortable: true,
            dataIndex: 'stc_dfecha_modificacion',
            width: 150,
            xtype: 'datecolumn',
            //format : 'D d-m-Y G:i:s',
            /*ACTIVAR OTRA VEZ renderer: function( value, meta, record ) {
                meta.tdAttr = 'data-qtip="Fecha de finalización: ' + Ext.Date.format( record.get( 'stc_dfecha_cierre' ), 'd/m/Y G:i:s' ) +
                    '<br> Fecha de visita:' + Ext.Date.format( record.get( 'stc_dfecha_desde_1' ), 'd/m/Y G:i:s' ) + '"';
                var date = Ext.Date.format( record.get( 'stc_dfecha_modificacion' ), 'd/m/Y G:i:s' );
                if( date != '01/01/1900 0:00:00' ) {
                    return date;
                } else {
                    return '';
                }
            }*/
        },/*{
           
        	header : 'Fecha de visita',
			sortable : true,
			dataIndex : 'stc_dfecha_desde_1',
            width : 150,   
            xtype : 'datecolumn',
        		//format : 'D d-m-Y G:i:s',
                renderer : function(value, object, record) {
                    
                    
                    var date  = Ext.Date.format(record.get('stc_dfecha_desde_1'),'d/m/Y G:i:s') ;
                   
            		if(date != '01/01/1900 0:00:00') {
            		    return date ;
                    } else {
                        return '';
                    }
                   
    			}
		},{
			header : 'Fecha de finalización',
    		sortable : true,
			dataIndex : 'stc_dfecha_cierre',
            width : 150,
            xtype : 'datecolumn',
            	//format : 'D d-m-Y G:i:s',
                renderer : function(value, object, record) {
                    
                    var date  = Ext.Date.format(record.get('stc_dfecha_cierre'),'d/m/Y G:i:s') ;
                    
        			if(date != '01/01/1900 0:00:00') {
            		    return date ;
                    } else {
                        return '';
                    }
    			}
		}*/
        /*{
    		xtype : 'gridcolumn',
			header : 'Tecnico',
			sortable : true,
			dataIndex : 'stc_ctecnico_1_cnombre'
		},*/{
            xtype: 'gridcolumn',
            header: 'Localidad',
            sortable: true,
            hidden: true
            /*	dataIndex : 'stc_inumero',*/
        }, {
            xtype: 'gridcolumn',
            header: 'Provincia/Estado',
            sortable: true,
            hidden: true,
            dataIndex: 'pro_cdescripcion'
        }, {
            xtype: 'gridcolumn',
            header: 'Servicio',
            dataIndex: 'tip_cdescripcion',
            sortable: true,
            width: 130,
            /*ACTIVAR OTRA VEZ renderer: function( value, meta, record ) {
                meta.tdAttr = 'data-qtip="' + record.get( 'stc_mobservaciones' ) + '"';
                return value;
            }*/
        }
    ],
    initComponent: function() {
        this.callParent( arguments );
        /*this.onSelectChange = function( selModel, selections ) {
            /*   var button = this.down('button[action=asignar]');
               var movil = this.down('button[action=asignarmovil]');
               
            var onCheck = true;
            for( var key in selections ) {
                var valorEstado = selections[ key ].get( '_stc_estadodescripcion' );
                if( valorEstado == 'Cancelado' || valorEstado == 'Finalizado' ) {
                    onCheck = false;
                }
            }
            var reporte = this.down( 'button[action=reporte]' );
            if( reporte ) {
                reporte.setDisabled( selections.length === 0 );
            }
            var ordenes = this.down( 'button[action=ordenes]' );
            if( ordenes ) {
                ordenes.setDisabled( selections.length === 0 );
            }
        };
        this.getSelectionModel().on( 'selectionchange', this.onSelectChange, this );*/
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    xtype: 'button',
                    text: 'Nuevo servicio tecnico',
                    iconCls: 'icon-date',
                    itemId: 'addSertec',
                    action: 'new',
                    hidden: true
                }, "-",
                {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Pendiente',
                    action: 'pendiente',
                    enableToggle: true,
                    itemId: 'pendiente-btn',
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Asignado',
                    action: 'asignado',
                    enableToggle: true,
                    itemId: 'asignado-btn',
                    hidden: true
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Ejecución',
                    action: 'enejecucion',
                    enableToggle: true,
                    itemId: 'enejecucion-btn',
                    hidden: true
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Finalizado',
                    action: 'finalizado',
                    enableToggle: true,
                    itemId: 'finalizado-btn'
                }, {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'Cancelado',
                    action: 'cancelado',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId: 'cancelado-btn'
                }, {
                    text: 'Filtros',
                    itemId: 'filtros',
                    hidden: true,
                    menu: {
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    /*  {
                                          fieldLabel: 'Por tecnico',
                                          xtype: 'combobox',
                                          itemId: 'tecnicos',
                                          editable : false,
                                          queryMode: 'local',
                                          displayField: 'tec_cnombre',                    
                                          valueField: 'tec_ccodigo',
                                          labelWidth: 100
                                          
                                      },*/
                                    {
                                        xtype: 'numberfield',
                                        fieldLabel: 'Numero',
                                        name: "numero",
                                        itemId: 'numero',
                                        labelWidth: 100
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Desde',
                                        name: "fdesde",
                                        bindToModel: false,
                                        itemId: 'fechadesde',
                                        labelWidth: 100
                                    }, {
                                        xtype: 'datefield',
                                        fieldLabel: 'Hasta',
                                        itemId: 'fechahasta',
                                        bindToModel: false,
                                        name: "fhasta",
                                        labelWidth: 100
                                    }, {
                                        fieldLabel: 'Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'cuenta',
                                        labelWidth: 100
                                    }, {
                                        fieldLabel: 'Dealer-Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'dealercuenta',
                                        labelWidth: 100
                                    }, {
                                        fieldLabel: 'Dealer',
                                        xtype: 'textfield',
                                        itemId: 'dealer',
                                        labelWidth: 100
                                    }, {
                                        fieldLabel: 'Observacion',
                                        xtype: 'textfield',
                                        itemId: 'observacion',
                                        labelWidth: 100
                                    }, {
                                        xtype: 'button',
                                        text: 'Buscar',
                                        iconCls: 'icon-find',
                                        action: 'search'
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'displayfield',
                    text: 'Cuenta',
                    itemId: 'nombrecuenta',
                    hidden: true
                }, {
                    xtype: 'displayfield',
                    itemId: 'idcuenta',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Seleccionar Cuenta',
                    iconCls: 'icon-find',
                    action: 'buscarporcuenta',
                    itemId: 'selcuenta',
                    margin: '0 0 5 0',
                    hidden: true
                }, {
                    text: 'Agrupar',
                    itemId: 'agrupar',
                    hidden: true,
                    menu: {
                        xtype: 'menu',
                        width: 220,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Agrupar por cuenta',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'groupCuenta',
                                        width: 200
                                    }/*,{
                                         xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Agrupar por tecnico',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'groupTecnico',
                                        width:200
                                    }*/
                                ]
                            }
                        ]
                    }
                },/*{
                    xtype: 'button',
                    text:'Asignar tecnico',
                    iconCls: 'icon-user-edit',
                    action: 'asignar',
                    itemId: 'asignar',
                    disabled: true,
                    hidden:true
                },*/{
                    xtype: 'button',
                    text: 'Asignar movil',
                    iconCls: 'icon-car-add',
                    action: 'asignarmovil',
                    itemId: 'asignarmovil',
                    disabled: true,
                    hidden: true
                }
                , "->", {
                    text: 'Agenda',
                    iconCls: 'icon-date',
                    view: 'serteccalendarview',
                    action: 'agenda',
                    closable: true,
                    itemId: 'agenda',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Ordenes',
                    iconCls: 'icon-report',
                    action: 'ordenes',
                    itemId: 'ordenes',
                    disabled: true,
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Reporte',
                    iconCls: 'icon-report',
                    action: 'reporte',
                    itemId: 'reportes',
                    disabled: true,
                    hidden: true
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});
