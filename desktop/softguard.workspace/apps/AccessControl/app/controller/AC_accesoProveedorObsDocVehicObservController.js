Ext.define('AccessControl.controller.AC_accesoProveedorObsDocVehicObservController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['AC_p_controlAcceso_proveedores_IOSearchModel'],
    views: ['AC_accesoProveedorObsDocVehicObservView'],
    ///theme-material para tener un diseño responsive
    init: function (config) {
        // genero los eventos
        this.control({
            'ac_accesoproveedorobsdocvehicobservview': {
                afterrender: this.initView
                
            }           
        });
    },

    initView: function (view) {
        view.filters = [];
        if (view.record) {

            /*if (!view.filterbycuenta) {
                view.filters.push({
                    property: 'o.[cac_idautorizado]',
                    value: view.record.get('usu_idKey')
                })
                //muestro boton de nuevo acceso
                view.down('#add').show()
                view.down('gridcolumn[dataIndex="usu_cnombre"]').hide();
            } else {
                view.filters.push({
                    property: 'usu_iidcuenta',
                    value: view.record.get('Id')
                })
            }*/
            view.filters.push({
                property: 'o.cac_autorizadotipoid',
                value: 3227
            });
            view.filters.push({
                property: 'o.cac_idautorizado',
                value: view.record.get('Id')
            });
        }

        view.store = Ext.create('Ext.data.Store', {
            model: this.getAC_p_controlAcceso_proveedores_IOSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: [{
                property: 'o.cac_fecha',
                direction: 'DESC'
            }]
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);

        view.store.load();


        

    },

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },





    onExportarClick: function (button, event, options) {
        var view = button.up('ac_accesoproveedorobsdocvehicobservview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);

        var baseurl = '/handler/IngresosEgresosHTML';
        var url = baseurl +'?'
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        var view = button.up('p_controlacceso_ioview');

        if(view.down('#fechadesde').getValue()!='' && view.down('#fechahasta').getValue()!=null){
            fechadesde = new Date(view.down('#fechadesde').getValue());
            url = Ext.String.urlAppend(url,'&fechadesde='+Ext.Date.format(fechadesde, 'Y-m-d'));
        }

        var fechahasta ;
        if(view.down('#fechahasta').getValue()!='' && view.down('#fechahasta').getValue()!=null){
            fechahasta = new Date(view.down('#fechahasta').getValue());
            fechahasta.setDate(fechahasta.getDate()+1);
            url = Ext.String.urlAppend(url,'&fechahasta='+Ext.Date.format(fechahasta, 'Y-m-d'));
        }


        if (view.down('#combopuerta').getValue() && view.down('#combopuerta').getValue()!='' ) {
            var idpuerta=view.down('#combopuerta').getValue();
            console.log('idpuerta: '+idpuerta);
            url = Ext.String.urlAppend(url,'&idpuerta='+idpuerta);


        }

        if(view.down('#autorizadopor').getValue() && view.down('#autorizadopor').getValue()!='' ) {
            url = Ext.String.urlAppend(url,'&autorizadopor='+view.down('#autorizadopor').getValue());

        }

        if(view.down('#persona').getValue() && view.down('#persona').getValue()!='' ) {
            url = Ext.String.urlAppend(url,'&personaautorizada='+view.down('#persona').getValue());

        }else{
            filters.forEach(fil => { 
                if(fil.property.indexOf('cac_idautorizado')!=-1)
                    url = Ext.String.urlAppend(url,'&personaautorizada='+fil.value);           
            });
        }

        if(view.down('#filterIngSinEg').pressed){
            url = Ext.String.urlAppend(url,'&IngSinEg=S');
        }

        console.log('Estado toggle: '+view.down('#filterIngSinEg').pressed);

        location.href = url;

    },
    onShowUnidadesFuncionales: function(button,event,options){
        var viewGridIO = button.up('ac_accesoproveedorobsdocvehicobservview');
        
            
        //var view = button.up('m_usuariosformview');
        

        var id = viewGridIO.recordPersona.get('cue_iid');
        //var cuentagridview = view.up('cuentagridview')
        //if(cuentagridview) {
        //var panel = cuentagridview.idTargetPanel?view.up('#'+cuentagridview.idTargetPanel):view.up('#center');
        //} else {
           var panel = viewGridIO.up('#tabpanelUserInvitationEditor');
        //}
        var title = viewGridIO.recordPersona.get('cue_clinea') + '-' + viewGridIO.recordPersona.get('cue_ncuenta') + ' - ' + viewGridIO.recordPersona.get('cue_cnombre');
        title = title
            .replace(/,/g,'')
            .replace(/\[/g,'')
            .replace(/\]/g,'')
            .replace(/#/g,'')
            .replace(/\./g,'')
            .replace(/>/g,'');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        var readonly = false;
        
       /** se saco por que simpre habilitaba situacion cuando tenia no habilitado
        * if (record.get('Situacion')=="No Habilitado"){
            readonly=true;
        }*/
        
        //if(cuentagridview && cuentagridview.readonly) {
        //    readonly=true;
        //}
        
        var openView = 'accesscontrolcuentaview';
        /*if(view.itemDbClickView) {
            openView = view.itemDbClickView;
        } else {
            if(cuentagridview) {
                if(cuentagridview.itemDbClickView != undefined) {
                    openView = cuentagridview.itemDbClickView
                }
            }
        }*/
        
        /*if(cuentagridview && cuentagridview.itemDbClickViewType == 'win') {
            var forceIdModule = null;
            if(cuentagridview) {
                forceIdModule = cuentagridview.forceIdModule?cuentagridview.forceIdModule:null
            }
        
            var win = Ext.create('Ext.Window', {
                layout : 'fit',
                title : title,
                width : 450,
                height : 300,
                border : false,
                translate: false,
                items : [
                    {
                        xtype:openView,
                        recordCuenta: view.record,
                        caller:view,
                        securityId:cuentagridview.securityId,
                        nameModule: panel.nameModule,
                        forceIdModule: forceIdModule
                    }
                ]
            });
            win.show();
        } else {*/
        //    if(cuentagridview) {
        //         forceIdModule = cuentagridview.forceIdModule?cuentagridview.forceIdModule:null
        //    }
        	if (!mytab) {
                var newTab = Ext.widget(openView, {
                    tabConfig: {translate: false},
        			title : title,
                    objectId: id,
                    translate: false,
                    closable: true,
                    readonly: readonly,
                    closeAction: 'destroy',
                    recordCuenta: viewGridIO.record,
                    securityId:'',//cuentagridview?cuentagridview.securityId:'',
                    nameModule: ''//cuentagridview.nameModule,
                    //forceIdModule: forceIdModule
        		});
                panel.add(newTab);
                panel.setActiveTab(newTab);
    		}
    		// el existe, lo activo
    		else {
                mytab.show();
    		}
        //}

    },
    onGetAllClick: function (button, event, options) {
        var view = button.up('ac_accesoproveedorobsdocvehicobservview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        //view.down('#categoria').setValue('');
        //view.down('#identificacion').setValue('');
        //view.down('#nombre').setValue('');
        //view.down('#apr_iStatus').setValue('');
        store.load();
    },    

});