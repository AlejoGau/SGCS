Ext.define('AdministratorSearch.controller.TablasTagsAgFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'CuentaStore' ],
    models : [ 'TablasTagsAgModel', 'CuentaSearchModel', 'SoftguardCuentaModel' ],
    views : [ 'TablasTagsAgFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					'tablastagsagformview' : {
						beforerender : this.initview,
                        cuentachanged: this.onCuentaChanged
					},
					'tablastagsagformview button[action="save"]' : {
						click : this.onSaveClick
					},
        			'tablastagsagformview button[action="cambiarCuenta"]' : {
						click : this.onCambiarCuentaClick
					}
    				
                });
	}, // cierro init

	initview : function(view) {
        
        
        if (view.record){
            view.loadRecord(view.record);
        } else {
            this.loadRecord(view.objectId,view);
        }
        
        
        
	
	},
    
    loadRecord: function(objectId,view){
        record = this.getTablasTagsAgModelModel();
        var controller = this;
        if (objectId == 0) {    
            var now = new Date();
            var myobject = record.create({
        		'tag_ccodigo' : 0
			});            
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    				view.record = record;
				    view.loadRecord(record);
    			}
			});
		} else {            
		    record.load(objectId, {
				callback : function(record,operation) {
                    if (operation.success){
                        view.record = record;
					    view.loadRecord(record);
                        
                        var idCuenta = record.get('tag_iCuenta');
                        if(idCuenta !=0) {
                            var cuenta = controller.getSoftguardCuentaModelModel().load(idCuenta, {callback: function (recordx, operation) {
                                if (operation.success){
                                    var form = view.getForm();
                                    form.findField('_cuenta').setValue(recordx.get('cue_clinea')+'-'+recordx.get('cue_ncuenta'));
                                    form.findField('_nombre').setValue(recordx.get('cue_cnombre'));
                                    form.findField('tag_iCuenta').setValue(recordx.get('cue_iid'));
                                }
                                
                            }});
                        }
                        
                    }
				},
				scope : this
			});
            
            
            
            
        }
    },    


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablastagsagformview');
        var win = button.up('window');
		var record = myform.getRecord();

        
        
		myform.updateRecord(record);
        
       // record.set('tag_iCuenta',view.record.get('tag_iCuenta'));
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

	},
    
    onCambiarCuentaClick : function(button, event, options) {
        var view =button.up('tablastagsagformview');
        
        var win = Ext.create('Ext.Window', {
    		layout: 'fit',
			title : 'Seleccione una Cuenta',
			closeAction : 'hide',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view: view,
			items : [
                {
                    caller: view,
                    xtype: 'cuentahelperview',
                    selectionEvent:'cuentachanged'
                }
            ]
		});
		win.show();
	},
    
    onCuentaChanged: function(record, view){
        var form = view.getForm();
        form.findField('_cuenta').setValue(record.get('cue_clinea')+'-'+record.get('cue_ncuenta'));
        form.findField('_nombre').setValue(record.get('cue_cnombre'));
        form.findField('tag_iCuenta').setValue(record.get('cue_iid'));
          
        view.record.set('tag_iCuenta',record.get('cue_iid'));
        view.cuenta = record;
    }
    
   

	
   
});