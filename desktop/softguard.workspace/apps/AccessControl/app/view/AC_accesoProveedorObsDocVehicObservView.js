Ext.define('AccessControl.view.AC_accesoProveedorObsDocVehicObservView', {
    extend: 'Ext.grid.GridPanel',
    alias: ['widget.ac_accesoproveedorobsdocvehicobservview'],
    title: '',
    autoHeight: true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
        
        
    },
    activeHelp: true,
    columns: [
         /*{
              xtype:'actioncolumn',
              width:30,
              items: [{
                  iconCls: 'icon-table-edit',
                  tooltip: 'Editar',
                  handler: function(grid, rowIndex, colIndex,item, event) {
                      var view = grid.up('p_controlacceso_ioview');
                      var rec = grid.getStore().getAt(rowIndex);
                      view.fireEvent('objectedit',rec,grid);
                  }
              }]
         },*/
         
        {
            xtype: 'gridcolumn',
            header: 'Tipo acceso',
            dataIndex: 'cac_tipoacceso',
            width: 60,
            renderer: function (value) {
                if (value == 1) {
                    return '<img src="/resources/global/images/icons/door_in.png" height="16" widht="16" title="' + getLocale('Ingreso') + '" />'
                } else {
                    return '<img src="/resources/global/images/icons/lock.png" height="16" widht="16" title="' + getLocale('Egreso') + '" />'
                }
            }

        },{
                xtype:'actioncolumn',
                hidden: true,
                width:30,
                items: [{
                      iconCls: 'icon-door-out',
                      tooltip: 'Egreso',
                      getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                          if(r.get('cac_tipoacceso') == 0 || r.get('estadoStyle')=='estado0') {
                              return "x-hide-display";
                          } else {
                            //var filtroIO;//=Ext.getCmp('getAllId').pressed;
                            if(store.getProxy().getExtraParams().IngSinEg=='S'){
                                //console.log(store.getProxy().getExtraParams());
                                
                                return 'icon-lock';
                            }                              
                            else  
                                return "x-hide-display";
                          }
                      },
                      handler: function (grid, rowIndex, colIndex, item, event) {
                          var view = grid.up('p_controlacceso_ioview');
                          var rec = grid.getStore().getAt(rowIndex);
                          view.fireEvent('egresoClick', rec, grid);
                      },
                      isDisabled: function(view, rowIndex, colIndex, item, r) {
                          
                          if(r.get('cac_tipoacceso') == 0 || r.get('estadoStyle')=='estado0') {
                              return  true;
                          } else {
                            if(view.store.getProxy().getExtraParams().IngSinEg=='S'){
                                return false;
                            }
                            else  
                              return true;                              
                          }
                      }
              }]
           



        }, {
            xtype: 'gridcolumn',
            header: 'Fecha',
            dataIndex: 'cac_fecha',
            width: 110,
            //flex: 1,
            renderer: function (value) {
                return Ext.Date.format(new Date(value), 'd-m-Y G:i:s')
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Puerta',
            dataIndex: 'cap_nombre',
            hidden: true,
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Tipo Autorización',
            dataIndex: 'cac_autorizatipo',
            hidden: true,
            flex: 1,
            renderer: function (value, obj, record) {
                return record.get('_cac_autorizatipo')
                }
        }, {
            xtype: 'gridcolumn',
            header: 'Autorizado Por',
            dataIndex: 'udw_usuario',
            hidden:true,
            flex: 1

        },{
            xtype: 'gridcolumn',
            header: 'Unidad Funcional',
            dataIndex: 'cue_cnombre',
            hidden: true
        }
        ,{
                    xtype : 'gridcolumn',            
                    header : 'Observación',
                	dataIndex : 'cac_cobservacion',
                    flex: 1
        }
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
                                    xtype: 'displayfield',
                                    itemId: 'personaReadOnly',
                                    fieldLabel: 'Persona',
                                    
                                    hidden: true,
                                                              
                            }, {
                                /*xtype: 'combo',
                                fieldLabel: 'Persona',
                                queryMode: 'local',
                                itemId: 'combopersona',
                                queryParam:'',
                                name: 'xxxusu_iid',
                                displayField: 'usu_cnombre',
                                valueField: 'usu_iid',
                                triggerAction: 'all' */           
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
                                    modelItems: 'AccessControl.model.AC_UsuarioSearchModel'
                                },
                                filter: [/*{
                                    property: 'tip_ntipo',
                                    value: 7
                                }*/],
                                title: 'Persona'
                                               
                              
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
                    itemId:'getAllId'
                },
                {
                    iconCls: 'icon-filter',
                    text: 'Ingreso sin Egreso',
                    action: 'filterIngSinEg',
                    itemId: 'filterIngSinEg',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
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

        //this.addDocked(toolbar);
    }
});