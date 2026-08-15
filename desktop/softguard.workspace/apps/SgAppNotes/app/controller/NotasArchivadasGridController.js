Ext.define('SgAppNotes.controller.NotasArchivadasGridController', {
    extend: 'Ext.app.Controller',
    //stores: ['SgNotesStore'],
    models: ['SgNotesSearchModel'],
    views: ['NotasArchivadasGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'notasarchivadasgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                refresh: this.onRefresh
            },
            'notasarchivadasgridview button[action=search]': {
                click: this.onSearchClick
            },
            'notasarchivadasgridview button[action="todos"]': {
                click: this.onTodosClick
            }
        });
    },

	onRefresh: function (view, rec) {
		view.loadRecord(rec);
        //view.getStore().load()
    },    
    initView: function (view) {


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
            value: 1
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
        view.getStore().load();

    
    },
    onItemClick: function (grid, record, item, index, e, options) {
        var view = grid.up('notasarchivadasgridview') ? grid.up('notasarchivadasgridview') : grid;
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
        win.show();
    },  

    onSearchClick: function(button, event, options){
        var view = button.up('notasarchivadasgridview');
        this.filtrarPorFecha(view.store,view);        
    },
    filtrarPorFecha: function(_store,_view){

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
        _store.filter(filters);

    },
    onTodosClick: function(button, event, options){
        var view = button.up('notasarchivadasgridview');
        
        view.store.clearFilter(true);
        view.store.filter(view.filters);
        view.store.load();
    }            

});
