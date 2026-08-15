Ext.define('SmartTrack.controller.VCSeguimientoRutaGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesSearchModel', 'RoutesPointsSearchModel' ],
    views : [ 'VCSeguimientoRutaGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'vcseguimientorutagridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                mostrarRonda: this.onMostrarRonda,
			}
		});
	},

    onMostrarRonda: function (record,view) {
        this.onItemClick(view,record)
    },
    onItemClick: function(grid,record,item,index,e,options){
        var controller = this;
        var view = grid.up('vcseguimientorutagridview')?grid.up('vcseguimientorutagridview'):grid;
        

        //cargo lo checkpoints de la ruta 

        view.filters = [
                {
                    property: 'routeId',
                    value: record.get('Id')
                }
            ];
            view.sorters = [
                    {
                        property : 'time',
                        direction: 'ASC'
                    }
                ];
        view.store =Ext.create('Ext.data.Store',{
                model: this.getRoutesPointsSearchModelModel(),
                pageSize: 999,
                remoteSort: true,
                remoteFilter: true,
                filters: view.filters,
                sorters: view.sorters
            })
           
             
        view.store.load({callback:function (records) {
                if(records.length>0) {
                    //Intialize the Path Array
                    var path = new google.maps.MVCArray();
                    if(view.poly) {
                        view.poly.setMap(null);
                    }
                    view.poly = new google.maps.Polyline({ map: view.gmappanel.getMap(), strokeColor: '#4986E7' });
                    
                    Ext.Array.each(view.makers, function (r) {
                        r.setMap(null)
                    })
                    view.makers = []
                    view.store.each(function (record){

                            console.log(record)
                            var latLong = new google.maps.LatLng(record.get('chp_rLatitud'), record.get('chp_rLongitud'))
                            path.push(latLong);
                            view.poly.setPath(path);
                            
                            
                           /* switch(record.get('chp_nTipo')) {
                                case 0:
                                    iconUrl = '/resources/global/images/icons/qrcode16.png';
                                    break;
                                case 1:
                                    iconUrl = '/resources/global/images/icons/transmit_blue.png';
                                    break;
                                case 2:
                                    iconUrl = '/resources/global/images/icons/ipod_cast.png';
                                    break;
                                case 3:
                                    iconUrl = '/resources/softguard/images/icons/icon-nfc.png';
                                    break;
                                case 3:
                                    iconUrl = '/resources/global/images/icons/tag_purple.png';
                                    break;
                                default:
                                    iconUrl = '';
                                break;
                            }*/
                                
                                
                             var image = new google.maps.MarkerImage(
                                '/resources/softguard/images/trackguard-0.png',
                                new google.maps.Size(48,48),
                                new google.maps.Point(0,0),
                                new google.maps.Point(16, 35)
                            );

                            view.makers.push(new google.maps.Marker({
                                position: latLong,
                                map: view.gmappanel.getMap(),
                                title: record.get('zon_cdescripcion'),
                                visible: true,
                                icon:image
                            }))

                    })
                    var latLong = new google.maps.LatLng(records[0].get('chp_rLatitud'), records[0].get('chp_rLongitud'))
                    path.push(latLong);
                    view.poly.setPath(path);
                    
                    //libero el centrado automatico
                    view.centerBtn.toggle(false)
                    
                    var bounds = controller.getBounds(view.makers);
                    view.gmappanel.getMap().fitBounds(bounds);
                    

                } else {
                    notify('No se encontraron puntos para esta ronda')
                }
                


        }});
        
    },  
    
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
                bounds.extend(marker.position);
        });
        return bounds
    },

	initView : function(view) {
      var controller = this;
    
        if (view.record){

            view.store =Ext.create('Ext.data.Store',{
                model: this.getRoutesSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                        property:'cuentaId',
                        value:view.record.get('cue_iid')
                    }]
            })
            view.bindStore(view.store);           
            
            view.store.load();

            

        }
       
	},



});