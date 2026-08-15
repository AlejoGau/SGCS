Ext.define( 'Administrator.controller.SmartPanicsSecurityController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ '' ],
    views: [ 'SmartPanicsSecurityView' ],

    init: function(config ) {
        this.control( {
            'SmartPanicsSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'SmartPanicsSecurity': {
                beforerender: this.initview
            }
        });
    }, // administratormoduleformview

    initview: function(view ) {
        var record = view.record;
        var modules = view.modules;
        var moduleId = this.application.getModuleIdByName( 'SmartPanics' );
        var userName = record.get( 'Name' );
        var url = '/Rest/Security/Modules/' + moduleId + '/Security/' + userName;

        view.url = url;
        var controller = this;
        var security = { modules: [], rights: [], event: [] }
        view.security = security;

        view.metadata = Ext.define( 'metadata', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'alta', type: 'string' },
                { name: 'baja', type: 'string' },
                { name: 'asignardesasignar', type: 'string' },
                { name: 'configurar', type: 'string' },
                { name: 'ocultaractivos', type: 'string' },
                { name: 'ocultarformularios', type: 'string' },
                { name: 'ocultarsinasignar', type: 'string' },
                { name: 'seguimiento', type: 'string' },
                { name: 'cambioimei', type: 'string' }
            ],
            proxy: {
                type: 'rest',
                url: view.url,
                appendId: false
            }
        });

        var me = this;
        var metadata = view.metadata;
        metadata.load( 0, {
            callback: function( record ) {
                if( record ) {
                    view.down( '#alta' ).setValue( record.get( 'alta' ) );
                    view.down( '#baja' ).setValue( record.get( 'baja' ) );
                    view.down( '#asignardesasignar' ).setValue( record.get( 'asignardesasignar' ) );
                    view.down( '#configurar' ).setValue( record.get( 'configurar' ) );
                    view.down( '#ocultaractivos' ).setValue( record.get( 'ocultaractivos' ) );
                    view.down( '#ocultarsinasignar' ).setValue( record.get( 'ocultarsinasignar' ) );
                    view.down( '#ocultarformularios' ).setValue( record.get( 'ocultarformularios' ) );
                    view.down( '#seguimiento' ).setValue( record.get( 'seguimiento' ) );
                    view.down( '#cambioimei' ).setValue( record.get( 'cambioimei' ) );
                }
            }
        });
    },

    onSaveClick: function(button, event, options ) {
        var view = button.up( 'SmartPanicsSecurity' ) ? button.up( 'SmartPanicsSecurity' ) : button;
        var url = view.url;
        var model = view.metadata;
        var arrProtocolos = [];

        var metadata = model.create( {
            alta: view.down( '#alta' ).value,
            baja: view.down( '#baja' ).value,
            asignardesasignar: view.down( '#asignardesasignar' ).value,
            configurar: view.down( '#configurar' ).value,
            ocultaractivos: view.down( '#ocultaractivos' ).value,
            ocultarsinasignar: view.down( '#ocultarsinasignar' ).value,
            ocultarformularios: view.down( '#ocultarformularios' ).value,
            seguimiento: view.down( '#seguimiento' ).value,
            cambioimei: view.down( '#cambioimei' ).value
        });

        var json = Ext.encode( metadata.data );

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