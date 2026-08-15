Ext.define('SgAppWebReport.view.ReporteMarcacionesPorDiaSemanaHoraView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportemarcasemanahoraview',

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
                    action: 'btnprint'
                    /*handler: function (button) {
                        var iframe = button.up('reportemarcasemanahoraview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [{
                                    xtype: 'fieldset',
                                    itemId: 'fechas',
                                    title: 'Fechas',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Tabla Histórico',
                                            displayField: '_periodo',
                                            queryMode: 'local',
                                            valueField: 'c_periodo',
                                            width: 400,
                                            itemId: 'combohistorico',
                                            //multiSelect: true,
                                            name: 'tablahistorico',
                                            //plugins: ['clearbutton']
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'fechaDesde',
                                            itemId: 'fechaDesde',
                                            value: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                                            fieldLabel: 'Fecha Desde',
                                            bindToModel: false,
                                            width: 230,
                                            //plugins: ['clearbutton'],
                                            validator: function (value) {
                                                if (value != '') {
                                                    return true
                                                }

                                                return 'Este campo es obligatorio'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'fechaHasta',
                                            itemId: 'fechaHasta',
                                            value: new Date(),
                                            fieldLabel: 'Fecha Hasta',
                                            bindToModel: false,
                                            width: 230,
                                            //plugins: ['clearbutton'],
                                            validator: function (value) {
                                                if (value != '') {
                                                    return true
                                                }

                                                return 'Este campo es obligatorio'
                                            }
                                        }
                                    ]
                                }, {
                                    xtype: 'fieldset',
                                    itemId: 'Cuentas',
                                    title: 'Cuentas',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            padding: '0 0 0 0',
                                            border: 0,
                                            layout: 'hbox',
                                            margin: '0 0 10 0',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    text: 'Seleccione una cuenta',
                                                    iconCls: 'icon-find',
                                                    itemId: 'seleccionarcuenta',
                                                    margin: '0 10 0 0',
                                                    action: 'seleccionarCuenta'
                                                }, {
                                                    xtype: 'button',
                                                    text: '',
                                                    iconCls: 'icon-cancel',
                                                    itemId: 'sacarcuenta',
                                                    hidden: true,
                                                    margin: '0 5 0 0',
                                                    listeners: {
                                                        click: function (button) {
                                                            button.up('marcacionesdiaview').down('#idcuenta').setValue('')
                                                            button.up('marcacionesdiaview').down('#nombrecuenta').setValue('')
                                                            button.hide()
                                                        }
                                                    }
                                                }, {
                                                    xtype: 'displayfield',
                                                    itemId: 'nombrecuenta',
                                                    name: 'nombrecuenta'
                                                }, {
                                                    xtype: 'displayfield',
                                                    hidden: true,
                                                    itemId: 'idcuenta',
                                                    name: 'idcuenta'
                                                }
                                            ]
                                        }]
                                },
                                    /** {
                                    xtype: 'fieldset',
                                    itemId: 'informacio',
                                    title: 'Informacion',
                                    layout: 'vbox',
                                    items: [
                                        {
                                                xtype: 'checkboxgroup',
                                                name: 'chk_group',
                                                itemId:'incluirchecks',
                                                columns: 2,
                                                vertical: true,
                                                hideLabel : true,
                                                fieldLabel:'Incluir',
                                                width:400,
                                                defaults: {
                                                    name: 'chk_group'
                                                            },                   
                                                items: [
                                                        {
                                                            boxLabel: 'Lunes',
                                                            itemId: 'lunes',
                                                            inputValue: 'lunes',
                                                            checked:true
                                                        },{
                                                            boxLabel: 'Miercoles',
                                                            itemId: 'miercoles',
                                                            inputValue: 'miercoles',
                                                            checked:true
                                                        },{
                                                            boxLabel: 'Viernes',
                                                            itemId: 'viernes',
                                                            inputValue: 'viernes',
                                                            checked:true
                                                        },{
                                                            boxLabel: 'Domingo',
                                                            itemId: 'domingo',
                                                            inputValue: 'domingo',
                                                            checked:true 
                                                        },{
                                                            boxLabel: 'Martes',
                                                            itemId: 'martes',
                                                            inputValue: 'martes',
                                                            checked:true
                                                        },{
                                                            boxLabel: 'Jueves',
                                                            itemId: 'jueves',
                                                            inputValue: 'jueves',
                                                            checked:true 
                                                        },{
                                                            boxLabel: 'Sabado',
                                                            itemId: 'sabado',
                                                            inputValue: 'sabado',
                                                            checked:true 
                                                        }]
                                                    }
                                    ]
                                    }*/
                                ]
                            }

                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    itemId: 'buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, '->'

            ]// cierro items
        });

        this.addDocked(toolbar);
    }
});