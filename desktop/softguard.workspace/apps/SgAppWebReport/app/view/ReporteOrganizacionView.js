Ext.define('SgAppWebReport.view.ReporteOrganizacionView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reporteorganizacionview',
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
                        var iframe = button.up('reporteorganizacionview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },
             
                            
               {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            itemId: 'filtrosBus',
                                            title: 'Fechas',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'textfield',
                            		                        fieldLabel : 'Nombre',
                                                            itemId: 'nombre',
                                                            width: '50%'                                                           
                                                        },
                                                        {
                                                            xtype : 'textfield',
                            		                        fieldLabel : 'Provincia-Estado',
                                                            itemId: 'provest',
                                                            width: '50%'                                                           
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'textfield',
                            		                        fieldLabel : getLocale('Identificador'),
                                                            itemId: 'identificador',
                                                            width: '50%'                                                           
                                                        },
                                                        {
                                                            xtype : 'combo',
                            		                        fieldLabel : 'Grupo estado',
                                                            itemId: 'estadogrupo',
                                                            width: '50%',
                                                            store:[
                                                                [0, getLocale('Inactivo')],
                                                                [1, getLocale('Prospecto')],
                                                                [2, getLocale('En Proceso')],
                                                                [3, getLocale('Cliente')]
                                                            ],                                                          
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'textfield',
                            		                        fieldLabel : 'Identificador Fiscal',
                                                            itemId: 'IdentificadorFisc',
                                                            width: '50%'                                                           
                                                        },
                                                        {
                                                            xtype : 'combo',
                            		                        fieldLabel : 'Tipo',
                                                            itemId: 'tipo',
                                                            width: '50%',
                                                            store:[
                                                                ['CLI', getLocale('Cliente')],
                                                                ['PROV', getLocale('Proveedor')],
                                                                ['CENTRAL', getLocale('Central')],
                                                            ],                                                               
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'textfield',
                            		                        fieldLabel : 'Nombre Legal',
                                                            itemId: 'nombreLegal',
                                                            width: '50%'                                                           
                                                        }
                                                    ]
                                                }
                                            ]
                                        },{
                                            xtype: 'fieldset',
                                            itemId: 'infCompl',
                                            title: 'Informacion Complementaria',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Identificador',
                                                            itemId: 'identificadorchb',
                                                            width: '50%'                                                           
                                                        },
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Fecha Creacion',
                                                            itemId: 'fechaCreacionchb',
                                                            width: '50%'                                                           
                                                        }
                                            
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                       {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Identificador Fiscal',
                                                            itemId: 'identificadorFiscalchb',
                                                            width: '50%'                                                           
                                                        },
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Grupo Estado',
                                                            itemId: 'grupoEstadochb',
                                                            width: '50%'                                                           
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Nombre Legal',
                                                            itemId: 'nombreLegalchb',
                                                            width: '50%'                                                           
                                                        },
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Notas',
                                                            itemId: 'notaschb',
                                                            width: '50%'                                                           
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Movil',
                                                            itemId: 'movilchb',
                                                            width: '50%'                                                           
                                                        },
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Cuentas Asociadas',
                                                            itemId: 'cuentasAsociadaschb',
                                                            width: '50%'                                                           
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    width: 400,
                                                    items:[
                                                        {
                                                            xtype : 'checkbox',
                            		                        fieldLabel : 'Cod. Postal',
                                                            itemId: 'codPostalchb',
                                                            width: '50%'                                                           
                                                        }
                                                    ]
                                                }
                                            ]
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
                },'->',
                {
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