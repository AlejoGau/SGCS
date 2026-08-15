Ext.define('Common.controller.FormularioSerTecHTMLEditorFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'FormularioSerTecHTMLEditorFormView'],
    init : function(config) {
        var me = this;
        // genero los eventos
        this.control({
            'formulariosertechtmleditorformview button[action=save]': {
                click: this.onSaveClick
            },
            'formulariosertechtmleditorformview button[action=close]': {
                click: this.onCloseClick
            },
            'formulariosertechtmleditorformview': {
                beforerender: this.initview
            }
        });
    }, // cierro init
    initview: function(view){
        var record = view.record;
            if(record){
                Ext.Ajax.request({
                    url: '/handler/FormularioSerTecLoadHtmlHandler',
                    method: 'GET',
                    params: {
                        filename: record.get('fst_cArchivo')
                    },
                    success: function(response) {
                        var html = response.responseText;
                        var htmlEditor = view.down('#html');
                        htmlEditor.setValue(html);
                    }
                });
            }
    },
    onCloseClick: function(button,event,options){
        var view = button.up('formulariosertechtmleditorformview');
        view.close();
    },
    onSaveClick: function(button,event,options){
        var view = button.up('formulariosertechtmleditorformview');
        var record = view.record;
        var htmlEditor = view.down('#html');
        var html = htmlEditor.getValue();
        Ext.Ajax.request({
            url: '/handler/FormularioSerTecSaveHtmlHandler',
            method: 'POST',
            params: {
                filename: record.get('fst_cArchivo'),
                html: html
            },
            success: function(response) {
                var result = response.responseText;
                notify('Archivo guardado correctamente');
            }
        });
    }
});

    