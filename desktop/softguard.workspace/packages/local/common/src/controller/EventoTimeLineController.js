//MIGRADO2024
/***
 * [7/04/2017] este modulo fue devinculado de webremoto por que fue remplzada en su totalidad por EventostimelineFullcontroller
 * Se tomo el alias eventotimelinegridview y se lo anexo a eventotimelinefullgridview para poder utilizar los permisos de modulo
 */
Ext.define('Common.controller.EventoTimeLineController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.EventSecurityModuleStore' ],
    models : [ 'EventImagesSearchModel', 'SmartPanicModel', 'EventPhoneSearchModel', 'EventObservacionesSearchModel', 'EventSmsSearchModel', 'EventProcesamientoSearchModel', 'SmartPanicSearchModel', 'EventoTimelineModel', 'LlamadasSearchModel', 'TablasPuertosSearchModel', 'TablasIpConSearchModel', 'SmartTrackSearchModel' ],
    views : [ 'EventTimelineGridView', 'TimelineFormView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
            'eventotimelinegridview' : {
                afterrender : this.initView,
                objectchanged : this.objectChange,
                itemdblclick: this.onItemClick
    		}
		});
	}, // cierro init
    
    onItemClick: function(view,record){
        var timelineform = Ext.widget('timelineformview',{
            record: record
        })
        Ext.widget('window',{
            title: 'Procesamiento',
            width: 500,
            height: 400,
            layout: 'fit',
            items: timelineform
        }).show();
        
        timelineform.loadRecord(record);
    },
    
    initView: function(view){
        var record = view.record;
        var nombreEvento = '['+record.get('rec_calarma') +  ' - ' +record.get('cod_cdescripcion')+']';
        view.store = Ext.create('Ext.data.Store',{
            model: this.getEventoTimelineModelModel(),
            autoDestroy: true,
            /*sorters: [{
                 property: 'order',
                 direction: 'ASC'
             }],*/
            remoteSort: false
        })
       // view.bindStore(view.store);
         
         this.setRecord(record,view);
         
         if(view.showMaximizer != false) {
             view.addTool({
                    type: 'maximize', 
                    itemId: 'maximizer',
                    handler: function(event,img,view,tool){
                        var view = tool.up('eventotimelinegridview');
                        var tabpanel = tool.up('tabpanel');
                        var record = view.record;
                                                
                        var win = Ext.create('Ext.Window', {
                        	layout: 'fit',
                			title : getLocale('Timeline')+' ('+record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')+') '+nombreEvento,
                			closeAction : 'hide',
                			width : 750,
                            translate: false,
                			height : 550,
                			border : true,
                            modal: false,
                            view: view,
                            preventHeader: true,
                			items : [
                                {
                                    xtype: 'eventotimelinegridview',
                                    caller: view,
                                    showMaximizer: false,
                                    record: record
                                    
                                }
                            ]
                		});
                        
                        win.show();
                        win.down('eventotimelinegridview').setTitle('');
                    }
                });
         } 
    },
    
    objectChange: function (view) {
        var timeline = view.view;  
        timeline.store.loadData([],false);
        timeline.store.removeAll();
        this.setRecord(view.record,timeline);
    },
    
    setRecord: function(record,viewport){
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
        if (view){
            view.store.addSorted({
                fecha: record.get('rec_isoFechaHora'),
                usuario: record.get('_origen'),
                comentario: record.get('_eventDescripcion'),
                iconCls: 'icon-house'
            });
        }
        Ext.Ajax.request({
              url: '/rest/search/TimelineQ7',
              params: { IdEvento: rec_iid},
              method: 'GET',
              scope: this,
              success: function(response){
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                if (rec){ // venia vacio el Q7 para este registro
                    record.set('_categoria', rec.cCat);
                    record.set('_resolucion', rec.cRes);
    
                    var fechaProceso =  record.get('rec_isoFechaProceso');
                    this.openModules(view,record);
                }
              }
        });
    },
    
    openModules: function(view, record){
        var controller = this;
        var view2 = view;
        
        view2.store.sorters.clear();
        // no tiene datos de seguridad en webdealer, me fijo si es master o admin
        var securitymodules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
        // y a esta loaded, no hace falta cargar
        //securitymodules.load({callback: function(){
        var masterModule = securitymodules.findRecord('KeyReference','MasterWebDealer');
        var administratorModule = securitymodules.findRecord('KeyReference','Administrator');
        var accountAdministrationModule = securitymodules.findRecord('KeyReference','SgAppAccountAdministration');
        var webremotoModule = securitymodules.findRecord('KeyReference','WebRemoto');
        var isMaster = masterModule?masterModule.get('Available'):false;
        var isAdmin = administratorModule?administratorModule.get('Available'):false;
        var isAccount = accountAdministrationModule?accountAdministrationModule.get('Available'):false;
        var isWebRemoto = webremotoModule?webremotoModule.get('Available'):false;
        if (isMaster || isAdmin || isAccount || isWebRemoto){
            var modules = Ext.data.StoreManager.lookup('Common.store.EventSecurityModuleStore');
            modules.each(function(module){
                switch(module.get('view')) {
                    case "vcreadonlyview":
                        if(record.get('tip_nTipo') == 5 && record.get('gps_cIMEI') != '') {                               
                                var mystore =Ext.create('Ext.data.Store',{
                                model: controller.getSmartTrackSearchModelModel(),
                                filters: [
                                    {
                                        property: 'CuentaId',
                                        value : record.get('cue_iid')
                                    },{
                                        property: 'Imei',
                                        value : record.get('gps_cIMEI')
                                    }
                                ]
                            });         
                            mystore.load({store:mystore,module:module,callback: controller.showPanel});
                        }
                    break;
                    case "spreadonlyview":
                        if(record.get('tip_nTipo') != 5) {
                            var mystore =Ext.create('Ext.data.Store',{
                                model: controller.getSmartPanicSearchModelModel(),
                                filters: {
                                    property: 'CuentaId',
                                    value : record.get('cue_iid')
                                }
                            });                                
                            mystore.load({store:mystore,module:module,callback: controller.showPanel});
                        }
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
                                                comentario: getLocale('Foto recibida'),
                                                iconCls: 'icon-photo'
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
                                        Ext.Array.each(records, function(record){
                                        view2.store.add({
                                            fecha: record.get('rec_isoFechaHora'),
                                            usuario: record.get('ope_cnombre'),
                                            comentario: record.get('rec_cObservaciones'),
                                            iconCls: 'icon-telephone'
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
                                    var record = records[0];
                                    if (record.get('cObs').length != 0) {
                                        var comments = record.get('cObs').split('\r[');
                                        Ext.Array.each(comments, function(comment){
                                            var found = comment.match(/[?(.*?)] [(.*?)] ([\S\s.]*)/);
                                            if (found){
                                                // var fecha = found[1];
                                                var fecha = Ext.Date.parse(found[1],'d/m/Y H:i');
                                                if(!fecha) {
                                                    fecha = Ext.Date.parse(found[1],'M d Y g:iA');
                                                }
                                                if(!fecha) {
                                                    fecha = Ext.Date.parse(found[1],'d/m/Y H:i:s');
                                                }
                                                
                                                var usuario = found[2];
                                                var comentario = found[3];
                                                
                                                // fecha = fecha.split(" ");    
                                                //var nuevaFecha = fecha[0].split("/").reverse().join("-") + "T" +fecha[1];
                                                //nuevaFecha = new Date(nuevaFecha);//Ext.Date.parse(nuevaFecha,'Y-m-d H:i');//.toISOString();
                                                
                                                if(fecha) {
                                                    view2.store.add({
                                                        fecha: fecha,
                                                        usuario: usuario,
                                                        comentario: comentario,
                                                        iconCls: 'icon-book-open'
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
                                                iconCls: 'icon-email'
                                            });
                                        })
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
                                                iconCls: 'icon-cog'
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
                                //19/09/2012 09:41:26
                                var fecha = found[1];
                                var estado = found[2];
                                var comentario = found[3];
                                
                                panel.store.add({
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