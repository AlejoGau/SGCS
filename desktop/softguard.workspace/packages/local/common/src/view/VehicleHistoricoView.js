//MIGRADO2024
Ext.define('Common.view.VehicleHistoricoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vehiclehistorico',
	title : 'Historial',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
	items : [{
            // Bug MapGuardWeb: "Tabla Histórico" vivia en el mismo hbox que
            // Desde (combo + datefield + timefield ~525px de ancho sumado),
            // mas ancho que el panel cuando esta se abre embebido en el
            // accordion "Informe" del detalle de movil (~498px). Ahi el
            // timefield de Desde quedaba cortado/inalcanzable. Separado en
            // su propia fila para que Desde (260px) entre sin problema.
            xtype: 'container',
            margin: '5 0 5 5',
            layout: 'hbox',
            items: [
                {
                    xtype : 'combo',
                    fieldLabel : 'Tabla Histórico',
                    displayField : '_periodo',
                    queryMode: 'local',
                    valueField : 'c_periodo',
                    //anchor: '100%',
                    itemId: 'combohistorico',
                    //multiSelect: true,
                    name:'tablahistorico',
                    //plugins: ['clearbutton']
                    /*,
                    listeners : {
                        select : function (combo, records, eOpts ) {
                            controller.onComboHistoricoSelect(combo, records, eOpts);
                        },
                        change : function (combo, records, eOpts ) {
                            controller.onCleanDates(combo, records, eOpts);
                        }
                    }*/
                }
            ]
        },{
            xtype: 'container',
            margin: '0 0 5 5',
            layout: 'hbox',
            items: [
                {
                    xtype: 'datefield',
                    itemId: 'fechaDesde',
                    fieldLabel: 'Desde',
                    labelWidth: 60,
                    width: 160,
                    margin: '0 5 0 0',
                    name: 'from_date',
                    value: new Date()
                    //maxValue: new Date()  // limited to the current date or prior
                },{
                    xtype: 'timefield',
                    itemId: 'tiempoDesde',
                    value:  Ext.Date.add(new Date(), Ext.Date.HOUR, -1),
                    width: 100,
                    format: 'H:i',
                    name: 'from_time',
                    forceSelection: false,
                    increment: 60,
                    fieldLabel: ''
                }
            ]
        },{
            xtype: 'container',
            margin: '0 0 5 5',
            layout: 'hbox',
            items: [
                {
                    xtype: 'datefield',
                    itemId: 'fechaHasta',
                    fieldLabel: 'Hasta',
                    labelWidth: 60,
                    width: 160,
                    margin: '0 5 0 0',
                    name: 'from_date',
                    value: new Date()
                    //maxValue: new Date()  // limited to the current date or prior
                },{
                    xtype: 'timefield',
                    itemId: 'tiempoHasta',
                    width: 100,
                    format: 'H:i',
                    increment: 60,
                    value: new Date(),
                    forceSelection: false,
                    name: 'to_time',
                    fieldLabel: ''
                }
            ]
        },{
            xtype: 'container',
            margin: '0 0 5 5',
            layout: 'hbox',
            items: [
                {
                    xtype: 'numberfield',
                    itemId: 'qty',
                    fieldLabel: 'Cantidad',
                    labelWidth: 60,
                    width: 160,
                    //margin: '0 5 0 0',
                    name: 'qty',
                    value: 100
                    //maxValue: new Date()  // limited to the current date or prior
                }
            ]
        },
        {
            xtype: 'numberfield',
            itemId: 'TGTIEMPODETENIDO',
            fieldLabel: 'Tiempo detenido',
            margin: '0 5 5 5',
            labelWidth: 140,
            name: 'TGTIEMPODETENIDO',
            minValue: 0
        },
        {
            xtype: 'combo',
            margin: '0 5 5 5',
            itemId: 'comboeventos',
            fieldLabel: 'Selector Eventos',
            store: 'SoftguardAlarmasMovilStore',
			name: 'eventos',
            labelWidth: 140,
		    displayField: 'Descripcion',
            queryMode: 'local',
            forceSelection: true,
            multiSelect: true,
            editable: false,
		    valueField: 'Codigo'
        },{
            xtype: 'panel',
            title: 'Resumen de datos',
            collapsible: true,
            itemId: 'resumen',
            bodyPadding: 5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    itemId: 'cantidad',
                    fieldLabel: 'Cantidad',                                    
                    labelWidth: 100,
                    flex: 1
                },{
                    xtype: 'displayfield',
                    itemId: 'minVel',
                    fieldLabel: 'Vel. Mínima',                                    
                    labelWidth: 100,
                    flex: 1
                },{
                    xtype: 'displayfield',
                    itemId: 'maxVel',
                    fieldLabel: 'Vel. Máxima',                                    
                    labelWidth: 100,
                    flex: 1
                },{
                    xtype: 'displayfield',
                    itemId: 'promVel',
                    fieldLabel: 'Vel. Promedio',                                    
                    labelWidth: 100,
                    flex: 1
                },{
                    xtype: 'displayfield',
                    itemId: 'tDetenido',
                    fieldLabel: 'Detenido',                                    
                    labelWidth: 100,
                    flex: 1
                },
            
                {
                    xtype: 'displayfield',
                    itemId: 'tMovimiento',
                    fieldLabel: 'En Movimiento',                                    
                    labelWidth: 100,
                    flex: 1
                },{
                    xtype: 'displayfield',
                    itemId: 'distancia',
                    fieldLabel: 'Distancia',                                    
                    labelWidth: 100,
                    flex: 1
                },{
                    xtype: 'displayfield',
                    itemId: 'primer',
                    fieldLabel: 'Primer Evento',                                    
                    labelWidth: 100,
                    flex: 1
                },{
                    xtype: 'displayfield',
                    itemId: 'ultimo',
                    fieldLabel: 'Último evento',                                    
                    labelWidth: 100,
                    flex: 1
                }
            ]
        },
        // posiciones
        {
            xtype: 'grid',
            collapsible: true,
            title: 'Posiciones y eventos',
            itemId: 'gridhistorico',
            flex:1,
            viewConfig: {
                loadMask: false
            },
            autoHeight: true,
            autoScroll: true,
            columns: [{
                xtype: 'datecolumn',
                header: 'Fecha',
                sortable: true,
                dataIndex: "gps_isofechahora",//dataIndex: "gps_isofechahora",
                format: 'Y-m-d H:i:s',
                width: 145
            },
            {
                xtype: 'datecolumn',
                header: 'Fecha GPS',
                sortable: true,
                dataIndex: "gps_isorawfechahora",//dataIndex: "gps_isorawfechahora",
                format: 'Y-m-d H:i:s',
                width: 145
            },
            {
                xtype: 'gridcolumn',
                header: 'Vel.',
                sortable: false,
                align: 'right',
                dataIndex: "gps_iVelocidad",//dataIndex: "gps_iVelocidad",
                renderer: function(value){
                    if(!value)
                        value = 0;
                    return value + ' km/h';
                },
                width: 50
            },{
				xtype : 'gridcolumn',
				header : 'Prioridad',
				sortable : true,
				dataIndex : 'cod_nprioridad',
				renderer : function(value, metadata, record, colIndex,store, view) {
					var rclass = 'prioridad' + record.get('cod_nprioridad');
					metadata.tdCls = rclass;												
					return value; 
				},
				width : 50
			}, {
				xtype : 'gridcolumn',
				header : 'Evento',
				dataIndex : 'rec_calarma',
				sortable : false,
				renderer : function(value, metadata, record, colIndex,store, view) {
                    var texto ='';
                    if (record.get('rec_calarma')){
                        var panel = this.up('vehiclehistorico');
                        texto = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                        var txtColor = panel.decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                        var backColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                        metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                    }
                    return texto
                },
				width : 210
			},{
                xtype: 'gridcolumn',
                header: 'Latitud',
                hidden: true,
                sortable: false,
                dataIndex: "gps_rLatitud",//dataIndex: "pos_rLatitud",//
                width: 100
            },{
                xtype: 'gridcolumn',
                header: 'Longitud',
                hidden: true,
                sortable: false,
                dataIndex: "gps_rLongitud",//dataIndex: "pos_rLongitud",//
                width: 100
            },{
                xtype: 'gridcolumn',
                header: 'Dirección',
                sortable: false,
                dataIndex: "gps_cDireccion",//dataIndex: "pos_cDireccion",//
                width: 400
            },{
                xtype: 'gridcolumn',
                header: 'LOG Gps',
                sortable: false,
                dataIndex: "rxl_cLog",
                width: 200
            }
        ]},
        // tiempo detenido
        {
            xtype: 'grid',
            collapsible: true,
            title: 'Tiempo detenido',
            itemId: 'griddetenido',
            flex:1,
            viewConfig: {
                loadMask: false
            },
            autoHeight: true,
            autoScroll: true,
            columns: [{
                xtype: 'datecolumn',
                header: 'Fecha desde',
                dataIndex: "min_fecha",
                format: 'Y-m-d H:i:s',
                width: 145
            },
            {
                xtype: 'datecolumn',
                header: 'Fecha hasta',
                dataIndex: "max_fecha",
                format: 'Y-m-d H:i:s',
                width: 145
            },
            {
                xtype: 'gridcolumn',
                header: 'Minutos',
                dataIndex: "minutos",
                width: 145
            },
            {
                xtype: 'gridcolumn',
                header: 'Dirección',
                dataIndex: "gps_cdireccion",//"pos_cdireccion",//
                flex:1
            }
        ]}
    ],
    
    initComponent: function(){
        Ext.create('Ext.data.Store', {
            autoLoad: true,
            storeId: 'SoftguardAlarmasMovilStore',
            model: 'Common.model.SoftguardCodigoAlarmaModel',
            remoteSort: false,
            remoteFilter: false,
            sorters: [{ property: 'Descripcion', 
                        direction: 'ASC' }],
            proxy: {
                type : 'rest',
                reader: {
                        type : 'json',
                        rootProperty : 'rows',
                        totalProperty : 'total'
                },
                url: '/Rest/Search/codigosalarmas?cod_nMovil=1'       
            }
        })
        
        this.callParent();
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        
        this.decimalColorToHTMLcolor = function(number) {
            var intnumber = number - 0;
        	var red, green, blue;
    		var template = "#000000";
    	        red = (intnumber&0x0000ff) << 16;
    		green = intnumber&0x00ff00;
    		blue = (intnumber&0xff0000) >>> 16;
    	        intnumber = red|green|blue;
    	
    		var HTMLcolor = intnumber.toString(16);
    		HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
    	
    		return HTMLcolor;
    	};
        
        this.down('#gridhistorico').addDocked(pagingtoolbar);
          var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 {
                    xtype: 'button',
                    text: 'Buscar',
                    action: 'Buscar'
                },'-',{
                    xtype: 'button',
                    text: 'Mostrar',
                    action: 'Mostrar',
                    itemId: 'btnMostrar',
                    disabled: true
                },'-',{
                    xtype: 'button',
                    action: 'minutos-15',
                    text : "15'",
                    iconCls: 'icon-clock-15'
                },{
                    xtype: 'button',
                    action: 'minutos-30',
                    text : "30'",
                    iconCls: 'icon-clock-30'
                },{
                    xtype: 'button',
                    action: 'minutos-45',
                    text : "45'",
                    iconCls: 'icon-clock-45'
                },{
                    xtype: 'button',
                    action: 'minutos-60',
                    text : "60'",
                    iconCls: 'icon-clock-60'
                },'->',{
                    xtype: 'button',
                    text: 'Exportar',
                    action: 'Exportar',
                    itemId: 'btnExportar',
                    iconCls : 'icon-page-excel',
                    disabled: true
                },'-',{
                    xtype: 'button',
                    text: 'PDF',
                    action: 'pdf',
                    itemId: 'btnPdf',
                    iconCls : 'icon-page-white-acrobat',
                    disabled: true
                }
            ]// cierro items
         }); 
        this.addDocked(toolbar);
    }
});