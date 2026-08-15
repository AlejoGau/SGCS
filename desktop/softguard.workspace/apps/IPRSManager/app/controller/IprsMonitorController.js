Ext.define( 'IPRSManager.controller.IprsMonitorController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'IprsConeccionSearchModel' ],
    views: [ 'IprsMonitorView', 'IprsIncomingChartView' ],

    init: function(config ) {
        this.control( {
            'iprsmonitorview': {
                afterrender: this.initview,
                incomming: this.onIncomming,
                activate: this.onActivate
            }
        });
    },

    onActivate: function(view){
        //console.log(arguments);
        //if (!view.iniciando){

           this.initGrafico( view );
           //this.taskChart(view);
        //}
    },
        
    initview: function(view ) {
        var grid = view.down( 'iprseventgridview' );
        var comm = view.down( '#comm' );
        var buffer = view.down( '#buffer' );
        var graph = view.down( '#grafico' );
        var record = view.record;
        var controller = this;
        view.iniciando = true;
        console.log( view.up( 'tab' ) )

        view.mask = Ext.create( 'Ext.LoadMask', {
            target: view,
            itemId: view.itemId,
            msg: getLocale( "Inciando conexión." )
        }).show();

        // conecto el websocket
        var wsprotocol = 'ws';
        if( location.protocol == 'https:' ) {
            wsprotocol = 'wss';
        }
        var url = wsprotocol + '://' + record.get( 'iprs_localip' ) + ':' + record.get( 'iprs_websocketport' );
        var ws = Ext.create( 'websocket', {
            url: url,
            listeners: {
                open: function( ws ) {
                    view.mask.hide();
                    controller.resaltarTab( view, false );
                    console.log( 'Conexión abierta' );
                },
                message: function( ws, data ) {
                    try {
                        // si es un json lo agrego al store
                        var models = Ext.JSON.decode( data );
                        console.log(models);
                        var destino = grid;
                        //var destino = buffer;
                        var tabpanel = destino.up( 'tabpanel' );
                        /*
                        if(( models.length > 0 && models[ 0 ].Status == 40 ) || ) {
                            destino = buffer;
                            if( buffer.socketstore ) {
                                buffer.socketstore.removeAll();
                            }
                            tabpanel.setActiveTab( destino );
                        }
                        */
                        Ext.Array.each( models, function( model ) {
                            view.fireEvent( 'incomming', model, view, grid.socketstore );
                            if (model.Status == 40){
                                destino = buffer;
                            } else {
                                destino = grid;
                            }
                            if( model.HasProcess && model.CProtocolo && model.CProtocolo.indexOf( 'HB', 0 ) < 0 ) {
                                controller.addEvent( destino, model );
                                tabpanel.setActiveTab( destino );
                            }
                            else if( comm.commstore ) { // si no entre a la view no se inicializo y no existe el store
                                if( comm.commstore.count() > 150 ) {
                                    //hay muchos registros elimino el mas viejo
                                    var descarte = comm.commstore.last();
                                    comm.commstore.remove( descarte );
                                    descarte.destroy();
                                }
                                comm.commstore.add( {
                                    AssemblyClassName: model.AssemblyClassName
                                    , TRawFechaHora: model.TRawFechaHora
                                    , Error_code: model.Error_code
                                    , Data: atob( model.Raw )
                                    , PacketUniqueID: model.PacketUniqueID
                                });
                            }
                        })
                    } catch( e ) {
                        //nada que hacer
                        console.log( e );
                    }

                    //console.log(data);
                },
                close: function( ws ) {
                    if( ws.autoreconnectCount > 3 ) {
                        view.mask.hide();
                        view.mask.msg = getLocale( 'Se cerro la conexión.' );
                        view.mask.show();
                    }

                    controller.resaltarTab( view, true )
                    console.log( 'Conexión cerrada. itemId:' + view.itemId );
                },
                error: function( ws, error ) {
                    console.log( 'Error Socket: ', error );
                },
            }
        });
        this.initGrafico( view );
        /**31/05/2023 */
        //this.taskChart(view);
        
        /************* */
        view.iniciando=false;
    
      
    },
    /**31/05/2023  Daniel O. Medina
     * https://softguard.atlassian.net/browse/DSS-656
     * 
    */
    taskChart: function(view){
        var controller = this;
        
        this.numberChartTask = Ext.TaskManager.start( {
            run: function() {
                controller.addNewNumberData( view )
            },
            interval: 1000,
            scope: this
            
        });            
    },
    /************* */

    addEvent: function(grid, model ) {
        if( grid.socketstore.count() > 150 ) {
            //hay muchos registros elimino el mas viejo
            var descarte = grid.socketstore.last();
            grid.socketstore.remove( descarte );
            descarte.destroy();
        };
        grid.socketstore.add( model );
        grid.socketstore.sort()
        console.log( model );
    },
        
    resaltarTab: function (view, resaltar ) {
        if( resaltar ) {
            view.tab.el.dom.style.background = '#ff0000';
        } else {
            view.tab.el.dom.style.background = '';
        }
    },
        
    initGrafico: function (view ) {
        var controller = this;
        view.cantidades = [];
        view.desplazamiento = 0;
        view.visible = 60;
        view.recordGrafico = [];

        var chart = view.down( '#grafico' );
        chart.getLegendStore().removeAll();

        //traigo conexiones
        var conStore = Ext.create( 'Ext.data.Store', {
            model: this.getIprsConeccionSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [ {
                property: "iprsc_iprsiid",
                value: view.record.get( 'Id' )
            }, {
                    property: "iprsc_status",
                    value: 'A'
                }]
        }).load( {
            callback: function( records ) {
                view.conexiones = records;
                view.fields = [];

                //armo fileds para el store
                Ext.Array.each( records, function( r ) {
                    var fieldY = r.get( 'ipc_cdescripcion' ) + 'Y';
                    view.fields.push( fieldY )
                })
                
                /**31/05/2023  Daniel O. Medina
                 * https://softguard.atlassian.net/browse/DSS-656
                 * 
                */
               if (!view.seriesIniciado){
                    chart.addSeries( {
                            type: 'area',
                            title: 'Paquetes recibidos',
                            xField: 'valorX',
                            yField: view.fields
                        });
                    view.seriesIniciado = true;
               }
               /******************************************** */

               chart.getAxes()[ 0 ].setFields( view.fields )

                var store = Ext.create( 'Ext.data.Store', {
                    fields: view.fields,
                    remoteSort: false,
                    remoteGroup: false,
                    remoteFilter: false
                })

                chart.bindStore( store )

                xAxis = chart.getAxes()[ 1 ]
                chart.animationSuspended = true;
                xAxis.setMinimum( 0 );
                xAxis.setMaximum( view.visible );

                var chartStore = chart.getStore();
                //chartStore.clearAll();
                

                var obj = {}
                obj[ 'valorX' ] = 0
                Ext.Array.each( view.conexiones, function( r ) {
                    obj[ r.get( 'ipc_cdescripcion' ) + 'Y' ] = 0
                })
                view.recordGrafico.push( obj )
                chartStore.add( view.recordGrafico );
                //   view.incomingStore.add(obj);

                
                chart.getLegendStore().each( function( r ) {
                    let ipc = view.conexiones[ r.get( 'index' ) ];
                    let iprsc_config = Ext.JSON.decode( ipc.get( 'iprsc_config' ) );
                    let method = iprsc_config.formdata.connectionMethod;
                    let texto = ipc.get( 'ipc_cdescripcion' ) + ' (' + method + ':' + ipc.get( 'ipc_nport' ) + ')';
                    r.set( 'name', texto );
                });

                


                
                this.numberChartTask = Ext.TaskManager.start( {
                    run: function() {
                        controller.addNewNumberData( view )
                    },
                    interval: 1000,
                    scope: this
                });
                
            }
        })
    },

    onIncomming: function (record, view ) {
        //CONTABILIZO
        if( record ) {
            if( !view.cantidades[ record.Ipc_cdescripcion ] ) {
                view.cantidades[ record.Ipc_cdescripcion ] = 0;
            }
            view.cantidades[ record.Ipc_cdescripcion ]++;
        }
        //console.log(view.cantidades)
    },

    addNewNumberData: function(view ) {
        //console.log('addNewNumberData:'+view.record.get('Id')+' ('+ view.desplazamiento+')');
        var chart = view.down( '#grafico' ),
            //store = view.incomingStore
            store = chart.getStore();

       

        //desplazo una posicion el grafico
        view.desplazamiento++;

        //defino minimo y maximo para desplazar   
        if( view.desplazamiento > view.visible ) {
            var min = view.desplazamiento - view.visible;
            xAxis.setMinimum( min );
            xAxis.setMaximum( view.desplazamiento );
            //console.log('defino minimo y maximo para desplazar:'+min+' ('+view.desplazamiento+')');
        }

        if( view.recordGrafico.length > ( view.visible * 2 ) ) {
            chart.setAnimation( false )
            //console.log(view.recordGrafico.length)
            view.recordGrafico.splice( 0, view.visible )
            //console.log('addNewNumberData-recordGrafico.length:'+view.recordGrafico.length+' id:'+view.record.get('Id'))
        } else {
            chart.setAnimation( true )
        }

        //recorro las conexiones
        var obj = {}
        obj[ 'valorX' ] = view.desplazamiento
        Ext.Array.each( view.conexiones, function( r ) {
            obj[ r.get( 'ipc_cdescripcion' ) + 'Y' ] = view.cantidades[ r.get( 'ipc_cdescripcion' ) ] ? view.cantidades[ r.get( 'ipc_cdescripcion' ) ] : 0
        })

        view.recordGrafico.push( obj )
        store.loadData( view.recordGrafico )
        chart.setAnimation( true )

        chart.getLegendStore().each( function( r ) {
            let ipc = view.conexiones[ r.get( 'index' ) ];
            let iprsc_config = Ext.JSON.decode( ipc.get( 'iprsc_config' ) );
            let method = iprsc_config.formdata.connectionMethod;
            let texto = ipc.get( 'ipc_cdescripcion' ) + ' (' + method + ':' + ipc.get( 'ipc_nport' ) + ')';
            r.set( 'name', texto );
        })

        //limpio contadores  
        for( var key in view.cantidades ) {
            if( view.cantidades.hasOwnProperty( key ) ) {
                view.cantidades[ key ] = 0;
            }
        }
    }
});