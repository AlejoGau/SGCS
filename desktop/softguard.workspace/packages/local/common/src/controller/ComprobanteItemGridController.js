Ext.define('Common.controller.ComprobanteItemGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_comprobantes_item_fcModel', 'm_comprobantes_item_fcSearchModel' ],
    views : [ 'ComprobanteItemGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'comprobanteitemsearchview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.onObjectChanged,
                deleteitem: this.onDeleteItem
			},
            'comprobanteitemsearchview button[action=add]': {
                click: this.onAddClick
            },
            'comprobanteitemsearchview button[action=addManual]': {
                click: this.onAddManualClick
            },
            'comprobanteitemsearchview button[action=search]': {
                click: this.onSearchClick
            },
            'comprobanteitemsearchview button[action=getall]': {
                click: this.onGetAllClick
            }
		});
	},

	initView : function(view) {
        var record = view.record;
        var parentorderid = record.get('Id');

        var store =Ext.create('Ext.data.Store',{
            model: this.getM_comprobantes_item_fcSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        });

        view.store=store;
        view.bindStore(store);
        if(parentorderid && !record.phantom && parentorderid != 0) {
            store.filter([{
                property: 'cbi_icodigocab',
                value: parentorderid,
                id:'cbi_iCodigoCab'
            }]);
            store.load();
        }
	},

    onAddManualClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('comprobanteitemsearchview');
        var record = view.record;
        var parentId = record.get('Id');
        var model = this.getM_comprobantes_item_fcModelModel();

        var newrecord = Ext.create(model,{
            Id: 0,
            Name: getLocale('Producto o servicio'),
            cbi_icantidad: 1,
            cbi_icodigocab: parentId
        });

        this.openWindow(newrecord,view, view.recordOrganizacion,'comprobanteitemmanualformview');
    },

    onAddClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('comprobanteitemsearchview');
        var record = view.record;
        var parentId = record.get('Id');
        var model = this.getM_comprobantes_item_fcModelModel();

        var newrecord = Ext.create(model,{
            Name: getLocale('Seleccione un producto...'),
            cbi_icantidad: 1,
            cbi_icodigocab: parentId
        });

        this.openObject(newrecord,view);
    },

    openWindow: function(record, caller,recordOrganizacion, widget){
        var title = record.get('Name'); //reemplazar por config
        var view = Ext.widget(widget,{
            record: record,
            recordOrganizacion: recordOrganizacion,
            recordComprobante: caller.record,
            scope: this,
            caller: caller
            }
        );
        var myWindow = Ext.widget('window',{
            title: title,
            height: 400,
            width: 400,
            modal: true, 
            items: view,
            layout: 'fit',
            caller: caller
        }).show();
    },
    
    onItemClick: function(view,record,item,index,e,options){
        var view = view.up('comprobanteitemsearchview')
        this.openObject(record,view);
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },

    openObject : function(record,view) {
        var controller = this.application.getController('Common'+'.controller.ComprobanteItemFormController');
        controller.openWindow(record,view, view.recordOrganizacion);
    },
    
    
    onObjectCreated: function(view){
        var record = view.record;
        var grid = view.caller;
        var paging = view.down('pagingtoolbar');
        
        paging.moveFirst();
        paging.doRefresh();
        this.onItemClick(grid, record);
    },
    
    
    onObjectChanged: function(view){
        var store = view.getStore();
        var recordId = view.record.get('Id');
        
        if(recordId && !view.record.phantom && recordId != 0) {
            store.filter([{
                property:'cbi_iCodigoCab',
                value:recordId,
                id:'cbi_iCodigoCab'
            }]);
            store.load({callback:function (records) {
                view.caller.fireEvent('itemsSaved',records, view.caller, false)
            }});
        }
    },
    
    onDeleteItem: function(recordGrid,view){
        var model = this.getM_comprobantes_item_fcModelModel();
        var date = new Date();
        Ext.Ajax.request({
            url:model.getProxy().url+'/'+recordGrid.get('Id')+'?dc='+date.getTime(),
            method : 'DELETE',
            success : function(resp, operation){
                view.getStore().load({callback:function (records) {
                    view.caller.fireEvent('itemsSaved',records, view.caller, false)
                }});          
            } 
        });
        /*
        var r = model.load(recordGrid.get('Id'),{
            callback: function(record, operation){

            }
        });
        r.destroy({callback: function(){
            view.getStore().load({callback:function (records) {
                view.caller.fireEvent('itemsSaved',records, view.caller, false)
            }});
        }});
        */
    },
    
    
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('comprobanteitemsearchview');
        var store = view.getStore();
        store.clearFilter();
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('comprobanteitemsearchview');
        
        var store = view.getStore();
        var query = view.down('#query');
        var field = view.down('#fieldName');
        
        var taxonomytree = view.query('taxonomiesmastertree')[0];
        var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
        
        var taxonomiesArray = [];
        var filters = [];
        
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        
        if (fechaDesde)
            filters.push({ 
                property: 'FechaPrimeraIntervencion:GT',
                value: fechaDesde,
                id: 'fechaDesde'
            });
            
        if (fechaHasta)
            filters.push({ 
                property: 'FechaPrimeraIntervencion:LT',
                value: fechaHasta,
                id: 'fechaHasta'
            });
        
        var orChk = view.down('#or');
        var or = orChk.checked?':OR':'';
        
        Ext.Array.each(taxonomiesSelected, function (rec) {
            if (rec.get('checked'))
            taxonomiesArray.push(rec.get('Id'));
        },this);
        
        var taxonomies = taxonomiesArray.join();
        
        if (field.getValue() && query.getValue()){
            filters.push({ 
                property: field.getValue()+':Like',
                value: query.getValue(),
                id: 'query'
            });
        }
        
        if (taxonomiesArray.length > 0){
            filters.push({
                property: 'Taxonomy'+or,
                value: taxonomies,
                id: 'taxonomy'
            });
        }
        
        if (filters)
        store.filter(filters);
        else
        store.clearFilter();
    }
});