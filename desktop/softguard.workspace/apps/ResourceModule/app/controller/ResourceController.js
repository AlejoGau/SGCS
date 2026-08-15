Ext.define("ResourceModule.controller.ResourceController", {
    extend: "Ext.app.Controller",
    views: [
        "ResourceModule.view.MetadataViewport"
    ],
    init: function (config) {
        this.control({
            "viewport": {
                afterrender: this.initView
            }

        })
    },
    initView: function (viewport) {
        /*
        var center = viewport.down("#center");
        var tab = center.add({
            xtype: "resourcesgridview",
            closable: true,
            title: "Recursos"
        });
        center.setActiveTab(tab);
        */

        var recursos = Ext.create("ResourceModule.view.ResourceGridView", {
            closable: false,
            title: "Recursos"
        });

        var center = viewport.down("#center");
        center.add(recursos);
        center.setActiveTab(recursos);

        var integrantes = Ext.create("ResourceModule.view.IntegranteGridView", {
            closable: false,
            title: "Integrantes"
        });
        center.add(integrantes);


    }
});