//MIGRADO2024
Ext.define('Common.controller.SoftguardZonaController', {
  extend: 'Ext.app.Controller',
  stores: [
    'Common.store.m_planillaZonaStore',
    'Common.store.TablaListasEmergenciaStore'
  ],
  models: [
    'ZonaPlanillaModel',
    'm_planillaSearchModel',
    'm_planillaModel',
    'ZonaPlanillaSearchModel',
    'ZonaSearchModel',
    'SoftguardZonaModel',
    'ZonaModel'
  ],
  views: ['UploadButton', 'SoftguardZonaGridView', 'PhotoPanelView'],

  init: function (config) {
    var me = this
    // genero los eventos
    this.control({
      'gridzone button[action=delete]': {
        click: this.onDeleteClick
      },
      'gridzone button[action=add]': {
        click: this.onAddClick
      },
      'gridzone button[action=save]': {
        click: this.onSaveClick
      },
      'gridzone button[action=saveplantilla]': {
        click: this.onSavePlantillaClick
      },
      'gridzone button[action=deleteplantilla]': {
        click: this.onDeletePlantillaClick
      },
      'gridzone button[action=createplantilla]': {
        click: this.onCreatePlantillaClick
      },
      gridzone: {
        afterrender: this.initview,
        itemdblclick: this.onItemDblClick,
        objectedit: this.onObjectEdit,
        refresh: this.onRefresh,
        viewimage: this.onViewImage
      }
    })
  }, // cierro init
  onRefresh: function (view) {
    view.mystore.load()
  },

  hideColumns: function (view, columns) {
    Ext.Array.each(columns, function (index) {
      var column = view.down(index)
      if (column) column.hide()
    })
  },

  showColumns: function (view, columns) {
    Ext.Array.each(columns, function (index) {
      var column = view.down('gridcolumn[dataIndex=' + index + ']')
      if (column) column.show()
    })
  },
  initview: function (view) {
    var me = this
    var record = view.record
    var module = view.module
    var profile = module ? module.get('profile') : 1
    view.profile = profile
    if (!record || (record && !record.get('cue_iid'))) {
      console.log('defer')
      Ext.Function.defer(me.initview, 1000, me, arguments)
      return
    }

    if (profile < 2 || profile == 4) {
      view.down('toolbar').hide()
    }

    if (profile < 3 || profile == 4) {
      view.down('#deleteplantilla').hide()
    }
    if (view.hideColumns) {
      this.hideColumns(view, view.hideColumns)
    }
    view.comboPlantillaStore = Ext.create('Ext.data.Store', {
      model: this.getM_planillaSearchModelModel(),
      remoteFilter: false,
      pageSize: 250,
      filters: [
        {
          property: 'pla_cNombreTabla',
          value: 'M_ZONAS'
        }
      ]
    })
    var comboPlantilla = view.down('#zonaplantillacombo')
    comboPlantilla.bindStore(view.comboPlantillaStore)
    view.comboPlantillaStore.load()
    // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
    view.mystore = Ext.create('Ext.data.Store', {
      model: this.getZonaSearchModelModel(),
      remoteFilter: true,
      pageSize: 400,
      //remoteSort: true,
      sorters: {
        property: 'orderCodigo',
        id: 'orderCodigo',
        direction: 'ASC'
      },
      filters: [
        {
          property: 'zon_ccodigo:LIKENOT',
          value: 'PAR'
        },
        // se pidio el dia 22/08/2016 en el mail con subject Fwd: CORRECCION.
        /*,{
                    property: 'zon_ccodigo:NOT',
                    value: '0'
                }*/ {
          property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
          value: ''
        },
        {
          property: 'zon_iidcuenta',
          value: record.get('cue_iid')
        }
      ]
    })

    view.bindStore(view.mystore)
    // una vez que cargue el store hago el binding con la view
    view.mystore.load()
  },
  doBindStore: function (records, operation, success) {
    if (success) {
      operation.view.bindStore(operation.store)
    }
  },

  borrarZona: function (zonaId, controller, onSuccess, onError) {
    var zonaModel = controller.getSoftguardZonaModelModel();
    zonaModel.load(zonaId, {
      callback: function (recordErase) {
        recordErase.erase({
          callback: function (record, operation) {
            if (!operation.success) {
              if (onError) onError(operation);
            } else {
              if (onSuccess) onSuccess(record, operation);
            }
          }
        });
      }
    });
  },


  borrarZona: function (zonaId, controller, onSuccess, onError) {
    var zonaModel = controller.getSoftguardZonaModelModel();
    zonaModel.load(zonaId, {
      callback: function (recordErase) {
        recordErase.erase({
          callback: function (record, operation) {
            if (!operation.success) {
              if (onError) onError(operation);
            } else {
              if (onSuccess) onSuccess(record, operation);
            }
          }
        });
      }
    });
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up('gridzone')
    var controller = this;

    Ext.MessageBox.confirm(
      getLocale('Confirmación'),
      getLocale('Está seguro?'),
      function (btn) {
        if (btn == 'yes') {
          button.disable();
          var selection = view.getSelectionModel().getSelection()
          if (selection.length > 0) {
            var len = selection.length - 1;
            for (var key in selection) {
              controller.borrarZona(
                selection[key].get('Id'),
                controller,
                function (record, operation) {
                  view.getStore().load();
                },
                function (operation) {
                  notify('No se pudo eliminar la zona. Verifique no tenga un video relacionado.');
                }
              );
            }
          }
        }
      }
    )
  },
  onAddClick: function (button, event, options) {
    var view = button.up('gridzone')
    var cuenta = view.record
    var store = view.getStore()

    var record = this.getSoftguardZonaModelModel().create({
      zon_iidcuenta: cuenta.get('cue_iid'),
      zon_cAlarmaAGenerar: 'NYR',
      zon_nmostrar: 2,
      zon_ccuenta: '',
      zon_nautoprocesa: 2
    });
    record.set("Id", 0);

    this.openFormWindow(view.nuevaZonaString, record, view)
  },

  onDeletePlantillaClick: function (button, event, options) {
    var view = button.up('gridzone')
    var drop = view.down('#zonaplantillacombo')

    var a = Ext.MessageBox.show({
      title: 'Atencion',
      msg:
        getLocale('Esta seguro que quiere eliminar la plantilla ') +
        drop.getRawValue() +
        '?',
      trnslate: false,
      buttons: Ext.MessageBox.OKCANCEL,
      fn: function (btn, text) {
        if (btn == 'ok') {
          // Suponiendo que "drop" es un componente ComboBox

          var valueModels = drop.lastSelection

          if (valueModels.length > 0) {
            var modelToDestroy = valueModels[0]

            modelToDestroy.erase({
              callback: function (record, operation, success) {
                if (success) {
                  drop.setValue('')
                  view.comboPlantillaStore.load()
                } else {
                  // Manejo de errores si la destrucción del modelo falla
                }
              }
            })
          }

          /*console.log(drop)
          drop.valueModels[0].destroy({
            callback: function (record) {
              drop.setValue('')
              view.comboPlantillaStore.load()
            }
          })*/
        }
      }
    })
  },

  onSavePlantillaClick: function (button, event, options) {
    var view = button.up('gridzone');
    var drop = view.down('#zonaplantillacombo');
    var store = view.store;
    var modelZona = this.getZonaPlanillaModelModel();
    var controller = this;
    var zon_iid = drop.getValue();
    var dropzonvalue = drop.getValue();
    var view = button.up('gridzone');
    var drop = view.down('#zonaplantillacombo');
    var store = view.store;
    var modelZona = this.getZonaPlanillaModelModel();
    var controller = this;
    var zon_iid = drop.getValue();
    var dropzonvalue = drop.getValue();
    if (dropzonvalue) {

      // Primero recargar el store para asegurar estado consistente
      store.load({
        callback: function () {
          console.log('DEBUG - Store recargado, registros:', store.getCount());

          var mystore = Ext.create('Ext.data.Store', {
            model: controller.getZonaPlanillaSearchModelModel(),
            remoteSort: true,
            pageSize: 10000,
            remoteFilter: true,
            filters: [{
              property: 'zon_iid',
              value: drop.getValue()
            }]
          });

          var recAConfirmar = [];

          mystore.load({
            callback: function (records, operation, success) {
              console.log('DEBUG - Records de plantilla:', records.length);
              console.log('DEBUG - Estructura records[0]:', records[0]);
              if (records[0] && records[0].data) {
                console.log('DEBUG - records[0].data:', records[0].data);
                if (records[0].data.rows) {
                  console.log('DEBUG - records[0].data.rows:', records[0].data.rows);
                }
              }

              // En Sencha 7, los datos pueden estar en records[0].data.rows[]
              var actualRecords = records;
              if (records.length > 0 && records[0].data && records[0].data.rows) {
                actualRecords = records[0].data.rows;
                console.log('DEBUG - Usando estructura Sencha 7 (rows)');
              }

              if (actualRecords && actualRecords.length > 0) {
                Ext.each(actualRecords, function (record) {
                  // Acceder a los datos según la estructura
                  var recordData = record.data || record;
                  var codigo = recordData.zon_ccodigo;

                  // Buscar con protección contra registros null
                  var existe = null;
                  try {
                    existe = store.findRecord('zon_ccodigo', codigo, 0, false, false, true);
                  } catch (e) {
                    console.log('DEBUG - Error en findRecord:', e);
                    existe = null;
                  }

                  console.log('DEBUG - Código:', codigo, 'Existe:', existe ? 'SÍ' : 'NO');

                  if (existe) {
                    recAConfirmar.push({ nuevo: record, viejo: existe });

                  } else {

                    var zonaRecord = controller.getZonaModelModel().create({
                      zon_iidcuenta: view.record.get('cue_iid'),//zon_iid,
                      zon_ccodigo: recordData.zon_ccodigo,
                      zon_cdescripcion: recordData.zon_cdescripcion,
                      zon_codigoalarma: recordData.zon_codigoalarma,
                      zon_clistaemergencia: recordData.zon_clistaemergencia,
                      zon_cimagen: recordData.zon_cimagen,
                      zon_mobservacion: recordData.zon_mobservacion,
                      zon_ccodigorestauracion: recordData.zon_ccodigorestauracion,
                      zon_nminutosrestauracion: recordData.zon_nminutosrestauracion,
                      zon_nmostrar: recordData.zon_nmostrar,
                      zon_cdealer: recordData.zon_cdealer,
                      zon_ccuenta: recordData.zon_ccuenta,
                      zon_nautoprocesa: recordData.zon_nautoprocesa,
                      zon_cAlarmaAGenerar: recordData.zon_calarmaagenerar
                    })
                    zonaRecord.set("Id", 0);
                    zonaRecord.save({
                      callback: function () {
                        store.add(zonaRecord);
                        store.sort({
                          property: 'orderCodigo',
                          id: 'orderCodigo',
                          direction: 'ASC'
                        });
                      }
                    })
                  }
                }, this);

                console.log('DEBUG - Registros a confirmar:', recAConfirmar.length);
                if (recAConfirmar.length > 0) {
                  controller.pedirConfirmacion(recAConfirmar, 0, store, view)
                } else {
                  notify('Operación completada.');
                }
              } else {
                notify('No se encontraron registros para esta plantilla.');
              }
            }
          });
        }
      });
    } else {
      notify('Debe seleccionar una plantilla.');
    }
  },


  pedirConfirmacion: function (records, index, store, view) {
    console.log('DEBUG - pedirConfirmacion iniciado, index:', index, 'total records:', records.length);
    var controller = this;
    var record = records[index].nuevo;
    var recordData = record.data || record;
    var codigo = recordData.zon_ccodigo || (record.get ? record.get('zon_ccodigo') : '');
    console.log('DEBUG - Código a confirmar:', codigo);

    var a = Ext.MessageBox.show({
      title: 'Atencion',
      msg: getLocale('%La zona con el codigo% ' + codigo + ' %ya se encuentra. Quiere Remplazarlo?%'),
      buttons: Ext.MessageBox.OKCANCEL,
      fn: function (btn, text) {
        console.log('DEBUG - Respuesta del usuario:', btn);
        console.log('DEBUG - Respuesta del usuario:', btn);
        if (btn == 'ok') {
          console.log('DEBUG - Iniciando proceso de eliminación y reemplazo');
          var idABorrar = records[index].viejo.get('Id');
          console.log('DEBUG - Intentando borrar registro con ID:', idABorrar);

          controller.borrarZona(
            idABorrar,
            controller,
            function (record, operation) {
              console.log('DEBUG - Resultado del erase: ÉXITO');
                store.remove(records[index].viejo);

                var zonaRecord = controller.getZonaModelModel().create({
                  zon_iidcuenta: view.record.get('cue_iid'),
                  zon_ccodigo: recordData.zon_ccodigo,
                  zon_cdescripcion: recordData.zon_cdescripcion,
                  zon_codigoalarma: recordData.zon_codigoalarma,
                  zon_clistaemergencia: recordData.zon_clistaemergencia,
                  zon_cimagen: recordData.zon_cimagen,
                  zon_mobservacion: recordData.zon_mobservacion,
                  zon_ccodigorestauracion: recordData.zon_ccodigorestauracion,
                  zon_nminutosrestauracion: recordData.zon_nminutosrestauracion,
                  zon_nmostrar: recordData.zon_nmostrar,
                  zon_cdealer: recordData.zon_cdealer,
                  zon_ccuenta: recordData.zon_ccuenta,
                  zon_nautoprocesa: recordData.zon_nautoprocesa,
                  zon_cAlarmaAGenerar: recordData.zon_calarmaagenerar
                });
                zonaRecord.set("Id", 0);
                console.log('DEBUG - Intentando guardar nuevo registro');

                zonaRecord.save({
                  callback: function (savedRecord, saveOperation) {
                    console.log('DEBUG - Resultado del save:', saveOperation.success ? 'ÉXITO' : 'FALLO');
                    if (saveOperation.success) {
                      store.add(zonaRecord);
                      store.sort({
                        property: 'orderCodigo',
                        id: 'orderCodigo',
                        direction: 'ASC'
                      });
                    } else {
                      notify('Error al guardar la nueva zona.');
                    }

                    if (index >= records.length - 1) {
                      notify('La operacion se realizo con exito.');
                    } else {
                      controller.pedirConfirmacion(records, index + 1, store, view);
                    }
                  }
                });
            },
            function (operation) {
              console.log('DEBUG - Error al eliminar zona:', operation);
              notify('Error al eliminar la zona existente.');
              if (index >= records.length - 1) {
                notify('La operacion finalizo con errores.');
              } else {
                controller.pedirConfirmacion(records, index + 1, store, view);
              }
            }
          );
        } else {
          console.log('DEBUG - Usuario canceló la operación');
          if (index >= records.length - 1) {
            notify('Operacion cancelada.');
          } else {
            controller.pedirConfirmacion(records, index + 1, store, view);
          }
        }
      }
    });
  },


  onCreatePlantillaClick: function (button, event, options) {
    var view = button.up('gridzone')
    var nombrePlantilla = view.down('#nombreplantilla')
    var controller = this
    if (nombrePlantilla.getValue() != '') {
      var selected = view.getSelectionModel().getSelection()
      if (selected.length > 0) {
        //verifico si existe el nombre
        view.comboPlantillaStore = Ext.create('Ext.data.Store', {
          model: this.getM_planillaSearchModelModel(),
          remoteFilter: false,
          filters: [
            {
              property: 'pla_cNombreTabla',
              value: 'M_ZONAS'
            }
          ]
        })
        var existe = false
        view.comboPlantillaStore.load({
          callback: function (records) {
            Ext.Array.each(records, function (v, k) {
              if (
                Ext.util.Format.trim(v.get('pla_cDescripcion')) ==
                Ext.util.Format.trim(nombrePlantilla.getValue())
              ) {
                existe = true
              }
            })
            if (existe) {
              notify('El nombre de plantilla ya esxiste. Reintente con otro.')
            } else {
              // Crear un nuevo modelo de la plantilla de planilla
              var newPlanillaModel = controller
                .getM_planillaModelModel()
                .create({
                  pla_cNombreTabla: 'M_ZONAS',
                  pla_cDescripcion: nombrePlantilla.getValue()
                })

              newPlanillaModel.set("Id", 0);
              newPlanillaModel.save({
                callback: function (recordPlanilla) {
                  // Verificar si el ID es un número, si no lo es, asignar un valor por defecto
                  if (isNaN(recordPlanilla.id)) {
                    recordPlanilla.id = 0
                    recordPlanilla.data.Id = 0
                  }

                  // Obtener el componente de la vista
                  var grid = view.down('#horariosemanal')

                  // Obtener el modelo de ZonaPlanillaModel
                  var modelZona = controller.getZonaPlanillaModelModel()

                  var idPlantilla = recordPlanilla.id
                  var mystore = view.getStore()
                  var len = selected.length - 1

                  Ext.Array.each(selected, function (record, key) {
                    // Crear un nuevo modelo de ZonaPlanillaModel con los datos de record
                    var newZonaModel = modelZona.create({
                      zon_iid: idPlantilla,
                      zon_ccodigo: record.get('zon_ccodigo'),
                      zon_cdescripcion: record.get('zon_cdescripcion'),
                      zon_codigoalarma: record.get('zon_codigoalarma'),
                      zon_clistaemergencia: record.get('zon_clistaemergencia'),
                      zon_cimagen: record.get('zon_cimagen'),
                      zon_mobservacion: record.get('zon_mobservacion'),
                      zon_ccodigorestauracion: record.get(
                        'zon_ccodigorestauracion'
                      ),
                      zon_nminutosrestauracion: record.get(
                        'zon_nminutosrestauracion'
                      ),
                      zon_nmostrar: record.get('zon_nmostrar'),
                      zon_cdealer: record.get('zon_cdealer'),
                      zon_ccuenta: record.get('zon_ccuenta'),
                      zon_nautoprocesa: record.get('zon_nautoprocesa'),
                      zon_calarmaagenerar: record.get('zon_cAlarmaAGenerar')
                    })

                    newZonaModel.set("Id", 0);
                    // Guardar el nuevo modelo
                    newZonaModel.save({
                      callback: function () {
                        // Verificar si se ha llegado al final del bucle
                        if (key >= len) {
                          // Realizar acciones finales cuando todos los modelos han sido guardados
                          notify('Se guardo la plantilla con exito')
                          nombrePlantilla.setValue('')
                          view.comboPlantillaStore.load()
                        }
                      }
                    })
                  })

                  /*Ext.Array.each(selected, function (record, key) {
                    modelZona
                      .create({
                        zon_iid: idPlantilla,
                        zon_ccodigo: record.get('zon_ccodigo'),
                        zon_cdescripcion: record.get('zon_cdescripcion'),
                        zon_codigoalarma: record.get('zon_codigoalarma'),
                        zon_clistaemergencia: record.get(
                          'zon_clistaemergencia'
                        ),
                        zon_cimagen: record.get('zon_cimagen'),
                        zon_mobservacion: record.get('zon_mobservacion'),
                        zon_ccodigorestauracion: record.get(
                          'zon_ccodigorestauracion'
                        ),
                        zon_nminutosrestauracion: record.get(
                          'zon_nminutosrestauracion'
                        ),
                        zon_nmostrar: record.get('zon_nmostrar'),
                        zon_cdealer: record.get('zon_cdealer'),
                        zon_ccuenta: record.get('zon_ccuenta'),
                        zon_nautoprocesa: record.get('zon_nautoprocesa'),
                        zon_calarmaagenerar: record.get('zon_cAlarmaAGenerar')
                      })
                      .save()
 
                    if (key >= len) {
                      notify('Se guardo la plantilla con exito')
                      nombrePlantilla.setValue('')
                      view.comboPlantillaStore.load()
                    }
                  })*/
                }
              })
            }
          }
        })
      } else {
        notify('No se encuentra ninguna zona seleccionada.')
      }
    }
  },
  onSaveClick: function (button, event, options) {
    var view = button.up('gridzone')
    var store = view.store
    var t = this
    var valido = true
    store.each(function (record) {
      var codigo = record.get('zon_ccodigo')
      var idcodigo = record.get('Id')

      store.each(function (recordx) {
        var codigox = recordx.get('zon_ccodigo')
        var idcodigox = recordx.get('Id')
        if (
          t.trim(codigo) == t.trim(codigox) &&
          t.trim(codigo).indexOf('PAR') != -1
        ) {
          if (idcodigo != idcodigox) {
            valido = false
            notify(
              'El codigo ' +
              record.get('zon_ccodigo') +
              ' ya se encuentra en uso.'
            )
          }
        }
      })
    })
    if (valido) {
      var model = this.getZonaModelModel()
      var oldproxy = store.getProxy()
      rec.setConfig({
        proxy: model.getProxy()
      })
      store.sync({
        callback: function () {
          store.setConfig({
            proxy: model.getProxy()
          })
          store.load()
          notify('Los cambios se guardaron con éxito')
        },
        failure: function (optional) {
          console.log(optional)
        }
      })
    }
  },

  trim: function (str) {
    return str.replace(/^\s+|\s+$/g, '')
  },
  onItemDblClick: function (grid, record, item, index, e, options) {
    var view = grid.up('gridzone')
    var controller = this
    controller.getZonaModelModel().load(record.get('Id'), {
      callback: function (record) {
        controller.openFormWindow(record.get('zon_cdescripcion'), record, view)
      }
    })
  },
  openFormWindow: function (title, record, grid) {
    var view = grid.up('gridzone') ? grid.up('gridzone') : grid
    var cod = record.get('zon_ccodigo').substr(0, 3).toUpperCase()
    if (view.profile >= 2 && cod != 'PAR') {
      var _config = {
        record: record,
        caller: grid,
        profile: view.profile
      }
      if (view.newConfig) {
        Ext.apply(_config, view.newConfig)
      }
      var newView = Ext.widget(view.editorName, _config)
      if (view.hideComponents) {
        newView.hideComponents = view.hideComponents
      }

      // Lo agregamos al panel
      var myWindow = Ext.widget('window', {
        title: title,
        height: view.editorHeight,
        width: 400,
        modal: true,
        items: newView,
        translate: false,
        closable: false,
        layout: 'fit'
      }).show()
    } else {
      if (cod == 'PAR') {
        notifyError('Utilice la paleta Particiones')
      } else {
        //notifyError('No posee derechos para esta operación');

        // Lo agregamos al panel
        var myWindow = Ext.widget('window', {
          title: getLocale('Observacion'),
          height: 300,
          width: 400,
          modal: false,
          translate: false,
          items: [
            {
              xtype: 'displayfield',
              value: record.get('zon_mobservacion')
            }
          ],
          closable: true,
          layout: 'fit'
        }).show()
      }
    }
  },

  onObjectEdit: function (record, view) {
    this.openFormWindow(record.get('usu_cnombre'), record, view)
  },
  onViewImage: function (record, view) {
    var controller = this;

    var photo = record.get('zon_cimagen');
    var zona = record.get('zon_cdescripcion');

    var model = controller.getSoftguardZonaModelModel();

    model.load(record.get('Id'), {
      callback: function (record, operation) {
        if (operation.success) {
          Ext.create('Ext.Window', {
            title: 'Foto: ',
            height: 252 + 32,
            width: 360 + 10,
            record: record,
            itemId: 'fotoImageWindow',
            closeAction: 'destroy',
            border: false,
            layout: 'fit',
            modal: true,
            items: [{
              xtype: 'photopanel',
              field: 'zon_cimagen',
              record: record,
              profile: view.profile
            }]
          }).show();
        }
      }
    });

  }
})
