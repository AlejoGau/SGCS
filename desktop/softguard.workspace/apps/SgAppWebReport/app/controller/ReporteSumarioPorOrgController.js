Ext.define('SgAppWebReport.controller.ReporteSumarioPorOrgController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasLineasSearchModel', 'CuentaSearchModel', 'TablasTiposSearchModel', 'OrganizationSearchModel', 'GeographyOrgGridModel' ],
    views : [ 'ReporteSumarioPorOrgView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportesumariodealerpororgview' : {
            	afterrender : this.initView,
                organizationchanged: this.onOrganizationChanged
            },
            'reportesumariodealerpororgview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportesumariodealerpororgview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reportesumariodealerpororgview button[action="organizationChange"]': {
                click: this.onOrganizationChangeClick
            },
           'reportesumariodealerpororgview button[action=export]' : {
                click: this.onExportClick
            },
            'reportesumariodealerpororgview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }            
		});
        
	}, // cierro init
    
    initView: function(view){
        var controller = this;

        var countryStore = Ext.create('Ext.data.Store',{
                    model: this.getGeographyOrgGridModelModel(),
                    storeId: 'countryStore',
                    remoteFilter: true,
                    pageSize: 10000,
                    sorters: [{
                        property: 'Name', direction:'ASC'
                    }],
                    filters:[{
                        property: 'Parent',
                        value: 0
                    }]
                });
        

        var comboPaises = view.down('#pais');
        countryStore.load();
        comboPaises.bindStore(countryStore);    

                
        var orgStore = Ext.create('Ext.data.Store',{
            model: this.getOrganizationSearchModelModel(),
            autoload: false,
            pageSize: 10000
        });
        view.orgId = null;

        view.baseurl =  '/handler/ReporteSumarioPorOrgHTML';
        if(view.filters) {
            view.baseurl = Ext.String.urlAppend(view.baseurl, 'Filter='+Ext.encode(view.filters));            
        }
        
        controller.setIframeUrl(view);
    },
    onOrganizationChangeClick: function(button, event, options ) {
        var view = button.up('reportesumariodealerpororgview');
        var filter = [];
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione una entidad',
            closeAction: 'destroy',
            caller: view,
            modal: true,
            width: 600,
            height: 400,
            border: false,
            items: {
                xtype: 'organizationhelperview',
                title: '',
                //forceStatus: '7,8,9',
                disableFilterOrgType: true,
                hideTaxo: true,
                caller: view,
                filter: filter
            }
        });
        view.down('#sacarorg').show();
        win.show();        
    },    
    onOrganizationChanged: function(record, view ) {
        if( record ) {
            view.orgId = record.get('Id');
            view.down('#organizacion').setValue( record.get('Name') );
        } else {
            view.orgId = 0;
            view.down('#organizacion').setValue('');
        }
    },    
    onTodosClick: function(button){ 
        var view = button.up('reportesumariodealerpororgview'); 
        var filters = [];
        var target = view.down('#Iframe');
   
        target.load({
            src: view.baseurl+'?cache='+new Date().getTime()
        });    
    },

    onSearchClick: function (button) {
        var view = button.up('reportesumariodealerpororgview'); 
        var controller = this;
        controller.setIframeUrl(view);
    },
    onBtnprintClick: function(button){
        var view = button.up('reportesumariodealerpororgview');
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
    setIframeUrl: function(view){
        var url = this.getUrl(view);
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
                target.load({
            src: url
        }); 
    },

    getUrl: function(view){
        var filters = [];
        var org = view.orgId;
        var pais = view.down('#pais').getValue();
        //var sorter = view.down('#sorter').getValue();
        var url = view.baseurl;
        var reportType = view.down('#reportType').getValue();

        if(pais) {
            url = Ext.String.urlAppend(url,"pais="+pais);
        }
        
        if(reportType)
        {
            url = Ext.String.urlAppend(url,"reportType="+reportType);

        }
        if(org) {
            url = Ext.String.urlAppend(url,"org="+org);
        }
        /*if(sorter) {
            url = Ext.String.urlAppend(url,"sorter="+sorter);
        }*/
        
        url = Ext.String.urlAppend(url,"_dc="+new Date().getTime());
        return url;
    },

    onExportClick : function(button){
        var view = button.up('reportesumariodealerpororgview');
        
        var url = this.getUrl(view);
        
       //  Agrego flag de Export 
       
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    }
});