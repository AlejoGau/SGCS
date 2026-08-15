Ext.define('WeSafe.controller.ConfiguraLandingFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ConfuguraLandingSearchModel' ],
    views : [ 'ConfiguraLandingFormView' ],

    init : function(config) {
        // genero los eventos
    	this.control({
			'ConfiguraLandingFormView' : {
				beforerender : this.initview
			},
			'ConfiguraLandingFormView button[action="save"]' : {
				click : this.onSaveClick
			}
			
        });
	}, // cierro init

	initview : function(view) {
        view.loadRecord(view.record);
	},

	onSaveClick : function(button, event, options) {
        var myform = button.up( 'form' ).getForm();
        var view = button.up( 'ConfiguraLandingFormView' );
        var record = myform.getRecord();
        var controller = this

        myform.updateRecord( record );

        if( myform.isValid() ) {
            var content = record.data;
            var name = record.get('nombreForm');
            var filter = [ {"property":"lcfg_cname", "value":name} , {"property":"lcfg_ccontent", "value":content} ]
        Ext.Ajax.request({
            //url : '/rest/search/MG_RealizarPago',
            url : '/handler/LandingConfigUpdate',
            method: 'POST',
                params: {
                lcfg_cname: name,
                lcfg_ccontent: Ext.encode(content)
            },
            success: function(response, action){
                var resultado = response.responseText;
                if( resultado = '-1' ) {
                    var win = view.up( 'window' );
                    notify( 'Los datos se guardaron correctamente' );
                    view.caller.fireEvent( 'refresh', view.caller, record );
                    view.loadRecord( record );
                    controller.loadRepsuesta( view, record )
                    view.record = record;
                } else {
                    notifyError( 'Hubo un error al guardar los datos' );
                }
            }
        });


            /*record.save( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        var win = view.up( 'window' );
                        notify( 'Los datos se guardaron correctamente' );
                        view.caller.fireEvent( 'refresh', view.caller, record );
                        view.loadRecord( record );
                        controller.loadRepsuesta( view, record )
                        view.record = record;
                       // view.down( '#preguntas' ).show()

                    } else {
                        notifyError( 'Hubo un error al guardar los datos' );
                    }
                }
            });*/
        }
	}
});