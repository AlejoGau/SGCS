//MIGRADO2024
Ext.define('Common.view.MGCuentaView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.mgcuentaview'],
    title: 'Border Layout',
    layout: 'border',
    items: [/*{
        xtype: 'moduletreeview', //implied by default
        title: 'MoneyGuard',
        store : 'MoneyGuardModuleStore',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,
        layout: 'fit',
        split: true
    },*/{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0',
        items:[
            {
                title: 'Datos',
                itemId: 'datosAgregarAsignar',
                hidde: true,
                items:[
                    {
                        xtype: 'button',
                        width: 150,
                        action: 'addorganization',
                        text: 'Crear'                        
                    }/*,{
                        xtype: 'button',
                        width: 150,
                        action: 'selectorganization',
                        text: 'Asignar Organización'                          
                    }*/
                ]
            }
        ]
    }]
});