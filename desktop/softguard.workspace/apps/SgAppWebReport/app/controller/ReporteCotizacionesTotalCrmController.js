Ext.define('SgAppWebReport.controller.ReporteCotizacionesTotalCrmController', {
    extend: 'Ext.app.Controller',
    stores: ['OrderItemStatusStore'],
    models: [],
    views: ['ReporteCotizacionesTotalCrmView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reportecotizacionestotalcrmview': {
                afterrender: this.initView
            },
            'reportecotizacionestotalcrmview button[action=search]': {
                click: this.onSearchClick
            },
            'reportecotizacionestotalcrmview button[action=getall]': {
                click: this.onGetAllClick
            },
            'reportecotizacionestotalcrmview button[action=export]': {
                click: this.onExportClick
            },
            'reportecotizacionestotalcrmview button[action=btnprint]': {
                click: this.onBtnprintClick
            }
        });

    }, // cierro init

    limpiarfiltros: function (view) {
        /* limpio los filtros y sorters aplicados */
        view.filters = [];
        view.sorters = [];
        return view;
    },

    limpiarcampos: function (view) {
        /* Limpio los campos */
        var date = view.down('#date').setValue('');
        var datecreate = view.down('#datecreate').setValue('');
        return;
    },

    checkvalue: function (view) {
        /* Tomo los valores de los combo creado en la view */
        var date = view.down('#date').getValue();
        var datecreate = view.down('#datecreate').getValue();

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;

        if (date) {
            /* Sirve para dibujar la fecha en el header */
            url = Ext.String.urlAppend(url, 'fechaprobable=' + Ext.Date.format(date, 'Y-m-d'));

            view.filters.push({
                property: 'o.ForecastDate',
                value: Ext.Date.format(date, 'Y-m-d H:i:s')
            });
            view.sorters.push({
                property: 'o.ForecastDate',
                direction: 'DESC'
            })
        }
        if (datecreate) {
            /* Sirve para dibujar la fecha en el header */
            url = Ext.String.urlAppend(url, 'fechaalta=' + Ext.Date.format(datecreate, 'Y-m-d'));

            view.filters.push({
                property: 'o.DateCreated',
                value: Ext.Date.format(datecreate, 'Y-m-d H:i:s')
            });
            view.sorters.push({
                property: 'o.DateCreated',
                direction: 'DESC'
            })
        }

        if (view.filters.length > 0) {
            url = Ext.String.urlAppend(url, 'filter=' + Ext.encode(view.filters));
        }
        if (view.sorters.length > 0) {
            url = Ext.String.urlAppend(url, 'sort=' + Ext.encode(view.sorters));
        }

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        return url;
    },

    initView: function (view) {
        var controller = this;

        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);

        /* Modifico el baseUrl al nuevo creado */
        view.baseurl = '/handler/ReporteCotizacionesTotalCrmHTML';
        var url = view.baseurl;
        var target = view.down('#Iframe');
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());


        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
        target.load({
            src: url
        });
    },
    onBtnprintClick: function (button) {
        var view = button.up('horasvigiladorpornombreobjetivoview');
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


    onSearchClick: function (button, event, options) {
        var view = button.up('reportecotizacionestotalcrmview');
        var controller = this;

        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);

        /* Tomo los valores de los combo creado en la view */
        var url = controller.checkvalue(view);
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        /* Llamo a la URL */
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        });

    },

    onExportClick: function (button) {
        var view = button.up('reportecotizacionestotalcrmview');
        var controller = this;

        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);

        /* Tomo los valores de los combo creado en la view */
        var url = controller.checkvalue(view);

        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
        }

        location.href = url;
    },

    onGetAllClick: function (button, event, options) {
        var view = button.up('reportecotizacionestotalcrmview');
        var controller = this;

        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);
        controller.limpiarfiltros(view);
        controller.limpiarcampos(view);

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        url = Ext.String.urlAppend(url, 'filter=' + Ext.encode(view.filters));

        var target = view.down('#Iframe');
        /* Llamo a la URL */
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        });
    }
});