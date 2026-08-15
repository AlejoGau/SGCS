Ext.define('SgAppAccessControl.controller.p_controlAcceso_AutorizacionDeliveryGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['p_controlAcceso_AutorizacionDeliverySearchModel'
            , 'p_controlAcceso_AutorizacionModel','p_controlAcceso_IOModel'
            , 'AC_UsuarioSearchModel'],
    views: ['p_controlAcceso_AutorizacionDeliveryGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'p_controlacceso_autorizaciondeliverygridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                ingresoClick: this.onIngresoClick,
                egresoClick: this.onEgresoClick
            },
            'p_controlacceso_autorizaciondeliverygridview button[action=search]': {
                click: this.onSearchClick
            },
            'p_controlacceso_autorizaciondeliverygridview button[action=getall]': {
                click: this.onGetAllClick
            },
            /*    'p_controlacceso_autorizaciondeliverygridview button[action=add]': {
                    click: this.onAdd
                },*/
            'p_controlacceso_autorizaciondeliverygridview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'p_controlacceso_autorizaciondeliverygridview button[action="filterActivas"]': {
                click: this.onFilterActivasClick
            },
            'p_controlacceso_autorizaciondeliverygridview button[action="filterVencidas"]': {
                click: this.onFilterVencidasClick
            },
            'p_controlacceso_autorizaciondeliverygridview button[action="nuevaAutorizacion"]': {
                click: this.onNewAutorizacionClick
            },
            'p_controlacceso_autorizaciondeliverygridview button[action=export]' : {
                click: this.onExportarClick
            }, 



        });
    },

    initView: function (view) {
        console.log('usu_idKey: '+view.usu_idKey);

        if(view.up('ac_m_usuariosformview')){
            view.down('#persona').setVisible(false);
        }
        console.log('selecter field: '+view.down('#persona'));
        view.filters = [];
        if(view.filterFromSearchContainer){
            view.filters = view.filterFromSearchContainer;
        }
 
        view.filters.push({
            property: 'caa_tipoVisita',
            value: 6
        });


        view.store = Ext.create('Ext.data.Store', {
            model: this.getP_controlAcceso_AutorizacionDeliverySearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        });



        view.bindStore(view.store);


        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);

        view.store.load();
    },

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },

 

    onItemClick: function (grid, record, item, index, e, options) {
        var view = grid.up('p_controlacceso_autorizaciondeliverygridview');
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = 'Editar autorizacion';

        var model = this.getP_controlAcceso_AutorizacionModelModel();
        var _record = model.load(record.get('Id'), {callback: function(r){
            r.set("usu_cnombre",record.get('usu_cnombre'));
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

    onEgresoClick: function (record,grid) {
        var view = grid.up('p_controlacceso_autorizaciondeliverygridview');
        var controller = this;
        var model = controller.getP_controlAcceso_IOModelModel()
        var myobject = model.create({
            cac_idautorizado: record.get('caa_idautorizado'),
            cac_tipoacceso: 0,
            cac_autorizacodigo: record.get('caa_codigo'),
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
            //width: 450,
            //height: 450,
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
    },

    onIngresoClick: function (record,grid) {
        var view = grid.up('p_controlacceso_autorizaciondeliverygridview');
        var controller = this;
        var model = controller.getP_controlAcceso_IOModelModel()
        var myobject = model.create({
            cac_idautorizado: record.get('caa_idautorizado'),
            cac_tipoacceso: 1,
            cac_autorizacodigo: record.get('caa_codigo'),
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
            iconCls: 'icon-door-in',
            layout: 'fit',
            title: 'Nuevo Ingreso',
            //width: 450,
            //height: 450,
            border: false,
            modal:true,
            items: viewWidget /*{ Daniel O. Medina
                https://basecamp.com/2249105/projects/17543484/todos/421862631
                xtype:'p_controlacceso_ioformview',
                enableComboIO:'prueba',
                caller: view,
                record: myobject
            }*/
        });
        win.show();
    },

    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },

    onGetAllClick: function (button, event, options) {
        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
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
        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
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

        if(view.down('#nombreDelivery').getValue() && view.down('#nombreDelivery').getValue()!='' ) {
            filters.push({
                property: 'caa_comentarios:LIKE',
                value: view.down('#nombreDelivery').getValue()
            });            
        }

        store.filter(filters);
    },

    onFilterActivasClick: function(button,event,options)    {
        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
        var store = view.getStore();
        var proxy= store.getProxy();
        proxy.setExtraParam('activas', 'S' );
        

        store.load();
    },
    onFilterVencidasClick: function(button,event,options)    {
        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
        var store = view.getStore();
        var proxy= store.getProxy();
        proxy.setExtraParam('activas', 'N' );
        

        store.load();

    },

    onDeleteClick: function (button, event, options) {
        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getP_controlAcceso_AutorizacionModelModel();
                record.setConfig({proxy: model.getProxy()});
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
    onNewAutorizacionClick: function(button, event, options) {
        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
        

		var myobject = this.getP_controlAcceso_AutorizacionModelModel().create({
			caa_idautorizado: view.record.get('usu_idKey'),
			caa_estado: 1
		})
		myobject.setId(0);


		var viewWidget = Ext.widget('p_controlacceso_autorizacionformview', {
			caller: view,
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
                    view.store.load();
                }
            }
            
		});
		win.show();

    },
    onExportarClick: function (button, event, options) {
        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        console.log("Exportando desde p_controlAcceso_AtutorizacionGridController");

        var baseurl = '/handler/ReporteACAutorizacionesDeliveryHTML';



        var view = button.up('p_controlacceso_autorizaciondeliverygridview');
        var url = baseurl +'?'
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

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

        if(view.down('#nombreDelivery').getValue() && view.down('#nombreDelivery').getValue()!='' ) {
            filters.push({property:"caa_comentarios:LIKE",value:view.down('#nombreDelivery').getValue()});
        }        

        url = Ext.String.urlAppend(url, '&filter='+Ext.JSON.encode(filters));

        if (view.down('#filterActivas').pressed){
            url = Ext.String.urlAppend(url,'&activas=S');
        }

        if (view.down('#filterVencidas').pressed){
            url = Ext.String.urlAppend(url,'&activas=N');
        }        


        location.href = url;

    }

});