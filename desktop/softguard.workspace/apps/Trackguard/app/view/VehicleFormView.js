Ext.define('Trackguard.view.VehicleFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.vehicleformview',
    //title : 'Vehículo',
    layout: 'anchor',
    autoScroll: true,

    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 150,
        margin: 5,
        width: '100%'
    },
    
    items : [     
        {
            xtype: 'fieldset',
            title: 'Cuenta del dispositivo',
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype:'displayfield',
                    fieldLabel:'Fecha de creacion',
                    itemId:'cue_dfechaalta',
                    anchor: '100%'
                },{
                	xtype : 'combo',
        			fieldLabel : 'Dealer',
                    itemId: 'dealer',
        			name : 'cue_clinea',
        			store : 'TablaLineasStore',
        			displayField : 'lin_crazonsocial',
        			valueField : 'lin_ccodigo',
                    queryMode: 'local',
                    anchor: '100%'
        	    },
                {
            		xtype : 'textfield',
                    itemId: 'cuenta',
        			name : 'cue_ncuenta',
        			disabled : false,
                    maxLength : 4,
                    enforceMaxLength : true,
        			fieldLabel : 'Cuenta',
                    width: 300
        	    }, {
            		xtype : 'textfield',
        			fieldLabel : 'Nombre',
        			name : 'cue_cnombre',
                    anchor: '100%'
        	    },{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 5 0 5',
                    anchor: '100%',
                    items:[
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Tipo',
                            itemId: 'tipoCombo',
                            //multiselect : false,
                            editable : false,
                            queryMode: 'local',
                            typeAhead: false,
                            displayField: 'tip_cdescripcion',
                            valueField: 'tip_ccodigo',
                            //store: 'VehicleTipoSearchStore',
                            name: '_tipo',
                            flex: 1,
                            margin: 0
                        },
                        {
                            xtype: 'button',
                            action: 'guardarTipo',
                            text: 'Guardar',
                            margin: '0 0 0 5'
                        }
                    ]
                }, {
                xtype : 'combo',
    			fieldLabel : 'Zona horaria',
    			store : 'ZonasHorariasStore',
    			displayField : 'ttz_cTitle',
                queryMode: 'local',
    			valueField : 'Id',
    			name : "cue_iZonaHoraria",
                defaultValue:'',
                itemId: 'zonahoraria',
                anchor: '100%',
                editable: false
    		},{
                    xtype : 'textfield',
                    fieldLabel : 'Situación',
                    disabled: true,
                    name : 'Situacion',
                    anchor: '100%'
                },{
                    xtype : 'textfield',
                    fieldLabel : 'Ult. Evento',
                    disabled: true,
                    name : 'sta_dfechautimaalarma',
                    anchor: '100%'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId:'clavebox',
                    items: [
                        {
                            xtype : 'textfield',
                            fieldLabel : 'Clave',
                            itemId: 'cue_cclave',
                            name: 'cue_cclave',
                            disabled: true,
                            flex: 1,
                            inputType : 'password'
                        },{
                            xtype : 'textfield',
                            fieldLabel : 'Clave',
                            itemId: 'claveTxt',
                            disabled: true,
                            hidden: true,
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: 'Cambiar',
                            itemId: 'claveBtn',
                            action: 'passwordChange',
                            style: 'margin: 5px 0 0 0;'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    action: 'cambiarCuenta',
                    itemId:'cuentaasociada',
                    text: 'Cambiar cuenta asociada',
                    margin: '0 0 5 0',
                    width: 200
                },
                {
                    xtype: 'hiddenfield',
                    name: 'OwnerId',
                    anchor: '100%'
                },
                {
                    xtype : 'combo',
            		fieldLabel : 'Acceso Web',
        			store : 'SiNoStore',
                    displayField : 'Name',
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
        			valueField : 'Value',
        			name : '_cue_nllaveul',
                    hidden: false,
                    width: 250,
                    itemId: 'accesoweb'
        		},
                /*********************************************************
                 *  Daniel O. Medina
                 *  https://basecamp.com/2249105/projects/14758734/todos/429220292
                 *  16/11/2020
                 */
                {
                    xtype: 'textfield',
                    fieldLabel: 'Observación',
                    name: 'cue_cobservacion',
                    anchor: '100%'
                },
                /****************************************************** */
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Estacionamiento',
                    name: 'ParkingLot'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Fecha Alta',
                    labelWidth: 150,
                    disabled: true,
                    anchor: '100%',
                    width: 250,
                    name: 'cue_dfechaalta'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Servicio',
                    anchor: '100%',
                    width: 250,
                    name: 'cue_dservicio'
                }                
            ]
        },
        {
        	xtype : 'fieldset',
			title : 'Dirección',
            itemId: 'direccion',            
            anchor: '100%',
            layout: 'anchor',
			items : [{
						xtype : 'textfield',
						fieldLabel : 'Calle',
						name : "cue_ccalle",
                    anchor: '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Ciudad',
						name : "cue_clocalidad",
                    anchor: '100%'

					},
                    {
                        xtype:'selecterfield',
                        itemId:'provincias',
                        simpleSelect: true,
                        config: {
                            disponible: {
                                title:'Provincia',
                                field:'pro_cdescripcion'
                            },
                            selecionado: {
                                title:'Provincia',
                                field:'pro_cdescripcion'
                            },
                            valueField:'pro_ccodigo',
                            modelItems: 'Trackguard.model.t_provinciasSearchModel'
                        },
                        title:'Provincia'
                    }
                    
                    
                    /*, {
						xtype : 'combo',
						fieldLabel : 'Provincia / Estado',
						store : 'ProvinciasStore',
						name : "cue_cprovincia",
						displayField : 'pro_cdescripcion',
                        itemId: 'comboProvincia',
						valueField : 'pro_ccodigo',
                    anchor: '100%'
					}*/, {
						xtype : 'textfield',
						fieldLabel : 'Código postal / Zip',
						name : "cue_ccodigopostal",
                        anchor: '100%'
					}

			]
		},
        {   
            xtype: 'fieldset',
            title: 'Datos del Vehículo',
            hidden: true,
            itemId: 'vehicleFields',
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype:'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Marca',
                            itemId: 'brandCombo',
                            //multiselect : false,
                            editable : false,
                            queryMode: 'local',
                            typeAhead: false,
                            displayField: 'Name',
                            valueField: 'Id',
                            name: 'VehicleBrand',
                            flex:1
                        },{
                            xtype: 'combobox',
                            fieldLabel: 'Modelo',
                            itemId: 'modelCombo',
                            store: 'VehicleModelStore',
                            //multiselect : false,
                            editable : false,
                            queryMode: 'local',
                            typeAhead: false,
                            displayField: 'Name',
                            valueField: 'Id',
                            name: 'VehicleModel',
                            flex:1
                        },{
                            xtype : 'textfield',
                            fieldLabel : 'Color',
                            name : 'Colour',
                            flex:1
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            name: 'MaxSpeed',
                            fieldLabel: 'Vel. Max.',
                            maxValue: 250,
                            minValue: 0,
                            editable : true,
                            flex:1
                        },
                        {
                            xtype: 'numberfield',
                            name: 'Year',
                            fieldLabel: 'Año',
                            maxValue: Ext.Date.format(new Date(), 'Y'),
                            minValue: Ext.Date.format(new Date(), 'Y')-50,
                            editable : true,
                            flex:1
                        },{
                            xtype : 'textfield',
                            fieldLabel : 'Matrícula',
                        	name : 'Domain',
                            flex:1
                		}
                    ]
                },
                {
                    xtype:'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype : 'textfield',
                            fieldLabel : 'Num. Motor',
                            name : 'NroMotor',
                            flex:1
                    	},{
                            xtype : 'textfield',
                            fieldLabel : 'Num. Chasis',
                            name : 'NroChasis',
                            flex:1
                		},{
                            xtype: 'combobox',
                            fieldLabel: 'Responsable',
                            itemId: 'conductorCombo',
                            store: 'SoftguardUsuarioStore',
                            //multiselect : false,
                            editable : false,
                            queryMode: 'local',
                            typeAhead: false,
                            displayField: 'usu_cnombre',
                            valueField: 'usu_iid',
                            name: 'DriverId',
                            flex:1
                        }
                        
                    ]
                }
                
            ]
        },
        {   
            xtype: 'fieldset',
            title: 'Datos de la Persona',
            itemId: 'personaFields',
            hidden: true,
            anchor: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'datefield',
                    name: 'PersonaFechaNacimiento',
                    fieldLabel: 'Fecha de Nacimiento',
                    labelWidth : 150,
                    maxValue: new Date()
                },{
                    xtype : 'textfield',
                    fieldLabel : 'Documento',
                	name : 'PersonaDNI',
                    labelWidth : 150,
        			allowBlank : false
        		},{
                    xtype: 'combobox',
                    fieldLabel: 'Género',
                    store: ['Masculino','Femenino'],
                    //multiselect : false,
                    editable : false,
                    labelWidth : 150,
                    queryMode: 'local',
                    typeAhead: false,
                    name: 'PersonaGenero'
                }
            ]
        },
        {   
            xtype: 'fieldset',
            title: 'Datos de la Mascota',
            itemId: 'mascotaFields',
            hidden: true,
            anchor: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'datefield',
                    name: 'MascotaFechaNacimiento',
                    fieldLabel: 'Fecha de Nacimiento',
                    maxValue: new Date()
                },{
                    xtype : 'textfield',
                    fieldLabel : 'Raza',
                    name : 'MascotaRaza',
        			allowBlank : false
        		},{
                    xtype : 'textfield',
                    fieldLabel : 'Color',
                    name : 'MascotaColor',
        			allowBlank : false
        		},{
                    xtype: 'combobox',
                    fieldLabel: 'Sexo',
                    store: ['Masculino','Femenino'],
                    //multiselect : false,
                    editable : false,
                    queryMode: 'local',
                    typeAhead: false,
                    name: 'MascotaGenero'
                }
            ]
        },
        {   
            xtype: 'fieldset',
            title: 'Datos del dispositivo móvil',
            itemId: 'otroFields',
            hidden: true,
            anchor: '100%',
            layout: 'vbox',
            items: [
                
                {
                    xtype : 'textareafield',
                    fieldLabel : 'Otros datos',
                    name : 'OtroTextolibre',
            		allowBlank : false
        		}
            ]
        },{
            xtype: 'fieldset',
            title: 'Datos del dispositivo',
            layout: 'anchor',
            items: [
                {
                    xtype:'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype : 'combo',
                        fieldLabel : 'Dispositivo',
                        itemId: 'comboequipos',
                        store: 'TgeEquiposStore',
                        queryMode: 'local',
                        displayField: 'Name',
                        labelWidth : 150,
                        valueField: 'Id',
                        emptyText: 'Seleccione el equipo',
                        allowBlank: false,
                        name : 'idEquipo',
                        flex:1
                    },{
                        xtype : 'combo',
                        fieldLabel : 'Modelo',
                        labelAlign: 'left',
                        itemId: 'pan_rpmidkey',
            		//	name : 'pan_rpmidkey',
            			displayField : 'rpm_cModelo',
            			valueField : 'rpm_idKey',
                        allowBlank : true,
                        queryMode: 'local',
                        flex:1,
                        forceSelection: true  
            		}]
                    
                },{
                    xtype:'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype:'combo',
                        fieldLabel:'Equipo GPS',
                        itemId: 'comboEquipoGps',
                        queryMode: 'local',
                        displayField:'pan_cdescripcion',
                        labelWidth : 150,
                        valueField:'pan_ccodigo',
                        emptyText: 'Seleccione el equipo',
                        allowBlank: false,
                        flex: 1,
                        name:'pan_ccodigo'    
                    },{                        
                        xtype : 'textfield',
                        fieldLabel : 'Imei',
                        labelWidth : 150,
                       // disabled: true,
                        name : '_imei',
                        itemId : 'imei',
                        flex:1
                    }]
                    
                },
                
                {
                    xtype:'container',
                    layout: 'hbox',
                    items: [{
                        xtype : 'textfield',
                        fieldLabel : 'Compañía 1',
                        name : 'CompaniaSIM1',
                        labelWidth : 150,
                        flex:1
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'Sim card GPRS 1',
                        labelWidth : 150,
                        name : 'SIM1',
                        flex:1,
                        itemId : 'sim1',
                        validator : function(value){
                            var t = this;
                            var x = t.up('vehicleformview').down('#sim2');
                            
                            if(!value) {
                              t.clearInvalid();
                              t.textValid = true;  
                              return t.textValid;
                            }
                            if(value != t.originalValue && value.length>4 && value != '') {
                                
                                var record = t.up('vehicleformview').record
                                    
                                var filters = [{
                                    property : 'dm.SIM1',
                                    value : value.toString()
                                },{
                                    property : 'dm.SIM2',
                                    value : value.toString()
                                },{
                                    property : 'cue_iid:NOT',
                                    value : record.get('OwnerId')
                                }];      
                        
                                var model = 'Trackguard.model.VehicleSIMSearchModel';
                        
                                var storeSP = Ext.create('Ext.data.Store',{
                                    model: model,
                                    pageSize: 50,
                                    remoteFilter: true,
                                    filters: filters
                                });
                                
                                storeSP.load({callback: function (records, operation, success) {
                                   if (records != null && records.length > 0) {
                                        t.markInvalid('El SIM1 ya existe');
                                        t.textValid = false;
                                    } else if (value == x.value) {
                                        t.clearInvalid();
										t.markInvalid('El SIM1 no puede ser igual al SIM2');
										t.textValid = false;
									} else {
                                        t.clearInvalid();
                                        t.textValid = true;
                                    }
                                    
                                    
                                }})
                            	
                            } else {
                                t.markInvalid('');
                                t.clearInvalid();
                                t.textValid = true;
                            }
                             return t.textValid;
                        }
                        
                    }]
                    
                },
                {
                    xtype:'container',
                    layout: 'hbox',
                    items: [{
                        xtype : 'textfield',
                        fieldLabel : 'Compañía 2',
                        labelWidth : 150,
                        name : 'CompaniaSIM2',
                        flex:1
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'Sim card GPRS 2',
                        labelWidth : 150,
                        name : 'SIM2',
                        flex:1,
                        itemId : 'sim2',
                        validator : function(value){
                            var t = this;
                            var x = t.up('vehicleformview').down('#sim1');
                            
                            
                            if(!value) {
                              t.clearInvalid();
                              t.textValid = true;  
                              return t.textValid;
                            }
                            if(value != t.originalValue && value.length > 6 && value != '') {
                                                        
                                var record = t.up('vehicleformview').record
                                
                                var filters = [{
                                    property : 'dm.SIM1',
                                    value : value
                                },{
                                    property : 'dm.SIM2',
                                    value : value
                                },{
                                    property : 'cue_iid:NOT',
                                    value : record.get('OwnerId')
                                }];      
                        
                                var model = 'Trackguard.model.VehicleSIMSearchModel';
                        
                                var storeSP = Ext.create('Ext.data.Store',{
                                    model: model,
                                    pageSize: 50,
                                    remoteFilter: true,
                                    filters: filters
                                })
                                
                                storeSP.load({callback: function (records, operation, success) {
                                    if (records != null && records.length > 0) {
                                        t.markInvalid('El SIM2 ya existe');
                                        t.textValid = false;
                                    } else if (value == x.value) {
                                        t.clearInvalid();
										t.markInvalid('El SIM2 no puede ser igual al SIM1');
										t.textValid = false;
									} else {
                                        t.clearInvalid();
                                        t.textValid = true;
                                    }   
                                    
                                    
                                }})
                            	
                            } else {
                                t.markInvalid('');
                                t.clearInvalid();
                                t.textValid = true;
                            }
                             return t.textValid;
                        }
                    }]
                    
                }
            ]
        }
        
        
    ],
    // cierro items
    initComponent: function(){
        this.callParent();

        if (!this.record){
            this.record=Ext.getCmp('viewport').record;
        }

        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items : [{
                text : 'Guardar',
				iconCls : 'save',
				action : 'save',
                itemId:'save'
			},{
                xtype: 'button',
                action: 'delete',
                text: 'Borrar',
                itemId:'delete'
            }, {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				text : 'Foto',
				iconCls : 'icon-photo',
				itemId : 'iconPhoto',
				action : 'photo'
			}, {
    			xtype : 'tbseparator'
			}
            ]
        }); 
        this.addDocked(toolbar);
    }
});