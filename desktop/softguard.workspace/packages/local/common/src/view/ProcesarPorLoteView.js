//MIGRADO2024
Ext.define( 'Common.view.ProcesarPorLoteView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.procesarporloteview' ],
    preventHeader: true,
    frame: true,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%'
    },
    events: {
        refresh: true
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
            xtype: 'gridpanel',
            title: 'Eventos',
            itemId: 'eventosprocesartodo',
            ignoreDirty: true,
            autoScroll: true,
            ignoreState: true,
            height: 300,
            forceClose: true,
            closeAction: 'destroy',
            margin: '0 0 15 0',
            //  selType:'checkboxmodel',
            features: [ {
                ftype: 'summary'
            }],
            viewConfig: {
                loadMask: true,
                preserveScrollOnRefresh: true
            },
            dockedItems: [ {
                xtype: 'toolbar',
                dock: 'top',
                items: [ {
                    text: 'Filtros',
                    itemId: 'filtros',
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
                                        width: 260
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
                    }, "->", {
                        type: 'button',
                        iconCls: 'icon-accept',
                        text: 'Seleccion de eventos especificos',
                        itemId: 'eventosespecificos',
                        hidden: true
                    }]
            }],
            columns: [
                {
                    xtype: 'actioncolumn',
                    header: '&nbsp;',
                    width: 26,
                    sortable: false,
                    items: [ {
                        iconCls: 'icon-zoom-in',
                        tooltip: getLocale( 'Filtrar' ),
                        sortable: false,
                        handler: function( grid, rowIndex, colIndex, item, event ) {
                            var view = grid.up( 'procesarporloteview' );
                            var rec = grid.getStore().getAt( rowIndex );
                            view.fireEvent( 'addfilter', view, rec );
                        }
                    }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Evento',
                    columnId: 'Evento',
                    dataIndex: 'alarmaCompleta',
                    sortable: false,
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var texto = '';
                        var panel = this.up( 'procesarporloteview' );
                        texto = record.get( 'alarmaCompleta' );
                        var txtColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolorletra' ) );
                        var backColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolor' ) );
                        metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                        return texto
                    },
                    flex: 1
                }, {
                    text: 'Cantidad',
                    dataIndex: 'cantidad',
                    xtype: 'numbercolumn',
                    align: 'right',
                    format: '0',
                    flex: 1,
                    summaryType: 'sum',
                    summaryRenderer: function( value, summaryData, dataIndex ) {
                       const store = this.up('grid').getStore();
                       const sum = store.sum(dataIndex);
                       console.log('Sum of ' + dataIndex + ': ' + sum);
                       return getLocale( 'Cantidad total de eventos' ) + ': ' + sum;
                    }
                }]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            itemId: 'formularios',
            items: [
                {
                    xtype: 'form',
                    title: 'Procesar',
                    itemId: 'procesar',
                    //collapsible: true,
                    /*layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },*/
                    width: '50%',
                    border: 1,
                    //height: 220,
                    margin: '0 5 0 0',
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
                            multiselect: false,
                            editable: false,
                            queryMode: 'local',
                            anchor: '100%',
                            displayField: 'res_cdescripcion',
                            valueField: 'res_ccodigo',
                            width: 400,
                            editable: true,
                            forceSelection: true,
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Resolución',
                            itemId: 'resolucion',
                            anchor: '100%',
                            store: "TablasCategorizacionStore",
                            multiselect: false,
                            editable: false,
                            queryMode: 'local',
                            displayField: 'cat_cDescripcion',
                            valueField: 'cat_cCodigo',
                            width: 400,
                            editable: true,
                            //plugins: [ 'clearbutton' ],
                            forceSelection: true
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
                            hidden: true,
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
            text: 'Salir',
            action: 'cancel'
        }],
    initComponent: function() {
        this.callParent( arguments );
        var view = this;
        view.categorizacion = view.categorizacion ? view.categorizacion : false;
        view.resolucion = view.resolucion ? view.resolucion : false;
        /*    this.onSelectCategorizacionChange = function (selModel, selections) {
                if(selections.length >0) {
                   view.categorizacion = true;
                   this.onOffProcesar();
                }
            };      
            this.onSelectResolucionnChange = function (selModel, selections) {
                
                if(selections.length >0) {
                   view.resolucion = true;
                   this.onOffProcesar();
                }
            };   
            this.down('#categorizacion').on('change', this.onSelectCategorizacionChange, this);
            this.down('#resolucion').on('change', this.onSelectResolucionnChange, this);
            */
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.down( '#eventosprocesartodo' ).addDocked( pagingtoolbar );
        /* 
         this.onOffProcesar = function () {
           
             
             
             var escondeBotones = false;
             
             var resolucionRequerida = getParametro('RESOLUCIONOBLIGATORIA')
             if(resolucionRequerida==1 || resolucionRequerida==2) {
                 if(!view.categorizacion) {
                     escondeBotones = true;
                 }
             }
             
             
             var categorizacionRequerida = getParametro('CATEGORIZACIONOBLIGATORIA')
             if(categorizacionRequerida==1 || categorizacionRequerida==2) {
                 if(!view.resolucion) {
                     escondeBotones = true;
                 }
             }
             
             
             if(!escondeBotones) {            
                 this.down('#save').setDisabled(false);
             } else {
                 this.down('#save').setDisabled(true);
             }
         }
         */
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