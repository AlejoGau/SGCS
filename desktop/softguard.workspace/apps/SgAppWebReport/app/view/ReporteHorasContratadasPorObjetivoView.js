Ext.define('SgAppWebReport.view.ReporteHorasContratadasPorObjetivoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportehscontratadasobjectview',
 
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
                        var iframe = button.up('reportehscontratadasobjectview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [{
                                                xtype: 'datefield',
                                                name: 'fechaDesde',
                                                itemId:'fechaDesde',
                                                fieldLabel: 'Fecha Desde',
                                                bindToModel : false,
                                                width: 230,
                                                //plugins : ['clearbutton']
                                            },{
                                                xtype: 'datefield',
                                                name: 'fechaHasta',
                                                itemId:'fechaHasta',
                                                fieldLabel: 'Fecha Hasta',
                                                bindToModel : false,
                                                width: 230,
                                                //plugins : ['clearbutton']
                                            },{
                                                xtype:'fieldset',                                                    
                                                padding:'0 0 0 0',
                                                border:0,
                                                layout: 'hbox',
                                                margin:'0 0 10 0',
                                                items:[
                                                    {
                                                        xtype:'button',
                                                        text     : 'Seleccione una cuenta',
                                                        iconCls: 'icon-find',
                                                        itemId: 'seleccionarcuenta',
                                                        margin:'0 10 0 0',
                                                        action : 'seleccionarCuenta'
                                                    },{
                                                        xtype:'button',
                                                        text     : '',
                                                        iconCls: 'icon-cancel',
                                                        itemId: 'sacarcuenta',
                                                        hidden:true,
                                                        margin:'0 5 0 0',
                                                        listeners: {
                                                            click: function(button) {
                                                         		button.up('reportehscontratadasobjectview').down('#idcuenta').setValue('')
                                                                button.up('reportehscontratadasobjectview').down('#nombrecuenta').setValue('')
                                                                button.hide()
                                            				}
                                            			}
                                                    },{
                                                        xtype:'displayfield',                                    
                                                        itemId: 'nombrecuenta',
                                                        name:'nombrecuenta'
                                                    },{
                                                        xtype:'displayfield',
                                                        hidden:true,                                    
                                                        itemId: 'idcuenta',
                                                        name:'idcuenta'
                                                    }
                                                ]
                                            }
                                    ]}
                                
                            ]}
                 },{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                },'->',{
                    text: 'Exportar',
                    menu: {
                        xtype: 'menu',
                        items: [ {
                            xtype: 'container',
                            layout: 'vbox',
                            padding: 10,
                            items: [ {
                                xtype: 'button',
                                text: 'Exportar a Excel',
                                itemId: 'btnExportar',
                                action: 'export',
                                iconCls: 'icon-page-excel',
                                width: 170,
                            },/**  {
                                    xtype: 'button',
                                    text: 'Exportar a Csv',
                                    itemId: 'btnExportarCsv',
                                    action: 'exportCsv',
                                    iconCls: 'icon-page-excel',
                                    width: 170,
                                    margin: '10 0 0 0'
                                }, */{
                                    xtype: 'button',
                                    text: 'Exportar Contenido Split',
                                    itemId: 'btnExportarSplit',
                                    action: 'exportSplit',
                                    iconCls: 'icon-page-excel',
                                    width: 170,
                                    margin: '10 0 0 0'
                                }]
                        }]
                    }
                }
               
            ]// cierro items
         }); 

        this.addDocked(toolbar);
    }
});