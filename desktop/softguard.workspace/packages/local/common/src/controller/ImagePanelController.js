//MIGRADO2024
Ext.define( 'Common.controller.ImagePanelController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'EventosTiemLineModel' ],
    views: [ 'IframeConBotoneraView', 'DguardPanelView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            'dguardpanelview': {
                afterrender: this.initView,
                close: this.onClose,
                //    hide: this.onClose,
                destroy: this.onClose,
                activate: this.onActivate,
                //  show: this.onActivate
            },
            'dguardpanelview #imgprev0': {
                click: this.onImgPrev0Click
            },
            'dguardpanelview #imgprevVivo': {
                click: this.onImgPrevVivoClick
            },
            'dguardpanelview #imgprev1': {
                click: this.onImgPrev1Click
            },
            'dguardpanelview #imgprev5': {
                click: this.onImgPrev5Click
            },
            'dguardpanelview #imgprev10': {
                click: this.onImgPrev10Click
            },
            'dguardpanelview #dahuaenvivo': {
                click: this.onImgDahuaEnVivoClick
            },
            'dguardpanelview #dahuahoraevento': {
                click: this.onImgDahuaHoraEventoClick
            },
            'dguardpanelview #webmenvivo': {
                click: this.onImgWebmEnVivoClick
            },
            'dguardpanelview #webmevento': {
                click: this.onImgWebmEventoClick
            }
        });
    }, // cierro init
    initView: function(view ) {
        var record = view.record;
        var cue_iid = record.get( 'cue_iid' );
        var controller = this;
        var seconds = view.seconds ? view.seconds : 1;
        var storeLlave = KeyModulesStore;
        view.activated = true;
        if( record.get( 'rxt_nSPIP' ) == 1 || record.get( 'rxt_nSPSMS' ) == 1 || record.get( 'tip_nTipo' ) == 5 ) {
            this.callVideo( seconds, view );
        } else {
            if( storeLlave.isModuleAvailable( 'Video' ) ) {
                this.callVideo( seconds, view );
            }
        }
    },
        
    addDguardTool: function(view ) {
        var controller = this;
        if( view.showMaximizer != false && view.showMaximizer != undefined ) {
            if( view.tools.length <= 0 ) {
                var tools = [ {
                    type: 'maximize',
                    itemId: 'maximizer',
                    handler: function( event, img, view, tool ) {
                        controller.DguardToolAction( event, img, view, tool )
                    }
                }]
                if( view.videolink.cuv_cLinkDSS && view.videolink.cuv_cLinkDSS != '' ) {
                    cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cuv_cLinkDSS );
                }
                if( view.videolink.cvl_cLinkDSS && view.videolink.cvl_cLinkDSS != '' ) {
                    cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cvl_cLinkDSS );
                }
                if( cuv_cLinkDSS && cuv_cLinkDSS.formdata && cuv_cLinkDSS.formdata.gridConfig ) {
                    tools.unshift( {
                        type: 'gridvideo',
                        itemId: 'grid',
                        handler: function( event, img, view, tool ) {
                            controller.DguardToolAction( event, img, view, tool, 'grid' )
                        }
                    })
                }
                view.addTool( tools );
            }
        }
    },
        
    DguardToolAction: function (event, img, view, tool, showActive ) {
        var view = tool.up( 'dguardpanelview' );
        var tabpanel = tool.up( 'tabpanel' );
        var record = view.record;
        var cuv_cLinkDSS;
        if( view.videolink.cuv_cLinkDSS && view.videolink.cuv_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cuv_cLinkDSS );
        }
        if( view.videolink.cvl_cLinkDSS && view.videolink.cvl_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cvl_cLinkDSS );
        }
        var videotab = Ext.widget( 'tabpanel', {
            items: [
                {
                    xtype: 'dguardpanelview',
                    layout: 'fit',
                    title: 'Cámara principal',
                    showMaximizer: false,
                    record: record
                }
            ]
        });
        if( cuv_cLinkDSS && cuv_cLinkDSS.formdata && cuv_cLinkDSS.formdata.gridConfig != '' ) {
            // agrego el tab
            var grilla = Ext.widget( 'panel', {
                layout: 'column',
                title: 'Grilla',
                showMaximizer: false,
                autoScroll: true,
                items: [
                ]
            });
            var config = Ext.JSON.decode( cuv_cLinkDSS.formdata.gridConfig )
            Ext.Array.each( config, function( val ) {
                grilla.add( Ext.create( 'Ext.ux.IFrame', {
                    title: "",
                    border: false,
                    src: '/handler/dguardViewer?link=' + val._uri + ':' + val._port + '&user=' + val._user + '&pass=' + val._password + '&camara=' + val._camara + '',
                    closable: false,
                    autoDestroy: true
                }) )
            })
            videotab.add( grilla );
        }
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: getLocale( 'Imágenes y video' ) + ' (' + record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ) + ')',
            closeAction: 'destroy',
            width: 680,
            height: 550,
            border: true,
            translate: false,
            modal: false,
            view: view,
            listeners: {
                close: function() {
                    view.fireEvent( 'windowclose', view );
                }
            },
            items: videotab
        });
        win.show();
        if( showActive == 'grid' ) {
            videotab.setActiveTab( grilla )
        }
        view.fireEvent( 'aftermaximize', view );
    },
    addHIKTool: function(view ) {
        var controller = this
        if( view.showMaximizer != false && view.showMaximizer != undefined ) {
            if( view.tools.length <= 0 ) {
                var tools = [ {
                    type: 'maximize',
                    itemId: 'maximizer',
                    handler: function( event, img, view, tool ) {
                        controller.HIKToolAction( event, img, view, tool )
                    }
                }]
                if( view.videolink.cuv_cLinkDSS && view.videolink.cuv_cLinkDSS != '' ) {
                    cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cuv_cLinkDSS );
                }
                if( view.videolink.cvl_cLinkDSS && view.videolink.cvl_cLinkDSS != '' ) {
                    cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cvl_cLinkDSS );
                }
                if( cuv_cLinkDSS && cuv_cLinkDSS.formdata && cuv_cLinkDSS.formdata.gridConfig ) {
                    tools.unshift( {
                        type: 'gridvideo',
                        itemId: 'grid',
                        handler: function( event, img, view, tool ) {
                            controller.HIKToolAction( event, img, view, tool, 'grid' )
                        }
                    })
                }
                view.addTool( tools );
            }
        }
    },
    HIKToolAction: function (event, img, view, tool, showActive ) {
        var view = tool.up( 'dguardpanelview' );
        var tabpanel = tool.up( 'tabpanel' );
        var record = view.record;
        var cuv_cLinkDSS;
        if( view.videolink.cuv_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cuv_cLinkDSS );
        }
        if( view.videolink.cvl_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( view.videolink.cvl_cLinkDSS );
        }
        var url;
        var pass = cuv_cLinkDSS.formdata._password;
        var user = cuv_cLinkDSS.formdata._user;
        var uri = cuv_cLinkDSS.formdata._uri;
        var port = cuv_cLinkDSS.formdata._port;
        var camara = cuv_cLinkDSS.formdata._camara;
        var fecha = Ext.Date.format( new Date( view.record.get( '_FechaHora' ) ), 'Ymd\\tHis\\z' );
        var fechaHastad = Ext.Date.add( new Date( view.record.get( '_FechaHora' ) ), Ext.Date.MINUTE, 2 );
        var fechaHasta = Ext.Date.format( fechaHastad, 'Ymd\\tHis\\z' );
        url = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/Streaming/tracks/' + camara + '01?starttime=' + fecha + '&endtime=' + fechaHasta
        url2 = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/MPEG-4/ch' + camara + '/sub/av_stream'
        var d = new Date();
        var n = d.getTime();
        var src = '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, "%26" );
        var src2 = '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url2.replace( /&/g, "%26" );
        var videotab = Ext.widget( 'tabpanel', {
            items: [
                {
                    xtype: 'container',
                    title: 'Hora de evento',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            style: {
                                textAlign: 'center'
                            },
                            value: 'Hora del evento ' + Ext.Date.format( new Date( view.record.get( '_FechaHora' ) ), 'd/m/Y H:i:s' )
                        },
                        Ext.create( 'Ext.ux.IFrame', {
                            title: "",
                            border: false,
                            src: src,
                            closable: false,
                            autoDestroy: true,
                            flex: 1
                        })
                    ]
                },
                {
                    xtype: 'container',
                    title: 'En vivo',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            style: {
                                textAlign: 'center'
                            },
                            value: 'En vivo'
                        },
                        Ext.create( 'Ext.ux.IFrame', {
                            title: "",
                            border: false,
                            src: src2,
                            closable: false,
                            autoDestroy: true,
                            flex: 1
                        })
                    ]
                }
            ]
        });
        if( cuv_cLinkDSS && cuv_cLinkDSS.formdata && cuv_cLinkDSS.formdata.gridConfig ) {
            // agrego el tab
            var grilla = Ext.widget( 'panel', {
                layout: 'column',
                title: 'Grilla',
                showMaximizer: false,
                autoScroll: true,
                items: []
            });
            var d = new Date();
            var n = d.getTime();
            var config = Ext.JSON.decode( cuv_cLinkDSS.formdata.gridConfig )
            Ext.Array.each( config, function( val ) {
                url = 'rtsp://' + val._user + ':' + val._password + '@' + val._uri + ':' + val._port + '/MPEG-4/ch' + val._camara + '/sub/av_stream'
                grilla.add( Ext.create( 'Ext.ux.IFrame', {
                    title: "",
                    border: false,
                    width: 320,
                    height: 240,
                    // src : '/handler/dguardViewer?link='+val._uri+':'+val._port+'&user='+val._user+'&pass='+val._password+'&camara='+val._camara+'',
                    src: '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, '%26' ),
                    closable: false,
                    autoDestroy: true
                }) )
            })
            videotab.add( grilla );
        }
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: getLocale( 'Imágenes y video' ) + ' (' + record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ) + ')',
            closeAction: 'destroy',
            width: 680,
            height: 550,
            translate: false,
            border: true,
            modal: false,
            view: view,
            listeners: {
                close: function() {
                    view.fireEvent( 'windowclose', view );
                }
            },
            items: videotab
        });
        win.show();
        if( showActive == 'grid' ) {
            videotab.setActiveTab( grilla )
        }
        view.fireEvent( 'aftermaximize', view );
    },
        
        
    addGRVTool: function(tabpanel, rec, recordEvento ) {
        var controller = this
        controller.GRVAction( tabpanel, rec, recordEvento )//event,img,view,tool)
    },
        
    GRVAction: function (tabpanel, rec, recordEvento ) {
        var cuv_cLinkDSS;
        var url;
        var fecha = Ext.Date.format( new Date( recordEvento.get( '_FechaHora' ) ), 'Ymd\\tHis\\z' );
        var fechaHastad = Ext.Date.add( new Date( recordEvento.get( '_FechaHora' ) ), Ext.Date.MINUTE, 2 );
        var fechaHasta = Ext.Date.format( fechaHastad, 'Ymd\\tHis\\z' );
        if( rec.cuv_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( rec.cuv_cLinkDSS );
        }
        if( rec.cvl_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( rec.cvl_cLinkDSS );
        }
        url2 = 'rtsp://' + cuv_cLinkDSS.formdata._rtsplink
        var d = new Date();
        var n = d.getTime();
        var src2 = '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url2.replace( /&/g, "%26" );
        if( cuv_cLinkDSS && cuv_cLinkDSS.formdata && cuv_cLinkDSS.formdata.gridConfig ) {
            // agrego el tab
            var grilla = Ext.widget( 'panel', {
                layout: 'column',
                title: 'Grilla',
                showMaximizer: false,
                autoScroll: true,
                items: []
            });
            var d = new Date();
            var n = d.getTime();
            var config = Ext.JSON.decode( cuv_cLinkDSS.formdata.gridConfig )
            Ext.Array.each( config, function( val ) {
                url = 'rtsp://' + val._rtsplink
                grilla.add( Ext.create( 'Ext.ux.IFrame', {
                    title: "",
                    border: false,
                    columnWidth: 0.499,
                    //width: 320,
                    //height: 240,                      
                    src: '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, '%26' ),
                    closable: false,
                    autoDestroy: true
                }) )
            })
            tabpanel.add( grilla );
        }
    },
    addWebmTool: function(view, tabpanel, rec, record, src ) {
        var cuv_cLinkDSS;
        if( !view.tools ) { view.tools = [] }
        view.addTool( {
            type: 'maximize',
            itemId: 'maximizer',
            handler: function( event, img, view, tool ) {
                var view = tool.up( 'dguardpanelview' );
                var tabpanel = tool.up( 'tabpanel' );
                var record = view.record;
                var win = Ext.create( 'Ext.Window', {
                    layout: 'fit',
                    title: getLocale( 'Video' ) + ' (' + record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ) + ')',
                    closeAction: 'destroy',
                    width: 680,
                    height: 550,
                    translate: false,
                    border: true,
                    modal: false,
                    view: view,
                    layout: 'fit',
                    listeners: {
                        close: function() {
                            view.fireEvent( 'windowclose', view );
                        }
                    },
                    items: [
                        {
                            xtype: 'dguardpanelview',
                            header: false,
                            record: record,
                            layout: 'fit',
                            showMaximizer: false
                        }
                    ]
                });
                win.show();
                view.fireEvent( 'aftermaximize', view );
            }
        });
        if( rec.cuv_cLinkDSS && rec.cuv_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( rec.cuv_cLinkDSS );
        }
        if( rec.cvl_cLinkDSS && rec.cvl_cLinkDSS != '' ) {
            cuv_cLinkDSS = Ext.JSON.decode( rec.cvl_cLinkDSS );
        }
        if( cuv_cLinkDSS && cuv_cLinkDSS.formdata && cuv_cLinkDSS.formdata.gridConfig ) {
            if( !tabpanel.down( '#grilla' ) ) {
                var d = new Date();
                var n = d.getTime();
                var config = Ext.JSON.decode( cuv_cLinkDSS.formdata.gridConfig )
                // me fijo si el array tiene configuraciones
                if( config.length > 0 ) {
                    // agrego el tab
                    var grilla = Ext.widget( 'panel', {
                        layout: 'column',
                        title: 'Grilla',
                        showMaximizer: false,
                        autoScroll: true,
                        itemId: 'grilla',
                        items: [
                        ]
                    });
                    Ext.Array.each( config, function( val ) {
                        url = 'rtsp://' + val._rtsplink
                        grilla.add( Ext.create( 'Ext.ux.IFrame', {
                            title: "",
                            border: false,
                            columnWidth: 0.499,
                            //width: 320,
                            //height: 240,                      
                            src: '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, '%26' ),
                            closable: false,
                            autoDestroy: true
                        }) )
                    })
                    tabpanel.add( grilla );
                }
            }
        }
    },
    addVideoTimeline: function(view, record, recordVideo ) {
        var controller = this;
        var obs = '%Visualizacion de% <b>' + recordVideo.tvi_cnombre + '</b>';
        if( recordVideo.cvl_czona ) {
            obs += ' %en zona% <b>' + record.get( '_zon_cdescripcion' ) + '</b>';
        }
        try{    
            controller.getEventosTiemLineModelModel().create( {
                Id: 0,
                etl_icuenta: record.get( 'cue_iid' ),
                etl_tfechahora: new Date(),
                etl_caccion: '%Video%',
                etl_cobservacion: obs,
                etl_cowner: '%MWR%',
                etl_ioperador: view.up( 'viewport' ).operadorId,
                etl_irecid: record.get( 'rec_iid' )
            }).save();
        }catch(e){ 
            console.log('error al guardar el timeline '+e);
        }
        
    },
    callVideo: function(seconds, view ) {
        var controller = this;
        var size = view.size;
        var record = view.record;
        var rec_iid = record.get( 'rec_iid' );
        var currentDate = record.get( 'rec_isoFechaHora' );
        var prevDate = Ext.Date.add( currentDate, Ext.Date.SECOND, seconds );
        var tabpanel = view.down( 'tabpanel' );
        var tablaDatos = record.get( 'tablaDatos' );
        var params = { iRecID: rec_iid };
        
        if( tablaDatos ) {
            params = { iRecID: rec_iid, tabla: tablaDatos };
        }
        Ext.Ajax.request( {
            //url: '/Rest/search/p_rximg',
            //params: { rxi_irecid: rec_iid},
            url: '/Rest/search/SGSP_VideoLinkParser', //se cambio a pedido de rodrigo 22/08/2018
            //url: 'rest/search/p_grabacion_img'
            params: params,
            // params: { filter: { property:'gri_iidrecepcion ', value: rec_iid}},
            method: 'GET',
            scope: this,
            success: function( response ) {
                var parametros = Ext.JSON.decode( response.responseText );
                var i = 1;
                Ext.Array.each( parametros.rows, function( rec ) {
                    if( rec ) {
                        view.videolink = rec;
                        var recImg = rec;
                        var cLinkDSS = rec.cvl_cLinkDSS ? rec.cvl_cLinkDSS : rec.cuv_cLinkDSS
                    }
                    var objConfig;
                    if( cLinkDSS ) {
                        objConfig = Ext.JSON.decode( cLinkDSS );
                    }
                    var cue_clinea
                    // puede tener launcher y tener archivo grabado, si es el caso dejo pasar
                    if( rec && ( rec.tvi_nLaunch != 1 || rec.rxi_cTipo.toLowerCase() == 'webm' || rec.rxi_cTipo.toLowerCase() == 'jpg' || rec.rxi_cTipo.toLowerCase() == 'mp4' || rec.rxi_cTipo.toLowerCase() == 'mpg' ) ) {
                        view.hascontent = true;
                        view.fireEvent( 'hascontent', view );
                    } else {
                        return;
                    }
                    //DS-600|adrianlara|20230412 => Hacer que la seccion de multimedia acepte tambien el tipo CWU
                    if( rec && rec.rxi_cTipo.toLowerCase() == 'cwu' ) {
                        var url_blacklist = ['www.alarm.com']
                        src = rec.rxi_cImg;
                        var viewTab;
                        Ext.Ajax.request({
                            url: src,
                            success: function(response){
                                viewTab = Ext.widget( 'iframeconbotonera', {
                                    title: "Web",
                                    border: false,
                                    src: src,
                                    itemId: 'web' + rec.rxi_iId,
                                    closable: false,
                                    autoDestroy: true,
                                    noToolbar: view.noToolbar,
                                    listeners: {
                                        fileNotFound: function() {
                                            console.log( 'ImagePanelController 404' );
                                            var _btn = view.down( '#webmenvivo' );
                                            if( _btn ) {
                                                _btn.btnEl.dom.click();
                                                _btn.toggle( true, false );
                                            }
                                        }
                                    },
                                    flex: 1
                                })
                                viewTab.iframSrc = src;
                                tabpanel.add( viewTab );
                            },
                            failure: function(err) {
                                viewTab = Ext.create('Ext.Button', {
                                    text: 'Abrir URL de forma Externa',
                                    handler: function() {
                                        window.open(src, '_blank');
                                    }
                                });
                                tabpanel.add( viewTab );
                            }
                        });
                        
                    } 
                    else if( rec && rec.rxi_cTipo.toLowerCase() == 'webm' ) {
                        var str = rec.rxi_cImg;
                        var res = str.match( /.*\\(.+\.webm)/ );
                        var src;
                        var d = new Date();
                        var n = d.getTime();
                        if( seconds == 'horaevento' || seconds == 1 ) {
                            if( res ) {
                                src = '/gallery/SharedImages/FFMPeg/' + res[ 1 ];
                            } else {
                                if( str == '' ) {
                                    str = rec.grm_cArchivo
                                    var path = rec.grm_cCarpeta.split( ':' )[ 1 ].replace( /\\/g, '/' );
                                    var pathArray = path.split( '/' )
                                    var pathFinal = pathArray[ pathArray.length - 2 ] + '/' + pathArray[ pathArray.length - 1 ]
                                    src = '/gallery/video/' + pathFinal + '/' + str;
                                } else if( str.indexOf( 'webm' ) > 0 ) {
                                    var arrCarpeta = Ext.Array.clean( rec.rxi_cCarpeta.split( '\\' ) );
                                    src = "/gallery/video/" + arrCarpeta[ arrCarpeta.length - 2 ] + '/' + arrCarpeta[ arrCarpeta.length - 1 ] + '/' + str;
                                } else {
                                    var path = rec.rxi_cCarpeta.replace( '\\', '/' );
                                    src = '/gallery/video/' + path + '/' + str + '.webm';
                                }
                            }
                        } else {
                            var path = objConfig.formdata._rtsplink
                            var url = 'rtsp://' + path
                            var src = '/handler/VideoTranscodeStream';
                            if( objConfig.formdata._rtsptcpforce != 'false' ) {
                                src = Ext.String.urlAppend( src, 'forceTcp=true' );
                            }
                            src = Ext.String.urlAppend( src, 'rtsp=' + url.replace( /&/g, "%26" ) );
                          
                            //src = '/handler/VideoTranscodeStream?forceTcp=true&_dc='+n+'&rtsp='+ url.replace(/&/g, "%26");
                            var jsonConfig = Ext.JSON.decode( rec.cuv_cLinkDSS )
                        }
                        controller.addWebmTool( view, tabpanel, rec, record, src );
                        if( !tabpanel.down( '#video' + rec.rxi_iId ) ) {
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: "Video",
                                border: false,
                                src: src,
                                itemId: 'video' + rec.rxi_iId,
                                closable: false,
                                autoDestroy: true,
                                noToolbar: view.noToolbar,
                                listeners: {
                                    fileNotFound: function() {
                                        console.log( 'ImagePanelController 404' );
                                        //controller.onImgPrevVivoClick(view.down('#imgprevVivo'));
                                        var _btn = view.down( '#webmenvivo' );
                                        if( _btn ) {
                                            _btn.btnEl.dom.click();
                                            _btn.toggle( true, false );
                                        }
                                    }
                                },
                                flex: 1
                            })
                            viewTab.iframSrc = src;
                            var webmbotonera = viewTab.down( '#webmbotonera' );
                            if( webmbotonera ) {
                                webmbotonera.show();
                                var vivo = webmbotonera.down( '#webmenvivo' );
                                //[DEDALO 30/8/2019] oculto el boton "en vivo" cuando el launcher esta en 1 (pedido AZOCAR)
                                if( rec.tvi_nLaunch == 1 && vivo ) {
                                    vivo.hide();
                                }
                            }
                            tabpanel.add( viewTab );
                        } else {
                            var viewTab = tabpanel.down( '#video' + rec.rxi_iId );
                            viewTab.down( 'uxiframe' ).setSrc( src );
                        }
                    }
                    else if( rec && ( rec.rxi_cTipo.toLowerCase() == 'mp4' ) ) {
                        //var imagepanel = view.down( 'tabpanel' );
                        if( !tabpanel.down( '#video' + rec.rxi_iId ) ) {
                            var d = new Date();
                            var n = d.getTime();
                            //var accountpath = record.get( 'cue_clinea' ).trim() + '_' + record.get( 'cue_ncuenta' ).trim();
                            var accountpath = rec.rxi_cCarpeta.split('\\').pop(); // dedalo 20/3/2023 resuelve videos generados por VC que se ven en la cuenta en la que se duplicaron
                            var rec_tfechahora = new Date( record.get( 'rec_isoFechaHora' ) ); // dedalo 24/02/2021 rect_fechahora esta vacio, tomo iso
                            var datepath = Ext.Date.format( rec_tfechahora, 'Ym' );
                            var filename = rec.grm_cArchivo;
                            if( !filename ) {
                                var pathArray = rec.rxi_cImg.split( '\\' );
                                filename = pathArray[ pathArray.length - 1 ];
                            }
                            var mediasrc = '/gallery/video/' + datepath + '/' + accountpath + '/' + filename;
                            //view.iframSrc = src;
                            var id = 'video' + i//rec.rxi_iId
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: getLocale( 'Video' ) + ( rec.rxi_iId ? ' (' + rec.rxi_iId + ')' : '' ),
                                border: false,
                                src: mediasrc,
                                closable: false,
                                autoDestroy: true,
                                itemId: id,
                                noToolbar: view.noToolbar
                            })
                            if( !view.noToolbar && rec.rxi_iId && rec.cuv_cLinkDSS && rec.cuv_cLinkDSS != '' ) {
                                viewTab.down( '#webmbotonera' ).show();
                            }
                            
                            controller.addWebmTool( view, tabpanel, rec, record, src );
                            tabpanel.add( viewTab );
                            //imagepanel.add( viewTab );
                        }
                    }
                    else if( rec && rec.cLinkVideo && ( rec.cLinkVideo.split( ':' )[ 0 ] == 'HIK' || rec.cLinkVideo.split( ':' )[ 0 ] == 'HRT' ) ) {
                        var url;
                        var pass = objConfig.formdata._password;
                        var user = objConfig.formdata._user;
                        var uri = objConfig.formdata._uri;
                        var port = objConfig.formdata._port;
                        var camara = objConfig.formdata._camara;
                        controller.addVideoTimeline( view, record, rec );
                        if( seconds == 'horaevento' || seconds == 1 ) {
                            var fecha = Ext.Date.format( new Date( view.record.get( '_FechaHora' ) ), 'Ymd\\tHis\\z' );
                            var fechaHastad = Ext.Date.add( new Date( view.record.get( '_FechaHora' ) ), Ext.Date.MINUTE, 2 );
                            var fechaHasta = Ext.Date.format( fechaHastad, 'Ymd\\tHis\\z' );
                            url = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/Streaming/tracks/' + camara + '01?starttime=' + fecha + '&endtime=' + fechaHasta
                        } else {
                            url = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/MPEG-4/ch' + camara + '/sub/av_stream'
                        }
                        var d = new Date();
                        var n = d.getTime();
                        var src = '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, "%26" );
                        view.setAutoScroll( false );
                        if( tabpanel.down( '#video' + rec.cLinkVideo.split( ':' )[ 0 ] ) ) {
                            tabpanel.remove( tabpanel.down( '#video' + rec.cLinkVideo.split( ':' )[ 0 ] ), true )
                        }
                        var viewTab = Ext.widget( 'iframeconbotonera', {
                            title: getLocale( 'Video' ) + ' (' + rec.cLinkVideo.split( ':' )[ 0 ] + ')',
                            border: false,
                            src: src,
                            closable: false,
                            autoDestroy: true,
                            itemId: 'video' + rec.cLinkVideo.split( ':' )[ 0 ],
                            noToolbar: view.noToolbar
                        })
                        if( !view.noToolbar ) {
                            viewTab.down( '#dahuabotonera' ).show();
                        }
                        controller.addHIKTool( viewTab );
                        if( seconds == 'horaevento' || seconds == 1 ) {
                            viewTab.down( '#dahuaenvivo' ).toggle( false );
                            viewTab.down( '#dahuahoraevento' ).toggle( true );
                        } else {
                            viewTab.down( '#dahuaenvivo' ).toggle( true );
                            viewTab.down( '#dahuahoraevento' ).toggle( false );
                        }
                        tabpanel.add( viewTab );
                    }
                    // ME fijo si es d-guard
                    else if( rec && rec.rxi_cCarpeta == '[D-Guard]' ) {
                        // me fijo si tiene layout configurado para hacer sinc con el servidor.
                        if( objConfig && objConfig.formdata._layout ) {
                            // como el server esta en otro dominio tengo que usar el proxy interno por cross domain.
                            var url = '/handler/AuthBasicRequestHandler?' + location.protocol + '//';
                            url += objConfig.formdata._user + ':' + objConfig.formdata._password + '@';
                            url += objConfig.formdata._uri + ':' + objConfig.formdata._port + '/setlayout.cgi';
                            url += '?layout=' + objConfig.formdata._layout
                            url += '&monitor=' + objConfig.formdata._monitor;
                            Ext.Ajax.request( {
                                url: url, //setlayout.cgi?layout=Layout2&monitor=1
                                method: 'GET',
                                success: function( resp, operation ) {
                                    //notify('Se sincronizó la terminal d-guard');
                                }
                            });
                        }
                        // tiene imagen d-guard muestro el iframe
                        // parseo el rxi_cImg 
                        var str = rec.rxi_cImg;
                        var res = str.match( /http:\/\/(.+?)\/(.+?)\/(.+?)\/(.+)/ );
                        var dir = res[ 1 ];
                        var camara = res[ 2 ];
                        var user = res[ 3 ];
                        var pass = res[ 4 ] ? res[ 4 ] : "";
                        var src = "/handler/dguardViewer";
                        src = Ext.String.urlAppend( src, "link=" + dir );
                        src = Ext.String.urlAppend( src, "user=" + user );
                        src = Ext.String.urlAppend( src, "camara=" + camara );
                        src = Ext.String.urlAppend( src, "pass=" + pass );
                        controller.addVideoTimeline( view, record, rec );
                        if( seconds != 0 ) {
                            src = Ext.String.urlAppend( src, "prevDate=" + Ext.Date.format( prevDate, 'c' ) );
                        }
                        if( size ) {
                            src = Ext.String.urlAppend( src, "size=" + size );
                        }
                        if( !tabpanel.down( '#video' + rec.rxi_iId ) ) {
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: getLocale( 'Video' ) + ' (' + rec.rxi_iId + ')',
                                border: false,
                                src: src,
                                closable: false,
                                autoDestroy: true,
                                itemId: 'video' + rec.rxi_iId,
                                noToolbar: view.noToolbar
                            })
                            if( !view.noToolbar ) {
                                viewTab.down( '#dguardbotonera' ).show();
                            }
                            controller.addDguardTool( viewTab );
                            tabpanel.add( viewTab );
                        } else {
                            var tab = tabpanel.down( '#video' + rec.rxi_iId )
                            tab.down( '#uxiframe' ).setSrc( src )
                        }
                    }
                    else if( rec && rec.cLinkVideo && rec.cLinkVideo.split( ':' )[ 0 ] == 'GRV' ) {
                        if( !tabpanel.down( '#video' + rec.cLinkVideo.split( ':' )[ 0 ] ) ) {
                            var path = objConfig.formdata._rtsplink
                            var d = new Date();
                            var n = d.getTime();
                            url = 'rtsp://' + path
                            var src = '/handler/VideoTranscodeStream';
                            if( objConfig.formdata._rtsptcpforce != 'false' ) {
                                src = Ext.String.urlAppend( src, 'forceTcp=true' );
                            }
                            controller.addVideoTimeline( view, record, rec );
                            src = Ext.String.urlAppend( src, 'rtsp=' + url.replace( /&/g, "%26" ) );
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: getLocale( 'Video' ) + ' (' + rec.cLinkVideo.split( ':' )[ 0 ] + ')',
                                border: false,
                                src: src,
                                closable: false,
                                autoDestroy: true,
                                itemId: 'video' + rec.cLinkVideo.split( ':' )[ 0 ],
                                noToolbar: view.noToolbar
                            })
                            controller.addGRVTool( tabpanel, rec, record );
                            tabpanel.add( viewTab );
                        }
                    }
                    else if( rec && rec.cLinkVideo && rec.cLinkVideo.split( ':' )[ 0 ] == 'GSU' ) {
                        if( !tabpanel.down( '#video' + rec.cLinkVideo.split( ':' )[ 0 ] ) ) {
                            var url = objConfig.formdata._url
                            var d = new Date();
                            var n = d.getTime();
                            var src = '/handler/GenericSnapshotUrlPlayer?_dc=' + n + '&url=' + url;
                            controller.addVideoTimeline( view, record, rec );
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: getLocale( 'Video' ) + ' (' + rec.cLinkVideo.split( ':' )[ 0 ] + ')',
                                border: false,
                                src: src,
                                closable: false,
                                autoDestroy: true,
                                itemId: 'video' + rec.cLinkVideo.split( ':' )[ 0 ],
                                noToolbar: view.noToolbar
                            })
                            controller.addGRVTool( tabpanel, rec, record );
                            tabpanel.add( viewTab );
                        }
                    }
                    else if( rec && rec.cLinkVideo && rec.cLinkVideo.split( ':' )[ 0 ] == 'WEB' ) {
                        if( !tabpanel.down( '#video' + rec.cLinkVideo.split( ':' )[ 0 ] ) ) {
                            var url = objConfig.formdata._url
                            var d = new Date();
                            var n = d.getTime();
                            var src = rec.cLinkVideo.split( ':' )[ 1] ;
                            controller.addVideoTimeline( view, record, rec );
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: getLocale( 'Web ' ) + ' (' + rec.cLinkVideo.split( ':' )[ 0 ] + ')',
                                border: false,
                                src: src,
                                closable: false,
                                autoDestroy: true,
                                itemId: 'web' + rec.cLinkVideo.split( ':' )[ 0 ],
                                noToolbar: view.noToolbar
                            })
                            tabpanel.add( viewTab );
                        }
                    }
                    else if( rec && rec.cLinkVideo && rec.cLinkVideo.split( ':' )[ 0 ] == 'DAH' ) {
                        var url;
                        var pass = objConfig.formdata._password;
                        var user = objConfig.formdata._user;
                        var uri = objConfig.formdata._uri;
                        var port = objConfig.formdata._port;
                        var camara = objConfig.formdata._camara;
                        controller.addVideoTimeline( view, record, rec );
                        if( seconds == 'horaevento' || seconds == 1 ) {
                            var fecha = Ext.Date.format( new Date( view.record.get( '_FechaHora' ) ), 'Y_m_d_H_i_s' )
                            url = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/cam/playback?channel=' + camara + '&subtype=1&starttime=' + fecha
                        } else {
                            url = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/cam/realmonitor?channel=' + camara + '&subtype=1'
                        }
                        var d = new Date();
                        var n = d.getTime();
                        var src = '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, "%26" );
                        var tabvideo = tabpanel.down( '#video' + rec.cLinkVideo.split( ':' )[ 0 ] );
                        if( tabvideo ) {
                            tabvideo.down( 'uxiframe' ).setSrc( src );
                        }
                        else {
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: getLocale( 'Video' ) + ' (' + rec.cLinkVideo.split( ':' )[ 0 ] + ')',
                                border: false,
                                src: src,
                                closable: false,
                                autoDestroy: true,
                                itemId: 'video' + rec.cLinkVideo.split( ':' )[ 0 ],
                                noToolbar: view.noToolbar
                            })
                            if( !view.noToolbar ) {
                                viewTab.down( '#dguardbotonera' ).show();
                            }
                            //controller.addGRVTool(viewTab);                                
                            controller.addGRVTool( tabpanel, rec, record );
                            tabpanel.add( viewTab );
                            viewTab.addTool( {
                                type: 'maximize',
                                itemId: 'maximizer',
                                handler: function( event, img, view, tool ) {
                                    var view = tool.up( 'dguardpanelview' );
                                    var iframe = view.down( 'uxiframe' );
                                    if( iframe ) {
                                        Ext.destroy( iframe );
                                    }
                                    var url;
                                    var pass = objConfig.formdata._password;
                                    var user = objConfig.formdata._user;
                                    var uri = objConfig.formdata._uri;
                                    var port = objConfig.formdata._port;
                                    var camara = objConfig.formdata._camara;
                                    var fecha = Ext.Date.format( new Date( record.get( '_FechaHora' ) ), 'Ymd\\tHis\\z' );
                                    var fechaHastad = Ext.Date.add( new Date( record.get( '_FechaHora' ) ), Ext.Date.MINUTE, 2 );
                                    var fechaHasta = Ext.Date.format( fechaHastad, 'Ymd\\tHis\\z' );
                                    url = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/cam/playback?channel=' + camara + '&subtype=1&starttime=' + fecha
                                    url2 = 'rtsp://' + user + ':' + pass + '@' + uri + ':' + port + '/cam/realmonitor?channel=' + camara + '&subtype=1'
                                    var d = new Date();
                                    var n = d.getTime();
                                    var src = '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, "%26" );
                                    var src2 = '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url2.replace( /&/g, "%26" );
                                    var videotab = Ext.widget( 'tabpanel', {
                                        items: [
                                            {
                                                xtype: 'container',
                                                title: 'Hora de evento',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        style: {
                                                            textAlign: 'center'
                                                        },
                                                        value: 'Hora del evento ' + Ext.Date.format( new Date( record.get( '_FechaHora' ) ), 'd/m/Y H:i:s' )
                                                    },
                                                    Ext.create( 'Ext.ux.IFrame', {
                                                        title: "",
                                                        border: false,
                                                        src: src,
                                                        closable: false,
                                                        autoDestroy: true,
                                                        flex: 1
                                                    })
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                title: 'En vivo',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        style: {
                                                            textAlign: 'center'
                                                        },
                                                        value: 'En vivo'
                                                    },
                                                    Ext.create( 'Ext.ux.IFrame', {
                                                        title: "",
                                                        border: false,
                                                        src: src2,
                                                        closable: false,
                                                        autoDestroy: true,
                                                        flex: 1
                                                    })
                                                ]
                                            }
                                        ]
                                    });
                                    if( objConfig && objConfig.formdata && objConfig.formdata.gridConfig ) {
                                        // agrego el tab
                                        var grilla = Ext.widget( 'panel', {
                                            layout: 'column',
                                            title: 'Grilla',
                                            showMaximizer: false,
                                            autoScroll: true,
                                            items: [
                                            ]
                                        });
                                        var d = new Date();
                                        var n = d.getTime();
                                        var config = Ext.JSON.decode( objConfig.formdata.gridConfig )
                                        Ext.Array.each( config, function( val ) {
                                            url = 'rtsp://' + val._user + ':' + val._password + '@' + val._uri + ':' + val._port + '/cam/realmonitor?channel=' + val._camara + '&subtype=1'
                                            grilla.add( Ext.create( 'Ext.ux.IFrame', {
                                                title: "",
                                                border: false,
                                                width: 320,
                                                height: 240,
                                                // src : '/handler/dguardViewer?link='+val._uri+':'+val._port+'&user='+val._user+'&pass='+val._password+'&camara='+val._camara+'',
                                                src: '/handler/VideoTranscodeStream?_dc=' + n + '&forceTcp=true&rtsp=' + url.replace( /&/g, '%26' ),
                                                closable: false,
                                                autoDestroy: true
                                            }) )
                                        })
                                        videotab.add( grilla );
                                    }
                                    var win = Ext.create( 'Ext.Window', {
                                        layout: 'fit',
                                        title: getLocale( 'Imágenes y video' ) + ' (' + record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ) + ')',
                                        closeAction: 'destroy',
                                        width: 680,
                                        height: 550,
                                        translate: false,
                                        border: true,
                                        modal: false,
                                        view: view,
                                        listeners: {
                                            close: function() {
                                                view.fireEvent( 'windowclose', view );
                                            }
                                        },
                                        items: videotab
                                    });
                                    win.show();
                                    if( showActive == 'grid' ) {
                                        videotab.setActiveTab( grilla )
                                    }
                                    view.fireEvent( 'aftermaximize', view );
                                }
                            });
                        }
                    }
                    else if( rec && ( rec.rxi_cTipo.toUpperCase() == 'AVI' || rec.rxi_cTipo.toUpperCase() == 'MPG' ) ) {
                        if( !tabpanel.down( '#video' + rec.rxi_cTipo.toUpperCase() ) ) {
                            var url = rec.rxi_cCarpeta + '\\' + rec.rxi_cImg;
                            var d = new Date();
                            var n = d.getTime();
                            var src = '/handler/VideoTranscodeStreamWebm?_dc=' + n + '&rtsp=' + url.replace( /&/g, "%26" );
                            var viewTab = Ext.widget( 'iframeconbotonera', {
                                title: getLocale( 'Video' ) + ' (' + rec.rxi_cTipo.toUpperCase() + ')',
                                border: false,
                                src: src,
                                closable: false,
                                autoDestroy: true,
                                itemId: 'video' + rec.rxi_cTipo.toUpperCase(),
                                noToolbar: view.noToolbar
                            })
                            tabpanel.add( viewTab );
                            viewTab.addTool( {
                                type: 'maximize',
                                itemId: 'maximizer',
                                handler: function( event, img, view, tool ) {
                                    var iframe = view.down( 'uxiframe' );
                                    if( iframe ) {
                                        Ext.destroy( iframe );
                                    }
                                    //var url;
                                    //url = '\\\\dss-sgcloudvm\\SoftGuard.Final\\Misc\\video\\'+rec.rxi_cCarpeta+'\\'+rec.rxi_cImg+'.AVI';
                                    var d = new Date();
                                    var n = d.getTime();
                                    //var src = '/handler/VideoTranscodeStream?_dc='+n+'&rtsp='+ url.replace(/&/g, "%26");
                                    view.iframSrc = src;
                                    if( view.down( '#dahuabotonera' ) ) {
                                        view.down( '#dahuabotonera' ).hide();
                                    }
                                    var win = Ext.create( 'Ext.Window', {
                                        layout: 'hbox',
                                        title: getLocale( 'Imágenes y video' ) + ' (' + record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ) + ')',
                                        closeAction: 'destroy',
                                        width: 350,
                                        height: 350,
                                        border: true,
                                        modal: false,
                                        translate: false,
                                        view: view,
                                        listeners: {
                                            close: function() {
                                                view.fireEvent( 'windowclose', view );
                                            }
                                        },
                                        items: [
                                            Ext.create( 'Ext.ux.IFrame', {
                                                title: "",
                                                border: false,
                                                src: src,
                                                closable: false,
                                                autoDestroy: true,
                                                width: '100%',
                                                height: '100%'
                                            })
                                        ]
                                    });
                                    //win.show();
                                    view.fireEvent( 'aftermaximize', view );
                                }
                            });
                        }
                    } /*else {
                        // oculto la toolbar
                         if (view.down('toolbar'))
                            view.down('toolbar').hide();
                        // si es null o rxi_nEstado = 0 ejecuto handler sino agrego imagen
                        if( rec && rec.rxi_nEstado == 0 && !view.vupointLoading ) {
                            
                            if( objConfig && objConfig.formdata && ( objConfig.formdata.t_videoid == 25 || objConfig.formdata.cuv_ivideoid == 25 || objConfig.formdata.cvl_ivideoid == 25 ) ) {
                                view.vupointLoading = true;
                                Ext.Ajax.request( {
                                    url: '/handler/vupointHandler',
                                    params: { rec_iid: rec_iid },
                                    method: 'GET',
                                    scope: this,
                                    success: function( response ) {
                                        view.vupointLoading = false;
                                        controller.callVideo( seconds, view );    
                                    }
                                })
                            } else {
                                
                                Ext.Ajax.request( {
                                    url: '/handler/AgilityHandler',
                                    params: { rec_iid: rec_iid, tabla: tablaDatos },
                                    method: 'GET',
                                    scope: this,
                                    success: function( response ) {
                                        controller.addImagenToView( record, view );
                                    }
                                })
                            }
                        } else {
                            controller.addImagenToView( record, view );
                        }
                    }*/
                    i = i + 1;
                })
                Ext.Array.each( parametros.rows, function( rec ){
                    if( rec && rec.rxi_cTipo.toLowerCase() == 'jpg' ){
                        if( rec && rec.rxi_nEstado == 0 && !view.vupointLoading ) {
                            //if(objConfig!=undefined)
                            if( typeof(objConfig) != 'undefined' && objConfig.formdata && ( objConfig.formdata.t_videoid == 25 || objConfig.formdata.cuv_ivideoid == 25 || objConfig.formdata.cvl_ivideoid == 25 ) ) {
                                view.vupointLoading = true;
                                Ext.Ajax.request( {
                                    url: '/handler/vupointHandler',
                                    params: { rec_iid: rec_iid },
                                    method: 'GET',
                                    scope: this,
                                    success: function( response ) {
                                        view.vupointLoading = false;
                                        controller.callVideo( seconds, view );    
                                    }
                                })
                            } else {
                                
                                Ext.Ajax.request( {
                                    url: '/handler/AgilityHandler',
                                    params: { rec_iid: rec_iid, tabla: tablaDatos },
                                    method: 'GET',
                                    scope: this,
                                    success: function( response ) {
                                        controller.addImagenToView( record, view );
                                    }
                                })
                            }
                        } else {
                            controller.addImagenToView( record, view );
                        }
                    }
                })
                // 28/01 JUAN : Agrego validacion de tabPanel para que no de error de undefined el .down('#maxibtn')
                if( tabpanel ) {
                    if( !tabpanel.down( '#maxibtn' ) && view.showMaximizer != false ) {
                        tabpanel.tabBar.insert( 0, {
                            xtype: 'button',
                            iconCls: 'icon-arrow-out',
                            itemId: 'maxibtn',
                            style: {
                                border: 0,
                                background: 'none'
                            },
                            handler: function() {
                                // 11/02 - Disparo que se oculte el panel de las camaras (Esto no borra los iFrames)
                                view.fireEvent( 'aftermaximize', view );
                                var win = Ext.create( 'Ext.Window', {
                                    layout: 'fit',
                                    title: getLocale( 'Multimedia' ),
                                    //closeAction : 'destroy',
                                    width: 750,
                                    height: 550,
                                    translate: false,
                                    border: true,
                                    modal: false,
                                    items: [
                                        {
                                            xtype: 'dguardpanelview',
                                            title: '',
                                            ignoreDirty: true,
                                            //header: false,
                                            itemId: 'imagePanel',
                                            showMaximizer: false,
                                            closeaction: 'destroy',
                                            record: view.record,
                                            imagenesSoloDelEvento: view.imagenesSoloDelEvento
                                        }
                                    ],
                                    // 11/02 : Agrego la escucha de cierre de Window para que vuelva el panel de camaras.
                                    listeners: {
                                        close: function() {
                                            view.hasimages=false;
                                            view.fireEvent( 'windowclose', view );
                                        }
                                    }
                                });
                                win.show()
                            }
                        })
                    }
                }
                 //win.show();
            }
        });
    },
        
    onImgDahuaEnVivoClick: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( 'envivo', view );
    },
        
    onImgDahuaHoraEventoClick: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( 'horaevento', view );
    },
        
    onImgWebmEnVivoClick: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( 'envivo', view );
    },
        
    onImgWebmEventoClick: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( 'horaevento', view );
    },
    onImgPrevVivoClick: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( 0, view );
    },
    onImgPrev0Click: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( -1, view );
    },
    onImgPrev1Click: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( -60, view );
    },
    onImgPrev5Click: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( -300, view );
    },
    onImgPrev10Click: function(button, object, options ) {
        var view = button.up( 'dguardpanelview' );
        button.toggle( true );
        this.callVideo( -600, view );
    },
        
    onClose: function(view ) {
        /*var iframe = view.down( 'uxiframe' );
        Ext.destroy( iframe );
        var imagepanel = view.down( 'eventimagesgridview' );
        if( imagepanel ) {
            Ext.destroy( imagepanel );
        }*/
    },
        
    onActivate: function(view ) {
        /**
         * Issue que no cargaba imagen del evento por no existir el iframe de abajo
         */
        if( view.activated && view.down( 'uxiframe' ) )
            this.callVideo( 1, view );
    },
        
        
    addImagenToView: function (record, view ) {
        //if(record.get('rec_cContenido').match(/IMG|JPG/g)){
        var imagepanel = view.down( 'tabpanel' );
        if( !view.hasimages ) {
            view.hasimages = true;
            view.hascontent = true;
            view.fireEvent( 'hascontent', view );
            var viewTab = Ext.widget( 'eventimagesgridview', {
                record: record,
                hideChoserImage: true,
                imagenesSoloDelEvento: view.imagenesSoloDelEvento
            });
            viewTab.setTitle( getLocale( 'Imagenes' ) )
            imagepanel.add( viewTab );
            viewTab.addTool( {
                type: 'maximize',
                itemId: 'maximizer',
                handler: function( event, img, view, tool ) {
                    var view = tool.up( 'eventomonitoreoview' );
                    var tabpanel = tool.up( 'tabpanel' );
                    var record = view.record;
                    var win = Ext.create( 'Ext.Window', {
                        layout: 'fit',
                        title: getLocale( 'Imágenes' ) + ' (' + record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ) + ') ',
                        closeAction: 'destroy',
                        width: 750,
                        height: 550,
                        translate: false,
                        border: true,
                        modal: false,
                        view: view,
                        itemId: 'opengalery',
                        items: [
                            {
                                xtype: 'eventimagesgridview',
                                caller: view,
                                itemId: 'ssssssss',
                                record: record,
                                hideChoserImage: true,
                                imagenesSoloDelEvento: view.imagenesSoloDelEvento
                            }
                        ]
                    });
                    //win.show();
                }
            });
        }
        //} 
    }
});