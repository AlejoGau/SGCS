//MIGRADO2024
Ext.define('Common.controller.CuentaRecepcionController', {
  extend: 'Ext.app.Controller',
  requires: ['Common.mock.CuentaRecepcionMockData'],
  stores: [
    'Common.store.EventoEstadoStore',
    'Common.store.TablaTiposStore',
    'Common.store.SoftguardEstadoEstadoStore'
  ],
  models: [
    't_autoridaddestinoSearchModel',
    't_autoridadesModel',
    't_autoridadesSearchModel',
    'CuentaSearchModel',
    'UsuarioSearchModel',
    'ZonaSearchModel',
    'CuentaRecepcionSinProxyModel',//'CuentaRecepcionModel',
    'ZonaByCuentaSearchModel',
    'TablaHistoricoSearchModel',
    'soperadoresSearchModel',
    'SoftguardCodigoAlarmaModel',
    'ComboEventosModel'
  ],
  views: ['CuentaRecepcionView'],
  // Set to true only when forcing local mock data during troubleshooting
  useMockRecepcionData: false,
  refs: [
    {
      ref: 'statusBar',
      selector: '#statusbar'
    },
    {
      ref: 'grid',
      selector: '#gridrecepcion'
    },
    {
      ref: 'panelBuscador',
      selector: '#recepcionpanel'
    },
    {
      ref: 'panelRecepcion',
      selector: 'recepcionview'
    },
    {
      ref: 'desdePicker',
      selector: '#fechadesde'
    },
    {
      ref: 'hastaPicker',
      selector: '#fechahasta'
    },
    {
      ref: 'radioreporte',
      selector: '#treporte'
    },
    {
      ref: 'radioevento',
      selector: '#tevento'
    }
  ],
  init: function (config) {
    this.control({
      recepcionview: {
        afterrender: this.initialize
      },
      'recepcionview #gridrecepcion': {
        itemdblclick: this.onItemClick
      },
      /*'recepcionview #fechadesde' : {
                select : this.selectFechaDesde
            },
            'recepcionview #fechahasta' : {
                select : this.selectFechaHasta
            },*/
      'recepcionview #treporte': {
        change: this.selectReporte
      },
      'recepcionview #tevento': {
        change: this.selectEvento
      },
      'recepcionview #feventos': {
        select: this.filterEvento
      },
      'recepcionview button[action=export]': {
        click: this.onExportarClick
      },
      'recepcionview button[action=mail]': {
        click: this.onMailClick
      },
      'recepcionview button[action=search]': {
        click: this.preSearch
      },
      'recepcionview #imprimir': {
        click: this.onImprimirClick
      },
      'recepcionview #combohistorico': {
        select: this.onComboHistoricoSelect,
        change: this.onCleanDates
      },
      'recepcionview #particiones': {
        change: this.onAgregarParticionesClick
      },
      'recepcionview #observaciones': {
        click: this.onObservacionesClick
      },
      'recepcionView #origencheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #cuentamadrecheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #categorizacioncheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #observacionescheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #operadorcheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #resolucioncheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #lineatarjetacheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #fechahoraeventocheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #horacuentacheck': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView #fechaProceso': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionView gridcolumn[action=change]': {
        change: this.onMostrarOcultarColumn
      },
      'recepcionview checkbox[action=onFechaGpsChange]': {
        change: this.onFechaGpsChange
      }
    })
  },
  onFechaGpsChange: function (checkbox, newValue, oldValue, eOpts) {
    // Logica cuando cambie el checkbox
  },
  onMostrarOcultarColumn: function () { },
  onAgregarParticionesClick: function (field, newValue, oldValue, options) {
    var view = field.up('recepcionview')
    var cue_iid = view.record.get('cue_iid')
    var arrParticiones = [cue_iid]
    var controller = this
    var comboParticiones = view.down('#particionescombo')
    if (newValue) {
      /**
       * BC 365143764 : Muevo la funcion de crear el Store y solo lo cargo si el combo tiene un Store vacío, es decir al iniciar
       * En caso de que ya no exista ese Store, recargo el bindeado de particiones.
       *
       */
      comboParticiones.enable(true)
      if (comboParticiones.getStore().storeId == 'ext-empty-store') {
        /* Cargo el combo correspondiente a Particiones */
        var particionesStore = Ext.create('Ext.data.Store', {
          model: controller.getZonaByCuentaSearchModelModel(),
          remoteFilter: true,
          listeners: {
            beforeload: function (store, operation) {
              operation.params = { cuentaId: cue_iid }
            }
          },
          filters: [
            {
              property: 'zon_ccodigo:like',
              value: 'PAR'
            }
          ]
        })
        comboParticiones.bindStore(particionesStore)
        particionesStore.load()
      } else {
        comboParticiones.getStore().reload()
      }
      var store = Ext.create('Ext.data.Store', {
        model: 'Common.model.CuentaSearchModel',
        pageSize: 50,
        remoteSort: true,
        autoDestroy: true,
        remoteFilter: true,
        filters: [
          {
            property: 'cue_nparticion',
            value: cue_iid
          }
        ]
      })
      if (view.down('grid').down('[dataIndex=cue_cnombre]')) {
        view.down('grid').down('[dataIndex=cue_cnombre]').setVisible(true)
      }
      store.load({
        callback: function (records) {
          Ext.Array.forEach(records, function (value, index) {
            arrParticiones.push(value.get('cue_iid'))
          })
          view.options.Id = arrParticiones.join(',')
          var url = controller.armarUrl(view)
          var target = view.down('#Iframe')
          if (url) {
            //target.setSrc(url)
            target.load({
              url: url,
            });
          } else {
            //target.setSrc(view.baseurl)
            target.load({
              url: view.baseurl,
            });
          }
        }
      })
    } else {
      if (view.down('grid').down('[dataIndex=cue_cnombre]')) {
        view.down('grid').down('[dataIndex=cue_cnombre]').setVisible(false)
      }
      view.options.Id = arrParticiones.join(',')
      var url = controller.armarUrl(view)
      /**
       * BC 365143764 : Limpio el combo al momento de no tener tildado el CHECK de incluir particiones.
       */
      comboParticiones.disable(false)
      comboParticiones.getStore().removeAll()
      comboParticiones.setValue('')
      var target = view.down('#Iframe')
      if (url) {
        //target.setSrc(url)
        target.load({
          url: url,
        });
      } else {
        //target.setSrc(view.baseurl)
        target.load({
          url: view.baseurl,
        });
      }
    }
  },
  /*** Se saco el dia 15/11/2016 por problemas de compatibilidad con las seleccion multiple
* a pedido de rodrigo xD
* 
* 05/09/2018 Se agrega con modificaciones, en base al BC : 363438555
* 
selectDate: function(field, newValue, oldValue, options) {
    var view = field.up('recepcionview');
    
    
        if(view.down('#combohistorico').getValue() != '') {
        view.down('#combohistorico').setValue('');
    }
    
},
 
selectHistorico: function(field, newValue, oldValue, options) {
    var view = field.up('recepcionview');
    
    if(view.down('#fechadesde').getValue() != '' || view.down('#fechahasta').getValue() !='') {
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#horadesde').setValue('');
        view.down('#horahasta').setValue('');
        
        view.options.fechaDesde = null;
        view.options.fechaHasta = null;
    }    
}, */
  // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
  onCleanDates: function (combo, records, options) {
    var controller = this
    var view = combo.up('recepcionview')
    var value = view.down('#combohistorico').getValue()
    var fechadesde = view.down('#fechadesde')
    var fechahasta = view.down('#fechahasta')
    if (!value) {
      fechadesde.setValue('')
      fechahasta.setValue('')
      // Seteo el Min y Max a ambos combo.
      fechadesde.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()))
      fechadesde.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()))
      fechahasta.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()))
      fechahasta.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()))
      // Seteo la fecha en los combo del primer dia del mes y el de hoy
      fechadesde.setValue(Ext.Date.getFirstDateOfMonth(new Date()))
      fechahasta.setValue(new Date())
    }
  },

  onComboHistoricoSelect: function (combo, records, options) {
    var view = combo.up('recepcionview')
    var value = view.down('#combohistorico').getValue()
    var fechadesde = view.down('#fechadesde')
    var fechahasta = view.down('#fechahasta')
    if (value != view.dateSelected) {
      fechadesde.setValue('')
      fechahasta.setValue('')
      // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
      view
        .down('#fechadesde')
        .setMinValue(Ext.Date.getFirstDateOfMonth(new Date()))
      view
        .down('#fechahasta')
        .setMaxValue(Ext.Date.getLastDateOfMonth(new Date()))
    }
    if (value) {
      var fechahistorico = value.match(/\d{4}/g) + '-' + value.match(/\d{2}$/g)
      var month = value.match(/\d{2}$/g) - 1
      var fechahistoricodesde = Ext.Date.getFirstDateOfMonth(
        new Date(value.match(/\d{4}/g), month)
      )
      var fechahistoricohasta = Ext.Date.getLastDateOfMonth(
        new Date(value.match(/\d{4}/g), month)
      )
      /*
        fechadesde.setValue(fechahistoricodesde);
        fechahasta.setValue(fechahistoricohasta);
        */
      fechadesde.setMinValue(fechahistoricodesde)
      fechadesde.setMaxValue(fechahistoricohasta)
      fechahasta.setMinValue(fechahistoricodesde)
      fechahasta.setMaxValue(fechahistoricohasta)
      view.options.fechaDesde = null
      view.options.fechaHasta = null
      if (fechadesde.getValue() || fechahasta.getValue()) {
        if (
          fechadesde.getValue() &&
          new Date(fechadesde.getValue()).getTime() < fechahistoricodesde
        ) {
          fechadesde.markInvalid('Se encuentra fuera de rango')
        }
        if (
          fechahasta.getValue() &&
          new Date(fechahasta.getValue()).getTime() > fechahistoricohasta
        ) {
          fechahasta.markInvalid('Se encuentra fuera de rango')
        }
      } else {
        fechadesde.setValue(fechahistoricodesde)
        fechahasta.setValue(fechahistoricohasta)
      }
    }
    view.dateSelected = value
  },

  onMailClick: function (button) {
    var view = button.up('recepcionview');
    var url = this.armarUrl(view);
    fetch(url)
      .then(response => response.text())
      .then(html => {
        var mailbody = html;
        var from =
          getParametro('MAILSENDERNAME') + ' <' + getParametro('MAILSENDER') + '>';
        var mail = Ext.widget('mailformview', {
          mailbody: mailbody,
          from: from,
          autoScroll: true,
          subject: getLocale('Reporte de eventos'),
          cue_iid: view.record.get('cue_iid')
        });
        var win = Ext.widget('window', {
          title: 'Envío de correo',
          layout: 'fit',
          items: mail,
          width: 800,
          height: 450
        }).show();
      });
    /*
    var mailbody = document.getElementById('iframe-' + iframe.getEl().id)
      .contentWindow.document.documentElement.innerHTML
    var from =
      getParametro('MAILSENDERNAME') + ' <' + getParametro('MAILSENDER') + '>'
    var mail = Ext.widget('mailformview', {
      mailbody: mailbody,
      from: from,
      autoScroll: true,
      subject: getLocale('Reporte de eventos'),
      cue_iid: view.record.get('cue_iid')
    })
    var win = Ext.widget('window', {
      title: 'Envío de correo',
      layout: 'fit',
      items: mail,
      width: 800,
      height: 450
    }).show()
    */
  },
  onObservacionesClick: function (button) {
    var view = button.up('recepcionview')
    if (button.pressed) {
      if (view.down('#col_observaciones')) {
        view.down('#col_observaciones').show()
      }
      if (view.down('#_origen')) {
        view.down('#_origen').show()
      }
      if (view.down('#rec_czona')) {
        view.down('#rec_czona').show()
      }
      if (view.down('#usu_cnombre')) {
        view.down('#usu_cnombre').show()
      }
      if (view.down('#rec_iPrioridad')) {
        view.down('#rec_iPrioridad').show()
      }
    } else {
      if (view.down('#col_observaciones')) {
        view.down('#col_observaciones').hide()
      }
      if (view.down('#_origen')) {
        view.down('#_origen').show()
      }
      if (view.down('#rec_czona')) {
        view.down('#rec_czona').show()
      }
      if (view.down('#usu_cnombre')) {
        view.down('#usu_cnombre').show()
      }
      if (view.down('#rec_iPrioridad')) {
        view.down('#rec_iPrioridad').show()
      }
    }
  },
  initialize: function (view) {
    var controller = this
    var cue_iid = view.record.get('cue_iid')
      ? view.record.get('cue_iid')
      : view.record.get('Id')
    view.down('#reportecompleto').setValue(false)
    view.baseurl = '/handler/EventosByCuentaHTML'
    if (getParametro('TIPOREPORTE') == 1) {
      view.baseurl = '/handler/EventosByCuentaNuevoHTML'
      view.down('#reportecompleto').setValue(true)
    }
    view.baseurl = Ext.String.urlAppend(
      view.baseurl,
      'token=' + controller.application.getToken()//Ext.util.Cookies.get('OAuth_Token')
    )
    //view.baseurl = Ext.String.urlAppend(view.baseurl, 'sort='+encodeURIComponent('[{"property":"rec_tfechahora","direction":"DESC"}]'));
    var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime())
    var target = view.down('#Iframe')
    var historicoStore = Ext.create('Ext.data.Store', {
      model: this.getTablaHistoricoSearchModelModel(),
      autoload: false,
      // dedalo estaba el remotesort y el remotefilter comentado los descomento 25/9/2018
      remoteSort: false,
      remoteFilter: true,
      sorters: [
        {
          property: 'c_periodo',
          direction: 'DESC'
        }
      ],
      pageSize: 10000
    })

    var comboHistorico = view.down('#combohistorico')
    comboHistorico.bindStore(historicoStore)
    historicoStore.load()
    var codAlarmaFilter = []
    if (view.for_cProtocolo) {
      codAlarmaFilter.push({
        property: 'for_cProtocolo',
        value: view.for_cProtocolo
      })
    }
    var usuarioStore = Ext.create('Ext.data.Store', {
      model: this.getUsuarioSearchModelModel(),
      sorters: [
        {
          property: 'usu_cnombre',
          direction: 'ASC'
        }
      ],
      remoteFilter: true,
      filters: [
        {
          property: 'cue_iid',
          value: cue_iid
        }
      ],
      pageSize: 10000
    })
    var comboTipoCuenta = view.down('#usuario')
    comboTipoCuenta.bindStore(usuarioStore)
    usuarioStore.load()
    var zoneStore = Ext.create('Ext.data.Store', {
      model: this.getZonaSearchModelModel(),
      remoteFilter: true,
      pageSize: 250,
      remoteSort: true,
      sorters: {
        property: 'orderCodigo',
        direction: 'ASC'
      },
      filters: [
        /*{
                    property: 'zon_ccodigo:LIKENOT',
                    value: 'PAR'
                },{
                    property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                    value: ''
                },*/ {
          property: 'zon_iidcuenta',
          value: cue_iid
        }
      ]
    })
    view.down('#zona').bindStore(zoneStore)
    zoneStore.load()
    var operadoresStore = Ext.create('Ext.data.Store', {
      model: this.getSoperadoresSearchModelModel(),
      autoload: false,
      remoteSort: true,
      remoteFilter: true,
      sorters: [
        {
          property: 'ope_cnombre',
          direction: 'ASC'
        }
      ],
      pageSize: 10000
    })
    var comboOperador = view.down('#combooperador')
    comboOperador.bindStore(operadoresStore)
    operadoresStore.load()
    if (!view.options) {
      view.options = {
        fechaHasta: '',
        fechaDesde: '',
        alertas: '',
        tipos: '',
        mostrar: getParametro('CANTIDADMAXHISTORICO'),
        orden: 'DESC', // cambio pedido por leo 23/1/2018
        Id: 0
      }
    }
    var options = view.options
    var viewport = view.up('#viewport')
    var record = view.record
    var cuenta = record
    view.options.Id = cue_iid
    if (
      view.record &&
      Ext.getClassName(view.record).split('.')[2] != 'VehicleModel'
    )
      cuenta = view.record
    var now = Ext.Date.now()
    if (view.options.fechaHasta) {
      now = view.options.fechaHasta
    }
    if (view.rec_cdll) {
      options.rec_cdll = view.rec_cdll
    }
    if (view.Origenes) {
      options.Origenes = view.Origenes
    }
    if (view.gps_cIMEI) {
      options.gps_cIMEI = view.gps_cIMEI
    }
    var filters = []
    if (view.filters) {
      filters = Ext.clone(view.filters)
    }
    filters.push({
      property: 'cue_nparticion',
      value: cue_iid
    })
    if (view.down('grid').down('[dataIndex=cue_cnombre]')) {
      view.down('grid').down('[dataIndex=cue_cnombre]').setVisible(false)
    }
    var store = Ext.create('Ext.data.Store', {
      model: this.getCuentaSearchModelModel(), //'Common.model.CuentaSearchModel',
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: filters
    })

    store.load({
      callback: function (records) {

        var mygrid = view.down('grid')
        if (!mygrid) {
          return
        }
        var mystore = Ext.create('Ext.data.Store', {
          model: controller.getCuentaRecepcionSinProxyModelModel(),
          remoteSort: true,
          pageSize: 50,
          remoteFilter: true,
          proxy: {
            type: 'cuentarecepcionproxy',
                reader: {
              type: 'json',
              rootProperty: 'rows',
              totalProperty: 'total'
                },
            url: '/Rest/Search/ReporteHistorico?Cuentas={0}&CodigosAlarmaExcluir=&FechaDesde={1}&FechaHasta={2}&Alertas={3}&Tipos={4}&Mostrar={5}&OrdenarFecha={6}&CodigosAlarma={7}&rec_cdll={8}&Origenes={9}&Estados={10}&Operador={11}&table={12}&TipoCuenta={13}&gps_cIMEI={14}&cue_clinea={15}&usuario={16}&zona={17}&rec_iid_from={18}&onlyRec_iid={19}&cue_ncuenta={20}&short={21}&Autoridades={22}&Prioridad={23}&start={24}&limit={25}&page={26}&sort={27}',
            replaceIdRegex: /\{0\}/,
                replaceFechaDesdeRegex: /\{1\}/,
            replaceFechaHastaRegex: /\{2\}/,
            replaceAlertasRegex: /\{3\}/,
            replaceTiposRegex: /\{4\}/,
            replaceMostrarRegex: /\{5\}/,
            replaceOrdenRegex: /\{6\}/,
                replaceEventosRegex: /\{7\}/,
                replaceReccdllRegex: /\{8\}/,
                replaceOrigenesRegex: /\{9\}/,
                replaceEstadosRegex: /\{10\}/,
                replaceOperadorRegex: /\{11\}/,
                replaceTableRegex: /\{12\}/,
                replaceTipoCuentaRegex: /\{13\}/,
                replaceGpsCImeiRegex: /\{14\}/,
                replaceDealerRegex: /\{15\}/,
                replaceUsuarioRegex: /\{16\}/,
                replaceZonaRegex: /\{17\}/,
                replacerec_iid_fromRegex: /\{18\}/,
                replaceonlyRec_iidRegex: /\{19\}/,
                replacecue_ncuentaRegex: /\{20\}/,
                replaceShortRegex: /\{21\}/,
                replaceAutoridadesRegex: /\{22\}/,
            replacePrioridadRegex: /\{23\}/,
            replaceStartRegex: /\{24\}/,
            replaceLimitRegex: /\{25\}/,
            replacePageRegex: /\{26\}/,
            replaceSortRegex: /\{27\}/,

            appendId: true,
          },/// cierro el proxy

          buildUrl: function (request) {
            var me = this;
            var operation = typeof request.getOperation === 'function'
              ? request.getOperation()
              : request._operation;
            var store = operation && typeof operation.getStore === 'function'
              ? operation.getStore()
              : operation && operation.store
              ? operation.store
              : null;

            var params =
              (typeof request.getParams === 'function' && request.getParams()) ||
              (operation && typeof operation.getParams === 'function' && operation.getParams()) ||
              (operation && operation.params) ||
              {};

            var storeOptions = store && store.options ? store.options : null;
            if (storeOptions) {
              params = Ext.apply({}, storeOptions, params);
            } else {
              params = Ext.apply({}, params);
            }

            if (!params.Id && store && store.lastParams && store.lastParams.Id) {
              params.Id = store.lastParams.Id;
            }

            var url = me.getUrl(request);
            var format = me.format;
            var dt = new Date();

            var parseDate = function (value) {
              if (Ext.isDate(value)) {
                return value;
              }
              if (Ext.isString(value) && value) {
                return (
                  Ext.Date.parse(value, 'c') ||
                  Ext.Date.parse(value, 'm/d/Y g:i:s A') ||
                  Ext.Date.parse(value, 'm-d-Y g:i:s A') ||
                  Ext.Date.parse(value, 'd/m/Y H:i:s') ||
                  Ext.Date.parse(value, 'Y-m-d H:i:s') ||
                  new Date(value)
                );
              }
              return value;
            };

            var id = Ext.isDefined(params.Id) ? params.Id : '';
            url = url.replace(me.replaceIdRegex, id);
            var sortParam = '';

            // 1) si ya viene en params.sort (por ejemplo desde el pagingtoolbar)
            if (params.sort) {
              if (Ext.isString(params.sort)) {
                sortParam = params.sort;
              } else {
                // array u objeto
                sortParam = Ext.encode(params.sort);
              }
            } else if (operation && typeof operation.getSorters === 'function') {
              // 2) si no vino en params, intento leerlo de la operation
              var opSorters = operation.getSorters();
              if (opSorters && opSorters.length) {
                var arr = [];
                Ext.Array.each(opSorters, function (s) {
                  arr.push({
                    property: s.getProperty ? s.getProperty() : s.property,
                    direction: s.getDirection ? s.getDirection() : s.direction
                  });
                });
                sortParam = Ext.encode(arr);
              }
            }

            // 3) default
            if (!sortParam || sortParam === '') {
              sortParam = Ext.encode([{ property: 'rec_tfechahora', direction: 'DESC' }]);
            }
            var desde =
              Ext.isDefined(params.fechaDesde) && params.fechaDesde !== ''
                ? params.fechaDesde
                : null;
            var hasta =
              Ext.isDefined(params.fechaHasta) && params.fechaHasta !== ''
                ? params.fechaHasta
                : null;

            if (desde !== null) {
              desde = parseDate(desde);
              if (!Ext.isDate(desde) || isNaN(desde.getTime())) {
                desde = null;
              }
            }
            if (hasta !== null) {
              hasta = parseDate(hasta);
              if (!Ext.isDate(hasta) || isNaN(hasta.getTime())) {
                hasta = null;
              }
            }

            var cantidad = Ext.isDefined(params.mostrar)
              ? params.mostrar
              : getParametro('CANTIDADMAXHISTORICO');
            var alertas = params.alertas ? params.alertas : '';
            var tipos = params.tipos ? params.tipos : '';
            var eventos = params.eventos ? params.eventos : '';
            var rec_cdll = params.rec_cdll ? params.rec_cdll : '';
            var Origenes = params.Origenes ? params.Origenes : '';
            var Estados = params.Estados ? params.Estados : '';
            var operador = params.operador ? params.operador : '';
            var orden = params.orden ? params.orden : 'DESC';
            var tipocuenta = params.tipocuenta || params.TipoCuenta || '';
            var imei = params.gps_cIMEI ? params.gps_cIMEI : '';
            var dealer = params.cue_clinea ? params.cue_clinea : '';
            var zona = params.zona ? params.zona : '';
            var usuario = params.usuario ? params.usuario : '';
            var rec_iid_from = params.rec_iid_from ? params.rec_iid_from : '';
            var onlyRec_iid = params.onlyRec_iid ? params.onlyRec_iid : '';
            var cue_ncuenta = params.cue_ncuenta ? params.cue_ncuenta : '';
            var short = params.short ? params.short : '';
            var Autoridades = params.Autoridades ? params.Autoridades : '';
            var Prioridad = params.Prioridad ? params.Prioridad : '';
            var table = params.table ? params.table : '';
            var start = Ext.isDefined(params.start) ? params.start : 0;
            var page = Ext.isDefined(params.page) ? params.page : 0;
            var limit = Ext.isDefined(params.limit)
              ? params.limit
              : Ext.isDefined(params.mostrar)
                ? params.mostrar
                : 50;

            if (desde !== null) {
              url = url.replace(
                me.replaceFechaDesdeRegex,
                Ext.Date.format(desde, 'Y-m-d H:i:s')
              );
            } else {
              url = url.replace(/&?FechaDesde=\{1\}/, '');
            }
            if (hasta !== null) {
              url = url.replace(
                me.replaceFechaHastaRegex,
                Ext.Date.format(hasta, 'Y-m-d H:i:s')
              );
            } else {
              url = url.replace(/&?FechaHasta=\{2\}/, '');
            }

            url = url.replace(/&&/g, '&');
            url = url.replace(/\?&/, '?');
            url = url.replace(/[&?]$/, '');

            url = url.replace(me.replaceMostrarRegex, cantidad);
            url = url.replace(me.replaceAlertasRegex, alertas);
            url = url.replace(me.replaceTiposRegex, tipos);
            url = url.replace(me.replaceReccdllRegex, rec_cdll);
            url = url.replace(me.replaceOrdenRegex, orden);
            url = url.replace(me.replaceEventosRegex, eventos);
            url = url.replace(me.replaceEstadosRegex, Estados);

            if (url.indexOf('[object Object]') > -1) {
              url = url.replace('[object Object]', '');
            }

            url = url.replace(me.replaceOrigenesRegex, Origenes);
            url = url.replace(me.replaceOperadorRegex, operador);
            url = url.replace(me.replaceTableRegex, table ? table : 'p_recepcion');
            url = url.replace(me.replaceTipoCuentaRegex, tipocuenta);
            url = url.replace(me.replaceGpsCImeiRegex, imei);
            url = url.replace(me.replaceDealerRegex, dealer);
            url = url.replace(me.replaceUsuarioRegex, usuario);
            url = url.replace(me.replaceZonaRegex, zona);
            url = url.replace(me.replacerec_iid_fromRegex, rec_iid_from);
            url = url.replace(me.replaceonlyRec_iidRegex, onlyRec_iid);
            url = url.replace(me.replacecue_ncuentaRegex, cue_ncuenta);
            url = url.replace(me.replaceShortRegex, short);
            url = url.replace(me.replaceAutoridadesRegex, Autoridades);
            url = url.replace(me.replacePrioridadRegex, Prioridad);
            url = url.replace(me.replaceStartRegex, start);
            url = url.replace(me.replaceLimitRegex, limit);
            url = url.replace(me.replacePageRegex, page);
            url = url.replace(me.replaceSortRegex, encodeURIComponent(sortParam));

            if (format) {
              if (!url.match(/\.$/)) {
                url += '.';
              }
              url += format;
            }

            request.config.url = url;

            if (store) {
              store.lastUrl = url;
              store.lastParams = Ext.apply({}, params);
            }

            if (typeof request.setParams === 'function') {
              request.setParams({});
            } else if (request.config) {
              request.config.params = {};
            }

            url = url.replace(/#/g, '%23');
            return url;
          },



          listeners: {
            //VOLVER ATRAS beforeload: me.onBeforeload
            load: function (store, records, successful, operation, eOpts) {
              store.loading = false;
            }
          },
          sorters: [
            {
              property: 'rec_tfechahora',
              id: 'rec_tfechahora',
              direction: 'DESC'
            }
          ]
        })
        mystore.loading = false;
        mygrid.bindStore(mystore)
        var pagingtoolbar = view.down('pagingtoolbar')
        if (pagingtoolbar) {
          pagingtoolbar.bindStore(mystore);

          // 👇 AGREGADO: paginado real
          pagingtoolbar.on('beforechange', function (pt, page) {
            var v = pt.up('recepcionview');
            if (!v) return false;

            // actualizo la página actual del store
            mystore.currentPage = page;

            // tu loadData ya arma start/limit y llama al proxy
            controller.loadData(v);

            // corto el load automático del paging
            return false;
          });
        }

        if (!mystore.hasListener || !mystore.hasListener('load')) {
          mystore.on('load', controller.onRecepcionStoreLoad, controller)
        }

        if (view.record) {
          var rangoField = view.down('#rango')
          if (rangoField) {
            rangoField.hide()
          }
          var partstore = Ext.create('Ext.data.Store', {
            model: controller.getZonaByCuentaSearchModelModel(),
            remoteFilter: true,
            listeners: {
              beforeload: function (store, operation) {
                operation.params = { cuentaId: view.record.get('Id') }
              }
            },
            filters: [
              {
                property: 'zon_ccodigo:like',
                value: 'PAR'
              }
            ]
          })
          partstore.proxy.extraParams = { cuentaId: view.record.get('Id') }
          partstore.load({
            callback: function (recordsParticiones) {
              if (recordsParticiones && recordsParticiones.length) {
                view.particiones = Ext.Array.map(recordsParticiones, function (recordPart) {
                  return recordPart.get('cue_iid')
                })
                view.particiones.push(view.record.get('cue_iid'))
              }
            }
          })
        }

        if (cuenta) {
          view.cuenta = cuenta
        }

        if (typeof _UserData !== 'undefined' && _UserData && _UserData.UserId) {
          view.emailFrom = _UserData.UserId
        }

        controller.onSearchClick(view)
      }
    })


    if (view.security && view.security.event) {
      //se fija en el security si tiene observacion para mostrar
      Ext.Array.each(view.security.event, function (v, k) {
        if (v.view == 'eventobservacionesgridview' && v.profile == 1) {
          view.down('#observacionescheck').show()
        }
      })
    }
    var combo = view.down('#feventos')
    var combostoreeventos = Ext.create('Ext.data.Store', {
      model: this.getComboEventosModelModel()
    })
    combo.bindStore(combostoreeventos)
    if (view.hideComboEventos) {
      combo.hide()
    }
    var eventos = getParametro('CODALRFALLAAC')
    eventos = eventos.split('|').join()
    combo
      .getStore()
      .add({ field1: eventos, field2: getLocale('Fallo de energía') })
    Ext.Ajax.request({
      url: '/rest/search/CodigosFalloTest',
      method: 'GET',
      success: function (response, action) {
        var json = Ext.JSON.decode(response.responseText)
        var objects = json.rows
        var eventos = Ext.Array.pluck(objects, 'tst_cAlarma').join()
        combo
          .getStore()
          .add({ field1: eventos, field2: getLocale('Fallo de enlace') })
      }
    })
    combo.getStore().add({ field1: 'LOW', field2: getLocale('Batería baja') })
    combo
      .getStore()
      .add({
        field1: 'OVF,CVF,OSA,OPF,CSA,CLF,NYO,NYC',
        field2: getLocale('Apertura y cierres fuera de horario')
      })
    if (
      controller.application._nameModule &&
      controller.application._nameModule == 'AWCC'
    ) {
      if (view.down('grid').down('[dataIndex=_Origen]')) {
        view.down('grid').down('[dataIndex=_Origen]').setVisible(false)
      }
      if (view.down('grid').down('[dataIndex=cod_nprioridad]')) {
        view.down('grid').down('[dataIndex=cod_nprioridad]').setVisible(false)
      }
      if (view.down('grid').down('[dataIndex=rec_iPrioridad]')) {
        view.down('grid').down('[dataIndex=rec_iPrioridad]').setVisible(false)
      }
      if (view.down('grid').down('[dataIndex=ope_cnombre]')) {
        view.down('grid').down('[dataIndex=ope_cnombre]').setVisible(false)
      }
      view.down('#eventhelper').filter = [
        {
          property: 'cod_nWebCliente',
          value: 1
        }
      ]
    }
    var securitymodules = SecurityModulesStore //controller.getSecurityModulesStoreStore();
    var administratorModule = securitymodules.findRecord(
      'KeyReference',
      'Administrator'
    )
    var isAdmin = administratorModule
      ? administratorModule.get('Available')
      : false
    var isaccount = getRight('Administrator', 'cuenta');
    try {
      if (
        (isAdmin && !isaccount) ||
        (view.module && view.module.get('profile') == 3)
      ) {
        view.down('#mail').show()
        view.down('#btnExportar').show()
      }
    } catch (exception) {
      if ((isAdmin && !isaccount) || (view.module && view.moduleprofile == 3)) {
        view.down('#mail').show()
        view.down('#btnExportar').show()
      }
    }
    
    if (getParametro('TIPOREPORTE') == 1) {
      view.down('#origencheck').setValue(true)
      view.down('#cuentamadrecheck').setValue(true)
      view.down('#categorizacioncheck').setValue(true)
      view.down('#observacionescheck').setValue(true)
      view.down('#resolucioncheck').setValue(true)
      view.down('#timelinecheck').setValue(true)
      view.down('#llamadascheck').setValue(true)
      view.down('#operadorcheck').setValue(true)
    }
    if (
      controller.application._nameModule &&
      controller.application._nameModule == 'AWCC'
    ) {
      view.down('#btnExportar').hide()
    }
    // manejo la zona horaria
    if (record.get('cue_iZonaHoraria') == 0) {
      if (view.down('grid').down('[dataIndex=ttz_noffset]')) {
        view.down('grid').down('[dataIndex=ttz_noffset]').setVisible(false)
      }
    } else {
      if (view.down('grid').down('[dataIndex=ttz_noffset]')) {
        view.down('grid').down('[dataIndex=ttz_noffset]').setVisible(true)
      }
    }
    if (view.hideImprimir) {
      view.down('#imprimir').hide()
    }
    if (view.rights && view.rights.exportar) {
      view.down('#btnExportar').show()
    }
    if (view.hideEnviar) {
      view.down('#mail').hide()
    }
    var autoridadesStore = Ext.create('Ext.data.Store', {
      model: this.getT_autoridadesSearchModelModel(),
      autoload: false,
      remoteSort: true,
      remoteFilter: true,
      sorters: [
        {
          property: 'aut_cnombre',
          direction: 'DESC'
        }
      ],
      pageSize: 10000
    })
    var comboAutoridades = view.down('#autoridades')
    comboAutoridades.bindStore(autoridadesStore)
    autoridadesStore.load()
    // aseguro estado observaciones.
    var observaciones = view.down('#observaciones')
    if (observaciones && view.showObservaciones) {
      observaciones.toggle(true)
    } else if (observaciones) {
      controller.onObservacionesClick(observaciones)
    }



  },
  selectFechaDesde: function (datepicker, date, options) {
    var view = datepicker.up('recepcionview')
    var options = view.options
    options.fechaDesde = date
    //this.getRadioreporte().setValue('3');
    this.loadData(view)
  },
  selectFechaHasta: function (datepicker, date, options) {
    var view = datepicker.up('recepcionview')
    var options = view.options
    var dhasta = Ext.Date.add(date, Ext.Date.DAY, 1)
    options.fechaHasta = dhasta
    //	this.getRadioreporte().setValue('3');
    this.loadData(view)
  },
  selectEvento: function (field, newValue, oldValue, options) {
    var view = field.up('recepcionview')
    var options = view.options
    if (Ext.typeOf(newValue.tevento) != 'array') {
      options.alertas = ''
      options.tipos = ''
      switch (newValue) {
        case '1':
          options.alertas = '1'
          break
        case '2':
          options.alertas = '0'
          break
        case '3':
          options.tipos = '1'
          break
        case '4':
          options.tipos = '2'
          break
        case '5':
          options.tipos = '1,2'
          break
      }
      // console.log(this, newValue.tevento, this.tipos);
      //	this.loadData(view);
    }
  },

  filterEvento: function (combo, records, options) {
    var view = combo.up('recepcionview')
    var options = view.options
    var value = records[0].get('field1')
    options.alertas = ''
    options.tipos = ''
    options.eventos = value
    //this.loadData(view);
  },
  selectReporte: function (field, newValue, oldValue, options) {
    var view = field.up('recepcionview')
    var options = view.options
    if (Ext.typeOf(newValue.treporte) != 'array') {
      options.tipoEvento = newValue.treporte
      options.mostrar = 0
      options.orden = '' //'ASC';
      switch (newValue) {
        case '1':
          //options.mostrar = 100;
          //options.orden = 'Desc';
          options.fechaDesde = ''
          options.fechaHasta = ''
          break
        case '2':
          var dhasta = Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.DAY, 1)
          this.setFechaHasta(dhasta, view)
          this.setFechaDesde(
            new Date(Ext.Date.getFirstDateOfMonth(options.fechaHasta)),
            view
          )
          break
        case '3':
          break
      }
      //this.loadData(view);
    }
  },
  setFechaHasta: function (date, view) {
    var options = {}
    if (view.options) {
      options = view.options
    }
    options.fechaHasta = date
    this.getHastaPicker().setValue(options.fechaHasta)
  },
  setFechaDesde: function (date, view) {
    var options = {}
    if (view.options) {
      options = view.options
    }
    options.fechaDesde = date
    this.getDesdePicker().setValue(options.fechaDesde)
  },

  loadData: function (view) {
    var controller = this
    var myGrid = view.down('grid')
    if (!myGrid) return
    var myStore = myGrid.getStore ? myGrid.getStore() : myGrid.store
    if (!myStore) return

    var params = controller.buildRecepcionRequestParams(view)

    view.options = view.options || {}
    Ext.apply(view.options, params)

    myStore.options = view.options

    params = Ext.apply({}, view.options)
    myStore.lastParams = Ext.apply({}, params)

    if (controller.shouldUseMockRecepcionData(view)) {
      if (controller.applyMockRecepcionData(myStore, view)) {
        if (myGrid.getView && myGrid.getView().refresh) {
          myGrid.getView().refresh()
        }
        return
      }
    }

    var proxy = myStore.getProxy ? myStore.getProxy() : null
    if (proxy && proxy.setExtraParams) {
      proxy.setExtraParams(Ext.apply({}, params))
    }

    myStore.load({
      callback: function (records, operation, success) {
        if (success && view.options) {
          var total = null
          if (operation && typeof operation.getResultSet === 'function') {
            var resultSet = operation.getResultSet()
            if (resultSet && Ext.isDefined(resultSet.total)) {
              total = resultSet.total
            }
          }
          if (total == null && typeof myStore.getTotalCount === 'function') {
            total = myStore.getTotalCount()
          }
          if (total == null && Ext.isDefined(myStore.totalCount)) {
            total = myStore.totalCount
          }
          if (Ext.isNumber(total)) {
            view.options.total = total
          }
        }
      }
    })
  },

  shouldUseMockRecepcionData: function (view) {
    if (this.useMockRecepcionData === true) {
      return true
    }
    if (view && view.mockRecepcionData) {
      return true
    }
    return (
      typeof window !== 'undefined' && !!window.__RECEPCION_USE_MOCK_STORE__
    )
  },

  buildRecepcionRequestParams: function (view) {
    var options = view.options ? Ext.apply({}, view.options) : {}
    if (!options.Id && view.record) {
      options.Id = view.record.get('cue_iid') || view.record.get('Id')
    }
    if (Ext.isString(options.Id)) {
      options.Id = Ext.String.trim(options.Id)
    }
    if (!Ext.isDefined(options.mostrar) || options.mostrar === '') {
      options.mostrar = getParametro('CANTIDADMAXHISTORICO')
    }
    if (!options.orden) {
      options.orden = 'DESC'
    }

    // --- CÓDIGO ELIMINADO ACÁ ---
    // Se borró la lógica que forzaba options.fechaDesde y options.fechaHasta

    return options
  },

  getMockRecepcionPayload: function (view) {
    if (view && view.mockRecepcionData) {
      return view.mockRecepcionData
    }
    if (typeof window !== 'undefined' && window.__RECEPCION_USE_MOCK_STORE__) {
      return window.__RECEPCION_USE_MOCK_STORE__
    }
    if (
      typeof Common !== 'undefined' &&
      Common.mock &&
      Common.mock.CuentaRecepcionMockData
    ) {
      var mockModule = Common.mock.CuentaRecepcionMockData
      if (mockModule.data) {
        return mockModule.data
      }
      if (mockModule.getRows) {
        return {
          rows: mockModule.getRows(),
          total:
            typeof mockModule.getTotal === 'function'
              ? mockModule.getTotal()
              : undefined
        }
      }
    }
    return null
  },

  applyMockRecepcionData: function (store, view) {
    var payload = this.getMockRecepcionPayload(view)
    if (!payload) {
      return false
    }
    var rows = []
    if (Ext.isArray(payload)) {
      rows = Ext.clone(payload)
    } else if (Ext.isArray(payload.rows)) {
      rows = Ext.clone(payload.rows)
    } else if (Ext.isArray(payload.data)) {
      rows = Ext.clone(payload.data)
    }
    var total = Ext.isDefined(payload.total) ? payload.total : rows.length

    if (typeof store.removeAll === 'function') {
      store.removeAll()
    }
    if (typeof store.loadData === 'function') {
      store.loadData(rows)
    } else if (typeof store.loadRawData === 'function') {
      store.loadRawData(rows)
    }
    store.totalCount = total
    if (view) {
      view.mockRecepcionData = payload
      if (view.options) {
        view.options.total = total
        store.options = view.options
      }
    } else if (!store.options) {
      store.options = {}
    }
    if (store.fireEvent) {
      var currentRecords = typeof store.getRange === 'function' ? store.getRange() : rows
      store.fireEvent('load', store, currentRecords, true, null, null)
    } else {
      this.onRecepcionStoreLoad(store, rows, true)
    }
    return true
  },

  onRecepcionStoreLoad: function (store, records, successful) {
    if (successful && records && records.length === 0) {
      Ext.Msg.alert('Aviso', 'No se encontraron eventos')
    }
  },


  onItemClick: function (grid, record, item, index, e, options) {
    var view = grid.up('recepcionview')
    var panel = view.targetTab ? view.targetTab : Ext.getCmp('center')
    //var title = record.get('dealer-cuenta')+' > '+record.get('rec_calarma')+ '-' +record.get('cod_cdescripcion');
    var title =
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta') +
      ' ' +
      Ext.Date.format(new Date(record.get('rec_isoFechaHora')), 'Y-m-d H:i:s')
    // Agrego la consulta de Tabla Historica de TimeLine en base a lo filtrado en el Combo
    var table;
    if (panel)
      table = panel.down('#combohistorico')
        ? panel.down('#combohistorico').getValue()
        : '';
    else
      table = view.down('#combohistorico').getValue();
    var newTab = Ext.widget('window', {
      title: title,
      closable: true,
      autoShow: true,
      width: 800,
      height: 600,
      translate: false,
      layout: 'fit',
      maximizable: true,
      items: [
        {
          xtype: 'eventoview',
          title: title,
          header: false,
          record: record,
          table: table,
          security: view.security
        }
      ]
    })
  },

  /* Modificacion del Export a la nueva version */
  onExportarClick: function (button) {
    var view = button.up('recepcionview')
    var grid = view.down('grid')
    var store = grid.getStore()
    //var url = view.reporteURL;
    var url = this.armarUrl(view)
    /*var partes = url.split(/\?/);
    url = partes[0]+'.xls?'+partes[1]*/
    var cuenta =
      view.record.get('cue_clinea') + ' - ' + view.record.get('cue_cnombre')
    /**
     *  03/09 : Solicitado por Azocar, se agrega combo de cantidades al buscar y exportar
     *
     * */
    var comboCantidadRegistros = view.down('#cantRegistros').getValue()
    if (!comboCantidadRegistros) {
      url = url.replace(
        'Mostrar=0',
        'Mostrar=' + getParametro('CANTIDADMAXHISTORICO')
      )
      url = url.replace(
        'mostrar=50',
        'Mostrar=' + getParametro('CANTIDADMAXHISTORICO')
      )
    }
    url = url.replace('EventosByCuentaHTML', 'ExportReporteHistoricoExcel')
    url = url.replace('EventosByCuentaNuevoHTML', 'ExportReporteHistoricoExcel')
    var exportToExcel = 'yes'
    if (exportToExcel) {
      url = Ext.String.urlAppend(url, 'exportToExcel=' + exportToExcel)
      url = Ext.String.urlAppend(url, 'cuentanombre=' + cuenta)
    }
    location.href = url
    //console.log('URL: '+url);
    /* Se quita la ventana previa al Export dado que era lo mismo que jugar con los 
     * filtros previos en la view.
     *
    var win = Ext.create('Ext.Window', {
        layout : 'vbox',
        title : 'Exportar Reporte',
        alias : 'widget.exportfilter',
        closeAction : 'destroy',
        width : 450,
        height : 300,
        border : false,
        view : view,
        items : [{
            xtype: 'fieldset',
            title: 'Seleccione los datos que incluira el reporte',
            layout: 'vbox',
            items: [{
                xtype: 'checkboxgroup',
                itemId:'incluirchecks',
                columns: 2,
                vertical: true,
                hideLabel : true,
                //fieldLabel:'Seleccione los datos que incluira el reporte',
                width:400,
                items: [
                        {
                            boxLabel: 'Fecha y Hora del Evento',
                            itemId: 'chkfecha', 
                            checked: true
                        },{
                            
                            boxLabel: 'Prioridad',
                            itemId: 'chkprioridad', 
                            checked: true
                        },{
                            boxLabel: 'Evento',
                            itemId: 'chkevento', 
                            checked: true
                        },{
                            boxLabel: 'Origen',
                            itemId: 'chkorigen', 
                            checked: true
                        },{
                            boxLabel: 'Zona',
                            itemId: 'chkzona', 
                            checked: true
                        },{
                            boxLabel: 'Usuario',
                            itemId: 'chkusuario', 
                            checked: true
                        },{
                            boxLabel: 'Operador',
                            itemId: 'chkoperador', 
                            checked: true
                        },{
                            boxLabel: 'Categorizacion',
                            itemId: 'chkcategorizacion', 
                            checked: true
                        },{
                            boxLabel: 'Resolucion',
                            itemId: 'chkresolucion', 
                            checked: true
                        },{
                            boxLabel: 'Cuenta principal',
                            itemId: 'chkcuentaprincipal', 
                            checked: true
                        },{
                            boxLabel: 'Timeline',
                            itemId: 'chktimeline', 
                            checked: true
                        },{
                            boxLabel: 'Llamadas',
                            itemId: 'chkllamadas', 
                            checked: true
                        }                            
                    ]
            }]
          }],
          buttons : [
              {
                  text : 'Exportar',
                  handler : function(button) {
                        /* Me encuentro dentro del Window creado, por lo que busco hacia abajo
                        * el itemId correspondiente a los Checks seleccionados y tomo su valor
                        *
                        var incluirchecks = win.down('#incluirchecks').getChecked();
                        /* Pongo el flag de export en Yes y procede a exportar *
                        var exportToExcel = 'yes';
                        if(exportToExcel) {
                            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
                        }                            
                        if(incluirchecks) {
                          /* Uso el item id como nombre de la variable a pasar y su valor *
                          Ext.Array.each(incluirchecks, function (v,k){
                            url = Ext.String.urlAppend(url,v.itemId+"="+v.checked);
                          })
                        };
                        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
                        location.href = url;
                        win.hide();
                    }
              },
              {
                  text : 'Cancelar',
                  handler : function() {
                      win.hide();
                  }
              }
          ]
    });
    win.show();
    */
  },

  preSearch: function (button) {
    var view = button.up('recepcionview') ? button.up('recepcionview') : button
    this.onSearchClick(view)
  },

  onSearchClick: function (button) {
    var view = button.up('recepcionview') ? button.up('recepcionview') : button
    var store = view.down('grid') ? view.down('grid').getStore() : null
    if (!store) {
      return
    }
    view.options = view.options || {}
    Ext.apply(view.options, {
      fechaDesde: null,
      fechaHasta: null,
      cue_clinea: '',
      eventos: '',
      cue_ncuentaDesde: '',
      cue_ncuentaHasta: '',
      cue_cnombre: '',
      TipoCuenta: '',
      tipos: '',
      cue_nparticion: '',
      rec_nOrigen: '',
      Estados: '',
      table: '',
      usuario: '',
      mostrar: getParametro('CANTIDADMAXHISTORICO'),
      Autoridades: '',
      zona: ''
    })
    var filters = []
    var fechaDesde = view.down('#fechadesde').getValue()
    var HoraDesde = view.down('#horadesde').getValue()
    var fechaHasta = view.down('#fechahasta').getValue()
    var HoraHasta = view.down('#horahasta').getValue()
    var combooperador = view.down('#combooperador').getValue()
    var dealer = view.down('#dealer').getValue()
    var cuentadesde = view.down('#cuentadesde').getValue()
    var cuentahasta = view.down('#cuentahasta').getValue()
    var nombre = view.down('#nombre').getValue()
    var tipocuenta = view.down('#tipocuenta').getValue()
    var tipoevento = view.down('#tipoevento').getValue()
    var cuentamadre = view.down('#cuentamadrecheck').getValue()
    var origen = view.down('#origencheck').getValue()
    var categorizacion = view.down('#categorizacioncheck').getValue()
    var observaciones = view.down('#observacionescheck').getValue()
    var operador = view.down('#operadorcheck').getValue()
    var resolucion = view.down('#resolucioncheck').getValue()
    var comboestado = view.down('#comboestado').getValue()
    var combohistorico = view.down('#combohistorico').getValue()
    var estadoevento = view.down('#estadoevento').getValue()
    var codigoalarma = view.down('#eventhelper').getValue()
    var comboEventos = view.down('#feventos').getValue()
    var ordenFecha = view.down('#ordenarpor').getValue()
    var zona = view.down('#zona').getValue()
    var usuario = view.down('#usuario').getValue()
    var autoridades = view.down('#autoridades').getValue()
    /* Tomo el valor del combo de Particiones para filtrar por estos valores */
    var particionescombo = view.down('#particionescombo').getValue()
    // BC 413732096 - Mostar/Ocultar columna Horario de Cuenta
    var horacuentacheck = view.down('#horacuentacheck').getValue()
    var fechaProceso = view.down('#fechaProceso').getValue()
    // 20/05/2020 : https://basecamp.com/2249105/projects/14758734/todos/413732096
    var fechahoraeventocheck = view.down('#fechahoraeventocheck').getValue()

    if (view.down('grid').columns.length > 6) {
      if (view.down('grid').down('[dataIndex=ope_cnombre]'))
        view
          .down('grid')
          .down('[dataIndex=ope_cnombre]')
          .setVisible(operador ? true : false)
      if (view.down('grid').down('[dataIndex=_cuentamadre]'))
        view
          .down('grid')
          .down('[dataIndex=_cuentamadre]')
          .setVisible(cuentamadre ? true : false)
      if (view.down('grid').down('[dataIndex=_rec_nOrigen]'))
        view
          .down('grid')
          .down('[dataIndex=_rec_nOrigen]')
          .setVisible(origen ? true : false)
      if (view.down('grid').down('[dataIndex=cat_cDescripcion]'))
        view
          .down('grid')
          .down('[dataIndex=cat_cDescripcion]')
          .setVisible(resolucion ? true : false)
      if (view.down('grid').down('[dataIndex=rec_cObservaciones]'))
        view
          .down('grid')
          .down('[dataIndex=rec_cObservaciones]')
          .setVisible(observaciones ? true : false)
      if (view.down('grid').down('[dataIndex=res_cdescripcion]'))
        view
          .down('grid')
          .down('[dataIndex=res_cdescripcion]')
          .setVisible(categorizacion ? true : false)
      if (view.down('grid').down('[dataIndex=ttz_noffset]'))
        view
          .down('grid')
          .down('[dataIndex=ttz_noffset]')
          .setVisible(horacuentacheck ? true : false)
      if (view.down('grid').down('[dataIndex=rec_tfechahora]'))
        view
          .down('grid')
          .down('[dataIndex=rec_tfechahora]')
          .setVisible(fechahoraeventocheck ? true : false)
      if (view.down('grid').down('[dataIndex=rec_tFechaProceso]'))
        view
          .down('grid')
          .down('[dataIndex=rec_tFechaProceso]')
          .setVisible(fechaProceso ? true : false)
      /*
          //view.down('grid').columns[6].setVisible(operador?true:false);
          view.down('grid').columns[7].setVisible(cuentamadre?true:false);
          view.down('grid').columns[8].setVisible(origen?true:false);
          view.down('grid').columns[9].setVisible(categorizacion?true:false);
          view.down('grid').columns[10].setVisible(observaciones?true:false);
          view.down('grid').columns[11].setVisible(resolucion?true:false);*/
    }
    var url = view.baseurl
    store.clearFilter(true)
    /* Tomo el valor del combo de Particiones para filtrar por estos valores la view
     * En caso que el combo este sin seleccion, mostrara todo lo correspondiente al cue_iid
     * del Dealer que se esta viendo, sin filtro alguno de cantidad.
     */
    if (particionescombo && particionescombo != '') {
      var cue_iid = view.record.get('cue_iid')
      var arrParticiones = [cue_iid]
      arrParticiones.push(particionescombo)
      view.options.Id = arrParticiones.join(',')
    }
    // var options = view.options;
    //view.options.fechaDesde = ''; // lo comento porque borra las opciones pasadas por parametro
    if (fechaDesde) {
      if (HoraDesde) {
        view.options.fechaDesde = new Date(Ext.Date.format(new Date(fechaDesde), 'Y-m-d') + " " + Ext.Date.format(new Date(HoraDesde), 'H:i:s'));
      } else {
        view.options.fechaDesde = new Date(Ext.Date.format(new Date(fechaDesde), 'Y-m-d'));
      }
    }

    if (fechaHasta) {
      if (HoraHasta) {
        view.options.fechaHasta = new Date(Ext.Date.format(new Date(fechaHasta), 'Y-m-d') + " " + Ext.Date.format(new Date(HoraHasta), 'H:i:s'));
      } else {
        view.options.fechaHasta = new Date(Ext.Date.format(new Date(fechaHasta), 'Y-m-d'));
      }
    }
    if (dealer) {
      view.options.cue_clinea = dealer
    } else {
      view.options.cue_clinea = ''
    }
    if (combooperador) {
      view.options.operador = combooperador
    } else {
      view.options.operador = ''
    }
    if (codigoalarma && comboEventos) {
      view.options.eventos = codigoalarma + ',' + comboEventos
    } else if (codigoalarma) {
      view.options.eventos = codigoalarma
    } else if (comboEventos) {
      view.options.eventos = comboEventos
    } else {
      view.options.eventos = ''
    }
    if (cuentadesde) {
      view.options.cue_ncuentaDesde = cuentadesde
    } else {
      view.options.cue_ncuentaDesde = ''
    }
    if (cuentahasta) {
      view.options.cue_ncuentaHasta = cuentahasta
    } else {
      view.options.cue_ncuentaHasta = ''
    }
    if (nombre) {
      view.options.cue_cnombre = nombre
    } else {
      view.options.cue_cnombre = ''
    }
    if (tipocuenta) {
      view.options.TipoCuenta = tipocuenta
    } else {
      view.options.TipoCuenta = ''
    }
    if (tipoevento) {
      view.options.tipos = tipoevento
    } else {
      view.options.tipos = ''
    }
    if (cuentamadre) {
      view.options.cue_nparticion = cuentamadre
    } else {
      view.options.cue_nparticion = ''
    }
    if (origen) {
      view.options.rec_nOrigen = origen
    } else {
      view.options.rec_nOrigen = ''
    }
    if (estadoevento) {
      view.options.Estados = estadoevento
    } else {
      view.options.Estados = ''
    }
    if (combohistorico) {
      view.options.table = combohistorico
      //  view.options.Estados = '3,5,6,7';
    } else {
      view.options.table = ''
    }
    if (usuario) {
      view.options.usuario = usuario
    } else {
      view.options.usuario = ''
    }
    /**
     *  04/06/2020 : leemos lo seleccionado en combo historico
     *
     * */
    var comboCantidadRegistros = view.down('#cantRegistros').getValue()
    if (comboCantidadRegistros) {
      view.options.mostrar = comboCantidadRegistros
    } else {
      view.options.mostrar = getParametro('CANTIDADMAXHISTORICO')
    }
    if (view.record) {
      filters.push({
        property: 'cue_iid',
        value: view.record.get('cue_iid'),
        id: 'cue_iid'
      })
      if (zona) {
        view.options.zona = Ext.util.Format.trim(zona)
      }
    }
    var sort = []
    if (ordenFecha) {
      sort.push({
        property: 'rec_tfechahora',
        id: 'rec_tfechahora',
        direction: ordenFecha
      })
    } else {
      sort.push({
        property: 'rec_tfechahora',
        id: 'rec_tfechahora',
        direction: 'DESC'
      })
    }
    if (autoridades) {
      view.options.Autoridades = autoridades
    } else {
      view.options.Autoridades = ''
    }

    if (zona) {
      view.options.zona = Ext.util.Format.trim(zona)
    } else {
      view.options.zona = ''
    }

    this.loadData(view)
    var url = this.armarUrl(view)
    view.reporteURL = url
    var target = view.down('#Iframe')
    if (target) {
      if (url) {
        target.load({
          src: url + '&preventPrint=true'
        })
        //target.setSrc( url + "&preventPrint=true" );
      } else {
        target.load({
          src: view.baseurl
        })
        //target.setSrc( view.baseurl );
      }
    }
  },

  armarUrl: function (view) {
    var filters = []
    var fechaDesde = view.down('#fechadesde').getValue()
    var HoraDesde = view.down('#horadesde').getValue()
    var fechaHasta = view.down('#fechahasta').getValue()
    var HoraHasta = view.down('#horahasta').getValue()
    var combooperador = view.down('#combooperador').getValue()
    var dealer = view.down('#dealer').getValue()
    var cuentadesde = view.down('#cuentadesde').getValue()
    var cuentahasta = view.down('#cuentahasta').getValue()
    var nombre = view.down('#nombre').getValue()
    var tipocuenta = view.down('#tipocuenta').getValue()
    var tipoevento = view.down('#tipoevento').getValue()
    var cuentamadre = view.down('#cuentamadrecheck').getValue()
    var origen = view.down('#origencheck').getValue()
    var categorizacion = view.down('#categorizacioncheck').getValue()
    var observaciones = view.down('#observacionescheck').getValue()
    var operador = view.down('#operadorcheck').getValue()
    var resolucion = view.down('#resolucioncheck').getValue()
    var timeline = view.down('#timelinecheck').getValue()
    var llamadas = view.down('#llamadascheck').getValue()
    var comboestado = view.down('#comboestado').getValue()
    var combohistorico = view.down('#combohistorico').getValue()
    var codigoalarma = view.down('#eventhelper').getValue()
    var comboEventos = view.down('#feventos').getValue()
    var estadoevento = view.down('#estadoevento').getValue()
    var ordenFecha = view.down('#ordenarpor').getValue()
    var zona = view.down('#zona').getValue()
    var usuario = view.down('#usuario').getValue()
    /* Tomo el valor del combo de Particiones para filtrar por estos valores */
    var particionescombo = view.down('#particionescombo').getValue()
    var url = view.baseurl
    var reportecompleto = view.down('#reportecompleto').getValue()
    var autoridades = view.down('#autoridades').getValue()
    if (autoridades) {
      url = Ext.String.urlAppend(url, 'Autoridades=' + autoridades)
    }
    /* Agregado el check de particiones */
    var particionescheck = view.down('#particiones').getValue()
    if (particionescheck) {
      url = Ext.String.urlAppend(url, 'particionescheck=' + particionescheck)
    }
    // BC 379771841 : Agregado del check para Linea de Tarjeta
    var rxl_clinecard = view.down('grid').down('[dataIndex=rxl_clinecard]')
    var lineatarjeta = view.down('#lineatarjetacheck').getValue()
      ? view.down('#lineatarjetacheck').getValue()
      : rxl_clinecard != null
        ? rxl_clinecard.isVisible()
        : false
    if (lineatarjeta) {
      url = Ext.String.urlAppend(url, 'LineaTarjeta=' + lineatarjeta)
    }
    // 04/03/2019 : Solicitado por Fernando Canonico, cliente Mexicano
    var ttz_noffset = view.down('grid').down('[dataIndex=ttz_noffset]')
    var horacuentacheck = view.down('#horacuentacheck').getValue()
      ? view.down('#horacuentacheck').getValue()
      : ttz_noffset != null
        ? ttz_noffset.isVisible()
        : false
    if (horacuentacheck) {
      url = Ext.String.urlAppend(url, 'horacuentacheck=' + horacuentacheck)
    }
    var fechaProceso = view.down('#fechaProceso').getValue()
      ? view.down('#fechaProceso').getValue()
      : ttz_noffset != null
        ? ttz_noffset.isVisible()
        : false
    if (fechaProceso) {
      url = Ext.String.urlAppend(url, 'fechaProceso=' + fechaProceso)
    }
    // 20/05/2020 : https://basecamp.com/2249105/projects/14758734/todos/413732096
    var fechahoraeventocheck = view.down('#fechahoraeventocheck').getValue()
      ? view.down('#fechahoraeventocheck').getValue()
      : view.down('grid').down('[dataIndex=rec_tfechahora]').isVisible()
    if (fechahoraeventocheck) {
      url = Ext.String.urlAppend(
        url,
        'fechahoraeventocheck=' + fechahoraeventocheck
      )
    }
    if (reportecompleto) {
      url = url.replace(
        '/handler/EventosByCuentaHTML',
        '/handler/EventosByCuentaNuevoHTML'
      )
    }
    if (fechaDesde) {
      if (HoraDesde) {
        url = Ext.String.urlAppend(
          url,
          'FechaDesde=' +
          Ext.Date.format(new Date(fechaDesde), 'Y-m-d') +
          ' ' +
          Ext.Date.format(new Date(HoraDesde), 'H:i:s')
        )
      } else {
        url = Ext.String.urlAppend(
          url,
          'FechaDesde=' + Ext.Date.format(new Date(fechaDesde), 'Y-m-d')
        )
      }
    }
    if (fechaHasta) {
      if (HoraHasta) {
        url = Ext.String.urlAppend(
          url,
          'FechaHasta=' +
          Ext.Date.format(new Date(fechaHasta), 'Y-m-d') +
          ' ' +
          Ext.Date.format(new Date(HoraHasta), 'H:i:s')
        )
      } else {
        url = Ext.String.urlAppend(
          url,
          'FechaHasta=' + Ext.Date.format(new Date(fechaHasta), 'Y-m-d')
        )
      }
    }
    if (combooperador) {
      url = Ext.String.urlAppend(url, 'Operador=' + combooperador)
    }
    if (dealer) {
      url = Ext.String.urlAppend(url, 'Dealer=' + Ext.JSON.encode(dealer))
    }
    if (cuentadesde) {
      url = Ext.String.urlAppend(url, 'CuentaDesde=' + cuentadesde)
    }
    if (cuentahasta) {
      url = Ext.String.urlAppend(url, 'CuentaHasta=' + cuentahasta)
    }
    if (nombre) {
      url = Ext.String.urlAppend(url, 'Nombre=' + Ext.JSON.encode(nombre))
    }
    if (tipocuenta) {
      url = Ext.String.urlAppend(url, 'TipoCuenta=' + tipocuenta)
    }
    if (tipoevento) {
      url = Ext.String.urlAppend(url, 'TipoEvento=' + tipoevento)
    }
    if (cuentamadre) {
      url = Ext.String.urlAppend(url, "CuentaMadre=" + cuentamadre);

      if (view.particiones) {
        var cuentas = view.particiones.join(",");
        url = Ext.String.urlAppend(url, "Cuentas=" + cuentas);
      }


    }
    if (origen) {
      url = Ext.String.urlAppend(url, 'Origen=' + origen)
    }
    if (categorizacion) {
      url = Ext.String.urlAppend(url, 'Categorizacion=' + categorizacion)
    }
    if (observaciones) {
      url = Ext.String.urlAppend(url, 'Observaciones=' + observaciones)
    }
    if (operador) {
      url = Ext.String.urlAppend(url, 'Operadorchk=' + operador)
    }
    if (resolucion) {
      url = Ext.String.urlAppend(url, 'Resolucionchk=' + resolucion)
    }
    if (llamadas) {
      url = Ext.String.urlAppend(url, 'Llamadaschk=' + llamadas)
    }
    if (timeline) {
      url = Ext.String.urlAppend(url, 'Timelinechk=' + timeline)
    }
    if (comboestado) {
      url = Ext.String.urlAppend(url, 'Estado=' + comboestado)
    }
    if (combohistorico) {
      url = Ext.String.urlAppend(url, 'Table=' + combohistorico)
      // url = Ext.String.urlAppend(url,"Estado=3,5,6,7");
    }
    if (estadoevento) {
      url = Ext.String.urlAppend(url, 'Estado=' + estadoevento)
    }
    if (codigoalarma && comboEventos) {
      url = Ext.String.urlAppend(
        url,
        'Codigoalarma=' + codigoalarma + ',' + comboEventos
      )
    } else if (codigoalarma) {
      url = Ext.String.urlAppend(url, 'Codigoalarma=' + codigoalarma)
    } else if (comboEventos) {
      url = Ext.String.urlAppend(url, 'Codigoalarma=' + comboEventos)
    }
    if (zona) {
      url = Ext.String.urlAppend(url, 'zona=' + zona)
    }
    if (usuario) {
      url = Ext.String.urlAppend(url, 'Usuario=' + usuario)
    }
    if (ordenFecha) {
      var sort = []
      sort.push({
        property: 'rec_tfechahora',
        id: 'rec_tfechahora',
        direction: ordenFecha
      })
      url = Ext.String.urlAppend(url, 'sort=' + Ext.JSON.encode(sort))
    }
    if (view.record) {
      var url = Ext.String.urlAppend(url, "Cuentas=" + view.record.get('cue_iid'));
    }

    /*if(getParametro('REPAUTFIRMA') == 1) {
            url = Ext.String.urlAppend(url,"dealerFirma="+view.record.get('cue_clinea'));
        }*/
    var objREPAUTFIRMA = getParametro('REPAUTFIRMA', true, true)
    var dealerFirma = view.record.get('cue_clinea')
    dealerFirma = dealerFirma.replace('&', '%26')
    if (objREPAUTFIRMA.get('_par_cvalor')) {
      //si tengo el nuevo objeto
      if (objREPAUTFIRMA.get('_par_cvalor').valor == 2) {
        //si es 2 uso el parametro dealer
        url = Ext.String.urlAppend(
          url,
          'dealerFirma=' + objREPAUTFIRMA.get('_par_cvalor').dealer
        )
      } else if (objREPAUTFIRMA.get('par_ivalor') == 1 && dealerFirma) {
        //si es uno uso ma misma cuenta
        url = Ext.String.urlAppend(url, 'dealerFirma=' + dealerFirma)
      }
    } else if (objREPAUTFIRMA.get('par_ivalor') == 1 && dealerFirma) {
      //si es uno uso ma misma cuenta y el parametro es viejo
      url = Ext.String.urlAppend(url, 'dealerFirma=' + dealerFirma)
    }
    var url = Ext.String.urlAppend(url, 'TrackGuard=true')
    var url = Ext.String.urlAppend(
      url,
      'CuentaReporte=' + view.record.get('cue_iid')
    )
    var url = Ext.String.urlAppend(
      url,
      'CuentaNumero=' + view.record.get('cue_ncuenta')
    )
    url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime())
    /**
     *  03/09 : Solicitado por Azocar, se agrega combo de cantidades al buscar y exportar
     *
     * */
    var comboCantidadRegistros = view.down('#cantRegistros').getValue()
    if (comboCantidadRegistros) {
      url = Ext.String.urlAppend(url, 'mostrar=' + comboCantidadRegistros)
    } else {
      url = Ext.String.urlAppend(
        url,
        'mostrar=' + getParametro('CANTIDADMAXHISTORICO')
      )
    }
    /** Reemplazo del caracter # por alarmas que cuentan con éste y se rompe la URL */
    url = url.replace(/#/g, '%23')
    return url
  },

  onImprimirClick: function (button) {
    var view = button.up('recepcionview');
    var target = view.down('#Iframe');
    var controller = this;

    // Obtener el token de la URL del iframe
    var iframeSrc = target.src || target.getSrc();
    var token = controller.application.getToken();

    if (iframeSrc) {
      var tokenMatch = iframeSrc.match(/[?&]token=([^&]+)/);
      if (tokenMatch) {
        token = tokenMatch[1];
      }
    }

    // Construir la URL completa con todos los parámetros (fechas, cuenta, etc.)
    var url = controller.armarUrl(view);

    if (!url) {
      Ext.Msg.alert('Error', 'No se pudo generar la URL del reporte');
      return;
    }

    // Remover el parámetro preventPrint=true si existe
    url = url.replace(/[&?]preventPrint=true/gi, '');

    // Reemplazar el token con el token válido del iframe
    if (token && token !== 'null') {
      url = url.replace(/([?&])token=[^&]*/gi, '$1token=' + token);
    }

    // Recupero las options donde guardaste "Origenes"
    var origenes = view.options && view.options.Origenes ? view.options.Origenes : null;
    var gps_cIMEI = view.options && view.options.gps_cIMEI ? view.options.gps_cIMEI : null;
    // Si existe, lo agrego como parámetro a la URL
    if (origenes) {
      var sep = url.indexOf('?') === -1 ? '?' : '&';
      url = url + sep + 'Origenes=' + encodeURIComponent(origenes);
    }
    if (gps_cIMEI) {
      var sep = url.indexOf('?') === -1 ? '?' : '&';
      url = url + sep + 'gps_cIMEI=' + encodeURIComponent(gps_cIMEI);
    }

    console.log('URL del iframe:', iframeSrc);
    console.log('Token extraído:', token);
    console.log('URL para imprimir:', url);

    fetch(url)
      .then(function (response) {
        console.log('Response status:', response.status);
        return response.text();
      })
      .then(function (body) {
        console.log('HTML recibido (primeros 500 chars):', body.substring(0, 500));

        // Verificar si el HTML contiene el mensaje de "no hay datos"
        if (body.toLowerCase().includes('no hay datos') || body.toLowerCase().includes('sin datos')) {
          console.warn('El backend devolvió "no hay datos"');
        }

        printHTMLContent(body);
      })
      .catch(function (error) {
        console.error('Error al imprimir:', error);
        Ext.Msg.alert('Error', 'Error al obtener los datos para imprimir');
      });
  }

})


