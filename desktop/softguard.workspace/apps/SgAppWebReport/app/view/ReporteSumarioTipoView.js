Ext.define('SgAppWebReport.view.ReporteSumarioTipoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportesumariotipoview',
 
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
        //('cuentachanged');
       
         
           var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Imprimir',
                    iconCls : 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function(button){
                        var iframe = button.up('reportesumariotipoview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                }, {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 250,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                            
                                            {
                                                xtype: 'combo',
                                                itemId: 'dealer',
                                                fieldLabel: 'Tipo',
                                                displayField : 'tip_cdescripcion',
                                            	valueField : 'tip_ccodigo',
                                                allowBlank: false,
                                                queryMode: 'local',
                                                labelWidth:50
                                            }
                                        ]
                                }
                            ]
                        
                    }
                }
                
                ,{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});