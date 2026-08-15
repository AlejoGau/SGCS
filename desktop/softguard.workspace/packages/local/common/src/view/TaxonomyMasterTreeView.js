//MIGRADO2024
Ext.define('Common.view.TaxonomyMasterTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.taxonomiesmastertree',
    rootVisible: false,
    useArrows: true,
    preventHeader: false,
    itemId: 'taxonomiesmastertree',
    autoScroll : true,
    rootId: 0,
    rootText: getLocale('Grupos'),
    
    initComponent: function () {
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'Common.model.TaxonomyMasterTreeModel',
            storeId: 'Taxonomies',
            nodeParam: 'Parent',
            autoLoad: false,
            autoSync: false,        
            
            root: {
                text : this.rootText,
                root: true,
                expanded: true,
                id : this.rootId
            }
        });
        this.store=store;
        
        this.callParent(arguments);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'checkboxfield',
                    boxLabel  : getLocale('Alguna de las tildadas'),
                    itemId: 'or'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
    }
});