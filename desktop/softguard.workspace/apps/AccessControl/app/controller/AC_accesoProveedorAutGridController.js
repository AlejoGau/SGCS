Ext.define('AccessControl.controller.AC_accesoProveedorAutGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['AC_p_controlAcceso_Autorizacion_ProveedorSearchModel'
            , 'p_controlAcceso_AutorizacionModel'
            , 'AC_p_controlAcceso_AutorizacionModel','p_controlAcceso_IOModel'
            , 'AC_UsuarioSearchModel'],
    views: ['AC_accesoProveedorAutGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'ac_accesoproveedorautgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                ingresoClick: this.onIngresoClick,
                egresoClick: this.onEgresoClick,
                selectedLotes: this.onSelectedLotes
            },
            'ac_accesoproveedorautgridview button[action=search]': {
                click: this.onSearchClick
            },
            'ac_accesoproveedorautgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            /*    'p_controlacceso_autorizacionview button[action=add]': {
                    click: this.onAdd
                },*/
            'ac_accesoproveedorautgridview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'ac_accesoproveedorautgridview button[action="filterActivas"]': {
                click: this.onFilterActivasClick
            },
            'ac_accesoproveedorautgridview button[action="filterVencidas"]': {
                click: this.onFilterVencidasClick
            },
            'ac_accesoproveedorautgridview button[action="nuevaAutorizacion"]': {
                click: this.onNewAutorizacionClick
            },
            'ac_accesoproveedorautgridview button[action=export]' : {
                click: this.onExportarClick
            }, 
            'ac_accesoproveedorautgridview button[action=ingegtodos]': {
                click: this.onIngEgTodosClick
            }


        });
    },

    initView: function (view) {
        console.log('usu_idKey: '+view.usu_idKey);


        view.filters = [];

        if(view.up('ac_accesoproveedorview')){
            
            view.down('#filterInvitesButton').hide();
            view.down('#searchInvitesButton').hide();
            view.down('#ingegtodos').show();
        }
        view.filters = [];
        if (view.record) {
                view.filters.push({
                    property: 'caa_idautorizado',
                    value: view.record.get('Id')
                })
        }//else
         //   view.down('#nuevaAutorizacion').setVisible(false);

        // Filers from first tab on App ( Bienvenido )
        if (view.filterFromSearchContainer) {
            view.filters = Ext.Array.clone(view.filterFromSearchContainer);
        }
        if (view.onlyEnabledInvitations) {
            
            view.filters.push({
                property: 'caa_fechahasta:GTEDATESTRING',
                value: Ext.Date.format(new Date(), 'Y-m-d ')+'00:00:00' //Ext.Date.format(new Date(), 'Y-m-d') + "T" + Ext.Date.format(new Date(), 'H:i:s')
            })
            

            // Change UI from (Bienvenido)
            view.down('#filterInvitesButton').hide();
            view.down('#searchInvitesButton').hide();
            view.down('#getallInvitesButton').hide();
        }


        view.store = Ext.create('Ext.data.Store', {
            model: this.getAC_p_controlAcceso_Autorizacion_ProveedorSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        });
        //---------------------------
        view.store.getProxy().setExtraParam("filterextra", view.filterextra);
        //-------------------------


        view.bindStore(view.store);


        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);

        view.store.load();
    },

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },

    /* onAdd: function(grid,record,item,index,e,options){
        

        var view = grid.up('p_controlacceso_autorizacionview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva firmante';
        
        
         record = this.getP_controlAcceso_AutorizacionModelModel();
         
            
        	var myobject = record.create({
                fir_cnombre:'',
                fir_nestado:0
			});            
	
                    
             var viewWidget = Ext.widget('t_firmantes_fcformview',{
                caller: view,
                record: myobject,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 450,
    			height : 450,
    			border : false,
    			items : viewWidget
    		});
    		win.show();
                    
        
        
    }, */


    onItemClick: function (grid, record, item, index, e, options) {
        
        var view = grid.up('ac_accesoproveedorautgridview');
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = 'Editar autorizacion';
        
        var model = this.getP_controlAcceso_AutorizacionModelModel();
        var _record = model.load(record.get('Id'), {callback: function(r){
            r.set("usu_cnombre",record.get('apr_cNombre')); //por defecto es una persona pero para proveedor le paso el nombre del mismo
            var _caView = Ext.widget('p_controlacceso_autorizacionformview', {
                caller: view,
                createIO: view.createIO,
                record: r
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout: 'fit',
                title: title,
                //width: 450,
                //height: 450,
                modal:true,
                border: false,
                items: _caView
            });
            win.show();
        }})
    },
    storeDataToArray: function(view){
        var array = [];
        var data = view.getStore().getData();
        data.each(function(rec){
            array.push({caa_idKey:rec.data.caa_idkey});
        });
        return array;
    },

    onEgresoClick: function (record,grid) {
        var view = grid.up('ac_accesoproveedorautgridview');
        var controller = this;
        var model = controller.getP_controlAcceso_IOModelModel();
        var selection = this.storeDataToArray(view);
        var myobject = model.create({
            cac_idautorizado: record.get('caa_idautorizado'),
            cac_tipoacceso: 0,
            cac_autorizacodigo: record.get('caa_codigo'),
            cac_autorizatipo: 3,
            cac_autorizadotipoid: 3227,
            cac_autorizaid: _UserData.udw_idKey//record.get('Id')
        });
        myobject.setId(0);
		var viewWidget = Ext.widget('p_controlacceso_ioformview', {
			caller: view, //para qu refreque
			record: myobject,
			disableComboIO: true,
            //selection: selection
		});

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-door-out',
            layout: 'fit',
            title: 'Nuevo Egreso',

            border: false,
            model:true,
            items: viewWidget 
        });
        win.show();
    },

    onIngresoClick: function (record,grid) {
        var view = grid.up('ac_accesoproveedorautgridview');
        var controller = this;
        
   
        var model = controller.getP_controlAcceso_IOModelModel()
        var myobject = model.create({
            cac_idautorizado: record.get('caa_idautorizado'),
            cac_tipoacceso: 1,
            cac_autorizacodigo: record.get('caa_codigo'),
            cac_autorizatipo: 3,
            cac_autorizadotipoid: 3227,
            cac_autorizaid: _UserData.udw_idKey//record.get('Id')
        });
        myobject.setId(0);

        var viewWidget = Ext.widget('p_controlacceso_ioformview', {
			caller: view, //para qu refreque
			record: myobject,
			disableComboIO: true,
		});
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-door-in',
            layout: 'fit',
            title: 'Nuevo Ingreso',
            //width: 450,
            //height: 450,
            border: false,
            modal:true,
            items: viewWidget 
        });
        win.show();
    },

    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },

    onGetAllClick: function (button, event, options) {
        var view = button.up('ac_accesoproveedorautgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        var store = view.getStore();
        var proxy= store.getProxy();
        proxy.setExtraParam('activas', '' );        
        store.load();
        view.down('#persona').setValue('');
        view.down('#caa_fechadesde').setValue('');
        view.down('#caa_fechahasta').setValue('');
        view.down('#filterActivas').toggle(false);
        view.down('#filterVencidas').toggle(false);
    },

    onSearchClick: function (button, event, options) {
        var view = button.up('ac_accesoproveedorautgridview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        store.clearFilter(true);
        
        var fechadesde ;
        if (view.down('#caa_fechadesde').getValue()!='' && view.down('#caa_fechadesde').getValue()!=null ) {
            var fechadesde = new Date(view.down('#caa_fechadesde').getValue());
            filters.push({
                property: 'caa_fechadesde:GTEDATESTRING',//'caa_fechadesde:GTE',
                value: Ext.Date.format(fechadesde,'Y-m-d ')+'00:00:00'//view.down('#caa_fechadesde').getValue()
            });
        }

        var fechahasta ;
        //fechahasta.setDate(fechahasta.getDate()+1);
        if (view.down('#caa_fechahasta').getValue()!='' && view.down('#caa_fechahasta').getValue()!=null) {
            fechahasta = new Date(view.down('#caa_fechahasta').getValue());
            filters.push({
                property: 'caa_fechahasta:LTEDATESTRING', //'caa_fechahasta:LTE',
                value: Ext.Date.format(fechahasta,'Y-m-d ')+'00:00:00' //view.down('#caa_fechahasta').getValue()
            });
        }

        if(view.down('#persona').getValue() && view.down('#persona').getValue()!='' ) {
            filters.push({
                property: 'caa_idautorizado',
                value: view.down('#persona').getValue()
            });            
        }

        store.filter(filters);
    },

    onFilterActivasClick: function(button,event,options)    {
        var view = button.up('ac_accesoproveedorautgridview');
        var store = view.getStore();
        var proxy= store.getProxy();
        proxy.setExtraParam('activas', 'S' );
        

        store.load();
    },
    onFilterVencidasClick: function(button,event,options)    {
        var view = button.up('ac_accesoproveedorautgridview');
        var store = view.getStore();
        var proxy= store.getProxy();
        proxy.setExtraParam('activas', 'N' );
        

        store.load();

    },

    onDeleteClick: function (button, event, options) {
        var view = button.up('ac_accesoproveedorautgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getAC_p_controlAcceso_Autorizacion_ProveedorSearchModelModel();
                rec.setProxy(model.getProxy());
                rec.destroy({
                    callback: function (record, operation) {
                        if (operation.success) {
                            notify('Se eliminio exitosamente');

                        } else {
                            notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }
                        view.store.load();
                    }
                });
            }, this);
        }
    },

    onSelectedLotes: function(records, view) {
        var textarea = view.down('#eventos');
       
        var text = '';
        
        //var arrayEventos = [];
        var lotes = [];
        Ext.Array.each(records.items, function(record){
            //text = text + record.get('Descripcion')+'\r\n';
            //arrayEventos.push(record.get('cod_ccodigo'));
            
            lotes.push({cue_iid:record.data.Id});
            /*var myobject = Ext.create('AccessControl.model.m_AccesosProveedoresVehiculosModel', {
                Id: 0,
                apv_idKeyProveedor: view.record.get('Id'),
                apv_idKeyVehiculo: record.data.Id
            });
            myobject.save();
            */
        });

		var myobject = this.getAC_p_controlAcceso_AutorizacionModelModel().create({
			caa_idautorizado: view.record.get('Id'),
            //caa_usuautoriza:  _UserData.udw_idKey,
            caa_tipo: 3227,
			caa_estado: 1
		})
		myobject.setId(0);

        
		var viewWidget = Ext.widget('ac_accesoproveedorautgridview', {
            caller: view,
            nombreProveedor: view.record.get('apr_cNombre'),
            lotes: lotes,
			record: myobject
		});

		var win = Ext.create('Ext.Window', {
			iconCls: 'icon-table-add',
			layout: 'fit',
			title: 'Nueva autorizacion',
			width: 450,
            height: 450,
            modal:true,
			border: false,
            items: viewWidget,
            listeners:{
                'close':function(w){
                    view.getStore().load();
                }
            }
            
		});
		win.show();


        

        /*var myobject = Ext.create('AccessControl.model.m_AccesosProveedoresModel', {
            Id: 0,


        });
        myobject.setId(0);    
        */    
        
        //textarea.setValue(text);
     
        //view.down('#eventoshide').setValue(arrayEventos.join(','))
    },
    
    onNewAutorizacionClick: function(button, event, options) {
        var view = button.up('ac_accesoproveedorautgridview');
        

		/*var myobject = this.getP_controlAcceso_AutorizacionModelModel().create({
			caa_idautorizado: view.record.get('Id'),
            caa_usuautoriza:  _UserData.udw_idKey,
            caa_tipo: 3227,
			caa_estado: 1
		})
		myobject.setId(0);


		var viewWidget = Ext.widget('ac_p_controlacceso_proveedoresautorizacionformview', {
            caller: view,
            nombreProveedor: view.record.get('apr_cNombre'),
			record: myobject
		});*/

        var viewWidget = Ext.widget('cuentaselectorhelperview',{
            caller: view,
            record:view.record
        });


		var win = Ext.create('Ext.Window', {
			iconCls: 'icon-table-add',
			layout: 'fit',
			title: 'Nueva autorizacion',
			width: 450,
            height: 450,
            modal:true,
			border: false,
            items: viewWidget,
            listeners:{
                'close':function(w){
                    view.store.load();
                }
            }
            
		});
		win.show();

    },
    onExportarClick: function (button, event, options) {
        var view = button.up('ac_accesoproveedorautgridview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        console.log("Exportando desde p_controlAcceso_AtutorizacionGridController");

        var baseurl = '/handler/ReporteACAutorizacionesProveedorHTML';




        var url = baseurl +'?'
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        /*filters.forEach(fil => {
            if(fil.property=='usu_iidcuenta')
                url = Ext.String.urlAppend(url,'usu_iidcuenta='+fil.value);
        });


        if(view.down('#caa_fechadesde').getValue()!='' && view.down('#caa_fechadesde').getValue()!=null){
            fechadesde = new Date(view.down('#caa_fechadesde').getValue());
            url = Ext.String.urlAppend(url,'&fechadesde='+Ext.Date.format(fechadesde, 'Y-m-d'));
        }

        var fechahasta ;
      
        if(view.down('#caa_fechahasta').getValue()!='' && view.down('#caa_fechahasta').getValue()!=null){
            fechahasta = new Date(view.down('#caa_fechahasta').getValue());
            fechahasta.setDate(fechahasta.getDate()+1);
            url = Ext.String.urlAppend(url,'&fechahasta='+Ext.Date.format(fechahasta, 'Y-m-d'));
        }

        if(view.down('#persona').getValue() && view.down('#persona').getValue()!='' ) {
            url = Ext.String.urlAppend(url,'&personaautorizada='+view.down('#persona').getValue());

        }else{
            filters.forEach(fil => { 
                if(fil.property=='caa_idautorizado')
                    url = Ext.String.urlAppend(url,'&personaautorizada='+fil.value);           
            });
        }*/

        if (view.down('#filterActivas').pressed){
            url = Ext.String.urlAppend(url,'activas=S');
        }

        if (view.down('#filterVencidas').pressed){
            url = Ext.String.urlAppend(url,'activas=N');
        }        

        url = Ext.String.urlAppend(url,'filter='+Ext.encode(filters))


        location.href = url;

    },onIngEgTodosClick: function(button, event, options) {
        var view = button.up('ac_accesoproveedorautgridview');        
		var myobject = this.getAC_p_controlAcceso_AutorizacionModelModel().create({
			caa_idautorizado: view.record.get('Id'),
            
            //caa_usuautoriza:  _UserData.udw_idKey,
            caa_tipo: 3227,// e3227 es el codigo de objeto de la tabla proveedores
			caa_estado: 1
		})
		myobject.setId(0);


        var viewWidget = Ext.widget('p_controlacceso_ioformview', {
			caller: view, //para qu refreque
            selection: this.storeDataToArray(view), //son todos los registros del grid
			record: myobject, //es solo dummy porque luego el IO se hace en modo bulk
			disableComboIO: true,
		});
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-door-in',
            layout: 'fit',
            title: 'Nuevo Ingreso',
            //width: 450,
            //height: 450,
            border: false,
            modal:true,
            items: viewWidget 
        });
        win.show();
        
    }

});