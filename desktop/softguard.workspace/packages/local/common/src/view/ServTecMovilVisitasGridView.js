//MIGRADO2024 - DK-1437
Ext.define('Common.view.ServTecMovilVisitasGridView', {
    extend: 'Ext.panel.Panel',
    alias: ['widget.servtecmovilvisitasgridview'],
    title: 'Asignar movil',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyPadding: 10,

    initComponent: function() {
        var me = this;

        // Panel izquierdo: seleccion
        var leftPanel = {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            margin: '0 10 0 0',
            defaults: { anchor: '100%', margin: '0 0 5 0' },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Movil',
                    itemId: 'comboMoviles',
                    displayField: 'tmp_cnombre',
                    valueField: 'tmp_iid',
                    queryMode: 'local',
                    editable: false,
                    labelWidth: 70
                },
                {
                    xtype: 'container',
                    layout: { type: 'hbox', pack: 'end' },
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-table-add',
                            text: 'Agregar',
                            action: 'add',
                            itemId: 'agregar'
                        }
                    ]
                }
            ]
        };

        // Panel derecho: lista de moviles asignados
        var rightPanel = {
            xtype: 'container',
            flex: 1,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'displayfield',
                            value: '<b>Movil asignado</b>',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-delete',
                            text: 'Borrar',
                            action: 'delete',
                            itemId: 'delete'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    itemId: 'gridMoviles',
                    flex: 1,
                    minHeight: 100,
                    hideHeaders: true,
                    selModel: {
                        type: 'checkboxmodel',
                        checkOnly: true,
                        mode: 'MULTI'
                    },
                    viewConfig: {
                        deferEmptyText: false,
                        emptyText: '<div style="padding:10px; color:#999;">No tiene movil asignado</div>'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'tmp_cnombre',
                            flex: 1,
                            renderer: function(value) {
                                return '<div>' + Ext.String.htmlEncode(value || '') + '</div>';
                            }
                        }
                    ]
                }
            ]
        };

        this.items = [leftPanel, rightPanel];
        this.callParent(arguments);
    }
});
