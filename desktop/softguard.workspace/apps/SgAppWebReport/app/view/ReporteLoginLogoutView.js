Ext.define('SgAppWebReport.view.ReporteLoginLogoutView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteloginlogoutview',

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
    initComponent: function () {
        this.callParent();
        //('cuentachanged');


        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint',
                    handler: function (button) {
                        var iframe = button.up('reporteloginlogoutview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }
                }, "-",
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 380,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [

                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha desde',
                                        name: "fechadesde",
                                        bindToModel: false,
                                        value: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
                                        itemId: 'fechadesde'
                                    }, {
                                        fieldLabel: 'Hora desde',
                                        xtype: 'timefield',
                                        id: 'horadesde',
                                        format: 'H:i',
                                        altFormats: 'H:i',

                                        increment: 10
                                    }, {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha hasta',
                                        itemId: 'fechahasta',
                                        value: new Date(),
                                        bindToModel: false,
                                        name: "fhasta"
                                    }, {
                                        fieldLabel: 'Hora hasta',
                                        xtype: 'timefield',
                                        id: 'horahasta',
                                        format: 'H:i',
                                        altFormats: 'H:i',
                                        increment: 10
                                        // },{
                                        // 	fieldLabel: 'Usuario',
                                        //     xtype: 'textfield',
                                        //     itemId:'usuario'
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        itemId: 'organizacioncontainer',
                                        items: [
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-find',
                                                action: 'organizationChange',
                                                text: 'Seleccionar Organización',
                                                margin: '0 10 0 0'

                                            }, {
                                                xtype: 'button',
                                                text: '',
                                                iconCls: 'icon-cancel',
                                                itemId: 'sacarorg',
                                                hidden: true,
                                                margin: '0 5 0 0',

                                                listeners: {
                                                    click: function (button) {
                                                        var view = button.up('reporteloginlogoutview');
                                                        view.down('#organizacion').setValue('')
                                                        view.orgId = 0;
                                                        button.hide()
                                                    }
                                                }
                                            },

                                            {
                                                xtype: 'displayfield',

                                                name: '_organization',
                                                itemId: 'organizacion',
                                                flex: 1
                                            },

                                        ]
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Usuario',
                                        itemId: 'usuario',
                                        displayField: 'udw_usuario_LIKE',
                                        valueField: 'udw_usuario',
                                        width: '100%',
                                        name: 'usuario',
                                        editable: true,
                                        queryMode: 'local',
                                        store: "usuariosStore",

                                    }, {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: 'Funciones',
                                        itemId: 'funciones',
                                        columns: 1,
                                        vertical: true,
                                        items: [
                                            { boxLabel: 'Login', name: 'funcion', inputValue: '7', checked: true },
                                            { boxLabel: 'Logout', name: 'funcion', inputValue: '8' },
                                            { boxLabel: 'Insertar', name: 'funcion', inputValue: '4', checked: true },
                                            { boxLabel: 'Modificar', name: 'funcion', inputValue: '6', checked: true },
                                            { boxLabel: 'Eliminar', name: 'funcion', inputValue: '3', checked: true }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, "-", {
                    xtype: 'button',
                    text: 'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'verTodos'
                }
            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});