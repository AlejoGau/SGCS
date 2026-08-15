//MIGRADO2024
Ext.define('Common.store.TaxonomiesStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Common.model.TaxonomyTreeSearchModel',
    //storeId: 'Taxonomies',
    autoLoad: false,
    autoSync: false,        
    
    root: {
        text: 'Características',
        expanded: false,
        leaf: false,
        id: 0
    }
});