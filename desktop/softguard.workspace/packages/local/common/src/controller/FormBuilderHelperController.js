//MIGRADO2024
Ext.define('Common.controller.FormBuilderHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'fieldsModel' ],
    views : [ 'FormBuilderHelperView' ],
    init : function(config) {
        // genero los eventos
        this.control({
			'formbuilderhelperview' : {
				afterrender : this.initview,
                deleteitem: this.onDeleteItem
			},
            'formbuilderhelperview #agregar' : {
				click : this.onAgregarClick
			}
        });
	}, 
    
    
    
    onDeleteItem: function(record,view){
        var model = this.getFieldsModelModel();        
        view.down('grid').getStore().remove(record)
        
        this.enviarAlCaller(view)
    },
    
    onAgregarClick: function (btn) {
        var view = btn.up('formbuilderhelperview')
        var xtype = view.down('#xtype').getValue()
        var fieldLabel = view.down('#fieldLabel').getValue()
        var value = view.down('#value').getValue()
        var name = view.down('#name').getValue()
        
       
        
        //meto enb el store
        view.storeField.add(this.getFieldsModelModel().create({
            xtype:xtype,
            fieldLabel:fieldLabel,
            value: value,
            metaObject: {
                            xtype:xtype,
                            fieldLabel:fieldLabel,
                            value: value,
                            name: name
                        }
        }))
        
        //limpio formulario
        view.down('#xtype').setValue('')
        view.down('#fieldLabel').setValue('')
        view.down('#value').setValue('')
        view.down('#name').setValue('')
        
        
        this.enviarAlCaller(view)
        
    },
    
    
    enviarAlCaller: function (view){
        //tomo solo la meta 
        var arrField = [];
        view.storeField.each(function (v) {
            arrField.push(v.get('metaObject'))   
        })
        
        console.log(arrField)
        //mando al caller
        view.caller.fireEvent('changedform',arrField, view.caller)
    },
   
	initview : function(view) {
        
        var record = view.record;
        var controller = this;
      
        view.storeField = Ext.create('Ext.data.Store', {
            model : this.getFieldsModelModel()
        });
        
        view.down('#formulario').bindStore(view.storeField)
        
        
        Ext.Array.each(view.fields, function (v,k) {
            
            view.storeField.add(controller.getFieldsModelModel().create({
                xtype:v.xtype,
                fieldLabel:v.fieldLabel,
                value: v.value,
                metaObject: v
            }))
        
        })
        
        
	}
});