Ext.define('Common.view.ReporteServTecView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reporteservtecview',
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
                        var iframe = button.up('reporteservtecview').down('#Iframe');
                        url = iframe.src;
                        console.log("url ReporteCronogramaTecnicoController  - - - - - - ", url)
                        var contenido;
                        fetch(url)
                            .then(function (response) {
                                return response.text();
                            })
                            .then(function (body) { //Obtenemos el valor devuelto.
                                var win = Ext.create('Ext.window.Window', {
                                    title: 'Mi ventana',
                                    html: "",
                                    modal: true,
                                    //renderTo: body.replace('<body>', '<body onload="window.print()>"'),
                
                                });
                                // Abrir en una nueva pestaña
                                contenido = body.replace('BODY', 'body onload="window.print()"')
                                //var newTab;// = window.open('', '_blank');
                                //newTab.document.write(win.html);
                                let myWindow = window.open();
                                myWindow.document.write(contenido);
                                myWindow.document.close();
                                myWindow.focus();
                                myWindow.print();
                
                                //win.printMe();
                
                            });
                        
                    }*/
                },
                /*{
                    xtype: 'displayfield',
                    fieldLabel:'Cuenta',
                    itemId: 'nombrecuenta'
                },*//*{
                    xtype: 'displayfield',
                    itemId: 'idcuenta',
                    hidden:true
                    
                },{
                    xtype: 'button',
                    text:'Seleccionar Cuenta',
                    iconCls: 'icon-find',
                    action: 'buscarporcuenta',
                    itemId: 'selcuenta'
                },*/{
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'Cancelado',
                    itemId: 'cancelado',
                    action: 'cancelado',
                    enableToggle: true
                },{
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Asignado',
                    action: 'asignado',
                    enableToggle: true,
                    itemId:'asignado'
                },{
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Ejecución',
                    action: 'enejecucion',
                    enableToggle: true,
                    itemId:'enejecucion'
                }, {
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Pendiente',
                    itemId: 'pendiente',
                    action: 'pendiente',
                    enableToggle: true
                }, 
                 {
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Finalizado',
                    itemId: 'finalizado',
                    action: 'finalizado',
                    enableToggle: true
                },"-",{
                    xtype: 'button',
                    text:'Ultimos 1000',
                    iconCls: 'icon-find',
                    action: 'todos',
                    itemId:'todos'
                },{
                    text : 'Filtros',
                    itemId: 'filtros',
                    menu: {
                        width: 280,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton:'reporteservtecview #search',
                                items: [
                                    
                                   {
                                        fieldLabel: 'Por tecnico',
                                        xtype: 'combobox',
                                        itemId: 'tecnicoscombo',
                                        editable : false,
                                        queryMode: 'local',
                                        displayField: 'ins_cnombre',                    
                                        valueField: 'ins_ccodigo',
                                        labelWidth: 100,
                                        enableKeyEvents: true,
                                      //  plugins: ['clearbutton'],
                                       /* listeners: {
                                            keydown: function(obj, e) {
                                                if (e.getCharCode() == e.BACKSPACE) {
                                                    e.preventDefault();
                                                }
                                            }
                                        }*/
                                        
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
                                        fieldLabel: 'Nombre',
                                        xtype: 'textfield',
                                        itemId: 'nombre',                                        
                                        labelWidth: 100
                                        
                                    },{
                                        fieldLabel: 'Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'cuenta',                                        
                                        labelWidth: 100,
                                        validator: function (value) {
                                            var view =  this.up('reporteservtecview');
                                            if(value.length >0) {
                                                view.down('#dealercuenta').setDisabled(true)
                                                view.down('#dealer').setDisabled(true)
                                            } else {
                                                view.down('#dealercuenta').setDisabled(false)
                                                view.down('#dealer').setDisabled(false)
                                            }
                                            
                                            return true;
                                        }
                                        
                                    },{
                                        fieldLabel: 'Dealer-Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'dealercuenta',                                        
                                        labelWidth: 100,
                                        validator: function (value) {
                                            var view =  this.up('reporteservtecview');
                                            if(value.length >0) {
                                                view.down('#cuenta').setDisabled(true)
                                                view.down('#dealer').setDisabled(true)
                                            } else {
                                                view.down('#cuenta').setDisabled(false)
                                                view.down('#dealer').setDisabled(false)
                                            }
                                            return true;
                                        }
                                        
                                    },{
                                        fieldLabel: 'Dealer',
                                        xtype: 'textfield',
                                        itemId: 'dealer',                                        
                                        labelWidth: 100,
                                        validator: function (value) {
                                            var view =  this.up('reporteservtecview');
                                            if(value.length >0) {
                                                view.down('#dealercuenta').setDisabled(true)
                                                view.down('#cuenta').setDisabled(true)
                                            } else {
                                                view.down('#dealercuenta').setDisabled(false)
                                                view.down('#cuenta').setDisabled(false)
                                            }
                                            return true;
                                        }
                                        
                                    },{
                                        fieldLabel: 'Observacion',
                                        xtype: 'textfield',
                                        itemId: 'observacion',                                        
                                        labelWidth: 100
                                        
                                    },{                   
                                        xtype : 'combo',
                                        fieldLabel : 'Tipo de servicio',                    
                                        queryMode: 'local',
                                        forceSelection: true,
                                        allowBlank: true,
                                        editable: false,
                                        store: 'tip_ntipoStore',                            
                                        itemId: "tiposervicio",
                                        valueField : 'Value',
                                        labelWidth: 100,
                                        displayField : 'Name'
                                    },{
                                        xtype: 'button',
                                        text:'Buscar',
                                        iconCls: 'icon-find',
                                        action: 'search',
                                        itemId: 'search'
                                    }
                                ]
                            }
                
                        ]
                    }
                },
                "-"
                ,{
                    xtype: 'button',
                    text:'Exportar',
                    iconCls: 'icon-page-excel',
                    action: 'export'   
                }
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});
