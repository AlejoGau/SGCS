//MIGRADO2024
Ext.define('Common.controller.BitacoraController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'BitacoraSearchModel', 'BitacoraModel' ],
    views : [ 'BitacoraView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'bitacoraview' : {
                afterrender : this.initView,
                objectchanged: this.objectChanged
    		},
            'bitacoraview button[action=guardarbitacora]' : {
                click : this.onGuardarBitacoraClick
            }
		});
	}, // cierro init
    
    initView: function(view){
        var record = view.record;
        var cue_iid = record.get('cue_iid');
        var controller = this;       
        
        var mystore =Ext.create('Ext.data.Store',{
                model: this.getBitacoraSearchModelModel(),
                remoteFilter: true,
                filters: [{
                    property: 'rec_iidrecepcion',
                    value: cue_iid
                }],
                sorters: [
                    {
                        property : 'rec_idKey',
                        direction: 'DESC'
                    }
                ]
            });
            
        var _module = view.module;
        if (_module){
            var profile = _module.profile?_module.profile:_module.get('profile');
            view.profile = profile;
        }else {
            view.profile = 3;
        }
        mystore.load({callback: function (records) {
            
            view.bitacoras = records;  
            var texto = '';
            Ext.Array.each(records, function (record) {  
               texto += record.get('rec_mnota');  
               texto += '\n';
            })   
            view.down('#bitacora').setValue(texto);           
            
        }});
        
        if(view.showMaximizer != false && view.showMaximizer != undefined) {
            /*view.addTool({
                type: 'maximize', 
                itemId: 'maximizer',
                handler: function(event,img,view,tool){
                    var view = tool.up('bitacoraview');
                    var tabpanel = tool.up('tabpanel');
                    var record = view.record;
                                            
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                		title : getLocale('Bitacora')+' ('+record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')+')',
            			closeAction : 'hide',
            			width : 750,
                        translate: false,
            			height : 400,
            			border : true,
                        modal: false,
                        view: view,
            			items : [
                            {
                                xtype: 'bitacoraview',
                                caller: view,
                                showMaximizer: false,
                                record:record
                                
                            }
                        ]
            		});
                    
                    win.show();
                }
            });*/
            
            view.down('#maximizer').show()
            view.down('#savebitacora').show()
        } else {
            view.down('#savebitacora').show();
        }
        
        if(view.profile < 2) {
            
            view.down('#savebitacora').hide()
        }
    },
    
    
    objectChanged: function (view) {   
        var record = view.record;
        var cue_iid = record.get('cue_iid');
        var controller = this;    
        var mystore =Ext.create('Ext.data.Store',{
                model: this.getBitacoraSearchModelModel(),
                filters: [{
                    property: 'rec_iidrecepcion',
                    value: cue_iid
                }],
                remoteFilter:true,
                sorters: [
                    {
                        property : 'rec_idKey',
                        direction: 'DESC'
                    }
                ]
            });
            
        mystore.load({callback: function (records) {
            view.bitacoras = records;  
            var texto = '';
            Ext.Array.each(records, function (record) {  
               texto += record.get('rec_mnota');  
               texto += '\n';
            })   
            view.down('#bitacora').setValue(texto); 
        }});
    },
    
    onGuardarBitacoraClick: function(button, object, options){
       var controller = this;
       var view = button.up('bitacoraview');  
       var nombreEvento = '['+view.record.get('rec_calarma') +  ' - ' +view.record.get('cod_cdescripcion')+']';
       var win = Ext.create('Ext.Window', {
            layout : 'fit',
    		title : getLocale('Bitacora'),
			width : 400,
            translate: false,
			height : 200,
			border : false,
			items : [
                    {
                        xtype: 'textarea',
                        itemId:'bitacorafield'
                    } 
                ],
            tbar: [
                    {
                        xtype: 'button', 
                        text: 'Guardar', 
                        handler: function(button){
                            var win = button.up('window');
                            var campo = win.down('#bitacorafield');
                            var date = new Date();
                            date = Ext.Date.format(date, 'd/m/Y H:i:s');
                            
                            if(campo.getValue() != '') {
                                var recordx = controller.getBitacoraModelModel().create();
                                recordx.set('Id', 0);
                                
                                recordx.set('rec_iidrecepcion', view.record.get('cue_iid'));
                                var nuevoValor = recordx.get('rec_mnota') +"["+date+"] ["+_UserData.UserId+"] "+campo.getValue();                    
                                recordx.set('rec_mnota', nuevoValor);
                                recordx.set('rec_itipo', 5);
                                
                                recordx.save({callback:function () {
                                    view.down('#bitacora').setValue(nuevoValor.replace(/\n/g, "<br />")+ "<br />"+view.down('#bitacora').getValue());
                                    if(view.showMaximizer == false) {
                                        view.caller.fireEvent('objectchanged',view.caller);
                                    } else {
                                        view.fireEvent('objectchanged',view);
                                    }
                                    win.close(); 
                                }});
                            
                            } else {
                                notify('No hay nada que grabar.')
                            }
                            
                        }
                    },'->',{
                        xtype: 'button', 
                        text: 'Cancelar',
                        handler: function(btn){
                            btn.up('window').close()
                        }
                        
                    }
                ]
		});
		win.show();
    }
});