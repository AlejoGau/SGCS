//MIGRADO2024
Ext.define('Common.controller.ServTecPanelController', {
  extend: 'Ext.app.Controller',
  stores: [
    'Common.store.ServTecPanelModuleStore',
    'Common.store.tip_ntipoStore'
  ],
  models: [
    'TablasMovilesPatrullaSearchModel',
    'm_st_cabeceraModel',
    'TipoServicioSearchModel',
    'InstaladoresByTokenSearchModel',
    'ServTecFormaViajeSearchModel',
    'ServTecMovilesSearchModel',
    'ServTecMovilVisitasSearchModel',
    'ServTecSearchModel',
    'SoftguardTelefonoModel',
    'ModuleModel'
  ],
  views: ['ServTecPanelView'],
  init: function (config) {
    // genero los eventos
    this.control({
      sertepanelview: {
        beforerender: this.initview,
        objectchanged: this.onObjectChange,
        objectrefresh: this.onObjectRefresh
      }
    })
  }, // cierro init
  initview: function (view) {
    //  console.log(view.record, view.recordFull)
    var controller = this
    var record = view.record
    var recordFull = view.recordFull
    this.populateForm(record, recordFull, view)
    this.openDefaultTab(view)
    var treeview = view.down('moduletreeview')
    treeview.disable();//lo deshabilito para evitar problemas de vista y lo habilito después que se traiga el REST de cabecera
    view.down('tabpanel').disable();//lo deshabilito para evitar problemas de vista y lo habilito después que se traiga el REST de cabecera
    console.log('Record->',view.record)
    var securityTreeStore = Ext.create('Ext.data.TreeStore', {
      //model : this.getModuleModelModel(),
      //autoLoad : false,
      root: {
          text : 'Opciones',
          expanded: true,
          leaf: true
      }
    });
    treeview.bindStore(securityTreeStore);
    var rootNode = securityTreeStore.getRoot();
    if (rootNode != null) {
      treeview.setRootNode(deepCloneRoot(rootNode));
    }
    
    var modules = this.getServTecPanelModuleStoreStore();
    modules.each(function(_module){
        securityTreeStore.getRootNode().appendChild({
            text : getLocale(_module.get('text')),
            iconCls : _module.get('iconCls'),
            leaf : true,
            view : _module.get('view'),
            closable: true,
            translate:false,
            closeAction: 'destroy',
            viewConfig: _module.get('viewConfig') || {},
            
          });      
    });
    
    view.down('moduletreeview').recordCuenta = view.recordFull
    view.down('moduletreeview').record = view.recordFull // necesario para reportes
    if (view.readOnly) {
      view.down('moduletreeview').security = { readOnly: view.readOnly }
    } else {
      var storeSecurity = SecurityModulesStore //Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
      var recordSgAppSerTec = storeSecurity.findRecord('KeyReference', 'SerTec')
      var recordAdminsitrator = storeSecurity.findRecord(
        'KeyReference',
        'Administrator'
      )
      if (recordSgAppSerTec && recordSgAppSerTec.get('Available') == true) {
        var _security = Ext.JSON.decode(
          recordSgAppSerTec.get('_Security').Security
        )
        console.log('_security', _security)
        if (_security && (_security.event || _security.modules)) {
          if (!treeview.security) {
            treeview.security = {}
          }
          //treeview.security.rights = _security.event;
          treeview.getRootNode().removeAll()
          Ext.Array.each(_security.event, function (_module) {
            if (_module.profile != '0') {
              treeview.store.getRootNode().appendChild(_module)
            }
          })
          Ext.Array.each(_security.modules, function (_module) {
            if (_module.profile != '0') {
              if(_module.viewConfig == '{readOnly: true}')
                _module.viewConfig = {readOnly: true};
              treeview.store.getRootNode().appendChild(_module)
            }
          })
        }
        console.log('recordSgAppSerTec------', recordSgAppSerTec)
      }
      if (recordAdminsitrator && recordAdminsitrator.get('Available') == true) {
        //var modules = recordAdminsitrator.get( '_Security' );
        console.log('recordAdminsitrator', recordAdminsitrator)
        //console.log('recordAdminsitrator.get( _Security ).cuenta', recordAdminsitrator.get( '_Security' ).rights.cuenta)
        if (recordAdminsitrator.get('_Security')) {
        } else {
          if (recordSgAppSerTec == null) {
            return
          }
          if (!recordSgAppSerTec.get('_Security')) {
            return
          }

          var _security = Ext.JSON.decode(
            recordSgAppSerTec.get('_Security').Security
          )
          treeview.getRootNode().removeAll()
          Ext.Array.each(_security.event, function (_module) {
            treeview.store.getRootNode().appendChild(_module)
          })
          Ext.Array.each(_security.modules, function (_module) {
            treeview.store.getRootNode().appendChild(_module)
          })
        }
      }
    }
    // este código es temporal para agregar el item de formularios de ST. Luego se deberá eliminar y agregar desde el módulo de seguridad
    treeview.store.getRootNode().appendChild({
      text: getLocale('Formularios de Servicio Técnico'),
      iconCls: 'icon-servtec',
      leaf: true,
      view: 'formulariosertecedithtmlgridview',
      record: recordFull,
      closable: true,
      translate: false,
      closeAction: 'destroy',
      viewConfig: {
            record: recordFull
         }
    });

    treeview.getRootNode().expand();
  },

  onObjectChange: function (record, view, close) {
    view.record = record
    var controller = this
    var tecnicoStore = Ext.create('Ext.data.Store', {
      model: controller.getInstaladoresByTokenSearchModelModel(),
      pageSize: 450,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: 'ins_ccodigo',
          value: view.record.get('stc_ctecnico_1')
        }
      ]
    })
    tecnicoStore.load({
      callback: function (records) {
        if (records.length > 0) {
          view.down('#tecnico').setValue(records[0].get('ins_cnombre'))
        }
      }
    })
    var movilStore = Ext.create('Ext.data.Store', {
      model: controller.getServTecMovilVisitasSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: 'tmp_iid',
          value: view.record.get('stc_cmovil_1')
        }
      ]
    })
    movilStore.load({
      callback: function (records) {
        if (records.lengh > 0) {
          view.down('#movil').setValue(records[0].get('tmp_cnombre'))
        }
      }
    })
    view.caller.fireEvent('objectchanged', record, view.caller, close)
  },

  onObjectRefresh: function (record, view, close) {
    // si vine con close no refresco nada solo la grid y cierro el tab
    if (close) {
      view.caller.fireEvent('objectchanged', record, view.caller, close)
      view.close()
      return true
    }
    //------- para refrescar ServTecFullFormView
    view
      .down('sertecfullformview')
      .fireEvent('afterrender', view.down('sertecfullformview'))
    //--------
    console.log('Record Refresh->',record);
    var idServicio = record.get('svi_iServicio')
      ? record.get('svi_iServicio')
      : record.get('Id')
    var controller = this
    var store = Ext.create('Ext.data.Store', {
      model: controller.getServTecSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
      autoload: false,
      pageSize: 100,
      filters: [
        {
          property: 'stc_iid',
          value: idServicio
        }
      ]
    })
    store.load({
      callback: function (records) {
        controller.populateForm(record, records[0], view)
      }
    })
  },

  populateForm: function (record, recordFull, view) {
    var controller = this
    controller.getM_st_cabeceraModelModel().load(view.record.get('Id'), {
      callback: function (records) {
        view.down('moduletreeview').enable();//lo habilito nuevamente después de que se traen los datos de cabecera para evitar errores de vista
        view.down('tabpanel').enable();//lo habilito nuevamente después de que se traen los datos de cabecera para evitar errores de vista
        if (view.down('treepanel')) {
          view.down('treepanel').record = view.recordFull
          view.down('treepanel').targetTab = view.down('#centerx')
        }
        view.down('#numeroServTec').setValue(record.get('stc_inumero'))
        //  view.down('#cuenta').setValue(recordFull.get('cue_clinea')+' - '+recordFull.get('cue_ncuenta')+' - '+recordFull.get('cue_cnombre'));
        view.down('#calle').setValue(recordFull.get('cue_ccalle'))
        view.down('#localidad').setValue(recordFull.get('cue_clocalidad'))
        view.down('#contacto').setValue(recordFull.get('stc_ccontacto'))
        view.down('#incioservicio').setValue(recordFull.get('cue_dservicio'))
        view.down('#tipoServicio').setValue(recordFull.get('tip_cdescripcion'))
        view.down('#estado').setValue(recordFull.get('_stc_estadodescripcion'))
        var contactoStore = Ext.create( 'Ext.data.Store', {
          model: controller.getSoftguardTelefonoModelModel(),
          remoteSort: false,
          remoteFilter: false,
          sorters: [
            {
              property: 'tel_norden',
              direction: 'ASC'
            }
          ]
        });
        var _ObjectId = recordFull.get( 'cue_iid' );
        if( _ObjectId > 0 ) {
          // una vez que cargue el store hago el binding con la view
          contactoStore.load( {
            ObjectId: _ObjectId, view: view, store: view.mystore, callback: function() {
              console.log('CONTACTOOO->',records.get('stc_ccontacto'));
              console.log('Record->',view.record);
              console.log('recordFull->',recordFull);
              console.log('#telefono',view.down('#telefono').getValue());
              if(view.down('#telefono' == undefined)){
                  view.down('#telefono').setValue(view.record.get('cue_ctelefono'))
                }
              var contactoValue = records.get('stc_ccontacto').trim();
              var telefonofind = contactoStore.data.items.find(function(record) {
                return record.get('tel_cnombre') === contactoValue;
              });
              if(telefonofind){
                var telefonoContacto = telefonofind.data.tel_ctelefono
                if (telefonoContacto) {
                  view.down('#telefono').setValue(telefonofind.data.tel_ctelefono);
                  view.down('#contacto').setValue(telefonofind.data.tel_cnombre);
                }
              }
            }
          });
        }
        else{
          console.log('RecordFullTel',recordFull.get('cue_ctelefono'))
          view.down('#telefono').setValue(record.get('cue_ctelefono'))
       }
      
        if (Ext.util.Format.trim(view.record.get('stc_ctecnico_1')) != '') {
          var tecnicoStore = Ext.create('Ext.data.Store', {
            model: controller.getInstaladoresByTokenSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
              {
                property: 'ins_ccodigo',
                value: view.record.get('stc_ctecnico_1')
              }
            ]
          })
          tecnicoStore.load({
            callback: function (records) {
              if (records[0]) {
                view.down('#tecnico').setValue(records[0].get('ins_cnombre'))
              }
            }
          })
        } else {
          view.down('#tecnico').setValue(getLocale('Aun no definido'))
        }
        if (
          Ext.util.Format.trim(
            view.record.get('stc_cmovil_1').replace('ST', '')
          ) != '' &&
          Ext.util.Format.trim(
            view.record.get('stc_cmovil_1').replace('ST', '')
          ) != 0
        ) {
          var movilStore = Ext.create('Ext.data.Store', {
            model: controller.getServTecMovilVisitasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
              {
                property: 'tmp_iid',
                value: view.record.get('stc_cmovil_1').replace('ST', '')
              }
            ]
          })
          movilStore.load({
            callback: function (records) {
              if (records.length > 0) {
                if (records[0]) {
                  view.down('#movil').setValue(records[0].get('tmp_cnombre'))
                }
              }
            }
          })
        } else {
          view.down('#movil').setValue(getLocale('Aun no definido'))
        }
        //view.down('#movil').setValue(recordFull.get('stc_cmovil_1'));
        view
          .down('#fieldsettitulo')
          .setTitle(
            getLocale('Datos de servicio tecnico ') +
              ' - ' +
              recordFull.get('cue_clinea') +
              ' - ' +
              recordFull.get('cue_ncuenta') +
              ' - ' +
              recordFull.get('cue_cnombre')
          )
        Ext.Ajax.request({
          url: '/Rest/t_parametros/',
          params:
            'filter=[{"property":"par_ccodigo:IN","value":"MESESGARANTIA"}]',
          method: 'GET',
          scope: this,
          success: function (response) {
            var configs = Ext.JSON.decode(response.responseText)
            if (configs) {
              //  console.log(Ext.Date.add(new Date(recordFull.get('cue_dservicio')), Ext.Date.MONTH, configs.rows[0].par_ivalor),Ext.Date.MONTH, configs.rows[0].par_ivalor)
              var fechaGarantia = Ext.Date.add(
                new Date(recordFull.get('cue_dservicio')),
                Ext.Date.MONTH,
                configs.rows[0].par_ivalor
              )
              if (fechaGarantia >= new Date()) {
                view
                  .down('#incioservicio')
                  .setValue(
                    Ext.Date.format(
                      new Date(recordFull.get('cue_dservicio')),
                      'd/m/Y'
                    ) +
                      getLocale(' EN GARANTIA ') +
                      '(' +
                      Ext.Date.format(new Date(fechaGarantia), 'd/m/Y') +
                      ')'
                  )
              } else {
                view
                  .down('#incioservicio')
                  .setValue(
                    '(' +
                      Ext.Date.format(
                        new Date(recordFull.get('cue_dservicio')),
                        'd/m/Y'
                      ) +
                      ')' +
                      '  ' +
                      getLocale('SIN GARANTIA') +
                      '  ' +
                      '(' +
                      Ext.Date.format(new Date(fechaGarantia), 'd/m/Y') +
                      ')'
                  )
              }
            }
          }
        })
        value = recordFull.get('stc_nestado') //value = recordFull.get('_stc_estadodescripcion');
        //  var style = '';
        console.log('******************************************************')
        console.log('*********Ingresando al coloreado de título************')
        console.log('******************************************************')
        console.log('Estado de evento: ' + value)
        var eleTitulo = view.down('#titulo').el
        if (eleTitulo) {
          if (value == 3 /*'Cancelado'*/) {
            eleTitulo.setStyle('background', '#ff0000')
            eleTitulo.setStyle('color', '#000000')
          } else if (value == 4 /*'Finalizado'*/) {
            eleTitulo.setStyle('background', '#33CC33')
            eleTitulo.setStyle('color', '#000000')
          } else if (value == 1 /*'Pendiente'*/) {
            eleTitulo.setStyle('background', '#FFFF00')
            eleTitulo.setStyle('color', '#000000')
          } else if (value == 2 /*'Asignado'*/) {
            eleTitulo.setStyle('background', '#FFFF00')
            eleTitulo.setStyle('color', '#ffffff')
          } else if (value == 5 /*'En Ejecución'*/) {
            eleTitulo.setStyle('background', '#FFFF00')
            eleTitulo.setStyle('color', '#ffffff')
          } else if (value == 6 /*'En Camino'*/) {
            eleTitulo.setStyle('background', '#FFFF00')
            eleTitulo.setStyle('color', '#ffffff')
          }
          console.log('Color de titulo: ' + eleTitulo)
          for (const prop of Object.keys(eleTitulo)) {
            console.log(prop)
          }
          //  console.log(view.down('#titulo'));
          //view.down('#titulo').el.setStyle(style);
        }
      }
    })
  },

  openDefaultTab: function (view) {
    var newTab = Ext.widget('sertecfullformview', {
      iconCls: 'icon-servtec',
      title: getLocale('SerTec'),
      targetTab: view,
      closable: false,
      tipo: 'preventivo',
      operador: view.operador,
      record: view.record,
      mode: 'edit',
      readOnly: view.readOnly,
      translate: false,
      recordFull: view.recordFull
    })
    var tabpanel = view.down('tabpanel')
    tabpanel.add(newTab)
    tabpanel.setActiveTab(newTab)
  }
})
