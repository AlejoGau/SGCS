Ext.define('SgAppWebReport.view.ReporteCuentasFaltaActivacionView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportecuentafaltaactivacionview',
 
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
                        var iframe = button.up('reportecuentafaltaactivacionview').down('#Iframe');
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
                                                fieldLabel : 'Estado de Cuenta',
                                                xtype : 'combobox',
                                                itemId : 'estadoCuenta',
                                                //multiselect : false,
                                                editable : false,
                                                queryMode : 'local',
                                                displayField : 'Name',                    
                                                valueField : 'Value',
                                                width : 230,
                                                store : 'SoftguardEstadoEstadoStore',
                                                //plugins: ['clearbutton']
                                                
                                            },{
                                                xtype : 'numberfield',
                                                itemId : 'cantidaddias',
                                                fieldLabel :'Dias',
                                                value : 15,
                                                width : 230
                                            },{
                                                xtype: 'combo',
                                                itemId: 'comboregistros',
                                                fieldLabel: 'Cantidad de registros',
                                                width : 230,                                               
                                                store: [
                                                        [25,25],
                                                        [50,50],
                                                        [75,75],
                                                        [100,100],
                                                        [250,250],
                                                        [500,500]
                                                    ]
                                            },
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
            /*    {
                    xtype: 'displayfield',
                    text:'Cuenta',
                    itemId: 'nombrecuenta'
                },{
                    xtype: 'displayfield',
                    itemId: 'idcuenta',
                    hidden:true
                    
                }
                
                
                
                ,
                
                
                {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Pendiente',
                    action: 'pendiente',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId:'pendiente-btn'
                },{
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Asignado',
                    action: 'asignado',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId:'asignado-btn'
                },{
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Ejecución',
                    action: 'enejecucion',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId:'enejecucion-btn'
                },{
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Finalizado',
                    action: 'finalizado',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId:'finalizado-btn'
                },{
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'Cancelado',
                    action: 'cancelado',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId:'cancelado-btn'
                },"-",
                {
                    text : 'Filtros',
                    menu: {
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    
                                    {
                                        fieldLabel: 'Por tecnico',
                                        xtype: 'combobox',
                                        itemId: 'tecnicos',
                                        multiselect : false,
                                        editable : false,
                                        queryMode: 'local',
                                        displayField: 'tec_cnombre',                    
                                        valueField: 'tec_ccodigo',
                                        labelWidth: 100
                                        
                                    },
                                    {
                                        xtype : 'numberfield',
                            			fieldLabel : 'Numero',
                    					name : "numero",
                    					itemId : 'numero',
                                        labelWidth: 100
                    				},
                                    {
                                		xtype : 'datefield',
                    					fieldLabel : 'Desde',
                    					name : "fdesde",
                    					bindToModel : false,
                    					itemId : 'fechadesde',
                                        labelWidth: 100
                    				}, {
                    					xtype : 'datefield',
                    					fieldLabel : 'Hasta',
                    					itemId : 'fechahasta',
                    					bindToModel : false,
                    					name : "fhasta",
                                        labelWidth: 100
                    				},{
                                        xtype: 'button',
                                        text:'Buscar',
                                        iconCls: 'icon-find',
                                        action: 'search'
                                    }
                                ]
                            }
                
                        ]
                    }
                },
                
                {
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'todos'
                },'-',{
                    text : 'Agrupar',
            		menu: {
                        xtype: 'menu',
                        width: 220,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: 'vbox',
                                items: [
                                    {
                                         xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Agrupar por cuenta',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'groupCuenta',
                                        width:200
                                    },{
                                         xtype: 'button',
                                        iconCls: 'icon-application-view-list',
                                        text: 'Agrupar por tecnico',
                                        enableToggle: true,
                                        toggleGroup: 'group',
                                        action: 'groupTecnico',
                                        width:200
                                    }
                                    
                                ]
                            }
                            
                        ]
                    }
				}*/
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});