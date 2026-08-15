Ext.define('SgAppWebReport.controller.ReporteMarcacionesPorDiaSemanaHoraController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['TablaHistoricoAsignacionSearchModel'],
    views: ['ReporteMarcacionesPorDiaSemanaHoraView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reportemarcasemanahoraview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportemarcasemanahoraview button[action=search]': {
                click: this.onSearchClick
            },
            'reportemarcasemanahoraview button[action=export]': {
                click: this.onExportClick
            },
            'reportemarcasemanahoraview button[action=seleccionarCuenta]': {
                click: this.onSeleccionarCuenta
            },
            'reportemarcasemanahoraview #combohistorico': {
                select: this.onComboHistoricoSelect,
                change: this.onCleanDates
            },
            'reportemarcasemanahoraview button[action=btnprint]': {
                click: this.onBtnprintClick
            },   


        });

    }, // cierro init

    initView: function (view) {
        var controller = this;
        view.counter = 0;

        /* Modifico el baseUrl al nuevo creado */
        view.baseurl = '/handler/ReporteMarcacionesPorDiaSemanaHoraHTML';
        var target = view.down('#Iframe');

        var url = view.baseurl
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        // seteo combo historico
        var historicoStore = Ext.create('Ext.data.Store', {
            model: controller.getTablaHistoricoAsignacionSearchModelModel(),
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
                    //comboHistorico.select(comboHistorico.getStore().getAt(0));
                    //comboHistorico.fireEvent('select', comboHistorico, comboHistorico.getStore().getAt(0)); 

                }
            }

        );

        /* Llamo a la URL */
        controller.onSearchClick(view.down('#buscar'));
    },

    onBtnprintClick: function (button) {
        var view = button.up('reportemarcasemanahoraview');
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
    

    onSearchClick: function (button, event, options) {
        var view = button.up('reportemarcasemanahoraview');

        /* Tomo los valores de los combo creado en la view */
        var historico = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var idcuenta = view.down('#idcuenta').getValue();
        var target = view.down('#Iframe');
        var tabla = view.down('#combohistorico').rawValue;

        var currentDate = new Date(fechadesde);
        var dayArray = [];
        var dayDatos = [];
        var dayOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        while (currentDate <= fechahasta && dayDatos.length <= 6) {
            dayArray.push(currentDate.getDate());
            dayDatos.push(dayOfWeek[currentDate.getDay()]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Limpio la URL con la base del INIT 
        var url = view.baseurl;
        var urlexport = view.baseurlexport;

        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure*/

        if (historico) {
            url = Ext.String.urlAppend(url, "historico=" + historico);
        }
        if (fechadesde) {
            // url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+"T"+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));
            url = Ext.String.urlAppend(url, "fechadesde=" + Ext.Date.format(fechadesde, 'Y-m-d'));
        }
        if (fechahasta) {
            // url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+"T"+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));
            url = Ext.String.urlAppend(url, "fechahasta=" + Ext.Date.format(fechahasta, 'Y-m-d'));
        }
        if (idcuenta) {
            url = Ext.String.urlAppend(url, "idcuenta=" + idcuenta);
        }
        if (tabla) {
            url = Ext.String.urlAppend(url, "tabla=" + tabla);
        }
        if (view.counter) {
            url = Ext.String.urlAppend(url, "first=false");
        } else {
            url = Ext.String.urlAppend(url, "first=true");
        }

        url = Ext.String.urlAppend(url, "dayArray=" + dayDatos);

        view.urltoexport = urlexport;

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        /* Llamo a la URL */
        target.load({
            src: url
        });
        view.counter++;
    },


    onSeleccionarCuenta: function (button, events, eOps) {
        var view = button.up('reportemarcasemanahoraview');
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

    onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('reportemarcasemanahoraview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechaDesde');
        var fechahasta = view.down('#fechaHasta');

        if (value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#fechaDesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#fechaHasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
        }

        if (value) {
            var fechahistorico = value.match(/\d{4}/g) + "-" + value.match(/\d{2}$/g);
            var month = value.match(/\d{2}$/g) - 1;
            var fechahistoricodesde = Ext.Date.getFirstDateOfMonth(new Date(value.match(/\d{4}/g), month));
            var fechahistoricohasta = Ext.Date.getLastDateOfMonth(new Date(value.match(/\d{4}/g), month));
            var fechahistorico6diasdespues = Ext.Date.add(fechahistoricodesde, Ext.Date.DAY, 6);

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

    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('reportemarcasemanahoraview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');

        if (!value) {
            fechadesde ? fechadesde.setValue('') : '';
            fechahasta ? fechahasta.setValue('') : '';

            // Seteo el Min y Max a ambos combo.
            fechadesde.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechadesde.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            fechahasta.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));

            // Seteo la fecha en los combo del primer dia del mes y el de hoy
            fechadesde.setValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setValue(new Date());
        }
    }
});