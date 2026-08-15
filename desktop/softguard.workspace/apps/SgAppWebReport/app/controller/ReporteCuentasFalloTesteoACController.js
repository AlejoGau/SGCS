Ext.define('SgAppWebReport.controller.ReporteCuentasFalloTesteoACController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteCuentasFalloTesteoAcView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportecuentafallotesteoacview' : {
                afterrender : this.initView
            },
            'reportecuentafallotesteoacview button[action=agrupar]' : {
                click: this.onAgruparClick
            },
            'reportecuentafallotesteoacview button[action=desagrupar]' : {
                click: this.onDesagruparClick
            },
            'reportecuentafallotesteoacview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
    	});
        
	}, // cierro init
    
    initView: function(view){
        
        view.baseurl =  '/handler/ReporteCuentasFalloTesteoHTML';
        var target = view.down('#Iframe');
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        var filters = [];
        filters.push({ 
            property: 'sta_nEnFalloDeAC',
            value: '1'
        });
        
        var sorters = [
                {
                    property : 'cue_clinea',
                    direction: 'ASC'
                }
            ];
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));
        var controller = this
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sorters='+Ext.encode(sorters));
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'icon=lightning_delete.png');

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title='+Ext.encode('Cuentas en fallo de testo AC'));
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
                target.load({
            src: url
        }); 
                
          
               
              
      
       
    },
    onBtnprintClick: function(button){
        var view = button.up('reportecuentafallotesteoacview');
        var target = view.down('#Iframe');
        
        url = target.src;

        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { //Obtenemos el valor devuelto.
            printHTMLContent(body);
            /*
            var win = Ext.create('Ext.window.Window', {
                title: 'Mi ventana',
                html: "",
                modal: true,
                //renderTo: body.replace('<body>', '<body onload="window.print()>"'),
                
            });
            // Abrir en una nueva pestaña
            contenido = body.replace('BODY', 'body onload="window.print()"')
            //var newTab;// = window.open('', '_blank');
            //newTab.document.write(win.html);
            let myWindow = window.open();
            myWindow.document.write(contenido);
            myWindow.document.close();
            myWindow.focus();
            myWindow.print();
            
            //win.printMe();
            */

        });
    },
    
     onAgruparClick: function(button, event, options) {  
         var view = button.up('reportecuentafallotesteoacview');
         var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        url = Ext.String.urlAppend(url, 'Group=Dealer');  
        
        view.down('#agrupar').hide();
        view.down('#desagrupar').show();
        
       
                target.load({
            src: url
        }); 
         
     },
     
      onDesagruparClick: function(button, event, options) {  
         var view = button.up('reportecuentafallotesteoacview');
         var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        view.down('#agrupar').show();
        view.down('#desagrupar').hide();
       
                target.load({
            src: url
        }); 
         
     }
    
   
        
    
});