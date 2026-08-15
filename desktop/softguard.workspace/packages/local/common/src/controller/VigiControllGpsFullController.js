//MIGRADO2024
/**
 * TODO: este controller tiene 3 entradas de record, aun no lo trabaje para no perde compatibilidad con otros modulos
 */
Ext.define('Common.controller.VigiControllGpsFullController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesPointsSearchModel', 'RoutesSearchModel' ],
    views : [ 'VigiControllGpsFullView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
            'vigicontrollgpsfullview' : {
                beforerender : this.initview,
                selected: this.onSelected,
                selectedcheckpoints: this.onSelectedCheckpoints
			},
            'vigicontrollgpsfullview gmappanel6' : {
    			mapready : this.onMapReady,
                beforerender : this.prepareMap
			}
		});
	}, // cierro init
    
    initview: function(view){
         var controller = this;
         if (view.record){
            view.CuentaId = view.record.get('cue_iid')
         }
        
         view.markersRecords = []
         
         var gmappanel6 = view.down('gmappanel6')
       
         
    },
    
     getMarkerInfoWindowHtmlSmartTrack: function(marker, pos){
           
         var html = '\
            <div style="width:280px;">\
            <table>\
            <tr>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="'+marker.icon+'" style="float:left; margin:0 5px 0 0"/>\
                </td>\
                <td  style="padding:5px 0 0 5px; font-size:13px; ">\
                    <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
             <tr>\
                <td colspan="2" style="padding:5px; font-size:13px;">\
                   <hr />\
                </td>\
            </tr>\
            ';
       
         html += '\
        <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbltelefono}:</span><span> {telefono}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblusuario}:</span><span> {usuario}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneSO}:</span><span> {phoneSO}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneModel}:</span><span> {phoneModel}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneBrand}:</span><span> {phoneBrand}</span><br/>\
                        </td>\
                    </tr>';
                    
        html += '</table>';
        
        console.log(marker)
        
        html = html.replace(/\{nombre\}/, marker.get('cue_clinea')+'-'+marker.get('cue_ncuenta')+'<br> '+marker.get('cue_cnombre'));
        html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'));
        html = html.replace(/\{telefono\}/, marker.get('Telefono'));
        html = html.replace(/\{phoneSO\}/, marker.get('Tipo'));
        html = html.replace(/\{usuario\}/, marker.get('Nombre'));
        html = html.replace(/\{phoneBrand\}/, marker.get('Marca'));
        html = html.replace(/\{phoneModel\}/, marker.get('Modelo'));
      
      
        
        
        html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'));
        html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'));
        html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'));
        html = html.replace(/\{lblusuario\}/, getLocale('Usuario'));
        html = html.replace(/\{lblphoneSO\}/, getLocale('S.O.'));
        html = html.replace(/\{lblphoneModel\}/, getLocale('Modelo'));
        html = html.replace(/\{lblphoneBrand\}/, getLocale('Marca'));
        
        
        return html;
        
    },
    getSmartTrackIcon: function(cuenta, gmappanel6){
   
        view = gmappanel6.up('vigicontrollgpsfullview');
        if(view.extraInfo && view.extraInfo.icon) {
            var iconUrl = view.extraInfo.icon;
        } else {
            var iconUrl = '/resources/softguard/images/mapguard-cservice/vc.png';    
        }
        
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
        
        if(record.get('gps_rLatitud') && record.get('gps_rLongitud') != '') {
            arrayLatLng[0] = record.get('gps_rLatitud') ;
            arrayLatLng[1] = record.get('gps_rLongitud');
            
        } else if(record.get('lat') && record.get('long') != '') {
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
        view = gmappanel6.up('vigicontrollgpsfullview');
       
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
         
        Ext.Array.each(records, function (r,i) {
            controller.showRoute(r.get('Id'), view); 
        }) 
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
        var view= gmappanel6.up('vigicontrollgpsfullview');
        var record = view.smarttrack?view.smartrack:view.record;
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
         var pos = controller.getCuentaPosition(cuenta, gmappanel6);
         if(view.extraInfo && view.extraInfo.icon) {
            view.smartrack.icon = view.extraInfo.icon
         }
         var infoHtml = controller.getMarkerInfoWindowHtmlSmartTrack(view.smartrack,pos);
         
         var markerConf = {
            position: pos.position,
            lat : pos.lat,
            lng : pos.long,
            record: cuenta,
            labelContent: '<span>'+cuenta.get('cue_clinea')+'-'+cuenta.get('cue_ncuenta')+'</span>',
            labelAnchor: new google.maps.Point(40, 0),
            labelClass: "gmaplabel2", // the CSS class for the label
            labelStyle: {opacity: 0.75},
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
        
        
        gmappanel6.addMarker(pos.position, markerConf, true);
        
        cuenta.marker.setMap(gmappanel6.getMap());
        
        gmappanel6.getMap().setZoom(16)
        gmappanel6.getMap().setCenter(pos.position);
        
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
                
        var iconUrl = '/resources/softguard/images/trackguard-0.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(16,35)
        );
        
        return image;
    }  
});