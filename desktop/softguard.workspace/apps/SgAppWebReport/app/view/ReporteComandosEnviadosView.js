Ext.define('SgAppWebReport.view.ReporteComandosEnviadosView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportecomandosenviadosview',
 
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
                        var iframe = button.up('reporteSMSEnviadosView').down('#Iframe');
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
                                               // plugins : ['clearbutton']
                                            },{
                                                xtype: 'textfield',
                                                hidden: true,
                                                itemId: 'flagDealerSelector'
                                            },{
                                                /*xtype : 'textfield',
                                                fieldLabel : 'Dealer desde',
                                                
                                                itemId: 'dealerDesde',
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                margin:'0 0 0 3',
                                                //labelWidth: 110,
                                                width: 208,
                                                name:'dealerDesde'*/

                                                xtype : 'combo',
                                                fieldLabel : 'Dealer',
                                                itemId: 'dealerDesde',
                                                name : 'dealerDesde',
                                                store : 'TablaLineasStore',
                                                displayField : 'lin_crazonsocial',
                                                valueField : 'lin_ccodigo',
                                                //margin:'0 0 0 3',
                                                //plugins : ['clearbutton'],
                                                width: 280,            
                                                queryMode: 'local'                                                  

                                            /*},{

                                                xtype : 'combo',
                                                fieldLabel : 'Dealer',
                                                itemId: 'dealerHasta',
                                                name : 'dealerHasta',
                                                store : 'TablaLineasStore',
                                                displayField : 'lin_crazonsocial',
                                                valueField : 'lin_ccodigo',
                                                //margin:'0 0 0 3',
                                                plugins : ['clearbutton'],
                                                width: 280,            
                                                queryMode: 'local'  */                                                   

                                            },{
                                                xtype : 'textfield',
                                                itemId: 'cuentaDesde',
                                                fieldLabel : 'Cuenta desde', 
                                                width: 208,
                                                margin:'0 0 0 3',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                
                                                //labelWidth: 110,
                                                
                                                name:'cuentaDesde'
                                            },{
                                                xtype : 'textfield',
                                                itemId: 'cuentaHasta',
                                                fieldLabel : 'Cuenta hasta', 
                                                width: 208,
                                                margin:'0 0 0 3',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                
                                                //labelWidth: 110,
                                                
                                                name:'cuentaHasta'
                                            },{
                                                xtype : 'combo',
                                                itemId: 'estado',
                                                fieldLabel : 'Estado del comando', 
                                                margin:'0 0 0 3',
                                                store: [
                                                    [1,'Pendiente'],
                                                    [2,'En proceso'],
                                                    [3,'Procesado'],
                                                    [4,'Cancelado'],
                                                    [5,'Procesado con Error'],
                                                    [6,'Vencido']

                                                ],
                                                //plugins : ['clearbutton'],
                                                //labelWidth: 110,
                                                width: 280,
                                                name:'estado'
                                            },{
                                                xtype: 'combo',
                                                itemId: 'comboregistros',
                                                fieldLabel: 'Cantidad de registros',       
                                                //plugins : ['clearbutton'],                                     	
                                                width:'100%',                                                
                                                store: [
                                                        [500,500],
                                                        [1000,1000],
                                                        [1500,1500],
                                                        [2000,2000],
                                                        [2500,2500],
                                                        [5000,5000],
                                                        [10000,10000],
                                                        [20000,20000],
                                                        [30000,30000],
                                                        [40000,40000],
                                                        [50000,50000],
                                                        [75000,75000],
                                                        [100000,100000]
                                                    ]
                                            }


                                    ]}
                                
                            ]}
                 },{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                 },{
                    xtype: 'button',
                    text:'Todos',
                    iconCls: 'icon-find',
                    action: 'removeall'     
                },'->',{

                    xtype: 'button',
                    text: 'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                },{

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