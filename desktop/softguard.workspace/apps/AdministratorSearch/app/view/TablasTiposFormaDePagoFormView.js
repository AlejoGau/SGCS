Ext.define('AdministratorSearch.view.TablasTiposFormaDePagoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablastipoformadepagoformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        
       /* {
    		xtype : 'textfield',
			name : 'tfp_ccodigo',
            fieldLabel: 'Codigo',
            validator: function(value){
                var t = this;
                
                if(value != this.originalValue && this.originalValue != undefined) {
                
                                        
                    var filters = [{
                        property : 'tfp_ccodigo',
                        value : value
                    }];      
            
                    var model = 'AdministratorSearch.model.t_tipos_formapago_fcSearchModel';
            
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
                            
                            if(value.length == 3) {
                                t.clearInvalid();
                                t.textValid = true;    
                            } else {
                                t.markInvalid('El codigo debe tener 3 caracteres.');
                                t.textValid = false;
                            }
                            
                        }   
                        
                        
                    }})
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                 return t.textValid;
            }
		},*/{
    		xtype : 'textfield',
			name : 'tfp_cdescripcion',
            fieldLabel: 'Descripcion'
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