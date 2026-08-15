Ext.define('AdministratorSearch.view.paramentro_TIEMPOENESPERAview', {
    extend : 'Ext.form.Panel',
    alias : ['widget.paramentro_TIEMPOENESPERAview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 150,
        enforceMaxLength: true
    },
    items : [
       {
           xtype: 'numberfield',
           fieldLabel:'Máximo en minutos',
           itemId:'maximo',
           
           minValue: 1,
           listeners: {
               change: function (field, value) {
                   var view = field.up('paramentro_TIEMPOENESPERAview')
                   view.down('#default').setMaxValue(value)
                   view.down('#minimo').setMaxValue(value)
                   view.armoObjeto(view)
               }
           }
           
       },{
           xtype: 'numberfield',
           name: 'par_ivalor',
           fieldLabel:'Default en minutos',
           itemId:'default',
           listeners: {
               change: function (field, value) {
                   var view = field.up('paramentro_TIEMPOENESPERAview')
                   view.armoObjeto(view)
               }
           }
           
       },{
           xtype: 'numberfield',
           fieldLabel:'Mínimo en minutos',
           itemId:'minimo',
           maxValue: 999,
           minValue:2,
           value:2,
           listeners: {
               change: function (field, value) {
                   var view = field.up('paramentro_TIEMPOENESPERAview')
                   view.down('#default').setMinValue(value)
                   view.down('#maximo').setMinValue(value)
                   
                   view.armoObjeto(view)
               }
           }
           
       },{
           xtype:'textfield',
           hidden:true,
           name:'par_cvalor',
           itemId:'par_cvalor'
       }
    ],
    
    loadRecord : function(record) {
        this.callParent(arguments);
        
        var par_cvalor = record.get('par_cvalor');
        
        if (par_cvalor && par_cvalor!=''){
            var values = Ext.JSON.decode(par_cvalor);
            this.down('#minimo').setValue(values.min)
            this.down('#maximo').setValue(values.max)
            this.down('#default').setValue(values.default)
        } else {
            this.down('#maximo').setValue(record.get('par_ivalor'))
            this.down('#default').setValue(record.get('par_ivalor'))
        }
 
	},
    
    armoObjeto: function (view) {
          var obj = {
              max:view.down('#maximo').getValue(),
              default: view.down('#default').getValue(),
              min:view.down('#minimo').getValue()
          }
          
          
          view.down('#par_cvalor').setValue( Ext.JSON.encode(obj))
          
    },

    htmlentities: function (string) {
        return string;  
    },
	initComponent : function() {
		this.callParent();
               
        var t = this;
       
     
        
	} // cierro init
});