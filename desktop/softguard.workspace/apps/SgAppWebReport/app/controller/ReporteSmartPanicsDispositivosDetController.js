Ext.define('SgAppWebReport.controller.ReporteSmartPanicsDispositivosDetController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteSmartPanicsDispositivosDetView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportesmartpanicsdispositivosdetview' : {
                afterrender : this.initView
            },
            'reportesmartpanicsdispositivosdetview button[action=search]' : {
                click : this.onSearchClick
            },
            'reportesmartpanicsdispositivosdetview button[action=export]' : {
                click : this.onExportarClick
            },
            'reportesmartpanicsdispositivosdetview button[action=btnprint]': {
                click: this.onBtnprintClick
            },             
    	});
        
	}, // cierro init
    
    initView: function(view){
        var controller = this;
        // Cargo el handler en el iFrame
        controller.loadUrl(view, null)
        

        var url = view.baseurl;
        url = Ext.String.urlAppend(url,'&limit=99999')
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
                target.load({
            src: url
        }); 

    },

    onBtnprintClick: function (button) {
        var view = button.up('reportesmartpanicsdispositivosdetview');
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
    

    onSearchClick: function(btn) {
        var controller = this;
        var view = btn.up('reportesmartpanicsdispositivosdetview');

        
        var dealer = view.down('#dealer').getValue();
        var dealerHasta = view.down('#dealerhasta').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var estado = view.down('#estado').getValue();

        var url = view.baseurl;
        var filters = [{
            property: 'cue_ncuenta:NOT',
            value: ''
        }];

        if(dealer) {
            filters.push({
                property: 'cue_clinea:GTESTRING',
                value: dealer
            })
        }
        if(dealerHasta) {
            filters.push({
                property: 'cue_clinea:LTESTRING',
                value: dealerHasta
            })
        }
        if(cuentadesde) {
            filters.push({
                property: 'cue_ncuenta:GTESTRING',
                value: cuentadesde
            })
        }
        if(cuentahasta) {
            filters.push({
                property: 'cue_ncuenta:LTESTRING',
                value: cuentahasta
            })
        }
        if(estado) {
            switch (estado) {
                case "1" : 
                    filters.push({
                        property: 'Imei:NOT',
                        value: ''
                    })
                    break;
                case "0" :
                    filters.push({
                        property: 'Imei:ISNULLOREMPTY',
                        value: ''
                    })
                    break;
            }
            
        }

        if (filters.length > 0){
           url = Ext.String.urlAppend(url, 'filter='+Ext.encode(filters));
        }
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        url = url.replace(/#/g, '%23');

        if (url) {
            target.load({
                src: url
            });
        } else {
            target.load({
                src: view.baseurl
            });
        }
      

    },

    onExportarClick: function(btn) {
    var view = btn.up('reportesmartpanicsdispositivosdetview');
    var exportUrl = view.lastSearchUrl || view.baseurl;

    // Agregá formato de exportación si hace falta, por ejemplo:
    exportUrl = Ext.String.urlAppend(exportUrl, 'export=1');

    // Mostrar cartel de exportación
    Ext.MessageBox.show({
        msg: 'Realizando exportación, aguarde unos instantes...',
        progressText: 'Exportando...',
        width: 300,
        wait: true,
        waitConfig: { interval: 200 },
        icon: Ext.MessageBox.INFO
    });

    // Forzar descarga con iframe oculto
    Ext.DomHelper.append(document.body, {
        tag: 'iframe',
        frameBorder: 0,
        width: 0,
        height: 0,
        style: 'display:none;visibility:hidden;height:0px;',
        src: exportUrl
    });

    // Ocultar el cartel después de 5 segundos
    setTimeout(function () {
        Ext.MessageBox.hide();
    }, 5000);
},

    loadUrl: function(view, btn) {
        var controller = this;
        var view = btn ? btn.up('reportesmartpanicsdispositivosdetview') : view;
        
        view.baseurl =  '/handler/ReporteSmartPanicsDispDetHTML';
        
    }

})