Ext.define('AdministratorSearch.controller.t_PerfilVehicleFormController', {
	extend: 'Ext.app.Controller',
	models: ['t_PerfilVehicleModel', 't_PerfilVehicleRuleModel', 't_PerfilVehicleRuleSearchModel'],
	views: ['t_PerfilVehicleFormView'],

	/**
	 * Fecha base para las horas. La columna es DATETIME pero solo importa la hora del dia,
	 * asi que hay que anclarla a *alguna* fecha.
	 *
	 * Tiene que ser una fecha sin horario de verano y con el mismo offset que hoy, para que
	 * el offset del cliente y el del servidor se cancelen en el viaje de ida y vuelta.
	 * NO usar 1900: en esa epoca Buenos Aires estaba en -04:16:48 (hora local media) y las
	 * horas se guardaban corridas 1:16:48. Tampoco 2008, que tenia horario de verano.
	 */
	HORA_FECHA_BASE: '2000/01/01',
	HORA_FORMATO: 'H:i',

	init: function (config) {
		this.control({
			't_perfilvehicleformview': {
				afterrender: this.initView
			},
			't_perfilvehicleformview button[action=save]': {
				click: this.onSaveClick
			},
			't_perfilvehicleformview button[action=cancel]': {
				click: this.onCancelClick
			},
			't_perfilvehicleformview button[action=addrule]': {
				click: this.onAddRuleClick
			}
		});
	},

	initView: function (view) {
		var record = view.record;

		view.getForm().loadRecord(record);

		// Mismo patron que ContratoItemGridController para las grillas de items.
		var perfilId = record.get('Id');
		if (!(typeof perfilId === 'number' && isFinite(perfilId))) {
			perfilId = 0;
		}

		var grid = view.down('#reglasGrid');

		view.rulesStore = Ext.create('Ext.data.Store', {
			model: this.getT_PerfilVehicleRuleSearchModelModel(),
			pageSize: 500,
			remoteSort: true,
			remoteFilter: true,
			autoLoad: false,
			filters: [{
				property: 'pvr_idPerfilVehicle',
				value: perfilId,
				id: 'pvr_idPerfilVehicle'
			}]
		});

		// reconfigure() y no bindStore(): la grilla nace sin store (esta dentro del form) y
		// bindStore no le reconstruye la vista, asi que los registros llegaban pero no se
		// pintaban.
		grid.reconfigure(view.rulesStore);

		// A diferencia de ContratoItem, un perfil nuevo SI admite reglas: se agregan en la
		// grilla y saveRules() las persiste despues de crear la cabecera. Solo evitamos el
		// load, que no tendria nada que traer.
		if (perfilId !== 0) {
			view.rulesStore.load({
				callback: function (records) {
					// El load termina despues de que la grilla ya se pinto: sin este refresh
					// los registros quedan en el store pero no aparecen en pantalla.
					if (grid.getView()) {
						grid.getView().refresh();
					}
				}
			});
		}
	},

	onAddRuleClick: function (button) {
		var view = button.up('t_perfilvehicleformview');
		var grid = view.down('#reglasGrid');

		var rule = Ext.create('AdministratorSearch.model.t_PerfilVehicleRuleSearchModel', {
			pvr_idPerfilVehicle: view.record.get('Id') || 0,
			pvr_tHoraInicio: this.buildTime('08:00'),
			pvr_tHoraFin: this.buildTime('18:00')
		});
		rule.setId(0);

		grid.getStore().add(rule);
	},

	/**
	 * Ancla una hora ('08:00') a la fecha base. Mismo patron que ServTecAgendaController:
	 * componer el string 'Y/m/d H:i' y pasarselo a new Date().
	 */
	buildTime: function (hora) {
		return new Date(this.HORA_FECHA_BASE + ' ' + hora);
	},

	/**
	 * El timefield devuelve un Date con SU propia fecha de referencia (2008-01-01), no la
	 * nuestra. Nos quedamos solo con la hora y la reanclamos a la fecha base.
	 */
	normalizeTime: function (value) {
		if (!value) {
			return null;
		}
		return this.buildTime(Ext.Date.format(value, this.HORA_FORMATO));
	},

	/**
	 * Devuelve el primer mensaje de error de las reglas, o null si estan todas bien.
	 */
	validateRules: function (rules) {
		if (!rules.length) {
			return getLocale('Debe agregar al menos una regla horaria.');
		}

		var controller = this;
		var error = null;

		Ext.Array.each(rules, function (rule, index) {
			var nro = index + 1;

			var inicio = rule.get('pvr_tHoraInicio');
			var fin = rule.get('pvr_tHoraFin');

			if (!inicio || !fin) {
				error = getLocale('Regla') + ' ' + nro + ': ' +
					getLocale('debe completar Hora Inicio y Hora Fin.');
				return false;
			}

			// Comparo como 'H:i': en ese formato el orden alfabetico es el cronologico,
			// y asi ignoro la fecha del DATETIME, que es de relleno.
			var horaInicio = Ext.Date.format(inicio, controller.HORA_FORMATO);
			var horaFin = Ext.Date.format(fin, controller.HORA_FORMATO);

			if (horaInicio >= horaFin) {
				error = getLocale('Regla') + ' ' + nro + ': ' +
					getLocale('la Hora Inicio debe ser menor que la Hora Fin.');
				return false;
			}

			var algunDia = rule.get('pvr_iLunes') || rule.get('pvr_iMartes') ||
				rule.get('pvr_iMiercoles') || rule.get('pvr_iJueves') ||
				rule.get('pvr_iViernes') || rule.get('pvr_iSabado') ||
				rule.get('pvr_iDomingo');

			if (!algunDia) {
				error = getLocale('Regla') + ' ' + nro + ': ' +
					getLocale('debe seleccionar al menos un día.');
				return false;
			}
		});

		return error;
	},

	onSaveClick: function (button) {
		var view = button.up('t_perfilvehicleformview');
		var win = button.up('window');
		var form = view.getForm();
		var record = view.record;
		var controller = this;

		if (!form.isValid()) {
			return false;
		}

		var grid = view.down('#reglasGrid');
		var rulesStore = grid.getStore();
		var rules = rulesStore.getRange();

		var error = this.validateRules(rules);
		if (error) {
			Ext.Msg.alert(getLocale('Reglas horarias'), error);
			return false;
		}

		form.updateRecord(record);

		// El checkbox devuelve booleano y el campo es int: sin esto, updateRecord deja
		// NaN en el record y viaja como null, que la columna NOT NULL rechaza.
		record.set('pfv_iAplicaFeriado', view.down('#pfv_iAplicaFeriado').getValue() ? 1 : 0);

		record.save({
			success: function (saved) {
				var perfilId = saved.get('Id');

				controller.saveRules(perfilId, rulesStore, function () {
					notify(getLocale('El perfil se guardó con éxito'));

					if (view.caller) {
						view.caller.getStore().load();
					}
					win.close();
				});
			},
			// El indice unico UQ_PerfilVehicleNombre rechaza nombres repetidos.
			failure: function () {
				Ext.Msg.alert(
					getLocale('No se pudo guardar'),
					getLocale('Verifique que no exista otro perfil con el mismo nombre.')
				);
			}
		});
	},

	/**
	 * Guarda las reglas contra la cabecera ya persistida y elimina las que se sacaron
	 * de la grilla. Cada regla es un request propio: el REST generado no expone
	 * una operacion transaccional que abarque cabecera + items.
	 */
	saveRules: function (perfilId, rulesStore, done) {
		var controller = this;
		var removed = rulesStore.getRemovedRecords();
		var rules = rulesStore.getRange();

		var pending = removed.length + rules.length;
		if (!pending) {
			done();
			return;
		}

		var finish = function () {
			pending--;
			if (pending <= 0) {
				done();
			}
		};

		Ext.Array.each(removed, function (rule) {
			if (!rule.get('Id')) {
				finish();
				return;
			}

			// Cargar y despues erase(), como ContratoItemGridController: en ExtJS 7
			// Model.destroy() no borra en el servidor, solo destruye el objeto en memoria.
			controller.getT_PerfilVehicleRuleModelModel().load(rule.get('Id'), {
				callback: function (rec) {
					rec.erase({ callback: finish });
				}
			});
		});

		Ext.Array.each(rules, function (rule) {
			var toSave = Ext.create('AdministratorSearch.model.t_PerfilVehicleRuleModel', {
				pvr_idPerfilVehicle: perfilId,
				pvr_iLunes: rule.get('pvr_iLunes') ? 1 : 0,
				pvr_iMartes: rule.get('pvr_iMartes') ? 1 : 0,
				pvr_iMiercoles: rule.get('pvr_iMiercoles') ? 1 : 0,
				pvr_iJueves: rule.get('pvr_iJueves') ? 1 : 0,
				pvr_iViernes: rule.get('pvr_iViernes') ? 1 : 0,
				pvr_iSabado: rule.get('pvr_iSabado') ? 1 : 0,
				pvr_iDomingo: rule.get('pvr_iDomingo') ? 1 : 0,
				pvr_tHoraInicio: controller.normalizeTime(rule.get('pvr_tHoraInicio')),
				pvr_tHoraFin: controller.normalizeTime(rule.get('pvr_tHoraFin'))
			});

			toSave.setId(rule.get('Id') || 0);
			toSave.save({ callback: finish });
		});
	},

	onCancelClick: function (button) {
		button.up('window').close();
	}
});
