Ext.define( "Administrator.view.PreferenciasVisualesMWRView", {
    extend: "Ext.form.Panel",
    title: "Preferencias visuales",
    alias: "widget.PreferenciasVisualesMWRView",
    autoScroll: !0,
    items: [
        {
            xtype: "container",

            itemId: "visualizacion",
            items: [ {
                xtype: "checkbox",
                fieldLabel: "Ordenar por prioridad",
                itemId: "oredenprioridad",
                width: 300,
                labelWidth: 250,
                checked: !0
            }, {
                    xtype: "combobox",
                    fieldLabel: "Fecha",
                    itemId: "oredeneventos",
                    //multiselect: false,
                    editable: false,
                    queryMode: "local",
                    forceSelection: true,
                    value: "ASC",
                    typeAhead: false,
                    store: [
                        [ "ASC", getLocale( "Antiguos primero" ) ],
                        [ "DESC", getLocale( "Nuevos primero" ) ]
                    ]
                }]
        }, {
            xtype: "checkbox",
            fieldLabel: "Otras organizaciones",
            itemId: "otrasorganizaciones",
            width: 300,
            labelWidth: 250
        }, {
            xtype: "checkbox",
            fieldLabel: "Grilla asignaciones",
            itemId: "asignaciones",
            width: 300,
            labelWidth: 250
        }/**
        * BC 390361159 : Se agrega permiso de ver o no bitacora al atender evento
        */, {
            xtype: "checkbox",
            fieldLabel: "Mostrar bitácora",
            itemId: "bitacora",
            width: 300,
            labelWidth: 250,
            checked: true
        }, {
            xtype: "checkbox",
            fieldLabel: "Mostrar timeline",
            itemId: "timeline",
            width: 300,
            labelWidth: 250,
            checked: true
        },/* {
            xtype: "checkbox",
            fieldLabel: "Mostrar notas",
            itemId: "notas",
            width: 300,
            labelWidth: 250,
            checked: true
        },*/ {
            xtype: 'combobox',
            forceSelection: true,
            multiSelect: false,
            editable: false,
            itemId: 'notas',
            fieldLabel: 'Mostrar notas',
            width: 300,
            labelWidth: 250,
            store: [
                [ '0', getLocale( 'Denegado' ) ],
                [ '1', getLocale( 'Lectura' ) ],
                [ '2', getLocale( 'Lectura y Escritura' ) ]
            ],
            listeners: {
                afterrender: function( combo ) {
                    combo.setValue( combo.notas);
                }
            }
        }, {
            xtype: "checkbox",
            fieldLabel: "Mostrar tareas VigiControl",
            itemId: "tareasVC",
            width: 300,
            labelWidth: 250
        }, {
            xtype: "checkbox",
            fieldLabel: "Mostrar comandos",
            itemId: "comandos",
            width: 300,
            labelWidth: 250
        },
        {
            xtype: "checkbox",
            fieldLabel: "Ocultar Fecha-Hora Ingreso",
            itemId: "horaIngreso",
            width: 300,
            labelWidth: 250
        }, {
            xtype: 'fieldset',
            title: 'Mostrar Informes',
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 250
            },
            items: [
                {
                    xtype: "checkbox",
                    fieldLabel: "Gestión -> Llamadas",
                    itemId: "informeLlamada"
                }, {
                    xtype: "checkbox",
                    fieldLabel: "Sms transmitidos",
                    itemId: "informeNotificaciones"
                }, {
                    xtype: "checkbox",
                    fieldLabel: "informe -> Multimedia",
                    itemId: "informeMultimedia"
                }, {
                    xtype: "checkbox",
                    fieldLabel: "Reporte Histórico",
                    itemId: "informeHistorico"
                }, {
                    xtype: "checkbox",
                    fieldLabel: "Servicio Tecnico",
                    itemId: "informeSertec"
                }
            ]
        }

    ],
    initComponent: function() {
        var n = Ext.create( "Ext.toolbar.Toolbar", {
            items: [ {
                iconCls: "save",
                text: "Guardar",
                scope: this,
                action: "saveSecurity"
            }]
        });
        this.callParent( arguments );
        this.addDocked( n )
    }
})