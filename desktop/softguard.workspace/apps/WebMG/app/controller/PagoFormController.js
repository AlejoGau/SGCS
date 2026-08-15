Ext.define('WebMG.controller.PagoFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_cuenta_corriente_fcModel', 'TablasFormaDePagoSearchModel','PagosModel', 'm_comprobantes_cab_fcSearchModel', 't_comprobantes_fcSearchModel', 't_bancos_fcSearchModel', 't_firmante_fcSearchModel', 'MGCuentaCorrienteSearchModel' ],
    views : [ 'PagoFormView' ],

    init : function(config) {
        // genero los eventos

		this.control({
			'pagoformview' : {
				afterrender : this.initview,
                imputartodovalor: this.onImputarTodoValor,
                calcularContadores: this.onCalcularContadores,
                eliminarPago: this.onEliminarPago,
                agregarimputacion: this.onAgregarImputacion
			},
        	
            'pagoformview #agregar' : {
				click : this.onAgregarPagoClick
			},
            'pagoformview #realizarpago' : {
    			click : this.onRealizarPagoClick
			},
            'pagoformview #forma' : {
        		change : this.onFormaPagoClick
			}
        });
	}, 
    
    
    onFormaPagoClick: function (combo, value) {
        var view = combo.up('pagoformview')        
        
        
        var storePagos = view.down('#pagos').getStore();
        
        if(combo.store.getAt(0).get('fpg_npidenumero')) {
            view.down('#numerocheque').show()
            view.down('[dataIndex=numeroCheque]').show()
        } else {
            view.down('#numerocheque').hide()
            
            if(!storePagos.findRecord('numeroCheque',/.*?/)) {                
                view.down('[dataIndex=numeroCheque]').hide()
            }
            
        }
        
        if(combo.store.getAt(0).get('fpg_npidevencimiento')) {
            view.down('#vencimiento').show()
            view.down('[dataIndex=vencimiento]').show()  
        } else {
            view.down('#vencimiento').hide()
            if(!storePagos.findRecord('vencimiento',/.*?/)) {                
                view.down('[dataIndex=vencimiento]').hide()
            }
        }
        
        if(combo.store.getAt(0).get('fpg_npidebanco')) {
            view.down('#bancos').show()
            view.down('[dataIndex=bancoNombre]').show()  
        } else {
            view.down('#bancos').hide()
            if(!storePagos.findRecord('bancoNombre',/.*?/)) {                
                view.down('[dataIndex=bancoNombre]').hide()
            }
        }
        
        if(combo.store.getAt(0).get('fpg_ctipo') == '003') {
          
            view.down('#firmantes').show()
                
            view.down('[dataIndex=firmanteNombre]').show()           
            
            
        } else {
            
            view.down('#firmantes').hide()                
          
            //si no hay ningun cheque entre los pagos dejo esconder las columnas
            if(!view.down('#pagos').getStore().findRecord('forma','003')) {
            
                view.down('[dataIndex=firmanteNombre]').hide()   
                
            }
        }
        
                
    },
    
    onEliminarPago: function (view, rec) {
        
    },
    
    
    onRealizarPagoClick: function (btn) {
        var view = btn.up('pagoformview')
        
        if(view.down('#recibos').getValue() == '' || view.down('#recibos').getValue() == null) {
            notify('Es necesario seleccionar un recibo.')
            return false;
        }
        
        view.mask = Ext.create('Ext.LoadMask', view, {
            msg: getLocale("Realizando pago.")
        }).show();
        
        var arrayImputaciones = []
        view.down('#comprobantes').getStore().each(function (record) {
            //solo envio los comprobantes que se le imputo algun valor
            if(record.get('imputar') > 0) {
                arrayImputaciones.push({
                    Id:record.get('Id'), //este id es de la cuenta correinte
                    imputar: record.get('imputar'),
                    IdComprobante: record.get('cbc_iCodigo_ID')
                })
            }
        })
        
        
        var arrayPagos = []
        view.pagosStore.each(function (record) {
            arrayPagos.push(record.data)
        })
        
        Ext.Ajax.request({
            //url : '/rest/search/MG_RealizarPago',
            url : '/handler/SearchPost?search=MG_RealizarPago',
            method: 'POST',
                params: {
                arrayPagos: Ext.encode(arrayPagos),
                arrayComprobantesImputados: Ext.encode(arrayImputaciones),
                clienteId: view.record.get('cli_icodigo_ID'),
                codigoComprobante: view.down('#recibos').getValue(),
                fechaComprobante: view.down('#fecharecibo').getValue()
            },
            success: function(response, action){
                var json = Ext.JSON.decode(response.responseText);
                
                    if(json.rows[0].Error == '1') {
                        //notify(json.rows[0].msg);
                        Ext.MessageBox.alert(getLocale(json.rows[0].msg), getLocale(json.rows[0].msg)+'<br>'+getLocale('No fue realizado el pago.'), function(){});
                    } else {
                        notify(json.rows[0].msg);
                    }
                    
                    
                view.up('window').close()
                if(view.caller) {
                    view.caller.fireEvent('refresh', view.caller)
                }
                view.mask.hide()
                
            }
        });
    },
    
    onAgregarImputacion: function (view,rec,pagarTodo) {
        var totaldepagos = 0;
        view.down('#pagos').getStore().each(function (record) {
            totaldepagos += record.get('importe')?record.get('importe'):0
        }) 
        
        
                                                        
        //sumo imputados
        var totalImputado = 0;
        view.down('#comprobantes').getStore().each(function (record) {
            totalImputado += record.get('imputar')?record.get('imputar'):0
        })
        
        var diferencia = totaldepagos-totalImputado
        
        if(diferencia > 0) {
            //si la diferencia es mayor al total del comprobante pongo el maximo del comprobante
            if(diferencia >= rec.get('cta_ySaldo') && pagarTodo) {
                rec.set('imputar',rec.get('cta_ySaldo'))
            } else if(!pagarTodo) {
               //no hago nada dejo el valor definido en la grilla
            } else {
                //sino pongo lo que queda de diferencia
                rec.set('imputar',diferencia)
            }
        } else if (diferencia < 0) {
            notify('No tiene el monto que necesita.')
            rec.set('imputar',0)
        } else {
            notify('Necesita agregar recibos.')
        }
        
        
       this.onCalcularContadores(view)
    },
    
    onCalcularContadores: function (view,rec,pagarTodo) {
        var totaldepagos = 0;
        view.down('#pagos').getStore().each(function (record) {
            totaldepagos += record.get('importe')?record.get('importe'):0
        }) 

        //sumo imputados
        var totalImputado = 0;
        var cantidadImputados = 0;
        view.down('#comprobantes').getStore().each(function (record) {
            totalImputado += record.get('imputar')?record.get('imputar'):0
            
            if(record.get('imputar') > 0) {
                cantidadImputados ++;
            }
        }) 
        
        view.down('#cantidadrecibos').setValue(view.pagosStore.data.length)
        view.down('#cantidadcomprobantesimputados').setValue(cantidadImputados)
        view.down('#imputado').setValue(totalImputado)
        view.down('#totaldepagos').setValue(totaldepagos)
        view.totaldepagos = totaldepagos;

        if(view.down('#cardspanel').getLayout().activeItem.itemId == 'card-0') {
           if(view.totaldepagos > 0) {
               Ext.getCmp('move-next').setDisabled(false);
           } else {
               Ext.getCmp('move-next').setDisabled(true);
           }
       } else if(view.down('#cardspanel').getLayout().activeItem.itemId == 'card-1') {
           if(totalImputado == totaldepagos) {
               Ext.getCmp('move-next').setDisabled(false);
           } else {
               Ext.getCmp('move-next').setDisabled(true);
           }
        }
    },

    onAgregarPagoClick: function (btn) {
        var view = btn.up('pagoformview')
        
        if(/*view.down('#cuota').getValue() &&*/
        view.down('#importe').getValue() &&
        view.down('#forma').getValue()) {
            
            if(view.down('#forma').getValue() == '003') {
                view.pagosStore.add({
                    importe:view.down('#importe').getValue(),
                    forma:view.down('#forma').getValue(),
                    formaId:view.down('#forma').getValue(),
                    formaDescripcion: view.down('#forma').getRawValue(),
                    numeroCheque:  view.down('#numerocheque').getValue(),
                    banco:  view.down('#bancos').getValue(),
                    firmante:  view.down('#firmantes').getValue(),
                    bancoNombre:  view.down('#bancos').getRawValue(),
                    firmanteNombre:  view.down('#firmantes').getRawValue(),
                    vencimiento:  Ext.Date.format(view.down('#vencimiento').getValue(),'d/m/Y'),
                })
            } else {
                view.pagosStore.add({
                    importe:view.down('#importe').getValue(),
                    forma:view.down('#forma').getValue(),
                    formaId: view.down('#forma').store.getAt(0).get('Id'),
                    formaDescripcion: view.down('#forma').getRawValue(),
                    numeroCheque:  '',
                    banco: '',
                    firmante:  '',
                    bancoNombre:  '',
                    firmanteNombre:  '',
                    vencimiento: ''
                })
            }

            view.down('#importe').setValue(0)
            view.down('#numerocheque').setValue('')

        }

       this.onCalcularContadores(view)
    },

	initview : function(view) {
        var controller = this;

        var pagosModel = this.getPagosModelModel();
        
        view.pagosStore =Ext.create('Ext.data.Store',{
            model: pagosModel,
            pageSize: 999
        })
        view.down('#pagos').bindStore(view.pagosStore)

        var formasDePagoStore =Ext.create('Ext.data.Store',{
            model: this.getTablasFormaDePagoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            filters:[{
                property:'fpg_orgidcodigoid',
                value: view.record.get('cli_iOrganizacion')
            }],
            remoteFilter: true
        })
        view.down('#forma').bindStore(formasDePagoStore);
        
        formasDePagoStore.load();
        
        
        var firmantesStore =Ext.create('Ext.data.Store',{
            model: this.getT_firmante_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#firmantes').bindStore(firmantesStore);
        
        firmantesStore.load();

        var bancosStore =Ext.create('Ext.data.Store',{
            model: this.getT_bancos_fcSearchModelModel(),
            pageSize: 999,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#bancos').bindStore(bancosStore);
        
        bancosStore.load();
        
        
         view.TipoComprobanteStore = Ext.create('Ext.data.Store',{
                model: this.getT_comprobantes_fcSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
            })
        
        
        view.TipoComprobanteStore.load({callback:function () {
            var store = Ext.create('Ext.data.Store', {
                model : controller.getMGCuentaCorrienteSearchModelModel(),
                remoteFilter: true,
                filters: [{
                            property:'cbc_iCliente',
                            value: view.record.get('cli_icodigo_ID')
                        },{
                            property:'cbc_cestado',
                            value:1
                        },{
                            property:'cta_ySaldo:GTINT',
                            value: 0
                        }],
                autoload: false
            });

            view.down('#comprobantes').bindStore(store);
            store.load({callback:function (records) {
                //defino en 0 el camp[o imputar
                store.each(function (record) {
                    record.set('imputar',0)
                })
                
                store.group('_grouptitle');
            }});

            //traigo el ultimo movimeinto de cuenta corriente para saber la fecha y generar limites para hacer el recibo            
            var storeUltimoMovimiento = Ext.create('Ext.data.Store', {
                model : controller.getMGCuentaCorrienteSearchModelModel(),
                remoteFilter: true,
                pageSize:1,
                filters: [{
                            property:'cbc_iCliente',
                            value: view.record.get('cli_icodigo_ID')
                        }],
                sorters: [{
                    property:'cta_dCobro',
                    direction:'DESC'
                }]
            });
            
            storeUltimoMovimiento.load({callback:function (recordsUltimoMovimiento) {
                if(recordsUltimoMovimiento.length>0) {
                    //defino el maximo y el minimo de la fecha del recibo, no puede ser menor que el ultimo movimiento
                    view.down('#fecharecibo').setMinValue(recordsUltimoMovimiento[0].get('cta_dCobro'))
                    view.down('#fecharecibo').setMaxValue(new Date())
                }
            }});
        }})

        var comprobanteRecibo = Ext.create('Ext.data.Store',{
            model: this.getT_comprobantes_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                    property:'cbt_idOrganizacionFacturadora',
                    value: view.record.get('cli_iOrganizacion')
                },{
                    property:'cbt_ntipo',
                    value:7
                }
            ],
        })
        
        view.down('#recibos').bindStore(comprobanteRecibo);
        comprobanteRecibo.load({callback:function (records) {
            if(records.length <= 0) {
                Ext.MessageBox.alert(getLocale('Faltan recibos'), getLocale('No se encontraron recibos para esta organizacion. Puede crear uno en administratoSearch en tipo de comprobantes.'), function(){});
            } else {
                view.down('#recibos').select(view.down('#recibos').getStore().getAt(0));
            }
        }})

        if(view.down('#totaldepagos').getValue()>0) {
            Ext.getCmp('move-next').setDisabled(false);
        } else {
            Ext.getCmp('move-next').setDisabled(true);
        }
	}
});