Ext.define('Link.view.LinkHtmlView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.linkhtmlview',
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
                        var iframe = button.up('linkhtmlview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }
                },{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [                                        
                                        {
                                                    xtype: 'combo',
                                                    fieldLabel : 'Producto',
                                            		displayField : 'Name',
                                                    queryMode: 'local',
                                        			valueField : 'Id',
                                                    itemId: 'producto' 
                                                }
                                               
                                    ]
                                    
                              },{
                                    xtype: 'button',
                                    text:'Buscar',
                                    iconCls: 'icon-find',
                                    action: 'search'
                                }
                              
                        ]
                    }
                },"-",{
                    xtype: 'button',
                    text:'Todos',
                    iconCls: 'icon-find',
                    action: 'todos',
                    itemId:'todos'
                }
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});