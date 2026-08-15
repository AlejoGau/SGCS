//MIGRADO2024
Ext.define('Common.controller.CuentaLocalizationGridController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ 'CuentaSearchModel', 'SoftguardCuentaModel' ],
    views : [ 'CuentaLocalizationGridView' ],
    init : function(config) {
		// genero los eventos
		this.control({
					'cuentalocalizationgridview' : {
						afterrender : this.initView/*,
                        itemdblclick: this.onItemClick        */ // el doble click daba error de derechos igual no se bien por que estaba            
					},
                    'cuentalocalizationgridview button[action=autoLocalizar]' : {
                        click: this.onAutoLocalizarClick
					}
				});
	}, //
    
    
	initView : function(view) {
       
        var controller = this;
        view.filters = [{
            property: '_cue_cLatLng:ISNULL',
            value: ''
        },{
            property:'_tip_nTipo:NOT',
            value: '1,2,3,5'
        }];
        
        var store =Ext.create('Ext.data.Store',{
            model: 'Common.model.CuentaSearchModel',
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            listeners:{
                beforeload: controller.onBeforeload
            },
            filters: view.filters,
            sorters: [
                {
                    property : 'cue_ncuenta',
                    direction: 'ASC'
                }
            ]
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        store.load({callback:function (records,data) {
        
        }});
   
	},
    onBeforeload: function(store,operation,options){
        
        operation.store = store;
    },
    onAutoLocalizarClick: function (btn) {
        var view = btn.up('cuentalocalizationgridview')
        var controller = this;
        console.log(view.getStore())
        this.armarBucle(view, true)
        
    },
    
    armarBucle: function (view,firstpage) {
        
        var controller =this;
        
        view.mask=Ext.create('Ext.LoadMask', view, {
                        msg: getLocale("Recapitulando informacion necesaria.")
                    }).show();
        
        var store =Ext.create('Ext.data.Store',{
            model: 'Common.model.CuentaSearchModel',
            pageSize: 10000,
            remoteSort: true,
            remoteFilter: true,
            listeners:{
                beforeload: controller.onBeforeload
            },
            filters: view.filters,
            sorters: [
                {
                    property : 'cue_ncuenta',
                    direction: 'ASC'
                }
            ]
        })
        
        if (firstpage){
            store.load({callback: function(records, operation){
                
                if (records.length !=0){
                    controller.getLocalization(view, records);
                    
                }
            }});  
        }else {
            store.nextPage({callback: function(records, operation){
                
                if (records.length !=0){
                    controller.getLocalization(view, records);
                }
            }});  
        }
    },
    
    getLocalization : function (view, records) {
        var i = 0;
        var length = records.length-1;
        var arrayRecords = records
        var controller = this;
        var log = {            
            encontradas:0,
            noencontradas: 0,
            faltadireccion:0
        };
        // Agregado de KEY
        var par_KEYGOOGLEMAPS;
        par_KEYGOOGLEMAPS = getParametro('KEYGOOGLEMAPS')
        
        // Obtengo el PAIS
        var pais = getParametro('NOMBREPAIS') 
        view.mask.hide();
        view.mask.msg = getLocale("Geo referenciando")+" 0/"+length+" "+getLocale("cuentas")
        view.mask.show();
        view.task = Ext.TaskManager.start({
             //   args: [view,me],
                run: function () {
                    if(i < length) {
                        
                        var record = arrayRecords[i];
                        
                        console.log(record)
                        var cue_ccalle =  record.get('cue_ccalle');
                        cue_ccalle = cue_ccalle.replace('#','','gi');
                        console.log(cue_ccalle, record.get('cue_cLatLng'))
                        if((record.get('cue_cLatLng') == '' || record.get('cue_cLatLng') == '0.0,0.0') && cue_ccalle != '') {
                            
                            var url = '/rest/request/get/?https://maps.googleapis.com/maps/api/geocode/json?key='+par_KEYGOOGLEMAPS+'&address=';
                            
                            if (record.get('cue_ccalle') != "") {
                                url = url+cue_ccalle;
                            }
                            if (record.get('cue_clocalidad') != "" ) {
                                url = url+' ,'+record.get('cue_clocalidad');
                            }
                            if (record.get('cue_provincia') != "" ) {
                                url = url+' ,'+record.get('cue_provincia');
                            }
                            url = url+' ,'+pais;
                            console.log(url);
                            
                            Ext.Ajax.request({
                                url : url,
                                r : record,
                                failure: function(r,o){
                                    Ext.TaskManager.stop(view.task);
                                    notify('Error: '+r)
                                    view.mask.hide();
                        		},
                        		success: function(response, action){
                    		    	var json = Ext.JSON.decode(response.responseText);    
                                    if(json.status == 'OK') {
                                        
                                        controller.getSoftguardCuentaModelModel().load(action.r.get('cue_iid'), {
                                            view: view,
                                            scope: this,
                                        	success : function (recordCuenta) {
                                                
                                                recordCuenta.set('cue_cLatLng',json.results[0].geometry.location.lat+','+json.results[0].geometry.location.lng)                                                
                                                recordCuenta.save();
                                                
                                                log.encontradas++
                                        	}
                                        })
                                    } else if(json.status == 'OVER_QUERY_LIMIT') {
                                        Ext.TaskManager.stop(view.task);
                                        view.mask.hide();
                                        notify(json.status);
                                    } else {
                                        log.noencontradas++
                                    }
                        		},
                        		scope:this
                        	});
    
                        } else {
                            log.faltadireccion++;
                        }
                        
                        view.mask.hide();
                        view.mask.msg = getLocale("Geo referenciando")+" "+i+"/"+length+" "+getLocale("cuentas")
                        view.mask.show();
                        
                        i++;
                        
                    } else {
                        Ext.TaskManager.stop(view.task);
                         view.mask.hide();
                        /*var paging = view.down('pagingtoolbar');
                        paging.doRefresh();
                        view.loading.hide();
                        
                        
                        var win = Ext.create('Ext.Window', {
                            layout : 'vbox',
                        	title : 'Resumen',
                			width : 200,
                			height : 120,
                			border : false,
                			items : [
                                    {
                                        xtype:'displayfield',
                                        fieldLabel:'Encontradas',
                                        value:log.encontradas
                                    },{
                                        xtype:'displayfield',
                                        fieldLabel:'No Encontradas',
                                        value:log.noencontradas
                                    },{
                                        xtype:'displayfield',
                                        fieldLabel:'Falta direccion',
                                        value:log.faltadireccion
                                    }
                                ]
                            
                		});
                		win.show();*/
                        
                        var win = Ext.create('Ext.Window', {
                            layout : 'vbox',
                            title : 'Resumen',
                			width : 200,
                			height : 120,
                			border : false,
                			items : [
                                    {
                                        xtype:'displayfield',
                                        fieldLabel:'Encontradas',
                                        value:log.encontradas
                                    },{
                                        xtype:'displayfield',
                                        fieldLabel:'No Encontradas',
                                        value:log.noencontradas
                                    },{
                                        xtype:'displayfield',
                                        fieldLabel:'Falta direccion',
                                        value:log.faltadireccion
                                    }
                                ]
                            
                		});
                		win.show();
                        //controller.armarBucle(view,false)
                    }
                },
                interval: 1000
            }); 
        
        
        
    },
    
    
    onItemClick: function(view,record){
        var viewParent = view.up('cuentalocalizationgridview')
        var controller = this;
        
        var profile =  0;
        var readOnly = false;
        
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordAdminsitrator = storeSecurity.findRecord('KeyReference', 'Administrator')
        if(recordAdminsitrator && recordAdminsitrator.get('Available') == true) {  
            var _security = recordAdminsitrator.get('_Security');
            if(_security && _security.modules) {
                Ext.Array.each(_security.modules,function (record) {
                    if(record.view == 'cuentaformview' && record.profile <= 1) {
                        profile = record.profile;
                    }
                })
                
            }
            
        }
         
      
         if(profile > 0) {
             
             if(profile == 1) {
                 readOnly = true;
             }
            controller.getSoftguardCuentaModelModel().load(record.get('cue_iid'),{
                view: view,
                scope: this,
        		success : function (recordCuenta) {
                    var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');
                    var win = Ext.create('Ext.Window', {
                        layout : 'fit',
                		title : title,
            			width : 600,
            			height : 400,
            			border : false,
            			items : [
                            {
                                xtype:'cuentaformview',
                                record: recordCuenta,
                                caller:view,
                                readOnly: readOnly,
                                listeners: {
                                    saved: function () {
                                        var paging = viewParent.down('pagingtoolbar');
                                        paging.doRefresh();
                                    }
                                }
                            }
                        ]
                        
            		});
            		win.show();
        		}
                    
            })
         } else {
             notify('No tiene permisos suficientes para ingresar.')
         }
     
    },
});