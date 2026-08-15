//MIGRADO2024
Ext.define( 'Common.view.ServTecPanelView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sertepanelview',
    layout: 'border',
    itemId: 'servtecinfo',
    items: [
        {
            xtype: 'container',
            region: 'north',
            itemId: 'infoservtec',
            padding: '0 0 10 10',
            items: [ {
                xtype: 'fieldset',
                title: 'Datos de servicio tecnico',
                margin: '10 0 10 0',
                itemId: 'fieldsettitulo',
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: "hbox",
                            pack: "center",
                            align: "middle"
                        },
                        itemId: 'titulo',
                        items: [
                            {
                                // fieldLabel : 'numero',
                                xtype: 'displayfield',
                                itemId: 'numeroServTec',
                                margin: '0 15 0 0',
                                labelWidth: 50,
                                fieldStyle: 'font-size:16px'
                            }, {
                                //   fieldLabel : 'Tipo',
                                xtype: 'displayfield',
                                itemId: 'tipoServicio',
                                margin: '0 15 0 0',
                                labelWidth: 50,
                                fieldStyle: 'font-size:16px'
                            }, {
                                //   fieldLabel : 'estado',
                                xtype: 'displayfield',
                                itemId: 'estado',
                                labelWidth: 50,
                                fieldStyle: 'font-size:16px'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items: [
                            {
                                fieldLabel: 'Direccion',
                                xtype: 'displayfield',
                                itemId: 'calle',
                                margin: '0 15 0 0',
                                labelWidth: 60
                            }, {
                                fieldLabel: 'Ciudad',
                                xtype: 'displayfield',
                                itemId: 'localidad',
                                labelWidth: 50
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items: [
                            {
                                fieldLabel: 'Contacto',
                                xtype: 'displayfield',
                                itemId: 'contacto',
                                margin: '0 15 0 0'
                            }, {
                                fieldLabel: 'Tel',
                                xtype: 'displayfield',
                                itemId: 'telefono',
                                labelWidth: 50,
                                labelAlign: 'right'
                            }
                        ]
                    }, {
                        fieldLabel: 'Alta de la cuenta',
                        xtype: 'displayfield',
                        itemId: 'incioservicio'
                    }, {
                        xtype: 'fieldset',
                        title: 'Visita activa',
                        layout: 'hbox',
                        margin: '5 0 10 0',
                        items: [
                            {
                                fieldLabel: 'Tecnico',
                                xtype: 'displayfield',
                                itemId: 'tecnico',
                                labelWidth: 50,
                                margin: '0 15 0 0'
                            }, {
                                fieldLabel: 'Movil',
                                xtype: 'displayfield',
                                itemId: 'movil',
                                labelWidth: 50,
                                margin: '0 15 0 0'
                            }
                        ]
                    }
                ]
            }, {
                    xtype: 'button',
                    text: 'Imprimir Orden',
                    iconCls: 'icon-printer',
                    // Nuevo handler
                    handler: function( button ) {
                        var view = button.up( 'sertepanelview' );
                        var rec = view.record;
                        var title = getLocale( 'Orden' ) + ' (' + rec.get( 'stc_inumero' ) + ')';
                        var stc_iid = rec.get( 'stc_iid' ) ? rec.get( 'stc_iid' ) : rec.get( 'stc_inumero' ); // 16/07 : Modificado por issue que al modificar el ST, la orden quedaba con Model y no tomaba el Id para poder imprimir.
                        var win = Ext.create( 'Ext.Window', {
                            layout: 'fit',
                            title: 'Seleccione tipo de Impresión',
                            translate: false,
                            closeAction: 'hide',
                            border: true,
                            modal: false,
                            width: 200,
                            height: 200,
                            printTitle: title,
                            stc_iid: stc_iid,
                            rec: rec,
                            items: [ {
                                xtype: 'panel',
                                dockedItems: [ {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [ {
                                        text: 'Imprimir',
                                        iconCls: 'icon-printer',
                                        handler: function( button ) {
                                            var popup = button.up( 'window' );
                                            var accionPrint = popup.down( '#accionPrint' ).getValue();
                                            
                                            var filters = [ {
                                                property: 'stc_iid',
                                                value: popup.rec.get('Id')
                                            }];
                                            var newTab = Ext.widget( 'ordenservtecview', {
                                                title: '',
                                                filters: filters,
                                                translate: false,
                                                record: popup.rec,
                                                closeAction: 'destroy',
                                                hidePrint: view.hidePrint,
                                                accionPrint: accionPrint
                                            });
                                            var win = Ext.create( 'Ext.Window', {
                                                layout: 'fit',
                                                title: title,
                                                translate: false,
                                                closeAction: 'hide',
                                                border: true,
                                                modal: false,
                                                view: view,
                                                items: newTab,
                                                maximized: true
                                            });
                                            win.show();
                                        }
                                    }]
                                }],
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Ver acciones',
                                        itemId: 'accionPrint',
                                        checked: true
                                    }
                                ]
                            }],
                        });
                        win.show();
                    }
                }]
        },
        {
            xtype: 'moduletreeview', //implied by default
            title: '',
            // store : 'ServTecPanelModuleStore',
            region: 'west',
            margins: '5 0 0 5',
            width: 200,
            collapsible: true,
            layout: 'fit',
            split: true
        }, {
            //title: 'Center Region',
            xtype: 'tabpanel',
            region: 'center',
            itemId: 'centerx',
            layout: 'fit',
            margins: '5 0 0 0'
        }],
    initComponent: function() {
        //this.addEvents( 'objectchanged' );
        this.callParent();
        //var moduletreeview ;//= this.down('moduletreeview');
        //moduletreeview.targetTab = this.down('tabpanel');
        //moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;
    }
});