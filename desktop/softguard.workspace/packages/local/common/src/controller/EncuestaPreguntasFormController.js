Ext.define('Common.controller.EncuestaPreguntasFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_encuesta_preguntaModel', 'p_encuesta_pregunta_opcionSearchModel', 'p_encuesta_pregunta_opcionModel' ],
    views : [ 'EncuestaPreguntasFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			'encuestaspreguntasformview' : {
						beforerender : this.initview,
                        refreshopciones: this.onRefreshOpciones,
                        deleteOpcion: this.onDeleteOpcion
					},
					'encuestaspreguntasformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'encuestaspreguntasformview #epg_tipo' : {
						change : this.onTipoChange
					},
        			'encuestaspreguntasformview #addOpciones' : {
						click : this.onAddOpcionesClick
					},
            		'encuestaspreguntasformview #opcionesMultiplesgrid' : {
						itemdblclick: this.onItemClick
					}
                    
                    
                    
                    
    				
                });
	}, // cierro init
    
    
      
    onDeleteOpcion : function(rec,view) {
                    
       
        var model = this.getP_encuesta_pregunta_opcionModelModel();

        model.load(rec.get('Id'),{
            callback: function(record, operation, success){
                record.erase({
                    success: function(record, operation){
                        if (operation.success)
                            {
                                notify('Se eliminio exitosamente');
                                
                            }
                            else
                            {
                               notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                            }      
                            view.store.load();                        
                    }
                });
            }
        });

        //rec.setProxy(model.getProxy());
        /*rec.setConfig({
            proxy: model.getProxy()
        });
        rec.destroy({callback: function(record, operation){
           
           
            if (operation.success)
            {
                notify('Se eliminio exitosamente');
                
            }
            else
            {
               notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
            }      
            view.store.load();
        }})
             */  
             
                
	},
   
    
    
     onRefreshOpciones: function (view, record) {
        var store = view.down('#opcionesMultiplesgrid').getStore();
        store.filters.clear(true);
        store.filter([{
            property:'epo_epgidkey',
            value:view.record.get('Id')
        }]);
        store.load();
    },
    
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('encuestaspreguntasformview');
        var title = record.get('epo_name');

        this.getP_encuesta_pregunta_opcionModelModel().load(record.get('Id'),{callback:function (record) {
        
            var viewWin = Ext.widget('encuestaspreguntaopcionesformview',{
                caller: view,
                record: record,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
                translate: false,
                width : 700,
                height : 400,
    			border : false,
    			items : viewWin
    		});
    		win.show();
            
        }})    
        
    },
    
    
       
    onAddOpcionesClick: function (btn) {
        var view = btn.up('encuestaspreguntasformview')
        
        var record = this.getP_encuesta_pregunta_opcionModelModel().create({
            Id: 0,
            epo_tipo:0,
            epo_status: 1,
            epo_epgidkey: view.record.get('Id')
        })
        
        var viewWin = Ext.widget('encuestaspreguntaopcionesformview',{
                caller: view,
                record: record,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : 'Nueva opcion',
                translate: false,
                width : 700,
            	height : 400,
    			border : false,
    			items : viewWin
    		});
    		win.show();
        
    },
    
    onTipoChange: function (combo, value) {
        var view = combo.up('encuestaspreguntasformview')  
        
        if(view.record.get('Id') == 0) {
		    notify('Para poder agregar opciones debe guardar antes.')	
		} else {
            view.down('#opcionesMultiples').show();   
		}
        
        /* Original porque antes se puso Texto Libre
        if(value == 1) {
    		if(view.record.get('Id') == 0) {
				notify('Para poder agregar opciones debe guardar antes.')
			} else {
            	view.down('#opcionesMultiples').show()
			}
        } else {
            view.down('#opcionesMultiples').hide()
            
        }
        */
    },

	initview : function(view) {
        view.loadRecord(view.record);
        
        
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getP_encuesta_pregunta_opcionSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property:'epo_epgidkey',
                value:view.record.get('Id')
            }]
        })
        view.down('#opcionesMultiplesgrid').bindStore(view.store)
        
        if(view.record.get('Id') != 0) {
            view.store.load({callback:function (){
            
            }})
        }
       
        
	},
    

	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('encuestaspreguntasformview');        
		var record = myform.getRecord();
    	var controller = this

		myform.updateRecord(record);
              
        if (myform.isValid()){            
    		record.save({
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('refreshPreguntas',view.caller,record);
                        view.loadRecord(record);
                        view.record = record
                        //fuerzo el value del combo de tipo
                        //view.down('#epg_tipo').setValue(view.record.get('epg_tipo'))
                        
                        view.down('#epg_tipo').fireEvent('change',view.down('#epg_tipo'),view.record.get('epg_tipo'))
                        //win.close()
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			}
    		});
        }

	},
    
	
   
});
