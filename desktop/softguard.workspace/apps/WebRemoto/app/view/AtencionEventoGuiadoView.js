/*

                                                                                                                                                           
  ,---.    ,--.                       ,--.               ,------.                          ,--.                 ,----.           ,--.           ,--.        
 /  O  \ ,-'  '-. ,---. ,--,--,  ,---.`--' ,---. ,--,--, |  .---',--.  ,--.,---. ,--,--, ,-'  '-. ,---.  ,---. '  .-./   ,--.,--.`--' ,--,--. ,-|  | ,---.  
|  .-.  |'-.  .-'| .-. :|      \| .--',--.| .-. ||      \|  `--,  \  `'  /| .-. :|      \'-.  .-'| .-. |(  .-' |  | .---.|  ||  |,--.' ,-.  |' .-. || .-. | 
|  | |  |  |  |  \   --.|  ||  |\ `--.|  |' '-' '|  ||  ||  `---.  \    / \   --.|  ||  |  |  |  ' '-' '.-'  `)'  '--'  |'  ''  '|  |\ '-'  |\ `-' |' '-' ' 
`--' `--'  `--'   `----'`--''--' `---'`--' `---' `--''--'`------'   `--'   `----'`--''--'  `--'   `---' `----'  `------'  `----' `--' `--`--' `---'  `---'  



*/

Ext.define( 'WebRemoto.view.AtencionEventoGuiadoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.atencioneventoguiadoview',
    ignoreDirty: true,
    title: 'Border Layout',
    layout: 'border',
    autoDestroy: true,
    events: {
        refresh: true
    },
    items: [ {
        xtype: 'panel',
        region: 'center',
        itemId: 'center',
        //xtype: 'panel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            /*Ext.create('Ext.ux.IFrame', {
                itemId: 'sound',
                height: 0,
                width: 0,
                hidden: true,
                border : false
            }),*/
            {
                xtype: 'uxiframe',
                itemId: 'sound',
                height: 0,
                width: 0,
                hidden: true,
                border: false,
                width: '100%'
            },
            {
                xtype: 'container',
                scrollable: true,
                scroll: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'eventoformview',
                        height: 270,
                        showInfo: false,
                        contadores: true,
                        autoLaunchVideoEnabled: true
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

                                xtype: 'tabpanel',
                                scrollable: true,
                                scroll: true,                                
                                flex: 1,
                                /*layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },*/
                                margins: '0 0 0 0',
                                itemId: 'eventostabstpanel',
                                items: [
                                    {
                                        title: 'Bitacora',
                                        xtype: 'bitacoraview',
                                        ignoreDirty: true,
                                        module: { profile: 3 },
                                        showMaximizer: true,
                                        menu: {
                                            xtype: 'button',
                                            text: 'a'
                                        },
                                        itemId: 'bitacora',
                                    }, {
                                        title: 'Notas',
                                        xtype: 'notaroview',
                                        itemId: 'notas',
                                        ignoreDirty: true
                                    }, {
                                        xtype: 'eventotimelinefullgridview',
                                        title: 'Timeline',
                                        itemId: 'c3_r2',
                                        flex: 1
                                    },

                                    /** BC 392930355 : Se agrega observaciones a los eventos VC y SP */
                                    {
                                        title: 'Observaciones',
                                        xtype: 'eventobservacionesgridview',
                                        itemId: 'observacionesTab',
                                        flex: 1,
                                        ignoreDirty: true
                                    }

                                ]
                            }
                        ]
                    }
                ]
            }, {
                xtype: 'splitter'
            },
            {
                xtype: 'container',
                itemId: 'rightAtencionViewContainer',
                hidden: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1,  // 02/01/2019 BC 374402728 - JUAN : Agrego Flex 1 al contenedor de las imagenes.
                items: [
                    {
                        xtype: 'panel',
                        title: '',
                        //header: false,
                        itemId: 'smartpanics',
                        hidden: true,
                        title: 'Mapa',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [
                        ]
                    }, {
                        xtype: 'splitter',
                        hidden: true,
                        collapsible: false
                    },
                    {
                        xtype: 'displayfield',
                        value: 'Atencion',
                        itemId: 'avisoestadocuenta',
                        cls: 'avisoestadocuenta blink',
                        renderer: function( value ) {
                            return '<img src="/resources/global/images/icons/exclamation.png" /> ' + value
                        },
                        height: 50,
                        hidden: true
                    },

                    {
                        xtype: 'container',
                        border: 1,
                        itemId: 'obsformImgPanelContainer',
                        hidden: true,
                        style: {
                            borderColor: 'black',
                            borderStyle: 'solid'
                        },
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        height: 300,
                        items: [
                            {
                                xtype: 'panel',
                                title: 'PROBANDO PANEL',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'displayfield',
                                        text: 'PROBANDO'
                                    }
                                ]
                            }, {
                                xtype: 'eventobservacionesformview',
                                itemId: 'observaciones',
                                flex: 1
                            }, {
                                xtype: 'tabpanel',
                                width: '50%',
                                /*VOLVER ATRÁS
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                */
                                margins: '0 0 0 0',
                                flex: 1,  // 02/01/2019 BC 374402728 - JUAN : Agrego Flex 1 al contenedor de las imagenes.
                                itemId: 'imagePanel',
                                hidden: true,
                                items: [
                                    {
                                        xtype: 'panel',
                                        itemId: 'containerImagenIframe',
                                        title: 'Imágenes',
                                        autoScroll: false,
                                        autoHeight: true,
                                        //layout:'fit',  // 02/01/2019 BC 374402728 - JUAN : Agrego Flex 1 al contenedor de las imagenes - Quito el Layout Fit
                                        scroll: false,
                                        items: [
                                            {
                                                xtype: 'uxiframe',
                                                itemId: 'imagenesSlider',
                                                border: false,
                                                autoHeight: true,
                                                scroll: false
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'speventovideoview',
                                        title: 'Video',
                                        itemId: 'videosmartpanic',
                                        hidden: false
                                    }
                                ]
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

        if( this.down( 'dguardpanelview' ) ) {
            this.down( 'dguardpanelview' ).record = this.record;
        }
        if( this.down( 'eventimagesgridview' ) ) {
            this.down( 'eventimagesgridview' ).record = this.record;
        }
        this.down( 'eventotimelinefullgridview' ).record = this.record;
        this.down( 'bitacoraview' ).record = this.record;
        this.down( 'notaroview' ).record = this.record;
        this.down( 'notaroview' ).module = this.module;
        this.down( 'eventobservacionesformview' ).record = this.record;
        this.down( 'eventobservacionesformview' ).module = this.module;
        this.down( 'eventobservacionesformview' ).caller = this;
        this.down( 'eventobservacionesformview' ).procesar = true;

        if( this.down( 'speventovideoview' ) ) {
            this.down( 'speventovideoview' ).record = this.record;
        }

        /**
         * Capturo el evento (selectionChange) en la view de observacion si cambio
         * En la captura ya se encuentra los valores para procesar (categorizacion y resolucion)
        */
        this.onOffProcesar = function( categorizacion, resolucion ) {
            /*if(resolucion != '') {            
                this.down('#procesa2').setDisabled(false);
                if (this.down('#procesa-todos2')){
                    this.down('#procesa-todos2').setDisabled(false);
                }
                
            } else {
                this.down('#procesa2').setDisabled(true);
                if (this.down('#procesa-todos2')){
                    this.down('#procesa-todos2').setDisabled(true);
                }
                
            }*/

            var escondeBotones = false;

            var resolucionRequerida = getParametro( 'RESOLUCIONOBLIGATORIA' )
            if( resolucionRequerida == 1 || resolucionRequerida == 2 ) {
                if( Ext.util.Format.trim( categorizacion ) == '' ) {
                    escondeBotones = true;
                }
            }


            var categorizacionRequerida = getParametro( 'CATEGORIZACIONOBLIGATORIA' )
            if( categorizacionRequerida == 1 || categorizacionRequerida == 2 ) {
                if( Ext.util.Format.trim( resolucion ) == '' ) {
                    escondeBotones = true;
                }
            }

            /*NAULADO POR MONITOREO GUIADO

            if( !escondeBotones ) {
                this.down( '#procesa2' ).setDisabled( false );
                // this.down('#procesarlotes').setDisabled(false);
            } else {
                this.down( '#procesa2' ).setDisabled( true );
                //this.down('#procesarlotes').setDisabled(true);
            }*/
        }


        var controller = this;
        this.down( 'eventobservacionesformview' ).on( 'selectionChange', function( e ) {

            var categorizacion = controller.record.get( 'rec_ccategorizacion' );
            var resolucion = controller.record.get( 'rec_idresolucion' );

            //NO SE NECESITA EN GUIADO controller.onOffProcesar( categorizacion, resolucion );
        })


        /** BC 392930355 : Se agrega observaciones a los eventos VC y SP */
        if( this.down( 'eventobservacionesgridview' ) ) {
            this.down( 'eventobservacionesgridview' ).rec_iid = this.record.get( 'rec_iid' );
            this.down( 'eventobservacionesgridview' ).record = this.record
            this.down( 'eventobservacionesgridview' ).module = this.module;
            this.down( 'eventobservacionesgridview' ).caller = this;
        }

        var toolbarImagenes = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    type: 'button',
                    itemId: 'refresh',
                    iconCls: 'x-tbar-loading',
                    text: '',
                    handler: function( btn ) {
                        var view = btn.up( 'atencioneventoview' )
                        var panelView = btn.up( '#containerImagenIframe' )
                        panelView.down( '#imagenesSlider' ).destroy()

                        panelView.add( Ext.widget( 'uxiframe', {
                            itemId: 'imagenesSlider',
                            border: false,
                            autoHeight: true
                        }) )
                        panelView.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + view.record.get( 'rec_iid' ) + '&cue_iid=' + view.record.get( 'cue_iid' ) + '&thum=false' )
                    }
                }, '-', {
                    type: 'button',
                    iconCls: 'icon-arrow-rotate-anticlockwise',
                    handler: function( btn ) {

                        var iframe = btn.up( 'atencioneventoview' ).down( '#imagenesSlider' );
                        var ele = iframe.getEl();

                        document.getElementById( 'iframe-' + ele.id ).contentWindow.rotateRight();

                    }
                }, {
                    type: 'button',
                    iconCls: 'icon-arrow-rotate-clockwise',
                    handler: function( btn ) {

                        var iframe = btn.up( 'atencioneventoview' ).down( '#imagenesSlider' );
                        var ele = iframe.getEl();

                        document.getElementById( 'iframe-' + ele.id ).contentWindow.rotateLeft();

                    }
                }, {
                    type: 'button',
                    text: 'Ver imagenes del evento',
                    itemId: 'imgeventosposteriores',
                    _state: 0
                }, '->', {
                    type: 'button',
                    itemId: 'maximizer',
                    iconCls: 'icon-arrow-out',
                    text: '',
                    handler: function( btn ) {
                        var view = btn.up( 'atencioneventoview' );
                        var tabpanel = btn.up( 'tabpanel' );
                        var record = view.record;

                        var win = Ext.create( 'Ext.Window', {
                            layout: 'fit',
                            title: getLocale( 'Imágenes' ),
                            closeAction: 'hide',
                            width: 750,
                            translate: false,
                            height: 400,
                            border: true,
                            modal: false,
                            view: view,
                            items: [
                                {
                                    xtype: 'uxiframe',
                                    title: '',
                                    itemId: 'imagenesSlider',
                                    border: false
                                }
                            ],
                            tbar: [ {
                                type: 'button',
                                iconCls: 'icon-arrow-rotate-anticlockwise',
                                handler: function( btn ) {
                                    var iframe = btn.up( 'window' ).down( '#imagenesSlider' );
                                    var ele = iframe.getEl();
                                    document.getElementById( 'iframe-' + ele.id ).contentWindow.rotateRight();
                                }
                            }, {
                                    type: 'button',
                                    iconCls: 'icon-arrow-rotate-clockwise',
                                    handler: function( btn ) {
                                        var iframe = btn.up( 'window' ).down( '#imagenesSlider' );
                                        var ele = iframe.getEl();
                                        document.getElementById( 'iframe-' + ele.id ).contentWindow.rotateLeft();
                                    }
                                }]
                        });

                        win.show();
                        //win.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + record.get( 'rec_iid' ) + '&cue_iid=' + record.get( 'cue_iid' ) + '&thum=true' )
                        var target = win.down('#imagenesSlider');
                        target.load({
                            src: '/handler/EventImagenGalleryHTML?rec_iid=' + record.get( 'rec_iid' ) + '&cue_iid=' + record.get( 'cue_iid' ) + '&thum=true'
                        });
                    }
                }
            ]// cierro items
        });

        if( this.down( '#containerImagenIframe' ) ) {
            this.down( '#containerImagenIframe' ).addDocked( toolbarImagenes );
        }

        var TIEMPOENESPERA = getParametro( 'TIEMPOENESPERA', true, true );
        var TIEMPOENESPERAObj = TIEMPOENESPERA.get( '_par_cvalor' );

        var maxespera = 100;
        if( TIEMPOENESPERAObj && TIEMPOENESPERAObj.max ) {
            maxespera = TIEMPOENESPERAObj.max == 999 ? null : TIEMPOENESPERAObj.max;
        } else {
            maxespera = TIEMPOENESPERA.get( 'par_ivalor' )
        }


        var minespera = 2;
        if( TIEMPOENESPERAObj && TIEMPOENESPERAObj.min ) {
            minespera = TIEMPOENESPERAObj.min == 999 ? null : TIEMPOENESPERAObj.min;
        }


        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                { xtype: 'button', text: 'Cerrar', action: 'cerrar', itemId: 'cerrar', iconCls: 'icon-cancel', hidden: true },
                {
                    xtype: 'numberfield',
                    itemId: 'minutosEspera',
                    step: 5,
                    minValue: minespera,
                    maxValue: maxespera,
                    value: 10,
                    width: 70
                },
                { xtype: 'button', text: 'Espera', action: 'espera', itemId: 'espera', iconCls: 'icon-hourglass' },
                { xtype: 'button', text: 'Espera Ilimitado', action: 'esperaIlimitado', itemId: 'esperaIlimitado', iconCls: 'icon-hourglass', hidden: true },
                { xtype: 'button', text: 'Pendiente', action: 'pendiente', itemId: 'pendiente', iconCls: 'icon-arrow-turn-left', disabled: false },
                { xtype: 'button', text: 'Supervision', action: 'supervision', itemId: 'supervision', iconCls: 'icon-eye', disabled: false, hidden: true },
                { xtype: 'button', text: 'Procesa', action: 'procesa', itemId: 'procesa2', iconCls: 'icon-accept', disabled: true },
                /* { xtype: 'button', text: 'Procesa todos', action: 'procesa-todos', itemId: 'procesa-todos2', iconCls: 'icon-accept', disabled: false },*/
                {
                    iconCls: 'icon-accept',
                    text: 'Proceso multiple',
                    action: 'procesarmultiple',
                    itemId: 'procesarmultiple',
                    disabled: false
                },
                '-',
                { xtype: 'button', text: 'Llamar', action: 'llamada', iconCls: 'icon-telephone', itemId: 'llamada' },
                {
                    text: 'Notificaciones',
                    iconCls: 'icon-phone-sound',
                    menu: {
                        xtype: 'menu',
                        //width: 400,
                        items: [
                            {
                                iconCls: 'icon-phone-sound',
                                itemId: 'enviarpush',
                                text: 'Enviar push',
                                flex: 1
                            },
                            {
                                text: 'Enviar Sms',
                                action: 'enviarsms',
                                itemId: 'enviarsms',
                                iconCls: 'icon-sms',
                                hidden: true,
                                flex: 1
                            },
                            {
                                text: 'Enviar Email',
                                action: 'enviaremail',
                                itemId: 'enviaremail',
                                iconCls: 'icon-email',
                                flex: 1
                            },
                            {
                                text: 'Enviar WhatsApp',
                                action: 'enviarwhatsapp',
                                itemId: 'enviarwhatsapp',
                                iconCls: 'icon-whatsapp',
                                flex: 1
                            },
                            {
                                text: 'Iniciar chat',
                                action: 'spchat',
                                itemId: 'spchat',
                                iconCls: 'icon-comments',
                                flex: 1
                            }
                        ]
                    }
                },
                { xtype: 'button', text: 'Móvil', action: 'mapguard', iconCls: 'icon-car', itemId: 'enviarmovil' },
                { xtype: 'button', text: 'Reporte autoridad', itemId: 'btnautoridad', action: 'autoridad', iconCls: 'icon-reporte-prioridad', hidden: false },
                { xtype: 'button', text: 'Servicio técnico', itemId: 'btnservtec', action: 'servtec', iconCls: 'icon-servtec-16', hidden: true },
                { xtype: 'button', text: 'Poner en prueba', itemId: 'btnestado', action: 'estado', iconCls: 'icon-clock-red' },
                { xtype: 'button', text: 'Comandos', itemId: 'comandos', action: 'onComandosClick', iconCls: 'icon-ipod-cast' },
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
        toolbar.hide();

        var view = this;
        var tabpanelEventosTabs = this.down( '#eventostabstpanel' );

        var cuentaModel = 'WebRemoto.model.CuentaSearchModel';
        var title, idMadre;

        if( view.record.get( 'cue_nparticion' ) == 0 ) {
            idMadre = view.record.get( 'cue_iid' );
        } else {
            idMadre = view.record.get( 'cue_nparticion' );
        }

        // busca las particiones de la cuenta para poder mostrar los eventos del panel
        var store = Ext.create( 'Ext.data.Store', {
            model: cuentaModel,
            remoteFilter: true,
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
                        short: 1,
                        translate: false,
                        title: getLocale( "Pendientes del panel" ),
                        eventTarget: 'tab',
                        eventEditor: 'eventomonitoreoview',
                        showEstadosFilter: true,
                        estados: [ 0, 1, 2, 3, 4, 5, 6, 7, 9 ],
                        // estadosPreselected: [0],
                        Cuentas: listString,
                        targetTab: view.eventTabPanel,
                        caller: view
                    });
                    tabpanelEventosTabs.add( newTab );
                }
            }
        });
    }
});
