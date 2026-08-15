Ext.define('Common.view.ModuleTreeView', {
    extend: 'Ext.tree.Panel', // Updated for Ext JS 7.1
    alias: 'widget.moduletreeview',
    itemId: 'modulesTree',
    title: 'Navegación',
    rootVisible: false,
    border: 0,
    lines: false,
    iconCls: 'nav',
    overflowY: true,
    hideHeaders: true,

    columns: [
        {
            xtype: 'treecolumn', // Indicates this is the tree column
            flex: 1,
            dataIndex: 'text',
            renderer: function (value) {
                return getLocale(value);
            }
        }
    ]
});