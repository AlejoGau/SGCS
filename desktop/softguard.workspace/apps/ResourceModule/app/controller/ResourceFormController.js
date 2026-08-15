Ext.define('ResourceModule.controller.ResourceFormController', {
    extend: 'Ext.app.Controller',
    models: [
        'ResourceTypeSearchModel', 'CuentaSearchModel'
    ],
    views: [
        'ResourceFormView'
    ],
    init: function (config) {
        this.control({
            'resourceformview': {
                afterrender: this.initView,
            },
            'resourceformview button[action=save]': {
                click: this.onSaveClick
            }
        });
    },
    initView: function (view) {
        var controller = this;
        console.log('_UserData', _UserData);
        if(view.tipoRecurso == 1){
            view.down('#cuenta').show();
        }

        var resourceTypeStore = Ext.create('Ext.data.Store', {
            model: controller.getResourceTypeSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'rmt_itipo',
                value: view.tipoRecurso
            }, {
                property: 'rmt_idOrg',
                value: _UserData.Company
            }],
            
        });
        resourceTypeStore.load();
        var resourceTypeCombo = view.down('#tipoRecursoCombo');
        resourceTypeCombo.bindStore(resourceTypeStore);

        var cuentaAsociadaStore = Ext.create('Ext.data.Store', {
            model: controller.getCuentaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
            }]
        });
            

        /* agregar aquí el file upload */
        var archivoContainer = view.down('#archivoContainer');
        var uploadButton = Ext.create('Common.view.UploadButton', {
            itemId: 'dragupload',
            text: 'Cargar',
                                            columnWidth: 0.20,
                                            itemId: 'uploadButton',
                                            iconCls: 'icon-book-add',
                                            text: 'Cargar',
                                            plugins: [ {
                                                ptype: 'uploadwindow',
                                                title: 'Subir Archivo',
                                                //width: 350,
                                                //height: 150
                                            }],
                                            uploader:
                                            {
                                                url: '/rest/upload/new?search=SoftguardMiscFile',
                                                uploadpath: 'gallery',
                                                dropElement: view,
                                                multi_selection: true,
                                                autoStart: true,
                                                maxFileSize: '50mb',
                                                filters: [{ title : "Image files", extensions : "png,jpg,jpeg,gif" }],
                                                statusQueuedText: getLocale( 'Listo para subir' ),
                                                statusUploadingText: getLocale( 'Subiendo' ) + ' ({0}%)',
                                                statusFailedText: '<span style="color: red">Error</span>',
                                                statusDoneText: '<span style="color: green">Completo</span>',
                                                statusInvalidSizeText: 'Archivo demasiado largo',
                                                statusInvalidExtensionText: 'Formato inválido'
                                            },
                                            listeners:
                                            {
                                                beforeupload: function( uploader, file ) {
                                                    var url = '/rest/upload/new?';
                                                    url = Ext.String.urlAppend( url, 'search=SoftguardMiscFile'  );
                                                    //url = Ext.String.urlAppend( url, 'Path=Recursos'  );
                                                    uploader.uploader.settings.url = url
                                                },
                                                fileuploaded: function( uploader, file ) {
                                                var view = uploader.dropElement;
                                                var form = view.getForm();
                                                var record = form.getRecord();
                                                record.set('rmo_cImagen',file.name);
                                                
                                                //var data = {};
                                                //data['fst_cArchivo'] = record.get('fst_cArchivo');

                                                //form.setValues(data);
                                                },
                                                uploadcomplete: function( uploader, success, failed ) {
                                                    var file = success.pop();
                                                    view.down('#imagen').setSrc('/gallery/' + file.name+'?id='+new Date().getTime());
                                                },
                                                scope: this
                                            }
        });
        archivoContainer.add(uploadButton);
        archivoContainer.add({
            xtype: 'container',
            columnWidth: 0.35,
        });
        /* fin agregar upload */

        view.loadRecord(view.record);
    },
    onSaveClick: function (button) {
        var view = button.up('resourceformview');
        var form = view.getForm();
        var record = form.getRecord();
        if(form.isValid()){
            if(view.tipoRecurso == 1){
                if(view.down('#cuenta').getValue()=='' || view.down('#cuenta').getValue()==null){
                    notifyError('Debe seleccionar una cuenta');
                    return;
                }
            }
            form.updateRecord(record);
            record.set('rmo_iCuentaId',view.down('#cuenta').getValue());
            if(record.get('rmo_cImagen')==''){
                notifyError('Debe cargar una imagen');
                return;
            }
            record.save({
                success: function (record, operation) {
                    Ext.Msg.alert('Éxito', 'Recurso guardado correctamente.');
                    view.up('window').close();
                },
                failure: function (record, operation) {
                    Ext.Msg.alert('Error', 'No se pudo guardar el recurso.');
                }
            });
        }else{
            /*
            form.getFields().each(function(field) {
                        if (!field.isValid()) {
                            var label = field.getFieldLabel() || field.getName() || field.getItemId();
                            var errors = field.getErrors(); // Array of error strings for this field
                            
                            errors.forEach(function(error) {
                                errorMessages.push(label + ': ' + error);
                            });
                        }
                    });       
                    */     
        }
        
                
    }
});