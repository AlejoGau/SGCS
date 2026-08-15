/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Common.Application',

    name: 'SgAppNotes',
    controllers:['SgAppNotesController','SgNotesGridController','NotasActivasFormController','NotasArchivadasGridController'],
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },    

    requires: [
        // This will automatically load all classes in the SgAppNotes namespace
        // so that application classes do not need to require each other.
        'SgAppNotes.*',
        'Common.*'      
    ],

    // The name of the initial view to create.
    mainView: 'SgAppNotes.view.MetadataViewport',
    onAppUpdate: function () {
        Ext.Msg.confirm('Actualizacion detectada', 'Reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }    
});
