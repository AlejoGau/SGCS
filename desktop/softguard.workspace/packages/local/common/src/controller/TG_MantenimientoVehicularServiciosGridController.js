//MIGRADO2024
Ext.define('Common.controller.TG_MantenimientoVehicularServiciosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TG_MantenimientoVehicularServiciosModel', 'TG_MantenimientoVehicularServiciosSearchModel' ],
    views : [ 'TG_MantenimientoVehicularServiciosGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'mantvehicularserviciosgridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'mantvehicularserviciosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'mantvehicularserviciosgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'mantvehicularserviciosgridview button[action=add]': {
                click: this.onAdd
            },
            'mantvehicularserviciosgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}            
            
		});
	},
	initView : function(view) {
        var controller = this;
        
        /* Obtengo el numero de compania del usuario */
        var usuarioLogueadoCompany = _UserData.Company;
        
        /* Model correspondiente al SP para la tabla t_TG_mantenimiento_servicios */
        view.store = Ext.create('Ext.data.Store',{
            model: this.getTG_MantenimientoVehicularServiciosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{
                property: 'tgms_cnombre',
                direction: 'ASC'
            }],
            
            /* Aplico para filtrar por la Organizacion del usuario del Desktop */
            filters: [{
                property : 'tgms_iorganizacion',
                value : usuarioLogueadoCompany
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
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('mantvehicularserviciosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = getLocale('Nuevo Servicio');
        
        
        /* Crear el formulario con los datos de la tabla de t_TG_mantenimiento_servicios */
        record = this.getTG_MantenimientoVehicularServiciosModelModel();
    	var myobject = record.create({
           
		});            
        
        var view = Ext.widget('mantvehicularserviciosformview',{
            caller: view,
            record: myobject,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
			title : title,
			width : 450,
			height : 260,
			border : false,
			items : view
		});
		win.show();   
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('mantvehicularserviciosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('tgms_cnombre');
        
        /* Crear el formulario con los datos de la tabla de t_TG_mantenimiento_servicios */
        var view = Ext.widget('mantvehicularserviciosformview',{
            caller: view,
            record: record,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
			title : title,
			width : 450,
			height : 260,
            translate: false,
			border : false,
			items : view
		});
		win.show();
        
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('mantvehicularserviciosgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('mantvehicularserviciosgridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        var filters = Ext.clone(view.filters);
        
        
        if (fieldName != ''){
            filters.push({ 
                property: 'tgms_cnombre:LIKE',
                value: fieldName
            });   
        }
        
        if (query != ''){
            filters.push({ 
                property: 'tgms_cdescripcion:LIKE',
                value: query
            });   
        }
        
        if (filters.length > 0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('mantvehicularserviciosgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
           var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.destroy({callback: function(record, operation){
                    if (operation.success)
                    {
                        notify('Se eliminio exitosamente');
                        view.store.load();
                        
                    }
                    else
                    {
                       notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                    }      
               }
                
            });
            
            },this);
            
            
        }
        		
	}
});