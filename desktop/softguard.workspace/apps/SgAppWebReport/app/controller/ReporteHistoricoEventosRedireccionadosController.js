Ext.define('SgAppWebReport.controller.ReporteHistoricoEventosRedireccionadosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RedirectorSearchModel' ],
    views : [ 'ReporteHistoricoEventosRedireccionadosView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteeventosredireccionadosview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
          /*  'reporteeventosview #search' : {
                click: this.onSearchClick
            },*/
            'reporteeventosredireccionadosview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reporteeventosredireccionadosview button[action=mail]' : {
                click: this.onMailClick
            },
            'reporteeventosredireccionadosview #combohistorico' : {
				select : this.onComboHistoricoSelect
			},
            'reporteeventosredireccionadosview #fechadesde' : {
    			select : this.onComboHistoricoSelect
			},
            'reporteeventosredireccionadosview #fechahasta' : {
    			select : this.onComboHistoricoSelect
			},
            'reporteeventosredireccionadosview button[action=openmenu]' : {
                click: this.onOpenMenuClick
            },
            'reporteeventosredireccionadosview #seleccionarcuenta' : {
                click: this.onsSeleccionarCuenta
            },
            'reporteeventosredireccionadosview button[action=export]' : {
                click: this.onExportClick
            },
            'reporteeventosredireccionadosview button[action=exportCsv]' : {
                click: this.onExportClick
            },
            'reporteeventosredireccionadosview button[action=exportSplit]' : {
                click: this.onExportClick
            },
            'reporteeventosredireccionadosview button[action=btnprint]': {
                click: this.onBtnprintClick
            },                
            
            
            
		});
        
	}, // cierro init
    
    
    initView: function(view){
        var controller = this
        //if(getParametro('TIPOREPORTE') == 1) {        
            view.baseurl =  '/handler/ReporteHistoricoEventosRedireccionadosHTML';      
        //} else {
        //    view.baseurl =  '/handler/EventosByCuentaHTML';
        //}
        
      //  view.down('#comboregistros').setValue(500)
        
         view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+ controller.application.getToken());//Ext.util.Cookies.get('OAuth_Token')); 
      /*  var sort = [
            {"property":"ta.cod_nprioridad","direction":"ASC"},
            {"property":"r.rec_iid","direction":"DESC"}
            ];
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sort='+Ext.encode(sort));  */ 
        var url = Ext.String.urlAppend(view.baseurl, 'Mostrar='+getParametro('CANTIDADMAXHISTORICO'));   
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        var target = view.down('#Iframe');

            

        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        var now = new Date();
              
        url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(Ext.Date.add(now, Ext.Date.DAY, -1),'Y-m-d')+"T00:00:00");   
        url = Ext.String.urlAppend(url,"FechaHasta="+Ext.Date.format(now,'Y-m-d')+"T"+ Ext.Date.format(now,'H:i:s'));   
        url = Ext.String.urlAppend(url,"fechahoraeventocheck=true"); 
        
        if(getParametro('TIPOREPORTE') == 1) {
            url = Ext.String.urlAppend(url,"Resolucionchk=true");
            url = Ext.String.urlAppend(url,"Timelinechk=true");
            url = Ext.String.urlAppend(url,"Llamadaschk=true");
            url = Ext.String.urlAppend(url,"Observaciones=true");
            url = Ext.String.urlAppend(url,"Categorizacion=true");
            url = Ext.String.urlAppend(url,"CuentaMadre=true");
            url = Ext.String.urlAppend(url,"Origen=true");
            url = Ext.String.urlAppend(url,"rxlogcheck=true");
            url = Ext.String.urlAppend(url,"llamadascheck=true");
            url = Ext.String.urlAppend(url,"Operadorchk=true");
            url = Ext.String.urlAppend(url,"LineaTarjeta=true");                    
        } 

        // me fijo si el tipo es control de accesos y cambio el reporte por defecto
        if (view.reportType == 'historico_eventos'){
            // hago que este agrupado por usuario
            url = Ext.String.urlAppend(url,"agruparUsu=usu");
            url = Ext.String.urlAppend(url,"agruparUsuOrden=ASC");            
            // filtro por tipo de evento deben ser Ingreso, Egreso y Asistencia. cod_ntipo in 8,9,10
            //url = Ext.String.urlAppend(url,"TipoEvento=8,9,10");
            url = Ext.String.urlAppend(url,"ocultarzonachk=true");
            url = Ext.String.urlAppend(url,"Observaciones=true");
        }
        var redirectorStore = Ext.create('Ext.data.Store',{
            model: this.getRedirectorSearchModelModel(),
            autoload: false,
            remoteSort: true,
            sorters: [{
                    property: 'trd_cNombre',
                    direction: 'ASC'
                }],
            pageSize: 10000
        });
        
        redirectorStore.on('load',function(ds,records,o){
            
            //url = Ext.String.urlAppend(url,"Redirector="+ds.getAt(0).data.trd_idKey);
            //url = Ext.String.urlAppend(url,"RedirectorDesc="+ds.getAt(0).data.trd_cNombre);
                    target.load({
            src: url
        });  
        });        
        redirectorStore.load();  
             
    },
    
    onBtnprintClick: function (button) {
        var view = button.up('reporteeventosredireccionadosview');
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
        var view = combo.up('window');
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
        var view = combo.up('window');
        
        //var value = records[0].get('c_periodo');
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
        var view = button.up('reporteeventosredireccionados'); 
        var filters = [];
        var url = view.baseurl;
        if(view.record) {
            var url = Ext.String.urlAppend(view.baseurl,"Cuentas="+view.record.get('cue_iid'));
        }
        var target = view.down('#Iframe');
                target.load({
            src: url
        });        
        
    },
    
    onGrupoChange : function(combo, records, options) {
        var form = combo.up('form');
        var value = records[0].get('gru_ccodigo');
        var t = this;
    	var codigosAlarmaStore = Ext.create('Ext.data.Store',{
            model: this.getTablasCodigosAlarmaSearchModelModel(),           
            pageSize: 200,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'cod_cGrupo',
                    value: value
                }
            ]
        });

        codigosAlarmaStore.load({
            callback : function(records, opciones, success) {
                if (opciones.success) {
                    var codigosalarma = form.down('#codigoalarma');
                    codigosalarma.clearValue();
                    codigosalarma.select(records);
                }
            }
        });
				
	},
    
    onSearchClick: function (button, viewparent) {
        var view = button.up('reporteeventosview')?button.up('reporteeventosview'):button; 
        var filters = [];
        var fechaDesde = view.down('#fechadesde').getValue();
        var HoraDesde = view.down('#horadesde').getValue();
        var fechaHasta = view.down('#fechahasta').getValue();
        var HoraHasta = view.down('#horahasta').getValue();
        var redirector = view.down('#comboredirector').getValue(); 
        var redirectorDesc = view.down('#comboredirector').rawValue;
        
        //var combooperador = view.down('#combooperador').getValue();
        //var dealer = view.down('#dealer').getValue();
        //var dealerHasta = view.down('#dealerhasta').getValue();
        //var cuentadesde = view.down('#cuentadesde').getValue();
        //var cuentahasta = view.down('#cuentahasta').getValue();
        //var nombre = view.down('#nombre').getValue();
        //var nombrecuenta = view.down('#nombrecuenta').getValue();
        
        //var tipocuenta = view.down('#tipocuenta').getValue();
        //var tipoevento = view.down('#tipoevento').getValue();
        //var cod_nalerta = view.down('#cod_nalerta').getValue();
        var cuentamadre = view.down('#cuentamadrecheck').getValue();
        var origen = view.down('#origencheck').getValue();
        var categorizacion = view.down('#categorizacioncheck').getValue();
        //var categorizaciones = view.down('#combocategorizacion').getValue();
        var observaciones = view.down('#observacionescheck').getValue();
        var operador = view.down('#operadorcheck').getValue();
        var resolucion = view.down('#resolucioncheck').getValue();
        var timeline = view.down('#timelinecheck').getValue();
        var llamadas = view.down('#llamadascheck').getValue();
        //var resoluciones = view.down('#comboresolucion').getValue();
        //var comboestado = view.down('#comboestado').getValue();
        //var combohistorico = view.down('#combohistorico').getValue();
        //var codigoalarma = view.down('#codigoalarma').getValue();
        //var idcuenta = view.down('#idcuenta').getValue();
        //var origenes = view.down('#comboOrigenes').getValue();
        //var usuario = view.down('#usuario').getValue();
        //var fieldCustom = view.down('#fieldCustom').getValue();
        
        var url = viewparent.baseurl;
        
        var cantidadregistros = view.down('#comboregistros').getValue();
        //var zona = view.down('#zona').getValue();
        
        //var reportecompleto = view.down('#reportecompleto').getValue()

        // 20/05/2020 NVO por Ordenamiento : https://basecamp.com/2249105/projects/12939010/todos/416879616
        var sort = view.down('#sort').getValue();
        //var agruparcuentacheck = view.down('#agruparcuentacheck').getValue();
        //var agruparusuariocheck = view.down('#agruparusuariocheck').getValue();

        /*if(sort && !agruparcuentacheck && !agruparusuariocheck) {
            var sortSplited = sort.split("|");
            url = Ext.String.urlAppend(url, 'sort='+"[{\"property\":\""+sortSplited[0]+"\",\"direction\":\""+sortSplited[1]+"\"}]");
        }*/

        //if( agruparcuentacheck ) {
        //    url = Ext.String.urlAppend(url,"agrupar=cue_iid");
        //    url = Ext.String.urlAppend(url,"agruparOrden="+agruparcuentacheck);
        //}

        //if( agruparusuariocheck ) {
        //    url = Ext.String.urlAppend(url,"agruparUsu=usu");
        //    url = Ext.String.urlAppend(url,"agruparUsuOrden="+agruparusuariocheck);
        //}
        if(sort) {
            var sortSplited = sort.split("|");
            var sort = ( sortSplited[1] == "DESC" ) ? "DOWN" : "UP";
            url = Ext.String.urlAppend(url,"fechaSpecial="+sort);
        }

        // 18-10 : BC 364687052 - Se agrega combo para filtrar por autoridad
        //var autoridad = view.down('#autoridad').getValue();
        
        // 18-10 : BC 364687052 - Se agrega combo para filtrar por autoridad
        //if(autoridad){
        //    url = Ext.String.urlAppend(url,"Autoridades="+autoridad); 
        //}
        
        // 26/11 : BC 372252600 - Se agrega el filtro de LabelCampoCustom
        //if(fieldCustom){
        //    url = Ext.String.urlAppend(url,"fieldCustom="+fieldCustom); 
        //}

        // BC 413732096 - Mostar/Ocultar columna Horario de Cuenta
        var horacuentacheck = view.down('#horacuentacheck').getValue();
        if ( horacuentacheck ) {
            url = Ext.String.urlAppend(url,"horacuentacheck="+horacuentacheck);
        }
        // BC 413732096 - Mostar/Ocultar columna Horario de Cuenta
        var fechaProceso = view.down('#fechaProceso').getValue();
        if ( fechaProceso ) {
            url = Ext.String.urlAppend(url,"fechaProceso="+fechaProceso);
        }
        // 20/05/2020 : https://basecamp.com/2249105/projects/14758734/todos/413732096
        var fechahoraeventocheck = view.down('#fechahoraeventocheck').getValue();
        if ( fechahoraeventocheck ) {
            url = Ext.String.urlAppend(url,"fechahoraeventocheck="+fechahoraeventocheck)
        }

        /* Agregado para filtrar por palabra el Evento */
        /*var evento = view.down('#evento').getValue(); 
        if (evento) {
           url = Ext.String.urlAppend(url,"evento="+evento); 
        }*/
        
        // BC 379771841 : Agregado del check para Linea de Tarjeta
        var lineatarjeta = view.down('#lineatarjetacheck').getValue();
        if (lineatarjeta) {
            url = Ext.String.urlAppend(url,"LineaTarjeta="+lineatarjeta)
        }
        
        // BC 385072451 : Agregado del check para RxLog
        var rxlogcheck = view.down('#rxlogcheck').getValue();
        if (rxlogcheck) {
            url = Ext.String.urlAppend(url,"rxlogcheck="+rxlogcheck)
        }


        //if(reportecompleto) {
        //    url = url.replace('/handler/EventosByCuentaHTML','/handler/EventosByCuentaNuevoHTML')
        //} else {
        //    url = url.replace('/handler/EventosByCuentaNuevoHTML','/handler/ReporteHistoricoEventosRedireccionadosHTML')
        //}

       /*if(nombrecuenta) {
            url = Ext.String.urlAppend(url,"nombrecuenta="+nombrecuenta);
       }*/
        
       if(redirector){
           url = Ext.String.urlAppend(url,"Redirector="+redirector);
           url = Ext.String.urlAppend(url,"RedirectorDesc="+redirectorDesc);
       }

        if(cantidadregistros) {
            url = Ext.String.urlAppend(url,"Mostrar="+cantidadregistros);
        } else {
            url = Ext.String.urlAppend(url, 'Mostrar='+getParametro('CANTIDADMAXHISTORICO'));
        }
       
        
        if(cantidadregistros) {
            url = Ext.String.urlAppend(url,"limit="+cantidadregistros);
        }
        
        /*if(origenes) {
            url = Ext.String.urlAppend(url,"Origenes="+origenes);
        }*/
        
        if(fechaDesde) {
            url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+"T"+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));
        }
        
        if(fechaHasta) {
            url = Ext.String.urlAppend(url,"FechaHasta="+Ext.Date.format(new Date(fechaHasta),'Y-m-d')+"T"+ Ext.Date.format(new Date(HoraHasta),'H:i:s'));
        }
        
        /*if(combooperador) {
            url = Ext.String.urlAppend(url,"Operador="+combooperador);
        }
        
        if(dealer) {
            url = Ext.String.urlAppend(url,"Dealer="+dealer);
        }
        
        
        if(dealerHasta) {
            url = Ext.String.urlAppend(url,"DealerHasta="+dealerHasta);
        }
        
        
        if(cuentadesde) {
            url = Ext.String.urlAppend(url,"CuentaDesde="+cuentadesde);
        }
        
        if(cuentahasta) {
            url = Ext.String.urlAppend(url,"CuentaHasta="+cuentahasta);
        }
        
        if(nombre) {
            url = Ext.String.urlAppend(url,"Nombre="+nombre);
        }
        if(tipocuenta) {
            url = Ext.String.urlAppend(url,"TipoCuenta="+tipocuenta);
        }*/

        var reportType = viewparent.reportType == 'historico_eventos';

        //if(tipoevento && !reportType) {
        //    url = Ext.String.urlAppend(url,"TipoEvento="+tipoevento);
        //} else {
        //    if (tipoevento && tipoevento.length > 0){
        //        url = Ext.String.urlAppend(url,"TipoEvento="+tipoevento);
        //    } else {
                url = Ext.String.urlAppend(url,"TipoEvento=8,9,10");
        //    }
        //}
        
        /*if(cod_nalerta!=null){
            url = Ext.String.urlAppend(url,"cod_nalerta="+cod_nalerta);
        }
        
        if(cuentamadre) {
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
        if(categorizaciones) {
            url = Ext.String.urlAppend(url,"Categorizaciones="+categorizaciones);
        }
        if(observaciones) {
            url = Ext.String.urlAppend(url,"Observaciones="+observaciones);
        }
        if (operador) {
            url = Ext.String.urlAppend(url,"Operadorchk="+operador);
        }

        if(resolucion) {
            url = Ext.String.urlAppend(url,"Resolucionchk="+resolucion);
        }
        
        if(timeline) {
            url = Ext.String.urlAppend(url,"Timelinechk="+timeline);
        }
        
        if(llamadas) {
            url = Ext.String.urlAppend(url,"Llamadaschk="+timeline);
        }

        if(resoluciones) {
            url = Ext.String.urlAppend(url,"Resoluciones="+resoluciones);
        }
        
        if(comboestado) {
            url = Ext.String.urlAppend(url,"Estado="+comboestado);
        }
        
        if(combohistorico) {
            url = Ext.String.urlAppend(url,"Historico="+combohistorico);
        }

        if(codigoalarma.length>0) {
            url = Ext.String.urlAppend(url,"Codigoalarma="+codigoalarma);
        }

        if(usuario) {
            url = Ext.String.urlAppend(url,"Usuario="+usuario);
        }
        
        
        
        
        if(idcuenta) {
            var url = Ext.String.urlAppend(url,"Cuentas="+idcuenta);
            
            if(zona) {
                var url = Ext.String.urlAppend(url,"Zona="+Ext.util.Format.trim(zona));
            }
        }*/

        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

        


        /**
         * BC 407862025: Agregado el filtro por ID Extendido
         * 
         */
        /*var idExtendidoDesde = view.down('#idExtendidoDesde').getValue();
        if (idExtendidoDesde) {
            url = Ext.String.urlAppend(url,"idExtendidoDesde="+idExtendidoDesde);
        }
        var idExtendidoHasta = view.down('#idExtendidoHasta').getValue();
        if (idExtendidoHasta) {
            url = Ext.String.urlAppend(url,"idExtendidoHasta="+idExtendidoHasta);
        }
        var provincia = view.down('#comboProvincia').getValue();
        if( provincia ) {
            url = Ext.String.urlAppend(url,"provincia="+provincia);
        }*/        
        
        // BC 435966472: Mostrar/ocultar zona de cuenta
        if (viewparent.reportType == 'historico_eventos'){
            url = Ext.String.urlAppend(url,"ocultarzonachk=true");
        }

        var target = viewparent.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        url = url.replace(/#/g,'%23');
        
        if( url ) {
        target.load({
            src: url
        }); 
        } else {
            target.load({
                src: viewparent.baseurl
            }); 
        }
    },
    
    onMailClick: function (button) {
        var view = button.up('reporteeventosredireccionadosview');
                              
                              
        var target = view.down('#Iframe');
        url = target.src;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { //Obtenemos el valor devuelto.
            var mailbody = body;    
            var mail = Ext.widget('mailformview',{
                mailbody: mailbody,
                from: getParametro('MAILSENDERNAME') + " <" +  getParametro('MAILSENDER') +">",
                autoScroll: true,
                subject: getLocale('Reporte de eventos')
            });          
            var win = Ext.widget('window',{
                title: 'Envío de correo',
                layout: 'fit',
                items: mail,
                width: 600,
                height: 600
            }).show();
        });  
    },
    
    onExportClick: function (button) {
        var view = button.up('reporteeventosredireccionadosview');
                              
        var iframe = view.down('#Iframe');

        if ( iframe.src.includes("export") ) {
            iframe.src = iframe.src.replace(/&accion=exportCsv|&accion=exportSplit|&accion=export/gi, "");
        }

        // Fuerzo solo al handler NUEVOHTML
        if ( button.action == "exportSplit") {
            iframe.src = iframe.src.replace("EventosByCuentaHTML", "EventosByCuentaNuevoHTML");
        }

        let url = Ext.String.urlAppend(iframe.src,"accion="+button.action);
        iframe.load({
            src: url
        }); 
    },
    
    onOpenMenuClick: function (button) {
        var controller =this;
        var view = button.up('reporteeventosredireccionadosview'); 
        var win;
            
        if (!view.win){
            win = view.win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                overflowY: 'scroll',
                layout: {
                    type: 'anchor',
                    manageOverflow: 2,
                    reserveScrollbar: true // There will be a gap even when there's no scrollbar
                },
                closeAction:'close', // a proposito por pedido que mantenga las fechas de la ultima busqueda.
                title : 'Filtros',
                width : 600,
        		height : 230,
    			border : false,
                itemId:'searchwin',
    			items : [
                            {
                                xtype: 'form',
                                bodyPadding: '5',
                                defaultButton:'#searchwin #search',
                                itemId:'form',
                                layout: 'anchor',
                                closeAction: 'close',
                                items: [

                                    {
                                        xtype : 'combo',
                                        fieldLabel : 'Redirector',
                                        displayField : 'trd_cNombre',
                                        //queryMode: 'local',
                                        valueField : 'trd_idKey',
                                        anchor: '100%',
                                        itemId: 'comboredirector',
                                        //plugins: ['clearbutton'],
                                        listeners : {
                                            select : function (combo, records, eOpts ) {
                                                //controller.onComboHistoricoSelect(combo, records, eOpts);
                                            },
                                            change : function (combo, records, eOpts ) {
                                                //controller.onCleanDates(combo, records, eOpts);
                                            }
                                        }
                                    },

                                                        {
                                                            xtype: 'fieldset',
                                                            title: 'Eventos',
                                                            layout: 'vbox',
                                                            items: [
                                                                    {
                                                                        xtype: 'container',
                                                                        layout: 'hbox',
                                                                        margin:'0 0 5 0',
                                                                        items:[
                                                                                {
                                                                                    xtype : 'datefield',
                                                                                    fieldLabel : 'Desde',
                                                                                    name : "fechadesde",
                                                                                    bindToModel : false,
                                                                                    itemId : 'fechadesde',
                                                                                    allowBlank: false,
                                                                                    labelWidth:50,
                                                                                    width:230
                                                                                },{
                                                                                    fieldLabel: 'Hora',
                                                                                    xtype: 'timefield',
                                                                                    itemId: 'horadesde',
                                                                                    format: 'H:i',
                                                                                    altFormats:'H:i',
                                                                                    value: '00:00',
                                                                                    allowBlank: false,
                                                                                    increment: 10,
                                                                                    labelWidth:40,
                                                                                    width: 123,
                                                                                    margin:'0 0 0 7'
                                                                                }
                                                                            ]
                                                                    },{
                                                                        xtype: 'container',
                                                                        layout: 'hbox',
                                                                        margin:'0 0 5 0',
                                                                        items:[
                                                                                {
                                                                                    xtype : 'datefield',
                                                                                    fieldLabel : 'Hasta',
                                                                                    itemId : 'fechahasta',
                                                                                    bindToModel : false,
                                                                                    name : "fhasta",
                                                                                    allowBlank: false,
                                                                                    labelWidth:50,
                                                                                    width:230
                                                                                },{
                                                                                    fieldLabel: 'Hora',
                                                                                    xtype: 'timefield',
                                                                                    itemId: 'horahasta',
                                                                                    format: 'H:i',
                                                                                    altFormats:'H:i',
                                                                                    value: '23:50',
                                                                                    allowBlank: false,
                                                                                    increment: 10,
                                                                                    labelWidth:40,
                                                                                    width: 123,                                                                        
                                                                                    margin:'0 0 0 7'
                                                                                }
                                                                            ]
                                                                    },{
                                                                        xtype: 'combo',
                                                                        itemId: 'comboregistros',
                                                                        fieldLabel: 'Cantidad de registros',                                                
                                                                        width:'100%',                                                
                                                                        store: [
                                                                                [200,200],
                                                                                [500,500],
                                                                                [1000,1000],
                                                                                [1500,1500],
                                                                                [2000,2000],
                                                                                [2500,2500],
                                                                                [5000,5000],
                                                                                [7500,7500],
                                                                                [10000,10000]
                                                                            ]
                                                                    }



                                                    ]    
                                                        
                                                }



                                                ,{
                                                    xtype: 'fieldset',
                                                    title: 'Mostrar',
                                                    hidden: true,
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype : 'checkbox',
                                                            itemId: 'origencheck',
                                                            fieldLabel : 'Origen',
                                                            name:'origencheck'
                                                            
                                                        },{
                                                            xtype : 'checkbox',
                                                            itemId: 'cuentamadrecheck',
                                                            fieldLabel : 'Cuenta panel',
                                                            name:'cuentamadrecheck'
                                                            
                                                        },{
                                                            xtype : 'checkbox',
                                                            itemId: 'categorizacioncheck',
                                                            fieldLabel : 'Categorizacion',
                                                            name:'categorizacioncheck'
                                                            
                                                        },{
                                                            xtype : 'checkbox',
                                                            itemId: 'observacionescheck',
                                                            fieldLabel : 'Observaciones',
                                                            name:'observacionescheck'
                                                            
                                                        }
                                                        ,{
                                                            xtype : 'checkbox',
                                                            itemId: 'resolucioncheck',
                                                            fieldLabel : 'Resolucion',
                                                            name:'resolucioncheck'
                                                            
                                                        },{
                                                            xtype : 'checkbox',
                                                            itemId: 'timelinecheck',
                                                            fieldLabel : 'Timeline'
                                                            
                                                        },{
                                                            xtype : 'checkbox',
                                                            itemId: 'llamadascheck',
                                                            fieldLabel : 'Llamadas'
                                                            
                                                        }
                                                        // BC 379771841 : Agregado del check para Linea de Tarjeta
                                                        ,{
                                                            xtype : 'checkbox',
                                                            itemId: 'lineatarjetacheck',
                                                            fieldLabel : 'Linea de tarjeta', 
                                                            checked: false
                                                        }
                                                        // BC 385072451 : Agregado del check para RxLog
                                                        ,{
                                                            xtype : 'checkbox',
                                                            itemId: 'rxlogcheck',
                                                            fieldLabel : 'Log', 
                                                            checked: false
                                                        }
                                                        // BC 411070745 : Agregado del check para Operador
                                                        ,{
                                                            xtype : 'checkbox',
                                                            itemId: 'operadorcheck',
                                                            fieldLabel : 'Operador', 
                                                            checked: false                                        
                                                        }
                                                        // 20/05/2020 : https://basecamp.com/2249105/projects/14758734/todos/413732096
                                                        ,{
                                                            xtype : 'checkbox',
                                                            itemId: 'fechahoraeventocheck',
                                                            fieldLabel : 'Horario del evento', 
                                                            checked: true
                                                        }
                                                        // 04/03/2019 : Solicitado por Fernando Canonico, cliente Mexicano
                                                        ,{
                                                            xtype : 'checkbox',
                                                            itemId: 'horacuentacheck',
                                                            fieldLabel : 'Horario Cuenta', 
                                                            checked: false
                                                        } ,{
                                                                xtype : 'checkbox',
                                                                itemId: 'fechaProceso',
                                                                fieldLabel : 'Fecha Proceso', 
                                                                checked: false
                                                            }  
                                                            
                                                    ]
                                                },{
                                                            xtype: 'fieldset',
                                                            title: 'Orden',
                                                            hidden: true,
                                                            layout: 'vbox',
                                                            items: [
                                                                {
                                                                                                        
                                                                    xtype: 'combo',
                                                                    itemId: 'sort',
                                                                    fieldLabel: 'Ordenar por',                                        
                                                                    queryMode: 'local',
                                                                    width:'100%',
                                                                    store:[
                                                                            ['rec_tfechahora|ASC', getLocale('Fecha ASC')],
                                                                            ['rec_tfechahora|DESC', getLocale('Fecha DESC')]
                                                                        ]
                                                                    
                                                                }
                                                                    
                                                            ]
                                                 }


                                ]
                                ,buttons: [{
                                    text     : 'Buscar',
                                    iconCls: 'icon-find',
                                    itemId: 'search',
                                    action: 'search',
                                    listeners: {
                                        click: function(button) {
                                            var myform = button.up('#form').getForm();
                                            if(myform.isValid()){
                                                controller.onSearchClick(win,view);
                                                view.searchRecord = button.up('window').down('#form').getForm().getValues()
                                                win.close();
                                            }
                                        }
                                    }
                                }]                                
                            }
                ]

    		});// FIN DEFINICION DEL WIN
            
            var redirectorStore = Ext.create('Ext.data.Store',{
                model: this.getRedirectorSearchModelModel(),
                autoload: false,
                remoteSort: true,
                sorters: [{
                     property: 'trd_cNombre',
                     direction: 'ASC'
                 }],
                pageSize: 10000
            });
            var comboRedirector = win.down('#comboredirector');
            redirectorStore.on('load',function(ds,records,o){
                //comboRedirector.select(ds.getAt(0));    
            });
            comboRedirector.bindStore(redirectorStore);       
            redirectorStore.load();
            
            
            /*if(getParametro('TIPOREPORTE') == 1) {
                win.down('#origencheck').setValue(true);
                win.down('#cuentamadrecheck').setValue(true);
                win.down('#categorizacioncheck').setValue(true);
                win.down('#observacionescheck').setValue(true);
                win.down('#resolucioncheck').setValue(true);
                win.down('#timelinecheck').setValue(true);
                win.down('#llamadascheck').setValue(true);
                win.down('#reportecompleto').setValue(true);
                win.down('#llamadascheck').setValue(true);
                win.down('#rxlogcheck').setValue(true);
                win.down('#operadorcheck').setValue(true);
                win.down('#lineatarjetacheck').setValue(true);
            } else {
                win.down('#reportecompleto').setValue(false)             
                win.down('#agrupar').show()       
            }*/

            // me fijo si el tipo es control de accesos y cambio el reporte por defecto

            var now = new Date();
            //win.down('#fechadesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            win.down('#fechadesde').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            win.down('#fechadesde').setValue(Ext.Date.add(now, Ext.Date.DAY, -1));
            
            win.down('#fechahasta').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            win.down('#fechahasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            win.down('#fechahasta').setValue(now);
            
            // 05/09/2018 Se quita para que inicie en 00:00 y 23:50
            win.down('#horadesde').setValue('00:00')//Ext.Date.format(Ext.Date.add(now, Ext.Date.MINUTE, -60),'H:i'))
            win.down('#horahasta').setValue(Ext.Date.format(now,'H:i'))
            
            /*var historicoStore = Ext.create('Ext.data.Store',{
                model: this.getTablaHistoricoSearchModelModel(),
                autoload: false,
                sorters: [{
                     property: 'c_periodo',
                     direction: 'DESC'
                 }],
                 pageSize: 10000
            });
            var comboHistorico = win.down('#combohistorico');
            comboHistorico.bindStore(historicoStore);        
            historicoStore.load();
            
            
            // 18-10 : BC 364687052 - Se agrega combo para filtrar por autoridad
            var autoridadStore = Ext.create('Ext.data.Store',{
                model: this.getT_autoridadesSearchModelModel(),
                autoload: false,
                pageSize: 10000
            });
            var comboAutoridad = win.down('#autoridad');
            comboAutoridad.bindStore(autoridadStore);        
            autoridadStore.load();
            

            var codigoAlarmaStore = Ext.create('Ext.data.Store',{
                model: this.getSoftguardCodigoAlarmaModelModel(),
                autoload: false,
                sorters: [{
                     property: 'cod_cdescripcion',
                     direction: 'ASC'
                 }],
                 pageSize: 10000
            });
            var comboCodigoalarma = win.down('#codigoalarma');
            comboCodigoalarma.bindStore(codigoAlarmaStore);        
            
            
            
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
            var comboOperador = win.down('#combooperador');
            comboOperador.bindStore(operadoresStore);        
            operadoresStore.load();
            
            
            var tipoCuentaStore = Ext.create('Ext.data.Store',{
                model: this.getTablasTiposSearchModelModel(),
                autoload: false,
                sorters: [{
                     property: 'tip_cdescripcion',
                     direction: 'ASC'
                 }],
                 pageSize: 10000
            });
            var comboTipoCuenta = win.down('#tipocuenta');
            comboTipoCuenta.bindStore(tipoCuentaStore);        
            tipoCuentaStore.load();
            
            var usuarioStore = Ext.create('Ext.data.Store',{
                model: this.getUsuarioSearchModelModel(),
                autoload: false,
                sorters: [{
                     property: 'usu_cnombre',
                     direction: 'ASC'
                 }],
                 pageSize: 10000
            });
            var comboTipoCuenta = win.down('#usuario');
            comboTipoCuenta.bindStore(usuarioStore);        
            usuarioStore.load();
            
            if(view.searchRecord) {            
                win.down('#form').getForm().setValues(view.searchRecord)
            }
            
            
            var comboGrupos = win.down('#grupos');               
            var combostore = Ext.create('Ext.data.Store',{
                model: this.getTablasGruposSearchModelModel(),           
                pageSize: 200,
                remoteSort: true
            });       
            comboGrupos.bindStore(combostore);        
            combostore.load();

            codigoAlarmaStore.load();
            */
        } else{
            win = view.win;
        }
        win.show();
    },
    
    onsSeleccionarCuenta: function (win,view) {
        view.win = win;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
        	title : 'Seleccione Cuentas',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentahelperview',
                    filterTipo: 'nofilter',
                    caller: view
                }
            ]
		});
		win.show();
        
        
    },
    
    onCuentaSelected:  function (selection,view,recordPreSelected) {
        var controller = this;
        Ext.Array.each(selection, function(record){
        
            var cueiid = record.get('cue_iid');
            var nombre = record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
            view.win.down('#idcuenta').setValue(cueiid)
            view.win.down('#nombrecuenta').setValue(nombre)
            view.win.down('#sacarcuenta').show();
            view.win.down('#zona').show();
            
            
            var zoneStore =Ext.create('Ext.data.Store',{
                model: controller.getZonaSearchModelModel(),
                remoteFilter: true,
                pageSize: 250,
                remoteSort: true,
                sorters:{
                        property: 'orderCodigo',
                        direction: 'ASC'
                    },
                filters: [
                    {
                        property: 'zon_ccodigo:LIKENOT',
                        value: 'PAR'
                    },{
                        property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                        value: ''
                    },{
                        property: 'zon_iidcuenta',
                        value:record.get('cue_iid')
                    }
                ]
            });
            
            view.win.down('#zona').bindStore(zoneStore);
           
            zoneStore.load({callback:function() {
                view.win.down('#zona').setDisabled(false)
            }});
            

        });
    },
    
});