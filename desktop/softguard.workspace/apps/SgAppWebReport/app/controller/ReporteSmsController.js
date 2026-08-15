Ext.define('SgAppWebReport.controller.ReporteSmsController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteSmsView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportesmsview' : {
                afterrender : this.initView
            },
            'reportesmsview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportesmsview button[action=todos]' : {
                click: this.onTodosClick
            }
    	});
        
	}, // cierro init
    
    initView: function(view){
        
      
        
        
        view.baseurl =  '/handler/ReporteEventosNHHTML';
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        var target = view.down('#Iframe');
      
    },
     onTodosClick: function(button){ 
         
        var view = button.up('reporteeventosnhview'); 
        
        var filters = [];
        
        var target = view.down('#Iframe');
 
        target.load({
            src: view.baseurl
        });    
        
    },
    onSearchClick: function (button) {
        var view = button.up('reporteeventosnhview'); 
        
        var filters = [];
        
        var fechaDesde = view.down('#fechadesde').getValue();
        var HoraDesde = view.down('#horadesde').getValue();
        var fechaHasta = view.down('#fechahasta').getValue();
        var HoraHasta = view.down('#horahasta').getValue();
        var comboCuenta = view.down('#combocuenta').getValue();
        
        var url = view.baseurl;
        if(fechaDesde) {
            url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));
        }
        
        if(fechaHasta) {
        
            url = Ext.String.urlAppend(url,"FechaHasta="+Ext.Date.format(new Date(fechaHasta),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraHasta),'H:i:s'));
        }
        
        if(comboCuenta) {
            url = Ext.String.urlAppend(url,"cue_clinea="+comboCuenta);
        }
        
        url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        var target = view.down('#Iframe');

                target.load({
            src: url
        });     
    } 
    
    
});