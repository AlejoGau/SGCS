Ext.define('Trackguard.view.GeocercasProgramadasProgramFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.geocercasprogramadasprogramformview'],
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
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combo',
                    store: [
                        [1,getLocale('Todos los dias')],
                        [2,getLocale('Luneas a viernes')],
                        [3,getLocale('Dias de la semana')],
                        [4,getLocale('Una vez al mes')]
                    ],
                    queryMode: 'local',
                    name: 'programtype',
                    fieldLabel: 'Repite',
                    itemId:'comboprogramtype'
                }
            ]
        },/*{
        	xtype: 'container',
			layout: 'vbox',
			items:[*/
                {
                   xtype: 'container',
                   layout: 'hbox',
                   items: [{
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Dia de la semana',
                    //columns: [0.14,0.14,0.14,0.14,0.14,0.14, 0.16],
                    columns: 2,
                    itemId: 'combodayofweek',
                    margin: '10 10 10 10',
                    hidden:true,
                    items: [
                            {
                                boxLabel: 'D',
                                cls: 'margin-bottom: -4px',
                                name: 'dayofweek',
                                inputValue: '0',
                                uncheckedValue: 0
                            },{
                                boxLabel: 'L',
                                name: 'dayofweek',
                                inputValue: '1',
                                uncheckedValue: 0
                            },{
                                boxLabel: 'M',
                                name: 'dayofweek',
                                inputValue: '2',
                                uncheckedValue: 0
                            },{
                                boxLabel: 'M',
                                name: 'dayofweek',
                                inputValue: '3',
                                uncheckedValue: 0
                            },{
                                boxLabel: 'J',
                                name: 'dayofweek',
                                inputValue: '4',
                                uncheckedValue: 0
                            },{
                                boxLabel: 'V',
                                name: 'dayofweek',
                                inputValue: '5',
                                uncheckedValue: 0
                            },{
                                boxLabel: 'S',
                                name: 'dayofweek',
                                inputValue: '6',
                                uncheckedValue: 0
                            }
                        ]
                    }]
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
        			xtype: 'fieldset',
            		layout: 'hbox',
                    hidden:true,
                    titel: 'En el horario',
                    itemId: 'horario1',
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
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes1',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                			flex: 1,
                            itemId:'minutes1',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'fieldset',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario2',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour2',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
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
                			flex: 1,
                            itemId:'minutes2',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'fieldset',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario3',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour3',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
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
                			flex: 1,
                            itemId:'minutes3',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'fieldset',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario4',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour4',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
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
                			flex: 1,
                            itemId:'minutes4',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
            		xtype: 'fieldset',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario5',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour5',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                			flex: 1,
                            itemId:'hours5',
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes5',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                			flex: 1,
                            itemId:'minutes5',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                },{
                	xtype: 'fieldset',
            		layout: 'hbox',
                    titel: 'En el horario',
                    itemId: 'horario',
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
            /*]
        }*///VBOS LAYER
    ],

	initComponent : function() {
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