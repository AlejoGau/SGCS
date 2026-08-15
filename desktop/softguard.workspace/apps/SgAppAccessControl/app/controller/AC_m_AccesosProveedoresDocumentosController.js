Ext.define('SgAppAccessControl.controller.AC_m_AccesosProveedoresDocumentosController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [
            't_AccesosTipoDocumentoSearchModel'
            ,'m_AccesosProveedoresDocumentosSearchModel'
            ,'m_AccesosProveedoresDocumentosModel'
        ],
    views: ['AC_m_AccesosProveedoresDocumentosView'],
    ///theme-material para tener un diseño responsive
    init: function (config) {
        // genero los eventos
        this.control({
            'ac_m_accesosproveedoresdocumentosview': {
                afterrender: this.initView,
                
                selectedVehicles: this.onSelectedVehicles,


                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                egresoClick: this.onEgresoClick
                
            },
            'ac_m_accesosproveedoresdocumentosview #uploaddoc': {
                click:  this.onUploadDocClick
            },
            'ac_m_accesosproveedoresdocumentosview button[action=add]': {
                click: this.onAdd
            },
            'ac_m_accesosproveedoresdocumentosview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'ac_m_accesosproveedoresdocumentosview #tipoDoc':{
                select: this.onSelectTipoDoc
            }
        });
    },

    initView: function (view) {
        view.filters = [];
        var recordDoc = Ext.create('SgAppAccessControl.model.m_AccesosProveedoresDocumentosSearchModel',{
            apd_idKeyProveedor: (view.record ? view.record.get('Id') :0) 
        });
        view.recordDoc = recordDoc;
        recordDoc.setId(0);        
        if (view.record) {


                view.filters.push({
                    property: 'apd_idKeyProveedor',
                    value: view.record.get('apr_idKey')
                });
            
        }

        var tdocStore = Ext.create('Ext.data.Store',{
            model: this.getT_AccesosTipoDocumentoSearchModelModel(),

        });
        tdocStore.load();

        view.down('#tipoDoc').bindStore(tdocStore);

        var provDocStore = Ext.create('Ext.data.Store',{
            model: this.getM_AccesosProveedoresDocumentosSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters            
            
        });
        provDocStore.load();
        view.down('#gridDocumentos').bindStore(provDocStore);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(provDocStore);
        
        


        /*view.store = Ext.create('Ext.data.Store', {
            model: this.getT_AccesosTipoDocumentoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: [{
                property: 'o.cac_fecha',
                direction: 'DESC'
            }]
        })*/
        //view.bindStore(view.store);
        
        //toolbar.bindStore(view.store);

        //view.store.load();


        /*var puertaStore = Ext.create('Ext.data.Store', {
            model: this.getT_controlAcceso_puertaSearchModelModel(),
            pageSize: 999,
            //remoteSort: true,
            //remoteFilter: true,
            filters: [],
            sorters: [{
                property: 'cap_nombre',
                direction: 'DESC'
            }]
        })
        view.down('#combopuerta').bindStore(puertaStore);

        puertaStore.load();
        */

        /*var personaStore = Ext.create('Ext.data.Store', {
            model: this.getAC_UsuarioSearchModelModel(),
            pageSize: 999,
            //remoteSort: true,
            //remoteFilter: true,
            filters: [
                //[{"property":"usu_ntipo:ININT","value":"5,6,7,8"}]
                {   property: 'usu_ntipo:ININT',
                    value:'5,6,7,8',
                    id:'usu_tipo'
                }
            ],
            sorters: [{
                property: 'usu_cnombre',
                direction: 'DESC'
            }]
        })
        view.down('#combopersona').bindStore(personaStore);
        personaStore.load();*/
        
        //-----------------
        /*var udwStore = Ext.create('Ext.data.Store', {
            model: this.getAC_AdministratorSearchModelModel(),
            pageSize: 999,
            //remoteSort: true,
            //remoteFilter: true,
            filters: [
            ]
            
        });
        view.down('#comboautorizadopor').bindStore(udwStore);
        udwStore.load();
        if(view.up('ac_m_usuariosformview')){
            view.down('#persona').setVisible(false);
            view.down('#autorizadopor').setVisible(false);
        }else{
            view.down('#showUnidadFuncional').setVisible(false);
        }
        */

    },
//----------------------------------------------------------
    onSelectTipoDoc: function(combo,record,options){
        var view = combo.up('ac_m_accesosproveedoresdocumentosview');
        //apd_tFechaVto
        //apd_cPathFile
        console.log(record);//saco de aqui el valor del tipo de doc
        //atd_iPideVto
        //atd_iUploadFile
        if(record.get('atd_iPideVto')){
            view.down('#apd_tFechaVto').setVisible(true);
            
        }else{
            view.down('#apd_tFechaVto').setVisible(false);
            view.down('#apd_tFechaVto').setValue('');
            view.recordDoc.set('apd_tFechaVto',null);
        }
        if(record.get('atd_iUploadFile')){
            view.down('#uploaddoc').setVisible(true);
            
        }else{
            view.down('#apd_cPathFile').setValue('');
            view.down('#uploaddoc').setVisible(false);
            view.recordDoc.set('apd_cPathFile','');
            
        }
    },
    onUploadDocClick: function(button, event, options) {
            var view = button.up('ac_m_accesosproveedoresdocumentosview')
            var uiapplication = 'AccessControl';
            var model = Ext.ClassManager.get('SgAppAccessControl.model.m_AccesosProveedoresModel')
            var form = view.getForm();
            var record = view.recordDoc;
            var w = Ext.widget('window', {
                title: 'Archivo: ',
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
                            text: 'Subir Archivo',
                            width:'100%',
                            plugins: [{
                                            ptype: 'uploadwindow',
                                            title: 'Subir Archivo',
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
                                    record.set('apd_cPathFile', '/gallery/' + file.name);
                                    //view.down('#Photo').setSrc('/gallery/' + file.name+'?'+new Date().getTime());															
                                    view.down('#apd_cPathFile').setValue('/gallery/' + file.name);															
                                    
                                    /*record.save({
                                    callback : function(record, operation) {
                                        if (operation.success){
                                            record.set('',);
                                            notify('Archivo cargado');
                                        }
                                        }
                                    });*/
                                },
                                scope: this
                            }
                        })

                        /************** */
                    },
                    /*{
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
                                                var filename = 'provdoc-' + randomId + '.png';
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

                                                                record.save({
                                                                    callback: function (record, operation) {
                                                                        if (operation.success) {
                                                                            notify('Los datos se guardaron con éxito');
                                                                            //view.fireEvent('refresh', view, record)
                                                                            view.down('#apr_cPathPicture').setValue(filename);
                                                                            view.down('#Photo').setSrc('/gallery/' + filename+'?'+new Date().getTime());															
                                    
                                                                        }
                                                                    }
                                                                })

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
                    }*/
                ]
                }],
                autoShow: true,
                modal: true
            });//borrar esto
            w.show()

    },//OnUploadDoc

//----------------------------------------------------------

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },

    onAdd: function (grid, record, item, index, e, options) {
        var id = 0;
        var view = grid.up('ac_m_accesosproveedoresdocumentosview');

		var myform = grid.up('form').getForm();
        var recordDoc = view.recordDoc;
        if(myform.isValid()){
            myform.updateRecord(recordDoc);
            if(view.down('#apd_tFechaVto').isVisible() && !recordDoc.get('apd_tFechaVto')){
                notifyError('Debe indicar una fecha de vencimiento')
                return;
            }

            if(view.down('#uploaddoc').isVisible() && recordDoc.get('apd_cPathFile')=='' ){
                notifyError('La carga de un archivo es obligatoria');
                return;
            }
                
                recordDoc.save({
                    success: function(record, operation){
                        notify('Se guardó con éxito') ;
                        view.down('pagingtoolbar').doRefresh();
                        view.down('#apd_tFechaVto').setValue('');
                        view.down('#apd_cDescripcion').setValue('');
                        view.down('#tipoDoc').setValue('');
                        view.down('#apd_cPathFile').setValue('');
                        view.recordDoc = Ext.create('SgAppAccessControl.model.m_AccesosProveedoresDocumentosSearchModel',{
                            Id: 0,
                            apd_idKeyProveedor: view.record.get('Id') 
                        });
                        view.down('#uploaddoc').hide();
                        view.down('#apd_tFechaVto').hide();
                    },
                    failure: function(record, operation){
                        notifyError('Se produjo un error en la registración');
                    }
                    
                });
        }else{
            notifyError('De ingresar los datos requeridos y subir algún archivo');
        }



    },

    onItemClick: function (grid, record, item, index, e, options) {

        

        var viewIO = grid.up('ac_m_usuariosformview') 
        
        if(viewIO)
            return;
         else
            viewIO = grid;   

  
        //var panel = viewIO.targetTab ? viewIO.targetTab : Ext.getCmp('center');
        var title = getLocale('Ficha') + ': ' + record.get('usu_cnombre');
        var view = Ext.widget('ac_m_usuariosformview', {
            caller: viewIO,
            record: record,
            openFromAC: true,
            filterFromSearchContainer: viewIO.filterFromSearchContainer ? viewIO.filterFromSearchContainer : false
        });

        

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            translate: false,
            width: 800,
            //height: 700,
            border: false,
            modal: true,
            items: view             
        });
        win.show();


    },

    onObjectEdit: function (record, view) {
        
        //var id = record.get('Id');
        //var view = grid.up('p_controlacceso_ioview');
        //var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var model=this.getP_controlAcceso_IOModelModel();
        var _record = model.load(record.get('Id'), {callback: function(r){
            //r.set("usu_cnombre",record.get('usu_cnombre'));
            
            var _caView = Ext.widget('p_controlacceso_ioformview', {
                caller: view,
                //objectId: id,
                record: r
            });

            var title = 'Editar registro'



            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout: 'fit',
                title: title,
                translate: false,
                width: 450,
                height: 450,
                modal:true,
                border: false,
                items: _caView
            });
            win.show();
        }});
    },

    onGetAllClick: function (button, event, options) {

        var view = button.up('p_controlacceso_ioview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        //view.down('#query').setValue('');
        view.down('#autorizadopor').setValue('');
        view.down('#persona').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#fechadesde').setValue('');
        view.down('#combopuerta').setValue('');
        view.down('#filterIngSinEg').toggle(false);
        var proxy= store.getProxy();
        proxy.setExtraParam('IngSinEg', 'N' );        
        
        store.load()

    },

    onSearchClick: function (button, event, options) {

        var view = button.up('p_controlacceso_ioview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);

        store.clearFilter(true);
        var fechadesde;
        
        if(view.down('#fechadesde').getValue()!='' && view.down('#fechahasta').getValue()!=null){
            fechadesde = new Date(view.down('#fechadesde').getValue());

            filters.push({
                property: 'o.[cac_fecha]:GTEDATESTRING',
                id:'fechadesde',
                value: Ext.Date.format(fechadesde, 'Y-m-d ')+'00:00:00'
            });

        }

        var fechahasta ;
        if(view.down('#fechahasta').getValue()!='' && view.down('#fechahasta').getValue()!=null){
            fechahasta = new Date(view.down('#fechahasta').getValue());
            fechahasta.setDate(fechahasta.getDate()+1);

            filters.push({
                property: 'o.[cac_fecha]:LTEDATESTRING',
                id: 'fechahasta',
                value: Ext.Date.format(fechahasta, 'Y-m-d ')+'00:00:00'
            });

        }


        if (view.down('#combopuerta').getValue() && view.down('#combopuerta').getValue()!='' ) {
            filters.push({
                property: 'o.[cac_idpuerta]',
                value: view.down('#combopuerta').getValue()
            });

        }

        if(view.down('#autorizadopor').getValue() && view.down('#autorizadopor').getValue()!='' ) {
            filters.push({
                property: 'o.cac_autorizaid',
                value: view.down('#autorizadopor').getValue()
            });
        }

        if(view.down('#persona').getValue() && view.down('#persona').getValue()!='' ) {
            filters.push({
                property: 'o.cac_idautorizado',
                value: view.down('#persona').getValue()
            });
        }

        //view.down('#fechadesde').setValue('')
        //view.down('#fechahasta').setValue('')
        //view.down('#combopuerta').setValue('')

        store.filter(filters);
        store.load()
    },

    onDeleteClick: function (button, event, options) {
        var view = button.up('ac_m_accesosproveedoresdocumentosview');
        var selection = view.down('#gridDocumentos').getSelectionModel().getSelection();
        if (selection) {
            view.down('#gridDocumentos').store.remove(selection);
            var delRec = view.down('#gridDocumentos').store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                Ext.Ajax.request( {
                    url: '/Rest/m_AccesosProveedoresDocumentos/'+rec.data.Id+'?',
                    /*params: {
                        Id:  rec.data.Id
                        
                    },*/
                    method: 'DELETE',
                    success: function( resp, operation ) {
                        if( resp.responseText ) {
                            // Ext.Msg.alert('Status', 'Se facturo');
                            // notify('Se facturo')
                            var metadata = Ext.decode( resp.responseText );
                        }
                    }
                })
            
            }, this);
            
        }
    },

});