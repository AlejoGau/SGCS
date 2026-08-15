Ext.define('SgAppMapGuardWeb.controller.ServTecWidgetController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ServTecWidgetView' ],

	init : function(config) {
		this.control({
			'servtecwidgetview' : {
				afterrender : this.initview,
                changeobject : this.onChangeobject,
                changeicon : this.onChangeIcon
			}
        });
	}, // cierro init

	initview : function(view) {
        var me = this;
        
        if (view.maximizer){
            view.addTool({
                type: 'maximize', 
                itemId: 'maximizer',
                handler: function(event,img,view,tool){
                    me.onMaximizeClick(tool)
                }
            });
        }
        
        if (view.record){
            this.setRecord(view,view.record)


        }
        
	},
    
    onChangeIcon: function (view,iconObject) {
        
        if(iconObject) {
            view.down('#iconblock').show()
            if(iconObject.url) {
                view.down('#icon').setSrc(iconObject.url)
            }
            if(iconObject.msg) {
                view.down('#iconmsg').setValue(iconObject.msg)
            }
        
        } else {
            view.down('#iconblock').hide()
        }
    },
    
    onChangeobject: function (view,record) {
        this.setRecord(view,record);
    },
    
    onMaximizeClick: function(button){
        var view = button.up('servtecwidgetview');
        var tabpanel = button.up('tabpanel');
        var record = view.record;
        
        var title = record.get('cue_clinea') 
            + "-" 
            + record.get('cue_ncuenta').replace(/^\s+|\s+$/g, '') 
            + " " 
            + record.get('cue_cnombre');
        
        var tab = tabpanel.add(Ext.widget('vehicleslavegpsview', {
            title: title,
            record: record,
            closable: true,
            closeAction: 'hide'
        }));

        tabpanel.setActiveTab(tab);
    },
    
    
    onVehicleSelected: function(record, flotagpsview){
        var dataPanel = flotagpsview.down('#datapanel');
        
        if (dataPanel)
        var view = dataPanel.down('servtecwidgetview');
        
        if (view)
        this.setRecord(view, record);
    },
    
    
    cambioVelocidad: function (view,gps) {
        var campo = view.down('#kmhora');
        
        var velocidadVieja = view.down('#kmhora').getValue();
        var velocidadNueva = gps.get('gps_iVelocidad');
        
        var diferencia = velocidadNueva - velocidadVieja;
        
        var cantidadDePasos = 10;
        
        var valorPorPaso = diferencia/cantidadDePasos;
        //cominezo desde el paso 1
        var pasoActual = 1;
        
        //console.log("VV:"+velocidadVieja,"VN:"+velocidadNueva,"DIFF:"+diferencia, "VP:"+valorPorPaso)
        
        //genero intervalos para actualizar el valor
        var intervalo = setInterval(function(){        
            //seteo valor
            //console.log("PA:"+pasoActual,"Nuevo valor:"+parseInt(valorPorPaso*pasoActual))
            campo.setValue(parseInt(parseInt(velocidadVieja) + parseInt(valorPorPaso*pasoActual)));
            //si ya realizamos la cantidad de pasos defino la velocidad nueva (por las dudas) y limpio el intervalo
            if(pasoActual >= cantidadDePasos) {
                campo.setValue(velocidadNueva);
                clearInterval(intervalo)
            }
            //continuo con el sigueinte paso
            pasoActual++;
        }, 300);
        
        // me fijo si llega el odómetro y lo ajusto
        var odometro = gps.get('gps_iOdometro');
        if (odometro > 0){
            view.down('#odometro').setValue(odometro);
        }
        
        //view.down('#kmhora').setValue(gps.get('gps_iVelocidad'));
    },


    getCuentaPosition: function(record){
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
    
    setRecord: function(view, record){
        view.record = record;
      //  view.loadRecord(record);
        var controller = this;
        
        record.pos = this.getCuentaPosition(record)

        view.down('#cue_cnombre').setValue(record.get('_cuenta'))
        if(record.pos) {
            var pos = record.pos;
            var gps = pos.gps;


            view.add({
                    xtype:'vehiclehistorico',
                    itemId:'vehiclehistorico',
                    record: record
                })
            
         
            
           
        }
        
      
            
        
    }
});