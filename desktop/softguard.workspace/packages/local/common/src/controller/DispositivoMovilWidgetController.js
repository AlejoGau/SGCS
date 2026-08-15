//MIGRADO2024
Ext.define('Common.controller.DispositivoMovilWidgetController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleSearchModel' ],
	views : [ 'DispositivoMovilWidgetView' ],
	init : function(config) {
		this.control({
			'dispositivomovilwidgetview' : {
				afterrender : this.initview,
                changeobject : this.onChangeobject,
                changeicon : this.onChangeIcon
			},
            'flotagpsview' : {
                vehicleSelected: this.onVehicleSelected
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
        var view = button.up('dispositivomovilwidgetview');
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
        var view = dataPanel.down('dispositivomovilwidgetview');
        
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
    
    setRecord: function(view, record){
        view.record = record;
        view.loadRecord(record);
        var controller = this;
        
        
        if(record.pos) {
            var pos = record.pos;
            var gps = pos.gps;
            
            
            if (record.get('Photo')){
                photo = '/gallery/'+record.get('Photo');
                view.down('#photo').setWidth(200);
                view.down('#photo').setSrc(photo);
                view.down('#photo').show();
                view.down('#noImage').hide();
            }else{
                view.down('#noImage').show();
                view.down('#photo').hide();
            }
            
            view.down('#direccion').setValue(record.address)
            
            
            if(view.down('#kmhora').getValue() != gps.get('gps_iVelocidad')) {
                controller.cambioVelocidad(view,gps);
            }
            
            
            
            if(gps.get('gps_iVelocidad')) {
                view.down('#velocidad').show()
                view.down('#velocidad').setValue(gps.get('gps_iVelocidad'));
                
                
            }
            if(gps.get('gps_iOdometro')) {
                view.down('#odometro').show();
                view.down('#odometro').setValue(gps.get('gps_iOdometro'));
            }
            if(pos.address) {
                view.down('#direccion').show();
                view.down('#direccion').setValue(pos.address);
            } 
            if(record.get('sta_dFechaUltimaAlerta')) {
                view.down('#ultimaalerta').show()
            }        
            if(gps.get('gps_isofechahora')) {
                view.down('#fecha').show();
                view.down('#fecha').setValue(gps.get('gps_isofechahora'));
            }
            if(record.get('gps_trawfechahora') != '') {
                //console.log(new Date(record.get('gps_isorawfechahora')))
                //record.set('gps_isorawfechahora',new Date(record.get('gps_isorawfechahora'))) 
                view.down('#fechagps').show();
                view.down('#fechagps').setValue(record.get('gps_trawfechahora'));
            }
            if(record.get('sta_cUltimaAlerta')) {
                view.down('#alerta').show()
            }
            
            
            if(record.get('OtroTextolibre') && Ext.util.Format.trim(record.get('OtroTextolibre')) != '') {
                view.down('#OtroTextolibre').show()
            } else {
                view.down('#OtroTextolibre').hide()
            }
            
            
            
            
            
                
            
            
            switch(record.get('tip_nTipo')){
                case 0:
                    var bloque = view.down('#otroFields');
                break;
                case 1:
                    var bloque = view.down('#vehicleFields');
                break;
                case 2:
                    var bloque = view.down('#personaFields');
                break;
                case 3:
                    var bloque = view.down('#mascotaFields');
                break;
                default:
                    var bloque = view.down('#otroFields');
            }
            
            bloque.show();
        }
        
        
        if(!record.get('tip_cdescripcion')) {
            view.down('#tipo').hide()
        }
        
        if(view.hideVelocimetro) {
            view.down('#velocimetro').hide()
        }
            
            
        
    }
});