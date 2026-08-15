Ext.define('SgAppWebReport.view.ReporteEventosPorOperadorView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reporteeventosporoperadorview',
 
    layout : {
        type : 'hbox',
        align: 'stretch'
    },
    items : [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
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
                },{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 400,
                        height: 400,
                        items: [
                                {
                                    xtype: 'panel',
                                    //bodyPadding: 5,
                                    layout: 'vbox',
                                    
                                    height: 380,
                                    items: [
                                {
                                    xtype : 'combo',
                                	fieldLabel : 'Tabla Histórico',
                                    width: 280,
                        			displayField : '_periodo',
                                    queryMode: 'local',
                        			valueField : 'c_periodo',
                                    //anchor: '100%',
                                    itemId: 'combohistorico',                                    
                                    //multiSelect: true,
                                    name:'tablahistorico',
                                    //plugins: ['clearbutton']

                                }

                                            ,{
                                                /*xtype : 'textfield',
                                                fieldLabel : 'Código de alarma desde',
                                                
                                                itemId: 'alarmaDesde',
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                margin:'0 0 0 3',
                                                //labelWidth: 110,
                                                width: 208,
                                                name:'alarmaDesde' */   

                                                xtype : 'combo',
                                                fieldLabel : 'Código de alarma desde',                                                          
                                                itemId: 'alarmaDesde',
                                                displayField : 'Descripcion',
                                                queryMode: 'local',
                                                valueField : 'cod_ccodigo',
                                                //plugins : ['clearbutton'],
                                                name : "alarmaDesde",
                                                //multiSelect: true,
                                                //margin:'0 0 0 3',
                                                width: 280
                                                



                                                
                                            },{                                            
                                                /*xtype : 'textfield',
                                                fieldLabel : 'Código de alarma hasta',
                                                
                                                itemId: 'alarmaHasta',
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                margin:'0 0 0 3',
                                                //labelWidth: 110,
                                                width: 208,
                                                name:'alarmaHasta'   */
                                                xtype : 'combo',
                                                fieldLabel : 'Código de alarma hasta',                                                          
                                                itemId: 'alarmaHasta',
                                                displayField : 'Descripcion',
                                                queryMode: 'local',
                                                valueField : 'cod_ccodigo',
                                                //plugins : ['clearbutton'],
                                                //margin:'0 0 0 3',
                                                width: 280,                                                
                                                name : "alarmaHasta"
                                                //multiSelect: true,
                                                                                                                                                
                                            },{
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
                                                displayField : 'lin_crazonsocial',
                                                valueField : 'lin_ccodigo',
                                                //margin:'0 0 0 3',
                                                width: 280,            
                                                //plugins : ['clearbutton'],
                                                queryMode: 'local'                                                  
                                                
                                            },{
                                                /*xtype : 'textfield',
                                                fieldLabel : 'Dealer hasta',
                                                width: 208,
                                                itemId: 'dealerHasta',
                                                enforceMaxLength: true,
                                                margin:'0 0 0 3',
                                                maxLength: 3,
                                                //labelWidth: 110,
                                               
                                                name:'dealerHasta'*/
                                                xtype : 'combo',
                                                fieldLabel : 'Dealer',
                                                itemId: 'dealerHasta',
                                                name : 'dealerHasta',
                                                store : 'TablaLineasStore',
                                                displayField : 'lin_crazonsocial',
                                                valueField : 'lin_ccodigo',
                                                //plugins : ['clearbutton'],
                                                //margin:'0 0 0 3',
                                                width: 280,            
                                                queryMode: 'local'                                                     
                                                
                                            },{
                                                xtype : 'textfield',
                                                itemId: 'cuentaDesde',
                                                fieldLabel : 'Cuenta desde', 
                                                width: 230,
                                                //margin:'0 0 0 3',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                
                                                //labelWidth: 110,
                                                
                                                name:'cuentaDesde'
                                            },{
                                                xtype : 'textfield',
                                                itemId: 'cuentaHasta',
                                                fieldLabel : 'Cuenta hasta', 
                                                width: 230,
                                                //margin:'0 0 0 3',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                
                                                //labelWidth: 110,
                                                
                                                name:'cuentaHasta'
                                            },{
                                                /*xtype : 'textfield',
                                                itemId: 'operadorDesde',
                                                fieldLabel : 'Operador desde', 
                                                margin:'0 0 0 3',
                                                
                                                
                                                //labelWidth: 110,
                                                width: 280,
                                                name:'operadorDesde'*/
                                                xtype: 'combo',
                                                itemId: 'operadorDesde',
                                                fieldLabel: 'Operador desde',
                                                displayField : 'ope_cnombre',
                                                valueField : 'ope_clogin',
                                                queryMode: 'local',
                                                //plugins : ['clearbutton'],
                                                //margin:'0 0 0 3',    
                                                width: 280                                             
                                            },{
                                                /*xtype : 'textfield',
                                                itemId: 'operadorHasta',
                                                fieldLabel : 'Operador hasta', 
                                                margin:'0 0 0 3',
                                                
                                                //labelWidth: 110,
                                                width: 280,
                                                name:'operadorHasta'*/
                                                xtype: 'combo',
                                                itemId: 'operadorHasta',
                                                fieldLabel: 'Operador hasta',
                                                displayField : 'ope_cnombre',
                                                valueField : 'ope_clogin',
                                                //plugins : ['clearbutton'],
                                                queryMode: 'local',
                                                //margin:'0 0 0 3',    
                                                width: 280                                                 
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