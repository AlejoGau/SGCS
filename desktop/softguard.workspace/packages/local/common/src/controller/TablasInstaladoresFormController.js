//MIGRADO2024
Ext.define('Common.controller.TablasInstaladoresFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.InstaladorTipoStore', 'Common.store.TablaLineasStore' ],
    models : [ 't_stock_depositosModel', 't_stock_depositosSearchModel', 'TablasLineasModel', 'TablasInstaladoresModel', 'TablasLineasSearchModel', 't_instaladoresdealerModel' ],
    views : [ 'TablasInstaladoresFormView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
					'tablasinstaladoresformview' : {
						beforerender : this.initview
					},
					'tablasinstaladoresformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init
	initview : function(view) {
        view.loadRecord(view.record);
        if(view.record.get('Id') != 0) {
            var dealerGrid = view.down('t_instaladoresdealergridview');
            dealerGrid.setDisabled(false);

            // El store se configura automáticamente en t_instaladoresdealerGridController.initView
            // No necesitamos crear un store duplicado aquí
        }

        if(view.createDealer) {
            view.down('#delaer').hide()
            view.down('#delaer').setValue(view.createDealer)
        }

	},
	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('tablasinstaladoresformview');
        var win = button.up('window');
		var record = myform.getRecord();
        var controller = this;
		myform.updateRecord(record);

        if (myform.isValid()){
            // Detectar si es INSERT o UPDATE
            var isInsert = record.phantom || record.get('Id') == 0 || isNaN(record.get('Id')) || record.get('Id').toString().indexOf('Model-') > -1;

            // Preparar datos completos
            var data = Ext.clone(record.data);

            if (isInsert) {
                data.Id = 0;
                console.log('DEBUG - Operación INSERT detectada, usando Id: 0');
            } else {
                console.log('DEBUG - Operación UPDATE detectada, usando Id:', data.Id);
            }

            // Hacer llamada AJAX manual
            var url = isInsert ? '/Rest/t_instaladores/' : '/Rest/t_instaladores/' + data.Id;
            url += '?_dc=' + new Date().getTime();
            var method = isInsert ? 'POST' : 'PUT';

            console.log('DEBUG - AJAX Manual:', method, url);
            console.log('DEBUG - Payload completo:', data);

            Ext.Ajax.request({
                url: url,
                method: method,












                jsonData: data,
                timeout: 30000,
                success: function(response) {
                    try {
                        var result = Ext.decode(response.responseText);
                        console.log('DEBUG - Respuesta del servidor:', result);

                        if (result.success !== false) {
                            // Actualizar el record con los datos del servidor
                            var realId = record.get('Id');
                            if (isInsert && result.Id) {
                                record.set('Id', result.Id);
                                record.phantom = false;
                                record.dirty = false;
                                realId = result.Id;

                                // Importante: Marcar el record como commitado para evitar reutilización
                                record.commit();
                            }

                            console.log('DEBUG - ID real para depósitos:', realId);

                            notify('Los datos se guardaron correctamente');
                            view.caller.fireEvent('objectchanged', view.caller, record);

                            //verifico si ya tiene deposito creado
                            view.storeDepositosOrigen = Ext.create('Ext.data.Store',{
                                model: controller.getT_stock_depositosSearchModelModel(),
                                pageSize: 50,
                                remoteSort: true,
                                remoteFilter: true,
                                filters: [
                                    {
                                        property:'tsd_idtecnico',
                                        value: realId
                                    }
                                ]
                            }).load({callback:function (records) {
                                if(records.length<=0) {
                                    // Usar AJAX manual también para crear depósito
                                    var depositoData = {
                                        Id: 0,
                                        Name: record.get('ins_cnombre'),
                                        tsd_idtecnico: realId,
                                        tsd_estado: 2
                                    };

                                    console.log('DEBUG - Creando depósito con AJAX:', depositoData);

                                    Ext.Ajax.request({
                                        url: '/Rest/t_stock_depositos/?_dc=' + new Date().getTime(),
                                        method: 'POST',
                                        jsonData: depositoData,
                                        timeout: 30000,
                                        success: function(response) {
                                            try {
                                                var depositoResult = Ext.decode(response.responseText);
                                                console.log('DEBUG - Respuesta creación depósito:', depositoResult);
                                                notifyError('Se creo deposito para el Instalador/Tecnico');
                                            } catch (e) {
                                                console.error('Error al procesar respuesta depósito:', e);
                                                notifyError('Se creo deposito para el Instalador/Tecnico');
                                            }
                                        },
                                        failure: function(response) {
                                            console.error('Error AJAX depósito:', response);
                                        }
                                    });
                                }
                            }});

                            win.close();
                        } else {
                            notifyError(result.message || 'Hubo un error al guardar los datos');
                        }
                    } catch (e) {
                        console.error('Error al procesar respuesta:', e);
                        notifyError('Error al procesar la respuesta del servidor');
                    }
                },
                failure: function(response) {
                    console.error('Error AJAX:', response);
                    notifyError('Error de conexión al servidor: ' + (response.status || 'Desconocido'));
                }
            });
        }
	}
    
   

   
});