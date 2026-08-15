Ext.define('Trackguard.controller.DispositivoMovilNewController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleModel' ],
	views : [ 'DispositivoMovilNewView' ],

	init : function(config) {
		// genero los eventos

		this.control({

			'dispositivomovilnew button[action="create"]' : {
				click : this.saveObject
			},
            'dispositivomovilnew button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'dispositivomovilnew' : {
                beforerender : this.initview,
                cuentachanged: this.onCuentaChanged
			},
			'dispositivomovilnew button[action="select"]' : {
				click : this.onCambiarClick
			}
		});
	}, // cierro init

	initview : function(view) {
        var form = view.getForm();
        
        var record = this.getVehicleModelModel().create({
            Name: getLocale('Nuevo Dispositivo Movil')
        });
        view.record = record;
        form.loadRecord(record);
	},

	saveObject : function(button, event, options) {
        var view = button.up('dispositivomovilnew');
		var myform = view.getForm();
		var record = view.record;
        var win =  button.up('window');
        var caller = view.caller;
        
        if (myform.isValid() && view.record.get('OwnerId')){
            myform.updateRecord(record);
            
            
            
            record.set('OwnerId',view.record.get('OwnerId'));
            record.save({
                win: win,
                view: caller,
    			callback : function(record, operation) {
                    if (operation.success){
                        var view = operation.view;
                        var win = operation.win;
                        view.fireEvent('objectcreated',view, record);
                        win.close();
                    }
                    else{
                        console.log(operation);
                    }
    			}
    		});
            
        } else {
            notifyError('Debe proporcionar datos válidos');
        }
	},

    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    },
    
    onCambiarClick : function(button, event, options) {
        var view =button.up('dispositivomovilnew');
        
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
                    xtype: 'cuentahelperview',
                    caller: view,
                    filter: [
                        {
                            property : 'tip_nCondicion',
                            value: '1',
                            id: 'tip_nCondicion'
                        }
                    ]
                }
            ]
		});
		win.show();
	},
    
    onCuentaChanged: function(record, view){
        console.log(arguments);            
        var form = view.getForm();
        
        var ncuenta = record.get("Id");
        var dealer = record.get("cue_clinea");
        var ccuenta = record.get("cue_ncuenta");
        var cnombre = record.get("cue_cnombre");
        
        view.record.set('OwnerId',ncuenta);
        view.record.set('cue_cnombre',cnombre);
        form.findField('OwnerId').setValue(ncuenta);
        form.findField('_cuenta').setValue(dealer+'-'+ccuenta+' '+cnombre);
        
    }
});