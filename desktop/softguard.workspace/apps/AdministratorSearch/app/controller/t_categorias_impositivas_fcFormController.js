Ext.define('AdministratorSearch.controller.t_categorias_impositivas_fcFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'categoriaImpositivaStore' ],
    models : [ 't_categorias_impositivas_fcModel', 't_impuestos_fcSearchModel', 't_organizacion_fcSearchModel', 't_comprobantes_fcSearchModel' ],
    views : [ 't_categorias_impositivas_fcFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            't_categorias_impositivas_fcformview' : {
				beforerender : this.initview,
                selectedEvents: this.eventsSelected
			},
			't_categorias_impositivas_fcformview button[action="save"]' : {
				click : this.onSaveClick
			},
            't_categorias_impositivas_fcformview #comboorganizacionfacturadora' : {
                change : this.onComboorganizacionfacturadoraChange
            }
			
        });
	}, // cierro init

	initview : function(view) {
        var controller = this;
        var impuestosStore =Ext.create('Ext.data.Store',{
            model: this.getT_impuestos_fcSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })

        impuestosStore.load({callback:function () {
            view.down('#cat_cimpuesto1').bindStore(deepCloneStore(impuestosStore))
            view.down('#cat_cimpuesto2').bindStore(deepCloneStore(impuestosStore))
            view.down('#cat_cimpuesto3').bindStore(deepCloneStore(impuestosStore))
            
            view.loadRecord(view.record);
        }})

        var organizacionFacturadoraStore = Ext.create('Ext.data.Store',{
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
        })

        var cat_orgicodigoid = view.record.get('cat_orgicodigoid');

        view.down('#comboorganizacionfacturadora').bindStore(organizacionFacturadoraStore)
        organizacionFacturadoraStore.load({callback:function (records) {
            if( cat_orgicodigoid== 0) {
                view.down('#comboorganizacionfacturadora').setValue(records[0])
            }
        }})

        var tipoFilter = [{
            property:'cbt_ntipo',
            value: 1, // solo facturas de venta
            id: 'cbt_ntipo'
        }];

        if (cat_orgicodigoid>0){
            tipoFilter.push({
                property:'cbt_idOrganizacionFacturadora',
                value: cat_orgicodigoid, // solo facturas de venta
                id: 'cbt_idOrganizacionFacturadora'
            })
        }

        var TipoComprobanteStore = Ext.create('Ext.data.Store',{
            model: this.getT_comprobantes_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: tipoFilter
        })

        view.down('#cat_cbtidkey').bindStore(TipoComprobanteStore)
        TipoComprobanteStore.load({callback:function (records) {
            if(records.length <= 0) {
                Ext.MessageBox.alert('Falta configuracion', 'Es necesario tener creados tipos de comprobantes. Ingrese al Administrdor/Configuración para crearlas.', function(){});
                return false;                                  
            }
        }})

	},

    onComboorganizacionfacturadoraChange: function(combo, newValue, oldValue){
        var view = combo.up('t_categorias_impositivas_fcformview');
        var comboComprobante = view.down('#cat_cbtidkey');
        var store = comboComprobante.getStore();
        
        store.filter({
            property:'cbt_idOrganizacionFacturadora',
            value: newValue, // solo facturas de venta
            id: 'cbt_idOrganizacionFacturadora'
        })

        var comboImpuesto = view.down('#cat_cimpuesto1');

        if (oldValue){ // solo limpio combo cuando cambia de un valor anterior y no cuando selecciona de cero.
            comboImpuesto.clearValue();
            comboComprobante.clearValue();
        }
        
        var storeImpuesto = comboImpuesto.getStore();
        storeImpuesto.filter({
            property:'imp_idorganizacion',
            value: newValue, // solo facturas de venta
            id: 'imp_idorganizacion'
        })
        
    },

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_categorias_impositivas_fcformview');
        var win = button.up('window');
		var record = myform.getRecord();

		myform.updateRecord(record);

        var model = this.getT_categorias_impositivas_fcModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
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
	}
});