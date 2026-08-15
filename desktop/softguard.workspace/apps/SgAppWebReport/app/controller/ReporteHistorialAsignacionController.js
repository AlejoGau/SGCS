Ext.define('SgAppWebReport.controller.ReporteHistorialAsignacionController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['InstaladoresByTokenSearchModel', 'TablaHistoricoSearchModel', 'SmartTrackSearchModel', 'TablaHistoricoAsignacionSearchModel'],
    views: ['ReporteHistorialAsignacionView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reportehistorialasignacionview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportehistorialasignacionview button[action=search]': {
                click: this.onSearchClick
            },
            'reportehistorialasignacionview #combohistorico': {
                select: this.onComboHistoricoSelect,
                change: this.onCleanDates
            },
            'reportehistorialasignacionview button[action=export]': {
                click: this.onExportClick
            },
            'reportehistorialasignacionview button[action=seleccionarCuenta]': {
                click: this.onSeleccionarCuenta
            },
            'reportehistorialasignacionview #combohistorico': {
                select: this.onComboHistoricoSelect,
                change: this.onCleanDates
            },
            'reportehistorialasignacionview button[action=btnprint]': {
                click: this.onBtnprintClick
            },             
        });

    }, // cierro init

    initView: function (view) {

        /* Carga el combo del Vigilador */
        view.store = Ext.create('Ext.data.Store', {
            model: this.getSmartTrackSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#vigilador').bindStore(view.store);
        view.store.load();
        /*Histórico de asignaciones */
        var historicoStore = Ext.create('Ext.data.Store', {
            model: this.getTablaHistoricoAsignacionSearchModelModel(),
            autoload: false,
            sorters: [{
                property: 'c_periodo',
                direction: 'DESC'
            }],
            pageSize: 10000
        });
        var comboHistorico = view.down('#combohistorico');
        comboHistorico.bindStore(historicoStore);
        historicoStore.load(
            {
                callback: function (records, operation, success) {
                    comboHistorico.select(comboHistorico.getStore().getAt(0));
                    comboHistorico.fireEvent('select', comboHistorico, comboHistorico.getStore().getAt(0));

                }
            }

        );



        /* Modifico el baseUrl al nuevo creado */
        view.baseurl = '/handler/ReporteHistorialAsignacionHTML';
        var target = view.down('#Iframe');

        var url = view.baseurl
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        target.load({
            src: url
        });

    },

    onBtnprintClick: function (button) {
        var view = button.up('reportehistorialasignacionview');
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

    onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('reportehistorialasignacionview');

        //var value = records[0].get('c_periodo');
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


    },

    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('reportehistorialasignacionview');
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

  onSeleccionarCuenta: function (button, events, eOps) {
    var view = button.up('reportehistorialasignacionview');

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
                caller: view,

            }
        ]
    });

    win.show();

    var helper = win.down('cuentahelperview');
    var store = helper.getStore();

    store.remoteFilter = true;

    store.filter([
        { property: 'tip_nTipo', value: '5' }
    ]);
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

    onSearchClick: function (button, event, eOpts) {
        var view = button.up('reportehistorialasignacionview');

        var cuenta = view.down('#idcuenta').getValue();
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var vigilador = view.down('#vigilador').getValue();
        var ordenar = view.down('#ordenar').getValue();
        var target = view.down('#Iframe');
        var combohistorico = view.down('#combohistorico').getValue();

        var url = view.baseurl

        if (cuenta) {
            url = Ext.String.urlAppend(url, "cuenta=" + cuenta);
        }
        if (fechadesde) {
            url = Ext.String.urlAppend(url, "fechadesde=" + Ext.Date.format(fechadesde, 'Y-m-d'));
        }
        if (fechahasta) {
            url = Ext.String.urlAppend(url, "fechahasta=" + Ext.Date.format(Ext.Date.add(fechahasta, Ext.Date.DAY, 1), 'Y-m-d'));
        }
        if (vigilador) {
            url = Ext.String.urlAppend(url, "vigilador=" + vigilador);
        }
        if (ordenar) {
            url = Ext.String.urlAppend(url, "sort=" + ordenar);
        }

        if (combohistorico) {
            url = Ext.String.urlAppend(url, "table=" + combohistorico);
        }

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        view.urltoexport = url;

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        });
    },

    onExportClick: function (button, event, eOpts) {
        var view = button.up('reportehistorialasignacionview');

        if (view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }

        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
        }
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        location.href = url;
    }

});