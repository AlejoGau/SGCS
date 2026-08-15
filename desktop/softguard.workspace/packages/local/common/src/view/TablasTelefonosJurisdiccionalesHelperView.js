//MIGRADO2024
Ext.define('Common.view.TablasTelefonosJurisdiccionalesHelperView', {
    extend : 'Ext.form.Panel',
    showLblHlp: true,
    alias : ['widget.tablastelefonosjuridiccionaleshelperview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 120,
    	enforceMaxLength: true
	},
    
	items : [
        {
                    
            xtype : 'displayfield',
            name : "tel_clista",  
            fieldLabel : 'Lista',
        	renderer: function(value){										
				var store = Ext.data.StoreManager.get('TablaListasEmergenciaStore');
				var record = store.findRecord('Codigo', value);							
				if(record == undefined)
					return value;
				else					
					return record.get('Descripcion');										
			}
		},{
			xtype : 'displayfield',
			name : 'tel_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,
             maxLength: 40,
             anchor:'100%'
		},{
    		xtype : 'displayfield',
			name : 'tel_cobservacion',
            fieldLabel: 'Observacion',
			allowBlank : false,
             maxLength: 200,
             anchor:'100%'
		},{
        	xtype : 'displayfield',
			name : 'tel_ctelefono',
            fieldLabel: 'Telefono',
			allowBlank : false,
             maxLength: 200,
             anchor:'100%'
		},{
            
            xtype : 'displayfield',
            name : "tel_ndiscado",  
            fieldLabel : 'Discado',
    		renderer: function(value){										
				var store = Ext.data.StoreManager.get('TelefonoDiscadoStore');
				var record = store.findRecord('Value', value);							
				if(record == undefined)
					return value;
				else					
					return record.get('Name');										
			}
		},{
            xtype: 'fieldset',
            title: 'Dígitos',
            layout: 'hbox',
            items: [{
                    xtype : 'displayfield',
                	fieldLabel : 'Pre',
                    labelWidth : 60,
                    flex: 1,
        			name : 'tel_cpredigito'
        		},{
                    xtype : 'displayfield',
            		fieldLabel : 'Post',
                    labelWidth : 60,
                    margin: '0 0 0 5',
                    flex: 1,
        			name : 'tel_cpostdigito'
        		} 
            ]
		}, {
			xtype : 'displayfield',
            name : "tel_cprovincia",  
            fieldLabel : 'Provincia / Estado',
			renderer: function(value){										
				var store = Ext.data.StoreManager.get('ProvinciasStore');
				var record = store.findRecord('pro_ccodigo', value);							
				if(record == undefined)
					return value;
				else					
					return record.get('Descripcion');										
			}
		}
    ],
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                   /* iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'*/
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});