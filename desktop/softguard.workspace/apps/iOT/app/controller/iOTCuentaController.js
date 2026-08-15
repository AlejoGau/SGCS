Ext.define('iOT.controller.iOTCuentaController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['iOTCuentaView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iotedummyview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                //objectedit: this.onObjectEdit,
                refresh: this.onRefresh
            },
            'iotcuentaview button[action=search]': {
                click: this.onSearchClick
            },
            'iotcuentaview button[action=add]': {
                click: this.onAdd
            },
            
            'iotcuentaview button[action="archivar"]': {
                click: this.onArchivar
            },
            'iotcuentaview button[action="todos"]': {
                click: this.onTodosClick
            }            
        });
    },

	onRefresh: function (view, rec) {
		view.loadRecord(rec);
        //view.getStore().load()
    },    
    initView: function (view) {

        /*
        var _store = Ext.create('Ext.data.Store', {
            model: this.getSgNotesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{"property":"sgn_datecreated","direction":"DESC"}]

        });
        
        var filters = [];
        filters.push({
            property: 'sgn_status',
            id: 'sgn_status',
            value: 0
        });        
        view.filters = filters;
        
        
        this.filtrarPorFecha(_store,view);
        _store.load({
            callback: function () {
                console.log(arguments);
            }
        });        
        view.bindStore(_store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(_store);
        view.getStore().load();*/

    },
    onAdd: function (grid, record, item, index, e, options) {
        /*var view = grid.up('notasactivasgridview'); // Add conditional when call from m_usuariosFormController on saveEvent.
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = view.filterFromSearchContainer ? view.newButtonLabel : 'Nueva Nota';

        var myobject = Ext.create('SgAppNotes.model.SgNotesModel', {
            //usu_ntipo: 7
        });
        myobject.setId(0);

        var viewWidget = Ext.widget('notasactivasformview', {
            caller: view,
            record: myobject,
            hideTipoUsuario: true,
            openFromAC: true,
            openAutomaticallyCreatedUser: view.filterFromSearchContainer ? true : false
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 450,
            border: false,
            items: viewWidget

        });
        win.show();*/

    },
    onArchivar: function(button, event, options){
        /*var view = button.up('notasactivasgridview');
        var selModel=view.getSelectionModel();
        var selectedRecords = selModel.getSelection();
        if(!selectedRecords.length){
            Ext.MessageBox.prompt({
                title: getLocale('Mensaje'),
                message: getLocale('Seleccione algun registro antes de archivar'),
                width: 300
            });
        }else{
            Ext.MessageBox.show({
                title: getLocale('Archivar'),
                message: getLocale('Confirma archivar la selección?'),
                width: 300,
                buttons: Ext.Msg.YESNO,
                buttonText: {
                    yes: getLocale('si'),
                    no: getLocale('no')
                },
                fn: function(btn,text){
                    if (btn=="yes"){
                        selectedRecords.forEach(function(r){
                            var updModel=Ext.create('SgAppNotes.model.SgNotesModel');

                            SgAppNotes.model.SgNotesModel.load(r.data.Id,{

                                success: function(user){
                                    console.log('User: '+user);
                                    user.set('sgn_status',1);//estado 1:archivado
                                    user.set('sgn_fileduserid',_UserData.udw_idKey);

                                    user.save({
                                        success: function(record, operation) {
                                            view.store.load();
                                        }                                        
                                    });
                                }
                            });
                            
                        });
                    }
                }                  
            }); 
        }*/
    },
    onItemClick: function (grid, record, item, index, e, options) {
        /*var view = grid.up('notasactivasgridview') ? grid.up('notasactivasgridview') : grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = getLocale('Ficha') + ': ' + record.get('usu_cnombre');
        var view = Ext.widget('notasactivasformview', {
            caller: view,
            record: record,
            readOnly: true,
            filterFromSearchContainer: view.filterFromSearchContainer ? view.filterFromSearchContainer : false
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
        win.show();*/
    },  
    onObjectEdit: function (record, view) {
       // this.onItemClick(view, record);
    }, 
    onSearchClick: function(button, event, options){
       // var view = button.up('notasactivasgridview');
       // this.filtrarPorFecha(view.store,view);        
    },
    filtrarPorFecha: function(_store,_view){

        /*
        var filters = Ext.clone(_view.filters);
        var datedesde = _view.down('#datedesde').getValue();
        var datehasta = new Date(_view.down('#datehasta').getValue());
        datehasta.setDate(datehasta.getDate()+1);
        if (datedesde){
            filters.push({
                property: 'sgn_datecreated:GTEDATESTRING',
                id: 'fechadesde',
                value: Ext.Date.format(datedesde, 'Y-m-d ')+'00:00:00'
            });
        }
        if (datehasta){
            filters.push({
                property: 'sgn_datecreated:LTEDATESTRING',
                id: 'fechahasta',
                value: Ext.Date.format(datehasta, 'Y-m-d ')+'00:00:00'
            });            
        }
        _store.clearFilter(true);
        _store.filter(filters);*/

    },
    onTodosClick: function(button, event, options){
        /*var view = button.up('notasactivasgridview');
        view.store.clearFilter(true);
        view.store.filter(view.filters);
        view.store.load();*/
    }            

});
