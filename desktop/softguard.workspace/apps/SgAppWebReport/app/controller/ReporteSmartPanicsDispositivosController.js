Ext.define('SgAppWebReport.controller.ReporteSmartPanicsDispositivosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteSmartPanicsDispositivosView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportesmartpanicsdispositivosview' : {
                afterrender : this.initView
            },
            'reportesmartpanicsdispositivosview button[action=search]' : {
                click : this.onSearchClick
            },
            'reportesmartpanicsdispositivosview button[action=export]' : {
                click : this.onExportarClick
            },
            'reportesmartpanicsdispositivosview button[action=btnprint]': {
                click: this.onBtnprintClick
            },              
    	});
        
	}, // cierro init
    
    initView: function(view){
        var controller = this;
        // Cargo el handler en el iFrame
        controller.loadUrl(view, null)
        

        var url = view.baseurl;
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        url = Ext.String.urlAppend(url, 'filter=' + '[{"property":"cue_ncuenta:NOT","value":""}]')
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        target.load({
            src: url
        }); 

    },
    onBtnprintClick: function (button) {
        var view = button.up('reportesmartpanicsdispositivosview');
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
        var view = btn.up('reportesmartpanicsdispositivosview');
        var target = view.down('#Iframe');

        if ( btn.action != 'export') {
            controller.loadUrl(null, btn);
            //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';       
        } 
        
        var dealer = view.down('#dealer').getValue();
        var dealerHasta = view.down('#dealerhasta').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var estado = view.down('#estado').getValue();
        var agrupar = view.down('#agruparCheckbox').getValue();


        var url = view.baseurl;
        var filters = [{
            property: 'cue_ncuenta:NOT',
            value: ''
        }];

        if( agrupar == 1)
            {
                filters = [{
                    property: 'cue_ncuenta',
                    value: '',
                }]; 
            } 

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
             url = Ext.String.urlAppend(url, 'estado=' + estado)
            
        }

        if (filters.length > 0){
           url = Ext.String.urlAppend(url, 'filter='+Ext.encode(filters));
        }
                target.load({
            src: url
        });  

    },

    onExportarClick: function(btn) {
        var controller = this;
        var view = btn.up('reportesmartpanicsdispositivosview');

        // Agrego el flag de exportar
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'export=yes&limit=99999');

        // Notifico que voy a exportar y puede tardar
        notify('Realizando exportacion, aguarde unos instantes.');

        controller.onSearchClick(btn);
    },

    loadUrl: function(view, btn) {
        var controller = this;
        var view = btn ? btn.up('reportesmartpanicsdispositivosview') : view;
        
        view.baseurl =  '/handler/ReporteSmartPanicsDispositivosHTML';
        
    }

})