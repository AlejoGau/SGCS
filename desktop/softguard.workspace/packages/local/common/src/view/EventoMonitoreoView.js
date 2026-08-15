//MIGRADO2024
Ext.define('Common.view.EventoMonitoreoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventomonitoreoview',    
    ignoreDirty: true,
    title: 'Border Layout',
    layout: 'border',
    items: [
        {
            split: true,
            title : 'Datos',
            itemId : 'datapanel',
            layout:'vbox',
            xtype:'panel',
            region : 'west',
            width: 220,
            autoScroll : false,
            scroll : false,    
            collapsible : true,
            collapsed : true,
            items : [
                
                {
                    xtype: 'moduletreeview', //implied by default
                    title: 'Datos variables',
                    itemId: 'datosvariablestree',                   
                    margins: '0 0 5 0',
                    width: 200,
                    height:150,
                    collapsible: true,
                    collapsed : false,
                    expanded:true,
                    autoScroll : false,
                    scroll : false
                },{
                    xtype: 'moduletreeview', //implied by default
                    title: 'Datos de la cuenta',                    
                    itemId: 'datoscuentatree',      
                    margins: '0',
                    flex:1,
                    collapsible: true,
                    width: 200,
                    layout: 'fit',
                    expanded:true,
                    collapsed : false,
                    autoScroll : true
                }
            ]
        }
        
        
        
        ,{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    
    initComponent: function(){
        this.callParent();
        
        this.down('#datoscuentatree').targetTab = this.down('tabpanel');
        this.down('#datosvariablestree').targetTab = this.down('tabpanel');
    },
    listeners: {
        tabchange: function(tabPanel, newCard, oldCard) {
            console.log(arguments);
            //newCard.show(); // Forzar a que el nuevo tab se muestre
            // Alternativamente, ajustar el CSS directamente si es necesario
            //newCard.getEl().setStyle('display', 'block');
        }
    }
});