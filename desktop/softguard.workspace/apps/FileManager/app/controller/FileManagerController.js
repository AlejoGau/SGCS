Ext.define('FileManager.controller.FileManagerController', {
    extend: 'Ext.app.Controller', // Updated for Ext JS 7.1
    alias: 'controller.filemanagercontroller',
    stores : [  ],
    models : [ 'SearchObjectModel', 'SearchObjectSearchModel' ],
    views : [ 'ExtUxNotification', 'UploadButton', 'FileManagerNorthView' ],
    init: function () {
        this.control({
            'filemanagernorthview #searchnamelist': {
                afterrender: this.initCombo,
                select: this.onSearchSelect
            },
            'viewport': {
                afterrender: this.initView
            }
        });
    },

    initView: function (view) {
        if (myQueryString.searchName) {
            this.setRecord(myQueryString.searchName, myQueryString.path);
        }
    },

    initCombo: function (combo) {
        const store = Ext.create('Ext.data.Store', {
            model: this.getSearchObjectSearchModelModel(),
            autoLoad: false,
            remoteFilter: true,
            filters: [{
                property: 'SearchType',
                value: 'file'
            }]
        });
        combo.setStore(store);
        store.load();
    },

    onSearchSelect: function (combo, records) {
        const record = records[0];
        this.setRecord(record.get('Name'), '');
    },

    setRecord: function (searchName, path) {
        if (searchName) {
            const west = Ext.getCmp('west');
            const filetree = Ext.widget('filetree', {
                closable: false,
                closeAction: 'destroy',
                title: searchName,
                searchName: searchName,
                path: path
            });

            if (west.collapsed) {
                west.toggleCollapse();
            }

            west.insert(0, filetree).expand();
        }
    },

    openObjectIframe: function (objectId) {
        const panel = Ext.getCmp('center');
        const url = `/a/project?objectId=${objectId}`;
        const newTab = Ext.create('Ext.ux.SimpleIFrame', {
            title: 'Proyecto',
            border: false,
            src: url,
            closable: true,
            autoDestroy: true
        });

        panel.add(newTab);
        panel.setActiveTab(newTab);
    }
});
