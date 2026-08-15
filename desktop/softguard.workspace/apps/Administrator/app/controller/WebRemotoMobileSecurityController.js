Ext.define( 'Administrator.controller.WebRemotoMobileSecurityController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [  ],
    views: [ 'WebRemotoMobileSecurityView' ],

    init: function(config ) {
        // this.initConfig(config);
        // genero los eventos

        this.control( {
            'WebRemotoMobileSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'WebRemotoMobileSecurity': {
                beforerender: this.initview
            },
            'WebRemotoMobileSecurity combo': {
                afterrender: this.loadCombo
            }
        });
    }, // administratormoduleformview

    initview: function(view ) {
        var record = view.record;
        var modules = view.modules;
        var moduleId = 42;
        var userName = record.get( 'Name' );
        var url = '/Rest/Security/Modules/' + moduleId + '/Security/' + userName;
        view.url = url;
        view.urlMetaData = '/rest/security/UserData/' + record.get( 'Id' ) + '/MetaData';


        view.webremotomobile = Ext.define( 'webremotomobile', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'pin', type: 'string' }
            ],
            proxy: {
                type: 'rest',
                url: view.url,
                appendId: false
            }
        });

        view.webremotomobile.load(0,{callback: function(record){
            view.down('#pin').setValue(record.get('pin'))
        }});
    },

    onSaveClick: function(button, event, options ) {
        var view = button.up( 'WebRemotoMobileSecurity' );
        var url = view.url;
        var model = view.webremotomobile;
        var pin = view.down( '#pin' );
        var webremotomobile = model.create( {
            pin: pin.getValue()
        });

        var json = Ext.encode( webremotomobile.data );

        Ext.Ajax.request( {
            url: url,
            method: 'PUT',
            params: json,
            success: function( resp, operation ) {
                notify( 'Los datos se guardaron con éxito' );
            }
        });
    }
});