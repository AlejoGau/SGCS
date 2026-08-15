Ext.define('AdministratorSearch.controller.NotificacionesControlesController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EncuestasModel', 'PlantillasModel' ],
    views : [ 'NotificacionesControlesView' ],

    init : function(config) {
        // genero los eventos

        this.control({
					'notificacionescontrolesview' : {
						beforerender : this.initview
					},
					'notificacionescontrolesview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'notificacionescontrolesview #chkbPlantillaPush':{
                        change : this.onCheckPlantilla
                    },
                    'notificacionescontrolesview #chkbEncuesta':{
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

        this.loadData(view);
	},

    loadData: function(view){
                var comboPlantilla = view.down('#platillaPushCombo');
                var comboEncuesta = view.down('#encuestaCombo');
                if(view.record.get('lin_cMetaData')){
                    
                    var json = Ext.JSON.decode(view.record.get('lin_cMetaData')) ;
                    if (json.Notificacion[0].PlantillaPush && json.Notificacion[0].PlantillaPush!=''){
                        view.down('#chkbPlantillaPush').setValue(true);
                        comboPlantilla.setDisabled(false);
                    }else{
                        view.down('#chkbPlantillaPush').setValue(false);
                        comboPlantilla.setDisabled(true);
                    }
                    if (json.Notificacion[0].Encuesta && json.Notificacion[0].Encuesta!=''){
                        view.down('#chkbEncuesta').setValue(true);
                        comboEncuesta.setDisabled(false);
                    }else{
                        view.down('#chkbEncuesta').setValue(false);
                        comboEncuesta.setDisabled(true);
                    }                    

                    view.down('#encuestaCombo').setValue(json.Notificacion[0].Encuesta);
                    view.down('#platillaPushCombo').setValue(json.Notificacion[0].PlantillaPush);
                }else{
                    comboPlantilla.setDisabled(true);
                    comboEncuesta.setDisabled(true);
                }
            
 
    },

    onCheckPlantilla : function (checkbox, newVal, oldVal) {
        var view = checkbox.up('notificacionescontrolesview');
        var comboPlantilla = view.down('#platillaPushCombo');
        if(newVal==1){
            comboPlantilla.setDisabled(false);
        }else{
            comboPlantilla.setDisabled(true);
        }
    },
    onCheckEncuesta : function (checkbox, newVal, oldVal) {
        var view = checkbox.up('notificacionescontrolesview');

        var comboEncuesta = view.down('#encuestaCombo');
        if(newVal==1){
            comboEncuesta.setDisabled(false);
        }else{
            comboEncuesta.setDisabled(true);
        }
    },
    

	
   
});