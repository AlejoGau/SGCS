//MIGRADO2024
Ext.define('Common.view.TripMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.tripmapview',
    layout : 'border',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            region: 'center',
            //zoomLevel : 8,
    		//gmapType : 'map',
			mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','streetViewControl','NonExistantControl']
        },{
            split: false,
            itemId : 'datapanel',
            title: 'Datos',
            layout:'accordion',
            region : 'east',
            width: 400,
            collapsible: true,
            animCollapse: false,
            items: [    
                {
                    xtype : 'triproview',
                    title: 'Viaje',
                    autoScroll: true,
                    itemId: 'triproview',
                    collapsed : false
                },{
                    xtype : 'tgresumenview',
                    title: 'Resumen',
                    autoScroll: true,
                    itemId: 'tgresumenview',
                    collapsed : false
                },{
                    xtype : 'form',
                    title: 'Datos extra',
                    itemId: 'datosextra',
                    fieldDefaults : {
                        labelWidth : 150,
                        anchor : '100%',
                        labelAlign: 'left'					
                    },
                    autoScroll: true,
                    hidden: true
                },{
                    xtype : 'tripclienteroview',
                    itemId: 'tripclienteroview',
                    title: 'Cliente',
                    autoScroll: true
                },
                {
                    xtype : 'triptransportistaroview',
                    itemId: 'triptransportistaroview',
                    title: 'Transportista',
                    autoScroll: true
                },           
                {
                    xtype: 'gridpanel',
                    itemId: 'gridpuntos',
                    title: 'Posiciones',
                    columns : [
                        {
                			xtype : 'gridcolumn',
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
                    		dataIndex : 'gps_isorawfechahora',
                			flex: 1,		
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Batería',
                    		dataIndex : 'gps_iBattery',
                			flex: 1,
                            renderer : function(value, metadata,record) {
                                if(record.get('gps_iBattery') == 0) {
                                    return ''
                                } else {
                                    return record.get('gps_iBattery')
                                }
                            }
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Nivel de señal',
                    		dataIndex : 'gps_iNivelSenial',
                			flex: 1,
                            renderer : function(value, metadata,record) {
                                if(record.get('gps_iNivelSenial') <= -98) {
                                    return '<img src="/resources/softguard/images/signal/1.png" />'
                                } else if (record.get('gps_iNivelSenial') >= -97 && value <= -90) {
                                    return '<img src="/resources/softguard/images/signal/2.png" />'
                                } else if (record.get('gps_iNivelSenial') >= -89 && value <= -77) {
                                    return '<img src="/resources/softguard/images/signal/3.png" />'
                                } else if (record.get('gps_iNivelSenial') >= -76 ) {
                                    return '<img src="/resources/softguard/images/signal/4.png" />'
                                } else {
                                    return ''
                                }
                            }
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Velocidad',
                    		dataIndex : 'gps_iVelocidad',
                			flex: 1,
                            renderer : function(value, metadata,record) {
                                if(record.get('gps_iVelocidad') == 0) {
                                    return ''
                                } else {
                                    return record.get('gps_iVelocidad')
                                }
                            }
                        }
                    ]      
                }
            ],
            hideCollapseTool: true
        }
    ],
    
    initComponent: function(){
        this.callParent();
        var view = this;
        view.down('#triproview').record = this.record;
        view.down('#tripclienteroview').record = this.record;
        view.down('#tgresumenview').record = this.record;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
    		items : [{
                text : 'Centrar',
                iconCls : 'icon-center',
                enableToggle: true,
                pressed: true,
                action : 'center',
                toggleGroup: 'center'
            },
            {
                text : 'Exportar KML',
                iconCls : 'icon-page-white-world',
                action : 'exportKml',
                itemId: 'exportKml'
            },'-',{
                text : 'Filtrar Precisión',
                enableToggle: true,
                pressed: true,
                action: 'filterprecision'
            },{
                text : 'Descentrar',
                iconCls : 'icon-center',
                enableToggle: true,
                pressed: false,
                toggleGroup: 'center'
            },'-',{
                xtype: 'datefield',
                itemId: 'fechaDesde',
                fieldLabel: 'Desde',
                labelAlign: 'right',
                labelWidth: 50,
                width: 250,
                margin: '0 5 0 0',
                name: 'from_date',
                value: Ext.Date.add(new Date(), Ext.Date.HOUR, -1)
            },{
                xtype: 'datefield',
                itemId: 'fechaHasta',
                fieldLabel: 'Hasta',
                labelAlign: 'right',
                labelWidth: 50,
                width: 250,
                margin: '0 5 0 0',
                name: 'to_date',
                value: new Date()
            },
            {
                xtype:'numberfield'
                ,fieldLabel: 'Vel Max.'
                ,minValue: 20
                ,itemId: 'velMax'
                ,width: 120
                ,labelWidth: 60
            }]
        }); 
        this.addDocked(toolbar);
    }
});