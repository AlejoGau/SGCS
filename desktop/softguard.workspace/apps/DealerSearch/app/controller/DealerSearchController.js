Ext.define('DealerSearch.controller.DealerSearchController', {
  extend: 'Ext.app.Controller',
  stores: [],
  models: ['SecurityModulesModel'],
  views: ['MetadataViewport', 'DealerToolbarView', 'ExtUxNotification'],

  init: function(config ) {
    // genero los eventos
    this.control( {
        'viewport': {
            beforerender: this.initview,
            grabarcuentaselected: this.onGrabarCuentaChanged
        },
        'viewport #closeall': {
            click: this.onCloseAllClick
        },
        'viewport #grabarllamada': {
            click: this.onGrabarLlamadaClick
        }
    });
}, // cierro init

  onCloseAllClick: function (btn) {
    var view = btn.up('viewport')
    var tabpanel = view.down('tabpanel')
    tabpanel.items.each(function (c) {
      if (c.closable != false) {
        tabpanel.remove(c)
      }
    })
  },
  onGrabarCuentaChanged: function (cuenta, view) {
    const win = Ext.create('Ext.Window', {
      layout: 'fit',
      title: 'Grabar llamada entrante',
      closeAction: 'destroy',
      itemId: 'cuentaWin',
      width: 300,
      height: 200,
      border: true,
      modal: true,
      view: view,
      items: [
        {
          xtype: 'grabarllamadaentranteview',
          record: cuenta,
          operadorId: view.operadorId
        }
      ]
    })
    win.show()
  },
  onGrabarLlamadaClick: function (btn) {
    const view = btn.up('#north').up()
    const win = Ext.create('Ext.Window', {
      layout: 'fit',
      title: 'Seleccione una Cuenta',
      closeAction: 'destroy',
      itemId: 'cuentaWin',
      width: 750,
      height: 550,
      border: true,
      modal: true,
      view: view,
      items: [
        {
          xtype: 'cuentahelperview',
          tip_nCondicion: '0,5',
          caller: view,
          selectionEvent: 'grabarcuentaselected'
        }
      ]
    })

    win.show()
  },

  initview: function (view) {
    const controller = this
    const storeSecurity = SecurityModulesStore //Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    const recordDealer = storeSecurity.findRecord('KeyReference', 'WebDealer')
    const north = view.down('#north')
    const recordAdministrator = storeSecurity.findRecord(
      'KeyReference',
      'Administrator'
    )
    const _security = recordDealer.get('_Security')
    const moduloGrabarLlamada = _security
      ? _security.modules.find(
          module => 'Grabar llamada entrante' == module.text
        )
      : false
    const recordWebremoto = storeSecurity.findRecord(
      'KeyReference',
      'WebRemoto'
    )
    const json = recordWebremoto.get('_Security')
    const administratorSecurityCuentas = recordAdministrator.get('_Security')
      ? JSON.parse(recordAdministrator.get('Security')).rights.cuenta
      : true

    if (
      (moduloGrabarLlamada && moduloGrabarLlamada.profile != '0') ||
      recordAdministrator.get('Available')
    ) {
      if (json ? json.ope_iid : '') {
        north.operadorId = json.ope_iid
        view.operadorId = json.ope_iid
        view.down('#grabarllamada').setDisabled(false)
        if (recordAdministrator.get('_Security')) {
          if (recordAdministrator != null) {
            if (
              JSON.parse(recordAdministrator.get('Security')).rights.cuenta ==
              true
            ) {
              view.down('#grabarllamada').setDisabled(true)
            } else {
              view.down('#grabarllamada').setDisabled(false)
            }
          }
        }
      }
    }

    if (_security && _security.rights) {
      if (_security.rights.chkVictimario == true) {
        view.down('#victimariosgest').show()
      } else {
        view.down('#victimariosgest').hide()
      }
    } else {
      view.down('#victimariosgest').show()
    }

    // var storeSecurity = Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    storeSecurity.each(function (v, k) {
      if (
        v.get('KeyReference') == 'MasterWebDealer' &&
        v.get('Available') == true
      ) {
        controller.application._nameModule = 'MasterWebDealer'
        return false
      } else if (
        v.get('KeyReference') == 'WebDealer' &&
        v.get('Available') == true
      ) {
        controller.application._nameModule = 'WebDealer'
        return false
      }
    })

    if (!controller.application._nameModule) {
      controller.application._nameModule = 'WebDealer'
    }

    controller.application._idModule = controller.application.getModuleIdByName(
      controller.application._nameModule
    )

    var view = Ext.widget('cuentagridview')
    view.closable = false
    view.createTipo = '0,12'
    view.securityId = '5'

    var myPanel = Ext.getCmp('center')
    myPanel.add(view)
    myPanel.setActiveTab(view)
  },

  openObjectList: function () {
    var view = Ext.widget('cuentagridview')
    view.closable = false
    view.createTipo = '0,12'
    view.securityId = '5'

    var myPanel = Ext.getCmp('center')
    myPanel.add(view)
    myPanel.setActiveTab(view)
  },

  openObjectById: function (objectId) {
    record = this.getSoftguardCuentaModelModel()

    var north = Ext.getCmp('north')
    north.hide()
    var south = Ext.getCmp('south')
    south.hide()

    if (objectId == 0) {
      var myobject = record.create({
        Name: 'Nueva cuenta',
        cue_dfechaalta: new Date(),
        cue_dservicio: new Date()
      })

      this.setRecord(myobject)

      /*
        myobject.save({
                    scope : this,
                    callback : function(record, operation) {
                        this.setRecord(record);
                    }
                });*/
    } else {
      record.load(objectId, {
        callback: function (record, operation) {
          if (operation.success) {
            // cargo la lista de modulos
            var modules = Ext.widget('moduletreeview', {
              store: 'CuentaDealerModuleStore'
            })
            var west = Ext.getCmp('west')
            if (west.collapsed) {
              west.toggleCollapse()
            }
            west.add(modules)

            // seteo el registro
            this.setRecord(record)
          }
        },
        scope: this
      })
    }
  },

  setRecord: function (record) {
    text = record.get('Name')
    document.title = text

    var viewport = Ext.getCmp('viewport')
    viewport.record = record
    viewport.cuenta = record

    // Lo agregamos al panel
    var myPanel = Ext.getCmp('center')

    myPanel.closeAction = 'hide'

    // me fijo si el tab existe, si es nuevo lo creo
    // if (!myPanel.getComponent(record.get('text'))) {
    var mytab = myPanel.down('[title=' + getLocale('Cuenta') + ']')
    if (!mytab) {
      var newTab = Ext.widget('cuentaformview', {
        // record: record
        title: 'Cuenta',
        closable: false,
        record: record
      })

      // agrego la paleta creada
      myPanel.add(newTab)
      myPanel.setActiveTab(newTab)
    }
    // el existe, lo activo
    else {
      myPanel.setActiveTab(mytab)
    }
  }
})
