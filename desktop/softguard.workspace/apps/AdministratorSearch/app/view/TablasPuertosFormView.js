Ext.define('AdministratorSearch.view.TablasPuertosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablaspuertosformview'],
    preventHeader: true,
    frame: true,
    autoScroll: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
	},
	items : [
        {
			xtype : 'textfield',
			name : 'pue_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            maxLength: 40,
            anchor:'100%',
            allowBlank : false
		},{
    		xtype : 'combo',
        	fieldLabel : 'Receptor',
            itemId: 'receptor',
			name : 'pue_ireceptor',
			displayField : 'rec_cdescripcion',
			valueField : 'rec_iid',
            allowBlank : false,
            anchor : '100%',
            queryMode: 'local',
            forceSelection: true  
		},{
                xtype: 'fieldset',
                title: '',
                collapsible: false,
                layout: {
                     type: 'vbox',
                    align: 'stretch',
                    flex:1
                },
                items:[
                    {
                        xtype: 'container',
                        layout: {
                            
                            type: 'hbox',
                            align: 'stretch',
                            anchor: '100%'
                        },
                        margin: '0 0 5 0',
                        items: [
                                {
                                	xtype : 'numberfield',
                        			name : 'pue_npuerto',
                                    fieldLabel: 'Puerto',
                                    minValue: 0,
                                    maxValue: 15,
                                    inputWidth :100,
                                    validator: function(value){
                                        var t = this;
                                        var view = this.up('tablaspuertosformview');
                                        if(value < 1 || value > 15) {
                                                t.markInvalid('Se encuentra fuera de rango, deb ser entre 1 y 15');
                                                t.textValid = 'Se encuentra fuera de rango, deb ser entre 1 y 15';
                                                view.down('#save').setDisabled(true);
												return t.textValid;
                                        }  
                                         
                                        if(parseInt(value) != parseInt(this.originalValue) && this.originalValue != undefined ) {
                                            var form = t.up('form').getForm();
                                            var filters = [{
                                                property : 'pue_npuerto',
                                                value : value
                                            }];      
                                    
                                            var model = 'AdministratorSearch.model.TablasPuertosSearchModel';
                                    
                                            var store =Ext.create('Ext.data.Store',{
                                                model: model,
                                                pageSize: 50,
                                                remoteSort: true,
                                                remoteFilter: true,
                                                filters: filters,
                                                autoload: false
                                            })
                                            
                                            store.load({callback: function (records, operation, success) {
                                                if (records.length > 0){                                                                
                                                    t.markInvalid('El puerto ya exsiste');
                                                    t.textValid = 'El puerto ya exsiste';
                                                    view.down('#save').setDisabled(true);
                                                    return true;
                                                } else {
                                                    t.clearInvalid();
                                                    t.textValid = '';
                                                    view.down('#save').setDisabled(false);
                                                    return t.textValid;
                                                }   
                                            }})
                                        } else {
                                            t.clearInvalid();
                                            t.textValid = '';
                                            view.down('#save').setDisabled(false);
                                            return true;
                                        }
                                        
                                        return true;

                                    }
                                    
                                    
                        		},{
                                	xtype : 'numberfield',
                        			name : 'pue_ndatabits',
                                    fieldLabel: 'Bit de datos',
                                     minValue: 0,
                                    maxValue: 9,
                                    inputWidth :100,
                                    margin: '0 0 5 30',
                        		},{
                                	xtype : 'numberfield',
                        			name : 'pue_nstopbits',
                                    fieldLabel: 'Bit de parada',
                                     minValue: 1,
                                    maxValue: 8,
                                    inputWidth :100,
                                    margin: '0 0 5 30',
                        		}
                            ]
                    },{
                        xtype: 'container',
                        layout: {
                            
                            type: 'hbox',
                            align: 'stretch',
                            anchor: '100%'
                        },
                        margin: '0 0 5 0',
                        items: [
                            {
                                xtype : 'combo',
                                fieldLabel : 'Baudios',
                            	name : 'pue_nbaudrate',
                                store: [
                                    [1,'300'],
                                    [2,'600'],
                                    [3,'1200'],
                                    [4,'2400'],
                                    [5,'4800'],
                                    [6,'9600'],
                                    [7,'19200'],
                                    [8,'38400'],
                                    [9,'115200'],
                                ]
                    		},{
                                xtype : 'combo',
                                fieldLabel : 'Paridad',
                                name : 'pue_nparity',
                                store: [
                                    [1,getLocale('Ninguna')],
                                    [2,getLocale('Par')],
                                    [3,getLocale('Impar')]
                                ],
                                margin: '0 0 5 30',
                    		}
                        ]
                    },{
                        xtype : 'combo',
                        fieldLabel : 'Control de flujo',
                        name : 'pue_nflowctrl',
                        store: [
                            [0,getLocale('Ninguna')],
                            [1,getLocale('Xor/Xoff')],
                            [2,getLocale('Hardware')]
                        ],
                        inputWidth :200
            		},{
                        xtype: 'container',
                        layout: {
                            
                            type: 'hbox',
                            align: 'stretch',
                            anchor: '100%'
                        },
                        margin: '0 0 5 0',
                        items: [
                            {
                            	xtype : 'numberfield',
                    			name : 'pue_nbufferin',
                                fieldLabel: 'Buffer entrada',
                                 minValue: 1,
                                maxValue: 9999,
                                inputWidth :100,
                    		},{
                            	xtype : 'numberfield',
                    			name : 'pue_nbufferout',
                                fieldLabel: 'Buffer de salida',
                                 minValue: 1,
                                maxValue: 9999,
                                inputWidth :100,
                                margin: '0 0 5 30'
                    		}
                        ]
            		},{
                        xtype: 'container',
                        layout: {
                            
                            type: 'hbox',
                            align: 'stretch',
                            anchor: '100%'
                        },
                        margin: '0 0 5 0',
                        items: [
                            {
                                xtype : 'combo',
                                fieldLabel : 'Habilitar rts',
                                name : 'pue_nrts',
                                store: [
                                    [1,getLocale('Si')],
                                    [2,getLocale('No')],
                                ],
                                inputWidth :40
                    		},{
                                xtype : 'combo',
                                fieldLabel : 'Habilitar dtr',
                                name : 'pue_ndtr',
                                store: [
                                    [1,getLocale('Si')],
                                    [2,getLocale('No')],
                                ],
                                inputWidth :40,
                                margin: '0 0 5 30'
                    		}
                        ]
            		}
                ]
		},{
            xtype : 'combo',
            fieldLabel : 'Estado',
            name : 'pue_nestado',
            store: [
                [1,getLocale('Deshabilitado')],
                [2,getLocale('Habilitado')],
                [5,getLocale('Habilitado modo debug')],
            ],
            inputWidth :100
		},{
            xtype : 'combo',
            fieldLabel : 'Responde Ack',
            name : 'pue_crespondeack',
            store: [
                [1,getLocale('Si')],
                [0,getLocale('No')],
            ],
            inputWidth :40
		},{
            xtype : 'numberfield',
			name : 'pue_itiempoinactividad',
            fieldLabel: 'Tiempo inactividad',
            minValue: 0,
            maxValue: 999,
            inputWidth :100
		},{
            xtype : 'combo',
            fieldLabel : 'Resetea por hb',
            name : 'pue_cresetxhb',
            store: [
                [1,getLocale('Si')],
                [0,getLocale('No')],
            ],
            inputWidth :40
		}
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});