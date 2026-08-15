//MIGRADO2024
/**
 * NOTAS
 * 
 * RIGHTS: segun que app utiliza este modulo viene en view.rights o view.security.rights (webremoto)
 * 
 * 
 * ATENCION: cuando se cambia el orden de los registros hace un request por cada regsitro
 *  
 */

Ext.define('Common.controller.SoftguardContactoGridController', {
    extend: 'Ext.app.Controller',
    _moveChain: Promise.resolve(),
    stores: ['Common.store.TablaListasEmergenciaStore', 'Common.store.TelefonoDiscadoStore', 'Common.store.SiNoStore'],
    models: ['SoftguardTelefonoModel', 'TablaListasEmergenciaModel', 'NameValueModel', 'NameValueIntModel', 'm_telefonoModel'],
    views: ['Common.view.SoftguardContactoGridView'],
    refs: [
        {
            ref: 'statusBar',
            selector: '#statusbar'
        },
        {
            ref: 'phoneGrid',
            selector: 'gridphones'
        }
    ],
    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'gridphones button[action=delete]': {
                click: this.onDeleteClick
            },
            'gridphones button[action=add]': {
                click: this.onAddClick
            },
            'gridphones button[action=save]': {
                click: this.onSaveClick
            },
            'gridphones button[action=up]': {
                click: this.onUpClick
            },
            'gridphones button[action=down]': {
                click: this.onDownClick
            },
            'gridphones button[action=plantillas]': {
                click: this.onPlantillasClick
            },
            'gridphones button[action=copyphones]': {
                click: this.onCopyPhonesClick
            },
            'gridphones': {
                afterrender: this.loadData,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                cuentachanged: this.onCuentaSelected,
                objectchanged: this.onObjectchanged,
                selectionchange: this.onRowSelectChange
            }

        });
    }, // cierro init
    onObjectchanged: function (view) {
        this.loadData(view)
    },
    loadData: function (view) {
        this.view = view;
        var record = view.record;
        var module = view.module;
        var profile = module ? module.get('profile') : 1;
        view.profile = profile;

        if (profile < 2) {
            view.down('toolbar').hide();
        }

        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        view.mystore = Ext.create('Ext.data.Store', {
            model: 'Common.model.SoftguardTelefonoModel',
            remoteSort: false,
            pageSize: 600,
            sorters: [
                {
                    property: 'tel_norden',
                    direction: 'ASC'
                }
            ]
        });

        var _ObjectId = record.get('cue_iid');

        //verifico de donde saco los rights en webremoto viene con view.security.rights y en el resto en view.rights
        var rights;
        if (view, rights) {
            rights = view.rights;
        } else if (view.security && view.security.rights) {
            rights = view.security.rights;
        }

        if ((profile > 2 && profile != 4) || (rights && rights.claves == true)) {
            view.down('#tel_cclave').show();
        }


        // una vez que cargue el store hago el binding con la view
        if (_ObjectId > 0) {
            view.mystore.load({ ObjectId: _ObjectId, view: view, store: view.mystore, callback: this.doBindStore });
        } else {
            notifyError("No existe el id de la cuenta");
        }

    },

    doBindStore: function (records, operation, success) {
        if (success) {
            operation.view.bindStore(operation.store);
        }

    },
    onDeleteClick: function (button, event, options) {
        var view = button.up('gridphones');


        Ext.MessageBox.confirm(getLocale('Confirmación'), getLocale('Está seguro?'), function (btn) {
            if (btn == 'yes') {
                var selection = view.getSelectionModel().getSelection()[0];
                if (selection) {
                    view.store.remove(selection);
                }

                selection.erase({
                    callback: function (records, operation) {
                        if (operation.success) {
                            notify('Los datos se eliminaron con éxito');
                        }

                    }
                });
            }
        });

    },
    onAddClick: function (button, event, options) {
        var view = button.up('gridphones');
        var cuenta = view.record;
        var store = view.getStore();
        var id = cuenta.get('cue_iid') ? cuenta.get('cue_iid') : cuenta.get('Id');

        /*var records = store.add({
            tel_iidcuenta: id,
            tel_norden: store.max('tel_norden')?store.max('tel_norden')+1:0
        });*/

        var record = this.getSoftguardTelefonoModelModel().create({
            //Id:0,
            tel_iidcuenta: id,
            tel_norden: store.max('tel_norden') ? store.max('tel_norden') + 1 : 0
        })
        //record.setId(0)
        this.openFormWindow(getLocale('Nuevo Contacto'), record, view);

    },
    onSaveClick: function (button, event, options) {
        var view = button.up('gridphones');
        var store = view.store;

        var model = this.getM_telefonoModelModel();
        store.setConfig({
            proxy: model.getProxy()
        });
        store.sync({
            success: function () {
                notify(getLocale('Los cambios se guardaron con éxito'));
            }
        });

    },

    onItemDblClick: function (view, record, item, index, e, options) {
        this.openFormWindow(record.get('tel_cnombre'), record, view);
    },

    openFormWindow: function (title, record, grid) {
        var view = grid.up('gridphones') ? grid.up('gridphones') : grid;
        var controller = this;
        /* var ultimaPsicion = view.mystore.max('tel_norden')+1;
        view.mystore.each(function (value, key) {
            if(ultimaPsicion <  value.get('tel_norden')) {
            ultimaPsicion = value.get('tel_norden');
            }
        });*/
        //var model = this.getM_telefonoModelModel();
        //model.load(rec.get('Id'),{
        //    callback: function(record){
        if (view.profile >= '2') {
            var newView = Ext.widget('contactoformview', {
                record: record,
                callback: this.onFormEdit,
                caller: view,
                scope: this,
                grid: grid,
                profile: view.profile,
                rights: view.rights,
                ultimaPsicion: record.get('tel_norden')//ultimaPsicion
            });
            // Lo agregamos al panel
            var myWindow = Ext.widget('window', {
                title: title,
                translate: false,
                height: 520,
                width: 500,
                modal: true,
                items: newView,
                closable: false,
                layout: 'fit',
            }).show();

        } else if (controller.application._nameModule == 'SerTec' || view.profile <= 1) {
            var serTecContactWindow = Ext.widget('contactoformview', {
                record: record,
                callback: this.onFormEdit,
                caller: view,
                scope: this,
                grid: grid,
                profile: 'readOnly',
                ultimaPsicion: record.get('tel_norden')//ultimaPsicion
            }
            );
            // Lo agregamos al panel
            var myWindow = Ext.widget('window', {
                title: title,
                translate: false,
                height: 520,
                width: 400,
                modal: true,
                items: serTecContactWindow,
                closable: false,
                layout: 'fit',
            }).show();

        } else {
            notifyError('No posee derechos para esta operación');
        }
        //}
        //});



    },

    onObjectEdit: function (record, view) {
        this.openFormWindow(record.get('tel_cnombre'), record, view);
    },

    onDownClick: function (button, event, options) {
        var view = button.up('gridphones');
        this.moveSelectedRow(view, 1);
    },

    onUpClick: function (button, event, options) {
        var view = button.up('gridphones');
        this.moveSelectedRow(view, -1);
    },

    onCopyPhonesClick: function (button, event, options) {
        var view = button.up('gridphones');


        var hidebuttons = [];
        if (this.application._nameModule == 'VigiControl' || this.application._nameModule == 'TrackGuard') {
            hidebuttons.push('#fallotst')
            hidebuttons.push('#particiones')

        }

        //var soloVehiculo = false;
        var filterTipo = '';
        if (this.application._nameModule == 'TrackGuard') {
            //soloVehiculo = true;
            filterTipo = 'nofilter';
        }

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione Cuentas',
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
                    caller: view,
                    multiSelect: false,
                    tip_nCondicion: view.tip_nCondicion,
                    selectionEvent: 'cuentachanged',
                    hidebuttons: hidebuttons,
                    filterTipo: filterTipo
                    //soloVehiculo: soloVehiculo
                }
            ]
        });
        win.show();

    },

    onRowSelectChange: function (selModel, selections) {

        var grid = selModel.view.up('gridphones'),
            buttonde = grid.down('#delete'),
            buttonup = grid.down('#up'),
            buttondo = grid.down('#down');

        if (selections.length > 0) {
            buttonde.setDisabled(false);
            buttonup.setDisabled(false);
            buttondo.setDisabled(false);
        } else {
            buttonde.setDisabled(true);
            buttonup.setDisabled(true);
            buttondo.setDisabled(true);
        }


    },

    onCuentaSelected: function (cuenta, view) {
        var controller = this;
        var dialog = Ext.create('Ext.window.MessageBox', {
            buttons: [
                {
                    text: 'Si',
                    handler: function () {
                        Ext.Ajax.request({
                            url: '/rest/search/cuentatelefonoeliminar',
                            params: { idCuenta: view.record.get('cue_iid') },
                            method: 'GET',
                            scope: this,
                            success: function (response) {
                                var parametros = Ext.JSON.decode(response.responseText);
                                var rec = parametros.rows[0];

                                if (rec.Error == 0) {
                                    view.mystore.load({
                                        ObjectId: view.record.get('cue_iid'), view: view, store: view.mystore, callback: function () {
                                            controller.contactoscopiar(cuenta, view, controller);
                                            dialog.close();
                                        }
                                    });

                                } else {
                                    notifyError(rec.Message);
                                    view.close();
                                }

                            }
                        });

                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        controller.contactoscopiar(cuenta, view, controller);
                        dialog.close();
                    }
                },
                {
                    text: 'Cancelar',
                    handler: function () {
                        dialog.close();
                    }
                }
            ]
        });
        dialog.show({
            title: getLocale('Eliminar contactos?'),
            msg: getLocale('Desea reemplazar los contactos existentes (caso contrario se sumarán al listado actual)'),
            icon: Ext.Msg.QUESTION
        });
    },

    contactoscopiar: function (cuenta, view, controller) {
        var copiarStore = Ext.create('Ext.data.Store', {
            model: controller.getSoftguardTelefonoModelModel(),
            remoteSort: false,
            sorters: [
                {
                    property: 'tel_norden',
                    direction: 'ASC'
                }
            ]
        });
        var _ObjectId = cuenta.get('cue_iid');
        var t = this;
        copiarStore.load({
            ObjectId: _ObjectId, view: view, store: view.mystore, callback: function (records) {
                view.setLoading(getLocale('Copiando contactos...'));
                /*Ext.Array.each(records, function(recordCopiar){   
                    var copiar = true; 
                    Ext.Array.each(view.mystore.data.items, function(record){   
                        if(record.get('tel_ctelefono').substr(-8) == recordCopiar.get('tel_ctelefono').substr(-8)) {
                            copiar = false;
                            return null;
                        }
                    }); 
                 
                    if(copiar) {
                        var rec = Ext.create(controller.getSoftguardTelefonoModelModel(),{
                            tel_cclave: recordCopiar.get("tel_cclave"),
                            tel_clista: recordCopiar.get("tel_clista"),
                            tel_cnombre: recordCopiar.get("tel_cnombre"),
                            tel_cobservacion: recordCopiar.get("tel_cobservacion"),
                            tel_cpermiso: recordCopiar.get("tel_cpermiso"),
                            tel_cpostdigito: recordCopiar.get("tel_cpostdigito"),
                            tel_cpredigito: recordCopiar.get("tel_cpredigito"),
                            tel_ctelefono: recordCopiar.get("tel_ctelefono"),
                            tel_iid: recordCopiar.get("tel_iid"),
                            tel_iidcuenta: view.record.get('cue_iid'),
                            tel_ndiscado: recordCopiar.get("tel_ndiscado"),
                            tel_norden: recordCopiar.get("tel_norden"),
                            tel_nsms: recordCopiar.get("tel_nsms"),
                            tel_nsp: recordCopiar.get("tel_nsp"),
                            tel_ntr: recordCopiar.get("tel_ntr")
                        });
                    	
                        rec.save({
                            callback: function(){
                                view.mystore.add(rec);
                            }
                        });
                        
                    }
                    
                   
                    
                });*/
                t.grabadoRecursivo(view, records, 0)
                view.setLoading(false);
            }
        });

    },

    grabadoRecursivo: function (view, records, posicion) {
        var copiar = true;
        var t = this;
        var recordCopiar = records[posicion]

        if (posicion + 1 > records.length) {
            return false;
        }

        Ext.Array.each(view.mystore.data.items, function (record) {
            if ((record.get('tel_ctelefono').substr(-8) == recordCopiar.get('tel_ctelefono').substr(-8)) && (record.get('tel_cnombre') == recordCopiar.get('tel_cnombre'))) {
                copiar = false;
                t.grabadoRecursivo(view, records, posicion + 1)
                return false;
            }
        });
        /*
        console.log(
            recordCopiar.get("tel_cnombre"),
            recordCopiar.get("tel_ctelefono"),
            recordCopiar.get("tel_iid"),
            copiar
        );
        */
        if (copiar) {
            var rec = Ext.create(t.getSoftguardTelefonoModelModel(), {
                tel_cclave: recordCopiar.get("tel_cclave"),
                tel_clista: recordCopiar.get("tel_clista"),
                tel_cnombre: recordCopiar.get("tel_cnombre"),
                tel_cobservacion: recordCopiar.get("tel_cobservacion"),
                tel_cpermiso: recordCopiar.get("tel_cpermiso"),
                tel_cpostdigito: recordCopiar.get("tel_cpostdigito"),
                tel_cpredigito: recordCopiar.get("tel_cpredigito"),
                tel_ctelefono: recordCopiar.get("tel_ctelefono"),
                tel_iid: recordCopiar.get("tel_iid"),
                tel_iidcuenta: view.record.get('cue_iid'),
                tel_ndiscado: recordCopiar.get("tel_ndiscado"),
                tel_norden: recordCopiar.get("tel_norden"),
                tel_nsms: recordCopiar.get("tel_nsms"),
                tel_nsp: recordCopiar.get("tel_nsp"),
                tel_ntr: recordCopiar.get("tel_ntr")
            });
            if (isNaN(rec.id)) {
                rec.id = 0;
                rec.data.Id = 0;
            }
            rec.save({
                callback: function () {
                    view.mystore.add(rec);
                    t.grabadoRecursivo(view, records, posicion + 1)
                }
            });
        }
    },

    onPlantillasClick: function (button, event, options) {
        var grid = button.up('grid');

        var view = Ext.widget('telefonoplantillaview', {
            caller: grid
        });

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Plantillas',
            width: 450,
            height: 200,
            border: false,
            items: view
        });
        win.show();
    },

    moveSelectedRow: function (grid, direction) {
        var me = this;
        me._moveChain = (me._moveChain || Promise.resolve()).then(function () {
            return new Promise(function (resolve) {
                var sm = grid.getSelectionModel();
                var store = grid.getStore();
                var record = sm.getSelection()[0];
                if (!record) { resolve(); return; }

                var index = store.indexOf(record);
                var neighborIndex = direction < 0 ? index - 1 : index + 1;

                // límites
                if (neighborIndex < 0 || neighborIndex >= store.getCount()) {
                    resolve(); return;
                }

                var neighbor = store.getAt(neighborIndex);

                // --- SWAP de tel_norden (sin “+3”) ---
                var a = record.get('tel_norden');
                var b = neighbor.get('tel_norden');
                record.set('tel_norden', b);
                neighbor.set('tel_norden', a);

                // resort
                store.sort({ property: 'tel_norden', direction: 'ASC' });

                // re-seleccioná el que moviste (buscá su nueva posición)
                var newIdx = store.indexOf(record);
                if (newIdx !== -1) sm.select(newIdx, false, true);

                // persistí solo los cambiados; la cola evita solapes
                me.reorderContacts(grid).then(resolve);
            });
        }).catch(function () {
            // no rompas la cadena si algo falla puntualmente
        });
    },
    setMoveButtonsEnabled: function (grid, enabled) {
        var up = grid.down('#up');
        var down = grid.down('#down');
        if (up) up.setDisabled(!enabled);
        if (down) down.setDisabled(!enabled);
    },
    reorderContacts: function (view) {
        var store = view.getStore();

        // si no hay cambios, resolvé
        var hasChanges = store.getNewRecords().length ||
            store.getUpdatedRecords().length ||
            store.getRemovedRecords().length;

        if (!hasChanges) return Promise.resolve();

        return new Promise(function (resolve) {
            store.sync({
                callback: function () { resolve(); },
                failure: function () { resolve(); } // no trabes la cola por error
            });
        });
    }
});