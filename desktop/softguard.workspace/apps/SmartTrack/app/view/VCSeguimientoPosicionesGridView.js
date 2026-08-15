Ext.define('SmartTrack.view.VCSeguimientoPosicionesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.vcseguimientoposicionesgridview'],
    title : 'Posiciones',
    autoHeight : true,
    rangoPrecision: 500,
    columns : [ {
            xtype : 'gridcolumn',
            //header : '&nbsp;',
            width: 25,
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
            dataIndex : 'sp_tfechahora',
            format: 'd-m-Y H:i:s',
            flex: 1		
        },{
            xtype : 'numbercolumn',            
            header : 'Batería',
            renderer: Ext.util.Format.numberRenderer('0'),
            dataIndex : 'sp_iBatt',
            width: 70 		
        },{
            xtype : 'numbercolumn',            
            header : 'Secuencia',
            dataIndex : 'sp_iSecuencia',
            renderer: Ext.util.Format.numberRenderer('0'),
            width: 70 		
        },{
            xtype : 'numbercolumn',            
            header : 'Precisión',
            dataIndex : 'sp_rAccuracy',
            renderer: Ext.util.Format.numberRenderer('0'),
            width: 70 		
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
            width: 70 		
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
            width: 70 		
        }
    ],
    
    initComponent: function () {  
        this.callParent(arguments); 
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items : [
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 350,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype:'fieldset',
                                        padding:'10 10 10 10',
                                        items:[{
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
                                            },{
                                                xtype: 'button',
                                                action: 'posicion-1',
                                                text : "1 posición"
                                            },{
                                                xtype: 'button',
                                                action: 'posicion-2',
                                                text : "30 posiciones"
                                            }
                                        ]
                                    },{
                                        xtype:'fieldset',                                                    
                                        padding:'0 0 0 0',
                                        border:0,
                                        layout: 'hbox',
                                        margin:'0 0 5 0',
                                        items:[
                                            {
                                                xtype:'datefield',
                                                name: 'fechaDesde',
                                                itemId: 'fechaDesde',
                                                fieldLabel: 'Desde',
                                                labelWidth: 50,
                                                width: 180,
                                                margin: '0 5 0 0',
                                                name: 'from_date',
                                                value: Ext.Date.add(new Date(), Ext.Date.HOUR, -1)
                                            },{
                                                fieldLabel: 'Hora',
                                                xtype: 'timefield',
                                                itemId: 'horadesde',
                                                format: 'H:i',
                                                altFormats:'H:i',
                                                value: '00:00',
                                                increment: 10,
                                                labelWidth:40,
                                                width: 123,
                                                margin:'0 0 0 7',
                                                name:'horadesde'
                                            }
                                        ]
                                    },{
                                        xtype:'fieldset',                                                    
                                        padding:'0 0 0 0',
                                        border:0,
                                        layout: 'hbox',
                                        margin:'0 0 5 0',
                                        items:[
                                            {
                                                xtype : 'datefield',
                                                itemId: 'fechaHasta',
                                                fieldLabel: 'Hasta',
                                                labelWidth: 50,
                                                width: 180,
                                                margin: '0 5 0 0',
                                                name: 'from_date',
                                                value: new Date()
                                            },{
                                                fieldLabel: 'Hora',
                                                xtype: 'timefield',
                                                itemId: 'horahasta',
                                                format: 'H:i',
                                                altFormats:'H:i',
                                                value: '23:50',
                                                increment: 10,
                                                labelWidth:40,
                                                width: 123,                                                                        
                                                margin:'0 0 0 7',
                                                name:'horahasta'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                    
                },'-',
                
                {
                    xtype: 'button',
                    text: 'Buscar',
                    action: 'Buscar',
                    margin: '0 5 0 0'
                }
            ]
        }); 
        this.addDocked(toolbar);
    } 
});