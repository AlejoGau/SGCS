//MIGRADO2024
Ext.define('Common.view.GeneradorEventoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.generareventoformview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 80
	},
    autoScroll:true,
	items : [
     {
        xtype: 'fieldset',
        layout: 'hbox',
        title:'Cuenta',
        items: [
                {
                    xtype:'button',
                    itemId: 'cuenta',
                    text:'Seleccione una cuenta',
                    margin:'0 10 0 0'
                },{
                    xtype:'displayfield',
                    itemId:'nombrecuenta'
                },{
                    xtype:'displayfield',
                    itemId:'idcuenta',
                    hidden:true
                }
            ]
     },{
        xtype: 'fieldset',
        layout: 'hbox',
        title:'Evento',
        items: [        
                {
                    xtype:'button',
                    text:'Seleccione un evento',
                    itemId: 'evento',
                    margin:'0 10 0 0'
                },{
                    xtype:'displayfield',
                    itemId:'nombreevento'
                },{
                    xtype:'displayfield',
                    itemId:'codevento',
                    hidden:true
                }
            ]
     },/*{
        xtype: 'datetimefield',
        fieldLabel: 'Fecha',
        itemId:'fechahora'
    }*/
    
    
    {
        xtype:'container',
        layout:'hbox',            
        margin:'0 0 5 0',
        items: [
                            
                {
                    //xtype:'datetimefield',
                    xtype:'datefield',
                    name: '',
                    fieldLabel: 'Fecha',
                    itemId:'fecha',
            		flex: 1
                },{
                    xtype: 'timefield',
                    fieldLabel: 'Hora',
                    itemId: 'hora',
                    margin: '0 0 0 5',                    
                    increment: 5,
                    labelWidth: 35,
                    flex: 1
                }
            ]
        }
    ,{
        xtype : 'combo',
        fieldLabel : 'Usuario',
        itemId: 'usuario',
		displayField : 'usu_cnombre',
		valueField : 'usu_iid',
        queryMode: 'local',
        disabled:true
    },{
        xtype : 'combo',
        fieldLabel : 'Zona',
        itemId: 'zona',
		displayField : 'zon_cdescripcion',
		valueField : 'zon_ccodigo',
        queryMode: 'local',
        disabled:true
    },{
        xtype: 'container',
        //width: 200,
        height: 60,
        style: {
            backgroundColor: '#f0f0f0',
            border: '1px solid red',
            padding: '10px',
            margin: '10px 0',
            color: 'red',
        },
        // The free text goes here
        html: 'A continuación visualizará las coordenadas del último evento con posición relacionado a la cuenta seleccionada:'
    },{
        xtype: 'fieldset',
        title:'Coordenadas',
        itemId:'cordenandas',
        hidden:false,
        padding:'0 10 10 10',
        items: [ 
            
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[{
                                xtype:'textfield',            
                                fieldLabel : 'Latitud',
                                itemId:'lat',
                                margin: '0 10 0 0'
                            },{
                                xtype:'textfield',           
                                fieldLabel : 'Longitud',
                                itemId:'long'
                            }
                        ]
                },
                {
                    xtype:'panel',
                    margin:'10 0 0 0',
                    tbar:[{
                                text : 'Dirección',
                        		menu: {
                                    xtype: 'menu',
                                    layout: 'fit',
                                    //enableKeyNav:false,
                                    height: 70,
                                    width: 250,
                                    items: [
                                        {
                                            xtype: 'form',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'address',
                                                    enableKeyEvents:true,
                                                    listeners:{
                                                        keyup:function(o, e){
                                                            if(e.button==31){    
                                                                this.setValue(this.getValue() + " ");
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Mostrar',
                                                    itemId: 'btnAddress'
                                                }
                                            ]
                                        }
                                        
                                    ]
                                }
            				}  ],
                    items:[{
                            xtype: 'gmappanel6',
                            cls: 'gmappanel6',
                            itemId: 'googlemap',
                            height:200,
                            zoomLevel : 2,
                        	gmapType : 'map',
                            margin: '0 0 0 0',
                            mapConfOpts:  { 
                                scrollwheel: true, 
                                disableDoubleClickZoom: false, 
                                draggable: true, 
                                streetViewControl: true, 
                                overviewMapControl: true,
                                overviewMapControlOptions: {
                                    opened: true
                                },
                                mapTypeControlOptions: {
                                  style: 1
                                }
                            },
                           
                        }
                        ]
                }
                
                
            ]
    },{
        xtype : 'combo',
        fieldLabel : 'Geocercas/Rutas',
        itemId: 'geocercas',
    	displayField : 'Name',
		valueField : 'Id',
        queryMode: 'local',
        hidden:true,
        labelWidth : 120,
    },{
        xtype : 'combo',
        fieldLabel : 'Rutas',
        itemId: 'rutas',
        displayField : 'Name',
		valueField : 'Id',
        queryMode: 'local',
        hidden:true
    },{
        xtype:'textarea',
        name:'nota',
        itemId:'nota',
        fieldLabel:'Nota',
        hidden:true,
        //width:'100%',
        width: 300,
        labelWidth : 80
    }
        
    
    
 
    ],
	buttons : [{
		text : 'Generar',
        action: 'save',
        itemId: 'save'
        
	}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});