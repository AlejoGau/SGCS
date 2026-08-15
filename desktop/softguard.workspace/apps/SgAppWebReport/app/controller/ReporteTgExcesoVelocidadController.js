Ext.define('SgAppWebReport.controller.ReporteTgExcesoVelocidadController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteTgExcesoVelocidadView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportetgexcesovelocidadview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected : this.onCuentaSelected,
                onsSeleccionarCuenta : this.onsSeleccionarCuenta
            },
            'reportetgexcesovelocidadview button[action=search]' : {
                click : this.onSearchClick,
            },
            'reportetgexcesovelocidadview button[action=export]' : {
                click : this.onExportarClick,
            },
            'reportetgexcesovelocidadview button[action=btnprint]': {
                click: this.onBtnprintClick
            },               
        });
        
	}, // cierro init

    initView: function(view) {

        view.baseurl =  '/handler/ReporteTgExcesoVelocidadHTML';
        view.urlForExport = view.baseurl;
        
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());

        view.down('#fechadesde').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -1));
        view.down('#fechahasta').setValue(new Date());

        this.onSearchClick(view.down('#buscar'));
    },
    onBtnprintClick: function (button) {
        var view = button.up('reportetgexcesovelocidadview');
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

    // Selector de cuenta
    onsSeleccionarCuenta: function (win, view) {
        view.win = win;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione un Vehículo',
    		closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [{
                xtype: 'cuentamovileshelperview',
                caller: view                
            }]
		});
		win.show();        
    },

    onCuentaSelected:  function (selection, view, recordPreSelected) {
        var controller = this;
        Ext.Array.each(selection, function(record){
        
            var cueiid = record.get('cue_iid');
            var cue_cimei = record.get('cue_cimei');
            var nombre = record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
            view.down('#idcuenta').setValue(cueiid);
            view.down('#cue_cimei').setValue(cue_cimei);
            view.down('#nombrecuenta').setValue(nombre)
            view.down('#sacarcuenta').show();
            
        });
    },

    onSearchClick : function(btn) {
        var controller = this;
        var view = btn.up('reportetgexcesovelocidadview');

        // Obtengo los valores a filtrar
        var patente = view.down('#patente').getValue();
        var idCuenta = view.down('#idcuenta').getValue();

        // Obtengo la URL base de inicio del reporte
        var url = view.baseurl;

        // Verifico valores para armado de URL
        var filters = [];
        
        var fechaDesde = view.down('#fechadesde').getValue();
        var fechaHasta = view.down('#fechahasta').getValue();

        filters.push({
                property:'gps_tRawfechahora:GTEDATESTRING',
                id: 'fechaDesde',
                value: Ext.Date.format(fechaDesde, 'Y-m-d ')+'00:00:00'
            },{
                property:'gps_tRawfechahora:LTEDATESTRING',
                id: 'fechaHasta',
                value: Ext.Date.format(fechaHasta, 'Y-m-d ')+'23:59:59'
            }
        );

        if (patente) {
            filters.push({ 
                property: 'Domain',
                value: patente
            });          
        }
        if (idCuenta) {
            filters.push({ 
                property: 'gps_idCuenta',
                value: idCuenta
            });
        }

        if ( filters.length > 0){
            url = Ext.String.urlAppend(url, "filter="+Ext.encode(filters));
        }

        // Actualizo URL para exportar
        view.urlForExport = url;        

        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
                target.load({
            src: url
        }); 
    },

    onExportarClick: function(btn) {
        var view = btn.up('reportetgexcesovelocidadview');
        view.urlForExport = Ext.String.urlAppend(view.urlForExport, "exportToExcel=yes");
        view.urlForExport = Ext.String.urlAppend( view.urlForExport, '_dc='+new Date().getTime());

        location.href = view.urlForExport;
    }
})