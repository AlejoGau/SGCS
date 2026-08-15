Ext.define('Administrator.controller.RangeFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'RangeFormView' ],

	init : function(config) {
		// this.initConfig(config);
		// genero los eventos

		this.control({

			'rangeformview button[action="save"]' : {
				click : this.saveObject
			},
            'rangeformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'rangeformview' : {
                afterrender : this.initview
    		}
		});
	}, // cierro init

	initview : function(view) {
        var form = view.getForm();
        var combo = view.down('#comboModulo');
        var record = view.record;
        var t = this;
        form.loadRecord(record);
        
	},

	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var form = button.up('form').getForm();
		var model = form.getRecord();
        var view = button.up('rangeformview');
        var win =  button.up('window');
        var controller = this;
        var linea = view.down('#linea').getValue();
        win.module = model;

        if (form.isValid()){
    		form.updateRecord(model);
            model.set('dwm_cuenta_desde',Ext.String.leftPad(model.get('dwm_cuenta_desde'),4,'0').toUpperCase());
            model.set('dwm_cuenta_hasta',Ext.String.leftPad(model.get('dwm_cuenta_hasta'),4,'0').toUpperCase());
            
            //verifico desde
            controller.validateRange (linea, model.get('dwm_cuenta_desde'), view.down('#cuenta_desde'), function () {                
                //verifico hasta
                controller.validateRange (linea, model.get('dwm_cuenta_hasta'), view.down('#cuenta_hasta'), function () {
                        //guardo
                        model.save({callback: function(){
                            view.grid.fireEvent('objectchanged',{win: win,view: view.grid,create:true, module: model});
                            win.close();
                        }})
            
            
                 })
            
            })
            
            
        };

	},
    
    validateRange: function(linea, cuenta,field, callback){
        Ext.Ajax.request({
          url: '/Rest/Search/CuentaByDealerValidate',
          params: { linea: linea, cuenta: cuenta, verificarCuenta: 0},
          method: 'GET',
          scope: this,
          success: function(response){
            var errors = Ext.JSON.decode(response.responseText);
            field.clearInvalid();
    		field.textValid = true;
            
            if (errors.total){
               field.markInvalid('Esta fuera de rango');
               field.textValid = false;								
            } else {
                callback();
            }    
          
          }
        });
    },
    
    onCancelClick: function(button, event, options){
        Win = button.up('window');
        Win.close();
    }
});