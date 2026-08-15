Ext.define('ResourceModule.view.ResourceNorthView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.resourcenorthview',

    initComponent: function(){
        var me = this;

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top', 
            defaults: {
                scale: 'medium' 
            },
            items: [
                {
                    text: 'Nuevo',
                    iconCls: 'icon-add' ,
                    menu: [
                        {
                            text: 'Recurso Equipamiento',
                            action: 'nuevo_equipamiento',

                        },{
                            text: 'Recurso Llave',
                            action: 'nuevo_llave'
                        },{
                            text: 'Recurso Integrante',
                            action: 'nuevo_integrante'
                        }
                    ]

                },{
                    text: 'Reportes',
                    action: 'reportes',
                    iconCls: 'icon-report'
                }
            ]
        }];

        me.callParent(arguments);

    }

});