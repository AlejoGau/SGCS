Ext.define( 'WebRemoto.controller.SerTecFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'SoftguardTelefonoModel', 'm_st_cabeceraModel', 'TipoServicioSearchModel' ],
views: [ 'SerTecFormView' ],

init: function(config ) {
    // this.initConfig(config);
    // genero los eventos

    this.control( {
        'sertecformview': {
            beforerender: this.initview,
        },
        'sertecformview button[action=save]': {
            click: this.onSaveClick
        },
        'sertecformview #servicio': {
            change: this.onServicioChange
        },
        'sertecformview #tiposervicio': {
            change: this.onTipoServicioChange
        }
    });
}, // cierro init

initview: function(view ) {
    var record = view.record;

    view.serviciosStore = Ext.create( 'Ext.data.Store', {
        model: this.getTipoServicioSearchModelModel(),
        remoteFilter: false,
        pageSize: 500
    });
    view.serviciosStore.load();
    var combo = view.down( '#servicio' );
    combo.bindStore( view.serviciosStore );

    if( record.get( 'cue_iid' ) ) {
        var contactoStore = Ext.create( 'Ext.data.Store', {
            model: this.getSoftguardTelefonoModelModel(),
            remoteSort: false,
            remoteFilter: false,
            pageSize: 500,
            sorters: [
                {
                    property: 'tel_norden',
                    direction: 'ASC'
                }
            ]
        });

        var _ObjectId = record.get( 'cue_iid' );

        // una vez que cargue el store hago el binding con la view
        contactoStore.load( {
            ObjectId: _ObjectId, view: view, store: view.mystore, callback: function() {
                view.down( '#contacto' ).bindStore( contactoStore );
            }
        });
    }
},
    
onTipoServicioChange: function(field, newValue, oldValue, options ) {

    var view = field.up( 'sertecformview' );



    var filters = [
        {
            property: 'tip_ntipo',
            value: newValue
        }
    ];


    var serviciosStore = Ext.create( 'Ext.data.Store', {
        model: this.getTipoServicioSearchModelModel(),
        remoteFilter: true,
        filters: filters,
        pageSize: 500
    });

    var combo = view.down( '#servicio' );
    combo.setValue( '' );
    serviciosStore.load( {
        callback: function() {

            combo.bindStore( serviciosStore );
        }
    });


},
    
onServicioChange: function(field, newValue, oldValue, options ) {

},
    
    
    
    
onSaveClick: function(button, event, options ) {
    var view = button.up( 'sertecformview' );
    var myform = view.getForm();
    var win = button.up( 'window' );
    var values = myform.getValues();
    var record = view.record;
    var cuenta = view.cuenta;
    var controller = this;
    var model = this.getM_st_cabeceraModelModel();
    var now = new Date();

    //busco los dias segun el tipo de servicio
    var tipocombo = view.down( '#tiposervicio' );
    var tipovalue = view.down( '#servicio' ).getValue();//tipocombo.findRecord('tip_ccodigo', tipocombo.getValue());


    var vencimiento;
    view.serviciosStore.each( function( item, index, count ) {

        if( item.get( 'tip_ccodigo' ) == tipovalue ) {

            vencimiento = item.get( 'tip_nvto' );

        }
    });

    if( record.get('Id') == 0) {
        /*record = Ext.create( model, {
            stc_iid_cuenta: view.cuenta.get( 'cue_iid' ),
            stc_dfecha_modificacion: now,
            stf_dfecha_vto_orden: Ext.Date.add( now, Ext.Date.DAY, vencimiento ),
            stc_nestado: 1,
            stc_dfecha_desde_1: new Date( now.setHours( 9 ) ),
            stc_dfecha_hasta_1: new Date( now.setHours( 18 ) )
        });*/
        if(view.cuenta)
            record.set( 'stc_iid_cuenta', view.cuenta.get( 'cue_iid' ) );
        record.set( 'stc_dfecha_modificacion', now );
        record.set( 'stf_dfecha_vto_orden', Ext.Date.add( now, Ext.Date.DAY, vencimiento ) );
        record.set( 'stc_nestado', 1 );
        record.set( 'stc_dfecha_desde_1', new Date( now.setHours( 9 ) ) );
        record.set( 'stc_dfecha_hasta_1', new Date( now.setHours( 18 ) ) );
    } else {
        //record.setProxy( model.getProxy() );
    }

    record.set( 'stc_ioperador', _UserData.udw_idKey )

    if( myform.isValid() ) {
        myform.updateRecord( record );
        //record.set('stc_ctipo_servicio',Ext.String.leftPad(tipocombo.getValue(), 3, '0'));
        record.set( 'stc_ctipo_servicio', Ext.String.leftPad( tipovalue, 3, '0' ) );

        // busco las fechas vacias y les pongo default
        Ext.Array.each( model.getFields(), function( field ) {
            if( field.type == 'date' ) {
                if( !record.get( field.name ) ) {
                    record.set( field.name, new Date( -62135586000000 ) );
                }
            }
        })
        record.set( 'stc_nestado', 1 )

        /*if( view.newrecord ) {
            Ext.Ajax.request( {
                url: '/Rest/m_st_cabecera/',
                method: 'POST',
                jsonData: Ext.JSON.encode( record.data ),
                scope: this,
                success: function( resp, operation ) {
                    if( view.callerView ) {
                        view.callerView.fireEvent( 'objectchange', record, view.callerView );
                        view.callerView.down( 'pagingtoolbar' ).doRefresh();
                    }
                    notify( 'El servicio se creó con éxito' );
                    view.up( 'window' ).close();
                }
            });
        } else {*/
            record.save( {
                scope: this,
                callback: function( record, operation ) {
                    if( view.callerView ) {
                        view.callerView.fireEvent( 'objectchange', record, view.callerView );
                        view.callerView.down( 'pagingtoolbar' ).doRefresh();
                    }
                    notify( 'El servicio se creó con éxito' );
                    view.up( 'window' ).close();
                }
            });
        //}
    } else {
        notifyError( 'Corrija los errores antes de guardar.' )
    }



}
    
   


});