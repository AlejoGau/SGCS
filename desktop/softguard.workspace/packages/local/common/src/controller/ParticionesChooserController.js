//MIGRADO2024
Ext.define('Common.controller.ParticionesChooserController', {
  extend: 'Ext.app.Controller',
  stores: [],
  models: ['ZonaByCuentaSearchModel', 'ZonasSearchModel'],
  views: ['ParticionesChooserView'],
  init: function (config) {
    var me = this
    // genero los eventos
    this.control({
      particioneschooserview: {
        afterrender: this.initView
      }
    })
  }, // cierro init
  initView: function (view) {
    var record = view.record
    var module = view.module
    var profile = module ? module.get('profile') : 1
    var controller = this
    view.profile = profile
    var card
    var recordsMadreArray
    if (record.get('cue_nparticion') == 0) {
      card = Ext.widget('particionesgridview', {
        itemId: 'particionesgrid',
        record: view.record,
        flex: 1,
        profile: view.profile,
        module: view.module,
        filters: [{property:"zon_cdealer",value: record.get("cue_clinea")}],//view.filters,
        ultimaAlarma: view.ultimaAlarma,
        targetTab: view.targetTab,
        hideEdit: view.hideEdit,
        height: 300,
        listeners: {
          load: function (storePart, records, successful, operation, eOpts ) {
            if (records != null) {
              if (records.length > 0) {
                particiones = Ext.widget('multicuentazonasgridview', {
                  record: view.record,
                  profile: view.profile,
                  module: view.module,
                  flex: 1,
                  //   particiones: records,
                  caller: view
                });
                if(!view.down('multicuentazonasgridview')){
                    view.add(particiones);
                }
               
              }
            }
          }
        }
      })
      view.add(card)
    } else {
      view.mystore = Ext.create('Ext.data.Store', {
        model: controller.getZonasSearchModelModel(),
        remoteFilter: true,
        filters: [
          {
            property: 'zon_cdealer',
            value: view.record.get('cue_clinea')
          },
          {
            property: 'zon_ccuenta',
            value: Ext.util.Format.trim(view.record.get('cue_ncuenta'))
          },
          {
            property: 'zon_ccodigo:like',
            value: 'PAR'
          }
        ]
      })

      view.mystore.load({
        callback: function (recordsMadreArray) {
          ;(recordsMadre = recordsMadreArray[0]),
            (card = Ext.widget('cuentaroview', {
              itemId: 'cuentaro',
              record: view.record,
              cuentaMadre: recordsMadre,
              profile: view.profile,
              module: view.module
            }))
          view.add(card)
        }
      })
    }
  }
})
