//MIGRADO2024
Ext.define( 'Common.view.EstadoFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.estadoformview',
    title: 'Situacion',
    autoScroll: true,
    preventHeader: true,
    layout: 'anchor',
    fieldDefaults: { anchor: '100%' },
    dockedItems: [ {
        xtype: 'toolbar',
        items: [ {
            text: 'Guardar',
            iconCls: 'save',
            action: 'save',
            itemId: 'save',
            disabled: true
        }]
    }],
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [ {
                xtype: 'displayfield',
                fieldLabel: 'Situación',
                name: 'est_nestado',
                renderer: function( value, field ) {
                    var store = Ext.getStore( 'SoftguardEstadoEstadoStore' );
                    if( store )
                        var record = store.findRecord( 'Value', value );
                    if( record ) {
                        var estado = record.get( 'Name' );
                        var rclass = 'habilitado';
                        switch( parseInt( value ) ) {
                            case 2:
                                rclass = 'nohabilitado';
                                break;
                            case 1:
                                rclass = 'prueba';
                                break;
                            case 3:
                                rclass = 'pruebazonas';
                                break;
                            case 4:
                                rclass = 'eliminar';
                                break;
                            case 5:
                                rclass = 'prueba';
                                break;
                        }
                        field.bodyEl.removeCls( field.lastClass );
                        field.bodyEl.addCls( rclass );
                        field.lastClass = rclass;
                        return estado;
                    } else {
                        return value
                    }
                },
                width: 280
            },
                {
                    xtype: 'button',
                    text: 'Deshabilitar',
                    itemId: 'btndeshabilitar',
                    action: 'deshabilitar',
                    margin: '0 0 0 5',
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: 'Habilitar',
                    action: 'habilitar',
                    itemId: 'btnhabilitar',
                    margin: '0 0 0 5',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'En prueba',
                    action: 'prueba',
                    itemId: 'btnprueba',
                    margin: '0 0 0 5',
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: 'En prueba por zonas',
                    action: 'xzonas',
                    itemId: 'btnxzonas',
                    margin: '0 0 0 5',
                    flex: 1,
                    hidden: true
                },
                {
                    xtype: 'button',
                    text: 'Pedir eliminar',
                    itemId: 'btnEliminar',
                    action: 'delete',
                    margin: '0 0 0 5',
                    flex: 1
                }
            ]
        }, {
            xtype: 'displayfield',
            itemId: 'forceZona',
            fieldLabel: 'Zona',
            hidden: true
        }, {
            xtype: 'eventselecterfield',
            itemId: 'parcialevento',
            hidden: true
        },
        {
            xtype: 'container',
            itemId: 'nohabilitado',
            margin: '5 0 0 0',
            fieldDefaults: { anchor: '100%' },
            layout: 'anchor',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Duracion',
                            itemId: 'duracion',
                            name: "est_nduracion",
                            minValue: 1,
                            value: 1,
                            margin: '0 5 5 0'
                            //labelWidth: 150
                        },
                        {
                            xtype: 'combobox',
                            //fieldLabel : 'Tipo',
                            itemId: 'tipo',
                            name: "est_ntipo",
                            //		store: 'SoftguardEstadoTipoStore',
                            queryMode: 'local',
                            displayField: 'Name',
                            flex: 1,
                            margin: '0 5 5 0',
                            valueField: 'Value'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId: 'fechas',
                    items: [
                        /*{
                            xtype: 'datetimefield',
                            name: 'est_dfechadesde',
                            fieldLabel: 'Fin',
                            //disabled: true,
                            fieldLabel: 'Fecha Desde'
                    	},*/
                        {
                            xtype: 'datefield',
                            name: 'est_dfechadesde',
                            fieldLabel: 'Fecha Desde',
                            disabled: true,
                            width: 200
                        },
                        {
                            xtype: 'timefield',
                            fieldLabel: 'Hora',
                            itemId: 'desdeTime',
                            disabled: true,
                            margin: '0 0 0 5',
                            labelWidth: 35,
                            flex: 1
                        }, {
                            xtype: 'datefield',
                            name: 'est_dfechahasta',
                            margin: '0 0 0 5',
                            labelWidth: 35,
                            disabled: true,
                            fieldLabel: 'Hasta',
                            flex: 1
                        },
                        {
                            xtype: 'timefield',
                            fieldLabel: 'Hora',
                            itemId: 'hastaTime',
                            labelWidth: 35,
                            margin: '0 0 0 5',
                            disabled: true,
                            flex: 1
                        }
                    ]
                }
            ]
        }, {
            xtype: 'textarea',
            fieldLabel: 'Nota',
            margin: '5 0 0 0',
            itemId: 'nota',
            name: "est_mnota"
        }, {
            xtype: 'container',
            itemId: 'cambioEstadoContainer',
            hidden: true,
            margin: '5 0 0 0',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Cambio a estado no habilitado programado',
                    itemId: 'cambioEstadoCmb',
                    queryMode: 'local',
                    displayField: 'Name',
                    valueField: 'Value',
                    labelWidth: 200,
                    //store: 'SiNoStore'
                }, {
                    xtype: 'fieldset',
                    title: 'Fecha desde',
                    itemId: 'fechaDesdeFieldSet',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha',
                            name: "fecha",
                            bindToModel: false,
                            itemId: 'fechadesde',
                            labelWidth: 50,
                            width: 250,
                            //allowBlank: false, // Hace que el campo sea requerido
                            blankText: 'Este campo es requerido'
                        }, {
                            fieldLabel: 'Hora',
                            xtype: 'timefield',
                            itemId: 'hora',
                            format: 'H:i',
                            altFormats: 'H:i',
                            increment: 10,
                            labelWidth: 50,
                            width: 120,
                            //allowBlank: false, // Hace que el campo sea requerido
                            blankText: 'Este campo es requerido'
                        }
                    ]
                }
            ]
        }
    ]
    // cierro items datos
    // cierro items
});