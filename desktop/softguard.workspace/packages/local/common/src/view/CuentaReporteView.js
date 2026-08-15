//MIGRADO2024
Ext.define('Common.view.CuentaReporteView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.reporteview',
	autoScroll : true,
	autoHeight : true,
    bodyPadding : 0,
	layout : 'anchor',
	itemId : 'reporteview',
	fieldDefaults : {
		anchor : '100%'
	},
    items:[{
        xtype: 'panel',
        bodyPadding : 5,
    	title : 'Reportes Automaticos',
    	collapsible : true,
        layout: 'anchor',
    	dockedItems : [{
    		xtype : 'toolbar',
    		items : [{
    					text : 'Guardar',
    					iconCls : 'save',
    					action : 'savereporte'
    				}]
    			// cierro items
    		}] // cierro dockeditems
    	,
    	items : [
            {
              xtype: 'container',
              layout: 'hbox',
              defaults: {
                  margin: '0 5 5 0'
              },
              items: [/*{
                            
                    xtype : 'combo',
                    fieldLabel : 'Modem sms',
                    itemId: 'modem',
                	name : 'rep_iModemSMS',
        			displayField : 'sms_cdescripcion',
        			valueField : 'sms_icodigo',
                    anchor : '100%',
                    queryMode: 'local',
            		allowBlank : false,
                    hidden : true
        		},{
            	    xtype : 'displayfield',
                    fieldLabel : 'Modem sms',
                    name: '_rep_iModemSMS',
                    itemId: 'displaymodem'
        		},*/{
        			xtype : 'combo',
    				fieldLabel : 'Frecuencia',
    			//	store: 'CuentaReporteFrecuenciaStore',
    				displayField: 'Name',
                    queryMode: 'local',
                    value: 3,
    				valueField: 'Value',
                    flex: 1,
    				name:'rep_nfrecuencia',
        			itemId:'rep_nfrecuencia'
                }, {
                	xtype : 'datefield',
                	fieldLabel : 'Proximo Envío',
                    //minValue: new Date(),
                    value: Ext.Date.add(new Date(), Ext.Date.MONTH, 1),
                    flex: 1,
                    margin: '0 5 0 5',
                	name: 'rep_tproximoenvio'
                }, {
                	xtype : 'combo',
                	fieldLabel : 'Tipo',
                	//store: 'CuentaReporteTipoStore',
                    queryMode: 'local',
                	displayField: 'Name',
                	valueField: 'Value',
                    labelWidth: 30,
                    value: 3,
                    flex: 1,
                	name: 'rep_ntipo',
                    itemId:'rep_ntipo'
                }, {
                    xtype : 'combo',
                	fieldLabel : 'Grupos',
                	itemId:'grupos',
                    queryMode: 'local',
                	displayField: 'gru_cdescripcion',
                	valueField: 'Id',
                    labelWidth: 50,
                    flex: 1,
                	name: 'rep_idGrupo',
                    hidden:true
                }
              ]
              
            },
            {
                xtype:'displayfield',
                fieldLabel:'Alarmas del grupo',
                itemId:'alarmasgrupo',
                labelWidth: 180,
                hidden:true,
                value:'Cargando...'
            },
            {
				xtype : 'textfield',
				fieldLabel : 'Dirección de Mail',
                anchor : '100%',
				name: 'rep_cmail',
                validator: function(value){
                     
                        var reg = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
                        if(!value.match(reg) && value !='') {
                            this.markInvalid("El email esta mal formulado.");
                            this.textValid = "El email esta mal formulado.";
                        } else {
                            this.clearInvalid();
                            this.textValid = true;
                        }                             
                      
                    
                    return this.textValid;
                }
			}]
        },
            {
                
                xtype: 'tabpanel',
                itemId: 'center',
                //layout: 'fit',
                minHeight: 150,
                margins: '5 0 0 0',
                items: [
                        {
                        	xtype : 'noficacionesgridview',
                            title:'Mail',
                            showMaximizer: false,
                            itemId:'mailview',
                            stateId:'mailgridview',
                            type:'MAIL'
                    	},{
                            xtype : 'noficacionesgridview',
                            title:'Notificaciones Sms',
                            showMaximizer: false,
                            itemId:'smsview',
                            stateId:'smsgridview',
                            type:'SMS'
                    	},{
                            xtype : 'noficacionesgridview',
                            title:'Push',
                            showMaximizer: false,
                            itemId:'pushview',
                            stateId:'pushgridview',
                            type:'PUSH'
                    	}
                    ]
            }
        
        ,{
        xtype: 'panel',
        bodyPadding : 5,
        title : 'Control de Sms a consumir / Conmutación a Mail / Sms Informativo',
    	collapsible : true,
        layout: 'anchor',
    	dockedItems : [{
    		xtype : 'toolbar',
    		items : [{
    					text : 'Guardar',
    					iconCls : 'save',
    					action : 'savereporte'
    				}]
    			// cierro items
    		}] // cierro dockeditems
    	,
    	items : [
            {
              xtype: 'container',
              itemId: 'controlarSms',
              layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: { // defaults are applied to items, not the container
                    margin: '0 5 5 0'
                },
              items: [
                {
        			xtype : 'numberfield',
    				fieldLabel : 'Totales a consumir',
    				name:'rep_iLimiteSMS',
                    minValue: 0,
                    maxValue: 9999,
                    validator: function(value){
                        var t = this;
                        var form = this.up('form').getForm();
                        
                        if(form.findField('rep_cMailRuteoSMS').getValue() != "" || form.findField('rep_cSMSParaInforme').getValue() != "") {
                            if (value > 0){
                                t.clearInvalid();
                                t.textValid = true;
                                var cada= this.up('form').getForm().findField('rep_nLimiteCada');
                                cada.validate();  
                            } else {
                                t.markInvalid('El valor minimo es 1.');
                                t.textValid = false;
                            }
                            
                        } else {
                            t.clearInvalid();
                            t.textValid = true;
                        }
                        
                        
                        return t.textValid;
                    },
                    labelWidth: 180,
                    width: 240
                }, {
                	xtype : 'numberfield',
        			fieldLabel : 'Cada',
    				name:'rep_nLimiteCada',
                    labelWidth: 50,
                    validator: function(value){
                        var form = this.up('form').getForm();
                        var modem = form.findField('rep_iModemSMS').getValue()
                        if (value == 0 && modem && modem!=''){
                            var total= form.findField('rep_iLimiteSMS').getValue();
                            if (total > 0 && total!= 9999){
                                return getLocale('No puede ser cero');
                            }
                        }
                        return true;
                    },
                    width: 110,
                    minValue: 0
                }, {
                	xtype : 'combo',
                	fieldLabel : 'Unidad de tiempo',
                	store: [[0,getLocale('Día')],[1,getLocale('Mes')],[2,getLocale('Año')]],
                    queryMode: 'local',
                    labelWidth: 120,
                	name: 'rep_nCadaUnidadTiempo'
                }, {
                    //este boton se podria eliminar
                    xtype: 'button',
                    text: 'No controlar',
                    action: 'noControlar',
                    hidden:false
                }
              ]
              
            },
            
            
            {
              xtype: 'container',
              hidden: true,
              itemId: 'noControlarSms',
              layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: { // defaults are applied to items, not the container
                    margin: '0 5 5 0'
                },
              items: [{
            		xtype : 'displayfield',
    				fieldLabel : 'Totales a consumir',
                    labelWidth: 180,
                    value: getLocale('No se realiza control de sms')
                },
                 {
                    xtype: 'button',
                    text: 'Controlar',
                    action: 'controlar'
                }
              ]
              
            },
            
            {
				xtype : 'textfield',
				fieldLabel : 'Dirección de Mail',
                anchor : '100%',
				name: 'rep_cMailRuteoSMS',
                regex: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
                labelWidth: 180
			},
            {
              xtype: 'container',
              layout: {
                type: 'hbox',
                align: 'stretch'
              },
                defaults: {
                    margin: '0 5 5 0'
                },
              items: [
                {
            		xtype : 'textfield',
    				fieldLabel : 'Destino de Sms para informar',
    				name:'rep_cSMSParaInforme',
                    regex: /^[0-9;]+$/,
                    invalidText : 'Solo numeros y punto y coma (;) para separar los telefonos',
                    labelWidth: 180,
                    flex: 1
                }, {
                	xtype : 'combo',
                	fieldLabel : 'Modem Sms',
                	store: 'TablaModemsSmsStore',
                    displayField: 'sms_cdescripcion',
                    valueField: 'sms_icodigo',
                    queryMode: 'local',
                    labelWidth: 120,
                    flex: 1,
                	name: 'rep_iModemSMS',
                    hidden: false,
                    emptyText: getLocale('Seleccione'),
                    itemId: 'combomodemsms'
                    
                }
              ]
              
            },
            
            
            {
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Información de consumo',
            itemId: 'consumo',
            items:[
                {
                  xtype:'button',
                  text:'Actualizar',
                  itemId:'actualizarcontador'
                },
                {
                    xtype : 'displayfield',
                	fieldLabel : 'Sms enviados',
                    labelWidth: 180,
                    itemId: 'smsenviados'
        
        		},{
                    xtype : 'displayfield',
                	fieldLabel : 'Sms disponible',
                    labelWidth: 180,
                    itemId: 'smsdisponible'
        
        		},{
                    xtype : 'displayfield',
                	fieldLabel : 'Envio mensaje de aviso',
                    labelWidth: 180,
                    itemId: 'enviomensajeaviso'
        
        		},{
                    xtype : 'displayfield',
                	fieldLabel : 'Conmuto a mail',
                    labelWidth: 180,
                    itemId: 'conmutomail'
        		}
            ]}
        ]
    }
    //
    /*
    {
        xtype: 'reportemailview'
    }*/]
});