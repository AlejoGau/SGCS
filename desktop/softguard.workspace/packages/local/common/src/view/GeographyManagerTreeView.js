//MIGRADO2024
Ext.define('Common.view.GeographyManagerTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.geographymanagertree',
    rootVisible: true,
    useArrows: false,
    preventHeader: true,
    hideHeaders: true,
    itemId: 'geographymanagertree',
    autoScroll : true,
    /*plugins:[
        Ext.create('Ext.grid.plugin.CellEditing', {
          clicksToEdit:2
        })
    ],*/
    viewConfig: {
        plugins: { ptype: 'treeviewdragdrop' }
    },
    columns:[
        {
            xtype: 'treecolumn',
            text: 'Tree',
            dataIndex: 'Name',
            flex: 1,
            sortable: false,
            editor: {
                xtype: 'textfield'
            }
        }
    ],
    initComponent: function () {
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'Common.model.GeographybyparentModel',
            autoLoad: false,
            autoSync: false,   
            nodeParam: 'Parent',
            root: {
                Name : getLocale('Lugares'),
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
                    action: 'geographySave'  
                }
            ]
         }); 
         this.addDocked(toolbar);
    }
});