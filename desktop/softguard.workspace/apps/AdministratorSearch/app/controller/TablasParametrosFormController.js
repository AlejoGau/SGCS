Ext.define('AdministratorSearch.controller.TablasParametrosFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'parametro_HIKVISIONP2DomainStore', 'parametro_EZVIZP2DomainStore', 'TablaLineasStore', 'TablasListasEmergenciaStore', 'TablasFormaDePagoStore', 'TablasResolucionesStore' ],
    models : [ 'TablasParametrosModel', 'TablasParametrosSearchModel', 'parametro_HIKVISIONP2DomainModel', 'parametro_EZVIZP2DomainModel', 'parametro_HIKVISIONP2RegionModel', 'parametro_EZVIZP2RegionModel', 'TablasListasEmergenciaSearchModel', 'TablasFormaDePagoSearchModel' ],
    views : [ 'parametro_HIKVISIONP2Pview', 'parametro_EZVIZP2Pview', 'parametro_NOTIFICAEVENTODEALERview', 'parametro_TIPOREPORTEDEALERview', 'parametro_REPAUTFIRMADEALER', 'parametro_LANDINGFREECOUPONview', 'parametro_LANDINGPAYMENTview', 'parametro_CAPTCHAview', 'TablasParametrosFormView', 'parametro_TELEPORTECONFIGview', 'parametro_ITOKIICONFIGview', 'parametro_GEOCODINGPROVIDERview', 'parametro_NOMINATIMCONFIGview', 'paramentro_TIEMPOENESPERAview', 'parametro_REPAUTFIRMA', 'parametro_TIPOREPORTEview', 'parametro_SYSTEMCURRENCYview', 'parametro_LABELMOVILTRACKGUARDview', 'parametro_SIPPROTOCOLTAGView', 'parametro_LANDINGACTIVATIONCODEview' ],

    init : function(config) {
        // genero los eventos
    	this.control({
            'tablasparametrosformview' : {
                afterrender : this.initview
            },
            'tablasparametrosformview button[action="save"]' : {
                click : this.onSaveClick
            },
            'tablasparametrosformview button[action="photo"]' : {
                click : this.onPhotoClick
            },
            'tablasparametrosformview #botonTestCaptcha': {
                click : this.onTestCaptchaClick
            }
        });
	}, // cierro init
    onTestCaptchaClick : function(button, event, options){
        var view = button.up('tablasparametrosformview');
        var frame = view.down('#captchaFrame');
        var site_key = view.down('#textfieldKey').getValue();
        var secret_key = view.down('#textfieldSecret').getValue();

        var myform = button.up('form').getForm();
        var view = button.up('tablasparametrosformview');


        if(site_key=='' || secret_key == '' || !myform.isValid()){
            notifyError('Ingrese las dos claves');
            return;
        }

        frame.container.dom.lastChild.contentWindow.document.location.search='site_key='+site_key;
        var task = new Ext.util.DelayedTask(function(){
            frame.container.dom.lastChild.contentWindow.document.location.reload(true);
        });
        task.delay(500);
        
        
    },
    onPhotoClick : function(button, event, options) {
        var view = button.up('tablasparametrosformview');
        var form = view.getForm();
        var record = view.record;
        
        /* datos que no tengo en la view */
        var photo = view.down('#imagenNombre').getValue();
		var name = view.down('#imagenNombre').getValue();
	
		var w = Ext.widget('window', {
					title : 'Logo: ',
					height : 252,
					width : 360,
					closeAction : 'destroy',
					border : false,
					layout : 'fit',
                    record: record,
					tbar:[Ext.create('common.view.UploadButton', {
                            id: 'dragupload',
                            text: 'Subir Logo',
                            plugins: [{
                                      ptype: 'uploadwindow',
                                      title: 'Subir Logo',
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
                    			},
                    			scope: this
                    		}
                        }),
						
                        {
                            text: 'eliminar',
                            iconCls: 'icon-delete',
                            handler: function(){
                                var win = this.up('window');
    							var record = win.record;
                                record.set('cue_cfoto', '');
								record.save();
                                win.down('image').setSrc('/gallery/');
    							win.close();
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

	initview : function(view) {
        var record = view.record;
        var config = record.get('par_cconfig');
        var items = [{
            xtype : 'numberfield',
			name : 'par_ivalor',
            fieldLabel: 'Valor (numerico)',
			allowBlank : false,
            inputWidth :100
		},{
        	xtype : 'textfield',
			name : 'par_cvalor',
            fieldLabel: 'Valor (caracter)',
            anchor:'100%'
		}];
        
        var esCaptcha=false;

        if ( config && config != ''){
            // agrego los items del config
            var json = Ext.JSON.decode(config);
            items = json.items;
            
            Ext.Array.each(items,function(item){
                //si no tiene name considero que es una view
                if(item.name) {
                    item.name = item.name.toLowerCase();
                    view.contenedor = 'tablasparametrosformview';
                } else {
                    view.contenedor = item.xtype;
                    if(item.xtype=='parametro_CAPTCHAview'){
                        esCaptcha=true;
                    }

                }
            })
        }
        
        view.add(items);
        //view.doLayout();
        //verifico a quien le mando los valores
        if(view.contenedor == 'tablasparametrosformview') {
            view.loadRecord(view.record);
        } else {
            console.log(view)
            view.loadRecord(view.record);
            view.down(view.contenedor).loadRecord(view.record);
        }
        //if(esCaptcha){
        //    var target = Ext.get('#Iframe');//view.down('#Iframe');
            
            //target.getDocument().getElementsByTagName('body')[0].innerHTML = 
            //'<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")                                                    //+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';                  
            //target.setSrc('/handler/ReportePanelAlarmaHTML');
            //target.dom.src='/handler/ReportePanelAlarmaHTML';
        //}
	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablasparametrosformview');
        if(view.contenedor != 'tablasparametrosformview') {
            var myform = button.up('tablasparametrosformview').down(view.contenedor).getForm();
           
        }
        
        var win = button.up('window');
		var record = myform.getRecord();
        var model = this.getTablasParametrosModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        if(view.contenedor != 'tablasparametrosformview') {
            record.set('par_cvalor',myform.findField('par_cvalor').getValue())
        }


		myform.updateRecord(record);

        if (myform.isValid()){
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');         
                        notify('Los datos se guardaron correctamente');
                        view.fireEvent('objectchanged',record);
                        win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        } else {
            notifyError('Debe ajustar los valores del formulario');
        }
	}
});