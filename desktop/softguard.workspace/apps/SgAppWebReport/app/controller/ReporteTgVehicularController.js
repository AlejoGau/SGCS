Ext.define('SgAppWebReport.controller.ReporteTgVehicularController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['ReporteTgVehicularView'],

    init: function () {
        this.control({
            'reportetgvehicularview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },

            // eventos por itemId (misma estructura)
            'reportetgvehicularview #buscar': {
                click: this.onSearchClick
            },
            'reportetgvehicularview #exportar': {
                click: this.onExportarClick
            },
            'reportetgvehicularview #btnprint': {
                click: this.onBtnprintClick
            },
            'reportetgvehicularview #seleccionarcuenta': {
                click: this.onSeleccionarCuentaClick
            },
            'reportetgvehicularview #sacarcuenta': {
                click: this.onSacarCuentaClick
            }
        });
    },

    initView: function (view) {
        // ✅ NO cambies el handler: es el Razor que existe y exporta con exportToExcel=yes
        view.baseurl = '/handler/ReporteTgVehicularHTML';
        view.urlForExport = view.baseurl;

        // Si tu view vieja tiene campos de fecha/patente, NO los usamos.
        // Primera “carga”: solo prepara urlForExport (y opcionalmente preview)
     
    },

    // -------------------------
    // PRINT (misma lógica)
    // -------------------------
    onBtnprintClick: function (button) {
        var view = button.up('reportetgvehicularview');
        var target = view.down('#Iframe');

        var url = target ? target.src : null;
        if (!url && target && target.getEl()) {
            var iframeEl = target.getEl().down('iframe');
            url = iframeEl ? iframeEl.dom.src : null;
        }
        if (!url) return;

        fetch(url)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                if (typeof printHTMLContent === 'function') {
                    printHTMLContent(html);
                } else {
                    var w = window.open('', '', 'width=900,height=700');
                    if (w) {
                        w.document.open();
                        w.document.write(html);
                        w.document.close();
                        w.focus();
                        w.print();
                    }
                }
            });
    },

    // -------------------------
    // Selector Cuenta (lo dejo, pero NO se usa para este reporte)
    // -------------------------
    onSeleccionarCuentaClick: function (button) {
        var view = button.up('reportetgvehicularview');

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione un Vehículo',
            closeAction: 'destroy',
            itemId: 'cuentaWin',
            width: 750,
            height: 550,
            border: true,
            modal: true,
            view: view,
            items: [{
                xtype: 'cuentamovileshelperview',
                caller: view
            }]
        });

        win.show();
    },

    onSacarCuentaClick: function (button) {
        var view = button.up('reportetgvehicularview');

        // Si estos campos existen, los limpio; si no existen, no pasa nada
        var f1 = view.down('#idcuenta'); if (f1) f1.setValue('');
        var f2 = view.down('#cue_cimei'); if (f2) f2.setValue('');
        var f3 = view.down('#nombrecuenta'); if (f3) f3.setValue('');

        button.hide();
    },

    onCuentaSelected: function (selection, view) {
        // Este reporte NO filtra por vehículo puntual, pero dejo compatibilidad
        Ext.Array.each(selection, function (record) {
            var cueiid = record.get('cue_iid');
            var cue_cimei = record.get('cue_cimei');
            var nombre = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');

            var id = view.down('#idcuenta'); if (id) id.setValue(cueiid);
            var imei = view.down('#cue_cimei'); if (imei) imei.setValue(cue_cimei);
            var nom = view.down('#nombrecuenta'); if (nom) nom.setValue(nombre);

            var btn = view.down('#sacarcuenta'); if (btn) btn.show();
        });
    },

    // -------------------------
    // SEARCH (ahora arma dealer + cuentaDesde/hasta)
    // -------------------------
   onSearchClick: function (btn) {
        var view = btn.up('reportetgvehicularview');

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
    // EXPORT
    // -------------------------
    onExportarClick: function (btn) {
        var view = btn.up('reportetgvehicularview');

        // aseguro que urlForExport esté actualizado con los filtros actuales
        var buscarBtn = view.down('#buscar');
        if (buscarBtn) this.onSearchClick(buscarBtn);

        var url = view.urlForExport || view.baseurl;

        // ✅ este flag lo usa tu Razor para devolver Excel
        url = Ext.String.urlAppend(url, 'exportToExcel=yes');
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        location.href = url;
    }
});
