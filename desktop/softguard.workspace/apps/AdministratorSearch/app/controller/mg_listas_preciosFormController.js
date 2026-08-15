Ext.define('AdministratorSearch.controller.mg_listas_preciosFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_monedasSearchModel' ],
    views : [ 'mg_listas_preciosFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				'mg_listas_preciosformview' : {
						beforerender : this.initview,
                        organizationchanged : this.onOrganizationChanged,
					},
					'mg_listas_preciosformview button[action="save"]' : {
						click : this.onSaveClick
					},
            		'mg_listas_preciosformview #mglp_tipo' : {
        				change : this.onChangeTipoClick
        			},
                    'mg_listas_preciosformview button[action="organizationChange"]' : {
            			click : this.onOrganizationChangeClick
        			},
        });
	}, // cierro init
    
    
    
    onOrganizationChanged : function(record, view) {
        if(record) {
            view.record.set('mglp_idorganizacion', record.get('Id'));
            view.getForm().findField('_organization').setValue(record.get('Name'));
        } 
       
    },
    
    
    onOrganizationChangeClick: function(button, event, options){
        var view = button.up('mg_listas_preciosformview');
        var controller = this;
        var filter = [];
       
                
         var win = Ext.create('Ext.Window', {
                layout : 'fit',
                title : 'Seleccione una entidad',
        		closeAction : 'destroy',
                caller: view,
                modal: true,
    			width : 600,
    			height : 400,
    			border : false,
    			items : {
                    xtype: 'organizationhelperview',
                    title: '',
                    forceStatus: '7,8,9',
                    hideTaxo: true,
                    caller: view,
                    filter:filter
    			}
    		});
    		win.show();
        
        
    },
    
    
    onChangeTipoClick: function (combo) {
            var view = combo.up('mg_listas_preciosformview');
            if(combo.getValue() == 1) {
                view.down('#mglp_multiplicador').hide()               
            } else {
                view.down('#mglp_multiplicador').show()
            }
    },

	initview : function(view) {
        
        view.loadRecord(view.record);
        
       
        view.down('#moneda').setValue(view.record.get('mglp_currency'))
        view.getForm().findField('_organization').setValue(view.record.get('nombreOrganizacion'));
      
	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('mg_listas_preciosformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
      
        if (myform.isValid()){

            if(view.down('#moneda').getValue() == '') {
                notify('Debe seleccionar una moneda')
                return false;
            }
            
            record.set('mglp_currency',view.down('#moneda').getValue())

    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('refresh',view.caller,record);
                        win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }

	},
    
   

	
   
});