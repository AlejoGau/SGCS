Ext.define('Cuenta.view.CuentaDatosFormView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.cuentadatosformview',
    layout : 'hbox',
    align : 'stretch',
	items : [
        
	{
		xtype : 'fieldset',
        margin: '3 0 0 0',
		border: false,
		flex : 1,
		items : [

		{
			xtype : 'textfield',
			fieldLabel : 'Teléfono',
			name : "cue_ctelefono",
            itemId: 'cue_ctelefono'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Email',
			name : "cue_cemail",
            itemId : "cue_cemail"
            // se saca el control pedido por mauro 11/17/2017
            //vtype:'email',
            //vtypeText: getLocale('Debe ingresar un email válido')
		},{
            xtype: 'container',
            layout: 'hbox',
            itemId:'clavebox',
            items: [
                {
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
                    itemId: 'clave',
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
                    action: 'passwordChange'
                }
            ]
        }, {
			xtype : 'textfield',
			fieldLabel : 'Permiso',
            itemId: 'permiso',
            disabled: true,
            inputType : 'password'
		},{
            xtype : 'textfield',
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
            hidden:true,
            itemId:'particion'
            
		}, {
			xtype : 'textfield',
			fieldLabel : 'Imei',
			name : "cue_cIMEI",
            itemId: 'imei',
            validator: function(value){
                        var t = this;
                        if(!value) {
                          t.clearInvalid();
                          t.textValid = true;  
                          return t.textValid;
                        }
                        if(value != t.originalValue && value.length>4 && value != '') {
                        
                            var record = t.up('cuentadatosformview').record
                            
                            var filters = [{
                                property : 'cue_cIMEI',
                                value : value
                            },{
                                property : 'cue_iid:NOT INT',
                                value : record.get('cue_iid')
                            }];      
                    
                            var model = 'Cuenta.model.CuentaSearchModel';
                    
                            var storeSP =Ext.create('Ext.data.Store',{
                                model: model,
                                pageSize: 50,
                                remoteFilter: true,
                                filters: filters
                            })
                            
                            storeSP.load({callback: function (records, operation, success) {
                            
                                if (records.length > 0){
                                    
                                    t.markInvalid('El Imei ya existe');
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
            

		}, 
        {
            xtype:'selecterfield',
            itemId:'tipo',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Tipo',
                    field:'tip_cdescripcion',
                    searchField:'o.[tip_cdescripcion]'
                },
                selecionado: {
                    title:'Tipo',
                    field:'tip_cdescripcion'
                },
                valueField:'tip_ccodigo',
                prefijoParaFiltro:'o',
                modelItems: 'Tablas.model.t_tiposSearchModel',
                nuevoView:'tablastiposformview',     
                editorView:'tablastiposformview'                    
            },
            title:'Tipos'
        
        },
        
      /*  {
			xtype : 'combo',
			fieldLabel : 'Tipo',
			//store : 'TablaTiposStore',
			displayField : 'tip_cdescripcion',
            queryMode: 'local',
            //plugins: ['clearbutton'],
			valueField : 'tip_ccodigo',
			name : "cue_ctipo",
            itemId: 'tipo',
            editable: false
		}, *//*{
			xtype : 'combo',
			fieldLabel : 'Instalador',
			name : "cue_cinstalador",
		//	store : 'TablaInstaladoresStore',
            plugins: ['clearbutton'],
            editable: false,
            forceSelection: true,
            itemId: 'instaladorCombo',
            queryMode: 'local',
			displayField : 'ins_cnombre',
			valueField : 'ins_ccodigo'

		},*/
        {
            xtype:'selecterfield',
            itemId:'instaladorCombo',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Instaladores',
                    field:'ins_cnombre',
                    searchField:'ins_cnombre'
                },
                selecionado: {
                    title:'Instaladores',
                    field:'ins_cnombre'
                },
                valueField:'ins_ccodigo',
                prefijoParaFiltro:'ins',
                modelItems: 'Tablas.model.t_instaladoresSelectModel',
                nuevoView:'tablasinstaladoresformview',
                
                                    
                editorView:'tablasinstaladoresformview'
                                    
                    
            },
            /*filters: [{
                property: 'lin_ccodigo',
                value: record.get('cue_clinea')
            }],*/
            title:'Instaladores'
        
        },{
			xtype : 'textfield',
			fieldLabel : 'Fecha alta',
            itemId: 'fechaAlta',
			name : "cue_dfechaalta",
            renderer: function (value) {
                return Ext.Date.format(new Date(value), 'd/m/Y');
            }

		}, {
			xtype : 'datefield',
			fieldLabel : 'Servicio',
			name : "cue_dservicio",
            itemId: 'servicio'
		},
        
         {
            xtype : 'combo',
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
    		xtype : 'textfield',
			fieldLabel : 'Id. Ext.',
			name : "cue_cIdExtendido",
            maxLength: 100,
            enforceMaxLength: true,
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
				xtype : 'textarea',
				fieldLabel : 'Observación',
                growMin: 115,
                growMax: 115,
                grow: true,
				name : "cue_cobservacion"
			},{
                xtype : 'textarea',
                fieldLabel : 'Ubicación',
                name : "cue_cubicacion",
                growMin: 115,
                growMax: 115,
                grow: true,
                itemId: 'ubicacion'
            },{
                xtype : 'button',
                text : 'Más información',
                iconCls : 'icon-application-form-edit',
                margin : '0 0 5 85',
                action : 'moreInfo'                
            },{
                xtype : 'textfield',
                hidden : true,
                itemId : 'moreInfoText'
            },{
				xtype : 'hiddenfield',
				fieldLabel : 'Foto',
				name : "cue_cfoto"
			},{
				xtype : 'hiddenfield',
				fieldLabel : 'Lat/long',
				name : "cue_cLatLng"
			},
            {
    			xtype : 'textfield',
				fieldLabel : 'Latitud',
                regex: /-?\d{1,2}\.?\d+$/i,
                maskRe: /[\d\.-]/i,
                regexText: getLocale("Debe ingresar un valor de latitud válido"),
				name : "_lat",
                itemId: '_lat'
			},
            {
        		xtype : 'textfield',
				fieldLabel : 'Longitud',
                regex: /-?\d{1,2}\.?\d+$/i,
                maskRe: /[\d\.-]/i,
                regexText: getLocale("Debe ingresar un valor de longitud válido"),
				name : "_long",
                itemId: '_long'
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
                editable: false
    		}
            /*,
    		{
				xtype : 'hiddenfield',
				name : "cue_cLatLng"
			}*/
		]
	}
	],

    initComponent : function() {
        //this.addEvents('passwordchanged');
		this.callParent(arguments);
        var t = this;
        //es para que se genere en tro hilo
        if(t.down('#instaladorCombo')) {
            setTimeout(function () {
                t.down('#instaladorCombo').filter =  [{
                        property: 'lin_ccodigo',
                        value: t.up('cuentaformview').record.get('cue_clinea')
                    }]
                    
                t.down('#instaladorCombo').config.recordParaNuevo =  Ext.create('Tablas.model.TablasInstaladoresModel',{
                                            ins_iTipo: 0,
                                            ins_cDealer: t.up('cuentaformview').record.get('cue_clinea')
                                        });
                t.down( '#instaladorCombo' ).config.recordParaNuevo.set('Id',0);                                        
                t.down('#tipo').config.recordParaNuevo =  Ext.create('Tablas.model.TablasTiposModel',{       
                                            tip_ccodigo:''
                                        })
                
            },30)
        }
	} // cierro init
});





/*
 __      ___       _                 _             _ 
 \ \    / (_)     (_)               | |           | |
  \ \  / / _  __ _ _  ___ ___  _ __ | |_ _ __ ___ | |
   \ \/ / | |/ _` | |/ __/ _ \| '_ \| __| '__/ _ \| |
    \  /  | | (_| | | (_| (_) | | | | |_| | | (_) | |
     \/   |_|\__, |_|\___\___/|_| |_|\__|_|  \___/|_|
              __/ |                                  
             |___/                                   
             
*/



Ext.define('SmartTrack.view.SmartTrackCuentaDatosFormView', {
    extend : 'Cuenta.view.CuentaDatosFormView',
    //extend : 'Ext.panel.Panel',
    alias : 'widget.smarttrackcuentadatosformview',
    layout : 'hbox',
    align : 'stretch',
    items : [
        
	{
		xtype : 'fieldset',
        margin: '3 0 0 0',
		border: false,
		flex : 1,
		items : [

		{
			xtype : 'textfield',
			fieldLabel : 'Teléfono',
			name : "cue_ctelefono"

		}, {
			xtype : 'textfield',
			fieldLabel : 'Email',
			name : "cue_cemail",
            vtype:'email',
            vtypeText: getLocale('Debe ingresar un email válido')
		},{
            xtype: 'container',
            layout: 'hbox',
            itemId:'clavebox',
            items: [
                {
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
                    itemId: 'clave',
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
                    action: 'passwordChange'
                }
            ]
        }, {
			xtype : 'textfield',
			fieldLabel : 'Permiso',
            itemId: 'permiso',
            disabled: true,
            inputType : 'password'
		},{
            xtype : 'textfield',
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
            hidden:true,
            itemId:'particion'
            
		}, /*{
			xtype : 'textfield',
			fieldLabel : 'Imei',
			name : "cue_cIMEI",
            itemId: 'imei'
            
		},*/ {
			xtype : 'combo',
			fieldLabel : 'Tipo',
		//	store : 'TablaTiposStore',
			displayField : 'tip_cdescripcion',
            queryMode: 'local',
            //plugins: ['clearbutton'],
			valueField : 'tip_ccodigo',
			name : "cue_ctipo",
            itemId: 'tipo',
            editable: false
		},/* {
			xtype : 'combo',
			fieldLabel : 'Instalador',
			name : "cue_cinstalador",
		//	store : 'TablaInstaladoresStore',
            plugins: ['clearbutton'],
            editable: false,
            forceSelection: true,
            itemId: 'instaladorCombo',
            queryMode: 'local',
			displayField : 'ins_cnombre',
			valueField : 'ins_ccodigo'

		},*/ {
			xtype : 'datefield',
			fieldLabel : 'Fecha alta',
            format: 'd/m/Y H:i:s',
            itemId: 'fechaAlta',
			name : "cue_dfechaalta"

		}, {
			xtype : 'datefield',
			fieldLabel : 'Servicio',
			name : "cue_dservicio",
            itemId: 'servicio'
		},
        
        /* {
            xtype : 'combo',
			fieldLabel : 'Efectiva',
			store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
			valueField : 'Value',
			name : "cue_nEfectiva",
            itemId: 'efectiva'
            
		},   */     
        
        /*
        {
			xtype : 'textfield',
			fieldLabel : 'Efectiva',
			name : "cue_nEfectiva",
            itemId: 'efectiva' 
		},
        */
        
      /*  {
    		xtype : 'textfield',
			fieldLabel : 'Id. Ext.',
			name : "cue_cIdExtendido",
            itemId: 'idext' 
		}*/
        
        
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
				xtype : 'textarea',
				fieldLabel : 'Observación',
                growMin: 115,
                growMax: 115,
                grow: true,
				name : "cue_cobservacion"
			}, {
				xtype : 'textarea',
				fieldLabel : 'Ubicación',
				name : "cue_cubicacion",
                growMin: 115,
                growMax: 115,
                grow: true,
                itemId: 'ubicacion'
			}, {
				xtype : 'hiddenfield',
				fieldLabel : 'Foto',
				name : "cue_cfoto"
			},
            
            
			{
				xtype : 'hiddenfield',
				fieldLabel : 'Lat/long',
				name : "cue_cLatLng"
			},
            {
    			xtype : 'textfield',
				fieldLabel : 'Latitud',
                regex: /-?\d{1,2}\.?\d+$/i,
                maskRe: /[\d\.-]/i,
                regexText: getLocale("Debe ingresar un valor de latitud válido"),
				name : "_lat",
                itemId: '_lat'
			},
            {
        		xtype : 'textfield',
				fieldLabel : 'Longitud',
                regex: /-?\d{1,2}\.?\d+$/i,
                maskRe: /[\d\.-]/i,
                regexText: getLocale("Debe ingresar un valor de longitud válido"),
				name : "_long",
                itemId: '_long'
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
                editable: false
    		}
            /*,
    		{
				xtype : 'hiddenfield',
				name : "cue_cLatLng"
			}*/
		]
	}
	],

    initComponent : function() {
        //this.addEvents('passwordchanged');
		this.callParent(arguments);
	} // cierro init
});