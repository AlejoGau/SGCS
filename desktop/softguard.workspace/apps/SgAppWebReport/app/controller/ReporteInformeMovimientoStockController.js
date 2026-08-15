Ext.define('SgAppWebReport.controller.ReporteInformeMovimientoStockController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'InstaladoresByTokenSearchModel', 'TablasProductosSearchModel', 't_stock_depositosSearchModel' ],
    views : [ 'ReporteInformeMovimientoStockView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteinformemovimientostockview' : {
                afterrender : this.initView,
                cuentachanged: this.onCuentaChanged
            },
            'reporteinformemovimientostockview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteinformemovimientostockview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reporteinformemovimientostockview button[action=btnprint]': {
                click: this.onBtnprintClick
            },             

        });
        
	}, // cierro init
    
    
    onBtnprintClick: function (button) {
        var view = button.up('reporteinformemovimientostockview');
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
        
        
        var view = button.up('reporteinformemovimientostockview')?button.up('reporteinformemovimientostockview'):button;
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var fechadesdegeneracio = view.down('#fechadesdegeneracion').getValue();
        var fechahastageneracio = view.down('#fechahastageneracion').getValue();
        var tecnico = view.down('#tecnicos').getValue();
        var producto = view.down('#producto').getValue();
        
        
        var despositosdestino = view.down('#despositosorigenes').getValue();
        var despositosorigenes = view.down('#despositosdestinos').getValue();
        
      
        view.filters = [];
           
        if(fechadesde) {
            url = Ext.String.urlAppend(url,"stc_fecha_modificacionDesde="+Ext.Date.format(new Date(fechadesde),'d/m/Y'));
            view.filters.push({
                property:'stc_fecha_modificacion:GTEDATESTRING',
                value:Ext.Date.format(new Date(fechadesde),'Y-m-d')
            })
            
        }
        
        if(fechahasta) {
            url = Ext.String.urlAppend(url,"stc_fecha_modificacionHasta="+Ext.Date.format(new Date(fechahasta),'d/m/Y'));
            view.filters.push({
                property:'stc_fecha_modificacion:LTEDATESTRING',
                value:Ext.Date.format(new Date(fechahasta),'Y-m-d')
            })
        }
        
        if(fechadesdegeneracio) {
            url = Ext.String.urlAppend(url,"stc_fecha_desde_1Desde="+Ext.Date.format(new Date(fechadesdegeneracio),'d/m/Y'));
            view.filters.push({
                property:'stc_fecha:GTEDATESTRING',
                value:Ext.Date.format(new Date(fechadesdegeneracio),'Y-m-d')
            })
            
        }        
        if(fechahastageneracio) {
            url = Ext.String.urlAppend(url,"stc_fecha_desde_1Hasta="+Ext.Date.format(new Date(fechahastageneracio),'d/m/Y'));
            view.filters.push({
                property:'stc_fecha:LTEDATESTRING',
                value:Ext.Date.format(new Date(fechahastageneracio),'Y-m-d')
            })
        }
        
        
        if(tecnico) {
            url = Ext.String.urlAppend(url,"ins_cnombre="+view.down('#tecnicos').getRawValue());
            view.filters.push({
                property:'ins_idKey',
                value:tecnico
            })
        }

        
        
        
        if(producto) {
            url = Ext.String.urlAppend(url,"sti_idproducto="+producto);
            view.filters.push({
                property:'sti_idproducto',
                value:producto
            })
        }
        
        
        if(despositosorigenes) {
            url = Ext.String.urlAppend(url,"deporigen.tsd_idKey="+producto);
            view.filters.push({
                property:'deporigen.tsd_idKey',
                value:despositosorigenes
            })
        }
        
        if(despositosdestino) {
            url = Ext.String.urlAppend(url,"depdestino.tsd_idKey="+producto);
            view.filters.push({
                property:'depdestino.tsd_idKey',
                value:despositosdestino
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


        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasProductosSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters:[
                {
                    property:'Status',
                    value:1
                }
            ]
        })
        view.down('#producto').bindStore(view.store);
        
        view.store.load();
        
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_stock_depositosSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#despositosorigenes').bindStore(view.store);
        view.down('#despositosdestinos').bindStore(view.store);
        
        view.store.load();


      
        
        view.baseurl =  '/handler/ReporteInformeMovimientoStockHTML';
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
     

        this.onSearchClick(view)
     
        
    },
     onTodosClick: function(button){ 
        var view = button.up('reporteinformemovimientostockview');     
        var controller = this;

        
        view.down('#fechadesdegeneracion').setValue('');
        view.down('#fechahastageneracion').setValue('');
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#tecnicos').setValue('');

        view.down('#estados').setValue('');
        
        
        controller.onSearchClick(view)       
        
    }
});