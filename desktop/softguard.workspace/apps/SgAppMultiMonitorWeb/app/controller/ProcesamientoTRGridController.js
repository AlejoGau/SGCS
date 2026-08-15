Ext.define('SgAppMultiMonitorWeb.controller.ProcesamientoTRGridController', {
  extend: 'Ext.app.Controller',
  stores: [],
  models: [
    'EventosTiempoRealModel',
    'ProcesamientoTRSearchModel',
    'TablasIpConSearchModel',
    'EventImagesSearchModel',
    'EventPhoneSearchModel',
    'EventObservacionesSearchModel',
    'EventSmsSearchModel',
    'EventProcesamientoSearchModel',
    'SmartPanicSearchModel',
    'p_rxlogSearchModel'
  ],
  views: ['ProcesamientoTRGridView'],

  init: function (config) {
    // genero los eventos
    this.control({
      procesamientotrgridview: {
        afterrender: this.initView,
        objectchanged: this.objectChange
      },
      'procesamientotrgridview #gridrecepcion': {
        itemdblclick: this.onItemClick
      },
      'procesamientotrgridview button[action=play]': {
        click: this.onPlayClick
      },
      'procesamientotrgridview button[action=stop]': {
        click: this.onStopClick
      },
      'procesamientotrgridview button[action=clear]': {
        click: this.onClearClick
      },
      'procesamientotrgridview button[action=refresh]': {
        click: this.onRefreshClick
      },
      'procesamientotrgridview button[action=search]': {
        click: this.onBuscarClick
      },

      'procesamientotrgridview button[action=groupAlarmas]': {
        click: this.onGroupAlarmasClick
      },
      'procesamientotrgridview button[action=groupCuenta]': {
        click: this.onGroupCuantaClick
      },
      'procesamientotrgridview button[action=groupEstado]': {
        click: this.onGroupEstadoClick
      },
      'procesamientotrgridview #pendientes': {
        click: this.onEstadosToggle
      },
      'procesamientotrgridview #espera': {
        click: this.onEstadosToggle
      },
      'procesamientotrgridview #proceso': {
        click: this.onEstadosToggle
      },
      'procesamientotrgridview #procesado': {
        click: this.onEstadosToggle
      },
      'procesamientotrgridview button[action=soloAlarmas]': {
        click: this.onSoloAlarmasClick
      },
      'procesamientotrgridview #clearfilters': {
        click: this.onClearFiltersClick
      }
    })
  }, // cierro init

  initView: function (view) {
    var me = this

    var mygrid = view.down('grid')

    var sorters = [
      {
        property: 'rec_iid',
        direction: 'DESC'
      }
    ]

    var proxy = this.getEventosTiempoRealModelModel().getProxy()
    proxy.sortParam = false
    this.getEventosTiempoRealModelModel().setProxy(proxy)

    view.timelinestore = Ext.create('Ext.data.Store', {
      model: this.getEventosTiempoRealModelModel(),
      remoteGroup: false,
      remoteSort: false,
      pageSize: 1000,
      sortParam: false,
      listeners: {
        beforeload: me.onBeforeload
      },
      groupField: '_rec_nestado',
      sorters: sorters
    })

    mygrid.bindStore(view.timelinestore)
    view.timelinestore.load({ scope: view })

    ///defino cual es el ultimo id del log cuando se inicio el modulo
    view.ultimoLogID = 0
    view.ultimoLog = Ext.create('Ext.data.Store', {
      model: this.getProcesamientoTRSearchModelModel(),
      remoteSort: false,
      pageSize: 1,
      sorters: [
        {
          property: 'etl_idKey',
          direction: 'DESC'
        }
      ]
    })

    view.ultimoLog.load({
      callback: function (records) {
        view.ultimoLogID = records[0].get('Id')
        view.task = Ext.TaskManager.start({
          args: [view, me],
          run: me.loadData,
          interval: 10000
        })
      }
    })
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var view = grid.up('procesamientotrgridview')
    var panel = view.targetTab ? view.targetTab : Ext.getCmp('center')

    var title =
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta') +
      ' ' +
      Ext.Date.format(new Date(record.get('rec_isoFechaHora')), 'Y-m-d H:i:s')
    if (record.get('cue_nparticion') != 0) {
      title += ' ' + getLocale('PARTICIONADA')
    }

    var type = view.eventEditor ? view.eventEditor : 'eventoview'

    var widget = Ext.widget(type, {
      title: title,
      tabConfig: { translate: false },
      translate: false,
      header: false,
      record: record,
      closeAction: 'destroy',
      operador: view.operador,
      nombreEvento: view.nombreEvento,
      hideProcessOperations: view.hideProcessOperations
        ? view.noVerifyAssignedUser
        : false,
      noVerifyAssignedUser: view.noVerifyAssignedUser
        ? view.noVerifyAssignedUser
        : false,
      showSmsSender: view.showSmsSender ? view.showSmsSender : false,
      caller: view
    })

    //la doble vista me obliga ir a buscar el titulo al parent
    panel.returnTab = view.returnTab ? view.returnTab : view.title

    if (view.eventTarget == 'tab') {
      var newTab = panel.down('[title="' + title + '"]')
      if (!newTab) {
        widget.closable = false
        var tab = panel.add(widget)
        panel.setActiveTab(tab)
      } else {
        panel.setActiveTab(newTab)
      }

      if (panel.up('tabpanel')) {
        panel.up('tabpanel').setActiveTab(panel)
      }
    } else {
      Ext.widget('window', {
        title: title,
        closable: true,
        autoShow: true,
        closeAction: 'destroy',
        width: 600,
        height: 400,
        layout: 'fit',
        items: [widget]
      })
    }
  },

  onRefreshClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    this.loadData(view, this)
    var task = view.task
    task.taskRunTime = new Date().getTime()
  },

  onClearClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    view.store.removeAll()
  },

  onPlayClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    var task = view.task
    Ext.TaskManager.start(task)
  },

  onStopClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    var task = view.task
    Ext.TaskManager.stop(task)
  },

  loadData: function (view, me) {
    var controller = this

    if (!view.logStore || !view.logStore.isLoading()) {
      // revisar por que se crea cada vez... lo pongo en la view para obligar a pisarlo, ver si se puede reutilizar
      view.logStore = Ext.create('Ext.data.Store', {
        model: me.getProcesamientoTRSearchModelModel(),
        remoteSort: true,
        remoteFilter: true,
        pageSize: 10000,
        filters: [
          {
            property: 'etl_idKey:GTINT',
            value: view.ultimoLogID
          }
        ],
        sorters: [
          {
            property: 'etl_idKey',
            direction: 'DESC'
          }
        ]
      })

      var logStore = view.logStore
      var ticket = view.down('#ticket')
      view.timelinestore.commitChanges()
      var gridView = view.down('grid').getView()

      logStore.load({
        callback: function (records, operation) {
          if (!operation.success) {
            Ext.Msg.alert(
              'Sesion expirada',
              'Su sesion expiro',
              function (btnText, sInput) {
                window.href = '/'
              },
              this
            )
            return false
          }

          Ext.Array.each(records, function (v, k) {
            var recInStore = view.timelinestore.findRecord(
              'rec_iid',
              v.get('etl_iRecID')
            )
            if (recInStore) {
              var log = false
              //si existe el registro en la grilla lo updateo
              if (
                recInStore.get('rec_cObservaciones') !=
                v.get('etl_cObservacion')
              ) {
                //si tiene nueva observacion
                log = true

                var toLocale = v.get('etl_cObservacion')
                var amatch = toLocale.match(/\%.*?\%\s?/g)

                var locale = toLocale.replace('%', '')

                if (amatch && amatch.length > 0) {
                  Ext.Array.each(amatch, function (item) {
                    var s = item.replace('%', '')
                    locale = toLocale.replace(s, getLocale(s))
                  })
                } else {
                  locale = v.get('etl_cObservacion')
                }

                recInStore.set('rec_cObservaciones', locale)
                gridView.addRowCls(recInStore.index, 'fadeOffCambioEvento')

                //agrego iconos
                var defIcons = [
                  {
                    stringSearch: '%PoneAPrueba%',
                    iconFile: '/resources/global/images/icons/clock_red.png'
                  },
                  {
                    stringSearch: '%IngresoComentarios%',
                    iconFile: '/resources/global/images/icons/comment.png'
                  },
                  {
                    stringSearch: '%LlamadoTelefonico%',
                    iconFile: '/resources/global/images/icons/telephone.png'
                  },
                  {
                    stringSearch: '%AsignacionDeMovil%',
                    iconFile: '/resources/global/images/icons/car.png'
                  },
                  {
                    stringSearch: '%ReporteAutoridadesManual%',
                    iconFile:
                      '/resources/desktop/images/icn_reporte_autoridades_softguard_16.png'
                  },
                  {
                    stringSearch: '%AsignacionDeServicioTecnico%',
                    iconFile:
                      '/resources/desktop/images/sg-servtec-icon16x16.png'
                  }
                ]

                Ext.Array.each(defIcons, function (defIcon, k) {
                  console.log(
                    v.get('etl_cAccion').indexOf(defIcon.stringSearch)
                  )
                  if (v.get('etl_cAccion').indexOf(defIcon.stringSearch) > -1) {
                    var path = defIcon.iconFile
                    var htmlIcon =
                      '<img data-qtip="[' +
                      Ext.Date.format(
                        new Date(v.get('etl_tFechaHora')),
                        'd-m-Y G:i:s'
                      ) +
                      '] ' +
                      v.get('etl_cObservacion') +
                      '" src="' +
                      path +
                      '" style="margin-right:2px;"   width=16 height=16 onerror=\'this.style.display = "none"\'>'

                    recInStore.set(
                      '_iconos',
                      recInStore.get('_iconos') + htmlIcon
                    )
                  }
                })
              }

              if (recInStore.get('rec_nestado') != v.get('rec_nestado')) {
                log = true
                if (!view.timelinestore.isLoading()) {
                  view.timelinestore.load({ scope: view })
                }
                /*
                                if(v.get('rec_nestado') == 3) {
                                    //evento borrado
                                   view.timelinestore.remove(recInStore); 
                                   
                                } else {
                                    //busco elnombre del nuevo estado
                                    var store = Ext.data.StoreManager.lookup('EventoEstadoStore');
                                    var text = '';
                                    var estado = store.findRecord('Value', recInStore.get('rec_nestado'));
                                    if (estado)
                                        text = estado.get('Name');
                                    
                            
                                    recInStore.set('rec_nestado',v.get('rec_nestado'))    
                                    recInStore.set('_rec_nestado',v.get('_rec_nestado'))    
                                    log = true
                                    
                                    gridView.refresh();
                                    
                                    gridView.addRowCls(recInStore.index,'fadeOffCambioEvento')
                                    
                                    // redibujo la grilla
                                    
                                }
                                */
              }

              if (log) {
                me.setMsgTextArea(view, v)
              }
            } else {
              // si NO exites el registro en la grilla lo agrego
              if (v.get('rec_nestado') != 3) {
                // recargo la grilla
                if (!view.timelinestore.isLoading()) {
                  view.timelinestore.load({ scope: view })
                }

                /*
                                var eventoStore =Ext.create('Ext.data.Store',{
                                    model: me.getEventosTiempoRealModelModel(),
                                    remoteGroup: false,
                                    remoteSort: false,
                                    pageSize: 1,
                                    filters:[
                                        {
                                            property:'r.rec_iid',
                                            value:v.get('etl_iRecID')
                                        }
                                    ]
                                });
                                
                              
                                eventoStore.load({callback:function (records) {   
                                    if(records.length>0) {
                                        view.timelinestore.addSorted(records[0]);
                                        
                                        //ordeno la grilla para que quede ene l lugar que corresponde el registro
                                        //view.timelinestore.sort('r.rec_iid');
                                        
                                        //ticket.setValue('Se agrego el evento '+v.get('etl_iRecID')+'\n'+ticket.getValue());
                                        me.setMsgTextArea(view, v)
                                        gridView.addRowCls(records[0].index,'fadeOffCambioEvento')
                                    } else {
                                        console.log('************* Se solicito el evento '+v.get('etl_iRecID')+' y no se encontro [ etl_idKey='+v.get('Id')+']***************');
                                    }
                                    
                                }});
                                */
              }
            }
            view.ultimoLogID = v.get('Id')
          })
        }
      })
    }
  },

  setMsgTextArea: function (view, record) {
    var ticket = view.down('#ticket')

    var toLocale = record.get('etl_cObservacion')
    var amatch = toLocale.match(/\%.*?\%\s?/g)

    var locale = toLocale.replace(/%/g, '')

    if (amatch && amatch.length > 0) {
      Ext.Array.each(amatch, function (item) {
        var s = item.replace(/%/g, '')
        locale = locale.replace(s, getLocale(s))
      })
    } else {
      locale = record.get('etl_cObservacion')
    }

    ticket.setValue(
      '[' +
        Ext.Date.format(new Date(), 'H:i:s') +
        ' ' +
        record.get('rec_calarma') +
        ' ' +
        record.get('cue_clinea') +
        '-' +
        Ext.util.Format.trim(record.get('cue_ncuenta')) +
        '] ' +
        locale +
        '\n' +
        ticket.getValue()
    )
  },

  onEstadosToggle: function (btn) {
    var view = btn.up('procesamientotrgridview').down('gridpanel')
    view.getView().refresh()
  },

  onBeforeload: function (store, operation, options) {
    if (operation._scope) var view = operation._scope
    else var view = store.view

    var params = {}
    var estados = [0, 1, 2, 4, 9]
    var origenes = view.down('#comboOrigenes')
    var tipos = view.down('#comboTipos')
    // var alarma = view.down('button[action=soloAlarmas]').pressed?1:'';
    var dealer = view.down('#dealer')
    var prioridad = view.down('#prioridad')
    var condiciones = view.condiciones

    if (condiciones) {
      params.CondicionCuenta = condiciones
    }
  
    const selectedValuesOrigenes = origenes.getSelection()
    if (selectedValuesOrigenes) {
      const selectedValuesOrigenesJoined = selectedValuesOrigenes
        .map(record => record.get('value'))
        .join();
        params.Origenes = selectedValuesOrigenesJoined
    } 
    const selectedValuesTipos = tipos.getSelection()
    if (selectedValuesOrigenes) {
      const selectedValuesTiposJoined = selectedValuesTipos
        .map(record => record.get('value'))
        .join();

        params.Tipos = selectedValuesTiposJoined
    } 

    const selectedValuesPrioridad = prioridad.getSelection()
    if (selectedValuesOrigenes) {
      const selectedValuesPrioridadJoined = selectedValuesPrioridad
        .map(record => record.get('value'))
        .join();
        params.Prioridad = selectedValuesPrioridadJoined

    } 


    //params.Alertas = alarma;

    params.Estados = estados.join(',')
    //params.CodigosAlarma = alarma;
    params.Cuentas = view.Cuentas ? view.Cuentas : ''
    params.Operador = view.operador ? view.operador : ''
    params.OperadorNot = view.operadorNOT ? view.operadorNOT : ''
    params.cue_clinea = dealer.getValue()
    params.Mostrar = view.mostrar ? view.mostrar : 0

    params.FechaDesde = view.FechaDesde ? view.FechaDesde : ''
    operation.params = params
  },

  onClearFiltersClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')

    view.down('#comboOrigenes').setValue('')
    view.down('#comboTipos').setValue('')
    view.down('#grupos').setValue('')
    view.down('#dealer').setValue('')
    view.down('#grupos-excluir').setValue('')

    var view = button.up('procesamientotrgridview')
    this.loadData(view)
  },

  onSoloAlarmasClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    this.loadData(view)
  },

  popularFiltro: function (comboObj, itemsEnambled, fieldValueName) {
    if (itemsEnambled) {
      var fieldValueName =
        typeof fieldValueName !== 'undefined' ? fieldValueName : 'Value'
      var combo = comboObj
      var comboStore = combo.getStore()

      var clone = deepCloneStore(comboStore)
      comboStore.removeAll()
      var arrValues = []
      Ext.Array.each(clone.data.items, function (record) {
        //console.log(record.get(fieldValueName),itemsEnambled)
        if (
          Ext.Array.contains(
            itemsEnambled.split(','),
            record.get(fieldValueName).toString()
          )
        ) {
          comboStore.add(record)
          arrValues.push(record)
        }
      })
      combo.setValue(arrValues)
    }
  },

  onGroupAlarmasClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    var myGrid = view.down('#gridrecepcion'),
      myStore = myGrid.store

    if (button.pressed) {
      myStore.group('rec_calarma')
    } else {
      myStore.clearGrouping()
    }
  },

  onGroupCuantaClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    var myGrid = view.down('#gridrecepcion'),
      myStore = myGrid.store

    if (button.pressed) {
      myStore.group('rec_iidcuenta')
    } else {
      myStore.clearGrouping()
    }
  },

  onGroupEstadoClick: function (button, event, options) {
    var view = button.up('procesamientotrgridview')
    var myGrid = view.down('#gridrecepcion'),
      myStore = myGrid.store

    if (button.pressed) {
      myStore.group('_rec_nestado')
    } else {
      myStore.clearGrouping()
    }
  },

  onBuscarClick: function (button, event, options) {
    var view = button.up('eventostrgridview')
    this.loadData(view)
  }
})
