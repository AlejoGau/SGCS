Ext.define('SgAppWebReport.view.ReporteEventosNHView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reporteeventosnhview',
 
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
                        var iframe = button.up('eventosbycuentazonaview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },"-",
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                
                                        {
                                			xtype : 'datefield',
                        					fieldLabel : 'Fecha desde',
                        					name : "fechadesde",
                        					bindToModel : false,
                        					itemId : 'fechadesde'
                        				},{
                                			fieldLabel: 'Hora desde',
                                            xtype: 'timefield',
                                            id: 'horadesde',
                                            format: 'H:i',
                                            altFormats:'H:i',
                                            increment: 10
                        				},{
                        					xtype : 'datefield',
                        					fieldLabel : 'Fecha hasta',
                        					itemId : 'fechahasta',
                        					bindToModel : false,
                        					name : "fhasta"
                        				},{
                                    		fieldLabel: 'Hora hasta',
                                            xtype: 'timefield',
                                            id: 'horahasta',
                                            format: 'H:i',
                                            altFormats:'H:i',
                                            increment: 10
                        				},{
                                            xtype: 'combo',
                                            itemId: 'combocuenta',
                                            fieldLabel: 'Dealer',
                                        	displayField : '_descripcion',
                                			valueField : 'lin_ccodigo',
                                            allowBlank: false,
                                            queryMode: 'local'
                                        }
                                    ]
                                }
                        ]
                    }
                },{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                },"-",{
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'todos'
                }
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});