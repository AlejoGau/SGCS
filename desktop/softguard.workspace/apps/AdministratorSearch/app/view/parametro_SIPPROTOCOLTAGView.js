Ext.define( 'AdministratorSearch.view.parametro_SIPPROTOCOLTAGView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.parametro_SIPPROTOCOLTAGView' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'button',
                    text: 'Predefinidos',
                    menu: {
                        xtype: 'menu',
                        itemId: 'etiquetas',
                        items: [
                        ]
                    }
                }, {
                    xtype: 'textfield',
                    itemId: 'protocolo',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'Agregar',
                    itemId: 'agregarprotocolo'
                }
            ]
        }, {
            xtype: 'grid',
            itemId: 'protocolosgrid',
            stateFull: false,
            store: new Ext.data.Store( {
                fields: ['protocolo','config'],
                idIndex: 0,
                autoLoad: false
            }),
            autoScroll: true,
            columns: [
                {
                    xtype: 'gridcolumn',
                    header: 'Protocolo',
                    dataIndex: 'protocolo',
                    flex: 1
                }, {
                    xtype: 'actioncolumn',
                    width: 45,
                    items: [ {
                        iconCls: 'icon-delete',
                        tooltip: getLocale( 'Eliminar protocolo' ),
                        handler: function( grid, rowIndex, colIndex, item, event ) {
                            var view = grid.up( 'parametro_SIPPROTOCOLTAGView' );
                            var rec = grid.getStore().getAt( rowIndex );
                            grid.getStore().remove( rec )
                            view.quitarProtocolo( rec, rowIndex )
                        }
                    },{
                        iconCls: 'icon-cog',
                        tooltip: getLocale( 'Configurar' ),
                        handler: function( grid, rowIndex, colIndex, item, event ) {
                            var view = grid.up( 'parametro_SIPPROTOCOLTAGView' );
                            var rec = grid.getStore().getAt( rowIndex );
                            var protocolo=rec.get('protocolo').toUpperCase();

                            if (protocolo=='NET2PHONE'){
                                view.configureNet2Phone(rec);
                            } else if (protocolo=='WILDIX'){
                                view.configureWildix(rec);
                            }
                            else if (protocolo=='SIP'){
                                view.configureSIP(rec);
                            }
                            
                        },
                        isDisabled: function(view, rowIndex, colIndex, item, record) {
                            // Returns true if 'editable' is false (, null, or undefined)
                            var protocolo=record.get('protocolo').toUpperCase();
                            var enabled = protocolo.match(/(NET2PHONE|WILDIX|SIP)/);
                            return !enabled;
                        }
                    }]
                }
            ]
        }, {
            xtype: 'textarea',
            name: 'par_cvalor',
            fieldLabel: 'Valor',
            anchor: '100%',
            //id: 'plantillatrackguard',
            itemId: 'jsonvalues',
            allowBlank: false,
            hidden: true
        }
    ],

    configureNet2Phone: function(rec){
        var view = this;
        var client_id;
        var client_secret;
        
        var _config = rec.get('config');
        if (_config){
            var json = Ext.JSON.decode(_config);
            client_id = json.client_id;
            client_secret = json.client_secret;
        }

        var win = Ext.widget('window',{
            title: 'Configuración',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            width: 420,
            height: 150,
            items:[
                {
                    xtype: 'textfield',
                    itemId: 'client_id',
                    value: client_id,
                    fieldLabel: 'Client id',
                    margin: '5 0 5 0'
                },
                {
                    xtype: 'textfield',
                    itemId: 'client_secret',
                    value: client_secret,
                    fieldLabel: 'Client secret'
                }
            ],
            tbar:[
                {
                    text: 'Aceptar',
                    iconCls: 'save',
                    itemId: 'save',
                    action: 'save',
                    handler: function(btn){
                        var config = {
                            client_id: win.down('#client_id').getValue(),
                            client_secret: win.down('#client_secret').getValue()
                        };

                        rec.set('config',Ext.JSON.encode(config));
                        view.setJsonValues();
                        win.close();
                    }
                }
            ]
        }).show();
    },

    configureWildix: function(rec){
        var view = this;
        var domain;
        var aplicationId;
        var redirectUri;

        var _config = rec.get('config');
        if (_config){
            var json = Ext.JSON.decode(_config);
            domain = json.domain;
            aplicationId = json.aplicationId;
            redirectUri = json.redirectUri;
        }

        var win = Ext.widget('window',{
            title: 'Configuración',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            width: 420,
            height: 150,
            items:[
                {
                    xtype: 'textfield',
                    itemId: 'domain',
                    value: domain,
                    fieldLabel: 'Dominio',
                    margin: '5 0 5 0'
                },
                {
                    xtype: 'textfield',
                    itemId: 'Parametro1',
                    value: aplicationId,
                    fieldLabel: 'Aplication id',
                    margin: '5 0 5 0'
                },
                {
                    xtype: 'textfield',
                    itemId: 'parametro2',
                    value: redirectUri,
                    fieldLabel: 'Redirect url',
                    margin: '5 0 5 0'
                }                                
            ],
            tbar:[
                {
                    text: 'Aceptar',
                    iconCls: 'save',
                    itemId: 'save',
                    action: 'save',
                    handler: function(btn){
                        var config = {
                            domain: win.down('#domain').getValue(),
                            aplicationId: win.down('#Parametro1').getValue(),
                            redirectUri: win.down('#parametro2').getValue()
                        };

                        rec.set('config',Ext.JSON.encode(config));
                        view.setJsonValues();
                        win.close();
                    }
                }
            ]
        }).show();
    },
    configureSIP: function(rec){
        var view = this;
        var recordPBX;
        /*var recordPath;
        var recordType; */

        var _config = rec.get('config');
        if (_config){
            var json = Ext.JSON.decode(_config);
            recordPBX = json.recordPBX;
            /*recordPath = json.recordPath;
            recordType = json.recordType;*/
        }

        /*var recordTypeStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: [
                { value: 'GrandStream', text: 'GrandStream' },
                { value: 'MicroSip', text: 'MicroSip' }
            ]
        });

        var recordTypeCombobox = Ext.widget('combobox', {
            fieldLabel: 'Tipo de grabación',
            store: recordTypeStore,
            queryMode: 'local',
            value: recordType,
            displayField: 'text',
            valueField: 'value',
            itemId: 'recordType'
        })*/

        var win = Ext.widget('window',{
            title: 'Configuración',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            width: 420,
            height: 120,
            items:[
                {
                    xtype: 'checkbox',
                    itemId: 'recordPBX',
                    value: recordPBX,
                    fieldLabel: 'Grabaciones PBX',
                    margin: '5 0 5 0',
                    labelWidth: 150,
                    listeners: {
                        change: function(checkbox, newValue) {
                            /*var recordPathField = win.down('#recordPath');
                            var recordTypeField = win.down('#recordType');
                            if (newValue) {
                                recordPathField.allowBlank = false;
                                recordTypeField.allowBlank = false;
                                recordPathField.setFieldLabel('Path grabaciones <span style="color:red">*</span>');
                                recordTypeField.setFieldLabel('Tipo de grabación <span style="color:red">*</span>');

                            } else {
                                recordPathField.allowBlank = true;
                                recordTypeField.allowBlank = true;
                                recordPathField.setFieldLabel('Path grabaciones');
                                recordTypeField.setFieldLabel('Tipo de grabación');
                                
                                recordPathField.clearInvalid();
                                recordTypeField.clearInvalid();
                            }*/
                        }
                    }
                }/*,
                {
                    xtype: 'textfield',
                    itemId: 'recordPath',
                    value: recordPath,
                    fieldLabel: 'Path grabaciones',
                    margin: '5 0 5 0',
                    labelWidth: 150,
                    listeners: {
                        afterrender: function(textfield) {
                            textfield.setFieldLabel('Path grabaciones');
                        }
                    }
                },
                recordTypeCombobox */                                
            ],
            tbar:[
                {
                    text: 'Aceptar',
                    iconCls: 'save',
                    itemId: 'save',
                    action: 'save',
                    handler: function(btn){
                        var recordPBXValue = win.down('#recordPBX').getValue();
                        /*var recordPathValue = win.down('#recordPath').getValue();
                        var recordTypeValue = win.down('#recordType').getValue();

                        var valid = true;
                        
                        if (recordPBXValue){
                            if (recordPathValue == ""){
                                win.down('#recordPath').markInvalid('Este campo es requerido.');
                                valid = false;
                            }
                            if (recordTypeValue == ""){
                                win.down('#recordType').markInvalid('Este campo es requerido.');
                                valid = false;
                            }
                        }
                        console.log("recordPBXValue",recordPBXValue);
                        console.log("recordPathValue",recordPathValue);
                        console.log("recordTypeValue",recordTypeValue);*/
                        //if (valid){
                        var config = {
                            recordPBX: recordPBXValue/*,
                            recordPath: recordPathValue,
                            recordType: recordTypeValue*/
                        };
                        console.log("config", config);
                        rec.set('config',Ext.JSON.encode(config));
                        view.setJsonValues();
                        win.close();
                        //}
                    }
                }
            ]
        }).show();
    },

    htmlentities: function( string ) {
        return string;
    },

    setJsonValues(){
        var view = this;
        var jsonvalues = view.down('#jsonvalues');
        var store = view.down('#protocolosgrid').getStore();
        var records = store.getRange();
        var data = Ext.Array.pluck(records,'data');
        jsonvalues.setValue(Ext.JSON.encode(data));
    },
    
    initComponent: function() {
        this.callParent();
        this.listaEtiquetas = [
            { etiqueta: 'Skype' },
            { etiqueta: 'Dialer' },
            { etiqueta: 'Logger' },
            { etiqueta: 'Zoiper' },
            { etiqueta: 'SIP' }
        ];

        var t = this;
        t.down( '#protocolosgrid' ).getStore().removeAll()

        Ext.Array.each( this.listaEtiquetas, function( rec, i ) {
            t.down( '#etiquetas' ).add( {
                xtype: 'button',
                text: t.htmlentities( rec.etiqueta ),
                itemId: 'etiqueta' + i,
                listeners: {
                    click: function() {
                        t.down( '#protocolo' ).setValue( rec.etiqueta )
                    }
                }
            });
        });

        t.down( '#agregarprotocolo' ).on( 'click', function( btn ) {
            t.agregarProtocolo( btn.up( 'parametro_SIPPROTOCOLTAGView' ).down( '#protocolo' ).getValue() )
        })

        Ext.Function.defer( function() {
            var array = [];
            var jsonValue = t.down( '#jsonvalues' ).getValue();
            try {
                array = JSON.parse( jsonValue );
                var store = t.down( '#protocolosgrid' ).getStore();
                Ext.Array.each( array, function( rec ) {
                    store.add(rec);
                })
            } catch( e ) {
                if( jsonValue != '' ) {
                    t.down( '#jsonvalues' ).setValue( Ext.JSON.encode( [ { protocolo: jsonValue }] ) )
                    store.add( {
                        protocolo: jsonValue
                    })
                }
            }
        }, 100 );
    },

    agregarProtocolo: function( protocolo ) {
        var t = this;
        var jsonvalues = t.down( '#jsonvalues' ).getValue()
        var arrayValues = [];
        if( jsonvalues != '' ) {
            arrayValues = JSON.parse( jsonvalues )
        }

        var agrego = true;
        Ext.Array.each( arrayValues, function( rec ) {
            if( protocolo == rec.protocolo ) {
                agrego = false;
                return false;
            }
        })

        if(agrego) {
            t.down( '#protocolosgrid' ).getStore().add( {
                protocolo: protocolo
            })
            t.down( '#protocolo' ).setValue( '' );
            t.setJsonValues();
        }
    },

    quitarProtocolo: function( record, rowIndex ) {

        var t = this;
        var lista = JSON.parse(t.getForm().findField('par_cvalor').getValue());
        lista.splice( rowIndex, 1 );
        var newLista = JSON.stringify(lista)
        t.getForm().findField('par_cvalor').setValue(newLista);
        
        /** Funcion Vieja
        var jsonvalues = t.down( '#jsonvalues' ).getValue()
        var arrayValues = [];
        if( jsonvalues != '' ) {
            arrayValues = JSON.parse( jsonvalues )
        }

        var nuevoArray = [];

        Ext.Array.each( arrayValues, function( rec ) {
            if( rec.protocolo != record.get( 'valor' ) ) {
                nuevoArray.push( rec )
            }
        })
        t.down( '#jsonvalues' ).setValue( Ext.JSON.encode( nuevoArray ) )
        */
    }
    
});