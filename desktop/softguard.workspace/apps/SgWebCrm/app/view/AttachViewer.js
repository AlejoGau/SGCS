Ext.define('SGWebCrm.view.AttachViewer', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.attachviewer',
    title : 'Viewer',
    bodyPadding : 0,    
    items: {
        xtype: 'image',
        itemId: 'attach'
    },
    initComponent : function() {
    	this.callParent();
        var record = this.record;
        var path ='/Rest/upload/get?search=attachfile&download=false&filename='+record.get('Id')+'.'+record.get('Format');
        var img = this.down('#attach');
        var Width=record.get('Width');
        var Height=record.get('Height');
        img.setSize(Width,Height);
        img.setSrc(path); 
                
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-arrow-refresh',
                    text: 'Refrescar',
                    scope: this,
                    handler:function(){
                        Width=record.get('Width');
                        Height=record.get('Height');
                        img.setSize(Width,Height);
                        path ='/Rest/upload/get?search=attachfile&download=false&filename='+record.get('Id')+'.'+record.get('Format');
                        img.setSrc(path); 
                    },
                    action: 'refresh'
                }]
        });        
        this.addDocked(toolbar);
        
	}

});