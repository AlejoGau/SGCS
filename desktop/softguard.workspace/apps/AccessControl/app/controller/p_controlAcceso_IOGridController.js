Ext.define('AccessControl.controller.p_controlAcceso_IOGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['p_controlAcceso_IOSearchModel', 'p_controlAcceso_IOModel', 't_controlAcceso_puertaSearchModel'
        , 'AC_UsuarioSearchModel', 'AC_AdministratorSearchModel'],
    views: ['p_controlAcceso_IOGridView'],
    ///theme-material para tener un diseño responsive
    init: function (config) {
        // genero los eventos
        this.control({
            'p_controlacceso_ioview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                egresoClick: this.onEgresoClick

            },
            'p_controlacceso_ioview button[action=search]': {
                click: this.onSearchClick
            },
            'p_controlacceso_ioview button[action=getAll]': {
                click: this.onGetAllClick
            },
            'p_controlacceso_ioview button[action=add]': {
                click: this.onAdd
            },
            'p_controlacceso_ioview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'p_controlacceso_ioview button[action="filterIngSinEg"]': {
                click: this.onIngresoSinEgresoClick
            },
            'p_controlacceso_ioview button[action=export]': {
                click: this.onExportarClick
            },
            'p_controlacceso_ioview button[action=showUnidadFuncional]': {
                click: this.onShowUnidadesFuncionales
            }
        });
    },

    initView: function (view) {
        view.filters = [];
        if (view.record) {

            if (!view.filterbycuenta) {
                view.filters.push({
                    property: 'o.[cac_idautorizado]',
                    value: view.record.get('usu_idKey')
                })
                //muestro boton de nuevo acceso
                view.down('#add').show()
                view.down('gridcolumn[dataIndex="_proveedorusuario_nombre"]').hide();
            } else {
                view.filters.push({
                    property: 'usu_iidcuenta',
                    value: view.record.get('Id')
                })
            }
        }

        view.store = Ext.create('Ext.data.Store', {
            model: this.getP_controlAcceso_IOSearchModelModel(),
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


        var puertaStore = Ext.create('Ext.data.Store', {
            model: this.getT_controlAcceso_puertaSearchModelModel(),
            pageSize: 999,
            //remoteSort: true,
            //remoteFilter: true,
            filters: [],
            sorters: [{
                property: 'cap_nombre',
                direction: 'DESC'
            }]
        })
        view.down('#combopuerta').bindStore(puertaStore);

        puertaStore.load();

        /*var personaStore = Ext.create('Ext.data.Store', {
            model: this.getAC_UsuarioSearchModelModel(),
            pageSize: 999,
            //remoteSort: true,
            //remoteFilter: true,
            filters: [
                //[{"property":"usu_ntipo:ININT","value":"5,6,7,8"}]
                {   property: 'usu_ntipo:ININT',
                    value:'5,6,7,8',
                    id:'usu_tipo'
                }
            ],
            sorters: [{
                property: 'usu_cnombre',
                direction: 'DESC'
            }]
        })
        view.down('#combopersona').bindStore(personaStore);
        personaStore.load();*/

        //-----------------
        /*var udwStore = Ext.create('Ext.data.Store', {
            model: this.getAC_AdministratorSearchModelModel(),
            pageSize: 999,
            //remoteSort: true,
            //remoteFilter: true,
            filters: [
            ]
            
        });
        view.down('#comboautorizadopor').bindStore(udwStore);
        udwStore.load();*/
        if (view.up('ac_m_usuariosformview')) {
            view.down('#persona').setVisible(false);
            view.down('#autorizadopor').setVisible(false);
        } else {
            view.down('#showUnidadFuncional').setVisible(false);
        }


    },

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },

    onAdd: function (grid, record, item, index, e, options) {
        var id = 0;
        var view = grid.up('p_controlacceso_ioview');
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = 'Nueva firmante';

        record = this.getP_controlAcceso_IOModelModel();


        var myobject = record.create({
            cac_idautorizado: view.record.get('usu_idKey')
        });
        myobject.setId(0);


        var viewWidget = Ext.widget('p_controlacceso_ioformview', {
            caller: view,
            record: myobject,
            objectId: id,
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 450,
            height: 450,
            modal: true,
            border: false,
            items: viewWidget
        });
        win.show();
    },

    onItemClick: function (grid, record, item, index, e, options) {



        var viewIO = grid.up('ac_m_usuariosformview')

        if (viewIO)
            return;
        else
            viewIO = grid;

        var title, view;
        if (record.get('cac_autorizadotipoid') == 3227) {
            title = getLocale('Ficha') + ': ' + record.get('apr_cNombre');
            view = Ext.widget('ac_accesscontrolproveedorformview', {
                caller: view,
                closable: false,
                title: title,
                iconCls: 'icon-email-edit',
                record: record,
                openFromAC: false,
                filterFromSearchContainer: false
            });

        } else {
            //var panel = viewIO.targetTab ? viewIO.targetTab : Ext.getCmp('center');
            title = getLocale('Ficha') + ': ' + record.get('usu_cnombre');
            view = Ext.widget('ac_m_usuariosformview', {
                caller: viewIO,
                record: record,
                openFromAC: true,
                filterFromSearchContainer: viewIO.filterFromSearchContainer ? viewIO.filterFromSearchContainer : false
            });
        }



        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            translate: false,
            width: 800,
            height: 650,
            border: false,
            modal: true,
            items: view
        });
        win.show();


    },

    onObjectEdit: function (record, view) {

        //var id = record.get('Id');
        //var view = grid.up('p_controlacceso_ioview');
        //var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var model = this.getP_controlAcceso_IOModelModel();
        var _record = model.load(record.get('Id'), {
            callback: function (r) {
                //r.set("usu_cnombre",record.get('usu_cnombre'));

                var _caView = Ext.widget('p_controlacceso_ioformview', {
                    caller: view,
                    //objectId: id,
                    record: r
                });

                var title = 'Editar registro'



                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout: 'fit',
                    title: title,
                    translate: false,
                    width: 450,
                    height: 450,
                    modal: true,
                    border: false,
                    items: _caView
                });
                win.show();
            }
        });
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
        var proxy = store.getProxy();
        proxy.setExtraParam('IngSinEg', 'N');

        store.load()

    },

    onSearchClick: function (button, event, options) {

        var view = button.up('p_controlacceso_ioview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters) || []; // Aseguramos que sea un array
        console.log('Filter->', filters);

        store.clearFilter(true);

        var fechadesdeField = view.down('#fechadesde');
        var fechahastaField = view.down('#fechahasta');
        var fechadesdeVal = fechadesdeField.getValue();
        var fechahastaVal = fechahastaField.getValue();

        if (fechadesdeVal && fechahastaVal) {
            var fechadesde = new Date(fechadesdeVal);
            var fechahasta = new Date(fechahastaVal);

            filters.push({
                property: 'o.[cac_fecha]:GTEDATESTRING',
                id: 'fechadesde',
                value: Ext.Date.format(fechadesde, 'Y-m-d ') + '00:00:00'
            });

            fechahasta.setDate(fechahasta.getDate() + 1);
            filters.push({
                property: 'o.[cac_fecha]:LTEDATESTRING',
                id: 'fechahasta',
                value: Ext.Date.format(fechahasta, 'Y-m-d ') + '00:00:00'
            });

        } else if (fechadesdeVal || fechahastaVal) {
            Ext.Msg.alert('Atención', 'Ambos campos (Fecha desde y Fecha hasta) son obligatorios para filtrar por fecha.');
            return;
        }

        if (view.down('#combopuerta').getValue() && view.down('#combopuerta').getValue() != '') {
            filters.push({
                property: 'o.[cac_idpuerta]',
                value: view.down('#combopuerta').getValue()
            });
        }

        if (view.down('#autorizadopor').getValue() && view.down('#autorizadopor').getValue() != '') {
            filters.push({
                property: 'o.cac_autorizaid',
                value: view.down('#autorizadopor').getValue()
            });
        }

        if (view.down('#persona').getValue() && view.down('#persona').getValue() != '') {
            filters.push({
                property: 'persona:LIKE',
                value: view.down('#persona').getValue()
            });
        }

        var ufField = view.down('#unidadfuncional');
        if (ufField && ufField.getValue()) {
            filters.push({
                property: 'c.cue_cnombre:LIKE',
                value: ufField.getValue()
            });
        }

        var idField = view.down('#identificacion');
        if (idField && idField.getValue()) {
            filters.push({
                property: 'u.usu_cidentificacion:LIKE',
                value: idField.getValue()
            });
        }

        store.filter(filters);
        store.load();
    },

    onDeleteClick: function (button, event, options) {
        var view = button.up('p_controlacceso_ioview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getP_controlAcceso_IOModelModel();
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
        var proxy = store.getProxy();
        proxy.setExtraParam('IngSinEg', 'S');

        store.filter(filters);
        store.load();
    },
    onExportarClick: function (button, event, options) {
    var view = button.up('p_controlacceso_ioview');
    var store = view.getStore();

    // ✅ CLAVE: arrancar con los filtros base del grid
    var filters = Ext.clone(view.filters) || [];

    // --- Armo filtros igual que en onSearchClick ---
    var fechadesdeVal = view.down('#fechadesde').getValue();
    var fechahastaVal = view.down('#fechahasta').getValue();

    if (fechadesdeVal && fechahastaVal) {
        var fechadesde = new Date(fechadesdeVal);
        var fechahasta = new Date(fechahastaVal);

        filters.push({
            property: 'o.[cac_fecha]:GTEDATESTRING',
            id: 'fechadesde',
            value: Ext.Date.format(fechadesde, 'Y-m-d ') + '00:00:00'
        });

        fechahasta.setDate(fechahasta.getDate() + 1);
        filters.push({
            property: 'o.[cac_fecha]:LTEDATESTRING',
            id: 'fechahasta',
            value: Ext.Date.format(fechahasta, 'Y-m-d ') + '00:00:00'
        });
    } else if (fechadesdeVal || fechahastaVal) {
        Ext.Msg.alert('Atención', 'Ambos campos (Fecha desde y Fecha hasta) son obligatorios para filtrar por fecha.');
        return;
    }

    if (view.down('#combopuerta').getValue()) {
        filters.push({
            property: 'o.[cac_idpuerta]',
            value: view.down('#combopuerta').getValue()
        });
    }

    if (view.down('#autorizadopor').getValue()) {
        filters.push({
            property: 'o.cac_autorizaid',
            value: view.down('#autorizadopor').getValue()
        });
    }

    if (view.down('#persona').getValue()) {
        // ✅ igual que search
        filters.push({
            property: 'persona:LIKE',
            value: view.down('#persona').getValue()
        });
    }

    // ✅ FALTABA: unidad funcional
    var ufField = view.down('#unidadfuncional');
    if (ufField && ufField.getValue()) {
        filters.push({
            property: 'c.cue_cnombre:LIKE',
            value: ufField.getValue()
        });
    }

    var idField = view.down('#identificacion');
    if (idField && idField.getValue()) {
        filters.push({
            property: 'u.usu_cidentificacion:LIKE',
            value: idField.getValue()
        });
    }

    // --- Armo la URL ---
    var baseurl = '/handler/IngresosEgresosHTML';
    var url = baseurl + '?_dc=' + new Date().getTime();

    // ✅ pasar token al handler (si el handler lo necesita por Params)
    // (si tu handler sigue usando cookie, esto no molesta)
    var token = (store && store.getProxy && store.getProxy().extraParams) ? store.getProxy().extraParams.token : null;
    if (token) {
        url = Ext.String.urlAppend(url, 'token=' + encodeURIComponent(token));
    }

    // ✅ IngSinEg como parámetro extra (si tu handler lo lee así)
    if (view.down('#filterIngSinEg').pressed) {
        url = Ext.String.urlAppend(url, 'IngSinEg=S');
    }

    // ✅ LO IMPORTANTE: mandar filter JSON como en search
    url = Ext.String.urlAppend(url, 'filter=' + encodeURIComponent(Ext.encode(filters)));

    console.log("Export URL: " + url);
    location.href = url;
},
    onShowUnidadesFuncionales: function (button, event, options) {
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
            .replace(/,/g, '')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/#/g, '')
            .replace(/\./g, '')
            .replace(/>/g, '');
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
                tabConfig: { translate: false },
                title: title,
                objectId: id,
                translate: false,
                closable: true,
                readonly: readonly,
                closeAction: 'destroy',
                recordCuenta: viewGridIO.record,
                securityId: '',//cuentagridview?cuentagridview.securityId:'',
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
    onEgresoClick: function (record, grid) {

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
            model: true,
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