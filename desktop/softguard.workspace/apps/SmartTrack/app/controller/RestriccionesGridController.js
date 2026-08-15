Ext.define('SmartTrack.controller.RestriccionesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_vcrestriccionesSearchModel', 'p_vcrestriccionesModel', 'SmartTrackSearchModel', 'OrganizationModel', 'OrganizationSearchModel' ],
    views : [ 'RestriccionesGridView' ],

    init : function(config) {
        // genero los eventos
		this.control(
            {
			'restriccionesgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                showCuentaCorriente: this.onShowCuentaCorriente,
                refresh: this.onRefresh,
                versmarttrack: this.onVerSmarttrack
			},
            'restriccionesgridview button[action=search]': {
                click: this.onSearchClick
            },
            'restriccionesgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'restriccionesgridview #add': {
                click: this.onAddClick
            },
            'restriccionesgridview #delete': {
                click: this.onDeleteClick
            }
            
		});
	},
    
    /**
     * Safe accessor for the current user's Company.
     * Migration note: this.application.UserData can be undefined because
     * Common.Application initializes UserData from an async request. Fallback to
     * global _UserData if available.
     */
    getUserCompany: function () {
        try {
            if (this.application && this.application.UserData && this.application.UserData.Company) {
                return this.application.UserData.Company;
            }
        } catch (e) { /* ignore */ }
        if (typeof _UserData !== 'undefined' && _UserData && _UserData.Company) {
            return _UserData.Company;
        }
        return null;
    },
    
    
    onDeleteClick : function(button, event, options) {
        var controller = this;
        var view = button.up('restriccionesgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setProxy(controller.getP_vcrestriccionesModelModel().getProxy())
                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            notify('Se eliminio exitosamente');
                            
                        }
                        else
                        {
                           notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }    
                        view.store.load();
                   
                }
                
            });
            
            },this);
            
            
        }
            	
	},
    
    onVerSmarttrack: function (rec,view) {
        var controller = this;
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : 'Dispositivos restringidos',
        	width : 700,
			height : 400,
			border : false,
			items : [{
                xtype:'grid',
                flex:1,
                width:'100%',
                columns:[{
                    xtype : 'gridcolumn',
                    header : 'Vigicontrol',
                    dataIndex : 'Nombre',  
                    flex:1                                
                },{
                    xtype : 'gridcolumn',
                    header : 'Cuenta',
                    dataIndex : '_cuenta',  
                    flex:1                                
                },{
                    xtype : 'gridcolumn',
                    header : 'Telefono',
                    dataIndex : 'Telefono',  
                    flex:1                                
                },{
                    xtype : 'gridcolumn',
                    header : 'Imei',
                    dataIndex : 'Imei',  
                    flex:1                                
                }]
			}]
		});
		win.show();
        
        
         var store =Ext.create('Ext.data.Store',{
            model: controller.getSmartTrackSearchModelModel(),
            pageSize: 999,
            filters: [{
                property:'Id:ININT',
                value: rec.get('vcr_list')
            }],
            remoteSort: true,
            remoteFilter: true,
        });
        
        win.down('grid').bindStore(store);
        
        store.load();
    },
    
    
    onRefresh: function (view) {
        view.getStore().load()
    },

	initView : function(view) {
        // Ensure UserData is available; otherwise retry a few times to avoid crashing the module
        var company = this.getUserCompany();
        if (!company) {
            view._companyRetries = (view._companyRetries || 0) + 1;
            if (view._companyRetries < 25) { // ~5s total with 200ms step
                Ext.defer(this.initView, 200, this, [view]);
                return;
            }
        }

        view.filter = [{
            property:'vcr_idorganizacion',
            value: company
        }]

        var storeSecurity = SecurityModulesStore; //Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordAdmin = storeSecurity.findRecord('KeyReference', 'Administrator',0,false,false,true)
        
        if (recordAdmin && recordAdmin.get('Available') == true){
            view.filter = []
            if(view.down("gridcolumn[dataIndex=org.Name]")) {
                view.down("gridcolumn[dataIndex=org.Name]").setVisible(true)
            }
            view.down('#organizacion').show()
        }
        
         var controller = this;
         var store =Ext.create('Ext.data.Store',{
            model: controller.getP_vcrestriccionesSearchModelModel(),
            pageSize: 50,
            filters: view.filter,
            remoteSort: true,
            remoteFilter: true,
        });
        
        view.bindStore(store);
        
        store.load();
            
        
        
	},
    
    
    onAddClick: function(grid,record,item,index,e,options){
        
        var view = grid.up('restriccionesgridview');
        var title = 'Nueva restriccion';
        
        
         record = this.getP_vcrestriccionesModelModel();
         
            
            var myobject = record.create({
                vcr_idorganizacion: this.getUserCompany(),
                vcr_status: 1
			});            
		
                    
             var newview = Ext.widget('restriccionesformview',{
                caller: view,
                record: myobject
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-lock-add',
                layout : 'fit',
                title : title,
        		width : 600,
    			height : 280,
    			border : false,
    			items : newview
    		});
    		win.show();
                    
 
        
    },    
    
   
    
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('restriccionesgridview')?grid.up('restriccionesgridview'):grid;
        var controller = this
      
        var title = record.get('vcr_name');
        
        controller.getP_vcrestriccionesModelModel().load(record.get('Id'), {callback:function (recx) {
            var newview = Ext.widget('restriccionesformview',{
                caller: view,
                record: recx
            });    
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-lock-edit',
                layout : 'fit',
                title : title,
            	width : 600,
    			height : 280,
            	border : false,
            	items : newview
            });
        	
            win.show();
        }})
        
        
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },

    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('restriccionesgridview');
        var store = view.getStore(); 
        
        view.down('#smarttrack').setValue('')
        view.down('#organizacion').setValue('')
        view.down('#Name').setValue('')
        view.down('#telefono').setValue('')
        view.down('#Imei').setValue('')
        view.down('#cue_clinea').setValue('')
        view.down('#cue_ncuenta').setValue('')
        
        
        store.clearFilter(true); // tomar los filtros de base.
        store.filter(view.filter);
        store.load()
       
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('restriccionesgridview');
        
        var store = view.getStore();
     
     
        var filters = Ext.clone(view.filter);
        
        if (view.down('#smarttrack').getValue()) {
            filters.push({ 
                property: 'vcr_list:LIKE',
                value: view.down('#smarttrack').getValue(),
                id: 'vcr_list:LIKE'
            });
        }
        
        if (view.down('#Name').getValue()) {
            filters.push({ 
                property: 'o.Name:LIKE',
                value: view.down('#Name').getValue(),
                id: 'Name:LIKE'
            });
        }
        
        if (view.down('#telefono').getValue()) {
            filters.push({ 
                property: 'telefono',
                value: view.down('#telefono').getValue(),
                id: 'telefono'
            });
        }
        
        
        if (view.down('#Imei').getValue()) {
            filters.push({ 
                property: 'Imei',
                value: view.down('#Imei').getValue(),
                id: 'Imei'
            });
        }
        
        
        if (view.down('#cue_clinea').getValue()) {
            filters.push({ 
                property: 'cue_clinea',
                value: view.down('#cue_clinea').getValue(),
                id: 'cue_clinea'
            });
        }
        
        if (view.down('#cue_ncuenta').getValue()) {
            filters.push({ 
                property: 'cue_ncuenta',
                value: view.down('#cue_ncuenta').getValue(),
                id: 'cue_ncuenta'
            });
        }
        
        
        if (view.down('#organizacion').getValue()) {
            filters.push({ 
                property: 'vcr_idorganizacion',
                value: view.down('#organizacion').getValue(),
                id: 'vcr_idorganizacion'
            });
        }
        
      
        
       
        if (filters) {
            store.clearFilter(true);
            store.filter(filters);
        } 
    },
    
  

});