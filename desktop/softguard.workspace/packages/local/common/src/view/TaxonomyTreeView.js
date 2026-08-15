Ext.define('Common.view.TaxonomyTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.taxonomiestree',
    rootVisible: true,
    useArrows: true,
    preventHeader: false,
    itemId: 'taxonomiesTree',
    autoScroll : true,
    rootId: 0,
    rootText: getLocale('Grupos'),
    //store: 'Taxonomies',
   
    initComponent: function () {
        var record = this.record;
        //console.log(record);
        if (record){
            
            /*pasa al controller TaxonomyTreeController 
            var store = Ext.create('Ext.data.TreeStore', {
                model: 'Common.model.TaxonomyTreeSearchModel',
                //storeId: 'Taxonomies',
                ObjectTypeName: record.get('ObjectTypeName')?record.get('ObjectTypeName'):getObjectTypeName(record.get('ObjectTypeId')),
                ObjectId: record.get('Id'),
                autoLoad: false,
                autoSync: false,        
                
                root: {
                    text : this.rootText,
                    root: true,
                    expanded: true,
                    id : this.rootId,
                    ObjectId: record.get('Id'),
                    ObjectTypeName : record.get('ObjectTypeName')?record.get('ObjectTypeName'):getObjectTypeName(record.get('ObjectTypeId'))
                }

            });
            
            */
        };
        
        //pasa al controller TaxonomyTreeController this.store=store;
        this.callParent(arguments);
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
                text: 'Guardar',
                iconCls: 'save',
                action: 'taxonomySave'  
            }
            ]
         }); 
         this.addDocked(toolbar);
    }

});
