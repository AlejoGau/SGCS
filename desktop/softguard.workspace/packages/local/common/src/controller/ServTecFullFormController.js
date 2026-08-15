//MIGRADO2024
Ext.define('Common.controller.ServTecFullFormController', {
	extend: 'Ext.app.Controller',
	stores: ['Common.store.tip_ntipoStore'],
	models: ['m_st_cabeceraModel', 'TecnicosSearchModel', 'TipoServicioSearchModel', 'ServTecSearchModel', 'TablasMovilesPatrullaSearchModel', 'SoftguardUsuarioModel', 'ServTecHistoricoModel', 'ServTecVisitaModel', 'ServTecVisitaSearchModel', 'SoftguardTelefonoModel', 'OrganizationSearchModel'],
	views: ['ServTecFullFormView', 'DateTimeField'],
	init: function (config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
			'sertecfullformview': {
				afterrender: this.initview,
			},
			'sertecfullformview button[action=save]': {
				click: this.onSaveClick
			},
			'sertecfullformview button[action=addInsumo]': {
				click: this.onAddInsumoClick
			},
			'sertecfullformview #servicio': {
				change: this.onServicioChange
			},
			'sertecfullformview #tiposervicio': {
				change: this.onTipoServicioChange
			},
			'sertecfullformview #finalizar': {
				click: this.onFinalizarClick
			},
			'sertecfullformview #cancelar': {
				click: this.onCancelarClick
			},
			'sertecfullformview #pendiente': {
				click: this.onPendienteClick
			}
		});
	}, // cierro init
	initview: function (view) {
		// cargo el record de cabecera
		var model = this.getM_st_cabeceraModelModel();
		var record = view.record;
		if (record.get('Id') != 0) {
			model.load(record.get('Id'), {
				callback: function (cabecera) {
					view.cabecera = cabecera;
					view.cabeceraLoaded = true;
					if (!Date.parse(record.get("stc_dfechapago"))) {
						cabecera.set('stc_dfechapago', null);
						//view.down('#stc_dfechapago').setValue(null);
					}
					view.loadRecord(cabecera);
				}
			})
		}
		var firmaDefault = getParametro('CONFORMIDADSERVICIOST');
		var record = view.record;
		if (record.get('stc_nestado') != 3 && record.get('stc_nestado') != 4) {
			view.down('#finalizar').show();
			view.down('#cancelar').show();
			view.down('#pendiente').hide();
		} else {
			view.down('#finalizar').hide();
			view.down('#pendiente').show();
			view.down('#cancelar').hide();
		}
		if (view.mode == 'edit') {
			/* view.down('#tiposervicio').hide();
			 view.down('#servicio').hide();*/
			view.down('#fechadevencimiento').show();
		} else {
			view.down('#finalizar').hide();
			view.down('#cancelar').hide();
			view.down('#pendiente').hide();
		}
		if (view.readOnly) {
			view.down('#save').hide();
		}
		Ext.Ajax.request({
			url: '/rest/security/UserData',
			success: function (response, action) {
				var infoUser = Ext.JSON.decode(response.responseText);
				view.userdata = infoUser;
			}
		});
		for (var f in record.data) {
			var date = record.get(f);
			if (f.search("dfecha|dsalida|darribo|dintecnico|doutecnico") > 0 && (new Date(date)).getTime() == 0) {
				record.set(f, null);
			}
		}
		view.serviciosStore = Ext.create('Ext.data.Store', {
			model: this.getTipoServicioSearchModelModel(),
			remoteSort: true,
			sorters: [
				{ property: 'tip_cdescripcion', direction: 'ASC' }
			],
			remoteFilter: false,
			pageSize: 500
		});
		var combo = view.down('#servicio');
		combo.bindStore(view.serviciosStore);
		view.serviciosStore.load();
		if (!record.get('stc_cconformidad_html')) {
			record.set('stc_cconformidad_html', firmaDefault)
		}
		if (record.get('stc_nestado') == '') {
			record.set('stc_nestado', 1);
		}
		if (!record.get('stc_iPrioridad')) {
			record.set('stc_iPrioridad', 1);
		}
		view.loadRecord(record);
		if (record.get('stf_dfecha_vto_orden') == null) {
			view.down('#fechadevencimiento').hide()
		}
		if (view.newrecord) {
			view.down('#tiposervicio').setValue(1);
		}
		// genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
		var contactoStore = Ext.create('Ext.data.Store', {
			model: this.getSoftguardTelefonoModelModel(),
			remoteSort: false,
			remoteFilter: false,
			sorters: [
				{
					property: 'tel_norden',
					direction: 'ASC'
				}
			]
		});
		var _ObjectId = view.recordFull.get('cue_iid');
		if (_ObjectId > 0) {
			// una vez que cargue el store hago el binding con la view
			contactoStore.load({
				ObjectId: _ObjectId, view: view, store: view.mystore, callback: function () {
					view.down('#contacto').bindStore(contactoStore);
				}
			});
		} else {
			notifyError('La cuenta no existe');
		}

		var organizationOATStore = Ext.create('Ext.data.Store', {
			model: this.getOrganizationSearchModelModel(),

			remoteFilter: true,
			filters: [{
				property: 'OrganizationType',
				value: 'PROV'
			}]


		});
		organizationOATStore.load();
		var comboOrg = view.down('#stc_iOrganizacion');
		comboOrg.bindStore(organizationOATStore);

		var mostrarEmpresa = getParametro('SERVICIOTECNICOPROVEEDORES');
		if (mostrarEmpresa == 1)
			view.down('#stc_iOrganizacion').show();;

		view.updateLayout();
	},

	onTipoServicioChange: function (field, newValue, oldValue, options) {
		var view = field.up('sertecfullformview');
		if (view.record.get('Id') && oldValue == undefined) {
			return false;
		}
		var filters = [
			{
				property: 'tip_ntipo',
				value: newValue
			}
		];
		var serviciosStore = Ext.create('Ext.data.Store', {
			model: this.getTipoServicioSearchModelModel(),
			remoteSort: true,
			sorters: [
				{ property: 'tip_cdescripcion', direction: 'ASC' }
			],
			remoteFilter: true,
			filters: filters,
			pageSize: 500
		});
		var combo = view.down('#servicio');
		combo.setValue('');
		serviciosStore.load({
			callback: function () {
				combo.bindStore(serviciosStore);
			}
		});
	},

	onServicioChange: function (field, newValue, oldValue, options) {
		var view = field.up('sertecfullformview');
		if (!view.record.get('Id')) {
			var fieldfecha = view.down('#fechadevencimiento');
			view.serviciosStore.each(function (item, index, count) {
				if (item.get('tip_ccodigo') == newValue) {
					var vencimiento = item.get('tip_nvto');
					var fechavencimiento = Ext.Date.add(new Date(), Ext.Date.DAY, vencimiento);
					fieldfecha.setValue(fechavencimiento);
					var precio = view.down('#precio');
					if (precio.getValue('tip_yvalor') == 0) {
						precio.setValue(item.get('tip_yvalor'));
					}
					return false;
				}
			});
		} else {
			view.serviciosStore.each(function (item, index, count) {
				if (item.get('tip_ccodigo') == newValue) {
					var precio = view.down('#precio');
					//se saco el dia 22-06-2017 lo hablamos por chat con rodrigo
					/*  if (precio.getValue() == 0)
					  precio.setValue(item.get('tip_yvalor'));*/
					view.down('#tiposervicio').setValue(item.get('tip_ntipo'));
					return false;
				}
			});
		}
	},


	onFinalizarClick: function (button, event, options) {
		var view = button.up('sertecfullformview');
		var controller = this;
		var record = view.record;
		var win = Ext.create('Ext.Window', {
			layout: 'vbox',
			title: 'Finalizacion',
			closeAction: 'destroy',
			width: 615,
			height: 190,
			border: true,
			modal: true,
			view: view,
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'datetimefield',
							itemId: 'fechafinalizacion',
							fieldLabel: 'Fecha de finalizacion',
							value: new Date,
							labelWidth: 150,
							width: '500'
						}/*,{
									xtype:'timefield',
									itemId:'horafinalizacion',
									value: new Date,
									labelWidth:150,
									width:'300'
								}*/
					]
				}, {
					xtype: 'displayfield',
					value: getLocale('Observación')
				}, {
					xtype: 'textarea',
					itemId: 'msg',
					width: '100%'
				}
			],
			fbar: [{
				xtype: 'button',
				text: 'Finalizar',
				handler: function (btn) {
					var vieWwin = btn.up('window')
					/// view.fechaFinalizadaFromWin = new Date(Ext.Date.format(new Date(vieWwin.down('#fechafinalizacion').getValue()),'Y-m-d')+" "+ Ext.Date.format(new Date(vieWwin.down('#horafinalizacion').getValue()),'H:i:s'));
					view.fechaFinalizadaFromWin = new Date(Ext.Date.format(new Date(vieWwin.down('#fechafinalizacion').getValue()), 'Y-m-d H:i:s'))
					view.cabecera.set('stc_dfecha_cierre', view.fechaFinalizadaFromWin);
					controller.pasarEstado(view, 4);
					controller.pasarEstadoVisitas(view, 4);

					//timeline servtec
					var msg = getLocale('Finalizo el servicio tecnico')
					if (vieWwin.down('#msg').getValue() != '') {
						msg = vieWwin.down('#msg').getValue()
					}
					console.log("controller", controller)
					console.log("getServTecHistoricoModelModel", controller.getServTecHistoricoModelModel())
					var servTecHistRecord = controller.getServTecHistoricoModelModel().create({
						stl_iServicio: view.record.get('Id'),
						stl_tFechaHora: new Date(),
						stl_cAccion: getLocale('FINALIZADO').replace('|', ''),
						stl_cObservacion: "[" + _UserData.UserId + "] " + msg,
						stl_iUsuarioDSS: _UserData.udw_idKey
					});
					servTecHistRecord.set("Id", 0);

					servTecHistRecord.save({
						callback: function () {
						}
					});
					Ext.Ajax.request({
						url: '/rest/search/AlarmaGenerar',
						method: 'GET',
						params: {
							idCta: view.record.get('cue_iid'),
							cAlarma: '_ST',
							cObservaciones: "[" + _UserData.UserId + "] " + "[" + getLocale('FINALIZADO') + ":" + view.record.get('Id') + "] " + msg
						},
						success: function (resp, operation) {
						}
					});
					Ext.Ajax.request({
						url: '/rest/search/novedadFacturacionSerTec',
						params: { idServicio: view.record.get('Id') },
						method: 'GET',
						success: function (response, action) {
							var parametros = Ext.JSON.decode(response.responseText);
							var rec = parametros.rows[0];
							if (rec && rec.Error == 0) {
								notify('Se agregó la novedad de facturacion.')
							}
						}
					});
					view.up('sertepanelview').fireEvent('objectrefresh', view.record, view.up('sertepanelview'), true);
					vieWwin.close()
				}
			}, {
				xtype: 'button',
				text: 'Cancelar',
				handler: function (btn) {
					var vieWwin = btn.up('window')
					vieWwin.close()
				}
			}
			]
		});
		win.show();
		//view.up('sertepanelview').close();
	},
	onCancelarClick: function (button, event, options) {
		var view = button.up('sertecfullformview');
		var controller = this;
		var win = Ext.create('Ext.Window', {
			layout: 'vbox',
			title: 'Cancelacion',
			closeAction: 'destroy',
			width: 615,
			height: 190,
			border: true,
			modal: true,
			view: view,
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'datetimefield',
							itemId: 'fechafinalizacion',
							fieldLabel: 'Fecha de finalizacion',
							value: new Date,
							labelWidth: 150,
							width: '500'
						}/*,{
									xtype:'timefield',
									itemId:'horafinalizacion',
									value: new Date,
									labelWidth:150,
									width:'300'
								}*/
					]
				}, , {
					xtype: 'displayfield',
					value: 'Observacion'
				}, {
					xtype: 'textarea',
					itemId: 'msg',
					width: '100%'
				}
			],
			fbar: [{
				xtype: 'button',
				text: 'Cancelar Servicio Tecnico',
				handler: function (btn) {
					var vieWwin = btn.up('window')
					if (vieWwin.down('#msg').getValue() != '') {
						/// view.fechaFinalizadaFromWin = new Date(Ext.Date.format(new Date(vieWwin.down('#fechafinalizacion').getValue()),'Y-m-d')+" "+ Ext.Date.format(new Date(vieWwin.down('#horafinalizacion').getValue()),'H:i:s'));
						view.fechaFinalizadaFromWin = new Date(Ext.Date.format(new Date(vieWwin.down('#fechafinalizacion').getValue()), 'Y-m-d H:i:s'))
						view.cabecera.set('stc_dfecha_cierre', view.fechaFinalizadaFromWin);
						controller.pasarEstado(view, 3);
						controller.pasarEstadoVisitas(view, 5);
						view.up('sertepanelview').fireEvent('objectrefresh', view.record, view.up('sertepanelview'), true);
						var servTecHistRecord = controller.getServTecHistoricoModelModel().create({
							stl_iServicio: view.record.get('Id'),
							stl_tFechaHora: new Date(),
							stl_cAccion: getLocale('CANCELADO').replace('|', ''),
							stl_cObservacion: "[" + _UserData.UserId + "] " + vieWwin.down('#msg').getValue(),
							stl_iUsuarioDSS: _UserData.udw_idKey
						});
						servTecHistRecord.set("Id", 0);
						servTecHistRecord.save();
						vieWwin.close()
					} else {
						notify('Se requiere una observacion para cancelar.')
					}
				}
			}, {
				xtype: 'button',
				text: 'Cancelar',
				handler: function (btn) {
					var vieWwin = btn.up('window')
					vieWwin.close()
				}
			}
			]
		});
		win.show();
		// view.up('sertepanelview').close();
	},
	onPendienteClick: function (button) {
    var view = button.up('sertecfullformview');
    var me = this;

    // 1) UPDATE cabecera
    var cabecera = view.cabecera || view.record;
    if (!cabecera) {
        notifyError('No se pudo obtener la cabecera del servicio.');
        return;
    }
    cabecera.set('stc_nestado', 1);       // Pendiente
    cabecera.set('stc_dfecha_cierre', null);

    cabecera.save({
        success: function () {

            // 2) Histórico: evitar clientId string
            var HistModel = me.getServTecHistoricoModelModel && me.getServTecHistoricoModelModel();
            if (HistModel) {
                var hist = HistModel.create({
                    stl_iServicio   : parseInt(cabecera.get('Id'), 10) || 0,
                    stl_tFechaHora  : new Date(),
                    stl_cAccion     : getLocale('REAPERTURA').replace('|',''),
                    stl_cObservacion: "[" + _UserData.UserId + "] " + getLocale('Reapertura Orden Servicio Técnico'),
                    // enviar como número
                    stl_iUsuarioDSS : parseInt(_UserData.udw_idKey, 10) || 0
                });

                // ⚠️ clave: forzar Id numérico para que no viaje "Model-1"
                hist.setId(0);        // fija el idProperty a 0 (Int32)
                hist.set('Id', 0);    // y también en los data fields por las dudas

                hist.save();          // create válido con Id=0
            }

            // 3) Evento de reapertura (igual que antes)
            Ext.Ajax.request({
                url: '/rest/search/AlarmaGenerar',
                method: 'GET',
                params: {
                    idCta         : view.recordFull.get('cue_iid'),
                    cAlarma       : '_OR',
                    cObservaciones: getLocale('Reapertura Orden Servicio Técnico') +
                                    ' (' + cabecera.get('stc_iid') + ')'
                },
                success: function () {
                    notify('Se generó evento de reapertura.');
                }
            });

            // 4) Refresco UI
            view.down('#finalizar') && view.down('#finalizar').show();
            view.down('#cancelar') && view.down('#cancelar').show();
            view.down('#pendiente') && view.down('#pendiente').hide();

            var panel = view.up('sertepanelview');
            if (panel) {
                panel.fireEvent('objectrefresh', cabecera, panel, true);
            }
            notify('Servicio reabierto como Pendiente.');
        },
        failure: function () {
            notifyError('No se pudo actualizar el estado del servicio a Pendiente.');
        }
    });
},


	// toda esta funcion resolver en un search aparte todo del lado del SQL
	pasarEstadoVisitas: function (view, estado) {
		var controller = this;
		var filters = [
			{
				property: 'svi_iServicio',
				value: view.record.get('Id')
			}
		]
		var store = Ext.create('Ext.data.Store', {
			model: this.getServTecVisitaSearchModelModel(),
			pageSize: 50,
			remoteSort: true,
			remoteFilter: true,
			filters: filters
		})
		var visitamodel = this.getServTecVisitaModelModel();
		store.load({
			callback: function (records) {
				Ext.Array.each(records, function (v, k) {
					visitamodel.load(v.get('Id'), {
						callback:
							function (vrecord) {
								vrecord.set('svi_iEstado', estado);
								vrecord.save();
							}
					})
				})
			}
		})
	},

	pasarEstado: function (view, estado, close) {
		var record = view.record;
		var cabecera = view.cabecera;
		console.log("record", record)
		console.log("cabecera", cabecera)
		record.set('stc_nestado', estado);
		cabecera.set('stc_nestado', estado);
		view.down('#stc_nestado').setValue(estado);
		this.saveRecord(view, this, close);
	},

	onAddInsumoClick: function (button, event, options) {
		var view = button.up('sertecfullformview');
		//falta saber de donde sale el insumo    
		var win = Ext.create('Ext.Window', {
			layout: 'fit',
			title: 'Insumo',
			closeAction: 'destroy',
			width: 300,
			height: 200,
			border: true,
			modal: true,
			view: view,
			items: [
			]
		});
		win.show();
	},



	onSaveClick: function (button, event, options) {
		var view = button.up('sertecfullformview');
		this.saveRecord(view, this);
	},


	saveRecord: function (view, controller, close) {
		var win = view.up('window');
		var myform = view.getForm();
		var cabecera = view.cabecera;
		var record = view.record;
		var cuenta = view.cuenta;
		var model = this.getM_st_cabeceraModelModel();
		var panel = view.up('sertepanelview');
		var method = 'POST';
		if (!record) {
			record = Ext.create(model, {
				stc_iid_cuenta: view.cuenta.get('cue_iid'),
				stc_dfecha_desde_1: new Date()
			});
		}
		if (myform.isValid() && !view.saving) {
			// en el alta no hay cabecera aun, direcamente el record es el nuevo.
			if (cabecera)
				controller.updateRecord(cabecera, view, controller);
			else {
				cabecera = record;
				controller.updateRecord(record, view, controller);
			}
			view.saving = true;
			try {
				if (view.newrecord) {
					/*method = 'POST';
					const serTec = Ext.Ajax.request( {
						url: '/Rest/m_st_cabecera/',
						method: method,
						jsonData: Ext.JSON.encode( cabecera.data ),
						scope: this,
						success: function( resp, operation ) {
							view.saving = false;
							notify( 'Los datos se guardaron con éxito.' )
							if( panel ) {
								panel.caller.down( 'pagingtoolbar' ).doRefresh();
								panel.fireEvent( 'objectrefresh', cabecera, panel, close );
							} else {
								var obj = JSON.parse( resp.responseText );
								view.caller.fireEvent( 'objectnew', obj, view.caller );
								view.caller.fireEvent( 'objectrefresh', cabecera, view.caller );
							}
							if( view.up( 'window' ) )
								view.up( 'window' ).close();
						}
					});*/



				} else {
					//DS-471 
					if (view.up('sertepanelview').cabecera) {
						cabecera.set("stc_nestado", view.up('sertepanelview').cabecera.get("stc_nestado"))
						cabecera.set("stc_ctecnico_1", view.up('sertepanelview').cabecera.get("stc_ctecnico_1"))
					}
				}
				cabecera.save({
					scope: this,
					success: function (record, operation) {
						view.saving = false;
						notify('Los datos se guardaron con éxito.');

						if (panel) {
							panel.fireEvent('objectrefresh', record, panel, close);
						} else if (view.caller) {
							view.caller.fireEvent('objectnew', record.getData(), view.caller); // abrís la orden
							view.caller.fireEvent('objectrefresh', record.getData(), view.caller);
						}

						win && win.close();
					},
					failure: function (record, operation) {
						view.saving = false;
						notifyError('Error al guardar el registro.');
						console.log(operation.getError());
					}
				});


			} catch (excpetion) {
			}
		} else {
			notifyError('Corrija los errores antes de guardar.')
		}
	},

	updateRecord: function (record, view, controller) {
		var myform = view.getForm();
		record.set('stc_ioperador', _UserData.udw_idKey);
		myform.updateRecord(record);
		/*
		for(var f in record.data){
			var date = record.get(f);
			
			if(f.search("dfecha|dsalida|darribo|dintecnico|doutecnico")>0  && date == null){
				record.set(f, new Date('1/1/1900'));
			}
		   // console.log(f,record.get(f));
		}
		*/
		var date = new Date();
		date = Ext.Date.format(date, 'd-m-Y H:i:s');
		if (view.down('#fechadevencimiento').getValue()) {
			record.set('stf_dfecha_vto_orden', new Date(view.down('#fechadevencimiento').getValue()));
		}
	}

});
