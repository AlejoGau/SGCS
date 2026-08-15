Ext.define('AdministratorSearch.controller.t_monitoreo_dealerFormExtendedController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_monitoreo_dealerModel', 't_monitoreo_dealerSearchModel' ],
    views : [ 't_monitoreo_dealerFormExtendedView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				't_monitoreo_dealerformextendedview' : {
						beforerender : this.initview
					},
					't_monitoreo_dealerformextendedview button[action="save"]' : {
						click : this.onSaveClick
					},
            		't_monitoreo_dealerformextendedview #comboprogramtype' : {
        				change : this.onProgramTypeChange
        			}
    				
                });
	}, // cierro init
    
    onProgramTypeChange: function(combo, value, old){
        var view = combo.up('t_monitoreo_dealerformextendedview');
        var combodayofweek = view.down('#combodayofweek');
        var combodayofmonth = view.down('#combodayofmonth');
        var horario = view.down('#tmd_horadesde');
        var horarioend = view.down('#tmd_horahasta');
        var containerhoras = view.down('#containerhoras')
       
        combodayofweek.hide();         
        containerhoras.show()
        
        if(value == 1) {            
           
        } else if(value == 2) {            
            
        } else if(value == 3) {            
            combodayofweek.show();           
        } else if(value == 4) {            
            containerhoras.hide()           
        }
        
    },

	initview : function(view) {
	
	},


	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('t_monitoreo_dealerformextendedview');
        var win = button.up('window');
		var record = myform.getRecord();
        var controller = this


	//	myform.updateRecord(record);
    
        if(view.down('#organizacion').getValue() == ''  || view.down('#organizacion').getValue() == 0) {
            notify('Debe seleccionar una organizacion.')
            return false;
        }
        
        var horadesde = view.down('#tmd_horadesde').getValue()
        var horahasta = view.down('#tmd_horahasta').getValue()
        
        if(view.down('#comboprogramtype').getValue() == 3 || 
            view.down('#comboprogramtype').getValue() == 2 || 
            view.down('#comboprogramtype').getValue() == 1) {    
                
                
                
                if(horadesde >= horahasta) {
                    notify('El horario desde no puede ser meno o igual al horario hasta.')
                    return false;
                }
                
                
                
                var horadesdeFinal = Ext.Date.format(horadesde,'H:i')
                var horahastaFinal = Ext.Date.format(horahasta,'H:i')
                
            } else {
                
                 var horadesdeFinal = '00:00'
                 var horahastaFinal = '23:59'
                
            }
        
     

      
        if (myform.isValid()){
            
            
            
             if(view.down('#comboprogramtype').getValue() == 3) {
                    var dias = view.down('#combodayofweek').getValue().dayofweek                               
             } else if(view.down('#comboprogramtype').getValue() == 2) {
                    var dias = [1,2,3,4,5]     
             } else if(view.down('#comboprogramtype').getValue() == 1) {
                    var dias = [0,1,2,3,4,5,6] 
             } else if(view.down('#comboprogramtype').getValue() == 4) {
                    var dias = [0,1,2,3,4,5,6] 
                    horadesde = '00:00'
                    horahasta = '23:59'
             }
             
             
             Ext.create('Ext.data.Store',{
                model: controller.getT_monitoreo_dealerSearchModelModel(),
                pageSize: 999,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property:'tmd_clinea',
                    value:view.record.get('lin_ccodigo')
                },{
                    property:'tmd_iorganizacion',
                    value:view.down('#organizacion').getValue()
                }]
            }).load({callback:function (records) {
                
                
               
                 //verifico colicion
                var colicion = false;
                Ext.Array.each(dias,function (iddia,k) {
                    
                   
                    Ext.Array.each(records,function (rec) {
                        if(iddia == rec.get('tmd_diasemana')) {
                            if(parseInt(rec.get('tmd_horadesde').replace(':','')) <= parseInt(horahastaFinal) &&
                                parseInt(rec.get('tmd_horahasta').replace(':','')) >= parseInt(horadesdeFinal) ) {                                    
                                    colicion = true
                                }
                        }
                        
                    })
                })
                 
                    if(colicion) {
                        
                       
                        
                        Ext.MessageBox.alert('No se pudo crear', 'No se permiten días y horarios solapados, revise los datos para poder guardar', function() {
                               //action to complete when user clicks ok.
                         });
                         return false;
                    } 
                    
                    
                     Ext.Array.each(dias,function (iddia,k) {
                        var record = controller.getT_monitoreo_dealerModelModel();         
                
                        var myobject = record.create({
                            tmd_clinea: view.record.get('lin_ccodigo'),
                            tmd_diasemana:iddia,
                            tmd_horadesde:horadesdeFinal,
                            tmd_horahasta:horahastaFinal,
                            tmd_estado:view.down('#estado').getValue(),
                            tmd_iorganizacion:view.down('#organizacion').getValue()
                    	});  
                        
                        myobject.save({callback : function(record, operation) {
                                if (operation.success){
                                        
                                    
                                } else {
                                    notifyError('Hubo un error al guardar los datos');
                                }
                                
                			}
                		})
                        
                    
                    
                    if(k >= dias.length-1) {
                        var win = view.up('window');      
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        win.close();
                    }
                    })
                
                
                
            
            }})
             
             
             
    	
        }

	},
    
   

	
   
});