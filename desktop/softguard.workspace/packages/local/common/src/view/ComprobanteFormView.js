Ext.define( 'Common.view.ComprobanteFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.comprobanteformview' ],
    title: 'Order',
    frame: false,
    autoScroll: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelWidth: 150,
        labelAlign: 'left',
        editable: false
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            itemId: 'numerocomprobantecontainer',
            items: [
                {
                    xtype: 'textfield',
                    name: 'cbc_cprefijocbte',
                    fieldLabel: 'Comprobante',
                    enforceMaxLength: true,
                    itemId: 'cbc_cprefijocbte',
                    maxLength: 4,
                    width: 200,
                    margin: '0 10 0 0'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: '',
                    value: '-',
                    margin: '0 10 0 0'
                }, {
                    xtype: 'numberfield',
                    name: 'cbc_inumerocbte',
                    fieldLabel: '',
                    editable: true,
                    itemId: 'cbc_inumerocbte'
                }
            ],
            hidden: true
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Comprobante',
            name: '_ncomprobante',
            itemId: '_ncomprobante',
            hidden: false
        },{
            xtype: 'combo',
            /* store:[
                 ['A', getLocale('A')],
                 ['B', getLocale('B')],
                 ['C', getLocale('C')],
                 ['X', getLocale('X')]
                 ],*/
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Tipo comprobante',
            lastQuery: '',
            name: 'cbc_ctipocbte',
            itemId: 'cbc_ctipocbte',
            displayField: 'cbt_cdescripcion',
            valueField: 'cbt_ccodigo',
            allowBlank: false
        },{
            xtype: 'datefield',
            itemId:'cbc_dfecha',
            fieldLabel: 'Fecha',
            name: 'cbc_dfecha',
            allowBlank: false,
            disabled: true

        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            itemId: 'organizacion',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Organizacion',
                    name: '_organization',
                    flex: 1
                },
                {
                    xtype: 'button',
                    action: 'organizationChange',
                    text: 'Seleccionar una organizacion'
                }
            ]
        }, {
            xtype: 'numberfield',
            name: 'cbc_yimpuesto1',
            itemId: 'cbc_yimpuesto1',
            fieldLabel: 'Impuesto 1',
            decimalPrecision: 2,
            allowDecimals: true
        }, {
            xtype: 'numberfield',
            name: 'cbc_yimpuesto2',
            itemId: 'cbc_yimpuesto2',
            fieldLabel: 'Impuesto 2',
            decimalPrecision: 2,
            allowDecimals: true
        }, {
            xtype: 'numberfield',
            name: 'cbc_yimpuesto3',
            itemId: 'cbc_yimpuesto3',
            fieldLabel: 'Impuesto 3',
            decimalPrecision: 2,
            allowDecimals: true
        }, {
            xtype: 'combo',

            editable: false,
            queryMode: 'local',
            fieldLabel: 'Condicion de pago',
            lastQuery: '',
            //name:'',
            itemId: 'condicionpago',
            displayField: '_con_cdescripcion',
            valueField: 'Id',
            width: 600,
            allowBlank: false,
            disabled: true

        }, {
            xtype: 'combo',
            store: [
                [ 0, getLocale( 'Pendiente' ) ],
                [ 1, getLocale( 'Activo' ) ],
                [ 2, getLocale( 'Cancelado' ) ]
            ],
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Estado',
            lastQuery: '',
            name: 'cbc_cestado',
            itemId: 'cbc_cestado',
            value: 0
        }, {
            xtype: 'textfield',
            name: 'cbc_ccae',
            itemId: 'cbc_ccae',
            fieldLabel: 'CAE',
            disabled: true
        }, {
            xtype: 'checkboxfield',
            fieldLabel: 'Enviar por mail',
            itemId: 'enviarpormail',
            hidden: true
        }, {
            xtype: 'combo',
            fieldLabel: 'Template',
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            itemId: 'comboTemplate',
            hidden: true
        }

        /* {xtype:'datefield',fieldLabel:'Vto. CAE', name:'cbc_cvtocae'},*/
        , {
            xtype: 'comprobanteitemsearchview',
            itemId: 'comprobanteitemsearchview',
            flex: 1,
            margin: '5 0 0 0'
        }

    ],

    setRecord: function( record ) {
        this.record = record;
        this.down( 'comprobanteitemsearchview' ).record = record;
        this.down( 'comprobanteitemsearchview' ).caller = this;
        this.down( 'comprobanteitemsearchview' ).recordOrganizacion = this.recordOrganizacion;

    },
    initComponent: function() {
        this.callParent();

        if( this.record ) {
            this.setRecord( this.record );
        }

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    action: 'save',
                    itemId: 'save'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete'
                }/*,{
                    iconCls: 'icon-money-add',
                    text: 'Pago efectuado',
                    scope: this,
                    action: 'pago-efectuado'
                }*/, '->', {
                    iconCls: 'icon-printer',
                    text: 'Imprimir',
                    tooltip: getLocale( 'Imprimir cotizacion' ),
                    hidden: true,
                    itemId: 'print',
                    handler: function( btn ) {
                        var view = btn.up( 'comprobanteformview' );
                        var record = view.record;
                        var tabpanel = view.up( 'tabpanel' );
                        var title = getLocale( 'Factura' ) + ' (' + record.get( 'Id' ) + ')';
                        var mytab = tabpanel.down( '[title="' + title + '"]' );
                        if( !mytab ) {

                            var newTab = Ext.widget( 'facturaprintview', {
                                iconCls: 'icon-printer',
                                record: record,
                                title: title,
                                closable: true,
                                objectId: record.get( 'Id' ),
                                translate: false,
                                closeAction: 'destroy',
                                organizacionId: view.organizacionId
                            });


                            // agrego la paleta creada
                            tabpanel.add( newTab );
                            tabpanel.setActiveTab( newTab );
                        }
                    }
                }
            ]
        });
        this.addDocked( toolbar );
    }

});