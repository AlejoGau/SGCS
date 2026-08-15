//MIGRADO2024
Ext.define('Common.controller.p_objetos_modificacionesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_objetos_modificacionesModel', 'p_objetos_modificacionesSearchModel', 'AuditDenormalizationConfigSearchModel' ],
    views : [ 'p_objetos_modificacionesGridView' ],
    init : function(config) {
        // genero los eventos
		this.control(
            {
			'objectomodificacionesview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                refresh: this.onRefresh
			},
            
            'objectomodificacionesview #buscar' : {
                click: this.onSearchClick
            },
            'objectomodificacionesview #todos': {
                click: this.onGetAllClick
            }
		});
	},
    
    
    onRefresh: function (view) {
        view.getStore().load()
    },
	initView : function(view) {
        
        var controller = this;
        
        
        view.filters = []
        
        if(view.filterByUser) {
            view.filters.push({
                property:'pom_usuariopedido',
                value:_UserData.udw_idKey
            })
        }
        
        
        
        var filters = Ext.clone(view.filters)
        filters.push({            
            property:'pom_estado',
            value:0,
            id: 'pom_estado'
        });
        
      
  
        var store =Ext.create('Ext.data.Store',{
            model: this.getP_objetos_modificacionesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:  filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
        
        
        
      
	},
    
    onSalirClick: function (btn) {
        var view = btn.up('objectomodificacionesview')
        btn.up('window').hide();
        
    
    },
    
    onItemClick: function(grid,record,item,index,e,options){        
        var view = grid.up('objectomodificacionesview');
        var controller = this;
      
        
       
        
        view.mask = Ext.create('Ext.LoadMask', view, {
            msg: getLocale("Cargando")
        }).show();
        
        console.log(record.get('pom_sinmodificar'),record.get('pom_modificado'))
        
        var objSinModificarInit = Ext.JSON.decode(record.get('pom_sinmodificar'))
        var objModificadoInit = Ext.JSON.decode(record.get('pom_modificado'))
        var objSinModificar = null
        var objModificado = null
        
        var metadataCambio = Ext.JSON.decode(record.get('pom_metadata'))
        
        
        var container = Ext.widget('grid', {   
            store: Ext.create('Ext.data.Store', {
                model: Ext.define('modificaicones', {
                    extend: 'Ext.data.Model',
                    fields: [
                        {name:'campo'},
                        {name:'original'},
                        {name:'modificado'}
                	],
                })
            }),
            columns: [{
                xtype : 'gridcolumn',
        		header : 'Campo',
                dataIndex : 'campo',
                flex:1
    		},{
                xtype : 'gridcolumn',
    			header : 'Original',
                dataIndex : 'original',
                flex:1
    		}/*,{
                xtype : 'gridcolumn',
        		header : 'Actual',
                dataIndex : 'Actual'	,
                flex:1		
    		}*/,{
                xtype : 'gridcolumn',
    			header : 'Modificado',
                dataIndex : 'modificado'	,
                flex:1		
    		}]
		});
        
            
            function limpiarArray  (objeto) {
                 for (var key in objeto) {
                    if (objeto.hasOwnProperty(key)) {
                        console.log(key + " -> " + objeto[key]);
                        
                        if(Array.isArray(objeto[key])) {
                            objeto[key] = objeto[key].join(',')
                        }
                    }
                }
            }
            
            
            limpiarArray(objModificadoInit.data)
            limpiarArray(objSinModificarInit.data)
            
            Ext.Ajax.request({
                            url : '/handler/SearchPost?search=AuditDenormalizationConfig',
                            method:'POST',
                            params:{json:Ext.encode(objModificadoInit.data)},
                            failure: function(r,o){
                        		notify('Ocurrio un error.')
                                 view.mask.hide()
                    		},
                    		success: function(responseModificado, action){
                    		    objModificado = Ext.JSON.decode(responseModificado.responseText).rows;
                                
                             Ext.Ajax.request({
                                    url : '/handler/SearchPost?search=AuditDenormalizationConfig',
                                    method:'POST',
                                    params:{json:Ext.encode(objSinModificarInit.data)},
                                    failure: function(r,o){
                                		notify('Ocurrio un error.')
                                         view.mask.hide()
                            		},
                                	success: function(responseSinmodificar, action){
                            				
                                           objSinModificar = Ext.JSON.decode(responseSinmodificar.responseText).rows;
                                          
                                                
                                                Ext.Array.each(objSinModificar,function (valSinModificar,keySinModificar) {
                                                
                                                     Ext.Array.each(objModificado,function (valModificado,keyModificado) {
                                                            if(valModificado.name == valSinModificar.name) {    
                                                                //showAllResults es una variable para definiarla por consola para puentiar
                                                                if(Ext.util.Format.trim(valModificado.value) != Ext.util.Format.trim(valSinModificar.value) || typeof showAllResults !== 'undefined') {    
                                                                    if(valSinModificar.translated == 1) {
                                                                        container.getStore().add({
                                                                                campo:getLocale(valSinModificar.name),
                                                                                original:getLocale(valSinModificar.value),
                                                                                modificado:getLocale(valModificado.value)
                                                                        })
                                                                    } else {
                                                                        container.getStore().add({
                                                                                campo:getLocale(valSinModificar.name),
                                                                                original:valSinModificar.value,
                                                                                modificado:valModificado.value
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                    })
                                                
                                                })
                                                
                                                
                                                console.log('-> showAllResults')
                                                
                                                view.mask.hide()
                                                
                                                
                                                
                                                
                                                
                                                
                                                win = Ext.widget('window',{
                                                    width: 600,
                                                    height: 500,
                                                    layout: 'fit',           
                                                    title : 'Modificaciones',
                                                    closable: true,
                                                    items: container,
                                                    tbar:[{
                                                        text:'Confirmar cambios',
                                                        itemId:'aceptarcambios',
                                                        handler: function () {
                                                            //hacer ajax a objSinModificar.data.ObjectTypeName
                                                            view.mask = Ext.create('Ext.LoadMask', view, {
                                                                msg: getLocale("Realizando cambios")
                                                            }).show();
                                                            
                                                            
                                                            
                                                            Ext.Ajax.request({
                                                                url : metadataCambio.altPath?metadataCambio.altPath:'/Rest/'+objSinModificarInit.data.ObjectTypeName+'/'+objSinModificarInit.data.Id,
                                                                method:metadataCambio.method?metadataCambio.method:'PUT',
                                                                params:Ext.encode(objModificadoInit.data),
                                                                headers: {'Content-Type': 'application/json'},
                                                                failure: function(r,o){
                                                        			notify('Ocurrio un error.')
                                                                    view.mask.hide()
                                                        		},
                                                        		success: function(response, action){
                                                                        record.set('pom_estado', 1)
                                                                        record.set('pom_usuarioultcambio', _UserData.udw_idKey)
                                                                        record.set('pom_fechaultcambio', new Date())
                
                                                                        record.setConfig({
                                                                            proxy: controller.getP_objetos_modificacionesModelModel().getProxy()
                                                                        });
                                                                        
                                                                        record.save({callback:function () {
                                                                                view.fireEvent('refresh',     view)
                                                                                view.mask.hide()
                                                                                win.close()
                                                                                
                                                                                
                                                                        }})
                                                                        
                                                        				
                                                        		},
                                                        		scope:this
                                                        	});
                                                            
                                                            
                                                        }
                                                    },{
                                                        text:'Rechazar cambios',
                                                        itemId:'rechazarcambios',
                                                        handler: function () {
                                                            //hacer ajax a objSinModificar.data.ObjectTypeName
                                                            view.mask = Ext.create('Ext.LoadMask', view, {
                                                                msg: getLocale("Rechazando cambios")
                                                            }).show();
                                                            record.set('pom_estado', 2)
                                                            record.set('pom_usuarioultcambio', _UserData.udw_idKey)
                                                            record.set('pom_fechaultcambio', new Date())
                                                            

                                                            record.setConfig({
                                                                proxy: controller.getP_objetos_modificacionesModelModel().getProxy()
                                                            });
                                                            
                                                            record.save({callback:function () {
                                                                    view.fireEvent('refresh',     view)
                                                                    view.mask.hide()
                                                                    win.close()
                                                                    
                                                                    
                                                            }})
                                                            
                                                        }
                                                    }]
                                                }).show();
                                                
                                                
                                                if(metadataCambio.method == 'POST' || metadataCambio.forceNew == true) {
                                                    win.down('gridcolumn[dataIndex=original]').hide()
                                                    win.setTitle(getLocale('Nuevo registro'))
                                                }
                                                
                                                
                                                if(record.get('pom_estado') != 0) {
                                                    win.down('#rechazarcambios').hide()
                                                    win.down('#aceptarcambios').hide()
                                                }
                                                
                                                if(view.readOnly == true ) {
                                                    win.down('#rechazarcambios').hide()
                                                    win.down('#aceptarcambios').hide()
                                                    notify('Solo lectura');
                                                }
                                                
                                          //  }})
                                     
                                     
                            		},
                            		scope:this
                            	});
                             
                             
                    		},
                    		scope:this
                    	});
        
     
        
        
        
       
        
    },    
    
    onSearchClick: function(button, event){
        var view = button.up('objectomodificacionesview');
        var store = view.getStore();
        
        var filters = view.filters?Ext.clone(view.filters):[];
        
        
        if(view.down('#estado') && (view.down('#estado').getValue() || view.down('#estado').getValue() == 0)) {
            filters.push({            
                property:'pom_estado',
                value:view.down('#estado').getValue(),
                id: 'pom_estado'
            })
        }
        
        if(view.down('#dealer') && view.down('#dealer').getValue()) {
            filters.push({
                property: 'cue_clinea',
                value: view.down('#dealer').getValue(),
                id:'cue_clinea'
            });
        }
        
        if(view.down('#cuenta') && view.down('#cuenta').getValue()) {
            
            var pad = "0000";
            var n = view.down('#cuenta').getValue();
            
            var result = (pad+n).slice(-pad.length);
            view.down('#cuenta').setValue(result)
            
            filters.push({
                property: 'cue_ncuenta',
                value: result,
                id:'cue_ncuenta'
            });
        }
      
       
        if (view.down('#nombre') && view.down('#nombre').getValue())
            filters.push({ 
                property: 'cue_cnombre:LIKE',
                value: view.down('#nombre').getValue(),
                id: 'cue_cnombre'
            })
            
      /*  if (view.down('#formulario') && view.down('#formulario').getValue())
            filters.push({ 
                property: 'cue_cnombre',
                value: view.down('#formulario').getValue(),
                id: 'cue_cnombre'
            })*/
            
        if (view.down('#usuariosolicitante') && view.down('#usuariosolicitante').getValue())
            filters.push({ 
                property: 'udw_usuario:LIKE',
                value: view.down('#usuariosolicitante').getValue(),
                id: 'udw_usuario'
            })
            
            
            
        store.clearFilter(true);
        store.filter(filters);
       
            
            
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    onAddClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('productsearchview');
        var model = this.getProductModelModel();
        var proxy = model.getProxy();
        var store = view.getStore();
        
        var me = this;
        
        var record = Ext.create(model,{
            Name: getLocale('Nuevo Producto')
        });
        
        var win;
        
        // no lo agrego para que no aparezca vacio si abandona
        //store.add(newrecord);
        
        var form = Ext.widget('productformview', {
            iconCls: 'icon-Product',
            record: record,
            targetTab: panel,
            header: false,
            caller: view,
			closable : false,
            deleteHide:true,
            rubrosDisabled:true,
            listeners: {
                objectchanged: function(){
                    view.down('pagingtoolbar').doRefresh();
                    win.close();
                }
            }
		});
        
        win = Ext.widget('window',{
            width: 600,
            height: 500,
            layout: 'fit',            
            translate:false,
            title : record.get('Name'),
            closable: true,
            items: form
        }).show();
    },
    onGetAllClick: function(button, event, options) {    
        var view = button.up('objectomodificacionesview');
        var store = view.getStore();
        //store.clearFilter(true);
       // store.filter(view.filters);
        view.down('#usuariosolicitante').setValue('');
        view.down('#nombre').setValue('');
        view.down('#dealer').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#estado').setValue('');
        
        
        this.onSearchClick(button)
    },
    
    openObjectTab: function(tabpanel,objectId, objectTypeName, title){
        var container = objectTypeName.toLowerCase() + 'view';
        
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
    }
});