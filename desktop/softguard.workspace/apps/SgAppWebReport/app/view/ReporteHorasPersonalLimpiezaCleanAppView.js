Ext.define('SgAppWebReport.view.ReporteHorasPersonalLimpiezaCleanAppView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportehoraspersonallimpiezacleanappview',
 
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
                        var iframe = button.up('reportehoraspersonallimpiezacleanappview').down('#Iframe');
                        var ele = iframe.getEl();
                
                        var content = ele.dom.ownerDocument.body.innerHTML;

                        var win = window.open();
                        win.document.write(content);


                        win.print();
                        
                    }*/
                },
                 {
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
                                                xtype: 'datefield',
                                                name: 'fechaDesde',
                                                itemId:'fechaDesde',
                                                fieldLabel: 'Fecha Desde',
                                                bindToModel : false,
                                                width: 230,
                                                //plugins : ['clearbutton']
                                            },{
                                                xtype: 'datefield',
                                                name: 'fechaHasta',
                                                itemId:'fechaHasta',
                                                fieldLabel: 'Fecha Hasta',
                                                bindToModel : false,
                                                width: 230,
                                                //plugins : ['clearbutton']
                                            },{
                                                xtype: 'textfield',
                                                fieldLabel : 'Nombre',
                                            	//displayField : 'usu_cnombre',
                                                //queryMode: 'local',
                                    			//valueField : 'usu_iid',
                                                itemId: 'vigilador',
                                                width: 230
                                            }
                                        ]
                                }
                                
                            ]
                   }
                 } ,{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
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