Ext.define('SgAppWebReport.controller.ReporteHistoricoEventosCuentaNoHabController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteHistoricoEventosCuentaNoHabView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehistoricoeventoscuentanohabview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportehistoricoeventoscuentanohabview #search' : {
                click: this.onSearchClick
            },
            'reportehistoricoeventoscuentanohabview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reportehistoricoeventoscuentanohabview button[action=mail]' : {
                click: this.onMailClick
            },
            'reportehistoricoeventoscuentanohabview #combohistorico' : {
				select : this.onComboHistoricoSelect
			},
            'reportehistoricoeventoscuentanohabview #fechadesde' : {
    			select : this.onComboHistoricoSelect
			},
            'reportehistoricoeventoscuentanohabview #fechahasta' : {
    			select : this.onComboHistoricoSelect
			},
            'reportehistoricoeventoscuentanohabview button[action=openmenu]' : {
                click: this.onOpenMenuClick
            },
            'reportehistoricoeventoscuentanohabview #seleccionarcuenta' : {
                click: this.onsSeleccionarCuenta
            },
            'reportehistoricoeventoscuentanohabview button[action=export]' : {
                click: this.onExportClick
            },
            'reportehistoricoeventoscuentanohabview button[action=exportCsv]' : {
                click: this.onExportClick
            },
            'reportehistoricoeventoscuentanohabview button[action=exportSplit]' : {
                click: this.onExportClick
            },
            'reportehistoricoeventoscuentanohabview button[action=btnprint]': {
                click: this.onBtnprintClick
            },                
            
            
            
		});
        
	}, // cierro init
    
    
    initView: function(view){
        var controller = this
        //if(getParametro('TIPOREPORTE') == 1) {        
            view.baseurl =  '/handler/ReporteHistoricoEventosCuentaNoHabHTML';      
        //} else {
        //    view.baseurl =  '/handler/EventosByCuentaHTML';
        //}
        
      //  view.down('#comboregistros').setValue(500)
        url = Ext.String.urlAppend("table","p_recepcion");
         view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+ controller.application.getToken());//Ext.util.Cookies.get('OAuth_Token')); 
      /*  var sort = [
            {"property":"ta.cod_nprioridad","direction":"ASC"},
            {"property":"r.rec_iid","direction":"DESC"}
            ];
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sort='+Ext.encode(sort));  */ 
        var url = view.baseurl;//= Ext.String.urlAppend(view.baseurl, 'Mostrar='+getParametro('CANTIDADMAXHISTORICO'));   
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        var target = view.down('#Iframe');

            

        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"                    +window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        var now = new Date();
              
        /*url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(Ext.Date.add(now, Ext.Date.DAY, -1),'Y-m-d')+"T00:00:00");   
        url = Ext.String.urlAppend(url,"FechaHasta="+Ext.Date.format(now,'Y-m-d')+"T"+ Ext.Date.format(now,'H:i:s'));   
        url = Ext.String.urlAppend(url,"fechahoraeventocheck=true"); 
        

        // me fijo si el tipo es control de accesos y cambio el reporte por defecto
        if (view.reportType == 'historico_eventos'){
            // hago que este agrupado por usuario
            url = Ext.String.urlAppend(url,"agruparUsu=usu");
            url = Ext.String.urlAppend(url,"agruparUsuOrden=ASC");            
            // filtro por tipo de evento deben ser Ingreso, Egreso y Asistencia. cod_ntipo in 8,9,10
            //url = Ext.String.urlAppend(url,"TipoEvento=8,9,10");
            url = Ext.String.urlAppend(url,"ocultarzonachk=true");
            url = Ext.String.urlAppend(url,"Observaciones=true");
        }*/

                target.load({
            src: url
        }); 
    },
    
    onBtnprintClick: function (button) {
        var view = button.up('reportehistoricoeventoscuentanohabview');
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
        var view = button.up('reportehistoricoeventoscuentanohabview'); 
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
        var view = button.up('reportehistoricoeventoscuentanohabview')?button.up('reportehistoricoeventoscuentanohabview'):button; 
        var filters = [];

        var url = viewparent.baseurl;
        var idcuenta = view.down('#idcuenta').getValue();        
        
       // var cantidadregistros = view.down('#comboregistros').getValue();
       // var sort = view.down('#sort').getValue();

        /*if(sort) {
            var sortSplited = sort.split("|");
            var sort = ( sortSplited[1] == "DESC" ) ? "DOWN" : "UP";
            url = Ext.String.urlAppend(url,"fechaSpecial="+sort);
        }*/

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




        /* Agregado para filtrar por palabra el Evento */
        /*var evento = view.down('#evento').getValue(); 
        if (evento) {
           url = Ext.String.urlAppend(url,"evento="+evento); 
        }*/
        

        



        

        

        var reportType = viewparent.reportType == 'historico_eventos';

        //if(tipoevento && !reportType) {
        //    url = Ext.String.urlAppend(url,"TipoEvento="+tipoevento);
        //} else {
        //    if (tipoevento && tipoevento.length > 0){
        //        url = Ext.String.urlAppend(url,"TipoEvento="+tipoevento);
        //    } else {
                url = Ext.String.urlAppend(url,"TipoEvento=8,9,10"); // 
        //    }
        //}
        

        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

        if(idcuenta) {
            var url = Ext.String.urlAppend(url,"Cuentas="+idcuenta);
        }


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
        var view = button.up('reportehistoricoeventoscuentanohabview');
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
        var view = button.up('reportehistoricoeventoscuentanohabview');
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
        var view = button.up('reportehistoricoeventoscuentanohabview'); 
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
        		height : 150,
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
                                                xtype:'button',
                                                text     : 'Seleccione una cuenta',
                                                iconCls: 'icon-find',
                                                itemId: 'seleccionarcuenta',
                                                margin:'0 10 0 0',
                                                listeners: {
                                                    click: function(button) {
                                     					controller.onsSeleccionarCuenta(win,view);
                                    				}
                                    			}
                                            },{
                                                xtype:'button',
                                                text     : '',
                                                iconCls: 'icon-cancel',
                                                itemId: 'sacarcuenta',
                                                hidden:true,
                                                margin:'0 5 0 0',
                                                listeners: {
                                                    click: function(button) {
                                                 		button.up('window').down('#idcuenta').setValue('')
                                                        button.up('window').down('#nombrecuenta').setValue('')
                                                        //button.up('window').down('#zona').hide();
                                                        button.hide()
                                    				}
                                    			}
                                            },{
                                                xtype:'displayfield',                                    
                                                itemId: 'nombrecuenta',
                                                name:'nombrecuenta'
                                            },{
                                                xtype:'displayfield',
                                                hidden:true,                                    
                                                itemId: 'idcuenta',
                                                name:'idcuenta'
                                            }

                                ]
                            }
                ],
                            buttons: [{
                                text     : 'Buscar',
                                iconCls: 'icon-find',
                                itemId: 'search',
                                action: 'search',
                                listeners: {
                                    click: function(button) {
                                        controller.onSearchClick(win,view);
                                        view.searchRecord = button.up('window').down('#form').getForm().getValues()
                                        win.close();
                                    }
                                }
                            }]
    		});// FIN DEFINICION DEL WIN
            

            

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


            //view.win.down('#zona').show();
            
            
            /*var zoneStore =Ext.create('Ext.data.Store',{
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
            }});*/
            

        });
    },
    
});