Ext.define('Common.controller.NotificacionEncuestaController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EncuestasModel', 'PlantillasModel', 'notif_m_dealer_stconfigModel' ],
    views : [ 'NotificacionEncuestaView' ],

    init : function(config) {
        // genero los eventos

        this.control({
					'notificacionencuestaview' : {
						beforerender : this.initview
					},
					'notificacionencuestaview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'notificacionencuestaview #chkbPlantillaPush':{
                        change : this.onCheckPlantilla
                    },
                    'notificacionencuestaview #chkbEncuesta':{
                        change : this.onCheckEncuesta
                    }
                                        
                    
    				
                });
	}, // cierro init

	initview : function(view) {
       // console.log(view.record.data.lin_ccodigo)
        var encuestaStore =Ext.create('Ext.data.Store',{
            model: this.getEncuestasModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })     
        encuestaStore.load();
        var comboEncuesta = view.down('#encuestaCombo');  
	    comboEncuesta.bindStore(encuestaStore);

        var plantillasStore =Ext.create('Ext.data.Store',{
            model: this.getPlantillasModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })     
        plantillasStore.load();
        var comboPlantilla = view.down('#platillaPushCombo');  
	    comboPlantilla.bindStore(plantillasStore); 
        var filters = [];   
        filters.push({
            property: 'dst_cdealer',
            value: view.record.data.lin_ccodigo,
            id: 'dst_cdealer'
        });        


        var notifStore = Ext.create('Ext.data.Store',{
            model: this.getNotif_m_dealer_stconfigModelModel(),
            pageSize: 1000,
            remoteFilter: true,
            filters: filters             
        });

        var controller = this;
        notifStore.load({
            callback: function(records, operation, success) {
                if(records.length>0)
                    controller.loadData(records[0].get('rows')[0].Id,view);
                else
                    controller.loadData(0,view);                

            }            
        });  
	},

    loadData: function(notifId,view){
        var notifModel = this.getNotif_m_dealer_stconfigModelModel();
        var controller = this;
        notifModel.load(notifId,{
            callback: function (record,operation){
                var comboPlantilla = view.down('#platillaPushCombo');
                var comboEncuesta = view.down('#encuestaCombo');

                
                if(record && record.get('dst_config')!=''){
                    
                    view.loadRecord(record);
                    
                    var json = Ext.JSON.decode(record.get('dst_config')) ;
                    if (json.Notificacion[0].PlanillaPush!=''){
                        view.down('#chkbPlantillaPush').setValue(true);
                        comboPlantilla.setDisabled(false);
                    }else{
                        view.down('#chkbPlantillaPush').setValue(false);
                        comboPlantilla.setDisabled(true);
                    }
                    if (json.Notificacion[0].Encuesta!=''){
                        view.down('#chkbEncuesta').setValue(true);
                        comboEncuesta.setDisabled(false);
                    }else{
                        view.down('#chkbEncuesta').setValue(false);
                        comboEncuesta.setDisabled(true);
                    }                    

                    view.down('#encuestaCombo').setValue(json.Notificacion[0].Encuesta);
                    view.down('#platillaPushCombo').setValue(json.Notificacion[0].PlantillaPush);
                }else{
                    var model = controller.getNotif_m_dealer_stconfigModelModel();
                    record = Ext.create(model,{
                        dst_cdealer: view.record.data.lin_ccodigo,
                        dst_config: '{}'
                    });
                    view.loadRecord(record);
                    comboPlantilla.setDisabled(true);
                    comboEncuesta.setDisabled(true);
                }
            }
        });  
    },

    onCheckPlantilla : function (checkbox, newVal, oldVal) {
        var view = checkbox.up('notificacionencuestaview');
        var comboPlantilla = view.down('#platillaPushCombo');
        if(newVal==1){
            comboPlantilla.setDisabled(false);
        }else{
            comboPlantilla.setDisabled(true);
        }
    },
    onCheckEncuesta : function (checkbox, newVal, oldVal) {
        var view = checkbox.up('notificacionencuestaview');

        var comboEncuesta = view.down('#encuestaCombo');
        if(newVal==1){
            comboEncuesta.setDisabled(false);
        }else{
            comboEncuesta.setDisabled(true);
        }
    },
    

	onSaveClick : function(button, event, options) {
        //{"Notificacion": [{"PlanillaPush":"FST","Encuesta":"15"}]}
        var arrayJson = {Notificacion:[]};
        var view = button.up('notificacionencuestaview');
        
        var myform = button.up('notificacionencuestaview').getForm();

        var record = myform.getRecord();
        var comboPlantilla = view.down('#platillaPushCombo');
        var comboEncuesta = view.down('#encuestaCombo');
        //'{"Notificacion": [{"PlanillaPush":"FST","Encuesta":"15"}]}'
        var plantillaPush='';
        var encuesta = '';
        if(view.down('#chkbPlantillaPush').checked){
            plantillaPush = comboPlantilla.getValue();
        }
        if(view.down('#chkbEncuesta').checked){
            encuesta = comboEncuesta.getValue();
        }

        arrayJson.Notificacion.push({PlantillaPush:plantillaPush
            ,Encuesta: encuesta});
        record.set('dst_config',Ext.JSON.encode(arrayJson));
        record.save({
            callback : function(record,operation){
                    if(operation.success){
                    notify('Los datos se guardaron correctamente');
                    var win = view.up('window');
                    win.close();
                }else{
                    notifyError('Hubo un error al guardar los datos');
                }
            }
        });
        /*
		myform.updateRecord(record);
        
        
        if(view.down('#organizacion').getValue() == ''  || view.down('#organizacion').getValue() == 0) {
            notify('Debe seleccionar una organizacion.')
            return false;
        }
        
        var horadesde = view.down('#tmd_horadesde').getValue()
        var horahasta = view.down('#tmd_horahasta').getValue()
        var horadesdeFinal = Ext.Date.format(horadesde,'H:i')
        var horahastaFinal = Ext.Date.format(horahasta,'H:i')
        
        if(horadesde >= horahasta) {
            notify('El horario desde no puede ser meno o igual al horario hasta.')
            return false;
        }
        
        
        
        
        Ext.create('Ext.data.Store',{
                model: controller.getT_monitoreo_dealerSearchModelModel(),
                pageSize: 999,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property:'tmd_clinea',
                    value: view.record.get('tmd_clinea')
                },{
                    property:'tmd_iorganizacion',
                    value: view.down('#organizacion').getValue()
                },{
                    property:'tmd_idkey:NOT',
                    value: view.record.get('Id')
                }]
            }).load({callback:function (records) {
                
                
               
                 //verifico colicion
                var colicion = false;
                //Ext.Array.each(dias,function (iddia,k) {
                    
                   
                    Ext.Array.each(records,function (rec) {
                        if(view.down('#diasemana').getValue() == rec.get('tmd_diasemana')) {
                            if(parseInt(rec.get('tmd_horadesde').replace(':','')) <= parseInt(horahastaFinal) &&
                                parseInt(rec.get('tmd_horahasta').replace(':','')) >= parseInt(horadesdeFinal) ) {                                    
                                    colicion = true
                                }
                        }
                        
                    })
                //})
                 
                if(colicion) {
                    
                   
                    
                    Ext.MessageBox.alert('No se pudo crear', 'No se permiten días y horarios solapados, revise los datos para poder guardar', function() {
                           //action to complete when user clicks ok.
                     });
                     return false;
                } 
    
                 record.set('tmd_iorganizacion',view.down('#organizacion').getValue())
                 record.set('tmd_horadesde', horadesdeFinal)
                 record.set('tmd_horahasta', horahastaFinal)
                 
        
              
                if (myform.isValid()){
            		record.save({
            			scope : this,
                       
                        view: view,
            			callback : function(record, operation) {
                            if (operation.success){
                                var win = view.up('window');           
                                notify('Los datos se guardaron correctamente');
                                view.caller.fireEvent('objectchanged',view.caller,record);
                                win.close();
                            } else {
                                notifyError('Hubo un error al guardar los datos');
                            }
                            
            			},
            			button : button
            		});
                }
        
            }})*/

	},
    
   

	
   
});