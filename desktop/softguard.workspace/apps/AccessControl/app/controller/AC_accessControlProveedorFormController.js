Ext.define('AccessControl.controller.AC_accessControlProveedorFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.SoftguardUsuarioTipoStore' ],
    models : [ 'm_AccesosProveedoresModel','m_ProveedorSearchModel'],
	views : [ 'AccessControl.view.AC_accessControlProveedorFormView' ],

	init : function(config) {
		// genero los eventos

		this.control({
			'ac_accesscontrolproveedorformview button[action="save"]' : {
				click : this.saveObject
			},
            'ac_accesscontrolproveedorformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'ac_accesscontrolproveedorformview button[action="uploadimg"]':{
                click : this.onUploadImgClick
            },
            'ac_accesscontrolproveedorformview' : {
                beforerender : this.initview//,
                //fieldvaliditychange : this.onValidityChange,
                //passwordchanged : this.onPasswordChanged
			},
            'ac_accesscontrolproveedorformview #apr_cIdentificacion' : {
                change : this.onChangeIdentificacion
            }
		});
	}, // cierro init
    
    onUploadImgClick: function(button, event, options) {
        var view = button.up('ac_accesscontrolproveedorformview')
        var uiapplication = 'AccessControl';
        var model = this.getM_AccesosProveedoresModelModel();//Ext.ClassManager.get('AccessControl.model.m_AccesosProveedoresModel')
        var form = view.getForm();
        var record = view.record;
        var w = Ext.widget('window', {
            title: 'Foto: ',
            height: 252,
            width: 360,
            closeAction: 'destroy',
            border: false,
            layout: 'fit',
            items: [{
                xtype: 'form',
                padding: '10 0 0',
                url: '/Rest/upload/new?search=softguardMiscFile',
                items: [
                    {
                    /*agregar aqui el file upload */
                    items: Ext.create('Common.view.UploadButton', {
                        itemId: 'dragupload',
                        text: 'Subir Foto',
                        width:'100%',
                        plugins: [{
                                        ptype: 'uploadwindow',
                                        title: 'Subir Foto',
                                        //width: 350,
                                        //height: 150
                                    }
                        ],
                        uploader: 
                        {
                            url: '/Rest/upload/new?search=softguardMiscFile',
                            uploadpath: 'ffgghh',
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
                                    var url = '/Rest/upload/new?search=softguardMiscFile';
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
                                
                                view.down('#apr_cPathPicture').setValue(file.name);
                                view.down('#Photo').setSrc('/gallery/' + file.name+'?'+new Date().getTime());															


                            },
                            scope: this
                        }
                    })

                    /************** */
                },
                {
                    xtype: 'button',
                    text: 'Tomar una imagen desde la camara',
                    width:'100%',
                    handler: function () {
                        
                        var localMediaStream;
                        var w = Ext.widget('window', {
                            title: 'Foto: ',
                            height: 400,
                            width: 800,
                            closeAction: 'destroy',
                            border: false,
                            layout: 'hbox',
                            listeners: {
                                afterrender: function () {
                                    navigator.getUserMedia = navigator.getUserMedia ||
                                        navigator.webkitGetUserMedia ||
                                        navigator.mozGetUserMedia ||
                                        navigator.msGetUserMedia;
                                    var video = document.getElementById("video");
                                    var canvas = document.getElementById("canvas");
                                    var context = canvas.getContext("2d");

                                    navigator.getUserMedia({
                                        video: true
                                    }, function (stream) {

                                        if (video.mozSrcObject !== undefined) {
                                            localMediaStream = stream;
                                            video.mozSrcObject = stream;
                                        } else {
                                            video.srcObject = stream;
                                        }

                                        var pngUrl = canvas.toDataURL()

                                    }, function (err) {

                                        console.log("The following error occured: " + err);
                                    });

                                }
                            },
                            items: [
                                {
                                    width: 400,
                                    title: "Preview",
                                    height: 400,
                                    id: 'preview',
                                    html: '<video  id="video" width="400" height="320" autoplay style="backgound-color:#000; -webkit-mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0, 0, 0, 0.6) 50%); mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0, 0, 0, 0.6) 50%);"></video>',
                                    tbar: [{
                                        text: "Snapshot",
                                        handler: function () {
                                            var video = document.getElementById("video");
                                            var canvas = document.getElementById("canvas");
                                            context = canvas.getContext("2d");
                                            context.drawImage(video, 0, 0, 400, 320);
                                            //falta qeu suba la iamgen y apage la camara
                                            var randomId = Math.floor(Math.random() * (999999999 - 999)) + 999 + '.png';
                                            var filename = 'prov-' + randomId + '.png';
                                            Ext.Ajax.request({
                                                url: '/handler/uploadFile?',
                                                method: 'POST',
                                                params: {
                                                    fileName: filename,
                                                    fileBase64: canvas.toDataURL().replace('data:image/png;base64,', '')

                                                },
                                                scope: this,
                                                success: function (response) {
                                                    notify('subio')

                                                    model.load(view.record.get('Id'), {
                                                        callback: function (record) {
                                                            record.set('apr_cPathPicture', filename);
                                                            view.down('#apr_cPathPicture').setValue(filename);
                                                            view.down('#Photo').setSrc('/gallery/' + filename+'?'+new Date().getTime());															




                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }]
                                },
                                {
                                    width: 400,
                                    title: "Snapshot",
                                    height: 400,
                                    html: '<canvas id="canvas" width="400" height="320"></canvas>'
                                }
                            ],
                            autoShow: true,
                            modal: true
                        });
                        w.show()


                    }
                }]
            }],
            autoShow: true,
            modal: true
        });//borrar esto
        w.show()

    },

    
    /*onSolicitarCambioClick: function(button) {
        var view =button.up('ac_accesscontrolproveedorformview');    
        var controller = this;

        if (!view.getForm().isValid()){
            return false;
        }

        var RecordModificado = view.getForm().getRecord().copy()        
        view.getForm().updateRecord(RecordModificado);
        
        var RecordOriginal = view.getForm().getRecord().copy()
        var method = 'PUT';
        var altPath= '/Rest/Cuenta/'+view.getForm().getRecord().get('Id')+'/Usuario';

        if (view.getForm().getRecord().get('Id') == 0) {
            method = 'POST'
            var altPath='/Rest/Usuario/'
            
            //limpio el pass cundo es nuevo el registro para que se pueda ver la direferencia
            RecordOriginal.set('usu_cclave','')
            RecordOriginal.set('usu_ntipo','')
        } else {
            RecordOriginal.set('usu_cclave',view.originalPass)
            
        }

        delete RecordOriginal.store
        delete RecordOriginal.stores
        
        Ext.Ajax.request({
              url: '/handler/SearchPost?search=SolicitudModificacionesUpdOIns',
              method : 'POST',
              params: {
                    pom_usuariopedido: controller.application.UserData.udw_idKey ,
                    pom_fechapedido: new Date(),
                    pom_idtipoobjeto: view.getForm().getRecord().get('ObjectTypeId'),
                	pom_idobjeto: view.getForm().getRecord().get('Id'),
            		pom_sinmodificar: Ext.encode(RecordOriginal),
            		pom_modificado: Ext.encode(RecordModificado) ,
            		pom_estado: 0,
            		pom_log: {},
            		pom_usuarioultcambio:-1,
                    pom_cueiid: view.record.get('usu_iidcuenta'),
                    pom_metadata:Ext.encode({
                        form: {
                            alias: view.xtype,
                            title: getLocale('Usuario')
                        },
                        //cuando usa models viejos le armo la URL a mano
                        altPath: altPath,
                        method: method
                        
                    })
                },
              scope: this,
              success: function(response){
                var errors = Ext.JSON.decode(response.responseText);
                notify("La solicitud fue realizada")
                
                if (view.getForm().getRecord().get('Id')==0 && view.getForm().getRecord().store) {
                    view.getForm().getRecord().store.remove(view.getForm().getRecord());
                }
              }
        })
        
        view.up('window').close()
    },*/

	initview : function(view) {
        var myform = view.getForm();
        var record = view.record
        var profile = view.profile;

        view.loadRecord(record);
        
        if (view.record.get('apr_cPathPicture') != null &&
            view.record.get('apr_cPathPicture') != ''){
            view.down('#Photo').setSrc('/gallery/' + view.record.get('apr_cPathPicture'));
            view.down('#apr_cPathPicture').setValue(view.record.get('apr_cPathPicture'));
            view.down('#Photo').setWidth('32');
            view.down('#Photo').setHeight('32');            
        }

        var provinciaStore = Ext.data.StoreManager.lookup('ProvinciasStore'); 
        view.down('#apr_iProvincia').bindStore(provinciaStore);
        var categoriaProveedores = Ext.data.StoreManager.lookup('TablaAccesosCategoriaProveedorStore'); 
        categoriaProveedores.load();
        view.down('#apr_iCategoria').bindStore(categoriaProveedores);
        var estados = Ext.create('Ext.data.Store', {
         fields: ['value', 'text'],
         data : [
             {"value":"1", "text":getLocale("Si")},
             {"value":"0", "text":getLocale("No")}
             //...
             ]
         });
         view.down("#apr_iStatus").bindStore(estados);
 

       // myform.findField('usu_icodigo').validator = this.codigoValidator;       
        /*
        var rights = view.rights;
        
        // los usuarios de smarttrack  no deben ver tipo "BAJO"
        //var storeComboTipo = view.down('#tipousuario').getStore()   
        
        var storeComboTipo = Ext.create('Common.store.SoftguardUsuarioTipoStore');
        view.down('#tipousuario').bindStore(storeComboTipo);
        
        if(view.hideTipo && storeComboTipo.findRecord('Value',view.hideTipo)) {
            storeComboTipo.remove(storeComboTipo.findRecord('Value',view.hideTipo));
            
            if(this.application._nameModule  == 'VigiControl') {            
                var recordGuardia = storeComboTipo.findRecord('Value',2)
                recordGuardia.set('Name', getLocale('Guardia'))
            }
            
            view.down('#tipousuario').setValue(2)
        }
        
        
        if (view.profile == 4 ){
            view.down('#save').hide();
            view.down('#solitarcambio').show()
            
            view.originalPass = view.record.get('usu_cclave')
        } 
        
        if(view.profile <= 1){
            view.down('#save').hide();
            view.down('#solitarcambio').hide()
            
            view.originalPass = view.record.get('usu_cclave')
        } 
        
        // Load Metadata Information
        var metadata = null
        var solicitarimagenlogin = view.down('#solicitarimagenlogin');
        var brandInput = view.down('#Brand');
        var modelInput = view.down('#Model');
        var domainInput = view.down('#Domain');
        var colourInput = view.down('#Colour');
        var yearInput = view.down('#Year');
        var vehicleTypeInput = view.down('#VehicleType');
        var seguroVtoInput = view.down('#seguroVto');
        var seguroCiaInput = view.down('#seguroCia');
        var vtvInput = view.down('#vtv');

        if ( view.record.get('usu_cmetadata') ) {
            metadata = Ext.decode(view.record.get('usu_cmetadata'))
        }
        if (metadata && metadata.solicitarimagenlogin != null && solicitarimagenlogin) {
            solicitarimagenlogin.setValue(metadata.solicitarimagenlogin)
        }

        // Load Car data
        if (metadata && metadata.brand != null && brandInput){
            brandInput.setValue(metadata.brand);
        }
        if (metadata && metadata.model != null && modelInput){
            modelInput.setValue(metadata.model);
        }
        if (metadata && metadata.domain != null && domainInput){
            domainInput.setValue(metadata.domain);
        }
        if (metadata && metadata.colour != null && colourInput){
            colourInput.setValue(metadata.colour);
        }
        if (metadata && metadata.year != null && yearInput){
            if(metadata.year.length>4)
                yearInput.setValue(metadata.year.substring(0,4));
            else
                yearInput.setValue(metadata.year);
        }
        if (metadata && metadata.vehicleType != null && vehicleTypeInput){
            vehicleTypeInput.setValue(metadata.vehicleType);
        }
        if (metadata && metadata.seguroVto != null && seguroVtoInput
            && metadata && metadata.seguroVto != undefined 
            && metadata.seguroVto != ''){
            seguroVtoInput.setValue(new Date(metadata.seguroVto));//seguroVtoInput.setValue(metadata.seguroVto);
        }
        if (metadata && metadata.seguroCia != null && seguroCiaInput){
            seguroCiaInput.setValue(metadata.seguroCia);
        }
        if (metadata && metadata.vtv != null && vtvInput
            && metadata.vtv != undefined && metadata.vtv!=''){
            vtvInput.setValue(new Date(metadata.vtv));//vtvInput.setValue(metadata.vtv);
        }
        if (metadata && metadata.photo != null){
                
                view.down('#Photo').setSrc('/gallery/' + metadata.photo);
                view.down('#photoName').setValue(metadata.photo);
                view.down('#Photo').setWidth('32');
                view.down('#Photo').setHeight('32');            
                
        }
        
        view.mystore = Ext.create('Ext.data.Store',{
            model: 'Common.model.t_tiposSearchModel',
            remoteFilter:true,
            filters:[{
                property:'tip_ccodigo',
                value: view.record.get('cue_ctipo')
            }]
        }).load({callback:function (records) {
            if(records && records.length>0) {
                var record = records[0]
                
                if( record.get('tip_nTipo') != 7 ) { //ver SoftguardUsuarioTipoStore
                   //saco items del store                                                             
                    var store = view.down('#tipousuario').getStore()
                    
                    store.remove(store.findRecord('Value', 5))
                    store.remove(store.findRecord('Value', 6))
                    store.remove(store.findRecord('Value', 7))
                    store.remove(store.findRecord('Value', 8))
                }
            }
        }})

        if ( view.openFromAC ) {
            view.down('#usu_icodigo').hide();
            view.down('#tipousuario').hide();
            view.down('#usu_cidentificacion').show();
            view.down('#vehicleData').show();

            // Get Account Name from ac_m_usuariosformview.
            if ( view.caller && view.caller.record && view.caller.record.get('cue_cnombre') ) {
                view.down('#cuentareadonly').setValue(view.caller.record.get('cue_cnombre'));
            }

        } else {
            view.down('#usu_icodigo').setMinValue( 1 );
        }*/
        
	},
    
    
    onValidityChange: function(ancestor, labelable, isvalid, options){
        var button = ancestor.down('button[action="save"]');
        if (isvalid == "false"){
            button.disable();
        } else{
            button.enable();
        }
    },

	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('ac_accesscontrolproveedorformview');
        var record = view.record;
        var win =  button.up('window');
        var controller = this;
        var modelProv = this.getM_ProveedorSearchModelModel();
        var flagExisteProv = false;
        view.mystore = Ext.create('Ext.data.Store',{
            model: modelProv,
            remoteFilter:true,
            filters:[{
                property:'apr_cIdentificacion',
                value: view.down('#apr_cIdentificacion').getValue()
            }]
        }).load({callback:function (records) {
                    if(records.length>0){
                        if(records.length>1){
                            notifyError('La identificación del Proveedor ya existe. Ingrese otro valor');
                            return;
                        
                        }else{

                            records.forEach(function(r){
                                    if(r.get('Id')!=view.record.get('Id')){
                                        //if(flagExisteProv){
                                            flagExisteProv = true;
                                            notifyError('La identificación del Proveedor ya existe. Ingrese otro valor');
                                            return;
                                        //}

                                    }    
                            });

                        }
                    }    
                    if (!myform.isValid()){
                                
                        var error=false;
                        myform.getFields().filterBy(function(field) {
                            if (!field.validate() && field.name!='apd_idKeyTipoDoc'
                                && field.name!='apd_cDescripcion' && field.name!='apd_tFechaVto') 
                                error=true;
                        });
                        if(error){
                            notifyError('Ingrese los datos obligatorios');
                            return;
                        }
                    }   
                    if(!flagExisteProv){
                        myform.updateRecord(record);
                        record.save({callback:function () {
                            notify('Se guardo con exito')
                            view.caller.fireEvent('refresh',view.caller, record);
                            win.close();
                            
                        }});
                    }

                }
            }
        ) 


	},

	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('m_usuariosformview');
		mymodel.destroy({
					scope : this.application
				});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close()
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        var view = button.up('usuarioformview');
        var myform = view.getForm();
		var record = view.record;
        
        if (record.get('Id')==0 && record.store) {
            record.store.remove(record);
        }
        
        myWin.close();
    },
    
    onPasschangeClick: function(button, event, options){
        var view = button.up('m_usuariosformview');
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
        	title : getLocale('Cambio de clave'),
			closeAction : 'hide',
            caller: view,
            fieldName: 'usu_cclave',
            modal: true,
			width : 300,
			height : 150,
			border : false,
			items : {
                xtype: 'passwordformview',
                caller:view
    		}
		});
		win.show();
    },
    onChangeIdentificacion:function(textfield, newValue, oldValue) {
        var t = textfield;
        var view = t.up('ac_accesscontrolproveedorformview');
        t.validFlag = true;

        var mystore = Ext.create('Ext.data.Store',{
            model: 'AccessControl.model.m_ProveedorSearchModel',
            remoteFilter:true,
            filters:[{
                property:'apr_cIdentificacion',
                value: view.down('#apr_cIdentificacion').getValue()
            }]
        }).load({callback:function (records) {
                    if(records.length>0){
                        if(records.length>1){
                            t.validFlag='La identificación del proveedor ya existe';
                            return;
                        }else{

                            records.forEach(function(r){
                                    if(r.get('Id')!=view.record.get('Id')){
                                            t.validFlag='La identificación del proveedor ya existe';
                                            return;
                                    }    
                            });

                        }
                    }    
                }
            
        }
        );

    }    
});