//MIGRADO2024
Ext.define('Common.view.SoftguardSmsPanelView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.smsview',
	autoScroll : true,
	autoHeight : true,
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
	items : [{
			xtype : 'textarea',
			fieldLabel : 'Ubicación',
            hidden: true
		}/*,{
			xtype : 'softguardsmsgridview',
            flex: 1
    	}*/,{
        	xtype : 'reporteview',
            flex: 1
    	}],
    
    initComponent: function(){
        this.callParent();
      /*  this.down('softguardsmsgridview').module = this.module;
        this.down('softguardsmsgridview').profile = this.profile;
        this.down('softguardsmsgridview').record = this.record;
        this.down('softguardsmsgridview').security = this.security;
        this.down('softguardsmsgridview').rigths = this.rigths;
        this.down('softguardsmsgridview').targetTab = this.targetTab;*/
        this.down('#pushview').profile = this.profile;
        this.down('#pushview').module = this.module;
        this.down('#pushview').record = this.record;
        
         this.down('#mailview').profile = this.profile;
        this.down('#mailview').module = this.module;
        this.down('#mailview').record = this.record;
        
         this.down('#smsview').profile = this.profile;
        this.down('#smsview').module = this.module;
        this.down('#smsview').record = this.record;
        
        this.down('reporteview').module = this.module;
        this.down('reporteview').record = this.record;
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                
                 {
                    iconCls: '',
                    text: 'Sms enviados',
                    itemId:'enviados'
                },{
                    iconCls: '',
                    text: 'Sms recibidos',
                    itemId:'recibidos'
                }]// cierro items
         }); 
        
       // this.addDocked(toolbar);
        
    }
});