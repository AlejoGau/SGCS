//MIGRADO2024
Ext.define('Common.controller.AwccUsuariosByCuentaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AwccUsuarioModel', 'WUsuariosModel' ],
	views : [ 'AwccUsuariosByCuentaFormView' ],
	init : function(config) {
		// genero los eventos
		this.control({
			'awccusuariosbycuentaformview button[action="save"]' : {
				click : this.saveObject
			},
            'awccusuariosbycuentaformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'awccusuariosbycuentaformview button[action="passwordChange"]' : {
        		click : this.onPasschangeClick
			},
            
            'awccusuariosbycuentaformview' : {
                beforerender : this.initview,
                passwordchanged : this.onPasswordChanged
                             
			}
		});
	}, // cierro init
	initview : function(view) {
        var myform = view.getForm();
        
      
        
        model = this.getWUsuariosModelModel();
        var recordForm;
        if (!view.objectId || view.objectId == undefined) {
            
    		var myobject = model.create({
				nombre_mostrar  : 'NuevoUsuario'
			});
               
               view.record = myobject;
            myform.loadRecord(myobject);
            
            
		}
        else {
        
            model.load(view.objectId, {
				callback : function(record,operation) {
                    if (operation.success){                                                      
                        // seteo el registro
					    
                       
                        myform.loadRecord(record);
                    }
				},
				scope : this
			});
        }
        
     
        
	},
    
   
	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('awccusuariosbycuentaformview');
        var record = view.record;
        var win =  button.up('window');
        
        if (myform.isValid()){
           
            myform.updateRecord(record);
            myform.getRecord().save();
            view.caller.fireEvent('objectchanged',view.caller,record);
            win.close();
        } else {
           
        }
	},
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        var view = button.up('awccusuariosbycuentaformview');
        var myform = view.getForm();
		var record = myform.getRecord();
        console.log(record);
        if (record.get('Id')==0)
            record.remove();
        
        myWin.close();
    },
    
    onPasschangeClick: function(button, event, options){
        var view = button.up('awccusuariosbycuentaformview');
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
            title : getLocale('Cambio de clave'),
			closeAction : 'hide',
            caller: view,
            fieldName: 'contrasena',
            modal: true,
			width : 300,
			height : 150,
			border : false,
			items : {xtype: 'passwordformview'}
		});
		win.show();
    },
    onPasswordChanged : function(value, win) {
        
        
        
        var fieldname = win.fieldName;
        var view = win.caller;
        view.getRecord().set(fieldname, value);
        view.getForm().findField(fieldname).setValue(value);
    }
    
   
});