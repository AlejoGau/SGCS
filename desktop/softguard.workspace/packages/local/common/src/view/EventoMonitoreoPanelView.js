//MIGRADO2024
Ext.define( 'Common.view.EventoMonitoreoPanelView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventomonitoreopanelview',
    ignoreDirty: true,
    title: 'Border Layout',
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            region: 'center',
            itemId: 'center',
            //xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        {
                            xtype: 'eventoformview',
                            autoScroll: false,
                            style: {
                                overflow: false
                            },
                            height: 255,
                            showInfo: false,
                            contadores: true
                        },
                        {
                            xtype: 'tabpanel',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            margins: '5 0 0 0',
                            itemId: 'eventostabstpanel',
                            items: []
                        }
                    ]
                }, {
                    xtype: 'splitter'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'form',
                                    title: 'Observaciones',
                                    ignoreDirty: true,
                                    collapsible: true,
                                    border: true,
                                    flex: 1,
                                    fieldDefaults: {
                                        labelWidth: 80
                                    },
                                    itemId: 'observaciones',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            margin: '0 0 5 0',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    itemId: 'obsfield',
                                                    flex: 1
                                                }, {
                                                    xtype: 'button',
                                                    iconCls: 'icon-disk',
                                                    action: 'agregar-observacion'
                                                }
                                            ]
                                        }, {
                                            fieldLabel: 'Predefinidas',
                                            xtype: 'combobox',
                                            itemId: 'predefinidas',
                                            store: "TablasObservacionesStore",
                                            multiselect: false,
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            enableKeyEvents: true,
                                            editable: true,
                                            queryMode: 'local',
                                            anchor: '100%',
                                            displayField: 'obs_cdescripcion',
                                            valueField: 'obs_mobservacion'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Categorización',
                                            itemId: 'categorizacion',
                                            store: "TablasResolucionesStore",
                                            multiselect: false,
                                            triggerAction: 'all',
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            editable: true,
                                            queryMode: 'local',
                                            anchor: '100%',
                                            displayField: 'res_cdescripcion',
                                            valueField: 'res_ccodigo',
                                            listeners: {
                                                focus: function( combo ) {
                                                },
                                                expand: function( combo ) {
                                                    if( combo.getValue() != '' ){
                                                        this.clearValue();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Resolución',
                                            itemId: 'resolucion',
                                            //triggerAction: 'all',
                                            anchor: '100%',
                                            //enableKeyEvents: true,
                                            store: "TablasCategorizacionStore",
                                            multiselect: false,
                                            forceSelection: true,
                                            editable: false,
                                            queryMode: 'local',
                                            displayField: 'cat_cDescripcion',
                                            valueField: 'cat_cCodigo'
                                        }
                                    ]
                                }, {
                                    xtype: 'panel',
                                    title: 'Mapa',
                                    //header: false,
                                    itemId: 'smartpanics',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    width: '50%',
                                    items: [
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'c3_r2',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'eventotimelinegridview',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            collapsible: true
                        }, {
                            xtype: 'panel',
                            title: 'Notas y Bitácora',
                            ignoreDirty: true,
                            itemId: 'c3_r3',
                            header: false,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    title: 'Bitacora',
                                    xtype: 'bitacoraview',
                                    ignoreDirty: true,
                                    width: '50%',
                                    module: { profile: 3 },
                                    showMaximizer: true,
                                    itemId: 'bitacora',
                                }, {
                                    title: 'Notas',
                                    xtype: 'notaroview',
                                    itemId: 'notas',
                                    ignoreDirty: true,
                                    width: '50%'
                                }
                                , {
                                    xtype: 'dguardpanelview',
                                    title: 'Imágenes',
                                    ignoreDirty: true,
                                    //header: false,
                                    itemId: 'imagePanel',
                                    showMaximizer: true,
                                    closeAction: 'destroy',
                                    hidden: true,
                                    layout: 'fit',
                                    width: '50%'
                                }
                            ]
                        }
                    ]
                }
            ]
        }],
    initComponent: function() {
        this.callParent();
        var record = this.record;
        this.down( 'eventoformview' ).record = this.record;
        this.down( 'dguardpanelview' ).record = this.record;
        this.down( 'eventotimelinegridview' ).record = this.record;
        this.down( 'bitacoraview' ).record = this.record;
        this.down( 'notaroview' ).record = this.record;
        this.down( 'notaroview' ).module = this.module;
        var categorizacion = false;
        var resolucion = false;
        this.onSelectCategorizacionChange = function( selModel, selections ) {
            categorizacion = true;
            this.onOffProcesar();
        };
        this.onSelectResolucionnChange = function( selModel, selections ) {
            resolucion = true;
            this.onOffProcesar();
        };
        this.down( '#categorizacion' ).on( 'change', this.onSelectCategorizacionChange, this );
        this.down( '#resolucion' ).on( 'change', this.onSelectResolucionnChange, this );
        this.onOffProcesar = function() {
            if( categorizacion == true && resolucion == true ) {
                //   this.down('#procesa').setDisabled(false);
                this.down( '#procesa2' ).setDisabled( false );
                this.down( '#procesa-todos2' ).setDisabled( false );
                //this.down('#procesa-todos').setDisabled(false);
            } else {
                //  this.down('#procesa').setDisabled(true);
                this.down( '#procesa2' ).setDisabled( true );
                this.down( '#procesa-todos2' ).setDisabled( true );
                //this.down('#procesa-todos').setDisabled(true);
            }
        }
        var TIEMPOENESPERA = getParametro( 'TIEMPOENESPERA' );
        var maxespera = TIEMPOENESPERA == 999 ? null : TIEMPOENESPERA;
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                { xtype: 'button', text: 'Cerrar', action: 'cerrar', itemId: 'cerrar', iconCls: 'icon-cancel', hidden: true },
                {
                    xtype: 'numberfield',
                    itemId: 'minutosEspera',
                    step: 10,
                    minValue: 10,
                    maxValue: maxespera,
                    value: maxespera ? maxespera : 60,
                    width: 70
                },
                { xtype: 'button', text: 'Espera', action: 'espera', itemId: 'espera', iconCls: 'icon-hourglass' },
                { xtype: 'button', text: 'Pendiente', action: 'pendiente', itemId: 'pendiente', iconCls: 'icon-arrow-turn-left', disabled: false },
                { xtype: 'button', text: 'Procesa', action: 'procesa', itemId: 'procesa2', iconCls: 'icon-accept', disabled: true },
                { xtype: 'button', text: 'Procesa todos', action: 'procesa-todos', itemId: 'procesa-todos2', iconCls: 'icon-accept', disabled: true },
                '-',
                { xtype: 'button', text: 'Llamar', action: 'llamada', iconCls: 'icon-telephone' },
                { xtype: 'button', text: 'Enviar Sms', action: 'enviarsms', itemId: 'enviarsms', iconCls: 'icon-sms', hidden: true },
                { xtype: 'button', text: 'Móvil', action: 'mapguard', iconCls: 'icon-car' },
                { xtype: 'button', text: 'Reporte autoridad', itemId: 'btnautoridad', action: 'autoridad', iconCls: 'icon-reporte-prioridad' },
                { xtype: 'button', text: 'Servicio técnico', itemId: 'btnservtec', action: 'servtec', iconCls: 'icon-servtec-16' },
                { xtype: 'button', text: 'Poner en prueba', itemId: 'btnestado', action: 'estado', iconCls: 'icon-clock-red' },
                {
                    xtype: 'button',
                    iconCls: 'icon-sound',
                    itemId: 'playsound',
                    hidden: true
                }, {
                    xtype: 'button',
                    iconCls: 'icon-sound-mute',
                    itemId: 'stopsound',
                    hidden: true
                }, {
                    xtype: 'button',
                    iconCls: 'icon-sound',
                    itemId: 'moresound',
                    text: 'Reproducir Audio',
                    hidden: true
                }, {
                    xtype: 'button',
                    iconCls: 'icon-clock-red',
                    itemId: 'posponercierre',
                    text: 'Posponer Cierre'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
        var view = this;
        var tabpanelEventosTabs = this.down( '#eventostabstpanel' );
        var cuentaModel = 'Common.model.CuentaSearchModel';
        var title, idMadre;
        if( view.record.get( 'cue_nparticion' ) == 0 ) {
            idMadre = view.record.get( 'cue_iid' );
        } else {
            idMadre = view.record.get( 'cue_nparticion' );
        }
        var store = Ext.create( 'Ext.data.Store', {
            model: cuentaModel,
            filters: [
                {
                    property: 'cue_nparticion',
                    value: idMadre
                }
            ]
        })
        store.load( {
            callback: function( records ) {
                var list = [ idMadre ];
                Ext.Array.each( records, function( record ) {
                    list.push( record.get( 'cue_iid' ) );
                });
                var listString = list.join( "," );
                if( records.length != 0 ) {
                    var newTab = Ext.widget( 'eventostrgridview', {
                        //record: view.record,
                        module: view.module,
                        title: getLocale( "Pendientes del panel" ),
                        eventTarget: 'tab',
                        eventEditor: 'eventomonitoreoview',
                        //showEstadosFilter: true,
                        estados: 0,
                        Cuentas: listString
                    });
                    tabpanelEventosTabs.add( newTab );
                }
            }
        });
        this.onOffProcesar();
    }
});