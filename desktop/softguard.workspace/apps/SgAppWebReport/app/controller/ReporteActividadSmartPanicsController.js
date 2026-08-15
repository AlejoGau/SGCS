Ext.define('SgAppWebReport.controller.ReporteActividadSmartPanicsController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['ReporteActividadSmartPanicsView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporteactividadsmartpanicsview': {
                afterrender: this.initView
            },
            'reporteactividadsmartpanicsview button[action=search]': {
                click: this.onSearchClick
            },
            'reporteactividadsmartpanicsview button[action=export]': {
                click: this.onExportClick
            },
            'reporteactividadsmartpanicsview button[action=mail]': {
                click: this.onMailClick
            },
            'reporteactividadsmartpanicsview button[action=btnprint]': {
                click: this.onBtnprintClick
            }
        });
    }, // cierro init


    initView: function (view) {
        var controller = this;
        // Modifico el baseUrl al nuevo creado
        view.baseurl = '/handler/ReporteActividadSmartPanicsHTML';
        var target = view.down('#Iframe');

        // Bind combos necesarios

        // Asigno finalmente la URL
        var url = Ext.String.urlAppend(view.baseurl, 'Mostrar=50');
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        });
    },
    onBtnprintClick: function (button) {
        var view = button.up('reporteactividadsmartpanicsview');
        var target = view.down('#Iframe');
        var url = target.src;
        var contenido;

        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                printHTMLContent(body);
                /*
                // Abre una nueva ventana
                let myWindow = window.open('', '', 'width=1000,height=800');
                if (myWindow) {
                    let doc = myWindow.document;
                    doc.open();
                    // Escribe el contenido en la nueva ventana
                    doc.write(body);
                    doc.close();

                    // Agrega un delay para asegurarse que la ventana se cargue completamente antes de imprimir
                    myWindow.onload = function () {
                        // Muestra el diálogo de impresión
                        myWindow.print();

                        // Opcionalmente, cierra la ventana después de imprimir
                        myWindow.onafterprint = function () {
                            myWindow.close();
                        };
                    };
                } else {
                    console.error('No se pudo abrir la ventana.');
                }
                */
            });
    },

    onSearchClick: function (btn) {
        var view = btn.up('reporteactividadsmartpanicsview');
        var target = view.down('#Iframe');

        // Obtengo los filtros
        var cuentasasociadaschk = view.down('#cuentasasociadaschk').getValue();
        var ultimos5chk = view.down('#ultimos5chk').getValue();
        var geocercaschk = view.down('#geocercaschk').getValue();
        var nombreCuenta = view.down('#nombreCuenta').getValue();
        var usuario = view.down('#usuario').getValue();
        var cantidadRegistros = view.down('#comboregistros').getValue();
        var imei = view.down('#imei').getValue();
        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();

        var url = view.baseurl;
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        if (cuentasasociadaschk) url = Ext.String.urlAppend(url, "cuentasasociadaschk=" + cuentasasociadaschk);
        if (cantidadRegistros) {
            url = Ext.String.urlAppend(url, "Mostrar=" + cantidadRegistros);
            url = Ext.String.urlAppend(url, "limit=" + cantidadRegistros);
        } else {
            url = Ext.String.urlAppend(url, 'Mostrar=' + getParametro('CANTIDADMAXHISTORICO'));
        }

        if (ultimos5chk) url = Ext.String.urlAppend(url, "ultimos5chk=" + ultimos5chk);
        if (geocercaschk) url = Ext.String.urlAppend(url, "geocercaschk=" + geocercaschk);
        if (nombreCuenta) url = Ext.String.urlAppend(url, "nombreCuenta=" + nombreCuenta);
        if (usuario) url = Ext.String.urlAppend(url, "usuario=" + usuario);
        if (imei) url = Ext.String.urlAppend(url, "imei=" + imei);
        if (dealer) url = Ext.String.urlAppend(url, "dealer=" + dealer);
        if (cuentadesde) url = Ext.String.urlAppend(url, "cuentadesde=" + cuentadesde);
        if (cuentahasta) url = Ext.String.urlAppend(url, "cuentahasta=" + cuentahasta);

        // Carga la URL en el iframe
        url = url.replace(/#/g, '%23');
        target.load({ src: url });
    },

    onExportClick: function (btn) {
        var controller = this;
        var view = btn.up('reporteactividadsmartpanicsview');

        // Obtengo los campos
        var cuentasasociadaschk = view.down('#cuentasasociadaschk').getValue();
        var ultimos5chk = view.down('#ultimos5chk').getValue();
        var geocercaschk = view.down('#geocercaschk').getValue();
        var nombreCuenta = view.down('#nombreCuenta').getValue();
        var usuario = view.down('#usuario').getValue();
        var cantidadRegistros = view.down('#comboregistros').getValue();
        var imei = view.down('#imei').getValue();
        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        console.log('cantidad de regisros---', cantidadRegistros)

        // Chequeo los valores y agrego a la URL de consulta
        var url = view.baseurl;
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        if (cuentasasociadaschk) {
            url = Ext.String.urlAppend(url, "cuentasasociadaschk=" + cuentasasociadaschk);
        }
        if (cantidadRegistros) {
            url = Ext.String.urlAppend(url, "Mostrar=" + cantidadRegistros);
        } else {
            url = Ext.String.urlAppend(url, 'Mostrar=' + getParametro('CANTIDADMAXHISTORICO'));
        }

        if (cantidadRegistros) {
            url = Ext.String.urlAppend(url, "limit=" + cantidadRegistros);
        }
        if (ultimos5chk) {
            url = Ext.String.urlAppend(url, "ultimos5chk=" + ultimos5chk);
        }
        if (geocercaschk) {
            url = Ext.String.urlAppend(url, "geocercaschk=" + geocercaschk);
        }
        if (nombreCuenta) {
            url = Ext.String.urlAppend(url, "nombreCuenta=" + nombreCuenta);
        }
        if (usuario) {
            url = Ext.String.urlAppend(url, "usuario=" + usuario);
        }
        if (imei) {
            url = Ext.String.urlAppend(url, "imei=" + imei);
        }
        if (dealer) {
            url = Ext.String.urlAppend(url, "dealer=" + dealer);
        }
        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "cuentadesde=" + cuentadesde);
        }
        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "cuentahasta=" + cuentahasta);
        }

        var target = view.down('#Iframe');



        Ext.MessageBox.show({
            msg: 'Exportando a Excel...',
            progressText: 'Cargando...',
            width: 50,
            wait: true,
            waitConfig: { interval: 100 }
        });

        location.href = url;



        url = Ext.String.urlAppend(url, "exportToExcel=true");
        console.log('target---', target)

        location.href = url;

        setTimeout(function () {
            Ext.MessageBox.hide(); // Ocultar el mensaje después de 5 segundos
        }, 3000)


    },

    onMailClick: function (button) {
        var view = button.up('reporteactividadsmartpanicsview');
        var target = view.down('#Iframe');
        url = target.src;
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) { //Obtenemos el valor devuelto.
                var mailbody = body;
                var mail = Ext.widget('mailformview', {
                    mailbody: mailbody,
                    from: getParametro('MAILSENDERNAME') + " <" + getParametro('MAILSENDER') + ">",
                    autoScroll: true,
                    subject: getLocale('Reporte de eventos')
                });
                var win = Ext.widget('window', {
                    title: 'Envío de correo',
                    layout: 'fit',
                    items: mail,
                    width: 600,
                    height: 600
                }).show();
            });

    },

});