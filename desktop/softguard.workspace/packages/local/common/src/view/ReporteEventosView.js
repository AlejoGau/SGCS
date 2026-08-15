//MIGRADO2024
Ext.define('Common.view.ReporteEventosView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reporteeventosview',
    //requires: 'Slbf.ux.uxiframe',
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
                    action: 'btnprint',
                    /*handler: function(button){
                        var iframe = button.up('reporteeventosview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },"-",{
                    xtype: 'button',
                    text:'Filtros',
                    iconCls: 'icon-find',
                    action: 'openmenu'
                },'->',{
                    xtype: 'button',
                    text:'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                }
            ]// cierro items
        }); 
        this.addDocked(toolbar);
    }
});