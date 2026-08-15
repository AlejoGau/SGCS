Ext.define('Common.model.CuentaRecepcionProxy', {
  extend: 'Ext.data.proxy.Rest',

  alias: 'proxy.cuentarecepcionproxy',

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
  }
});

