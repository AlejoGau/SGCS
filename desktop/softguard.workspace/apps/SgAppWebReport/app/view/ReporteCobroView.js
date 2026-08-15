Ext.define('SgAppWebReport.view.ReporteCobroView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportecobroview',
 
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
                        var iframe = button.up('reportecobroview').down('#Iframe');
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
                                            title: 'Filtros',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype : 'textfield',
                    	                            fieldLabel : 'Nombre',
                                                    itemId: 'nombre',
                                                    width:'75%' 
                                                },
                                                {
                                                    xtype : 'numberfield',
                    	                            fieldLabel : 'DNI',
                                                    itemId: 'dni',
                                                    width:'75%' ,
                                                    hideTrigger: true
                                                },
                                                {
                                                    xtype : 'numberfield',
                    	                            fieldLabel : 'Telefono',
                                                    itemId: 'telefono',
                                                    width:'75%' ,
                                                    hideTrigger: true
                                                },
                                                {
                                                    xtype : 'datefield',
                    	                            fieldLabel : 'Fecha',
                                                    itemId: 'fecha',
                                                    width:'75%' 
                                                },{
                                                        xtype: 'checkboxgroup',
                                                        name: 'chk_estado',
                                                        itemId:'estado',
                                                        columns: 2,
                                                        vertical: true,
                                                        fieldLabel:'Estado',
                                                        width:400,
                                                        defaults: {
                                                            name: 'chk_estado',
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
                                                                    boxLabel: 'Pago',
                                                                    itemId: 'pago',
                                                                    inputValue: 'pago',
                                                                },{
                                                                    boxLabel: 'Impago',
                                                                    itemId: 'Impago',
                                                                    inputValue: 'Impago'
                                                                }]
                                                            },
                                                            {
                                                        xtype: 'checkboxgroup',
                                                        name: 'chk_metodo',
                                                        itemId:'metodo',
                                                        columns: 2,
                                                        vertical: true,
                                                        fieldLabel:'Metodo',
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
                                                                    boxLabel: 'Anual',
                                                                    itemId: 'anual',
                                                                    inputValue: 'anual',
                                                                },{
                                                                    boxLabel: 'Mensual',
                                                                    itemId: 'mensual',
                                                                    inputValue: 'mensual'
                                                                }]
                                                            }
                                            ]
                                        }]
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
                },'->'/**,
                 
                 {
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }
               */
            ]// cierro items
         }); 

         function resetBoxes(group, val) {
            var selecter = 'checkbox[inputValue!=' + val + ']';
            var boxes = group.query(selecter);
            Ext.each(boxes, function(box) {
                box.setValue(false);
            });
        }



        this.addDocked(toolbar);
    }
});
