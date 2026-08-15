Ext.define('Common.controller.ContratoItemGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.OrderItemStatusStore' ],
    models : [ 'ContratoItemSearchModel', 'ContratoItemModel' ],
    views : [ 'ContratoItemGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'contratoitemsearchview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.onObjectChanged,
                deleteitem: this.onDeleteItem
			},
            'contratoitemsearchview button[action=add]': {
                click: this.onAddClick
            },
            'contratoitemsearchview button[action=search]': {
                click: this.onSearchClick
            },
            'contratoitemsearchview button[action=getall]': {
                click: this.onGetAllClick
            }
		});
	},

	initView : function(view) {
        var record = view.record;
        var parentorderid = record.get('Id');
        
        if(!(typeof parentorderid === 'number' && isFinite(parentorderid))){
            parentorderid = 0;
        }

        // Deshabilitar botón si el contrato no está guardado
        if (parentorderid == 0) {
            var btnAdd = view.down('button[action=add]');
            if (btnAdd) btnAdd.setDisabled(true);
            return;
        }
        
            view.store = Ext.create('Ext.data.Store',{
                model: this.getContratoItemSearchModelModel(),
                pageSize: 500,
                remoteSort: true,
                remoteFilter: true,
                autoload:false,
                filters: [{
                    property: 'idcontrato',
                    value: parentorderid,
                    id:'idcontrato'
                }]
            });
            
            view.bindStore(view.store);
        if(parentorderid != 0) {   
            view.store.load();
        }
	},
    
    
    onAddClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        
        var view = button.up('contratoitemsearchview');
        var record = view.record;
        var parentId = record.get('Id');
        
        var model = this.getContratoItemModelModel();

        var newrecord = Ext.create(model,{
            Id: 0,
            Description: getLocale('Seleccione un servicio...'),
            Status: '1',
            Quantity: 1,
            idcontrato: parentId
        });
       
        newrecord.phantom = true;
        newrecord.crudState = 'C';
        
        //var store = view.getStore();
        //store.add(newrecord);
        
        this.openObject(newrecord,view);

    },
    
    onItemClick: function(view,record,item,index,e,options){
        this.openObject(record,view.up('contratoitemsearchview'));
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },

    openObject : function(record,view) {
        var controller = this.application.getController('Common'+'.controller.ContratoItemFormController');
        controller.openWindow(record,view, view.recordOrganizacion,view.cnt_dinamico);
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
        
        if(view.record.get('Id') != 0) {
            store.filter([{
                property:'idcontrato',
                value:view.record.get('Id'),
                id:'idcontrato'
            }]);
        }
        
        store.load();
    },
    
    onDeleteItem: function(record,view){
        var model = this.getContratoItemModelModel();
        model.load(record.get('Id'),{
            callback: function(rec,operation){
                rec.erase({
                    success : function(record,operation){
                        view.store.load();
                    }
                });
                
            }
        });
        
        /*record.proxy.url = model.getProxy().url;
        record.destroy({callback: function(){
            view.getStore().load();
        }});*/
        
    },
    
    
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('contratoitemsearchview');
        var store = view.getStore();
        store.clearFilter();
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('contratoitemsearchview');
        
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
