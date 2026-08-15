Ext.define('SgAppWebReport.view.ReporteHistorialAsignacionesCleanAppView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportehistorialasignacionescleanappview',
 
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
                        var iframe = button.up('reportehistorialasignacionescleanappview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
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
                                                fieldLabel : 'Vigilador',
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