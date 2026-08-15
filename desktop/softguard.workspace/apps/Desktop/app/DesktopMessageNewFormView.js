Ext.define('Desktop.view.DesktopMessageNewFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.desktopmessagenewformview'],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100
    },
    items: [{
        xtype: 'tagfield',
        queryMode: 'local',
        name: 'ToIds',
        forceSelection: true,
        itemId: 'to',
        fieldLabel: 'Enviar a',
        anchor: '100%',
        valueField: 'udw_idKey',
        allowBlank: false,
        displayField: 'udw_usuario'
    }, {
        xtype: 'textfield',
        name: 'Name',
        fieldLabel: 'Subject',
        anchor: '100%'
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Body',
        anchor: '100%'
    }, {
        xtype: 'htmleditor',
        name: 'Body',
        fieldLabel: '',
        anchor: '100%',
        height: 250
    }],
    initComponent: function () {
        this.callParent();
        var me = this;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                iconCls: 'icon-table-save',
                text: 'Enviar',
                scope: this,
                action: 'save',
                listeners: {
                    click: function () {
                        me.onSaveClick(arguments);
                    }
                }
            }] // cierro items
        });
        this.addDocked(toolbar);
        this.on({
            beforerender: this.initview
        });
    },
    getMessageSearchModelModel: function () {
        return Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.AdministratorSearchModel'); //Ext.ModelManager.getModel('Desktop.model.Message6SearchModel');
    },
    getMessageModelModel: function () {
        return Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.Message6Model');
    },
    initview: function (view) {
        var enviarAStore = Ext.create('Ext.data.Store', {
            model: 'Desktop.model.MessageEnviarAModel'
            //autoLoad: true
        });
        view.down('#to').bindStore(enviarAStore);
        Ext.Ajax.request({
            url: '/Rest/Security/UserData',
            success: function (response, action) {
                var infoUser = Ext.decode(response.responseText);
                console.log(infoUser);
                view.model = view.getMessageModelModel();
                view.record = view.model.create({
                    FromId: infoUser.udw_idKey,
                    ToTypeId: 3050
                })
                view.loadRecord(view.record);
                var userModel = view.getMessageSearchModelModel();
                var store = Ext.create('Ext.data.Store', {
                    model: userModel,
                    pageSize: 1000,
                    filters: [{
                        property: 'udw_empresa',
                        value: infoUser.Company
                    }]
                });
                view.down('#to').store.clearData();
                var comboUsuarios = view.down('#to').store;
                store.load({
                    callback: function (records) {
                        Ext.Array.each(records, function (record) {
                            var rec = record.data;
                            var added = false;
                            comboUsuarios.each(function (recordx) {
                                if (recordx.data.udw_idKey == record.data.udw_idKey) {
                                    added = true;
                                }
                            });
                            if (!added) {
                                comboUsuarios.add({
                                    udw_idKey: rec.udw_idKey,
                                    udw_usuario: rec.udw_usuario
                                });
                            }
                        })
                    }
                });
            }
        });
    },
    onSaveClick: function (button, event, options) {
        var myform = button[0].up('desktopmessagenewformview').getForm();
        var view = button[0].up('desktopmessagenewformview');
        var win = button[0].up('window');
        var record = myform.getRecord();
        record.set('DateCreated', new Date());
        record.set('Id', 0);
        
        var tagfield = myform.findField('ToIds');
        var selectedUsers = tagfield.getValue();
        Ext.Array.each(selectedUsers, function (userId) {
            var newRecord = record.copy(); 
            newRecord.set('ToId', userId); 
            myform.updateRecord(newRecord);
            if (myform.isValid()) {
                newRecord.save({
                    scope: this,
                    view: view,
                    callback: function (record, operation) {
                        if (operation.success) {
                            notify('El mensaje fue enviado correctamente a ' + record.get('ToId'));
                            view.caller.fireEvent('objectchanged', view.caller, record);
                            win.close();
                        } else {
                            notifyError('Hubo un error al enviar el mensaje a ' + record.get('ToId'));
                        }
                    },
                    button: button
                });
            }
        });
    }
});