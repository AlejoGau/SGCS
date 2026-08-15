//MIGRADO2024
Ext.define( 'Common.controller.NotificacionesGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'SoftguardCuentaModel', 'NotificacionesSearchModel', 'NotificacionesModel', 'SmartPanicSearchModel' ],
views: [ 'NotificacionesGridView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'noficacionesgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                openphones: this.onOpenPhones
            },
            'noficacionesgridview #addsms': {
                click: this.onAddSmsClick
            },
            'noficacionesgridview #addemail': {
                click: this.onAddEmailClick
            },
            'noficacionesgridview #addpush': {
                click: this.onAddPushClick
            },
            'noficacionesgridview #delete': {
                click: this.onDeleteClick
            }
        });
},
    
onItemDblClick: function(view, record, item, index, e, options ) {
    if( record.get( 'sms_imodemsms' ) > 0 || record.get( 'sms_csmsparaeventos' ) != '' ) {
        this.openFormWindow( 'SMS', record, view, 'sms', 530 );
    } else if( record.get( 'sms_cmailparaeventos' ) != '' ) {
        this.openFormWindow( 'EMAIL', record, view, 'email', 490 );
    } else {
        this.openFormWindow( 'PUSH', record, view, 'push', 550 );
    }
},
    
onObjectEdit: function(record, view ) {
    this.onItemDblClick( view, record );
},
onAddSmsClick: function(button, event, options ) {
    var view = button.up( 'noficacionesgridview' );
    var cuenta = view.record;
    /*var records = view.getStore().add({
            sms_iidcuenta: cuenta.get('cue_iid'),
            sms_icodigo: null
        });*/
    var record = this.getNotificacionesModelModel().create( {
        Id: 0,
        sms_iidcuenta: cuenta.get( 'cue_iid' ),
        sms_icodigo: null
    })
    this.openFormWindow( 'SMS', record, view, 'sms', 580 );
},
    
onAddEmailClick: function(button, event, options ) {
    var view = button.up( 'noficacionesgridview' );
    var cuenta = view.record;
    /*var records = view.getStore().add({
            sms_iidcuenta: cuenta.get('cue_iid'),
            sms_icodigo: null
        });*/
    var record = this.getNotificacionesModelModel().create( {
        Id: 0,
        sms_iidcuenta: cuenta.get( 'cue_iid' ),
        sms_icodigo: null
    })
    this.openFormWindow( 'EMAIL', record, view, 'email', 490 );
},
onAddPushClick: function(button, event, options ) {
    var view = button.up( 'noficacionesgridview' );
    var cuenta = view.record;
    /*var records = view.getStore().add({
            sms_iidcuenta: cuenta.get('cue_iid'),
            sms_icodigo: null
        });*/
    var record = this.getNotificacionesModelModel().create( {
        Id: 0,
        sms_iidcuenta: cuenta.get( 'cue_iid' ),
        sms_icodigo: null
    })
    this.openFormWindow( 'PUSH', record, view, 'push', 550 );
},
openFormWindow: function(title, record, grid, addType, heigthwin ) {

    var view = grid.up( 'noficacionesgridview' ) ? grid.up( 'noficacionesgridview' ) : grid;
    if( view.profile < 2 ) {
        notifyError( 'No posee derechos para esta operación' );
        return false;
    }
    var controller = this;
    view.record.loadCuentaSearch( function( recordCuenta ) {
        var ocultarCuentasPropias = false;
        if( recordCuenta.get( 'tip_nTipo' ) == 5 ) {
            ocultarCuentasPropias = true;
        }

        if( record.get( 'Id' ) ) {
            /*var notiStore = Ext.create('Ext.data.Store',{
                model: controller.getNotificacionesModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property:'sms_idKey',
                    value:record.get('Id')
                }]
            })*/

            var modelNotif = controller.getNotificacionesModelModel();
            modelNotif.load( record.get( 'Id' ), {
                callback: function( record ) {
                    var recordNoti = record;
                    var newView = Ext.widget( 'smsformview', {
                        record: recordNoti,
                        recordCuenta: recordCuenta,
                        module: view.module,
                        closeAction: 'destroy',
                        addType: addType,
                        caller: view,
                        ocultarCuentasPropias: ocultarCuentasPropias
                    });
                    // Lo agregamos al panel
                    var myWindow = Ext.widget( 'window', {
                        title: title,
                        height: heigthwin,
                        width: 500,
                        height: 550,
                        modal: true,
                        items: newView,
                        layout: 'fit',
                        closeAction: 'destroy',
                        closable: false
                    }).show();
                }
            })
        } else {
            var newView = Ext.widget( 'smsformview', {
                record: record,
                recordCuenta: recordCuenta,
                module: view.module,
                closeAction: 'destroy',
                addType: addType,
                caller: view,
                ocultarCuentasPropias: ocultarCuentasPropias
            });
            // Lo agregamos al panel
            var myWindow = Ext.widget( 'window', {
                title: title,
                height: heigthwin,
                width: 500,
                modal: true,
                items: newView,
                layout: 'fit',
                closeAction: 'destroy',
                closable: false
            }
            ).show();
        }
    })
},
initView: function(view ) {
    view.filters = [];
    view.filters.push( {
        property: 'sms_iidcuenta',
        value: view.record.get( 'cue_iid' )
    })
    if( view.type == 'SMS' ) {
        view.filters.push( {
            property: 'sms_csmsparaeventos:ISNOTNULLOREMPTYTRIM',
            value: ''
        })
        view.down( '#addsms' ).show()
        view.down( '[dataIndex=sms_cplantillamail]' ).setVisible( false );
        view.down( '[dataIndex=sms_cmailparaeventos]' ).setVisible( false );
        view.down( '[dataIndex=smartpanicsNombres]' ).setVisible( false );
        view.down( '[dataIndex=sms_cPlantillaPush]' ).setVisible( false );
        if( view.module.get( 'profile' ) == 4 ) {
            view.down( '#addsms' ).hide()
            view.down( '#delete' ).hide()
        }
    } else if( view.type == 'MAIL' ) {
        view.filters.push( {
            property: 'sms_cmailparaeventos:ISNOTNULLOREMPTYTRIM',
            value: ''
        })
        view.down( '#addemail' ).show()
        view.down( '[dataIndex=sms_csmsparaeventos]' ).setVisible( false );
        view.down( '[dataIndex=sms_cplantillasms]' ).setVisible( false );
        view.down( '[dataIndex=sms_imodemsms]' ).setVisible( false );
        view.down( '[dataIndex=smartpanicsNombres]' ).setVisible( false );
        view.down( '[dataIndex=sms_cPlantillaPush]' ).setVisible( false );
        view.down( '[dataIndex=sms_cDescripcion]' ).setVisible( false );
    } else if( view.type == 'PUSH' ) {
        view.filters.push( {
            property: 'sms_cidspushsmartpanic:ISNOTNULLOREMPTYTRIM',
            value: ''
        })
        view.down( '#addpush' ).show()
        view.down( '[dataIndex=sms_cplantillamail]' ).setVisible( false );
        view.down( '[dataIndex=sms_cmailparaeventos]' ).setVisible( false );
        view.down( '[dataIndex=sms_csmsparaeventos]' ).setVisible( false );
        view.down( '[dataIndex=sms_cplantillasms]' ).setVisible( false );
        view.down( '[dataIndex=sms_imodemsms]' ).setVisible( false );
    }
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getNotificacionesSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.store );
    view.store.load();
},
    
objectChanged: function (view ) {
    view.down( 'pagingtoolbar' ).doRefresh();
},
onDeleteClick: function(button, event, options ) {
    var view = button.up( 'noficacionesgridview' );
    var selection = view.getSelectionModel().getSelection();
    var controller = this;

    if( selection && selection.length > 0 ) {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: '¿Desea eliminar ' + (selection.length === 1 ? 'la notificación seleccionada' : 'las ' + selection.length + ' notificaciones seleccionadas') + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var deleteCount = 0;
                    var totalCount = selection.length;

                    // Eliminar cada registro seleccionado
                    Ext.Array.each( selection, function( rec ) {
                        var recordId = rec.get('Id');

                        // Hacer la llamada DELETE directamente con Ajax
                        Ext.Ajax.request({
                            url: '/Rest/Sms/' + recordId + '?_dc=' + new Date().getTime(),
                            method: 'DELETE',
                            scope: controller,
                            success: function(response) {
                                if (response.status === 200) {
                                    deleteCount++;
                                    if (deleteCount === totalCount) {
                                        notify( 'Se eliminó exitosamente' );
                                    }
                                } else {
                                    notifyError( 'Error al eliminar el registro, por favor intente nuevamente.' );
                                }
                            },
                            failure: function(response) {
                                notifyError( 'No se puede eliminar el registro, está siendo utilizado en el sistema.' );
                            },
                            callback: function() {
                                deleteCount++;
                                // Recargar el store cuando se procesen todos
                                if (deleteCount >= totalCount) {
                                    view.store.load();
                                }
                            }
                        });
                    }, this );
                }
            }
        });
    }
}
});