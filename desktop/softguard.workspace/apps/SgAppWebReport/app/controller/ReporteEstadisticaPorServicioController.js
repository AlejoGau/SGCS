Ext.define('SgAppWebReport.controller.ReporteEstadisticaPorServicioController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'InstaladoresByTokenSearchModel', 'TipoServicioSearchModel' ],
    views : [ 'ReporteEstadisticaPorServicioView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteestadisticaporservicioview' : {
                afterrender : this.initView,
                cuentachanged: this.onCuentaChanged
            },
            'reporteestadisticaporservicioview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteestadisticaporservicioview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reporteestadisticaporservicioview button[action=btnprint]': {
                click: this.onBtnprintClick
            },               
		});
        
	}, // cierro init
    
    
    onBtnprintClick: function (button) {
        var view = button.up('reporteestadisticaporservicioview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            printHTMLContent(body);
            /*
            var win = Ext.create('Ext.window.Window', {
                    title: 'Mi ventana',
                    html: "",
                    modal: true,
        });
        contenido = body.replace('body', 'body onload="window.print(); window.onafterprint = function() { window.close(); }"')
            let myWindow = window.open('', '', 'width=600,height=400');
            if (myWindow) {
                let doc = myWindow.document;
                doc.open();
                doc.write(contenido);
                doc.close();
            } else {
                console.error('No se pudo abrir la ventana.');
            }
            //win.printMe();
            */
        });
    },
    

    onSearchClick: function(button, event, options) {  
        var controller = this;
        
        
        var view = button.up('reporteestadisticaporservicioview')?button.up('reporteestadisticaporservicioview'):button;
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var fechadesdegeneracio = view.down('#fechadesdegeneracion').getValue();
        var fechahastageneracio = view.down('#fechahastageneracion').getValue();
        var tecnico = view.down('#tecnicos').getValue();
        var estados = view.down('#estados').getValue();
        var tiposervicio = view.down('#tiposervicio').getValue();

      
        view.filters = [];
           
 
     
        if(fechadesde) {
            url = Ext.String.urlAppend(url,"stc_dfecha_modificacionDesde="+Ext.Date.format(new Date(fechadesde),'d/m/Y'));
            view.filters.push({
                property:'stc_dfecha_modificacion:GTEDATESTRING',
                value:Ext.Date.format(new Date(fechadesde),'Y-m-d')
            })
            
        }
        
        if(fechahasta) {
            url = Ext.String.urlAppend(url,"stc_dfecha_modificacionHasta="+Ext.Date.format(new Date(fechahasta),'d/m/Y'));
            view.filters.push({
                property:'stc_dfecha_modificacion:LTEDATESTRING',
                value:Ext.Date.format(new Date(fechahasta),'Y-m-d')
            })
        }
        
        if(fechadesdegeneracio) {
            url = Ext.String.urlAppend(url,"stc_dfecha_desde_1Desde="+Ext.Date.format(new Date(fechadesdegeneracio),'d/m/Y'));
            view.filters.push({
                property:'stc_dfecha_creacion:GTE',
                value: fechadesdegeneracio
            })
            
        }        
        if(fechahastageneracio) {
            url = Ext.String.urlAppend(url,"stc_dfecha_desde_1Hasta="+Ext.Date.format(new Date(fechahastageneracio),'d/m/Y'));
            view.filters.push({
                property:'stc_dfecha_creacion:LTE',
                value:fechahastageneracio
            })
        }
        
        
        if(tecnico) {
            url = Ext.String.urlAppend(url,"ins_cnombre="+view.down('#tecnicos').getRawValue());
            view.filters.push({
                property:'ins_idKey',
                value:tecnico
            })
        }

        if(estados) {
            url = Ext.String.urlAppend(url,"stc_nestado="+estados);
            view.filters.push({
                property:'stc_nestado',
                value:estados
            })
        }

        if(tiposervicio) {
            url = Ext.String.urlAppend(url,"tip_ccodigo="+tiposervicio);
            view.filters.push({
                property:'tip_ccodigo',
                value:tiposervicio
            })
        }

        var target = view.down('#Iframe');
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
  
        if (view.filters.length>0){
           url = Ext.String.urlAppend(url, 'filter='+Ext.encode(view.filters));
            
        } 
                target.load({
            src: url
        }); 
       
        
    },
    
    initView: function(view){
        
        
         view.store =Ext.create('Ext.data.Store',{
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#tecnicos').bindStore(view.store);
        
        view.store.load();


        var serviciosStore = Ext.create('Ext.data.Store', {
            model : this.getTipoServicioSearchModelModel(),
            remoteFilter: true,
           
            pageSize: 500
        });
        
        var combo = view.down('#tiposervicio');

        serviciosStore.load({callback:function () {      
            combo.bindStore(serviciosStore);        
        }});
        
        view.baseurl =  '/handler/ReporteEstadisticaPorServicioHTML';
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
     
        if(view.filters) {
            var filters = view.filters;
        } else {
     
            var filters = [{ 
                    property: 'stc_nestado',
                    value: 1
                }];

        }
       
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());   
        url = Ext.String.urlAppend(url, 'Filter='+Ext.encode(filters));      
        
                target.load({
            src: url
        }); 

    },
     onTodosClick: function(button){ 
        var view = button.up('reporteestadisticaporservicioview');     
        var controller = this;

        view.down('#fechadesdegeneracion').setValue('');
        view.down('#fechahastageneracion').setValue('');
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#tecnicos').setValue('');

        view.down('#estados').setValue('');
        view.down('#tiposervicio').setValue('');
        
        
        controller.onSearchClick(view)       
        
    }
});