Ext.define('FileManager.store.FileStore', {
    extend: 'Ext.data.TreeStore',
    model: 'FileManager.model.FileSearchModel',
    storeId: 'fileStore',
    autoLoad: false,
    autoSync: false,        
    
    root: {
        text: 'Root',
        expanded: false,
        leaf: false,
        id: 0
    }
});
