Ext.define('Common.controller.SmartMailTrackingGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SmartMailTrackingSearchModel'],
    views: ['SmartMailTrackingGridView'],

    init: function (config) {
        // genero los eventos
        this.control(
            {
                'smarttrackinggridview': {
                    afterrender: this.initView,
                    itemdblclick: this.onItemClick,
                    objectedit: this.onObjectEdit
                },
                'smarttrackinggridview button[action=search]': {
                    click: this.onSearchClick
                },
                'smarttrackinggridview button[action=getall]': {
                    click: this.onGetAllClick
                },

            });
    },

    initView: function (view) {
        view.filters = [];


        // if (view.record){
        //     view.filters = [
        //         {
        //             property: 'ProgramId',
        //             value: view.record.get('Id')
        //         }
        //     ]
        // }

        var store = Ext.create('Ext.data.Store', {
            model: this.getSmartMailTrackingSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);

        store.load();
    },

    onItemClick: function (grid, record, item, index, e, options) {
        var id = record.get('Id');
        var view = grid.up('personsearchview') ? grid.up('personsearchview') : grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = '(' + id + ') ' + record.get('Name');

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('personview', {
                iconCls: 'icon-Person',
                title: title,
                translate: false,
                section: view.record,
                targetTab: panel,
                objectId: id,
                closable: true
            });

            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            mytab.show();
        }

    },

    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },


    onGetAllClick: function (button, event, options) {
        var view = button.up('smarttrackinggridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        store.load();
        /*view.down('#Name').setValue('');
        view.down('#LastName').setValue('');
        view.down('#Email').setValue('');
        
        var taxonomytree = view.query('taxonomiesmastertree')[0]; 
        var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
        var taxonomiesArray = [];
        Ext.Array.each(taxonomiesSelected, function (rec) {
            if (rec.get('checked'))
            rec.set('checked', false)
        },this);
        */
    },

    onSearchClick: function (button, event, options) {
        var view = button.up('smarttrackinggridview');

        var store = view.getStore();

        var valorSearch = view.down('#query').getValue();
        var field = view.down('#fieldName').getValue();


        var filters = Ext.clone(view.filters);


        if (valorSearch)
            filters.push({
                property: field + ':LIKE',
                value: valorSearch,
                id: field
            });


        if (filters.length > 0)
            store.filter(filters);
        else
            store.clearFilter();
    }

});
