Ext.define('SgAppAccessControl.view.AC_m_AccesosProveedoresAutorizacionesGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: ['widget.ac_m_accesosproveedoresautorizacionesgridview'],
    title: 'Templates',
    height: 300,
    init: true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp: true,

    viewConfig: {
        getRowClass: function (record, index, rowParams, ds) {
            return record.get('estadoStyle')
        }
    },
    columns: [{
            xtype: 'actioncolumn',
            width: 55,
            items: [{
                    iconCls: 'icon-table-edit',
                    tooltip: 'Editar',
                    handler: function (grid, rowIndex, colIndex, item, event) {
                        var view = grid.up('ac_m_accesosproveedoresautorizacionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit', rec, grid);
                    },
                },
                {
                    iconCls: 'icon-door-in',
                    tooltip: 'Ingreso',
                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                        if(r.get('cac_tipoacceso') == 1 || r.get('estadoStyle')=='estado0'
                                || r.get('estadoStyle') == 'estado1') {
                            return "x-hide-display";
                        } else {
                            return 'icon-door-in';
                        }
                    },
                    handler: function (grid, rowIndex, colIndex, item, event) {
                        var view = grid.up('ac_m_accesosproveedoresautorizacionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('ingresoClick', rec, grid);
                    },
                    isDisabled: function(view, rowIndex, colIndex, item, r) {
                        if(r.get('cac_tipoacceso') == 1 || r.get('estadoStyle')=='estado0'
                                || r.get('estadoStyle') == 'estado1') {
                            return true;
                        } else {
                            return false;
                        }
                    }                    
                },
                {
                    iconCls: 'icon-door-out',
                    tooltip: 'Egreso',
                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                        if(r.get('cac_tipoacceso') == 0 || r.get('estadoStyle')=='estado0' 
                                || r.get('estadoStyle') == 'estado1') {
                            return "x-hide-display";
                        } else {
                            return 'icon-lock';
                        }
                    },
                    handler: function (grid, rowIndex, colIndex, item, event) {
                        var view = grid.up('ac_m_accesosproveedoresautorizacionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('egresoClick', rec, grid);
                    },
                    isDisabled: function(view, rowIndex, colIndex, item, r) {
                        if(r.get('cac_tipoacceso') == 0 || r.get('estadoStyle')=='estado0'
                                || r.get('estadoStyle') == 'estado1') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ]
        }, {
            xtype: 'gridcolumn',
            header: 'Autoriza',
            dataIndex: 'cue_cnombre',
            flex: 1,
            renderer: function(value, obj, record){
                //return value=="" ? record.get('caa_comentarios') : value;
                return record.get('cue_clinea')+'-'+ record.get('cue_cnombre');
            }
        },
        /*{
                    xtype : 'gridcolumn',            
                    header : 'Autorizado',
                    dataIndex : 'caa_idautorizado',           
                    flex: 1
                },*/
        /*{
                    xtype : 'gridcolumn',            
                    header : 'Tipo',
                	dataIndex : 'caa_tipo',
                    flex: 1
        		},*/
        {
            xtype: 'datecolumn',
            header: 'Fecha desde',
            format:'d/m/Y',
            dataIndex: 'caa_fechadesde',
            flex: 1,
            renderer: function (value, obj, record) {
                return value ? Ext.Date.format(new Date(value), 'd/m/Y') : ''
            }
        }, {
            xtype: 'datecolumn',
            header: 'Fecha hasta',
            format:'d/m/Y',
            dataIndex: 'caa_fechahasta',
            flex: 1,
            renderer: function (value, obj, record) {
                return value ? Ext.Date.format(new Date(value), 'd/m/Y') : ''
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Dia',
            dataIndex: 'caa_diasemana',
            flex: 1,
            renderer: function (value, obj, record) {
                if (value == 1) {
                    return getLocale('Lunes')
                } else if (value == 2) {
                    return getLocale('Martes')
                } else if (value == 3) {
                    return getLocale('Miercoles')
                } else if (value == 4) {
                    return getLocale('Jueves')
                } else if (value == 5) {
                    return getLocale('Viernes')
                } else if (value == 6) {
                    return getLocale('Sabado')
                } else if (value == 7) {
                    return getLocale('Domingo')
                }
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Hora desde',
            dataIndex: 'caa_horadesde',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Hora hasta',
            dataIndex: 'caa_horahasta',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Estado',
            dataIndex: 'estadoStyle',
            flex: 1,
            renderer: function(value,obj,record){
                if(value=='estado0')
                    return getLocale('Vencida');
                else{
                    if(record.get('caa_estado')==1)
                        return getLocale('Activa');    
                    else
                        return getLocale('Inactiva');    
                }
            } 


        }
        /*,{
                    xtype : 'gridcolumn',            
                    header : 'Codigo',
                    dataIndex : 'caa_codigo',
                    flex: 1
        		}*/

    ],

    initComponent: function () {
        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        var filterPersona=[];
        if(this.record){
            filterPersona=[{
                property: 'usu_iidcuenta',
                value: this.record.get('cue_iid')//encontrar el valor de la cuenta
            }]
        }
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                    text: 'Filtros',
                    itemId: 'filterInvitesButton',
                    menu: {
                        xtype: 'menu',
                        width: 320,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [/*{

                                xtype: 'selecterfield',
                                itemId: 'persona',
                                simpleSelect: true,
                                hidden: false,
                                config: {
                                    disponible: {
                                        title: 'Persona',
                                        field: 'usu_cnombre',
                                        searchField: 'usu_cnombre',  

                                        //deleteLike: true 

                                
                                    },
                                    selecionado: {
                                        title: 'Persona',
                                        field: 'usu_cnombre'
                                    },
                                    valueField: 'usu_idKey',
                                    modelItems: 'SgAppAccessControl.model.AC_UsuarioSearchModel'
                                },
                                filter: filterPersona,
                                title: 'Persona'


                            }, */{

                                xtype: 'datefield',
                                fieldLabel: 'Fecha desde',
                                itemId: 'caa_fechadesde',
                                format: 'd-m-Y'
                            }, {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha hasta',
                                itemId: 'caa_fechahasta',
                                format: 'd-m-Y'
                            }]
                        }]
                    }

                }, {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search',
                    itemId: 'searchInvitesButton',
                }, '-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall',
                    itemId: 'getallInvitesButton',
                },'-',
                {
                    iconCls: 'icon-cuenta_filter_nohabilitadas ',
                    text: 'Vencidas',
                    action: 'filterVencidas',
                    itemId: 'filterVencidas',
                    toggleGroup: 'filter',
                    enableToggle: true
                }, 
                {
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Activas',
                    action: 'filterActivas',
                    itemId: 'filterActivas',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                    text: 'Nueva',
                    iconCls :'icon-note-add',
                    action: 'nuevaAutorizacion',
                    itemId: 'nuevaAutorizacion',
                    xtype: 'button'
                },{
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