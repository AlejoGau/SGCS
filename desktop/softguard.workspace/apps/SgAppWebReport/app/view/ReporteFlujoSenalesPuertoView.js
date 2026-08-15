Ext.define('SgAppWebReport.view.ReporteFlujoSenalesPuertoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteflujosenalespuertoview',

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
                    /*handler: function (button) {
                        var iframe = button.up('reporteflujosenalespuertoview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 320,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [{
                                xtype: 'combo',
                                fieldLabel: 'Receptor',
                                itemId: 'receptorcombo',
                                width: 300,
                                editable: false,
                                /* Indico que campo de la DB que hice Bind deseo mostrar
                                 * dentro del combo, en este caso fue de TablasPanelMode                                        
                                 */
                                queryMode: 'local',
                                displayField: 'Receptor',
                                valueField: 'idReceptor',
                                //plugins: ['clearbutton']
                            }/*,
                                    {
                                        xtype : 'datefield',
                    					fieldLabel : 'Desde',
                    					name : "fdesde",
                    					bindToModel : false,
                    					itemId : 'fechadesde',
                                        labelWidth: 100,
                                        width: 300,
                    				}, {
                    					xtype : 'datefield',
                    					fieldLabel : 'Hasta',
                    					itemId : 'fechahasta',
                    					bindToModel : false,
                    					name : "fhasta",
                                        labelWidth: 100,
                                        width: 300,
                    				}*/]
                        }]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
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