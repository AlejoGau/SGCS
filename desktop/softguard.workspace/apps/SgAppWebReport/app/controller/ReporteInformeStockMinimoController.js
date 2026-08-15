Ext.define('SgAppWebReport.controller.ReporteInformeStockMinimoController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['TablasProductosSearchModel'],
    views: ['ReporteInformeStockMinimoView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporteinformestockminimoview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaChanged
            },
            'reporteinformestockminimoview button[action=search]': {
                click: this.onSearchClick
            },
            'reporteinformestockminimoview button[action=todos]': {
                click: this.onTodosClick
            },
            'reporteinformestockminimoview [action=btnprint]': {
                click: this.onBtnprintClick
            }
        });

    }, // cierro init

    onBtnprintClick: function (button) {
        var view = button.up('reporteinformestockminimoview');
        var target = view.down('#Iframe');

        url = target.src;
        var contenido;
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) { //Obtenemos el valor devuelto.
                printHTMLContent(body);
                /*
                var win = Ext.create('Ext.window.Window', {
                    title: 'Mi ventana',
                    html: "",
                    modal: true,
                });
                // Abrir en una nueva pestaña
                contenido = body.replace('BODY', 'body onload="window.print()"')

                let myWindow = window.open();
                myWindow.document.write(contenido);
                myWindow.document.close();
                myWindow.focus();
                myWindow.print();
                */
            });
    },
    onSearchClick: function (button, event, options) {
        var controller = this;


        var view = button.up('reporteinformestockminimoview') ? button.up('reporteinformestockminimoview') : button;
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());


        var producto = view.down('#producto').getValue();
        console.log("PRODUCTO view - - - - ", view.down('#producto'))
        console.log("PRODUCTO FILTER - - - - ", producto)

        view.filters = [];


        if (producto) {
            url = Ext.String.urlAppend(url, "stt_idproducto=" + producto);
            view.filters.push({
                property: 'Id',
                value: producto
            })
        }

        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';


        if (view.filters.length > 0) {
            url = Ext.String.urlAppend(url, 'filter=' + Ext.encode(view.filters));

        }
        console.log("URL ---", url)
        target.load({
            src: url
        });


    },

    initView: function (view) {


        view.store = Ext.create('Ext.data.Store', {
            model: this.getTablasProductosSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'Status',
                    value: 1
                }
            ]
        })
        view.down('#producto').bindStore(view.store);

        view.store.load();




        view.baseurl = '/handler/ReporteInformeStockMinimoHTML';
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';



        this.onSearchClick(view)

    },
    onTodosClick: function (button) {
        var view = button.up('reporteinformestockminimoview');
        var controller = this;

        view.down('#producto').setValue('');


        controller.onSearchClick(view)

    }
});