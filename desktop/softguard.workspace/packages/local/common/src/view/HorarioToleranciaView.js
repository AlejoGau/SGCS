//MIGRADO2024
Ext.define('Common.view.HorarioToleranciaView', {
    extend : 'Ext.form.Panel',
	alias : 'widget.horariotoleranciaview',
	autoHeight : true,
	preventHeader : true,
    selType: 'checkboxmodel',
    bodyPadding: 0,
	collapsible : false,
	itemId : 'horariotoleranciaview',
	fieldDefaults : {
		anchor : '100%',
        labelWidth : 150
	},
    minHeight: 200,
    items: [{
        xtype: 'panel',
        collapsible: true,
        bodyPadding: 5,
        title : 'Opciones',
        dockedItems : [{
			xtype : 'toolbar',
			items : [{
						text : 'Guardar',
						iconCls : 'save',
						action : 'save'
					},"->",{
                        xtype:'container',
                        itemId:'timezone'
                    }]
		}],
        items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    lyout: 'vbox',
                    flex: 1,
                    items: [
                        {
                    		xtype : 'combo',
        					fieldLabel : 'Sin Horario Controla Eventos',
        					name : 'tol_nControl',
        					store : 'SiNoStore',
        					displayField : 'Name',
        					valueField : 'Value',
                            margin: '5 0 5 0',
                            queryMode: 'local',
                            validator: function(value){
                                if (this.value==0){
                                    return getLocale('Debe seleccionar una opción.');
                                }else {
                                    return true;
                                }
                            },
        					labelWidth : 200
        				}, {
        					xtype : 'combo',
        					store : 'HorarioToleranciaModoControlHorarioStore',
        					displayField : 'Name',
        					valueField : 'Value',
        					fieldLabel : 'Modo Control Horario',
        					name : 'tol_nModo',
                            queryMode: 'local',
        					labelWidth : 200
        				}, {
        					xtype : 'combo',
        					store : 'SiNoStore',
        					displayField : 'Name',
        					valueField : 'Value',
        					fieldLabel : 'Desactivacion Auto Procesa NYO',
        					name : 'tol_nAPNYO',
                            queryMode: 'local',
                            validator: function(value){
                                if (this.value==0){
                                    return getLocale('Debe seleccionar una opción.');
                                }else {
                                    return true;
                                }
                            },
        					labelWidth : 200
        				}, {
        					xtype : 'combo',
        					store : 'SiNoStore',
        					displayField : 'Name',
        					valueField : 'Value',
        					fieldLabel : 'Activacion Auto Procesa NYC',
        					name : 'tol_nAPNYC',
                            queryMode: 'local',
                            validator: function(value){
                                if (this.value==0){
                                    return getLocale('Debe seleccionar una opción.');
                                }else {
                                    return true;
                                }
                            },
        					labelWidth : 200
        				}
                    ]
                },{
                    xtype: 'fieldset',
                    title: 'Vacaciones',
                    layout: 'vbox',
                    flex: 1,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Comienzo',
                            itemId: 'tol_dVacacionesDesde',
                            name: 'tol_dVacacionesDesde'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fin',
                            itemId: 'tol_dVacacionesHasta',
                            name: 'tol_dVacacionesHasta',
                            validator: function(value){
                                var tol_dVacacionesDesde = this.up('horariotoleranciaview').down('#tol_dVacacionesDesde');
                                var fechaDesde = new Date(tol_dVacacionesDesde.getValue());
                                var fechaHasta = new Date();
                                fechaHasta = Ext.Date.parse(value, "d/m/Y");
                                if (fechaDesde && fechaHasta && fechaDesde.getTime()>fechaHasta.getTime()){
                                    //console.log('error');
                                    return getLocale('La fecha de fin debe ser posterior a la fecha de comienzo');
                                }else {
                                    return true;
                                }
                            }
                        }
                    ]
                }
                
                ]
            }
        ]
    },
    
    {
        xtype: 'panel',
        collapsible: true,
        title : 'Horarios De Tolerancia',
        itemId:'paneltolerancia',
        bodyPadding: 5,
        dockedItems : [{
    		xtype : 'toolbar',
			items : [{
						text : 'Guardar',
						iconCls : 'save',
						action : 'save'
					}]
		}],
	
	items : [{
            xtype: 'container',
            anchor : '97%',
            layout: {
                type: 'hbox'
            },
            items:[{
					xtype : 'numberfield',
                    itemId : 'tol_naperturaantes',
					name : 'tol_naperturaantes',
					fieldLabel : 'Desactiva Antes',
                    margin: '0 5 0 0',
                    width: 200,
                    value: 1,
                    minValue: 1,
                    maxValue: 999
				},{
					xtype : 'combo',
					store : 'HorarioAperturaAntesAlarmaStore',
					valueField : 'Value',
					displayField : 'Name',
                    labelWidth: 50,
					fieldLabel : 'Alarma',
					name : 'tol_caperturaantesalarma',
                    queryMode: 'local',
                    forceSelection: true,
                    flex: 1,
                    allowBlank: false,
                    forceSelection: true
				}
                
            ]
	    },{
            xtype: 'container',
            anchor : '97%',
            layout: {
                type: 'hbox'
            },
            items:[{
					xtype : 'numberfield',
					name : 'tol_naperturadespues',
                    itemId : 'tol_naperturadespues',
					fieldLabel : 'Desactiva Despu&eacute;s',
                    margin: '0 5 0 0',
                    width: 200,
                    value: 1,
                    minValue: 1,
                    maxValue: 999
				},{
					xtype : 'combo',
					store : 'HorarioAperturaDespuesAlarmaStore',
					valueField : 'Value',
					displayField : 'Name',
                    labelWidth: 50,
					fieldLabel : 'Alarma',
					name : 'tol_caperturadespuesalarma',
                    queryMode: 'local',
                    flex: 1,
                    allowBlank: false,
                    forceSelection: true
				}
            ]
            
        },{
            xtype: 'container',
            anchor : '97%',
            layout: {
                type: 'hbox'
            },
            items:[{
					xtype : 'numberfield',
					name : 'tol_ncierreantes',
                    itemId : 'tol_ncierreantes',
					fieldLabel : 'Activa Antes',
                    margin: '0 5 0 0',
                    width: 200,
                    value: 1,
                    minValue: 1,
                    maxValue: 999
				}, {

					xtype : 'combo',
					store : 'HorarioCierreAntesAlarmaStore',
					valueField : 'Value',
					displayField : 'Name',
                    labelWidth: 50,
					fieldLabel : 'Alarma',
					name : 'tol_ccierreantesalarma',
                    queryMode: 'local',
                    flex: 1,
                    allowBlank: false,
                    forceSelection: true
				}
            ]
            
        },{
            xtype: 'container',
            anchor : '97%',
            layout: {
                type: 'hbox'
            },
            items:[{
					xtype : 'numberfield',
					name : 'tol_ncierredespues',
                    itemId : 'tol_ncierredespues',
					fieldLabel : 'Activa Despu&eacute;s',
                    margin: '0 5 0 0',
                    width: 200,
                    value: 1,
                    minValue: 1,
                    maxValue: 999
				}, {
					xtype : 'combo',
					store : 'HorarioCierreDespuesAlarmaStore',
					valueField : 'Value',
					displayField : 'Name',
                    labelWidth: 50,
					fieldLabel : 'Alarma',
					name : 'tol_ccierredespuesalarma',
                    queryMode: 'local',
                    flex: 1,
                    allowBlank: false,
                    forceSelection: true
				}
            ]
            
        },

        {
            xtype: 'container',
            anchor : '97%',
			layout : 'hbox',
			items : [{
					xtype : 'combo',
					fieldLabel : 'Genera No Desactivo A&uacute;n',
					store : 'SiNoStore',
					displayField : 'Name',
					valueField : 'Value',
					name : 'tol_nnyo',
                    queryMode: 'local',
                    margin: '0 5 0 0',
                    flex: 1,
                    allowBlank: false,
                    validator: function(value){
                        if (this.value==0){
                            return getLocale('Debe seleccionar una opción.');
                        }else {
                            return true;
                        }
                    }
				}, {
					xtype : 'combo',
					fieldLabel : 'Genera No Activo A&uacute;n',
					name : 'tol_nnyc',
					store : 'SiNoStore',
					displayField : 'Name',
                    queryMode: 'local',
					valueField : 'Value',
                    flex: 1,
                    validator: function(value){
                        if (this.value==0){
                            return getLocale('Debe seleccionar una opción.');
                        }else {
                            return true;
                        }
                    }
				}]
			}
        ]}
		// Cierro Items
        ]
});