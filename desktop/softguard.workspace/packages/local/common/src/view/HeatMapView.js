Ext.define('Common.view.HeatMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.heatmapview',
    
    frame : false,
    border : 0,
    
    items : [{
            xtype: 'panel',
            items:[{
                    xtype:'container',                                                
                    margin: '0 10 0 0',
                    items: [/*{
                                xtype: 'combo',
                                fieldLabel: 'Dealer',
                                itemId: 'dealer',
                        		name : 'cue_clinea',
                    			store : 'TablaLineasStore',
                    			displayField : 'lin_crazonsocial',
                    			valueField : 'lin_ccodigo',
                                queryMode: 'local',
                                labelWidth: 80,
                                width: 320,
                                plugins: ['clearbutton']
                            }*/{
                                xtype : 'textfield',
                                itemId: 'dealer',
                                fieldLabel : 'Dealer',
                                enforceMaxLength : true,
                                maxLength : 3,
                                width : 320,
                                labelWidth : 45,
                                margin:'0 0 0 0'
                            },{
                                xtype:'fieldset',                                                    
                                padding:'0 0 0 0',
                                border:0,
                                layout: 'hbox',
                                margin:'0 0 0 0',
                                items:[
                                        {
                                            xtype : 'textfield',
                                            itemId: 'cuentadesde',
                                            fieldLabel : 'Cuenta desde',
                                            enforceMaxLength : true,
                                            maxLength : 4,
                                            width : 140,
                                            labelWidth : 45,
                                            margin:'0 0 0 0'
                                        },{
                                            xtype : 'textfield',
                                            itemId: 'cuentahasta',
                                            fieldLabel : 'Cuenta hasta', 
                                            enforceMaxLength : true,
                                            maxLength : 4,
                                            width : 140,
                                            labelWidth : 45,
                                            margin:'0 0 0 10'
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
                        					fieldLabel : 'Fecha desde',
                        					name : "fechadesde",
                        					bindToModel : false,
                        					itemId : 'fechadesde',
                                            labelWidth : 45,
                                            width : 140,
                                            margin:'0 0 0 0'
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
                        					fieldLabel : 'Fecha hasta',
                        					itemId : 'fechahasta',
                        					bindToModel : false,
                        					name : "fechahasta",
                                            labelWidth : 45,
                                            width : 140,
                                            margin:'0 0 0 0'
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
                            },{                                        
                                                                    
                                xtype : 'combo',
                                fieldLabel : 'Codigo alarma',                                                          
                                itemId: 'codigoalarma',
                                displayField : 'Descripcion',
                                queryMode: 'local',
                                valueField : 'cod_ccodigo',
                    			name : "cod_cdescripcion",
                                //typeAhead:true,
                                labelWidth: 80,
                                width: 320,
                                //plugins: ['clearbutton'],
                                multiSelect: true,
                            },{
                                xtype: 'combo',
                                itemId: 'grupos',
                                fieldLabel: 'Grupo',
                                displayField : 'gru_cdescripcion',
                                valueField : 'gru_ccodigo',
                                queryMode: 'local',
                                labelWidth: 80,
                                width: 320,
                                //plugins: ['clearbutton']
                            }]
            }]
    }],

    initComponent: function() {
        this.callParent();
        
        this.mask = Ext.create('Ext.LoadMask', this, {
                        msg: getLocale("Cargando informacion necesaria.")
                    });
                    
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
    		items : [
                {
                    xtype: 'button',
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    itemId: 'heatmap',
                    pressed: false
                },'-',{
                    xtype: 'button',
                    text: 'Ocultar',
                    itemId: 'heatmapOff',
                    pressed: false
                },'->',{
                    xtype: 'button',
                    iconCls: 'icon-find',
                    text: 'Ver Todos',
                    itemId: 'removeFilter',
                    pressed: false
                }
            ]
        });
        this.addDocked(toolbar);           
    }
});