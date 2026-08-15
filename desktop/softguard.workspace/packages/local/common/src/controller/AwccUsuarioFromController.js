//MIGRADO2024
Ext.define('Common.controller.AwccUsuarioFromController', {
    extend: 'Ext.app.Controller',
    stores: ['ProvinciasStore', 'LocalizationLanguageStore'],
    models: ['AdministratorFormModel', 'OrganizationSearchModel', 'UsersDesktopWebModulosModel'],
    views: ['AwccUsuarioFormView'],
    init: function (config) {
        this.control({
            'awccusuariosformview': {
                beforerender: this.initview,
                passwordchanged: this.onPasswordChanged,
                organizationchanged: this.onOrganizationChanged
            },
            'awccusuariosformview button[action="save"]': {
                click: this.onSaveClick
            },
            'awccusuariosformview button[action="passwordChange"]': {
                click: this.onPasschangeClick
            },
            'awccusuariosformview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'awccusuariosformview button[action="organizationChange"]': {
                click: this.onOrganizationChangeClick
            },
            'awccusuariosformview button[action="createorganization"]': {
                click: this.onCreateOrganizationClick
            }
        });
    },

    initview: function (view) {

        var record = view.record;
        if (isNaN(record.id)) {
            record.id = 0;
            record.data.Id = 0;
        }
        //console.log(view);
        var form = view.getForm();
        var field = form.findField('_organization');

        view.loadRecord(record);
        var controller = this;

        if (view.forceTypeUser) {
            view.down('#tipousuario').setValue(view.forceTypeUser);
            view.down('#tipousuario').setDisabled(true)
        }

        Ext.Ajax.request({
            url: '/rest/security/UserData/' + record.id + '/MetaData',
            success: function (resp, operation) {


                if (resp.responseText) {

                    var metadata = Ext.JSON.decode(resp.responseText);
                    //console.log(metadata)
                    if (metadata)
                        view.down('#language').setValue(metadata.language);
                    if (metadata.provincia) {
                        view.down('#provincia').setValue(metadata.provincia.id);
                    }


                    view.resetOriginal();
                } else {

                    var idUsuarioLogeado = _UserData.udw_idKey;
                    Ext.Ajax.request({
                        url: '/rest/security/UserData/' + idUsuarioLogeado + '/MetaData',
                        success: function (resp, operation) {


                            if (resp.responseText) {

                                var metadata = Ext.JSON.decode(resp.responseText);

                                if (metadata)
                                    view.down('#language').setValue(metadata.language);
                                view.down('#provincia').setValue(metadata.provincia.id);

                                view.resetOriginal();
                            }
                        }
                    });


                }
            }
        });


        // seteo la organizacion seleccionada

        var organizationId = parseInt(record.get('udw_empresa'));

        if (organizationId) {
            var store = Ext.create('Ext.data.Store', {
                model: this.getOrganizationSearchModelModel(),
                remoteSort: true,
                filters: [{
                    property: 'Id',
                    value: organizationId
                }],
                remoteFilter: true
            })

            store.load({
                callback: function (records, operation, success) {
                    if (success) {
                        var record = records[0];

                        var user = view.record;

                        if (record) {
                            field.setValue(record.get('Name'));
                            field.clearInvalid();

                        } else {
                            field.setValue(getLocale('No hay una organización asignada'));
                        }

                        view.resetOriginal();
                    }

                }
            });
        } else {
            field.setValue(getLocale('No hay una organización asignada'));
        }

        view.resetOriginal();

    },

    onSaveClick: function (button, event, options) {
        var view = button.up('awccusuariosformview');
        var model = view.record;
        //if(isNaN(model.id)){
        //    model.id = 0;
        //    model.data.Id = 0;
        //}
        //model.modified=model.data;
        form = view.getForm();
        form.updateRecord(model);
        var controller = this;


        var passFiled = view.down('#password');
        if (passFiled.getValue() == '') {
            passFiled.markInvalid(getLocale('Debe definir una clave.'));
            return false;
        } else {
            passFiled.clearInvalid();
        }


        var emailuser = view.down('#emailuser');
        if (!emailuser.isValid()) {
            notify('El campo de usuario debe ser un email.')
            return false;
        }

        if (model.get('udw_empresa') == '') {
            //  form.findField('_organization').markInvalid(getLocale('Debe seleccionar una empresa'));
            notify('Debe seleccionar una empresa')
        }
        else {
            form.findField('_organization').clearInvalid();

            // con esto se define AWCC el usuario
            model.set('udw_tipo', 2)
            if (form.isValid()) {
                model.save({
                    scope: this,

                    callback: function (record, operation) {
                        if (operation.success) {
                            notify('Los datos se guardaron con éxito');
                            //  view.up('administratorview').query('button')[2].enable();
                            //    view.up('administratorview').down('administratormodulesview #addModulo').enable();

                            //  view.up('administratorview').down('administratormodulesview').getStore().load({ObjectId:record.get('Id')});

                            // Guardo la metadata
                            var json = Ext.encode({ language: view.down('#language').getValue(), provincia: { nombre: view.down('#provincia').getRawValue(), id: view.down('#provincia').getValue() } });
                            Ext.Ajax.request({
                                url: '/rest/security/UserData/' + record.id + '/MetaData',
                                method: 'PUT',
                                params: json,
                                success: function (resp, operation) {
                                    // sin funcionalidad x ahora
                                }
                            });





                            var id = view.record.get('Id');

                            //agrego rango
                            var udwmRecord = controller.getUsersDesktopWebModulosModelModel().create({
                                //Id:0,
                                dwm_cuenta_desde: view.recordCuenta.get('cue_ncuenta'),
                                dwm_cuenta_hasta: view.recordCuenta.get('cue_ncuenta'),
                                dwm_dealer: view.recordCuenta.get('cue_clinea'),
                                dwm_idWeb: id
                            });
                            udwmRecord.set("Id", 0);
                            udwmRecord.save({
                                callback: function (record) {
                                    notify('Se agrego el rango.')
                                    view.caller.fireEvent('userSaved', record, view.caller);
                                    if (view.up('window')) {
                                        view.up('window').close()
                                    }
                                }
                            })

                            //agrego modulo desktop
                            var desktopid = controller.application.getModuleIdByName('Desktop');
                            var udwModuloRecord = controller.getUsersDesktopWebModulosModelModel().create({
                                // Id:0,
                                dwm_idModules: desktopid,
                                dwm_idKey: 0,
                                dwm_idWeb: id
                            });
                            udwModuloRecord.set("Id", 0);
                            udwModuloRecord.save({
                                callback: function (record) {
                                    notify('Se agrego el desktop.')

                                }
                            })




                            // obtengo el id de modulo
                            /*    var awccid = controller.application.getModuleIdByName('AWCC');
                                //agrego modulo awcc
                                controller.getUsersDesktopWebModulosModelModel().create({
                                    Id:0,
                                    dwm_idModules:awccid,
                                    dwm_idKey:0,
                                    dwm_idWeb:id
                                }).save({callback:function (record) {
                                    notify('Se agrego awcc.')
                                    
                                }})*/



                            /*   var awccid = controller.application.getModuleIdByName('TrackguardMonitoreo');
                               //agrego modulo awcc
                               controller.getUsersDesktopWebModulosModelModel().create({
                                   Id:0,
                                   dwm_idModules:awccid,
                                   dwm_idKey:0,
                                   dwm_idWeb:id
                               }).save({callback:function (record) {
                                   notify('Se agrego Trackguard.')
                                   
                               }})*/


                            controller.openUser(view, record)


                        }
                        else {
                            notifyError('Ya existe el usuario');
                        }
                    },
                    button: button,
                    view: view
                });
            }
        }

    },


    openUser: function (view, record) {
        var id = record.get('udw_idKey');
        var panel = view.caller.up('#center');
        var title = record.get('udw_usuario');
        var awccview = view.up('awccUsuariobydealergridview');

        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {

            var language = myQueryString.Language;

            var src = '/a/administrator/';

            if (language) {
                src = Ext.String.urlAppend(src, 'Language=' + language);
            }

            src = Ext.String.urlAppend(src, 'objectId=' + id);

            var createlangkey = myQueryString.createLangKey;
            if (createlangkey) {
                src = Ext.String.urlAppend(src, 'createLangKey=' + createlangkey);
            }

            src = Ext.String.urlAppend(src, 'autocreateviewport=true');

            var newTab = Ext.create('Ext.ux.IFrame', {
                title: title,
                translate: false,
                tabConfig: {
                    translate: false
                },
                objectId: id,
                border: false,
                src: src,
                closable: true,
                closeAction: 'destroy'
            });

            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            mytab.show();
        }



    },
    deleteObject: function (record) {
        record.destroy();
    },

    onPasschangeClick: function (button, event, options) {
        var view = button.up('awccusuariosformview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Cambio de clave',
            closeAction: 'hide',
            caller: view,
            fieldName: 'udw_clave',
            modal: true,
            width: 300,
            height: 150,
            border: false,
            items: { xtype: 'passwordformview', hardpassword: true }
        });
        win.show();
    },


    isMasterWebDealer: function (callback) {
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();

        modules.load({
            callback: function () {
                var masterModule = modules.findRecord('KeyReference', 'MasterWebDealer');

                if (masterModule.get('KeyReference') == 'MasterWebDealer') {

                    callback(true);
                } else {
                    callback(false);
                }

            }
        });

    },


    onOrganizationChangeClick: function (button, event, options) {
        var view = button.up('awccusuariosformview');

        var controller = this;

        var filter = [];
        this.isMasterWebDealer(function (isMaster) {

            if (isMaster) {
                Ext.Ajax.request({
                    url: '/rest/security/UserData',
                    success: function (resp, operation) {


                        if (resp.responseText) {

                            var metadata = Ext.JSON.decode(resp.responseText);
                            if (metadata) {

                                var modules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
                                var administratorModule = modules.findRecord('KeyReference', 'Administrator');

                                if (!administratorModule.get('Available')) {

                                    filter.push(
                                        {
                                            property: 'Organization:RelationParent',
                                            value: metadata.Company
                                        }
                                    );

                                }





                                var win = Ext.create('Ext.Window', {
                                    layout: 'fit',
                                    title: 'Seleccione una entidad',
                                    closeAction: 'destroy',
                                    caller: view,
                                    modal: true,
                                    width: 600,
                                    height: 400,
                                    border: false,
                                    items: {
                                        xtype: 'organizationhelperview',
                                        title: '',
                                        forceStatus: '7,8,9',
                                        hideTaxo: true,
                                        caller: view,
                                        filter: filter
                                    }
                                });
                                win.show();

                            }
                        }
                    }
                });

            } else {

                var win = Ext.create('Ext.Window', {
                    layout: 'fit',
                    title: 'Seleccione una entidad',
                    closeAction: 'destroy',
                    caller: view,
                    modal: true,
                    width: 600,
                    height: 400,
                    border: false,
                    items: {
                        xtype: 'organizationhelperview',
                        title: '',
                        forceStatus: 7,
                        hideTaxo: true,
                        caller: view
                    }
                });
                win.show();

            }

        })


    },

    onDeleteClick: function (button, event, options) {
        var myform = button.up('form').getForm();
        var record = myform.getRecord();

        Ext.Msg.buttonText.yes = 'Sí';
        Ext.Msg.show({
            buttons: Ext.Msg.YESNO,
            titel: 'Eliminar',
            msg: getLocale('Se eliminará el usuario y su configuración ¿Desea continuar?'),
            icon: Ext.Msg.WARNING,
            fn: function (respuesta) {
                if (respuesta == 'yes') {
                    record.destroy({
                        callback: function (record, operation) {
                            if (operation.success) {
                                var viewport = parent.Ext.getCmp('viewport')
                                var center = viewport.down('#center');
                                center.getActiveTab().close();
                                var paging = center.down('administratorsearchgridview').down('pagingtoolbar');

                                paging.moveFirst();
                                paging.doRefresh();

                            }
                        }
                    });
                }
            }
        });
    },

    onPasswordChanged: function (value, win) {
        var fieldname = win.fieldName;
        var view = win.caller;
        view.record.set(fieldname, value);
        view.getForm().findField(fieldname).setValue(value);
    },

    onOrganizationChanged: function (record, view) {
        if (record) {
            view.record.set('udw_empresa', record.get('Id').toString());
            view.getForm().findField('_organization').setValue(record.get('Name'));
        } else {
            view.record.set('udw_empresa', '');
            view.getForm().findField('_organization').setValue('');
        }

    },

    onCreateOrganizationClick: function (button, event, options) {
        var view = button.up('awccusuariosformview');
        var me = this;

        model = this.getOrganizationModelModel();

        var record = model.create({
            Name: getLocale('Nueva Organización'),
            Status: 7
        });
        record.save({
            callback: function (record, operation) {
                if (operation.success)
                    // abro la organizacion para editar
                    var title = '(' + record.get('Id') + ') ' + record.get('Name');

                var widget = 'organizationclientformview';
                var panel = Ext.widget(widget, {
                    iconCls: 'icon-Organization',
                    title: '',
                    targetTab: panel,
                    //objectId : record.get('Id'),
                    record: record,
                    overflowY: 'auto',
                    closable: false,
                    listeners: {
                        objectchanged: function (record) {
                            me.onOrganizationChanged(record, view);
                        }
                    }
                });

                var win = Ext.widget('window', {
                    height: 500,
                    width: 500,
                    title: title,
                    layout: 'fit',
                    items: panel
                }).show();

                // selecciono la organizacion  
            }
        });
    }
});