Ext.define('SgAppWebReport.controller.ReporteViajesTGController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['ReporteViajesTGView'],

    init: function (config) {
        this.control({
            'reporteviajestgview': {
                afterrender: this.initView
            },
            'reporteviajestgview button[action=search]': {
                click: this.onSearchClick
            },
            'reporteviajestgview button[action=removeall]': {
                click: this.onRemoveAllClick
            },
            'reporteviajestgview button[action=export]': {
                click: this.onExportClick
            },
            'reporteviajestgview button[action=mail]': {
                click: this.onMailClick
            },
            'reporteviajestgview button[action=btnprint]': {
                click: this.onPrintClick
            }
        });
    },

    initView: function (view) {
        view.baseurl = '/handler/ReportesViajesTGHTML';
        view.urlForExport = view.baseurl;

        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        target.load({ src: url });
    },

    buildUrl: function (view) {
        var url = view.baseurl;

        var dealer = view.down('#Dealer').getValue();
        var cuenta = view.down('#Cuenta').getValue();
        var numeroViaje = view.down('#NumeroViaje').getValue();
        var marchamo = view.down('#Marchamo').getValue();
        var lugarInicio = view.down('#LugarInicio').getValue();
        var lugarFin = view.down('#LugarFin').getValue();
        var fechaInicioDesde = view.down('#FechaInicioDesde').getValue();
        var fechaInicioHasta = view.down('#FechaInicioHasta').getValue();
        var fechaFinDesde = view.down('#FechaFinDesde').getValue();
        var fechaFinHasta = view.down('#FechaFinHasta').getValue();
        var estado = view.down('#Estado').getValue();

        if (dealer)         { url = Ext.String.urlAppend(url, 'Dealer=' + encodeURIComponent(dealer)); }
        if (cuenta)         { url = Ext.String.urlAppend(url, 'Cuenta=' + encodeURIComponent(cuenta)); }
        if (numeroViaje)    { url = Ext.String.urlAppend(url, 'NumeroViaje=' + encodeURIComponent(numeroViaje)); }
        if (marchamo)       { url = Ext.String.urlAppend(url, 'Marchamo=' + encodeURIComponent(marchamo)); }
        if (lugarInicio)    { url = Ext.String.urlAppend(url, 'LugarInicio=' + encodeURIComponent(lugarInicio)); }
        if (lugarFin)       { url = Ext.String.urlAppend(url, 'LugarFin=' + encodeURIComponent(lugarFin)); }
        if (fechaInicioDesde) {
            url = Ext.String.urlAppend(url, 'FechaInicioDesde=' + Ext.Date.format(new Date(fechaInicioDesde), 'Y-m-d'));
        }
        if (fechaInicioHasta) {
            url = Ext.String.urlAppend(url, 'FechaInicioHasta=' + Ext.Date.format(new Date(fechaInicioHasta), 'Y-m-d'));
        }
        if (fechaFinDesde) {
            url = Ext.String.urlAppend(url, 'FechaFinDesde=' + Ext.Date.format(new Date(fechaFinDesde), 'Y-m-d'));
        }
        if (fechaFinHasta) {
            url = Ext.String.urlAppend(url, 'FechaFinHasta=' + Ext.Date.format(new Date(fechaFinHasta), 'Y-m-d'));
        }
        if (estado !== null && estado !== '') {
            url = Ext.String.urlAppend(url, 'Estado=' + estado);
        }

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        return url;
    },

    onSearchClick: function (btn) {
        var view = btn.up('reporteviajestgview');
        var url = this.buildUrl(view);
        view.urlForExport = url;

        var target = view.down('#Iframe');
        target.load({ src: url });
    },

    onRemoveAllClick: function (btn) {
        var view = btn.up('reporteviajestgview');
        var ids = [
            'Dealer', 'Cuenta', 'NumeroViaje', 'Marchamo',
            'LugarInicio', 'LugarFin',
            'FechaInicioDesde', 'FechaInicioHasta',
            'FechaFinDesde', 'FechaFinHasta',
            'Estado'
        ];
        Ext.Array.each(ids, function (id) {
            var f = view.down('#' + id);
            if (f) { f.setValue(''); }
        });

        view.urlForExport = view.baseurl;
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        var target = view.down('#Iframe');
        target.load({ src: url });
    },

    onExportClick: function (btn) {
        var view = btn.up('reporteviajestgview');
        var url = Ext.String.urlAppend(view.urlForExport, 'exportToExcel=yes');
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        location.href = url;
    },

    onPrintClick: function (btn) {
        var view = btn.up('reporteviajestgview');
        var target = view.down('#Iframe');
        var url = target.src;
        fetch(url)
            .then(function (response) { return response.text(); })
            .then(function (body) { printHTMLContent(body); });
    },

    onMailClick: function (btn) {
        var view = btn.up('reporteviajestgview');
        var target = view.down('#Iframe');
        var url = target.src;
        fetch(url)
            .then(function (response) { return response.text(); })
            .then(function (body) {
                var mail = Ext.widget('mailformview', {
                    mailbody: body,
                    from: getParametro('MAILSENDERNAME') + ' <' + getParametro('MAILSENDER') + '>',
                    autoScroll: true,
                    subject: getLocale('Reporte de Viajes TG')
                });
                Ext.widget('window', {
                    title: 'Envío de correo',
                    layout: 'fit',
                    items: mail,
                    width: 600,
                    height: 600
                }).show();
            });
    }
});
