//MIGRADO2024
Ext.define('Common.view.guardVideolinkGridView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.videolinkgridview'],
    preventHeader: true,
    frame: false,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        //width:'100%',
        anchor:'100%',
        enforceMaxLength: true
    },
    layout: {
        type: 'vbox',
        align : 'stretch'
    },
    items : [
        
        {
        xtype:'fieldset',
        fieldDefaults : {
            labelAlign : 'left',
            labelWidth : 100,
            //width:'100%',
            anchor:'100%',
            enforceMaxLength: true
        },
        items: [
            {xtype: 'textfield', fieldLabel: 'Uri', itemId: '_uri',name: '_uri', allowBlank: false},
            {xtype: 'textfield', fieldLabel: 'Port',
                minVAlue:1,
                itemId: '_port',name: '_port', allowBlank: false},
            {xtype: 'textfield', fieldLabel: 'Usuario', itemId: '_user',name: '_user', allowBlank: false},
            {xtype: 'textfield', fieldLabel: 'Clave', inputType: 'password', itemId: '_password',name: '_password', allowBlank: false},
            {xtype: 'textfield', fieldLabel: 'Cámara', itemId: '_camara',name: '_camara', allowBlank: false},
            {
                xtype: 'button', 
                text:'Agregar',
                handler: function(button) {
                    var view = button.up('videolinkgridview');
                    var instance = {
                        _uri: view.getForm().findField('_uri').getValue(),
                        _port: view.getForm().findField('_port').getValue(),
                        _user: view.getForm().findField('_user').getValue(),
                    	_password: view.getForm().findField('_password').getValue(),
                    	_camara: view.getForm().findField('_camara').getValue()
                    };
                    
                    var store = view.down('grid').getStore();
                    store.add(instance);
                    
                    view.setInHiddenField(view, store)
                }
            }
        ]
        
        },
        {
            xtype: 'gridpanel',
            columns:[
                {
                    xtype:'actioncolumn',
                    header: '',
                    width: 40,
                    items: [
                        {
                            iconCls: 'icon-delete',
                            tooltip: 'Borrar',
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('videolinkgridview');
                                //var rec = grid.getStore().getAt(rowIndex);
                                grid.getStore().removeAt(rowIndex)
                                
                                view.setInHiddenField(view, grid.getStore())
                            }
                        }
                    ]
                },
               {
                    xtype : 'gridcolumn',            
                    header : '_uri',
                    
                	dataIndex : '_uri',
                    flex: 1
        		},{
                    xtype : 'gridcolumn',            
                    header : '_port',
                   
                	dataIndex : '_port',
                    flex: 1
        		},{
                    xtype : 'gridcolumn',            
                    header : '_user',
                    
                	dataIndex : '_user',
                    flex: 1
        		}/*,{
                    xtype : 'gridcolumn',            
                    header : '_password',                    
                    dataIndex : '_password',
                    flex: 1
        		}*/,{
                    xtype : 'gridcolumn',            
                    header : '_camara',
                    
                    dataIndex : '_camara',
                    flex: 1
        		}
            ]
        }
    ],   
    
    setInHiddenField : function (view, store) {
        var data = [];
        store.each(function(rec){
           data.push(rec.data);
        });
        var gridconfig = view.caller.down('#gridconfig');
        gridconfig.setValue(Ext.JSON.encode(data));
    },
	initComponent : function() {
		this.callParent();
        var view = this;
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId:'save',
                    formBind : true,
                    listeners:{
                        click:function () {
                             view.callerParent.fireEvent('save',view.callerParent)
                        }
                    }
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
        
	},
    
    listeners: {
        afterrender: function(view){
            var record = view.record;
            var gridconfig;
            var data;
            //console.log(view);
            
            var campo = record.get('cuv_clinkdss')?record.get('cuv_clinkdss'):record.get('cvl_clinkdss');
            var cuv_clinkdss = Ext.JSON.decode(campo?campo:'{}');
            var formdata = cuv_clinkdss.formdata;
            
            // agarro los valores de formdata y los pongo en los campos
            view.down('#_uri').setValue(formdata._uri);
            view.down('#_port').setValue(formdata._port);
            view.down('#_user').setValue(formdata._user);
            view.down('#_password').setValue(formdata._password);
            
            if (formdata) {
                gridconfig = formdata.gridConfig;
            }
            
            if (gridconfig){
                data = Ext.JSON.decode(cuv_clinkdss.formdata.gridConfig);
            }
            
            var store = Ext.create('Ext.data.Store',{
                model: 'Common.model.dguardVideoLinkModel',
                proxy: {type: 'memory'}
            });
            
            if (data){
                store.loadData(data);
            }
            
            this.down('grid').bindStore(store);
        }
    }
});