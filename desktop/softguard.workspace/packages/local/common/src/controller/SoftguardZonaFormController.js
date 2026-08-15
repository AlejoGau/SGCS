//MIGRADO2024
Ext.define('Common.controller.SoftguardZonaFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaLineasStore','Common.store.TablaListasEmergenciaStore', 'Common.store.TablaCodigosAlarmasStore', 'Common.store.SoftguardAlarmasRestauracionStore', 'Common.store.SoftguardZonatipoStore' ],
	models : [ 'SoftguardCodigoAlarmaModel', 'CuentaSearchModel','SoftguardZonaModel' ],
	views : [ 'SoftguardZonaFormView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
			'zonaformview button[action="save"]' : {
				click : this.saveObject
			},
            'zonaformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'zonaformview' : {
                afterrender : this.initview,
                cuentachanged: this.onCuentaChanged
			},
            'zonaformview #codigo' : {
                change : this.onCodigoChange
    		},
            'zonaformview #particion' : {
                change : this.onParticionChange
        	},
            'zonaformview #_tipo' : {
                change : this.onTipoSelect
        	},
			'zonaformview button[action="cambiarCuenta"]' : {
				click : this.onCambiarClick
			},
            'zonaformview #solitarcambio' : {
                click : this.onSolicitarCambioClick
    		}
		});
	}, // cierro init
    onSolicitarCambioClick: function(button) {
        var view =button.up('zonaformview');    
        var controller = this;
        var RecordModificado = view.getForm().getRecord().copy()        
        view.getForm().updateRecord(RecordModificado);
        var RecordOriginal = view.getForm().getRecord()
        var method = 'PUT'
        var altPath = '/Rest/Zona/'+view.getForm().getRecord().get('Id')
        if(view.getForm().getRecord().get('Id') == 0) {
            method = 'POST'
            altPath = '/Rest/Zona/'
        }
        
        Ext.Ajax.request({
            url: '/handler/SearchPost?search=SolicitudModificacionesUpdOIns',
            method : 'POST',
            params: {
                pom_usuariopedido: _UserData.udw_idKey ,
                pom_fechapedido: new Date(),
                pom_idtipoobjeto: view.getForm().getRecord().get('ObjectTypeId'),
                pom_idobjeto: view.getForm().getRecord().get('Id'),
                pom_sinmodificar: Ext.encode(RecordOriginal),
                pom_modificado: Ext.encode(RecordModificado) ,
                pom_estado: 0,
                pom_log: {},
                pom_usuarioultcambio:-1,
                pom_cueiid: view.record.get('zon_iidcuenta'),
                pom_metadata:Ext.encode({
                    form: {
                        alias: view.xtype,
                        title: getLocale('Zona')
                    },
                    altPath:altPath,
                    method:method
                })
            },
            scope: this,
            success: function(response){
            var errors = Ext.JSON.decode(response.responseText);
            notify("La solicitud fue realizada")
            }
        })
        
        view.up('window').close()
    },
	initview : function(view) {
        //readonly
        if(view.profile <= 1) {
            view.disableForm()
            view.down('#save').hide()
        }
        
        var controller = this;

        var form = view.getForm();
        var record = view.record;
        var zonaModel = controller.getSoftguardZonaModelModel();
        if(record.get("Id")>0){
            zonaModel.load(record.get("Id"),{
                callback: function(record){
                    view.record = record;
                    var codigo = view.down('#codigo');

                    if(view.idCuenta) {
                        record.set('zon_iidcuenta',view.idCuenta);
                    }
                    
                    if(view.profile > 2) {
                        if (view.down('#autoprocesar')){
                            view.down('#autoprocesar').show();
                        }
                        if (view.down('#mostrarfoto')){
                            view.down('#mostrarfoto').show();
                        }
                    }
                    if (view.profile == 4){
                        view.down('#save').hide();
                        view.down('#solitarcambio').show()
                    } 
                    view.loadRecord(record);
                    form.findField('nombreCuenta').setValue(record.get('zon_cdealer') + '-' + record.get('zon_ccuenta'));
            
                    if (!record.get('zon_ccodigo')){
                        controller.onCodigoChange(codigo, '','');
                    }
                    var tipo = view.down('#_tipo');
                    var zon_ccodigo = codigo.getValue().trim();
                    if (zon_ccodigo == 'MAP' || zon_ccodigo == 'FWD' || zon_ccodigo == 'LOC'|| zon_ccodigo == 'LNK')
                        tipo.setValue(zon_ccodigo);
            
                }
            });
        }
        view.down('#_tipo').bindStore(controller.getSoftguardZonatipoStoreStore());
        view.down('#listaEmergencia').bindStore(controller.getTablaListasEmergenciaStoreStore());
        view.down('#dealer').bindStore(controller.getTablaLineasStoreStore());        
                   
	},
	saveObject : function(button, event, options) {
        var view = button.up('zonaformview');
        var controller = this;
		var myform = view.getForm();
		var record = view.record;
        var codigo = view.down('#codigo');
        var particion = view.down('#particion');
        var tipo = view.down('#_tipo');
        var cod = codigo.getValue()//.substr(0,3).toUpperCase();
        var win =  button.up('window');
        

        /*if(isNaN(record.id)){
            record.id = 0;
            record.data.Id = 0;
        }*/

        myform.updateRecord(record);

        //record.modified = record.data;
        // verifico que map tenga los datos completos
        if(cod.includes("MAP")) {
            var _cuenta = record.get('zon_ccuenta');
            var _dealer = record.get('zon_cdealer');
            if (_cuenta=='' || _dealer==''){
                var field = view.down('#dealer');
                field.markInvalid(getLocale("Debe seleccionar una cuenta y un dealer"));
                notifyError('Debe seleccionar una cuenta y un dealer');
                return;
            }
            
        }
      
        if (myform.isValid()){
            view.down('#save').disable();           
            var mystore =Ext.create('Ext.data.Store',{
                    model: 'Common.model.ZonaSearchModel',
                    remoteFilter: true,
                    pageSize: 250,
                    remoteSort: true,
                    sorters:{
                            property: 'zon_ccodigo',
                            direction: 'ASC'
                        },
                    filters: [
                        {
                            property: 'zon_ccodigo',
                            value: record.get('zon_ccodigo')
                        },
                        {
                            property: 'zon_iidcuenta',
                            value: record.get('zon_iidcuenta')
                        }
                    ]
                });
                mystore.load({callback: function(records){
                    if(records) {
                        if (records.length>0 && record.get('Id') != 0 && records[0].get('Id')!=record.get('Id')){
                            field.markInvalid(getLocale("El código de zona existe para la cuenta."))
                        } else {
                                        
                            view.fireEvent('objectchanged',record);
                            var zonaModel = controller.getSoftguardZonaModelModel();
                            record.modified = record.data;

                            record.save({callback:function() {
                                view.caller.fireEvent('refresh',view.caller,record);
                            }});
                            if(view.relacionado == false) {
                                view.caller.up('particioneschooserview').down('multicuentazonasgridview').particionesStore.reload();                            
                            }
                            
                            win.close();   
                        }
                    }
                    mystore.destroy();                
                }
            });
        }
    },
	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('zonaformview');
		mymodel.destroy({
					scope : this.application
				});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close();
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        var view = button.up('zonaformview');
    	var myform = view.getForm();
		var record = view.record;
        
        if(view.relacionado != false) {
            if (record.get('Id')==0 && record.store)
                record.store.remove(record);
        }
        //record.destroy();
        myWin.close();
    },
    
    onParticionChange: function(field, newValue, oldValue, options){
        var view = field.up('zonaformview');
        var particion = field;
        var codigo = view.down('#codigo');
        
        var par = particion.getValue()
        
        if (par) {
            par = Ext.String.leftPad(par.toString(),4,'0');
            //para prevenir el evento change del campo codigo
            view.noChangeCodigo = true;
            codigo.setValue('LNK' + par);
        }
    },
    onCodigoChange: function(field, newValue, oldValue, options){
        var cod = newValue;//.substr(0,3).toUpperCase();
        var view = field.up('zonaformview');
        var normal = view.down('#normal');
        var especial = view.down('#especial');
        var foto = view.down('#mostrarfoto');
        var dealerBox = view.down('#dealerBox');
        var particion = view.down('#particion');
        var codigo = view.down('#codigo');
        var tipo = view.down('#_tipo');
        var dealer = view.down('#dealer');
        var cuenta = view.down('#cuenta');
        var cuentaNombre = view.down('#cuentaNombre');
        var dealer = view.down('#dealer');
        var codigoAlarma =  view.down('#codigoAlarma');
        var minutosRestauracion = view.down('#minutosRestauracion');
        var listaEmergencia = view.down('#listaEmergencia');
        var codigoRestauracion = view.down('#codigoRestauracion');
        
        if(view.noChangeCodigo == true) {
            view.noChangeCodigo = false;
            return false;
        }
             
        if (newValue!=='')
            field.setValue(newValue);//.toUpperCase()
        
        
        if(cod.includes("PAR")) {
            notifyError('Utilice la paleta particiones');
            field.setValue('');
        } else if(cod.includes("LNK")) {
            codigo.show();
            particion.show();
            normal.hide();
            especial.show();
            foto?(foto.show()):null;
            dealerBox.show();
           // tipo.select(cod);
            
            codigoAlarma.setValue('');
            minutosRestauracion.setValue('');
            listaEmergencia.setValue('');
            codigoRestauracion.setValue('');
            //particion.setValue('');
            
        } else if(cod.includes("LOC")) {
            codigo.hide();
            particion.hide();
            normal.hide();
            especial.hide();
            foto?(foto.hide()):null;
            dealerBox.show();
            tipo.select(cod);
            
            codigoAlarma.setValue('');
            minutosRestauracion.setValue('');
            listaEmergencia.setValue('');
            codigoRestauracion.setValue('');
            particion.setValue('');
            
        } else if(cod.includes("FWD")) {
            codigo.hide();
            particion.hide();
            normal.hide();
            dealerBox.show();
            foto?(foto.hide()):null;
            tipo.select(cod);
            
            codigoAlarma.setValue('');
            minutosRestauracion.setValue('');
            listaEmergencia.setValue('');
            codigoRestauracion.setValue('');
            particion.setValue('');
            
        } else if(cod.includes("MAP")) {
            codigo.hide();
            particion.hide();
            normal.hide();
            dealerBox.show();
            especial.hide();
            foto?(foto.hide()):null;
            tipo.select(cod);
            
            codigoAlarma.setValue('');
            minutosRestauracion.setValue('');
            listaEmergencia.setValue('');
            codigoRestauracion.setValue('');
            particion.setValue('');
        } else {
            codigo.show();
            particion.hide();
            normal.show();
            dealerBox.hide();
            if (especial){
                especial.show();
            }
            
            foto?(foto.show()):null;
            tipo.select('Normal');
            
            particion.setValue('');
            dealer.setValue('');
            cuentaNombre.setValue('-');
            cuenta.setValue('');
        }
        this.hideComponents(view);
    },
    
    onTipoSelect: function(combo, records, options){
        var view = combo.up('zonaformview');
        var codigo = view.down('#codigo');
        var cod = codigo.getValue();//.substr(0,3).toUpperCase();
        
        var value = combo.getValue();
      
        if (value !=cod && value!= 'Normal' && value){
            codigo.setValue(value);
        }else if(value == 'Normal')
        {
            this.onCodigoChange(codigo, '','');
        }
    },
    
    onCambiarClick : function(button, event, options) {
        var view =button.up('zonaformview');
        var form = view.getForm();
        var zon_cdealer = form.findField('zon_cdealer').getValue();
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
                    selectionEvent: 'cuentachanged',
                    filter: [
                        {
                            property: 'cue_clinea',
                            value: zon_cdealer
                        }
                    ]
                }
            ]
		});
		win.show();
	},
    
    onCuentaChanged: function(record, view){
        var form = view.getForm();
        
        form.findField('nombreCuenta').setValue(
            record.get('cue_clinea') + '-' + 
            record.get('cue_ncuenta') + ' ' +
            record.get('cue_cnombre')
        );
        form.findField('zon_ccuenta').setValue(record.get('cue_ncuenta'));
        
        view.cuenta = record;
    },
    hideComponents: function(view){
        if (view.hideComponents){
            Ext.Array.each(view.hideComponents, function(comp){
                var _comp = view.down(comp);
                if (_comp){
                    _comp.hide();
                    _comp.disable();
                }
            })
        }
    }
    
});