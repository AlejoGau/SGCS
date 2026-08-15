Ext.define('SgAppWebReport.controller.ReporteHorasPorObjetivoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'UsersDesktopWebModulosModelSearch', 'SmartTrackSearchModel' ],
    views : [ 'ReporteHorasPorObjetivoView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehorasporobjectivoview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportehorasporobjectivoview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportehorasporobjectivoview button[action=export]' : {
                click: this.onExportClick
            },
            'reportehorasporobjectivoview button[action=seleccionarCuenta]' : {
                click: this.onSeleccionarCuenta
            },
        });
        
    }, // cierro init
    
    initView: function(view) {

        /* Cargo el Stored correspondiente a los usuarios de la cuenta, esto lo uso
         * para poder tener la informacion en el combo de usuario
         */
        var controller = this;
        
        console.log(controller.application.UserData);
        console.log(view);
        
        /* Consulta de RANGOS del usuario logueado
        var userLogueadoRangosStore = Ext.create('Ext.data.Store',{
            model: controller.getUsersDesktopWebModulosModelSearchModel(),
            pageSize: 500,
            remoteFilter: true,
            filters: [{
                property: 'dwm_idModules',
                value: 0
            },{
                property: 'dwm_idWeb',
                value: controller.application.UserData.udw_idKey
            }]
        }).load({callback:function (recordsLogueado) {
            
            if(recordsLogueado.length>0) {
                console.log(recordsLogueado[0]);
            }
        }});
        */
        
        /* Modifico el baseUrl al nuevo creado */
        view.down('#fechaDesde').setValue(new Date());
        view.down('#fechaHasta').setValue(new Date());  
        var fechadesde =  view.down('#fechaDesde').getValue();
        var fechahasta =  view.down('#fechaHasta').getValue();
        var Ths = view.down('#Ths').getValue();
        var iden = view.down('#iden').getValue();
        var Obs = view.down('#Obs').getValue();
      

        view.baseurl =  '/handler/ReporteHorasPorObjetivoHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl;

        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
        if(Ths) {   
            url = Ext.String.urlAppend(url,"Ths=1");
        }  
        if(iden) {   
            url = Ext.String.urlAppend(url,"iden=1");
        } 
        if(Obs) {   
            url = Ext.String.urlAppend(url,"Obs=1");
        }   

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
                target.load({
            src: url
        }); 
    },

    onSearchClick : function(button, event, options) {
        var view = button.up('reportehorasporobjectivoview');

      

        /* Tomo los valores de los combo creado en la view */
        var objetivo = view.down('#idcuenta').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var Ths = view.down('#Ths').getValue();
        var iden = view.down('#iden').getValue();
        var Obs = view.down('#Obs').getValue();
        
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if(objetivo) {   
            url = Ext.String.urlAppend(url,"cuenta="+objetivo);
        }
        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
         if(Ths) {   
            url = Ext.String.urlAppend(url,"Ths=1");
        }  
        if(iden) {   
            url = Ext.String.urlAppend(url,"iden=1");
        } 
        if(Obs) {   
            url = Ext.String.urlAppend(url,"Obs=1");
        }   
        
        view.urltoexport = url;
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        /* Llamo a la URL */
                target.load({
            src: url
        }); 

    },
    
    
    onSeleccionarCuenta: function (button, events, eOps) {
        var view = button.up('reportehorasporobjectivoview');
        //view.win = win;
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Cuentas',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentahelperview',
                    filterTipo: 'nofilter',
                    caller: view,
                    filterTipo: 5,
                    tip_ncondicion: "3"
                }
            ]
		});
		win.show();
        
    },
    
    onCuentaSelected:  function (selection, view, recordPreSelected) {
        var controller = this;
        
        Ext.Array.each(selection, function(record){
            var cueiid = record.get('cue_iid');
            var nombre = record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
            view.down('#idcuenta').setValue(cueiid)
            view.down('#nombrecuenta').setValue(nombre)
            view.down('#sacarcuenta').show();          

        });
    },
    
    onExportClick : function(button){
        var view = button.up('reportehorasporobjectivoview');
        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    }
});