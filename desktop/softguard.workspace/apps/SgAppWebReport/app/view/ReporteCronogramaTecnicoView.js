Ext.define('SgAppWebReport.view.ReporteCronogramaTecnicoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportecronogramatecnicoview',
 
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
                        var iframe = button.up('reportecronogramatecnicoview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },
             
                
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 420,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                                xtype: 'fieldset',
                                                title: 'Fecha hacia el cliente',
                                                layout: 'vbox',
                                                width:400,
                                                items: [
                                                       
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            margin:'0 0 5 0',
                                                            items:[
                                                                    {
                                                                		xtype : 'datefield',
                                                    					fieldLabel : 'Desde',
                                                    					name : "fechadesde",
                                                    					bindToModel : false,
                                                    					itemId : 'fechadesde',
                                                                        labelWidth:50,
                                                                        width:250
                                                    				}
                                                                ]
                                                        },{
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            margin:'0 0 5 0',
                                                            items:[
                                                                    {
                                                        				xtype : 'datefield',
                                                    					fieldLabel : 'Hasta',
                                                    					itemId : 'fechahasta',
                                                    					bindToModel : false,
                                                    					name : "fhasta",
                                                                        labelWidth:50,
                                                                        width:250
                                                    				}
                                                                ]
                                                        }                                                  
                                                        
                                                    ]
                                        },{
                                                xtype: 'fieldset',
                                                title: 'Fecha visita',
                                                layout: 'vbox',
                                                width:400,
                                                items: [
                                                       
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            margin:'0 0 5 0',
                                                            items:[
                                                                    {
                                                                    	xtype : 'datefield',
                                                    					fieldLabel : 'Desde',
                                                    					name : "fechadesdevisita",
                                                    					bindToModel : false,
                                                    					itemId : 'fechadesdevisita',
                                                                        labelWidth:50,
                                                                        width:250
                                                    				}
                                                                ]
                                                        },{
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            margin:'0 0 5 0',
                                                            items:[
                                                                    {
                                                        				xtype : 'datefield',
                                                    					fieldLabel : 'Hasta',
                                                    					itemId : 'fechahastavisita',
                                                    					bindToModel : false,
                                                    					name : "fechahastavisita",
                                                                        labelWidth:50,
                                                                        width:250
                                                    				}
                                                                ]
                                                        }                                                  
                                                        
                                                    ]
                                                },{
                                                    xtype: 'combo',
                                                    fieldLabel : 'Tecnico',
                                        			displayField : 'ins_cnombre',
                                                    queryMode: 'local',
                                        			valueField : 'ins_idKey',
                                                    itemId: 'tecnicos' 
                                                }, {
                                                    xtype: 'combo',
                                                    fieldLabel : 'Estado',                                            		
                                                    queryMode: 'local',
                                        			store: [
                                                        [2,'Asignado'],
                                                        [3,'En Ejecucion'],
                                                        [4,'Finalizado'],
                                                        [5,'Cancelado']
                                                    ],
                                                    itemId: 'estados' 
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
                },{
                        xtype: 'button',
                        text:'Todos',
                        iconCls: 'icon-find',
                        action: 'todos'
                    }
                
                
                
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});