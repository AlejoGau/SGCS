Ext.define('GestorSim.controller.ComandoGpsSendController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['ComandosIpModel'],
    views: ['ComandoGpsSendView'],

    init: function (config) {
        this.control({
            'comandogpssendview': {
                afterrender: this.initview
            },
            'comandogpssendview button[action="send"]': {
                click: this.onSendClick
            }
        });
    }, // cierro init

    initview: function (view) {
        var vehicle = view.vehicle;
        var comando = view.record;
        var equipo = view.equipo;
        var comandoIpModel = this.getComandosIpModelModel();
        var comandosStore = view.comandosStore;
        var comandoConfig = Ext.JSON.decode(comando.get('Config'));
        // var comandoConfig = eval( comando.get( 'Config' ) );
        var comandoTipo = comandosStore.findRecord('tcm_iid', comando.get('Tipo'));

        if (!comandoTipo) {
            notifyError('Hay un problema con el comando, reconfigurar.');
        } else {
            var comandoText = comandoTipo.get('tcm_cComando');

            Ext.Object.each(comandoConfig, function (key, value, myself) {
                comandoText = comandoText.replace(new RegExp("{" + key + "}"), value);
            });

            view.comandoIp = Ext.create(comandoIpModel, {
                cmd_tfechahora: new Date(),
                cmd_idCuenta: vehicle.get('sim_cuenta'),
                cmd_idReceptor: comandoTipo.get('tcm_iReceptor'),
                cmd_iComando: comando.get('Tipo'),
                cmd_nEstado: 1,
                cmd_cValores: comandoText,
                cmd_cObservaciones: comando.get('Name'),
                cmd_iEsCustom: comandoTipo.get('tcm_iEsCustom')
            })
            view.comandoIp.set("Id", 0);
            view.down('#cuentanombre').setValue(vehicle.get('cue_cnombre'));
            view.down('#equipo').setValue(view.equipoText);
            view.down('#comando').setValue(comando.get('Name'));

            view.loadRecord(view.comandoIp);

            // muestro la config dinamica
            var fieldset = view.down('#parametros');
            var tcm_cValores = comandoTipo.get('tcm_cValores');

            if (tcm_cValores != '') {
                try {
                    // tcm_cValores = Ext.JSON.decode(tcm_cValores);
                    tcm_cValores = eval(tcm_cValores);
                    var fields = 0;
                    Ext.Array.each(tcm_cValores, function (field) {
                        if (field._AtSend) {
                            fieldset.add(field);
                            fields++;
                        }
                    });

                    if (fields > 0) {
                        fieldset.show();
                    }
                }
                catch (exception) {
                    console.log('hubo un error al configurar las variables dinamicas ' + exception);
                }
            }

        }
    },

    onSendClick: function (button, event, options) {
        var view = button.up('comandogpssendview');
        var vehicle = view.vehicle;
        var comando = view.comandoIp;
        var panel = view.panel;
        var record = view.record;
        var win = view.up('window');
        var recordConfig = Ext.JSON.decode(record.get('Config'));
        // var recordConfig = eval( record.get( 'Config' ) );

        if (recordConfig._Modem) {
            // se manda por sms lo pongo como completo
            comando.cmd_nEstado = 3;
        }

        // busco los campos dinamicos al enviar
        var fieldset = view.down('#parametros');
        var values = fieldset.getValues();
        var comandoText = comando.get('cmd_cValores');
        Ext.Object.each(values, function (key, value, myself) {
            comandoText = comandoText.replace(new RegExp("{" + key + "}"), value);
        });

        comando.set('cmd_cValores', comandoText);
        if(recordConfig._Modem){
            Ext.Ajax.request({
                params: {
                    iCuenta: view.vehicle.get('sim_cuenta'),
                    iModemSMS: view.Modem,
                    cMessageMerge: comandoText, //recordConfig.Generico,
                    cDestinoSMS: '',
                    sim_idkey : view.sim_idkey,
                    idCmd: record.get('Id')
                },
                url: '/rest/search/SaveSms',
                method: 'GET',
                scope: this,
                success: function (response) {
                    notify('El sms se encoló con éxito');
                }
            });


        }else{
            comando.save({
                callback: function (records, operation) {
                    if (operation.success) {
                        // me fijo si el comando es sms
                        if (recordConfig._modem) {
                            // guardo el sms en la base
                        }
                        else {
                            // aviso a IPRS que debe enviar el comando.
                            Ext.Ajax.request({
                                url: '/handler/IRS_SENDCOMMAND_handler',
                                params: {
                                    id: vehicle.get('cue_iid')
                                },
                                method: 'GET',
                                scope: this,
                                success: function (response) {
                                }
                            })
                        }
                        notify('El comando se envió con éxito');
                        if (win) {
                            win.close();
                        }
                    }
                }
            });
        }


    }
});