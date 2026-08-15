
Ext.define('GestorSim.controller.ComandosGpsConfigController', {
    extend: 'Ext.app.Controller',
    stores: ['TablasModemsSmsStore', 'TgeEquiposStore'],
    models: ['PanelModel', 'ReceptoresSearchModel', 'PoiFileSearchModel', 'PanelSearchModel', 'ComandosDispositivoModel' , 'ComandosDispositivoSearchModel', 'ComandoGpsConfigModel', 'TgeEquipoSearchModel', 'ComandosGpsSearchModel','PanelCommandSearchModel'],
    views: ['SmsModemCombo', 'ComandosGpsConfigView', 'ComandoGpsConfigView'],

    init: function (config) {
        this.control({
            'comandosgpsconfigview': {
                afterrender: this.initview,
                enviarcomando: this.onEnviarComando
            },
            'comandosgpsconfigview button[action="save"]': {
                click: this.onSaveClick
            },
            'comandosgpsconfigview button[action="comandoDelete"]': {
                click: this.onComandoDeleteClick
            },
            'comandosgpsconfigview button[action="add"]': {
                click: this.onComandoAddClick
            },
            'comandosgpsconfigview #CmdGrid': {
                select: this.onComandoSelect,
                itemdblclick: this.onItemDblClick
            },
            'comandosgpsconfigview #comboequipos': {
                change: this.onEquipoChange
            },
            'flotagpsview': {
                vehicleSelected: this.onVehicleSelected
            }
        });
    }, // cierro init

    initview: function (view) {
        // cargo el record en los formularios
        var me = this;
        var nameModule = me.application._nameModule;
        if (!view.record) {
            datapanel = view.up('#datapanel');
            if (datapanel)
                view.record = datapanel.record;
        }
        var vehicle = view.record;
        var idcuenta = vehicle.get('sim_cuenta');
        var controller = this;

        var receptores = Ext.create('Ext.data.Store', {
            model: this.getReceptoresSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: [/*{
                property : "rec_iesirs",
                value : 1
            },*/{
                    property: "_tienecomandos",
                    value: 1
                }],
            sorters: [{
                property: 'rec_cdescripcion', direction: 'ASC'
            }]
        })

        view.down('#comboequipos').bindStore(receptores);
        receptores.load({
            callback: function (records, operation, success) {
                console.log("%0 %1  %2", records, operation, success);
            }
        });

        // me fijo si es una cuenta fija
        //if (vehicle.get('ObjectTypeId') && vehicle.get('ObjectTypeId') == 3001){

        /************************** */
        var grid = view.down('#CmdGrid');
        var store = Ext.create('Ext.data.Store', {
            model: controller.getComandoGpsConfigModelModel()
        });
        grid.bindStore(store);

        /************** **************/ 

        var equipoStore = Ext.create('Ext.data.Store', {
            model: this.getPanelSearchModelModel(),
            pageSize: 1,
            limit: 1,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'pan_iidcuenta',
                    value: idcuenta
                }
            ]
        })



        equipoStore.load({

            callback: function (records, operation, success) {
                if (success && records.length > 0) {
                        controller.setRecord(records[0], view, controller);

                        var panelCommandStore = Ext.create('Ext.data.Store', {
                            model: controller.getPanelCommandSearchModelModel(),
                
                            remoteSort: true,
                            remoteFilter: true,
                            filters: [
                                {
                                    //idequipo = record.get('pan_ireceptor');
                                    //idmodelo = record.get('pan_rpmidkey');
                                    property: 'pan_iidcuenta',
                                    value: idcuenta
                                },{
                                    property: 'tcm_iReceptor', //id de equipo
                                    value: records[0].get('pan_ireceptor')
                                },{
                                    property: 'tcm_rpmidKey',
                                    value: records[0].get('pan_rpmidkey')//id de modelo
                                }
                            ]
                        });
                        
                        panelCommandStore.load({
                            params: {
                                start: 0,
                                limit: 1000
                            },                    
                            callback: function (records, operation, success) {
                                if (success && records.length > 0) {
                                    for (var i=0 ; i<records.length; i++){
                                        controller.loadComandosAutomaticos(records[i], view);
                                    }
                                }
                        
                            }
                        });
        

                }
                else {
                    var model = controller.getComandosDispositivoModelModel();
                    var equipo = Ext.create(model, {
                        idCuenta: idcuenta
                    });
                    controller.setRecord(equipo, view, controller);
                }
                /*var task = new Ext.util.DelayedTask(function(){
                        
                });
                task.delay(100); */               

            }
        });





        


        if (nameModule == "Webremoto") {
            view.down("#acciones").show();
        }
    },

    onVehicleSelected: function (record, flotagpsview) {
        var dataPanel = flotagpsview.down('#datapanel');
        if (dataPanel)
            var view = dataPanel.down('comandosgpsconfigview');

        if (view)
            this.setRecord(record, view, this);
    },

    setRecord: function (record, view, controller) {
        var idequipo = record.get('idEquipo');
        var idmodelo, idNvoModelo;
        view.panel = record;

        idequipo = record.get('pan_ireceptor');
        idmodelo = record.get('pan_rpmidkey');

        /**
         * BC 384713978 : Agrego un nuevo parametro al SP que filtra en base al modelo del Panel de la Cuenta, aquellos comandos con el
         * mismo marca / modelo, no se muestran aquellos que no cumplan esta condición.
         * 
         */
        idNvoModelo = record.get('pan_iModelo');

        if (idequipo == 0) {
            idequipo = null;
            idmodelo = null;
            idNvoModelo = null;
        }
        view.idequipo = idequipo;

        view.comandosStore = Ext.create('Ext.data.Store', {
            model: controller.getComandosGpsSearchModelModel()
        });

        view.down('#comboequipos').setValue(idequipo);

        if (idequipo) {
            // cargo los comandos del equipo (maestro)
            view.comandosStore.load({
                params: { Id: idequipo, idmodelo: idmodelo, idNvoModelo: idNvoModelo },
                callback: function (records) {
                    controller.loadVehicleCommands(record, view, controller);
                    view.comandosStore.add({ tcm_iid: null, tcm_cdescripcion: getLocale('Seleccione un comando') });
                    if (records.length <= 0) {
                        // Leo me pido volver al notify
                        notify('El equipos no tiene integrado el envío de comandos.')
                        view.getEl().mask();
                    }
                }
            });
        } else {
            controller.loadVehicleCommands(record, view, controller)
        }
    },

    loadComandosAutomaticos: function (record, view){
        var grid = view.down('#CmdGrid');
        var store = grid.getStore();
        var tcm_cValores = eval(record.get('tcm_cValores'));
        var fieldsStr = '{';
        var esAut=false
        Ext.Array.each(tcm_cValores, function (field) {
            if (!field._AtSend) {
                if(field.name=='_AutotFill'){
                    if (field.value==true)
                        esAut = true;
                }
                if(fieldsStr!='{')
                    fieldsStr+=',';
                fieldsStr+='"'+field.name+'" : "'+field.value+'"';
            }
        });  
        fieldsStr+='}';
        if(esAut)      
            store.add({
                Tipo: record.get('tcm_iid'),
                Name: record.get('tcm_cdescripcion'),
                Config: fieldsStr,
                cComando:'No guardar',
                Modem: record.get('pan_cModemSMS')

            });
        
    },

    loadVehicleCommands: function (record, view, controller) {
        //Cargo los comandos existentes (ya configurados)
        
        /* Volver atrás
        var grid = view.down('#CmdGrid');
        var store = Ext.create('Ext.data.Store', {
            model: controller.getComandoGpsConfigModelModel()
        });
        */
        var grid = view.down('#CmdGrid');
        var store = grid.getStore();


        if (record.get('Config')) {
            store.loadData(Ext.JSON.decode(record.get('Config')));
        }
        else if (record.get('pan_cconfig')) {
            view.pan_cconfig = Ext.JSON.decode(record.get('pan_cconfig'));
            if (view.pan_cconfig.commands) {
                //store.loadData(view.pan_cconfig.commands);
                for (var i = 0 ; i < view.pan_cconfig.commands.length; i++){
                    store.add(view.pan_cconfig.commands[i]);
                }
            } else {
                //store.loadData(view.pan_cconfig);
                for (var i = 0 ; i < view.pan_cconfig.length; i++){
                    store.add(view.pan_cconfig[i]);
                }
            }
        }

        view.equipo = record;
        view.loadRecord(record);
        if (record.get('idEquipo') == 0) {
            view.down('#comboequipos').setValue(null);
        }
    },

    setEquipo: function (view, idequipo, controller) {
        //Si el equipo no esta seleccionado en el combo, lo selecciono

        //Si el equipo es diferente en el record lo seteo

        //borro los comandos?

        // cargo los comandos del equipo (maestro)
        if (view.idequipo != idequipo) {
            view.comandosStore.load({
                params: { Id: idequipo }
            });
        }

    },

    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var view = grid.up('comandosgpsconfigview');
        var controller = this;

        if (controller.application._nameModule == "Webremoto") {
            return false;
        }
        /*Federico V. No entiendo la logica de que le iguale el id a 0 ya que impide volver a abrir el item que se abrio previamente
        if(isNaN(record.id)){
            record.id = 0;
        }
        */
        Ext.create('Ext.window.Window', {
            title: record.get('Name'),
            height: 300,
            width: 400,
            translate: false,
            closeAction: 'destroy',
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'comandogpsconfigview',
                record: record,
                equipo: view.equipo,
                comandosStore: view.comandosStore
            }
        }).show();
    },

    onComandoAddClick: function (button, event, options) {
        var view = button.up('comandosgpsconfigview');
        var grid = button.up('grid');
        var store = grid.getStore();
        view.equipo.set("pan_iidcuenta", view.record.get("sim_cuenta"));
        if (view.getForm().isValid()) {
            var command = store.add({ Name: getLocale('Nuevo Comando') + ' (' + store.count() + ')', Tipo: null });
            Ext.create('Ext.window.Window', {
                title: getLocale('Nuevo Comando'),
                height: 300,
                closeAction: 'destroy',
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'comandogpsconfigview',
                    record: command[0],
                    equipo: view.equipo,
                    comandosStore: view.comandosStore
                }
            }).show();
        } else {
            notifyError('Debe seleccionar un Equipo');
        }
    },

    onComandoDeleteClick: function (button, event, options) {
        var grid = button.up('grid');
        var record = grid.getSelectionModel().selected.items[0];        
        if(record.get('cComando')!=''){
            notifyError('No se puede modificar un comando automático');
            return;
        }        


        record.store.remove(record);
    },

    onComandoSelect: function (selModel, record, index) {
        var gridView = selModel.view;
        var grid = gridView.up('grid');
        var button = grid.down('#comandodelete');

        button.enable();
    },

    onEquipoChange: function (combo, newvalue, oldvalue) {
        var view = combo.up('comandosgpsconfigview');
        this.setEquipo(view, newvalue, this)
    },

    onEnviarComando: function (record, view) {
        var comboEquipoText = view.down('#comboequipos').getRawValue();

        var profile = view.module.profile ? view.module.profile : view.module.get('profile');

        Ext.create('Ext.window.Window', {
            title: getLocale('Enviar comando') + ': ' + record.get('Name'),
            height: 300,
            translate: false,
            closeAction: 'destroy',
            width: 400,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'comandogpssendview',
                record: record,
                profile: profile,
                vehicle: view.record,
                sim_idkey: view.record.get('Id'),
                equipo: view.equipo,
                Modem: record.get('Modem'),
                panel: view.panel,
                comandosStore: view.comandosStore,
                equipoText: comboEquipoText
            }
        }).show();
    },

    onSaveClick: function (button, event, options) {
        var view = button.up('comandosgpsconfigview');
        var record = view.equipo;
        var cuenta = view.record;
        var grid = view.down('#CmdGrid');
        var store = grid.getStore();
        var controller = this;

        //actualizo el registro con el form
        view.getForm().updateRecord(record);

        // actualizo el JSON de los comandos
        // filtro solos que agregó el usuario, los automáticos son filtrados
        var config = Ext.Array.filter(//Ext.Array.pluck(store.data.items, 'data') 
            store.data.items,
            function(item,index,array){
                return (item.get('cComando')=='' ? true : false);
            }
        );

        config = Ext.Array.pluck(config,'data');
        

        // me fijo si tiene modelo viejo de comandos
        if (record.get('pan_cConfig').charAt(0) == '[') {
            // es viejo lo reemplazo
            view.pan_cconfig = { commands: config };
        } else if (view.pan_cconfig && (view.pan_cconfig.commands || view.pan_cconfig.receptor)) {
            view.pan_cconfig.commands = config;
        } else {
            view.pan_cconfig = { commands: config };
        }

        var json = Ext.JSON.encode(view.pan_cconfig);

        record.set('pan_cconfig', json);
        record.set('pan_iidcuenta', cuenta.get("sim_cuenta"));
        var pmodel = controller.getPanelModelModel();

        record.proxy.url = pmodel.getProxy().url;
        // delete record.proxy.reader;
        // let rec = record.clone();
        // rec.proxy.url = pmodel.getProxy().url;
        record.modified = record.data;
        if (view.getForm().isValid()) {
            // guardo el registro
            record.save({
                scope: this,
                callback: function (recordIn, operation) {
                    if (operation.success) {
                        notify('Los datos se guardaron con éxito');
                        controller.loadVehicleCommands(recordIn, view, controller);
                    }
                    else {
                        notifyError('Hubo un error en la operación');
                    }
                },
                button: button
            });
        } else {
            notifyError('Valores inválidos.')
        }

        // pmodel.load(record.get("Id"), {
        //     callback: function (rec) {


        //         var keys = Object.keys(record.data);
        //         keys.forEach(k => {
        //             rec.set(k, record.get(k));
        //         });

        //         if (view.getForm().isValid()) {
        //             // guardo el registro
        //             rec.save({
        //                 scope: this,
        //                 callback: function (recordIn, operation) {
        //                     if (operation.success) {
        //                         notify('Los datos se guardaron con éxito');
        //                         controller.loadVehicleCommands(recordIn, view, controller);
        //                     }
        //                     else {
        //                         notifyError('Hubo un error en la operación');
        //                     }
        //                 },
        //                 button: button
        //             });
        //         } else {
        //             notifyError('Valores inválidos.')
        //         }
        //     }

        // })



        // if (view.getForm().isValid()) {
        //     // guardo el registro
        //     pmodel.save({
        //         scope: this,
        //         callback: function (recordIn, operation) {
        //             if (operation.success) {
        //                 notify('Los datos se guardaron con éxito');
        //                 controller.loadVehicleCommands(recordIn, view, controller);
        //             }
        //             else {
        //                 notifyError('Hubo un error en la operación');
        //             }
        //         },
        //         button: button
        //     });
        // } else {
        //     notifyError('Valores inválidos.')
        // }
    }
});