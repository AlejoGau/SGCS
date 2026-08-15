//MIGRADO2024
Ext.define('Common.controller.TablasLineasFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaPlantillasSmsStore', 'Common.store.TablaModemsSmsStore', 'Common.store.ReceptoresStore', 'Common.store.ProvinciasStore', 'Common.store.GeneraSiNoStore', 'Common.store.DealerAutoprocesaStore' ],
    models : [ 'TablaPlantillasSmsModel', 'TablaModemsSmsModel', 'TablasLineasModel', 'ReceptoresSearchModel', 'ProvinciasModel', 't_provinciasSearchModel' ],
    views : [ 'TablasLineasFormView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
			'tablaslineasformview' : {
				beforerender : this.initview,
				organizationchanged: this.onOrganizationChanged
			},
			'tablaslineasformview button[action="save"]' : {
				click : this.onSaveClick
			},
			'tablaslineasformview button[action="photo"]' : {
				click : this.onPhotoClick
			},
            'tablaslineasformview button[action="organizationChange"]': {
                click: this.onOrganizationChangeClick
            }
			
		});
	}, // cierro init
	initview : function(view) {
        view.loadRecord(view.record);
	    if (view.record.get('Id')>0){
            view.down('#lin_ccodigo').disable();   
						
	    }else{
		}
		var codigoPostal = view.getForm().findField('lin_ccodigopostal');
		if(view.record.get('lin_ccodigopostal').trim()== ''){
			codigoPostal.setValue('00000000');
		}else{
			codigoPostal.setValue( (view.record.get('lin_ccodigopostal') || '').replace(/\s/g, '') );
		}
		
        
        if(view.readOnly) {
           // view.disableForm()
            /**
             * Si este formulario se abrio desde AdminCuentas debo bloquear la toolbar
             * */
            var docked = view.getDockedItems();
            Ext.each(docked, function(item){
                if(item.xtype == "toolbar") {
                    item.hide();
                }
            });
        }
		// seteo la organizacion seleccionada
        //var organizationId = record.get( 'lin_iOrganizacion' );
	},
        
    onOrganizationChanged: function(record, view ) {
        if( record ) {
            view.record.set( 'lin_iOrganizacion', record.get( 'Id' ).toString() );
            view.getForm().findField( '_organization' ).setValue( record.get( 'Name' ) );
        } else {
            view.record.set( 'lin_iOrganizacion', '' );
            view.getForm().findField( '_organization' ).setValue( '' );
        }
    },
    
	onOrganizationChangeClick: function(button, event, options ) {
        var view = button.up( 'tablaslineasformview' );
        var controller = this;
        var filter = [];
		var win = Ext.create( 'Ext.Window', {
        	layout: 'fit',
            title: 'Seleccione una entidad',
            closeAction: 'destroy',
            caller: view,
            modal: true,
            width: 600,
            height: 400,
            border: false,
            items: {
                  xtype: 'organizationhelperview',
                  title: '',
                  forceStatus: '7,8,9',
                  hideTaxo: true,
                  caller: view,
                  filter: filter
            }
    	});
        win.show();
    },
        
    onPhotoClick : function(button, event, options) {
        var view = button.up('tablaslineasformview');
        var form = view.getForm();
        var record = view.record;
        var controller = this;
    	var photo = record.get('lin_cimagen');
		var name = record.get('lin_cimagen');
	
		var w = Ext.widget('window', {
			title : 'Foto: ',
			height : 252,
			width : 360,
			closeAction : 'destroy',
			border : false,
			layout : 'fit',
			record: record,
			tbar:[Ext.create('Common.view.UploadButton', {
					id: 'dragupload',
					text: 'Subir Foto',
					plugins: [{
									ptype: 'uploadwindow',
									title: 'Subir Foto',
									width: 350,
									height: 150
								}
					],
					uploader: 
					{
						url: '/rest/upload/new?search=softguardMiscFile',
						uploadpath: '',
						multi_selection: false,
						autoStart: true,
						maxFileSize: '50mb',
						
						dropElement: 'cuentaFotoImage',
						
						statusQueuedText: getLocale('Listo para subir'),
						statusUploadingText: getLocale('Subiendo')+' ({0}%)',
						statusFailedText: '<span style="color: red">Error</span>',
						statusDoneText: '<span style="color: green">Completo</span>',
			
						statusInvalidSizeText: 'Archivo demasiado largo',
						statusInvalidExtensionText: 'Formato inválido'
					},
					listeners: 
					{
						filesadded: function(uploader, files)								
						{
							return true;
						},
						
						beforeupload: function(uploader, file)								
						{
								var url = '/rest/upload/new?search=softguardMiscFile';
								if (this.path){
								url = url +'&Path='+me.path
								}
								
								uploader.uploader.settings.url = url
						},
			
						fileuploaded: function(uploader, file)								
						{
							//console.log('fileuploaded');
						},
						
						uploadcomplete: function(uploader, success, failed)								
						{
							var file = success.pop();
							w.down('image').setSrc('/gallery/'+file.name);
							record.set('lin_cimagen', file.name);
							form.findField('lin_cimagen').setValue(file.name);
							
							/* record.save({
							callback : function(record, operation) {
								if (operation.success){
									notify('Los datos se guardaron con éxito');
								}
							}
						});*/
						},
						scope: this
					}
				}),
				/*{
					text:'Subir Foto',
					iconCls : 'icon-photo',
					handler:function(){
						var parentWindow = this.up('window');
						var record = parentWindow.record;
						var w = Ext.widget('window', {
							title:'Subir Foto',
							autoShow:true,
							height:300,
							width:400,
							modal:true,
							layout:'fit',
							record: record,
							parent: parentWindow,
							items:[{
								xtype:'uxiframe',
								src:'/fileupload',
								listeners:{
									onfileuploaded:function(files){
										var foto = files[0];
										var w = this.up('window');
										console.log("cuentacontroller.onfileuploaded.window", w,foto);
										var m = w.record;
										m.set('cue_cfoto', foto.filename);
										m.save();
										w.parent.down('image').setSrc('/gallery/' + foto.filename);
										w.close();
									}
								}
							}]
						});
					}
				},*/
				{
					text: 'eliminar',
					iconCls: 'icon-delete',
					handler: function(){
						var win = this.up('window');
						var record = win.record;
						record.set('lin_cimagen', '');
						var model = controller.getTablasLineasModelModel();
						record.setConfig({
							proxy: model.getProxy()
						});
						record.save({callback:function(){
							view.caller.fireEvent('objectchanged',view.caller,record);	
							view.loadRecord(record);
						}});
						win.down('image').setSrc('//:0');
						//win.close();
					}
				}
			],
			items : [
				{
					xtype:'image',
					src : '/gallery/' + photo,
					id: 'cuentaFotoImage'
				}
			],
			autoShow: true,
			modal:true
		});
		w.model = form.getRecord();
        
        if(view.readOnly) {
            w.down('toolbar').hide()
        }
	},
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablaslineasformview');
        var win = button.up('window');
		var record = myform.getRecord();
        myform.updateRecord(record);
		var org = record.get('lin_iOrganizacion');
		var condicion = record.get('lin_iEnviaMailPorFalloTest');
		record.set('lin_iOrganizacion',org);
		var lin_cMetaData = record.get('lin_cMetaData');
		this.settNotifCtrlMetadata(view,record);
        //TODO: hay que armar la funcion global
        var width = 3;
		//record.set('lin_ccodigo',view.down('#lin_ccodigo').getValue());		
        var number = record.get('lin_ccodigo').toUpperCase();
        width -= number.toString().length;
        if ( width > 0 )
        {
        number = new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        }
        
        record.set('lin_ccodigo',number)
        
        /* Prueba de Juan, por pedido de Pablo Cas - No está compilado esto al 15/5/2018 
         * Pero agregandole el proxy, sube la foto... Sin estas 2 lineas, apuntaba a un Rest de Search.
         */
        var model = this.getTablasLineasModelModel();
		/*record.setConfig({
			proxy: model.getProxy()
		});    */
		record.proxy = model.getProxy();  
        
      	var comboPlantilla = view.down('#platillaPushCombo');
        if (myform.isValid()){
			if(record.get('lin_cmail')=='' && condicion==1){
				 notifyError('Si se van a recibir notificaciones por fallo de test, el email es obligatorio');
				 return;
			}
    		record.save({
    			scope : this,
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        
                        // creo la carpeta de smartpanics
                        Ext.Ajax.request({
                          url: '/handler/DealerCreateFolder?dealer='+record.get('lin_ccodigo'),
                          method: 'GET',
                          success: function(resp,operation) {
                            notify('Las carpetas se crearon correctamente.');
                          }
                        });
                        
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        if (win){
                            win.close();
                        }
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }
	},
	settNotifCtrlMetadata: function(view,record){
		/**
		 * recupero NotificacionesControles
		 * https://softguard.atlassian.net/browse/DS-12
		 * está en una de las pestañas de notificaciones.
		 * Luego la fijo en el campo metadata.
		 * 
		 */
		var arrayJson;
		
        if(record.get('lin_cMetaData')!=''){
			arrayJson = Ext.JSON.decode(record.get('lin_cMetaData')) ;
			arrayJson.Notificacion = [];
		}else{
			arrayJson = {Notificacion:[]};
		}
		var notificacionesCtrlView = view.down('notificacionescontrolesview');
		 
        var comboPlantilla = view.down('#platillaPushCombo');
        var comboEncuesta = view.down('#encuestaCombo');
        var plantillaPush='';
        var encuesta = '';
        if(view.down('#chkbPlantillaPush').checked){
            plantillaPush = comboPlantilla.getValue();
        }
        if(view.down('#chkbEncuesta').checked){
            encuesta = comboEncuesta.getValue();
        }
        arrayJson.Notificacion.push({PlantillaPush:plantillaPush
            ,Encuesta: encuesta});
		record.set('lin_cMetaData',Ext.JSON.encode(arrayJson));	
	}
});