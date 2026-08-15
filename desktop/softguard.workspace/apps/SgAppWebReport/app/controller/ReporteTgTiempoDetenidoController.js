Ext.define('SgAppWebReport.controller.ReporteTgTiempoDetenidoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  'TablaHistoricoSearchModel' ],
    views : [ 'ReporteTgTiempoDetenidoView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportetgtiempodetenidoview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected : this.onCuentaSelected,
                onsSeleccionarCuenta : this.onsSeleccionarCuenta
            },
            'reportetgtiempodetenidoview button[action=search]' : {
                click : this.onSearchClick,
            },
            'reportetgtiempodetenidoview button[action=export]' : {
                click : this.onExportarClick,
            },
            'reportetgtiempodetenidoview #combohistorico' : {
        		select : this.onComboHistoricoSelect,
                change : this.onCleanDates
			},     
            'reportetgtiempodetenidoview button[action=btnprint]': {
                click: this.onBtnprintClick
            },                   
        });
        
	}, // cierro init

    initView: function(view) {

        view.baseurl =  '/handler/ReporteTgTiempoDetenidoHTML';
        view.urlForExport = view.baseurl;
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());

                target.load({
            src: url
        }); 

        /* Carga el combo de historico */
        var historicoStore = Ext.create('Ext.data.Store',{
            model: this.getTablaHistoricoSearchModelModel(),
            autoload: false,
            sorters: [{
                 property: 'c_periodo',
                 direction: 'DESC'
             }],
             pageSize: 10000
        });
        var comboHistorico = view.down('#combohistorico');
        comboHistorico.bindStore(historicoStore);        
        historicoStore.load();        
    },

    onBtnprintClick: function (button) {
        var view = button.up('reportetgtiempodetenidoview');
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
    
    onComboHistoricoSelect: function(combo, records, options) {
        var view = combo.up('reportetgtiempodetenidoview');
      
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#FechaDesde');
        var fechahasta = view.down('#FechaHasta');
        
        if(value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');
            
            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#FechaDesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#FechaHasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
        }
        
        if(value) {
          var fechahistorico = value.match(/\d{4}/g) + "-" + value.match(/\d{2}$/g);
          var month = value.match(/\d{2}$/g) - 1;
          
          var fechahistoricodesde = Ext.Date.getFirstDateOfMonth(new Date(value.match(/\d{4}/g),month));
          var fechahistoricohasta = Ext.Date.getLastDateOfMonth(new Date(value.match(/\d{4}/g),month));
          
          /*
          fechadesde.setValue(fechahistoricodesde);
          fechahasta.setValue(fechahistoricohasta);
          */
          
          fechadesde.setMinValue(fechahistoricodesde);
          fechadesde.setMaxValue(fechahistoricohasta);
          fechahasta.setMinValue(fechahistoricodesde);
          fechahasta.setMaxValue(fechahistoricohasta);
          
        
          if(fechadesde.getValue() || fechahasta.getValue()) {
              
              if( fechadesde.getValue() && new Date(fechadesde.getValue()).getTime() < fechahistoricodesde) {
                  fechadesde.markInvalid("Se encuentra fuera de rango");
              }
              
              if( fechahasta.getValue() && new Date(fechahasta.getValue()).getTime() > fechahistoricohasta) {
                  fechahasta.markInvalid("Se encuentra fuera de rango");              
              }
              
          } else {
              fechadesde.setValue(fechahistoricodesde);
              fechahasta.setValue(fechahistoricohasta);
          }
        }
        view.dateSelected = value;
      
      
        
    },
    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates : function(combo, records, options) {
        var controller = this;
        var view = combo.up('reportetgtiempodetenidoview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#FechaDesde');
        var fechahasta = view.down('#FechaHasta');
        
        if(!value) {
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
        var view = btn.up('reportetgtiempodetenidoview');
        var combohistorico = view.down('#combohistorico').getValue(); 
        // Obtengo los valores a filtrar
        var FechaDesde = view.down('#FechaDesde').getValue();
        var FechaHasta = view.down('#FechaHasta').getValue();
        var HoraDesde = view.down('#HoraDesde').getValue();
        var HoraHasta = view.down('#HoraHasta').getValue();
        var Minutos = view.down('#Minutos').getValue();
        var idCuenta = view.down('#idcuenta').getValue();
        var cue_cimei = view.down('#cue_cimei').getValue();
        var nombreCuenta = view.down('#nombrecuenta').getValue();

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
        if (idCuenta) {
            filters.push({ 
                property: 'pos_idCuenta',
                value: idCuenta
            });
        }
        if (cue_cimei) {
            filters.push({ 
                property: 'pos_cimei',
                value: cue_cimei
            });
        }

        if (nombreCuenta) {
            url = Ext.String.urlAppend(url, 'nombreCuenta='+nombreCuenta);
        }
        if (Minutos) {
            url = Ext.String.urlAppend(url, 'Minutos='+Minutos);
        }
        if(combohistorico) {
            url = Ext.String.urlAppend(url,"Historico="+combohistorico);
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
        var view = btn.up('reportetgtiempodetenidoview');
        view.urlForExport = Ext.String.urlAppend(view.urlForExport, "exportToExcel=yes");

        view.urlForExport = Ext.String.urlAppend( view.urlForExport, '_dc='+new Date().getTime());

        location.href = view.urlForExport


        /*var view = button.up('reportehoraspersonallimpiezacleanappview');
        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }
        

        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;    */    
    }



})