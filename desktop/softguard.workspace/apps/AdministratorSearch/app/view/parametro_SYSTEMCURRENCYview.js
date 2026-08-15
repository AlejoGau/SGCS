Ext.define('AdministratorSearch.view.parametro_SYSTEMCURRENCYview', {
    extend : 'Ext.form.Panel',
    alias : ['widget.parametro_SYSTEMCURRENCYview'],
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
                xtype:'selecterfield',
                itemId:'moneda',
                simpleSelect: true,
                config: {
                    disponible: {
                        title:'Moneda',
                        field:'_nombre',
                        searchField: 'mon_cnombre'
                    },
                    selecionado: {
                        title:'Moneda',
                        field:'_nombre'
                    },
                    valueField:'mon_ccodigo',
                    modelItems: 'AdministratorSearch.model.t_monedasSearchModel'
                        
                },
                title:'Moneda'
            
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
        try {
            var obj = Ext.JSON.decode(par_cvalor)    
            this.down('#moneda').setValue(obj.codigo)
        } catch (e) {

        }
    },

	initComponent : function() {
        
		this.callParent();
        var view = this;
        this.down('selecterfield').caller = this
        this.down('selecterfield').on('selectedEvents', function (rec) {
                console.log(arguments)
                var obj = {
                    codigo:rec.get('mon_ccodigo'),
                    symbol: rec.get('mon_csymbol')
            
                }
                view.down('#par_cvalor').setValue( Ext.JSON.encode(obj))
            
            }, this);
        

        
       
	} // cierro init
});