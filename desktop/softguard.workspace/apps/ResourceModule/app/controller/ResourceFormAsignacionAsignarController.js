Ext.define("ResourceModule.controller.ResourceFormAsignacionAsignarController", {
    extend: "Ext.app.Controller",
    stores: [
        //'ResourceTypeSearchModel', 'CuentaSearchModel'
    ],
    views: [
        'ResourceFormAsignacionAsignarView'
    ],
    models: [
        'ResourceModuleModel',
        'ResourceModuleMemberModel',
        'ResourceModuleMemberSearchModel'
    ],
    init: function (config) {
        this.control({
            'resourceformasignacionasignarview': {
                afterrender: this.initView,
            },
            'resourceformasignacionasignarview button[action=cancel]': {
                click: this.onCancelClick
            },
            'resourceformasignacionasignarview button[action=save]': {
                click: this.onSaveClick
            },

        });
    },
    initView: function (view) {
        console.log('Formulario de asignación: ResourceFormAsignacionAsignarView');

        var memberStore = Ext.create('Ext.data.Store', {
            model: this.getResourceModuleMemberSearchModelModel(),
            pageSize: 8000,
            remoteSort: true,
            remoteFilter: true,
            /*filters: [{
                property: 'rmb_iIdTipoRecurso',
                value: view.tipoRecurso
            }, {
                property: 'rmb_iIdOrganicacion',
                value: _UserData.Company
            }]*/
        });

        var memberClonedStore = Ext.create('Ext.data.Store', {
            model: this.getResourceModuleMemberSearchModelModel(),
            pageSize: 8000,
            remoteSort: false,
            remoteFilter: false,
        });
        memberStore.load({
            callback: function (records, operation, success) {
                if (success) {
                    var clonedRecords = [];
                    Ext.Array.each(memberStore.getRange(), function (rec) {
                        clonedRecords.push(rec.copy(rec.getId()));
                    });
                    memberClonedStore.add(clonedRecords);
                }
            }
        });
        var comboIntegrante = view.down('#comboIntegrante');
        comboIntegrante.bindStore(memberClonedStore);

        var record = view.record;
        var tfechaasignacion = record.get('rmo_tfechaasignacion');
        if (!Ext.isDate(tfechaasignacion) || tfechaasignacion.getFullYear() <= 1900) {
            record.set('rmo_tfechaasignacion', new Date());
        }
        var tfechadevolucion = record.get('rmo_tfechadevolucion');
        if (Ext.isDate(tfechadevolucion) && tfechadevolucion.getFullYear() <= 1900) {
            record.set('rmo_tfechadevolucion', null);
        }

        view.loadRecord(record);
        var archivoContainer = view.down('#archivoContainer');
        var uploadButton = Ext.create('Common.view.UploadButton', {
            itemId: 'dragupload',
            text: 'Cargar',
            columnWidth: 0.20,
            itemId: 'uploadButton',
            iconCls: 'icon-book-add',
            text: 'Cargar',
            plugins: [{
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
                filters: [{ title: "Image files", extensions: "pdf,xls,xlsx,doc,docx,png,jpg,jpeg,gif" }],
                statusQueuedText: getLocale('Listo para subir'),
                statusUploadingText: getLocale('Subiendo') + ' ({0}%)',
                statusFailedText: '<span style="color: red">Error</span>',
                statusDoneText: '<span style="color: green">Completo</span>',
                statusInvalidSizeText: 'Archivo demasiado largo',
                statusInvalidExtensionText: 'Formato inválido'
            },
            listeners:
            {
                beforeupload: function (uploader, file) {
                    var url = '/rest/upload/new?';
                    url = Ext.String.urlAppend(url, 'search=SoftguardMiscFile');
                    uploader.uploader.settings.url = url
                },
                fileuploaded: function (uploader, file) {
                },
                uploadcomplete: function (uploader, success, failed) {
                    var file = success.pop();
                    view.down('#labelNomArchivo').setText(file.name);

                },
                scope: this
            }
        });
        archivoContainer.add(uploadButton);
    },
    onCancelClick: function (button) {
        var view = button.up('resourceformasignacionasignarview');
        view.up('window').close();
    },
    onSaveClick: function (button) {
        var view = button.up('resourceformasignacionasignarview');
        var form = view.getForm();
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.confirm('Confirmar', '¿Confirma la asignación del recurso?', function (btn) {
            if (btn === 'yes') {
                var record = form.getRecord();
                form.updateRecord(record);
                record.set('rmo_iestado', 1);
                record.save({
                    success: function (record, operation) {
                        notify('Recurso asignado correctamente');
                        //view.up('window').close();
                        view.up('window').close();
                        view.caller.fireEvent('refresh', view.caller);

                    },
                    failure: function (record, operation) {
                        notifyError('Error al asignar recurso');
                    }
                });
            }
        });
    }
});