Ext.define('AdministratorSearch.controller.mg_listas_precios_detallesFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'mg_listas_precios_detalleSearchModel' ],
    views : [ 'mg_listas_precios_detallesFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
					'mg_listas_precios_detallesformview' : {
						beforerender : this.initview,
                        productselected: this.onProductChanged
					},
					'mg_listas_precios_detallesformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'mg_listas_precios_detallesformview #seleccionproducto' : {
						click : this.onSelectProductClick
					}
    				
                });
	}, // cierro init


    onProductChanged: function(record, view){


        var myform = view.getForm();
        var recordListaDetalle = myform.getRecord();

        recordListaDetalle.set('mglpd_idproducto',record.get('Id'))

        view.down('#nombreproducto').setValue(record.get('Name'))
        
    },
    
    
    onSelectProductClick : function(button, event, options) {
        var view =button.up('mg_listas_precios_detallesformview');
        
        var win = Ext.create('Ext.Window', {
        	layout: 'fit',
			title : 'Seleccione un producto',
			closeAction : 'hide',
            itemId: 'productWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view: view,
			items : [
                {xtype: 'producthelperview'}
            ]
		});
		win.show();
	},




	initview : function(view) {
        
        view.loadRecord(view.record);
        view.down('#nombreproducto').setValue(view.record.get('Name'))
	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('mg_listas_precios_detallesformview');
        var win = button.up('window');
		var record = myform.getRecord();



        var detalleStore =Ext.create('Ext.data.Store',{
            model: this.getMg_listas_precios_detalleSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property:'mglpd_idproducto',
                value:record.get('mglpd_idproducto')
        
            },{
                property:'mglpd_idlista',
                value:record.get('mglpd_idlista')
            },{
                property:'mglpd_idkey:NOT',
                value:record.get('Id')
            }],
        }).load({callback:function (records) {
            
            if(records.length<=0) {
                
                myform.updateRecord(record);
        
      
                if (myform.isValid()){
                	record.save({
            			scope : this,
                       
                        view: view,
            			callback : function(record, operation) {
                            if (operation.success){
                                var win = view.up('window');           
                                notify('Los datos se guardaron correctamente');
                                view.caller.fireEvent('objectchanged',view.caller,record);
                                win.close();
                            } else {
                                notifyError('Hubo un error al guardar los datos');
                            }
                            
            			},
            			button : button
            		});
                }


            } else {

                notify('El producto ya se encuentra en la lista.')
                return false;

            }


        }})

		
	}	
   
});