Ext.define('SmartTrack.controller.SmartTrackPushNotificationsGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartTrackUserLoggedSearchModel' ],
    views : [ 'SmartTrackPushNotificationsGridView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'vcpushnotificacionesgridview' : {
    			afterrender : this.initView,
                activate: this.onActivate,
                beforedestroy: this.onDestroy
            },
            'vcpushnotificacionesgridview button[action=sendmail]': {
                click: this.onSendEmailClick
            },
            'vcpushnotificacionesgridview button[action=sendmailall]': {
                click: this.onSendEmailAllClick
            },
            'vcpushnotificacionesgridview #btnBuscar' : {
                click: this.onSearchClick
            },
            'vcpushnotificacionesgridview button[action=getall]': {
                click: this.onGetAllClick
            }
		});
	}, // cierro init
    
    /**
     * Funcion que se ejecuta al activar la TAB, llama a cargar la información nuevamente del Model
     */
    onActivate : function(view) {
        this.initView(view);
    },

    initView: function(view) {        
        /**
         * Cargo el Store para la grilla
         * El Stored procedure es : SmartTrackUserLoggedSearch
         */
        if (!view.filters){
            view.filters = [];
        }

        if(view.filterTipo) {
            view.filters.push({
                property: 'tip_nTipo',
                value: view.filterTipo,
                id: 'tip_nTipo'
            })
        }

        var store =Ext.create('Ext.data.Store',{
            model: this.getSmartTrackUserLoggedSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        store.load();
        /************se agrega task para refresh de móviles conectados https://softguard.atlassian.net/browse/DSS-856****************/
        view.refreshTask = Ext.TaskManager.start({
            run : function(){
                if(view.isVisible())
                    store.load();
            },
            interval : 10000,
            scope: this
        });
        /****************************/
    },

    onDestroy: function(view){
        Ext.taskManager.stop(view.refreshTask);
    },

    onSendEmailClick : function(btn, e, oOpts) {
        var controller = this;
        var view = btn.up('vcpushnotificacionesgridview');

        var title = "Enviar mensaje";
        var url = "/rest/search/SmartTrackSendMessageSearch";
        var items = [
            {
                xtype : 'panel',
                bodyPadding: 10,
                bodyStyle: 'background:#e0e0e0',
                border : false,
                items : [
                    {
                        xtype:'textfield',
                        fieldLabel:'Asunto',
                        itemId:'asunto',
                        width:'100%',
                        labelWidth:50
                    }
                ]
            },{
                xtype:'displayfield',
                fieldLabel:'Mensaje',
                padding : '10 0 0 10'
            },{
                xtype:'htmleditor',
                fieldLabel:'',
                itemId:'mensaje',
                width:'100%',
                height:250
            }
        ]
    
        var myWindow = Ext.widget('window',{
            title: title,
            height: 400,
            width: 400,
            modal: true, 
            items: items,
            tbar: [{
                text:'Enviar',
                iconCls:'icon-email-go',
                listeners: {
                    click:function () {
                        var Ids = [];
                        
                        var selection = view.getSelectionModel().getSelection();
                        if (selection) {
                            Ext.Array.each(selection, function (rec) {
                                Ids.push(rec.get('usu_idKey'))
                            })
                            Ext.Ajax.request({
                                url: url,
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                params: {
                                    ids : Ids.join(','), 
                                    subject: myWindow.down('#asunto').getValue(), 
                                    body: myWindow.down('#mensaje').getValue(),
                                    fromId: controller.application.UserData.udw_idKey
                                    },
                                success: function(resp,operation) {
                                    notify('El mensaje fue enviado');
                                    myWindow.close();

                                    //envio los push
                                    Ext.Ajax.request({
                                        url: '/handler/sendPushFromQueue',
                                        method: 'GET'
                                    });
                                }
                            })
                        }
                    }
                }
            }]            
        }).show();
    },

    onSendEmailAllClick : function(btn, e, oOpts) {
        var controller = this;
        var view = btn.up('vcpushnotificacionesgridview');
        var title = "Enviar mensaje";
        var url = "/rest/search/SmartTrackSendMessageSearch";
        var items = [
            {
                xtype : 'panel',
                bodyPadding: 10,
                bodyStyle: 'background:#e0e0e0',
                border : false,
                items : [
                    {
                        xtype:'textfield',
                        fieldLabel:'Asunto',
                        itemId:'asunto',
                        width:'100%',
                        labelWidth:50
                    }
                ]
            },{
                xtype:'displayfield',
                fieldLabel:'Mensaje',
                padding : '10 0 0 10'
            },{
                xtype:'htmleditor',
                fieldLabel:'',
                itemId:'mensaje',
                width:'100%',
                height:250
            }
        ]
    
        var myWindow = Ext.widget('window',{
            title: title,
            height: 400,
            width: 400,
            modal: true, 
            items: items,
            tbar: [{
                text:'Enviar',
                iconCls:'icon-email-go',
                listeners: {
                    click:function () {
                        
                        var Ids = [];
                        
                        var selection = view.getSelectionModel().getSelection();
                        if (selection) {
                            Ext.Array.each(selection, function (rec) {
                                Ids.push(rec.get('usu_idKey'))
                            })

                            Ext.Ajax.request({
                                url: url,
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                params: {
                                    filter : Ext.encode(view.store.filters.items),
                                    subject: myWindow.down('#asunto').getValue(), 
                                    body: myWindow.down('#mensaje').getValue(),
                                    fromId: controller.application.UserData.udw_idKey
                                    },
                                success: function(resp,operation) {
                                    notify('El mensaje fue enviado');
                                    myWindow.close();

                                    //envio los push
                                    Ext.Ajax.request({
                                        url: '/handler/sendPushFromQueue',
                                        method: 'GET'
                                    });
                                }
                            })
                        }
                    }
                }
            }]            
        }).show();
    },

    onSearchClick: function(button, event){
        var view = button.up('vcpushnotificacionesgridview');
        var store = view.getStore();
        var queryType = view.down('#queryType').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.filters);
                 
        if (queryType == 'telefono')
            filters.push({ 
                property: 'Telefono:LIKE',
                value: query,
                id: 'search'
            });
            
         if (queryType == 'usuario')
            filters.push({ 
                property: 'usu_cnombre:LIKE',
                value: query,
                id: 'search'
            });
            
        if (queryType == 'objetivo')
            filters = [{ 
                property: 'cue_cnombre:LIKE',
                value: query,
                id: 'search'
            }];      

        store.clearFilter(true);
        if (filters.length>0) {
            store.filter(filters);
        }
    },

    onGetAllClick: function(button, event, options) {    
        var view = button.up('vcpushnotificacionesgridview');
        var store = view.getStore();
        
        view.down('#queryType').setValue('telefono');
        view.down('#query').setValue('');
        store.clearFilter(true);
        store.filter(view.filters);
        store.load();
    },



    //----07/11/2023 Daniel O. Medina Se agrega según tarea  https://softguard.atlassian.net/browse/DS-1036
    //------ se copiaron funciones desde el controler  SmartTrackGridController ---------------
    onMarkersGeoJsonChange: function(view,ultimos){
        if(view.caller && view.caller.down('#loadingmap')) {
            var loading = view.caller.down('#loadingmap');
            loading.show();
        }
        //cuando esta definido ultimo en true, intenta enviar la ultima fecha de load
        
        var controller = this;
        if (view){
            var gmappanel = view.GMAPPANEL//view.down('#googlemap'); 

            mapguardeventosview = gmappanel.up('mapguardeventosview');
            //tipoCentrado = mapguardeventosview.down('#tipoCentrado');
                    
            if(gmappanel.smarttrack) {
                //cuando gmappanel.dispositivos esta en true aplico filtro de ultima llamada para traer solo los registros que se actualizaron
                var urlParametroUltimaCarga = '';
                if(ultimos) { 
                    //tomo fecha y armao string para filtro
                    if(view.ultimaCarga) {
                        urlParametroUltimaCarga = '&ultimaCarga='+Ext.Date.format(view.ultimaCarga,'Y-m-d g:i')
                    }
                    view.ultimaCarga = new Date();
                }
                
                //Ext.Ajax.abort(view.geojsonAjax);
                if(Ext.Ajax.isLoading(view.geojsonAjax)) {
                    return false;
                }
                view.geojsonAjax = Ext.Ajax.request({
                     url: view.urlGeoJson+urlParametroUltimaCarga,                
                     success: function(response, opts) {
                         var obj = Ext.decode(response.responseText);
                         
                        if(!ultimos) {  
                            //elimino los features
                            gmappanel.smarttrack.forEach(function (feature) {
                                gmappanel.smarttrack.remove(feature)
                            })
                        } else {
                            //elimino solo los features que llegan
                            for(var i in obj.features) {
                                gmappanel.smarttrack.forEach(function (feature) {
                                    if(feature.getProperty("cue_iid") == obj.features[i].properties.cue_iid) {
                                        gmappanel.smarttrack.remove(feature)
                                    }
                                })
                            }
                        }
                        
                        gmappanel.smarttrack.addGeoJson(obj)
                        
                        gmappanel.fireEvent('center', gmappanel)
                        
                        if(loading) {
                            loading.hide();
                        }
                     }
                })
            } else {
                gmappanel.smarttrack = new google.maps.Data();
                gmappanel.smarttrack.loadGeoJson(view.urlGeoJson,null, function () {
                    
                    if(loading) {
                        loading.hide();
                    }
                });  

                gmappanel.smarttrack.setStyle({visible: true});
                gmappanel.smarttrack.setStyle(function(feature) {
                    return {
                        icon: feature.getProperty('icon'),
                        title: feature.getProperty('title')
                    };
                });

                gmappanel.smarttrack.setMap(gmappanel.getMap());
                gmappanel.smarttrack.addListener('mouseover', function(event) {
                    var address = '';
                    var infoRecord = getProperties(event.feature);
                    
                    if(gmappanel.infowindowOpened) {
                        gmappanel.infowindowOpened.close();                        
                    }
                    
                    gmappanel.infowindowOpened = new google.maps.InfoWindow({
                        pixelOffset: new google.maps.Size(0, -60)
                    }); 
                    
                    gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, address))
                    
                    //busco la direccion
                    var geocoder = gmappanel.getGeocoder();
                    geocoder.geocode({
                        location: event.feature.getGeometry().get()
                        }, function(result, status){
                            
                            if (status == 'OK'){
                                address = result[0].formatted_address;
                                
                                //actualizo contenido
                                gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, address))
                            }   else {
                                gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, ''))
                            }        
                        });
                        
                    Ext.Ajax.request({
                         url: '/rest/search/smarttrackcuenta',
                         method:'GET',
                         params: {filter:Ext.encode([{property:'cue_iid', value:event.feature.getProperty("cue_iid")},{property:'Telefono', value:event.feature.getProperty("Telefono")}])},
                         success: function(response, opts) {
                             var obj = Ext.decode(response.responseText);
                             obj.rows[0].icon = infoRecord.icon
                             infoRecord = obj.rows[0]
                             gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(obj.rows[0], address))
                         }
                    })
  
                    gmappanel.infowindowOpened.setPosition(event.feature.getGeometry().get());
                    gmappanel.infowindowOpened.open(gmappanel.getMap());
                });
               
                gmappanel.smarttrack.addListener('mouseout', function(event) {
                    gmappanel.infowindowOpened.close();
                });
                
                gmappanel.smarttrack.addListener('click', function(event) {
                    var tabpanel = view.caller.up('tabpanel')
            
                    Ext.Ajax.request({
                         url: '/rest/search/smarttrackcuenta',
                         method:'GET',
                         params: {filter:Ext.encode([{property:'cue_iid', value:event.feature.getProperty("cue_iid")},{property:'Telefono', value:event.feature.getProperty("Telefono")}])},
                         success: function(response, opts) {
                            var obj = Ext.decode(response.responseText); 
                            obj.rows[0].icon = event.feature.getProperty("icon")
                            infoRecord = obj.rows[0]
                            
                            var smartrack = controller.getSmartTrackSearchModelModel().create(Ext.clone(infoRecord))
                
                            if(view.sendSelectionToEvent) {
                                var point = new google.maps.LatLng(smartrack.get('gps_rLatitud'),smartrack.get('gps_rLongitud'));                    
                                smartrack.position = point
                                view.caller.fireEvent(view.sendSelectionToEvent,smartrack,view.caller)
                            } else {
                                var title = getLocale('SmartTrack:')+" "+event.feature.getProperty('cue_clinea')+"-"+event.feature.getProperty('cue_ncuenta');
                                var tab = Ext.widget('vigicontrollgpsfullview',{
                                    title:title ,
                                    record: smartrack,
                                    smartrack: smartrack,
                                    extraInfo: infoRecord,
                                    closable : true,
                                    translate:false,
                                    forceCuenta: true
                                });
                                
                                tabpanel.add(tab)
                                tabpanel.setActiveTab(tab);
                            }
                         }
                    })
                });
            }
        }
    },






});