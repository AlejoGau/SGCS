//MIGRADO2024
Ext.define('Common.view.VideoTabPanelView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.videotabpanelview',
    title: '',
    layout: 'border',
    items: [{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0'/*,
        items: [
                {
                    xtype:'videoxgridview',
                    title:'Video Cuentas',
                    hideControls:['#addvideo','#deletevideo'],
                    module:{profile:3},
                    all:true
                },{
                    xtype:'videolinksgridview',
                    title:'Video Zonas',
                    hideControls:['#addvideo','#deletevideo'],
                    module:{profile:3},
                    all:true
                }
            ]*/
    }],
  /*  initComponent : function() {
        this.callParent(arguments);     
       
                  
    }*/ // cierro init
});