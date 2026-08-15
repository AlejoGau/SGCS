//MIGRADO2024
Ext.define('Common.controller.GeneradorEventoFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_gpsSearchModel', 'SoftguardUsuarioModel', 'ZonaSearchModel', 'GeocercaSearchModel' ],
    views : [ 'GeneradorEventoFormView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
            'generareventoformview' : {
                beforerender : this.initview,
                cuentachanged: this.onCuentaChanged,
                selectedEvents: this.eventsSelected
			},           
            'generareventoformview button[action=save]': {
                click: this.onSaveClick
            },
            'generareventoformview #cuenta': {
                click: this.onCuentaClick
            },
            'generareventoformview #evento': {
                click: this.onEventoClick
            },
            'generareventoformview #googlemap' : {
    			mapready : this.onMapReady
			},
            'generareventoformview #btnAddress' : {
                click : this.onAddressClick
            }
		});
	}, // cierro init
    
    
    onAddressClick: function(button){
        var form = button.up('form');
        var gmappanel6 = button.up('generareventoformview').down('gmappanel6')
        var view = button.up('generareventoformview')
        var address = form.down('#address').getValue();
        var infoHtml = "<strong>"+getLocale('Direccion:')+"<strong>"+" "+address;
        
        view.marker.setMap(null);
        
       /* newmarker = {
            infoWindow: {
                content: infoHtml, 
                listener:'mouseover',
                disableAutoPan: true
            },
            geoCodeAddr: address,  
            draggable : true
		};
         view.marker = gmappanel6.addMarker([newmarker]); 
         var lat = view.marker.getPosition().lat();
         var long = view.marker.getPosition().lng();
         
            view.down('#lat').setValue(lat)
            view.down('#long').setValue(long)
        var position = new google.maps.LatLng(lat,long)
        gmappanel6.getMap().setCenter(position);*/
        
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            gmappanel6.getMap().setCenter(results[0].geometry.location);
            view.marker = new google.maps.Marker({
                map: gmappanel6.getMap(),
                position: results[0].geometry.location,
                draggable : true
            });
            
            view.marker.addListener('dragend', function (e) {
                var latlng = e.latLng;
        		//var field = myForm.findField('cue_cLatLng'), 
                var lat = latlng.lat();
                var long = latlng.lng();
                
                view.down('#lat').setValue(lat)
                view.down('#long').setValue(long)
            });
            
            var lat = view.marker.getPosition().lat();
           var long = view.marker.getPosition().lng();
         
            view.down('#lat').setValue(lat)
            view.down('#long').setValue(long)
            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
    },
    onMapReady: function(gmappanel6){
        
        var view = gmappanel6.up('generareventoformview')
        var lat = view.down('#lat').getValue()
        var long = view.down('#long').getValue()
        var markerConf = {
            lat : lat,
            lng : long,         
            draggable : true
        };
        
        var position = new google.maps.LatLng(lat,long)
        
        view.marker = gmappanel6.addMarker(position, markerConf, true);        
        view.marker.addListener('dragend', function (e) {
            var latlng = e.latLng;
			//var field = myForm.findField('cue_cLatLng'), 
            var lat = latlng.lat();
            var long = latlng.lng();
            
            view.down('#lat').setValue(lat)
            view.down('#long').setValue(long)
        });
        
        gmappanel6.getMap().setZoom(16)
        gmappanel6.getMap().setCenter(position);

        
    },
    
	initview : function(view) {
        view.down('#fecha').setValue(new Date())        
        view.down('#hora').setValue(new Date())  
        
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMultimonitor = storeSecurity.findRecord('KeyReference', 'WebRemoto')
        if(recordMultimonitor && recordMultimonitor.get('Available') == true) {  
            var _security = recordMultimonitor.get('_Security');
            if(_security &&  _security.hasOwnProperty('sineventosdeposicion') && _security.sineventosdeposicion == 'true') {
                
                //view.cordenadasHide = true
                view.down('#cordenandas').hide();
            }
        }
	},
    
    onCuentaClick: function (btn) {
        var view = btn.up('generareventoformview')
        var filterTipo = '';
        var filterTipoNOT = '';
        var sinVehiculo = '';
        var soloVehiculo = '';
        
        if(this.application._nameModule == 'Administrator') {
            sinVehiculo = false
        } else if(this.application._nameModule == 'TrackGuard') {
            soloVehiculo = true
        }
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
        	title : 'Seleccione una Cuenta',
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
                    filterTipo: filterTipo,
                    filterTipoNOT: filterTipoNOT,
                    selectionEvent:'cuentachanged',
                    soloVehiculo: soloVehiculo,
                    sinVehiculo: sinVehiculo,
                    caller: view
                }
            ]
		});
		win.show();
    },
    onCuentaChanged: function(cuenta, view){
        var gridview = view.up('generareventoformview');
        var cuentaId = cuenta.get('Id');
        
        view.down('#idcuenta').setValue(cuenta.get('Id'))  
        view.down('#nombrecuenta').setValue(cuenta.get('cue_cnombre'))  
        //populo combo usuarios
        var comboUsuario = view.down('#usuario');
        comboUsuario.setDisabled(false)
        var storeUsuario =Ext.create('Ext.data.Store',{
            model: this.getSoftguardUsuarioModelModel()
        });
        
        comboUsuario.bindStore(storeUsuario)        
        storeUsuario.load({ObjectId:cuentaId,view:view,store:storeUsuario,callback: function() {
            
        }});
        
        //populo combo zona
        var comboZona = view.down('#zona');
        var comboGeocercas = view.down('#geocercas');
        var cordenadas = view.down('#cordenandas');
        var comboRutas = view.down('#rutas');
        
        comboZona.setDisabled(false);
        comboGeocercas.hide();
        //cordenadas.hide();
        comboRutas.hide();
        
        comboZona.setValue('');
        comboGeocercas.setValue('');
        view.down('#lat').setValue('');
        view.down('#long').setValue('');
        comboRutas.setValue('');
        
        var storeZona =Ext.create('Ext.data.Store',{
            model: this.getZonaSearchModelModel(),
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
                    property: 'zon_ccodigo:NOT',
                    value: '0'
                },{
                    property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                    value: ''
                },{
                    property: 'zon_iidcuenta',
                    value:cuentaId
                }
            ]
        });
        
        comboZona.bindStore(storeZona);
        storeZona.load();
        //verifico el tipo de cuenta que es
        /*
                0-Otros
                1-Vehiculo
                2-Persona
                3-Mascota
                4-Patrulla
        */
       /*
        if(cuenta.get('tip_nTipo') == 5 || cuenta.get('tip_nTipo') == 4 || cuenta.get('tip_nTipo') == 1) {
            if(!view.cordenadasHide) {
                cordenadas.show();
            }
        }
            */
        
        if(cuenta.get('tip_nTipo') == 1) {
             
             comboGeocercas.show();
             var storeGeocercas =Ext.create('Ext.data.Store',{
                model: this.getGeocercaSearchModelModel(),
                remoteFilter: true,
                filters: [
                    {
                        property: 'Cuenta',
                        value   : cuentaId
                    }
                ]
            });
            comboGeocercas.bindStore(storeGeocercas)
            storeGeocercas.load();
        }
        
        if(cuenta.get('tip_nTipo') == 5) {
             comboRutas.show();
             var storeRutas =Ext.create('Ext.data.Store',{
                model: this.getGeocercaSearchModelModel(),
                remoteFilter: true,
                filters: [
                    {
                        property: 'Cuenta',
                        value   : cuentaId
                    },{
                        property: 'MetaData:LIKE',
                        value   : 'polyline'
                    }
                ]
            });
            comboRutas.bindStore(storeRutas)
            storeRutas.load();
        }
        var storeGPS =Ext.create('Ext.data.Store',{
                model: this.getP_gpsSearchModelModel(),
                remoteFilter: true,                
                pageSize: 1,
                filters: [
                        {
                            property: 'gps_idCuenta',
                            value   : cuentaId
                        }
                    ],
                remoteSort: true,
                sorters:{
                    property: 'gps_iid',
                    direction: 'DESC'
                },
            });
            view.mask=Ext.create('Ext.LoadMask', view.down('#cordenandas'), {
                msg: getLocale("Cargando ultima posicion.")
            }).show();
            storeGPS.load({callback:function (records) {
                if(records.length>0) {
                    var record = records[0];
                    
                    var lat = record.get('gps_rLatitud')
                    var long = record.get('gps_rLongitud')
                    
                    view.down('#lat').setValue(lat)
                    view.down('#long').setValue(long)                    
                    
                    /*var position = new google.maps.LatLng(lat,long)
                    view.down('#googlemap').getMap().setCenter(position);
                    */
                
                var lat = view.down('#lat').getValue()
                var long = view.down('#long').getValue()
                var markerConf = {
                    lat : lat,
                    lng : long,         
                    draggable : true
                };
                
                var position = new google.maps.LatLng(lat,long)
                var gmappanel6 = view.down('#googlemap');
                view.marker = gmappanel6.addMarker(position, markerConf, true);        

                
                gmappanel6.getMap().setZoom(16)
                gmappanel6.getMap().setCenter(position);                   
                    
                    gmappanel6.getMap().setZoom(16)
                    gmappanel6.getMap().setCenter(position);                   
                  
                }
                
                view.mask.hide()
            }});
    },
    
    
    onEventoClick: function (btn) {
        var view = btn.up('generareventoformview');
         var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                eventSelected: view.eventosSeleccionados,
                caller: view,
                filter: [{property:'cod_nManual', id:'cod_nManual',value:1}],
                simpleSelect: true,
                closeAction: 'destroy'
            }],
            layout: 'fit'
        }).show();
        myWindow.on('selectedEvents',function () {
         console.log(arguments)
        })
    },
    
    eventsSelected: function(record, view) {
        view.down('#nota').hide()
        view.down('#nota').setValue('')
        view.typeAlarm = '';
        
        var cod = record.get('cod_ccodigo');        
        //si es un SMARTPANIC
        if(cod >= 'S51' && cod <= 'S69') {
            view.down('#nota').show()
            view.typeAlarm = 'SmartPanics';
        }
        //si es un VIGICONTROLL
        if((cod >= 'V01' && cod <= 'V16') || cod =='V69') {
            view.down('#nota').show()
            view.typeAlarm = 'VigiControl';
        }
        
        view.down('#nombreevento').setValue(record.get('Descripcion'))
        view.down('#codevento').setValue(record.get('cod_ccodigo'))
    },    
    onSaveClick : function(button, event, options) {
        var view = button.up('generareventoformview');
    	var myform = view.getForm();
        var win =  button.up('window');
        var cuenta = view.cuenta;
        var controller = this;
        var params = {};
        var idcuenta = view.down('#idcuenta').getValue();
        var evento = view.down('#codevento').getValue();
        var geocerca = view.down('#geocercas').getValue()
        var geocerca = view.down('#geocercas').getValue()
        var geocerca = view.down('#geocercas').getValue()
        var geocerca = view.down('#geocercas').getValue()
        var zona = view.down('#zona').getValue()
        var usuario = view.down('#usuario').getValue()
        var lat = view.down('#lat').getValue()
        var long = view.down('#long').getValue()
        var fecha = view.down('#fecha').getValue()
        var hora = view.down('#hora').getValue()
        var nota = view.down('#nota').getValue()
        
        //usuario
        
        if(idcuenta) {
            params.idCta = idcuenta
        } else {
            notify('Debe selecionar una cuenta')
            return false;
        }
        
        if(evento) {
            params.cAlarma = evento
        } else {
            notify('Debe selecionar un evento')
            return false;
        }
        
        if(geocerca) {
            params.cGeofenceName = geocerca
        }
        
        if(lat && view.sineventosdeposicion != 'true') {
            params.lat = lat
        }
        
        if(long && view.sineventosdeposicion != 'true') {
            params.lng = long
        }
        
        if(usuario) {
            params.idUsuario = usuario
        }
        
        if(zona) {
            params.cZona = zona
        }
        
        if(fecha) {
            params.fecha = new Date(Ext.Date.format(new Date(fecha), 'Y/m/d')+' '+Ext.Date.format(new Date(hora), 'H:i:s'))
        }
        
        var dt = new Date();
        //params.cObservaciones = '['+Ext.Date.format(dt, 'd/m/Y G:i:s')+'] ';//[29/01/2016 15:07:00] [Admin] Evento Generado Por Operador
        params.cUser = _UserData.UserId;
        
        
        if(nota != '') {
            params.cObservaciones = nota;
            params.cUser = view.typeAlarm;
        } else {
            params.cObservaciones = getLocale('Evento Generado Por Operador');    
        }
        params.rec_norigen = 3;
        
        Ext.Ajax.request({
            url: '/rest/search/AlarmaGenerar',
            method: 'GET',
            params: params,
            success: function(resp,operation) {
            notify('El evento se generó con éxito');
            win.close()
            
            }
        });
	}
});