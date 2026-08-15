Ext.define('SgAppWebReport.view.ReporteCuentaSinControlTestConfiguradoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportecuentasincontrolconfiguracionview',
 
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
    activeHelp:false,
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
                        var iframe = button.up('reportecuentasincontrolconfiguracionview').down('#Iframe');
                        var ele = iframe.getEl();
                        console.log(document.getElementById( 'iframe-' + ele.id ).contentWindow)
                        
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
                                                },{
                                                    xtype : 'textfield',
                    	                            fieldLabel : 'Nombre',
                                                    itemId: 'nombre',
                                                    width:'100%' 
                                                }
                                            ]
                                        },{
                                            xtype: 'fieldset',
                                            title: 'Test faltante',
                                            layout: 'vbox',
                                            items: [
                                                    {
                                                        xtype: 'checkboxgroup',
                                                        name: 'chk_group',
                                                        itemId:'incluirchecks',
                                                        columns: 2,
                                                        vertical: true,
                                                        hideLabel : true,
                                                        fieldLabel:'Incluir',
                                                        width:400,
                                                        defaults: {
                                                            name: 'chk_group',
                                                            listeners: {
                                                                scope: this,
                                                                change: function(chkbox) {
                                                                    if (chkbox.checked) {
                                                                        resetBoxes(chkbox.ownerCt, chkbox.inputValue);
                                                                        }}
                                                                        }
                                                                    },                   
                                                        items: [
                                                                {
                                                                    boxLabel: 'Test telefonico',
                                                                    itemId: 'telefonico',
                                                                    inputValue: 'telefonico',
                                                                    checked:true
                                                                },{
                                                                    boxLabel: 'Test telefonico + Test GPRS',
                                                                    itemId: 'telefonicoGPRS',
                                                                    inputValue: 'telefonicoGPRS'
                                                                },{
                                                                    boxLabel: 'Test GPRS',
                                                                    itemId: 'GPRS',
                                                                    inputValue: 'GPRS'
                                                                },{
                                                                    boxLabel: 'Todos los test',
                                                                    itemId: 'test',
                                                                    inputValue: 'test'
                                                                },{
                                                                    boxLabel: 'Test seguidor',
                                                                    itemId: 'seguidor',
                                                                    inputValue: 'seguidor' 
                                                                }]
                                                            }]
                                                        },]
                                                    }                              
                                                ]
                                            }
                                        }
                
                ,{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                },{
                    xtype: 'button',
                    text:'Ver Todas',
                    iconCls: 'icon-find',
                    action: 'all'
                },'->',
                 {
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }
               
            ]// cierro items
         }); 

         function resetBoxes(group, val) {
            var selecter = 'checkbox[inputValue!=' + val + ']';
            var boxes = group.query(selecter);
            console.log(val)
            Ext.each(boxes, function(box) {
                box.setValue(false);
            });
        }



        this.addDocked(toolbar);
    }
});