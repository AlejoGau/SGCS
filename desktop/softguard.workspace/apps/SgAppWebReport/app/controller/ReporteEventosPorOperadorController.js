Ext.define('SgAppWebReport.controller.ReporteEventosPorOperadorController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaLineasStore' ],
    models : [ 'TablaHistorico_EventosPorOperadorModel', 'soperadoresSearchModel', 'SoftguardCodigoAlarmaModel' ],
    views : [ 'ReporteEventosPorOperadorView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteeventosporoperadorview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reporteeventosporoperadorview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteeventosporoperadorview button[action=removeall]' : {
                click: this.onTodosClick
            },            
            'reporteeventosporoperadorview button[action=export]' : {
                click: this.onExportClick
            },
            'reporteeventosporoperadorview button[action=seleccionarCuenta]' : {
                click: this.onSeleccionarCuenta
            },
            'reporteeventosporoperadorview button[action=seleccionarDealerDesde]' : {
                click: this.onSeleccionarDealerDesde
            },
            'reporteeventosporoperadorview button[action=seleccionarDealerHasta]' : {
                click: this.onSeleccionarDealerHasta
            },
            'reporteeventosporoperadorview #combohistorico' : {
                select : function (combo, records, eOpts ) {
                    this.onComboHistoricoSelect(combo, records, eOpts);
                },
                change : function (combo, records, eOpts ) {
                    this.onCleanDates(combo, records, eOpts);
                }                
            },
            'reporteeventosporoperadorview [action=btnprint]': {
                click: this.onBtnprintClick
            }        
        });
        
    }, // cierro init
    
    initView: function(view) {

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

        var alarmaDesdeStore = Ext.create('Ext.data.Store',{
            model: this.getSoftguardCodigoAlarmaModelModel(),
            autoload: false,
            sorters: [{
                 property: 'cod_cdescripcion',
                 direction: 'ASC'
             }],
             pageSize: 10000
        });



        var comboAlarmaDesde = view.down('#alarmaDesde');
        comboAlarmaDesde.bindStore(alarmaDesdeStore);        
        alarmaDesdeStore.load();

        var alarmaHastaStore = Ext.create('Ext.data.Store',{
            model: this.getSoftguardCodigoAlarmaModelModel(),
            autoload: false,
            sorters: [{
                 property: 'cod_cdescripcion',
                 direction: 'ASC'
             }],
             pageSize: 10000
        });
        var comboAlarmaHasta = view.down('#alarmaHasta');
        comboAlarmaHasta.bindStore(alarmaHastaStore);        
        alarmaHastaStore.load();        
        
        var operadorDesdeStore = Ext.create('Ext.data.Store',{
            model: this.getSoperadoresSearchModelModel(),
            autoload: false,
            remoteSort: true,
            sorters: [{
                 property: 'ope_cnombre',
                 direction: 'ASC'
             }],
            pageSize: 10000
        });
        var comboOperadorDesde = view.down('#operadorDesde');
        comboOperadorDesde.bindStore(operadorDesdeStore);        
        operadorDesdeStore.load();        
        

        var operadorHastaStore = Ext.create('Ext.data.Store',{
            model: this.getSoperadoresSearchModelModel(),
            autoload: false,
            remoteSort: true,
            sorters: [{
                 property: 'ope_cnombre',
                 direction: 'ASC'
             }],
            pageSize: 10000
        });
        var comboOperadorHasta = view.down('#operadorHasta');
        comboOperadorHasta.bindStore(operadorHastaStore);        
        operadorHastaStore.load(); 

        var historicoStore = Ext.create('Ext.data.Store',{
            model: this.getTablaHistorico_EventosPorOperadorModelModel(),
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


        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReporteEventosPorOperadorHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"                    +window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
        target.load({
            src: url
        }); 
    },
    onBtnprintClick: function (button) {
        var view = button.up('reporteeventosporoperadorview');
        var target = view.down('#Iframe');

        url = target.src;
        var contenido;
        fetch(url)
            .then(function (response) {
                console.log("response", response)
                return response.text();
            })
            .then(function (body) { //Obtenemos el valor devuelto.
                printHTMLContent(body);
                /*
                console.log("BODY", body)
                var win = Ext.create('Ext.window.Window', {
                    title: 'Mi ventana',
                    html: "",
                    modal: true,
                });
                // Abrir en una nueva pestaña
                contenido = body.replace('BODY', 'body onload="window.print()"')
                
                let myWindow = window.open();
                myWindow.document.write(contenido);
                myWindow.document.close();
                myWindow.focus();
                myWindow.print();
                */
            });
    },
    onComboHistoricoSelect: function(combo, records, options) {     
        var view = combo.up('reporteeventosporoperadorview');
        
        //var value = records[0].get('c_periodo');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechaDesde');
        var fechahasta = view.down('#fechaHasta');
      
        if(value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');
            
            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#fechaDesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#fechaHasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
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

    onCleanDates : function(combo, records, options) {
        var controller = this;
        var view = combo.up('reporteeventosporoperadorview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechaDesde');
        var fechahasta = view.down('#fechaHasta');
        
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
    onTodosClick:function(button) {
        var view = button.up('reporteeventosporoperadorview');
        view.down('#fechaDesde').setValue('');
        view.down('#fechaHasta').setValue('');
        view.down('#flagDealerSelector').setValue('');
        view.down('#dealerDesde').setValue('');
        view.down('#dealerHasta').setValue('');
        view.down('#cuentaDesde').setValue('');
        view.down('#cuentaHasta').setValue('');
        view.down('#operadorDesde').setValue('');
        view.down('#operadorHasta').setValue('');
        view.down('#alarmaDesde').setValue('');
        view.down('#alarmaHasta').setValue('');
       
        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        var target = view.down('#Iframe');

        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        view.urltoexport = url;
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"                    +window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        /* Llamo a la URL */
                target.load({
            src: url
        });         
    },


    onSearchClick : function(button, event, options) {
        var view = button.up('reporteeventosporoperadorview');

        /* Tomo los valores de los combo creado en la view */
        //var objetivo = view.down('#idcuenta').getValue();
         
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var dealerdesde = view.down('#dealerDesde').getValue();
        var dealerhasta = view.down('#dealerHasta').getValue();
        var cuentadesde = view.down('#cuentaDesde').getValue();
        var cuentahasta = view.down('#cuentaHasta').getValue();
        var operadordesde = view.down('#operadorDesde').getValue();
        var operadorhasta = view.down('#operadorHasta').getValue();
        var alarmadesde = view.down('#alarmaDesde').getValue();
        var alarmahasta = view.down('#alarmaHasta').getValue();
        
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        var combohistorico = view.down('#combohistorico').getValue();

        if(combohistorico) {
            url = Ext.String.urlAppend(url,"table="+combohistorico);
        }


        if(dealerdesde) {   
            url = Ext.String.urlAppend(url,"dealerdesde="+dealerdesde);
        }

        if(dealerhasta) {   
            url = Ext.String.urlAppend(url,"dealerhasta="+dealerhasta);
        }

        if(cuentadesde) {   
            url = Ext.String.urlAppend(url,"cuentadesde="+cuentadesde);
        }        

        if(cuentahasta) {   
            url = Ext.String.urlAppend(url,"cuentahasta="+cuentahasta);
        }     

        if(operadordesde) {   
            url = Ext.String.urlAppend(url,"operadordesde="+operadordesde);
        }           

        if(operadorhasta) {   
            url = Ext.String.urlAppend(url,"operadorhasta="+operadorhasta);
        }           
   

        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }

        if(alarmadesde){
            url = Ext.String.urlAppend(url,"alarmadesde="+alarmadesde);
        }

        if(alarmahasta){
            url = Ext.String.urlAppend(url,"alarmahasta="+alarmahasta);
        }
        
        view.urltoexport = url;
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        /* Llamo a la URL */
                target.load({
            src: url
        }); 

    },
    
    
    onSeleccionarDealerDesde: function (button, events, eOps) {
        var view = button.up('reporteeventosporoperadorview');
        //view.win = win;
        view.down('#flagDealerSelector').setValue('dealerDesde');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Dealer Desde',
			closeAction : 'destroy',
            itemId: 'dealerDesdeWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
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
        var view = button.up('reporteeventosporoperadorview');
        view.down('#flagDealerSelector').setValue('dealerHasta');
        //view.win = win;
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Dealer Hasta',
			closeAction : 'destroy',
            itemId: 'dealerDesdeWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
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
    
    onCuentaSelected:  function (selection, view, recordPreSelected) {
        var controller = this;
        
        Ext.Array.each(selection, function(record){
            var cueiid = record.get('cue_iid');
            var nombre = record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
            if(view.down('#flagDealerSelector').value=='dealerDesde'){
                view.down('#dealerDesde').setValue(record.get('cue_clinea'));
                
                view.down('#sacarDealerDesde').show();          
            }
            if(view.down('#flagDealerSelector').value=='dealerHasta'){
                view.down('#dealerHasta').setValue(record.get('cue_clinea'));
                
                view.down('#sacarDealerHasta').show();          
            }            

        });
    },
    
    onExportClick : function(button){
        var view = button.up('reporteeventosporoperadorview');
        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    }
});