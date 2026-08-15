Ext.define('SgAppWebReport.controller.ReporteAuditoriaController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteAuditoriaView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteauditoriaview' : {
                afterrender : this.initView
                
            },
            'reporteauditoriaview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteauditoriaview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reporteauditoriaview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
        });
        
	}, // cierro init
    
    initView: function(view){
        
        view.baseurl =  '/handler/ReporteAuditoriaHTML';
        var target = view.down('#Iframe');
        
       //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        var filters = [];
        filters.push({ 
            property: 'sta_dfechaOPNdesde:GT',
            value: 15
        });
        
        var sorters = [
                {
                    property : 'sta_dfechaOPNdesde',
                    direction: 'DESC'
                }
            ];
        
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sorters='+Ext.encode(sorters));
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'campos=sta_dfechaOPNdesde');
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'icon=lock_open.png');
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title='+Ext.encode('Cuentas con falta de activacion'));
        
        var url = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        target.load({
            src: url
        }); 
                
          
               
              
      
       
    },    
    onBtnprintClick: function(button){
        var view = button.up('reporteauditoriaview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            
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
        });
    },
    
     onSearchClick: function(button, event, options) {  
        
        var view = button.up('reportecuentafaltaactivacionview');
        
        
        var dias = view.down('#cantidaddias').getValue();
      
        
    
               
        var target = view.down('#Iframe');
        
        
        var filters = [];
        
        filters.push({ 
            property: 'sta_dfechaOPNdesde:GT',
            value: dias
        });
      
        
        
        var url = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
         
         
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
         
        target.load({
            src: url
        }); 
       
        
    },
    
    
    onTodosClick: function(button){ 
         var view = button.up('ordenservtecview');
       
        
        view.filters = [];
       
        var target = view.down('#Iframe');
        target.load({
            src: view.baseurl+'?Filter='+Ext.encode(view.filters)
        }); 
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        
        view.down('#finalizado-btn').toggle(false);
        view.down('#pendiente-btn').toggle(false);
        view.down('#cancelado-btn').toggle(false);    
        
        
    }
        
    
});