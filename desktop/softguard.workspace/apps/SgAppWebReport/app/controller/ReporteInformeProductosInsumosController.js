Ext.define('SgAppWebReport.controller.ReporteInformeProductosInsumosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasProductosSearchModel', 'InstaladoresByTokenSearchModel' ],
    views : [ 'ReporteInformeProductosInsumosView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteinformeproductoinsumosview' : {
                afterrender : this.initView,
                cuentachanged: this.onCuentaChanged
            },
            'reporteinformeproductoinsumosview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteinformeproductoinsumosview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reporteinformeproductoinsumosview button[action=btnprint]': {
                click: this.onBtnprintClick
            },               
    	});
        
	}, // cierro init
    
    onBtnprintClick: function (button) {
        var view = button.up('reporteinformeproductoinsumosview');
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
        
        
        var view = button.up('reporteinformeproductoinsumosview')?button.up('reporteinformeproductoinsumosview'):button;
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var fechadesdegeneracio = view.down('#fechadesdegeneracion').getValue();
        var fechahastageneracio = view.down('#fechahastageneracion').getValue();
        var tecnico = view.down('#tecnicos').getValue();
        var estados = view.down('#estados').getValue();
        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        
        var producto = view.down('#producto').getValue();

      
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
                property:'stc_dfecha_desde_1:GTEDATESTRING',
                value:Ext.Date.format(new Date(fechadesdegeneracio),'Y-m-d')
            })
            
        }        
        if(fechahastageneracio) {
            url = Ext.String.urlAppend(url,"stc_dfecha_desde_1Hasta="+Ext.Date.format(new Date(fechahastageneracio),'d/m/Y'));
            view.filters.push({
                property:'stc_dfecha_desde_1:LTEDATESTRING',
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

        if(estados) {
            url = Ext.String.urlAppend(url,"stc_nestado="+estados);
            view.filters.push({
                property:'stc_nestado',
                value:estados
            })
        }

        
        
        if(producto) {
            url = Ext.String.urlAppend(url,"spr_iProducto="+producto);
            view.filters.push({
                property:'spr_iProducto',
                value:producto
            })
        }
        
        
        if(dealer) {
            url = Ext.String.urlAppend(url,"cue_clinea="+dealer);
            view.filters.push({
                property:'cue_clinea',
                value:dealer
            })
        }
        
        if(cuentadesde) {
            url = Ext.String.urlAppend(url,"cue_ncuenta="+cuentadesde);
            view.filters.push({
                property:'cue_ncuenta:GTESTRING',
                value:cuentadesde
            })
        }
        
        if(cuentahasta) {
            url = Ext.String.urlAppend(url,"cue_ncuenta="+cuentahasta);
            view.filters.push({
                property:'cue_ncuenta:LTESTRING',
                value:cuentahasta
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
            filters:[]
        })
        view.down('#producto').bindStore(view.store);
        
        view.store.load();


        view.baseurl =  '/handler/ReporteInformeProductosInsumosHTML';
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
     
        if(view.filters) {
            var filters = view.filters;
        } else {
            var filters = [];              
               
        }
       
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());   
        url = Ext.String.urlAppend(url, 'Filter='+Ext.encode(filters));      
        
                target.load({
            src: url
        }); 

        
    },
     onTodosClick: function(button){ 
        var view = button.up('reporteinformeproductoinsumosview');     
        var controller = this;

        view.down('#fechadesdegeneracion').setValue('');
        view.down('#fechahastageneracion').setValue('');
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#tecnicos').setValue('');

        view.down('#estados').setValue('');
        view.down('#producto').setValue('');
        view.down('#cuentahasta').setValue('');
        view.down('#cuentadesde').setValue('');
        view.down('#dealer').setValue('');

        controller.onSearchClick(view)       
    }
    
});