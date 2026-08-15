Ext.define('SgAppWebReport.view.ReporteCuentasFalloTesteoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportecuentafallotesteoview',
 
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
                        var iframe = button.up('reportecuentafallotesteoview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 350,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
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
                                                            width:150,
                                                            enforceMaxLength: true,
                                                            maxLength: 3
                                                        },
                                                        {
                                                            xtype : 'textfield',
                                                            itemId: 'cuentadesde',
                                                            fieldLabel : 'Cuenta desde',
                                                            enforceMaxLength: true,
                                                            maxLength: 4,
                                                            width:170,
                                                            labelWidth:120,
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
                                                            itemId: 'cuentahasta',
                                                            fieldLabel : 'Cuenta hasta', 
                                                            enforceMaxLength: true,
                                                            maxLength: 4,
                                                            width:170, 
                                                            margin:'0 0 0 10',
                                                            labelWidth:120,
                                                            margin:'0 0 0 158'
                                                        }
                                                    ]
                                            },{
                                                xtype : 'textfield',
                                                itemId: 'cuentaNombre',
                                                fieldLabel : 'Nombre cuenta',
                                                width:330
                                            },{
                                                xtype:'datefield',
                                                fieldLabel : 'En fallo de testeo desde',
                                                itemId:'fallotesteodesde',
                                                width:330
                                            },{
                                                xtype:'datefield',
                                                fieldLabel : 'Ultimo control',
                                                itemId:'ultimocontrol',
                                                width:330
                                            },
                                            {
                                                xtype: 'checkbox',
                                                itemId: 'tst1',
                                                fieldLabel:'1er TST',
                                                value: 1,
                                                width:230,
                                                listeners: {
                                                    change: function (checkbox, newVal, oldVal) {
                                                        var view = checkbox.up('reportecuentafallotesteoview')
                                                        var tst1 = view.down('#tst1').getValue();
                                                        var tst2 = view.down('#tst2').getValue();
                                                        
                                                        if(tst1 == true){
                                                            view.down('#tst2').setValue(false);
                                                        }
                                                         
                                                    }
                                                }
                                            },{
                                                xtype: 'checkbox',
                                                itemId: 'tst2',
                                                fieldLabel:'2do TST',
                                                value: 1,
                                                checked: false,
                                                width:230,                                                
                                                listeners: {
                                                    change: function (checkbox, newVal, oldVal) {
                                                        var view = checkbox.up('reportecuentafallotesteoview')
                                                        var tst1 = view.down('#tst1').getValue();
                                                        var tst2 = view.down('#tst2').getValue();
                                                        
                                                        if(tst2 == true){
                                                            view.down('#tst1').setValue(false);
                                                        }
                                                    }
                                                }
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
                    itemId: 'buscar',
                    action: 'search'
                },{
                    xtype: 'button',
                    text:'Todos',
                    iconCls: 'icon-find',
                    itemId: 'todos',
                    action: 'todos'
                },'->',{
                    xtype: 'button',
                    text:'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                }
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});