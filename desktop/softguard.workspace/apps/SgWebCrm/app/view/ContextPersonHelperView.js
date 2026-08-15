Ext.define('SGWebCrm.view.ContextPersonHelperView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.contextpersonhelperview',    
    title: '',
    layout: 'border',
    items: [{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center', 
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    tbar: [
        {
            iconCls: '',
            text: 'Enviar Selección',
            scope: this,
            action: 'selected'
        }
    ]
});
