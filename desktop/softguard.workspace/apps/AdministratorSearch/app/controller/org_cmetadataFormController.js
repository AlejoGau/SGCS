Ext.define('AdministratorSearch.controller.org_cmetadataFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'org_cmetadataFormView' ],

    init : function(config) {
        // genero los eventos

    this.control({
		'orgcmetadataformview' : {
			beforerender : this.initview
		},
		'orgcmetadataformview button[action="save"]' : {
			click : this.onSaveClick
		}
		
    });
	}, // cierro init

	initview : function(view) {
        var record = view.record;

        // me fijo si tiene afip
        if (record.get('org_factelect')=='AfipCae'){
            view.down('#AfipCae').show();
        } else{
            view.down('#AfipCae').hide();
        }

        // cargo los campos con los valores de la metadata
        if(record.get('org_cmetadata') != '') {
             var values = Ext.JSON.decode(record.get('org_cmetadata'));
             
             for(var key in values) {
                 if(values.hasOwnProperty(key) && key!='undefined') {
                     if(view.down('[name="'+key+'"]')) {
                        view.down('[name="'+key+'"]').setValue(values[key])
                     }
                 }
             }
             
        }
        
        // me fijo si el cuit esta vacio y lo lleno con el valor del campo
        if (view.down('[name="Cuit"]').getValue() == ''){
            view.down('[name="Cuit"]').setValue(record.get('org_cidentificacion'));
        }
	},

	onSaveClick : function(button, event, options) {
        // grabo los valores de la metadata en el campo
        var view = button.up('orgcmetadataformview');
        var configs = view.getForm().getFields().items;
        var record = view.record;
        
        // Start with existing metadata to preserve nested keys (e.g. factura)
        var values = {};
        try {
            var existing = record.get('org_cmetadata');
            if (existing) {
                values = Ext.JSON.decode(existing);
            }
        } catch(e) {
            values = {};
        }

        // Update with form field values
        Ext.Array.each(configs, function (field) {  
            if (field.name!='undefined'){
                values[field.name] = field.value
            }
        })
        
        record.set('org_cmetadata', Ext.encode(values))            

        record.save({
    		scope : this,
           
            view: view,
			callback : function(record, operation) {
                if (operation.success){
                    var win = view.up('window');           
                    notify('Los datos se guardaron correctamente');
                    //view.caller.fireEvent('objectchanged',view.caller,record);
                    win.close();
                } else {
                    notifyError('Hubo un error al guardar los datos');
                }
			},
			button : button
		});
	}
});