//MIGRADO2024
Ext.define('Common.controller.MulticuentaTimelineController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventoTimelineModel', 'EventosTiempoRealModel', 'TablasIpConSearchModel', 'TablasPuertosSearchModel', 'EventImagesSearchModel', 'EventPhoneSearchModel', 'EventObservacionesSearchModel', 'EventSmsSearchModel', 'EventProcesamientoSearchModel', 'SmartPanicSearchModel' ],
    views : [ 'MulticuentaTimelineView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'milticuentatimelinegridview' : {
                afterrender : this.initView,
                objectchanged : this.objectChange
    		},
    		'milticuentatimelinegridview button[action=play]' : {
				click : this.onPlayClick
			},
			'milticuentatimelinegridview button[action=stop]' : {
				click : this.onStopClick
			},
    		'milticuentatimelinegridview button[action=clear]' : {
				click : this.onClearClick
			},
        	'milticuentatimelinegridview button[action=refresh]' : {
				click : this.onRefreshClick
			}
		});
	}, // cierro init
    
    initView: function(view){
        var me = this;
        
        view.store = Ext.create('Ext.data.Store',{
            model: me.getEventoTimelineModelModel(),
            sorters: [{
                 property: 'cue_ncuenta',
                 direction: 'ASC'
             }],
            remoteSort: false
        })
        view.bindStore(view.store);
        view.timelinestore =Ext.create('Ext.data.Store',{
            model: this.getEventosTiempoRealModelModel(),
            remoteGroup: false,
            remoteSort: true,
            pageSize: 100,
            listeners:{
                beforeload: me.onBeforeload
            },
            sorters: [    
                {
                    property : 'r.rec_iid',
                    direction: 'DESC'
                }
            ]
        });
        
      //  this.loadData(view, this);
        
        view.task = Ext.TaskManager.start({
            args: [view,this],
            run: this.loadData,
            interval: 10000
        });
        
    },
    
    onRefreshClick: function(button, event, options){
        var view = button.up('milticuentatimelinegridview');
        this.loadData(view, this);
        var task = view.task;
        task.taskRunTime = new Date().getTime();
    },
    
    onClearClick: function(button, event, options){
        var view = button.up('milticuentatimelinegridview');
        view.store.removeAll();
    },
    
    onPlayClick: function(button, event, options){
        var view = button.up('milticuentatimelinegridview');
        var task = view.task;
        Ext.TaskManager.start(task);
    },
    
    onStopClick: function(button, event, options){
        var view = button.up('milticuentatimelinegridview');
        var task = view.task;
        Ext.TaskManager.stop(task);
    },
    
    loadData: function(view, me){        
       view.store.removeAll();
    
       view.timelinestore.load({callback:function (records) {
            
            Ext.Array.each(records, function(record){
                var nombreEvento = '['+record.get('rec_calarma') +  ' - ' +record.get('cod_cdescripcion')+']';
                var nombreCuenta = record.get('_cuenta');
                me.setRecord(record,view,nombreEvento, nombreCuenta);
            })
       }});
    },
    onBeforeload: function(store,operation,options){
                
             
                
        var params = {};
        var estados = [1,2,11,13,14,15,21,23,24,25,31 ];
        
        params.Estados = estados.join();   
        
        operation.params =params;
    },
    
    objectChange: function (view) {
      var timeline = view.view;  
      timeline.store.loadData([],false);
      timeline.store.removeAll();
      this.setRecord(view.record,timeline);
    },
    
    setRecord: function(record,viewport,nombreEvento,nombreCuenta){
        var controller = this;
        var view = viewport;
       
        var rec_iid = record.get('rec_iid');
        
        var estadoStore = Ext.data.StoreManager.lookup('EventoEstadoStore');
        var estadoRec = estadoStore.findRecord('Value', record.get('rec_nestado'));
        if (estadoRec)
            var estado = estadoRec.get('Name');
            
        var rec_nOrigen = record.get('rec_nOrigen');
        var rec_ipuerto = record.get('rec_iPuerto');
        var origenStore = Ext.data.StoreManager.lookup('EventoOrigenStore');
        var origenRec = origenStore.findRecord('Value', rec_nOrigen);
        if (origenRec)
            var origen = origenRec.get('Name');
            
        
            
        if (rec_nOrigen == 2 && rec_ipuerto < 100){
            origen = 'PortGuard';
            var puerto = rec_ipuerto
            
            //console.log(puerto);
            
            var mystore =Ext.create('Ext.data.Store',{
                model: controller.getTablasPuertosSearchModelModel(),
                filters: {
                    property: 'pue_npuerto',
                    value : puerto
                }
            });                                
            mystore.load({callback:function (records) {
            
                var precord = records[0];
                //console.log(records);
                puerto = precord.get('pue_cdescripcion');
                
                
                origen = origen + ' : '+ puerto;
            
                record.set('_eventDescripcion',record.get('rec_calarma')+'-'+record.get('cod_cdescripcion'));
                record.set('_FechaHora', record.get('rec_isoFechaHora'));
                record.set('_estado', estado);
                record.set('_origen', origen);
                
                //console.log(record, record.get('rec_isoFechaHora'));
                
                if (view){
                    view.store.add({
                        fecha: record.get('rec_isoFechaHora'),
                        usuario: record.get('_origen'),
                        comentario: record.get('_eventDescripcion'),
                        iconCls: 'icon-house',
                        evento:nombreEvento,
                        eventoColor: record.get('cod_ncolor'),
                        eventoColorLetra: record.get('cod_ncolorletra'),
                        cuenta: nombreCuenta
                    });
                    
                }
                
            }});
        }
            
        if (rec_nOrigen == 2 && rec_ipuerto > 100){
            origen = 'IpReader';
            var puerto = rec_ipuerto
            
            var mystore =Ext.create('Ext.data.Store',{
                model: controller.getTablasIpConSearchModelModel(),
                filters: {
                    property: 'ipc_nport',
                    value : puerto
                }
            });                                
            mystore.load({callback:function (records) {
            
                var precord = records[0];
                puerto = precord.get('ipc_cdescripcion');
                
                
                origen = origen + ' : '+ puerto;
            
                record.set('_eventDescripcion',record.get('rec_calarma')+'-'+record.get('cod_cdescripcion'));
                record.set('_FechaHora', record.get('rec_isoFechaHora'));
                record.set('_estado', estado);
                record.set('_origen', origen);
                
                //console.log(record, record.get('rec_isoFechaHora'));
                
                if (view){
                    view.store.add({
                        fecha: record.get('rec_isoFechaHora'),
                        usuario: record.get('_origen'),
                        comentario: record.get('_eventDescripcion'),
                        iconCls: 'icon-house',
                        evento:nombreEvento,
                        eventoColor: record.get('cod_ncolor'),
                        eventoColorLetra: record.get('cod_ncolorletra'),
                        cuenta: nombreCuenta
                    });
                    
                }
            }});
        }
            
        if (rec_nOrigen == 6 && rec_ipuerto < 0){
            origen = origen;
            origen = 'TR';
            record.set('_eventDescripcion',record.get('rec_calarma')+'-'+record.get('cod_cdescripcion'));
            record.set('_FechaHora', record.get('rec_isoFechaHora'));
            record.set('_estado', estado);
            record.set('_origen', origen);
            
            if (view){
                view.store.add({
                    fecha: record.get('rec_isoFechaHora'),
                    usuario: record.get('_origen'),
                    comentario: record.get('_eventDescripcion'),
                    cuenta: record.get('_cuenta'),
                    iconCls: 'icon-house',
                    evento:nombreEvento,
                    eventoColor: record.get('cod_ncolor'),
                    eventoColorLetra: record.get('cod_ncolorletra'),
                    cuenta: nombreCuenta
                });
            }
        }
            
            
     
        
        Ext.Ajax.request({
              url: '/rest/search/TimelineQ7',
              params: { IdEvento: rec_iid},
              method: 'GET',
              scope: this,
              success: function(response){
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                record.set('_categoria', rec.cCat);
                record.set('_resolucion', rec.cRes);
                var fechaProceso =  record.get('rec_isoFechaProceso');
                
                
                var campoEvento = {};
                campoEvento.nombre = nombreEvento;
                campoEvento.color = record.get('cod_ncolor');
                campoEvento.colorLetra = record.get('cod_ncolorletra');
                
                this.openModules(view,record,campoEvento,nombreCuenta);
            
                /*if (fechaProceso){
                    
                    if (view)
                    view.store.add({
                        fecha: record.get('rec_isoFechaProceso'),
                        usuario: record.get('ope_cnombre'),
                        comentario: record.get('_resolucion'),
                        iconCls: 'icon-door',
                        evento:nombreEvento,
                        eventoColor: record.get('cod_ncolor'),
                        eventoColorLetra: record.get('cod_ncolorletra'),
                        cuenta: nombreCuenta
                    });
                }*/
              }
        });
        
        
    
    },
    
    openModules: function(view, record,campoEvento,nombreCuenta){
        var controller = this;
        var view2 = view;
       // view2.store.sorters.clear();
        
            // no tiene datos de seguridad en webdealer, me fijo si es master o admin
            var securitymodules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
            
            securitymodules.load({callback: function(){
                var masterModule = securitymodules.findRecord('KeyReference','MasterWebDealer');
                var administratorModule = securitymodules.findRecord('KeyReference','Administrator');
                var accountAdministrationModule = securitymodules.findRecord('KeyReference','SgAppAccountAdministration');
                
                var isMaster = masterModule?masterModule.get('Available'):false;
				var isAdmin = administratorModule?administratorModule.get('Available'):false;
				var isAccount = accountAdministrationModule?accountAdministrationModule.get('Available'):false;
                
                if (isMaster || isAdmin || isAccount){
                    var modules = Ext.data.StoreManager.lookup('EventSecurityModuleStore');
                    modules.each(function(module){
                        
                        
                        switch(module.get('view')) {
                           
                           case "spreadonlyview":
                                
                                var mystore =Ext.create('Ext.data.Store',{
                                    model: controller.getSmartPanicSearchModelModel(),
                                    filters: {
                                        property: 'CuentaId',
                                        value : record.get('cue_iid')
                                    }
                                });                                
                                mystore.load({store:mystore,module:module,callback: controller.showPanel});
                                
                                break;
                            case "eventimagesgridview":
                                
                                var mystore =Ext.create('Ext.data.Store',{
                                    model: controller.getEventImagesSearchModelModel()
                                });                                
                                mystore.load({rec_iid:record.get('rec_iid'),store:mystore,module:module,callback: function(records,operation,success){
                                        if (success){
                                            if(records.length > 0) {
                                               
                                              //  view.bindStore(operation.store);
                                                
                                                
                                                
                                                Ext.Array.each(records, function(record){
                                                    view2.store.add({
                                                        fecha: record.get('gri_isofechahora'),
                                                        usuario: '',
                                                        comentario: record.get('gri_carchivo'),
                                                        
                                                        iconCls: 'icon-photo',
                                                        evento:campoEvento.nombre,
                                                        eventoColor: campoEvento.color,
                                                        eventoColorLetra: campoEvento.colorLetra,
                                                        cuenta: nombreCuenta
                                                    });
                                                })
                                                
                                                var view = operation.panel;
                                                var modules =  operation.module;
                                               
                                           
                                                //view.store.sort('fecha','ASC');
                                            }
                                        }
                                    }});
                                
                                break;
                            case "eventphonegridview":
                                
                                var mystore =Ext.create('Ext.data.Store',{
                                    model: controller.getEventPhoneSearchModelModel()
                                });                                
                               
                                mystore.load({rec_iid:record.get('rec_iid'),store:mystore,module:module,callback: function(records,operation,success){
                                    if (success){
                                        if(records.length > 0) {
                                           
                                            
                                             Ext.Array.each(records, function(recordx){
                                                
                                                view2.store.add({
                                                    fecha: recordx.get('rec_isoFechaHora'),
                                                    usuario: recordx.get('ope_cnombre'),
                                                    comentario: recordx.get('rec_cObservaciones'),
                                                    cuenta: record.get('_cuenta'),
                                                    iconCls: 'icon-telephone',
                                                    evento:campoEvento.nombre,
                                                    eventoColor: campoEvento.color,
                                                    eventoColorLetra: campoEvento.colorLetra,
                                                    cuenta: nombreCuenta
                                                });
                                            })                                     
                                         
                                        }
                                    }
                                }});
                                
                                break;
                            case "eventobservacionesgridview":
                                
                                var mystore =Ext.create('Ext.data.Store',{
                                    model: controller.getEventObservacionesSearchModelModel()
                                });
                                 mystore.load({rec_iid:record.get('rec_iid'),store:mystore,module:module,callback: function(records,operation,success){
                                        if (success){
                                            
                                                var recordx = records[0];
                                                if (recordx.get('cObs').length != 0) {
                                                    var comments = recordx.get('cObs').split('\r');
                                                    Ext.Array.each(comments, function(comment){
                                                        var found = comment.match(/\[(.*?)\] \[(.*?)\] (.*)/);
                                                        
                                                        if (found){
                                                            var fecha = found[1];
                                                            var usuario = found[2];
                                                            var comentario = found[3];
                                                            
                                                            fecha = fecha.split(" ");    
                                                            var nuevaFecha = fecha[0].split("/").reverse().join("-") + " " +fecha[1];
                                                            nuevaFecha = new Date(nuevaFecha);//.toISOString();
                                                            
                                                            if(nuevaFecha) {
                                                               
                                                                view2.store.add({
                                                                    fecha: nuevaFecha,
                                                                    usuario: usuario,
                                                                    comentario: comentario,                                                                    
                                                                    cuenta: record.get('_cuenta'),
                                                                    evento:campoEvento.nombre,
                                                                    eventoColor: campoEvento.color,
                                                                    eventoColorLetra: campoEvento.colorLetra,
                                                                    iconCls: 'icon-book-open',
                                                                    cuenta: nombreCuenta
                                                                });
                                                            }
                                                            
                                                            //view.store.sort('fecha','ASC');
                                                        }
                                                        
                                                    });
                                                    
                                                   
                                                }
                                            
                                        }
                                    }});
                                 
                                break;
                            case "eventsmsgridview":
                                
                                var mystore =Ext.create('Ext.data.Store',{
                                    model: controller.getEventSmsSearchModelModel()
                                });
                                mystore.load({rec_iid:record.get('rec_iid'),store:mystore,module:module,callback: function(records,operation,success){
                                        if (success){
                                            if(records.length > 0) {
                                              
                                                
                                                 Ext.Array.each(records, function(record){
                                                    view2.store.add({
                                                        fecha: record.get('rec_isoFechaHora'),
                                                        usuario: record.get('ope_cnombre'),
                                                        comentario: record.get('rec_cObservaciones'),
                                                        iconCls: 'icon-email',                                                        
                                                        evento:campoEvento.nombre,
                                                        eventoColor: campoEvento.color,
                                                        eventoColorLetra: campoEvento.colorLetra,
                                                        cuenta: nombreCuenta
                                                    });
                                                })
                                                
                                                //view.store.sort('fecha','ASC');
                                                
                                               
                                            }
                                        }
                                    }});
                                
                                break;
                            case "eventprocesamientogridview":
                                var mystore =Ext.create('Ext.data.Store',{
                                    model: controller.getEventProcesamientoSearchModelModel()
                                });
                                mystore.load({rec_iid:record.get('rec_iid'),store:mystore,module:module,callback: function(records,operation,success){
                                        if (success){
                                            if(records.length > 0) {
                                             
                                                var store = Ext.data.StoreManager.lookup('EventoProcesamientoStore');
                                                  Ext.Array.each(records, function(record){
                    
                                                    var text = '';
                                                    var proc = store.findRecord('Value', record.get('pro_nProceso'));
                                                    if (proc)
                                                        record.set('pro_cProceso',proc.get('Name'));
                                                    
                                                    view2.store.add({
                                                        fecha: record.get('pro_isofechahora'),
                                                        usuario: record.get('ope_cnombre'),
                                                        comentario: record.get('pro_cProceso'),
                                                        iconCls: 'icon-cog',
                                                        evento:campoEvento.nombre,
                                                        eventoColor: campoEvento.color,
                                                        eventoColorLetra: campoEvento.colorLetra,
                                                        cuenta: nombreCuenta
                                                    });
                                                })
                                                
                                            }
                                        }
                                    }});
                                break;
                            case "eventorepautgridview":
                                
                                Ext.Ajax.request({
                                      url: '/Rest/search/TimelineQ8',
                                      params: {IdEvento: record.get('rec_iid')},
                                      method: 'GET',
                                      scope: this,
                                      success: function(response){
                                        var reporte = Ext.JSON.decode(response.responseText).rows[0];
                                        
                                        if (!reporte) {
                                            return false
                                        } else {
                                            
                                            var newTab = Ext.widget(module.get('view'),{
                                                iconCls: module.get('iconCls'),
                                               // record: record,
                                                title: module.get('text'),
                                                closable: false,
                                                store: operation.store
                                            });
                                    
                                            // agrego la paleta creada
                                        	view.add(newTab);
                                            view.setActiveTab(newTab);
                                            
                                        }
                                        
                                        var estados = reporte.rep_mcomentario.split('\r\n');
                                        var autoridad = reporte.aut_cnombre;
                                        var timeline = panel.up('tabpanel').down('eventotimelinegridview');
                                
                                        Ext.Array.each(estados, function(estado){
                                            var found = estado.match(/\[(..\/..\/.{4} ..:..:..) (.*?)\] (.*)/);
                                        
                                            var fecha = found[1];
                                            var estado = found[2];
                                            var comentario = found[3];
                                            
                                            panel.store.addd({
                                                fecha : fecha,
                                                estado : estado,
                                                autoridad: autoridad,
                                                comentario : comentario
                                            });
                                            
                                            timeline.store.add({
                                                fecha: fecha,
                                                usuario: autoridad,
                                                comentario: '['+estado+'] '+comentario,
                                                iconCls: 'icon-shield'
                                            });
                                        });
                                        
                                        
                                      }
                                });
                                
                                break;
                        }
                        
                        
                        
                        
                    })
                    
                    
                } else {
                    Ext.Ajax.request({
                      url: '/Rest/Security/Modules/5/Security',
                      method: 'GET',
                      success: function(resp,operation) {
                        if (resp.responseText.length > 0)
                            var json = JSON.parse(resp.responseText);
                        if (json){
                            var modules = json.event;
                            
                            Ext.Array.each(modules, function(module){
                                
                                if (module.profile ==1){
                                    var newTab = Ext.widget(module.view,{
                                        iconCls: module.iconCls,
                                        record: record,
                                        title: module.text,
                                        closable: false
                                    });
                        
                                    // agrego la paleta creada
                                	tabpanel.add(newTab);
                                    tabpanel.setActiveTab(newTab);
                                }
                                
                            })
                            
                            tabpanel.setActiveTab(0);
                        }
                
                    }})
            
                }
          }
        });
        
        view.store.sort('order','ASC');
        
    },
    
    showPanel : function (records,operation,success) {
        
        if(success) {
            
            if(records.length > 0) {
                
                //excepcion para observaciones por que viene vacios los registros
                if(records[0].get('cObs') == '') {
                    return false
                }
                
                
                var view = operation.panel;
                var module =  operation.module;
               
           
            }
        }
        
    }
    
});