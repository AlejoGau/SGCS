//MIGRADO2024
Ext.define('Common.view.RoutesProgramFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.routesprogramformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 70,
        enforceMaxLength: true,
        width: 200
    },
    items : [
        {
            xtype: 'combo',
            anchor: '100%',
            store: [
                [1,getLocale('Todos los dias')],
                [2,getLocale('Luneas a viernes')],
                [3,getLocale('Dias de la semana')],
                [4,getLocale('Una vez al mes')]
            ],
            queryMode: 'local',
            name: 'programtype',
            fieldLabel: 'Repite',
            allowBlank: false,
            itemId:'comboprogramtype'
        },{
    		xtype: 'container',
			layout: {
                type: 'vbox',
                align: 'stretch'
            },
			items:[
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Seleccione',
                    itemId: 'combodayofweek',
                    hidden:true,
                    items: [
                            {
                                boxLabel: 'D',
                                name: 'dayofweek',
                                inputValue: '0',
                                uncheckedValue: 0,
                                width:40
                            },{
                                boxLabel: 'L',
                                name: 'dayofweek',
                                inputValue: '1',
                                uncheckedValue: 0,
                                width:40
                            },{
                                boxLabel: 'M',
                                name: 'dayofweek',
                                inputValue: '2',
                                uncheckedValue: 0,
                                width:40
                            },{
                                boxLabel: 'M',
                                name: 'dayofweek',
                                inputValue: '3',
                                uncheckedValue: 0,
                                width:40
                            },{
                                boxLabel: 'J',
                                name: 'dayofweek',
                                inputValue: '4',
                                uncheckedValue: 0,
                                width:40
                            },{
                                boxLabel: 'V',
                                name: 'dayofweek',
                                inputValue: '5',
                                uncheckedValue: 0,
                                width:40
                            },{
                                boxLabel: 'S',
                                name: 'dayofweek',
                                inputValue: '6',
                                uncheckedValue: 0,
                                width:40
                            }
                        ]
                }                
               , {
                    xtype: 'combo',
                    store: [
                        [0,getLocale('Domingo')],
                        [1,getLocale('Lunes')],
                        [2,getLocale('Martes')],
                        [3,getLocale('Miercoles')],
                        [4,getLocale('Jueves')],
                        [5,getLocale('Viernes')],
                        [6,getLocale('Sabado')]                
                    ],
                    queryMode: 'local',
                    name: 'dayofweek',
                    itemId: 'queryType',
                    fieldLabel: 'El dia',
                    itemId: 'combodayofweekedit',
                    hidden:true
                },{
                    xtype: 'combo',
                    store: [
                        [1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10],
                        [11,11],[12,12],[13,13],[14,14],[15,15],[16,16],[17,17],[18,18],[19,19],[20,20],
                        [21,21],[22,22],[23,23],[24,24],[25,25],[26,26],[27,27],[28,28],[29,29],[30,30],
                        [31,31]
                    ],
                    queryMode: 'local',
                    name: 'dayofmonth',
                    itemId: 'queryType',
                    fieldLabel: 'El dia',
                    hidden:true,
                    itemId:'combodayofmonth'
                },{
        			xtype: 'container',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario1',
                    margin: '10 0 0 0',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour1',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                			flex: 1,
                            itemId:'hours1',
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            allowBlank: false,
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes1',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                			flex: 1,
                            itemId:'minutes1',
                            value: null,
                            labelWidth: 70,
                            allowBlank: false,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'container',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario2',
                    margin: '10 0 0 0',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour2',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                            value: null,
                			flex: 1,
                            itemId:'hours2',
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes2',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                            value: null,
                			flex: 1,
                            itemId:'minutes2',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'container',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario3',
                    margin: '10 0 0 0',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour3',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                            value: null,
                			flex: 1,
                            itemId:'hours3',
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes3',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                            value: null,
                			flex: 1,
                            itemId:'minutes3',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'container',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario4',
                    margin: '10 0 0 0',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour4',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                            value: null,
                			flex: 1,
                            itemId:'hours4',
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes4',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                            value: null,
                			flex: 1,
                            itemId:'minutes4',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'container',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario5',
                    margin: '10 0 0 0',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour5',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                			flex: 1,
                            itemId:'hours5',
                            value: null,
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes5',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                            value: null,
                			flex: 1,
                            itemId:'minutes5',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
                	xtype: 'container',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario',
                    margin: '10 0 0 0',
                    hidden:true,
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                			flex: 1,
                            itemId:'hours',
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                			flex: 1,
                            itemId:'minutes',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                }
            ]
        }
    ],
	initComponent : function() {
        //this.addEvents('objectchanged');
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});