Ext.define('FileManager.view.FileTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.filetree',
    rootVisible: true,
    useArrows: false,
    preventHeader: false,
    itemId: 'filetree',
    autoScroll : true,
    store: 'fileStore',
    
    initComponent: function () {
        var searchName = this.searchName ? this.searchName:'File';
        var path = this.path ? this.path:'';
        
        var rootName = path ? path : searchName;
        
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'FileManager.model.FileSearchModel',
            storeId: 'fileStore',
            searchName: searchName,
            path: path,
            type: 'Directory',
            autoLoad: false,
            autoSync: false,        
            
            root: {
                text : rootName,
                expanded: false,
                VirtualPath: path,
                root: true,
                id : 0,//record.get('Id'),
                ObjectTypeName : 'File'
            }

        });
        //url = '/rest/search/' + searchName + '?Type=Directory';//&Path=' + path + '&page=1&start=0&limit=50';
        
        //store.getProxy().setUrl(url); 
        //view.bindStore(store);
        //var toolbar = view.down('pagingtoolbar');
        //toolbar.bindStore(store);
        //store.load();
        this.callParent(arguments);
        /*
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
                text: 'Guardar',
                iconCls: 'save',
                action: 'taxonomySave'  
            }
            ]
         }); 
         this.addDocked(toolbar);
         */
    }

});
