Ext.define( 'AdministratorSearch.controller.TablasCondicionesDePagoFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 't_organizacion_fcSearchModel', 't_remesas_fcSearchModel', 't_condiciones_pago_fcModel', 't_condiciones_pago_fcSearchModel', 't_tipos_formapago_fcSearchModel', 'TablasFormaDePagoSearchModel', 't_formas_pago_fcModel' ],
    views: [ 'TablasCondicionesDePagoFormView' ],

    init: function(config ) {
        // genero los eventos

        this.control( {
            'tablascondicionesdepagoformview': {
                afterrender: this.initview
            },
            'tablascondicionesdepagoformview button[action="save"]': {
                click: this.onSaveClick
            },
            'tablascondicionesdepagoformview #nuevaformadepago': {
                click: this.onNuevaFormaPagoClick
            },
            'tablascondicionesdepagoformview #con_iRemesa': {
                select: this.onCon_iremesaSelect,
                change: this.onCon_iremesaChange
            }
        });
    }, // cierro init



    onCon_iremesaChange: function(combo, newvalue){
        var view = combo.up('tablascondicionesdepagoformview');

        // me fijo si el valor esta vacio y oculto los campos
        if (!newvalue){
            view.down('#confRemesa').hide();
        }
    },

    onCon_iremesaSelect: function(combo, records){
        var view = combo.up('tablascondicionesdepagoformview');
        var record = records[0];

        if (record){
            var config = record.get('rem_cconfig');
            var confRemesa = view.down('#confRemesa');
            try{
                var json = Ext.JSON.decode(config);
                confRemesa.add(json.items);
                confRemesa.show();

                // busco los datos guardados para impactar en el form.
                try{
                    var condicion = view.record;
                    var dataRemesa = Ext.JSON.decode(condicion.get('con_cDatosExtra'));

                    for(var propertyName in dataRemesa.confRemesa) {
                        confRemesa.getForm().findField(propertyName).setValue(dataRemesa.confRemesa[propertyName]);
                    }
                }
                catch (error) {
                    console.log('error al setear los datos guardados de remesa')
                }
            }
            catch (error) {
                console.log('error al configurar automatizacion de pago');
                confRemesa.hide();
            }
        }
    },

    onNuevaFormaPagoClick: function (btn ) {
        var view = btn.up( 'tablascondicionesdepagoformview' )
        record = this.getT_formas_pago_fcModelModel();
        var title = 'Nueva forma de pago';
        var myobject = record.create({});
        var viewWin = Ext.widget( 'tablasformadepagoformview', {
            caller: view,
            record: myobject,
            callback: function() {
                //cuando se guarda en el formulario de forma de pago actualizo el combo
                view.storeFormaPago.load()
            }
        });

        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 300,
            height: 300,
            border: false,
            items: viewWin
        });
        win.show();

    },

    initview: function(view ) {
        var record = view.record;
        var controller = this;
        var organizacionFacturadoraStore = Ext.create( 'Ext.data.Store', {
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.down( '#organizacionfacturadora' ).bindStore( organizacionFacturadoraStore );
        organizacionFacturadoraStore.load();

        view.storeFormaPago = Ext.create( 'Ext.data.Store', {
            model: this.getTablasFormaDePagoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })

        view.down( '#tipodepago' ).bindStore( view.storeFormaPago );
        view.storeFormaPago.load( {
            callback: function() {
                view.loadRecord( record );
            }
        });

        var storeRemesa = Ext.create( 'Ext.data.Store', {
            model: this.getT_remesas_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        });

        view.down('#con_iRemesa').bindStore(storeRemesa);
        storeRemesa.load({callback:function(){
            // me fijo si hay una remesa seleccionada, busco el record y llamo al evento de select
            var con_iRemesa = record.get('con_iRemesa');
            if (con_iRemesa>0){
                var remesa = storeRemesa.findRecord('Id',con_iRemesa);
                if (remesa){
                    controller.onCon_iremesaSelect(view.down('#con_iRemesa'),[remesa]);
                }
            }
        }});
    },

    onSaveClick: function(button, event, options ) {
        // cambio la cantidad de columnas al panel
        // accedo al registro y lo salvo
        var myform = button.up( 'form' ).getForm();
        var view = button.up( 'tablascondicionesdepagoformview' );
        var win = button.up( 'window' );
        var record = myform.getRecord();

        myform.updateRecord( record );

        // busco campos remesa
        var confRemesa = view.down('#confRemesa');
        if (confRemesa.isVisible()){
            record.set( 'con_cDatosExtra', Ext.JSON.encode({confRemesa: confRemesa.getValues()}));
        }
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