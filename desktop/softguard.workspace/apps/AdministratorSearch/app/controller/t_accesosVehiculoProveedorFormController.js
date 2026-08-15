Ext.define('AdministratorSearch.controller.t_accesosVehiculoProveedorFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleBrandModel', 'VehicleModelProveedor', 'VehicleModelModel' ],
    views : [ 't_accesosVehiculoProveedorFormView' ],
	init : function(config) {
		// genero los eventos

		this.control({
			't_accesosvehiculoproveedorformview button[action="save"]' : {
				click : this.saveObject
			},
            't_accesosvehiculoproveedorformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            't_accesosvehiculoproveedorformview' : {
                beforerender : this.initview,
                fieldvaliditychange : this.onValidityChange,
                passwordchanged : this.onPasswordChanged
			},


            't_accesosvehiculoproveedorformview button[action="uploadimg"]':{
                click: this.onUploadImgClick
            },
            't_accesosvehiculoproveedorformview #avp_iVehicleBrand':{
                select: this.onSelectBrand,
                change: this.onChangeBrand
            }

		});
    }, // cierro init
    
    onChangeBrand: function ( comboBrand, newValue, oldValue, eOpts ){
        var comboModel = comboBrand.up('t_accesosvehiculoproveedorformview').down('#avp_iVehicleModel');
        if(!newValue){
            comboModel.setValue('');
            modelStore.clearFilter(true);            
            comboModel.store.filter([{
                property: 'VehicleBrand',
                value: -1
            }]);

            comboModel.store.load();
            
        }

    },

    onSelectBrand: function ( combo, record, eOpts ) {
       /* filters:[{
            property:'tip_ccodigo',
            value: view.record.get('cue_ctipo')
        }] */       
        console.log('Evento!!!');
        console.log('Filtros: '+combo.store.filters);
        var comboModel = combo.up('t_accesosvehiculoproveedorformview').down('#avp_iVehicleModel');
        var modelStore = comboModel.store;
        modelStore.clearFilter(true);
        var filtro = [{
                property: 'VehicleBrand',
                value: combo.getValue()
            }];
        modelStore.filter(filtro);
        modelStore.load();
        comboModel.setValue('');
        


    },

    onUploadImgClick: function(button, event, options) {
        /*#1*/var view = button.up('t_accesosvehiculoproveedorformview');

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
                url: '/rest/upload/new?search=softguardMiscFile',
                items: [
                    {
                    /*agregar aqui el file upload */
                    items: Ext.create('Slbf.view.UploadButton', {
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
                            url: '/rest/upload/new?search=softguardMiscFile',
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
                                view.down('#avp_cPathPicture').setValue(file.name);
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
                                                    view.down('#avp_cPathPicture').setValue(filename);
                                                    view.down('#Photo').setSrc('/gallery/' + filename+'?'+new Date().getTime());															
            
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
	initview : function(view) {
        var myform = view.getForm();
        var record = view.record
        var profile = view.profile;

        if(record.get('Id')!=0)
            view.loadRecord(record);
        var rights = view.rights;
        
        if (view.record.get('avp_cPathPicture') != null &&
            view.record.get('avp_cPathPicture') != ''){
            view.down('#Photo').setSrc('/gallery/' + view.record.get('avp_cPathPicture'));
            view.down('#avp_cPathPicture').setValue(view.record.get('avp_cPathPicture'));
            view.down('#Photo').setWidth('32');
            view.down('#Photo').setHeight('32');            
        }
        var vBrandStore =Ext.create('Ext.data.Store',{
            model: this.getVehicleBrandModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        });
       
       view.down('#avp_iVehicleBrand').bindStore(vBrandStore);
       vBrandStore.load();
       var vModelStore = Ext.create('Ext.data.Store',{
            model: this.getVehicleModelProveedorModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        });
       /*
        vModelStore.    filter([{
            property: 'VehicleBrand',
            value: -1
        }]);*/
        
       
       
       var comboModel = view.down('#avp_iVehicleModel');
       var comboBrand = view.down('#avp_iVehicleBrand');
       if(view.record.get('avp_iVehicleBrand')==0){
            vModelStore.filter([{
                    property: 'VehicleBrand',
                    value: -1
                }]);
            comboBrand.setValue('');    
       }else{
            vModelStore.filter([{
                    property: 'VehicleBrand',
                    value: comboBrand.getValue()
                }]);           
       }
       vModelStore.load(records => console.log("vModelStore records",records));
       if(record.get('avp_iVehicleModel')==0)
            view.down('#avp_iVehicleModel').setValue('');
       view.down('#avp_iVehicleModel').bindStore(vModelStore);           
                            

            
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
        var view = button.up('t_accesosvehiculoproveedorformview');
        var record = view.record;
        var win =  button.up('window');
        var controller = this;
        
        if (myform.isValid()){
            
            myform.updateRecord(record);
            record.save({
                
                success: function(response){
                    //if( view.caller && !view.openAutomaticallyCreatedUser) {
                        view.caller.fireEvent('refresh',view.caller, record);
                        win.close();
                    //} else {
                    //    win.close();
                    //    view.caller.fireEvent('itemdblclick', view.caller, record);
                    //}
    
                },
                failure:function (response) {
                    notifyError('Se produjo un error al guardar los datos');
                
            }})
        }else{
            notifyError('Ingrese los datos obligatorios. ');
        }   
	},

	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('m_accesscontrolproveedoresformview');
		mymodel.destroy({
					scope : this.application
				});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close()
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        var view = button.up('m_accesscontrolproveedoresformview');
        var myform = view.getForm();
		var record = view.record;
        
        if (record.get('Id')==0 && record.store) {
            record.store.remove(record);
        }
        
        myWin.close();
    }
    


});
