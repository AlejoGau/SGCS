{}Ext.define('SgAppWebReport.controller.ReporteOperadorTiempoYPrioridadController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablaHistoricoSearchModel', 'soperadoresSearchModel' ],
    views : [ 'ReporteOperadorTiempoYPrioridadView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteoperadortiempoyprioridadview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected
            },
            'reporteoperadortiempoyprioridadview button[action=removeFilter]' : {
                click: this.onTodosClick
            },
            'reporteoperadortiempoyprioridadview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteoperadortiempoyprioridadview button[action=export]' : {
                click: this.onExportarClick
            },
            'reporteoperadortiempoyprioridadview #combohistorico' : {
                select: this.onComboHistoricoSelect,
                change : this.onCleanDates
            },
            'reporteoperadortiempoyprioridadview button[action=btnprint]': {
                click: this.onBtnprintClick
            },             
		});
        
	}, // cierro init
    
    initView: function(view){
        var controller = this
        
        view.baseurl =  '/handler/ReporteOperadorTiempoYPrioridadHTML';
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+ controller.application.getToken());//Ext.util.Cookies.get('OAuth_Token')); 
        var url = view.baseurl;
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

        // Ejecuto funcion de asignacion de valores de combo fechas.
        this.onCleanDates( view.down('#combohistorico') ); 

        // Obtengo fecha desde y fecha hasta
        var fechaDesde = view.down('#fechadesde');
        var fechaHasta = view.down('#fechahasta');        
        // Obtengo valor de horas.
        var horaDesde = view.down('#horadesde').getValue();  
        var horaHasta = view.down('#horahasta').getValue();       

        // Paso parametros a la URL.   
        url = Ext.String.urlAppend(url, 'fechaDesde='+Ext.Date.format(fechaDesde.getValue(), 'Y-m-d')+'T'+Ext.Date.format(new Date(horaDesde),'H:i:s'));
        url = Ext.String.urlAppend(url, 'fechaHasta='+Ext.Date.format(fechaHasta.getValue(), 'Y-m-d')+'T'+Ext.Date.format(new Date(), 'H:i:s'));

        var target = view.down('#Iframe');
        
        var operadoresStore = Ext.create('Ext.data.Store',{
            model: this.getSoperadoresSearchModelModel(),
            autoload: false,
            remoteSort: true,
            sorters: [{
                property: 'ope_cnombre',
                direction: 'ASC'
            }],
            pageSize: 10000
        });
        var comboOperador = view.down('#combooperador');
        comboOperador.bindStore(operadoresStore);        
        operadoresStore.load();
        
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
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

                target.load({
            src: url
        }); 
    },
    onBtnprintClick: function (button) {
        var view = button.up('reporteoperadortiempoyprioridadview');
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
    
    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates : function(combo, records, options) {
        var controller = this;
        var view = combo.up('reporteoperadortiempoyprioridadview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');
        var horadesde = view.down('#horadesde');
        var horahasta = view.down('#horahasta');
        
        
        if(!value) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Seteo valor de hora, al momento de la consulta.
            horahasta.setValue(new Date())
            
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
    
    // Manejo de las fechas, cuando se selecciona un mes de tabla historica
    onComboHistoricoSelect: function(combo, records, options) { 
      var view = combo.up('reporteoperadortiempoyprioridadview');
      var value = view.down('#combohistorico').getValue();
      var fechadesde = view.down('#fechadesde');
      var fechahasta = view.down('#fechahasta');
      
      if(value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');
            
            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#fechadesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#fechahasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
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
  
  
    onTodosClick: function(button){   
        var view = button.up('reporteoperadortiempoyprioridadview');       
        var filters = [];
        view.down('#fechadesde').setValue('');       
        view.down('#fechahasta').setValue('');       
        view.down('#combooperador').setValue('');
        view.down('#combohistorico').setValue('');
        
        var url = view.baseurl;
        
        var target = view.down('#Iframe');
                target.load({
            src: url
        });        
        
    },
    
    onSearchClick: function (button,viewparent) {
        var view = button.up('reporteoperadortiempoyprioridadview')?button.up('reporteoperadortiempoyprioridadview'):button; 
        var filters = [];
        var fechaDesde = view.down('#fechadesde').getValue();  
        var fechaHasta = view.down('#fechahasta').getValue();  
        var horaDesde = view.down('#horadesde').getValue();  
        var horaHasta = view.down('#horahasta').getValue();  
        var combooperador = view.down('#combooperador').getValue();
        var table = view.down('#combohistorico').getValue();
        
        var url = view.baseurl;

        if(fechaDesde) {
            url = Ext.String.urlAppend(url,"fechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+'T'+Ext.Date.format(new Date(horaDesde),'H:i:s'));
        }
        if(fechaHasta) {
            url = Ext.String.urlAppend(url,"fechaHasta="+Ext.Date.format(new Date(fechaHasta),'Y-m-d')+'T'+Ext.Date.format(new Date(horaHasta),'H:i:s'));
        }

        if(combooperador) {
            url = Ext.String.urlAppend(url,"idOperador="+combooperador);
        }
        if(table) {
            url = Ext.String.urlAppend(url,"table="+table);
        }
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
         
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        if(url) {
                    target.load({
            src: url
        }); 
        } else {
            target.load({
                src: view.baseurl
            }); 
        }
        
    },

    onExportarClick : function(button, event, options) {
        var view = button.up('reporteoperadortiempoyprioridadview');
        
        /* Obtengo los valores que estan en el filtro, de haberlos */
        var fechaDesde = view.down('#fechadesde').getValue();  
        var fechaHasta = view.down('#fechahasta').getValue();  
        var combooperador = view.down('#combooperador').getValue();
        var table = view.down('#combohistorico').getValue();
        var url = view.baseurl;
      
        /* Agrego los valores tomados del filtro, para que se ejecuten en el SP */
        if(fechaDesde) {
            url = Ext.String.urlAppend(url,"fechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+'T00:00:00');
        }
        if(fechaHasta) {
            url = Ext.String.urlAppend(url,"fechaHasta="+Ext.Date.format(new Date(fechaHasta),'Y-m-d')+'T23:59:59');
        }
        if(combooperador) {
            url = Ext.String.urlAppend(url,"idOperador="+combooperador);
        }
        if(table) {
            url = Ext.String.urlAppend(url,"table="+table);
        }
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        /* Pongo el flag de export en Yes y procede a exportar */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }
                
        location.href = url;

    }
    
});