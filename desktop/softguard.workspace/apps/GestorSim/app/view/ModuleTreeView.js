Ext.define('GestorSim.view.ModuleTreeView', {
    extend:'Ext.tree.Panel',
    alias : 'widget.moduletreeview', 
    itemId: 'modulesTree',
    title: 'Navegación',
    rootVisible: false,
    border: 0,
    lines: false,
    iconCls: 'nav',
    overflowY: true,
    hideHeaders: true,
    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        flex: 1,
        dataIndex: 'text',
        renderer: function(value) {
            return getLocale(value);
        }
    }]
}); 