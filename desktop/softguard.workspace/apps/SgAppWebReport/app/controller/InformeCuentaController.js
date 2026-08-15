Ext.define('SgAppWebReport.controller.InformeCuentaController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.SoftguardEstadoEstadoStore'],
    models: [],
    views: ['InformeCuentaView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'informecuentaview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaChanged
            },
            'informecuentaview button[action=search]': {
                click: this.onSearchClick
            },
            'informecuentaview button[action=todos]': {
                click: this.onTodosClick
            },
            'informecuentaview #selcuenta': {
                click: this.onBuscarPorCuentaClick
            },
            'informecuentaview button[action=export]': {
                click: this.onExportToExcel
            },
            'informecuentaview button[action=btnprint]': {
                click: this.onBtnprintClick
            }
        });

    }, // cierro init


    onBuscarPorCuentaClick: function (button, event, options) {

        var view = button.up('informecuentaview');


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

        view.baseurl = '/handler/InformeCuentaHTML';
        var target = view.down('#Iframe');


        view.down('#cuentadesde').setValue('0001');
        view.down('#cuentahasta').setValue('0009');

        var controller = this
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=' + controller.application.getToken());

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title=' + Ext.encode('Estadistica eventos'));
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        view.down('#comboestado').setValue(0);

        //this.onSearchClick(view);
        target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;">' + getLocale('Recuerde que es necesario configurar los parametros de busqueda antes de efectuar el reporte.') + '</h1>';


    },
    onBtnprintClick: function (button) {
        var view = button.up('informecuentaview');
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

    onSearchClick: function (button) {

        var view = button.up('informecuentaview') ? button.up('informecuentaview') : button;

        var filters = [];

        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var nombre = view.down('#nombre').getValue();
        var incluirchecks = view.down('#incluirchecks').getChecked();
        var ordenerradios = view.down('#ordenerradios').getChecked();

        var chkrespuestautomatica = view.down('#chkrespuestautomatica').getValue();

        var comboestado = view.down('#comboestado').getValue();

        var url = view.baseurl;
        console.log(view)
        console.log(url)
        /*  if(fechaDesde) {
              url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));
          }
          
          if(fechaHasta) {
              url = Ext.String.urlAppend(url,"FechaHasta="+Ext.Date.format(new Date(fechaHasta),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraHasta),'H:i:s'));
          }
          */
        /* if(combooperador) {
             url = Ext.String.urlAppend(url,"Operador="+combooperador);
         }
         */
        if (dealer) {
            url = Ext.String.urlAppend(url, "Dealer=" + dealer);
        }

        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "CuentaDesde=" + cuentadesde);
        }

        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "CuentaHasta=" + cuentahasta);
        }

        if (nombre) {
            url = Ext.String.urlAppend(url, "Nombre=" + nombre);
        }


        if (comboestado != null) {
            url = Ext.String.urlAppend(url, "Estado=" + comboestado);
        } else {
            /* Se agrega, dado que los habilitados corresponden al 0 y el IF interpreta que es FALSE el IF */
            url = Ext.String.urlAppend(url, "Estado=" + comboestado);
        }

        if (chkrespuestautomatica) {
            url = Ext.String.urlAppend(url, "respuestaautomatica=" + chkrespuestautomatica);
        }




        if (incluirchecks) {
            console.log(incluirchecks)
            //uso el item id como nombre de la variable a pasar
            Ext.Array.each(incluirchecks, function (v, k) {
                url = Ext.String.urlAppend(url, v.itemId + "=" + v.checked);

            })
        }

        if (ordenerradios) {
            url = Ext.String.urlAppend(url, "ordenarpor=" + ordenerradios[0].itemId);
        }


        /*  if(tipocuenta) {
              url = Ext.String.urlAppend(url,"TipoCuenta="+tipocuenta);
          }*/
        /*   if(tipoevento) {
               url = Ext.String.urlAppend(url,"TipoEvento="+tipoevento);
           }
           */
        /* if(cuentamadre) {
             url = Ext.String.urlAppend(url,"CuentaMadre="+cuentamadre);
             
             if (view.particiones){
                 var cuentas = view.particiones.join(",");
                 url = Ext.String.urlAppend(url,"Cuentas="+cuentas);
             }
             
         }
         if(origen) {
             url = Ext.String.urlAppend(url,"Origen="+origen);
         }
         if(categorizacion) {
             url = Ext.String.urlAppend(url,"Categorizacion="+categorizacion);
         }
         if(observaciones) {
             url = Ext.String.urlAppend(url,"Observaciones="+observaciones);
         }
         
         if(operador) {
             url = Ext.String.urlAppend(url,"Operadorchk="+operador);
         }
         if(resolucion) {
             url = Ext.String.urlAppend(url,"Resolucionchk="+resolucion);
         }
         
         
         
         if(combohistorico) {
             url = Ext.String.urlAppend(url,"Historico="+combohistorico);
         }
 */

        /*
                if(view.record) {
                    var url = Ext.String.urlAppend(url,"Cuentas="+view.record.get('cue_iid'));
                }
        
        */
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';




        if (url) {
            target.load({
                src: url
            });
        } else {
            target.load({
                src: url
            });
        }

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

    /* Agregando el evento del boton de Exportar a Excel */
    onExportToExcel: function (button, view) {
        console.log('Estoy por exportar');

        var view = button.up('informecuentaview')
        var url = view.baseurl;

        var filters = [];

        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var nombre = view.down('#nombre').getValue();
        var incluirchecks = view.down('#incluirchecks').getChecked();
        var ordenerradios = view.down('#ordenerradios').getChecked();
        var chkrespuestautomatica = view.down('#chkrespuestautomatica').getValue();
        var comboestado = view.down('#comboestado').getValue();
        var exportToExcel = 'yes';

        if (dealer) {
            url = Ext.String.urlAppend(url, "Dealer=" + dealer);
        }

        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "CuentaDesde=" + cuentadesde);
        }

        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "CuentaHasta=" + cuentahasta);
        }

        if (nombre) {
            url = Ext.String.urlAppend(url, "Nombre=" + nombre);
        }


        if (comboestado != null) {
            url = Ext.String.urlAppend(url, "Estado=" + comboestado);
        } else {
            /* Se agrega, dado que los habilitados corresponden al 0 y el IF interpreta que es FALSE el IF */
            url = Ext.String.urlAppend(url, "Estado=" + comboestado);
        }

        if (chkrespuestautomatica) {
            url = Ext.String.urlAppend(url, "respuestaautomatica=" + chkrespuestautomatica);
        }


        if (chkrespuestautomatica) {
            url = Ext.String.urlAppend(url, "respuestaautomatica=" + chkrespuestautomatica);
        }

        if (incluirchecks) {
            console.log(incluirchecks)
            //uso el item id como nombre de la variable a pasar
            Ext.Array.each(incluirchecks, function (v, k) {
                url = Ext.String.urlAppend(url, v.itemId + "=" + v.checked);

            })
        }

        if (ordenerradios) {
            url = Ext.String.urlAppend(url, "ordenarpor=" + ordenerradios[0].itemId);
        }

        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
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
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol+'//'+window.location.hostname+'/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /*target.load({
            src: url
        });*/
    }


});