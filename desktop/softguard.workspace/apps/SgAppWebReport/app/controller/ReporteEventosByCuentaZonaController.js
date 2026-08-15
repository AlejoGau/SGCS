Ext.define('SgAppWebReport.controller.ReporteEventosByCuentaZonaController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'TablaHistoricoSearchModel', 'TablasGruposSearchModel' ],
views: [ 'ReporteEventosByCuentaZonaView' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'eventosbycuentazonaview': {
            afterrender: this.initView
        },
        '#winfiltro': {
            cuentachanged: this.onCuentaChanged,
            selectedEvents: this.eventsSelected
        },
        'eventosbycuentazonaview button[action=search]': {
            click: this.onSearchClick
        },
        'eventosbycuentazonaview button[action=todos]': {
            click: this.onTodosClick
        },
        '#winfiltro #selcuenta': {
            click: this.onBuscarPorCuentaClick
        },
        '#winfiltro #evento': {
            click: this.onEventoClick
        },
        '#winfiltro #limpiarevento': {
            click: this.onLimpiarEventoClick
        },
        'eventosbycuentazonaview button[action=mail]': {
            click: this.onMailClick
        },
        'eventosbycuentazonaview #abrirfiltros': {
            click: this.onAbrirFiltrosClick
        },
        'eventosbycuentazonaview button[action=btnprint]': {
            click: this.onBtnprintClick
        },         
        /* Nuevo boton para exportar a Excel */

        'eventosbycuentazonaview button[action=export]': {
            click: this.onExportClick
        }
    });

}, // cierro init

onBtnprintClick: function (button) {
    var view = button.up('eventosbycuentazonaview');
    var target = view.down('#Iframe');
    url = target.src;
    var contenido;
    fetch(url)
    .then(function (response) {
        return response.text();
    })
    .then(function (body) { 
        printHTMLContent(body);
        /*
        var win = Ext.create('Ext.window.Window', {
                title: 'Mi ventana',
                html: "",
                modal: true,
    });
    contenido = body.replace('body', 'body onload="window.print(); window.onafterprint = function() { window.close(); }"')
        let myWindow = window.open('', '', 'width=600,height=400');
        if (myWindow) {
            let doc = myWindow.document;
            doc.open();
            doc.write(contenido);
            doc.close();
        } else {
            console.error('No se pudo abrir la ventana.');
        }
        //win.printMe();
        */
    });
},

onAbrirFiltrosClick: function (btn ) {
    var view = btn.up('eventosbycuentazonaview');
    var controller = this;
    var win = Ext.create('Ext.Window', {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        title: 'Filtros',
        height: 480,
        width: 850,
        autoScroll: true,
        modal: true,
        itemId: 'winfiltro',
        padding: '5',
        items: [ {
            xtype: 'form',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Eventos',
                    items: [

                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Desde',
                                    name: "fechadesde",
                                    bindToModel: false,
                                    itemId: 'fechadesde',
                                    labelWidth: 50,
                                    width: 250
                                }, {
                                    fieldLabel: 'Hora',
                                    xtype: 'timefield',
                                    itemId: 'horadesde',
                                    format: 'H:i',
                                    altFormats: 'H:i',
                                    increment: 10,
                                    labelWidth: 40,
                                    width: 120,
                                    margin: '0 0 0 7'
                                }
                            ]
                        }, {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Hasta',
                                    itemId: 'fechahasta',
                                    bindToModel: false,
                                    name: "fhasta",
                                    labelWidth: 50,
                                    width: 250
                                }, {
                                    fieldLabel: 'Hora',
                                    xtype: 'timefield',
                                    itemId: 'horahasta',
                                    format: 'H:i',
                                    altFormats: 'H:i',
                                    increment: 10,
                                    labelWidth: 40,
                                    width: 120,
                                    margin: '0 0 0 7'
                                }
                            ]
                        }

                    ]
                }, {
                    xtype: 'eventselecterfield',
                    layout: 'hbox',
                    title: 'Eventos',
                    margin: '0 0 5 0',
                    items: [ {
                        xtype: 'button',
                        itemId: 'evento',
                        text: 'Seleccione un evento',
                        margin: '0 10 0 0'
                    }, {
                            xtype: 'button',
                            itemId: 'deleteEvent',
                            iconCls: 'icon-cancel',
                            margin: '0 5 0 0',
                            hidden: true
                        }, {
                            xtype: 'displayfield',
                            itemId: 'nombreevento',
                            style: {
                                wordBreak: 'break-word',
                                wordWrap: 'break-word'
                            }
                        }, {
                            xtype: 'displayfield',
                            itemId: 'codevento',
                            hidden: true
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    itemId: 'dealerbloque',
                    title: 'Dealer',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Dealer desde',
                                    itemId: 'dealerdesde',
                                    width: 150,
                                    labelWidth: 80
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: ' - Dealer hasta',
                                    itemId: 'dealerhasta',
                                    width: 150,
                                    labelWidth: 80
                                }
                            ]
                        }

                    ]
                }, {
                    xtype: 'fieldset',
                    itemId: 'rango',
                    title: 'Cuentas',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            items: [

                                {
                                    xtype: 'textfield',
                                    itemId: 'cuentadesde',
                                    fieldLabel: 'Cuenta desde',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 150,
                                    margin: '0 0 0 7',
                                    labelWidth: 80
                                }, {
                                    xtype: 'textfield',
                                    itemId: 'cuentahasta',
                                    fieldLabel: ' - Cuenta hasta',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 150,
                                    labelWidth: 80
                                }
                            ]
                        }, {
                            xtype: 'textfield',
                            itemId: 'nombrecuenta',
                            width: '100%',
                            fieldLabel: 'Nombre'
                        }

                    ]
                }, {

                    xtype: 'combo',
                    itemId: 'grupos',
                    fieldLabel: 'Grupo',
                    displayField: 'gru_cdescripcion',
                    valueField: 'gru_ccodigo',
                    queryMode: 'gru_ccodigo',
                    width: '100%',
                    name: 'combogrupo'

                }




            ],
            tbar: [
                {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search',
                    listeners: {
                        click: function() {


                            var codevento = win.down('#codevento').getValue();
                            var grupo = win.down('#grupos').getValue();


                            if( !grupo && !codevento ) {
                                notify('Necesita seleccionar un grupo o un evento para continuar');
                                return false;
                            }

                            controller.onSearchClick( win, view )
                            win.hide()
                        }
                    }
                }
            ]
        }
        ]
    }).show();


    var comboGrupos = win.down('#grupos');
    var combostore = Ext.create('Ext.data.Store', {
        model: this.getTablasGruposSearchModelModel(),
        pageSize: 200,
        remoteSort: true
    });
    comboGrupos.bindStore( combostore );
    combostore.load();


    if( !win.down('#horadesde').getValue() && !win.down('#horahasta').getValue() ) {
        var now = new Date()
        win.down('#fechadesde').setValue( Ext.Date.add( now, Ext.Date.DAY, -1 ) )
        win.down('#horadesde').setValue( Ext.Date.format( now, 'H:i') )

        win.down('#fechahasta').setValue( now )
        win.down('#horahasta').setValue( Ext.Date.format( now, 'H:i') )
    }


},
    
    
onLimpiarEventoClick: function (btn ) {
    var view = btn.up('window');
    view.down('#nombreevento').setValue('');
    view.down('#codevento').setValue('');
},
    
eventsSelected: function(record, view ) {
    view.down('#nombreevento').setValue( record.get('Descripcion') )
    view.down('#codevento').setValue( record.get('cod_ccodigo') )
},  
    
onEventoClick: function (btn ) {
    /** 
    var view = btn.up('window');
    
    
     var myWindow = Ext.widget('window',{
        title: 'Selector de eventos',
        height: 400,
        width: 900,
        //autoScroll: true,
        modal: true, 
        items: [{
            xtype: 'eventselecterhelperview',
            caller: view,
            simpleSelect: true
            
        }],
        layout: 'fit'
    }).show();
    
    
    
    myWindow.on('selectedEvents',function () {
     console.log(arguments)
    })
    
        
    */
},
    
    
onBuscarPorCuentaClick: function(button, event, options ) {

    var view = button.up('eventosbycuentazonaview');


    var win = Ext.create('Ext.Window', {
        layout: 'fit',
        title: 'Seleccione una Cuenta',
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
    
    
onCuentaChanged: function(cuenta, view ) {
    var gridview = view.up('viewport').down('eventosbycuentazonaview');


    // gridview.down('#nombrecuenta').setValue(cuenta.get('Name'));
    gridview.down('#idcuenta').setValue( cuenta.get('Id') );

    var filters = [];
    if( cuenta.get('Id') ) {
        filters.push( {
            property: 'rec_iidcuenta',
            value: cuenta.get('Id'),
            id: 'cuenta'
        });
    }


    var target = view.down('#Iframe');
    var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );
    url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( filters ) );

    target.load({
        src: url
    }); 
},
    
initView: function(view ) {

    view.baseurl = '/handler/ReporteEventosByCuentaZonaHTML';
    var target = view.down('#Iframe');
    var controller = this
    view.baseurl = Ext.String.urlAppend( view.baseurl, 'token=' +  controller.application.getToken());//Ext.util.Cookies.get('OAuth_Token') );
   // notify( 'No se cargo el id del operador' )

   // var url = Ext.String.urlAppend( view.baseurl, '_dc=' + new Date().getTime() );



   // var now = new Date();
   //  url = Ext.String.urlAppend(url,"rec_tfechahoraDesde="+Ext.Date.format(Ext.Date.add(now, Ext.Date.DAY, -1),'Y-m-d H:i:s'));
         
     //view.down('#fechadesde').setValue(Ext.Date.add(now, Ext.Date.DAY, -1))
     //view.down('#horadesde').setValue(Ext.Date.format(now,'H:i'))
     
     //url = Ext.String.urlAppend(url,"rec_tfechahoraHasta="+Ext.Date.format(now,'Y-m-d H:i:s'));
     
     //view.down('#fechahasta').setValue(now)
     //view.down('#horahasta').setValue(Ext.Date.format(now,'H:i'))

    // target.load({
    //    src: url
    //});
    // target.setSrc(url);

    /* 
      var historicoStore = Ext.create('Ext.data.Store',{
         model: this.getTablaHistoricoSearchModelModel(),
         autoload: false
     });
     var comboHistorico = view.down('#combohistorico');
     comboHistorico.bindStore(historicoStore);        
     historicoStore.load();
            
           */
    target.getDoc().getElementsByTagName('body')[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;">' + getLocale('Recuerde que es necesario configurar los parametros de busqueda antes de efectuar el reporte.') + '</h1>';





},
    
onSearchClick: function(win, viewReporte ) {

    var view = win;
    var url = Ext.String.urlAppend( viewReporte.baseurl, '_dc=' + new Date().getTime() );

    var fechadesde = view.down('#fechadesde').getValue();
    var fechahasta = view.down('#fechahasta').getValue();
    var HoraDesde = view.down('#horadesde').getValue();
    var HoraHasta = view.down('#horahasta').getValue();
    var dealerdesde = view.down('#dealerdesde').getValue();
    var dealerhasta = view.down('#dealerhasta').getValue();
    var cuentadesde = view.down('#cuentadesde').getValue();
    var cuentahasta = view.down('#cuentahasta').getValue();
    var codevento = view.down('#codevento').getValue();
    var nombrecuenta = view.down('#nombrecuenta').getValue();
    var grupo = view.down('#grupos').getValue();
    var codigos = [];
    view.filters = [];

    if( !grupo && !codevento ) {
        notify('Necesita seleccionar un grupo o un evento para continuar');
        return false;

    }


    if( grupo ) {
        url = Ext.String.urlAppend( url, "group=" + grupo );
        url = Ext.String.urlAppend( url, "groupRaw=" + view.down('#grupos').getRawValue() );
    }

    if( fechadesde ) {
        url = Ext.String.urlAppend( url, "rec_tfechahoraDesde=" + Ext.Date.format( new Date( fechadesde ), 'Y-m-d') + " " + Ext.Date.format( new Date( HoraDesde ), 'H:i:s') );
    }

    if( fechahasta ) {
        url = Ext.String.urlAppend( url, "rec_tfechahoraHasta=" + Ext.Date.format( new Date( fechahasta ), 'Y-m-d') + " " + Ext.Date.format( new Date( HoraHasta ), 'H:i:s') );
    }


    if( dealerdesde )
        url = Ext.String.urlAppend( url, "cue_lineaDesde=" + dealerdesde );



    if( dealerhasta )
        url = Ext.String.urlAppend( url, "cue_lineaHasta=" + dealerhasta );


    if( cuentadesde )
        url = Ext.String.urlAppend( url, "cuentaDesde=" + cuentadesde );



    if( cuentahasta )
        url = Ext.String.urlAppend( url, "cuentaHasta=" + cuentahasta );

    if( codevento )
        var codigos = codevento.split( "," )


    //Le doy a los codigos formato para el sql
    var sqlFormat = ""
    codigos.forEach( element => {
        sqlFormat = sqlFormat + "'" + element + "',"
    });
    sqlFormat = sqlFormat.slice( 0, -1 );

    url = Ext.String.urlAppend( url, "codEvento=" + sqlFormat );

    if( nombrecuenta )
        url = Ext.String.urlAppend( url, "nombreCuenta=" + nombrecuenta );

    var target = viewReporte.down('#Iframe');

    //target.getDoc().getElementsByTagName('body')[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale('Cargando') + '</h1>';

    if( view.filters.length > 0 ) {
        url = Ext.String.urlAppend( url, 'Filter=' + Ext.encode( view.filters ) );
    }

    url = url.replace( /#/g, '%23');

    target.load({
        src: url
    });

    /* Le sumo a la view el UrlToExport */
    viewReporte.urltoexport = url;
},
    
    
onTodosClick: function(button ) {
    var view = button.up('eventosbycuentazonaview');


    var filters = [];

    var target = view.down('#Iframe');

    target.load({
        src: view.baseurl + '?Filter=' + Ext.encode( filters )
    }); 
    view.down('#fechadesde').setValue('');
    view.down('#fechahasta').setValue('');



},
    
onMailClick: function (button ) {
    var view = button.up('eventosbycuentazonaview');
    var iframe = view.down('#Iframe');
    var mailbody = document.getElementById('iframe-' + iframe.getEl().id ).contentWindow.document.documentElement.innerHTML;


    Ext.Ajax.request( {
        url: '/Rest/t_parametros/',
        //params: { filter: '[{"property":"par_ccodigo", "value":"MAILSENDERNAME"}]' },
        method: 'GET',
        scope: this,
        success: function( response ) {
            var from = Ext.JSON.decode( response.responseText ).rows[ 0 ].par_cvalor;
            var mail = Ext.widget('mailformview', {
                mailbody: mailbody,
                from: from,
                autoScroll: true,
                subject: getLocale('Reporte de eventos por cuenta y zona')
            });

            var win = Ext.widget('window', {
                title: 'Envío de correo',
                layout: 'fit',
                items: mail,
                width: 600,
                height: 600
            }).show();
        }
    });



},
    
    
/* Funcion para exportar a Excel */
onExportClick: function (button ) {
    var view = button.up('eventosbycuentazonaview');
    var url = view.urltoexport;

    console.log( view );
    console.log( url );

    /* Agrego flag de Export */
    var exportToExcel = 'yes';
    if( exportToExcel ) {
        url = Ext.String.urlAppend( url, "exportToExcel=" + exportToExcel );
    }
    location.href = url;

}
        
    
});