Ext.define('AdministratorSearch.controller.AdministradorCopyController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AdministratorFormModel' ],
    views : [ 'AdministratorCopyView' ],

	init : function(config) {
		// genero los eventos

		this.control({

			'admincopyview button[action="create"]' : {
				click : this.saveObject
			},
            'admincopyview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'admincopyview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init

	initview : function(view) {
	},

	saveObject : function(button, event, options) {
        var view = button.up('admincopyview');
		var myform = view.getForm();
        var win =  button.up('window');
        var values = myform.getValues();
        var record = this.getAdministratorFormModelModel();
        
        if (myform.isValid()){
            Ext.Ajax.request({
              url: '/Rest/Search/UserDesktopWebCopy',
              params: {
                    nombre: values.nombre, 
                    apellido: values.apellido,
                    usuario: values.usuario,
                    idkey: view.record.get('Id')
              },
              method: 'GET',
              scope: this,
              success: function(response){
                    notify('Los datos se guardaron con éxito');
                    var json = Ext.JSON.decode(response.responseText);
                    var user = json.rows[0];
                    if (json.total > 0){
                        var id = user.Id;
                        var panel = Ext.getCmp('center');
                        var title = user.udw_usuario + '-' + user.udw_nombre + ' ' + user.udw_apellido;
                
                        // me fijo si el tab existe, si es nuevo lo creo
                        var mytab = panel.down('[title="' + title + '"]');
                		if (!mytab) {
                			var myLocation = "/a/Administrator?" +
                            "objectId=" + id + 
                            "&autocreateviewport=true";
                    						//+ "&token=" + Ext.Ajax.defaultHeaders.Authorization;
                							//+ "&token=" +this.myQueryString.token;
                
                            var newTab = Ext.create('Ext.ux.IFrame', {
                    			title : title,
                    			id : id,
                    			border : false,
                    			src : myLocation,
                    			closable : true
                    		});
                            
                            panel.add(newTab);
                            panel.setActiveTab(newTab);
                		}
                		// el existe, lo activo
                		else {
                            mytab.show();
                		}
                        win.close();
                        
                    }
                    else {
                        console.log('Error al copiar: ', json, response);
                    }
              }
            });
            
        }
	},

    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    },
    
    onDealerSelect: function(combo, records, options){
        var view = combo.up('admincopyview');
        var form = view.getForm();
        var cuenta = form.findField('cue_ncuenta');
        
        cuenta.validate();
    }
});