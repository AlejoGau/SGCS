//MIGRADO2024
Ext.define('Common.controller.MapGuardEventosController', {
    extend : 'Ext.app.Controller',
    stores : [ 'MapguardVehicleStore' ],
    models : [ 'p_gpsSearchModel','m_asignacion_movilModel', 'SmartTrackSearchModel', 'SmartPanicsGeocercasSearchModel', 'SmartPanicSearchModel', 'MP_CuentasGeoreferenciadasSearchModel', 'MPCuentasEnAlarmaModel', 'MapguardModel', 'CuentaSearchModel' ],
    views : [ 'MapGuardEventosView' ],
    init : function(config) {
    	this.control({
			'mapguardeventosview gmappanel6' : {
				mapready : this.onMapReady,
                markersChange : this.onMarkersChange,
                markersSmartpanicsChange : this.onMarkersSmartpanicsChange,
                markersSmartTrackChange : this.onMarkersSmartTrackChange,
                markersServtecChange: this.onMarkersServtecChange,
                markersDealerChange: this.onMarkersDealerChange,
                markersCuentaChange: this.onMarkersCuentaChange,
                manualcenter : this.onManualCenter,
                center: this.onTryCenter
			},
            'mapguardeventosview' : {
                vehicleSelected: this.onVehicleSelected,
                vehicleRefresh: this.onVehicleRefresh,
                clearVehicle: this.clearRouteAndPanel,
                smarttrackSelected: this.onSmarttrackSelected
            },
            'mapguardeventosview button[action=searchAll]' : {
                click: this.onSearchAllClick
            },
            'mapguardeventosview #btnAddress' : {
                click : this.onAddressClick
            },
            'mapguardeventosview [action=actualizarcuentas]' : {
                click: this.onActualizarCuentasClick
            },
    		'mapguardeventosview button[action=play]' : {
				click : this.onPlayClick
			},
			'mapguardeventosview button[action=stop]' : {
				click : this.onStopClick
			},            
            'mapguardeventosview button[action=center]': {
                click: this.onCenterClick
            },            
            'mapguardeventosview #tipoCentrado': {
                change: this.onTipoCentradoChange
            }
        });
	}, // cierro init
    onTipoCentradoChange: function (combo, newValue) {
        var view = combo.up('mapguardeventosview');
        var gmappanel6 = view.down('gmappanel6');
        this.onTryCenter(gmappanel6)
    },
    onManualCenter: function(gmappanel6){
        var view = gmappanel6.up('mapguardeventosview');
        var btn = view.down('#center');
        
        if(btn._pressed) {
            //btn.btnEl.dom.click();
            btn.setText(getLocale('Cambiar a Centrar'));
            btn._pressed = false
            //btn.fireEvent('click', btn);
        } 
    },
    
    
    /*
    onTryCenter: ejecuta centrado con el setting definido sin hacer toogle
    */
    onTryCenter: function (gmappanel6) {
        var view = gmappanel6.up('mapguardeventosview')
        if(view.down('#center')) {
            btn = view.down('#center')
        }
        //doy vuelta los valores para poder mantener el mismo estado de centrado
        // por que oncenter funciona como toogle
        if(btn._pressed) {
            btn._pressed = false;
        } else {
            btn._pressed = true;
        }
        
        this.onCenterClick(btn)
    },
    
    onCenterClick: function (btn) {      
        var view = btn.up('mapguardeventosview')
        
        if(!btn._pressed) {
            btn.setText(getLocale('Cambiar a Manual'));          
            btn._pressed = true;
            
            view.GMAPPANEL = view.down('gmappanel6');
            var bounds = new google.maps.LatLngBounds();
                
            var tipoCentrado = view.down('#tipoCentrado').getValue()
            if(tipoCentrado == 'todo'){
                
                if(view.GMAPPANEL.moviles) {
                    view.GMAPPANEL.moviles.forEach(function (feature) {
                        bounds.extend(feature.getGeometry().get())
                    })  
                }
                
                if(view.GMAPPANEL.moviles) {
                    view.GMAPPANEL.moviles.forEach(function (feature) {
                        bounds.extend(feature.getGeometry().get())
                    })  
                }
                if(view.GMAPPANEL.smarttrack) {
                    view.GMAPPANEL.smarttrack.forEach(function (feature) {
                        bounds.extend(feature.getGeometry().get())
                    }) 
                }
            }
            
            if(view.cuentaPosicion || view.GMAPPANEL.moviles) {
                if(view.cuentaPosicion && view.cuentaPosicion.position){
                    bounds.extend(view.cuentaPosicion.position)           
                    view.GMAPPANEL.getMap().fitBounds(bounds);
                }
                
            }
            btn._pressed = true;
            
            
        } else {
            btn.setText(getLocale('Cambiar a Centrar'));
            btn._pressed = false                        
        }
    },
    
    
    decimalColorToHTMLcolor : function(number) {
            var intnumber = number - 0;
            var red, green, blue;
    		var template = "#000000";
    	        red = (intnumber&0x0000ff) << 16;
    		green = intnumber&0x00ff00;
    		blue = (intnumber&0xff0000) >>> 16;
    	        intnumber = red|green|blue;
    	
    		var HTMLcolor = intnumber.toString(16);
    	
    	
    		HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
    	
    		return HTMLcolor;
    	},
    
    initView: function(view){
        this.application._idModule = 18;    
        var controller = this;
        
        var gridvehicle = view.down('mapguardgridview')
        var gmappanel6 = view.down('gmappanel6');
        
        
        view.down('#tipoCentrado').select(view.down('#tipoCentrado').getStore().getAt(1));
        
        view.vehicleStore = Ext.create('Ext.data.Store',{
            model: controller.getMapguardModelModel(),
            remoteFilter: true,
            pageSize: 500,
            filters: view.vehicleFilters
        });
        
        gmappanel6.ultimasPosiciones = view.vehicleStore;
        
        
      
        controller.defineCuenta(view.record, view)
        
        var datapanel = view.down('#panel');
        
        // si es un evento viene con un model distinto si es una cuenta fija
        if(view.record.get('_cuenta')) {
            datapanel.setTitle(getLocale('Datos del evento'))
            var path = '/handler/getImage?u=/images/codala/'+view.record.get('rec_calarma')+'.png';     
            var img =  '<img src="'+path+'"   width=16 height=16 onerror=\'this.style.display = "none"\'> ';            
            
            var txtColor = this.decimalColorToHTMLcolor(view.record.get('cod_ncolorletra'));
            var backColor = this.decimalColorToHTMLcolor(view.record.get('cod_ncolor'));
            
            datapanel.down('#cuenta').setValue(view.record.get('_cuenta'))
            datapanel.down('#evento').setValue(img +' '+ view.record.get('_evento'))
            datapanel.down("#infoevento").setBodyStyle('color:' + txtColor + '; background-color:' + backColor + '; text-align:center');
        
        } else if(view.record.get('_fullname')) { 
            
            datapanel.setTitle(getLocale('Cuenta'))
           
            var path = '/resources/softguard/images/poi/'+view.record.get('tip_curlimagen');     
            var img =  '<img src="'+path+'"   width=16 height=16 onerror=\'this.style.display = "none"\'> ';
            datapanel.down('#cuenta').setValue(img +' '+ view.record.get('_fullname'))
            
        } 
        
        //cargo los vehiculos
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordSecurityMapGuard = storeSecurity.findRecord('KeyReference', 'SgAppMapGuardWeb')
        if(recordSecurityMapGuard) {  
            var _security = recordSecurityMapGuard.get('_Security');
            if(_security && _security.filters && _security.filters.patrullas) {
                var patrullasIds = _security.filters.patrullas;
                
                view.vehicleFilters =  [
                    {
                        property:'tmp_idKey:IN',
                        value: patrullasIds
                    }
                ];
                
            }
            
            gridvehicle.bindStore(view.vehicleStore);
            
            view.vehicleStore.load({callback:function (records) {}})
        }
        
       /* 
        
                        if (view.record){
                            view.rec_iid = view.record.get('rec_iid');
                        }
                        
                        Ext.Array.each(records, function (record,k) { 
                            controller.getVehiclePosition(record, gmappanel6);
                        })    
                        
                        if (view.record) {         
               
                            gmappanel6.cuentaList = [view.record];
                            controller.mostrarCuenta.call({gmappanel6: gmappanel6, controller: controller},view.record);
                           
                            
                        }
                        
                        // como atiendo un evento muestro todos los vehiculos
                        // parche por problema de views[]
                        var selmodel = gridvehicle.getSelectionModel();
                        if (selmodel.views.length == 0)
                            selmodel.views.push(selmodel.view);
                        selmodel.selectAll();
                        
                        
                        
                        Ext.Array.each(records, function (record,k) {
                            
                            
                            if(record.get('asi_ncuenta') == view.record.get('cue_iid')) {
                                
                                view.vehicleSelected = record;
                                view.vehicleSelected.set('selected',true);
                                record.route = null;
                                
                                var pos = controller.getVehiclePosition(record, gmappanel6);
                                //record.position = pos.position;
                                controller.calcRoute({
                                    start: pos.position,
                                    end: view.cuentaSelected.position,
                                    gmappanel6: gmappanel6,
                                    callback: function(route){
                                        // se calculo la ruta 
                                        record.route = route;
                                        this.showMovilWidget(record, gmappanel6);
                                    }
                                },controller);
                                
                            }
                            
                            
                        })
                        
                        
                
                    }
            
                }
                );
            
            
        }*/
        
        var filterAsignacion = []
        if(view.record.get('rec_iid')) {
            filterAsignacion = [
                    {
                        property:'amv_rec_iid',
                        value: view.record.get('rec_iid')
                    },{
                        property:'amv_estado',
                        value: 1
                    }
                ]
        } else {
            filterAsignacion  = [
                    {
                        property:'amv_objecttypeid',
                        value: view.recordAsignacion.get('amv_objecttypeid')
                    },{
                        property:'amv_objectid',
                        value: view.recordAsignacion.get('amv_objectid')
                    },{
                        property:'amv_estado',
                        value: 1
                    }
                ]
        }
        
        
        
        //traigo todas las asignaciones para este evento que esten en estado ASIGNADO
        view.asignacionesStore = Ext.create('Ext.data.Store',{
            model: controller.getM_asignacion_movilModelModel(),
            remoteFilter: true,
            pageSize: 500,
            filters:filterAsignacion 
        });
        
        view.asignacionesStore.load({callback:function (records) {
            
            var idsSmartTracks = []
            var idsVehicles = [];
            view.asignacionesStore.each(function (rec,k) {
                
                
                //Model Smartrack
                if(rec.get('amv_objecttypeid') == 3113) {                    
                    idsSmartTracks.push(rec.get('amv_objectid'))                   
                } 
                //Model Vehicle
                else if(rec.get('amv_objecttypeid') == 659) {
                    idsVehicles.push(rec.get('amv_objectid'))
                }
            
            })
            
            if(idsSmartTracks.length > 0) {
                //traigo todos los VIGICONTROL
                var smartrackStore = Ext.create('Ext.data.Store',{
                model: controller.getSmartTrackSearchModelModel(),
                remoteFilter: true,
                pageSize: 500,
                filters:[
                            {
                                property:'Id:ININT',
                                value: idsSmartTracks.join(',')
                            }
                        ]
                });
                
                smartrackStore.load({callback:function (records) {
                    gmappanel6.smartTrackList = records;
                    controller.showMarkerArray(gmappanel6,controller);
                    
                    Ext.Array.each(records, function (record) {
                        var pos = controller.getCuentaPosition(record, gmappanel6);
                        controller.calcRoute({
                            start: pos.position,
                            end: view.cuentaSelected.position,
                            gmappanel6: gmappanel6,
                            callback: function(route){
                                // se calculo la ruta 
                                record.route = route;   
                                controller.showMovilWidget(record, gmappanel6);
                            }
                        },controller);
                    })
                    
                }})
            }
            
            
            if(idsVehicles.length > 0) {
                
                
                //traigo todos los VEHICLES
                var vehicleStore = Ext.create('Ext.data.Store',{
                model: controller.getMapguardModelModel(),
                remoteFilter: true,
                pageSize: 500,
                filters:[
                            {
                                property:'tmp_idKey:IN',
                                value: idsVehicles.join(',')
                            }
                        ]
                });
                
                vehicleStore.load({callback:function (records) {
                    //saque esto para que el geojson dibuje el icono
                    //gmappanel6.vehicleList = records;
                    //controller.showMarkerArray(gmappanel6,controller);
                    
                    if(view.down('movilesgridview')) {
                        view.down('movilesgridview').fireEvent('showMovil',records,view.down('movilesgridview'))
                    }
                    
                    
                    Ext.Array.each(records, function (record) {
                        var pos = controller.getVehiclePosition(record, gmappanel6);
                        controller.calcRoute({
                            start: pos.position,
                            end: view.cuentaSelected.position,
                            gmappanel6: gmappanel6,
                            callback: function(route){
                                // se calculo la ruta 
                                record.route = route;    
                                controller.showMovilWidget(record, gmappanel6);
                            }
                        },controller);
                    })
                    
                }})
            }
            
            
            //si no hay nada asignado al evento muestro los moviles
            if(idsSmartTracks.length <= 0 && idsVehicles.length <= 0) {
                
                var selmodel = gridvehicle.getSelectionModel();
                if(selmodel.views)
                    if (selmodel.views.length == 0) {
                        selmodel.views.push(selmodel.view);
                    }
                selmodel.selectAll();
            }
            
            
            
            
        }})
        
        
        //muestro la cuenta en el mapa
        if (view.record) {         
            view.record.position = null
            gmappanel6.cuentaList = [view.record];
            //Daniel O. Medina 17/03/2026 anulo esta línea y agrego la de abajo por:
            //https://softguard.atlassian.net/browse/DSS-1434
            // controller.mostrarCuenta.call({gmappanel6: gmappanel6, controller: controller},view.record);   
            controller.mostrarEventoUltimaPosicion.call({gmappanel6: gmappanel6, controller: controller},view.record);
        }
        
        
        
        
        
        
        /*var url = '/Rest/Security/Modules/'+this.application._idModule+'/Security';
        Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
            var json = resp.responseText?JSON.parse(resp.responseText):null;
            if (json){
                var patrullasIds = json.filters.patrullas;
                
                view.vehicleFilters =  [
                    {
                        property:'tmp_idKey:IN',
                        value: patrullasIds
                    }
                ];
            }
            gridvehicle.bindStore(view.vehicleStore);
            
            view.vehicleStore.load(
                {
                    callback:function (records) {
                        if (view.record){
                            view.rec_iid = view.record.get('rec_iid');
                        }
                        
                        Ext.Array.each(records, function (record,k) { 
                            controller.getVehiclePosition(record, gmappanel6);
                        })    
                        
                        if (view.record) {         
               
                            gmappanel6.cuentaList = [view.record];
                            controller.mostrarCuenta.call({gmappanel6: gmappanel6, controller: controller},view.record);
                           // controller.onCuentaSelected(view.record, view);
                            
                        }
                        
                        // como atiendo un evento muestro todos los vehiculos
                        // parche por problema de views[]
                        var selmodel = gridvehicle.getSelectionModel();
                        if (selmodel.views.length == 0)
                            selmodel.views.push(selmodel.view);
                        selmodel.selectAll();
                        
                        
                        
                        Ext.Array.each(records, function (record,k) {
                            
                            
                            if(record.get('asi_ncuenta') == view.record.get('cue_iid')) {
                                
                                view.vehicleSelected = record;
                                view.vehicleSelected.set('selected',true);
                                record.route = null;
                                
                                var pos = controller.getVehiclePosition(record, gmappanel6);
                                //record.position = pos.position;
                                controller.calcRoute({
                                    start: pos.position,
                                    end: view.cuentaSelected.position,
                                    gmappanel6: gmappanel6,
                                    callback: function(route){
                                        // se calculo la ruta 
                                        record.route = route;
                                        this.showMovilWidget(record, gmappanel6);
                                    }
                                },controller);
                                
                            }
                            
                            
                        })
                        
                        
                
                    }
            
                }
                );
            }
          })*/
          
          
          
          view.servicioTecnicoStore = Ext.create('Ext.data.Store',{
            model: controller.getMapguardModelModel(),
            remoteFilter: true,
            pageSize: 500,
            filters:  [
                    {
                        property:'tmp_cnumero:LIKE',
                        value: 'ST'
                    }
                ] 
        });
        view.down('#servtecgrid').bindStore(view.servicioTecnicoStore);
        view.servicioTecnicoStore.load()
        
        
        if(view.forceShowWidget) {
             this.showMovilWidget(view.forceShowWidget, gmappanel6);
        }
      
    },
    
  
  
    onMapReady: function(gmappanel6){
        var controller = this;
        var view = gmappanel6.up('mapguardeventosview');
        
        if(!view.record.get('rec_iid')) {            
           view.down('#infoevento').hide()
        }
        
        
        //Requisistos para el inicio del modulo
        if(!view.record.get('rec_iid') && view.forceEvaluateData) {
            //aviso al usuario
            notify('No se puede encontrar el ID del evento.')   
            //armo objeto informativo del bug
            var code = {                        
                        "origin": {                            
                            "userLogged": _UserData.UserId,
                            "idModule": controller.application._idModule,
                            "view": view.xtype
                        }
                    }
            //emito logger
            logger.error(Ext.encode(code))            
            //intento cerrar
            view.up('tabpanel').remove(view, true);
            //termino proceso
            return false;
        }
        
        
        
        
        
        
        
        var map = gmappanel6.getMap();
        
        
        this.initView(view);
        
        console.log('Rec seleccionado',view.record.get('rec_iid'))
        
        view.task = Ext.TaskManager.start({
            args: [gmappanel6, controller],
            run: this.loadData,
            scope: controller,
            interval: 10000
        });
        
       
        
        if (UiApplicationMetadata.Kml){
            var kml = new google.maps.KmlLayer({
                url: UiApplicationMetadata.Kml
            });     
            kml.setMap(map);
        }
        
        if (UiApplicationMetadata.MapType){
            map.setMapTypeId(UiApplicationMetadata.MapType);
        }
        
        gmappanel6.tiempogps = getParametro('TIEMPOGPS');
        
        gmappanel6.tg_tiempovidaalarma = getParametro('TG_TIEMPOVIDAALARMA');
        
       
        
    },
   
    
    
    onMarkersCuentaChange: function(gmappanel6, cuentaList, keepSelected){
        var view = gmappanel6.up('mapguardeventosview');
        
        if (view.keepSelected)
            keepSelected = view.keepSelected
        
        if (!view.vehicleSelected && !keepSelected){
            this.clearVehicles(gmappanel6);
        }
        
        if (!keepSelected){
            this.cleanSelected(view);
        }
        
        this.clearCuentas(gmappanel6);
        
        if (cuentaList)
            gmappanel6.cuentaList = cuentaList;
        
        this.loadData(gmappanel6, this);
        this.showMarkerArray(gmappanel6,this);
    },
    
    onMarkersChange: function(gmappanel6, vehiclelist, keepSelected){
        var view = gmappanel6.up('mapguardeventosview');
        
        if (view.keepSelected)
            keepSelected = view.keepSelected
        
        
        // saco && !keepSelected proqueu nunca borra los vehiculso cuando los deselecciono
        if (!view.vehicleSelected ){
            this.clearVehicles(gmappanel6);
        }
        
        if (!keepSelected){
            this.cleanSelected(view);
        }
        
        this.clearCuentas(gmappanel6);
        
        if (vehiclelist)
            gmappanel6.vehicleList = vehiclelist;
        
        this.loadData(gmappanel6, this);
        this.showMarkerArray(gmappanel6,this);
    },
    
    
    
    onMarkersSmartpanicsChange: function(gmappanel6, vehiclelist, keepSelected){
        var view = gmappanel6.up('mapguardeventosview');
        
        if (!view.vehicleSelected ){
            this.clearVehicles(gmappanel6);
        }
        
        if (!keepSelected){
            this.cleanSelected(view);
        }
        
        this.clearCuentas(gmappanel6);
     //   if (vehiclelist)
            gmappanel6.smartpanicsList = vehiclelist;
        
        this.loadData(gmappanel6, this);
        this.showMarkerArray(gmappanel6,this);
    },
    
    
    onMarkersSmartTrackChange: function(gmappanel6, vehiclelist, keepSelected){
        var view = gmappanel6.up('mapguardeventosview');
        
        if (!view.vehicleSelected){
            this.clearVehicles(gmappanel6);
        }
        
        if (!keepSelected){
            this.cleanSelected(view);
        }
        
        this.clearCuentas(gmappanel6);
       // if (vehiclelist)
            gmappanel6.smartTrackList = vehiclelist;
        
        this.loadData(gmappanel6, this);
        this.showMarkerArray(gmappanel6,this);
    },
    
    
    onMarkersServtecChange: function(gmappanel6, vehiclelist, keepSelected){
        var view = gmappanel6.up('mapguardeventosview');
        
        if (!view.vehicleSelected ){
            this.clearVehicles(gmappanel6);
        }
        
        if (!keepSelected){
            this.cleanSelected(view);
        }
        
        this.clearCuentas(gmappanel6);
       // if (vehiclelist)
            gmappanel6.servtecList = vehiclelist;
        
        this.loadData(gmappanel6, this);
        this.showMarkerArray(gmappanel6,this);
    },
    
    
    onMarkersDealerChange: function(gmappanel6, vehiclelist, keepSelected){
        var view = gmappanel6.up('mapguardeventosview');
        
        if (!view.vehicleSelected ){
            this.clearVehicles(gmappanel6);
        }
        
        if (!keepSelected){
            this.cleanSelected(view);
        }
        
        this.clearCuentas(gmappanel6);
       // if (vehiclelist)
            gmappanel6.dealerList = vehiclelist;
        
        this.loadData(gmappanel6, this);
        this.showMarkerArray(gmappanel6,this);
    },
    
    clearRouteAndPanel: function (view) {
        var datapanel = view.down('#datapanel');
        datapanel.collapse();
        
        if (view.down('#googlemap').directionsDisplay){
            view.down('#googlemap').directionsDisplay.setMap(null);
        }
    },
    
    onVehicleRefresh: function(view, record){
        var gmappanel6 = view.down('gmappanel6');
        this.showVehicle.call({gmappanel6: gmappanel6, controller: this},record);
    },
    
    clearVehicles: function(gmappanel6){
        Ext.Array.each(gmappanel6.vehicleList,function(vehicle){
            if (vehicle.marker){
                vehicle.marker.setMap(null);
                vehicle.marker = null
            }
            
        });
        
        
    },
    
    clearCuentas: function(gmappanel6){
        Ext.Array.each(gmappanel6.cuentaList,function(cuenta){
            if (cuenta.marker){
                cuenta.marker.setMap(null);
                cuenta.marker = null;
            }
            
        });
    },
    
    getVehiclePosition: function(vehicle, gmappanel6){
        var store = gmappanel6.ultimasPosiciones;
        //console.log(store);
        if (store){     
            if(vehicle.get('tmp_iid')) {
                var record = store.findRecord('tmp_iid', vehicle.get('tmp_iid'));
                if (record && record.get('cLatLng') ){
                    var myLatLng = record.get('cLatLng');
                    var arrayLatLng = myLatLng.split(',');
                    if (!isNaN(arrayLatLng[0]) && !isNaN(arrayLatLng[1])){
                        var point = new google.maps.LatLng(arrayLatLng[0],arrayLatLng[1]);
                        record.position = point;
                        return {lat: arrayLatLng[0], long: arrayLatLng[1], position: point, gps: record};
                    }
                    else return {lat:'',long:'',position: null}
                } else if (!record.get('cLatLng')) {
                     var point = new google.maps.LatLng(vehicle.get('gps_rLatitud'),vehicle.get('gps_rLongitud'));
                     vehicle.position = point;
                     return {lat: vehicle.get('gps_rLatitud'), long: vehicle.get('gps_rLongitud'), position: point, gps: record};
                } else return {lat:'',long:'',position: null}
            }
        }
    },
    
    mostrarEventoUltimaPosicion: function(cuenta){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('mapguardeventosview');
        var center = false;
        var clear = false;
        var storeGPS =Ext.create('Ext.data.Store',{
                model: controller.getP_gpsSearchModelModel(),
                remoteFilter: true,                
                pageSize: 1,
                filters: [
                        {
                            property: 'gps_idCuenta',
                            value   : cuenta.get('cue_iid')
                        }
                    ],
                remoteSort: true,
                sorters:{
                    property: 'gps_iid',
                    direction: 'DESC'
                },
            });

            storeGPS.load({callback:function (records) {
                if(records.length>0) {
                    var record = records[0];
                    
                    var lat = record.get('gps_rLatitud')
                    var long = record.get('gps_rLongitud')
                    /*var markerConf = {
                        lat : lat,
                        lng : long,         
                        draggable : true
                    };
                    */
                    var position = new google.maps.LatLng(lat,long);
                    var pos = {lat: lat, long : long, position: position, gps: cuenta};
                    cuenta.position = pos.position;
                    
                    var infoHtml = controller.getMarkerInfoWindowHtml(cuenta,pos);
                    
                    var markerConf = {
                        position: pos.position,
                        lat : pos.lat,
                        lng : pos.long,
                        record: cuenta,
                        labelContent: "<span>"+cuenta.get('cue_clinea')+'-'+cuenta.get('cue_ncuenta')+"</span>",
                        labelAnchor: new google.maps.Point(0, 0),
                        labelClass: "gmaplabel2", // the CSS class for the label
                        labelStyle: {opacity: 0.75},
                        title : cuenta.get('Name'),
                        icon: controller.getCuentaIcon(cuenta,gmappanel6),
                        infoWindow: {
                            content: infoHtml, 
                            listener:'mouseover',
                            disableAutoPan: true
                        },
                        draggable : false,
                        record:cuenta
                    };
                    
                    /*if (cuenta.marker){
                        // muevo el marker de lugar
                        cuenta.marker.setPosition(pos.position);
                        // lo muestro por si estaba oculto
                        cuenta.marker.setMap(gmappanel6.getMap());
                        // cambio el icono por si se selecciono o no
                        cuenta.marker.setIcon(controller.getCuentaIcon(cuenta,gmappanel6));
                        // cambio el contenido del marker
                        
                        if (cuenta.infowindow)
                        cuenta.infowindow.setContent(infoHtml);
                        
                    } else {
                        */
                    cuenta.marker = markerConf;
                        gmappanel6.addMarker(pos.position, markerConf, clear);
                    
                    
                    cuenta.marker.setMap(gmappanel6.getMap());
                        //agrego listener
                        google.maps.event.addListener(cuenta.marker, 'click', function() {
                            //view.cuentaSelected = cuenta;
                            view.fireEvent('cuentaSelected',cuenta, view);
                        });
                        
                        cuenta.markerIndex = gmappanel6.cache.marker.length-1;
                        cuenta.infowindow = gmappanel6.createInfoWindow(markerConf.infoWindow, pos.position, cuenta.marker);
                        
                        google.maps.event.addListener(cuenta.marker, 'mouseout', function() {
                        cuenta.infowindow.close()
                        
                        });
                    //}

                    

                  
                }else{
                    controller.mostrarCuenta.call({gmappanel6: gmappanel6, controller: controller},view.record);   
                }
                
                
            }});

    },

    getCuentaPosition: function(record, gmappanel6){
        var arrayLatLng = [] ;
        
        if(record.get('sp_rLongitud') && record.get('sp_rLongitud') != '') {
            arrayLatLng[0] = record.get('sp_rLatitud') ;
            arrayLatLng[1] = record.get('sp_rLongitud');
            
        } else if(record.get('gps_rLongitud') && record.get('gps_rLongitud') != '') {
            arrayLatLng[0] = record.get('gps_rLatitud') ;
            arrayLatLng[1] = record.get('gps_rLongitud');
            
        } else if(record.get('sp_rlongitud') && record.get('sp_rlongitud') != '' && record.get('sp_rlongitud') != 0) {
            arrayLatLng[0] = record.get('sp_rlatitud') ;
            arrayLatLng[1] = record.get('sp_rlongitud');
            
        } else if(record.get('gps_rlongitud') && record.get('gps_rlongitud') != '') {
            arrayLatLng[0] = record.get('gps_rlatitud') ;
            arrayLatLng[1] = record.get('gps_rlongitud');
            
        } else if(record.get('lat') && record.get('long') != '') {
            arrayLatLng[0] = record.get('lat') ;
            arrayLatLng[1] = record.get('long');
            
        } else if(record.get('cue_cLatLng')) {
            var myLatLng = record.get('cue_cLatLng');
            var arrayLatLng = myLatLng.split(',');
            
        }  else {
            var myLatLng = record.get('cue_clatlng');
            var arrayLatLng = myLatLng.split(',');
        }
        if (arrayLatLng.length > 1){
            if (!isNaN(arrayLatLng[0]) && !isNaN(arrayLatLng[1])){
                var point = new google.maps.LatLng(arrayLatLng[0],arrayLatLng[1]);
                return {lat: arrayLatLng[0], long: arrayLatLng[1], position: point, gps: record};
            }
                else return {lat:'',long:'',position: null}
        }else {     
            return {lat:0,long:0,position: null};
        } 
    },
    
    getVehicleIcon: function(vehicle, gmappanel6){
        var iconUrl = '/resources/softguard/images/mapguard-cservice/';
        var tipo = 'movil_asignado';
        
        if (vehicle.get('cService') == 'ST'){
            tipo = 'ServiceTecnico';
        }else {
            switch(vehicle.get('tmp_nestado'))
            {
            case 1:
              tipo = 'movil_disponible'
              break;
            case 2:
              tipo = 'Sos'
              break;
            case 3:
              tipo = 'movil_asignado'
            }
        }
            
        iconUrl = iconUrl + tipo + '.png';
        
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(15,35)
        );
        
        return image;
    },
    
    getCuentaIcon: function(cuenta, gmappanel6){
        var cuentaTipoIcon = cuenta.get('tip_curlimagen');
        
        
       
        var iconUrl = '/resources/softguard/images/mapguard-cservice/';
        var tipo = 'Casa';// cuenta.get('tip_cdescripcion');
        
        if (cuenta.get('selected')){
            tipo=tipo+'_selected';
        }
        iconUrl = iconUrl + tipo + '.png';
        
        /*if (cuentaTipoIcon){
            iconUrl = cuentaTipoIcon;
        }*/
        
        //si tiene alarma muestro el icono de alarma
        if(cuenta.get('rec_calarma')) {
            //iconUrl = '/handler/getImage?u=/images/codala/'+cuenta.get('rec_calarma')+'.png';          
            var iconUrl = '/resources/softguard/images/enalarma.png';
        } 
        
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(15,35)
        );
        
        return image;
        
    },
    
    
    getSmartPanicIcon: function(cuenta, gmappanel6){
        var tipo = 'Casa';// cuenta.get('tip_cdescripcion');
        
        if (cuenta.get('selected')){
            tipo=tipo+'_selected';
        }
        iconUrl = '/resources/softguard/images/mapguard-cservice/sp.png';
        
        
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(15,35)
        );
        
        return image;
    },
    
    
    getServTecIcon: function(cuenta, gmappanel6){
        var tipo = 'Casa';// cuenta.get('tip_cdescripcion');
        
        if (cuenta.get('selected')){
            tipo=tipo+'_selected';
        }
        iconUrl = '/resources/softguard/images/poi/taller.png';
        
        
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(15,35)
        );
        
        return image;
    },
    
    
    getSmartTrackIcon: function(cuenta, gmappanel6){
        var tipo = 'Casa';// cuenta.get('tip_cdescripcion');
        
        if (cuenta.get('selected')){
            tipo=tipo+'_selected';
        }
        iconUrl = '/resources/softguard/images/mapguard-cservice/vc.png';
        
        
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(15,35)
        );
        
        return image;
    },
    
    loadData: function(gmappanel6,controller){
        var vehicles = gmappanel6.vehicleList;
        
        var view = gmappanel6.up('mapguardeventosview');
        // si se cerro la ventana freno la tarea
        if (!view){
            Ext.TaskManager.stop({
                args: [gmappanel6,controller],
                run: this.loadData
            });
            return false;
        }
        
        if (vehicles && vehicles.length > 0){
            var ultimasPosicionesClonado  = deepCloneStore(gmappanel6.ultimasPosiciones)
            
            
            //ultimasPosicionesClonado.filter(view.vehicleFilters)
            
            
            ultimasPosicionesClonado.load({callback: function(records, operation, success){
                //PARCHE HORRIBLE para que tome las ultimas posiciones del clonado REVISAR
                
                var vehicleGridStore = view.down('mapguardgridview').getStore()
                
                Ext.Array.each(records, function(r){
                    var v = gmappanel6.ultimasPosiciones.findRecord('tmp_iid', r.get('tmp_iid'));
                    var vehicleRecord = vehicleGridStore.findRecord('tmp_iid', r.get('tmp_iid'))
                    if (v){
                        
                        //console.log(r.get("Name"), r.get("_cestado"))
                        v.set("cLatLng",r.get("cLatLng"));
                        
                    }
                })
                
                
                Ext.Array.each(gmappanel6.vehicleList, function(r){                    
                    var vehicleRecord = vehicleGridStore.findRecord('tmp_iid', r.get('tmp_iid'))
                    var v = ultimasPosicionesClonado.findRecord('tmp_iid', r.get('tmp_iid'));
                    
                    
                    r.set("cLatLng",v.get("cLatLng"));
                    r.set("tmp_nestado",v.get("tmp_nestado"));
                    r.set("asi_cLatLng",v.get("asi_cLatLng"));
                    r.set("asi_clinea",v.get("asi_clinea"));
                    r.set("asi_cnombre",v.get("asi_cnombre"));
                    r.set("asi_cueiid",v.get("asi_cueiid"));
                    r.set("asi_ncuenta",v.get("asi_ncuenta"));
                    r.dirty == true
                    
                    
                    if (vehicleRecord){
                        vehicleRecord.set("cLatLng",v.get("cLatLng"));
                        vehicleRecord.set("_cestado",v.get("_cestado"));
                        vehicleRecord.set("asi_cLatLng",v.get("asi_cLatLng"));
                        vehicleRecord.set("asi_clinea",v.get("asi_clinea"));
                        vehicleRecord.set("asi_cnombre",v.get("asi_cnombre"));
                        vehicleRecord.set("asi_cueiid",v.get("asi_cueiid"));
                        vehicleRecord.set("asi_ncuenta",v.get("asi_ncuenta"));
                        vehicleRecord.dirty == true
                        
                    }
                    
                })
                
                controller.showMarkerArray(gmappanel6,controller);
            }})
        } else{
            //console.log('no hay vehiculos para mostrar')
        }
        
        
    },
    
    showMarkerArray: function(gmappanel6,controller){
        var view = gmappanel6.up('mapguardeventosview');
        var vehicles = gmappanel6.vehicleList;
        var markers = gmappanel6.markerList;
        var cuentas = gmappanel6.cuentaList;
        
        var smartpanics = gmappanel6.smartpanicsList;
        var smartrack = gmappanel6.smartTrackList;
        var servtec = gmappanel6.servtecList;
        var dealer = gmappanel6.dealerList;
        
        var map = gmappanel6.getMap();
        Ext.Array.each(vehicles,controller.showVehicle,{gmappanel6: gmappanel6, controller: controller});
        Ext.Array.each(cuentas,controller.mostrarCuenta,{gmappanel6: gmappanel6, controller: controller});
        Ext.Array.each(smartrack,controller.mostrarSmartTrack,{gmappanel6: gmappanel6, controller: controller});
        
      /*  Ext.Array.each(smartpanics,controller.mostrarSmartpanics,{gmappanel6: gmappanel6, controller: controller});
        
        Ext.Array.each(servtec,controller.mostrarServtec,{gmappanel6: gmappanel6, controller: controller});
        Ext.Array.each(dealer,controller.mostrarDealer,{gmappanel6: gmappanel6, controller: controller});*/
        
        
        var center = view.down('button[action=center]')._pressed;
        
        var markerList = gmappanel6.cache.marker;
        
        
        var active = Ext.Array.filter(markerList,function(item){
            return item.getMap()
        });
        
        if (center && active.length > 0){
            
            if (view.forceCuenta && view.cuentaSelected && view.cuentaSelected.position && view.down('#tipoCentrado').getValue() == 'cuenta'){
                              
                    map.setZoom(16);
                    map.setCenter(view.cuentaSelected.marker.getPosition());    
               
                
            } else {
                var bounds = controller.getBounds(active);
                map.fitBounds(bounds);
                
            }            
            
          
        } else{
            if (center && markerList.length>0){
                var bounds = controller.getBounds(markerList);
                map.fitBounds(bounds);
            }
            
        }
        
        
    },
    
    mostrarSmartTrack: function(cuenta,index,array){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('mapguardeventosview');
        
        var center = false;
        var clear = false;
        var pos = controller.getSmartPanicPosition(cuenta, gmappanel6);
        var igual = false;
        
        if (pos && pos.position && cuenta.position && cuenta.marker){
            if (
                cuenta.marker.getPosition().lat().toFixed(6) == parseFloat(pos.lat).toFixed(6) && 
                cuenta.marker.getPosition().lng().toFixed(6) == parseFloat(pos.long).toFixed(6)
                ){
                 
                igual = true;
            
            }    
        }
        
        
        if (pos && pos.position && (pos.lat!=0 && pos.long!=0)  && !igual){
            var geocoder = gmappanel6.getGeocoder();
        
            cuenta.position = pos.position;
            
            var infoHtml = controller.getMarkerInfoWindowHtmlSmartTrack(cuenta,pos);
            
            var markerConf = {
                position: pos.position,
                lat : pos.lat,
                lng : pos.long,
                record: cuenta,
                labelContent: '<span>'+cuenta.get('cue_clinea')+'-'+cuenta.get('cue_ncuenta')+'</span>',
                //labelAnchor: new google.maps.Point(40, 0),
                labelClass: "gmaplabel2", // the CSS class for the label
                labelStyle: {opacity: 1},
                title : "VigiControl: "+cuenta.get('cue_clinea')+"-"+cuenta.get('cue_ncuenta')+" "+cuenta.get('cue_cnombre'),
                icon: controller.getSmartTrackIcon(cuenta,gmappanel6),
                infoWindow: {
                    content: infoHtml, 
                    listener:'mouseover',
                    disableAutoPan: true
                },
                draggable : false,
                record:cuenta
            };
            
            if (cuenta.marker){
                // muevo el marker de lugar
                cuenta.marker.setPosition(pos.position);
                // lo muestro por si estaba oculto
                cuenta.marker.setMap(gmappanel6.getMap());
                // cambio el icono por si se selecciono o no
                cuenta.marker.setIcon(controller.getSmartTrackIcon(cuenta,gmappanel6));
                // cambio el contenido del marker
                cuenta.infowindow.setContent(infoHtml);
                
            } else {
               
                
                gmappanel6.addMarker(pos.position, markerConf, false);
                cuenta.marker.setMap(gmappanel6.getMap());
                
                //agrego listener
                google.maps.event.addListener(cuenta.marker, 'click', function() {
                    //view.cuentaSelected = cuenta;
                    view.fireEvent('smarttrackSelected',cuenta, view);
                });
                
                cuenta.markerIndex = gmappanel6.cache.marker.length-1;
                cuenta.infowindow = gmappanel6.createInfoWindow(markerConf.infoWindow, pos.position, cuenta.marker);
                
                google.maps.event.addListener(cuenta.marker, 'mouseout', function() {
                   cuenta.infowindow.close()
                   
                });
                
            }
            
            
        }
        
        //controller.muestroOcultoVigicontrol(cuenta,view,gmappanel6)
        
        
    },
    
    
    getSmartPanicPosition: function(vehicle, gmappanel6){
        if (!isNaN(vehicle.get('gps_rLatitud')) && !isNaN(vehicle.get('gps_rLongitud'))){
            var point = new google.maps.LatLng(vehicle.get('gps_rLatitud'),vehicle.get('gps_rLongitud'));
            vehicle.position = point;
            return {lat: vehicle.get('gps_rLatitud'), long: vehicle.get('gps_rLongitud'), position: point, gps: vehicle};
        }
        else return {lat:'',long:'',position: null}
    },
    
    getMarkerInfoWindowHtmlSmartTrack: function(marker, pos){
              
        
           
         var html = '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="/resources/softguard/images/mapguard-cservice/vc.png" style="float:left; margin:0 5px 0 0"/> <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
            ';
       
        html += '\
        <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbltelefono}:</span><span> {telefono}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblusuario}:</span><span> {usuario}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneSO}:</span><span> {phoneSO}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneModel}:</span><span> {phoneModel}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneBrand}:</span><span> {phoneBrand}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblgps_tfechahora}:</span><span> {gps_tfechahora}</span><br/>\
                        </td>\
                    </tr>\
                    ';
                    
        html += '</table>';
        
        
        html = html.replace(/\{nombre\}/, marker.get('cue_clinea')+'-'+marker.get('cue_ncuenta')+'<br> '+marker.get('cue_cnombre'));
        html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'));
        html = html.replace(/\{telefono\}/, marker.get('Telefono'));
        html = html.replace(/\{phoneSO\}/, marker.get('Tipo'));
        html = html.replace(/\{usuario\}/, marker.get('Nombre'));
        html = html.replace(/\{phoneBrand\}/, marker.get('Marca'));
        html = html.replace(/\{phoneModel\}/, marker.get('Modelo'));
        html = html.replace(/\{gps_tfechahora\}/, Ext.Date.format(new Date(marker.get('gps_tfechahora')), 'd-m-Y H:i:s'));
      
      
        
        
        html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'));
        html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'));
        html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'));
        html = html.replace(/\{lblusuario\}/, getLocale('Usuario'));
        html = html.replace(/\{lblphoneSO\}/, getLocale('S.O.'));
        html = html.replace(/\{lblphoneModel\}/, getLocale('Modelo'));
        html = html.replace(/\{lblphoneBrand\}/, getLocale('Marca'));
        html = html.replace(/\{lblgps_tfechahora\}/, getLocale('Fecha de posicion'));
        
        
        return html;
        
    },
    
    
    showMarker: function(marker,index,array){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('mapguardeventosview');
        var clear = false;
        
        var lat = marker.get('Latitude');
        var long = marker.get('Longitude');
        var point = new google.maps.LatLng(lat,long);
        var pos = {lat: lat, long: long, position: point};
        
        var listeners = {};
        
        var infoHtml = controller.getMarkerInfoWindowHtml(marker,pos);
        if (typeof marker.markerIndex !== "undefined"){
            gmappanel6.cache.marker[marker.markerIndex].setPosition(pos.position);
            gmappanel6.cache.marker[marker.markerIndex].setMap(gmappanel6.getMap());
            gmappanel6.cache.infowindow[marker.markerIndex].setContent(infoHtml);
            
        } else {
            markerConf = {
                position: pos.position,
                lat : pos.lat,
                lng : pos.long,
                record: marker,
        		title : marker.get('Name'),
                infoWindow: {
                    content: infoHtml, 
                    listener:'mouseover',
                    disableAutoPan: true
                },
    			draggable : false
    		};
            
            if (typeof(MarkerWithLabel) == 'function'){
                var marker = new MarkerWithLabel(markerConf);
            } else {
                var marker = new google.maps.Marker(markerConf);
            }
 
            gmappanel6.createInfoWindow(markerConf.infoWindow, pos.position, marker);
 
            marker.markerIndex = gmappanel6.cache.marker.length-1;
        }
    },
    
    showVehicle: function(vehicle,index,array){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('mapguardeventosview');
        
        var center = false;
        var clear = false;
        var marker = {};
        var pos = controller.getVehiclePosition(vehicle, gmappanel6);
        var igual = false;
        
       
        
        
         if (pos && pos.position && vehicle.position && vehicle.marker){
             if (
                 vehicle.position.lat().toFixed(6) == pos.lat && 
                 vehicle.position.lng().toFixed(6) == pos.long
                 ){
                     
                igual = true;
                
                if (!vehicle.marker.getMap()){
                    vehicle.marker.setMap(gmappanel6.getMap());
                }
                    
             }
                    
         }
        
         if ((pos && pos.position && !igual) || vehicle.dirty == true){
            var geocoder = gmappanel6.getGeocoder();
            
            vehicle.position = pos.position;
            var infoHtml = controller.getVehicleInfoWindowHtml(vehicle,pos);
            
            var infoConf = {
                        content: infoHtml, 
                        listener:'mouseover',
                        disableAutoPan: true
                    };    
                    
            if (vehicle.marker){
                    // muevo el marker de lugar
                vehicle.marker.setPosition(pos.position);
                // lo muestro por si estaba oculto
                vehicle.marker.setMap(gmappanel6.getMap());
                // cambio el icono por si se selecciono o no
                vehicle.marker.setIcon(controller.getVehicleIcon(vehicle,gmappanel6));
                // cambio el contenido del marker
                vehicle.infowindow.setContent(infoHtml);                
  
            } else {
                markerConf = {
                    position: pos.position,
                    lat : pos.lat,
                    lng : pos.long,
                    record: vehicle,
                    labelContent: "<span>"+vehicle.get('tmp_cnombre')+"</span>",
                    labelAnchor: new google.maps.Point(0, 0),
                    labelClass: "gmaplabel2", // the CSS class for the label
                    labelStyle: {opacity: 0.75},
                	title : vehicle.get('Name'),
                    icon: controller.getVehicleIcon(vehicle,gmappanel6),
                    
        			draggable : false,
                    record:vehicle
        		};
                
                vehicle.marker =  gmappanel6.addMarker(pos.position, markerConf, clear);
                //vehicle.marker.setMap(gmappanel6.getMap());
                
                google.maps.event.addListener(vehicle.marker, 'click', function() {
                    view.fireEvent('vehicleSelected',vehicle, view);
                });
                vehicle.infowindow = gmappanel6.createInfoWindow(infoConf, vehicle.position, vehicle.marker);
                
                google.maps.event.addListener(marker, 'mouseout', function() {
                    vehicle.infowindow.close();
                   
                });
                
                
            }
                
            geocoder.geocode({
        	location: vehicle.position
    		}, function(result, status){
                if (status == 'OK' && result.length > 0){
                    pos.address = result[0].formatted_address;
                    vehicle.address = pos.address;
                }
                else{
                    pos.address = '';
                    vehicle.address = '';
                }
                var infoHtml = controller.getVehicleInfoWindowHtml(vehicle,pos);
                if (typeof vehicle.infowindow !== "undefined"){
                    vehicle.infowindow.setContent(infoHtml);
                    //gmappanel6.cache.infowindow[vehicle.markerIndex].setContent(infoHtml);                    
                }
            });
            
        }
        
    },
    
    
    
    mostrarCuenta: function(cuenta,index,array){
    
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('mapguardeventosview');
        
        var center = false;
        var clear = false;
        var pos = controller.getCuentaPosition(cuenta, gmappanel6);
        view.cuentaPosicion = pos;
        
        var igual = false;        
        
        if (pos && pos.position && cuenta.position && cuenta.marker){
            if (
                cuenta.position.lat().toFixed(6) == parseFloat(pos.lat).toFixed(6) && 
                cuenta.position.lng().toFixed(6) == parseFloat(pos.long).toFixed(6)
                ){
                 
                igual = true;
            
            }    
        }
        
        
        
        if (pos && pos.position && (pos.lat!=0 && pos.long!=0)  && !igual){
            var geocoder = gmappanel6.getGeocoder();
        
            cuenta.position = pos.position;
            
            var infoHtml = controller.getMarkerInfoWindowHtml(cuenta,pos);
            
            var markerConf = {
                position: pos.position,
                lat : pos.lat,
                lng : pos.long,
                record: cuenta,
                labelContent: "<span>"+cuenta.get('cue_clinea')+'-'+cuenta.get('cue_ncuenta')+"</span>",
                labelAnchor: new google.maps.Point(0, 0),
                labelClass: "gmaplabel2", // the CSS class for the label
                labelStyle: {opacity: 0.75},
                title : cuenta.get('Name'),
                icon: controller.getCuentaIcon(cuenta,gmappanel6),
                infoWindow: {
                    content: infoHtml, 
                    listener:'mouseover',
                    disableAutoPan: true
                },
                draggable : false,
                record:cuenta
    		};
            
            if (cuenta.marker){
                // muevo el marker de lugar
                cuenta.marker.setPosition(pos.position);
                // lo muestro por si estaba oculto
                cuenta.marker.setMap(gmappanel6.getMap());
                // cambio el icono por si se selecciono o no
                cuenta.marker.setIcon(controller.getCuentaIcon(cuenta,gmappanel6));
                // cambio el contenido del marker
                
                if (cuenta.infowindow)
                cuenta.infowindow.setContent(infoHtml);
                
            } else {
                
               
                gmappanel6.addMarker(pos.position, markerConf, clear);
               
               
               cuenta.marker.setMap(gmappanel6.getMap());
                //agrego listener
                google.maps.event.addListener(cuenta.marker, 'click', function() {
                    //view.cuentaSelected = cuenta;
                    view.fireEvent('cuentaSelected',cuenta, view);
                });
                
                cuenta.markerIndex = gmappanel6.cache.marker.length-1;
                cuenta.infowindow = gmappanel6.createInfoWindow(markerConf.infoWindow, pos.position, cuenta.marker);
                
                google.maps.event.addListener(cuenta.marker, 'mouseout', function() {
                   cuenta.infowindow.close()
                   
                });
            }
            
            
       
        }
        
    },
    
    
    getVehicleInfoWindowHtml: function(vehicle, pos){
      
    
        
        // var pos = vehicle.pos;
        var html = '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                <span>{dealer}-{ncuenta} {cuenta}</span>\
                </td>\
            </tr>\
            ';
        if(vehicle.address) {
        
            html += '\
                    <tr>\
                        <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <span class="x-btn-icon icon-map" style="display:inline-block; height: 16px; width:16px;"></span><span style="line-height:17px; vertical-align:top;"> {direccion}</span><br/>\
                        </td>\
                    </tr>\
                    ';
        }
        
        if (vehicle.get('tmp_nestado')==3){
            html += '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblCuentaAsignada}</span><span> {asi_clinea}-{asi_ncuenta} {asi_cnombre}</span><br/>\
                        </td>\
                    </tr>\
                    ';
        }
        html += '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblEstado}:</span><span> {_cestado}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                        </td>\
                    </tr>\
                    ';
                    
        html += '</table>';
            
            // traducciones
        
        html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'));
        html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'));
        html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'));
        html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'));
        html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'));
        html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'));
        html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'));
        html = html.replace(/\{lblOdometro\}/, getLocale('Odómetro'));
        html = html.replace(/\{lblEstado\}/, getLocale('Estado'));
        html = html.replace(/\{lblCuentaAsignada\}/, getLocale('Cuenta asignada'));
        
        
        //sta_dFechaUltimaAlerta
        html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'));
        html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'));
        html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'));
        html = html.replace(/\{direccion\}/, vehicle.address);
        html = html.replace(/\{latitud\}/, pos.gps.get('gps_rLatitud'));
        html = html.replace(/\{longitud\}/, pos.gps.get('gps_rLongitud'));
        
        
        html = html.replace(/\{asi_cnombre\}/, vehicle.get('asi_cnombre'));
        html = html.replace(/\{asi_clinea\}/, vehicle.get('asi_clinea'));
        html = html.replace(/\{asi_ncuenta\}/, vehicle.get('asi_ncuenta'));
        
        html = html.replace(/\{_cestado\}/, pos.gps.get('_cestado'));
        return html
        
    },
    
     getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
            if (marker.position && !isNaN(marker.position.lat()) && !isNaN(marker.position.lng()))
                bounds.extend(marker.position);
        });
        return bounds
    },
   
    
    getMarkerInfoWindowHtml: function(marker, pos){
              
        
         var html = '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src=""/resources/softguard/images/mapguard-cservice/Casa.png" style="float:left; margin:0 5px 0 0"/> <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
            ';
       
        html += '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">';
        if(marker.get('pro_cdescripcion')) {
         html += '\
                           <span style="font-weight:bold;">{lblProvincia}:</span><span> {provincia}</span><br/>';
        }
         html += '\
                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblAlarma}:</span><span> {alarma}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                        </td>\
                    </tr>\
                    ';
                    
        html += '</table>';
        
        var cod_cdescripcion = marker.get('cod_cdescripcion');
        
        if (marker.get('asi_cnombre')){
            var cuenta = marker.get('asi_clinea') + '-'+marker.get('asi_ncuenta');
            html = html.replace(/\{nombre\}/, cuenta + ' '+marker.get('asi_cnombre'));
            html = html.replace(/\{provincia\}/, marker.get('pro_cdescripcion'));
            html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'));
            html = html.replace(/\{calle\}/, marker.get('cue_ccalle'));
        }else{
            html = html.replace(/\{nombre\}/, marker.get('cue_clinea')+'-'+marker.get('cue_ncuenta')+' '+marker.get('cue_cnombre'));
            html = html.replace(/\{provincia\}/, marker.get('pro_cdescripcion'));
            html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'));
            html = html.replace(/\{calle\}/, marker.get('cue_ccalle'));
        }
        
        html = html.replace(/\{alarma\}/, marker.get('cod_cdescripcion'));
        
        html = html.replace(/\{lblAlarma\}/, getLocale('Alarma'));
        html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'));
        html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'));
        
        
        return html;
        
    },
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
            if (marker.position && !isNaN(marker.position.lat()) && !isNaN(marker.position.lng()))
                bounds.extend(marker.position);
        });
        return bounds
    },
    
    
     onSmarttrackSelected: function(record, view){
        var controller = this;
        var selected = record.get('selected');
        var gmappanel6 = view.down('gmappanel6'); 
       
       
        //si el panel esta collpsado lo muestro
        var datapanel = view.down('#panel');
        if (datapanel.collapsed)
            datapanel.expand();
       
        // si habia uno seleccionado lo saco
       // var cuentaselected = view.cuentaSelected;
        if (view.vehicleSelected){
           // this.cleanVehicleSelected(view,true);
         //   view.cuentaSelected = cuentaselected;
            if (!selected){
                // si es otro los selecciono
                view.vehicleSelected = record;
                view.vehicleSelected.set('selected',true);
                //this.mostrarCuentaRelacionada(gmappanel6,record);
                
                // muestro la ruta desde el vehiculo a la cuenta
                if (view.cuentaSelected){
                    this.calcRoute({
                        start: record.position,
                        end: view.cuentaSelected.position,
                        gmappanel6: gmappanel6,
                        callback: function(route){
                            // se calculo la ruta 
                            record.route = route;
                            this.showMovilWidget(record, gmappanel6);
                        }
                    },controller);
                } else {
                    this.showMovilWidget(record, gmappanel6);
                }
            } else {
                this.cleanSelected(view,false);
            }
        } else{
            view.vehicleSelected = record;
            view.vehicleSelected.set('selected',true);
            //this.mostrarCuentaRelacionada(gmappanel6,record);
            
            record.route = null;
            
            if (view.cuentaSelected){
                this.calcRoute({
                    start: record.position,
                    end: view.cuentaSelected.position,
                    gmappanel6: gmappanel6,
                    callback: function(route){
                        // se calculo la ruta 
                        record.route = route;
                        this.showMovilWidget(record, gmappanel6);
                    }
                },controller);
            } else {
                this.showMovilWidget(record, gmappanel6);
            }
        }
        
        // abro una ventana con el historial
        controller.showMarkerArray(gmappanel6,controller);
    },
    
    onVehicleSelected: function(record, view){
        var controller = this;
        var selected = record.get('selected');
        var gmappanel6 = view.down('gmappanel6'); 
        
        
        if(!record.position) {
            record.position = this.getVehiclePosition(record,gmappanel6).position
        }
       
       
        //si el panel esta collpsado lo muestro
        var datapanel = view.down('#datapanel');
        if (datapanel.collapsed)
            datapanel.expand();
       
        // si habia uno seleccionado lo saco
      //  var cuentaselected = view.cuentaSelected;
        if (view.vehicleSelected){
           // this.cleanVehicleSelected(view,true);
          //  view.cuentaSelected = cuentaselected;
            if (!selected){
                // si es otro los selecciono
                view.vehicleSelected = record;
                view.vehicleSelected.set('selected',true);
                //this.mostrarCuentaRelacionada(gmappanel6,record);
                
                // muestro la ruta desde el vehiculo a la cuenta
                if (view.cuentaSelected){
                        
                        
                    this.calcRoute({
                        start: record.position,
                        end: view.cuentaSelected.position,
                        gmappanel6: gmappanel6,
                        callback: function(route){
                            // se calculo la ruta 
                            record.route = route;
                            this.showMovilWidget(record, gmappanel6);
                        }
                    },controller);
                } else {
                    this.showMovilWidget(record, gmappanel6);
                }
            } else {
                this.cleanSelected(view,false);
            }
        } else{
            view.vehicleSelected = record;
            view.vehicleSelected.set('selected',true);
            //this.mostrarCuentaRelacionada(gmappanel6,record);
            
            record.route = null;
            
            if (view.cuentaSelected){
                this.calcRoute({
                    start: record.position,
                    end: view.cuentaSelected.position,
                    gmappanel6: gmappanel6,
                    callback: function(route){
                        // se calculo la ruta 
                        record.route = route;
                        this.showMovilWidget(record, gmappanel6);
                    }
                },controller);
            } else {
                this.showMovilWidget(record, gmappanel6);
            }
        }
        
        // abro una ventana con el historial
        controller.showMarkerArray(gmappanel6,controller);
    },
    
    
    defineCuenta: function(record, view){
        var controller = this;
        var selected = record.get('selected');
        var gmappanel6 = view.down('gmappanel6'); 
        var vehiclestore = gmappanel6.ultimasPosiciones;
        
        //this.cleanVehicleSelected(view,true);
        view.cuentaSelected = record;
        view.cuentaSelected.set('selected',true);
       
        // si la cuenta tiene un vehiculo asignado lo selecciono en el mapa
        var vehicle = vehiclestore.findRecord('asi_cueiid', record.get('cue_iid'));
        if (vehicle){
            // hay vehiculo asignado, lo muestro
            controller.onVehicleSelected(vehicle, view);
        }
        
    },
    
    onCuentaSelected: function(record, view){
        var controller = this;
        var selected = record.get('selected');
        var gmappanel6 = view.down('gmappanel6'); 
        var vehiclestore = gmappanel6.ultimasPosiciones;
        
        //si el panel esta collpsado lo muestro
        var datapanel = view.down('#datapanel');
        if (datapanel.collapsed)
            datapanel.expand();
        
        // si habia uno seleccionado lo saco
        if (view.cuentaSelected && !view.forceCuenta){
            if (!selected){
                this.cleanSelected(view,true);
                // si es otro los selecciono
                view.cuentaSelected = record;
                view.cuentaSelected.set('selected',true);
                this.showCuentaWidget(record, gmappanel6);
                
                // si la cuenta tiene un vehiculo asignado lo selecciono en el mapa
                var vehicle = vehiclestore.findRecord('asi_cueiid', record.get('cue_iid'));
                if (vehicle){
                    // hay vehiculo asignado, lo muestro
                    controller.onVehicleSelected(vehicle, view);
                }
                
            } else {
                this.cleanSelected(view,false);
            }
        } else{
            this.cleanVehicleSelected(view,true);
            view.cuentaSelected = record;
            view.cuentaSelected.set('selected',true);
            this.showCuentaWidget(record, gmappanel6);
            
            // si la cuenta tiene un vehiculo asignado lo selecciono en el mapa
            var vehicle = vehiclestore.findRecord('asi_cueiid', record.get('cue_iid'));
            if (vehicle){
                // hay vehiculo asignado, lo muestro
                controller.onVehicleSelected(vehicle, view);
            }
            
        }
        
        // abro una ventana con el historial
        controller.showMarkerArray(gmappanel6,controller);
    },
    
    cleanVehicleSelected: function(view, prevent){
        var gmappanel6 = view.down('gmappanel6');
        var vehicleSelected = view.vehicleSelected;
        var cuentaSelected = view.cuentaSelected;
        var datapanel = view.down('#datapanel');
        
        
        
        if (vehicleSelected){
            var cuenta = vehicleSelected.get('cuentaAsignada');
            vehicleSelected.set('selected',false);
            var movilwidget = datapanel.down('mapguardmovilview');
            if (movilwidget)
            movilwidget.close();
            
            if (cuenta){
                cuenta.marker = null;
                cuenta.set('selected',false);
                //gmappanel6.cache.marker[cuenta.markerIndex].setMap(null);
                gmappanel6.cuentaList=[];
            }
            
            view.vehicleSelected = null;
        }
    },
    
    cleanCuentaSelected: function(view, prevent){
        var gmappanel6 = view.down('gmappanel6');
        var vehicleSelected = view.vehicleSelected;
        var cuentaSelected = view.cuentaSelected;
        var datapanel = view.down('#datapanel');
    
        if (cuentaSelected && !view.forceCuenta){
            cuentaSelected.set('selected',false);
            view.cuentaSelected = null;
            var cuentawidget = datapanel.down('mapguardcuentaview');
            if (cuentawidget)
            cuentawidget.close();
        }
        
        view.forceCuenta = false; // evito cerrar el widget solo una vez
        
    },
    
    cleanSelected: function(view, prevent){
        var gmappanel6 = view.down('gmappanel6');
        var vehicleSelected = view.vehicleSelected;
        var cuentaSelected = view.cuentaSelected;
        var datapanel = view.down('#datapanel');
        
        this.cleanVehicleSelected(view, prevent);
      //  this.cleanCuentaSelected(view, prevent);
        
        if (gmappanel6.directionsDisplay){
            gmappanel6.directionsDisplay.setMap(null);
        }
        
    },
    
    mostrarCuentaRelacionada: function(gmappanel6, record){
        var model = this.getCuentaSearchModelModel();
        var view = gmappanel6.up('mapguardeventosview');
        
        if (record.get('asi_ncuenta')){
            var cuenta = Ext.create(model,{
                cue_clinea : record.get('asi_clinea'),
                cue_ncuenta : record.get('asi_ncuenta'),
                cue_cLatLng : record.get('asi_cLatLng'),
                cue_cnombre: record.get('asi_cnombre'),
                Name: record.get('asi_cnombre')
            });
            
            gmappanel6.cuentaList=[cuenta];
            
            if (view.cuenta){
                gmappanel6.cuentaList.push(view.cuenta);
            }
            
            record.set('cuentaAsignada',cuenta);
            this.showMarkerArray(gmappanel6, this);
            //this.mostrarCuenta.apply({gmappanel6:gmappanel6,controller:this},[cuenta]);
        }
    },
    
    
    onActualizarCuentasClick: function(btn){
        var view = btn.up('mapguardeventosview');
        this.onCuentaTipoSelect(view.down('#comboCuentas'));
    },
    
    onPlayClick: function(button, event, options){
        var view = button.up('mapguardeventosview');
        var task = view.accountTask;
        Ext.TaskManager.start(task);
    },
    
    onStopClick: function(button, event, options){
        var view = button.up('mapguardeventosview');
        var task = view.accountTask;
        Ext.TaskManager.stop(task);
    },
    
    onCuentaTipoSelect: function(combo, records){
        var me = this;
        var value = combo.getValue();
        var gmappanel6 = combo.up('mapguardeventosview').down('#googlemap');
        gmappanel6.cuentaList = [];
        
        var view = combo.up('mapguardeventosview');
        
        switch (value){
            case "0":
                var filters = [
                    {
                        property: 'georeferenciada',
                        value   : '1'
                    }
                ];
                view.down('#comboCuentas').setDisabled(true);
                var store =Ext.create('Ext.data.Store',{
                    model: this.getCuentaSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: filters
                })
        
                store.load({
                    callback: function(records, operation, success){
                        gmappanel6.cuentaList = records;
                        //gmappanel6.fireEvent('markersChange',gmappanel6,gmappanel6.vehicleList);
                        me.showMarkerArray(gmappanel6,me);
                        view.down('#comboCuentas').setDisabled(false);
                    }
                });
            break;
            
            case "1":
                var filters = [
                    /*{
                        property: 'georeferenciada',
                        value   : '1'
                    }*/
                ];
                view.down('#comboCuentas').setDisabled(true);
                var store =Ext.create('Ext.data.Store',{
                    model: this.getMPCuentasEnAlarmaModelModel(),
                    pageSize: 500,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: filters
                })
                
                store.load({
                    callback: function(records, operation, success){
                        gmappanel6.cuentaList = records;
                        gmappanel6.fireEvent('markersChange',gmappanel6,gmappanel6.vehicleList);
                        //me.showMarkerArray(gmappanel6,me);
                        view.down('#comboCuentas').setDisabled(false);
                    }
                });
                
            break;
            
            case "2":
                var filters = [
                    {
                        property: 'tmp_nestado',
                        value   : '3'
                    }
                ];
                view.down('#comboCuentas').setDisabled(true);
                var store =Ext.create('Ext.data.Store',{
                    model: this.getMapguardModelModel(),
                    pageSize: 500,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: filters
                })
        
                store.load({callback: function(records, operation, success){
                    gmappanel6.cuentaList = records;
                    gmappanel6.fireEvent('markersChange',gmappanel6,gmappanel6.vehicleList);
                    //me.showMarkerArray(gmappanel6,me);
                    view.down('#comboCuentas').setDisabled(false);
                }});
            break;
            
            case "3":
                gmappanel6.fireEvent('markersChange',gmappanel6,gmappanel6.vehicleList);
                //me.showMarkerArray(gmappanel6,me);
                return true;
            break;
            
            case "4":
                
                view.down('#comboCuentas').setDisabled(true);
                var store =Ext.create('Ext.data.Store',{
                    model: this.getMP_CuentasGeoreferenciadasSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true
                })
        
                store.load({callback: function(records, operation, success){
                    view.down('#center').toggle(false);
                    view.down('#manual').toggle(true);
                    gmappanel6.getMap().setZoom(2)
                    
                    gmappanel6.cuentaList = records;
                    gmappanel6.fireEvent('markersChange',gmappanel6,gmappanel6.vehicleList);
                    //me.showMarkerArray(gmappanel6,me);
                    view.down('#comboCuentas').setDisabled(false);
                }});
            break;
        }
        
        // sta_cultimaalarma != '   '
        
    },
    
    onTipoSelect: function(combo, records, auto){
        var view = combo.up('mapguardeventosview');
        var grid = view.down('mapguardgridview');
        var gmappanel6 = view.down('#googlemap');
        var store = view.vehicleStore;
        var controller = this;
        
        var estado = view.down('#comboEstado');
        //var tipo = records[0].get('field1');
        var tipo = combo.getValue();
        
        if (tipo == ''){
            estado.show();
        } else {
            estado.hide();
        }
        
        if (tipo =='void'){
            gmappanel6.fireEvent('markersChange',gmappanel6,[]);
        } else{
            store.filter({id: 'cService',property: "cService", value: tipo});
            
            store.load({callback: function(records){
                gmappanel6.fireEvent('markersChange',gmappanel6,records, auto);
            }});
        }
        
        
    },
    
    onEstadoSelect: function(combo, records){
        var view = combo.up('mapguardeventosview');
        var grid = view.down('mapguardgridview');
        var gmappanel6 = view.down('#googlemap');
        var store = this.getMapguardVehicleStoreStore();
        
        store.filter({id: 'tmp_nestado',property: "tmp_nestado", value: records[0].get('field1')});
    },
    
    onSearchAllClick: function(button, event, options){
        var view = button.up('mapguardeventosview');
        var gmappanel6 = view.down('#googlemap');
        var store = this.getMapguardVehicleStoreStore();
        
        store.filters.clear();
        store.filter(view.vehicleFilters );
        store.load({
            callback: function(records, operation, success){
                gmappanel6.fireEvent('markersChange',gmappanel6,records);
                view.down('#comboTipo').clearValue();
                view.down('#comboEstado').clearValue();
            }
        });
    },
    
    onAddressClick: function(button){
        var form = button.up('form');
        var gmappanel6 = button.up('mapguardeventosview').down('gmappanel6')
        var address = form.down('#address').getValue();
        var infoHtml = "<strong>"+getLocale('Direccion:')+"<strong>"+" "+address;
        
        newmarker = {
            infoWindow: {
                content: infoHtml, 
                listener:'mouseover',
                disableAutoPan: true
            },
            geoCodeAddr: address,
    		draggable : false
		};
        gmappanel6.addMarkers([newmarker]); 
    },
    
    calcRoute: function(options, scope) {
        var controller = this;
        var start = options.start;
        var end = options.end;
        var gmappanel6 = options.gmappanel6;
        var callback = options.callback;
        
        var directionsService = gmappanel6.directionsService;
        var directionsDisplay = gmappanel6.directionsDisplay;
        
        if (!directionsDisplay){
            directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            gmappanel6.directionsDisplay = directionsDisplay;
        } 
        
        directionsDisplay.setMap(gmappanel6.getMap());
        
        if (!directionsService){
            directionsService = new google.maps.DirectionsService();
            gmappanel6.directionsService = directionsService;
        }
        
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING,
            language:_UserData.metadata.language
        };
        
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                gmappanel6.route = result;
                directionsDisplay.setDirections(result);
                
            }
            //esto se armo el dia 23/03/2017 a pedido de rodrigo para que simpre se pueda asignar un vehiculo
            callback.call(scope, result)
        });
    },
    
    showCuentaWidget: function(record, gmappanel6){
        var view = gmappanel6.up('mapguardeventosview');
        var datapanel = view.down('#datapanel');
        
        var tab = datapanel.down('mapguardcuentaview');
        
        if (tab){
            datapanel.setActiveTab(tab);
            tab.setRecord(record);
        }else {
            var roview = Ext.widget('mapguardcuentaview',{
                title: getLocale('Cuenta'),
                closable: false,
                record: record
            });
            datapanel.add(roview);
            datapanel.setActiveTab(roview);
            //console.log('creo el datapanel');
        }
        
    },
    
    
    showNewMovilWidget: function(record, gmappanel6){
        var view = gmappanel6.up('mapguardeventosview');
        var datapanel = view.down('#datapanel');
        
        var tab = datapanel.down('mapguardmovilview');
        
        if (tab){
            datapanel.setActiveTab(tab);
            tab.setRecord(record);
        }else {
            var roview = Ext.widget('mapguardnewmovilview',{
                title: 'NEW Móvil seleccionado',
                closable: false,
                gmappanel6: gmappanel6,
                record: record,
                rec_iid : view.rec_iid,
                operadorId: view.operadorId,
                recordAsignacion:view.recordAsignacion
            });
            datapanel.add(roview);
            datapanel.setActiveTab(roview);
        }
        
    },
    
    
    
    
    showMovilWidget: function(record, gmappanel6){
        var view = gmappanel6.up('mapguardeventosview');
        var datapanel = view.down('#datapanel');
        
        var tab = datapanel.down('mapguardnewmovilview');
        if(tab) {
            tab.close()
        }
       
            var roview = Ext.widget('mapguardnewmovilview',{
                title: 'Móvil seleccionado',
                closable: false,
                gmappanel6: gmappanel6,
                record: record,
                rec_iid : view.rec_iid,
                operadorId: view.operadorId,
                recordAsignacion:view.recordAsignacion
            });
            datapanel.add(roview);
            datapanel.setActiveTab(roview);
            
            if(!view.record.get('rec_iid') && (view.recordAsignacion && view.recordAsignacion.get('amv_idkey') != '') ) {
            
                view.down('#instrucciones').hide()
                view.down('#direccion').hide()
                view.down('#_cestado').hide()
                view.down('#infoevento').hide()
                view.down('mapguardnewmovilview').down('toolbar').hide()
                
                
            }
        
        
    }
});