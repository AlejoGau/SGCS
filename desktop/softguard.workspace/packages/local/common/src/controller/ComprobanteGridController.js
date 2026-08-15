//MIGRADO2024
Ext.define('Common.controller.ComprobanteGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TipoComprobanteStore' ],
    models : [ 'm_comprobantes_cab_fcModel', 'm_comprobantes_cab_fcSearchModel', 't_comprobantes_fcSearchModel' ],
    views : [ 'ComprobanteGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'comprobantegridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchange: this.onGetAllClick,
                realizarpago: this.onRealizarPago,
                openPdf: this.onOpenPdf
            },
            'comprobantegridview button[action=search]': {
                click: this.onSearchClick
            },
            'comprobantegridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'comprobantegridview button[action="new"]' : {
                click: this.onNewOrderClick
            },
            'comprobantegridview button[action=groupStatus]' : {
                click : this.onGroupStatusClick
            }
        });
    },
  
    onOpenPdf: function (rec, view) {        
        // aca no debiera ir el token FIJO, sino el handler toma el dinamico del usuario logueado.
        view.baseurl = '/handler/Html2PdfNreco?oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&url=';
        /**
         * La manera de invocar al generador de PDF es pasandole un parametro de QueryString ?url=
         * Este parametro de URL tiene que estar encodeado es decir, que no acepte caracteres especiales.
         * 
         * viejo : var url = Ext.String.urlAppend(view.baseurl, 'idComprobante='+rec.get('Id'));
         * 
         */
        // aca no debiera ir EXTERNAL sino DESKTOPURL
        var urlDominio = getParametro('DESKTOPEXTERNALURL')+'/handler/ComprobantePdfMG';
        urlDominio = Ext.urlAppend(urlDominio, 'idComprobante='+rec.get('Id'));
        urlDominio = Ext.urlAppend(urlDominio, 'oauth_token='+Ext.util.Cookies.get('OAuth_Token'))
        var url = view.baseurl+encodeURIComponent(urlDominio);
        
        var myWindow = Ext.widget('window',{
            title: getLocale('Factura'),
            height: 600,
            width: 800,
            modal: true, 
            items: [{
                xtype: 'uxiframe',
                itemId: 'Iframe',
                height: 0,
                border : false,
                width:'100%',
                name:'name-iframe',
                src: url
            }],
            layout: 'fit',
            caller: view
        }).show();
    },
    onRealizarPago: function (rec, view) {
        var myWindow = Ext.widget('window',{
            title: getLocale('Realizar pago'),
            height: 400,
            width: 400,
            modal: true, 
            items: [{
                xtype:'pagoformview',
                recordComprobante: rec
            }],
            layout: 'fit',
            caller: view
        }).show();
    },
    initView : function(view) {
        var controller = this;
        var record = view.record;
        view.organizationRecord = view.record;
        
        if(!view.filters) {
            view.filters = [] 
        }
        
        var objectTypeId = 0;
        var cli_iOrganizacion = 0;
        if (record){ 
            if(record.get('cli_iOrganizacion'))
                cli_iOrganizacion = record.get('cli_iOrganizacion');
            else
                cli_iOrganizacion = record.get('Id');
            view.filters.push({
                property: 'cbc_iCliente',
                value: record.get('cli_icodigo_ID')
            });
            if (cli_iOrganizacion > 0){
                view.filters.push({
                    property: 'cbt_idOrganizacionFacturadora',
                    value: cli_iOrganizacion
                });
            }
            
            view.down('[dataIndex=nombreOrganizacion]').setVisible(false);
        }
        var tipoFilter = [];
        if (cli_iOrganizacion){
            tipoFilter.push({
                property: 'cbt_idOrganizacionFacturadora',
                value: cli_iOrganizacion
            });
        }
        if (view.cbt_ntipo){
            tipoFilter.push({
                property: 'cbt_ntipo',
                value: view.cbt_ntipo
            });
            view.filters.push({
                property: 'cbt_ntipo',
                value: view.cbt_ntipo
            });
        }
                
        view.TipoComprobanteStore = Ext.create('Ext.data.Store',{
            model: this.getT_comprobantes_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: tipoFilter
        })
        view.down('#cbc_ctipocbte').bindStore(view.TipoComprobanteStore);
        view.TipoComprobanteStore.load({callback:function () {
            var store = Ext.create('Ext.data.Store', {
                model : controller.getM_comprobantes_cab_fcSearchModelModel(),
                pageSize: 50,
                remoteFilter: true,
                filters: view.filters,
                autoload: false
            });
            
            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(store);
            view.bindStore(store);
            store.load();
        }})
        
        if(view.hideNew) {
            view.down('#new').hide()
        }
        if(view.hideGroup) {
            view.down('#groupStatus').hide()
        }  
    },
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('comprobantegridview')?button.up('comprobantegridview'):button;
        var store = view.getStore();
        store.clearFilter(true);
        
        view.down('#datedesde').setValue('')
        view.down('#datehasta').setValue('')
        view.down('#estado').setValue('')
        view.down('#prefijo').setValue('')
        view.down('#numerocomprobante').setValue('')
        view.down('#cbc_ctipocbte').setValue('')
        store.filter(view.filters)
    },
    
    onNewOrderClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('comprobantegridview');
        var model = this.getM_comprobantes_cab_fcModelModel();
        var record = Ext.create(model,{
            cnt_fechaalta: new Date(),
            cbc_icliente: view.record.get('cli_icodigo_ID'),
            cbc_iversion: 1 //nueva version donde los impuestos se toman desde el producto (ver comprobantefromview)
        });
        var title = getLocale('Nuevo Comprobante');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        if(view.record) {
            var organizacionId = view.record.get('Id');
        }
        if (!mytab) {
            var newTab = Ext.widget('comprobanteformview', {
                record: record,
                recordOrganizacion: view.record,
                translate:false,
                targetTab: newTab,
                title : title,
                record: record,
                cbt_ntipo: view.cbt_ntipo,
                closable : true,
                organizacionId: organizacionId,
                caller: view
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            mytab.show();
        }
    },
    onSearchClick: function(button, event, options) {    
        var view = button.up('comprobantegridview');
        var tbar = view.getDockedItems('toolbar[dock="top"]');
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
        if (filters)
            store.filter(filters);
    },
    
    onGroupStatusClick: function(button, event, options){
        var view = button.up('comprobantegridview');
        var grid = view.view;
        store = view.getStore();
            
        if (button.pressed){ 
            store.group('cbc_cestado','ASC');
        } else {
            store.clearGrouping();
        }
    },
    
    onItemClick: function(view,record,item,index,e,options){
        var viewgrid = view;
        var id = record.get('Id');
        var model = this.getM_comprobantes_cab_fcModelModel();
        var proxy = model.getProxy();
        panel=view.up('tabpanel')
        var title = getLocale('Comprobante')+': '+ record.get('_ncomprobante');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        if (mytab){
            mytab.show();
            return;
        }
        
        if(record.get('cbc_cestado')) {
            var newTab = Ext.widget('facturaprintview',{
                iconCls: 'icon-printer',
                record: record,
                recordOrganizacion: viewgrid.record,
                cbt_ntipo: viewgrid.cbt_ntipo,
                title: title,
                closable: true,
                objectId: record.get('Id'),
                translate: false,
                closeAction: 'destroy',
                organizacionId: organizacionId
            });
            // agrego la paleta creada
            panel.add(newTab);
            panel.setActiveTab(newTab);
            
            return false;
        }
        
        if(viewgrid.record) {
            var organizacionId = viewgrid.record.get('Id');
        }
        if (!mytab) {
            var viewOpen = 'comprobanteformview'
            var filters = [];
            
            if(viewgrid.editorView) {
                viewOpen = viewgrid.editorView
                filters = [{
                    property:'pag_iCodigoCbte',
                    value: record.get('Id')
                },{
                    property:'cbc_iCliente',
                    value: record.get('cbc_icliente')
                }]
            }
            var newTab = Ext.widget(viewOpen, {
                record: record,
                recordOrganizacion: viewgrid.record?viewgrid.record:record,
                translate:false,
                targetTab: newTab,
                cbt_ntipo: viewgrid.cbt_ntipo,
                title : title,
                closable : true,
                caller: viewgrid,
                organizacionId: organizacionId,
                filters: filters
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            mytab.show();
        }
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    openObjectTab: function(tabpanel,objectId, objectTypeName, title){
        var title = object.get('Name');
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
    },
    
    onContentCreated: function(view){
        var record = view.record;
        var grid = view.caller;
        var paging = view.down('pagingtoolbar');
        
        paging.moveFirst();
        paging.doRefresh();
        this.onItemClick(grid, record);
    },
    
    openObjectTab: function(targetTab,object){
        var objectId = object.get('Id');
        var title = object.get('Name');
        var newTab = Ext.widget('contratoformview', {
            title : title,
            border : false,
            closable : true,
            record: object,
            objectId: objectId,
            targetTab: targetTab,
            autoDestroy: true
        });
        
        targetTab.add(newTab);
        targetTab.setActiveTab(newTab);
    }
});