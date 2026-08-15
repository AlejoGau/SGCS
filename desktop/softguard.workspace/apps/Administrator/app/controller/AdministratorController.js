Ext.define( 'Administrator.controller.AdministratorController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'AdministratorFormModel' ],
views: [ 'AdministratorView', 'MetadataViewport', 'ExtUxNotification' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'administratorview': {
            beforerender: this.initview,
            userSaved: this.userSaved,
            afterrender: this.addEvent
        }
    });
}, // cierro init

addEvent: function(view ) {
    console.log( view );
    view.on( { activate: { fn: 'onActivate', scope: this, single: true } });
},

onActivate: function(view ) {
    console.log( view );
},

initview: function(view ) {

        if( view.record.get( 'Id' ) != 0 ) {

            if( view.record.get( 'Name' ) == _UserData.udw_idKey ) {
                                                //_UserData.Company.udw_idKey
                var modules = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
                console.log('modules en admincontroller', modules)
                if( modules.isModuleAvailable( 'Administrator' ) ) {
                    view.down( '#rangegrid' ).setDisabled( false );
                }
            } else {
                view.down( '#rangegrid' ).setDisabled( false );
            }

        }
    

},
    
userSaved: function(record, view ) {
    view.down( '#rangegrid' ).setDisabled( false );
},

openObjectList: function() {

    var view = Ext.widget( 'administratorview' );
    view.closable = false;

    var myPanel = Ext.getCmp( 'center' );
    myPanel.add( view );
    myPanel.setActiveTab( view );

},

openObjectById: function(objectId ) {

    record = this.getAdministratorFormModelModel();
    if( objectId == 0 ) {
        if( myQueryString.perfiles == 1 ) {
            var udw_tipo = 11;
            var udw_usuario = getLocale( 'Nuevo Perfil' );

            if( myQueryString.filterByTipo && myQueryString.filterByTipo > 0 ) {
                udw_tipo = myQueryString.filterByTipo;
                udw_usuario = getLocale( 'Nuevo producto' );
            }

            var myobject = record.create( {
                udw_clave: 'none',
                udw_usuario: udw_usuario,
                udw_tipo: udw_tipo
            });

        } else {

            var myobject = record.create( {
                Name: getLocale( 'Nuevo usuario' ),
                udw_tipo: 1
            });

        }
        this.setRecord( myobject );

    }
    else {

        record.load( objectId, {
            callback: function( record, operation ) {
                if( operation.success ) {
                    // seteo el registro
                    this.setRecord( record );
                }
            },
            scope: this
        });
    }
},
    
notify: function(text ) {
    Ext.create( 'widget.uxNotification', {
        corner: 'br',
        manager: Ext.getCmp( 'viewport' ),
        cls: 'ux-notification-light',
        iconCls: 'ux-notification-icon-information',
        closable: false,
        title: '',
        html: text,
        slideInDelay: 800,
        slideDownDelay: 1500,
        autoDestroyDelay: 4000,
        slideInAnimation: 'elasticIn',
        slideDownAnimation: 'elasticIn'
    }).show();
},
    
setRecord: function(record ) {
    text = record.get( 'Name' );
    document.title = text;
    var viewport = Ext.getCmp( 'viewport' );
    var center = Ext.getCmp( 'center' );
    viewport.record = record;
    center.layout = 'fit';

    if( myQueryString.perfiles == 1 ) {
        center.add( Ext.widget( 'administratorview', { record: record, perfiles: 1, closabe: false }) );
    } else {
        center.add( Ext.widget( 'administratorview', { record: record, closabe: false }) );
    }
}
});