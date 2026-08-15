//MIGRADO2024 - DK-1437
Ext.define('Common.view.ServTecTecnicoVisitaGridView', {
    extend: 'Ext.panel.Panel',
    alias: ['widget.servtectecnicovisitasgridview'],
    title: 'Asignar tecnico',
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
                    fieldLabel: 'Tecnico',
                    itemId: 'comboTecnicos',
                    name: 'tecnicos',
                    displayField: 'ins_cnombre',
                    valueField: 'ins_idKey',
                    queryMode: 'local',
                    editable: false,
                    labelWidth: 70,
                    listConfig: {
                        getInnerTpl: function() {
                            return '<tpl if="_conflicto">' +
                                '<span style="color:#e53935; font-size:14px;">●</span> ' +
                                '</tpl>{ins_cnombre}';
                        }
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Referencia',
                    labelWidth: 70,
                    value: '<span style="color:#e53935;">●</span> Indica que el tecnico ya tiene una asignacion en ese horario.',
                    margin: '0 0 5 0'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Movilidad',
                    itemId: 'comboViajes',
                    displayField: 'sfv_cNombre',
                    valueField: 'Id',
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

        // Panel derecho: lista de tecnicos asignados
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
                            value: '<b>Tecnico asignado</b>',
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
                    itemId: 'gridTecnicos',
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
                        emptyText: '<div style="padding:10px; color:#999;">No tiene tecnico asignado</div>'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'ins_cnombre',
                            flex: 1,
                            renderer: function(value, meta, record) {
                                var movilidad = record.get('sfv_cNombre') || '';
                                return '<div><b>' + Ext.String.htmlEncode(value || '') + '</b></div>' +
                                    '<div style="color:#666; font-size:11px;">' + Ext.String.htmlEncode(movilidad) + '</div>';
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
