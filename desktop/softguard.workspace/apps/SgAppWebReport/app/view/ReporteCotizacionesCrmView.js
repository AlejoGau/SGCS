Ext.define('SgAppWebReport.view.ReporteCotizacionesCrmView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportecotizacionescrmview',

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
            //src:'/handler/ReporteCotizacionesCrmHTML'
        }
        /*{
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border : false,
            width:'100%'
        }*/
    ],
    activeHelp: true,
    initComponent: function () {

        this.callParent();


        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function(button){
                        var contenido = document.getElementById('uxiframe-1020-iframeEl');
                        var iframe = button.up('reportecotizacionescrmview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        //document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [{
                                xtype: 'combo',
                                itemId: 'organizaciones',
                                fieldLabel: 'Organizacion',
                                queryMode: 'local',
                                valueField: 'sId',
                                displayField: 'Name'
                            },
                            {
                                xtype: 'datefield',
                                itemId: 'date',
                                fieldLabel: 'Fecha probable'
                            }, {
                                xtype: 'datefield',
                                itemId: 'datecreate',
                                fieldLabel: 'Fecha creacion'
                            }, {
                                xtype: 'combo',
                                displayField: 'Name',
                                queryMode: 'local',
                                itemId: 'estados',
                                valueField: 'Value',
                                editable: false,
                                fieldLabel: 'Estado'
                            }]
                        }]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, '-', {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    action: 'getall',
                    itemId: 'getall'
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