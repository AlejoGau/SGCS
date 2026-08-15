//MIGRADO2024
Ext.define('Common.controller.ServTecVisitasGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.ServTecVisitaEstadoStore' ],
    models : [ 'ServTecVisitaModel', 'ServTecVisitaSearchModel', 'ServTecModel' ],
    views : [ 'ServTecVisitaGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'servtecvisitagridview' : {
            	afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                productSelected: this.onProductSelected,
                objectchanged: this.onObjectChange
			},
            'servtecvisitagridview button[action=search]': {
                click: this.onSearchClick
            },
            'servtecvisitagridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'servtecvisitagridview button[action=add]': {
                click: this.onAdd
            },
            'servtecvisitagridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},
	initView : function(view) {
        view.filters = [
                {
                    property:'svi_iServicio',
                    value: view.record.get('Id')
                }
            ]
        view.store =Ext.create('Ext.data.Store',{
            model: this.getServTecVisitaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        if(view.security && view.security.readOnly && view.security.readOnly == true) {
            view.down('#agregar').hide();
            view.down('#delete').hide();
            view.readOnly = view.security.readOnly;
        }
        
	},
    
  
    
    onAdd: function(grid,record,item,index,e,options){
        var id = 0;
        var view = grid.up('servtecvisitagridview');
        var title = 'Nueva visita';
        var controller = this;
        var newrecord = controller.getServTecVisitaModelModel().create({
            Id:0,
            svi_iEstado: "1",
            svi_iServicio: view.record.get('Id'),
            svi_tFechaHora: new Date()
        })
        console.log("view.up('servtecvisitagridview')",view.up('servtecvisitagridview'));
        console.log("view",view);
        var view = view.up('servtecvisitagridview')?view.up('servtecvisitagridview'):view;
              
        var newTab = Ext.widget('sertecvisitasformview', {
            iconCls: 'icon-group',
            title : getLocale('Nueva Visita'),
            targetTab: view.up('tabpanel'),
            closable : true,
            translate: false,
            cabecera: view.record,
            record : newrecord,
            caller: view
        });
        var tabpanel = view.up('tabpanel');
        tabpanel.add(newTab);
        tabpanel.setActiveTab(newTab);
    },    
      
    onObjectChange: function(record,view,open){
       view.down('pagingtoolbar').doRefresh();
       if(open) {
            this.onItemClick(view,record);
       } else {
            view.up('sertepanelview').fireEvent('objectrefresh', record,view.up('sertepanelview'),false);
           
       }
    },
    
    onProductSelected: function(record,view){
            var controller = this;
            Ext.MessageBox.prompt('Cantidad', 'Ingrese la cantidad:', function (btn, cantidad) {
                controller.getServTecProductosOrdenModelModel().create({
                    spr_iServicio:view.record.get('Id'),
                    spr_iProducto:record.get('Id'),
                    spr_iCantidad:cantidad
        		}).save({callback:function () {
          
                    var toolbar = view.down('pagingtoolbar');
                    toolbar.doRefresh();
                    
                    notify('El producto se agrego con exito.')
          
        		}});
            });     
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onItemClick: function (view,record) {
        var controller = this;
        var view = view.up('servtecvisitagridview')?view.up('servtecvisitagridview'):view;
    
        var newTab = Ext.widget('sertecvisitasformview', {
            iconCls: 'icon-group',
            title : getLocale('Visita')+"("+record.get('Id')+")",
            targetTab: view.up('tabpanel'),
            closable : true,
            closeAction: 'destroy',
            translate: false,
            cabecera: view.record,
            record : record,
            caller: view,
            readOnly: view.readOnly
        });
        
        var tabpanel = view.up('tabpanel');
        tabpanel.add(newTab);
        tabpanel.setActiveTab(newTab);
    },
    onGetAllClick: function(button, event, options) {    
        var view = button.up('servtecvisitagridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('servtecvisitagridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        store.clearFilter(true);
        
        var filters = Ext.clone(view.filters);
        
        
        if (fieldName != null && fieldName != ''){
            filters.push({ 
                property: 'svi_iEstado',
                value: fieldName
            });
            
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
        var view = button.up('servtecvisitagridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection && selection.length > 0) {
            var modelVisita = this.getServTecVisitaModelModel();
            var pendingErases = selection.length;
            var anySuccess = false;

            // Cuando terminan todos los erases, recargo el store UNA vez y, si
            // no quedan visitas, reseteo la cabecera (estado a Pendiente y
            // limpio técnico/móvil asignados — espejo de lo que setea forceSave).
            var finalize = function() {
                view.store.load({
                    callback: function() {
                        if (view.store.getCount() === 0) {
                            var recordx = view.record;
                            var model = controller.getServTecModelModel();
                            model.load(recordx.get('stc_iid'), {
                                callback: function(cabRecord) {
                                    if (!cabRecord) { return; }
                                    cabRecord.set('stc_nestado', 1);
                                    cabRecord.set('stc_ctecnico_1', '');
                                    cabRecord.set('stc_cmovil_1', '');
                                    cabRecord.save({
                                        callback: function(saved, op) {
                                            if (op.success) {
                                                var panel = view.up('sertepanelview');
                                                if (panel) {
                                                    panel.cabecera = saved;
                                                    panel.fireEvent('objectrefresh', saved, panel, false);
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            };

            Ext.Array.each(selection, function(rec) {
                modelVisita.load(rec.get('Id'), {
                    callback: function(record, operation) {
                        if (operation.success && record) {
                            record.erase({
                                callback: function(rec2, eraseOp) {
                                    if (eraseOp.success) {
                                        anySuccess = true;
                                        notify('Se eliminio exitosamente');
                                    } else {
                                        notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                                    }
                                    pendingErases--;
                                    if (pendingErases === 0) { finalize(); }
                                }
                            });
                        } else {
                            pendingErases--;
                            if (pendingErases === 0) { finalize(); }
  }
                    }
                });
            });
            /*
            Ext.Array.each(selection, function (rec) {
                rec.setConfig({
                    proxy: controller.getServTecVisitaModelModel().getProxy()
                });
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
                    
                    if(view.store.data.length == 0){
                        //Pendiente DS-471 (debo acceder a el record de la cabezera (servtecModel) y cambiar el estado a 1)
                        var recordx = view.record 
                        var model = controller.getServTecModelModel()
                                              
                        model.load(recordx.get("stc_iid"), {callback:function (records) {
                                records.set("stc_nestado",1)
                                records.set("stc_ctecnico_1","")
                                records.save( {
                                    callback: function( record, operation ) {
                                        if( operation.success ) {
                                            view.up('sertepanelview').cabecera = record
                                            console.log("Se modifico el estado del Serv Tec a pendiente")
                                        }
                                    }
                                });
                            }}) 
                    }
                }})
            },this); 
            */
        }
        		
	}
});
