Ext.define('SmartTrack.controller.VCSeguimientoInfoObjetivoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'VCSeguimientoInfoObjetivoView' ],

    init : function(config) {
        // genero los eventos
    	this.control({
            'vcseguimientoinfoobjectivoview' : {
                beforerender : this.initview
			}
            
		});
	},     
    initview: function(view){
        
        if(view.record) {
            var nombreCuenta = view.record.get('cue_clinea')+'-'+view.record.get('cue_ncuenta')+' '+view.record.get('cue_cnombre')
            view.down('#cuenta').setValue(nombreCuenta)
            
            view.down('#direccion').setValue(view.record.address)
            
            view.down('#fecha').setValue(Ext.Date.format(new Date(view.record.get('gps_tfechahora')), 'd/m/Y H:i'))
            
            
            var timeDiff = Math.abs(new Date().getTime() - new Date(view.record.get('gps_tfechahora')).getTime());
            var diffminutes = Math.ceil(timeDiff / 1000 ); 
            
            if(diffminutes < 60) {
                view.down('#ultimaposicion').setValue(getLocale('Ultima posicion > ')+ diffminutes +' '+getLocale('minutos'))
            } else {
                view.down('#ultimaposicion').setValue(getLocale('Ultima posicion ')+ ' '+Ext.Date.format(new Date(view.record.get('gps_tfechahora')), 'd/m/Y H:i'))
            }
            
            //planto maker de la cuenta
            view.gmappanel.on('mapready', function () {
            iconUrl = '/resources/softguard/images/trackguard-2.png';     
            var config = {}        
            if(view.record.get('Config')) {
                config = Ext.decode(view.record.get('Config'))  
                if(config.Icono) {
                    iconUrl = config.Icono
                }
            }
        
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(48,48),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,35)
                );
                var latLong = new google.maps.LatLng(view.record.get('sp_rLatitud'), view.record.get('sp_rLongitud'))
                new google.maps.Marker({
                            position: latLong,
                            map: view.gmappanel.getMap(),
                            title: view.record.get('cue_clinea')+' '+view.record.get('cue_ncuenta'),
                            visible: true,
                            icon: image
                        })
                view.gmappanel.getMap().setCenter(latLong);
            })
        }
       
    }
})