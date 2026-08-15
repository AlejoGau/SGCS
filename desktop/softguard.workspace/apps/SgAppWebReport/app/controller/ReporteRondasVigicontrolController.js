Ext.define('SgAppWebReport.controller.ReporteRondasVigicontrolController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['ReporteRondasVigicontrolSearchModel'],
    views: ['ReporteRondasVigicontrolView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporterondasview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reporterondasview button[action=search]': {
                click: this.onSearchClick
            },
            'reporterondasview button[action=export]': {
                click: this.onExportClick
            },
            'reporterondasview button[action=seleccionarCuenta]': {
                click: this.onSeleccionarCuenta
            },
            'reporterondasview button[action=btnprint]': {
                click: this.onBtnprintClick
            },

        });

    }, // cierro init

    initView: function (view) {
        /* Cargo el Stored correspondiente a los usuarios de la cuenta, esto lo uso
         * para poder tener la informacion en el combo de usuario
         */
        var controller = this;

        /* Modifico el baseUrl al nuevo creado */
        view.baseurl = '/handler/ReporteRondasVigicontrolHTML';
        view.baseurlexport = '/handler/ReporteRondasVigicontrolHTMLExcel';
        var target = view.down('#Iframe');

        var url = view.baseurl
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        // seteo fecha desde y fecha hasta
        view.down('#fechaDesde').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -1));
        view.down('#fechaHasta').setValue(new Date());

        /* Llamo a la URL */
        controller.onSearchClick(view.down('#buscar'));
    },

    onBtnprintClick: function (button) {
        var view = button.up('reporterondasview');
        var iframeCmp = view.down('#Iframe');

        var iframeDom = iframeCmp.getEl().down('iframe').dom;

        iframeDom.contentWindow.focus();
        iframeDom.contentWindow.print();
    },


    onSearchClick: function (button, event, options) {
        var view = button.up('reporterondasview');

        /* Tomo los valores de los combo creado en la view */
        var objetivo = view.down('#idcuenta').getValue();
        var vigilador = view.down('#vigilador').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var HoraHasta = view.down('#horahasta').getValue();
        var HoraDesde = view.down('#horadesde').getValue();
        var cue_clinea = view.down('#cue_clinea').getValue();
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        var urlexport = view.baseurlexport;

        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if (vigilador) {
            url = Ext.String.urlAppend(url, "vigilador=" + vigilador);
            urlexport = Ext.String.urlAppend(urlexport, "vigilador=" + vigilador);
        }
        if (cue_clinea) {
            url = Ext.String.urlAppend(url, "cue_clinea=" + cue_clinea);
            urlexport = Ext.String.urlAppend(urlexport, "cue_clinea=" + cue_clinea);
        }

        if (objetivo) {
            url = Ext.String.urlAppend(url, "cuenta=" + objetivo);
            urlexport = Ext.String.urlAppend(urlexport, "cuenta=" + objetivo);
        }
        if (fechadesde) {
            // url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+"T"+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));
            url = Ext.String.urlAppend(url, "fechadesde=" + Ext.Date.format(fechadesde, 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraDesde), 'H:i:s'));
            urlexport = Ext.String.urlAppend(urlexport, "fechadesde=" + Ext.Date.format(fechadesde, 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraDesde), 'H:i:s'));
        }
        if (fechahasta) {
            url = Ext.String.urlAppend(url, "fechahasta=" + Ext.Date.format(fechahasta, 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraHasta), 'H:i:s'));
            urlexport = Ext.String.urlAppend(urlexport, "fechahasta=" + Ext.Date.format(fechahasta, 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraHasta), 'H:i:s'));
        }

        view.urltoexport = urlexport;

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        /* Llamo a la URL */
        target.load({
            src: url
        });

    },


    onSeleccionarCuenta: function (button, events, eOps) {
        var view = button.up('reporterondasview');
        //view.win = win;

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione Cuentas',
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
                    filterTipo: 'nofilter',
                    caller: view,
                    filterTipo: 5,
                    tip_ncondicion: "3"
                }
            ]
        });
        win.show();

    },

    onCuentaSelected: function (selection, view, recordPreSelected) {
        var controller = this;

        Ext.Array.each(selection, function (record) {
            var cueiid = record.get('cue_iid');
            var nombre = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');
            view.down('#idcuenta').setValue(cueiid)
            view.down('#nombrecuenta').setValue(nombre)
            view.down('#sacarcuenta').show();

        });
    },

    onExportClick: function (button) {
        var view = button.up('reporterondasview');
        if (view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurlexport;
        }

        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
        }
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        location.href = url;
    }
});