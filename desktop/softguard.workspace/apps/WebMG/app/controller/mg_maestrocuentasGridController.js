Ext.define('WebMG.controller.mg_maestrocuentasGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'mgmc_ctipoStore' ],
    models : [ 'mg_maestrocuentasModel', 'mg_maestrocuentasSearchModel', 'NameValueModel', 't_organizacion_fcSearchModel' ],
    views : [ 'mg_maestrocuentasGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'mg_maestrocuentasgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                movimientos: this.onMovimientosClick,
                objectchange: this.onGetAllClick
			},
            'mg_maestrocuentasgridview button[action=search]': {
                click: this.onSearchClick
            },
            'mg_maestrocuentasgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'mg_maestrocuentasgridview button[action="new"]' : {
                click: this.onNewClick
            },
            'mg_maestrocuentasgridview button[action=groupTipo]' : {
				click : this.onGroupTipoClick
			},
            'mg_maestrocuentasgridview #org_organizacionId' : {
				change : this.onorganizacionFacturadoraChange
			}
		});
	},

	initView : function(view) {
        //var record = view.record;
        //var parentorderid = record.get( 'Id' );
        var store = Ext.create( 'Ext.data.Store', {
            model: this.getMg_maestrocuentasSearchModelModel(),
            pageSize: 500,
            filters: [ {
                property: 'mgmc_idorganizacion',
                value: 1
            }],
            remoteSort: true,
            remoteFilter: true
        });
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        

        store.load({callback:function () {
            console.log(store);
        }});
        //view.store = store;
        //view.bindStore( view.store );
        //var toolbar = view.down( 'pagingtoolbar' );
        //toolbar.bindStore( view.store );
        //view.store.load();
    /*var filters = [];
        var record = view.record;
        var controller = this;
        
        filters = [
            {
                property: 'mgmc_idorganizacion',
                value: 1
            }
        ]
        
        var store =Ext.create('Ext.data.Store',{
            model: controller.getMg_maestrocuentasModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: filters,
            sorters:[{
                property:'mgmc_ccodigo',
                direction:'DESC'
            }]
        })

    view.store = store;
    view.bindStore( store );

    store.load();
        /*var record = view.record;

        if(!view.filters) {
           view.filters = [] 
        }
        
        var objectTypeId = 0
        if (record){
            view.filters.push({
                property: 'org_organizacionId',
                value: record.get('org_organizacionId')
            })
            
            view.down('[dataIndex=nombreOrganizacion]').setVisible(false);
        }

        var organizationStore =  Ext.create('Ext.data.Store', {
            model : controller.getT_organizacion_fcSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'org_cnombre',
                direction: 'ASC'
            }],
            filters: [{
                property: 'org_organizacionId',
                value:_UserData.Company
            }],
            autoload: false
        });

        var organizationCombo = view.down('#org_organizacionId');
        organizationCombo.bindStore(organizationStore);

        organizationStore.load({callback:function(records){
            var store = Ext.create('Ext.data.Store', {
            model : controller.getT_organizacion_fcSearchModelModel(),
                remoteFilter: true,
                remoteSort: true,
                pageSize:10000,
                sorters: [{
                    property: 'mgmc_ccodigo',
                    direction: 'ASC'
                }],
                autoload: false
            });

            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(store);
            view.bindStore(store);

            organizationCombo.select(records[0]);
     
        }});

        if(view.hideNew) {
            view.down('#new').hide()
        }*/
	},

    onorganizacionFacturadoraChange: function(combo,newValue, oldValue, eOpts){
        var store = Ext.create( 'Ext.data.Store', {
        model: this.getMg_maestrocuentasSearchModelModel(),
        pageSize: 500,
        filters: [ {
            property: 'mgmc_idorganizacion',
                value: newValue
        }],
        remoteSort: true,
        remoteFilter: true
        });
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        

        store.load({callback:function () {
            console.log(store);
        }});
        /*var view = combo.up('mg_maestrocuentasgridview');
        var store = view.getStore();
        store.clearFilter(true);

        var _filters = Ext.Array.clone(view.filters);
        _filters.push({
            property: 'org_organizacionId',
            value: newValue,
            id: 'org_organizacionId'
        })

        store.filter(_filters);*/
    },

    onGetAllClick: function(button, event, options) {    
        var view = button.up('mg_maestrocuentasgridview')?button.up('mg_maestrocuentasgridview'):button;
        var store = view.getStore();
        store.clearFilter(true);
        
        view.down('#nombre').setValue('');
        view.down('#mgmc_ctipo').setValue('');

        store.filter(view.filters);
    },
    
    onNewClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('mg_maestrocuentasgridview');
        var controller = this;
        var model = this.getMg_maestrocuentasModelModel();
        
        // creo una nueva cuenta para este usuario logueado.
        // uso un handler para todo el manejo del token x seguridad
        
        Ext.Ajax.request({
            url: '/handler/mg_maestrocuentascreate',
            success: function(response){
                var id = response.responseText;
                var record = model.load(id, {
                    callback: function(_record, operation, success) {
                        controller.onItemClick(view,_record);
                    }
                }); 
            }
        });
    },

    onSearchClick: function(button, event, options) {    
        var view = button.up('mg_maestrocuentasgridview');
        var store = view.getStore();
        var query = view.down('#query');
        var field = view.down('#fieldName');
        var filters = Ext.Array.clone(view.filters);
        var fechadesde = view.down('#datedesde').getValue();
        var fechahasta = view.down('#datehasta').getValue();
        var estado = view.down('#estado').getValue();
        var prefijo = view.down('#prefijo').getValue();
        var numerocomprobante = view.down('#numerocomprobante').getValue();
        var cbc_ctipocbte = view.down('#cbc_ctipocbte').getValue();

        if  (fechadesde) {
            
             filters.push({ 
                property: 'cbc_dFecha:GTEDATESTRING',
                value: Ext.Date.format(fechadesde,'Y-m-d'),
                id: 'fechadesde'
            });
            
        }
        
        if  (fechahasta) {
            
             filters.push({ 
                property: 'cbc_dFecha:LTEDATESTRING',
                value: Ext.Date.format(fechahasta,'Y-m-d'),
                id: 'fechahasta'
            });
            
        }
        
        if  (estado != null) {
            
             filters.push({ 
                property: 'cbc_cEstado',
                value: estado,
                id: 'estado'
            });
        }
        
        if  (cbc_ctipocbte != null) {
            
             filters.push({ 
                property: 'cbc_ctipocbte',
                value: cbc_ctipocbte,
                id: 'cbc_ctipocbte'
            });
        }
        
        if  (prefijo) {
            
             filters.push({ 
                property: 'cbc_cPrefijoCbte',
                value: Ext.String.leftPad(Ext.util.Format.trim(prefijo), 4, '0'),
                id: 'prefijo'
            });
            
            view.down('#prefijo').setValue(Ext.String.leftPad(Ext.util.Format.trim(prefijo), 4, '0'));
        }
        
        if  (numerocomprobante) {
             filters.push({ 
                property: 'cbc_iNumeroCbte',
                value: numerocomprobante,
                id: 'numerocomprobante'
            });
        }

        store.clearFilter(true);
        if (filters){
            store.filter(filters); 
        } 
    },
    
    onGroupTipoClick: function(button, event, options){
        var view = button.up('mg_maestrocuentasgridview');
        var grid = view.view;
        store = view.getStore();
            
        if (button.pressed){
            
            store.group('cbc_cestado','ASC');
        }else {
            store.clearGrouping();
        }
    },
    
    onMovimientosClick: function(record,view,item,index,e,options){
        var viewgrid = view.up('mg_maestrocuentasgridview')
        var id = record.get('Id');
        //var model = this.getM_comprobantes_cab_fcModelModel();
        //var proxy = model.getProxy();
        panel=view.up('tabpanel')
        var title = record.get('mgmc_ccodigo')+' '+ record.get('mgmc_descripcion');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab){
            var newTab = Ext.widget('mg_movimientoscuentasgridview',{
                iconCls: 'icon-table',
                record: record,
                title: title,
                closable: true,
                mgm_idcuenta: record.get('Id'),
                translate: false,
                closeAction: 'destroy'
            });
            
            // agrego la paleta creada
            panel.add(newTab);
            panel.setActiveTab(newTab);
        } else{
             panel.setActiveTab(mytab);
        }
    },  
    
    onItemClick: function(view,record,item,index,e,options){
        var viewgrid = view.up('mg_maestrocuentasgridview')
        var id = record.get('Id');
        var model = this.getMg_maestrocuentasModelModel();
        var proxy = model.getProxy();
        record.setProxy(proxy);
        panel=view.up('tabpanel')
        var title = record.get('mgmc_ccodigo')+' '+ record.get('mgmc_descripcion');
        // me fijo si el tab existe, si es nuevo lo creo
        //var mytab = panel.down('[title="' + title + '"]');

        var newTab = Ext.widget('mg_maestrocuentasformview',{
            record: record,
            mgm_idcuenta: record.get('Id'),
            translate: false,
            closeAction: 'destroy'
        });
        
        Ext.create('Ext.window.Window', {
            title: title,
            iconCls: 'icon-table-edit',
            height: 400,
            closable: true,
            title: title,
            translate: false,
            closeAction: 'destroy',
            width: 400,
            layout: 'fit',
            items: newTab
        }).show();
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    openObjectTab: function(tabpanel,objectId, objectTypeName, title){
        var title = record.get('mgmc_ccodigo')+' '+ record.get('mgmc_descripcion');
        var newTab = tabpanel.down('[title="' + title + '"]');
        if (!newTab){
            var newTab = Ext.widget(container, {
                title : title,
            	border : false,
    			closable : true,
                objectId: objectId,
                targetTab: tabpanel,
                autoDestroy: true
    		});
            
            tabpanel.add(newTab);
        }
        
		tabpanel.setActiveTab(newTab);
    }
});