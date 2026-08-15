//MIGRADO2024
Ext.define('Common.controller.EventoReCategorizacionFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablasCategorizacionStore', 'Common.store.TablasResolucionesStore' ],
    models : [ 'TablasCategorizacionSearchModel', 'TablasObservacionesSearchModel', 'TablasResolucionesSearchModel', 'EventosTiemLineModel' ],
    views : [ 'EventoReCategorizacionFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
    		'eventorecategorizacionformview' : {
				beforerender : this.initview
			},
			'eventorecategorizacionformview button[action="agregar-observacion"]' : {
				click : this.onAgregarObservacionClick
			},
            'eventorecategorizacionformview button[action="save"]' : {
				click : this.onAgregarObservacionClick
			},
            'eventorecategorizacionformview #observaciones' : {
                change : this.onChangePredefinidasClick
            },
            'eventorecategorizacionformview #categorizacion' : {
                change : this.onChangeCategorizacion
            },
            'eventorecategorizacionformview #resolucion' : {
                change : this.onChangeResolucion
            }  
        });
	}, // cierro init
    
    
    onChangePredefinidasClick: function(combo, newvalue, oldvalue){
        
        var view = combo.up('eventorecategorizacionformview');
        var textarea = view.down('#obsfield');
        //var predefinida = view.down('#predefinidas').getValue();
   
        textarea.setValue(newvalue); // 7/6/2017 se pidio por CHAT (rodrigo) que vuelva a poner la nota predefinida 
        
    },
	initview : function(view) {
        
        if(view.record) {
            view.loadRecord(view.record);
            
           
        }
        
        /*
        if(Ext.util.Format.trim(view.record.get('rec_idResolucion')) != '') {
            view.down('#categorizacion').setValue(view.record.get('rec_idResolucion'));
        } else {
            // esto esta raro... a esta altura no se definio el store... adrian como es? [dedalo 10/08/2016]
            view.down('#categorizacion').setValue(view.down('#categorizacion').getStore().getAt(0));
        }
        */
      /*  if(Ext.util.Format.trim(view.record.get('rec_ccategorizacion')) != '') {
            view.down('#resolucion').setValue(view.record.get('rec_ccategorizacion'));
        } else {
            view.down('#resolucion').setValue(view.down('#resolucion').getStore().getAt(0));
        }*/
        
        if(!view.procesar) {
            view.down('#resolucion').hide();
        }
        
     /*   if(view.down('#resolucion').getValue() == '0' || view.down('#resolucion').getValue() == 0 || !view.down('#resolucion').getValue()) {
            view.down('#resolucion').setValue(view.down('#resolucion').getStore().getAt(0));
        }*/
        
        
        // ADRIAN en el network veo que la tabla de resoluciones se carga 2 veces una con orden y otra sin... ahora agrego el orden a esta carga pero revisar por que 2 veces... [dedalo 16/8/2016]
        var resolucionesStore =Ext.create('Ext.data.Store',{
            model: this.getTablasResolucionesSearchModelModel(),
            pageSize: 99999,
            remoteFilter:true,
            remoteSort: true,
            sorters: [{"property":"res_cdescripcion","direction":"ASC"}],
           /* filters: [
                {
                    property: 'res_nEstado', 
                    value: 0
                }
            ]*/
        });
        view.down('#categorizacion').bindStore(resolucionesStore)
        resolucionesStore.load({callback:function () {
            
            if(view.down('#categorizacion').getValue() == '0' || view.down('#categorizacion').getValue() == 0 || !view.down('#categorizacion').getValue()) {
                view.down('#categorizacion').setValue(view.down('#categorizacion').getStore().getAt(0));
            }
            
            if(view.record) {   
                view.down('#categorizacion').setValue(view.record.get('rec_idResolucion'))
            }
        
        }});
        
        
        if(this.application._nameModule && this.application._nameModule == 'AWCC') {
           Ext.Array.each(view.items.items, function (item) {
                    item.setDisabled(true) 
            }) 
        }
	
	},    
    onChangeCategorizacion: function(combo){    
        var view = combo.up('eventorecategorizacionformview');
        view.record.set('rec_idresolucion', combo.getValue())
        
        view.fireEvent('selectionChange')  
    },
    
    onChangeResolucion: function(combo){    
        var view = combo.up('eventorecategorizacionformview');
        view.record.set('rec_ccategorizacion', combo.getValue())
        
        view.fireEvent('selectionChange')  
    },
    
    
    
	onAgregarObservacionClick: function(button, object, options){
      
       
        var view = button.up('eventorecategorizacionformview');
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        //var observaciones = view.down('#obsfield');
        //var observacion = observaciones.getValue();
        var categorizacion = view.down('#categorizacion').getValue();
        var observaciones = view.down('#obsfield').getValue();
        var resolucion = view.down('#resolucion').getValue();
        var controller = this;
        
        if (observaciones != ''){
          
                
               
                
                var rec_iid = record.get('rec_iid');
                var params = {};
                params.rec_iid = rec_iid;
                if(categorizacion) {
                    params.rec_idResolucion = Ext.String.leftPad(categorizacion, 3, '0');
                }
                if(observaciones) {
                    params.rec_cObservaciones = observaciones;                
                }
                if(resolucion) {
                    params.rec_cCategorizacion = Ext.String.leftPad(resolucion, 3, '0');
                }
                
                
                Ext.Ajax.request({
                      
                      params: params,
                      url: '/rest/search/AtencionEventoObservacion',                        
                      method: 'GET',
                      scope: this,
                      success: function(response){
                        var parametros = Ext.JSON.decode(response.responseText);
                        var rec = parametros.rows[0];
                        
                        if (rec){
                            //actualizo las pantallas
                            notify('Los datos se guardaron con éxito');
                            
                          
                            if(categorizacion != view.record.get('rec_idResolucion')) {
                                controller.getEventosTiemLineModelModel().create({
                                    etl_icuenta: view.record.get('cue_iid'),
                                    etl_tfechahora: new Date(),
                                    etl_caccion: getLocale('Recategorizacion'),
                                    etl_cobservacion: _UserData.UserId+' '+getLocale('recategorizó:')+ view.down('#categorizacion').getRawValue(),
                                    etl_cowner: getLocale(controller.application.id),
                                    etl_ioperador: 0,
                                    etl_irecid: rec_iid
                                }).save();
                            }
                            
                            view.record.set('rec_idResolucion',rec.rec_idResolucion)
                            view.record.set('rec_idresolucion',rec.rec_idResolucion)
                            
                            view.record.set('rec_cCategorizacion',rec.rec_cCategorizacion)
                            view.down('#obsfield').setValue('');
                            
                        } else {
                            notifyError(rec.Message);
                        }
                        
                      }
                });
                   
            
        } else {
            notifyError('Debe completar la observación antes de guardar!');
        }
        
        
    }
    
	
   
});