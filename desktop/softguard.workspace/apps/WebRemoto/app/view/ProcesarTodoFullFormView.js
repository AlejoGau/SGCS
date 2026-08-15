Ext.define( 'WebRemoto.view.ProcesarTodoFullFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.procesartodoformview' ],
    preventHeader: true,
    frame: true,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoScroll: true,
    ignoreDirty: true,
    forceClose: true,
    items: [
        {
            xtype: 'container',
            itemId: 'msg'
        },

        {
            xtype: 'gridpanel',
            title: 'Eventos',
            itemId: 'eventosprocesartodo',
            ignoreDirty: true,
            forceClose: true,
            autoScroll: true,
            ignoreState: true,
            height: 300,
            forceClose: true,
            closeAction: 'destroy',
            margin: '0 0 15 0',
            selType: 'checkboxmodel',
            selModel: {
                checkOnly: true,
                mode: "MULTI"
            },

            viewConfig: {
                loadMask: true,
                preserveScrollOnRefresh: true
            },
            features: [
                {
                    ftype: 'grouping',
                    groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> ' + getLocale( 'Prioridad' ) + ': {name} ({rows.length})</input>',
                    groupByText: getLocale( 'Agrupar' ),
                    //startCollapsed: true,
                    showGroupsText: getLocale( 'Mostrar en grupos' )
                }
            ],
            dockedItems: [ {
                xtype: 'toolbar',
                dock: 'top',
                items: [ {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {

                                        xtype: 'textfield',
                                        fieldLabel: 'Dealer',
                                        itemId: 'dealer',
                                        enforceMaxLength: true,
                                        maxLength: 3


                                    },
                                    {

                                        xtype: 'textfield',
                                        fieldLabel: 'Cuenta desde',
                                        itemId: 'cuentadesde',
                                        enforceMaxLength: true,
                                        maxLength: 4


                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Cuenta hasta',
                                        itemId: 'cuentahasta',
                                        enforceMaxLength: true,
                                        maxLength: 4
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Codigo alarma',
                                        itemId: 'codigoalarma',
                                        displayField: 'Descripcion',
                                        queryMode: 'local',
                                        valueField: 'Codigo',
                                        name: "cod_cdescripcion",
                                        multiSelect: true,
                                        width: '100%'
                                    }
                                ]
                            }
                        ]
                    }

                }, {
                        type: 'button',
                        text: 'Buscar',
                        itemId: 'search'
                    }, {
                        type: 'button',
                        text: 'Ver todos',
                        itemId: 'vertodos'
                    }]
            }],
            columns: [
                {
                    text: 'Fecha y Hora del Evento',
                    dataIndex: 'rec_iid',
                    xtype: 'datecolumn',
                    //format : 'D d-m-Y G:i:s',
                    renderer: function( value, object, record ) {
                        return Ext.Date.format( record.get( 'rec_isoFechaHora' ), 'D d-m-Y G:i:s' );
                    },
                    width: 170
                }, {
                    xtype: 'gridcolumn',
                    header: 'Evento',
                    columnId: 'Evento',
                    dataIndex: 'rec_calarma',
                    sortable: false,
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var texto = '';
                        var panel = this.up( 'procesartodoformview' );
                        if( Ext.util.Format.trim( record.get( 'rec_calarma' ) ) != '' ) {
                            texto = record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' );
                            var txtColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolorletra' ) );
                            var backColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolor' ) );
                            metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                        } else {
                            texto = record.get( 'rec_cContenido' );
                            metadata.style = 'color:#333; background-color:transparent;';

                        }
                        return texto
                    },
                    width: 210
                }, {
                    text: 'Prioridad',
                    columnId: 'Prioridad',
                    dataIndex: 'rec_iprioridad',
                    renderer: function( value, metadata, record ) {
                        return value == 0 ? record.get( 'cod_nprioridad' ) : value;
                    },
                    xtype: 'numbercolumn',
                    format: '0',
                    width: 50
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Cuenta',
                    dataIndex: 'rec_iidcuenta',
                    sortable: true,
                    width: 200,
                    renderer: function( value, metadata, record, colIndex, store, view ) {

                        if( !this.up( 'procesartodoformview' ).nombreMadre ) {

                            if( record.get( "cue_nparticion" ) == 0 ) {
                                return record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
                            } else {
                                return record.get( 'madre_clinea' ) + '-' + record.get( 'madre_ncuenta' ) + ' ' + record.get( 'madre_cnombre' ) + '/' + record.get( 'cue_cnombre' );
                            }

                        } else {
                            return record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
                        }
                    }
                }, {
                    xtype: 'gridcolumn',
                    header: 'Estado',
                    dataIndex: 'rec_nestado',
                    sortable: true,
                    groupable: true,
                    width: 60,
                    renderer: function( value, metadata, record ) {
                        var store = Ext.data.StoreManager.lookup( 'EventoEstadoStore' );
                        var text = '';
                        var estado = store.findRecord( 'Value', value );
                        if( estado ) {
                            text = estado.get( 'Name' );
                        }
                        return '<div class="circulo estado' + value + '" title="' + text + '"></div>'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Origen',
                    dataIndex: 'rec_norigen',
                    sortable: true,
                    width: 70,
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var store = Ext.data.StoreManager.lookup( 'EventoOrigenStore' );
                        var origen = store.findRecord( 'Value', value );
                        return origen.get( 'Name' );
                    }
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Usuario',
                    dataIndex: 'usu_cnombre',
                    sortable: true,
                    width: 150
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Dirección',
                    dataIndex: 'cue_ccalle',
                    sortable: true,
                    width: 200
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Zona',
                    dataIndex: 'rec_czona',
                    renderer: function( value, metadata, record ) {
                        return record.get( '_zona' );
                    },
                    sortable: true,
                    width: 150
                }]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'form',
                    title: 'Procesar',
                    itemId: 'procesar',
                    //collapsible: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    width: '50%',
                    height: 240,
                    margin: '0 10 0 0',
                    items: [

                        {
                            xtype: 'textareafield',
                            itemId: 'obsfield',
                            width: '100%',
                            fieldLabel: 'Observacion'

                        }, {

                            fieldLabel: 'Predefinidas',
                            xtype: 'combobox',
                            itemId: 'observaciones',
                            store: "TablasObservacionesStore",
                            multiselect: false,
                            editable: false,
                            queryMode: 'local',
                            anchor: '100%',
                            displayField: 'obs_cdescripcion',
                            valueField: 'obs_mobservacion',
                            width: 400,
                            editable: true,
                            forceSelection: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Categorización',
                            itemId: 'categorizacion',
                            //store: "TablasResolucionesStore",
                            //multiselect: false,
                            queryMode: 'local',
                            anchor: '100%',
                            displayField: 'res_cdescripcion',
                            valueField: 'res_ccodigo',
                            width: 400,
                            //  editable:true,
                            forceSelection: true,

                            typeAhead: true,
                            plugins: [ 'clearbutton' ],
                            lastQuery: '',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Resolución',
                            itemId: 'resolucion',
                            // store: "TablasCategorizacionStore",
                            //multiselect: false,
                            queryMode: 'local',
                            anchor: '100%',
                            displayField: 'cat_cDescripcion',
                            valueField: 'cat_cCodigo',
                            width: 400,
                            //editable:true,
                            forceSelection: true,

                            typeAhead: true,
                            plugins: [ 'clearbutton' ],
                            lastQuery: '',
                            allowBlank: false
                        }, {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            anchor: '100%',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-accept',
                                    text: 'Procesar',
                                    action: 'save',
                                    itemId: 'save',
                                    disabled: true,
                                    width: 100

                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    title: 'Espera',
                    itemId: 'espera',
                    border: 1,
                    //collapsible: true,
                    /*layout: {
                         type: 'vbox',
                        align: 'stretch'
                    },*/
                    width: '50%',
                    //height: 220,
                    margin: '0 0 0 5',
                    items: [

                        {
                            xtype: 'textareafield',
                            itemId: 'obsfield2',
                            width: '100%',
                            fieldLabel: 'Observacion'

                        }, {

                            fieldLabel: 'Predefinidas',
                            xtype: 'combobox',
                            itemId: 'observaciones2',
                            store: "TablasObservacionesStore",
                            multiselect: false,
                            editable: false,
                            queryMode: 'local',
                            anchor: '100%',
                            displayField: 'obs_cdescripcion',
                            valueField: 'obs_mobservacion',
                            width: 400,
                            editable: true,
                            forceSeleciotn: true
                        }/*,
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Categorización',
                                itemId: 'categorizacion2',
                                store: "TablasResolucionesStore",
                                multiselect : false,
                                editable : false,
                                queryMode: 'local',
                                anchor: '100%',
                                displayField: 'res_cdescripcion',                				
                                valueField: 'res_ccodigo',
                                width:400,
                                editable:true,
                                forceSeleciotn:true
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Resolución',
                                itemId: 'resolucion2',                               
                                anchor: '100%',
                                store: "TablasCategorizacionStore",
                                multiselect : false,
                                editable : false,
                                queryMode: 'local',
                                displayField: 'cat_cDescripcion',        						
                                valueField: 'cat_cCodigo',
                                width:400,
                                editable:true,
                                forceSeleciotn:true
                            }*/, {
                            xtype: 'numberfield',
                            itemId: 'minutosEspera',
                            fieldLabel: 'Minutos',
                            step: 5,
                            minValue: 10,
                            maxValue: 999,
                            value: 60,
                            width: 70
                        },
                        {
                            iconCls: 'icon-accept',
                            text: 'Proceso multiple',
                            action: 'procesarmultiple',
                            itemId: 'procesarmultiple',
                            disabled: false
                        }, {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            anchor: '100%',
                            margin: '5 0 5 0',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Espera',
                                    action: 'espera',
                                    itemId: 'espera',
                                    iconCls: 'icon-hourglass',
                                    width: 100,
                                    margin: '0 10'

                                },
                                {
                                    xtype: 'button',
                                    text: 'Supervision',
                                    action: 'supervision',
                                    itemId: 'supervision',
                                    iconCls: 'icon-eye',
                                    width: 100,
                                    height: 20,
                                    margin: '0 10',
                                }
                            ]
                        }


                    ]
                }

            ]
        }


    ],
    buttons: [/*{
                	text : 'Procesar',
                    action: 'save',
                    itemId: 'save',
                    disabled: true
                    
        		}, "-", {
                    xtype: 'numberfield',
                    itemId: 'minutosEspera',
                    step: 10,
                    minValue: 10,
                    maxValue: 999,
                    value: 60,
                    width: 70
                },{ xtype: 'button', text: 'Espera', action: 'espera',itemId: 'espera', iconCls: 'icon-hourglass' }
                ,"->",*/ {
            text: 'Cancelar',
            action: 'cancel'
        }],

    initComponent: function() {
        this.callParent( arguments );




        var categorizacion = false;
        var resolucion = false;

        this.onSelectCategorizacionChange = function( selModel, selections ) {

            categorizacion = true;
            this.onOffProcesar();
        };
        this.onSelectResolucionnChange = function( selModel, selections ) {

            if( selections && selections.length > 0 ) {
                resolucion = true;
                this.onOffProcesar();
            }
        };
        this.down( '#categorizacion' ).on( 'change', this.onSelectCategorizacionChange, this );
        this.down( '#resolucion' ).on( 'change', this.onSelectResolucionnChange, this );



        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.down( '#eventosprocesartodo' ).addDocked( pagingtoolbar );



        this.onOffProcesar = function() {
            if( categorizacion == true && this.loading == false ) {
                this.down( '#save' ).setDisabled( false );
            } else {
                this.down( '#save' ).setDisabled( true );
            }
        }



        this.decimalColorToHTMLcolor = function( number ) {
            var intnumber = number - 0;
            var red, green, blue;
            var template = "#000000";
            red = ( intnumber & 0x0000ff ) << 16;
            green = intnumber & 0x00ff00;
            blue = ( intnumber & 0xff0000 ) >>> 16;
            intnumber = red | green | blue;

            var HTMLcolor = intnumber.toString( 16 );


            HTMLcolor = template.substring( 0, 7 - HTMLcolor.length ) + HTMLcolor;

            return HTMLcolor;
        };



    } // cierro init

});
