//MIGRADO2024
Ext.define('Common.controller.p_controlAcceso_AutorizacionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_controlAcceso_AutorizacionSearchModel', 'p_controlAcceso_AutorizacionModel' ],
    views : [ 'p_controlAcceso_AutorizacionGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'p_controlacceso_autorizacionview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
    		},
            'p_controlacceso_autorizacionview button[action=search]': {
                click: this.onSearchClick
            },
            'p_controlacceso_autorizacionview button[action=getall]': {
                click: this.onGetAllClick
            },
        /*    'p_controlacceso_autorizacionview button[action=add]': {
                click: this.onAdd
            },*/
            'p_controlacceso_autorizacionview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},
	initView : function(view) {
        view.filters = [];      
        if(view.record) {
            
            if(view.filterbycuenta) {
                view.filters.push({
                    property:'usu_iidcuenta',
                    value:view.record.get('Id')
                })
            } else {
                view.filters.push({
                    property:'caa_idautorizado',
                    value:view.record.get('Id')
                })
                view.down('gridcolumn[dataIndex="usu_cnombre"]').hide();
              
            }
        }
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getP_controlAcceso_AutorizacionSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
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
    
    
   
   onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('p_controlacceso_autorizacionview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Editar autorizacion';
         var view = Ext.widget('p_controlacceso_autorizacionformview',{
            caller: view,
            record: record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
    		width : 450,
			height : 450,
			border : false,
			items : view
		});
		win.show();
        
    },  
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('p_controlacceso_autorizacionview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('p_controlacceso_autorizacionview');
        
        var store = view.getStore();       
        var filters = Ext.clone(view.filters);        
        store.clearFilter(true);
        
        if (view.down('#caa_fechadesde').getValue() != ''){
            filters.push({ 
                property: 'caa_fechadesde:GTE',
                value: view.down('#caa_fechadesde').getValue()
            });
            
        }
        
        if (view.down('#caa_fechahasta').getValue() != ''){
            filters.push({ 
                property: 'caa_fechahasta:LTE',
                value: view.down('#caa_fechahasta').getValue()
            });
            
        }
        
        store.filter(filters);        
        
       
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('p_controlacceso_autorizacionview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getP_controlAcceso_AutorizacionModelModel();
                rec.setConfig({
                    proxy: model.getProxy()
                });                rec.destroy({callback: function(record, operation){
                   
                   
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
        		
	}
});