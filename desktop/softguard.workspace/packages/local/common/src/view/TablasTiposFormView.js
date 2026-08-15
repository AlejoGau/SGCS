//MIGRADO2024
Ext.define('Common.view.TablasTiposFormView', {
    extend : 'Ext.form.Panel',
    showLblHlp: true,
    alias : ['widget.tablastiposformview'],
    preventHeader: true,
    frame: true,
    layout: 'anchor',
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 100,
		enforceMaxLength: true,
        anchor:'100%'
	},
	items : [
        {
    		xtype : 'textfield',
			name : 'tip_ccodigo',
            fieldLabel: 'Codigo',
			allowBlank : false,
            maxLength: 3,
            inputWidth :40,
            validator: function(value){
                var t = this;
                if(Ext.util.Format.trim(t.up('tablastiposformview').record.get('tip_ccodigo')) != Ext.util.Format.trim(value)) {
                    if (Ext.util.Format.trim(value.charAt(0)) == '_' || value == '' || parseInt(value) == 0){
                        
                        this.markInvalid('No puede ser 0, vacio o comenzar con guion bajo.');
                        this.textValid = 'No puede ser 0, vacio o comenzar con guion bajo.';
                        
                    } else {
                        
                        var filters = [{
                            property : 'tip_ccodigo',
                            value : value
                        }];      
                
                        var model = 'Common.model.TablasTiposSearchModel';
                
                        var store =Ext.create('Ext.data.Store',{
                            model: model,
                            pageSize: 50,
                            remoteSort: true,
                            remoteFilter: true,
                            filters: filters,
                            autoload: false
                        })
                        
                        store.load({callback: function (records, operation, success) {
                            if (records.length <= 0){
                                
                                t.clearInvalid();
                                t.textValid = true;
                                
                            } else {
                                t.markInvalid('El codigo ya esta siendo utilizado.');
                                t.textValid = 'El codigo ya esta siendo utilizado.';
                            }
                        }});
                    }   
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                return this.textValid;
            }
            
		},{
			xtype : 'textfield',
			name : 'tip_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
             maxLength: 40,
             anchor:'100%'
		},{
			xtype : 'textfield',
			name : 'tip_cRubro',
            fieldLabel: 'Rubro',
             maxLength: 255,
             anchor:'100%'
		},{
        	xtype : 'combo',
            itemId: 'combotipo',
            fieldLabel : 'Condición',
			name : 'tip_nTipo',
            store: [
                [0,getLocale('Objetivo Fijo o SmartPanics')],
                [1,getLocale('TrackGuard - Vehículo')],
                [2,getLocale('TrackGuard - Persona')],
                [3,getLocale('TrackGuard - Mascota')],
                [4,getLocale('MapGuard - Móvil de respuesta o de servicio técnico')],
                [5,getLocale('Vigicontrol')],
                [6,getLocale('Cercos')],
                [7,getLocale('Unidad funcional')],
                [8,getLocale('Acceso')],
                [9,getLocale('CleanApp')],
                [10,getLocale('SmartPanicsPC')],
                [11,getLocale('TecGuard')],
                [12,getLocale('IOT - Candado')],
                [13,getLocale('LPR - License Plate Recognition')]
            ],
			allowBlank : false
		},{
            
            xtype : 'combo',
			fieldLabel : 'Servicios Patrulla',
            itemId: 'combopatrulla',
			name : 'tip_cservicio',
			displayField : 'tsp_cdescripcion',
            queryMode: 'local',
            lastQuery: '',
			valueField : 'tsp_ccodigo',
            hidden: true,
            allowBlank : true
		},
        {
            xtype: 'container',
            itemId: 'icongroupPoi',
            hidden: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combo',
                    itemId: 'comboIconoPoi',
                    fieldLabel: 'Ícono',
                    name : 'Icon',
                    displayField : 'text',
            		valueField : 'Name',
                    listConfig: {
                      getInnerTpl: function(displayField) {
                        return '<img src="/resources{Path}/{Name}" class="icon" width="19" align="middle"/> {' + displayField + '}';
                      }
                    },
                    allowBlank: true,
                    queryMode: 'local',
                    flex: 1
                },{
            		xtype:'image',
                    width: '19',
                    itemId: 'imagenPoi',
                    hidden: false
        		}
            ]
        },
        {
            xtype: 'container',
            itemId: 'icongroupTypeTG',
            hidden: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combo',
                    itemId: 'comboIconoTypeTG',
                    fieldLabel: 'Ícono',
                    name : 'Icon',
                    displayField : 'text',
            		valueField : 'Name',
                    listConfig: {
                      getInnerTpl: function(displayField) {
                        return '<img src="/resources{Path}/{Name}" class="icon" width="19" align="middle"/> {' + displayField + '}';
                      }
                    },
                    allowBlank: true,
                    queryMode: 'local',
                    flex: 1
                },{
            		xtype:'image',
                    width: '19',
                    itemId: 'imagenTypeTG',
                    hidden: false
        		}
            ]
        },
        {
        	xtype : 'hiddenfield',
			name : 'tip_curlimagen',
            itemId: 'urlimagen',
            fieldLabel: 'Url Imagen Map',
			allowBlank : true,
             maxLength: 200,
             anchor:'100%'
		},{
            xtype : 'hiddenfield',
            itemId: 'condicion',
			name : 'tip_nCondicion'
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
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});