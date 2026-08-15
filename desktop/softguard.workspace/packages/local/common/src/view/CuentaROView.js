//MIGRADO2024
Ext.define('Common.view.CuentaROView', {
    extend : 'Ext.form.FormPanel',
    alias : 'widget.cuentaroview',
	bodyPadding : 0,
    border: 0,
	autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	items : [
        {
			xtype: 'container',
			layout: 'anchor',
            layout: {
                type: 'hbox'
            },
    		flex : 1,
			items: [
                {
            		xtype : 'displayfield',
                    margin: '0 5 0 5',
        			fieldLabel : 'Dealer',
                    itemId: 'dealer',
        			name : 'cue_clinea',
        			//store : 'TablaLineasStore',
        			displayField : 'lin_crazonsocial',
        			valueField : 'lin_ccodigo',
                    queryMode: 'local',
        			labelWidth : 90,
        			flex : 1
        	    },{
        			xtype : 'displayfield',
                    itemId: 'cuenta',
                    margin: '0 5 0 0',
        			name : 'cue_ncuenta',
        			disabled : false,
        			labelWidth : 40,
                    maxLength : 4,
                    enforceMaxLength : true,
        			width : 90,
        			fieldLabel : 'Cuenta'
        	    }, {
        			xtype : 'displayfield',
        			labelWidth : 45,
        			fieldLabel : 'Nombre',
        			name : 'cue_cnombre',
                    flex: 1
        	    }
            ]
        
        },
        
        {
    		xtype : 'form',
			//collapsible : true,
			title : 'Dirección',
            height: 142,
            width: 500,
            bodyPadding : 5,
			layout : 'anchor',
            fieldDefaults : {
            	anchor : '100%',
        		labelWidth : 150,
        		bindToModel : true
        	},
			items : [{
						xtype : 'displayfield',
						fieldLabel : 'Calle',
						name : "cue_ccalle"
					}, {
						xtype : 'displayfield',
						fieldLabel : 'Ciudad',
						name : "cue_clocalidad"
					}, {
						xtype : 'displayfield',
						fieldLabel : 'Provincia / Estado',
						store : 'ProvinciasStore',
						name : "cue_cprovincia",
						displayField : 'pro_cdescripcion',
                        itemId: 'comboProvincia',
						valueField : 'pro_ccodigo'
					}, {
						xtype : 'displayfield',
						fieldLabel : 'Código postal / Zip',
						name : "cue_ccodigopostal"
					}
			]
		},// cierro panel direcciones
        
		{
    		xtype: 'form',
			title:'Direccion de entrega',
			layout: {
                type: 'vbox',
                align: 'stretch'
            },
    		flex : 1,
            defaults: {
                anchor: '100%',
                margin: '2 2 0 2'
            },
			items: [
                    /*{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'box',
                                html: getLocale('(Si deja la dirección de entrega vacía se completará con los datos de Dirección)  '),
                                height: 20
                            },{
                                xtype: 'button',
                                text: 'Actualizar',
                                action: 'direccionCopy'
                            }
                        ]
                    },
                    */
                    {
                    	xtype : 'displayfield',
                		fieldLabel : 'Calle',
                		name : "cue_ccallecorreo"
                	}, {
                		xtype : 'displayfield',
                		fieldLabel : 'Ciudad',
                		name : "cue_clocalidadcorreo"
                	}, {
                		xtype : 'displayfield',
                		fieldLabel : 'Provincia / Estado',
                		store : 'ProvinciasStore',
                		name : 'cue_cprovinciacorreo',
                		displayField : 'Descripcion',
                		valueField : 'Codigo'
                	}, {
                		xtype : 'displayfield',
                		fieldLabel : 'Código postal / Zip',
                		name : "cue_ccodigopostalcorreo"
                	}
            ]
        
        },
        
        
        
        {
        	xtype: 'form',
			title:'Datos',
			layout: {
                type: 'hbox',
                align: 'stretch'
            },
    		flex : 1,
			items: [
                    {
            		xtype : 'fieldset',
                    margin: '3 0 0 0',
            		border: false,
            		flex : 1,
            		items : [
            
            		{
            			xtype : 'displayfield',
            			fieldLabel : 'Teléfono',
            			name : "cue_ctelefono"
            
            		}, {
            			xtype : 'displayfield',
            			fieldLabel : 'Email',
            			name : "cue_cemail",
                        vtype:'email',
                        vtypeText: getLocale('Debe ingresar un email válido')
            		},{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype : 'displayfield',
                                fieldLabel : 'Clave',
                                itemId: 'clave',
                                disabled: true,
                                flex: 1,
                                inputType : 'password'
                    		},{
                                xtype : 'displayfield',
                                fieldLabel : 'Clave',
                                itemId: 'claveTxt',
                                disabled: true,
                                hidden: true,
                                flex: 1
                    		}/*,
                            {
                                xtype: 'button',
                                text: 'Cambiar',
                                itemId: 'claveBtn',
                                action: 'passwordChange'
                            }*/
                        ]
                    }, {
            			xtype : 'displayfield',
            			fieldLabel : 'Permiso',
                        itemId: 'permiso',
                        disabled: true,
                        inputType : 'password'
            		},{
                        xtype : 'displayfield',
                        fieldLabel : 'Permiso',
                        itemId: 'permisoTxt',
                        name : "cue_cpermiso",
                        disabled: false,
                        hidden: true,
                        flex: 1
                	}, {
            			xtype : 'displayfield',
            			fieldLabel : 'Partición',
            			name : "cue_nparticion",
                        minValue: 0,
                        maxValue: 64
            		}, {
            			xtype : 'displayfield',
            			fieldLabel : 'Imei',
            			name : "cue_cIMEI"
            
            		}, {
            			xtype : 'displayfield',
            			fieldLabel : 'Tipo',
            			store : 'TablaTiposStore',
            			displayField : 'Descripcion',
                        queryMode: 'local',
            			valueField : 'Codigo',
            			name : "cue_ctipo"
            		}, {
            			xtype : 'displayfield',
            			fieldLabel : 'Instalador',
            			name : "cue_cinstalador",
            			store : 'TablaInstaladoresStore',
                        editable: false,
                        forceSelection: true,
                        itemId: 'instaladorCombo',
                        queryMode: 'local',
            			displayField : 'ins_cnombre',
            			valueField : 'ins_ccodigo'
            
            		}, {
            			xtype : 'displayfield',
            			fieldLabel : 'Fecha alta',
                        format: 'd/m/Y H:i:s',
                        itemId: 'fechaAlta',
            			name : "cue_dfechaalta"
            
            		}, {
            			xtype : 'displayfield',
            			fieldLabel : 'Servicio',
            			name : "cue_dservicio"
            		},
                    
                     {
                        xtype : 'displayfield',
            			fieldLabel : 'Efectiva',
            			store : 'SiNoStore',
                        displayField : 'Name',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
            			valueField : 'Value',
            			name : "cue_nEfectiva",
                        itemId: 'efectiva'
            		},        
                    
                    /*
                    {
            			xtype : 'textfield',
            			fieldLabel : 'Efectiva',
            			name : "cue_nEfectiva",
                        itemId: 'efectiva' 
            		},
                    */
                    
                    {
                		xtype : 'displayfield',
            			fieldLabel : 'Id. Ext.',
            			name : "cue_cIdExtendido",
                        itemId: 'idext' 
            		}
                    
                    
                    /*
                    ,{
                        xtype: 'timefield',
                        name: 'cue_dservicio'
                    }*/
            		]
            	}, {
            		xtype : 'fieldset',
                    margin: '3 0 0 0',
                    defaults: {labelWidth: 80},
            		border: false,
            		flex : 1,
            		items : [{
            				xtype : 'displayfield',
            				fieldLabel : 'Observación',
                            growMin: 115,
                            growMax: 115,
                            grow: true,
            				name : "cue_cobservacion"
            			}, {
            				xtype : 'displayfield',
            				fieldLabel : 'Ubicación',
            				name : "cue_cubicacion",
                            growMin: 115,
                            growMax: 115,
                            grow: true
            			}, {
            				xtype : 'hiddenfield',
            				fieldLabel : 'Foto',
            				name : "cue_cfoto",
            				flex : '1'
            			},
            
            			{
            				xtype : 'hiddenfield',
            				fieldLabel : 'Lat/long',
            				name : "cue_cLatLng"
            			},
                        {
                			xtype : 'displayfield',
            				fieldLabel : 'Latitud',
                            regex: /-?\d{1,2}\.?\d+$/i,
                            maskRe: /[\d\.-]/i,
                            regexText: getLocale("Debe ingresar un valor de latitud válido"),
            				name : "_lat"
            			},
                        {
                    		xtype : 'displayfield',
            				fieldLabel : 'Longitud',
                            regex: /-?\d{1,2}\.?\d+$/i,
                            maskRe: /[\d\.-]/i,
                            regexText: getLocale("Debe ingresar un valor de longitud válido"),
            				name : "_long"
            			}, {
                        	xtype : 'displayfield',
                			fieldLabel : 'Zona horaria',
                			store : 'ZonasHorariasStore',
                			displayField : 'ttz_cTitle',
                            queryMode: 'local',
                			valueField : 'Id',
                			name : "cue_iZonaHoraria",
                            defaultValue:''
                		}
                        /*,
                		{
            				xtype : 'hiddenfield',
            				name : "cue_cLatLng"
            			}*/
            		]
            	}
            ]
        },
        
        
	
        
        {
        	xtype : 'form',
			collapsible : true,
			title : 'Datos extra',
            height: 142,
            width: 500,
            bodyPadding : 5,
			layout : 'anchor',
            itemId: 'datosextra',
            hidden:true,
    		flex : 1,
            fieldDefaults : {
            	anchor : '30%',
        		labelWidth : 150,
        		bindToModel : true
        	},
			items : [{
                        xtype : 'displayfield',
            			fieldLabel : 'Acceso Web',
            			store : 'SiNoStore',
                        displayField : 'Name',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
            			valueField : 'Value',
            			name : "cue_nllaveul",
                        hidden:true,
                        itemId: 'accesoweb'
            		}, {
                    	xtype : 'displayfield',
            			fieldLabel : 'Mostrar foto principal',
            			store : 'SiNoStore',
                        displayField : 'Name',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
            			valueField : 'Value',
            			name : "cue_nmostrar",
                        hidden:true,
                        itemId: 'mostrarfoto'
            		}
			]
		}// cierro panel direcciones
        
],
	// cierro items
    initComponent: function(){
        this.callParent();
      //  this.down('cuentadatosformview').record = this.record;
       // this.down('cuentanumeroformview').record = this.record;
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items : [{
                    text : 'Copiar datos de cuenta',
        			iconCls : 'icon-page-copy',
                    itemId: 'copy',
    				action : 'copy'
			    },{
                    text : 'Abrir cuenta',
            		iconCls : 'icon-cuenta',
                    itemId: 'abrir',
    				action : 'abrir'
			    }]
        }); 
        this.addDocked(toolbar);
    }
});