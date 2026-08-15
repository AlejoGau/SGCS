Ext.define('Common.controller.FormularioSerTecEditHtmlGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'tip_ntipoStore' ],
    models : [  'FormularioSerTecSearchModel', 'TipoServicioSearchModel', 'TablasLineasSearchModel', 'CuentaSearchModel'],
    views : [ 'FormularioSerTecEditHtmlGridView', 'FormularioSerTecHTMLEditorFormView'],

    

    init: function (config) {
        var me=this;
        // genero los eventos

        this.control({
            /*'formulariosertecedithtmlgridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'formulariosertecedithtmlgridview button[action=add]': {
                click: this.onAddClick
            },*/
            'formulariosertecedithtmlgridview':{
                beforerender: this.loadData,
                itemdblclick: this.onItemDblClick,
                refresh: this.onRefresh,
                objectedit: this.onObjectEdit,
                selectionchange: this.onSelectChange
            },
            'formulariosertecedithtmlgridview button[action=filterText]' : {
                click: this.onFiltertextClick
            },                    
                               
            'formulariosertecedithtmlgridview button[action=search]' : {
                click: this.onFilterClick
        	},                    
            'formulariosertecedithtmlgridview button[action=getall]' : {
                click: this.onGetAllClick
        	},
            'formulariosertecedithtmlgridview button[action=btnprint]': {
                click: this.onBtnprintClick
            },            
            'formulariosertecedithtmlgridview button[action=mail]': {
                click: this.onMailClick
            },             
        });


    }, // cierro init
    onSelectChange: function (selModel, selections) {
        var view = selModel.view;
        view.up('formulariosertecedithtmlgridview').down('[action="mail"]').setDisabled(selections.length == 0);
        view.up('formulariosertecedithtmlgridview').down('[action="btnprint"]').setDisabled(selections.length == 0);
    },
    onMailClick: function (button ) {
        var view = button.up('formulariosertecedithtmlgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection.length > 0) {
            var rec = selection[0];
            url = '/handler/FormularioSerTecLoadHtmlHandler?filename=' + rec.get('fst_cArchivo');        
            fetch(url)
            .then(function (response) { 
                return response.text();
            }).then(function (body) {
                var mailbody = body;   
                var from = getParametro( 'MAILSENDER' );
                var mail = Ext.widget( 'mailformview', {
                    mailbody: mailbody,
                    from: from,
                    to: '',
                    autoScroll: true,
                    subject: rec.get('fst_cArchivo'),
                    cue_iid: rec.get( 'cue_iid' )
                });
                var win = Ext.widget( 'window', {
                    title: 'Envío de correo',
                    layout: 'fit',
                    items: mail,
                    width: 600,
                    height: 600
                }).show();         
            } );
        }

    },    
    onBtnprintClick: function (button) {
        var view = button.up('formulariosertecedithtmlgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection.length > 0) {
            var rec = selection[0];
            url = '/handler/FormularioSerTecLoadHtmlHandler?filename=' + rec.get('fst_cArchivo');
            fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) { 
                printHTMLContent(body);
                /*
                var win = Ext.create('Ext.window.Window', {
                        title: 'Mi ventana',
                        html: "",
                        modal: true,
            });
            contenido = body.replace('body', 'body onload="window.print(); window.onafterprint = function() { window.close(); }"')
                let myWindow = window.open('', '', 'width=600,height=400');
                if (myWindow) {
                    let doc = myWindow.document;
                    doc.open();
                    doc.write(contenido);
                    doc.close();
                } else {
                    console.error('No se pudo abrir la ventana.');
                }
                //win.printMe();
                */
            });
        }
    },

    onRefresh: function (view){
        view.getStore().load();
    },
    onFilterClick: function(button,event,options){
        var view = button.up('formulariosertecedithtmlgridview');
        var filterNombre = view.down('#filterNombre');
        var filterEstado = view.down('#filterEstado');
        var filterTipo = view.down('#filterTipo');
        var filterDealer = view.down('#filterDealer');
        var filters=[];
        
        if(filterNombre.getValue()!=''){
            filters.push({
                property: 'fst_cNombre:LIKE',
                value: filterNombre.getValue()
            });
        }
        if(filterEstado.getValue() == 0 || filterEstado.getValue() == 1 ){
            filters.push({
                property: 'fst_iStatus',
                value: filterEstado.getValue()
            });
        }
        if(filterTipo.getValue() != null && filterTipo.getValue()>=0){
            filters.push({
                property: 'fst_iTipo',
                value: filterTipo.getValue()
            });
        }
        if(filterDealer.getValue()!=null && filterDealer.getValue()!=''){
            filters.push({
                property: 'fst_cDealer:LIKE',
                value: filterDealer.getValue()
            });
        }    
        var store = view.getStore();
        store.clearFilter();
        store.filter(filters);     
        store.load();       
    },
    onGetAllClick: function(button,event,options){
        var view = button.up('formulariosertecedithtmlgridview');
        var store = view.getStore();
        view.down('#filterNombre').setValue('');
        view.down('#filterEstado').setValue('');
        view.down('#filterTipo').setValue('');
        view.down('#filterDealer').setValue('');        
        store.clearFilter();
        store.filter(view.filters);
        store.load();
    },
    loadData: function (view) {
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var tipoServicioStore = Ext.create('Ext.data.Store',{
            model: this.getTipoServicioSearchModelModel(),
            remotoFilter: false,
            remotoSort: false,
            storeId: 'tipoServicioFormSerTecStore',
            listeners: {
                load: function(store){
                        store.insert(0,{
                            Id: 0,
                            tip_cdescripcion: getLocale('Todos')
                        });
                      }
            }            
        });
        tipoServicioStore.load(); 
        view.filters = [
                {
                    property: 'fst_cDealer:LIKE',
                    value: view.config.record.get('cue_clinea')
                }
            ];        
        var mystore =Ext.create('Ext.data.Store',{
            remoteFilter: true,
            filters: view.filters,
            model: this.getFormularioSerTecSearchModelModel()
        });
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(mystore);
        
        view.bindStore(mystore);
        // una vez que cargue el store hago el binding con la view
        var filterServicioCombo = view.down('#filterTipo');
        filterServicioCombo.bindStore(tipoServicioStore);
        mystore.load();
    },
    onDeleteClick: function(button,event,options){
        var view = button.up('formulariosertecedithtmlgridview');
        var selection = view.getSelectionModel().getSelection();
        var model = this.getFormularioSerTecModelModel();

        //selection.setProxy(model.getProxy());
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setProxy(model.getProxy())
                rec.destroy({callback: function(record, operation){
                    if (operation.success)
                    {
                        notify('Se eliminio exitosamente');  
                    }
                    else
                    {
                        notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                    }                    
                    view.store.load({callback:function (records) {
                        //if(records.length>0) { view.down('#addemail').hide() } else { view.down('#addemail').show() } 
                    } });
                }
            });
            
            },this);
        }
        
        
    },
    onAddClick: function(button,event,options){
        var view = button.up('formulariosertecedithtmlgridview');
        var model = this.getFormularioSerTecModelModel();
        var record = model.create();
        var title = 'Formulario Servicio Técnico';
        var myWindow = Ext.widget('window',{
            title: title,
            height: 400,
            width: 450,
            resizable: true,
            closeAction: 'destroy',
            modal: true, 
            items: {
                xtype: 'formulariosertecformview',
                record: record,
                caller: view
            },
            record: record,
            layout: 'fit'
        }).show();
    },
    onObjectEdit: function(record, view ) {
        this.onItemDblClick( view, record );
    },
    onItemDblClick: function(view,record,item,index,e,options){
        this.openFormWindow(record.get('fst_cNombre'),record,view);
    },

    
    openFormWindow: function(title,record,grid){
        var view = grid.up('formulariosertecedithtmlgridview')?grid.up('formulariosertecedithtmlgridview'):grid;
        var newView = Ext.widget('formulariosertechtmleditorformview',{
            record: record,
            caller: view
        }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            resizable: true,
            closeAction: 'destroy',
            height: 400,
            width: 450,
            modal: true, 
            items: newView,
            layout: 'fit'
        }).show();
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('formulariosertecedithtmlgridview');
        var store = view.getStore();
        var query = view.down('#query');

        store.currentPage = 1;
        store.filter('tgc_cdescripcion:LIKE',query.getValue());
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('formulariosertecedithtmlgridview');
        var store = view.getStore();
        store.currentPage = 1;
        store.clearFilter();
        view.down('#query').setValue('');
    }

});