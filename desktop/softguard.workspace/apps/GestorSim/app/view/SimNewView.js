Ext.define('GestorSim.view.SimNewView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.simnewview'],
    title: 'SIM',
    preventHeader: true,
    frame: true,
    layout: 'vbox',
    autoScroll: true,
    width: 698,
    height: 546,
    padding: '10',
    items: [

        {
            xtype: 'container',
            achor:'100%',
            //width: '100%',
            //height: '100%',
            layout: 'vbox',
            //autoHeight: true,
            layoutConfig: {
                defaultMargins: {
                    top: 0,
                    right: 10,
                    bottom: 0,
                    left: 0
                }
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Datos de la SIM',
                    width: 600,
                    //flex: 1,
                    //autoHeight: true,
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'hbox',
                            title: 'Cuenta',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'cuenta',
                                    text: getLocale('Seleccione una cuenta'),
                                    margin: '0 10 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    itemId: 'nombrecuenta'
                                }, {
                                    xtype: 'displayfield',
                                    itemId: 'sim_cuenta',
                                    hidden: true
                                }
                            ]
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: getLocale('Agente'),
                            name: "sim_agente",
                            itemId: 'sim_agente',
                            anchor: '100%'                            
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: getLocale('Número de linea'),
                            name: "sim_codigo",
                            maxLength : "100",
                            maskRe: /[\+0-9]/,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: getLocale('APN'),
                            displayField: 'tsa_cDescripcion',
                            emptyText: getLocale('Seleccione'),
                            valueField: 'Id',
                            name: 'sim_apn',
                            queryMode: 'local',
                            itemId: 'sim_apn',
                            allowBlank: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: getLocale('CSID'),
                            name: "sim_csid",
                            anchor: '100%',
                            hidden: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: getLocale('Fecha activación'),
                            format: 'd/m/Y H:m:s',
                            submitFormat: 'd/m/Y',
                            name: "sim_fecha_activacion",
                            itemId: 'sim_fecha_activacion',
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: getLocale('ICCID'),
                            name: "sim_iccid",
                            anchor: '100%'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: getLocale('Marca'),
                            displayField: 'tsm_cDescripcion',
                            emptyText: getLocale('Seleccione'),
                            valueField: 'Id',
                            name: 'sim_marca',
                            queryMode: 'local',
                            itemId: 'sim_marca',
                            allowBlank: false
                        },

                        {
                            xtype: 'combobox',
                            fieldLabel: getLocale('Estado'),
                            displayField: 'tse_cDescripcion',
                            emptyText: getLocale('Seleccione'),
                            valueField: 'Id',
                            name: 'sim_estado',
                            queryMode: 'local',
                            itemId: 'sim_estado',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: getLocale('Observaciones'),
                            name: "sim_observaciones",
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: getLocale('Clave Master'),
                            name: "sim_ClaveMaster",
                            itemId: "sim_ClaveMaster",
                            maxLength: 6,
                            
                            enableKeyEvents: true,
                            emptyText: '000000',
                            inputType: 'password',
                            enforceMaxLength : true,
                            allowBlank: false,
                            //inputMask: '999999',
                            anchor: '100%'

                        },                        
                    ],

                }
            ]
        },{
            xtype:'fieldset',
            title: 'Registros de cambios',
            autoScroll: true,
            height: 500,
            width: 1200,
            //layout: 'hbox',
            //anchor: '100%',
            items:[
                ,{


                    xtype:'grid',
                    itemId: 'timelineGrid',
                    
                    height: 600,
                    width: 1100,
                    columns:[
                        {
                            xtype: 'gridcolumn',
                            header: 'Acciòn',
                            width: 150,
                            dataIndex: 'Stl_cAccion',
                            renderer: function(value,metadata,record){
                                return (value == 1 ? getLocale('Modificación de Cuenta') : getLocale('Modificación de Estado')); // si el valor es 1: se modificó la cuenta
                                                            // si el valor es 2: se modificó el estado
                            }

                        },{
                            xtype: 'gridcolumn',
                            width: 270,
                            header: 'Usuario',
                            dataIndex: 'Stl_cUserDss',         
                        },{
                            xtype: 'datecolumn',
                            format:'d/m/Y H:i:s',
                            width: 120,
                            header: 'Fecha',
                            dataIndex: 'Stl_tFechaHora',  
      
                        },{
                            xtype: 'gridcolumn',
                            header: 'Valor Original',
                            width: 260,
                            dataIndex: 'Stl_cOriginal',    
                            renderer: function(value, metadata,record){
                                return (record.get('Stl_cAccion') == 1 ? record.get('CuentaOrigen') : record.get('SimEstadoOriginal'))
                            },
                        },{
                            xtype: 'gridcolumn',
                            width: 260,
                            header: 'Valor Modificado',
                            dataIndex: 'Stl_cActualizado',     
                            renderer: function(value, metadata, record){
                                return (record.get('Stl_cAccion') == 1 ? record.get('CuentaActualizada') : record.get('SimEstadoActualizado'))
                            }                                                                                                                      
                        }
                    ]
                    

                }            ]
        }






    ],// cierro items
    // buttons: [{
    //     text: 'Crear',
    //     action: 'create',
    //     //  formBind: true
    // }, {
    //     text: 'Cancelar',
    //     action: 'cancel'
    // }],
    initComponent: function () {
        this.callParent(arguments);
        var toolbarTimeLine = Ext.create('Ext.toolbar.Toolbar',{
            items: [
                {
                    text: 'Filtros de busqueda',
                    itemId: 'filtro',
                    menu: {
                        xtype: 'menu',
                        width: 400,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                //defaultButton: 'cuentagridview #search',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'Filtros',
                                        flex: 1,
                                        autoHeight: true,
                                        items: [
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: getLocale('Desde'),
                                                format: 'd/m/Y H:i:s',
                                                itemId: "fechaDesde",
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'datefield',
                                                itemId: 'fechaHasta',
                                                format: 'd/m/Y H:i:s',
                                                fieldLabel: getLocale('Hasta'),
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: getLocale('Acciòn'),
                                                queryLocal: 'local',
                                                displayField: 'descripcion',
                                                valueField: 'Id',
                                                store: [
                                                    {Id: 1, descripcion: getLocale('Modificación de Cuenta')},
                                                    {Id: 2, descripcion: getLocale('Modificación de Estado')}
                                                    
                                                ],
                                                itemId: "accion",
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: getLocale('Usuario'),
                                                itemId: "usuario",
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: '',
                                                text: 'Buscar',
                                                action: 'filterText',
                                                itemId: 'search'
                                            }
                                        ]
                                    }

                                ]

                            }
                        ]
                    }
                }

            ]
        });

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'create'
                }
            ]// cierro items
        });
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            itemId: 'pagingtoolbar',
            name:'pagingtoolbar',
            dock: 'bottom',
            pageSize: 25,
            displayMsg: 'Mostrando {0} - {1} de {2}',
            displayInfo: true
        });
        var timelineGrid = this.down('#timelineGrid');
        timelineGrid.addDocked(toolbarTimeLine);
        timelineGrid.addDocked( pagingtoolbar );
        this.addDocked( toolbar );
        
    } // cierro init


});


