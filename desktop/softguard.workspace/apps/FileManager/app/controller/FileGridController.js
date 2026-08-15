Ext.define('FileManager.controller.FileGridController', {
    extend: 'Ext.app.Controller', // Updated for Ext JS 7.1
    alias: 'controller.filegridcontroller',
    stores: [],
    models: [],
    views: ['FileGridView', 'SwitchButtonSegment'],


    init: function () {
        // Using listeners instead of this.control for modern practices
        this.control({
            'filegridview': {
                afterrender: 'onAfterRender',
                itemdblclick: 'onItemClick',
                objectedit: 'onObjectEdit',
                objectcreated: 'onSectionCreated',
                itemcontextmenu: 'onItemContextMenu'
            }
        });
    },

    onAfterRender: function (view) {
        var searchName = myQueryString.searchName;
        var path = myQueryString.path;
        view.path = path;
        view.searchName = searchName;

        // Modern store creation and binding
        /*var store = Ext.create('Ext.data.Store', {
            model: this.getFileSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: false,
            listeners: {
                beforeload: function (store, operation) {
                    operation.setScope(store);
                }
            }
        });

        view.setStore(store);

        var toolbar = view.down('pagingtoolbar');
        toolbar.setStore(store);

        if (searchName) {
            store.load();
        }*/
    },

    onItemClick: function (view, record) {
        var id = record.get('Id');
        var panel = Ext.getCmp('center');
        var title = record.get('Name');

        var existingTab = panel.down('[title="' + title + '"]');
        if (!existingTab) {
            var newTab = Ext.create('Ext.ux.IFrame', {
                title: title,
                id: id,
                border: false,
                src: `/a/project?objectId=${id}`,
                closable: true
            });

            panel.add(newTab);
            panel.setActiveTab(newTab);
        } else {
            existingTab.show();
        }
    },

    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },

    onSectionCreated: function (view) {
        var grid = view.caller;
        var paging = view.down('pagingtoolbar');
        paging.moveFirst();
        this.onItemClick(grid, view.record);
    },

    onItemContextMenu: function (view, record, item, index, event) {
        event.stopEvent();
        if (record.get('Name')) {
            view.contextMenu = Ext.create('Ext.menu.Menu', {
                record: record,
                items: [
                    { text: 'Borrar', handler: 'onFileDel', scope: this },
                    { text: 'Renombrar', handler: 'onFileEdit', scope: this },
                    { text: 'Descargar', handler: 'onFileDownload', scope: this }
                ]
            }).showAt(event.getXY());
        }
    },

    onFileEdit: function (button) {
        var record = button.up('menu').record;
        var newName = window.prompt('Renombrar', record.get('Name'));

        if (newName && newName !== record.get('Name')) {
            record.set('Name', newName);
            record.save({
                success: function () {
                    console.log('Renombrado exitosamente');
                }
            });
        }
    },

    onFileDel: function (button) {
        var record = button.up('menu').record;

        Ext.Ajax.request({
            url: '/Rest/FileSystem/DeleteFile',
            method: 'POST',
            params: {
                path: record.get('Path'),
                name: record.get('Name')
            },
            success: function () {
                console.log('Archivo borrado');
            }
        });
    },

    onFileDownload: function (button) {
        var record = button.up('menu').record;
        window.location.assign(`/Rest/Upload/get?path=${record.get('Path')}&filename=${record.get('Name')}`);
    }
});
