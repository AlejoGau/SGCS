//MIGRADO2024
Ext.define( 'Common.controller.ReporteGraficoController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'TablaHistoricoSearchModel', 'ReporteGraficoModel', 'CuentaRecepcionModel' ],
views: [ 'ReporteGraficoView' ],
refs: [ {
    ref: 'desdePicker',
    selector: '#fechadesde'
}, {
        ref: 'hastaPicker',
        selector: '#fechahasta'
    }, {
        ref: 'radioreporte',
        selector: '#treporte'
    }
],
    init : function(config ) {
        this.control( {
            'reportegraficoview': {
                afterrender: this.initialize,
                itemclick: this.onItemClick
            },
            'reportegraficoview #fechadesde': {
                select: this.selectFechaDesde
            },
            'reportegraficoview #fechahasta': {
                select: this.selectFechaHasta
            },
            'reportegraficoview #treporte': {
                change: this.selectReporte
            },
            'reportegraficoview button[action="search"]': {
                click: this.onSearchClick
            },
            'reportegraficoview #imprimir': {
                click: this.onImprimirClick
            },
            'reportegraficoview #combohistorico': {
                //select : this.onComboHistoricoSelect,
                change: this.onComboHistoricoSelect
            }
        });
    }, // cierro init
initialize: function(view ) {
    var me = this;
    var options = view.options;
    var cuenta = view.record;
    if( !options ) {
        options = {};
        options.mostrar = 250;
        options.orden = '';
        options.fechaDesde = '';
        options.fechaHasta = '';
        options.eventos = '';
    }
    this.setFechaHasta( new Date( Ext.Date.now() ), view );
    this.setFechaDesde( new Date( Ext.Date.add( options.fechaHasta, Ext.Date.DAY, -6 ) ), view );
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getReporteGraficoModelModel(),
        remoteSort: false,
        pageSize: 200,
        sorters: [
            {
                property: 'fecha',
                direction: 'ASC'
            }
        ]
    });
    store.load( records => console.log( "getReporteGraficoModelModel RECORDS - - - -", records ) )
    view.bindStore( store );
    console.log( "view initialize", view )
    Ext.create( 'Ext.data.Store', {
        model: this.getCuentaRecepcionModelModel(),
        options: options,
        storeId: 'recepcionGrafico',
        remoteSort: true,
        pageSize: 200,
        listeners: {
            beforeload: me.onBeforeload
        },
        sorters: [
            {
                property: 'r.rec_tfechahora',
                direction: 'ASC'
            }
        ]
    });
    if( cuenta ) {
        view.cuenta = cuenta;
        view.options.Id = cuenta.get( 'cue_iid' );
        this.loadData( view );
    }
    this.getHastaPicker().setEditable( false );
    this.getDesdePicker().setEditable( false );
    var historicoStore = Ext.create( 'Ext.data.Store', {
        model: this.getTablaHistoricoSearchModelModel(),
        autoload: false,
        // dedalo estaba el remotesort y el remotefilter comentado los descomento 25/9/2018
        remoteSort: false,
        remoteFilter: true,
        sorters: [ {
            property: 'c_periodo',
            direction: 'DESC'
        }],
        pageSize: 10000
    });
    var comboHistorico = view.down( '#combohistorico' );
    comboHistorico.bindStore( historicoStore );
    historicoStore.load( records => console.log( "historicoStore RECORDS - - - -", records ) );
    view.down( '#combohistorico' ).hide();
    view.down( '#fechadesde' ).hide();
    view.down( '#fechahasta' ).hide();
},
selectFechaDesde: function(datepicker, date, options ) {
    var view = datepicker.up( 'reportegraficoview' );
    var options = view.options;
    options.fechaDesde = date;
    this.getRadioreporte().setValue( '3' );
    //this.loadData(view);
},
selectFechaHasta: function(datepicker, date, options ) {
    var view = datepicker.up( 'reportegraficoview' );
    var options = view.options;
    var dhasta = Ext.Date.add( date, Ext.Date.DAY, 1 );
    options.fechaHasta = dhasta;
    this.getRadioreporte().setValue( '3' );
    //this.loadData(view);
},
selectReporte: function(field, newValue, oldValue, options ) {
    var view = field.up( 'reportegraficoview' );
    var options = view.options;
    if( Ext.typeOf( newValue.treporte ) != "array" ) {
        options.tipoEvento = newValue.treporte;
        options.mostrar = 250;
        options.orden = 'ASC';
        switch( newValue ) {
            case '0': // semanal
                var dhasta = new Date( Ext.Date.now() );//Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.DAY, 1);
                this.setFechaHasta( dhasta, view );
                this.setFechaDesde( Ext.Date.add( new Date( Ext.Date.now() ), Ext.Date.DAY, -6 ), view );
                view.down( '#combohistorico' ).hide();
                view.down( '#fechadesde' ).hide();
                view.down( '#fechahasta' ).hide();
                break;
            case '1': // quincenal
                var dhasta = new Date( Ext.Date.now() );//Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.DAY, 1);
                this.setFechaHasta( dhasta, view );
                this.setFechaDesde( Ext.Date.add( new Date( Ext.Date.now() ), Ext.Date.DAY, -14 ), view );
                view.down( '#combohistorico' ).hide();
                view.down( '#fechadesde' ).hide();
                view.down( '#fechahasta' ).hide();
                break;
            case '2': // mensual
                var dhasta = Ext.Date.add( new Date( Ext.Date.now() ), Ext.Date.DAY, -1 );
                this.setFechaHasta( dhasta, view );
                this.setFechaDesde( new Date( Ext.Date.getFirstDateOfMonth( options.fechaHasta ) ), view );
                view.down( '#combohistorico' ).hide();
                view.down( '#fechadesde' ).hide();
                view.down( '#fechahasta' ).hide();
                break;
            case '3': // entre fechas
                view.down( '#combohistorico' ).show();
                view.down( '#fechadesde' ).show();
                view.down( '#fechahasta' ).show();
                //nada que hacer
                break;
        }
        this.loadData( view );
    }
},
setFechaHasta: function(date, view ) {
    var options = view.options;
    options.fechaHasta = Ext.Date.clearTime( date );
    this.getHastaPicker().setValue( options.fechaHasta );
},
setFechaDesde: function(date, view ) {
    var options = view.options;
    options.fechaDesde = Ext.Date.clearTime( date );
    this.getDesdePicker().setValue( options.fechaDesde );
},
            
onSearchClick: function(button ) {
    var view = button.up( 'reportegraficoview' );
    this.loadData( view );
},
loadData: function(view ) {
    var options = view.options;
    var fechadesde = options.fechaDesde;
    var fechahasta = options.fechaHasta;
    var combohistorico = view.down( '#combohistorico' ).getValue();
    var store = view.getStore();
    var me = this;
    store.removeAll();
    view.getView().refresh();
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var days = Math.round( Math.abs(( fechahasta.getTime() - fechadesde.getTime() ) / ( oneDay ) ) );
    var estado = 'sinEstado';
    var eventos = Ext.create( 'Ext.data.Store', {
        model: this.getCuentaRecepcionModelModel(),
        options: options,
        remoteSort: true,
        pageSize: 1,
        listeners: {
            beforeload: me.onBeforeload
        },
        sorters: [
            {
                property: 'r.rec_tfechahora',
                direction: 'ASC'
            }
        ]
    });
    eventos.options = {
        Id: options.Id,
        mostrar: 1,
        tipos: '1,2',
        alertas: '',
        orden: 'DESC',
        fechaDesde: Ext.Date.add( fechadesde, Ext.Date.YEAR, -1 ),
        fechaHasta: fechadesde,
        eventos: ''
    }
    if( combohistorico ) {
        view.options.table = combohistorico;
    }
    eventos.load( {
        store: eventos, callback: function( records ) {
            if( records.length > 0 ) {
                var evento = records[ 0 ];
                var alarma = evento.get( 'rec_calarma' );
                var tipo = evento.get( 'cod_ntipo' );
                if( tipo == 2 )
                    estado = 'cerrado';
                if( tipo == 1 )
                    estado = 'abierto';
                /*
                if ( alarma == 'CLO')
                    estado = 'cerrado';
                if (alarma == 'OPN')
                    estado = 'abierto';
                        */
                //console.log(estado);
            }
            me.addFecha( view, 0, days, estado );
        }
    });
},
disableChange: function(view ) {
    view.down( '#fechadesde' ).disable();
    view.down( '#fechahasta' ).disable();
    view.down( '#treporte' ).disable();
    view.down( 'button[action="search"]' ).disable();
    view.down( '#combohistorico' ).disable();
},
enableChange: function(view ) {
    view.down( '#fechadesde' ).enable();
    view.down( '#fechahasta' ).enable();
    view.down( '#treporte' ).enable();
    view.down( 'button[action="search"]' ).enable();
    view.down( '#combohistorico' ).enable();
},
            
addFecha: function(view, d, days, estado ) {
    var options = view.options;
    var fechadesde = options.fechaDesde;
    var store = view.getStore();
    var controller = this;
    var eventos = Ext.StoreManager.lookup( 'recepcionGrafico' );
    var combohistorico = view.down( '#combohistorico' ).getValue();
    var fecha = Ext.Date.add( fechadesde, Ext.Date.DAY, d );
    var row = store.add( {
        fecha: fecha
    })[ 0 ];
    controller.disableChange( view );
    eventos.options = {
        Id: options.Id,
        mostrar: options.mostrar,
        tipos: '',
        alertas: '',
        orden: options.orden,
        fechaDesde: fecha,
        fechaHasta: Ext.Date.add( fecha, Ext.Date.DAY, 1 ),
        eventos: ''
    }
    if( combohistorico ) {
        eventos.options.table = combohistorico;
    }
    eventos.load( {
        store: eventos, callback: function( records ) {
            for( hora = 0;hora < 24;hora++ ) {
                var cero = hora < 10 ? '0' : '';
                var horastr = cero + hora.toString();
                var qtip = '';
                var cls = '';
                var qtipevento = [];
                var horaActual = parseInt( Ext.Date.format( new Date(), 'H' ), 10 );
                var fechaActual = Ext.Date.format( new Date(), 'Ymd' );
                var fechaRow = Ext.Date.format( fecha, 'Ymd' );
                var aeventos = Ext.Array.filter( records, function( evento ) {
                    var fecha = evento.get( '_tfechahoraOffset' );
                    //var fecha = evento.get( 'rec_isoFechaHora' );
                    var horafecha = parseInt( Ext.Date.format( fecha, 'H' ), 10 );
                    var alarma = evento.get( 'rec_calarma' );
                    var tipo = evento.get( 'cod_ntipo' );
                    if( hora == horafecha ) {
                        if( tipo == 2 ) {
                            estado = 'cerrado';
                        }
                        if( tipo == 1 ) {
                            estado = 'abierto';
                        }
                        var fecha = Ext.Date.format( fecha, 'H:i:s ' );
                        var user = Ext.String.trim( evento.get( '_usu_cnombre' ) );
                        var zona = Ext.String.trim( evento.get( '_zon_cdescripcion' ) );
                        var suser = "";
                        var szona = "";
                        if( user != "" && user != "(0)" ) {
                            suser = "-" + getLocale( 'usuario' ) + ':' + evento.get( '_usu_cnombre' );
                        }
                        if( zona != "" && zona != "(0)" ) {
                            szona = "-" + getLocale( 'zona' ) + ':' + evento.get( '_zon_cdescripcion' );
                        }
                        qtipevento.push( fecha + '<b>' + alarma + '</b>' + '-' + evento.get( 'cod_cdescripcion' ) + suser + szona + '<br/>' );
                        return true;
                    } else {
                        return false;
                    }
                });
                if( fechaActual == fechaRow && hora > horaActual )
                    estado = 'sinEstado';
                console.log( "estado - - - ", estado )
                switch( estado ) {
                    case 'cerrado':
                        qtip = getLocale( 'Activado' ) + ' / ' + getLocale( 'Cerrado' ) + '<br/>';
                        cls = 'nohabilitado';
                        break;
                    case 'abierto':
                        qtip = getLocale( 'Desactivado' ) + ' / ' + getLocale( 'Abierto' ) + '<br/>';
                        cls = 'habilitado';
                        break;
                    case 'sinEstado':
                        qtip = getLocale( 'Sin calcular Estado' ) + ' <br/>';
                        cls = 'sinEstado';
                        break;
                }
                qtip = getLocale( qtip );
                row.set( horastr, {
                    qtip: qtip + qtipevento.reverse(),
                    estado: estado,
                    cls: cls,
                    eventos: aeventos,
                    options: eventos.options,
                    valor: ''
                })
            }
            if( d < days ) {
                controller.addFecha( view, d + 1, days, estado );
            } else {
                controller.enableChange( view );
            }
        }
    });
},
            
onItemClick: function(view, record, HTMLElement, index, e, eOpts ) {
    //console.log(arguments);
},
            
onBeforeload: function(store, operation, options ) {
    operation.store = store;
},
        
armarUrl: function(view ) {
    var record = view.record;
    var url = '/handler/ReporteGraficoHTML';
    // Obtencion de la FIRMA
    var objREPAUTFIRMA = getParametro( 'REPAUTFIRMA', true, true )
    var dealerFirma = record.get( 'cue_clinea' );
    dealerFirma = dealerFirma.replace( '&', '%26' );
    if( objREPAUTFIRMA.get( '_par_cvalor' ) ) {
        //si tengo el nuevo objeto
        if( objREPAUTFIRMA.get( '_par_cvalor' ).valor == 2 ) {
            //si es 2 uso el parametro dealer
            url = Ext.String.urlAppend( url, "dealerFirma=" + objREPAUTFIRMA.get( '_par_cvalor' ).dealer );
        } else if( objREPAUTFIRMA.get( 'par_ivalor' ) == 1 && dealerFirma ) {
            //si es uno uso ma misma cuenta
            url = Ext.String.urlAppend( url, "dealerFirma=" + dealerFirma );
        }
    } else if( objREPAUTFIRMA.get( 'par_ivalor' ) == 1 && dealerFirma ) {
        //si es uno uso ma misma cuenta y el parametro es viejo
        url = Ext.String.urlAppend( url, "dealerFirma=" + dealerFirma );
    }
    // Fechas Elegidas
    var fechadesde = view.down( '#fechadesde' ).getValue();
    var fechahasta = view.down( '#fechahasta' ).getValue();
    var horadesde = '00:00:00';
    var horahasta = '23:59:59';
    if( fechadesde ) {
        url = Ext.String.urlAppend( url, "FechaDesde=" + Ext.Date.format( new Date( fechadesde ), 'Y-m-d' ) + " " + horadesde );
    }
    if( fechahasta ) {
        url = Ext.String.urlAppend( url, "FechaHasta=" + Ext.Date.format( new Date( fechahasta ), 'Y-m-d' ) + " " + horahasta );
    }
    var url = Ext.String.urlAppend( url, "Cuentas=" + view.record.get( 'cue_iid' ) );
    url = Ext.String.urlAppend( url, '_dc=' + new Date().getTime() );
    url = url.replace( /#/g, '%23' );
    return url;
},
            
// Nuevo para la impresion del reporte
onImprimirClick: function (button ) {
    var view = button.up( 'reportegraficoview' );
    var url = this.armarUrl( view );
    console.log( url )
    var win = Ext.widget( 'window', {
        title: 'Imprimir',
        width: 800,
        height: 500,
        closable: true,
        layout: 'fit',
        closeAction: 'destroy',
        items: [ {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%',
            src: url,
            listeners: {
                afterrender: function() {
                    console.log( 'rendered' );
                    var elem = this.getEl();
                    var iframeF = document.getElementById( 'iframe-' + elem.id );
                    console.log( iframeF )
                    Ext.get( iframeF ).on( 'load', function() {
                        //console.log(view.body.dom.innerHTML);
                        //console.log(document.getElementById('iframe-'+elem.id).contentWindow.document.getElementById('pic'));
                        var div = document.getElementById( 'iframe-' + elem.id ).contentWindow.document.getElementById( 'pic' );
                        div.innerHTML = view.body.dom.innerHTML;
                    });
                }
            }
        }],
        dockedItems: [ {
            xtype: 'toolbar',
            dock: 'top',
            items: [ {
                text: 'Imprimir',
                iconCls: 'icon-printer',
                handler: function( button ) {
                    var iframe = button.up( 'window' ).down( '#Iframe' );
                    var ele = iframe.getEl();
                    document.getElementById( 'iframe-' + ele.id ).contentWindow.printMe();
                }
            }]
        }]
    })
    win.show();
},
// Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
onComboHistoricoSelect: function(combo, records, options ) {
    var controller = this;
    var view = combo.up( 'reportegraficoview' );
    var value = view.down( '#combohistorico' ).getValue();
    var fechadesde = view.down( '#fechadesde' );
    var fechahasta = view.down( '#fechahasta' );
    if( !value ) {
        fechadesde.setValue( '' );
        fechahasta.setValue( '' );
        var now = new Date();
        // Seteo el Min y Max a ambos combo.
        fechadesde.setMinValue( Ext.Date.getFirstDateOfMonth( now ) );
        fechadesde.setMaxValue( Ext.Date.getLastDateOfMonth( now ) );
        fechahasta.setMinValue( Ext.Date.getFirstDateOfMonth( now ) );
        fechahasta.setMaxValue( Ext.Date.getLastDateOfMonth( now ) );
        // Seteo la fecha en los combo del primer dia del mes y el de hoy
        fechadesde.setValue( Ext.Date.getFirstDateOfMonth( now ) );
        fechahasta.setValue( now );
        controller.setFechaDesde( Ext.Date.getFirstDateOfMonth( now ), view );
        controller.setFechaHasta( now, view );
    } else {
        var fechahistorico = value.match( /\d{4}/g ) + "-" + value.match( /\d{2}$/g );
        var month = value.match( /\d{2}$/g ) - 1;
        var fechahistoricodesde = Ext.Date.getFirstDateOfMonth( new Date( value.match( /\d{4}/g ), month ) );
        var fechahistoricohasta = Ext.Date.getLastDateOfMonth( new Date( value.match( /\d{4}/g ), month ) );
        fechadesde.setMinValue( fechahistoricodesde );
        fechadesde.setMaxValue( fechahistoricohasta );
        fechahasta.setMinValue( fechahistoricodesde );
        fechahasta.setMaxValue( fechahistoricohasta );
        controller.setFechaDesde( fechahistoricodesde, view );
        controller.setFechaHasta( fechahistoricohasta, view );
    }
    controller.loadData( view );
}
});