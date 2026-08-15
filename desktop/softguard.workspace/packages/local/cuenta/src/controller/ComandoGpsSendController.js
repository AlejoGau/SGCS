Ext.define( 'Cuenta.controller.ComandoGpsSendController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'Cuenta.model.ComandosIpModel' ],
    views: [ "Cuenta.view.ComandoGpsSendView" ],

    init: function(config ) {
        this.control( {
            'comandogpssendview': {
                afterrender: this.initview
            },
            'comandogpssendview button[action="send"]': {
                click: this.onSendClick
            }
        });
    }, // cierro init

    initview: function(view ) {
        var vehicle = view.vehicle;
        var comando = view.record;
        var equipo = view.equipo;

        var comandoIpModel = 'Cuenta.model.ComandosIpModel';
        var comandosStore = view.comandosStore;
        var comandoConfig = Ext.JSON.decode( comando.Config );
        var comandoTipo = comandosStore.findRecord( 'tcm_iid', comando.Tipo );

        if( !comandoTipo ) {
            notifyError( 'Hay un problema con el comando, reconfigurar.' );
        } else {
            var comandoText = comandoTipo.get( 'tcm_cComando' );

            Ext.Object.each( comandoConfig, function( key, value, myself ) {
                comandoText = comandoText.replace( new RegExp( "{" + key + "}" ), value );
            });

            view.comandoIp = Ext.create( this.getComandosIpModelModel(), {
                Id:0,
                cmd_tfechahora: new Date(),
                cmd_idCuenta: view.idCuenta,
                cmd_idReceptor: comandoTipo.get( 'tcm_iReceptor' ),
                cmd_iComando: comando.Tipo,
                cmd_nEstado: 1,
                cmd_cValores: comandoText,
                cmd_cObservaciones: comando.Name, 
                cmd_iEsCustom: comandoTipo.get( 'tcm_iEsCustom' )
            })

            view.down( '#cuentanombre' ).setValue( vehicle.get( 'cue_cnombre' ) );
            view.down( '#equipo' ).setValue( view.equipoText );
            view.down( '#comando' ).setValue( comando.Name );

            view.loadRecord( view.comandoIp );
        }
    },

    onSendClick: function(button, event, options ) {
        var view = button.up( 'comandogpssendview' );
        var vehicle = view.vehicle;
        var comando = view.comandoIp;
        var panel = view.panel;
        var record = view.record;
        var win = view.up( 'window' );
     
        if(JSON.parse(record.Config).alarma){
            var cmd_cAlarmaGenerar = JSON.parse(record.Config).alarma
            comando.set('cmd_cAlarmaGenerar', cmd_cAlarmaGenerar);    
        } 

        var comandoText = comando.get('cmd_cValores');  

        view.comandoIp.set('cmd_cValores',comandoText);

        view.comandoIp.save( {
            callback: function( records, operation ) {
                if( operation.success ) {
                    
                        // aviso a IPRS que debe enviar el comando.
                        Ext.Ajax.request({
                            url: '/handler/IRS_SENDCOMMAND_handler',
                            params: {
                                id: view.idCuenta
                            },
                            method: 'GET',
                            scope: this,
                            success: function( response ) {
                            }
                        })
                    
                    notify( 'El comando se envió con éxito' );
                    if( win ) {
                        win.close();
                    }
                }
            }
        });

    }
});