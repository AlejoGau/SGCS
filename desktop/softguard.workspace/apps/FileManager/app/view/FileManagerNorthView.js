Ext.define('FileManager.view.FileManagerNorthView', {
    extend: 'Ext.panel.Panel', // Updated for Ext JS 7.1
    alias: 'widget.filemanagernorthview',
    region: 'north',
    id: 'app-header',
    height: 40,
    collapsible: false,

    tbar: [
        {
            xtype: 'box',
            html: 'SmallComment',
            id: 'crudTitle'
        },
        '->',
        {
            xtype: 'combobox',
            fieldLabel: 'Carpeta principal',
            labelWidth: 100,
            queryMode: 'remote',
            displayField: 'Name',
            forceSelection: true,
            itemId: 'searchnamelist',
            valueField: 'Name'
        }
    ]
});