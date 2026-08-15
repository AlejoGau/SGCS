//MIGRADO2024
Ext.define('Common.view.EncuestaReporteListadoTextosView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.encuestaslistadotextosview',
    layout : {
        type : 'hbox',
        align: 'stretch'
    },
    items : [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border : false,
            width:'100%'
        }
    ],
    activeHelp:true,
    initComponent: function(){
        this.callParent();
       
         
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Imprimir',
                    iconCls : 'icon-printer',
                    handler: function(button){
                        var iframe = button.up('encuestaslistadotextosview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }
                },{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 420,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [{
                                    
                            },{
                                xtype: 'button',
                                text:'Buscar',
                                iconCls: 'icon-find',
                                action: 'search'
                            }]
                        
                        }]
                    }
                },{
                    xtype: 'button',
                    text:'Todos',
                    iconCls: 'icon-find',
                    action: 'todos'
                }
            ]// cierro items
         }); 
        //this.addDocked(toolbar);
    }
});