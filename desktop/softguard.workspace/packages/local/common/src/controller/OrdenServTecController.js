//MIGRADO2024
Ext.define( 'Common.controller.OrdenServTecController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'TecnicosSearchModel', 'ServTecVisitaSearchModel' ],
views: [ 'OrdenServTecView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'ordenservtecview': {
            afterrender: this.initView,
            cuentachanged: this.onCuentaChanged
        },
        'ordenservtecview button[action=search]': {
            click: this.onSearchClick
        },
        'ordenservtecview button[action=todos]': {
            click: this.onTodosClick
        },
        'ordenservtecview button[action=buscarporcuenta]': {
            click: this.onBuscarPorCuentaClick
        },
        'ordenservtecview button[action=cancelado]': {
            click: this.onCanceladoClick
        },
        'ordenservtecview button[action=pendiente]': {
            click: this.onPendienteClick
        },
        'ordenservtecview button[action=finalizado]': {
            click: this.onFinalizadoClick
        },
        'ordenservtecview button[action=asignado]': {
            click: this.onAsignadoClick
        },
        'ordenservtecview button[action=enejecucion]': {
            click: this.onEnEjecucionClick
        },
        'ordenservtecview #mail': {
            click: this.onMailClick
        }
    });
}, // cierro init
onMailClick: function (button ) {
    var view = button.up( 'ordenservtecview' );
    var iframe = view.down( '#Iframe' );
    //var mailbody = document.getElementById( 'iframe-' + iframe.getEl().id ).contentWindow.document.documentElement.innerHTML;
  
    /*
    var ele = iframe.getEl();
    var vect = ele.id.split("-");
    var id = 'uxiframe-' + vect[1] + '-iframeEl';
    var frame = document.getElementById(id);//.contentWindow.printMe();    
    var mailbody = frame.ownerDocument.documentElement.innerHTML;
    */
    
    fetch(iframe.src)
    .then(function (response) { 
        return response.text();
    }).then(function (body) {
        var mailbody = body;   
        var from = getParametro( 'MAILSENDER' );
        var mail = Ext.widget( 'mailformview', {
            mailbody: mailbody,
            from: from,
            to: view.record.get( 'lin_cmail' ),
            autoScroll: true,
            subject: view.up( 'window' ).title,
            cue_iid: view.record.get( 'cue_iid' )
        });
        var win = Ext.widget( 'window', {
            title: 'Envío de correo',
            layout: 'fit',
            items: mail,
            width: 600,
            height: 600
        }).show();         
    } );

    

},
        
initView: function(view ) {
    //view.getHeader().hide();
    var record = view.record;
    //var estado = record.get('_stc_estadodescripcion');
    if( view.record ) {
        var filters = [ {
            property: 'svi_iServicio',
            value: view.record.get( 'stc_iid' )
        }]
    } else {
        var filters = view.filters
    }
    const filtros = {
        property: 'svi_iServicio',
        value: []
    }
    if( view.filters.length >= 1 ) {
        view.filters.map( filter => {
            filtros.value.push( filter.value )
        })
    }
    var visitaStore = Ext.create( 'Ext.data.Store', {
        model: this.getServTecVisitaSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        timelineincluded: 0,
        filters: filtros,
        timelineincluded: 0
    })
    var filters = {
        property: 'stc_iid',
        value: []
    }
    //hago este map porque cuando le pasaba muchos filtros la url era muy larga y rompia
    view.filters.map(( filter ) => filters.value.push( filter.value ) )
    visitaStore.load( {
        callback: function( records ) {
            view.baseurl = '/handler/OrdenSerTecHtml';
            var target = view.down( '#Iframe' );
            if( view.filters ) {
                if( view.filters.lenght <= 0 ) {
                    filters.push( {
                        property: 'cue_dfechaalta:GT',
                        value: new Date(),
                        id: 'fechadesde'
                    });
                }
                
                view.baseurl = Ext.String.urlAppend( view.baseurl, 'Filter=' + Ext.encode( filters ) );
                var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
                url = Ext.String.urlAppend( url, 'accionPrint=' + view.accionPrint );
                //target.setSrc( url );
                target.load({
                    src: url
                });
            }
        }
    })
    if( view.hidePrint ) {
        view.down( '#mail' ).hide()
    }
    /* if( estado =='Asignado' || estado =='En Ejecución') {
        view.baseurl = '/handler/OrdenSerTecHtml';
    } else {
        view.baseurl = '/handler/OrdenSerTecSinVisitaHtml';
    }*/
    /*        
    var droptecnicos = view.down('#tecnicos');
    
    view.storedropdown =Ext.create('Ext.data.Store',{
        model: this.getTecnicosSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true
    })
    droptecnicos.bindStore(view.storedropdown);
    view.storedropdown.load();*/
},
        
onSearchClick: function(button, event, options ) {
    var view = button.up( 'ordenservtecview' );
    var fechadesde = view.down( '#fechadesde' ).getValue();
    var fechahasta = view.down( '#fechahasta' ).getValue();
    var instaldores = view.down( '#tecnicos' ).getValue();
    var numero = view.down( '#numero' ).getValue();
    view.filters = [];
    var cuenta = view.down( '#idcuenta' );
    if( cuenta && cuenta.getValue() ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.getValue(),
            id: 'cuenta'
        });
    }
    if( fechadesde )
        view.filters.push( {
            property: 'cue_dfechaalta:GT',
            value: fechadesde,
            id: 'fechadesde'
        });
    if( fechahasta )
        view.filters.push( {
            property: 'cue_dfechaalta:LT',
            value: fechahasta,
            id: 'fechahasta'
        });
    if( instaldores )
        view.filters.push( {
            property: 'stc_ctecnico_1',
            value: instaldores,
            id: 'tecnicos'
        });
    if( numero )
        view.filters.push( {
            property: 'stc_inumero',
            value: numero,
            id: 'tecnicos'
        });
    var target = view.down( '#Iframe' );
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    if( view.filters.length > 0 ) {
        url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    }
    target.setSrc( url );
},
        
        
onTodosClick: function(button ) {
    var view = button.up( 'ordenservtecview' );
    view.filters = [];
    var target = view.down( '#Iframe' );
    target.setSrc( view.baseurl + '?Filter=' + Ext.encode( view.filters ) );
    view.down( '#fechadesde' ).setValue( '' );
    view.down( '#fechahasta' ).setValue( '' );
    view.down( '#finalizado-btn' ).toggle( false );
    view.down( '#pendiente-btn' ).toggle( false );
    view.down( '#cancelado-btn' ).toggle( false );
},
        
onBuscarPorCuentaClick: function(button, event, options ) {
    var view = button.up( 'ordenservtecview' );
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Selec una Cuenta',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'cuentahelperview',
                tip_ncondicion: "0",
                caller: view
            }
        ]
    });
    win.show();
},
        
onObjectChanged: function(cuenta, view ) {
    var gridview = view.up( 'viewport' ).down( 'ordenservtecview' );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.doRefresh();
},
        
onCuentaChanged: function(cuenta, view ) {
    var gridview = view.up( 'viewport' ).down( 'ordenservtecview' );
    gridview.down( '#nombrecuenta' ).setValue( cuenta.get( 'Name' ) );
    gridview.down( '#idcuenta' ).setValue( cuenta.get( 'Id' ) );
    view.filters = [];
    if( cuenta.get( 'Id' ) ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.get( 'Id' ),
            id: 'cuenta'
        });
    }
    var target = view.down( '#Iframe' );
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    target.setSrc( url );
},
        
onCanceladoClick: function(button, event, options ) {
    var view = button.up( 'ordenservtecview' );
    var cuenta = view.down( '#idcuenta' );
    view.filters = [];
    if( cuenta && cuenta.getValue() ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.getValue(),
            id: 'cuenta'
        });
    }
    view.filters.push( {
        property: 'stc_nestado',
        value: 3
    });
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    var target = view.down( '#Iframe' );
    target.setSrc( url );
},
        
onPendienteClick: function(button, event, options ) {
    var view = button.up( 'ordenservtecview' );
    //var store = view.getStore();
    //store.filters.clear();
    var cuenta = view.down( '#idcuenta' );
    view.filters = [];
    if( cuenta && cuenta.getValue() ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.getValue(),
            id: 'cuenta'
        });
    }
    view.filters.push( {
        property: 'stc_nestado',
        value: 1
    });
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    var target = view.down( '#Iframe' );
    target.setSrc( url );
},
        
        
onFinalizadoClick: function(button, event, options ) {
    var view = button.up( 'ordenservtecview' );
    //var store = view.getStore();
    //store.filters.clear();   
    var cuenta = view.down( '#idcuenta' );
    view.filters = [];
    if( cuenta && cuenta.getValue() ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.getValue(),
            id: 'cuenta'
        });
    }
    view.filters.push( {
        property: 'stc_nestado',
        value: 4
    });
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    var target = view.down( '#Iframe' );
    target.setSrc( url );
},
        
onEnEjecucionClick: function(button, event, options ) {
    var view = button.up( 'ordenservtecview' );
    //var store = view.getStore();
    //store.filters.clear();   
    var cuenta = view.down( '#idcuenta' );
    view.filters = [];
    if( cuenta && cuenta.getValue() ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.getValue(),
            id: 'cuenta'
        });
    }
    view.filters.push( {
        property: 'stc_nestado',
        value: 5
    });
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    var target = view.down( '#Iframe' );
    target.setSrc( url );
},
        
onAsignadoClick: function(button, event, options ) {
    var view = button.up( 'ordenservtecview' );
    //var store = view.getStore();
    //store.filters.clear();   
    var cuenta = view.down( '#idcuenta' );
    view.filters = [];
    if( cuenta && cuenta.getValue() ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.getValue(),
            id: 'cuenta'
        });
    }
    view.filters.push( {
        property: 'stc_nestado',
        value: 2
    });
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    var target = view.down( '#Iframe' );
    target.setSrc( url );
}
});