Ext.define('Common.view.ModuleTreeWRGuiadoView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.moduletreewrguiadoview',
    itemId: 'moduleswrguiadoTree',
    title: 'Navegación',
    rootVisible: false,
    border: 0,
    lines: false,
    overflowY: true,
    hideHeaders: true,

    store: {
        type: 'tree',
        root: {
            expanded: true,
            children: []
        }
    },

    columns: [
        {
            xtype: 'treecolumn',
            flex: 1,
            maxWidth: 300,
            dataIndex: 'text',
            renderer: function (value, metaData, record) {
                const styleCls = record.get('styleCls') || '';
                return `<span class="wrg-tree-node-label ${styleCls}">${value}</span>`;
            }
        },
        {
            text: '',
            xtype: 'templatecolumn',
            //width: 60,
            tpl: [
                '<div class="circle-indicator" style="background-color:{color}" data-qtip="{tooltip}">',
                '✔',
                '</div>'
            ]
        }
    ],

    /*findNextNode: function (store,recordId) {
        const currentRec = store.getNodeById(recordId);

        const flatList = [];
        store.getRoot().cascadeBy(function(node) {
            if (node.isLeaf()) {
                flatList.push(node);
            }
        });

        const index = flatList.indexOf(currentRec);
        const nextRec = (index !== -1 && index < flatList.length - 1) ? flatList[index + 1] : null;

        return nextRec;      
    },

    listeners: {
        afterrender: function (tree) {
            const view = tree.getView();
            

            view.on('itemmouseenter', function (view, record, item) {
                const tipText = record.get('tooltip') || record.get('text');
                Ext.fly(item).set({
                    'data-qtip': Ext.htmlEncode(tipText)
                });
            });


            view.on('cellclick', function (view, td, cellIndex, record, tr, rowIndex, e) {
                const nextRecNode = tree.findNextNode(view.getStore(),record.getId());
                if (e.getTarget('.circle-indicator') && record.get('color') == BLUE) {
                    Ext.Msg.alert('Clicked', 'You clicked on: ' + record.get('text')+ ' next record is: '+nextRecNode.get('text'));
                    record.set('color', GREEN);  // color del actual paso en el círculo de la tilde
                    record.set('styleCls', 'wrg-tree-node-green');  // color background del actual step
                    nextRecNode.set('color', BLUE); // color del siguiente paso en el círculo de la tilde
                    nextRecNode.set('styleCls', 'wrg-tree-node-blue'); // color background del siguiente step

                    view.refresh();
                }
            });
        },
        itemclick: function(view, record, item, index, e) {
            return false;
        }

    }*/
});
