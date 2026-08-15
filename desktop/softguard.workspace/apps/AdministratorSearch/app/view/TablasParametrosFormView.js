Ext.define('AdministratorSearch.view.TablasParametrosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasparametrosformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    autoScroll: true,
    overflow: 'auto',
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
	},
	items : [
        {
        	xtype : 'displayfield',
			name : 'par_ccategoria',
            fieldLabel: 'Categoría',
            anchor:'100%'
		},
        {
    		xtype : 'displayfield',
			name : 'par_ccodigo',
            fieldLabel: 'Codigo interno',
			allowBlank : false,
            maxLength: 30,
            inputWidth :40,
            /*
            validator: function(value){
                var t = this;
                
                if(value != this.originalValue && this.originalValue != undefined) {
                
                    
                    var form = t.up('form').getForm();
                    var codigo = form.findField('par_ccodigo').getValue();
                    
                    
                    var filters = [{
                        property : 'par_ccodigo',
                        value : codigo
                    }];      
            
                    var model = 'AdministratorSearch.model.TablasParametrosSearchModel';
            
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
                        
                         return t.textValid;
                    }})
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
               
            }
            */
		},
        {
			xtype : 'displayfield',
			name : 'par_cdescripcion',
            fieldLabel: 'Descripcion',
            anchor:'100%'
		},{
    		xtype : 'displayfield',
			name : 'par_mobservacion',
            height: 80,
            fieldLabel: 'Observación',
            anchor:'100%'
		}
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    itemId: 'saveParameters',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});