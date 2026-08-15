//Ext.require('FileManager.view.GridFeatureTileView')

window.ondragenter = function(e)
{
    e.dataTransfer.dropEffect = 'none';
    e.preventDefault();
    return false;
};

window.ondragover = function(e)
{
    e.preventDefault();
    return false;
};

window.ondrop = function(e)
{
    return false;
};

window.ondragleave = function(e)
{
    return false;
};


Ext.define('FileManager.view.FileGridView', {
    extend: 'Ext.grid.Panel', // Updated for Ext JS 7.1
    alias: 'widget.filegridview',
    title: 'Archivos',
    id: 'filegridview',
    autoHeight: true,
    selModel: {
        type: 'checkboxmodel'
    },

    config: {
        searchName: ''
    },

    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            items: [
                {
                    iconCls: 'icon-download',
                    tooltip: 'Descargar',
                    handler: function (grid, rowIndex) {
                        const record = grid.getStore().getAt(rowIndex);
                        const view = grid.up('filegridview');
                        window.location.assign(
                            `/Rest/Upload/get?path=${view.path}&filename=${record.get('Name')}`
                        );
                    }
                }
            ]
        },
        { text: 'Nombre', dataIndex: 'Name', width: 200, sortable: true },
        { text: 'Creación', dataIndex: 'CreationTime', width: 200, sortable: true },
        { text: 'Tamaño', dataIndex: 'Weight', width: 80, renderer: Ext.util.Format.fileSize, sortable: true }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Subir Archivos',
                    iconCls: 'icon-upload',
                    handler: function () {
                        console.log('Subir archivos clicado');
                    }
                },
                '->',
                {
                    /** vscode-extjs-ignore-3 */
                    xtype: 'switchbuttonsegment',
                    activeItem: 2,
                    items: [
                        { tooltip: 'Details', iconCls: 'icon-default' },
                        { tooltip: 'Tiles', iconCls: 'icon-tile' },
                        { tooltip: 'Icons', iconCls: 'icon-medium' }
                    ],
                    listeners: {
                        change: function (btn, item) {
                            console.log('Cambiando vista a', item);
                        }
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true
        }
    ]
});
