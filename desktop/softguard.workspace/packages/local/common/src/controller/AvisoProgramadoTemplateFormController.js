//MIGRADO2024
Ext.define('Common.controller.AvisoProgramadoTemplateFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_aviso_programadoModel', 'OrganizationSearchModel', 'PersonSearchModel', 'm_template_contratoModel' ],
    views : [ 'AvisoProgramadoTemplateFormView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'avisoprogramadotemplateformview' : {
    			afterrender : this.initView,
                objectedit: this.onObjectEdit
			},
            'avisoprogramadotemplateformview #organizacion' : {
    			change : this.onOrganizacionEmailChange
			},
            'avisoprogramadotemplateformview #organizacionusuario' : {
        		change : this.onOrganizacionEmailChange
			},
            'avisoprogramadotemplateformview #save' : {
        		click : this.onSaveClick
			},
            'avisoprogramadotemplateformview grid' : {            	              
                itemdblclick: this.onItemClick
			},
            'avisoprogramadotemplateformview #templateapply' : {                              
                click: this.onTemplateApplyClick
			},
            'avisoprogramadotemplateformview #agregaryo' : {                              
                click: this.onAgregarYoClick
    		}
            
            
		});
	},
    
    onTemplateApplyClick: function  (btn) {
        var view = btn.up('avisoprogramadotemplateformview')
        
        var templateRecord = view.down('#templates').valueModels[0]
        view.down('#name').setValue(templateRecord.get('tmp_asunto'))
        view.down('#editor').setValue(templateRecord.get('tmp_cuerpo'))
  
        
    },
    
    
    onObjectEdit: function (rec,view) {
      this.onItemClick(view,rec)
    },
    onItemClick: function(view,record,item,index,e,options){
        var formView = view.up('avisoprogramadotemplateformview')?view.up('avisoprogramadotemplateformview'):view
        view.record = record;
        formView.loadRecord(view.record);
        
    }, 
    
    onAgregarYoClick: function (btn) {
        var view = btn.up('avisoprogramadotemplateformview')
        var to = view.down('#to');
        var value = _UserData.UserId;
        
        if(to.getValue() != '') {
            to.setValue(to.getValue()+';'+value)    
        } else {
            to.setValue(value)
        }
    },
    onOrganizacionEmailChange: function (combo,value) {
   
        var view = combo.up('avisoprogramadotemplateformview')
        if(value != '') {
            var to = view.down('#to');
            if(to.getValue() != '') {
                to.setValue(to.getValue()+';'+value)    
            } else {
                to.setValue(value)
            }
            
            combo.setValue('')
        }
    },
	initView : function(view) {
        view.loadRecord(view.record);
        var controller = this;
             
        
        /*var meta = [];
        if(view.metadata && view.metadata != '') {
            var metaEtiqueta = [];
            meta = Ext.JSON.decode(view.metadata)
            if(metaEtiqueta && meta.formValues) {
                metaEtiqueta = meta.formValues
            }
            
            if(meta && meta.adjuntarContrato) {
                view.down('#adjuntarcontrato').setValue(meta.adjuntarContrato)
            }
        } */
        
        if(view.record.get('tmp_metadata') != '') {
            var meta = Ext.JSON.decode(view.record.get('tmp_metadata'))
            console.log(meta)
            if(meta) {
                //pego datos en el formulario
               for (var key in meta) {
                    console.log(meta[key] ,key)                
                    if(view.down('[name="'+key+'"]')) {
                        view.down('[name="'+key+'"]').setValue(meta[key])
                    }
    
                }
            }
        }
      
         
        var etiquetasFijas = [
                { name:'fechaAlta', fieldLabel:'Fecha de alta' },
                { name:'fechaVencimiento', fieldLabel:'Fecha de vencimiento' },
                { name:'formaDePago', fieldLabel:'Forma de pago' },
                { name:'nombreOrganizacion', fieldLabel:'Nombre organizacion' },
                { name:'nombreCliente', fieldLabel:'Nombre cliente' },
                { name:'total', fieldLabel:'Total' }
            ]
        this.popularEtiquetas(view,etiquetasFijas ,'#etiquetasfijas')
        
        
        
      
        
       
        
	},
    
    popularEtiquetas: function (view,lista,field) {
        view.down(field).removeAll()
      Ext.Array.each(lista, function (rec,i) { 
          if(rec.name) {
             var etiqueta = '{'+rec.name+'}'
             view.down(field).add({
                 xtype:'button',
                 text: rec.name,//t.htmlentities(etiqueta),
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
    
    onSaveClick : function(button, event, options) {
    	
		myform = button.up('form').getForm();
        var view = button.up('avisoprogramadotemplateformview');
		mymodel = myform.getRecord();
        
       
        
        if(myform.isValid()){
    		myform.updateRecord(mymodel);
            
            var values = Ext.clone(view.getValues());
            mymodel.set('tmp_metadata',Ext.encode(view.getValues()))
            mymodel.set('tmp_asunto',view.down('#name').getValue())
            mymodel.set('tmp_cuerpo',view.down('#editor').getValue())
     
          
            mymodel.setConfig({
				proxy: this.getM_template_contratoModelModel().getProxy()
			});
    		mymodel.save({
    			scope : this,
    			callback : function(record, operation) {
                    notify('Los datos se guardaron correctamente');
                    view.caller.fireEvent('refresh',view.caller)
    			},
    			button : button
    		});
        }else{
            notify('No se ha guardado. Hay datos inválidos.');
        }
	},
    
});