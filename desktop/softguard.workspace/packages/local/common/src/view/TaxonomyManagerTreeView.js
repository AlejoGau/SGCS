Ext.define('Common.view.TaxonomyManagerTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.taxonomymanagertree',
    rootVisible: true,
    useArrows: false,
    preventHeader: true,
    hideHeaders: true,
    itemId: 'taxonomymanagertree',
    autoScroll : true,
    plugins:[
        Ext.create('Ext.grid.plugin.CellEditing', {
          clicksToEdit:2
        })
    ],
    viewConfig: {
        plugins: { ptype: 'treeviewdragdrop' }
    },
    columns:[
        {
            xtype: 'treecolumn',
            text: 'Tree',
            dataIndex: 'text',
            flex: 1,
            sortable: false,
            editor: {
                xtype: 'textfield'
            }
        }
    ],
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'Common.model.TaxonomyModel',
            autoLoad: false,
            autoSync: false,   
            nodeParam: 'Parent',
            
            root: {
                text : getLocale('Grupos'),
                root: true,
                expanded: true,
                Id : 0
            }
        });
        
        
        this.store=store;
        this.callParent(arguments);
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
                text: 'Guardar',
                iconCls: 'icon-disk',
                action: 'taxonomySave'  
            },{
                text : 'Crear grupo principal',
                iconCls: 'icon-folder-add',
                action: 'createparent'
            },{
                text : 'Actualizar',
                iconCls: 'x-tbar-loading',
                handler: function(){
                    me.setRootNode({
                        text : getLocale('Grupos'),
                        root: true,
                        expanded: true,
                        Id : 0
                    });
                }
            }
            ]
         }); 
         this.addDocked(toolbar);
    }
});