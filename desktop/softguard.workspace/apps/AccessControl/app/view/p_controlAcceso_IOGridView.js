Ext.define('AccessControl.view.p_controlAcceso_IOGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: ['widget.p_controlacceso_ioview'],
    title: '',
    autoHeight: true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp: true,
    columns: [

        {
            xtype: 'gridcolumn',
            header: 'Tipo',
            dataIndex: 'cac_tipoacceso',
            width: 35,
            renderer: function (value) {
                if (value == 1) {
                    return '<img src="/resources/global/images/icons/door_in.png" height="16" widht="16" title="' + getLocale('Ingreso') + '" />'
                } else {
                    return '<img src="/resources/global/images/icons/lock.png" height="16" widht="16" title="' + getLocale('Egreso') + '" />'
                }
            }

        },
        {
            xtype: 'actioncolumn',
            iconToolTips: [
                {tip: 'Observaciones'}
            ],
            width: 30,
            header: 'Observaciones',
            items: [{
                iconCls:'icon-book-open',
                //tooltip: getLocale('Observaciones'),
                getTip: function(value, metadata, record, a, b, c, grid) {
                    return metadata.column.config.iconToolTips[0];
                },
                handler: function (grid, rowIndex, colIndex, item, event,record) {
                    // Aquí abres un panel o modal para editar
                    Ext.create('Ext.window.Window', {
                        title: 'Observacion',
                        modal: true,
                        layout: 'fit',
                        height: 450,
                        width: 500,

                        items: [{
                            xtype: 'textarea',
                            autoScroll: true,
                            style: {
                                overflow: 'auto',
                                whiteSpace: 'normal'
                            },
                            value: record.get('cac_cobservacion') ? record.get('cac_cobservacion') : 'No hay observaciones'
                        }]
                    }).show();
                }
            }]
        },


        {
            xtype: 'gridcolumn',
            header: 'Fecha',
            dataIndex: 'cac_fecha',
            flex: 1,
            renderer: function (value) {
                return Ext.Date.format(new Date(value), 'd-m-Y G:i:s')
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Persona',
            dataIndex: '_proveedorusuario_nombre',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Puerta',
            dataIndex: 'cap_nombre',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Tipo Autorización',
            dataIndex: 'cac_autorizatipo',
            flex: 1,
            renderer: function (value, obj, record) {
                return record.get('_cac_autorizatipo')
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Autorizado Por',
            dataIndex: 'udw_usuario',
            flex: 1

        }, {
            xtype: 'gridcolumn',
            header: 'Unidad Funcional',
            dataIndex: 'cue_cnombre',
            renderer: function (value, obj, record) {
                // Antes se preguntaba si existia cue_cnombre ahora se pregunta por unicdad funcional ->  return record.get('cue_cnombre')!=''?record.get('cue_cnombre'):record.get('unidad_funcional_prov');
                return record.get('unidad_funcional_prov')!=''?record.get('unidad_funcional_prov'):record.get('cue_cnombre');
                
            }
        }
        /*,{
                    xtype : 'gridcolumn',            
                    header : 'Autorizado',
                    dataIndex : 'cac_idautorizado',
                    flex: 1
                }*/
        /*,{
                    xtype : 'gridcolumn',            
                    header : 'Autoriza codigo',
                    dataIndex : 'cac_autorizacodigo',
                    flex: 1
                }*/

    ],

    initComponent: function () {
        var comboSearch = [
            ['fir_ccuenta', getLocale('Cuenta')],
            ['fir_cnombre', getLocale('Nombre')]
        ];



        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                iconCls: 'icon-table-add',
                text: 'Nuevo',
                scope: this,
                hidden: true,
                action: 'add',
                itemId: 'add'
            }, "-", {
                text: 'Filtros',
                menu: {
                    xtype: 'menu',
                    width: 350,
                    items: [{
                        xtype: 'panel',
                        bodyPadding: 5,
                        items: [{
                            xtype: 'datefield',
                            fieldLabel: 'Fecha desde',
                            itemId: 'fechadesde',
                            format: 'd/m/Y'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha hasta',
                            itemId: 'fechahasta',
                            format: 'd/m/Y'
                        }, {
                            xtype: "textfield",
                            itemId: "persona",
                            fieldLabel: "Persona",
                        },
                        {
                            xtype: "textfield",
                            itemId: "unidadfuncional",
                            fieldLabel: "Unidad Funcional"
                        },
                        {
                            xtype: "textfield",
                            itemId: "identificacion", 
                            fieldLabel: "Identificación",
                            maskRe: /[0-9]/, 
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Puerta',
                            queryMode: 'local',
                            itemId: 'combopuerta',
                            name: 'cac_idpuerta',
                            displayField: 'cap_nombre',
                            valueField: 'Id'
                        }, {
                            xtype: 'selecterfield',
                            itemId: 'autorizadopor',
                            simpleSelect: true,
                            hidden: false,
                            config: {
                                disponible: {
                                    title: 'Autorizado Por',
                                    field: 'udw_usuario',
                                    searchField: 'udw_usuario',
                                    //deleteLike: true 

                                },
                                selecionado: {
                                    title: 'Usuario que autorizó',
                                    field: 'udw_usuario'
                                },
                                valueField: 'udw_idKey',
                                modelItems: 'AccessControl.model.AC_AdministratorSearchModel'
                            },
                            filter: [/*{
                                    property: 'tip_ntipo',
                                    value: 7
                                }*/],
                            title: 'Usuario'
                        }]
                    }]
                }

            }, {
                iconCls: 'icon-find',
                text: 'Buscar',
                scope: this,
                action: 'search'
            }, '-',
            {
                iconCls: 'icon-find',
                text: 'Todos',
                scope: this,
                action: 'getAll',
                itemId: 'getAllId'
            },
            {
                iconCls: 'icon-filter',
                text: 'Ingreso sin Egreso',
                action: 'filterIngSinEg',
                itemId: 'filterIngSinEg',
                toggleGroup: 'filter',
                enableToggle: true
            }, {
                iconCls: 'icon-house',
                text: 'Unidad Funcional',
                action: 'showUnidadFuncional',
                itemId: 'showUnidadFuncional'

            }

                ,
            {
                xtype: 'button',
                text: 'Exportar',
                itemId: 'btnExportar',
                action: 'export',
                iconCls: 'icon-page-excel'
            }
            ] // cierro items
        });

        this.addDocked(toolbar);
    }
});