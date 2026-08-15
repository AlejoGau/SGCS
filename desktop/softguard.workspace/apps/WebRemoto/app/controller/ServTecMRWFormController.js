Ext.define('WebRemoto.controller.ServTecMRWFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TecnicosSearchModel', 'm_st_cabeceraModel', 'TipoServicioSearchModel', 'ServTecVisitaModel', 'ServTecTecnicoVisitasModel', 'ServTecFormaViajeSearchModel', 'ServTecMovilVisitasModel', 'ServTecMovilesSearchModel', 'InstaladoresByTokenSearchModel', 'EventosTiemLineModel' ],
    views : [ 'ServTecMRWFormView' ],

    init : function(config) {
        // this.initConfig(config);
		// genero los eventos

		this.control({
            'sertecmwrformview' : {
                beforerender : this.initview,
			},
            'sertecmwrformview button[action=save]': {
                click: this.onSaveClick
            },
            'sertecmwrformview #servicio':{
                change: this.onServicioChange
            },
            'sertecmwrformview #tiposervicio':{
                change: this.onTipoServicioChange
            },
		});
	}, // cierro init

	initview : function(view) {
        var record = view.record;
        
        if(view.mode == 'edit') {
            view.down('#tiposervicio').hide();
            view.down('#servicio').hide();
        }
        
         Ext.Ajax.request({
            url : '/rest/security/UserData',		
    		success: function(response, action){
					var infoUser = Ext.decode(response.responseText);
                    view.userdata = infoUser;	
    		}    		
    	});
        
        for(var f in record.data)
        {
            var date = record.get(f);
            if(f.search("dfecha|dsalida|darribo|dintecnico|doutecnico")>0  && (new Date(date)).getTime() == 0){
                record.set(f, null);
            }
        }
        
        

        view.serviciosStore = Ext.create('Ext.data.Store', {
            model : this.getTipoServicioSearchModelModel(),
            remoteFilter: false,
            pageSize: 500
        });
        
        var combo = view.down('#servicio');
        combo.bindStore(view.serviciosStore);
        view.serviciosStore.load(); 
        
       
        view.loadRecord(record);
        
        if(view.newrecord) {
            view.down('#tiposervicio').setValue(1);
        }
            
        
	},
    
    onTipoServicioChange: function(field, newValue, oldValue, options){
        
        var view = field.up('sertecmwrformview');        
        
        if(view.record.get('Id') && oldValue == undefined) {
            return false;
        }
        
        var filters = [
                {
                    property: 'tip_ntipo',
                    value: newValue
                }
            ];
      
        
        var serviciosStore = Ext.create('Ext.data.Store', {
            model : this.getTipoServicioSearchModelModel(),
            remoteFilter: true,
            filters: filters,
            pageSize: 500
        });
        
        var combo = view.down('#servicio');
        combo.setValue('');
        serviciosStore.load({callback:function () {      
            
            combo.bindStore(serviciosStore);        
        }});
        
    
    
    },
    
    onServicioChange: function(field, newValue, oldValue, options){
          var view = field.up('sertecmwrformview');
       
          if(!view.record.get('Id')) {
              
              var fieldfecha = view.down('#fecha');
              view.serviciosStore.each(function(item, index, count){
              
                if(item.get('tip_ccodigo') == newValue) {
                
                    var vencimiento = item.get('tip_nvto');
                    var fechavencimiento = Ext.Date.add(new Date(), Ext.Date.DAY, vencimiento);
                    fieldfecha.setValue(fechavencimiento);
                    
                    var precio  = view.down('#precio');
                    precio.setValue(item.get('tip_yvalor'));
                    
                    return false;
                }
              });
          } else {
          
          	view.serviciosStore.each(function(item, index, count){
                if(item.get('tip_ccodigo') == newValue) {
                  
                    var precio  = view.down('#precio');
                    precio.setValue(item.get('tip_yvalor'));
                    
                    
                    view.down('#tiposervicio').setValue(item.get('tip_ntipo'));
                    
                    
                    return false;
                }
              });
              
              
              
          }
          
          
    },
    
    onAddInsumoClick : function(button, event, options) {
         var view = button.up('sertecmwrformview');
        //falta saber de donde sale el insumo    
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Insumo',
            closeAction : 'destroy',
    		width : 300,
    		height : 200,
    		border : true,
            modal: true,
            view : view,
    		items : [
                
            ]
    	});
    	win.show();
        
        
    },
    
    
    
    onSaveClick : function(button, event, options) {
        var view = button.up('sertecmwrformview');
    	var myform = view.getForm();
        var win =  button.up('window');
        var values = myform.getValues();
        var record = view.record;
        var cuenta = view.cuenta;
        var controller = this;
        var model = this.getM_st_cabeceraModelModel();
        
        if (!record){
            record = Ext.create(model, {
                stc_iid_cuenta: view.cuenta.get('cue_iid'),
                stc_dfecha_desde_1: new Date()
            }) ;
        } else {
            //record.setProxy(model.getProxy());
        }
        
        if (myform.isValid()){
            myform.updateRecord(record);
    
            for(var f in record.data)
            {
                var date = record.get(f);
                
                if(f.search("dfecha|dsalida|darribo|dintecnico|doutecnico")>0  && date == null){
                    record.set(f, new Date(1900,1,1));
                }
               // console.log(f,record.get(f));
            }
            
            
            record.set('stf_dfecha_vto_orden', view.down('#fecha').getValue());
            record.set('stc_nestado', 1);
    
            record.save({
        		scope : this,
    			callback : function(recordServicio, operation) {
                   
                   
                     controller.getServTecVisitaModelModel().create({
            
                        svi_iEstado: "1",
                        svi_iServicio: recordServicio.get('Id'),
                        svi_tFechaHora: recordServicio.get('stc_dfecha_modificacion'),
                        svi_cObservacion: record.get('stc_mobservaciones')
            
                    }).save({callback:function (recordVisita, operation) {
                        
                        
                        
                        //traigo un movil
                        view.storeCombo =Ext.create('Ext.data.Store',{
                            model: controller.getServTecMovilesSearchModelModel(),
                            pageSize: 50,
                            remoteSort: true,
                            remoteFilter: true
                        })
                        
                        view.storeCombo.load({callback:function (records) {
                            //grabo movil en la visita
                            controller.getServTecMovilVisitasModelModel().create({
                                smv_iMovil:records[0].get('mov_ccodigo'),
                                smv_iVisita:recordVisita.get('Id')
                            }).save()
                        
                        }});
                        
                        
                        
                        //traigo tecnico                        
                       var tecnicoStore =Ext.create('Ext.data.Store',{
                            model: controller.getInstaladoresByTokenSearchModelModel(),
                            pageSize: 50,
                            remoteSort: true,
                            remoteFilter: true
                        })
                        
                        tecnicoStore.load({callback:function (recordTecnico) {
                            //traigo forma de viaje
                            var formaViajeStore =Ext.create('Ext.data.Store',{
                                model: controller.getServTecFormaViajeSearchModelModel(),
                                pageSize: 50,
                                remoteSort: true,
                                remoteFilter: true
                            })
                            formaViajeStore.load({callback:function (recordFormaViaje) {
                                
                                controller.getServTecTecnicoVisitasModelModel().create({
                                    stv_iTecnico:recordTecnico[0].get('ins_idKey'),
                                    stv_iVisita:recordVisita.get('Id'),
                                    stv_iFormaDeViaje: recordFormaViaje[0].get('Id')
                                }).save();
                                
                            
                            }});
                        
                        }});
                        
                        
                        //guardo en eventostimeline
                        controller.getEventosTiemLineModelModel().create({
                            etl_icuenta: cuenta.get('cue_iid'),
                            etl_tfechahora: new Date(),
                            etl_caccion: '%AsignacionDeServicioTecnico%',
                            etl_cobservacion: record.get('stc_mobservaciones'),
                            etl_cowner: '%MWR%',
                            etl_ioperador: view.operadorId,
                            etl_irecid: view.rec_iid
                        }).save();
                        
                        
                        
                        
                        
                    
                    }});
                   
                    notify('Los datos se guardaron con éxito.')
                    
                   
                   if(view.up('window')) {
                        view.caller.fireEvent('objectnew', record,view.caller);
                        view.up('window').close();                        
                    }
    			
    			}   
    		});
        } else {
            notifyError('Corrija los errores antes de guardar.')
        }
        
        
        
	}
    
   


});