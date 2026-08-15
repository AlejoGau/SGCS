//MIGRADO2024
Ext.define('Common.controller.HorarioController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.m_planillaHorariosStore', 'Common.store.TablaDiasStore' , 'HorarioAperturaAntesAlarmaStore'
       ,'HorarioCierreDespuesAlarmaStore' , 'HorarioAperturaDespuesAlarmaStore','HorarioToleranciaModoControlHorarioStore','HorarioCierreAntesAlarmaStore','SiNoStore'],
    models : [ 'HorarioToleranciaPlantillaCrudModel','HorarioPlantillaCrudModel','HorarioToleranciaPlantillaModel','HorarioExcepcionPlantillaCrudModel','HorarioExcepcionSearchModel', 'HorarioAlternativoSearchModel', 'HorarioSearchModel', 'TimeZoneModel', 'HorarioExcepcionModel', 'HorarioAlternativoModel', 'm_planillaSearchModel', 'HorarioExcepcionPlantillaModel', 'HorarioPlantillaModel', 'HorarioToleranciaPlantillaModel', 'HorarioAlternativosPlantillaModel', 'HorarioToleranciaModel', 'HorarioExcepcionCuentaModel', 'HorarioModel', 'm_planillaModel', 'HorarioAlternativosPlantillaSearchModel' ],
    views : [ 'HorarioView' ],


    init: function (config) {
        // genero los eventos

        this.control({
            '#horariosemanal button[action=delete]': {
                click: this.DeleteClick
            },
            '#horariosemanal button[action=add]': {
                click: this.AddClick
            },            
           /* '#horariosemanal button[action=save]': {
                click: this.onSaveClick
            },*/
            'horarioview button[action=copy]': {
                click: this.copiarHorarios
            },
            'horarioview':{
                beforerender: this.setRecord,
                cuentachanged: this.onCuentaChanged
            },
            '#horariosemanal':{
                itemdblclick: this.onItemDblClick,
                //validateedit: this.validateHorario,
                selectionchange: this.onSelectionChange,
                refresh: this.doRefresh
            },
            'horarioview button[action=saveplantilla]': {
                click: this.onSavePlantillaClick
            },
            'horarioview button[action=deleteplantilla]': {
                click: this.onDeletePlantillaClick
            },
            'horarioview button[action=guardarplantilla]': {
                click: this.onGuardarPlantillaClick
            },
            'horarioview #zonaplantillacombo' : {
                change : this.unHideDeletePlantilla
            }

        });
        

    }, // cierro init
    
    unHideDeletePlantilla: function(combo) {
      var controller = this;
      var view = combo.up('horarioview');
      
      var deleteButton = view.down('button[action=deleteplantilla]');
      if (combo.getValue() != "") {
        deleteButton.setDisabled(false);
      } else {
         deleteButton.setDisabled(true);
      }
      
    },
    
    doRefresh: function (view) {
         this.loadData(view);  
    },

	setRecord: function(view){
        var record = view.record;
        var grid = view.down('#horariosemanal');
        var module = view.module;
        
         view.comboPlantillaStore =Ext.create('Ext.data.Store',{
            model: 'Common'+'.model.m_planillaSearchModel',
            remoteFilter: false,
            filters: [{
                property: 'pla_cNombreTabla',
                value: 'M_HORARIOS'
            }
                
            ]
        });
        var comboPlantilla = view.down('#zonaplantillacombo');
        comboPlantilla.bindStore(view.comboPlantillaStore);
		view.comboPlantillaStore.load();
        
        // agrego el record a tolerancia
        view.down('#horariotoleranciaview').record = record;
        view.down('#horariotoleranciaview').module = module;
        // seteo record en las grillas
        var grids = view.query('grid');
        Ext.Array.each(grids, function(grid, index, array) {
            grid.record = record;
            grid.module = module;
        });
        
        this.loadData(grid);
        
        if(getParametro('AJUSTAHORARIO') && record.get('cue_iZonaHoraria') != 0) {
        this.getTimeZoneModelModel().load(record.get('cue_iZonaHoraria'), {callback:function (recordTimeZone) {
            var container = {
                xtype:'container',
                html: '<div style="display: flex; align-items: center;"><img src="/resources/global/images/icons/error.png" />'+getLocale('Zona horaria configurada:')+' '+recordTimeZone.get('ttz_cTitle')+'<img src="/resources/global/images/icons/error.png" /></div>'
            }
            view.down('#timezone').add(container)
            view.down('horarioalternativogridview').down('#timezone').add(container)
           // view.down('horarioexcepciongridview').down('#timezone').add(container)
           // view.down('horariotoleranciaview').down('#timezone').add(container)
        }})
        }
        
    },
    
    
    onGuardarPlantillaClick: function (button,event,options) {
        var view = button.up('horarioview');
        var nombrePlantilla = view.down('#nombreplantilla');
        var controller = this;
        if(nombrePlantilla.getValue() != '') {
            var m_plantillaModel = controller.getM_planillaModelModel();
            var recPlantilla = m_plantillaModel.create({
                pla_cNombreTabla: 'M_HORARIOS',
                pla_cDescripcion: nombrePlantilla.getValue()                
            });
            recPlantilla.set("Id",0);
            recPlantilla.save({callback:function (recordPlanilla) {
                    var grid = view.down('#horariosemanal');
                    var gridTolerancia = view.down('horariotoleranciaview');
                    var gridAlternativo = view.down('horarioalternativogridview');
                    var gridExcepcion = view.down('horarioexcepciongridview');
                    var modelHorario = controller.getHorarioPlantillaCrudModelModel();
                    var modelHorarioExcepcion = controller.getHorarioExcepcionPlantillaCrudModelModel();
                    var modelHorarioTolerancia = controller.getHorarioToleranciaPlantillaCrudModelModel();
                    var modelHorarioAlternativo = controller.getHorarioAlternativosPlantillaModelModel();
                    
                    var idPlantilla = recordPlanilla.get('Id')
                    //Horario Plantilla
                    var mystore = grid.getStore();
                    
                    mystore.each(function(record){
                        rModelHorario = modelHorario.create({
                            hor_iid: idPlantilla,
                            hor_ndiaapertura: record.get('hor_ndiaapertura'),
                            hor_choraapertura: record.get('hor_choraapertura'),
                            hor_ndiacierre: record.get('hor_ndiacierre'),
                            hor_choracierre: record.get('hor_choracierre')
                        });
                        rModelHorario.set("Id",0);
                        rModelHorario.save();
                    });

                    //Excepcion Plantilla
                    var mystoreExcepcion = gridExcepcion.getStore();
                    mystoreExcepcion.each(function(record){
                        
                        var rModelHorarioExcepcion = modelHorarioExcepcion.create({
                        //    Id: idPlantilla,
                            
                            exc_iid: idPlantilla,
                            exc_cevento: record.get('exc_cevento'),
                            exc_cHoraApertura: record.get('exc_cHoraApertura'),
                            exc_cHoraCierre: record.get('exc_cHoraCierre'),
                        });
                        rModelHorarioExcepcion.set("Id",0);
                        rModelHorarioExcepcion.save();
                        
                    });

                    //Alternativos Plantilla
                    var mystoreAlternativo = gridAlternativo.getStore();
                    mystoreAlternativo.each(function(record){
                        var rModelHorarioAlternativo = modelHorarioAlternativo.create({
                        //     Id: idPlantilla,
                            Alt_iid: idPlantilla,
                            Alt_ndiaapertura: record.get('alt_ndiaapertura'),
                            Alt_choraapertura: record.get('alt_choraapertura'),
                            Alt_ndiacierre: record.get('alt_ndiacierre'),
                            Alt_choracierre: record.get('alt_choracierre')
                        });
                        rModelHorarioAlternativo.set("Id",0);
                        rModelHorarioAlternativo.save();
                    })

                    //Telerancia Plantilla
                    var myform = gridTolerancia.getForm();
                    var mymodel = myform.getRecord();

                    myform.updateRecord(mymodel);

                    var recordTolerancia = mymodel //gridTolerancia.getRecord()

                    var rModelHorarioTolerancia = modelHorarioTolerancia.create({
                        tol_iid: idPlantilla,
                        tol_iidcuenta: idPlantilla,
                        tol_naperturaantes: recordTolerancia.get('tol_naperturaantes'),
                        tol_caperturaantesalarma: recordTolerancia.get('tol_caperturaantesalarma'),
                        tol_naperturadespues: recordTolerancia.get('tol_naperturadespues'),
                        tol_caperturadespuesalarma: recordTolerancia.get('tol_caperturadespuesalarma'),
                        tol_ncierreantes: recordTolerancia.get('tol_ncierreantes'),
                        tol_ccierreantesalarma: recordTolerancia.get('tol_ccierreantesalarma'),
                        tol_ncierredespues: recordTolerancia.get('tol_ncierredespues'),
                        tol_ccierredespuesalarma: recordTolerancia.get('tol_ccierredespuesalarma'),
                        tol_nnyo: recordTolerancia.get('tol_nnyo'),
                        tol_nnyc: recordTolerancia.get('tol_nnyc'),
                        tol_nControl: recordTolerancia.get('tol_nControl'),
                        tol_nModo: recordTolerancia.get('tol_nModo'),
                        tol_nAPNYO: recordTolerancia.get('tol_nAPNYO'),
                        tol_nAPNYC: recordTolerancia.get('tol_nAPNYC'),
                        //   tol_dVacacionesDesde: recordTolerancia.get('tol_dVacacionesDesde'),
                        //  tol_dVacacionesHasta: recordTolerancia.get('tol_dVacacionesHasta')
                    });
                    rModelHorarioTolerancia.set("Id",0);
                    rModelHorarioTolerancia.save()

    
                    notify('Se guardo con exito la plantilla.');
                    
                    // BC : 374881248 - Actualizo combo de plantillas para no tener que cerrar la TAB y blanqueo lo escrito en el TextBox de GuardarPlantilla.
                    var comboPlantillas = view.down('#zonaplantillacombo');
                    comboPlantillas.getStore().load();
                    nombrePlantilla.setValue("");
                    
                }
            })

        } else {
                notify('Debe seleccionar una plantilla.');
        }
    },

    onDeletePlantillaClick: function (button,event,options) {
        var view = button.up('horarioview');
        var drop = view.down('#zonaplantillacombo');
        var controller = this;
        
        if(drop.getValue() != '') {
            var grid = view.down('#horariosemanal');
            var gridTolerancia = view.down('horariotoleranciaview');
            var gridAlternativo = view.down('horarioalternativogridview');
            var gridExcepcion = view.down('horarioexcepciongridview');
            var modelHorario = this.getHorarioPlantillaModelModel();
            var modelHorarioExcepcion = this.getHorarioExcepcionPlantillaModelModel();
            var modelHorarioTolerancia = this.getHorarioToleranciaPlantillaModelModel();
            var modelHorarioAlternativo = this.getHorarioAlternativosPlantillaSearchModelModel();
                
            drop.getStore().load({
                callback : function() {

                   //Horario Plantilla
            	   var storeHorarios =Ext.create('Ext.data.Store',{
                        model: modelHorario,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: [{
                            property: 'hor_iid',
            				value: drop.getValue()
                        }]
                    });
            		
                    var mystore = grid.getStore();
            		
            		storeHorarios.load({callback:function(records,operation,success){
            		    Ext.Array.each(records,function (r) {
                	        modelHorario.load(r.get("Id"),{ 
                                callback:function(recordHorarios){
                                    recordHorarios.erase();
                                }   
            		        });
                        });
            			
            		}});
                    
                    //Excepcion Plantilla
                   var storeHorariosExcepcion =Ext.create('Ext.data.Store',{
                        model: modelHorarioExcepcion,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: [{
                            property: 'exc_iid',
            				value: drop.getValue()
                        }]
                    });
            		
                    var mystoreExcepcion = gridExcepcion.getStore();
                    
            		
            		storeHorariosExcepcion.load(
                        {
                            callback:function(records,operation,success){
                                
                                Ext.Array.each(records,function (r) {
                                    modelHorarioExcepcion.load(r.get("Id"),{  
                                        callback:function(recordHorariosExc){   
                                            recordHorariosExc.erase();
                                        }   
                                    });
                                });
                            }
                        });
                    
                    
                    
                    //Alternativos Plantilla
                   var storeHorariosAlternativo =Ext.create('Ext.data.Store',{
                        model: modelHorarioAlternativo,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: [{
                            property: 'Alt_iid',
                			value: drop.getValue()
                        }]
                    });
            		
            		var mystoreAlternativo = gridAlternativo.getStore();
            		storeHorariosAlternativo.load({callback:function(records,operation,success){
                        
            			Ext.Array.each(records,function (r) {
                            modelHorarioAlternativo.load(r.get("Id"),{ 
                                callback:function(recordHorariosAlt){
                                    recordHorariosAlt.erase();
                                }

                            });
                	    });
            		}})
                    
                    
                    //Telerancia Plantilla
                   var storeHorariosTolerancia =Ext.create('Ext.data.Store',{
                        model: modelHorarioTolerancia,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: [{
                            property: 'tol_iid',
                    		value: drop.getValue()
                        }]
                    });
            		
            		storeHorariosTolerancia.load({callback:function(records,operation,success){
                        
                        Ext.Array.each(records,function (r) {
                           // r.setProxy(controller.getHorarioAlternativosPlantillaModelModel().getProxy())
                           modelHorarioTolerancia.load(r.get("Id"),{
                                callback:function(toleranciaRecord){
                                    toleranciaRecord.erase();
                                }
                           });
                            
                        })
                        
            		}})
                    
                    var planillaModel = controller.getM_planillaModelModel();
                    planillaModel.load(drop.getValue(),{    
                        callback: function(recordToErase){
                            recordToErase.erase({
                                callback: function(record){
                                    // BC : 374881248 - Actualizo combo de plantillas para no tener que cerrar la TAB y blanqueo lo escrito en el TextBox de GuardarPlantilla.
                                    var comboPlantillas = view.down('#zonaplantillacombo');
                                    comboPlantillas.getStore().load();
                                    drop.setValue("");
                                    notify('Se elimino con exito la plantilla.');
                                }
                            });
                        }
                    });
                    /*var comboPlantillaStore = Ext.create('Ext.data.Store',{
                        model: controller.getM_planillaSearchModelModel(),
                        remoteFilter: true,
                        filters: [{
                            property: 'pla_iid',
                            value: drop.getValue()
                        }
                            
                        ]
                    });
                    comboPlantillaStore.load({callback:function (records) {
                        Ext.Array.each(records,function (r) {
                            r.setConfig({
                                proxy:controller.getM_planillaModelModel().getProxy()
                            });
                            r.setProxy()
                            r.destroy()
                        })
                            
                        view.comboPlantillaStore.load();
                	}});*/
                    
                    // BC : 374881248 - Agrego mensaje post eliminacion y actualizo el combo
                    
                    
                }
            })
        }
    },
    

    onSavePlantillaClick: function (button,event,options) {
        var controller = this;
        var view = button.up('horarioview');
    	var drop = view.down('#zonaplantillacombo');
        
        if(drop.getValue() != '') {
                var grid = view.down('#horariosemanal');
                var gridTolerancia = view.down('horariotoleranciaview');
                var gridAlternativo = view.down('horarioalternativogridview');
                var gridExcepcion = view.down('horarioexcepciongridview');
        		var modelHorario = this.getHorarioPlantillaModelModel();
                var modelHorarioExcepcion = this.getHorarioExcepcionPlantillaModelModel();
                var modelHorarioTolerancia = this.getHorarioToleranciaPlantillaModelModel();
                var modelHorarioAlternativo = this.getHorarioAlternativosPlantillaSearchModelModel();

                //Horario Plantilla
                var storeHorarios =Ext.create('Ext.data.Store',{
                    model: modelHorario,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'hor_iid',
        				value: drop.getValue()
                    }]
                });
                
                storeHorarios.proxy.extraParams = {iidcuenta:view.record.get('cue_iid')};

                var mystore = grid.getStore();
        		storeHorarios.load({
                    callback:function(records,operation,success){
        			if(records.length > 0) {
                        var recordsToSync = [];
                        var horarioModel = controller.getHorarioModelModel();
                        // En Sencha 7, los datos están en records[0].data.rows[]
                        var actualRecords = records;
                        if (records.length > 0 && records[0].data && records[0].data.rows) {
                            actualRecords = records[0].data.rows;
                            console.log('DEBUG - Usando estructura Sencha 7 (rows)');
                        }

                        Ext.each(actualRecords, function(record){
                            // Acceder a los datos según la estructura
                            var recordData = record.data || record;

                            console.log('DEBUG - Valores de plantilla:', {
                                hor_ndiaapertura: recordData.hor_ndiaapertura,
                                hor_choraapertura: recordData.hor_choraapertura,
                                hor_ndiacierre: recordData.hor_ndiacierre,
                                hor_choracierre: recordData.hor_choracierre
                            });

                            var nuevoHorario = horarioModel.create({
                                hor_iidcuenta: view.record.get('Id'),
                                hor_ndiaapertura: recordData.hor_ndiaapertura,
                                hor_choraapertura: recordData.hor_choraapertura,
                                hor_ndiacierre: recordData.hor_ndiacierre,
                                hor_choracierre: recordData.hor_choracierre
                            });
                            nuevoHorario.set("Id", 0);

                            console.log('DEBUG - Nuevo horario creado:', {
                                hor_ndiaapertura: nuevoHorario.get('hor_ndiaapertura'),
                                hor_choraapertura: nuevoHorario.get('hor_choraapertura'),
                                hor_ndiacierre: nuevoHorario.get('hor_ndiacierre'),
                                hor_choracierre: nuevoHorario.get('hor_choracierre')
                            });

                            recordsToSync.push(nuevoHorario);
                        }, this);

                        saveSync(recordsToSync, function(){
                            mystore.load();
                        })
        			} else {
        				notify('No se encontraron registros para la plantilla Horarios.');
        			}
        		}})

               //Excepcion Plantilla
               var storeHorariosExcepcion =Ext.create('Ext.data.Store',{
                    model: modelHorarioExcepcion,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'exc_iid',
        				value: drop.getValue()
                    }]
                });
        		
                var mystoreExcepcion = gridExcepcion.getStore();
                var oldproxy = mystoreExcepcion.getProxy();

                var crudHorarioExcepcion = controller.getHorarioExcepcionModelModel();

                storeHorariosExcepcion.load({
                    callback:function(records,operation,success){
            		if(records.length > 0) {
                        var recordsToSync = [];
        			    Ext.each(records, function(record, index){
                            // solo inserto si el horario no existe
                            exc_cevento = record.get('exc_cevento');
                            var exc = mystoreExcepcion.findRecord('exc_cevento',exc_cevento.trim());
                            if (!exc) {
                                var _he = crudHorarioExcepcion.create({
                                    exc_iidcuenta: view.record.get('Id'),
                                    exc_cevento: exc_cevento,
                                    exc_cHoraApertura: record.get('exc_cHoraApertura'),
                                    exc_cHoraCierre: record.get('exc_cHoraCierre')
                                });
                                _he.set("Id", 0);
                                recordsToSync.push(_he);
                            }
        				},this);
                        saveSync(recordsToSync, function(){
                            mystoreExcepcion.load();
                        })
        			} else {
        			    notify('No se encontraron registros para dias feriados.');
        			}
        		}})

                //Alternativos Plantilla
                var storeHorariosAlternativo =Ext.create('Ext.data.Store',{
                    model: modelHorarioAlternativo,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'Alt_iid',
            			value: drop.getValue()
                    }]
                });

        		var mystoreAlternativo = gridAlternativo.getStore();
                storeHorariosAlternativo.proxy.extraParams = {iidcuenta:view.record.get('cue_iid')};
        		storeHorariosAlternativo.load({
                    callback:function(records,operation,success){
        			if(records.length > 0) {
                        var recordsToSync = [];
                        var crudHorario = controller.getHorarioAlternativoModelModel();
        				Ext.each(records, function(record){
        					var nuevoHorario = crudHorario.create({
                                alt_iidcuenta: view.record.get('Id'),
        						alt_ndiaapertura: record.get('Alt_ndiaapertura'),
                                alt_choraapertura: record.get('Alt_choraapertura'),
                                alt_ndiacierre: record.get('Alt_ndiacierre'),
                                alt_choracierre: record.get('Alt_choracierre')
        					});
                            nuevoHorario.set("Id", 0);
                            recordsToSync.push(nuevoHorario);
        				},this);	
                        saveSync(recordsToSync, function(){
                            mystoreAlternativo.load();
                        })
        			} else {
        				notify('No se encontraron registros para horarios alternativos.');
        			}
        		}})

                //Telerancia Plantilla
                var storeHorariosTolerancia =Ext.create('Ext.data.Store',{
                    model: modelHorarioTolerancia,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'tol_iid',
                		value: drop.getValue()
                    }]
                });

                var recordTolerancia = gridTolerancia.getRecord()
                var formTolerancia = gridTolerancia.getForm();

        		storeHorariosTolerancia.load({
                    callback:function(records,operation,success){
        			if(records.length > 0) {
                        var rmodel = controller.getHorarioToleranciaModelModel();
                        var recordSave = rmodel.load(recordTolerancia.get('Id'), {callback:function(recordTolerancia){
                            formTolerancia.updateRecord(recordTolerancia);
                            recordTolerancia.set('tol_naperturaantes', records[0].get('tol_naperturaantes'));
                            recordTolerancia.set('tol_caperturaantesalarma', records[0].get('tol_caperturaantesalarma'));
                            recordTolerancia.set('tol_naperturadespues', records[0].get('tol_naperturadespues'));
                            recordTolerancia.set('tol_caperturadespuesalarma', records[0].get('tol_caperturadespuesalarma'));
                            recordTolerancia.set('tol_ncierreantes', records[0].get('tol_ncierreantes'));
                            recordTolerancia.set('tol_ccierreantesalarma', records[0].get('tol_ccierreantesalarma'));
                            recordTolerancia.set('tol_ncierredespues', records[0].get('tol_ncierredespues'));
                            recordTolerancia.set('tol_ccierredespuesalarma', records[0].get('tol_ccierredespuesalarma'));
                            recordTolerancia.set('tol_nnyo', records[0].get('tol_nnyo'));
                            recordTolerancia.set('tol_nnyc', records[0].get('tol_nnyc'));
                            recordTolerancia.set('tol_nControl', records[0].get('tol_nControl'));
                            recordTolerancia.set('tol_nModo', records[0].get('tol_nModo'));
                            recordTolerancia.set('tol_nAPNYO', records[0].get('tol_nAPNYO'));
                            recordTolerancia.set('tol_nAPNYC', records[0].get('tol_nAPNYC'));
                            
                         //   recordTolerancia.set('tol_dVacacionesHasta', records[0].get('tol_dVacacionesHasta'));
                         //   recordTolerancia.set('tol_dVacacionesDesde', records[0].get('tol_dVacacionesDesde'));
                            
                            
                            formTolerancia.loadRecord(recordTolerancia)
                            
                            // da error al guardar porque tiene proxy de search
                            recordTolerancia.setProxy(controller.getHorarioToleranciaModelModel().getProxy());
                            recordTolerancia.save()
                        }});
        			} else {
        				notify('No se encontraron registros para tolerancia.');
        			}
        		}})
		
        } else {
                notify('Debe seleccionar una plantilla.');
        }
    },

    copiarHorarios : function (button, object, options) {
        var view = button.up('horarioview');
        Ext.MessageBox.confirm('Confirmar', 'Todos los datos de horarios seran borraros, esta seguro que decea copiar horarios de otra cuenta?', function(btn){
    		if (btn=="yes"){
                var win = Ext.create('Ext.Window', {
                    layout: 'fit',
                    title : 'Seleccione una Cuenta',
                    closeAction : 'destroy',
                    itemId: 'cuentaWin',
                    width : 750,
                    height : 550,
                    border : true,
                    modal: true,
                    view : view,
                    items : [
                        {
                            xtype: 'cuentahelperview',
                            caller: view
                        }
                    ]
                });
                win.show();     
			}
		});
    },

    onCuentaChanged: function(cuenta, view){
        var gridview = view.up('viewport').down('horarioview');
        
        //var selection = view.getSelectionModel().getSelection();
        var t = this;  
        var idCuentaNuevo = cuenta.get('Id');
        var idCuentaActual =  gridview.record.get('Id');
        
        if(idCuentaNuevo) {
            //traigo horarios para borrar
            var storeHorarioActual =Ext.create('Ext.data.Store',{
                model: this.getHorarioModelModel(),
                pageSize: 5000,
                remoteSort: true,
                remoteFilter: true
            });
            
            storeHorarioActual.load({
                ObjectId:idCuentaActual,
                callback:function () {
                var cantidadH = storeHorarioActual.data.length;
                
                if(cantidadH > 0) {
                    storeHorarioActual.each(function(recordH,keyH)  {
                    
                       recordH.destroy();                    
                        
                        if(keyH >= (cantidadH-1)) {
                            t.copyHorarios(idCuentaActual,idCuentaNuevo);
                        }
                                        
                    });
                } else {
                    t.copyHorarios(idCuentaActual,idCuentaNuevo);
                }
            
            }            
            });
            
         /*   
            //traigo horaalternativos para borrar
            var storeAlternativosActual =Ext.create('Ext.data.Store',{
                model: this.getHorarioAlternativoModelModel(),
                pageSize: 5000,
                remoteSort: true,
                remoteFilter: true
            });
            
            storeAlternativosActual.load({
                objectId:idCuentaActual,
                callback:function () {
                
                
                var cantidadA = storeAlternativosActual.length;
                
                if(cantidadA > 0) {
                    storeAlternativosActual.each(function(recordA,keyA)  {
                    console.log(recordA);
                       recordA.destroy();                    
                        
                        if((cantidadA-1) >= keyA) {
                            t.copyAlternativo(idCuentaActual,idCuentaNuevo);
                        }
                                        
                    });
                } else {
                    t.copyAlternativo(idCuentaActual,idCuentaNuevo);
                }
            
            }            
            });
            */
                    
            
        } else {
            notify('Debe seleccionar una cuenta');
        }
    },
    copyAlternativo: function (idCuentaActual,idCuentaNuevo) {
            var t = this;  
            //traigo alternativos de otra cuenta para guardar
            var storeAlternativosNuevo =Ext.create('Ext.data.Store',{
                model: this.getHorarioAlternativoModelModel(),
                pageSize: 5000,
                remoteSort: true,
                remoteFilter: true
            });
            
            storeAlternativosNuevo.load({
                objectId:idCuentaNuevo,
                callback:function () {
                
                storeAlternativosNuevo.each(function(record)  {
                    
                     recordNuevo = t.getHorarioAlternativoModelModel();        
                     var myobject = recordNuevo.create({
                			alt_iidcuenta : idCuentaActual,
                            alt_ndiaapertura : record.get('alt_ndiaapertura'),
                            alt_choraapertura : record.get('alt_choraapertura'),
                            alt_ndiacierre : record.get('alt_ndiacierre'),
                            alt_choracierre : record.get('alt_choracierre')
            		 });
                     
                     
                         
                     myobject.save();
                                    
                });
            
            }            
            });
        
        
        
    },
    
    
    copyHorarios: function (idCuentaActual,idCuentaNuevo) {
        var t = this;  
        //traigo horarios de otra cuenta para guardar
        var storeHorarioNuevo =Ext.create('Ext.data.Store',{
            model: this.getHorarioModelModel(),
            pageSize: 5000,
            remoteSort: true,
            remoteFilter: true
        });
        
        storeHorarioNuevo.load({
            ObjectId:idCuentaNuevo,
            callback:function () {
            
            storeHorarioNuevo.each(function(record)  {
                
                    recordNuevo = t.getHorarioModelModel();        
                    var myobject = recordNuevo.create({
                        hor_iidcuenta : idCuentaActual,
                        hor_ndiaapertura : record.get('hor_ndiaapertura'),
                        hor_choraapertura : record.get('hor_choraapertura'),
                        hor_ndiacierre : record.get('hor_ndiacierre'),
                        hor_choracierre : record.get('hor_choracierre')
                    });
                    myobject.save();
            
            });
        }            
        });
    },
    
    loadData: function(view){
        var record = view.record;
        
        var module = view.module;
        var profile = module.get('profile');
        view.profile = profile;
        view.record = record;
        
        if (profile < 2){
            view.down('toolbar').hide();
            view.up('horarioview').down('#plantilla').hide();
        }
        
       /** var mystore =Ext.create('Ext.data.Store',{
            model: 'DealerSearch'+'.model.HorarioModel'
        });
        
        if (record){
            var _ObjectId = record.get('cue_iid');
            // una vez que cargue el store hago el binding con la view
            mystore.load({ObjectId:_ObjectId,view:view,store:mystore,callback: this.doBindStore});
        }*/
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getHorarioSearchModelModel(),
            remoteFilter:true,
            filters:[{
                property:'hor_iidcuenta',
                value:record.get('cue_iid')
            }]
        });
        view.bindStore(mystore);
        mystore.load()
        
    },
    
   /* doBindStore: function(records,operation,success){
        if (success){
            operation.view.bindStore(operation.store);
        }
    },*/
	

    DeleteClick: function(button, object, options){
        var controller = this;
        var view = button.up('horarioview');
        var grid = view.down('#horariosemanal');
        var selection = grid.getSelectionModel().getSelection();
        button.disable();
        /*if (selection) {
            grid.store.remove(selection);
        }*/
        
        //selection.setProxy(this.getHorarioModelModel().getProxy())
        //selection.destroy()
        

/*
        var model = this.getHorarioModelModel();
        model.load(selection.get("Id"),{
            callback: function(record){
                record.erase({
                    callback: function(){
                        controller.loadData(grid);
                    }
                });
            }
        });*/



        if (selection.length>0) {
            var len = selection.length-1;

            var model = this.getHorarioModelModel();

            for(var key in selection) {
                model.load(selection[key].get('Id'),{
                    callback: function(recordErase){
                        recordErase.erase({
                            callback: function(record){
                                console.log(key , len);
                                if(key >= len) {
                                    grid.getStore().load();
                                }                                 
                            }
                        });
                    }
                });

                    

            } 
        }        
        
    },
	

    AddClick: function(button, object, options){
        var view = button.up('horarioview');
        var grid = view.down('#horariosemanal');
        var store = grid.getStore();
        var cuenta = view.record;

        /*var records = store.add({
            hor_iidcuenta: cuenta.get('Id')
        });
        */
       var record = this.getHorarioModelModel().create({
            hor_iidcuenta: cuenta.get('Id')
       });
       record.set("Id",0);
       this.openFormWindow('Horario Semanal',record,grid);
        
    },

    onSaveClick: function (button,event,options) {
        var view = button.up('horarioview');
        var grid = view.down('#horariosemanal');
        
        var store = grid.store;
        store.sync();
        notify('Los cambios se guardaron con éxito');
        
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        
        //if(view.profile>1) {
            this.openFormWindow('Horario Semanal',record,view);
       // }
    },

    
    openFormWindow: function(title,record,grid){
        var view = grid.up('horarioview')
        var newView = Ext.widget('horarioformview',{
            record: record,
            callback: this.onFormEdit,
            scope: this,
            grid: grid,
            caller:grid,
            profile:view.module.get('profile')
        }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: 200,
            width: 400,
            modal: true, 
            items: newView,
            layout: 'fit'
        }).show();
    },
    
    onSelectionChange: function (selModel, selections) {
        var grid = selModel.view;
        var view = grid.up('horarioview');
        view.down('button[action=delete]').setDisabled(selections.length === 0);
    }
});



