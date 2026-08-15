Ext.define('SgAppWebReport.controller.ReporteSMSEnviadosController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.TablaLineasStore'],
    models: [],
    views: ['ReporteSMSEnviadosView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporteSMSEnviadosView': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reporteSMSEnviadosView button[action=search]': {
                click: this.onSearchClick
            },
            'reporteSMSEnviadosView button[action=removeall]': {
                click: this.onTodosClick
            },
            'reporteSMSEnviadosView button[action=export]': {
                click: this.onExportClick
            },
            'reporteSMSEnviadosView button[action=seleccionarDealerDesde]': {
                click: this.onSeleccionarDealerDesde
            },
            'reporteSMSEnviadosView button[action=seleccionarDealerHasta]': {
                click: this.onSeleccionarDealerHasta
            },
            'reporteSMSEnviadosView button[action=btnprint]': {
                click: this.onBtnprintClick
            },                
                        


        });

    }, // cierro init

    initView: function (view) {

        /* Cargo el Stored correspondiente a los usuarios de la cuenta, esto lo uso
         * para poder tener la informacion en el combo de usuario
         */
        var controller = this;

        console.log(controller.application.UserData);
        console.log(view);

        /* Consulta de RANGOS del usuario logueado
        var userLogueadoRangosStore = Ext.create('Ext.data.Store',{
            model: controller.getUsersDesktopWebModulosModelSearchModel(),
            pageSize: 500,
            remoteFilter: true,
            filters: [{
                property: 'dwm_idModules',
                value: 0
            },{
                property: 'dwm_idWeb',
                value: controller.application.UserData.udw_idKey
            }]
        }).load({callback:function (recordsLogueado) {
            
            if(recordsLogueado.length>0) {
                console.log(recordsLogueado[0]);
            }
        }});
        */

        /* Modifico el baseUrl al nuevo creado */
        view.baseurl = '/handler/ReporteSMSEnviadosHTML'
        var target = view.down('#Iframe');

        var url = view.baseurl
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'token=' + controller.application.getToken());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        /* Llamo a la URL */
        target.load({
            src: url
        });
    },

    onBtnprintClick: function (button) {
        var view = button.up('reporteSMSEnviadosView');
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
        var view = button.up('reporteSMSEnviadosView');
        view.down('#fechaDesde').setValue('');
        view.down('#fechaHasta').setValue('');
        view.down('#flagDealerSelector').setValue('');
        view.down('#dealerDesde').setValue('');
        view.down('#dealerHasta').setValue('');
        view.down('#cuentaDesde').setValue('');
        view.down('#cuentaHasta').setValue('');
        view.down('#nombre').setValue('');
        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        var target = view.down('#Iframe');

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        view.urltoexport = url;
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"                    +window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        /* Llamo a la URL */
        target.load({
            src: url
        });
    },

    onSearchClick: function (button, event, options) {
        var view = button.up('reporteSMSEnviadosView');

        /* Tomo los valores de los combo creado en la view */
        //var objetivo = view.down('#idcuenta').getValue();

        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var dealerdesde = view.down('#dealerDesde').getValue();
        var dealerhasta = view.down('#dealerHasta').getValue();
        var cuentadesde = view.down('#cuentaDesde').getValue();
        var cuentahasta = view.down('#cuentaHasta').getValue();
        var nombre = view.down('#nombre').getValue();

        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;

        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if (dealerdesde) {
            url = Ext.String.urlAppend(url, "dealerdesde=" + dealerdesde);
        }

        if (dealerhasta) {
            url = Ext.String.urlAppend(url, "dealerhasta=" + dealerhasta);
        }

        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "cuentadesde=" + cuentadesde);
        }

        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "cuentahasta=" + cuentahasta);
        }

        if (nombre) {
            url = Ext.String.urlAppend(url, "nombre=" + nombre);
        }



        if (fechadesde) {
            url = Ext.String.urlAppend(url, "fechadesde=" + Ext.Date.format(fechadesde, 'Y-m-d'));
        }
        if (fechahasta) {
            url = Ext.String.urlAppend(url, "fechahasta=" + Ext.Date.format(fechahasta, 'Y-m-d'));
        }

        view.urltoexport = url;

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        /* Llamo a la URL */
        target.load({
            src: url
        });

    },


    onSeleccionarDealerDesde: function (button, events, eOps) {
        var view = button.up('reporteSMSEnviadosView');
        //view.win = win;
        view.down('#flagDealerSelector').setValue('dealerDesde');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione Dealer Desde',
            closeAction: 'destroy',
            itemId: 'dealerDesdeWin',
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

        var viewcuenta = win.down('cuentahelperview');
        viewcuenta
        'cuentahelperview button[action=selected]'


        win.show();

    },
    onSeleccionarDealerHasta: function (button, events, eOps) {
        var view = button.up('reporteSMSEnviadosView');
        view.down('#flagDealerSelector').setValue('dealerHasta');
        //view.win = win;

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione Dealer Hasta',
            closeAction: 'destroy',
            itemId: 'dealerDesdeWin',
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
            if (view.down('#flagDealerSelector').getValue() == 'dealerDesde') {
                view.down('#dealerDesde').setValue(record.get('cue_clinea'));

                view.down('#sacarDealerDesde').show();
            }
            if (view.down('#flagDealerSelector').getValue() == 'dealerHasta') {
                view.down('#dealerHasta').setValue(record.get('cue_clinea'));

                view.down('#sacarDealerHasta').show();
            }

        });
    },

    onExportClick: function (button) {
        var view = button.up('reporteSMSEnviadosView');
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

        location.href = url;
    }
});