Ext.define('AccessControl.controller.p_controlAcceso_AutorizacionFormController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['p_controlAcceso_AutorizacionModel','p_controlAcceso_IOModel'],
    views: ['p_controlAcceso_AutorizacionFormView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'p_controlacceso_autorizacionformview': {
                afterrender: this.initview
            },
            'p_controlacceso_autorizacionformview button[action="save"]': {
                click: this.onSaveClick
            },
            'p_controlacceso_autorizacionformview #todoeldia': {
                change: this.onTodoElDiaChange
            },
            'p_controlacceso_autorizacionformview button[action="createO"]': {
                click: this.onCreateOClick
            },
            'p_controlacceso_autorizacionformview button[action="createI"]': {
                click: this.onCreateIClick
            }
        });
    }, // cierro init


    onTodoElDiaChange: function (check, value) {
        var view = check.up('p_controlacceso_autorizacionformview')

        if (value) {
            view.down('#caa_horadesde').setValue('00:00')
            view.down('#caa_horahasta').setValue('23:59')

            view.down('#caa_horadesde').hide()
            view.down('#caa_horahasta').hide()
        } else {
            view.down('#caa_horadesde').show()
            view.down('#caa_horahasta').show()
        }
    },

    initview: function (view) {
        var record = view.record;
        view.loadRecord(record);

        if (view.record.get('Id') != 0) {
            Ext.Array.each(view.down('checkboxgroup').items.items, function (value) {
                value.hide()
            })

            var caa_diasemana = record.get('caa_diasemana');

            view.down('#caa_diasemana').setValue({
                caa_diasemana: [caa_diasemana]
            });

            var _caacheckbox = view.down('checkboxgroup').down('[inputValue=' + caa_diasemana + ']');
            if (_caacheckbox) {
                _caacheckbox.show();
            }

            if (view.createIO){
                view.down('#createI').show();
                view.down('#createO').show();
            }

            view.down('#todoeldia').hide()
            view.down('#usuario').setValue(view.record.get('usu_cnombre'))
        }
    },

    onCreateIClick: function (button, event, options) {
        var controller = this;
        var view = button.up('p_controlacceso_autorizacionformview');
        var record = view.record;

        var model = controller.getP_controlAcceso_IOModelModel()
        var myobject = model.create({
            cac_idautorizado: record.get('caa_idautorizado'),
            cac_tipoacceso: 1,
            cac_autorizacodigo: record.get('caa_codigo'),
            cac_autorizatipo: 3,
            cac_autorizaid: record.get('Id')
        });
        myobject.setId(0);

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Nuevo ingreso',
            width: 450,
            height: 450,
            border: false,
            items: {
                xtype:'p_controlacceso_ioformview',
                caller: view,
                record: myobject
            }
        });
        win.show();
    },

    onCreateOClick: function (button, event, options) {
        var controller = this;
        var view = button.up('p_controlacceso_autorizacionformview');
        var record = view.record;

        var model = controller.getP_controlAcceso_IOModelModel()
        var myobject = model.create({
            cac_idautorizado: record.get('caa_idautorizado'),
            cac_tipoacceso: 0,
            cac_autorizacodigo: record.get('caa_codigo'),
            cac_autorizatipo: 3,
            cac_autorizaid: record.get('Id')
        });
        myobject.setId(0);

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Nuevo Egreso',
            width: 450,
            height: 450,
            border: false,
            items: {
                xtype:'p_controlacceso_ioformview',
                caller: view,
                record: myobject
            }
        });
        win.show();
    },

    onSaveClick: function (button, event, options) {
        var controller = this
        var myform = button.up('form').getForm();
        var view = button.up('p_controlacceso_autorizacionformview');
        var win = button.up('window');
        var record = view.record;

        myform.updateRecord(record);

        if(view.down('#caa_diasemana').getChecked().length==0){//if (!record.get('caa_diasemana')){
            record.set('caa_diasemana',-1);
        }

        if (myform.isValid()) {
            if (view.record.get('Id') != 0) {
                //no funciona el parametro submitformat de los campos timefield
                record.set('caa_horadesde', Ext.Date.format(new Date(record.get('caa_horadesde')), 'H:i:s'))
                record.set('caa_horahasta', Ext.Date.format(new Date(record.get('caa_horahasta')), 'H:i:s'))
                var caa_diasemana = view.down('#caa_diasemana');
                if(view.down('#caa_diasemana').getChecked().length>0){//if ( caa_diasemana && Object.keys(caa_diasemana.getValue()).length>0){
                    record.set('caa_diasemana', caa_diasemana.getValue().caa_diasemana);
                }
                record.save({
                    scope: this,
                    view: view,
                    callback: function (record, operation) {
                        if (operation.success) {
                            var win = view.up('window');
                            if(view.caller)
                                view.caller.fireEvent('objectchanged', view.caller, record);

                            notify('Los datos se guardaron correctamente');
                            win.close();
                        } else {
                            notifyError('Hubo un error al guardar los datos');
                        }
                    },
                    button: button
                });
            } else {
                console.log(view.down('#caa_diasemana').getValue())
                var diasSeleccionados = view.down('#caa_diasemana').getValue().caa_diasemana
                
                if(diasSeleccionados){
                    Ext.Array.each(diasSeleccionados, function (value, key) {

                            var myobject = controller.getP_controlAcceso_AutorizacionModelModel().create({
                                caa_idautorizado: view.record.get('caa_idautorizado'),
                                caa_diasemana: value
                            })
                            myobject.setId(0);

                            myform.updateRecord(myobject);
                            myobject.set('caa_horadesde', Ext.Date.format(new Date(record.get('caa_horadesde')), 'H:i:s'))
                            myobject.set('caa_horahasta', Ext.Date.format(new Date(record.get('caa_horahasta')), 'H:i:s'))
                            myobject.set('caa_diasemana', value)

                            myobject.save({
                                scope: this,

                                view: view,
                                callback: function (record, operation) {
                                    if (operation.success) {
                                        var win = view.up('window');
                                        notify('Los datos se guardaron correctamente');
                                        if (win) {
                                            win.close();
                                        }
                                    } else {
                                        notifyError('Hubo un error al guardar los datos');
                                    }

                                },
                                button: button
                            });

                            if ((key + 1) >= diasSeleccionados.length) {
                                if (view.caller) {
                                    view.caller.fireEvent('refreshlikeinit', view.caller, record);
                                    view.caller.fireEvent('objectchanged', view.caller, record);
                                }
                            }
                    });//cierre iteracion array

                }else{
                    /****** Daniel O. Medina *****/
                    var myobject = controller.getP_controlAcceso_AutorizacionModelModel().create({
                        caa_idautorizado: view.record.get('caa_idautorizado')
                        
                    })
                    myobject.setId(0);

                    myform.updateRecord(myobject);
                    myobject.set('caa_horadesde', Ext.Date.format(new Date(record.get('caa_horadesde')), 'H:i:s'))
                    myobject.set('caa_horahasta', Ext.Date.format(new Date(record.get('caa_horahasta')), 'H:i:s'))
                    myobject.set('caa_diasemana', -1);
                    myobject.save({
                        scope: this,

                        view: view,
                        callback: function (record, operation) {
                            if (operation.success) {
                                var win = view.up('window');
                                notify('Los datos se guardaron correctamente');
                                if(view.caller)
                                    view.caller.fireEvent('objectchanged', view.caller, record);
                                if (win) {
                                    win.close();
                                }
                            } else {
                                notifyError('Hubo un error al guardar los datos');
                            }

                        },
                        button: button
                    });


                    /*******************************/

                }
        }
        }
    }
});