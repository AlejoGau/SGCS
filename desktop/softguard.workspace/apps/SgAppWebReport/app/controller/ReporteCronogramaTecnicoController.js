Ext.define('SgAppWebReport.controller.ReporteCronogramaTecnicoController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['InstaladoresByTokenSearchModel'],
    views: ['ReporteCronogramaTecnicoView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reportecronogramatecnicoview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaChanged,
                selectedEvents: this.eventsSelected
            },
            'reportecronogramatecnicoview button[action=search]': {
                click: this.onSearchClick
            },
            'reportecronogramatecnicoview button[action=todos]': {
                click: this.onTodosClick
            },
            'reportecronogramatecnicoview button[action=btnprint]': {
                click: this.onBtnprintClick
            }
        });

    }, // cierro init



    initView: function (view) {



        view.store = Ext.create('Ext.data.Store', {
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#tecnicos').bindStore(view.store);

        view.store.load();


        view.baseurl = '/handler/ReporteCronogramaTecnicoHTML';
        var target = view.down('#Iframe');



        var now = new Date();

        view.down('#fechadesde').setValue(Ext.Date.add(now, Ext.Date.MONTH, -1))
        view.down('#fechahasta').setValue(now)


        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        this.onSearchClick(view)
    },
    onBtnprintClick: function (button) {
        var view = button.up('reportecronogramatecnicoview');
        var target = view.down('#Iframe');

        url = target.src;
        console.log("url ReporteCronogramaTecnicoController  - - - - - - ", url)
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
                    //renderTo: body.replace('<body>', '<body onload="window.print()>"'),

                });
                // Abrir en una nueva pestaña
                contenido = body.replace('BODY', 'body onload="window.print()"')
                //var newTab;// = window.open('', '_blank');
                //newTab.document.write(win.html);
                let myWindow = window.open();
                myWindow.document.write(contenido);
                myWindow.document.close();
                myWindow.focus();
                myWindow.print();

                //win.printMe();
                */

            });
    },

    onSearchClick: function (button, event, options) {



        var view = button.up('reportecronogramatecnicoview') ? button.up('reportecronogramatecnicoview') : button;
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());

        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var fechadesdevisita = view.down('#fechadesdevisita').getValue();
        var fechahastavisita = view.down('#fechahastavisita').getValue();
        var tecnico = view.down('#tecnicos').getValue();
        var estados = view.down('#estados').getValue();

        view.filters = [];

        view.filters.push({
            property: 'ins_cnombre:ISNOTNULLOREMPTYTRIM',
            vale: ''
        })

        if (fechadesde) {
            url = Ext.String.urlAppend(url, "svi_tSalidaHaciaClienteDesde=" + Ext.Date.format(new Date(fechadesde), 'd/m/Y'));
            view.filters.push({
                property: 'svi_tSalidaHaciaCliente:GTEDATESTRING',
                value: Ext.Date.format(new Date(fechadesde), 'Y-m-d')
            })

        }

        if (fechahasta) {
            url = Ext.String.urlAppend(url, "svi_tSalidaHaciaClienteHasta=" + Ext.Date.format(new Date(fechahasta), 'd/m/Y'));
            view.filters.push({
                property: 'svi_tSalidaHaciaCliente:LTEDATESTRING',
                value: Ext.Date.format(new Date(fechahasta), 'Y-m-d')
            })
        }

        if (fechadesdevisita) {
            url = Ext.String.urlAppend(url, "svi_tFechaHoraDesde=" + Ext.Date.format(new Date(fechadesdevisita), 'd/m/Y'));
            view.filters.push({
                property: 'svi_tFechaHora:GTEDATESTRING',
                value: Ext.Date.format(new Date(fechadesdevisita), 'Y-m-d')
            })

        }
        if (fechahastavisita) {
            url = Ext.String.urlAppend(url, "svi_tFechaHoraeHasta=" + Ext.Date.format(new Date(fechahastavisita), 'd/m/Y'));
            view.filters.push({
                property: 'svi_tFechaHora:LTEDATESTRING',
                value: Ext.Date.format(new Date(fechahastavisita), 'Y-m-d')
            })
        }


        if (tecnico) {
            url = Ext.String.urlAppend(url, "ins_cnombre=" + view.down('#tecnicos').getRawValue());
            view.filters.push({
                property: 'ins_idKey',
                value: tecnico
            })
        }

        if (estados) {
            url = Ext.String.urlAppend(url, "svi_iEstado=" + view.down('#estados').getRawValue());
            view.filters.push({
                property: 'svi_iEstado',
                value: estados
            })
        }




        var target = view.down('#Iframe');

        //innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        if (view.filters.length > 0) {
            url = Ext.String.urlAppend(url, 'filter=' + Ext.encode(view.filters));

        }
        target.load({
            src: url
        });


    },


    onTodosClick: function (button) {
        var view = button.up('ordenservtecview');

        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#tecnicos').setValue('');
        view.down('#estados').setValue('');

        this.onSearchClick(view)
    }
});