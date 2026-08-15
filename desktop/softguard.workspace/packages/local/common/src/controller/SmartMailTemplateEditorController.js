//MIGRADO2024
Ext.define( 'Common.controller.SmartMailTemplateEditorController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
	models: [ 'SmartMailTemplateModel' ],
	views: [ 'SmartMailTemplateEditorView' ],
	init: function(config ) {
		// genero los eventos
		this.control( {
			'smartmailtemplateeditorview': {
				beforerender: this.initEditor
			},
			'smartmailtemplateeditorview button[action="smartmaileditorsave"]': {
				click: this.onSaveClick
			}
		})
	}, // cierro init
	initEditor: function(view ) {
		view.loadRecord( view.record );
	},
		
	onSaveClick: function(button, event, options ) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up( 'form' ).getForm();
		var view = button.up( 'smartmailtemplateeditorview' );
		var win = button.up( 'window' );
		var record = myform.getRecord();
		myform.updateRecord( record );
		record.save( {
			scope: this,
			win: win,
			view: view,
			callback: function( record, operation ) {
				if( operation.success ) {
					notify( 'Los datos se cuardaron correctamente' );
					var view = operation.view;
					if( view ) {
						view.fireEvent( 'smartmailtemplatechange', operation );
					}
					else { console.log( view ); }
				} else {
					notifyError( 'Hubo un error al guardar los datos' );
				}
			},
			button: button
		});
	}
});