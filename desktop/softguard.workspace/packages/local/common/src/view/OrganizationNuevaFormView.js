//MIGRADO2024
Ext.define('Common.view.OrganizationNuevaFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.organizationnuevaformview',
    title : 'Propiedades',
    preventHeader: true,
    layout: 'anchor',
    autoScroll: true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 120,
    	anchor : '100%',
		labelAlign: 'left'					
	},
	items : [
       
             {
                xtype : 'textfield',
                name : 'Name',
    			fieldLabel : 'Nombre',
                flex: 1,
    			allowBlank : false,
                               
                validator: function(value){
                    var t = this;
                    var view = t.up('organizationnuevaformview')
                    
                    if(value != this.originalValue) {
                    
                                            
                        var filters = [{
                            property : 'Name',
                            value : value
                        }];      
                
                        var model = 'AdministratorSearch.model.OrganizationSearchModel';
                
                        var storeSP =Ext.create('Ext.data.Store',{
                            model: model,
                            pageSize: 50,
                            remoteFilter: true,
                            filters: filters
                        })
                        
                        storeSP.load({callback: function (records, operation, success) {
                            if (records.length > 0){
                                
                                t.markInvalid('El nombre ya existe');
                                t.textValid = false;
                                view.down('#save').setDisabled(true)
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                                view.down('#save').setDisabled(false)
                            }   
                            
                            
                        }})
                    } else {
                        t.clearInvalid();
                        t.textValid = true;
                        view.down('#save').setDisabled(false)
                    }
                     return t.textValid;
                }
            }
    		
        
    ],
	initComponent : function() {
		this.callParent();
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId:'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});