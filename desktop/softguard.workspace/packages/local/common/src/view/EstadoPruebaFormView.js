//MIGRADO2024
Ext.define('Common.view.EstadoPruebaFormView', {
    extend : 'Ext.form.FormPanel',
    alias : 'widget.estadopruebaformview',
    title : 'Situacion',
    preventHeader: true,
	autoScroll : true,
	layout : 'anchor',
    fieldDefaults: {anchor: '100%'},
	dockedItems : [{
		xtype : 'toolbar',
		items : [{
					text : 'Guardar',
					iconCls : 'save',
					action : 'save'
				}]
			}],
	items : [
        {
            xtype: 'container',
            layout: 'hbox',
            items:[{
                	xtype : 'displayfield',
        			fieldLabel : 'Estado',
        			name : 'est_nestado',
                    labelWidth: 50,
                    renderer: function(value, field){
                        var store = Ext.getStore('SoftguardEstadoEstadoStore');
                        if (store)
                            var record = store.findRecord('Value', value);
                        if (record){
                            var estado = record.get('Name');
                            var rclass = 'habilitado';
                            switch (Ext.String.trim(estado)) {
                        		case 'No Habilitado' :
                					rclass = 'nohabilitado';
                                    break;
                				case 'En Prueba' :
                					rclass = 'prueba';
                                    break;
                				case 'En Prueba x Zonas' :
                					rclass = 'pruebazonas';
                                    break;
                			}
                            field.bodyEl.removeCls(field.lastClass);
            				field.bodyEl.addCls(rclass);
                            field.lastClass = rclass;
                            return estado;
                        } else{
                            return value
                        }
                            
                    },
                    width: 250
        		}, 
                {
                    xtype: 'button',
                    text: 'En prueba',
                    action: 'prueba',
                    itemId: 'btnprueba',
                    margin: '0 0 0 5',
                    flex: 1
                }, 
                {
                    xtype: 'button',
                    text: 'Deshabilitar',
                    itemId: 'btndeshabilitar',
                    action: 'deshabilitar',
                    margin: '0 0 0 5',
                    flex: 1
                }, 
                {
                    xtype: 'button',
                    text: 'Habilitar',
                    action: 'habilitar',
                    itemId: 'btnhabilitar',
                    margin: '0 0 0 5',
                    flex: 1
                }
                
            ]
        },
        {
            xtype: 'container',
            itemId: 'nohabilitado',
            fieldDefaults: {anchor: '100%'},
            layout: 'anchor',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5 0 5 0',
                    items: [
                        {
                            xtype : 'numberfield',
                			fieldLabel : 'Duracion',
                            itemId: 'duracion',
                            labelAlign: 'right',
                            value: 1,
                            minValue: 1,
                			name : "est_nduracion",
                            margin: '0 0 0 5',
                            labelWidth: 150,
                            flex:1
                		},{
                    		xtype : 'combobox',
                			fieldLabel : 'Tipo',
                            itemId: 'tipo',
                            labelWidth: 50,
                			name : "est_ntipo",
                            // estaba comentado pero comenzo a fallar, 
                            // si se comenta esta asignacion hay qeu agregar el estore en el controller
                            // sino usar un IF de RAZOR
                			store: 'SoftguardEstadoTipoStore',
                            queryMode: 'local',
                			displayField: 'Name',
                            anchor: '100%',
                			valueField: 'Value',
                            flex: 1
                		}
                ]},
                {
                    xtype: 'container',
                    layout: 'hbox',
                    hidden: true,
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'est_dfechadesde',
                            fieldLabel: 'Fecha Desde',
                            labelWidth: 50,
                            disabled: true,
                            width: 200
                        },
                        {
                            xtype: 'timefield',
                            fieldLabel: 'Hora',
                            itemId: 'desdeTime',
                            disabled: true,
                            margin: '0 0 0 5',
                            labelWidth: 35,
                            flex: 1
                        },{
                            xtype: 'datefield',
                            name: 'est_dfechahasta',
                            margin: '0 0 0 5',
                            labelWidth: 35,
                            disabled: true,
                            fieldLabel: 'Hasta',
                            flex: 1
                        },
                        {
                            xtype: 'timefield',
                            fieldLabel: 'Hora',
                            itemId: 'hastaTime',
                            labelWidth: 35,
                            margin: '0 0 0 5',
                            //disabled: true,
                            flex: 1
                        }
                    ]
                }, {
        			xtype : 'textarea',
        			fieldLabel : 'Nota',
                    labelWidth: 50,
                    itemId:'nota',
        			name : "est_mnota"
        		}
                
            ]
        }
		
		]
			// cierro items datos
	
	// cierro items
});