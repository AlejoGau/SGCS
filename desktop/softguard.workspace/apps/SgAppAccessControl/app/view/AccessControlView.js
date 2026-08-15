Ext.define('SgAppAccessControl.view.AccessControlView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.accesscontrol',
    layout: 'border',
    items: [
        {
            xtype:'panel',
            region:'north',
            layout:'fit',
            align:'stretch',
            itemId:'northPanel',
            items:[
                {
                    xtype:'image',
                    id:'bannerId',
                    height:80,
                    with: 400,
                    align:'stretch'//,
                    //autoEl:{
                    //    style:'position:absolute;top:15px;left:426px;',
                    //    tag:'img',
                        //src:'https://gcs.softguard.com/MisAccesos/assets/SPH/21313.jpg'
                    //}                    

                }
            ]
        }
        ,{
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center'//,
        //margins: '5 5 5 5'
    }],
    
    initComponent: function () {
        this.callParent();
    }
});