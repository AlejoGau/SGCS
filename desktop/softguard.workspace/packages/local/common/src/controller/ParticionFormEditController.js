//MIGRADO2024
Ext.define('Common.controller.ParticionFormEditController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardZonaModel', 'SoftguardCuentaModel' ],
    views : [ 'ParticionFormEditView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
		
            'particionesformeditview' : {
                beforerender : this.initview,
			},
            'particionesformeditview #particion' : {
                change : this.onParticionChange
            },
            'particionesformeditview button[action=cancel]': {
                click: this.onCancelClick
            },
            'particionesformeditview button[action=save]': {
                click: this.onSaveClick
            }
		});
	}, // cierro init
	initview : function(view) {
        
        //readonly
        if(view.profile <= 1) {
            view.disableForm()
            view.down('#save').hide()
        }
        var controller = this;
        var zonaModel = controller.getSoftguardZonaModelModel();
        zonaModel.load(view.record.get("Id"),{
            callback: function(record){
                var particion = view.down('#particion');
                var cuenta = view.down('#cuenta');
                view.recordSearch = view.record;
                view.record = record;
                view.loadRecord(record);
                
                view.ncuenta = record.get('zon_ccuenta');
                particion.setValue(parseInt(record.get('zon_ccodigo').substr(3,2)));
                cuenta.setValue(record.get('zon_cdealer')+'-'+record.get('zon_ccuenta'));
            }
        });


	},
    
    onParticionChange: function(field, newValue, oldValue, options){
        var view = field.up('particionesformeditview');
        var grid = view.callerView;
        var particion = field;
        var codigo = view.down('#codigo');
        
        var par = particion.getValue()
        var validador = view.down('#validador');
        var save = view.down('#save');
        if (par) {
            par = 'PAR'+Ext.String.leftPad(par.toString(),2,'0');
            
            if(Ext.util.Format.trim(view.record.get('zon_ccodigo')) != Ext.util.Format.trim(par)) {
                if (grid.getStore().find('zon_ccodigo',par) != -1 ){
                  //  notifyError('Ya existe una partición con ese número');
                    //field.markInvalid('Ya existe una partición con ese número');
                    validador.setValue(getLocale('En uso'));
                    validador.setFieldStyle('color:#ff0000');
                    save.setDisabled(true);
                } else{
                    codigo.setValue(par);
                    validador.setValue(getLocale('Libre'));
                    validador.setFieldStyle('color:#000000');
                    save.setDisabled(false);
                }
                
            } else {
                validador.setValue('');
                validador.setFieldStyle('color:#000000');
                codigo.setValue(par);
                save.setDisabled(false);
            }
            
            
        }
    },
    
    
    onSaveClick : function(button, event, options) {
         var view = button.up('particionesformeditview');
        var myform = view.getForm();
        var win =  button.up('window');
        var values = myform.getValues();
        var record = view.record;
        var cuenta = view.cuenta;
        var controller = this;
        view.down('#save').disable();        

        
        
        myform.updateRecord(record);
        record.set('zon_cdescripcion', record.get('zon_cdescripcion').toUpperCase());


        //record.modified = record.data;
        record.save({
			scope : this,
			callback : function(record, operation) {
                
                controller.getSoftguardCuentaModelModel().load(view.recordSearch.get('cue_iid'),{callback:function (rec) {
                                           
                        rec.set('cue_cnombre', record.get('zon_cdescripcion').toUpperCase());
                        rec.save({callback:function () {
                            
                            view.callerView.fireEvent('objectchange', record,view.callerView);
        		            view.up('window').close();
                        
                        }});
                        
                        
                
                }});
				
			}
		});
        
        
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
      
        myWin.close();
    }
});