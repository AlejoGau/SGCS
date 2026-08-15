Ext.define( 'SgAppWebReport.view.ReporteSumarioDealersView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportesumariodealersview',
 
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
    initComponent: function() {
        this.callParent();
        //( 'cuentachanged' );
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function( button ) {
                        var iframe = button.up( 'reportesumariodealersview' ).down( '#Iframe' );
                        var ele = iframe.getEl();
                        console.log(document.getElementById( 'iframe-' + ele.id ).contentWindow)
                        document.getElementById( 'iframe-' + ele.id ).contentWindow.printMe();
                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'combo',
                                        itemId: 'dealer',
                                        fieldLabel: 'Dealer',
                                        displayField: '_descripcion',
                                        valueField: 'lin_ccodigo',
                                        queryMode: 'local',
                                        //plugins: ['clearbutton'],
                                        labelWidth: 50
                                    },
                                    {
                                        xtype: 'combo',
                                        itemId: 'sorter',
                                        fieldLabel: 'Orden',
                                        queryMode: 'local',
                                        labelWidth: 50,
                                        store:[['lin_crazonsocial','Nombre'],['lin_ccodigo','Código'],['lin_idkey','Creación']],
                                        //plugins: ['clearbutton']
                                        //width: 200
                                    }
                                ]
                            }
                        ]
                    }
                }
                , {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                },"-"/* ,{
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'todos'
                }*/
            ]// cierro items
        });

        this.addDocked( toolbar );
    }
});