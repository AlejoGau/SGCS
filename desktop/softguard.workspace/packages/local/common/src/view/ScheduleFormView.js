//MIGRADO2024
Ext.define('Common.view.ScheduleFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.scheduleformview',
    preventHeader: true,
    activeHelp:true,
    frame : true,
    fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [
        {
            xtype:'textfield',
            fieldLabel:'Nombre',
            name:'Name',
            itemId:'name',
            allowBlank : false
        },{
            xtype: 'combo',
            itemId: 'panel',
            fieldLabel: 'Panel',
            name: 'panel', 
            width:'100%',
            store:[[-1, getLocale('Generar siempre')],[-2, getLocale('Por evento')],[0, getLocale('Panel cerrado')],[1, getLocale('Panel abierto')]]
        },
        {
            xtype: 'fieldset',
            layout: 'vbox',
            title: 'Eventos a controlar',
            margin:'0 0 5 0',
            itemId: 'selectAlarm',
            hidden: false,
            items:[
                /*{
                    xtype: 'checkbox',
                    itemId: 'runAlways',
                    fieldLabel: 'Genera siempre',
                    value: false,
                    name: 'runAlways'
                },*/
                {
                    xtype: 'container',
                    
                    items: [
                        {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items: [{
                            xtype: 'button',
                            text:'Seleccionar alarma',
                            iconCls: 'icon-bell',
                            itemId:'evento',
                            margin:'0 5 0 0'
                        },{
                            xtype:'displayfield',
                            itemId:'nombreevento',
                            width:220
                        },{
                            xtype:'button',
                            text:'',
                            itemId:'limpiarevento',
                            iconCls: 'icon-cancel'
                        },{
                            xtype:'displayfield',
                            itemId:'codevento',
                            name:'eventtype',
                            hidden:true
                        }]
                    },
                    {
                        xtype: 'combo',
                        itemId: 'combozona',
                        fieldLabel: 'Selector Zona',
                        name: 'cZona',         
                	    displayField: 'zon_cdescripcion',
                        queryMode: 'local',
                        editable: false,
                        plugins: ['clearbutton'],
            		    valueField: 'Id',
                        width:'100%',
                        disabled:true
                    },
                    {
                        xtype: 'combo',
                        itemId: 'combousuario',
                        fieldLabel: 'Selector Usuario',
                        name: 'idUsuario',         
            		    displayField: 'usu_cnombre',
                        queryMode: 'local',
                        plugins: ['clearbutton'],
                        editable: false,
            		    valueField: 'usu_iid',
                        width:'100%',
                        disabled:true
                    }
                    ]
                }                                          
            ]
        },{
            xtype: 'fieldset',
            layout: 'hbox',
            title: 'Cuenta',
            itemId:'cuentablock',
            margin:'0 0 5 0',
            items:[{
                        xtype: 'button',
                        text:'Seleccionar cuenta',
                        iconCls: 'icon-bell',
                        itemId:'cuenta',
                        margin:'0 5 0 0'
                    },{
                        xtype:'displayfield',
                        itemId:'nombrecuenta',
                        width:220
                    },{
                        xtype:'button',
                        text:'',
                        itemId:'limpiarcuenta',
                        iconCls: 'icon-cancel'
                    },{
                        xtype:'displayfield',
                        itemId:'idcuenta',
                        name:'idCuenta',
                        hidden:true
                    }
                                                                        
                ]
        },{
            xtype:'fieldset',
            title: getLocale('Seleccion de dias y horarios de control'),
            items: [
                {
                    xtype: 'combo',
                    store: [
                        [1,getLocale('Todos los dias')],
                        [2,getLocale('Luneas a viernes')],
                        [3,getLocale('Dias de la semana')],
                        [4,getLocale('Una vez al mes')],
                        [5,getLocale('Personalizado')]
                    ],
                    queryMode: 'local',
                    name: 'programtype',
                    fieldLabel: 'Repite',
                    itemId:'comboprogramtype',
                    allowBlank : false
                },{
                    xtype: 'container',
        			layout: 'vbox',
        			items:[
                        {
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Dia de la semana',
                            itemId: 'combodayofweek',
                            name:'dayofweek',
                            hidden:true,                    
                            width:400,
                            items: [
                                {
                                    boxLabel: 'D',
                                    name: 'dayofweek',
                                    inputValue: '0',
                                    uncheckedValue: 0,
                                    labelWidth:30,
                                    itemId:'day-0'
                                },{
                                    boxLabel: 'L',
                                    name: 'dayofweek',
                                    inputValue: '1',
                                    uncheckedValue: 0,
                                    labelWidth:30,
                                    itemId:'day-1'
                                },{
                                    boxLabel: 'M',
                                    name: 'dayofweek',
                                    inputValue: '2',
                                    uncheckedValue: 0,
                                    labelWidth:30,
                                    itemId:'day-2'
                                },{
                                    boxLabel: 'M',
                                    name: 'dayofweek',
                                    inputValue: '3',
                                    uncheckedValue: 0,
                                    labelWidth:30,
                                    itemId:'day-3'
                                },{
                                    boxLabel: 'J',
                                    name: 'dayofweek',
                                    inputValue: '4',
                                    uncheckedValue: 0,
                                    labelWidth:30,
                                    itemId:'day-4'
                                },{
                                    boxLabel: 'V',
                                    name: 'dayofweek',
                                    inputValue: '5',
                                    uncheckedValue: 0,
                                    labelWidth:30,
                                    itemId:'day-5'
                                },{
                                    boxLabel: 'S',
                                    name: 'dayofweek',
                                    inputValue: '6',
                                    uncheckedValue: 0,
                                    labelWidth:30,
                                    itemId:'day-6'
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
                            fieldLabel: 'El dia',
                            hidden:true,
                            itemId:'combodayofmonth'
                        },{
                        	xtype: 'fieldset',
                    		layout: 'hbox',
                            title: 'Horario inicio',
                            itemId: 'horario',
                            hidden:true,
                            width:'100%',
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
                                    width: 150,
                                    allowBlank : false
                        			
                        		},{
                                	xtype: 'numberfield',
                        			name: 'startminutes',
                        			fieldLabel: 'Minutos',
                                    minValue: 0,
                                    maxValue: 59,
                        			flex: 1,
                                    itemId:'minutes',
                                    labelWidth: 70,
                                    width: 150,
                                    allowBlank : false
                        		}
                            ]
                        },{
                            xtype: 'fieldset',
                    		layout: 'hbox',
                            title: 'Horario finalizacion',
                            itemId: 'horarioend',
                            hidden:true,
                            width:'100%',
                			items:[{
                                    xtype: 'numberfield',
                        			name: 'endhour',
                        			fieldLabel: 'Hora',
                                    minValue: 0,
                                    maxValue: 23,
                        			flex: 1,
                                    itemId:'endhours',
                                    labelWidth: 70,
                                    margin: '0 10 0 0',
                                    width: 150,
                                    allowBlank : false
                        			
                        		},{
                                	xtype: 'numberfield',
                        			name: 'endminutes',
                        			fieldLabel: 'Minutos',
                                    minValue: 0,
                                    maxValue: 59,
                        			flex: 1,
                                    itemId:'endminutes',
                                    labelWidth: 70,
                                    width: 150,
                                    allowBlank : false
                        			
                        		}
                            ]
                        },{
                            xtype:'container',
                            itemId:'otroshorarios',
                            
                           // autoScroll : true,
                          //  height:200,                            
                            width:'100%',
                            items: [
                                ]
                        }
            ]
        },
            ]
        }/*,{
            xtype: 'checkbox',
            fieldLabel: 'Control dias feriados',
            name: 'feriados',
            uncheckedValue: 0,
            itemId:'feriados'
        }*/,{
            xtype: 'fieldset',
            layout: 'hbox',
            title: 'Alarma a generar',
            margin:'0 0 5 0',
            items:[{
                        xtype: 'button',
                        text:'Seleccionar alarma',
                        iconCls: 'icon-bell',
                        itemId:'evento2',
                        margin:'0 5 0 0'
                    },{
                        xtype:'displayfield',
                        itemId:'nombreevento2',
                        width:220
                    },{
                        xtype:'button',
                        text:'',
                        itemId:'limpiarevento2',
                        iconCls: 'icon-cancel'
                    },{
                        xtype:'displayfield',
                        itemId:'codevento2',
                        hidden:true
                    }
                                                                        
                ]
        },
        
        
        
        ],
	buttons : [{
			text : 'Guardar',
            action: 'save'
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],
	initComponent : function() {

		this.callParent(arguments);
	} // cierro init
});