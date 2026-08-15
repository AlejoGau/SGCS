//MIGRADO2024
Ext.define('Common.view.CheckPointsHelperView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.checkpointshelpview'],
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],
    preventHeader: true,
    height: 600,
    frame: true,
    border: 0,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    items: [
        {
            xtype: 'fieldset',
            itemId: 'checkpoints-filter-fieldset',
            margin: '5 5 10 5',
            collapsible: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Filtro',
                    padding: '5 5 5 5',
                    itemId: 'textofiltro'
                },
                {
                    xtype: 'button',
                    action: 'buscar',
                    text: 'Buscar',
                    margin: '5 5 5 0'
                },
                {
                    xtype: 'button',
                    action: 'todos',
                    itemId: 'todos_button',
                    text: 'Todos',
                    margin: '5 0 5 5'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            itemId: 'gridcheckpoints',
            height: 300,
            margin: '0 0 10 0',
            selType: 'checkboxmodel',
            selModel: {
                mode: 'MULTI'
            },
            multiSelect: true,
            columns: [
                {
                    xtype: 'gridcolumn',
                    header: 'Nombre',
                    dataIndex: 'zon_cdescripcion',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Observacion',
                    dataIndex: 'zon_mobservacion',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Tolerancia previa',
            itemId: 'toleranciapre'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Tolerancia posterior',
            itemId: 'toleranciapost'
        }
    ],
    initComponent: function() {
        this.callParent(arguments);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]
        });

        this.addDocked(toolbar);
    }
});
