//MIGRADO2024
Ext.define('Common.view.MultimediaEventosPanelView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.multimediaeventospanelview'],
    preventHeader: true,
    autoScroll : false,
    title: 'Multimedia',
    frame: false,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 250,
        fieldWidth : 350,
        enforceMaxLength: true
    },
    layout: 'fit',
    margin : 0,
    padding : 0,
    items : [
        {
            
            xtype: 'tabpanel',
            region: 'center',
            itemId: 'tabpanel',
            autoScroll : false,
            /*layout: {
                type: 'hbox',
                align: 'stretch'
            },*/
            margin : 0,
            padding: 0,
            items: [
                    {
                        xtype:'imagenesview',
                        itemId:'imagenesview',
                        title:'Imágenes'
                    },{
                        xtype:'multimediagridview',
                        itemId:'videogridview',
                        title:'Videos'
                    },{
                        xtype:'multimediagridview',
                        itemId:'sonidogridview',
                        title:'Sonido'
                    }
                    
                
                ]
        }
       
       
    ],
	initComponent : function() {
		this.callParent();
        
        this.down('#imagenesview').record = this.record;
        
        this.down('#videogridview').record = this.record;
        this.down('#videogridview').filter = {
            property:'rxi_cTipo:IN',
            value:'webm,mp4,mpg,avi'
        };
        this.down('#sonidogridview').record = this.record;                                   
        this.down('#sonidogridview').filter = {
            property:'rxi_cTipo:IN',
            value:'mp3'
        };
        
        
        
       /* var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'x-tbar-loading',
                    text: 'Refresh',
                    scope: this,
                    action: 'refresh'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);*/
	} // cierro init
});