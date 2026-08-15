//MIGRADO2024
Ext.define('Common.controller.AwccUsuariosByCuentaGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AwccUsuariosByCuentaSearchModel', 'AwccUsuariosByEntidadSearchModel', 'AwccUsuarioModel' ],
    views : [ 'AwccUsuariosByCuentaGridView' ],
    
    init: function (config) {
        var me=this;
        // genero los eventos
        this.control({
            'awccusuariosgridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'awccusuariosgridview button[action=add]': {
                click: this.onAddClick
            },
            'awccusuariosgridview button[action=createUser]': {
                click: this.onCreateUserClick
            },
            'awccusuariosgridview':{
                afterrender: this.loadData,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                enviarmail: this.onEnviarMail,
                agregarcuentas: this.onAgregarCuenta,
                cuentaselected : this.onCuentaSelected,
                objectchanged: this.onObjectChanged
            }
            
        });
    
    }, // cierro init
    
    onObjectChanged: function (caller,record) {
        var view = caller;
        view.down('pagingtoolbar').doRefresh();
        
    },
    
    loadData: function (view) {
        var record = view.record;
        var module = view.module;
        var profile = module?module.get('profile'):1;
        view.profile = profile;
        
        if (profile < 2){
            view.down('toolbar').hide();
        }
        
        
        
        if(!this.application.UserData.Company) {
            notifyError('Debe asignar una organización al usuario');
            view.down('toolbar').hide();
        }
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getAwccUsuariosByCuentaSearchModelModel(),
            remoteFilter:true
        });
        
        view.bindStore(mystore);
        view.down('pagingtoolbar').bindStore(mystore);
        
        var _cuentaId = record.get('cue_iid');
        mystore.getProxy().setExtraParam("cue_iid", _cuentaId);
        mystore.load();
        
        
        var userStore =Ext.create('Ext.data.Store',{
            model: this.getAwccUsuariosByEntidadSearchModelModel(),
            filters:[{
                property: 'entidad',
                remoteFilter: true,
                value: this.application.UserData.Company
            }]
        });
        
        var combousuario = view.down('#usuarioCombo');
        combousuario.bindStore(userStore);
        userStore.load({ callback:function (records) {
                if(records > 0) {
                    combousuario.show();
                    view.down('#asignar').show();
                }
        }});
        
        
        var keymodulestore = KeyModulesStore;//this.getKeyModulesStoreStore();
        if (!keymodulestore.isModuleAvailable('AWCC')){
            notify('No es posible acceder a la funcionalidad completa de esta solapa. Consulte con el proveedor del servicio.')
            view.down('gridview').setDisabled(true);
        }
        
        
    },
    
    
    onCuentaSelected:  function (selection,view,recordPreSelected) {
        
        Ext.Array.each(selection, function(record){
        
            var cueiid = record.get('cue_iid');
            var login = recordPreSelected.get('nombrelogin');
            var url = '/rest/security/AWCC/AsignarCuentas/'+login+'/'+cueiid;
            if (login){
                Ext.Ajax.request({
                      url: url,
                      method: 'POST',
                      scope: this,
                      success: function(response){
                        notify('El usuario se agregó con éxito');
                        view.down('pagingtoolbar').doRefresh();
                      }
                });
            }
        
        });
        
        
    },
    
    
    onAgregarCuenta: function (record,view) {
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
    		title : 'Seleccione Cuentas',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentahelperview',
                    tip_ncondicion: "0",
                    caller: view,
                    recordPreSelected: record,
                    multiSelect: true
                }
            ]
		});
		win.show();
    },
    
    onEnviarMail: function (record,view) {
        
            if(record.get('email') == '') {
                notifyError('El usuario no tiene email.');
            } else {
        
                var myWindow = Ext.widget('window',{
                    title: getLocale('Enviar mail a:') + " "+record.get('nombre_mostrar'),
                    closable: false,
                    height: 150,
                    width: 400,
                    modal: true, 
                    items:  [
                        {
                        	xtype:'form',
                            layout: {
                                 type: 'vbox',
                                align: 'stretch'
                            },
                    
                    		items:[
                            
                                {
                                    xtype : 'displayfield',
                    			    fieldLabel : 'Nombre',
                                    value: record.get('nombre_mostrar')
                                },
                                {
                                    xtype : 'displayfield',
                        		    fieldLabel : 'Login',
                                    value: record.get('nombrelogin')
                                },
                                {
                                    xtype : 'displayfield',
                        		    fieldLabel : 'Email',
                                    value: record.get('email'),
                                    itmeId: 'email'
                                }
                             ]
                        }
                    ],
                    buttons : [
                        {
                            text    : 'Enviar',
                            handler : function () {
                                
                                    Ext.Ajax.request({
                                           url: '/Rest/t_parametros/',
                                          params: { filter:'[{"property":"par_ccodigo", "value":"URLAWCC"}]'},
                                          method: 'GET',
                                          scope: this,
                                          success: function(response){
                                            var urlEnvioMail = Ext.JSON.decode(response.responseText).rows[0].par_cvalor;
                                            
                                            var url ='http://'+urlEnvioMail+'/backpanel/send-mail-usuario.asp';
                                                                                
                                            url = Ext.urlAppend(url,'id_usuario='+record.get('Id'));
                                            url = Ext.urlAppend(url,'clave='+record.get('contrasena'));
                                            url = Ext.urlAppend(url,'email='+record.get('email'));
                                            
                                            Ext.Ajax.request({
                                                  url: '/rest/request/get/?'+url,
                                                  //params: { id_usuario: record.get('Id'), clave:  record.get('contrasena'), email: record.get('email')},
                                                  method: 'GET',
                                                  scope: this,
                                                  success: function(response){
                                                      
                                                      if(response.responseText == 'true') {
                                                          notify('El mail fue enviado con exito.');
                                                          this.up('.window').close();
                                                      } else {
                                                        notifyError('Ocurrio un error al enviar el email.');
                                                      }                  
                                                    
                                                  }
                                            });
                                          }
                                    });
                                
                                
                                    
                                    
                                    
                                
                                
                                }
                            },{
                                text    : 'Cancelar',
                                handler : function () {
                                    this.up('.window').close();
                                }
                            }
                        
                    ],
                    layout: 'fit'
                }).show();
           
            }
        
        
    },
    
    
    
    onDeleteClick: function(button,event,options){
        var view = button.up('awccusuariosgridview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            var cuenta =  view.record;
            var cueiid = cuenta.get('Id');
            var login = selection.get('nombrelogin');
            var url = '/rest/security/AWCC/AsignarCuentas/'+login+'/'+cueiid;
            
            Ext.Ajax.request({
                  url: url,
                  method: 'DELETE',
                  scope: this,
                  success: function(response){
                    notify('El usuario se eliminó con éxito');
                    view.down('pagingtoolbar').doRefresh();
                  }
            });
        }
        
    },
    onAddClick: function(button,event,options){
        var view = button.up('awccusuariosgridview');
		var cuenta =  view.record;
        var cueiid = cuenta.get('Id');
        var login = view.down('#usuarioCombo').getValue();
        var url = '/rest/security/AWCC/AsignarCuentas/'+login+'/'+cueiid;
        
        if (login){
            Ext.Ajax.request({
                  url: url,
                  method: 'POST',
                  scope: this,
                  success: function(response){
                    notify('El usuario se agregó con éxito');
                    view.down('pagingtoolbar').doRefresh();
                  }
            });
        }
        
    },
    
    onCreateUserClick: function(button,event,options){
        var view = button.up('awccusuariosgridview');
        this.openFormWindow('Nuevo usuario',null,view);
    },
    
    
    onCreateUserClick: function(button,event,options){
        var view = button.up('awccusuariosgridview');
        var controller = this;
    	var cuenta =  view.record;
        var cueiid = cuenta.get('Id');
        var entidad = this.application.UserData.Company; // completar con la entidad del usuario logueado
        //console.log(this.application.UserData);
        var model = this.getAwccUsuarioModelModel();
        var record = Ext.create(model,{
            CueIId: cueiid,
            Entity: entidad
        })
        var title = 'Nuevo usuario';
        
        var win = Ext.create('Ext.Window', {
    		layout: 'fit',
			title : 'Nuevo usuario',
			closeAction : 'destroy',
            record: record,
            itemId: 'AwccUserWindow',
			width : 300,
			height : 200,
			border : true,
            modal: true,
            view: view,
            listeners: {
                'beforerender': function(){
                    var templateStore =Ext.create('Ext.data.Store',{
                        model: controller.getAwccUsuariosByEntidadSearchModelModel(),
                        remoteFilter: true,
                        filters:[{
                            property: 'EsTemplate',
                            value: true
                        }]
                    });
                    win.down('#templateCombo').bindStore(templateStore);
                    templateStore.load();
                }
            },
            tbar:[
                { text: 'Guardar' , action: 'save', iconCls: 'save',
                handler: function(button){
                    var form = win.down('form');
                    
                    if (!form.getForm().isValid()){
                        notifyError('Por favor corrija los valores');
                        return
                    }
                    
                    if (form.down('#clave1').getValue() == form.down('#clave2').getValue()){
                        if (form.down('#email').getValue()){
                            record.set('Login', form.down('#email').getValue());
                            record.set('Password', form.down('#clave1').getValue());
                            record.set('Email',form.down('#email').getValue());
                            record.set('Name',form.down('#name').getValue());
                            record.set('LoginTemplate',form.down('#templateCombo').getValue());
                            
                            record.save({success:function(p1, p2){
                                var ResponseText = p2.response.responseText;
                                var jsonResponseText = JSON.parse(ResponseText);
                                var Resultado = jsonResponseText.Resultado;
                                //console.log("success Resultado", Resultado);
                                if (Resultado == "ERR_DUP_USER"){
                                    notify('Error: El usuario está duplicado');
                                    record = Ext.create(model,{
                                        CueIId: cueiid,
                                        Entity: entidad
                                    })
                                    
                                    
                                }else{
                                    view.down('pagingtoolbar').doRefresh();
                                    notify('El usuario se creó con éxito');
                                    win.close();
                                }
                            }});
                        }   
                    } else {
                        notifyError('Las claves deben ser iguales');
                    }
                    
                }
                }
            ],
			items : [{
                xtype: 'form',
                items:[{
                        xtype : 'textfield',
            			fieldLabel : 'Login',
                        labelWidth: 90,
            			name : "Email",
                        itemId: 'email',
                        vtype: 'email',
                        allowBlank: false
            		},
                    {
                        xtype : 'textfield',
                        fieldLabel : 'Clave',
                        itemId: 'clave1',
                        labelWidth: 90,
                        inputType : 'password',
                        allowBlank: false
                	},{
                        xtype : 'textfield',
                        fieldLabel : 'Repetir clave',
                        itemId: 'clave2',
                        labelWidth: 90,
                        inputType : 'password',
                        allowBlank: false
            		},{
                		xtype : 'textfield',
            			fieldLabel : 'Nombre',
                        labelWidth: 90,
            			name : "Name",
                        itemId: 'name',                        
                        allowBlank: false,
            		},{
                    	xtype : 'combo',
            			fieldLabel : 'Template',
                        labelWidth: 90,
                        //plugins: ['clearbutton'],
                        editable: false,
                        forceSelection: false,
                        itemId: 'templateCombo',
                        queryMode: 'local',
            			displayField : 'nombre_mostrar',
            			valueField : 'nombrelogin',
                        emptyText: getLocale('Template por defecto'),
                        allowBlank: true
            		}
                ]
			}]
		});
		win.show();
    },
    
    onSaveClick: function (button,event,options) {
        var view = button.up('gridawccuser');
        var store = view.store;
        store.sync();
        notify('Los cambios se guardaron con éxito');
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        this.openFormWindow(record.get('usu_cnombre'),record,view);
    },
    
    openFormWindow: function(title,record,grid){
        var view = grid.up('awccusuariosgridview')?grid.up('awccusuariosgridview'):grid;
               
        if (view.profile >= '2'){
            
            
            var itemSeleccionado = record;
                    
            
            var newView = Ext.widget('awccusuariosbycuentaformview',{
                objectId: itemSeleccionado?itemSeleccionado.get('id_login'):null,
                caller: view
            });
            // Lo agregamos al panel
            var myWindow = Ext.widget('window',{
                title: title,
                closable: false,
                height: 350,
                width: 400,
                modal: true, 
                items: newView,
                layout: 'fit'
            }).show();
       }else {
            notifyError('No posee derechos para esta operación');
        }
    },
    
    onObjectEdit: function(record,view){
        this.openFormWindow(record.get('usu_cnombre'),record,view);
    }
});