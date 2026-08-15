Ext.define('GestorSim.controller.SimGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['m_simcardModel', 'm_simcardSearchModel', 'T_SimCard_APNModel', 'T_SimCard_EstadoModel', 'T_SimCard_MarcaModel'],
    views: ['SimGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'simgridview': {
                afterrender: this.initView,
                itemdblclick: this.ononItemClickInternal,
                objectedit: this.onObjectEdit,
                objectcreated: this.onCuentaCreated,
                cuentachanged: this.onCuentaChanged,




                openNew: this.onCrearcuentaClick
            },
            'simgridview button[action=filterEliminar]': {
                click: this.onEliminarClick
            },

            // 'simgridview button[action=removefilter]' : {
            //     click: this.onRemovefilterClick
            // },
            'simgridview button[action=filterText]': {
                click: this.onFiltertextClick
            },
            'simgridview button[action=crearCuenta]': {
                click: this.onCrearcuentaClick
            },
            'simgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'simnewview': {
                objectcreated: this.onCuentaCreated
            },

            'simgridview #filiacion': {
                click: this.onFiliacionClick
            },
            'simgridview #cuenta': {
                click: this.onCuentaClick
            },
            'simgridview button[action="delete"]': {
                click: this.onDeleteClick
            },
        });
    }, //



    onDeleteClick: function (button, event, options) {

        var view = button.up('simgridview');
        var model = this.getM_simcardModelModel();
        var selection = view.getSelectionModel().getSelection();
        if (selection) {


            // view.store.remove(selection);
            // var delRec = view.store.getRemovedRecords();
            Ext.Array.each(selection, function (rec) {
                let cuenta = rec.get("cue_cnombre");
                Ext.Msg.confirm(getLocale("Eliminar"), getLocale(`Desea eliminar la SIM de la cuenta ${cuenta}`), (button) => {
                    if (button == 'yes') {
                        // record.setConfig({proxy: model.getProxy()});
                        let rec_ext = Ext.create(model, {
                            Id: rec.get("Id")
                        });


                        rec_ext.erase({
                            callback: function (record, operation) {


                                if (operation.success) {
                                    notify('Se eliminio exitosamente');

                                }
                                else {
                                    notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                                }
                                view.store.load();

                            }

                        });
                    }

                });

            }, this);
        }
    },

    onFiliacionClick: function (btn, sacarFallo) {
        var view = btn.up('simgridview');
        let campos = ['tsa_cDescripcion', 'sim_csid', 'sim_fecha_activacion', 'sim_iccid', 'sim_agente', 'sim_observaciones'];


        view.stateId = 'a' + btn.pressed;


        Ext.Array.forEach(campos, (key) => {
            let path = `gridcolumn[dataIndex=${key}]`;
            if (view.down(path)) {

                view.down(path).setVisible(!btn.pressed)
            }
        });

        this.evaluarColumnasHide(view);
    },

    /**
     * BC 389356119 : Funcion creada para cuando se llame a la VIEW con la propiedad columnUnhide habilite las columnas ocultas.
     */
    evaluarColumnasUnhide: function (view) {
        if (view.columnUnhide) {
            var arrColumnId = view.columnUnhide.split(',');
            Ext.Array.each(arrColumnId, function (value) {
                view.columns[value].setVisible(true);
            })
        }
    },

    evaluarColumnasHide: function (view) {
        if (view.columnHide) {
            var arrColumnId = view.columnHide.split(',');
            Ext.Array.each(arrColumnId, function (value) {
                view.columns[value].setVisible(false);
            })
        }
    },

    initView: function (view) {
        // 
        var viewport = view.up('viewport');
        var controller = this;

        view.storeCuenta = Ext.create('Ext.data.Store', {
            model: controller.getM_simcardSearchModelModel(),
            pageSize: 25,
            remoteSort: true,
            autoDestroy: true,
            remoteFilter: true,
            // listeners:{
            //     beforeload: controller.onBeforeload
            // },
            // filters: filters,
            sorters: [
                {
                    property: 'sim_cuenta',
                    direction: 'ASC'
                }
            ]
        })

        view.storeCuenta.view = view;
        view.bindStore(view.storeCuenta);



        controller.loadData(view, controller);


        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.storeCuenta);



        var vMarca = Ext.create('Ext.data.Store', {
            model: this.getT_SimCard_MarcaModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        });
        view.down('#sim_marca').bindStore(vMarca);
        vMarca.load();

        var vEstado = Ext.create('Ext.data.Store', {
            model: this.getT_SimCard_EstadoModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        });
        view.down('#sim_estado').bindStore(vEstado);
        vEstado.load();

        var vAPN = Ext.create('Ext.data.Store', {
            model: this.getT_SimCard_APNModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        });
        view.down('#sim_apn').bindStore(vAPN);
        vAPN.load();

    },

    loadData: function (view, controller) {
        // view.persistedSelection = view.getSelectionModel().getSelection()
        view.storeCuenta.load({
            callback: function (records, data) {

            }
        });
    },



    onBeforeload: function (store, operation, options) {
        operation.store = store;
        var params = {}
        if (store.view.fieldList) {
            params.fieldlist = store.view.fieldList;
        }

        operation.params = params;
    },


    ononItemClickInternal : function(grid, record)
    {
        var view = grid.up('simgridview');
        this.onItemClick(view, record);

    },
    onItemClick: function (view, record) {


        var id = record.get('Id');

        // var child = Ext.widget('simnewview', {
        //     caller: view,
        //     record: record,
        //     objectId: id
        // });
        var panel = view.up('#center');
        var title = record.get('cue_cnombre');//record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');
        title = title
            .replace(/,/g, '')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/#/g, '')
            .replace(/\./g, '')
            .replace(/>/g, '');
        var mytab;
        if(title!='')
            mytab = panel.down('[title="' + title + '"]');
        else
            title = record.get('sim_codigo');

        // var win = Ext.create('Ext.Window', {
        //     layout: 'fit',
        //     title: title,
        //     width: 550,
        //     height: 500,
        //     border: false,
        //     items: child
        // });
        // win.show();

        if (!mytab) {
            var newTab = Ext.widget("cuentaview", {
                tabConfig: { translate: false },
                title: title,
                caller: view,
                record: record,
                objectId: id,
                translate: false,
                closable: true,
                closeAction: 'destroy',
            });
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            mytab.show();
        }


    },












    onEliminarClick: function (button, event, options) {

        var view = button.up('simgridview');
        var store = view.getStore();

        //saco filtro fallo
        this.removeFalloTstFilter(view)

        var filters = Ext.clone(store.filters.items);
        filters.push({
            property: 'Situacion',
            value: 'Eliminar',
            id: 'estado'
        })
        filters.push(view.filterTipoObj);

        store.filters.clear();//dedalo habilito porque se mezclan los filtros
        store.currentPage = 1;
        store.filter(filters);
    },





    onFiltertextClick: function (button, event, options) {

        var view = button.up('simgridview');
        var store = view.getStore();
        var url = ""

        store.currentPage = 1;

        var filters = Ext.clone(store.filters.items);
        let campos = ['sim_cuenta', 'sim_codigo', 'sim_marca', 'sim_estado', 'sim_apn', 'sim_csid', 'sim_fecha_activacion', 'sim_iccid', 'sim_observaciones'];


        Ext.Array.forEach(campos, (key) => {
            let _id = `#${key}`;
            if (view.down(_id) && view.down(_id).getValue()) {

                if (_id == '#sim_fecha_activacion') {
                    filters.push({
                        property: `${key}`,
                        value: new Date(Ext.Date.format(view.down(_id).getValue(), 'Y-m-d')),
                        id: `${key}`
                    });
                    url += `,{"property":"${key}","value":"${view.down(_id).getValue()}"}`;
                }
                else {
                    filters.push({
                        property: `${key}`,
                        value: view.down(_id).getValue(),
                        id: `${key}`
                    });
                    url += `,{"property":"${key}","value":"${view.down(_id).getValue()}"}`;
                }

            } else {
                filters = filters.filter(function (r) {
                    return r._id != `${key}`
                })
            }
        });

        if (view.down('#removefilter')) {
            view.down('#removefilter').toggle(false);
        }

        store.filters.clear(true);
        store.remoteFilter = false;
        store.filter(filters, true);
        store.remoteFilter = true;

        store.load({
            callback: function () {

                view.down('#filtro').hideMenu();
            }
        })
    },

    onRemovefilterClick: function (button, event, options) {

        var controller = this;
        var view = button.up('simgridview');
        var store = view.getStore();
        store.clearFilter(true);

        //saco filtro fallo
        this.removeFalloTstFilter(view)

        //limpio campo
        //view.down('#query').setValue('');
        view.down('#dealer').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#nombre').setValue('');
        view.down('#calle').setValue('');
        view.down('#email').setValue('');
        view.down('#telefono').setValue('');

        if (view.down('#cue_cIdExtendido')) {
            view.down('#cue_cIdExtendido').setValue('');
        }

        if (view.down('#panel')) {
            view.down('#panel').setValue('');
        }

        if (view.down('#clave')) {
            view.down('#clave').setValue('');
        }

        if (view.down('#equipogprs')) {
            view.down('#equipogprs').setValue('');
        }

        if (view.down('#campocustom')) {
            view.down('#campocustom').setValue('');
        }

        if (view.down('#imei')) {
            view.down('#imei').setValue('');
        }

        view.down('#comboProvincia').setValue('');
        view.down('#localidad').setValue('');
        if (view.down('#tipo')) {
            view.down('#tipo').setValue('');
        }
        if (view.down('#comboefectiva')) {
            view.down('#comboefectiva').setValue('');
        }
        //var filters = [];
        //filters.push(view.filterTipoObj);
        // store.filter(filters);

        if (view.down('#particiones')) {
            view.down('#particiones').toggle(false);
        }


        var filters = Ext.clone(view.filters);

        store.remoteFilter = false;
        store.filter(filters, true);
        store.remoteFilter = true;

        store.load({
            callback: function () {

                if (view.caller) {
                    controller.onFiltertextClick(button);
                }
                button.toggle(true);

            }
        });

        /*
        if (!buttonParticiones.pressed){
            filters.push({
                property: 'cue_nparticion',
                value: '0',
                id: 'cue_nparticion'
            });
            filters.push(view.filterTipoObj);
            store.filter(filters);
        } else {
            store.filters.removeAtKey('cue_nparticion');
            store.filter(view.filterTipoObj);
        }
        */
    },

    onObjectEdit: function (record, view) {

        this.onItemClick(view, record);
    },

    onCrearcuentaClick: function (button, event, options) {

        var model = this.getM_simcardModelModel();

        var myobject = Ext.create(model, {
            Id: 0

        })

        var view = button.up('simgridview') ? button.up('simgridview') : button;

        var child = Ext.widget('simnewview', {
            isAdmin: view.isAdmin,
            isAccount: view.isAccount,
            caller: view,
            record: myobject,
            createTipo: view.createTipo,
            fenceOptions: view.fenceOptions
        });

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Nueva SIM',
            width: 660,
            height: 670,
            border: false,
            items: child
        });
        win.show();
    },

    onCuentaCreated: function (view) {

        // var record = this.getM_simcardModelModel();

        // var myobject = record.create({

        // });
        
        var grid = view.caller ? view.caller : view;
        var paging = grid.down('#pagingtoolbar');

        // this.onItemClick(grid.getView(), myobject);
        // paging.moveFirst();
        paging.doRefresh();

        // var store = grid.getStore();
        // var filters = [];
        // filters.push(grid.filterTipoObj);
        // store.filter(filters);
    },


    onCuentaClick: function (btn) {
        var view = btn.up('simgridview')
        var filterTipo = '';
        var filterTipoNOT = '';
        var sinVehiculo = '';
        var soloVehiculo = '';



        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione una Cuenta',
            closeAction: 'destroy',
            itemId: 'cuentaWin',
            width: 750,
            height: 550,
            border: true,
            modal: true,
            view: view,
            items: [
                {
                    xtype: 'cuentahelperview',
                    filterTipo: filterTipo,
                    filterTipoNOT: filterTipoNOT,
                    selectionEvent: 'cuentachanged',
                    soloVehiculo: soloVehiculo,
                    sinVehiculo: sinVehiculo,
                    caller: view
                }
            ]
        });
        win.show();
    },
    onCuentaChanged: function (cuenta, view) {
        // var _view = view.up('simnewview');
        var cuentaId = cuenta.get('Id');
        view.down('#sim_cuenta').setValue(cuenta.get('Id'));
        view.down('#nombrecuenta').setValue(cuenta.get('cue_cnombre'));
        view.down("#filtro").showMenu();
    },
    onGetAllClick: function (button, event, options) {

        var view = button.up('simgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);

        let campos = ["nombrecuenta", 'sim_cuenta', 'sim_codigo', 'sim_marca', 'sim_estado', 'sim_apn', 'sim_csid', 'sim_fecha_activacion', 'sim_iccid', 'sim_observaciones'];


        Ext.Array.forEach(campos, (key) => {
            let _id = `#${key}`;
            if (view.down(_id)) {
                view.down(_id).setValue('')
            }
        });
    }
});