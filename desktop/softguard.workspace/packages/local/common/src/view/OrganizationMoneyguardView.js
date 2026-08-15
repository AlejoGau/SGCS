//MIGRADO2024
Ext.define('Common.view.OrganizationMoneyguardView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.moneyguardview','widget.organizationmoneyguardview'],
    title: 'Border Layout',
    layout: 'border',
    activeHelp:true,
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
        margins: '5 0 0 0'
    }]
});