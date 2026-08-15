Ext.define('Common.controller.ContratoTemplateFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_organizacion_fcSearchModel', 'm_template_contratoModel', 'm_template_contratoSearchModel' ],
    views : [ 'ContratoTemplateFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
			'contratotemplateformview' : {
				afterrender : this.initview,
                changedform: this.changedForm
			},
        	'contratotemplateformview button[action="save"]' : {
				click : this.onSaveClick
			},
            'contratotemplateformview button[action="delete"]' : {
				click : this.onDeleteClick
			},
            'contratotemplateformview #tmp_itipo' : {
    			change : this.onTipoClick
			}
            
            
        });
	}, 
    
    onTipoClick: function (combo, value) {
        var view = combo.up('contratotemplateformview')
        
        if(value == 1) {
            view.down('#formbuilderhelperview').show()
            view.down('#headertemplate').show()
            view.down('#organizaciones').show()
            view.down('#btntemplates').show()
        } else if (value == 3) {
            view.down('#formbuilderhelperview').hide()
            view.down('#headertemplate').hide()
            view.down('#organizaciones').hide()
            view.down('#btntemplates').hide()
            
            
            
        }
    },
    
    
    popularEtiquetas: function (view,lista,field) {
        view.down(field).removeAll()
      Ext.Array.each(lista, function (rec,i) { 
          if(rec.name) {
             var etiqueta = '{'+rec.name+'}'
             view.down(field).add({
                 xtype:'button',
                 text: rec.fieldLabel,//t.htmlentities(etiqueta),
                 translate: false,
                 tooltip:rec.name,
                 translatetooltip: true,
                 itemId: 'etiqueta'+i,
                 listeners: {
                     click: function () {
                          var textToInsert = etiqueta;
                          view.down('#editor').insertAtCursor( textToInsert )
                     }
                 }
             });  
          }
      })
    },
    
    
    onDeleteClick: function (btn) {
        var view = btn.up('contratotemplateformview')        
        
        Ext.MessageBox.confirm('Confirmar', 'Está seguro que desea borrar?', function(btn){
			if (btn=="yes"){
				view.record.erase({
    				success: function(){
						console.log('success');
					},
					callback: function(){
						console.log('callback');
					},
					failure: function(){
						console.log('failure');
					}
				})
                view.close()
			}
		}); 
        
    },
    
    changedForm: function (items, view) {
        
        view.record.set('tmp_metadata', Ext.encode({form:items}))
        this.popularEtiquetas(view,items,'#etiquetas')
    },
   

	initview : function(view) {
        var record = view.record;
        var model = this.getM_template_contratoModelModel();
        var controller = this;
        
        if (record){
           
            //record.setProxy(model.getProxy());
            record.proxy = model.getProxy();
            view.loadRecord(record);
            
            if(record.get('tmp_iorganizacion') == 0) {
                view.down('#organizaciones').setRawValue('')
            }
        } 


         var store = Ext.create('Ext.data.Store', {
            model : this.getT_organizacion_fcSearchModelModel(),
            remoteFilter: true,
            autoload: false
        });
        
        var organizaciones = view.down('#organizaciones');
        organizaciones.bindStore(store);
        store.load();
    
        var meta = [];
        if(view.record.get('tmp_metadata') && view.record.get('tmp_metadata') != '') {
            var metaForm = [];
            meta = Ext.decode(view.record.get('tmp_metadata'))
            if(meta && meta.form) {
                metaForm = meta.form
            }
            
            if(meta && meta.superTemplate) {
                view.down('#headertemplate').setValue(meta.superTemplate)
            }
        } 
        
        this.popularEtiquetas(view, metaForm,'#etiquetas')
        
         
        var etiquetasFijas = [
                { name:'fechaAlta', fieldLabel:'Fecha de alta' },
                { name:'fechaVencimiento', fieldLabel:'Fecha de vencimiento' },
                { name:'formaDePago', fieldLabel:'Forma de pago' },
                { name:'nombreOrganizacion', fieldLabel:'Nombre organizacion' },
                { name:'nombreCliente', fieldLabel:'Nombre cliente' },
                { name:'total', fieldLabel:'Total' }
            ]
        this.popularEtiquetas(view,etiquetasFijas ,'#etiquetasfijas')
        
        
        
        
        /**
         * Contrato de tipo 3 es para templates de header
         */
        view.contratotemplate = Ext.create('Ext.data.Store', {
            model : controller.getM_template_contratoSearchModelModel(),
            remoteFilter: true,            
            autoload: false,
            filters: [
                    {
                        property:'tmp_itipo',
                        value:3
                    }
                ]
        });
        
        
        view.down('#headertemplate').bindStore(view.contratotemplate);
        view.contratotemplate.load({callback:function () {}})        
        
        
	},    
   
    
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		myform = button.up('form').getForm();
        var view = button.up('contratotemplateformview');
		mymodel = myform.getRecord();
        var record = mymodel;


        myform.updateRecord(mymodel);
        
        if(mymodel.get('tmp_metadata') != '') {
            var json = Ext.decode(mymodel.get('tmp_metadata'))        
        } else {
            var json = {}
        }
        json.superTemplate = view.down('#headertemplate').getValue()        
        mymodel.set('tmp_metadata', Ext.encode(json))
        if(isNaN(mymodel.id) || mymodel.id == null){
            mymodel.id = 0;
            mymodel.data.Id = 0;
            mymodel.set('Id', 0);
        }        
        if(myform.isValid()){
         
            
    		mymodel.save({
    			scope : this,
    			callback : function(record, operation) {
                    notify('Los datos se guardaron correctamente');
               
                    
    			},
    			button : button
    		});
        }else{
            notify('No se ha guardado. Hay datos inválidos.');
        }
	},


});
