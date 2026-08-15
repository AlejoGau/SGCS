Ext.define('Awcc.view.AwccPanelView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.awccpanelview',
    preventHeader: true,
    frame : false,
    
    layout: {
        type: 'vbox',
        align : 'stretch'
    },
	items : [
        {
            xtype:'container',
            layout:'hbox',
            padding:'10 10 10 10',
            style:'background-color:#f1f1f1',
            items:[                    
                    {
                        xtype:'image',
                        height:'100',
                        //src:'/desktop/images/logo_softguard_blanco.jpg',                        
                        itemId:'imagendealer',
                        style: {
                            maxWidth:'100%'
                        }
                    },{
                        xtype:'displayfield',
                        itemId:'nombredealer',
                        //value:'NOMBRE DE DEALER',
                        margin:'30 0 0 30',
                        fieldStyle  : 'font-size:30px', 
                    },{
                        xtype:'container',
                        flex:2,
                        layout     : {
                            type : 'vbox'
                        },
                        cls: 'container-right-childs',
                        items:[
                                {
                                    xtype:'displayfield',
                                    fieldLabel:'',
                                    itemId:'direccion'
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'',
                                    itemId:'telefono'
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'',
                                    itemId:'email'
                                }
                            ]
                    }
                ]
        },{
            xtype:'panel',
            itemId:'toolbar'
        },{
            xtype: 'tabpanel',
            itemId: 'awcctabpanel', 
            layout: 'fit',
            flex:1,
            items:[
                    {
                        xtype: 'cuentaconmapaview',
                        title:'Cuentas',
                        caller: 'cuentaconmapaview',
                        closable: false,
                        createTipo: '0',
                        securityId: '11',
                        exportarHide: true,
                        columnHide: 0
                    },{
                        xtype: 'spseguimientogridview',
                        title: 'Seguimiento'
                    }
                ]
        }

        
        ],

	initComponent : function() {
		this.callParent(arguments);
        
         // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
               {
            	text : 'Reporte Multi-cuenta',
    			iconCls : 'icon-reportes',
                itemId: 'btnMulticuenta',
                action: 'multicuenta',
    			view : 'multicuentagridview',
                closable: true
    		}, {
        		text : 'Eventos Tiempo Real',
    			iconCls : 'icon-monitor',
                itemId: 'btnTiempoReal',
                skipRecord: true,
    			//myurl : '/a/EventosTiempoReal',
                view : 'eventostrgridview',
                closable: true,
                hidden:true
    		},'-',{
            	text : 'Mensaje',
    			iconCls : 'icon-email',
                itemId: 'mensaje'
    		},'->',
            {
                xtype: 'displayfield',
                value: '',
                itemId: 'toolbardisplayfield',
                margin: '-10 10 0 10',
                hidden:true
            }
            ]// cierro items
         }); 
         
        
        //this.down('#toolbar').addDocked(toolbar);
        
        
	} // cierro init

});
