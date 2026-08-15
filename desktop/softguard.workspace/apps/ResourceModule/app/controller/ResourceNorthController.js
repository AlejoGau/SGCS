Ext.define('ResourceModule.controller.ResourceNorthController', {
    extend: 'Ext.app.Controller',
    views: ['ResourceFormView', 'ResourceNorthView'],
    models: ['ResourceModuleModel'],
    init: function (config) {
        this.control({
            "resourcenorthview": {
                afterrender: this.initView
            },
            "menuitem[action=nuevo_equipamiento]": {
                click: this.onNuevoEquipamientoClick
            },
            "menuitem[action=nuevo_llave]": {
                click: this.onNuevoLlaveClick
            },
            "menuitem[action=nuevo_integrante]": {
                click: this.onNuevoIntegranteClick
            }
        });
    },

    initView: function (view) {
        var controller = this;
        console.log("ResourceNorthController: initView called");
    },

    onNuevoEquipamientoClick: function (button) {
        var controller = this;
        var model = this.getResourceModuleModelModel();
        var record = model.create();
        record.set('Id',0);
        console.log("ResourceNorthController: onNuevoEquipamientoClick called");
        var win = Ext.widget('window', {
            title: 'Nuevo Equipamiento',
            modal: true,
            resizable: false,
            width: 450,
            height: 500,
            layout: 'fit',
            items: {

                xtype: 'resourceformview',
                record: record,
                tipoRecurso: 2 //recurso de equipamiento
            }
        });
        win.show();
    },

    onNuevoLlaveClick: function (button) {
        var controller = this;
        var model = this.getResourceModuleModelModel();
        var record = model.create();
        record.set('Id',0);        
        var win = Ext.widget('window', {
            title: 'Nuevo Llave',
            modal: true,
            resizable: false,
            width: 450,
            height: 500,
            layout: 'fit',
            items: {
                xtype: 'resourceformview',
                record: record,
                tipoRecurso: 1 //recurso de llave
            }
        });
        win.show();
    },

    onNuevoIntegranteClick: function (button) {
        var controller = this;
        console.log("ResourceNorthController: onNuevoIntegranteClick called");
    
        var controller = this;
        console.log("ResourceNorthController: onNuevoClick called from action " + button.action);
        var win = Ext.widget('window', {
            title: 'Nuevo Recurso',
            modal: true,
            resizable: false,
            width: 450,
            height: 500,
            layout: 'fit',
            items: {
                xtype: 'resourceformview'
            }
        });
        win.show();
    }


});