Ext.define('SgAppWebReport.view.ReporteCotizacionesVencidasCrmView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportecotizacionesvencidascrmview',
 
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
                        var iframe = button.up('reportecotizacionesvencidascrmview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },
                 {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [
                                {
                                    xtype: 'datefield',
                                    itemId: 'date',
                                    fieldLabel: 'Fecha probable'
                                }]
                        }]
                   }
                 },{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search',
                    itemId: 'buscar'
                },'-',{
                    iconCls: 'icon-find',
                    text: 'Todos',
                    action: 'getall',
                    itemId: 'getall'
                },'->',{
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }
               
            ]// cierro items
         }); 

        this.addDocked(toolbar);
    }
});