Ext.define('SgAppWebReport.controller.ReporteTgResumenRecorridosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteTgResumenRecorridosView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportetgresumenrecorridosview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected : this.onCuentaSelected,
                onsSeleccionarCuenta : this.onsSeleccionarCuenta
            },
            'reportetgresumenrecorridosview button[action=search]' : {
                click : this.onSearchClick,
            },
            'reportetgresumenrecorridosview button[action=export]' : {
                click : this.onExportarClick,
            },
            'reportetgresumenrecorridosview button[action=btnprint]': {
                click: this.onBtnprintClick
            }            
        });
        
	}, // cierro init

    initView: function(view) {
        view.baseurl =  '/handler/ReporteTgResumenRecorridosHTML';


        view.urlForExport = view.baseurl;
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        //var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());

        var now = new Date();
        view.down('#FechaDesde').setValue(now);
        view.down('#FechaHasta').setValue(now);

        this.onSearchClick(view.down('button[action=search]'));

    },
    onBtnprintClick: function (button) {
        var view = button.up('reportetgresumenrecorridosview');
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
        var view = btn.up('reportetgresumenrecorridosview');

        // Obtengo los valores a filtrar
        var FechaDesde = view.down('#FechaDesde').getValue();
        var FechaHasta = view.down('#FechaHasta').getValue();
        var HoraDesde = view.down('#HoraDesde').getValue();
        var HoraHasta = view.down('#HoraHasta').getValue();
        var idCuenta = view.down('#idcuenta').getValue();
        var cue_cimei = view.down('#cue_cimei').getValue();

        // BC 412253681 - Se agregan los input de busqueda de CuentaDesde, Hasta.
        var cue_clinea = view.down('#dealer').getValue();
        var cue_clineaHasta = view.down('#dealerhasta').getValue();
        var cue_ncuentaDesde = view.down('#cuentadesde').getValue();
        var cue_ncuentaHasta = view.down('#cuentahasta').getValue();
        var consumoLitrosKm = view.down('#consumoLitrosKm').getValue();
        var precioGasolina = view.down('#precioGasolina').getValue();
        // Obtengo la URL base de inicio del reporte
        var url = view.baseurl;

        // Verifico valores para armado de URL
        var filters = [];
        if (FechaDesde) {
            filters.push({ 
                property: 'fechaDesde',
                value: Ext.Date.format(new Date(FechaDesde),'Y-m-d')+"T"+ Ext.Date.format(new Date(HoraDesde),'H:i:s')
            });
            url = Ext.String.urlAppend(url, "FechaDesde="+Ext.Date.format(new Date(FechaDesde),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));          
        }
        if (FechaHasta) {
            filters.push({ 
                property: 'fechaHasta',
                value: Ext.Date.format(new Date(FechaHasta),'Y-m-d')+"T"+ Ext.Date.format(new Date(HoraHasta),'H:i:s')
            });
            url = Ext.String.urlAppend(url, "FechaHasta="+Ext.Date.format(new Date(FechaHasta),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraHasta),'H:i:s'));
        }
        if (consumoLitrosKm !== null && consumoLitrosKm !== undefined && consumoLitrosKm !== '') {
                url = Ext.String.urlAppend(url, "consumoLitrosKm=" + consumoLitrosKm);
            }
            if (precioGasolina !== null && precioGasolina !== undefined && precioGasolina !== '') {
                url = Ext.String.urlAppend(url, "precioGasolina=" + precioGasolina);
            }
        if (idCuenta) {
            filters.push({ 
                property: 'gps_idCuenta',
                value: idCuenta
            });
        }
        if (cue_cimei) {
            filters.push({ 
                property: 'gps_cimei',
                value: cue_cimei
            });
        }

        if ( filters.length > 0){
            url = Ext.String.urlAppend(url, "filter="+Ext.encode(filters));
        }


        // BC 412253681 - Se agregan los input de busqueda de CuentaDesde, Hasta.
        if(cue_clinea) {
            url = Ext.String.urlAppend(url,"cue_clinea="+cue_clinea);
        }
        if(cue_clineaHasta) {
            url = Ext.String.urlAppend(url,"cue_clineaHasta="+cue_clineaHasta);
        }
        if(cue_ncuentaDesde) {
            url = Ext.String.urlAppend(url,"cue_ncuentaDesde="+cue_ncuentaDesde);
        }
        if(cue_ncuentaHasta) {
            url = Ext.String.urlAppend(url,"cue_ncuentaHasta="+cue_ncuentaHasta);
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
        var view = btn.up('reportetgresumenrecorridosview');
        view.urlForExport = Ext.String.urlAppend(view.urlForExport, "exportToExcel=yes");
        var target = view.down('#Iframe');
        view.urlForExport = Ext.String.urlAppend(view.urlForExport, '_dc='+new Date().getTime());
        location.href = view.urlForExport;
    }
})