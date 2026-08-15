Ext.define('FileManager.controller.FileTreeController', {
	extend: 'Ext.app.Controller',
    alias: 'controller.filetreecontroller',

    init: function () {
        this.control({
            'filetree': {
                beforeload: 'onBeforeLoad',
                afterrender: 'onAfterRender',
                select: 'onFolderSelect'
            }
        });
    },

    onAfterRender: function (view) {
        console.log('FileTree view rendered');
    },

    onBeforeLoad: function (store, operation) {
        operation.scope = store;
        return operation;
    },

    onFolderSelect: function (selModel, record) {
        const path = `${record.get('Path')}/${record.get('Name')}`;
        const view = selModel.view.up('filetree');
        const grid = view.up('viewport').down('filegridview');

        grid.setPath(path);
    }
});