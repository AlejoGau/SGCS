Ext.define('SgAppWebReport.controller.ReporteEstadisticaPorCategorizacionController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasGruposSearchModel', 'TablaHistoricoSearchModel' ],
    views : [ 'ReporteEstadisticaPorCategorizacionView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportestadisticacategorizacionview' : {
                afterrender : this.initView,
                cuentachanged: this.onCuentaChanged
            },
            'reportestadisticacategorizacionview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportestadisticacategorizacionview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reportestadisticacategorizacionview button[action=print]' : {
                click: this.onBtnprintClick
            },
            '#searchwin': {              
                selectedEvents: this.eventsSelected  
            },
            '#searchwin #evento': {
                click: this.onEventoClick
            },
            '#searchwin #limpiarevento': {
                click: this.onLimpiarEventoClick
            },
            'reportestadisticacategorizacionview button[action=openmenu]' : {
                click: this.onOpenMenuClick
            },
            'reportestadisticacategorizacionview button[action=btnprint]': {
                click: this.onBtnprintClick
            },               
        });
        
    }, // cierro init
    
    
    onBtnprintClick: function (button) {
        var view = button.up('reportestadisticacategorizacionview');
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
    
    onOpenMenuClick: function (button) {
        var controller =this;
        var view = button.up('reportestadisticacategorizacionview'); 
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
            	height : 400,
    			border : false,
                itemId:'searchwin',
    			items : [
                        {
                            xtype: 'form',
                            bodyPadding: 5,
                            items: [
                                
                                            {
                                                xtype : 'combo',
                                                fieldLabel : 'Tabla Histórico',
                                    			displayField : '_periodo',
                                                queryMode: 'local',
                                    			valueField : 'c_periodo',
                                                anchor: '100%',
                                                itemId: 'combohistorico',                                     
                                                name:'tablahistorico',
                                                //plugins: ['clearbutton'],
                                                listeners : {
                                                    select : function (combo, records, eOpts ) {
                                                        controller.onComboHistoricoSelect(combo, records, eOpts);
                                                    },
                                                    change : function (combo, records, eOpts ) {
                                                        controller.onCleanDates(combo, records, eOpts);
                                                    }
                                                }
                                            },{
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin:'0 0 5 0',
                                                items:[
                                                        {
                                                            xtype : 'textfield',
                                                            fieldLabel : 'Dealer',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            itemId: 'dealerdesde',
                                                            width:300,
                                                            fieldWidth:80
                                                        },
                                                        {
                                                            xtype : 'textfield',
                                                            itemId: 'cuentadesde',
                                                            fieldLabel : 'Cuenta desde',
                                                            enforceMaxLength: true,
                                                            maxLength: 4,
                                                            width:170,
                                                            labelWidth:115,
                                                            margin:'0 0 0 7'
                                                        }
                                                    ]
                                            },
                                            {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin:'0 0 5 0',
                                                items:[
                                                        {
                                                            xtype : 'textfield',
                                                            itemId: 'cuentahasta',
                                                            fieldLabel : 'Cuenta hasta', 
                                                            enforceMaxLength: true,
                                                            maxLength: 4,
                                                            width:170,
                                                            labelWidth:115, 
                                                            margin:'0 0 0 307'
                                                        }
                                                    ]
                                            },{
                                                xtype:'textfield',
                                                fieldLabel:'Nombre',
                                                itemId:'nombre'
                                            }, {
                                                xtype: 'fieldset',
                                                title: 'Fecha',
                                                layout: 'hbox',
                                                margin: '15 0',
                                                padding : '10',
                                                items: [
                                                        
                                                        {
                                                            xtype : 'datefield',
                                            				fieldLabel : 'Desde',
                                        					name : "fechadesde",
                                        					bindToModel : false,
                                        					itemId : 'fechadesde',
                                                            width:250
                                        				},{
                                            				xtype : 'datefield',
                                        					fieldLabel : 'Hasta',
                                        					itemId : 'fechahasta',
                                        					bindToModel : false,
                                        					name : "fechahasta",
                                                            width: 250,
                                                            margin:'0 0 0 20'                                                            
                                        				}
                                                                                                        
                                                        
                                                    ]
                                            },{
                                                xtype: 'fieldset',
                                                layout: 'hbox',
                                                title: 'Eventos',
                                                margin:'0 0 5 0',
                                                items:[{
                                                            xtype: 'button',
                                                            text:'Seleccionar alarma',
                                                            iconCls: 'icon-bell',
                                                            itemId:'evento',
                                                            margin:'0 5 0 0'
                                                        },{
                                                            xtype:'displayfield',
                                                            itemId:'nombreevento',
                                                            width:220
                                                        },{
                                                            xtype:'button',
                                                            text:'',
                                                            itemId:'limpiarevento',
                                                            iconCls: 'icon-cancel'
                                                        },{
                                                            xtype:'displayfield',
                                                            itemId:'codevento',
                                                            hidden:true
                                                        }
                                                                                                            
                                                    ]
                                            },{
                                                xtype: 'combo',
                                                itemId: 'grupos',
                                                value: '',
                                                queryMode: 'local',
                                                displayField: 'gru_cdescripcion',
                                                valueField: 'gru_ccodigo',
                                                labelWidth: 50,
                                                fieldLabel:'Grupo'
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
                                 win.baseurl = view.baseurl
                                 win.Iframe = view.down('#Iframe');
             					controller.onSearchClick(win,view);
                                 view.searchRecord = button.up('window').down('form').getForm().getValues()
                                 
                                 win.close();
            				}
            			}
                    },{
                        xtype: 'button',
                        text:'Todos',
                        iconCls: 'icon-find',
                        action: 'todos',
                        itemId:'todos',
                        listeners: {
                    		click: function(button) {
                                 win.baseurl = view.baseurl
                                 win.Iframe = view.down('#Iframe');
        
                                win.down('#fechadesde').setValue('');
                                win.down('#fechahasta').setValue('');
                                win.down('#nombre').setValue('');
                        
                                win.down('#dealerdesde').setValue('');
                                win.down('#cuentadesde').setValue('');
                                win.down('#cuentahasta').setValue('');
                                
                                win.down('#codevento').setValue('');
                                win.down('#nombreevento').setValue('');
                                
                                win.down('#grupos').setValue('');
                                
                                
                                controller.onSearchClick(win)   
                                 win.close();
            				}
            			}
                    }]
    		});
            
            
            var comboGrupos = win.down('#grupos');               
            var combostore = Ext.create('Ext.data.Store',{
                model: this.getTablasGruposSearchModelModel(),           
                pageSize: 200,
                remoteSort: true
            });       
            comboGrupos.bindStore(combostore);        
            combostore.load();
            
            var historicoStore = Ext.create('Ext.data.Store',{
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
        
        } else{
            win = view.win;
        }
        win.show();
        
        
        
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
    
    onLimpiarEventoClick: function (btn) {
        var view = btn.up('window');
        view.down('#nombreevento').setValue('')
        view.down('#codevento').setValue('')
    },
    
    eventsSelected: function(record, view) {
        view.down('#nombreevento').setValue(record.get('Descripcion'))
        view.down('#codevento').setValue(record.get('cod_ccodigo'))
    },  
    
    onEventoClick: function (btn) {
        var view = btn.up('window');
        
        
         var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                caller: view,
                filter: [{property:'cod_nManual', value:1}],
                simpleSelect: true
                
            }],
            layout: 'fit'
        }).show();
        
        
        
        myWindow.on('selectedEvents',function () {
         console.log(arguments)
        })
        
            
        
    },
    
    onSearchClick: function(button, event, options) {  
        var controller = this;
        
        
        var view = button.up('reportestadisticacategorizacionview')?button.up('reportestadisticacategorizacionview'):button;
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        var fechadesde = view.down('#fechadesde')?view.down('#fechadesde').getValue():'';
        var fechahasta = view.down('#fechahasta')?view.down('#fechahasta').getValue():'';
        var nombre = view.down('#nombre')?view.down('#nombre').getValue():'';
        
        
        var dealer = view.down('#dealerdesde')?view.down('#dealerdesde').getValue():'';
        var cuentadesde = view.down('#cuentadesde')?view.down('#cuentadesde').getValue():'';
        var cuentahasta = view.down('#cuentahasta')?view.down('#cuentahasta').getValue():'';
        
        var evento = view.down('#codevento')?view.down('#codevento').getValue():'';
        var grupos = view.down('#grupos')?view.down('#grupos').getValue():'';
        
        
        var combohistorico = view.down('#combohistorico')?view.down('#combohistorico').getValue():'';
        
      
        view.filters = [];
           
        
     
        if(fechadesde) {     

            view.filters.push({
                property:'rec_tfechahora:GTEDATESTRING',
                value:Ext.Date.format(fechadesde,'Y-m-d')+" 00:00:00"
            })
            
        }
        
        if(fechahasta) {    
               
            view.filters.push({
                property:'rec_tfechahora:LTEDATESTRING',
                value:Ext.Date.format(fechahasta,'Y-m-d')+" 23:59:59"
            })
        }
        
        
        if(evento) {           
            view.filters.push({
                property:'rec_calarma',
                value:evento
            })
        }
        
        
        if(nombre) {           
            view.filters.push({
                property:'cue_cnombre:LIKE',
                value:nombre
            })
        }
       
        
        if(dealer) {           
            view.filters.push({
                property:'cue_clinea',
                value:dealer
            })
        }
        
        if(cuentadesde) {           
            view.filters.push({
                property:'cue_ncuenta:GTESTRING',
                value:cuentadesde
            })
        }
        if(cuentahasta) {           
            view.filters.push({
                property:'cue_ncuenta:LTESTRING',
                value:cuentahasta
            })
        }
        
        
        if(grupos) {           
            view.filters.push({
                property:'gru_ccodigo',
                value:grupos
            })
        }
        
        
        if(combohistorico) {    
            
            url = Ext.String.urlAppend(url,"table="+combohistorico);
            
        }
     
        var target = view.down('#Iframe')?view.down('#Iframe'):view.Iframe;
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        if (view.filters.length>0){
           url = Ext.String.urlAppend(url, 'filter='+Ext.encode(view.filters));
            
        } 
                target.load({
            src: url
        }); 
       
        
    },
    
    initView: function(view){
        view.baseurl =  '/handler/ReporteEstadisticaPorCategorizacionHTML';
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        this.onSearchClick(view)

    },
    onBtnprintClick: function(button){
        var view = button.up('reportestadisticacategorizacionview');
        var target = view.down('#Iframe');
        
        url = target.src;

        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { //Obtenemos el valor devuelto.
            printHTMLContent(body);
            /*
            var win = Ext.create('Ext.window.Window', {
                title: 'Mi ventana',
                html: "",
                modal: true,
                //renderTo: body.replace('<body>', '<body onload="window.print()>"'),
                
            });
            // Abrir en una nueva pestaña
            contenido = body.replace('BODY', 'body onload="window.print()"')
            //var newTab;// = window.open('', '_blank');
            //newTab.document.write(win.html);
            let myWindow = window.open();
            myWindow.document.write(contenido);
            myWindow.document.close();
            myWindow.focus();
            myWindow.print();
            */
            
            //win.printMe();

        });
    }
});