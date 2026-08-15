Ext.define('SgAppMapGuardWeb.controller.ServTecGpsFullController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'MapguardModel' ],
    views : [ 'ServTecGpsFullView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'servteccontrollgpsfullview' : {
                afterrender : this.initview,
                selected: this.onSelected,
                selectedcheckpoints: this.onSelectedCheckpoints,
                destroy: this.onDestroy
			},
            'servteccontrollgpsfullview gmappanel6' : {
    			mapready : this.onMapReady,
                beforerender : this.prepareMap
			}
		});
	}, // cierro init
    
    onDestroy: function (view) {
        
        Ext.TaskManager.stop(view.task);
    },
    
    initview: function(view){
         var controller = this;
         if (view.record){
            view.CuentaId = view.record.get('cue_iid')
         }
        
         view.markersRecords = []
         
         var gmappanel6 = view.down('gmappanel6')
       
     
    },
    
    
    showMovilWidget: function(record, gmappanel6){
       /* var view = gmappanel6.up('servteccontrollgpsfullview');
        var datapanel = view.down('#datapanel');
        
        var tab = datapanel.down('mapguardnewmovilview');
        if(tab) {
            tab.close()
        }
       
           
            
            if(!view.record.get('rec_iid') && (view.recordAsignacion && view.recordAsignacion.get('amv_idkey') != '') ) {
            
                view.down('#instrucciones').hide()
                view.down('#direccion').hide()
                view.down('#_cestado').hide()
                view.down('#infoevento').hide()
                view.down('mapguardnewmovilview').down('toolbar').hide()
                
                
            }
        */
        
    },
    
     getMarkerInfoWindowHtmlSmartTrack: function(marker, pos){
           
         var html = '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="/resources/softguard/images/poi/taller.png" style="float:left; margin:0 5px 0 0"/> <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
            ';


        if(marker.get('asi_clinea')) {
            html += '\
                <tr>\
                    <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <div style="float:left; width:200px"><span style="font-weight:bold;">{lblnombreAsignada}:</span><span> {nombreAsignada}</span></div>\
                    </td>\
                </tr>\
                ';
        }




       
        html += '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblestado}:</span><span> {estado}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblflota}:</span><span> {flota}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbltelefono}:</span><span> {telefono}</span><br/>\
                        </td>\
                    </tr>\
                    ';
                    
        html += '</table></div>';
        
     
        
        html = html.replace(/\{nombre\}/, marker.get('cue_clinea')+'-'+marker.get('cue_ncuenta')+'<br> '+marker.get('cue_cnombre'));
        html = html.replace(/\{nombreAsignada\}/, marker.get('asi_clinea')+'-'+marker.get('asi_ncuenta')+'<br> '+marker.get('asi_cnombre'));
        html = html.replace(/\{estado\}/, marker.get('_cestado'));
        html = html.replace(/\{telefono\}/, marker.get('cue_ctelefono'));
        html = html.replace(/\{flota\}/, marker.get('cflota'));
        html = html.replace(/\{lblnombreAsignada\}/, getLocale('Cuenta asignada'));
        html = html.replace(/\{lblestado\}/, getLocale('Estado'));
        html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'));
        html = html.replace(/\{lblusuario\}/, getLocale('Usuario'));
        html = html.replace(/\{lblflota\}/, getLocale('flota'));
        
        
        return html;
        
    },
    getSmartTrackIcon: function(cuenta, gmappanel6){
   
        iconUrl = '/resources/softguard/images/poi/taller.png';
        
        
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(15,35)
        );
        
        return image;
    },
    
    getCuentaPosition: function(record, gmappanel6){
        var arrayLatLng = [] ;
        
        if(record.get('lat') && record.get('long') != '') {
            arrayLatLng[0] = record.get('lat') ;
            arrayLatLng[1] = record.get('long');
            
        } else if (record.get('sp_rlongitud') && record.get('sp_rlongitud') != '') {
            arrayLatLng[0] = record.get('sp_rlatitud') ;
            arrayLatLng[1] = record.get('sp_rlongitud');
            
        } else if(record.get('cue_cLatLng')) {
            var myLatLng = record.get('cue_cLatLng');
            var arrayLatLng = myLatLng.split(',');
        } else if (record.get('cue_clatlng')){
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
    
    prepareMap: function(gmappanel6){
        view = gmappanel6.up('servteccontrollgpsfullview');
       
        if (view.record){
            view.eventId = view.record.get('routeId');
        }
        
    },
    
    onSelected: function (records, view) {
        var controller= this;
        
        //limpio ruta
        Ext.Array.each(view.down('gmappanel6').cache.polyline,function (r) {
            r.setMap(null);
        })
        //limpio markers
        Ext.Array.each(view.markersRecords,function(checkpoint){
            if (checkpoint.marker){
                checkpoint.marker.setMap(null);
                checkpoint.marker = null;
            }
            
        });
         
         
        view.markersRecords = [];
         
      /*  Ext.Array.each(records, function (r,i) {
            controller.showRoute(r.get('Id'), view); 
        }) */
    },

    onSelectedCheckpoints: function (records, view) {
        
        
        var controller= this;
      
        //limpio markers
        Ext.Array.each(view.markersCheckpointRecords,function(checkpoint){
            if (checkpoint.marker){
                checkpoint.marker.setMap(null);
                checkpoint.marker = null;
            }
            
        });
         
         
        view.markersCheckpointRecords = [];
         
        Ext.Array.each(records, function (r,i) {
            controller.showMarker(r, view); 
        })
        
        
        
    },
   
    
    onMapReady: function(gmappanel6,googlemap){
        var view= gmappanel6.up('servteccontrollgpsfullview');
        var record = view.servTec?view.servTec:view.record;
        var controller= this;
        gmappanel6.record = record;
        //this.gmappanel6 = gmappanel6;

        var map = gmappanel6.getMap();
        
        if (UiApplicationMetadata.Kml){
            var kml = new google.maps.KmlLayer({
                url: UiApplicationMetadata.Kml
            });     
            kml.setMap(map);
        }
        
        
         var cuenta = view.record;
         var pos = controller.getCuentaPosition(view.servTec, gmappanel6);
         var infoHtml = controller.getMarkerInfoWindowHtmlSmartTrack(view.servTec,pos);
         
         var markerConf = {
            position: pos.position,
            lat : pos.lat,
            lng : pos.long,
            record: cuenta,
            labelContent: '<span>'+cuenta.get('cue_clinea')+'-'+cuenta.get('cue_ncuenta')+'</span>',
            labelAnchor: new google.maps.Point(40, 0),
            labelClass: "gmaplabel2", // the CSS class for the label
            labelStyle: {opacity: 0.75},
            title : "Servtec: "+cuenta.get('cue_clinea')+"-"+cuenta.get('cue_ncuenta')+" "+cuenta.get('cue_cnombre'),
            icon: controller.getSmartTrackIcon(cuenta,gmappanel6),
            infoWindow: {
                content: infoHtml, 
                listener:'mouseover',
                disableAutoPan: true
            },
            draggable : false,
            record:cuenta
        };
        
        
        view.marker = gmappanel6.addMarker(pos.position, markerConf, true);
        
        cuenta.marker.setMap(gmappanel6.getMap());
        
        gmappanel6.getMap().setZoom(16)
        gmappanel6.getMap().setCenter(pos.position);
        
        
        
        view.task = Ext.TaskManager.start({
            args: [view, this],
            run: this.refreshPosition,
            interval: 5000
        });
        
      
        
    },
    
    refreshPosition : function (view,t) {
        
        
        if(view.isVisible()) {
            var store =Ext.create('Ext.data.Store',{
                model: t.getMapguardModelModel(),
                pageSize: 1000,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property:'tmp_idKey',
                    value:view.servTec.get('Id')
                }]
            })
    
            store.load({
                callback: function(records, operation, success){
                    if(records.length > 0) {
                        
                        var latlng = new google.maps.LatLng(records[0].get('gps_rlatitud'),records[0].get('gps_rlongitud'));
                        view.marker.setPosition(latlng);
                    }
                }
            });
        }

       
        
    },
    
    showRoutesByCuenta: function(view) {
        
        
         var controller = this;
         var routesStore =Ext.create('Ext.data.Store',{
                model: this.getRoutesSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property:'cuentaId',
                        value: view.CuentaId
                    }
                ]
            })
         
            
            routesStore.load({callback:function (records) {
                
                
                routesStore.each(function (r,i) {
                        controller.showRoute(r.get('Id'), view);                        
                
                }) 
            }});
    },
    
  
    getMarkerIcon: function(pos, view){
        
        
        var iconUrl = '/resources/softguard/images/trackguard-0.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(16,35)
        );
        
        return image;
    },
    
    
    
  
	prepareMap : function(googlemap) {
        /*Ext.apply(googlemap, {
			setCenter : {
				lat : mylat,
				lng : mylong
			}
		});*/
	},

    
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
                bounds.extend(marker.position);
        });
        return bounds
    },
    
    
    showMarker: function(record, view){
        var controller = this;    
            
        var clonado = Ext.clone(record)
        var marker = {
            marker: null,
            lat : record.get('chp_rLatitud'),
            lng : record.get('chp_rLongitud'),
            title : record.get('zon_cdescripcion'),
            icon: controller.getRouteMarkerIcon(),
            /*infoWindow: {
                content: controller.getRouteInfoWindowHtml(record, view), 
                listener:'click'
            },*/
            draggable : false,
            record: clonado
        }
           
           
        view.markersCheckpointRecords.push(clonado)
        var point = new google.maps.LatLng(record.get('chp_rLatitud'),record.get('chp_rLongitud'));
        // muestro los puntos
        view.down('gmappanel6').addMarker(point, marker);
        
        var bounds = controller.getBounds(view.down('gmappanel6').cache.marker);
        view.down('gmappanel6').getMap().fitBounds(bounds);

        return {points:point, marker:marker}
    },
    
    
    
    showRoute: function(routeId, view){
        var points = new Array();
        
        view.markers = new Array();
      //   view.markersRecords = new Array();
        var controller = this;
        
        var sorters = [
                {
                    property : 'time',
                    direction: 'ASC'
                }
            ];

        var store =Ext.create('Ext.data.Store',{
            model: controller.getRoutesPointsSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'routeId',
                value: routeId
            }],
            sorters: sorters
        })
        
        //busco los puntos de la ruta
        store.load({callback: function(records){
            Ext.Array.each(records,function(record, index, total){
            
                points.push({lat: record.get('chp_rLatitud'), lng: record.get('chp_rLongitud'),fecha: record.get('gps_isofechahora')});
                
                var clonado = Ext.clone(record)
                var marker = {
                        marker: null,
                        lat : record.get('chp_rLatitud'),
                        lng : record.get('chp_rLongitud'),
                        title : record.get('zon_cdescripcion'),
                        icon: controller.getRouteMarkerIcon(),
                        /*infoWindow: {
                            content: controller.getRouteInfoWindowHtml(record, view), 
                            listener:'click'
                        },*/
                        draggable : false,
                        record: clonado
                    }
                view.markersRecords.push(clonado)
                var point = new google.maps.LatLng(record.get('chp_rLatitud'),record.get('chp_rLongitud'));
                // muestro los puntos
                view.down('gmappanel6').addMarker(point, marker);
            })
              
            
           
            
            // dibujo la ruta
            view.down('gmappanel6').addPolyline(points);
            
            var bounds = controller.getBounds(view.down('gmappanel6').cache.marker);
            view.down('gmappanel6').getMap().fitBounds(bounds);
            
        }})

        
        
        return {points:points, markers:view.markers}
    },
    
    getRouteMarkerIcon: function(){
                
        var iconUrl = '/resources/softguard/images/poi/taller.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(16,35)
        );
        
        return image;
    }  
});