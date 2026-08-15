/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: "Common.Application",

    name: 'ResourceModule',
    controllers: [
        "ResourceController",
        "ResourceNorthController",
        "ResourceGridController",
        "ResourceFormController",
        "ResourceFormAsignacionController",
        "Common.controller.SelecterHelperController",
        "ResourceFormAsignacionAsignarController",
        "ResourceFormAsignacionDevolverController"
    ],

    requires: [
        "Common.*",
        'ResourceModule.*',
        "Ext.Responsive",


    ],

    // The name of the initial view to create.
    mainView: 'ResourceModule.view.MetadataViewport'
});
