Ext.define('SgAppAccessControl.controller.AC_accesoPersonaVehiculosController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['m_AccesosProveedoresVehiculosSearchModel'
            ,'m_AccesosProveedoresVehiculosModel'
            ,'p_controlAcceso_IOModel','t_controlAcceso_puertaSearchModel'
            ,'AC_UsuarioSearchModel','AC_AdministratorSearchModel'],
    views: ['AC_AccesoPersonaVehiculosView'],
    ///theme-material para tener un diseño responsive
    init: function (config) {
        // genero los eventos
        this.control({
            'ac_accesopersonavehiculosview': {
                afterrender: this.initView,
                selectedVehicles: this.onSelectedVehicles,


                itemdblclick: this.onItemClick,
                objectchanged: this.objectChanged,
                egresoClick: this.onEgresoClick
                
            },
            'ac_accesopersonavehiculosview button[action=search]': {
                click: this.onSearchClick
            },
            'ac_accesopersonavehiculosview button[action=getAll]': {
                click: this.onGetAllClick
            },
            'ac_accesopersonavehiculosview button[action=add]': {
                click: this.onAdd
            },
            'ac_accesopersonavehiculosview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'ac_accesopersonavehiculosview button[action="filterIngSinEg"]': {
                click: this.onIngresoSinEgresoClick
            },
            'ac_accesopersonavehiculosview button[action=export]' : {
                click: this.onExportarClick
            }, 
            'ac_accesopersonavehiculosview button[action=showUnidadFuncional]':{
                click: this.onShowUnidadesFuncionales
            }           
        });
    },

    initView: function (view) {
        view.filters = [];
        if (view.record) {
                view.filters.push({
                    property: 'usu_iidcuenta',
                    value: view.record.get('usu_iidcuenta')
                });
        }

        view.store = Ext.create('Ext.data.Store', {
            model: this.getAC_UsuarioSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters/*,
            sorters: [{
                property: 'o.cac_fecha',
                direction: 'DESC'
            }]*/
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        view.store.load();        
    },

    onSelectedVehicles: function(records, view) {
        var textarea = view.down('#eventos');
       
        var text = '';
        
        //var arrayEventos = [];
        Ext.Array.each(records.items, function(record){
            //text = text + record.get('Descripcion')+'\r\n';
            //arrayEventos.push(record.get('cod_ccodigo'));
            
            console.log('Record: '+record);
            var myobject = Ext.create('SgAppAccessControl.model.m_AccesosProveedoresVehiculosModel', {
                Id: 0,
                apv_idKeyProveedor: view.record.get('Id'),
                apv_idKeyVehiculo: record.data.Id
            });
            myobject.save();
            //myobject.setId(0);    
        });
        view.getStore().load();

        /*var myobject = Ext.create('SgAppAccessControl.model.m_AccesosProveedoresModel', {
            Id: 0,


        });
        myobject.setId(0);    
        */    
        
        //textarea.setValue(text);
     
        //view.down('#eventoshide').setValue(arrayEventos.join(','))
    },

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },

    onAdd: function (grid, record, item, index, e, options) {
        var id = 0;
        var view = grid.up('ac_accesopersonavehiculosview');
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = 'Agregar Vehículo';

        //record = this.getP_controlAcceso_IOModelModel();


        /*var myobject = record.create({
            cac_idautorizado: view.record.get('usu_idKey')
        });
        myobject.setId(0);*/


        var viewWidget = Ext.widget('vehicleselectorhelperview', {
            caller: view,
            //record: myobject,
            with: 800,
            height: 400,
            objectId: id,
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 800,
            height: 450,
            modal: true,
            border: false,
            items: viewWidget
        });
        win.show();
    },

    onItemClick: function (grid, record, item, index, e, options) {
        console.log('=========', record);
        var tab = Ext.widget('ac_accesopersonadetallevehiculoview', {
			record: record,
			caller: grid,
            closable:false,
            closeAction: 'destroy',
		});

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Vehiculo',
            translate: false,
            width: 650,
            height: 650,
            border: false,
            modal: true,
            items: tab           
        });
        win.show();
    },
        
    onGetAllClick: function (button, event, options) {

        var view = button.up('p_controlacceso_ioview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        //view.down('#query').setValue('');
        view.down('#autorizadopor').setValue('');
        view.down('#persona').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#fechadesde').setValue('');
        view.down('#combopuerta').setValue('');
        view.down('#filterIngSinEg').toggle(false);
        var proxy= store.getProxy();
        proxy.setExtraParam('IngSinEg', 'N' );        
        
        store.load()

    },

    onSearchClick: function (button, event, options) {

        var view = button.up('p_controlacceso_ioview');
        var controller = this;
        var store = view.getStore();
        var filters = Ext.clone(view.filters);

        store.clearFilter(true);
        var fechadesde;
        
        if(view.down('#fechadesde').getValue()!='' && view.down('#fechahasta').getValue()!=null){
            fechadesde = new Date(view.down('#fechadesde').getValue());

            filters.push({
                property: 'o.[cac_fecha]:GTEDATESTRING',
                id:'fechadesde',
                value: Ext.Date.format(fechadesde, 'Y-m-d ')+'00:00:00'
            });

        }

        var fechahasta ;
        if(view.down('#fechahasta').getValue()!='' && view.down('#fechahasta').getValue()!=null){
            fechahasta = new Date(view.down('#fechahasta').getValue());
            fechahasta.setDate(fechahasta.getDate()+1);

            filters.push({
                property: 'o.[cac_fecha]:LTEDATESTRING',
                id: 'fechahasta',
                value: Ext.Date.format(fechahasta, 'Y-m-d ')+'00:00:00'
            });

        }


        if (view.down('#combopuerta').getValue() && view.down('#combopuerta').getValue()!='' ) {
            filters.push({
                property: 'o.[cac_idpuerta]',
                value: view.down('#combopuerta').getValue()
            });

        }

        if(view.down('#autorizadopor').getValue() && view.down('#autorizadopor').getValue()!='' ) {
            filters.push({
                property: 'o.cac_autorizaid',
                value: view.down('#autorizadopor').getValue()
            });
        }

        if(view.down('#persona').getValue() && view.down('#persona').getValue()!='' ) {
            filters.push({
                property: 'o.cac_idautorizado',
                value: view.down('#persona').getValue()
            });
        }

        //view.down('#fechadesde').setValue('')
        //view.down('#fechahasta').setValue('')
        //view.down('#combopuerta').setValue('')

        store.filter(filters);
        store.load({
            callback: function(records, operation, success) {
                if(records.length==1){
                    controller.onItemClick(view, records[0]);
                    
                }                
            }
        });
    },

    onDeleteClick: function (button, event, options) {
        var view = button.up('ac_accesopersonavehiculosview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                Ext.Ajax.request( {
                    url: '/Rest/m_AccesosProveedoresVehiculos/'+rec.data.Id+'?',
                    /*params: {
                        Id:  rec.data.Id
                        
                    },*/
                    method: 'DELETE',
                    success: function( resp, operation ) {
                        if( resp.responseText ) {
                            // Ext.Msg.alert('Status', 'Se facturo');
                            // notify('Se facturo')
                            var metadata = Ext.decode( resp.responseText );
                        }
                    }
                })
            
            }, this);
            
        }
    },
    onIngresoSinEgresoClick: function (button, event, options) {
        var view = button.up('p_controlacceso_ioview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);

        store.clearFilter(true);
        filters.push({
            property: 'lst.[cac_tipoacceso]',
            value: 1
        });

        view.down('#filterIngSinEg').toggle(true);
        var proxy= store.getProxy();
        proxy.setExtraParam('IngSinEg', 'S' );

        store.filter(filters);
        store.load();
    },
    onExportarClick: function (button, event, options) {
        var view = button.up('p_controlacceso_ioview');
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
        var viewGridIO = button.up('p_controlacceso_ioview');
        
            
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
    onEgresoClick: function (record,grid) {

        //var model=this.getP_controlAcceso_IOModelModel();
        //var _record = model.load(record.get('Id'), {callback: function(r){


        //var view = grid.up('p_controlacceso_autorizacionview');
        var view = grid.up('p_controlacceso_ioview');
        var controller = this;
        var model = controller.getP_controlAcceso_IOModelModel();
        var myobject = model.create({
            cac_idautorizado: record.get('cac_idautorizado'),
            cac_tipoacceso: 0,
            cac_autorizacodigo: record.get('cac_autorizacodigo'),
            cac_autorizatipo: 3,
            cac_autorizaid: _UserData.udw_idKey//record.get('Id')
        });
        myobject.setId(0);
        /*{ Daniel O. Medina
            https://basecamp.com/2249105/projects/17543484/todos/421862631
            */
		var viewWidget = Ext.widget('p_controlacceso_ioformview', {
			caller: view, //para qu refreque
			record: myobject,
			disableComboIO: true
		});

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-door-out',
            layout: 'fit',
            title: 'Nuevo Egreso',
            width: 450,
            height: 450,
            border: false,
            model:true,
            items: viewWidget /*{ Daniel O. Medina
                        https://basecamp.com/2249105/projects/17543484/todos/421862631
                xtype:'p_controlacceso_ioformview',
                enableComboIO:'prueba',
                caller: view,
                record: myobject
            }*/
        });
        win.show();

    }

});