
Ext.define('SgAppWebReport.view.ReporteUltimoEventoCuentaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reporteultimoeventocuentaview',
 
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
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function(button){
                        var iframe = button.up('reporteultimoeventocuentaview').down('#Iframe');
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
                                        		xtype : 'datefield',
                            					fieldLabel : 'Fecha desde',
                            					name : "fechadesde",
                            					bindToModel : false,
                            					itemId : 'fechadesde'
                            				},{
                            					xtype : 'datefield',
                            					fieldLabel : 'Fecha hasta',
                            					itemId : 'fechahasta',
                            					bindToModel : false,
                            					name : "fhasta"
                            				},{
                                                xtype: 'fieldset',
                                                itemId: 'evento',
                                                title: 'Evento',
                                                layout: 'vbox',
                                                width: 390,
                                                items: [{                                                                                           
                                                    xtype : 'combo',
                                                    fieldLabel : 'Codigo alarma',                                                          
                                                    itemId: 'codigoalarma',
                                                    displayField : 'Descripcion',
                                                    queryMode: 'local',
                                                    valueField : 'cod_ccodigo',
                                                    name : "cod_cdescripcion",
                                                    multiSelect: true,
                                                    width:'100%'
                                                }]
                                            },{
                                                xtype: 'fieldset',
                                                itemId: 'rango',
                                                title: 'Cuentas',
                                                layout: 'vbox',
                                                width: 390,
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        margin:'0 0 5 0',
                                                        items:[
                                                                {
                                                                    xtype : 'textfield',
                                    	                            fieldLabel : 'Dealer desde',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 3,
                                                                    itemId: 'dealerdesde',
                                                                    width:150
                                                                },
                                                                {
                                                                    xtype : 'textfield',
                                                                    itemId: 'cuentadesde',
                                                                    fieldLabel : 'Cuenta desde',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 4,
                                                                    width:170,
                                                                    labelWidth:115,
                                                                    margin:'0 0 0 7'
                                                            	}
                                                            ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        margin:'0 0 5 0',
                                                        items:[
                                                                {
                                                                    xtype : 'textfield',
                                                                    fieldLabel : 'Dealer hasta',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 3,
                                                                    itemId: 'dealerhasta',
                                                                    width:150
                                                                },{
                                                                    xtype : 'textfield',
                                                                    itemId: 'cuentahasta',
                                                                    fieldLabel : 'Cuenta hasta', 
                                                                    enforceMaxLength: true,
                                                                    maxLength: 4,
                                                                    width:170,
                                                                    labelWidth:115, 
                                                                    margin:'0 0 0 7'
                                                                }
                                                            ]
                                                    }
                                                
                                                    ,{
                                                        xtype : 'textfield',
                        	                            fieldLabel : 'Nombre',
                                                        itemId: 'nombre',
                                                        width:'100%' 
                                                    }, {
                                                        xtype: 'combo',
                                                        itemId: 'comboestado',
                                                        fieldLabel: 'Estado',
                                                        displayField : 'Name',
                                            			valueField : 'Code',
                                                        store: 'SoftguardEstadoEstadoStore',
                                                        queryMode: 'local',
                                                        width:'100%'  
                                                    }
                                                ]
                                            }
                                            
                                        ]
                                }
                                
                            ]
                    }
                },{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    itemId: 'buscar',
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