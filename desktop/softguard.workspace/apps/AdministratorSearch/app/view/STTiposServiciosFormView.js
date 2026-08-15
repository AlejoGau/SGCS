Ext.define('AdministratorSearch.view.STTiposServiciosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sttiposserviciosformview'],
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
			name : 'tip_ccodigo',
            fieldLabel: 'Codigo',
            width: 150,
            enforceMaxLength: true,
            maxLength: 3,
            validator: function(value){
                var t = this;
                
                if(value != this.originalValue && this.originalValue != undefined) {
                
                    
                    var form = t.up('form').getForm();
                    var codigo = form.findField('tip_ccodigo').getValue();
                    
                    var s = "000" + codigo;
                    var codigo =  s.substr(s.length-3);
                    
                    
                    var filters = [{
                        property : 'tip_ccodigo',
                        value : codigo
                    }];      
            
                    var model = 'AdministratorSearch.model.TipoServicioSearchModel';
            
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
                            
                            t.markInvalid('El codigo ya existe');
                            t.textValid = false;
                        } else {
                            t.clearInvalid();
                            t.textValid = true;
                        }   
                        
                        
                    }})
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                 return t.textValid;
            }
		},{
            xtype : 'combo',
            fieldLabel : 'Tipo',
        	name : 'tip_ntipo',
            forceSlection: true,
            editable: false,
            allowBlank: false,
            store: 'tip_ntipoStore',
            valueField : 'Value',
            queryMode: 'local',
            lastQuery: '',
            displayField : 'Name',
			allowBlank : false,
            inputWidth :200,
            itemId: 'tiposervicio'
		},
        {
			xtype : 'textfield',
			name : 'tip_cdescripcion',
            fieldLabel: 'Descripcion',
            maxLength: 40,
            enforceMaxLength: true,
            anchor:'100%'
		},{
            xtype : 'textfield',
			name : 'tip_yvalor',
            fieldLabel: 'Valor',
            anchor:'100%'
		},{
    		xtype : 'numberfield',
			name : 'tip_ndias',
            fieldLabel: 'Dias proximo servicio',
            inputWidth :100,
            itemId: 'dias',
            //hidden: true
		},{
        	xtype : 'numberfield',
			name : 'tip_nvto',
            fieldLabel: 'Dias vencimiento',
            inputWidth :100
		},{
            xtype: 'numberfield',
            name: 'tip_nDuracionEstimada',
            itemId: 'tip_nDuracionEstimada',
            fieldLabel: 'Duracion estimada (horas)',
            allowBlank: true,
            minValue: 0,
            maxValue: 999,
            allowDecimals: true,
            decimalPrecision: 2,
            step: 0.25,
            inputWidth: 100,
            emptyText: 'Default 1h'
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
                    formBind: true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});