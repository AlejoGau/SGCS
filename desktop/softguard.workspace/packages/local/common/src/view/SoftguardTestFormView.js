//MIGRADO2024
Ext.define('Common.view.SoftguardTestFormView', {
    extend:'Ext.panel.Panel',
    alias : 'widget.formtest',
    title: 'Test',
    bodyPadding: 0,
    autoScroll: true,
    layout: 'anchor',
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                }
            ]// cierro items toolbar
        }
    ], // cierro dockeditems
    items: [ 
		{
            xtype:'form',
            itemId:'formtest',
            bodyPadding: 0,
            items:[
                {
                    xtype: 'panel',
                    border: 0,
                    collapsible: true,
                    title: 'Test',
                    layout: 'anchor',
                    bodyPadding: 5,
                    itemId:'testcontrollpanel',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Cada',
                                    itemId:'tst_ncada',
                                    name: 'tst_ncada',
                                    flex:1
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Unidad de tiempo',
                                    store: 'Common.store.TestTipoStore',
                                    name: 'tst_ntipo',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    displayField: 'Name',
                                    plugins: ['clearbutton'],
                                    valueField: 'Value',
                                    margin: '0 0 5 5',
                                    flex:1
                                }
                            ]
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Contar desde ultimo',
                            store: 'Common.store.TestReinicioStore',
                            name: 'tst_ireinicio',
                            forceSelection: true,
                            plugins: ['clearbutton'],
                            displayField: 'Name',
                            queryMode: 'local',
                            valueField: 'Value'
                        },  
                        {
                            xtype:'eventselecterfield',
                            itemId:'tst_calarma',
                            filter:[],
                            simpleSelect: true,
                            title: getLocale('Alarma a generar'),
                            limitEventSelect: 30
                        },
                        {
                            xtype:'eventselecterfield',
                            itemId:'tst_cAlarmaAutoprocesa',
                            filter:[],
                            simpleSelect: false,
                            title: getLocale('Autoproceso de Alarma a generar'),
                            limitEventSelect: 30
                        }
                    ]
                }, // cierro test
                {
                    xtype: 'panel',
                    border: 0,
                    collapsible: true,
                    title: 'Test GPRS',
                    layout: 'anchor',
                    bodyPadding: 5,
                    items: [
                        {
                                xtype: 'container',
                                layout: 'hbox',
                                items:[
                                    {
                                        xtype: 'numberfield',
                                        fieldLabel: 'Cada',
                                        name: 'tst_ncada2',
                                        itemId:'tst_ncada2',                                    
                                        flex:1
                                    },
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Unidad de tiempo',
                                        store: 'Common.store.TestTipoStore',
                                        name: 'tst_ntipo2',
                                        plugins: ['clearbutton'],
                                        queryMode: 'local',
                                        forceSelection: true,
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        margin: '0 0 5 5',
                                        flex:1
                                    }
                                ]
                        },
                        {
                            xtype:'checkbox',
                            fieldLabel:'Controlar todos los eventos',
                            labelWidth: 250,
                            itemId: 'cualquiera2'
                        },
                        {
                            xtype:'eventselecterfield',
                            itemId:'tst_calarmaesperada',
                            filter:[],
                            simpleSelect: true,
                            title: getLocale('Evento a Controlar')
                        },
                        {
                            xtype:'eventselecterfield',
                            itemId:'alarmagenerar',
                            filter:[],
                            simpleSelect: true,
                            title: getLocale('Alarma a Generar')
                        },
                        {
                            xtype:'eventselecterfield',
                            itemId:'tst_cAlarma2Autoprocesa',
                            filter:[],
                            simpleSelect: false,
                            title: getLocale('Autoproceso de Alarma a generar'),
                            limitEventSelect: 30
                        }
                    ]
                }, // cierro test alternativo
                {
                    xtype: 'panel',
                    border: 0,
                    collapsible: true,
                    title: 'Test seguidor',
                    layout: 'anchor',
                    bodyPadding: 5,
                    itemId:'testseguidorpanel',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Cada',
                                    name: 'tst_ncada3',
                                    itemId:'tst_ncada3',
                                    flex:1
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Unidad de tiempo',
                                    store: 'Common.store.TestTipoStore',
                                    name: 'tst_ntipo3',
                                    queryMode: 'local',
                                    plugins: ['clearbutton'],
                                    forceSelection: true,
                                    displayField: 'Name',
                                    valueField: 'Value',
                                    margin: '0 0 5 5',
                                    flex:1
                                }
                            ]
                        },
                        {
                            xtype:'eventselecterfield',
                            itemId:'tst_calarma3esperada',
                            filter:[],
                            simpleSelect: true,
                            title: getLocale('Evento a Controlar')
                        },
                        
                        {
                            xtype:'eventselecterfield',
                            itemId:'tst_calarma3generar',
                            filter:[],
                            simpleSelect: true,
                            title: getLocale('Alarma a Generar')
                        }
                        ,{
                            xtype:'eventselecterfield',
                            itemId:'tst_cAlarma3Autoprocesa',
                            filter:[],
                            simpleSelect: false,
                            title: getLocale('Autoproceso de Alarma a generar'),
                            limitEventSelect: 30
                        }
                    ]
                },// cierro test seguidor
                {
                    xtype: 'panel',
                    border: 0,
                    collapsible: true,
                    title: 'Control de uso del panel',
                    layout: 'anchor',
                    bodyPadding: 5,
                    itemId:'controlusopanel',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Cada (días)',
                            name: 'tst_iTiempoCtrl',
                            flex:1
                        },
                        {
                            xtype:'eventselecterfield',
                            itemId:'tst_cAlarmaCtrlGenerar',
                            filter:[],
                            simpleSelect: true,
                            title: getLocale('Alarma a generar')
                        }
                    ]
                }
		    ] // items form
        } // form
    ]// cierro items view
});