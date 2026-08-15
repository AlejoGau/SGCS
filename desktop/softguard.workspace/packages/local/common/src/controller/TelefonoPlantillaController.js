//MIGRADO2024
Ext.define('Common.controller.TelefonoPlantillaController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TelefonoPlantillaModel' ],
	views : [ 'TelefonoPlantillaView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
			'telefonoplantillaview button[action="create"]' : {
				click : this.saveObject
			},
            'telefonoplantillaview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'telefonoplantillaview' : {
                beforerender : this.initView
			},
            'telefonoplantillaview #dealer' : {
                select : this.onDealerSelect
    		}
		});
	}, // cierro init
    initView : function(view) {
        //var record = view.up('zonaformview').record;
        //view.record = record;
        var store =Ext.create('Ext.data.Store',{
            model: this.getTelefonoPlantillaModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        })
        store.load({view:view,store:store,callback: this.doBindStore});
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            var view = operation.view;
            var store = operation.store;
            view.down('#plantillasCombo').bindStore(store);
        }
    },
	saveObject : function(button, event, options) {
        var view = button.up('cuentanewview');
		var myform = view.getForm();
		var record = view.record;
        var win =  button.up('window');
        
        if (myform.isValid()){
            myform.updateRecord(record);
            
            record.set('cue_ncuenta', Ext.String.leftPad(record.get('cue_ncuenta'),4,'0'));
            record.set('cue_cnombre', record.get('cue_cnombre').toUpperCase());
            record.save({
                win: win,
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var view = operation.view;
                        var win = operation.win;
                        view.fireEvent('objectcreated',view);
                        notify('Los datos se guardaron con éxito');
                        win.close();
                    }
                    else{
                        console.log(operation);
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
        var view = combo.up('cuentanewview');
        var form = view.getForm();
        var cuenta = form.findField('cue_ncuenta');
        
        cuenta.validate();
    }
});