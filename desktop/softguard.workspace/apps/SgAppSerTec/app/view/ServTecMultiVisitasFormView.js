Ext.define( 'SgAppSerTec.view.ServTecMultiVisitasFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.sertecmultivisitasformview' ],
    closeAction: 'destroy',
    preventHeader: true,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 200,
        anchor: '100%'
    },
    events: {
        refresh: true
    },
    autoScroll: true,
    items: [
        {
            xtype: 'displayfield',
            name: 'svi_tFechaHora',
            fieldLabel: 'Fecha',
            flex: 1,
            allowBlank: false,
            itemId: 'fechayhora',
            renderer: function( value ) {
                return Ext.Date.format( new Date( value ), 'd/m/Y H:i:s' )
            }

        }, {
            xtype: 'textarea',
            name: 'svi_cObservacion',
            fieldLabel: 'Observacion',
            flex: 1,
            itemId: 'observacion'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [

                {
                    //xtype:'datetimefield',
                    xtype: 'datefield',
                    name: 'svi_tSalidaHaciaCliente',
                    fieldLabel: 'Salida hacia el cliente',
                    itemId: 'svi_tSalidaHaciaCliente',
                    flex: 1
                }, {
                    xtype: 'timefield',
                    fieldLabel: 'Hora',
                    itemId: 'svi_tSalidaHaciaClienteHora',
                    margin: '0 0 0 5',
                    labelWidth: 50,
                    /*minValue: '00:00',
                    maxValue: '23:59',*/
                    format: 'H:i', // 24 hour format
                    increment: 1,
                    editable: true,
                    forceList: true,
                    forceSelection: false,
                    flex: 1,
                    validator: function( value ) {
                        var view = this.up( 'sertecmultivisitasformview' )
                        var fechaHoraAntecesor = view.dateAlta

                        var fecha = view.down( '#svi_tSalidaHaciaCliente' ).getValue()
                        var hora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue()

                        var fechaHora = new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( hora ), 'H:i:s' ) )

                        this.clearInvalid();
                        this.textValid = true;

                        if( fechaHora && fecha && fechaHoraAntecesor >= fechaHora ) {
                            this.markInvalid( 'La fecha de salida al cliente no puede se inferior a la fecha de creacion de la visita.' );
                            this.textValid = false;
                        }

                        return this.textValid;
                    }
                }
            ]
        }, {
            xtype: 'container',
            layout: 'hbox',
            items: [ {

                xtype: 'combo',
                fieldLabel: 'Estado',
                queryMode: 'local',
                forceSelection: true,
                allowBlank: true,
                editable: false,
                store: [
                    /*  [1,'Pendiente'],*/
                    [ 2, getLocale( 'Asignado' ) ],
                    [ 3, getLocale( 'En Ejecucion' ) ],
                    [ 4, getLocale( 'Finalizado' ) ],
                    [ 5, getLocale( 'Cancelado' ) ],
                    [ 6, getLocale( 'Programada' ) ]
                ],
                itemId: "estado",
                valueField: 'Value',
                displayField: 'Name',
                name: "svi_iEstado"
            }, {
                    xtype: 'checkbox',
                    itemId: 'actualizarcabecera',
                    value: true,
                    fieldLabel: 'Actualizar estado de servicio tecnico',
                    labelWidth: 250,
                    margin: '0 0 0 10'
                }]
        }

        , {
            xtype: 'servtectecnicovisitasgridview',
            title: 'Tecnicos',
            itemId: 'tecnicos',
            flex: 1,
            margin: '5 0 10 0'

        }, {
            xtype: 'servtecmovilvisitasgridview',
            title: 'Moviles',
            itemId: 'moviles',
            flex: 1,
            margin: '0 0 10 0'

        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [

                {
                    xtype: 'datefield',
                    name: 'svi_tArriboAlCliente',
                    fieldLabel: 'Arribo al cliente',
                    itemId: 'svi_tArriboAlCliente',
                    flex: 1

                }, {
                    xtype: 'timefield',
                    fieldLabel: 'Hora',
                    itemId: 'svi_tArriboAlClienteHora',
                    margin: '0 0 0 5',
                    labelWidth: 50,
                    format: 'H:i', // 24 hour format
                    altFormats: 'H:i',
                    increment: 1,
                    editable: true,
                    forceList: true,
                    forceSelection: false,
                    flex: 1,
                    validator: function( value ) {
                        var view = this.up( 'sertecmultivisitasformview' )
                        var fechaAntecesor = view.down( '#svi_tSalidaHaciaCliente' ).getValue()
                        var horaAntecesor = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue()
                        var fechaHoraAntecesor = new Date( Ext.Date.format( new Date( fechaAntecesor ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( horaAntecesor ), 'H:i:s' ) )

                        var fecha = view.down( '#svi_tArriboAlCliente' ).getValue()
                        var hora = view.down( '#svi_tArriboAlClienteHora' ).getValue()

                        var fechaHora = new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( hora ), 'H:i:s' ) )

                        this.clearInvalid();
                        this.textValid = true;

                        if( fechaHora && fecha && fechaHoraAntecesor >= fechaHora ) {
                            this.markInvalid( 'La fecha de arribo al cliente no puede se inferior a la fecha de creacion de la visita.' );
                            this.textValid = false;
                        }
                        return this.textValid;
                    }
                }
            ]
        }, {
            xtype: 'container',
            layout: 'hbox',
            items: [

                {
                    xtype: 'datefield',
                    name: 'svi_tSalidaDelCliente',
                    fieldLabel: 'Salida del cliente',
                    itemId: 'svi_tSalidaDelCliente',
                    flex: 1
                }, {
                    xtype: 'timefield',
                    fieldLabel: 'Hora',
                    itemId: 'svi_tSalidaDelClienteHora',
                    margin: '0 0 0 5',
                    labelWidth: 50,
                    format: 'H:i', // 24 hour format
                    altFormats: 'H:i',
                    increment: 1,
                    editable: true,
                    forceList: true,
                    forceSelection: false,
                    flex: 1,
                    validator: function( value ) {
                        var view = this.up( 'sertecmultivisitasformview' )
                        var fechaAntecesor = view.down( '#svi_tArriboAlCliente' ).getValue()
                        var horaAntecesor = view.down( '#svi_tArriboAlClienteHora' ).getValue()
                        var fechaHoraAntecesor = new Date( Ext.Date.format( new Date( fechaAntecesor ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( horaAntecesor ), 'H:i:s' ) )
                        var fecha = view.down( '#svi_tSalidaDelCliente' ).getValue()
                        var hora = view.down( '#svi_tSalidaDelClienteHora' ).getValue()
                        var fechaHora = new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( hora ), 'H:i:s' ) )

                        this.clearInvalid();
                        this.textValid = true;
                        if( fechaHora && fecha && fechaHoraAntecesor >= fechaHora ) {
                            this.markInvalid( 'La fecha de la salida del cliente no puede se inferior a la fecha de creacion de la visita.' );
                            this.textValid = false;
                        }

                        return this.textValid;
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'textarea',
                    fieldLabel: 'Horas planificadas',
                    name: 'svi_cHorasPlanificadas',
                    itemId: 'horasPlanificadas',
                    margin: '5 0 5 0',
                    width: 600,
                    height: 20
                }
            ]
        }
    ],

    initComponent: function() {

        this.callParent( arguments );

        this.down( 'servtectecnicovisitasgridview' ).record = this.record[ 0 ];
        this.down( 'servtecmovilvisitasgridview' ).record = this.record[ 0 ];
        this.down( 'servtectecnicovisitasgridview' ).caller = this;
        this.down( 'servtecmovilvisitasgridview' ).caller = this;

        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Guardar',
                    action: 'save',
                    itemId: 'save',
                    iconCls: 'icon-disk',
                    disabled: false
                }
            ]// cierro items
        });

        this.addDocked( toolbar );

    } // cierro init
});
