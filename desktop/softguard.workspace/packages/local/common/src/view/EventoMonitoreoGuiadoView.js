//MIGRADO2024
Ext.define('Common.view.EventoMonitoreoGuiadoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventomonitoreoguiadoview',    
    ignoreDirty: true,
    title: 'Border Layout',
    layout: 'border',
    items: [
        {
            split: true,
            //title : 'Datos',
            //itemId : 'datapanel',
            layout: 'anchor',
            xtype:'panel',
            region : 'west',
            //width: 350,
            autoScroll : true,
            scroll : true,    
            collapsible : true,
            collapsed : false,
            items : [
                
                {
                    xtype: 'moduletreewrguiadoview', //implied by default
                    title: 'Pasos a seguir',
                    itemId: 'stepstree',                   
                    margins: '0 0 5 0',
                    width: 500,
                    height:400,
                    collapsible: true,
                    layout: 'fit',
                    collapsed : false,
                    expanded:true,
                    autoScroll : true,
                    scroll : true
                },{
                    xtype: 'container',
                    layout: {
                        type: 'table',
                        columns: 2
                    },
                    defaults: {
                        xtype: 'button',
                        margin: '0 5 5 0'
                    },
                    items: [
                        //{text: 'Freedom',width: 150, itemId: 'freedomButton', action: 'freeom'},
                        {text: 'Procesar',width: 150, itemId: 'procesarButton', action: 'procesa', disabled: true},
                        {text: 'Proceso Multiple', width: 150, itemId: 'procesomultipleButton',action: 'procesarmultiple', disabled: true},
                        {text: 'Horario Alternativo', width: 150, itemId: 'posponercierreButton' },
                        {text: 'Supervisor', width: 150, itemId: 'supervisorButton', action: 'supervision'},
                        {text: 'A Prueba', width: 150, itemId: 'apruebaButton', action: 'estado'},
                        {
                            xtype: 'container',
                            //style: 'border: 1px solid #000;', 
                            layout: 'vbox',
                            width: 150,
                            items: [
                                {xtype: 'numberfield', labelWidth: 50, width: 140, itemId: 'minutosEspera', value: 1, minValue: 1, maxValue: 24, fieldLabel: 'Minutos Espera'},
                                {xtype: 'button', width: 150, text: 'Espera', itemId: 'esperaButton', action: 'espera'},                        
                            ]                                
                        }                        
                    ]
                },{
                    xtype: 'displayfield',
                    
                    anchor: '25%',
                    fieldStyle: {
                        fontSize: "20px",
                        height: "auto",
                        fontWeight: "bold",
                        color: '#2196F3',
                        marginTop: "0px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        
                    },
                    itemId: 'textoGuiado',
                }
            
            ]
        },{
            split: true,
            title : 'Datos',
            itemId : 'datapanel',
            layout:'vbox',
            xtype:'panel',
            hidden: true,
            region : 'east',
            width: 220,
            autoScroll : false,
            scroll : false,    
            collapsible : true,
            collapsed : true,
            items : [
                
                {
                    xtype: 'moduletreeview', //implied by default
                    title: 'Datos variables',
                    itemId: 'datosvariablestree',                   
                    margins: '0 0 5 0',
                    width: 200,
                    height:150,
                    collapsible: true,
                    layout: 'fit',
                    collapsed : false,
                    expanded:true,
                    autoScroll : false,
                    scroll : false
                },{
                    xtype: 'moduletreeview', //implied by default
                    title: 'Datos de la cuenta',                    
                    itemId: 'datoscuentatree',      
                    margins: '0',
                    width: 200,
                    flex:1,
                    collapsible: true,
                    layout: 'fit',
                    expanded:true,
                    collapsed : false,
                    autoScroll : true
                }
            ]
        }
        
        
        
        ,{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0'
        }
    ],
    
    initComponent: function(){
        this.callParent();
        
        //this.down('#datoscuentatree').targetTab = this.down('tabpanel');
        this.down('#stepstree').targetTab = this.down('tabpanel');
    },
    listeners: {
        tabchange: function(tabPanel, newCard, oldCard) {
            console.log(arguments);
            //newCard.show(); // Forzar a que el nuevo tab se muestre
            // Alternativamente, ajustar el CSS directamente si es necesario
            //newCard.getEl().setStyle('display', 'block');
        }
    }
});