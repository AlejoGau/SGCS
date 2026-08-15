Ext.define('SgAppWebReport.controller.ReporteTgPersonalController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['ReporteTgPersonalView'],

    init: function () {
        this.control({
            'reportetgpersonalview': {
                afterrender: this.initView
            },

            'reportetgpersonalview #buscar': {
                click: this.onSearchClick
            },
            'reportetgpersonalview #exportar': {
                click: this.onExportarClick
            },
            'reportetgpersonalview #btnprint': {
                click: this.onBtnprintClick
            }
        });
    },

    initView: function (view) {
        // ✅ handler real del Razor que arma el Excel/HTML
        view.baseurl = '/handler/ReporteTgPersonalHTML';
        view.urlForExport = view.baseurl;

        // primera carga (opcional)
    },

    // -------------------------
    // TOKEN helper (ajustado a lo típico en SoftGuard)
    // -------------------------
    getToken: function () {
        // probamos varios lugares comunes
        if (window.token) return window.token;
        if (window.oauth_token) return window.oauth_token;
        if (Ext.util.Cookies) {
            var t = Ext.util.Cookies.get('oauth_token') || Ext.util.Cookies.get('token');
            if (t) return t;
        }
        return '';
    },



    // -------------------------
    // SEARCH (preview HTML en iframe)
    // -------------------------
  onSearchClick: function (btn) {
        var view = btn.up('reportetgpersonalview');

        var dealerField = view.down('#dealer');
        var desdeField  = view.down('#cuentaDesde');
        var hastaField  = view.down('#cuentaHasta');

        var dealer = dealerField ? Ext.String.trim(dealerField.getValue() || '') : '';
        var desde  = desdeField ? desdeField.getValue() : null;
        var hasta  = hastaField ? hastaField.getValue() : null;

        if (desde === '' || desde === undefined) desde = null;
        if (hasta === '' || hasta === undefined) hasta = null;

        if (desde !== null && hasta !== null && desde > hasta) {
            var tmp = desde; desde = hasta; hasta = tmp;
        }

        // ✅ Armado de URL (NO usamos filter JSON; va por querystring como tu Razor/SP)
        var url = view.baseurl;

        if (dealer) url = Ext.String.urlAppend(url, 'dealer=' + encodeURIComponent(dealer));
        if (desde !== null) url = Ext.String.urlAppend(url, 'cuentaDesde=' + encodeURIComponent(desde));
        if (hasta !== null) url = Ext.String.urlAppend(url, 'cuentaHasta=' + encodeURIComponent(hasta));

        // export siempre sin _dc
        view.urlForExport = url;

    
    },

    // -------------------------
    // EXPORT (descarga Excel)
    // -------------------------
    onExportarClick: function (btn) {
        var view = btn.up('reportetgpersonalview');

        var url = view.urlForExport || view.baseurl;

        // ✅ tu Razor usa ExcelExport o exportToExcel
        url = Ext.String.urlAppend(url, 'exportToExcel=yes');

        // cache-bust
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        location.href = url;
    }
});
