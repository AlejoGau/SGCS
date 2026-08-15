Ext.define( 'AdministratorSearch.controller.TablasPanelesFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'SiNoGPSStore', 'SiNoStore' ],
models: [ 'TablasPanelesModeloSearchModel', 'TablasPanelesModel' ],
views: [ 'TablasPanelesFormView', 'PhotoPanelView' ],

init: function(config ) {
    // genero los eventos

    this.control( {
        'tablaspanelesformview': {
            beforerender: this.initview
        },
        'tablaspanelesformview button[action="save"]': {
            click: this.onSaveClick
        },
        'photopanel #delete': {
            click: this.deletePhoto
        },
        'photopanel #subir': {
            uploadcomplete: this.onSubir
        }
    });

}, // cierro init
onSubir: function(uploader, success, failed ) {
    var file = success.pop();
    var view = uploader.owner.up( 'photopanel' );
    var record = view.record;
    var field = view.field;
    const model = this.getTablasPanelesModelModel();
    const form = view.up( 'tablaspanelesformview' )
    view.down( 'image' ).setSrc( '/gallery/' + file.name );

    record.set( field, file.name );
    record.setConfig({
        proxy: model.getProxy()
    });
    record.save( {
        callback: function( record, operation ) {
            if( operation.success ) {
                form.caller.fireEvent( 'refresh', form.caller )
                notify( 'Los datos se guardaron con éxito' );
            }
        }
    });
},
deletePhoto: function(btn ) {
    var win = btn.up( 'window' );
    var view = win.down( 'photopanel' );
    const form = view.up( 'tablaspanelesformview' )
    const model = this.getTablasPanelesModelModel();

    var record = win.record ? win.record : view.record;
    record.set( view.field, '' );

    record.setConfig({
        proxy: model.getProxy()
    });
    record.save( {
        callback: function( record, operation ) {
            if( operation.success ) {
                form.caller.fireEvent( 'refresh', form.caller )
                win.down( 'image' ).setSrc( '/gallery/' );
                win.close();

                notify( 'Los datos se guardaron con éxito' );
            } else {
                console.error( "lasfhlakklas error error error" )
            }
        }
    });

},
initview: function(view ) {
    /**
     * BC 384713978 : Se agrega combo de Marca / Modelo para asignarle al panel
     */
    const model = this.getTablasPanelesModelModel();

    myimg = Ext.widget( 'photopanel', {
        field: 'pan_cImagen',
        record: view.record,
        profile: view.profile
    })

    view.add( {
        margin: '5px 0 0 40px',
        title: 'Foto: ',
        height: 205 + 32,
        width: 360 + 10,
        record: view.record,
        closeAction: 'destroy',
        border: false,
        layout: 'fit',
        modal: true,
        items: [ myimg ]
    })

    var panelModelosStore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasPanelesModeloSearchModelModel(),
        autoload: false,
        pageSize: 10000
    });

    var comboPanelesModelo = view.down( '#comboModelo' );
    comboPanelesModelo.bindStore( panelModelosStore );
    panelModelosStore.load();


    view.loadRecord( view.record );
    /********https://basecamp.com/2249105/projects/9661053/todos/432657181 */
    /****
     * 
    if(view.record.get('pan_nesgprs') != 1) {
        view.down('#esgprs').setValue(2);
    } else {
        view.down('#esgprs').setValue(1);
    }
    *****/
    if( view.record.get( 'pan_nesgprs' ) == 0 ) {
        view.down( '#esgprs' ).setValue( 2 );
    }
    if( view.record.get( 'pan_nesgprs' ) == 1 ) {
        view.down( '#esgprs' ).setValue( 1 );
    }
    if( view.record.get( 'pan_nesgprs' ) == 2 ) {
        view.down( '#esgprs' ).setValue( 2 );
    }
    if( view.record.get( 'pan_nesgprs' ) == 3 ) {
        view.down( '#esgprs' ).setValue( 3 );
        view.down( '#comboModelo' ).hide();
        view.down( '#comboModelo' ).clearValue();
    }

    /*************************************** */

    /**
     * BC 384713978 : Al iniciar la ventana, si el record tiene informacion del modelo, lo selecciono en el combo.
     */
    if( view.record.get( 'pan_iModelo' ) != 0 ) {
        comboPanelesModelo.setValue( parseInt( view.record.get( 'pan_iModelo' ) ) );
    }
},



onSaveClick: function(button, event, options ) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up( 'form' ).getForm();
    var view = button.up( 'tablaspanelesformview' );
    var win = button.up( 'window' );
    var record = myform.getRecord();

    /**
     * BC 384713978 :Al cambiar a un Search para el armado de grilla y no usar el Objecto, debo al form bindearle el proxy del model nuevamente
     */
    var model = this.getTablasPanelesModelModel();
    record.setConfig({
        proxy: model.getProxy()
    });

    myform.updateRecord( record );

    if( myform.isValid() ) {
        record.save( {
            scope: this,

            view: view,
            callback: function( record, operation ) {
                if( operation.success ) {
                    var win = view.up( 'window' );
                    notify( 'Los datos se guardaron correctamente' );
                    view.caller.fireEvent( 'objectchanged', view.caller, record );
                    win.close();
                } else {
                    notifyError( 'Hubo un error al guardar los datos' );
                }

            },
            button: button
        });
    }
}  
});