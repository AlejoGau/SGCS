Ext.define('SgAppWebReport.controller.ReporteLoginLogoutController', {
    extend : 'Ext.app.Controller',
    stores : [ 'UsuariosStore' ],
    models : [ 'AdministratorSearchModel' ],
    views : [ 'ReporteLoginLogoutView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteloginlogoutview' : {
                afterrender : this.initView,
                organizationchanged: this.onOrganizationChanged                
            },
            'reporteloginlogoutview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteloginlogoutview button[action="organizationChange"]': {
                click: this.onOrganizationChangeClick
            },            
            'reporteloginlogoutview button[action=verTodos]' : {
                click: this.onTodosClick
            }
    	});
        
	}, // cierro init
    
    initView: function(view){
        var target = view.down('#Iframe');

       /* var cuentaStore = Ext.create('Ext.data.Store',{
            model: this.getTablasLineasSearchModelModel(),
            autoload: false,
            pageSize: 500
        });
        var comboCuenta = view.down('#combocuenta');
        comboCuenta.bindStore(cuentaStore);        
        cuentaStore.load();
        */
        
        view.orgId = null;
        view.baseurl =  '/handler/ReporteLoginLogoutHTML';
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        view.notIn = {
            property:'ObjectName:NOT IN',
            value: 'uiapplication,searchobject,metadata',
            Id: 'ObjectName'
        }
        target.getDoc().getElementsByTagName('body')[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;">' + getLocale('Recuerde que es necesario configurar los parametros de busqueda antes de efectuar el reporte.') + '</h1>';

            
        //this.onSearchClick(view.down('button[action=search]'));
        
        /*
        // se saca combo pedido marcos y ok daniel 18/10/2019
        // https://basecamp.com/2249105/projects/12939010/todos/413600618, se vuelve a solicitar el combo
        *

        var usuariosStore = Ext.create('Ext.data.Store',{
            model: this.getAdministratorSearchModelModel(),
            pageSize: 999,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: true,
            filters: [{"property":"udw_tipo:ININT","value":"0,1,2"}],
            view: view,
            storeId: 'usuariosStore', 
            sorters: [
                {
                    property : 'o.udw_idKey',
                    direction: 'ASC'
                }
            ]
        })
        view.down('#usuario').bindStore(usuariosStore); 
        usuariosStore.load({callback:function () {

            ///esto lo pongo por que me rompe el buscador en el combo
            usuariosStore.remoteFilter = false;
            
        }});
        */

        // Lo que realizóó acá es una limpieza del filtro que se estuvo manipulando, en cada reinicio del reporte, porque el Combo lo guarda en memoria.
        var combo = view.down('#usuario');
        combo.getStore().clearFilter();
        combo.getStore().filter({
            property: "udw_tipo:ININT",
            value: "0,1,2"
        });
        
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
   onOrganizationChangeClick: function(button, event, options ) {
        var view = button.up('reporteloginlogoutview');
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

    onTodosClick: function(button){ 
        var view = button.up('reporteloginlogoutview'); 
        var filters = [];

        filters.push(
            {
                property:'UserName:NOT',
                value: ''
            }       
        )

        filters.push(view.notIn);
        var sort = [];
        sort.push(
            {
                property:'UserName',
                direction: 'ASC'
            },{
                property:'AuditDate',
                direction: 'ASC'
            }       
        )
        
        view.down('#fechadesde').setValue('')
        view.down('#horadesde').setValue('')
        view.down('#fechahasta').setValue('')
        view.down('#horahasta').setValue('')
        view.down('#usuario').setValue('')
        view.orgId = null;
        view.down('#organizacion').setValue('');        

        url = Ext.String.urlAppend(view.baseurl,"filters="+Ext.encode(filters));
        url = Ext.String.urlAppend(url,"sort="+Ext.encode(sort));
        
        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
                target.load({
            src: url
        }); 
    },

    onSearchClick: function (button) {
        var view = button.up('reporteloginlogoutview'); 
        var filters = [];
        var fechaDesde = view.down('#fechadesde').getValue();
        var HoraDesde = view.down('#horadesde').getValue();
        var fechaHasta = view.down('#fechahasta').getValue();
        var HoraHasta = view.down('#horahasta').getValue();
        var usuario = view.down('#usuario').getValue();
        var empresa = view.orgId;
        var funciones = view.down('#funciones').getValue();
       // var comboCuenta = view.down('#combocuenta').getValue();
        
        var url = view.baseurl;

        if(fechaDesde) {
            filters.push(
                {
                    property:'AuditDate:GTEDATESTRING',
                    value: Ext.Date.format(new Date(fechaDesde),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraDesde),'H:i:s')
                }        
            )
        }
        
        if(fechaHasta) {   
            filters.push(
                {
                    property:'AuditDate:LTEDATESTRING',
                    value: Ext.Date.format(new Date(fechaHasta),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraHasta),'H:i:s')
                }        
            )
        }
        
        if(funciones) {   
            var f= typeof funciones.funcion === 'string'?funciones.funcion:funciones.funcion.join(',');

            filters.push(
                {
                    property:'FunctionId:ININT',
                    value: f,
                    Id:'FunctionId'
                }        
            )
        }
        
        if(usuario) {
            filters.push(
                {
                    property:'UserName:LIKE',
                    value: usuario
                }        
            )
        }

        if(empresa) {
            filters.push(
                {
                    property:'u.[udw_empresa]',
                    value: empresa
                }        
            )
        }
        
   
       filters.push(
               {
                    property:'UserName:NOT',
                    value: ''
                }       
            )
        filters.push(view.notIn);
        var sort = [];
         sort.push(
                {
                    property:'UserName',
                    direction: 'ASC'
                },{
                    property:'AuditDate',
                    direction: 'ASC'
                }       
            )

        url = Ext.String.urlAppend(url,"filters="+Ext.encode(filters));
        url = Ext.String.urlAppend(url,"sort="+Ext.encode(sort));
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        var target = view.down('#Iframe');

                target.load({
            src: url
        });     
    } 
    
    
});