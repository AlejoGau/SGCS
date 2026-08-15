//MIGRADO2024
Ext.define('Common.view.m_cuenta_videoPanelView', {
    extend : 'Ext.tab.Panel',
    alias : ['widget.videoxcuentapanelview'],
    preventHeader: true,
    frame: false,
    bodyPadding: 0,
    border : 0,
    autoScroll: false,
    items : [
        
        {
            xtype: 'cuentavideoformview',
            title: 'Link general de la cuenta',
            flex: 1,           
            itemId: 'cuentavideo',
            scroll: 'auto',
            width:'100%'
        },{
            xtype: 'videolinksgridview',
            title: 'Links de Zonas específicas',
            flex:2,
            minHeight: 150,
            itemId: 'videolinks',
            width:'100%'
        }   
              
        
    ],   
	initComponent : function() {
		this.callParent();
        this.down('cuentavideoformview').record = this.record;
        this.down('videolinksgridview').record = this.record;
        
        
        this.down('cuentavideoformview').module = this.module;
        this.down('videolinksgridview').module = this.module;
        
	} // cierro init
});