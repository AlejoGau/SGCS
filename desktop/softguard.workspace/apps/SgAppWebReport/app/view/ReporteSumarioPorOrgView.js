Ext.define( 'SgAppWebReport.view.ReporteSumarioPorOrgView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportesumariodealerpororgview',
 
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
        }
    ],
    activeHelp: true,
    initComponent: function() {
        this.callParent();
        //( 'cuentachanged' );
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function( button ) {
                        var iframe = button.up( 'reportesumariodealerpororgview' ).down( '#Iframe' );
                        var ele = iframe.getEl();
                        document.getElementById( 'iframe-' + ele.id ).contentWindow.printMe();
                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        itemId:'organizacioncontainer',
                                        items:[
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-find',
                                                action: 'organizationChange',
                                                text: 'Seleccionar organización',
                                                margin: '0 10 0 0',
                                                //width: 80
                                            },                                             

                                            {
                                                xtype:'button',
                                                text     : '',
                                                iconCls: 'icon-cancel',
                                                itemId: 'sacarorg',
                                                hidden:true,
                                                margin:'0 5 0 0',
                                                //width: 23,
                                                listeners: {
                                                    click: function(button) {
                                                        var view = button.up('reportesumariodealerpororgview');
                                                 		view.down('#organizacion').setValue('')
                                                        view.orgId = 0;
                                                        button.hide()
                                    				}
                                    			}
                                            }, 
                                            {
                                                xtype : 'displayfield',    
                                                //fieldLabel : 'Entidad',
                                                name : '_organization',
                                                itemId:'organizacion',
                                                flex: 1
                                            } 
                                                                                   
                                            /*,{
                                                xtype: 'button',
                                                margin: '0 0 0 5',
                                                text: 'Nueva Organización',
                                                tooltip: 'Nueva Organización',
                                                iconCls : 'icon-add',
                                                action : 'createorganization'
                                            }*/
                                        ]
                                    },
                                    {
                                        xtype: 'combo',
                                        itemId: 'pais',
                                        fieldLabel: 'Pais',
                                        displayField: 'Name',
                                        valueField: 'Id',
                                        queryMode: 'local',
                                        labelWidth: 200,
                                        //plugins: ['clearbutton']
                                        //width: 200
                                    } ,
                                    {
                                    xtype: 'combo',
                                    itemId: 'reportType',
                                    fieldLabel: 'Tipo de reporte',
                                    displayField: 'text',
                                    valueField: 'value',
                                    queryMode: 'local',
                                    editable: false,
                                    forceSelection: true,
                                    labelWidth: 200,
                                    value: 'GENERAL', // default
                                    store: {
                                        fields: ['text', 'value'],
                                        data: [
                                            { text: 'General',   value: 'GENERAL' },
                                            { text: 'Detallado', value: 'DETALLADO' }
                                        ]
                                    }
                                },
                                        /*,
                                    
                                    {
                                        xtype: 'combo',
                                        itemId: 'sorter',
                                        fieldLabel: 'Orden',
                                        queryMode: 'local',
                                        labelWidth: 50,
                                        store:[['lin_crazonsocial','Nombre'],['','Código'],['lin_idkey','Creación']],
                                        plugins: ['clearbutton']
                                        //width: 200
                                    }*/
                                ]
                            }
                        ]
                    }
                }
                , {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }/*,"-",{
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'todos'
                }*/
                ,{
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }
            ]// cierro items
        });

        this.addDocked( toolbar );
    }
});