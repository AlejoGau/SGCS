Ext.define('SgAppMapGuardWeb.view.ServTecWidgetView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.servtecwidgetview',
    title : 'Servicio tecnico',
    collapsible : false,
    items : [
       
        {   
            xtype: 'container',
            //title: 'Informacion',
            layout: 'hbox',
            items: [
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Cuenta',
                    itemId:'cue_cnombre'
                }
            ]
        }
       
    ],
    // cierro items
    initComponent: function(){
        this.callParent();
    }
});