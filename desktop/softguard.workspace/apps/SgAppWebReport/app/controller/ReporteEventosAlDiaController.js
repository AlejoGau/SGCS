Ext.define('SgAppWebReport.controller.ReporteEventosAlDiaController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablaHistoricoSearchModel' ],
    views : [ 'ReporteEventosAlDiaView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteeventosaldiaview' : {
                afterrender : this.initView   
            },
            'reporteeventosaldiaview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteeventosaldiaview #combohistorico' : {
        		select : this.onComboHistoricoSelect,
                change : this.onCleanDates
			},
            'reporteeventosaldiaview button[action=btnprint]': {
                click: this.onBtnprintClick
            },              

        });
        
	}, // cierro init
    
    
    initView: function(view){
        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/EventosAlDiaReporteHTML';
        var target = view.down('#Iframe');
        
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

        var now = new Date();

        view.down('#fechadesde').setValue(now)
        view.down('#fechahasta').setValue(now)
      
        var url = view.baseurl
        
        url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format( view.down('#fechadesde').getValue(),'Y-m-d'));    
        url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(Ext.Date.add(now, Ext.Date.DAY, 1),'Y-m-d'));
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        }); 
      
    },    
    

    onBtnprintClick: function (button) {
        var view = button.up('reporteeventosaldiaview');
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
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('reporteeventosaldiaview');
  
        var combohistorico = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var target = view.down('#Iframe');
        
        var url = view.baseurl
        
        if(fechadesde) {
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        }
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(Ext.Date.add(fechahasta, Ext.Date.DAY, 1),'Y-m-d'));
        }
        if(combohistorico) {
            url = Ext.String.urlAppend(url,"table="+combohistorico);
        }
            
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        }); 
    },
    
    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates : function(combo, records, options) {
        var controller = this;
        var view = combo.up('reporteeventosaldiaview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');
        
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
        
    onComboHistoricoSelect: function(combo, records, options) {
        var view = combo.up('reporteeventosaldiaview');
        
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
    }
 
});