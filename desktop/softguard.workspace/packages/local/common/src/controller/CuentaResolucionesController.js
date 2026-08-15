//MIGRADO2024
Ext.define( 'Common.controller.CuentaResolucionesController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [  ],
    views: [ 'CuentaResolucionesView' ],
        init: function( config ) {
            this.control( {
                'cuentaresolucionesview': {
                    afterrender: this.initialize
                },
            })
        },

        initialize: function( view ) {
            console.log( 'view.......', view )
            console.log( 'view.module.......', view.module )
            console.log( 'view._module.......', view._module )
            var _config = {
                title: 'Resolución  extendida',
                record: view.record,

            };

            var _configCuentaForm = {
                record: view.record,
                filterTipo: view.filterTipo,
                title: 'Datos',
                closable: false,
                module: view.module,
                profile: view.module ? view.module.profile : 0,
                security: view.security,
                rights: view.rights,
                cuentaformProfile: view.module ? view.module.profile : 0,
                readOnly: view.readonly
            };

            var viewConfig;

            if( typeof ( _module ) == 'object' ) {
                viewConfig = view.module.viewConfig;
            } else {
                if( view.module && typeof view.module === 'object' && typeof view.module.get === 'function' ) {
                    // Attempt to retrieve 'viewConfig'
                    viewConfig = view.module.get( 'viewConfig' );
                }
            }

            if( viewConfig ) {
                Ext.apply( _configCuentaForm, Ext.JSON.decode( viewConfig ) );
            }

            var myPanel = view.down( 'tabpanel' );

            var mytab = myPanel.down( '[title=' + getLocale( 'Cuenta' ) + ']' );
            if( !mytab ) {

                myPanel.add( {
                    title: 'Datos',
                    xtype: 'cuentaformview',
                    record: view.record,
                    filterTipo: view.filterTipo,
                    closable: false,
                    module: view.module,
                    profile: view.module ? view.module.profile : 0,
                    security: view.security,
                    rights: view.rights,
                    cuentaformProfile: view.module ? view.module.profile : 0,
                    readOnly: view.readonly
                })

                myPanel.add( {
                    title: 'Resolución  extendida',
                    xtype: 'resolucionformview',
                    record: view.record,
                    filterTipo: view.filterTipo,
                    closable: false,
                    module: view.module,
                    profile: view.module ? view.module.profile : 0,
                    security: view.security,
                    rights: view.rights,
                    cuentaformProfile: view.module ? view.module.profile : 0,
                    readOnly: view.readonly
                })

            }

            myPanel.setActiveTab( myPanel.down( '[title=Datos]' ) );
        }, 
    })