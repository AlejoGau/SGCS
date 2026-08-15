Ext.define('SgAppWebReport.controller.ReporteCuentasFalloTesteoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteCuentasFalloTesteoView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportecuentafallotesteoview' : {
                afterrender : this.initView
            },
            'reportecuentafallotesteoview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportecuentafallotesteoview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reportecuentafallotesteoview button[action=mail]' : {
                click: this.onMailClick
            },
            'reportecuentafallotesteoview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
            
		});
        
	}, // cierro init
    
    
    onMailClick: function (button) {
        var view = button.up('reportecuentafallotesteoview');
        var target = view.down('#Iframe');
        url = target.src;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { //Obtenemos el valor devuelto.
            var mailbody = body;    
            var mail = Ext.widget('mailformview',{
                mailbody: mailbody,
                from: getParametro('MAILSENDERNAME') + " <" +  getParametro('MAILSENDER') +">",
                autoScroll: true,
                subject: getLocale('Reporte de eventos')
            });          
            var win = Ext.widget('window',{
                title: 'Envío de correo',
                layout: 'fit',
                items: mail,
                width: 600,
                height: 600
            }).show();
        });
        
    },
    
    
    initView: function(view){
        
        var target = view.down('#Iframe');
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        var filters = [];
        filters.push({ 
            property: 'sta_ncuentaenfallodetst',
            value: '1'
        });
        
        view.down('#tst1').setValue(true);
        view.down('#tst2').setValue(false);

        
        var sorters = [
                {
                    property : 'sta_tEnFalloDeTSTDesde',
                    direction: 'DESC'
                }
            ];           
    
        view.baseurl =  '/handler/ReporteCuentasFalloTesteoHTML';
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'icon=cancel.png');
        var controller = this
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sorters='+Ext.encode(sorters));

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title='+Ext.encode('Cuentas en fallo de testo'));
       
        var url = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));
        url = Ext.String.urlAppend(url, 'campos=sta_tEnFalloDeTSTDesde,sta_dfechaultimotst');
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
                target.load({
            src: url
        }); 
                
          
               
              
      
       
    },
    onBtnprintClick: function(button){
        var view = button.up('reportecuentafallotesteoview');
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

    onTodosClick: function (btn) {
        
        var view = btn.up('reportecuentafallotesteoview');
        
       
        
        view.down('#dealer').setValue('');
        view.down('#cuentadesde').setValue('');
        view.down('#cuentahasta').setValue('');
        view.down('#cuentaNombre').setValue('');
        
        view.down('#fallotesteodesde').setValue('');
        view.down('#ultimocontrol').setValue('');
        
        
        this.onSearchClick(btn)
        
    },

    onSearchClick: function(button, event, options) {  
        
        var view = button.up('reportecuentafallotesteoview');
        
        var tst1 = view.down('#tst1').getValue();
        var tst2 = view.down('#tst2').getValue();
        
        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var cuentaNombre = view.down('#cuentaNombre').getValue();
        
        var fallotesteodesde = view.down('#fallotesteodesde').getValue();
        var ultimocontrol = view.down('#ultimocontrol').getValue();
        
      
       var filters = [];
       
        var search = false;
        
        if (ultimocontrol) {
            console.log("ENTRO")
            filters.push({ 
                property: 'sta_dfechaultimotst',
                value: Ext.Date.format(ultimocontrol, 'd-m-Y'),
                id:'sta_dfechaultimotst'
            });
            search = true;
        
        }
        
        if (fallotesteodesde) {
            filters.push({ 
                property: 'sta_tEnFalloDeTSTDesde',
                value: Ext.Date.format(fallotesteodesde, 'd-m-Y'),
                id:'sta_tEnFalloDeTSTDesde'
            });
            search = true;
        
        }
        
        if (cuentaNombre) {
            filters.push({ 
                property: 'cue_cnombre',
                value: cuentaNombre,
                id:'cue_cnombre'
            });
            search = true;
        
        }
        
        if (cuentadesde) {
            filters.push({ 
                property: 'cue_ncuentaGET',
                value: cuentadesde,
                id:'cue_ncuentaGET'
            });
            search = true;
        
        }
        
        if (cuentahasta) {
            filters.push({ 
                property: 'cue_ncuentaLET',
                value: cuentahasta,
                id:'cue_ncuentaLET'
            });
            search = true;
        
        }
        
        if (dealer) {
            filters.push({ 
                property: 'cue_clinea',
                value: dealer,
                id:'cue_clinea'
            });
            search = true;
        
        }
        
        
        if (tst1 && tst2) {
            filters.push({ 
                property: 'sta_tst1:OR:sta_tst2',
                value: 1
            });
            search = true;
        
        } else {
        
            if (tst1) {
                filters.push({ 
                    property: 'sta_ncuentaenfallodetst',
                    value: 1
                });
                search = true;
            }
                
            if (tst2) {
                filters.push({ 
                    property: 'sta_ncuentaenfallo2dotst',
                    value: 1
                });
                search = true;
            }
        }
        
                    
        if( search ) {
            var target = view.down('#Iframe');
            
            var sorters = [
                {
                    property : 'cue_ncuenta',
                    direction: 'ASC'
                }
            ];
            
            var url = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));

            if(tst1){
                url = Ext.String.urlAppend(url, 'campos=sta_tEnFalloDeTSTDesde,sta_dfechaultimotst');
            }else if(tst2){
                url = Ext.String.urlAppend(url, 'campos=sta_tEnFalloDeTST2Desde,sta_dfechaultimo2dotst');
            }
            
            url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
                    
            //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
         
                    target.load({
            src: url
        }); 
        }
       
        
    }


    
});