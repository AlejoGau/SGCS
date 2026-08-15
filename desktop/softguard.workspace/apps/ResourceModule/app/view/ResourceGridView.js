Ext.define('ResourceModule.view.ResourceGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resourcegridview',
    itemId: 'resourcegridview',
    features: [
        {
            ftype: 'grouping',
            //groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> ' + getLocale('Prioridad') + ': {name} ({rows.length})</input>',
            groupByText: getLocale('Agrupar'),
            id: 'groupingRM',
            showGroupsText: getLocale('Mostrar en grupos'),
            //groupHeaderTpl: '{[values.rows[0].data.estadoStr]} (Cantidad {rows.length})'
            groupHeaderTpl: '{name} ({rows.length})'
        }
    ],

    columns: {
        items: [
            { header: 'Nombre', dataIndex: 'rmo_cNombre', flex: 1 },
            /*{ header: 'Estado', dataIndex: 'rmo_iestado', flex: 1, renderer: function (value) {
                if (value === 1) {
                    return 'Activo';
                } else if (value === 0) {
                    return 'No Activo';
                } else {
                    return 'Desconocido';
                }
                } 
            },*/
            { header: 'Estado', dataIndex: 'estadoStr', flex: 1 },
            { header: 'Integrante', dataIndex: 'rmb_cNombre', flex: 1 },
            { xtype: 'datecolumn', header: 'Fecha de Asignación', dataIndex: 'rmo_tfechaasignacion', flex: 1, format: 'd/m/Y H:i:s' },
            { header: 'Tipo de Recurso', dataIndex: 'rmt_cNombre', flex: 1,},
            { header: 'Cuenta', dataIndex: 'cuentaVinculada', flex: 1 },
            { xtype: 'datecolumn', header: 'Fecha de devolución', dataIndex: 'rmo_tfechadevolucion', flex: 1, format: 'd/m/Y H:i:s' }

        ]
    },
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            dock: 'top',
            items: [
                {
                    xtype: 'segmentedbutton',
                    action: 'filtroEstado',
                    allowMultiple: false,
                    items: [
                        {text: 'Activos'},
                        {text: 'No Activos'}
                    ]
                }, {
                    text: '|',
                }, {
                    text: 'Organizar',
                    menu: [
                        {
                            text: 'Agrupar por estado (Por defecto)',
                            action: 'agruparestado'
                        },{
                            text: 'Agrupar por tipo recurso',
                            action: 'agrupartipo'
                        }
                    ]
                }, {
                    text: '|',
                }, {
                    text: 'Filtrar',
                    menu: {
                        xtype: 'menu',
                        width: 420,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                bodyStyle: 'border-bottom: 2px solid',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Nombre',
                                        itemId: 'nombre'
                                    },{
                                        xtype: 'combo',
                                        fieldLabel: 'Estado',
                                        queryMode: 'local',
                                        store: [
                                            [1, 'Activo'],
                                            [0, 'No Activo']
                                        ],
                                        itemId: 'estado'

                                    },{
                                        xtype: 'textfield',
                                        fieldLabel: 'Integrante',
                                        itemId: 'integrante'
                                    },{
                                        xtype: 'textfield',
                                        fieldLabel: 'Cuenta',
                                        itemId: 'cuenta'
                                    },{
                                        xtype: 'combo',
                                        itemId: 'tipoRecursoCombo',
                                        fieldLabel: 'Tipo de Recurso',
                                        queryMode: 'local',
                                        valueField: 'Id',
                                        displayField: 'rmt_cNombre',

                                    },{
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end' // Pushes child items to the right
                                            },
                                            margin: '10 0 0 0', // Spacing above the button
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    text: 'Buscar',
                                                    action: 'search'
                                                }
                                            ]
                                        }
                                    ]
                            }
                        ]

                    }
                }, {
                    text: 'Quitar filtros',
                    action: 'quitarfiltros'
                }
            ]
        });
        me.addDocked(toolbar);

        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);        
    }
});