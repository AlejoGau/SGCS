Ext.define('SgAppWebReport.view.InformeCuentaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.informecuentaview',
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
                        var iframe = button.up('informecuentaview').down('#Iframe');
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
                                            itemId: 'rango',
                                            title: 'Cuentas',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin:'0 0 5 0',
                                                    items:[
                                                            {
                                                                xtype : 'textfield',
                            		                            fieldLabel : 'Dealer',
                                                                itemId: 'dealer',
                                                                width:150
                                                            },
                                                            {
                                                                xtype : 'textfield',
                                                                itemId: 'cuentadesde',
                                                                fieldLabel : 'Cuenta desde',
                                                                enforceMaxLength: true,
                                                                maxLength: 4,
                                                                labelAlign: 'right',
                                                                width:160, 
                                                                labelWidth:110,
                                                                margin:'0 0 0 7',
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
                                                                itemId: 'cuentahasta',
                                                                fieldLabel : 'Cuenta hasta', 
                                                                enforceMaxLength: true,
                                                                maxLength: 4,
                                                                labelAlign: 'right',
                                                                width:150, 
                                                                margin:'0 0 0 167',
                                                                labelWidth:100
                                                            }
                                                        ]
                                                }
                                            
                                                ,{
                                                    xtype : 'textfield',
                    	                            fieldLabel : 'Nombre',
                                                    itemId: 'nombre',
                                                    width:'100%' 
                                                },{
                                                    xtype: 'combo',
                                                    itemId: 'comboestado',
                                                    fieldLabel: 'Estado',
                                                    displayField : 'Name',
                                        			valueField : 'Value',
                                                    store: 'SoftguardEstadoEstadoStore',
                                                    queryMode: 'local',
                                                    width:'100%'  
                                                }
                                            ]
                                        },{
                                            xtype: 'fieldset',
                                            title: 'Incluir',
                                            layout: 'vbox',
                                            items: [
                                                    {
                                                        xtype: 'checkboxgroup',
                                                        itemId:'incluirchecks',
                                                        columns: 2,
                                                        vertical: true,
                                                        hideLabel : true,
                                                        fieldLabel:'Incluir',
                                                        width:400,
                                                        items: [
                                                                {
                                                                    boxLabel: 'Usuario',
                                                                    itemId: 'chkusuarioxx', 
                                                                    checked: true
                                                                },{
                                                                    
                                                                    boxLabel: 'Telefonos',
                                                                    itemId: 'chktelefonos', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Zonas',
                                                                    itemId: 'chkzonas', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Notas',
                                                                    itemId: 'chknotas', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Horarios',
                                                                    itemId: 'chkhorarios', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Situacion',
                                                                    itemId: 'chksituacion', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Infoamcion Medica',
                                                                    itemId: 'chkinfoamcionmedica', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Falsa Alarma / Test',
                                                                    itemId: 'chkfalsaalarma', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Paneles',
                                                                    itemId: 'chkpaneles', 
                                                                    checked: true
                                                                },{
                                                                    xtype: 'checkbox',
                                                                    boxLabel: 'Respuesta Automatica / Mails por Eventos',
                                                                    itemId: 'chkrespuestautomatica', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Clave',
                                                                    itemId: 'chkclave', 
                                                                    checked: true
                                                                },{
                                                                    boxLabel: 'Conexion Celular',
                                                                    itemId: 'chkcelular', 
                                                                    checked: true
                                                                }
                                                            ]
                                                    }
                                                ]
                                        },{
                                            xtype: 'fieldset',
                                            title: 'Ordenar',
                                            layout: 'vbox',
                                            items: [{
                                                xtype: 'radiogroup',
                                                itemId:'ordenerradios',
                                                width:400,
                                                items: [
                                                    { xtype: 'radio', fieldLabel: 'Por Cuenta', itemId:'cue_ncuenta',name:'orden', checked: true},
                                                    { xtype: 'radio', fieldLabel: 'Por Nombre', itemId:'cue_cnombre',name:'orden'},
                                                    { xtype: 'radio', fieldLabel: 'Por Calle', itemId:'cue_ccalle',name:'orden' }
                                                ]
                                            }]
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