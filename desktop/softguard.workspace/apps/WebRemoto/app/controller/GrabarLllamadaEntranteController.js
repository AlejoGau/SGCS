Ext.define( 'WebRemoto.controller.GrabarLllamadaEntranteController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [  ],
    views: [ 'GrabarLlamadaEntranteView' ],
    init: function(config ) {
        this.control( {
            'grabarllamadaentranteview': {
                afterrender: this.initview
            },
            'grabarllamadaentranteview #grabar': {
                click: this.onGrabarClick
            }
        });
    }, // cierro init

    initview: function(view ) {
        view.down( '#cuenta' ).setValue( view.record.get( 'cue_clinea' ) + '-' + view.record.get( 'cue_ncuenta' ) )
    },

    onGrabarClick: function(button, protocolo ) {
        var view = button.up( 'grabarllamadaentranteview' );
        var operadorId = view.operadorId;
        var record = view.record;
        // var telefono = view.telefono;
        var url = "sglogger://";
        var urlexterna = getParametro( 'DESKTOPEXTERNALURL' );
        var URLDESKTOP = getParametro( 'URLDESKTOP' );
        var defaultUrl = "http://DesktopURL:PORT";

        if( urlexterna.toUpperCase() == defaultUrl.toUpperCase() ) {
            notifyError( 'Debe configurar el parametro DESKTOPEXTERNALURL' );
        } else {
            //  var cTelefono  = telefono.get("tel_ctelefono");
            ///    var cPredigito = telefono.get("tel_cpredigito");
            // var cPostDigito= telefono.get("tel_cpostdigito");

            /*  if (cPredigito){
                cTelefono = cPredigito +','+ cTelefono;
            }
    
            if (cPostDigito){
                cTelefono = cTelefono +','+ cPostDigito;
            }
    
            cTelefono = cTelefono.replace('-','');
            cTelefono = cTelefono.replace('_','');
            cTelefono = cTelefono.replace(' ','');*/

            url += record.get( 'cue_clinea' ) + "|";
            url += record.get( 'cue_ncuenta' ).trim() + "|";
            url += "|";
            url += record.get( 'cue_iid' ) + "|";
            url += operadorId + "|";
            url += urlexterna
            url += "|/rest/upload/new?search=softguardMiscFile&Path=/Logger";
            url += "|oauth_token=" + Ext.util.Cookies.get( 'OAuth_Token' );

            if( view.llamadoNoAutomatico ) {
                url += "|5|0|"//+cTelefono;
            } else {
                url += "|5|1|"//+cTelefono;    
            }

            if( protocolo == 'DIALER:' ) {
                url += "|0";
            } else {
                url += "|1";
            }

            url += '|' + URLDESKTOP;
            url = encodeURI(url);  
            var iframe = Ext.create('Ext.ux.IFrame', {
                //src: finalUrl
            });
            view.add(iframe);
            iframe.load({src: url});
            
           
        }
    }
});
