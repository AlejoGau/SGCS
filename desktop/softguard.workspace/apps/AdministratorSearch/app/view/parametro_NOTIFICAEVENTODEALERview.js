Ext.define('AdministratorSearch.view.parametro_NOTIFICAEVENTODEALERview', {
    extend : 'Ext.form.Panel',
    alias : ['widget.parametro_NOTIFICAEVENTODEALERview'],
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
                xtype:'combobox', 
                name:'par_ivalor', 
                fieldLabel:'Valor',
                store:[[1,getLocale('Sí')],[0,getLocale('No')]], 
                value:0,
                listeners: {
                    change: function (combo,value) {
                        if(value == 1) {
                            this.up('parametro_NOTIFICAEVENTODEALERview').down('#datosAgregar').show()
                        } else {
                            this.up('parametro_NOTIFICAEVENTODEALERview').down('#datosAgregar').hide()
                        }
                    }
                }
            }, {
                xtype:'fieldset',
                title: 'Seleccione datos que incluira el reporte',
                itemId:'datosAgregar',
                hidden:true,
                items: [{
                    xtype:'checkbox',
                    fieldLabel:'Numero de cuenta',
                    itemId:'numeroCuenta'
                },{
                    xtype:'checkbox',
                    fieldLabel:'Nombre cuenta',
                    itemId:'nombreCuenta'
                }]
            },
        {
            xtype: 'textarea',
            name: 'par_cvalor',
            itemId: 'par_cvalor',
            hidden:true
        }

    ],

    loadRecord : function(record) {
        this.callParent(arguments);
        
        var par_cvalor = record.get('par_cvalor');
        try {
            var obj = Ext.JSON.decode(par_cvalor)    
            this.down('#numeroCuenta').setValue(obj.numeroCuenta)
            this.down('#nombreCuenta').setValue(obj.nombreCuenta)
        } catch (e) {

        }
    },

    initComponent : function() {
        
		this.callParent();
        var view = this;
        
        this.down('#numeroCuenta').on('change', this.getValues , this);
            
        this.down('#nombreCuenta').on('change', this.getValues , this);
        

        
       
	} // cierro init
    , 
    getValues: function (rec) {
        
                var obj = {
                    numeroCuenta:this.down('#numeroCuenta').getValue(),
                    nombreCuenta:this.down('#nombreCuenta').getValue()
                }
                
               this.down('#par_cvalor').setValue(Ext.JSON.encode(obj))
    }
});