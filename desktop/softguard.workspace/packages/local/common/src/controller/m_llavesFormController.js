//MIGRADO2024
Ext.define('Common.controller.m_llavesFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_llavesModel' ],
    views : [ 'm_llavesFormView' ],
    init : function(config) {
		// genero los eventos
		this.control({
            'm_llavesformview button[action=save]' : {
                click : this.onSaveClick
            },
            'm_llavesformview' : {
                beforerender : this.initview
            },
            'm_llavesformview button[action=delete]' : {
                click : this.onDeleteClick
            }
        });
	}, // cierro init
    
    initview : function(view) {
        var cuenta = view.recordCuenta;
        var module = view.module;
        var profile = 3;//module.get('profile');
        view.profile = profile;
        var record = view.record;
        view.cuenta = cuenta;
        //var modules = this.getSecurityModulesStoreStore();
        var controller = this;
        if (record.get('Id')>0){
            var modelLlaves = controller.getM_llavesModelModel();
            modelLlaves.load(record.get('Id'), {
                callback: function (rec) {
                    view.record = rec;
                    view.loadRecord(rec);
                }
            });
            
        }else{
            view.loadRecord(record);
        }


	},
    onDeleteClick: function(button, event, options) {
        var view = button.up('m_llavesformview');
        var win = button.up('window');

        var record = view.record;
        record.erase(
            {
                callback: function() {
                    notify('La llave se eliminó con éxito');
                    win.close();
                }
            }
        );

	},
	onSaveClick : function(button, event, options) {
        var view = button.up('m_llavesformview');
		var record = view.record;
        
        view.updateRecord(record);

        
        record.save({
            controller: this,
            view: view,
            failure : function(record,operation) {
                console.log(arguments)
            },// cierro function
            success : function(record,operation) {
                var controller = operation.controller;
                notify('Los cambios se guardaron con éxito');
            }// cierro function
        });// cierro save
	}
});