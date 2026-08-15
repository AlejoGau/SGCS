Ext.define('SgAppSerTec.controller.SerTecMapGpsController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'InstaladoresByTokenSearchModel', 't_provinciasSearchModel' ],
    views : [ 'SerTecMapGpsView' ],

    init : function(config) {
        this.control({
			'sertecmapgpsview gmappanel6' : {
				mapready : this.onMapReady,
                manualcenter : this.onManualCenter
			},
            'sertecmapgpsview button[action=enejecucion]' : {
                click : this.onFiltrarClick
        	},
            'sertecmapgpsview button[action=pendiente]' : {
                click : this.onFiltrarClick
            },
            'sertecmapgpsview button[action=todos]' : {
                click : this.onLimpiarFiltrosClick
            },
            'sertecmapgpsview button[action=search]' : {
                click: this.onSearchClick
            },
            'sertecmapgpsview button[action=center]' : {
                click: this.onCenterClick
            }
        })
    },
    
    onMapReady : function(gmappanel6) {
        var controller = this;
        var view = gmappanel6.up('sertecmapgpsview');
        var map = gmappanel6.getMap();
                
        // agrego el markerclustered
        gmappanel6.markerCluster = new MarkerClusterer(map,[],{gridSize:60});
        
        this.initView(view);        
        this.onCentrarMap(gmappanel6);
    },
        
    initView : function(view) {
        console.log('Se inicio el mapa');       
        var controller = this;
        var gmappanel6 = view.down('gmappanel6');
        var dateNow = new Date();
        
        /* cargo los datos de cuentas con Servicio Tecnico */
        var url = '/handler/SerTecGeoJson';
            url += '?token='+Ext.util.Cookies.get('OAuth_Token');
            url += "&_dc="+dateNow.getTime();
            //url += "&limit=50"; 

        /**
         * BC 394298024 : Debo iniciar el mapa con los ST Pendientes y En ejecucion
         */
            url += '&filter=[{"property":"stc_nestado:inint","value":"2,5"}]'
        
            
        gmappanel6.cuentasPosicion = new google.maps.Data();
        gmappanel6.cuentasPosicion.loadGeoJson(url, view.mask.show(), function (features) {
            view.mask.hide();
            controller.onCentrarMap(gmappanel6);
        });
        
        gmappanel6.cuentasPosicion.setMap(gmappanel6.getMap());
        
        gmappanel6.cuentasPosicion.setStyle(function(feature) {
            return {
                icon: feature.getProperty('icon')
            };
        });
        
        this.addClickMarkerEvent(gmappanel6);

        /* Cargo el combo de Instaladores */
        var tecnicoStore = Ext.create('Ext.data.Store',{
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
        })
        view.down('#tecnicoscombo').bindStore(tecnicoStore);     
        tecnicoStore.load();
        
        /* Cargo el combo de Provincias */
        var provinciaStore = Ext.create('Ext.data.Store',{
            model: this.getT_provinciasSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            sorters: [
                {
                    property : 'pro_cdescripcion',
                    direction: 'ASC'
                }
            ]
        })
           
       view.down('#provinciacombo').bindStore(provinciaStore);     
       provinciaStore.load();
      
    },
    
    onLimpiarFiltrosClick : function(button, e, eOpts) {
        var controller = this;
        var action = button.action;
        var view = button.up('sertecmapgpsview');
        
        /* limpio el estado de los botones */
        view.down('#enejecucion-btn').toggle(false);
        view.down('#pendiente-btn').toggle(false);
        
        /* Obtengo el mapa */
        var gmappanel6 = view.down('gmappanel6');
        var dateNow = new Date();
        /* cargo los datos de cuentas con Servicio Tecnico */
        var url = '/handler/SerTecGeoJson';
            url += '?token='+Ext.util.Cookies.get('OAuth_Token');
            url += "&_dc="+dateNow.getTime();
            //url += "&limit=50";

        /**
         * BC 394298024 : Debo iniciar el mapa con los ST Pendientes y En ejecucion
         */
            url += '&filter=[{"property":"stc_nestado:inint","value":"2,5"}]'

        view.down('#tecnicoscombo').setValue('');
        view.down('#tiposervicio').setValue('');
        view.down('#provinciacombo').setValue('');
        view.down('#localidad').setValue('');
        view.down('#nombre').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#dealer').setValue('');
        view.down('#observacion').setValue('');
        view.down('#dealercuenta').setValue('');

        //elimino los features
        gmappanel6.cuentasPosicion.forEach(function (feature) {
            gmappanel6.cuentasPosicion.remove(feature)
        })
        
        gmappanel6.cuentasPosicion = new google.maps.Data();
        gmappanel6.cuentasPosicion.loadGeoJson(url, view.mask.show(), function (features) {
            view.mask.hide();
            controller.onCentrarMap(gmappanel6);
        });
        gmappanel6.cuentasPosicion.setMap(gmappanel6.getMap()); 
        
        gmappanel6.cuentasPosicion.setStyle(function(feature) {
            return {
                icon: feature.getProperty('icon')
            };
        });
        
        controller.addClickMarkerEvent(gmappanel6);
    },
    
    onFiltrarClick : function(button, e, eOpts) {
        var controller = this;
        var action = button.action;
        var view = button.up('sertecmapgpsview');
        
        /* Obtengo el mapa */
        var gmappanel6 = view.down('gmappanel6');
        var dateNow = new Date();
        /* cargo los datos de cuentas con Servicio Tecnico */
        var url = '/handler/SerTecGeoJson';
            url += '?token='+Ext.util.Cookies.get('OAuth_Token');
            url += "&_dc="+dateNow.getTime();
            url += '&filter=[';
                    
        if (button.pressed) {
            /* Filtro en base al boton indicado */
            switch(action) {
                case "pendiente" :
                    if ( url.substr(url.length - 1) === '}' ) {
                        url += ',{"property":"stc_nestado:inint","value":"2"}';
                    } else {
                        url += '{"property":"stc_nestado:inint","value":"2"}';
                    }
                    view.down('#enejecucion-btn').toggle(false);
                    view.down('#todos-btn').toggle(false);
                    break;
                case "enejecucion" :
                    if ( url.substr(url.length - 1) === '}' ) {
                        url += ',{"property":"stc_nestado:inint","value":"5"}';
                    } else {
                        url += '{"property":"stc_nestado:inint","value":"5"}';
                    }
                    view.down('#pendiente-btn').toggle(false);
                    view.down('#todos-btn').toggle(false);
                    break;
            }
        } else {
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"stc_nestado:inint","value":"2,5"}';
            } else {
                url += '{"property":"stc_nestado:inint","value":"2,5"}';
            }            
        }

        controller.armarUrl(url, gmappanel6, view);
        controller.onCentrarMap(gmappanel6);
    },
    
    onSearchClick: function(button, e, eOpts) {
        var controller = this;
        var view = button.up('sertecmapgpsview');
        /* Obtengo el mapa */
        var gmappanel6 = view.down('gmappanel6');
        var dateNow = new Date();
        
        /* elimino los features */
        gmappanel6.cuentasPosicion.forEach(function (feature) {
            gmappanel6.cuentasPosicion.remove(feature)
        })

        /* limpio el estado de los botones */
        view.down('#todos-btn').toggle(false);

        
        /* cargo los datos de cuentas con Servicio Tecnico */
        var url = '/handler/SerTecGeoJson';
            url += '?token='+Ext.util.Cookies.get('OAuth_Token');
            url += "&_dc="+dateNow.getTime();
            url += '&filter=[';

        /**
         * BC 394298024 : Debo respetar el pressed de los botones los ST Pendientes y En ejecucion
         */
        if (view.down('#enejecucion-btn').pressed) {
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"stc_nestado:inint","value":"5"}';
            } else {
                url += '{"property":"stc_nestado:inint","value":"5"}';
            }
        } else if (view.down('#pendiente-btn').pressed) {
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"stc_nestado:inint","value":"2"}';
            } else {
                url += '{"property":"stc_nestado:inint","value":"2"}';
            }
        } else {
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"stc_nestado:inint","value":"2,5"}';
            } else {
                url += '{"property":"stc_nestado:inint","value":"2,5"}';
            }            
        }   
                
        controller.armarUrl(url, gmappanel6, view);
        controller.onCentrarMap(gmappanel6);
    },

    armarUrl : function(url, gmappanel6, view) {
        var controller = this;

        if(view.down('#tecnicoscombo').getValue()) {
            var instalador = view.down('#tecnicoscombo').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"stc_ctecnico_1","value":"'+instalador+'"}';
            } else {
                url += '{"property":"stc_ctecnico_1","value":"'+instalador+'"}';
            }
            
        }
        if(view.down('#tiposervicio').getValue() != null) {
            var tiposervicio = view.down('#tiposervicio').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"tip_ntipo","value":'+tiposervicio+'}';
            } else {
                url += '{"property":"tip_ntipo","value":'+tiposervicio+'}';
            }
            
        }
        
        if(view.down('#provinciacombo').getValue()) {
            var provincia = view.down('#provinciacombo').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"cue_cprovincia","value":"'+provincia+'"}';
            } else {
                url += '{"property":"cue_cprovincia","value":"'+provincia+'"}';
            }
            
        }
        
        if(view.down('#localidad').getValue()) {
            var localidad = view.down('#localidad').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"cue_clocalidad:LIKE","value":"'+localidad+'"}';
            } else {
                url += '{"property":"cue_clocalidad:LIKE","value":"'+localidad+'"}';
            }
            
        }
        
        if(view.down('#nombre').getValue()) {
            var nombre = view.down('#nombre').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"cue_cnombre:LIKE","value":"'+nombre+'"}';
            } else {
                url += '{"property":"cue_cnombre:LIKE","value":"'+nombre+'"}';
            }
            
        }
        
        if(view.down('#cuenta').getValue()) {
            var cuenta = view.down('#cuenta').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"cue_ncuenta","value":"'+cuenta+'"}';
            } else {
                url += '{"property":"cue_ncuenta","value":"'+cuenta+'"}';
            }
            
        }
        
        if(view.down('#dealer').getValue()) {
            var dealer = view.down('#dealer').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"lin_ccodigo","value":"'+dealer+'"}';
            } else {
                url += '{"property":"lin_ccodigo","value":"'+dealer+'"}';
            }
            
        }
        
        if(view.down('#observacion').getValue()) {
            var obs = view.down('#observacion').getValue();
            
            if ( url.substr(url.length - 1) === '}' ) {
                url += ',{"property":"stc_mobservaciones:LIKE","value":"'+obs+'"}';
            } else {
                url += '{"property":"stc_mobservaciones:LIKE","value":"'+obs+'"}';
            }
            
        }
        
        if(view.down('#dealercuenta').getValue()) {
            var datos = view.down('#dealercuenta').getValue().split('-');
            
            if(datos.length > 0) {
                
                if ( url.substr(url.length - 1) === '}' ) {
                    url += ',{"property":"lin_ccodigo","value":"'+datos[0]+'"},{"property":"cue_ncuenta","value":"'+datos[1]+'"}';
                } else {
                    url += '{"property":"lin_ccodigo","value":"'+datos[0]+'"},{"property":"cue_ncuenta","value":"'+datos[1]+'"}';
                }

            } else {
                notify('El formato para la busqeuda no es valido')
            }
        }
        
        url += ']';
        
        //elimino los features
        gmappanel6.cuentasPosicion.forEach(function (feature) {
            gmappanel6.cuentasPosicion.remove(feature)
        })
        
        gmappanel6.cuentasPosicion = new google.maps.Data();
        gmappanel6.cuentasPosicion.loadGeoJson(url, view.mask.show(), function (features) {
            view.mask.hide();
            controller.onCentrarMap(gmappanel6);
        });        
        gmappanel6.cuentasPosicion.setMap(gmappanel6.getMap());
        
        gmappanel6.cuentasPosicion.setStyle(function(feature) {
            return {
                icon: feature.getProperty('icon')
            };
        });
        
        controller.addClickMarkerEvent(gmappanel6);
    },

    addClickMarkerEvent : function(gmappanel6) {
        var controller = this;
        var address = '';
        
        // Cuando hago MouseOut, cierro la Window
        gmappanel6.cuentasPosicion.addListener('mouseout', function(event) {
            if(gmappanel6.infowindowOpened) {
                gmappanel6.infowindowOpened.close();                        
            }
            /* Se comenta, por si hay que volver a ventana de Sencha
            var win = event.feature.Window;
            win.hide();
            */
        });
        
        // Cuando hago MouseOver, tengo que abrir la Window
        gmappanel6.cuentasPosicion.addListener('mouseover', function(event) {
            var stc_inumero = event.feature.getProperty("stc_inumero");
            Ext.Ajax.request({
                url: '/rest/search/ServTec?filter=[{"property":"stc_inumero","value":"'+stc_inumero+'"}]',
                success: function(response, opts) {
                    var obj = Ext.JSON.decode(response.responseText);
                    var infoRecord = obj.rows[0];
                    
                    // Creo como propiedad de la feature, la Window del video
                    // esto es para el efecto mouseover y luego mostrar cual es de las abiertas
                    
                    if(gmappanel6.infowindowOpened) {
                        gmappanel6.infowindowOpened.close();                        
                    }
                    gmappanel6.infowindowOpened = new google.maps.InfoWindow({
                        pixelOffset: new google.maps.Size(0, -45)
                    });
                    // Llamo a la funcion que genera el HTML del InfoWindow
                    gmappanel6.infowindowOpened.setContent(controller.getSerTecInfoWindowHtmlGeoJson(infoRecord, address))
                    
                    gmappanel6.infowindowOpened.setPosition(event.feature.getGeometry().get());
                    gmappanel6.infowindowOpened.open(gmappanel6.getMap());
                    
                    /* Se comenta por si hay que volver a ventana de Sencha.
                    event.feature.Window = Ext.widget('window',{
                        title: 'Detalle Servicio Tecnico',
                        height: 260,
                        width: 310,
                        resizable: false,
                        items: [
                            {
                                xtype : 'container',
                                layout : 'vbox',
                                padding : 15,
                                items : [
                                    {
                                       xtype : 'label',
                                       width : '100%',
                                       html : '<div style="margin-top:10px; margin-bottom:15px">'+getLocale('Cuenta')+' : '+cue_clinea+'-'+cue_ncuenta+' '+cue_cnombre+'</div>'
                                    },{
                                       xtype : 'label',
                                       width : '100%',
                                       html : '<div style="margin-bottom:15px;">'+getLocale('Servicio Tecnico')+' : '+stc_inumero+'</div>'
                                    },{
                                       xtype : 'label',
                                       width : '100%',
                                       html : '<div style="margin-bottom:15px;">'+getLocale('Direccion')+' : '+lin_ccalle+'</div>'
                                    },{
                                       xtype : 'label',
                                       width : '100%',
                                       html : '<div style="margin-bottom:15px;">'+getLocale('Observacion')+' : '+stc_mobservaciones+'</div>'
                                    }
                                ]
                            }
                            ],
                        layout: 'fit',
                        listeners : {
                            beforeclose:function(){
                                // Cambio icono de la camara que estoy viendo 
                                // event.feature.setProperty('icon', '/resources/softguard/images/poi/st.png');
                                //
                            }
                        }
                    }).show();
                    */
                }
            })           
        }) 
    },
    
    onManualCenter: function(gmappanel6){
        var view = gmappanel6.up('sertecmapgpsview');
        var btn = view.down('#center');
        
        if(btn._pressed) {
            btn.setText(getLocale('Cambiar a Centrar'));
            btn._pressed = false
        }
    },
    
    onCenterClick: function (btn, e, eOpts) {
        var view = btn.up('sertecmapgpsview');
        var gmappanel6 = view.down('gmappanel6')
        
        if(!btn._pressed) {
            btn.setText(getLocale('Cambiar a Manual'));
            this.onCentrarMap(gmappanel6);
            btn._pressed = true;
        } else {
            btn.setText(getLocale('Cambiar a Centrar'));
            btn._pressed = false
        }
    },
    
    onCentrarMap : function(gmappanel6) {
        var map = gmappanel6.getMap();
        var layer = gmappanel6.cuentasPosicion;
        var bounds = new google.maps.LatLngBounds();    
        var count = 0;

        layer.forEach(function (feature) {
            bounds.extend(new google.maps.LatLng(feature.getGeometry().get().lat(),feature.getGeometry().get().lng()));
            count++;
        })
        
        if(count>0) {        
            var map = gmappanel6.getMap();
            var lastzoom = map.getZoom();
                    
            setTimeout(function(){
                // 02-01 : Se encuentra comentado y no centra el mapa. Se descomenta por Juan, pedido de Rodrigo. A chequear Adrian
                map.panToBounds(bounds);
                map.fitBounds(bounds);    
                if (map.getZoom()==0) {
                    map.setZoom(lastzoom);
                }
            }, 1000);
        }
    },
    
    getSerTecInfoWindowHtmlGeoJson : function(infoRecord, address) {
        var iconUrl = '/resources/softguard/images/mapguard-cservice/VC7.png'
        var html = '            <div >            <table width="250">            <tr>                <td style="padding:5px 5px 0 5px; font-size:13px; ">                    <img src="'+iconUrl+'" style="float:left; margin:0 5px 0 0"/>                </td>                <td style="padding:5px 5px 0 5px; font-size:13px; ">                    <div style="float:left; width:200px">{dealer}-{ncuenta}</div>                    <div style="float:left; width:200px">{nombre}</div>                </td>            </tr>            </table>            <hr>            ';
            
        html += '            <table width="250">            <tr>                <td style="padding:5px 5px 0 5px; font-size:13px; ">                    <div style="margin-bottom:15px;">'+getLocale('Servicio Tecnico')+' : {stc_inumero}</div>                </td>            </tr>            <tr>                <td style="padding:5px 5px 0 5px; font-size:13px; ">                    <div style="margin-bottom:15px;">'+getLocale('Direccion')+' : {lin_ccalle}</div>                </td>            </tr>            <tr>                <td style="padding:5px 5px 0 5px; font-size:13px; ">                    <div style="margin-bottom:15px;">'+getLocale('Observacion')+' : {stc_mobservaciones}</div>                </td>            </tr>            <tr>                <td style="padding:5px 5px 0 5px; font-size:13px; ">                    <div style="margin-bottom:15px;">'+getLocale("Servicio")+' : {tip_cdescripcion}</div>                </td>            </tr>';
                
 
        html = html.replace(/\{dealer\}/, infoRecord.cue_clinea);
        html = html.replace(/\{ncuenta\}/, infoRecord.cue_ncuenta);
        html = html.replace(/\{nombre\}/, infoRecord.cue_cnombre);
        html = html.replace(/\{stc_inumero\}/, infoRecord.stc_inumero);   
        html = html.replace(/\{lin_ccalle\}/, infoRecord.lin_ccalle);
        html = html.replace(/\{stc_mobservaciones\}/, infoRecord.stc_mobservaciones);
        html = html.replace(/\{tip_cdescripcion\}/, infoRecord.tip_cdescripcion);
        return html
    }    

});
