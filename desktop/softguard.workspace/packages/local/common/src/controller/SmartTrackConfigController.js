//MIGRADO2024
Ext.define('Common.controller.SmartTrackConfigController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
    		models : [ 'm_dealer_vcconfigModel', 'm_dealer_vcconfigSearchModel', 'CuentaSearchModel' ],
			views : [ 'SmartTrackConfigView' ],
    refs: [
    {
        ref: 'statusBar',
        selector: '#statusbar'
    }
    ],
    init: function () {
        // genero los eventos
        this.control({
            'smarttrackconfigview': {
                beforerender: this.loadData
            },
            'smarttrackconfigview [action=save]': {
                click: this.onSaveClick
            },
            'smarttrackconfigview #btnExtras': {
                change: this.onBtnExtrasChange
            },
            'smarttrackconfigview #delete': {
                click: this.onDeleteClick
            }
        });
    }, // cierro init
    
    loadData: function (panel) {
        var controller = this;
        var _ObjectId = panel.applicationId || 52;
        var _ObjectTypeName = 'UiApplication';
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        var url = '/'+_restPath+'/' +_ObjectTypeName+'/'+ _ObjectId + '/Metadata';
         
        panel.down('#btnSeleccionarRonda').setValue(0);
        Ext.Ajax.request({
          url: url,
          scope: this,
          panel: panel,
          success: function(resp,operation) {
            var metadata = Ext.JSON.decode(resp.responseText);
            this.setMetadata(metadata,operation.panel);
          }
        });
        
        /**
         * Armado de botones extras
         */
        for (i = 1; i <= 12; i++) { 
            panel.down('#btn-extras-config').add(Ext.widget({
                xtype:'container',
                layout:'hbox',                                    
                margin:'0 0 5 0',
                items:[
                      {
                          xtype:'container',
                          html:getLocale('Boton')+' '+i,
                          margin:'4 10 0 0',
                          width:70
                      },
                      {
                            xtype : 'combobox',
                            fieldLabel : 'Tipo',
                            itemId:'extra-tipo-'+i,
                            name:'extra-tipo-'+i,
                            store: [[0,getLocale('Oculto')],[1,getLocale('Evento')],[2,getLocale('Url')]],
                            ITERACION:i,
                            labelWidth:80,
                            value:0,
                            listeners:{
                               change: function (combo, value) {
                                    var container = this.up('container')
                                  
                                  
                                   container.down('#btn-nombre-'+this.ITERACION).show()
                                   if(value == 2) {
                                       container.down('#btn-formato-'+this.ITERACION).hide()
                                       container.down('#btn-url-'+this.ITERACION).show()
                                      // container.down('#btn-target-'+this.ITERACION).show()                                               
                                       
                                       container.down('#btn-formato-'+this.ITERACION).setValue('')
                                   } else if(value == 1) {                                               
                                       container.down('#btn-formato-'+this.ITERACION).show()
                                       container.down('#btn-url-'+this.ITERACION).hide()
                                     //  container.down('#btn-target-'+this.ITERACION).hide()
                                       
                                       container.down('#btn-url-'+this.ITERACION).setValue('')
                                      // container.down('#btn-target-'+this.ITERACION).setValue('')
                                   } else {
                                       container.down('#btn-nombre-'+this.ITERACION).hide()
                                       container.down('#btn-formato-'+this.ITERACION).hide()
                                       container.down('#btn-url-'+this.ITERACION).hide()
                                      // container.down('#btn-target-'+this.ITERACION).hide()
                                       
                                       container.down('#btn-nombre-'+this.ITERACION).setValue('')
                                       container.down('#btn-formato-'+this.ITERACION).setValue('')
                                       container.down('#btn-url-'+this.ITERACION).setValue('')
                                      // container.down('#btn-target-'+this.ITERACION).setValue('')
                                   }
                                   return false;
                               }
                           }
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Nombre',
                            name:'btn-nombre-'+i,
                            itemId:'btn-nombre-'+i,
                            ITERACION:i,
                            hidden:true,
                            labelWidth:80,
                            listeners:{
                               change: function (combo, value) {
                                   if(value != '') {
                                       var container = this.up('container')
                                       if(container.down('#extra-tipo-'+this.ITERACION).getValue() <= 0) { 
                                        container.down('#extra-tipo-'+this.ITERACION).setValue(1)
                                       }
                                   }
                               }
                            }
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Formato',
                            labelWidth:80,
                            name:'btn-formato-'+i,
                            itemId:'btn-formato-'+i,
                            hidden:true,
                            margin:'0 0 0 10'
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Url',
                            labelWidth:80,
                            name:'btn-url-'+i,
                            itemId:'btn-url-'+i,
                            hidden:true,
                            margin:'0 0 0 10'
                        },{
                            xtype : 'combobox',
                            fieldLabel : 'Abrir en',
                            store: [[0,getLocale('Vigicontrol')],[1,getLocale('Navegador')]],
                            name:'btn-target-'+i,
                            itemId:'btn-target-'+i,
                            hidden:true,
                            labelWidth:80,
                            value:0
                        }                        
                    ]
            }))
        }
        /**
         * Nuevo para cuando se utiliza este controller desde AdministratorSearch
         * Lo que se hace desde AdministratorSearch es pasar el flag de byDealer
         * Por lo tanto se proceden a cargar las metadatas desde el SP de m_dealer_vcconfigModel
         */
        if(!panel.byDealer) {
            Ext.Ajax.request({
              url: url,
              scope: this,
              panel: panel,
              success: function(resp,operation) {
                var metadata = Ext.JSON.decode(resp.responseText);
                this.setMetadata(metadata,operation.panel);
                controller.setDefaultValues(panel)
              }
            });
        } else {
            console.log('entre desde AdminSearch');
            var configstore =Ext.create('Ext.data.Store',{
                model: controller.getM_dealer_vcconfigSearchModelModel() ,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property: 'dvc_cdealer',
                        value: panel.record.get('cue_clinea') || panel.record.get('lin_ccodigo')
                    },
                    {
                        property: 'dvc_apptype',
                        value: panel.apptype || 'VIGICONTROL'
                    }
                ]
            }).load({callback:function (records) {
                
                var configObj
                if(records && records.length > 0) {
                    notify('Hay metadata del dealer');
                    panel.currentConfig = records[0];
                    configObj = Ext.JSON.decode(panel.currentConfig.get('dvc_config'));
                    controller.setMetadata({Config:panel.currentConfig.get('dvc_config')},panel);
                    controller.setDefaultValues(panel)
                } else {
                    //hago default con la config global
                    Ext.Ajax.request({
                      url: url,
                      scope: this,
                      panel: panel,
                      success: function(resp,operation) {
                        var metadata = Ext.JSON.decode(resp.responseText);
                        if(metadata) {
                            configObj = controller.mixMetadata(configObj, Ext.JSON.decode(metadata.Config))
                            controller.setMetadata({Config:Ext.encode(configObj)},operation.panel);
                            notify('Se tomo la metada global.')
                        } else {
                            panel.metadata = {}
                            panel.metadata.Config = {}
                        }
                        
                        controller.setDefaultValues(panel)
                        
                      }
                    });
                }
                /**
                 * Oculto el boton de Borrar si estoy desde SmartTrack
                 */
                if(!panel.currentConfig) {
                    panel.down('#delete').hide()
                }
            }})
        }
        /**
         * Muestro el boton Borrar si abri desde AdministratorSearch
         */
        if(panel.showDelete) {
            panel.down('#delete').show()
        }
    },
    setDefaultValues: function (view) {
        for (i = 1; i <= 12; i++) { 
            var target = '#btn-target-'+i;
            var bTarget = view.down(target);
            if(bTarget.getValue() == '' || bTarget.getValue() == null) {
                bTarget.setValue(0)    
            }
        }
    },
    mixMetadata: function (metadataPrincipal, metdataAgregada) {
        
        if(metadataPrincipal) {
            for(var keyMetdataAgregada in metdataAgregada) {            
                //si tiene el campo la metadata principal
                if (metadataPrincipal.hasOwnProperty(keyMetdataAgregada)) {
                    //si el campo de la metadataprincipal no tiene ningun valor
                    if((metadataPrincipal[keyMetdataAgregada] == '' || metadataPrincipal[keyMetdataAgregada] == null) && parseInt(metadataPrincipal[keyMetdataAgregada]) != 0) {
                       // console.log(keyMetdataAgregada,metadataPrincipal[keyMetdataAgregada],'->',metdataAgregada[keyMetdataAgregada])
                        metadataPrincipal[keyMetdataAgregada] = metdataAgregada[keyMetdataAgregada]
                    }
                }
            }        
        } else {
            metadataPrincipal = metdataAgregada
        }
        return metadataPrincipal;
    },
    
    onBtnExtrasChange: function (combo, value) {
        var view = combo.up('smarttrackconfigview')
        if(value == 1) {
            view.down('#btn-extras-config').show()
        } else {
            view.down('#btn-extras-config').show()
        }
    },
    
    setMetadata: function(metadata,view){
        view.metadata = metadata;
        var config = Ext.JSON.decode(metadata.Config);
        var form = view.getForm();
        
        Ext.Object.each(config, function(key, value) {
            var field = form.findField(key);
            
            if (field){
                if(field.name=='txtf-hr-nocturna-inicio' || field.name=='txtf-hr-diurna-inicio'
                    || field.name=='txtf-hr-diurna-fin' || field.name=='txtf-hr-nocturna-fin'){
                    // /Date(1199209800000-0200)/
                    var datestr = value.substr(6,13);
                    var date = new Date(value);
                    //date.setTime(datestr);
                    field.setValue(date);
                    console.log('Valor de hr nocturna inicio: '+value);
                }else
                    field.setValue(value);
            }
        });
        
        /**
         * Sumo valor por defecto para el campo de serviceUrl en caso que por metadata esté en blanco
         * */
        var serviceUrlField = form.findField('serviceUrl');
        if ( serviceUrlField && serviceUrlField.getValue() == "" ) {
            serviceUrlField.setValue(getParametro('DESKTOPEXTERNALURL'))
        }
        
        
    },
    
    onDeleteClick : function(button) {
        var view= button.up('smarttrackconfigview');
            var controller = this;
            
            Ext.MessageBox.confirm('Atencion', 'Esta a punto de eliminar la configuracion para este dealer, quiere continuar ?', function(btn){
                if(btn === 'yes'){
                    controller.getM_dealer_vcconfigModelModel().load(view.currentConfig.get('Id'), {callback:function (record) {
                        record.destroy({callback:function () {
                            notify('La configuracion fue eliminada con exito.')
                            if(view.up('window')) {
                                view.up('window').close()
                            }
                        }})            
                    }})
                } else{
                  //some code
                }
             });
    },
    onSaveClick: function(button){
        var view= button.up('smarttrackconfigview');
        var _ObjectId = view.applicationId || 52;
        var _ObjectTypeName = 'UiApplication';
        var manAliveTimeSpanField = view.down('#manAliveTimeSpan');
        var manAliveOfflineRandomMinField = view.down('#manAliveOfflineRandomMin');
        var manAliveOfflineRandomMaxField = view.down('#manAliveOfflineRandomMax');
        var manAliveTimeSpanValue = manAliveTimeSpanField.getValue();
        var manAliveOfflineRandomMinValue = manAliveOfflineRandomMinField.getValue();
        var manAliveOfflineRandomMaxValue = manAliveOfflineRandomMaxField.getValue();
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        var url = '/rest/UiApplication/'+ _ObjectId+'/Metadata';
        
        console.log('Valor en txtf-hr-nocturna-fin: '+view.down('#txtf-hr-nocturna-fin').getValue());
        let date = view.down('#txtf-hr-nocturna-fin').getValue();
        let formatted_date = /*'20'+(date.getYear()-100) + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + */
                date.getHours() + ":" + date.getMinutes();
        //var hrNocturnaFin_Str= Ext.Date.format(view.down('#txtf-hr-nocturna-fin').getValue(), 'Y-m-d');
        view.down('#dt-hr-nocturna-fin').setValue(formatted_date);
        date = view.down('#txtf-hr-nocturna-inicio').getValue();
        formatted_date = date.getHours() + ":" + date.getMinutes();
        view.down('#dt-hr-nocturna-inicio').setValue(formatted_date);
        date = view.down('#txtf-hr-diurna-inicio').getValue();
        formatted_date = date.getHours() + ":" + date.getMinutes();
        view.down('#dt-hr-diurna-inicio').setValue(formatted_date);
        date = view.down('#txtf-hr-diurna-fin').getValue();
        formatted_date = date.getHours() + ":" + date.getMinutes();
        view.down('#dt-hr-diurna-fin').setValue(formatted_date);
        
        var ArrJson = JSON.stringify(view.getForm().getFieldValues());
        // Limpia las validaciones
            manAliveTimeSpanField.clearInvalid();
            manAliveOfflineRandomMinField.clearInvalid();
            manAliveOfflineRandomMaxField.clearInvalid();
        if (manAliveOfflineRandomMinValue > manAliveOfflineRandomMaxValue) {
            notify('El valor mínimo no puede ser mayor que el valor máximo');
            manAliveOfflineRandomMinField.markInvalid(''); // Marca como inválido
            return false;
        }
        if (manAliveTimeSpanValue > manAliveOfflineRandomMaxValue) {
            notify('El valor de tolerancia no puede ser mayor que el valor máximo');
            manAliveTimeSpanField.markInvalid('Valor inválido'); // Marca como inválido
            return false;
        }
        /**
         *  Validar horarios de inicio y fin de diurna y nocturna
         */
        var errorInicioFinHsDiurna = false;
        var errorInicioFinHsNocturna = false;
        if(view.down('#txtf-hr-diurna-inicio').getValue()>view.down('#txtf-hr-diurna-fin').getValue()){
            errorInicioFinHsDiurna = true;
        }
        if(view.down('#txtf-hr-nocturna-inicio').getValue()<view.down('#txtf-hr-nocturna-fin').getValue()){
            errorInicioFinHsNocturna = true;
        }        
        if(errorInicioFinHsDiurna == true) {
            notify('La hora de inicio diurna no puede ser mayor al fin de hora diurna')
            return false;
        }        
        if(errorInicioFinHsNocturna == true) {
            notify('La hora de inicio nocturna no puede ser menor al fin de hora nocturna')
            return false;
        }         
        /**
         * Chequeo de botones extras
         */
        var camposEvaluar = [];
        camposEvaluar.push('CIDESOS');
        if(ArrJson.btnExtras > 0) {
            for (i = 1; i <= 12; i++) { 
                //si el campo no es oculto lo tomo considero para evaluarlo
                if(ArrJson['extra-tipo-'+i] > 0) {
                    camposEvaluar.push('btn-formato-'+i)
                }
            }
        }
        var isUsed = false;
        for (var key in camposEvaluar) {
            if (ArrJson.hasOwnProperty(camposEvaluar[key])) {
                //console.log(key + " -> " + ArrJson[camposEvaluar[key]]);
                if(ArrJson[camposEvaluar[key]] != '') {    
                    for (var keyObj in camposEvaluar) {
                        if (ArrJson.hasOwnProperty(camposEvaluar[keyObj])) {
                            //console.log(ArrJson[camposEvaluar[key]] + " -> " + ArrJson[camposEvaluar[keyObj]]);
                            if(ArrJson[camposEvaluar[key]] == ArrJson[camposEvaluar[keyObj]] && 
                                    camposEvaluar[key] != camposEvaluar[keyObj] &&
                                    ArrJson[camposEvaluar[keyObj]] != '' ) {
                                isUsed = true;
                                console.log(ArrJson[camposEvaluar[key]] + " -> " + ArrJson[camposEvaluar[keyObj]]);
                            }
                        }
                    }
                }       
            }
        }
        //evaluo los botnes extras que tengan lo necesario
        var btnextraError = false;
        for (i = 1; i <= 12; i++) { 
            var combo = view.down('#extra-tipo-'+i)
            if(combo.getValue() == 2) {
               if(view.down('#btn-url-'+i).getValue() == '') {                   
                   btnextraError = true;
               }
               if(view.down('#btn-nombre-'+i).getValue() == '') {                   
                   btnextraError = true;
               }
            } else if(combo.getValue() == 1) {                                               
               if(view.down('#btn-formato-'+i).getValue() == '') {                   
                   btnextraError = true;
               }
               if(view.down('#btn-nombre-'+i).getValue() == '') {                   
                   btnextraError = true;
               }
            }
        }
                
        if(btnextraError == true) {
            notify('Verifique que los botones extras cumplan con la especificación indicada.')
            return false;
        }
        
        if(isUsed) {
            notify('Formatos o Restauraciones duplicados.')
            button.setDisabled(false);
            return false
        }
        
        view.metadata.Config = ArrJson;
        
        if(!view.byDealer) {
            //esta configurcion es global
            var url = '/rest/UiApplication/'+ _ObjectId+'/Metadata';
            
            Ext.Ajax.request({
              url: url,
              method: 'POST',
              params: Ext.encode(view.metadata),
              scope: this,
              success: function(resp,operation) {
                notify('Los datos se guardaron con éxito');
              }
            });
        } else {
            //esta configuracion es por dealer
            if(view.currentConfig) {
                this.getM_dealer_vcconfigModelModel().load(view.currentConfig.get('Id'), {callback:function (record) {
                    if(record) {
                        record.set('dvc_config',view.metadata.Config);
                        record.set('dvc_apptype',view.apptype || 'VIGICONTROL');
                        record.save({callback:function () {
                            notify('Configuracion guardada')
                        }})
                    } else {
                        notify('ocurrio un error al guardar.')
                    }
                
                }})
            } else {
               
                this.getM_dealer_vcconfigModelModel().create({
                    dvc_config:view.metadata.Config,
                    dvc_apptype: view.apptype || 'VIGICONTROL',
                    dvc_cdealer: view.record.get('cue_clinea')?view.record.get('cue_clinea'):view.record.get('lin_ccodigo')
                }).save({callback:function () {
                    notify('Se creo nueva configuracion.')                
                }})
            }
        }
    }
});