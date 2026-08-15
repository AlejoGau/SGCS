Ext.define('SgAppWebReport.controller.ReporteOPGSPController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteOPGSPView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteopgspview' : {
                afterrender : this.initView,
            },
            'reporteopgspview button[action=export]' : {
                click : this.onSearchClick,
            }
        });
        
	}, // cierro init

    initView: function(view) {

        view.baseurl =  '/handler/OPGSP_Handler';
        view.urlForExport = view.baseurl;
        

    },

    onSearchClick : function(btn) {
        var controller = this;
        var view = btn.up('reporteopgspview');

        // Obtengo los valores a filtrar
        var dealer = view.down('#dealer').getValue();
        var dealerhasta = view.down('#dealerhasta').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();

        // Obtengo la URL base de inicio del reporte
        var url = view.baseurl;

        // busco el parametro de provincia de buenos aires
        var OPGSP_BUENOSAIRES = getParametro('OPGSP_BUENOSAIRES');

        // Verifico valores para armado de URL
        var filters = [];

        if ( OPGSP_BUENOSAIRES && OPGSP_BUENOSAIRES != "") {
            // Si existe lo cargo como filter
            filters.push({ 
                property: 'OPGSP',
                value: OPGSP_BUENOSAIRES
            }); 
        } else {
            // Si no existe, aviso que no existe el parametro
            notify('No se encuentra el parametro OPGSP_BUENOSAIRES cargado.');
            return false;
        }

        if (dealer) {
            url = Ext.String.urlAppend(url, "lineadesde="+dealer); 
        }
        if (dealerhasta) {
            url = Ext.String.urlAppend(url, "lineahasta="+dealerhasta);
        }
        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "cue_ncuentaDesde="+cuentadesde);
        }
        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "cue_ncuentaHasta="+cuentahasta);
        }
        if ( filters.length > 0){
            url = Ext.String.urlAppend(url, "filter="+Ext.encode(filters));
        }

        url = Ext.String.urlAppend(url, "download=true");

        // Actualizo URL para exportar
        window.open(url,'_blank')

    },

})