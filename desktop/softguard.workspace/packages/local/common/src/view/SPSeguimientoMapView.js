//MIGRADO2024
function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}
Ext.define('Common.view.SPSeguimientoMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.spseguimientomapview',
    layout : 'border',
    frame : false,
    border : 0,
    items: [
        {
            xtype:'component',
            html:'<div class="direccion" style="position:absolute; top:auto; bottom:10px; left:10px;z-index: 50;; background-color:#e7e7e7;padding: 5px; border: 1px solid #c2b2b2;box-shadow: 0px 0px 12px 0px; display:none;"></div>'
        },
        
       {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            region: 'center',
            //zoomLevel : 8,
    		//gmapType : 'map',
			mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','streetViewControl','NonExistantControl']
        }
        ,{
            split: false,
            itemId : 'datapanel',
            title: 'Posiciones',
            layout:'fit',
            //floatable: true,
            //hidden: true,
            region : 'east',
            width: 500,
            //collapsed: true,
            collapsible: true,
            animCollapse: false,
            items: [               
                {
                    xtype: 'gridpanel',
                    itemId: 'gridpuntos',
                    title: '',
                    columns : [
                        {
                			xtype : 'gridcolumn',
                			//header : '&nbsp;',
                			width: 22,
                			sortable : false,
                			renderer: function(value, metadata,record){
                                var t = this;
                                var path = '/handler/getImage?u=/images/codala/'+record.get('rec_calarma')+'.png';
                                value = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                                return '<img data-qtip="'+value+'" src="'+path+'"   width=16 height=16 onerror=\'this.style.display = "none"\'>';
                            
                            }
                        },{
                            xtype : 'datecolumn',            
                            header : 'Fecha',
                            format: 'd/m/Y H:i:s',
                    		dataIndex : 'sp_tfechahora',
                			width: 100,		
                        },{
                            xtype : 'numbercolumn',            
                            header : 'Batería',
                            renderer: function(value){
                                var result = "";
                                if (value == 101){
                                    result = getLocale("Cargando");
                                } else {
                                    result = Ext.util.Format.number(value,'0');
                                }
                                return result;
                            },
                        	dataIndex : 'sp_iBatt',
                			width: 50 		
                        },{
                            xtype : 'numbercolumn',            
                            header : 'Secuencia',
                        	dataIndex : 'sp_iSecuencia',
                            renderer: Ext.util.Format.numberRenderer('0'),
                			flex: 1		
                        },{
                            xtype : 'numbercolumn',            
                            header : 'Precisión',
                        	dataIndex : 'sp_rAccuracy',
                            renderer: Ext.util.Format.numberRenderer('0'),
                			flex: 1    	
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Tiempo',
                            dataIndex : '',
                            renderer: function(value, metadata, record, rowindex, colindex, store, view){
                                var prev = store.getAt(rowindex+1);
                                if (prev){
                                    var diff = Ext.Date.getElapsed(prev.get('sp_tfechahora'), record.get('sp_tfechahora'));
                                    var ddiff = new Date(diff);
                                    var horas = ddiff.getUTCHours();
                                    var result = '';
                                    //if (horas > 0){
                                        result+= Ext.String.leftPad(horas, 2, '0')+':';
                                    //}
                                    
                                    result+=Ext.String.leftPad(ddiff.getUTCMinutes(), 2, '0')+':';
                                    result+=Ext.String.leftPad(ddiff.getUTCSeconds(), 2, '0');
                                    return result;
                                }
                                
                            },
                			flex: 1    		
                        },{
                            xtype : 'numbercolumn',            
                            header : 'Distancia',
                            dataIndex : '',
                            renderer: function(value, metadata, record, rowindex, colindex, store, view){
                                // calculo la distancia entre puntos y la sumo
                                var prev = store.getAt(rowindex+1);                  
                                if (prev){
                                    var lat1 = toRad(prev.get('sp_rLatitud'));
                                    var lon1 = toRad(prev.get('sp_rLongitud'));
                                    var lat2 = toRad(record.get('sp_rLatitud'));
                                    var lon2 = toRad(record.get('sp_rLongitud'));
                                    var R = 6371; // km radio medio de la tierra
                                    // verifico que no sea el primer punto
                                    
                                    var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
                                    var y = (lat2-lat1);
                                    distDiferencial = Math.sqrt(x*x + y*y) * R;
                                    return Ext.util.Format.number(distDiferencial*1000,'0');
                                }
                            },
                    		flex: 1    	
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Velocidad',
                            dataIndex : 'sp_iVelocidad',
                            renderer: Ext.util.Format.numberRenderer('0'),
                			flex: 1    		
                        },{
                            header:    "&nbsp;",
                            dataIndex: "gps_cMethod",
                            width:     26,
                            renderer: function(value, metaData){
                                metaData.style += "padding:0px;";
                                
                                var _method = value.toUpperCase();
                                /*
                                GPS
                                DEVICE
                                FUSE
                                NONE
                                */

                                if(_method == 'NONE') {
                                    return '<div class="icon-marker-red" title="'+getLocale('Sin acceso al GPS')+'" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> '
                                } else if(_method == 'DEVICE') {
                                    return '<div class="icon-marker-orange" title="'+getLocale('Uso del GPS solo en primer plano')+'" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> '
                                } else if(_method == 'GPS' || _method == 'FUSE') {
                                    return '<div class="icon-marker-green" title="'+getLocale('Uso full del GPS')+'" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> '
                                }

                                return '';
                            }
                        },
                    ]      
                }
            ],
            hideCollapseTool: true
        }],
    
    initComponent: function(){
        this.callParent();
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
    		items : [{
						text : 'Centrar',
						iconCls : 'icon-center',
                        enableToggle: true,
                        pressed: true,
						action : 'center'
					},'-',{
    					text : 'Filtrar Precisión',
                        enableToggle: true,
                        pressed: true,
                        action: 'filterprecision'
					},'-',{
                        xtype: 'button',
                        action: 'tiempo-1',
                        text : "10 minutos"
                    },{
                        xtype: 'button',
                        action: 'tiempo-2',
                        text : "1 hora"
                    },{
                        xtype: 'button',
                        action: 'tiempo-3',
                        text : "10 horas"
                    },{
                        xtype: 'button',
                        action: 'tiempo-4',
                        text : "1 día"
                    },'-',{
                        xtype: 'button',
                        action: 'posicion-1',
                        text : "1 posición"
                    },{
                        xtype: 'button',
                        action: 'posicion-2',
                        text : "30 posiciones"
                    },'-',
                    
                    {
                        xtype: 'datetimefield',
                        itemId: 'fechaDesde',
                        fieldLabel: 'Desde',
                        labelAlign: 'right',
                        labelWidth: 50,
                        width: 250,
                        margin: '0 5 0 0',
                        name: 'from_date',
                        value: Ext.Date.add(new Date(), Ext.Date.HOUR, -1)
                	},
                    {
                        xtype: 'datetimefield',
                        itemId: 'fechaHasta',
                        fieldLabel: 'Hasta',
                        labelAlign: 'right',
                        labelWidth: 50,
                        width: 250,
                        margin: '0 5 0 0',
                        name: 'to_date',
                        value: new Date()
                    },{
                        xtype: 'button',
                        text: 'Buscar',
                        action: 'Buscar',
                        margin: '0 5 0 0'
                    },{
                        text: 'Geocercas',
                        iconCls:'icon-geocerca',
                        enableToggle: true,
                        toggleGroup: 'geocercas',
                        itemId: 'btnGeocercas', 
                        toggleHandler: function(btn,pressed){
                            var mappanel = btn.up('spseguimientomapview').down('gmappanel6')
                            mappanel.fireEvent('mapready', mappanel);
                        }
                    }
                ]
        }); 
        this.addDocked(toolbar);
        
       
    }
    
});