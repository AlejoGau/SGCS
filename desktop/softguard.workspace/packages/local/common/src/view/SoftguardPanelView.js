//MIGRADO2024
Ext.define('Common.view.SoftguardPanelView', {
    extend : 'Ext.panel.Panel',
	alias : 'widget.panelview',
	autoScroll : true,
	autoHeight : true,
	layout : 'fit',
	items : [{
			xtype : 'panelgridview',
    	}/*, {
    		xtype : 'reporteview'
    	}*/],
    
    initComponent: function(){
        this.callParent();
        this.down('panelgridview').record = this.record;
        this.down('panelgridview').module = this.module;
		this.down('panelgridview').editorConfig = this.editorConfig;
    }
});