Ext.define('SgAppWebReport.controller.ReporteUsuariosController', {
    extend : 'Ext.app.Controller',
    stores : [ 'OrganizationStore' ],
    models : [ 'OrganizationSearchModel', 'SecurityModulesModel' ],
    views : [ 'ReporteUsuariosView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteusuariosview' : {
    			afterrender : this.initView
            },
            'reporteusuariosview button[action=filter]' : {
                click: this.onFilterClick
            },
            'reporteusuariosview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reporteusuariosview button[action=btnprint]': {
                click: this.onBtnprintClick
            },             
		});
        
	}, // cierro init
    
    initView: function(view){
        
        view.baseurl =  '/handler/HtmlUserModule';
        var target = view.down('#Iframe');
       //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
                
        var comboOrganizacion = view.down('#comboorganizacion');
               
        var combostore = Ext.create('Ext.data.Store',{
            model: this.getOrganizationSearchModelModel(),           
            pageSize: 20000,
            remoteFilter: true,
            filters: [{
            property: 'Status:ININT',
            value: '7,8,9',
            id: 'status'
            }],
            sorters: [{
                 property: 'o.Name',
                 direction: 'ASC'
             }],
            remoteSort: true
        });
       
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());        
        comboOrganizacion.bindStore(combostore);       
        combostore.load({callback:function (records) {

            if (records.length >0){
                comboOrganizacion.setValue(records[0].get('Id'));
                var organizacion = comboOrganizacion.getValue();
                
                

                
                var filters = [];
                filters.push(
                        {
                            property: 'udw_empresa',
                            value: organizacion
                        }
                    );
                    
                url = Ext.String.urlAppend(url, 'Filter='+Ext.encode(filters));
                        target.load({
            src: url
        }); 
            }
            
            
            
            
        
        }});
        
        
     
    },

    onBtnprintClick: function (button) {
        var view = button.up('reporteusuariosview');
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
    
    onFilterClick: function(button, event, options){
        var view = button.up('reporteusuariosview');
        var organizacion = view.down('#comboorganizacion');
      //  var modulos = view.down('#modulos');
        
        var filters = [];
        
        if(organizacion.getValue()) {
            filters.push(
                {
                    property: 'udw_empresa',
                    value: organizacion.getValue()
                }
            );
        }
        
      /*  if(modulos.getValue()) {
            filters.push(
                {
                    property: 'ums_idModules',
                    value: modulos.getValue()
                }
            );
        }*/
        
        
           
        var target = view.down('#Iframe');
        
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter='+Ext.encode(filters));
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
                target.load({
            src: url
        }); 
    },
    onTodosClick: function(button, event, options){ 
        var view = button.up('reporteusuariosview');
        var target = view.down('#Iframe');
        target.load({
            src: view.baseurl
        }); 
    }
    
    
});