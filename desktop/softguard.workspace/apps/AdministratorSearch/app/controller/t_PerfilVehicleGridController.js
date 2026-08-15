Ext.define('AdministratorSearch.controller.t_PerfilVehicleGridController', {
	extend: 'Ext.app.Controller',
	models: ['t_PerfilVehicleModel', 't_PerfilVehicleSearchModel'],
	views: ['t_PerfilVehicleGridView', 't_PerfilVehicleFormView'],

	init: function (config) {
		this.control({
			't_perfilvehiclegridview': {
				afterrender: this.initView,
				itemdblclick: this.onItemClick,
				objectedit: this.onObjectEdit,
				objectdelete: this.onObjectDelete,
				refresh: this.refresh
			},
			't_perfilvehiclegridview button[action=add]': {
				click: this.onAdd
			},
			't_perfilvehiclegridview button[action=search]': {
				click: this.onSearchClick
			},
			't_perfilvehiclegridview button[action=getall]': {
				click: this.onGetAllClick
			},
			't_perfilvehiclegridview button[action=refresh]': {
				click: this.onRefreshClick
			}
		});
	},

	initView: function (view) {
		view.filters = [];
		var _store = Ext.create('Ext.data.Store', {
			model: this.getT_PerfilVehicleSearchModelModel(),
			pageSize: 50,
			remoteSort: true,
			remoteFilter: true,
			filters: view.filters
		});
		_store.load();
		view.bindStore(_store);
	},

	refresh: function (view) {
		view.getStore().load();
	},

	onRefreshClick: function (button) {
		button.up('t_perfilvehiclegridview').getStore().load();
	},

	onAdd: function (button) {
		var view = button.up('t_perfilvehiclegridview');

		var myobject = Ext.create('AdministratorSearch.model.t_PerfilVehicleModel', {});
		myobject.setId(0);

		this.openForm('Nuevo perfil de acceso vehicular', myobject, view);
	},

	onItemClick: function (grid, record) {
		var view = grid.up('t_perfilvehiclegridview') ? grid.up('t_perfilvehiclegridview') : grid;
		var controller = this;

		this.getT_PerfilVehicleModelModel().load(record.get('Id'), {
			success: function (rec) {
				controller.openForm('Perfil: ' + rec.get('pfv_cNombre'), rec, view);
			}
		});
	},

	onObjectEdit: function (record, grid) {
		this.onItemClick(grid, record);
	},

	openForm: function (title, record, view) {
		var formView = Ext.widget('t_perfilvehicleformview', {
			caller: view,
			record: record
		});

		var win = Ext.create('Ext.Window', {
			iconCls: 'icon-table-add',
			layout: 'fit',
			title: title,
			translate: false,
			width: 800,
			height: 600,
			border: false,
			modal: true,
			items: formView
		});
		win.show();
	},

	onObjectDelete: function (record, grid) {
		var view = grid.up('t_perfilvehiclegridview') ? grid.up('t_perfilvehiclegridview') : grid;
		var controller = this;

		Ext.Msg.confirm(
			getLocale('Eliminar perfil'),
			getLocale('¿Confirma que desea eliminar el perfil') + ' "' + record.get('pfv_cNombre') + '"?',
			function (answer) {
				if (answer !== 'yes') {
					return;
				}

				// Cargar y despues erase(), como ContratoItemGridController: en ExtJS 7
				// Model.destroy() no borra en el servidor, solo destruye el objeto en memoria.
				controller.getT_PerfilVehicleModelModel().load(record.get('Id'), {
					callback: function (rec) {
						rec.erase({
							success: function () {
								notify(getLocale('El perfil se eliminó con éxito'));
								view.getStore().load();
							},
							// El trigger tr_t_PerfilVehicle_DeleteCheck rechaza el borrado
							// si el perfil esta asignado a algun vehiculo.
							failure: function () {
								Ext.Msg.alert(
									getLocale('No se puede eliminar'),
									getLocale('El perfil está asignado a vehículos activos.')
								);
								view.getStore().load();
							}
						});
					}
				});
			}
		);
	},

	onSearchClick: function (button) {
		var view = button.up('t_perfilvehiclegridview');
		var store = view.getStore();
		var filters = Ext.clone(view.filters);

		store.clearFilter(true);

		var nombre = view.down('#nombre').getValue();
		if (nombre) {
			filters.push({
				property: 'pfv_cNombre:LIKE',
				value: nombre
			});
		}

		store.filter(filters);
		store.load();
	},

	onGetAllClick: function (button) {
		var view = button.up('t_perfilvehiclegridview');
		var store = view.getStore();

		store.clearFilter(true);
		store.filter(view.filters);
		view.down('#nombre').setValue('');
		store.load();
	}
});
