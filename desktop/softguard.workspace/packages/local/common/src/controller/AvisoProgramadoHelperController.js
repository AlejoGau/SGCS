Ext.define('Common.controller.AvisoProgramadoHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_aviso_programadoModel', 'm_aviso_programadoSearchModel', 'OrganizationSearchModel', 'PersonSearchModel', 'm_template_contratoSearchModel' ],
    views : [ 'AvisoProgramadoHelperView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'avisoprogramadohelperview' : {
				afterrender : this.initView,
                objectedit: this.onObjectEdit
			},
            'avisoprogramadohelperview #organizacion' : {
    			change : this.onOrganizacionEmailChange
			},
            'avisoprogramadohelperview #organizacionusuario' : {
        		change : this.onOrganizacionEmailChange
			},
            'avisoprogramadohelperview #save' : {
        		click : this.onSaveClick
			},
            'avisoprogramadohelperview grid' : {            	              
                itemdblclick: this.onItemClick
			},
            'avisoprogramadohelperview #templateapply' : {                              
                click: this.onTemplateApplyClick
			},
            'avisoprogramadohelperview #agregaryo' : {                              
                click: this.onAgregarYoClick
    		}
            
            
		});
	},
    
    onTemplateApplyClick: function  (btn) {
        var view = btn.up('avisoprogramadohelperview')
        var comboTemp = view.down('#templates');
        var templateRecord = comboTemp.findRecordByValue(comboTemp.getValue());
        view.down('#name').setValue(templateRecord.get('tmp_asunto'))
        view.down('#editor').setValue(templateRecord.get('tmp_cuerpo'))
  
        if(templateRecord.get('tmp_metadata') != '') {
            var meta = Ext.JSON.decode(templateRecord.get('tmp_metadata'))
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
    },
    
    
    onObjectEdit: function (rec,view) {
      this.onItemClick(view,rec)
    },
    onItemClick: function(view,record,item,index,e,options){
        var formView = view.up('avisoprogramadohelperview')?view.up('avisoprogramadohelperview'):view
        view.record = record;
        formView.loadRecord(view.record);
        
    }, 
    
    onAgregarYoClick: function (btn) {
        var view = btn.up('avisoprogramadohelperview')
        var to = view.down('#to');
        var value = _UserData.UserId;
        
        if(to.getValue() != '') {
            to.setValue(to.getValue()+';'+value)    
        } else {
            to.setValue(value)
        }
    },
    onOrganizacionEmailChange: function (combo,value) {
   
        var view = combo.up('avisoprogramadohelperview')
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
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getPersonSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            sorters: [
                {
                    property : 'o.Id',
                    direction: 'ASC'
                }
            ],
            remoteFilter: true,
            filters: [{
                    property: 'o.[Email]:ISNOTNULLOREMPTYTRIM',
                    value: ''
                },{
                    property:'orga.Id',
                    value:view.idOrganizacion
                }]
        })
        view.down('#organizacion').bindStore(store);
        
        store.load();
        
        
         var storeCurrentUser =Ext.create('Ext.data.Store',{
            model: this.getPersonSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            sorters: [
                {
                    property : 'o.Id',
                    direction: 'ASC'
                }
            ],
            remoteFilter: true,
            filters: [{
                            property: 'o.[Email]:ISNOTNULLOREMPTYTRIM',
                            value: ''
                        },{
                            property: 'orga.Id',
                            value: _UserData.Company// controller.application.UserData.Company
                        }]
        })
        view.down('#organizacionusuario').bindStore(storeCurrentUser);
        view.down('#organizacionusuario').setFieldLabel(getLocale('Contactos de')+' '+_UserData.OrganizationName)
        storeCurrentUser.load();
        
        
        
        var meta = [];
        if(view.metadata && view.metadata != '') {
            var metaEtiqueta = [];
            meta = Ext.JSON.decode(view.metadata)
            if(metaEtiqueta && meta.formValues) {
                metaEtiqueta = meta.formValues
            }
            
            if(meta && meta.adjuntarContrato) {
                view.down('#adjuntarcontrato').setValue(meta.adjuntarContrato)
            }
        } 
        
        this.popularEtiquetas(view, metaEtiqueta,'#etiquetas')
        
         
        var etiquetasFijas = [
                { name:'fechaAlta', fieldLabel:'Fecha de alta' },
                { name:'fechaVencimiento', fieldLabel:'Fecha de vencimiento' },
                { name:'formaDePago', fieldLabel:'Forma de pago' },
                { name:'nombreOrganizacion', fieldLabel:'Nombre organizacion' },
                { name:'nombreCliente', fieldLabel:'Nombre cliente' },
                { name:'total', fieldLabel:'Total' }
            ]
        this.popularEtiquetas(view,etiquetasFijas ,'#etiquetasfijas')
        
        
        
      
        
        var store = Ext.create('Ext.data.Store', {
            model : this.getM_template_contratoSearchModelModel(),
            remoteFilter: true,
            filters: [
                    {
                        property:'tmp_itipo',
                        value: 2
                    }
                ],
        	autoload: false
        });        
 
        view.down('#templates').bindStore(store);
        store.load();
        
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
        var view = button.up('avisoprogramadohelperview');
		mymodel = myform.getRecord();
        
        if(!mymodel) {
            var mymodel = this.getM_aviso_programadoModelModel().create({
                Id: 0,
            //    prg_estado: 1,
                prg_from: '',
                prg_gateway: 'MAIL',
                prg_objectid: view.idRecord,
                prg_objecttypeid: view.idParent,
                prg_prgdatetime: new Date()
            })
        }else{
            if(typeof mymodel.get('Id') === 'string' ){
                mymodel.set('Id',0);
            }
        }    

        
        if(myform.isValid()){
            oldname = mymodel.get('Id');
    		myform.updateRecord(mymodel);
            
            // si no se envió piso la fecha de envio
            if (mymodel.get('prg_estado') == 0){
                mymodel.set('prg_enviodatetime',new Date('1/1/1900'));
            }
            
            
    		newname = mymodel.get('Id');
            
    		mymodel.save({
    			scope : this,
    			callback : function(record, operation) {
                    notify('Los datos se guardaron correctamente');
                    view.down('#to').setValue('')
                    view.down('#prg_prgdatetime').setValue('')
                    view.down('#name').setValue('')
                    view.down('#editor').setValue('')
                    view.caller.fireEvent('refresh',view.caller)
                    view.up('window').close()
    			},
    			button : button
    		});
        }else{
            notify('No se ha guardado. Hay datos inválidos.');
        }
	},
    
});