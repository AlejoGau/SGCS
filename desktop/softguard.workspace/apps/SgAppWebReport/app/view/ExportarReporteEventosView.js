Ext.define('SgAppWebReport.view.ExportarReporteEventosView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.exportarreporteeventosview',
    preventHeader: true,
    frame: true,
    autoScroll: true,
    items: [{
        xtype: 'combo',
        fieldLabel: 'Tabla Historica',
        displayField: '_periodo',
        queryMode: 'local',
        valueField: 'c_periodo',
        anchor: '100%',
        itemId: 'combohistorico',
        name: 'tablahistorico',
        //plugins: ['clearbutton'],
        listeners: {
            select: function (combo, records, eOpts) {
                var view = combo.up('exportarreporteeventosview');
                view.fireEvent('onComboHistoricoSelect', combo, records, eOpts);
            },
            change: function (combo, records, eOpts) {
                var view = combo.up('exportarreporteeventosview');
                view.fireEvent('onCleanDates', combo, records, eOpts);
            }
        }
    }, {
        xtype: 'fieldset',
        title: 'Seleccione fechas',
        layout: 'vbox',
        items: [{
            xtype: 'fieldset',
            padding: '0 0 0 0',
            border: 0,
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Desde',
                    name: "fechadesde",
                    bindToModel: false,
                    itemId: 'fechadesde',
                    labelWidth: 50,
                    width: 230,
                    name: 'fechadesde'
                }, {
                    fieldLabel: 'Hora',
                    xtype: 'timefield',
                    itemId: 'horadesde',
                    format: 'H:i',
                    altFormats: 'H:i',
                    value: '00:00',
                    increment: 10,
                    labelWidth: 40,
                    width: 123,
                    margin: '0 0 0 7',
                    name: 'horadesde'
                }
            ]
        }, {
            xtype: 'fieldset',
            padding: '0 0 0 0',
            border: 0,
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Hasta',
                    itemId: 'fechahasta',
                    bindToModel: false,
                    name: "fhasta",
                    labelWidth: 50,
                    width: 230,
                    name: 'fechahasta'
                }, {
                    fieldLabel: 'Hora',
                    xtype: 'timefield',
                    itemId: 'horahasta',
                    format: 'H:i',
                    altFormats: 'H:i',
                    value: '23:50',
                    increment: 10,
                    labelWidth: 40,
                    width: 123,
                    margin: '0 0 0 7',
                    name: 'horahasta'
                }
            ]
        }]
    }, 
    //Se oculto a pedido de esta tareaa https://softguard.atlassian.net/browse/DSS-1239
    // {
    //     xtype: 'fieldset',
    //     layout: 'hbox',
    //     margin: '0 0 5 0',
    //     padding: '10px',
    //     items: [
    //         {
    //             xtype: 'checkboxfield', // Utiliza 'checkbox' o 'checkboxfield'
    //             boxLabel: 'Reporte Completo',
    //             name: 'opcion1',
    //             inputValue: '1',
    //             boxLabelAlign: 'after',
    //             margin: '2px 5px',
    //             itemId: 'reporteCompleto',
    //             listeners: {
    //                 change: (checkbox, newValue, oldValue) => checkbox.up().down('#reporteBasico').setValue(oldValue)
    //             }
    //         },
    //         {
    //             xtype: 'checkboxfield',
    //             boxLabel: 'Reporte Básico',
    //             name: 'opcion2',
    //             inputValue: '2',
    //             boxLabelAlign: 'after',
    //             margin: '2px 5px',
    //             itemId: 'reporteBasico',
    //             listeners: {
    //                 change: (checkbox, newValue, oldValue) => checkbox.up().down('#reporteCompleto').setValue(oldValue)
    //             }
    //         }
    //     ]
    // },
    {
        xtype: 'combo',
        itemId: 'comboregistros',
        fieldLabel: ' Cantidad de registros',
        width: '100%',
        store: [
            [500, 500],
            [1000, 1000],
            [1500, 1500],
            [2000, 2000],
            [2500, 2500],
            [5000, 5000],
            [10000, 10000],
            [20000, 20000],
            [30000, 30000],
            [40000, 40000],
            [50000, 50000],
            [75000, 75000],
            [100000, 100000]
        ]
    }, {
        xtype: 'combo',
        itemId: 'combooperador',
        fieldLabel: 'Operador',
        displayField: 'ope_cnombre',
        valueField: 'ope_clogin',
        queryMode: 'local',
        width: '100%',
        name: 'operador',
        //plugins: ['clearbutton'],
    }, {
        xtype: 'fieldset',
        title: 'Códigos de alarma',
        itemId: 'filtroAlarmas',
        items: [
            {
                xtype: 'textarea',
                fieldLabel: 'Seleccionados',
                height: 120,
                name: '_eventos',
                readOnly: true,
                itemId: 'eventos'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Seleccionados',
                name: 'filtroAlarmas',
                itemId: 'eventoshide',
                hidden: true
            },
            {
                xtype: 'button',
                text: 'Modificar',
                margin: '5 0 5 0',
                itemId: 'agregarevento'
            }
        ]
    }, {
        xtype: 'combobox',
        fieldLabel: 'Categorización',
        itemId: 'combocategorizacion',
        store: "TablasResolucionesStore",
        triggerAction: 'all',
        enableKeyEvents: true,
        forceSelection: true,
        editable: true,
        queryMode: 'local',
        width: '100%',
        displayField: 'res_cdescripcion',
        valueField: 'res_ccodigo',
        name: 'categorizacion',
        listeners: {
            focus: function (combo) {

            },
            expand: function (combo) {
                if (combo.getValue() != '') {
                    this.clearValue();
                }

            }
        },
        //plugins: ['clearbutton'],

    }, {
        xtype: 'combobox',
        fieldLabel: 'Resolución',
        itemId: 'comboresolucion',
        store: "TablasCategorizacionStore",
        forceSelection: true,
        editable: false,
        width: '100%',
        queryMode: 'local',
        displayField: 'cat_cDescripcion',
        valueField: 'cat_cCodigo',
        name: 'resolucion',
        listeners: {
            focus: function (combo) {

            },
            expand: function (combo) {
                if (combo.getValue() != '') {
                    this.clearValue();
                }

            }
        },
        //plugins: ['clearbutton'],
    },
    {
        xtype: 'checkbox',
        itemId: 'eventosOperadorCheck',
        fieldLabel: 'Eventos procesados por el operador'
    },
    {
        xtype: 'fieldset',
        itemId: 'rango',
        title: 'Cuentas',
        layout: 'vbox',
        flex: 1,
        items: [{
            xtype: 'fieldset',
            padding: '0 0 0 0',
            border: 0,
            layout: 'hbox',
            margin: '0 0 10 0',
            items: [{
                xtype: 'button',
                text: 'Seleccione una cuenta',
                iconCls: 'icon-find',
                itemId: 'seleccionarcuenta',
                margin: '0 10 0 0',
                listeners: {
                    click: function (button) {
                        var view = button.up('exportarreporteeventosview');
                        view.fireEvent('onSeleccionarCuenta', view);
                    }
                }
            }, {
                xtype: 'button',
                text: '',
                iconCls: 'icon-cancel',
                itemId: 'sacarcuenta',
                hidden: true,
                margin: '0 5 0 0',
                listeners: {
                    click: function (button) {
                        button.up('exportarreporteeventosview').down('#idcuenta').setValue('')
                        button.up('exportarreporteeventosview').down('#nombrecuenta').setValue('')
                        button.up('exportarreporteeventosview').down('#zona').setDisabled(true);
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
            }]
        }, {
            xtype: 'textfield',
            fieldLabel: 'Id Extendido desde',
            itemId: 'idExtendidoDesde',
            width: '100%',
            name: 'idExtendidoDesde'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Id Extendido hasta',
            itemId: 'idExtendidoHasta',
            width: '100%',
            name: 'idExtendidoHasta'
        }, {
            xtype: 'container',
            padding: '0 0 0 0',
            border: 0,
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Dealer desde',
                itemId: 'dealer',
                enforceMaxLength: true,
                maxLength: 3,
                //labelWidth: 110,
                width: 400,
                name: 'dealer'
            }, {
                xtype: 'textfield',
                itemId: 'cuentadesde',
                fieldLabel: 'Cuenta desde',
                enforceMaxLength: true,
                maxLength: 4,
                //labelWidth: 110,
                width: 400,
                margin: '0 0 0 9',
                name: 'cuentadesde'
            }]
        }, {
            xtype: 'container',
            padding: '0 0 0 0',
            border: 0,
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Dealer hasta',
                itemId: 'dealerhasta',
                enforceMaxLength: true,
                maxLength: 3,
                //labelWidth: 110,
                width: 400,
                name: 'dealerhasta'
            }, {
                xtype: 'textfield',
                itemId: 'cuentahasta',
                fieldLabel: 'Cuenta hasta',
                enforceMaxLength: true,
                maxLength: 4,
                margin: '0 0 0 9',
                //labelWidth: 110,
                width: 400,
                name: 'cuentahasta'
            }]
        },
        {
            xtype: 'combo',
            fieldLabel: 'Zona',
            displayField: 'zon_cdescripcion',
            queryMode: 'local',
            valueField: 'zon_ccodigo',
            name: "zona",
            //hidden: true,
            itemId: 'zona',
            width: '100%',
            disabled: true,
            //plugins: ['clearbutton'],
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            itemId: 'nombre',
            width: '100%',
            name: 'nombre',
            //plugins: ['clearbutton'],
        }, {
            xtype: 'combo',
            fieldLabel: 'Provincia / Estado',
            store: 'ProvinciasStore',
            name: "cue_cprovincia",
            displayField: 'pro_cdescripcion',
            itemId: 'comboProvincia',
            valueField: 'pro_ccodigo',
            editable: false,
            width: '100%',
            //plugins: ['clearbutton'],        
        }, {
            xtype: 'combo',
            fieldLabel: 'Tipo de cuenta',
            displayField: 'tip_cdescripcion',
            queryMode: 'local',
            valueField: 'tip_idKey',
            name: "cue_ctipo",
            itemId: 'tipocuenta',
            width: '100%',
            name: 'tipocuenta',
            //plugins: ['clearbutton'],
        }, {
            xtype: 'combo',
            itemId: 'grupos',
            fieldLabel: 'Grupo',
            displayField: 'gru_cdescripcion',
            valueField: 'gru_ccodigo',
            queryMode: 'local',
            width: '100%',
            name: 'combogrupo',
            //plugins: ['clearbutton'],

        }]
    }, {
        /**
         * BC 407862025 : Habilito la posibilidad de agrupar, bloqueo el campo de Ordenar Por, dado que trae conflicto.`
         * */
        xtype: 'fieldset',
        title: 'Agrupar',
        layout: 'vbox',
        itemId: 'agrupar',
        items: [{
            xtype: 'checkbox',
            itemId: 'agruparcuentacheck',
            fieldLabel: 'por Cuenta'
        }]
    }
    ],
    activeHelp: true,
    initComponent: function () {
        this.callParent(arguments);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                xtype: 'button',
                text: 'Exportar',
                action: 'export',
                iconCls: 'icon-page-excel'
            }]
        })
        this.addDocked(toolbar);



    } // cierro init

});
