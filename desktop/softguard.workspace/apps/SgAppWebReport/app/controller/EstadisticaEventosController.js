Ext.define('SgAppWebReport.controller.EstadisticaEventosController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['TablaHistoricoSearchModel'],
    views: ['EstadisticaEventosView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'estadisitcaseventosview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaChanged,
                selectedEvents: this.eventsSelected
            },
            'estadisitcaseventosview button[action=search]': {
                click: this.onSearchClick
            },
            'estadisitcaseventosview button[action=btnprint]': {
                click: this.onBtnprintClick
            },            
            'estadisitcaseventosview button[action=todos]': {
                click: this.onTodosClick
            },
            'estadisitcaseventosview #selcuenta': {
                click: this.onBuscarPorCuentaClick
            },
            'estadisitcaseventosview #evento': {
                click: this.onEventoClick
            },
            'estadisitcaseventosview #limpiarevento': {
                click: this.onLimpiarEventoClick
            },
            'estadisitcaseventosview #combohistorico': {
                select: this.onComboHistoricoSelect,
                change: this.onCleanDates
            }
        });

    }, // cierro init

    onLimpiarEventoClick: function (btn) {
        var view = btn.up('estadisitcaseventosview');
        view.down('#nombreevento').setValue('')
        view.down('#codevento').setValue('')
    },

    eventsSelected: function (record, view) {
        view.down('#nombreevento').setValue(record.get('Descripcion'))
        view.down('#codevento').setValue(record.get('cod_ccodigo'))
    },

    onEventoClick: function (btn) {
        var view = btn.up('estadisitcaseventosview');
        var myWindow = Ext.widget('window', {
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true,
            items: [{
                xtype: 'eventselecterhelperview',
                caller: view,
                filter: [{ property: 'cod_nManual', value: 1 }],
                simpleSelect: true

            }],
            layout: 'fit'
        }).show();

        myWindow.on('selectedEvents', function () {
            console.log(arguments)
        })

    },

    onBuscarPorCuentaClick: function (button, event, options) {
        var view = button.up('estadisitcaseventosview');
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

    onCuentaChanged: function (cuenta, view) {
        var gridview = view.up('viewport').down('estadisitcaseventosview');

        // gridview.down('#nombrecuenta').setValue(cuenta.get('Name'));
        gridview.down('#idcuenta').setValue(cuenta.get('Id'));

        var filters = [];
        if (cuenta.get('Id')) {
            filters.push({
                property: 'rec_iidcuenta',
                value: cuenta.get('Id'),
                id: 'cuenta'
            });
        }

        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        target.load({
            src: url
        });
    },

    initView: function (view) {
        view.baseurl = '/handler/EstadisitcasEventosHTML';

        //this.onSearchClick(view)
        var target = view.down('#Iframe');
        target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        var controller = this
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=' +  controller.application.getToken());
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title=' + Ext.encode('Estadistica eventos'));
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());

        var now = new Date();
        url = Ext.String.urlAppend(url, "rec_tfechahoraDesde=" + Ext.Date.format(Ext.Date.add(now, Ext.Date.DAY, -1), 'Y-m-d H:i:s'));

        view.down('#fechadesde').setValue(Ext.Date.add(now, Ext.Date.DAY, -1))
        view.down('#horadesde').setValue(Ext.Date.format(now, 'H:i'))

        url = Ext.String.urlAppend(url, "rec_tfechahoraHasta=" + Ext.Date.format(now, 'Y-m-d H:i:s'));

        view.down('#fechahasta').setValue(now)
        view.down('#horahasta').setValue(Ext.Date.format(now, 'H:i'))


        var historicoStore = Ext.create('Ext.data.Store', {
            model: this.getTablaHistoricoSearchModelModel(),
            autoload: false,
            sorters: [{
                property: 'c_periodo',
                direction: 'DESC'
            }],
            pageSize: 10000
        });
        var comboHistorico = view.down('#combohistorico');
        comboHistorico.bindStore(historicoStore);
        historicoStore.load();

        target.load({
            src: url
        });
        //target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale('Cargando') + '</h1>';


    },

    onSearchClick: function (button, event, options) {
        var view = button.up('estadisitcaseventosview');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
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
        var combohistorico = view.down('#combohistorico').getValue();

        view.filters = [];

        if (fechadesde) {
            url = Ext.String.urlAppend(url, "rec_tfechahoraDesde=" + Ext.Date.format(new Date(fechadesde), 'Y-m-d') + " " + Ext.Date.format(new Date(HoraDesde), 'H:i:s'));
        }

        if (fechahasta) {
            url = Ext.String.urlAppend(url, "rec_tfechahoraHasta=" + Ext.Date.format(new Date(fechahasta), 'Y-m-d') + " " + Ext.Date.format(new Date(HoraHasta), 'H:i:s'));
        }


        if (dealerdesde)
            url = Ext.String.urlAppend(url, "cue_lineaDesde=" + dealerdesde);

        if (dealerhasta)
            url = Ext.String.urlAppend(url, "cue_lineaHasta=" + dealerhasta);

        if (cuentadesde)
            url = Ext.String.urlAppend(url, "cuentaDesde=" + cuentadesde);

        if (cuentahasta)
            url = Ext.String.urlAppend(url, "cuentaHasta=" + cuentahasta);

        if (codevento)
            url = Ext.String.urlAppend(url, "codEvento=" + codevento);

        if (nombrecuenta)
            url = Ext.String.urlAppend(url, "nombreCuenta=" + nombrecuenta);

        if (combohistorico) {
            url = Ext.String.urlAppend(url, "table=" + combohistorico);
        }

        var target = view.down('#Iframe');

        //target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale('Cargando') + '</h1>';

        if (view.filters.length > 0) {
            url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(view.filters));

        target.getDocument().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + '//' + window.location.hostname + '/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';

        }
        target.load({
            src: url
        });
    },
    onBtnprintClick: function (button) {
        var view = button.up('estadisitcaseventosview');
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

    onTodosClick: function (button) {
        var view = button.up('ordenservtecview');
        var filters = [];
        var target = view.down('#Iframe');
        target.load({
            src: view.baseurl + '?Filter=' + Ext.encode(filters)
        });
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
    },

    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('estadisitcaseventosview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');

        if (!value) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Seteo el Min y Max a ambos combo.
            fechadesde.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechadesde.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            fechahasta.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));

            // Seteo la fecha en los combo del primer dia del mes y el de hoy
            fechadesde.setValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setValue(new Date());

        }

    },

    onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('estadisitcaseventosview');

        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');

        if (value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#fechadesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#fechahasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
        }

        if (value) {
            var fechahistorico = value.match(/\d{4}/g) + "-" + value.match(/\d{2}$/g);
            var month = value.match(/\d{2}$/g) - 1;


            var fechahistoricodesde = Ext.Date.getFirstDateOfMonth(new Date(value.match(/\d{4}/g), month));
            var fechahistoricohasta = Ext.Date.getLastDateOfMonth(new Date(value.match(/\d{4}/g), month));

            /* 
            fechadesde.setValue(fechahistoricodesde);
            fechahasta.setValue(fechahistoricohasta);
            */

            fechadesde.setMinValue(fechahistoricodesde);
            fechadesde.setMaxValue(fechahistoricohasta);
            fechahasta.setMinValue(fechahistoricodesde);
            fechahasta.setMaxValue(fechahistoricohasta);


            if (fechadesde.getValue() || fechahasta.getValue()) {

                if (fechadesde.getValue() && new Date(fechadesde.getValue()).getTime() < fechahistoricodesde) {
                    fechadesde.markInvalid("Se encuentra fuera de rango");
                }

                if (fechahasta.getValue() && new Date(fechahasta.getValue()).getTime() > fechahistoricohasta) {
                    fechahasta.markInvalid("Se encuentra fuera de rango");
                }

            } else {
                fechadesde.setValue(fechahistoricodesde);
                fechahasta.setValue(fechahistoricohasta);
            }
        }
        view.dateSelected = value;
    }

});