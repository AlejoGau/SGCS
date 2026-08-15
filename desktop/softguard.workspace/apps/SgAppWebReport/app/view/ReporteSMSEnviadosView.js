Ext.define('SgAppWebReport.view.ReporteSMSEnviadosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteSMSEnviadosView',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
        }
    ],
    activeHelp: true,
    initComponent: function () {

        this.callParent();
        //('cuentachanged');

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint',
                    handler: function (button) {
                        var iframe = button.up('reporteSMSEnviadosView').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [{
                                    xtype: 'datefield',
                                    name: 'fechaDesde',
                                    itemId: 'fechaDesde',
                                    fieldLabel: 'Fecha Desde',
                                    bindToModel: false,
                                    width: 230,
                                    //plugins: ['clearbutton']
                                }, {
                                    xtype: 'datefield',
                                    name: 'fechaHasta',
                                    itemId: 'fechaHasta',
                                    fieldLabel: 'Fecha Hasta',
                                    bindToModel: false,
                                    width: 230,
                                    //plugins: ['clearbutton']
                                }, {
                                    xtype: 'textfield',
                                    hidden: true,
                                    itemId: 'flagDealerSelector'
                                }, {
                                    /*xtype : 'textfield',
                                    fieldLabel : 'Dealer desde',
                                    
                                    itemId: 'dealerDesde',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    margin:'0 0 0 3',
                                    //labelWidth: 110,
                                    width: 208,
                                    name:'dealerDesde'*/

                                    xtype: 'combo',
                                    fieldLabel: 'Dealer desde',
                                    itemId: 'dealerDesde',
                                    name: 'dealerDesde',
                                    displayField: 'lin_crazonsocial',
                                    store : 'TablaLineasStore',
                                    valueField: 'lin_ccodigo',
                                    //margin:'0 0 0 3',
                                    menuContainer: true,
                                    plugins: ['clearbutton'],
                                    width: 230,
                                    queryMode: 'local'



                                }, {
                                    /*xtype : 'textfield',
                                    fieldLabel : 'Dealer hasta',
                                    width: 208,
                                    itemId: 'dealerHasta',
                                    enforceMaxLength: true,
                                    margin:'0 0 0 3',
                                    maxLength: 3,
                                    //labelWidth: 110,
                                    name:'dealerHasta'*/

                                    xtype: 'combo',
                                    fieldLabel: 'Dealer hasta',
                                    itemId: 'dealerHasta',
                                    store : 'TablaLineasStore',
                                    name: 'dealerHasta',
                                    displayField: 'lin_crazonsocial',
                                    valueField: 'lin_ccodigo',
                                    //margin:'0 0 0 3',
                                    menuContainer: true,
                                    plugins: ['clearbutton'],
                                    width: 230,
                                    queryMode: 'local'



                                }, {
                                    xtype: 'textfield',
                                    itemId: 'cuentaDesde',
                                    fieldLabel: 'Cuenta desde',
                                    width: 208,
                                    //margin: '0 0 0 3',
                                    enforceMaxLength: true,
                                    maxLength: 4,

                                    //labelWidth: 110,

                                    name: 'cuentaDesde'
                                }, {
                                    xtype: 'textfield',
                                    itemId: 'cuentaHasta',
                                    fieldLabel: 'Cuenta hasta',
                                    width: 208,
                                    margin: '0 0 0 3',
                                    enforceMaxLength: true,
                                    maxLength: 4,

                                    //labelWidth: 110,

                                    name: 'cuentaHasta'
                                }, {
                                    xtype: 'textfield',
                                    itemId: 'nombre',
                                    fieldLabel: 'Nombre desde',
                                    margin: '0 0 0 3',


                                    //labelWidth: 110,
                                    width: 230,
                                    name: 'nombre'
                                }
                                ]
                            }

                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, {
                    xtype: 'button',
                    text: 'Todos',
                    iconCls: 'icon-find',
                    action: 'removeall'
                }, '->', {
                    xtype: 'button',
                    text: 'Exportar',
                    iconCls: 'icon-page-excel',
                    action: 'export'
                }

            ]// cierro items
        });

        this.addDocked(toolbar);
    }
});