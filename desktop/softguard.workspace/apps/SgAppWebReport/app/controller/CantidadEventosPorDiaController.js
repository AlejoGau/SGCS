Ext.define('SgAppWebReport.controller.CantidadEventosPorDiaController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['TablaHistoricoAsignacionSearchModel'],
    views: ['CantidadEventosPorDiaView'],

    init: function (config) {
        // genero los eventos 
        this.control({
            'cantidadeventospordiaview': {
                afterrender: this.initView,
            },
            'cantidadeventospordiaview button[action=search]': {
                click: this.onSearchClick
            },
            'cantidadeventospordiaview button[action=btnprint]': {
                click: this.onBtnprintClick
            },                        
            'cantidadeventospordiaview #combohistorico': {
                select: this.onComboHistoricoSelect,
                change: this.onCleanDates
            },
            'cantidadeventospordiaview #fechaDesde': {
                change: 'onFechaChange'
            },
            'cantidadeventospordiaview #fechaHasta': {
                change: 'onFechaChange'
            }
        })
    }, // cierro init
    initView: function (view) {
        const controller = this;
        view.counter = 0;
        view.baseurl = '/handler/CantidadEventosPorDiaHtml';
        const target = view.down('#Iframe');
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=' +  controller.application.getToken());
        //view.baseurl = Ext.String.urlAppend( view.baseurl, 'title=' + Ext.encode('Estadistica eventos') );
        view.baseurl = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());

        //target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale('Cargando') + '</h1>';

        // seteo combo historico
        const historicoStore = Ext.create('Ext.data.Store', {
            model: controller.getTablaHistoricoAsignacionSearchModelModel(),
            autoload: false,
            sorters: [{
                property: 'c_periodo',
                direction: 'DESC'
            }],
            pageSize: 10000
        });
        const comboHistorico = view.down('#combohistorico');
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
        view.counter++;
    },//cierre initView
    onSearchClick: function (button, event, options) {
        const view = button.up('cantidadeventospordiaview');
        /* Tomo los valores de los combo creado en la view */
        const historico = view.down('#combohistorico').getValue();
        const fechadesde = view.down('#fechaDesde').getValue();
        const fechahasta = view.down('#fechaHasta').getValue();
        const target = view.down('#Iframe');
        const tabla = view.down('#combohistorico').rawValue;

        // Limpio la URL con la base del INIT 
        let url = view.baseurl;
        let urlexport = view.baseurlexport;
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
        if (view.counter) {
            url = Ext.String.urlAppend(url, "first=false");
        } else {
            url = Ext.String.urlAppend(url, "first=true");
        }

        view.urltoexport = urlexport;

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        //target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale('Cargando') + '</h1>';

        /* Llamo a la URL */
        target.load({
            src: url
        });
        view.counter++;
    },
    onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('cantidadeventospordiaview');
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

    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('cantidadeventospordiaview');
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
    //agrego para que no hay más de 31 días de diferencia entre fechadesde y fechahasta
    onFechaChange: function (field, newValue, oldValue, eOpts) {

        var fechaDesde = Ext.ComponentQuery.query('#fechaDesde')[0].getValue();
        var fechaHasta = Ext.ComponentQuery.query('#fechaHasta')[0].getValue();
        if (fechaDesde !== null && fechaHasta !== null) {
            var maxDate = new Date(fechaDesde.getTime() + 31 * 24 * 60 * 60 * 1000);
        }

        if (fechaHasta > maxDate) {
            field.setValue(oldValue); // Restaura el valor anterior si la fecha excede el límite
            Ext.Msg.alert('Error', 'La diferencia entre las fechas no puede ser mayor a un mes.');
        }
    },
    onBtnprintClick: function (button) {
        var view = button.up('cantidadeventospordiaview');
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

});