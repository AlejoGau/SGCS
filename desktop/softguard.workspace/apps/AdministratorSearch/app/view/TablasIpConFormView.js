Ext.define('AdministratorSearch.view.TablasIpConFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasipconformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
	},
	items : [
         {
			xtype : 'textfield',
			name : 'ipc_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            maxLength: 40,
            anchor: '100%'
		},{
    		xtype : 'combo',
        	fieldLabel : 'Receptor',
            itemId: 'receptor',
			name : 'ipc_ireceptor',		
			displayField : 'rec_cdescripcion',
			valueField : 'rec_iid',
            anchor : '100%',
            allowBlank : false,
            queryMode: 'local'
		},{
        	xtype : 'numberfield',
			name : 'ipc_nport',
            fieldLabel: 'Port',
            minValue: 1025,
            maxValue: 32767,
            inputWidth :100,
            validator: function(value){
                var t = this;
                var view = this.up('tablasipconformview');
                var record = view.record;
                if((value != this.originalValue || record.get('Id') == 0)) {
                	if(this.originalValue != undefined) {             
						var filters = [{
							property : 'ipc_nport',
							value : value
						}];      

						var model = 'AdministratorSearch.model.TablasIpConSearchModel';

						var storeSP =Ext.create('Ext.data.Store',{
							model: model,
							pageSize: 50,
							remoteFilter: true,
							filters: filters
						})

						storeSP.load({callback: function (records, operation, success) {
							if (records.length > 0){
								t.markInvalid('El puerto ya esta en uso');
								t.textValid = false;
							} else {
								t.clearInvalid();
								t.textValid = true;
                                this.originalValue = value;
							}   
							return t.textValid;
						}})
						
                	}

                    // valido tipo de conexion para max y min de puertos
                    var ipc_nprotocolo = view.down('#ipc_nprotocolo').getValue();
                    if (ipc_nprotocolo == 1 || ipc_nprotocolo == 2){
                        if (value < 1025){
                            t.markInvalid('El puerto debe ser mayor a 1025');
							t.textValid = false;
                        }
                    }
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                    return true;
                }
                
                return !t.hasActiveError()
            }
		},{
            xtype : 'combo',
            fieldLabel : 'Estado',
            name : 'ipc_nestado',
            itemId: 'estado',
            store: [
                [1,getLocale('Deshabilitado')],
                [2,getLocale('Habilitado')],
            ],
            inputWidth :200
    	},{
            xtype : 'combo',
            fieldLabel : 'Protocolo',
            name : 'ipc_nprotocolo',
            store: [
                [1,getLocale('TCP')],
                [2,getLocale('UDP')],
            ],
            inputWidth :100
        },{
            xtype : 'combo',
            fieldLabel : 'Responde ack',
            name : 'ipc_crespondeack',
            store: [
                [1,getLocale('Si')],
                [0,getLocale('No')],
            ],
            inputWidth :40
		},{
        	xtype : 'numberfield',
			name : 'ipc_itiempoinactividad',
            fieldLabel: 'Tiempo inactividad',
            minValue: 0,
            maxValue: 999,
            inputWidth :100
		},{
            xtype : 'combo',
            fieldLabel : 'Resetear por hb',
            name : 'ipc_cresetxhb',
            store: [
                [1,getLocale('Si')],
                [0,getLocale('No')],
            ],
            inputWidth :40
    	},{            
            xtype : 'combo',
    		fieldLabel : 'Modem sms',
            itemId: 'modemsms',
			name : 'ipc_imodemsms',			
			displayField : 'sms_cdescripcion',
			valueField : 'sms_icodigo',
            anchor : '100%',
            editable: false,
            forceSelection: true,
            emptyText: 'Seleccione',
            queryMode: 'local',
            plugins: ['clearbutton']
            
		},{
            xtype : 'textfield',
			name : 'ipc_cremotehostip',
            fieldLabel: 'Ip host remoto',
            maxLength: 16,
            inputWidth :200
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